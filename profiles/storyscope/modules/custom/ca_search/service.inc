<?php

require_once( 'includes/ca_api.inc' );
/**
 * Search service class using Decipher Content Aggregator
 *
 */
class SearchApiDecipherContentAggregatorService extends SearchApiAbstractService
{ 
  /**
   * Configuration form in admin panel
   */
  public function configurationForm( array $form, array &$form_state )
  {
    if( $this->options )
    {
      // Editing this server
      $url = 'http://' . $this->options[ 'host' ] . ':' . $this->options[ 'port' ] . $this->options[ 'path' ];
      $form[ 'server_description' ] = array(
        '#type' => 'item',
        '#title' => t( 'Decipher Content Aggregator URI' ),
        '#description' => l( $url, $url ),
      );
    }
    $options = $this->options + array(
      'host' => 'storyscope.ssl.co.uk',
      'port' => '80',
      'path' => '/soapix/searchretrieve/decipher'
    );
    $form[ 'host' ] = array(
      '#type' => 'textfield',
      '#title' => t( 'Decipher CA host' ),
      '#description' => t( 'The host name or IP of the Content Aggregator server' ),
      '#default_value' => $options[ 'host' ],
      '#required' => TRUE,
    );
    $form[ 'port' ] = array(
      '#type' => 'textfield',
      '#title' => t( 'Decipher CA port' ),
      '#description' => t( 'The port number of the Content Aggregator server' ),
      '#default_value' => $options[ 'port' ],
      '#required' => TRUE,
    );
    $form[ 'path' ] = array(
      '#type' => 'textfield',
      '#title' => t( 'Decipher CA path' ),
      '#description' => t( 'The path that identifies the Content Aggregator instance on this server' ),
      '#default_value' => $options[ 'path' ],
    );
    return $form;
  }

  /**
   * Validate configuration options
   */
  public function configurationFormValidate( array $form, array &$values, array &$form_state )
  {
    if( isset( $values[ 'port' ] ) && (!is_numeric( $values[ 'port' ] ) || $values[ 'port' ] < 0 || $values[ 'port' ] > 65535) )
    {
      form_error( $form[ 'port' ], t( 'The port has to be an integer between 0 and 65535.' ) );
    }
  }

  /**
   * Return true for an optional supported feature (none at the moment)
   * @param type $feature
   * @return boolean
   */
  public function supportsFeature( $feature )
  {
    $supported = drupal_map_assoc(array(
      'search_api_facets',
    ));
    return isset($supported[$feature]);
  }

  /**
   * Delete an item from an index
   * 
   * the Content Aggregator is read-only, storyscope instances cannot delete
   * data in it
   */
  public function deleteItems( $ids = 'all', SearchApiIndex $index = NULL )
  {
    // leave it blank, storyscope can't index items to CA via Search API
  }

  /**
   * Index an item into the Content Aggregator
   * 
   * the Content Aggregator is read-only, storyscope instances cannot insert
   * new data in it via the Search API
   */
  public function indexItems( SearchApiIndex $index, array $items )
  {
    // leave it blank, storyscope can't index items to CA via Search API
    return array( );
  }

  /**
   * Perform a search
   */
  public function search( SearchApiQueryInterface $query )
  {
    $search_strings = array();
    $results = array(
      'result count' => 0
    );
    $time_method_called = microtime( TRUE );
    $search_strings[ 'local' ][ 'raw' ] = $this->buildIndexPlusSearchString( $query );
    
    $options = $query->getOptions();

    // Configure remote sources
    if( isset( $options[ 'Europeana' ] ) && $options[ 'Europeana' ] == 1 )
      $search_strings[ 'remote' ][ 'europeana:europeana' ] = $this->buildEuropeanaSearchString( $query );
    
    if( empty( $search_strings[ 'local' ][ 'raw' ] ) && empty( $search_strings[ 'remote' ][ 'europeana:europeana' ] ) )
      return $results;
    $offset = isset( $options[ 'offset' ] ) ? $options[ 'offset' ] : 0;
    $limit = isset( $options[ 'limit' ] ) ? $options[ 'limit' ] : 1000000;
    try
    {
      // Send search request
      $time_processing_done = microtime( TRUE );
      $ca_options = array( );
      if( isset( $this->options[ 'host' ] ) )
      {
        $ca_options[ 'location' ] = 'http://' . $this->options[ 'host' ];
        if( isset( $this->options[ 'port' ] ) )
          $ca_options[ 'location' ] .= ":" . $this->options[ 'port' ];
        if( isset( $this->options[ 'path' ] ) )
          $ca_options[ 'location' ] .= $this->options[ 'path' ];
      }
      $lastRequestId = cache_get( $search_strings[ 'local' ][ 'raw' ] );
      $ca_options[ 'lastRequestId' ] = !empty( $lastRequestId ) ?
        $lastRequestId->data : '';
      $records = content_aggregator_search( 'catalogue', $search_strings, $offset, $limit, $ca_options );
      if( !isset( $records ) || empty( $records ) )
        return $results;
      cache_set( $search_strings[ 'local' ][ 'raw' ], $records->resultSetId, 'cache', CACHE_TEMPORARY );
      $time_query_done = microtime( TRUE );

      // Extract results
      $results[ 'results' ] = content_aggregator_map( ca_fields_map(), $records );
      $results[ 'result count' ] = $records->numberOfRecords;
      $results[ 'search_api_facets' ] = content_aggregator_extract_facets( $records->facets, 
        $query->getOption( 'search_api_facets' ) );
      // Compute performance
      $time_end = microtime( TRUE );
      $results[ 'performance' ] = array(
        'complete' => $time_end - $time_method_called,
        'preprocessing' => $time_processing_done - $time_method_called,
        'execution' => $time_query_done - $time_processing_done,
        'postprocessing' => $time_end - $time_query_done,
      );
      return $results;
    }
    catch( Exception $e )
    {
      throw new SearchApiException( t( 'An error occurred while trying to search the Content Aggregator: @msg.', 
        array( '@msg' => $e->getMessage() ) ) );
    }
  }  
  
  
  private function flattenKeys( array $keys, $and = ' ', $or = 'OR', $not = 'NOT ' )
  {
    $k = array( );
    $or = $keys[ '#conjunction' ] == 'OR';
    $neg = !empty( $keys[ '#negation' ] );
    foreach( element_children( $keys ) as $i )
    {
      $key = $keys[ $i ];
      if( !$key )
      {
        continue;
      }
      if( is_array( $key ) )
      {
        $subkeys = $this->flattenKeys( $key );
        if( $subkeys )
        {
          $nested_expressions = TRUE;
          if( $or && $neg )
          {
            $subkeys = "($subkeys)";
          }
          $k[ ] = $subkeys;
        }
      }
      else
      {
        $key = trim( $key );
        $k[ ] = $key;
      }
    }
    if( !$k )
    {
      return '';
    }
    
    if( count( $k ) == 1 && empty( $nested_expressions ) )
    {
      $k = reset( $k );
      return $neg ? "$not$k" : $k;
    }

    if( $or )
    {
      if( $neg )
      {
        return $not . implode( " $not", $k );
      }
      return '((' . implode( ') ' . $or . ' (', $k ) . '))';
    }
    $k = implode( $and, $k );
    return $neg ? "$not($k)" : $k;
  }

  
  
  private function buildIndexPlusSearchString( SearchApiQueryInterface $query )
  {
    // Extract keys
    $search_string = '';
    $keys = $query->getKeys();
    if( !is_array( $keys ))
      $search_string = $keys;
    else
      $search_string = $this->flattenKeys( $keys );
    if( !empty( $search_string ) )
      $search_string = "$search_string INDEX text";
    
    $filter = $query->getFilter();
    $filters = $this->buildIndexPlusFilterQueries( $filter, array_flip( ca_fields_map() ) );
    if( !empty( $filters ) )
      if( !empty( $search_string ) )
        $search_string = "($search_string) AND ($filters[0])";
      else
        $search_string = $filters[ 0 ];
    
    $search_string = "IX_UNIQ $search_string";
    return $search_string;
  }

  
  
  private function buildIndexPlusFilterQueries( SearchApiQueryFilterInterface $filter, array $fields )
  {
    $or = $filter->getConjunction() == 'OR';
    $fq = array( );
    foreach( $filter->getFilters() as $f )
    {
      if( is_array( $f ) )
      {
        if( !isset( $fields[ $f[ 0 ] ] ) )
        {
          throw new SearchApiException( t( 'Filter term on unknown or unindexed field @field.', array( '@field' => $f[ 0 ] ) ) );
        }
        if( $f[ 1 ] !== '' )
        {
          $fq[ ] = $this->buildIndexPlusFilterQuery( $fields[ $f[ 0 ] ], $f[ 1 ], $f[ 2 ] );
        }
      }
      else
      {
        $q = $this->buildIndexPlusFilterQueries( $f, $fields );
        $sep = $or ? ' AND ' : ' OR ';
        if( $filter->getConjunction() != $f->getConjunction() )
        {
          // $or == TRUE means the nested filter has conjunction AND, and vice versa
          $fq[ ] = count( $q ) == 1 ? reset( $q ) : '(' . implode( ')' . $sep . '(', $q ) . ')';
        }
        else
        {
          $fq = array_merge( $fq, $q );
        }
      }
    }
    $conj = $or ? 'OR' : 'AND';
    return (count( $fq ) > 1) ? array( '(' . implode( ") $conj (", $fq ) . ')' ) : $fq;
  }
  
  
  private function buildIndexPlusFilterQuery( $field, $value, $op )
  {
    switch( $op )
    {
      case '<>':
        return "NOT $value IN $field";
      case '<':
        return "WITH $field TO $value";
      case '<=':
        return "WITH $field TO $value";
      case '>=':
        return "WITH $field FROM $value";
      case '>':
        return "WITH $field FROM $value";

      default:
        $index = ca_search_facets_index( $field );
        if( !empty( $index ) )
          return 'WITH ' . $index . ' IS "' . $value . '"';
        return "$value IN $field";
    }
  }

  private function buildEuropeanaSearchString( SearchApiQueryInterface $query )
  {
    $search_string = '';
    $keys = $query->getKeys();
    if( !is_array( $keys ))
      $search_string = $keys;
    else
      $search_string = $this->flattenKeys( $keys, ' ', 'OR', '-' );

    $filter = $query->getFilter();
    $filters = $this->buildEuropeanaFilterQueries( $filter, ca_europeana_fields_map() );
    if( !empty( $filters ) )
      if( !empty( $search_string ) )
        $search_string = "($search_string) AND ($filters[0])";
      else
        $search_string = $filters[ 0 ];
    return $search_string;
  }


  
  private function buildEuropeanaFilterQueries( SearchApiQueryFilterInterface $filter, array $fields )
  {
    $or = $filter->getConjunction() == 'OR';
    $fq = array( );
    foreach( $filter->getFilters() as $f )
    {
      if( is_array( $f ) )
      {
        if( $f[ 0 ] == 'field_object_collection' )
          continue;        
        if( !isset( $fields[ $f[ 0 ] ] ) )
        {
          throw new SearchApiException( t( 'Filter term on unknown or unindexed field @field.', array( '@field' => $f[ 0 ] ) ) );
        }
        if( $f[ 1 ] !== '' )
        {
          $fq[ ] = $this->buildEuropeanaFilterQuery( $fields[ $f[ 0 ] ], $f[ 1 ], $f[ 2 ] );
        }
      }
      else
      {
        if( $f == 'field_object_collection' )
          continue;        
        $q = $this->buildEuropeanaFilterQueries( $f, $fields );
        $sep = $or ? ' ' : ' OR ';
        if( $filter->getConjunction() != $f->getConjunction() )
        {
          // $or == TRUE means the nested filter has conjunction AND, and vice versa
          $fq[ ] = count( $q ) == 1 ? reset( $q ) : '(' . implode( ')' . $sep . '(', $q ) . ')';
        }
        else
        {
          $fq = array_merge( $fq, $q );
        }
      }
    }
    $conj = $or ? 'OR' : ' ';
    return (count( $fq ) > 1) ? array( '(' . implode( ") $conj (", $fq ) . ')' ) : $fq;    
  }
  
  
  
  
  private function buildEuropeanaFilterQuery( $field, $value, $op )
  {
    switch( $op )
    {
      case '<>':
        $terms = explode( " ", $value );
        $value = '';
        foreach( $terms as $term )
          $value .= "+*$term* ";
        $value = trim( $value );
        return "-($field:($value))";
      case '<':
        return "$field:{* TO $value}";
      case '<=':
        return "$field:[* TO $value]";
      case '>=':
        return "$field:[$value TO *]";
      case '>':
        return "$field:{{$value} TO *}";

      default:
        $terms = explode( " ", $value );
        $value = '';
        foreach( $terms as $term )
          $value .= "+*$term* ";
        $value = trim( $value );
        return "$field:($value)";
    }
  }
  
}

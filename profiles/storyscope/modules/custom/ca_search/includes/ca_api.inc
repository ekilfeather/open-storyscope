<?php

/**
 * Map Content Aggregator fields to Storyscope entities' fields
 */
function ca_fields_map()
{
  return array( 'spec_title_field' => 'title',
    'spec_content_description' => 'body',
    'spec_object_production_person_field_data' => 'field_object_creator',
    'spec_object_production_date_field_text' => 'field_object_creation_date',
    'spec_object_production_date_field_earliest' => 'field_object_creation_date_earliest',
    'spec_object_production_date_field_latest' => 'field_object_creation_date_latest',
    'spec_responsible_department_val' => 'field_object_collection',
    'spec_credit_line' => 'field_object_credit_line',
    'mus_materials_techniques_note' => 'field_object_materials',
    'mus_obj_images_field_data' => 'field_object_identifier',
    'sys_id' => 'field_ca_sec_id',
    'decipher_large_image_url' => 'field_image',
    'decipher_small_image_url' => 'field_image_thumb'
  );
}


/**
 * Map CA events fields to storyscope's events fields
 */
function ca_event_map()
{
  return array( 'title' => 'title',
    //'description' => '',
    'activity' => 'field_event_activity',
    'start_time' => 'field_event_start_time',
    'end_time' => 'field_event_end_time',
    'agent' => 'field_event_agent',
    'location' => 'field_event_location',
    'object' => 'field_event_object',
    'theme' => 'field_event_theme',
    'materials' => 'field_event_materials',
    'style_and_movement' => 'field_event_style_movement',
    'field_ca_sec_id' => 'field_ca_sec_id'
  );
}

/**
 * Map storyscope fields to europeana to implement field search
 */
function ca_europeana_fields_map()
{
  return array( 'title' => 'proxy_dc_title',
    'body' => 'proxy_dc_description',
    'field_object_creator' => 'proxy_dc_creator',
    'field_object_creation_date' => 'proxy_dc_date',
    'field_object_collection' => 'proxy_dc_source',
    'field_object_credit_line' => 'proxy_dc_rights',
  );
}


/**
 * return an index name given a facet name
 */
function ca_search_facets_index( $key )
{
  static $facets = array(
    'spec_object_production_person_field_data' => 'creator_facet',
    'spec_responsible_department_val' => 'collection_facet',
    'spec_material_field_val' => 'material_facet'
  );
  return $facets[ $key ];
}


/**
 * Search the content aggregator 
 */
function content_aggregator_search( $profile, $search_strings, $offset = 0, $limit = 16, $ca_options = null )
{
  $include_path = drupal_get_path( 'module', 'ca_search' ) . '/includes/';
  require_once( $include_path . 'SearchRetrieveService.php' );
  $wsdl = $include_path . 'SearchRetrieve.wsdl';

  $sc = @new SearchRetrieveService( $wsdl, $ca_options );

  // prepare the query
  $query = array( );
  $remote_pairs = array( );
  if( !empty( $search_strings[ 'remote' ] ) )
  {
    $remote_context = new pair();
    $remote_context->context = '*remote';
    $remote_context->value = empty( $search_strings[ 'local' ] ) ? '!local' : 'local';
    $query[ ] = $remote_context;
    foreach( $search_strings[ 'remote' ] as $key => $value )
    {
      $key = explode( ':', $key );
      $pair = new pair();
      $pair->context = $key[ 1 ];
      $pair->value = $value;
      $remote_context->value .= ',' . $key[ 0 ];
      $remote_pairs[ ] = $pair;
    }
  }
  if( !empty( $search_strings[ 'local' ] ) )
  {
    $pair = new pair();
    $pair->context = key( $search_strings[ 'local' ] );
    $pair->value = $search_strings[ 'local' ][ $pair->context ];
    $query[ ] = $pair;
  }
  $query = array_merge( $query, $remote_pairs );


  $req = new searchRetrieveRequestType();
  $req->profile = $profile;
  $req->query = $query;
  $req->startRecord = 1 + $offset;
  $req->maximumRecords = $limit;
  $req->resultSetId = isset( $ca_options[ 'lastRequestId' ] ) ?
    $ca_options[ 'lastRequestId' ] : '';

  // call the aggregator
  $results = $sc->SearchRetrieve( $req );
  // cache results
  return $results;
}



function content_aggregator_extract_facets( $facets, $facet_options )
{
  $res = array( );
  $extract_facets = $facet_options;
  $extract_facets = ($extract_facets ? $extract_facets : array( ));

  foreach( $facets as $facet )
  {
    foreach( $facet->FacetValue as $values)
    {
      if( array_key_exists( $facet->FacetContext, $extract_facets) && 
        $values->PartValue < $extract_facets[ $facet->FacetContext ][ 'min_count' ] )
        continue;
      $res[ $facet->FacetContext ][ ] = array(
        'filter' => '"' . $values->PartContext . '"',
        'count' => $values->PartValue,
      );
    }
    if( empty( $res[ $facet->FacetContext ] ) )
    {
      unset( $res[ $facet->FacetContext ] );
    }
  }
  return $res;
}

function content_aggregator_map( $map, $records, $key_field = 'field_ca_sec_id', $cache_result = true )
{
  global $user;
  $results = array( );
  foreach( $records->records as $record )
  {
    $res = array(
      'id' => NULL,
      'score' => NULL,
      'fields' => array( )
    );
    foreach( $record->contents as $field )
    {
      if( array_key_exists( $field->name, $map ) == TRUE )
      {
        $val = content_aggregator_extract_value( $field->value );
        if( !empty( $val ) )
        {
          $res[ 'fields' ][ $map[ $field->name ] ] = $val;
        }
      }
    }
    $id = is_array( $res[ 'fields' ][ $key_field ] ) ? $res[ 'fields' ][ $key_field ][ 0 ] :
      $res[ 'fields' ][ $key_field ];
    $res[ 'id' ] = urlencode( $record->name . ":" . $id );
    $res[ 'fields' ][ 'id' ] = $res[ 'id' ];
    $res[ 'score' ] = 1;
    $results[ $res[ 'id' ] ] = $res;
  }
  if( $cache_result )
  {
    $session_id = $user->sid;
    if( !isset( $session_id ) )
      $session_id = $user->ssid;
    cache_set( 'ca_search_results_' . $session_id, 
      $results, 
      'cache', 
      REQUEST_TIME + ( 3600 * 8 )
    ); // expire after 8 hours
  }
  return $results;
}

function content_aggregator_extract_value( $field_value )
{
  if( $field_value->type == 'text' )
  {
    return $field_value->u->text;
  }
  elseif( $field_value->type == 'num' )
  {
    return $field_value->u->num;
  }
  elseif( $field_value->type == 'list' )
  {
    return content_aggregator_extract_array( $field_value->u->list );
  }
  else
  {
    return null;
  }
}

function content_aggregator_extract_array( $arr )
{
  $ret = array( );

  foreach( $arr as $vf )
  {
    $val = content_aggregator_extract_value( $vf );
    $ret[ ] = $val;
  }
  return $ret;
}

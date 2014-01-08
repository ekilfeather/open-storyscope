<?php

/**
 * Add europeana filter for views on Decipher CA index
 */
function ca_search_views_data()
{
  $data = array( );

  if( module_exists( 'ca_search' ) )
  {
    foreach( search_api_index_load_multiple( FALSE ) as $index )
    {
      if( $index->item_type == 'ca_object' )
      {
        $data[ 'search_api_index_' . $index->machine_name ][ 'europeana' ] = array(
          'group' => t( 'Europeana' ),
          'real field' => 'europeana',
          'title' => t( 'Europeana search' ),
          'help' => t( 'Enable search through Europeana content' ),
          'filter' => array(
            'handler' => 'ca_search_handler_filter_europeana',
          ),
        );
      }
    }
  }
  return $data;
}

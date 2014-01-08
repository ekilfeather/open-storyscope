<?php

/**
 * Implements hook_views_data().
 */
function search_api_solr_views_data() {
  try {
    $data = array();
    $entity_types = entity_get_info();
    foreach (search_api_index_load_multiple(FALSE) as $index) {
      // Fill in base data.
      $key = 'search_api_index_' . $index->machine_name;
      $table = &$data[$key];

      $table['search_api_group_count']['group'] = t('Search');
      $table['search_api_group_count']['title'] = t('Group count');
      $table['search_api_group_count']['help'] = t('The number of matched records in a group for field collapsed queries.');
      $table['search_api_group_count']['field']['type'] = 'integer';
      $table['search_api_group_count']['field']['handler'] = 'entity_views_handler_field_numeric';
      $table['search_api_group_count']['field']['click sortable'] = TRUE;
      $table['search_api_group_count']['sort']['handler'] = 'SearchApiViewsHandlerSort';
    }
    return $data;
  }
  catch (Exception $e) {
    watchdog_exception('search_api_solr', $e);
  }
}


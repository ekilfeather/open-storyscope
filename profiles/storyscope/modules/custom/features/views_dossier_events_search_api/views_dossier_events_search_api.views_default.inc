<?php
/**
 * @file
 * views_dossier_events_search_api.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_dossier_events_search_api_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'dossier_events_search_api';
  $view->description = 'Takes a dossier nid as an argument and displays available (source) events.';
  $view->tag = 'default';
  $view->base_table = 'search_api_index_internal_search_index_nodes';
  $view->human_name = 'Dossier Events Search API';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'All Dossier Events';
  $handler->display->display_options['css_class'] = 'resource-container container-full narrow-items';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['search_api_bypass_access'] = 0;
  $handler->display->display_options['query']['options']['query_extenders'] = array(
    'settings' => array(
      'query__options__query_extenders__settings__active_tab' => 'edit-query-options-query-extenders-search-api-solr-collapse-settings',
    ),
    'search_api_solr_collapse' => array(
      'status' => 1,
      'weight' => '0',
      'settings' => array(
        'fields' => array(
          'field_event_source_event' => TRUE,
        ),
        'group_sort' => '',
        'group_sort_direction' => 'asc',
        'group_limit' => '1',
        'truncate' => 0,
        'group_facet' => 1,
      ),
    ),
  );
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '20';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'entity';
  $handler->display->display_options['row_options']['view_mode'] = 'teaser';
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'No events are available for addition.';
  $handler->display->display_options['empty']['area']['format'] = 'extra_html';
  /* Field: Indexed Node: Event Start Timestamp */
  $handler->display->display_options['fields']['field_event_start_timestamp']['id'] = 'field_event_start_timestamp';
  $handler->display->display_options['fields']['field_event_start_timestamp']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['fields']['field_event_start_timestamp']['field'] = 'field_event_start_timestamp';
  $handler->display->display_options['fields']['field_event_start_timestamp']['label'] = 'startDate';
  $handler->display->display_options['fields']['field_event_start_timestamp']['settings'] = array(
    'format_type' => 'year_month_day',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Indexed Node: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = 'headline';
  $handler->display->display_options['fields']['title']['link_to_entity'] = 0;
  /* Sort criterion: Indexed Node: Event Start Timestamp */
  $handler->display->display_options['sorts']['field_event_start_timestamp']['id'] = 'field_event_start_timestamp';
  $handler->display->display_options['sorts']['field_event_start_timestamp']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['sorts']['field_event_start_timestamp']['field'] = 'field_event_start_timestamp';
  /* Filter criterion: Indexed Node: Content type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'event' => 'event',
  );
  /* Filter criterion: Indexed Node: Status */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = array(
    1 => '1',
  );
  /* Filter criterion: Search: Fulltext search */
  $handler->display->display_options['filters']['search_api_views_fulltext']['id'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['filters']['search_api_views_fulltext']['field'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['exposed'] = TRUE;
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator_id'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['identifier'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
    4 => 0,
  );

  /* Display: grid view page */
  $handler = $view->new_display('page', 'grid view page', 'dossier_events_page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['query'] = FALSE;
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['search_api_bypass_access'] = 0;
  $handler->display->display_options['query']['options']['query_extenders'] = array(
    'settings' => array(
      'query__options__query_extenders__settings__active_tab' => 'edit-query-options-query-extenders-search-api-solr-collapse-settings',
    ),
    'search_api_solr_collapse' => array(
      'status' => 0,
      'weight' => '0',
      'settings' => array(
        'fields' => array(),
        'group_sort' => '',
        'group_sort_direction' => 'asc',
        'group_limit' => '1',
        'truncate' => 0,
        'group_facet' => 1,
      ),
    ),
  );
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entity';
  $handler->display->display_options['row_options']['view_mode'] = 'teaser';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['exposed_block'] = TRUE;
  $handler->display->display_options['path'] = 'dossiers/%/events/grid';
  $handler->display->display_options['menu']['type'] = 'default tab';
  $handler->display->display_options['menu']['title'] = 'Grid';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['context'] = 0;
  $handler->display->display_options['tab_options']['type'] = 'normal';
  $handler->display->display_options['tab_options']['title'] = 'Events';
  $handler->display->display_options['tab_options']['weight'] = '0';

  /* Display: Content pane */
  $handler = $view->new_display('panel_pane', 'Content pane', 'dossier_events_pane');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;

  /* Display: timeline pane */
  $handler = $view->new_display('panel_pane', 'timeline pane', 'dossier_events_pane_timeline');
  $handler->display->display_options['defaults']['use_ajax'] = FALSE;
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['link_display'] = FALSE;
  $handler->display->display_options['link_display'] = 'custom_url';
  $handler->display->display_options['link_url'] = 'dossiers/*/events/timeline';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['exposed_block'] = TRUE;

  /* Display: Map Page */
  $handler = $view->new_display('page', 'Map Page', 'map_page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'openlayers_map';
  $handler->display->display_options['style_options']['map'] = 'clone_of_geofield_formatter_map';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['exposed_block'] = TRUE;
  $handler->display->display_options['path'] = 'dossiers/%/events/map';
  $handler->display->display_options['menu']['type'] = 'tab';
  $handler->display->display_options['menu']['title'] = 'Map';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: OpenLayers Data Overlay */
  $handler = $view->new_display('openlayers', 'OpenLayers Data Overlay', 'openlayers_dossier_events');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'openlayers_data';
  $handler->display->display_options['style_options']['data_source'] = array(
    'value' => 'wkt',
    'other_lat' => 'field_event_start_timestamp',
    'other_lon' => 'field_event_start_timestamp',
    'wkt' => 'field_fb_geolocation_geom',
    'other_top' => 'field_event_start_timestamp',
    'other_right' => 'field_event_start_timestamp',
    'other_bottom' => 'field_event_start_timestamp',
    'other_left' => 'field_event_start_timestamp',
    'name_field' => 'title',
    'description_field' => 'field_event_start_timestamp',
    'style_field' => '',
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Indexed Node: FB Location */
  $handler->display->display_options['relationships']['field_fb_location']['id'] = 'field_fb_location';
  $handler->display->display_options['relationships']['field_fb_location']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['relationships']['field_fb_location']['field'] = 'field_fb_location';
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Indexed Node: Event Start Timestamp */
  $handler->display->display_options['fields']['field_event_start_timestamp']['id'] = 'field_event_start_timestamp';
  $handler->display->display_options['fields']['field_event_start_timestamp']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['fields']['field_event_start_timestamp']['field'] = 'field_event_start_timestamp';
  $handler->display->display_options['fields']['field_event_start_timestamp']['label'] = 'startDate';
  $handler->display->display_options['fields']['field_event_start_timestamp']['settings'] = array(
    'format_type' => 'year_only',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Indexed Node: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = 'headline';
  $handler->display->display_options['fields']['title']['link_to_entity'] = 0;
  /* Field: Field collection item: FB Geolocation » Well-known text */
  $handler->display->display_options['fields']['field_fb_geolocation_geom']['id'] = 'field_fb_geolocation_geom';
  $handler->display->display_options['fields']['field_fb_geolocation_geom']['table'] = 'entity_field_collection_item';
  $handler->display->display_options['fields']['field_fb_geolocation_geom']['field'] = 'field_fb_geolocation_geom';
  $handler->display->display_options['fields']['field_fb_geolocation_geom']['relationship'] = 'field_fb_location';
  $handler->display->display_options['fields']['field_fb_geolocation_geom']['link_to_entity'] = 0;

  /* Display: story_section_object_story_events_pane */
  $handler = $view->new_display('panel_pane', 'story_section_object_story_events_pane', 'story_section_dossier_events_pane');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;

  /* Display: Map pane */
  $handler = $view->new_display('panel_pane', 'Map pane', 'panel_pane_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = '<none>';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'openlayers_map';
  $handler->display->display_options['style_options']['map'] = 'clone_of_geofield_formatter_map';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Indexed Node: Content type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'event' => 'event',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Indexed Node: Status */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = array(
    1 => '1',
  );
  $handler->display->display_options['filters']['status']['group'] = 1;
  $translatables['dossier_events_search_api'] = array(
    t('Master'),
    t('All Dossier Events'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Items per page'),
    t('- All -'),
    t('Offset'),
    t('« first'),
    t('‹ previous'),
    t('next ›'),
    t('last »'),
    t('No events are available for addition.'),
    t('startDate'),
    t('headline'),
    t('grid view page'),
    t('Content pane'),
    t('View panes'),
    t('timeline pane'),
    t('Map Page'),
    t('OpenLayers Data Overlay'),
    t('FB Location'),
    t('FB Geolocation » Well-known text'),
    t('story_section_object_story_events_pane'),
    t('Map pane'),
    t('<none>'),
  );
  $export['dossier_events_search_api'] = $view;

  return $export;
}

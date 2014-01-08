<?php
/**
 * @file
 * views_object_story_add_events_searchapi.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_object_story_add_events_searchapi_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'object_story_events_add_existing_search_api';
  $view->description = 'Takes a dossier nid as an argument and displays available (source) events.';
  $view->tag = 'default';
  $view->base_table = 'search_api_index_internal_search_index_nodes';
  $view->human_name = 'Object Story Events add existing (search api)';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Add events  /';
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
  $handler->display->display_options['pager']['options']['items_per_page'] = '32';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'No events are available to be added.';
  $handler->display->display_options['empty']['area']['format'] = 'extra_html';
  /* Field: Indexed Node: Source event */
  $handler->display->display_options['fields']['field_event_source_event']['id'] = 'field_event_source_event';
  $handler->display->display_options['fields']['field_event_source_event']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['fields']['field_event_source_event']['field'] = 'field_event_source_event';
  $handler->display->display_options['fields']['field_event_source_event']['label'] = '';
  $handler->display->display_options['fields']['field_event_source_event']['element_type'] = '0';
  $handler->display->display_options['fields']['field_event_source_event']['element_class'] = 'content';
  $handler->display->display_options['fields']['field_event_source_event']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_event_source_event']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_event_source_event']['link_to_entity'] = 0;
  $handler->display->display_options['fields']['field_event_source_event']['display'] = 'view';
  $handler->display->display_options['fields']['field_event_source_event']['view_mode'] = 'teaser';
  /* Sort criterion: Indexed Node: Event Start Timestamp */
  $handler->display->display_options['sorts']['field_event_start_timestamp']['id'] = 'field_event_start_timestamp';
  $handler->display->display_options['sorts']['field_event_start_timestamp']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['sorts']['field_event_start_timestamp']['field'] = 'field_event_start_timestamp';
  /* Filter criterion: Search: Fulltext search */
  $handler->display->display_options['filters']['search_api_views_fulltext']['id'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['filters']['search_api_views_fulltext']['field'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['exposed'] = TRUE;
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator_id'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['label'] = 'Search';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['identifier'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  $handler->display->display_options['filters']['search_api_views_fulltext']['fields'] = array(
    'title' => 'title',
    'body:value' => 'body:value',
  );
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

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page_add_event');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['path'] = 'dossiers/%/objectstories/%/events/addexisting';

  /* Display: Page (with dossier context) */
  $handler = $view->new_display('page', 'Page (with dossier context)', 'page_add_event_dossier_context');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['path'] = 'dossiers/%/objectstories/%/events/addexisting';

  /* Display: Page (with dossier context) */
  $handler = $view->new_display('page', 'Page (with dossier context)', 'page_add_event_dossier_context_internal');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['exposed_block'] = TRUE;
  $handler->display->display_options['path'] = 'dossiers/%/objectstories/%/events/search/internal';
  $handler->display->display_options['menu']['type'] = 'default tab';
  $handler->display->display_options['menu']['title'] = 'Internal';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['context'] = 0;
  $handler->display->display_options['tab_options']['type'] = 'normal';
  $handler->display->display_options['tab_options']['title'] = 'search';
  $handler->display->display_options['tab_options']['weight'] = '0';

  /* Display: Timeline */
  $handler = $view->new_display('page', 'Timeline', 'page_timeline');
  $handler->display->display_options['display_description'] = 'Timeline is like a page display but displays all nodes.';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['path'] = 'dossiers/%/objectstories/%/events/search/internal';
  $handler->display->display_options['menu']['type'] = 'default tab';
  $handler->display->display_options['menu']['title'] = 'Internal';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['context'] = 0;
  $handler->display->display_options['tab_options']['type'] = 'normal';
  $handler->display->display_options['tab_options']['title'] = 'search';
  $handler->display->display_options['tab_options']['weight'] = '0';
  $export['object_story_events_add_existing_search_api'] = $view;

  return $export;
}

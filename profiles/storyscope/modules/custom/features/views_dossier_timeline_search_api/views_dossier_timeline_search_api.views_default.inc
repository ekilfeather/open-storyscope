<?php
/**
 * @file
 * views_dossier_timeline_search_api.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_dossier_timeline_search_api_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'dossier_events_timeline_search_api';
  $view->description = 'Takes a dossier nid as an argument and displays available (source) events.';
  $view->tag = 'default';
  $view->base_table = 'search_api_index_internal_search_index_nodes';
  $view->human_name = 'Dossier Events Timeline (search api)';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Events Timeline';
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
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '70';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'views_json';
  $handler->display->display_options['style_options']['root_object'] = 'timeline';
  $handler->display->display_options['style_options']['top_child_object'] = 'date';
  $handler->display->display_options['style_options']['plaintext_output'] = 1;
  $handler->display->display_options['style_options']['remove_newlines'] = 0;
  $handler->display->display_options['style_options']['jsonp_prefix'] = '';
  $handler->display->display_options['style_options']['using_views_api_mode'] = 1;
  $handler->display->display_options['style_options']['object_arrays'] = 0;
  $handler->display->display_options['style_options']['numeric_strings'] = 0;
  $handler->display->display_options['style_options']['bigint_string'] = 0;
  $handler->display->display_options['style_options']['pretty_print'] = 0;
  $handler->display->display_options['style_options']['unescaped_slashes'] = 0;
  $handler->display->display_options['style_options']['unescaped_unicode'] = 0;
  $handler->display->display_options['style_options']['char_encoding'] = array();
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'No events are available to be added.';
  $handler->display->display_options['empty']['area']['format'] = 'extra_html';
  /* Field: Indexed Node: Event Start Timestamp */
  $handler->display->display_options['fields']['field_event_start_timestamp']['id'] = 'field_event_start_timestamp';
  $handler->display->display_options['fields']['field_event_start_timestamp']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['fields']['field_event_start_timestamp']['field'] = 'field_event_start_timestamp';
  $handler->display->display_options['fields']['field_event_start_timestamp']['label'] = 'startDate';
  $handler->display->display_options['fields']['field_event_start_timestamp']['settings'] = array(
    'format_type' => 'timeline_date',
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
  /* Sort criterion: Search: Relevance */
  $handler->display->display_options['sorts']['search_api_relevance']['id'] = 'search_api_relevance';
  $handler->display->display_options['sorts']['search_api_relevance']['table'] = 'search_api_index_internal_search_index_nodes';
  $handler->display->display_options['sorts']['search_api_relevance']['field'] = 'search_api_relevance';
  $handler->display->display_options['sorts']['search_api_relevance']['order'] = 'DESC';
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
  $handler = $view->new_display('page', 'Page', 'page_timeline');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['path'] = 'dossiers/%/events/timeline/json';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'timeline_data_page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['path'] = 'dossiers/%/events/timeline/page';
  $export['dossier_events_timeline_search_api'] = $view;

  return $export;
}

<?php
/**
 * @file
 * views_dossier_events_add_existing.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_dossier_events_add_existing_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'dossier_events_add_existing';
  $view->description = 'Takes a dossier nid as an argument and displays available (source) events';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Dossier events add existing';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Add an event to this Dossier';
  $handler->display->display_options['css_class'] = 'resource-container container_full narrow-items';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '12';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['links'] = FALSE;
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'No available events were found.';
  $handler->display->display_options['empty']['area']['format'] = 'extra_html';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'source_event' => 'source_event',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page_dossier_events_add');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  $handler->display->display_options['path'] = 'dossiers/%/events/addexisting';

  /* Display: Block ( a subquery) */
  $handler = $view->new_display('block', 'Block ( a subquery)', 'block_dossier_events');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Events in this dossier';
  $handler->display->display_options['display_description'] = 'Used as a subquery ';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Relationship: Entity Reference: Referencing entity */
  $handler->display->display_options['relationships']['reverse_field_event_source_event_node']['id'] = 'reverse_field_event_source_event_node';
  $handler->display->display_options['relationships']['reverse_field_event_source_event_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_event_source_event_node']['field'] = 'reverse_field_event_source_event_node';
  $handler->display->display_options['relationships']['reverse_field_event_source_event_node']['label'] = 'Event using this source event';
  /* Relationship: Entity Reference: Referencing entity */
  $handler->display->display_options['relationships']['reverse_field_dossier_events_node']['id'] = 'reverse_field_dossier_events_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_events_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_dossier_events_node']['field'] = 'reverse_field_dossier_events_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_events_node']['relationship'] = 'reverse_field_event_source_event_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_events_node']['label'] = 'Dossier using this event';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid_1']['id'] = 'nid_1';
  $handler->display->display_options['arguments']['nid_1']['table'] = 'node';
  $handler->display->display_options['arguments']['nid_1']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid_1']['relationship'] = 'reverse_field_dossier_events_node';
  $handler->display->display_options['arguments']['nid_1']['default_action'] = 'not found';
  $handler->display->display_options['arguments']['nid_1']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['nid_1']['default_argument_options']['index'] = '1';
  $handler->display->display_options['arguments']['nid_1']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid_1']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid_1']['summary_options']['items_per_page'] = '25';

  /* Display: Content pane */
  $handler = $view->new_display('panel_pane', 'Content pane', 'panel_pane_dossier_events_add');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $export['dossier_events_add_existing'] = $view;

  return $export;
}

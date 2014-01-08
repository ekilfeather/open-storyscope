<?php
/**
 * @file
 * views_dossier_activity.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_dossier_activity_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'dossier_activity';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Dossier Activity';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Dossier Activity';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['disable_sql_rewrite'] = TRUE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'highlight';
  $handler->display->display_options['row_options']['links'] = FALSE;
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'There has been no activity on this dossier.';
  $handler->display->display_options['empty']['area']['format'] = 'extra_html';
  /* Relationship: Dossier containing object stories */
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node']['id'] = 'reverse_field_dossier_object_stories_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node']['field'] = 'reverse_field_dossier_object_stories_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node']['ui_name'] = 'Dossier containing object stories';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node']['label'] = 'Dossier containing object stories';
  /* Relationship: Dossier containing references */
  $handler->display->display_options['relationships']['reverse_field_dossier_references_node']['id'] = 'reverse_field_dossier_references_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_references_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_dossier_references_node']['field'] = 'reverse_field_dossier_references_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_references_node']['ui_name'] = 'Dossier containing references';
  $handler->display->display_options['relationships']['reverse_field_dossier_references_node']['label'] = 'Dossier containing references';
  /* Relationship: Dossier containing events */
  $handler->display->display_options['relationships']['reverse_field_dossier_events_node']['id'] = 'reverse_field_dossier_events_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_events_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_dossier_events_node']['field'] = 'reverse_field_dossier_events_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_events_node']['ui_name'] = 'Dossier containing events';
  $handler->display->display_options['relationships']['reverse_field_dossier_events_node']['label'] = 'Dossier containing events';
  /* Relationship: Object story containing an object */
  $handler->display->display_options['relationships']['reverse_field_object_story_objects_node']['id'] = 'reverse_field_object_story_objects_node';
  $handler->display->display_options['relationships']['reverse_field_object_story_objects_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_object_story_objects_node']['field'] = 'reverse_field_object_story_objects_node';
  $handler->display->display_options['relationships']['reverse_field_object_story_objects_node']['ui_name'] = 'Object story containing an object';
  $handler->display->display_options['relationships']['reverse_field_object_story_objects_node']['label'] = 'Object story containing an object';
  /* Relationship: Object -&gt; Object stories in a dossier */
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_1']['id'] = 'reverse_field_dossier_object_stories_node_1';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_1']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_1']['field'] = 'reverse_field_dossier_object_stories_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_1']['relationship'] = 'reverse_field_object_story_objects_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_1']['ui_name'] = 'Object -> Object stories in a dossier';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_1']['label'] = 'Object -> Object stories in a dossier';
  /* Relationship: References in an object story */
  $handler->display->display_options['relationships']['reverse_field_object_story_references_node']['id'] = 'reverse_field_object_story_references_node';
  $handler->display->display_options['relationships']['reverse_field_object_story_references_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_object_story_references_node']['field'] = 'reverse_field_object_story_references_node';
  $handler->display->display_options['relationships']['reverse_field_object_story_references_node']['ui_name'] = 'References in an object story';
  $handler->display->display_options['relationships']['reverse_field_object_story_references_node']['label'] = 'References in an object story';
  /* Relationship: References -&gt; Object stories in a dossier */
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_2']['id'] = 'reverse_field_dossier_object_stories_node_2';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_2']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_2']['field'] = 'reverse_field_dossier_object_stories_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_2']['relationship'] = 'reverse_field_object_story_references_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_2']['ui_name'] = 'References -> Object stories in a dossier';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_2']['label'] = 'References -> Object stories in a dossier';
  /* Relationship: Events in an object story */
  $handler->display->display_options['relationships']['reverse_field_object_story_events_node']['id'] = 'reverse_field_object_story_events_node';
  $handler->display->display_options['relationships']['reverse_field_object_story_events_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_object_story_events_node']['field'] = 'reverse_field_object_story_events_node';
  $handler->display->display_options['relationships']['reverse_field_object_story_events_node']['ui_name'] = 'Events in an object story';
  $handler->display->display_options['relationships']['reverse_field_object_story_events_node']['label'] = 'Events in an object story';
  /* Relationship: Events -&gt; Object stories in a dossier */
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_3']['id'] = 'reverse_field_dossier_object_stories_node_3';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_3']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_3']['field'] = 'reverse_field_dossier_object_stories_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_3']['relationship'] = 'reverse_field_object_story_events_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_3']['ui_name'] = 'Events -> Object stories in a dossier';
  $handler->display->display_options['relationships']['reverse_field_dossier_object_stories_node_3']['label'] = 'Events -> Object stories in a dossier';
  /* Relationship: Plots in a dossier */
  $handler->display->display_options['relationships']['reverse_field_dossier_plots_node']['id'] = 'reverse_field_dossier_plots_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_plots_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_dossier_plots_node']['field'] = 'reverse_field_dossier_plots_node';
  $handler->display->display_options['relationships']['reverse_field_dossier_plots_node']['ui_name'] = 'Plots in a dossier';
  $handler->display->display_options['relationships']['reverse_field_dossier_plots_node']['label'] = 'Plots in a dossier';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Sort criterion: Content: Updated date */
  $handler->display->display_options['sorts']['changed']['id'] = 'changed';
  $handler->display->display_options['sorts']['changed']['table'] = 'node';
  $handler->display->display_options['sorts']['changed']['field'] = 'changed';
  $handler->display->display_options['sorts']['changed']['order'] = 'DESC';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid_3']['id'] = 'nid_3';
  $handler->display->display_options['arguments']['nid_3']['table'] = 'node';
  $handler->display->display_options['arguments']['nid_3']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid_3']['relationship'] = 'reverse_field_dossier_object_stories_node_1';
  $handler->display->display_options['arguments']['nid_3']['default_action'] = 'not found';
  $handler->display->display_options['arguments']['nid_3']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['nid_3']['default_argument_options']['index'] = '1';
  $handler->display->display_options['arguments']['nid_3']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid_3']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid_3']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['relationship'] = 'reverse_field_dossier_object_stories_node';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['nid']['default_argument_options']['index'] = '1';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid_4']['id'] = 'nid_4';
  $handler->display->display_options['arguments']['nid_4']['table'] = 'node';
  $handler->display->display_options['arguments']['nid_4']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid_4']['relationship'] = 'reverse_field_dossier_object_stories_node_2';
  $handler->display->display_options['arguments']['nid_4']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid_4']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['nid_4']['default_argument_options']['index'] = '1';
  $handler->display->display_options['arguments']['nid_4']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid_4']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid_4']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid_5']['id'] = 'nid_5';
  $handler->display->display_options['arguments']['nid_5']['table'] = 'node';
  $handler->display->display_options['arguments']['nid_5']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid_5']['relationship'] = 'reverse_field_dossier_object_stories_node_3';
  $handler->display->display_options['arguments']['nid_5']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid_5']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['nid_5']['default_argument_options']['index'] = '1';
  $handler->display->display_options['arguments']['nid_5']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid_5']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid_5']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid_1']['id'] = 'nid_1';
  $handler->display->display_options['arguments']['nid_1']['table'] = 'node';
  $handler->display->display_options['arguments']['nid_1']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid_1']['relationship'] = 'reverse_field_dossier_references_node';
  $handler->display->display_options['arguments']['nid_1']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid_1']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['nid_1']['default_argument_options']['index'] = '1';
  $handler->display->display_options['arguments']['nid_1']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid_1']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid_1']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid_2']['id'] = 'nid_2';
  $handler->display->display_options['arguments']['nid_2']['table'] = 'node';
  $handler->display->display_options['arguments']['nid_2']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid_2']['relationship'] = 'reverse_field_dossier_events_node';
  $handler->display->display_options['arguments']['nid_2']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid_2']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['nid_2']['default_argument_options']['index'] = '1';
  $handler->display->display_options['arguments']['nid_2']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid_2']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid_2']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid_6']['id'] = 'nid_6';
  $handler->display->display_options['arguments']['nid_6']['table'] = 'node';
  $handler->display->display_options['arguments']['nid_6']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid_6']['relationship'] = 'reverse_field_dossier_plots_node';
  $handler->display->display_options['arguments']['nid_6']['default_action'] = 'default';
  $handler->display->display_options['arguments']['nid_6']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['nid_6']['default_argument_options']['index'] = '1';
  $handler->display->display_options['arguments']['nid_6']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid_6']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid_6']['summary_options']['items_per_page'] = '25';
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
    'object_story' => 'object_story',
  );
  /* Filter criterion: Content access: Access */
  $handler->display->display_options['filters']['nid']['id'] = 'nid';
  $handler->display->display_options['filters']['nid']['table'] = 'node_access';
  $handler->display->display_options['filters']['nid']['field'] = 'nid';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '32';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['path'] = 'dossiers/%/activity';

  /* Display: Content pane */
  $handler = $view->new_display('panel_pane', 'Content pane', 'panel_pane_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = '<h2 id="recentactivity">Most Recent Activity</h2>';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['argument_input'] = array(
    'nid_3' => array(
      'type' => 'panel',
      'context' => 'entity:bean.delta',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Nid',
    ),
    'nid' => array(
      'type' => 'panel',
      'context' => 'entity:bean.delta',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Nid',
    ),
    'nid_4' => array(
      'type' => 'panel',
      'context' => 'entity:bean.delta',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Nid',
    ),
    'nid_5' => array(
      'type' => 'panel',
      'context' => 'entity:bean.delta',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Nid',
    ),
    'nid_1' => array(
      'type' => 'panel',
      'context' => 'entity:bean.delta',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Nid',
    ),
    'nid_2' => array(
      'type' => 'panel',
      'context' => 'entity:bean.delta',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Nid',
    ),
    'nid_6' => array(
      'type' => 'panel',
      'context' => 'entity:bean.delta',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'Content: Nid',
    ),
  );
  $export['dossier_activity'] = $view;

  return $export;
}

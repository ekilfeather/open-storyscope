<?php
/**
 * @file
 * views_narrative_plot_elements.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_narrative_plot_elements_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'narrative_plot_elements';
  $view->description = 'Takes NID of a plot and lists all its plot elements.';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Narrative plot elements';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Events in this narrative';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['distinct'] = TRUE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'This plot does not seem to contain any events yet.';
  $handler->display->display_options['empty']['area']['format'] = 'extra_html';
  /* Relationship: Plot referencing a plot element */
  $handler->display->display_options['relationships']['reverse_field_plot_plot_elements_node']['id'] = 'reverse_field_plot_plot_elements_node';
  $handler->display->display_options['relationships']['reverse_field_plot_plot_elements_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_plot_plot_elements_node']['field'] = 'reverse_field_plot_plot_elements_node';
  $handler->display->display_options['relationships']['reverse_field_plot_plot_elements_node']['ui_name'] = 'Plot referencing a plot element';
  $handler->display->display_options['relationships']['reverse_field_plot_plot_elements_node']['label'] = 'Plot referencing a plot element';
  /* Relationship: Narrative referencing a plot */
  $handler->display->display_options['relationships']['reverse_field_narrative_plot_node']['id'] = 'reverse_field_narrative_plot_node';
  $handler->display->display_options['relationships']['reverse_field_narrative_plot_node']['table'] = 'node';
  $handler->display->display_options['relationships']['reverse_field_narrative_plot_node']['field'] = 'reverse_field_narrative_plot_node';
  $handler->display->display_options['relationships']['reverse_field_narrative_plot_node']['relationship'] = 'reverse_field_plot_plot_elements_node';
  $handler->display->display_options['relationships']['reverse_field_narrative_plot_node']['ui_name'] = 'Narrative referencing a plot';
  $handler->display->display_options['relationships']['reverse_field_narrative_plot_node']['label'] = 'Narrative referencing a plot';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Sort criterion: Content: Title */
  $handler->display->display_options['sorts']['title']['id'] = 'title';
  $handler->display->display_options['sorts']['title']['table'] = 'node';
  $handler->display->display_options['sorts']['title']['field'] = 'title';
  $handler->display->display_options['sorts']['title']['relationship'] = 'field_plot_plot_elements_target_id';
  /* Contextual filter: Content: Narrative Set (field_narrative_set) */
  $handler->display->display_options['arguments']['field_narrative_set_value']['id'] = 'field_narrative_set_value';
  $handler->display->display_options['arguments']['field_narrative_set_value']['table'] = 'field_data_field_narrative_set';
  $handler->display->display_options['arguments']['field_narrative_set_value']['field'] = 'field_narrative_set_value';
  $handler->display->display_options['arguments']['field_narrative_set_value']['relationship'] = 'reverse_field_narrative_plot_node';
  $handler->display->display_options['arguments']['field_narrative_set_value']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_narrative_set_value']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['field_narrative_set_value']['default_argument_options']['index'] = '2';
  $handler->display->display_options['arguments']['field_narrative_set_value']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_narrative_set_value']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_narrative_set_value']['summary_options']['items_per_page'] = '25';
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['relationship'] = 'reverse_field_narrative_plot_node';
  $handler->display->display_options['filters']['type']['value'] = array(
    'narrative_microsite' => 'narrative_microsite',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status_2']['id'] = 'status_2';
  $handler->display->display_options['filters']['status_2']['table'] = 'node';
  $handler->display->display_options['filters']['status_2']['field'] = 'status';
  $handler->display->display_options['filters']['status_2']['relationship'] = 'reverse_field_narrative_plot_node';
  $handler->display->display_options['filters']['status_2']['value'] = '1';
  $handler->display->display_options['filters']['status_2']['group'] = 1;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type_1']['id'] = 'type_1';
  $handler->display->display_options['filters']['type_1']['table'] = 'node';
  $handler->display->display_options['filters']['type_1']['field'] = 'type';
  $handler->display->display_options['filters']['type_1']['relationship'] = 'reverse_field_plot_plot_elements_node';
  $handler->display->display_options['filters']['type_1']['value'] = array(
    'plot' => 'plot',
  );
  $handler->display->display_options['filters']['type_1']['group'] = 1;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status_1']['id'] = 'status_1';
  $handler->display->display_options['filters']['status_1']['table'] = 'node';
  $handler->display->display_options['filters']['status_1']['field'] = 'status';
  $handler->display->display_options['filters']['status_1']['relationship'] = 'reverse_field_plot_plot_elements_node';
  $handler->display->display_options['filters']['status_1']['value'] = '1';
  $handler->display->display_options['filters']['status_1']['group'] = 1;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type_2']['id'] = 'type_2';
  $handler->display->display_options['filters']['type_2']['table'] = 'node';
  $handler->display->display_options['filters']['type_2']['field'] = 'type';
  $handler->display->display_options['filters']['type_2']['value'] = array(
    'plot_element' => 'plot_element',
  );
  $handler->display->display_options['filters']['type_2']['group'] = 1;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = '1';
  $handler->display->display_options['filters']['status']['group'] = 1;

  /* Display: Entity Reference - narrative nid arg */
  $handler = $view->new_display('entityreference', 'Entity Reference - narrative nid arg', 'entityreference_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'entityreference_style';
  $handler->display->display_options['style_options']['search_fields'] = array(
    'title' => 'title',
    'nid' => 0,
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entityreference_fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['relationship'] = 'reverse_field_narrative_plot_node';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'not found';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';
  $export['narrative_plot_elements'] = $view;

  return $export;
}

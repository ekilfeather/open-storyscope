<?php
/**
 * @file
 * views_similarity_dossier_event.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_similarity_dossier_event_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'similarity_dossier_events';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'xml';
  $view->human_name = 'Similarity dossier events';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Events extracted from descriptions';
  $handler->display->display_options['css_class'] = 'resource-container container-full narrow-items';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['xml_file'] = 'web.config';
  $handler->display->display_options['query']['options']['row_xpath'] = '/data/events/item';
  $handler->display->display_options['query']['options']['show_errors'] = 1;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['inline'] = array(
    'text' => 'text',
  );
  /* Field: Global: View result counter */
  $handler->display->display_options['fields']['counter']['id'] = 'counter';
  $handler->display->display_options['fields']['counter']['table'] = 'views';
  $handler->display->display_options['fields']['counter']['field'] = 'counter';
  $handler->display->display_options['fields']['counter']['label'] = '';
  $handler->display->display_options['fields']['counter']['exclude'] = TRUE;
  $handler->display->display_options['fields']['counter']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['counter']['counter_start'] = '1';
  /* Field: title: Text */
  $handler->display->display_options['fields']['text']['id'] = 'text';
  $handler->display->display_options['fields']['text']['table'] = 'xml';
  $handler->display->display_options['fields']['text']['field'] = 'text';
  $handler->display->display_options['fields']['text']['label'] = '';
  $handler->display->display_options['fields']['text']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['path'] = 'event';
  $handler->display->display_options['fields']['text']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text']['xpath_selector'] = 'title';
  $handler->display->display_options['fields']['text']['multiple'] = 0;
  /* Field: agent/item: Text */
  $handler->display->display_options['fields']['text_1']['id'] = 'text_1';
  $handler->display->display_options['fields']['text_1']['table'] = 'xml';
  $handler->display->display_options['fields']['text_1']['field'] = 'text';
  $handler->display->display_options['fields']['text_1']['label'] = 'Agent';
  $handler->display->display_options['fields']['text_1']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['text_1']['xpath_selector'] = 'agent/item';
  $handler->display->display_options['fields']['text_1']['multiple'] = 1;
  $handler->display->display_options['fields']['text_1']['list_type'] = 'other';
  /* Field: activity/item: Text */
  $handler->display->display_options['fields']['text_2']['id'] = 'text_2';
  $handler->display->display_options['fields']['text_2']['table'] = 'xml';
  $handler->display->display_options['fields']['text_2']['field'] = 'text';
  $handler->display->display_options['fields']['text_2']['label'] = 'Activity';
  $handler->display->display_options['fields']['text_2']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['text_2']['xpath_selector'] = 'activity/item';
  $handler->display->display_options['fields']['text_2']['multiple'] = 1;
  $handler->display->display_options['fields']['text_2']['list_type'] = 'other';
  /* Field: object/item: Text */
  $handler->display->display_options['fields']['text_3']['id'] = 'text_3';
  $handler->display->display_options['fields']['text_3']['table'] = 'xml';
  $handler->display->display_options['fields']['text_3']['field'] = 'text';
  $handler->display->display_options['fields']['text_3']['label'] = 'Object';
  $handler->display->display_options['fields']['text_3']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['text_3']['xpath_selector'] = 'object/item';
  $handler->display->display_options['fields']['text_3']['multiple'] = 1;
  $handler->display->display_options['fields']['text_3']['list_type'] = 'other';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<article class="node-event node-teaser">
<div class="article-inner">
<p class="type-identifier">Event</p> 
<h2>[text]</h2>
<p class="suggest add-event"><a href="../dossier/!1/similarity_add_event/[counter]">+ add</a></p>
</div>
</article>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Contextual filter: XML: Pass through */
  $handler->display->display_options['arguments']['passthru']['id'] = 'passthru';
  $handler->display->display_options['arguments']['passthru']['table'] = 'xml';
  $handler->display->display_options['arguments']['passthru']['field'] = 'passthru';
  $handler->display->display_options['arguments']['passthru']['default_action'] = 'not found';
  $handler->display->display_options['arguments']['passthru']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['passthru']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['passthru']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['passthru']['summary_options']['items_per_page'] = '25';
  /* Filter criterion: description: Text */
  $handler->display->display_options['filters']['text']['id'] = 'text';
  $handler->display->display_options['filters']['text']['table'] = 'xml';
  $handler->display->display_options['filters']['text']['field'] = 'text';
  $handler->display->display_options['filters']['text']['operator'] = 'contains';
  $handler->display->display_options['filters']['text']['exposed'] = TRUE;
  $handler->display->display_options['filters']['text']['expose']['operator_id'] = 'text_op';
  $handler->display->display_options['filters']['text']['expose']['label'] = 'Search';
  $handler->display->display_options['filters']['text']['expose']['operator'] = 'text_op';
  $handler->display->display_options['filters']['text']['expose']['identifier'] = 'text';
  $handler->display->display_options['filters']['text']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
    4 => 0,
  );
  $handler->display->display_options['filters']['text']['xpath_selector'] = 'description';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['path'] = 'dossiers/%/similarity_dossier_events_full';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page_similarity_dossier_events');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '32';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['inline'] = array(
    'text' => 'text',
  );
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Global: View result counter */
  $handler->display->display_options['fields']['counter']['id'] = 'counter';
  $handler->display->display_options['fields']['counter']['table'] = 'views';
  $handler->display->display_options['fields']['counter']['field'] = 'counter';
  $handler->display->display_options['fields']['counter']['label'] = '';
  $handler->display->display_options['fields']['counter']['exclude'] = TRUE;
  $handler->display->display_options['fields']['counter']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['counter']['counter_start'] = '1';
  /* Field: title: Text */
  $handler->display->display_options['fields']['text']['id'] = 'text';
  $handler->display->display_options['fields']['text']['table'] = 'xml';
  $handler->display->display_options['fields']['text']['field'] = 'text';
  $handler->display->display_options['fields']['text']['label'] = '';
  $handler->display->display_options['fields']['text']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['path'] = 'event';
  $handler->display->display_options['fields']['text']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text']['xpath_selector'] = 'title';
  $handler->display->display_options['fields']['text']['multiple'] = 0;
  /* Field: agent/item: Text */
  $handler->display->display_options['fields']['text_1']['id'] = 'text_1';
  $handler->display->display_options['fields']['text_1']['table'] = 'xml';
  $handler->display->display_options['fields']['text_1']['field'] = 'text';
  $handler->display->display_options['fields']['text_1']['label'] = 'Agent';
  $handler->display->display_options['fields']['text_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_1']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['text_1']['xpath_selector'] = 'agent/item';
  $handler->display->display_options['fields']['text_1']['multiple'] = 1;
  $handler->display->display_options['fields']['text_1']['list_type'] = 'other';
  /* Field: activity/item: Text */
  $handler->display->display_options['fields']['text_2']['id'] = 'text_2';
  $handler->display->display_options['fields']['text_2']['table'] = 'xml';
  $handler->display->display_options['fields']['text_2']['field'] = 'text';
  $handler->display->display_options['fields']['text_2']['label'] = 'Activity';
  $handler->display->display_options['fields']['text_2']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_2']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['text_2']['xpath_selector'] = 'activity/item';
  $handler->display->display_options['fields']['text_2']['multiple'] = 1;
  $handler->display->display_options['fields']['text_2']['list_type'] = 'other';
  /* Field: object/item: Text */
  $handler->display->display_options['fields']['text_3']['id'] = 'text_3';
  $handler->display->display_options['fields']['text_3']['table'] = 'xml';
  $handler->display->display_options['fields']['text_3']['field'] = 'text';
  $handler->display->display_options['fields']['text_3']['label'] = 'Object';
  $handler->display->display_options['fields']['text_3']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_3']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['text_3']['xpath_selector'] = 'object/item';
  $handler->display->display_options['fields']['text_3']['multiple'] = 1;
  $handler->display->display_options['fields']['text_3']['list_type'] = 'other';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<article class="node-event node-teaser">
<div class="article-inner">
<p class="type-identifier">Event</p> 
<h2>[text]</h2>
<p class="suggest add-event"><a href="!1/similarity_add_event/[counter]">+ add</a></p>
</div>
</article>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  $handler->display->display_options['path'] = 'dossiers/%/similarity_dossier_events';

  /* Display: Content pane */
  $handler = $view->new_display('panel_pane', 'Content pane', 'panel_similarity_dossier_events');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '32';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['style_options']['row_class_special'] = FALSE;
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Global: View result counter */
  $handler->display->display_options['fields']['counter']['id'] = 'counter';
  $handler->display->display_options['fields']['counter']['table'] = 'views';
  $handler->display->display_options['fields']['counter']['field'] = 'counter';
  $handler->display->display_options['fields']['counter']['label'] = '';
  $handler->display->display_options['fields']['counter']['exclude'] = TRUE;
  $handler->display->display_options['fields']['counter']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['counter']['counter_start'] = '1';
  /* Field: title: Text */
  $handler->display->display_options['fields']['text']['id'] = 'text';
  $handler->display->display_options['fields']['text']['table'] = 'xml';
  $handler->display->display_options['fields']['text']['field'] = 'text';
  $handler->display->display_options['fields']['text']['label'] = '';
  $handler->display->display_options['fields']['text']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['path'] = 'event';
  $handler->display->display_options['fields']['text']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text']['xpath_selector'] = 'title';
  $handler->display->display_options['fields']['text']['multiple'] = 0;
  /* Field: agent/item: Text */
  $handler->display->display_options['fields']['text_1']['id'] = 'text_1';
  $handler->display->display_options['fields']['text_1']['table'] = 'xml';
  $handler->display->display_options['fields']['text_1']['field'] = 'text';
  $handler->display->display_options['fields']['text_1']['label'] = 'Agent';
  $handler->display->display_options['fields']['text_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_1']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['text_1']['xpath_selector'] = 'agent/item';
  $handler->display->display_options['fields']['text_1']['multiple'] = 1;
  $handler->display->display_options['fields']['text_1']['list_type'] = 'other';
  /* Field: activity/item: Text */
  $handler->display->display_options['fields']['text_2']['id'] = 'text_2';
  $handler->display->display_options['fields']['text_2']['table'] = 'xml';
  $handler->display->display_options['fields']['text_2']['field'] = 'text';
  $handler->display->display_options['fields']['text_2']['label'] = 'Activity';
  $handler->display->display_options['fields']['text_2']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_2']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['text_2']['xpath_selector'] = 'activity/item';
  $handler->display->display_options['fields']['text_2']['multiple'] = 1;
  $handler->display->display_options['fields']['text_2']['list_type'] = 'other';
  /* Field: object/item: Text */
  $handler->display->display_options['fields']['text_3']['id'] = 'text_3';
  $handler->display->display_options['fields']['text_3']['table'] = 'xml';
  $handler->display->display_options['fields']['text_3']['field'] = 'text';
  $handler->display->display_options['fields']['text_3']['label'] = 'Object';
  $handler->display->display_options['fields']['text_3']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_3']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['text_3']['xpath_selector'] = 'object/item';
  $handler->display->display_options['fields']['text_3']['multiple'] = 1;
  $handler->display->display_options['fields']['text_3']['list_type'] = 'other';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<article class="node-event node-teaser">
<div class="article-inner">
<p class="type-identifier">Event</p> 
<h2>[text]</h2>
<p class="suggest add-event"><a href="../dossier/!1/similarity_add_event/[counter]">+ add</a></p>
</div>
</article>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nothing']['element_default_classes'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  $translatables['similarity_dossier_events'] = array(
    t('Master'),
    t('Events extracted from descriptions'),
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
    t('Agent'),
    t('Activity'),
    t('Object'),
    t('<article class="node-event node-teaser">
<div class="article-inner">
<p class="type-identifier">Event</p> 
<h2>[text]</h2>
<p class="suggest add-event"><a href="../dossier/!1/similarity_add_event/[counter]">+ add</a></p>
</div>
</article>'),
    t('All'),
    t('Search'),
    t('Page'),
    t('<article class="node-event node-teaser">
<div class="article-inner">
<p class="type-identifier">Event</p> 
<h2>[text]</h2>
<p class="suggest add-event"><a href="!1/similarity_add_event/[counter]">+ add</a></p>
</div>
</article>'),
    t('Content pane'),
    t('View panes'),
  );
  $export['similarity_dossier_events'] = $view;

  return $export;
}

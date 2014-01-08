<?php
/**
 * @file
 * semrecommender_xml_views.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function semrecommender_xml_views_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'semreccomender_story_section';
  $view->description = 'Demo of the Recommender Service';
  $view->tag = 'default';
  $view->base_table = 'xml';
  $view->human_name = 'SemRecommender Story Section Demo';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Recommended Sections';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['xml_file'] = variable_get('dec_recommender_base') . "/recommendSections/cache?dossierID=" . variable_get('dec_triples_base_url') . '/dossiers/%1';
  $handler->display->display_options['query']['options']['row_xpath'] = '/story_sections/story_section';
  $handler->display->display_options['query']['options']['show_errors'] = 1;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* No results behavior: Global: Text area */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'No recommended story sections found (nid = !1).';
  $handler->display->display_options['empty']['area']['format'] = 'extra_html';
  $handler->display->display_options['empty']['area']['tokenize'] = TRUE;
  /* Field: events/event: Text */
  $handler->display->display_options['fields']['text_1']['id'] = 'text_1';
  $handler->display->display_options['fields']['text_1']['table'] = 'xml';
  $handler->display->display_options['fields']['text_1']['field'] = 'text';
  $handler->display->display_options['fields']['text_1']['label'] = 'events';
  $handler->display->display_options['fields']['text_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_1']['xpath_selector'] = 'events/event';
  $handler->display->display_options['fields']['text_1']['multiple'] = 1;
  $handler->display->display_options['fields']['text_1']['list_type'] = 'ol';
  /* Field: description: Text */
  $handler->display->display_options['fields']['text']['id'] = 'text';
  $handler->display->display_options['fields']['text']['table'] = 'xml';
  $handler->display->display_options['fields']['text']['field'] = 'text';
  $handler->display->display_options['fields']['text']['label'] = 'description';
  $handler->display->display_options['fields']['text']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['path'] = '[text_1]';
  $handler->display->display_options['fields']['text']['xpath_selector'] = 'description';
  $handler->display->display_options['fields']['text']['multiple'] = 0;
  /* Field: type: Text */
  $handler->display->display_options['fields']['text_3']['id'] = 'text_3';
  $handler->display->display_options['fields']['text_3']['table'] = 'xml';
  $handler->display->display_options['fields']['text_3']['field'] = 'text';
  $handler->display->display_options['fields']['text_3']['label'] = 'type';
  $handler->display->display_options['fields']['text_3']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_3']['xpath_selector'] = 'type';
  $handler->display->display_options['fields']['text_3']['multiple'] = 0;
  /* Field: id: Text */
  $handler->display->display_options['fields']['text_2']['id'] = 'text_2';
  $handler->display->display_options['fields']['text_2']['table'] = 'xml';
  $handler->display->display_options['fields']['text_2']['field'] = 'text';
  $handler->display->display_options['fields']['text_2']['label'] = 'ID';
  $handler->display->display_options['fields']['text_2']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_2']['xpath_selector'] = 'id';
  $handler->display->display_options['fields']['text_2']['multiple'] = 0;
  /* Field: object_stories/object_story: Text */
  $handler->display->display_options['fields']['text_4']['id'] = 'text_4';
  $handler->display->display_options['fields']['text_4']['table'] = 'xml';
  $handler->display->display_options['fields']['text_4']['field'] = 'text';
  $handler->display->display_options['fields']['text_4']['label'] = 'Object Stories';
  $handler->display->display_options['fields']['text_4']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_4']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['text_4']['xpath_selector'] = 'object_stories/object_story';
  $handler->display->display_options['fields']['text_4']['multiple'] = 1;
  $handler->display->display_options['fields']['text_4']['list_type'] = 'ol';
  /* Sort criterion: pubDate: Date */
  $handler->display->display_options['sorts']['date']['id'] = 'date';
  $handler->display->display_options['sorts']['date']['table'] = 'xml';
  $handler->display->display_options['sorts']['date']['field'] = 'date';
  $handler->display->display_options['sorts']['date']['order'] = 'DESC';
  $handler->display->display_options['sorts']['date']['xpath_selector'] = 'pubDate';
  /* Contextual filter: XML: Pass through */
  $handler->display->display_options['arguments']['passthru']['id'] = 'passthru';
  $handler->display->display_options['arguments']['passthru']['table'] = 'xml';
  $handler->display->display_options['arguments']['passthru']['field'] = 'passthru';
  $handler->display->display_options['arguments']['passthru']['default_action'] = 'default';
  $handler->display->display_options['arguments']['passthru']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['passthru']['default_argument_options']['index'] = '1';
  $handler->display->display_options['arguments']['passthru']['default_argument_options']['use_alias'] = TRUE;
  $handler->display->display_options['arguments']['passthru']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['passthru']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['passthru']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: XML: Pass through */
  $handler->display->display_options['arguments']['passthru_1']['id'] = 'passthru_1';
  $handler->display->display_options['arguments']['passthru_1']['table'] = 'xml';
  $handler->display->display_options['arguments']['passthru_1']['field'] = 'passthru';
  $handler->display->display_options['arguments']['passthru_1']['default_action'] = 'default';
  $handler->display->display_options['arguments']['passthru_1']['default_argument_type'] = 'raw';
  $handler->display->display_options['arguments']['passthru_1']['default_argument_options']['index'] = '3';
  $handler->display->display_options['arguments']['passthru_1']['default_argument_options']['use_alias'] = TRUE;
  $handler->display->display_options['arguments']['passthru_1']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['passthru_1']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['passthru_1']['summary_options']['items_per_page'] = '25';
  /* Filter criterion: description: Text */
  $handler->display->display_options['filters']['text']['id'] = 'text';
  $handler->display->display_options['filters']['text']['table'] = 'xml';
  $handler->display->display_options['filters']['text']['field'] = 'text';
  $handler->display->display_options['filters']['text']['operator'] = 'contains';
  $handler->display->display_options['filters']['text']['expose']['operator_id'] = 'text_op';
  $handler->display->display_options['filters']['text']['expose']['label'] = 'Search';
  $handler->display->display_options['filters']['text']['expose']['operator'] = 'text_op';
  $handler->display->display_options['filters']['text']['expose']['identifier'] = 'text';
  $handler->display->display_options['filters']['text']['xpath_selector'] = 'description';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['path'] = 'semrecommender_story_section/%';

  /* Display: Content pane */
  $handler = $view->new_display('panel_pane', 'Content pane', 'panel_pane_1');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'resource-container container-full narrow-items';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
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
  /* Field: events/event: Text */
  $handler->display->display_options['fields']['text_1']['id'] = 'text_1';
  $handler->display->display_options['fields']['text_1']['table'] = 'xml';
  $handler->display->display_options['fields']['text_1']['field'] = 'text';
  $handler->display->display_options['fields']['text_1']['label'] = 'events';
  $handler->display->display_options['fields']['text_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_1']['xpath_selector'] = 'events/event';
  $handler->display->display_options['fields']['text_1']['multiple'] = 1;
  $handler->display->display_options['fields']['text_1']['list_type'] = 'ol';
  /* Field: description: Text */
  $handler->display->display_options['fields']['text']['id'] = 'text';
  $handler->display->display_options['fields']['text']['table'] = 'xml';
  $handler->display->display_options['fields']['text']['field'] = 'text';
  $handler->display->display_options['fields']['text']['label'] = 'description';
  $handler->display->display_options['fields']['text']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['path'] = '[text_1]';
  $handler->display->display_options['fields']['text']['xpath_selector'] = 'description';
  $handler->display->display_options['fields']['text']['multiple'] = 0;
  /* Field: type: Text */
  $handler->display->display_options['fields']['text_3']['id'] = 'text_3';
  $handler->display->display_options['fields']['text_3']['table'] = 'xml';
  $handler->display->display_options['fields']['text_3']['field'] = 'text';
  $handler->display->display_options['fields']['text_3']['label'] = 'type';
  $handler->display->display_options['fields']['text_3']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_3']['xpath_selector'] = 'type';
  $handler->display->display_options['fields']['text_3']['multiple'] = 0;
  /* Field: id: Text */
  $handler->display->display_options['fields']['text_2']['id'] = 'text_2';
  $handler->display->display_options['fields']['text_2']['table'] = 'xml';
  $handler->display->display_options['fields']['text_2']['field'] = 'text';
  $handler->display->display_options['fields']['text_2']['label'] = 'ID';
  $handler->display->display_options['fields']['text_2']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_2']['xpath_selector'] = 'id';
  $handler->display->display_options['fields']['text_2']['multiple'] = 0;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<article class="node-event node-teaser">
<div class="article-inner">
<p class="type-identifier">Section</p>
<h2>[text]</h2>
<!-- We want to exclude this from the display and just show the summary/description.-->
<!-- <div>[text_1]</div> -->
<p class="suggest add-event"><a href="/dossiers/!1/stories/!2/add-rec-section/[text_2]">+ add</a></p>
</div>
</article>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: description: Text */
  $handler->display->display_options['filters']['text']['id'] = 'text';
  $handler->display->display_options['filters']['text']['table'] = 'xml';
  $handler->display->display_options['filters']['text']['field'] = 'text';
  $handler->display->display_options['filters']['text']['operator'] = 'contains';
  $handler->display->display_options['filters']['text']['expose']['operator_id'] = 'text_op';
  $handler->display->display_options['filters']['text']['expose']['label'] = 'Search';
  $handler->display->display_options['filters']['text']['expose']['operator'] = 'text_op';
  $handler->display->display_options['filters']['text']['expose']['identifier'] = 'text';
  $handler->display->display_options['filters']['text']['xpath_selector'] = 'description';
  $export['semreccomender_story_section'] = $view;

  $view = new view();
  $view->name = 'semrecommender_event_events_demo';
  $view->description = 'Demo of the Recommender Service';
  $view->tag = 'default';
  $view->base_table = 'xml';
  $view->human_name = 'Semrecommender "Event Events" Demo';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Recommended Event Events';
  $handler->display->display_options['css_class'] = 'resource-container container-full narrow-items';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['xml_file'] = variable_get('dec_recommender_base') . "/recommendEventEvents/cache?eventID=" . variable_get('dec_triples_base_url') . '/events/%1';
  $handler->display->display_options['query']['options']['row_xpath'] = '/events/event';
  $handler->display->display_options['query']['options']['show_errors'] = 1;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['inline'] = array(
    'text_1' => 'text_1',
    'text' => 'text',
  );
  /* Field: type: Text */
  $handler->display->display_options['fields']['text_1']['id'] = 'text_1';
  $handler->display->display_options['fields']['text_1']['table'] = 'xml';
  $handler->display->display_options['fields']['text_1']['field'] = 'text';
  $handler->display->display_options['fields']['text_1']['label'] = '';
  $handler->display->display_options['fields']['text_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_1']['xpath_selector'] = 'type';
  $handler->display->display_options['fields']['text_1']['multiple'] = 0;
  /* Field: title: Text */
  $handler->display->display_options['fields']['text']['id'] = 'text';
  $handler->display->display_options['fields']['text']['table'] = 'xml';
  $handler->display->display_options['fields']['text']['field'] = 'text';
  $handler->display->display_options['fields']['text']['label'] = '';
  $handler->display->display_options['fields']['text']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['path'] = '[text_1]';
  $handler->display->display_options['fields']['text']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text']['xpath_selector'] = 'title';
  /* Field: agents/agent/label: Text */
  $handler->display->display_options['fields']['text_3']['id'] = 'text_3';
  $handler->display->display_options['fields']['text_3']['table'] = 'xml';
  $handler->display->display_options['fields']['text_3']['field'] = 'text';
  $handler->display->display_options['fields']['text_3']['label'] = 'Agent Name';
  $handler->display->display_options['fields']['text_3']['xpath_selector'] = 'agents/agent/label';
  $handler->display->display_options['fields']['text_3']['multiple'] = 0;
  /* Field: start_time: Date */
  $handler->display->display_options['fields']['date']['id'] = 'date';
  $handler->display->display_options['fields']['date']['table'] = 'xml';
  $handler->display->display_options['fields']['date']['field'] = 'date';
  $handler->display->display_options['fields']['date']['xpath_selector'] = 'start_time';
  $handler->display->display_options['fields']['date']['multiple'] = 0;
  $handler->display->display_options['fields']['date']['date_format'] = 'time ago';
  $handler->display->display_options['fields']['date']['custom_date_format'] = 'y';
  /* Field: object: Text */
  $handler->display->display_options['fields']['text_2']['id'] = 'text_2';
  $handler->display->display_options['fields']['text_2']['table'] = 'xml';
  $handler->display->display_options['fields']['text_2']['field'] = 'text';
  $handler->display->display_options['fields']['text_2']['label'] = 'Object';
  $handler->display->display_options['fields']['text_2']['xpath_selector'] = 'object';
  $handler->display->display_options['fields']['text_2']['multiple'] = 0;
  /* Field: agents/agent/uri: Text */
  $handler->display->display_options['fields']['text_4']['id'] = 'text_4';
  $handler->display->display_options['fields']['text_4']['table'] = 'xml';
  $handler->display->display_options['fields']['text_4']['field'] = 'text';
  $handler->display->display_options['fields']['text_4']['label'] = 'Agent URI';
  $handler->display->display_options['fields']['text_4']['xpath_selector'] = 'agents/agent/uri';
  $handler->display->display_options['fields']['text_4']['multiple'] = 0;
  /* Field: agents/agent/DOB: Text */
  $handler->display->display_options['fields']['text_5']['id'] = 'text_5';
  $handler->display->display_options['fields']['text_5']['table'] = 'xml';
  $handler->display->display_options['fields']['text_5']['field'] = 'text';
  $handler->display->display_options['fields']['text_5']['label'] = 'Agend DOB';
  $handler->display->display_options['fields']['text_5']['xpath_selector'] = 'agents/agent/DOB';
  $handler->display->display_options['fields']['text_5']['multiple'] = 0;
  /* Field: location/uri: Text */
  $handler->display->display_options['fields']['text_6']['id'] = 'text_6';
  $handler->display->display_options['fields']['text_6']['table'] = 'xml';
  $handler->display->display_options['fields']['text_6']['field'] = 'text';
  $handler->display->display_options['fields']['text_6']['label'] = 'Location URI';
  $handler->display->display_options['fields']['text_6']['xpath_selector'] = 'location/uri';
  $handler->display->display_options['fields']['text_6']['multiple'] = 0;
  /* Field: location/label: Text */
  $handler->display->display_options['fields']['text_7']['id'] = 'text_7';
  $handler->display->display_options['fields']['text_7']['table'] = 'xml';
  $handler->display->display_options['fields']['text_7']['field'] = 'text';
  $handler->display->display_options['fields']['text_7']['label'] = 'Location Name';
  $handler->display->display_options['fields']['text_7']['xpath_selector'] = 'location/label';
  $handler->display->display_options['fields']['text_7']['multiple'] = 0;
  /* Sort criterion: pubDate: Date */
  $handler->display->display_options['sorts']['date']['id'] = 'date';
  $handler->display->display_options['sorts']['date']['table'] = 'xml';
  $handler->display->display_options['sorts']['date']['field'] = 'date';
  $handler->display->display_options['sorts']['date']['order'] = 'DESC';
  $handler->display->display_options['sorts']['date']['xpath_selector'] = 'pubDate';
  /* Contextual filter: XML: Pass through */
  $handler->display->display_options['arguments']['passthru']['id'] = 'passthru';
  $handler->display->display_options['arguments']['passthru']['table'] = 'xml';
  $handler->display->display_options['arguments']['passthru']['field'] = 'passthru';
  $handler->display->display_options['arguments']['passthru']['default_action'] = 'default';
  $handler->display->display_options['arguments']['passthru']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['passthru']['default_argument_options']['argument'] = '2727';
  $handler->display->display_options['arguments']['passthru']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['passthru']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['passthru']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: XML: Pass through */
  $handler->display->display_options['arguments']['passthru_1']['id'] = 'passthru_1';
  $handler->display->display_options['arguments']['passthru_1']['table'] = 'xml';
  $handler->display->display_options['arguments']['passthru_1']['field'] = 'passthru';
  $handler->display->display_options['arguments']['passthru_1']['default_action'] = 'default';
  $handler->display->display_options['arguments']['passthru_1']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['passthru_1']['default_argument_options']['argument'] = '4413';
  $handler->display->display_options['arguments']['passthru_1']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['passthru_1']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['passthru_1']['summary_options']['items_per_page'] = '25';
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
  $handler->display->display_options['filters']['text']['xpath_selector'] = 'description';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['path'] = 'dossiers/%/recommended_events';

  /* Display: Content pane */
  $handler = $view->new_display('panel_pane', 'Content pane', 'panel_pane_1');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'resource-container container-full narrow-items';
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
  /* Field: id */
  $handler->display->display_options['fields']['text_1']['id'] = 'text_1';
  $handler->display->display_options['fields']['text_1']['table'] = 'xml';
  $handler->display->display_options['fields']['text_1']['field'] = 'text';
  $handler->display->display_options['fields']['text_1']['ui_name'] = 'id';
  $handler->display->display_options['fields']['text_1']['label'] = '';
  $handler->display->display_options['fields']['text_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_1']['xpath_selector'] = 'id';
  $handler->display->display_options['fields']['text_1']['multiple'] = 0;
  /* Field: Title */
  $handler->display->display_options['fields']['text']['id'] = 'text';
  $handler->display->display_options['fields']['text']['table'] = 'xml';
  $handler->display->display_options['fields']['text']['field'] = 'text';
  $handler->display->display_options['fields']['text']['ui_name'] = 'Title';
  $handler->display->display_options['fields']['text']['label'] = '';
  $handler->display->display_options['fields']['text']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['path'] = '[text_1]';
  $handler->display->display_options['fields']['text']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text']['xpath_selector'] = 'title';
  $handler->display->display_options['fields']['text']['multiple'] = 0;
  /* Field: Agent */
  $handler->display->display_options['fields']['text_3']['id'] = 'text_3';
  $handler->display->display_options['fields']['text_3']['table'] = 'xml';
  $handler->display->display_options['fields']['text_3']['field'] = 'text';
  $handler->display->display_options['fields']['text_3']['ui_name'] = 'Agent';
  $handler->display->display_options['fields']['text_3']['label'] = 'Agent Name';
  $handler->display->display_options['fields']['text_3']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_3']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_3']['xpath_selector'] = 'agents/agent/label';
  $handler->display->display_options['fields']['text_3']['multiple'] = 0;
  /* Field: agents/agent/uri: Text */
  $handler->display->display_options['fields']['text_7']['id'] = 'text_7';
  $handler->display->display_options['fields']['text_7']['table'] = 'xml';
  $handler->display->display_options['fields']['text_7']['field'] = 'text';
  $handler->display->display_options['fields']['text_7']['label'] = 'Agent URI';
  $handler->display->display_options['fields']['text_7']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_7']['xpath_selector'] = 'agents/agent/uri';
  $handler->display->display_options['fields']['text_7']['multiple'] = 0;
  /* Field: agents/agent/DOB: Text */
  $handler->display->display_options['fields']['text_11']['id'] = 'text_11';
  $handler->display->display_options['fields']['text_11']['table'] = 'xml';
  $handler->display->display_options['fields']['text_11']['field'] = 'text';
  $handler->display->display_options['fields']['text_11']['label'] = 'Agent DOB';
  $handler->display->display_options['fields']['text_11']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_11']['xpath_selector'] = 'agents/agent/DOB';
  $handler->display->display_options['fields']['text_11']['multiple'] = 0;
  /* Field: object/label: Text */
  $handler->display->display_options['fields']['text_8']['id'] = 'text_8';
  $handler->display->display_options['fields']['text_8']['table'] = 'xml';
  $handler->display->display_options['fields']['text_8']['field'] = 'text';
  $handler->display->display_options['fields']['text_8']['label'] = 'Object Name';
  $handler->display->display_options['fields']['text_8']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_8']['xpath_selector'] = 'object/label';
  $handler->display->display_options['fields']['text_8']['multiple'] = 0;
  /* Field: Object */
  $handler->display->display_options['fields']['text_2']['id'] = 'text_2';
  $handler->display->display_options['fields']['text_2']['table'] = 'xml';
  $handler->display->display_options['fields']['text_2']['field'] = 'text';
  $handler->display->display_options['fields']['text_2']['ui_name'] = 'Object';
  $handler->display->display_options['fields']['text_2']['label'] = 'Object URI';
  $handler->display->display_options['fields']['text_2']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_2']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_2']['xpath_selector'] = 'object/uri';
  $handler->display->display_options['fields']['text_2']['multiple'] = 0;
  /* Field: Start Time */
  $handler->display->display_options['fields']['text_5']['id'] = 'text_5';
  $handler->display->display_options['fields']['text_5']['table'] = 'xml';
  $handler->display->display_options['fields']['text_5']['field'] = 'text';
  $handler->display->display_options['fields']['text_5']['ui_name'] = 'Start Time';
  $handler->display->display_options['fields']['text_5']['label'] = '';
  $handler->display->display_options['fields']['text_5']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_5']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_5']['xpath_selector'] = 'start_time';
  $handler->display->display_options['fields']['text_5']['multiple'] = 0;
  /* Field: Activity */
  $handler->display->display_options['fields']['text_4']['id'] = 'text_4';
  $handler->display->display_options['fields']['text_4']['table'] = 'xml';
  $handler->display->display_options['fields']['text_4']['field'] = 'text';
  $handler->display->display_options['fields']['text_4']['ui_name'] = 'Activity';
  $handler->display->display_options['fields']['text_4']['label'] = '';
  $handler->display->display_options['fields']['text_4']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_4']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_4']['xpath_selector'] = 'activity';
  $handler->display->display_options['fields']['text_4']['multiple'] = 0;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<article class="node-event node-teaser">
<div class="article-inner">
<p class="type-identifier">Event</p>
<div>[text_5]</div> 
<h2>[text]</h2>
<p class="suggest add-event"><a href="../events/!1/add-rec-events-event/[text_1]">+ add</a></p>
</div>
</article>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nothing']['element_default_classes'] = FALSE;
  /* Field: location/label: Text */
  $handler->display->display_options['fields']['text_9']['id'] = 'text_9';
  $handler->display->display_options['fields']['text_9']['table'] = 'xml';
  $handler->display->display_options['fields']['text_9']['field'] = 'text';
  $handler->display->display_options['fields']['text_9']['label'] = 'Location Name';
  $handler->display->display_options['fields']['text_9']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_9']['xpath_selector'] = 'location/label';
  $handler->display->display_options['fields']['text_9']['multiple'] = 0;
  /* Field: location/uri: Text */
  $handler->display->display_options['fields']['text_10']['id'] = 'text_10';
  $handler->display->display_options['fields']['text_10']['table'] = 'xml';
  $handler->display->display_options['fields']['text_10']['field'] = 'text';
  $handler->display->display_options['fields']['text_10']['label'] = 'Location URI';
  $handler->display->display_options['fields']['text_10']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_10']['xpath_selector'] = 'location/uri';
  $handler->display->display_options['fields']['text_10']['multiple'] = 0;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  $handler->display->display_options['argument_input'] = array(
    'passthru' => array(
      'type' => 'panel',
      'context' => 'entity:bean.url',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'XML: Pass through',
    ),
    'passthru_1' => array(
      'type' => 'panel',
      'context' => 'entity:bean.delta',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'XML: Pass through',
    ),
  );
  $export['semrecommender_event_events_demo'] = $view;

  $view = new view();
  $view->name = 'semrecommender_events_demo';
  $view->description = 'Demo of the Recommender Service';
  $view->tag = 'default';
  $view->base_table = 'xml';
  $view->human_name = 'Semrecommender Events Demo';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Recommended Events';
  $handler->display->display_options['css_class'] = 'resource-container container-full narrow-items';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['xml_file'] = variable_get('dec_recommender_base') . "/recommendEvents/cache?dossierID=" . variable_get('dec_triples_base_url') . '/dossiers/%1';
  $handler->display->display_options['query']['options']['row_xpath'] = '/events/event';
  $handler->display->display_options['query']['options']['show_errors'] = 1;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['inline'] = array(
    'text_1' => 'text_1',
    'text' => 'text',
  );
  /* Field: type: Text */
  $handler->display->display_options['fields']['text_1']['id'] = 'text_1';
  $handler->display->display_options['fields']['text_1']['table'] = 'xml';
  $handler->display->display_options['fields']['text_1']['field'] = 'text';
  $handler->display->display_options['fields']['text_1']['label'] = '';
  $handler->display->display_options['fields']['text_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_1']['xpath_selector'] = 'type';
  $handler->display->display_options['fields']['text_1']['multiple'] = 0;
  /* Field: title: Text */
  $handler->display->display_options['fields']['text']['id'] = 'text';
  $handler->display->display_options['fields']['text']['table'] = 'xml';
  $handler->display->display_options['fields']['text']['field'] = 'text';
  $handler->display->display_options['fields']['text']['label'] = '';
  $handler->display->display_options['fields']['text']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['path'] = '[text_1]';
  $handler->display->display_options['fields']['text']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text']['xpath_selector'] = 'title';
  /* Field: agents/agent/label: Text */
  $handler->display->display_options['fields']['text_3']['id'] = 'text_3';
  $handler->display->display_options['fields']['text_3']['table'] = 'xml';
  $handler->display->display_options['fields']['text_3']['field'] = 'text';
  $handler->display->display_options['fields']['text_3']['label'] = 'Agent Name';
  $handler->display->display_options['fields']['text_3']['xpath_selector'] = 'agents/agent/label';
  $handler->display->display_options['fields']['text_3']['multiple'] = 0;
  /* Field: start_time: Date */
  $handler->display->display_options['fields']['date']['id'] = 'date';
  $handler->display->display_options['fields']['date']['table'] = 'xml';
  $handler->display->display_options['fields']['date']['field'] = 'date';
  $handler->display->display_options['fields']['date']['xpath_selector'] = 'start_time';
  $handler->display->display_options['fields']['date']['multiple'] = 0;
  $handler->display->display_options['fields']['date']['date_format'] = 'time ago';
  $handler->display->display_options['fields']['date']['custom_date_format'] = 'y';
  /* Field: object: Text */
  $handler->display->display_options['fields']['text_2']['id'] = 'text_2';
  $handler->display->display_options['fields']['text_2']['table'] = 'xml';
  $handler->display->display_options['fields']['text_2']['field'] = 'text';
  $handler->display->display_options['fields']['text_2']['label'] = 'Object';
  $handler->display->display_options['fields']['text_2']['xpath_selector'] = 'object';
  $handler->display->display_options['fields']['text_2']['multiple'] = 0;
  /* Field: agents/agent/uri: Text */
  $handler->display->display_options['fields']['text_4']['id'] = 'text_4';
  $handler->display->display_options['fields']['text_4']['table'] = 'xml';
  $handler->display->display_options['fields']['text_4']['field'] = 'text';
  $handler->display->display_options['fields']['text_4']['label'] = 'Agent URI';
  $handler->display->display_options['fields']['text_4']['xpath_selector'] = 'agents/agent/uri';
  $handler->display->display_options['fields']['text_4']['multiple'] = 0;
  /* Field: agents/agent/DOB: Text */
  $handler->display->display_options['fields']['text_5']['id'] = 'text_5';
  $handler->display->display_options['fields']['text_5']['table'] = 'xml';
  $handler->display->display_options['fields']['text_5']['field'] = 'text';
  $handler->display->display_options['fields']['text_5']['label'] = 'Agend DOB';
  $handler->display->display_options['fields']['text_5']['xpath_selector'] = 'agents/agent/DOB';
  $handler->display->display_options['fields']['text_5']['multiple'] = 0;
  /* Field: location/uri: Text */
  $handler->display->display_options['fields']['text_6']['id'] = 'text_6';
  $handler->display->display_options['fields']['text_6']['table'] = 'xml';
  $handler->display->display_options['fields']['text_6']['field'] = 'text';
  $handler->display->display_options['fields']['text_6']['label'] = 'Location URI';
  $handler->display->display_options['fields']['text_6']['xpath_selector'] = 'location/uri';
  $handler->display->display_options['fields']['text_6']['multiple'] = 0;
  /* Field: location/label: Text */
  $handler->display->display_options['fields']['text_7']['id'] = 'text_7';
  $handler->display->display_options['fields']['text_7']['table'] = 'xml';
  $handler->display->display_options['fields']['text_7']['field'] = 'text';
  $handler->display->display_options['fields']['text_7']['label'] = 'Location Name';
  $handler->display->display_options['fields']['text_7']['xpath_selector'] = 'location/label';
  $handler->display->display_options['fields']['text_7']['multiple'] = 0;
  /* Sort criterion: pubDate: Date */
  $handler->display->display_options['sorts']['date']['id'] = 'date';
  $handler->display->display_options['sorts']['date']['table'] = 'xml';
  $handler->display->display_options['sorts']['date']['field'] = 'date';
  $handler->display->display_options['sorts']['date']['order'] = 'DESC';
  $handler->display->display_options['sorts']['date']['xpath_selector'] = 'pubDate';
  /* Contextual filter: XML: Pass through */
  $handler->display->display_options['arguments']['passthru']['id'] = 'passthru';
  $handler->display->display_options['arguments']['passthru']['table'] = 'xml';
  $handler->display->display_options['arguments']['passthru']['field'] = 'passthru';
  $handler->display->display_options['arguments']['passthru']['default_action'] = 'default';
  $handler->display->display_options['arguments']['passthru']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['passthru']['default_argument_options']['argument'] = '2727';
  $handler->display->display_options['arguments']['passthru']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['passthru']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['passthru']['summary_options']['items_per_page'] = '25';
  /* Contextual filter: XML: Pass through */
  $handler->display->display_options['arguments']['passthru_1']['id'] = 'passthru_1';
  $handler->display->display_options['arguments']['passthru_1']['table'] = 'xml';
  $handler->display->display_options['arguments']['passthru_1']['field'] = 'passthru';
  $handler->display->display_options['arguments']['passthru_1']['default_action'] = 'default';
  $handler->display->display_options['arguments']['passthru_1']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['passthru_1']['default_argument_options']['argument'] = '4413';
  $handler->display->display_options['arguments']['passthru_1']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['passthru_1']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['passthru_1']['summary_options']['items_per_page'] = '25';
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
  $handler->display->display_options['filters']['text']['xpath_selector'] = 'description';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['path'] = 'dossiers/%/recommended_events';

  /* Display: Content pane */
  $handler = $view->new_display('panel_pane', 'Content pane', 'panel_pane_1');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'resource-container container-full narrow-items';
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
  /* Field: id */
  $handler->display->display_options['fields']['text_1']['id'] = 'text_1';
  $handler->display->display_options['fields']['text_1']['table'] = 'xml';
  $handler->display->display_options['fields']['text_1']['field'] = 'text';
  $handler->display->display_options['fields']['text_1']['ui_name'] = 'id';
  $handler->display->display_options['fields']['text_1']['label'] = '';
  $handler->display->display_options['fields']['text_1']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_1']['xpath_selector'] = 'id';
  $handler->display->display_options['fields']['text_1']['multiple'] = 0;
  /* Field: Title */
  $handler->display->display_options['fields']['text']['id'] = 'text';
  $handler->display->display_options['fields']['text']['table'] = 'xml';
  $handler->display->display_options['fields']['text']['field'] = 'text';
  $handler->display->display_options['fields']['text']['ui_name'] = 'Title';
  $handler->display->display_options['fields']['text']['label'] = '';
  $handler->display->display_options['fields']['text']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text']['alter']['path'] = '[text_1]';
  $handler->display->display_options['fields']['text']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text']['xpath_selector'] = 'title';
  $handler->display->display_options['fields']['text']['multiple'] = 0;
  /* Field: Agent */
  $handler->display->display_options['fields']['text_3']['id'] = 'text_3';
  $handler->display->display_options['fields']['text_3']['table'] = 'xml';
  $handler->display->display_options['fields']['text_3']['field'] = 'text';
  $handler->display->display_options['fields']['text_3']['ui_name'] = 'Agent';
  $handler->display->display_options['fields']['text_3']['label'] = 'Agent Name';
  $handler->display->display_options['fields']['text_3']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_3']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_3']['xpath_selector'] = 'agents/agent/label';
  $handler->display->display_options['fields']['text_3']['multiple'] = 0;
  /* Field: agents/agent/uri: Text */
  $handler->display->display_options['fields']['text_7']['id'] = 'text_7';
  $handler->display->display_options['fields']['text_7']['table'] = 'xml';
  $handler->display->display_options['fields']['text_7']['field'] = 'text';
  $handler->display->display_options['fields']['text_7']['label'] = 'Agent URI';
  $handler->display->display_options['fields']['text_7']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_7']['xpath_selector'] = 'agents/agent/uri';
  $handler->display->display_options['fields']['text_7']['multiple'] = 0;
  /* Field: agents/agent/DOB: Text */
  $handler->display->display_options['fields']['text_11']['id'] = 'text_11';
  $handler->display->display_options['fields']['text_11']['table'] = 'xml';
  $handler->display->display_options['fields']['text_11']['field'] = 'text';
  $handler->display->display_options['fields']['text_11']['label'] = 'Agent DOB';
  $handler->display->display_options['fields']['text_11']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_11']['xpath_selector'] = 'agents/agent/DOB';
  $handler->display->display_options['fields']['text_11']['multiple'] = 0;
  /* Field: object/label: Text */
  $handler->display->display_options['fields']['text_8']['id'] = 'text_8';
  $handler->display->display_options['fields']['text_8']['table'] = 'xml';
  $handler->display->display_options['fields']['text_8']['field'] = 'text';
  $handler->display->display_options['fields']['text_8']['label'] = 'Object Name';
  $handler->display->display_options['fields']['text_8']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_8']['xpath_selector'] = 'object/label';
  $handler->display->display_options['fields']['text_8']['multiple'] = 0;
  /* Field: Object */
  $handler->display->display_options['fields']['text_2']['id'] = 'text_2';
  $handler->display->display_options['fields']['text_2']['table'] = 'xml';
  $handler->display->display_options['fields']['text_2']['field'] = 'text';
  $handler->display->display_options['fields']['text_2']['ui_name'] = 'Object';
  $handler->display->display_options['fields']['text_2']['label'] = 'Object URI';
  $handler->display->display_options['fields']['text_2']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_2']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_2']['xpath_selector'] = 'object/uri';
  $handler->display->display_options['fields']['text_2']['multiple'] = 0;
  /* Field: Start Time */
  $handler->display->display_options['fields']['text_5']['id'] = 'text_5';
  $handler->display->display_options['fields']['text_5']['table'] = 'xml';
  $handler->display->display_options['fields']['text_5']['field'] = 'text';
  $handler->display->display_options['fields']['text_5']['ui_name'] = 'Start Time';
  $handler->display->display_options['fields']['text_5']['label'] = '';
  $handler->display->display_options['fields']['text_5']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_5']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_5']['xpath_selector'] = 'start_time';
  $handler->display->display_options['fields']['text_5']['multiple'] = 0;
  /* Field: Activity */
  $handler->display->display_options['fields']['text_4']['id'] = 'text_4';
  $handler->display->display_options['fields']['text_4']['table'] = 'xml';
  $handler->display->display_options['fields']['text_4']['field'] = 'text';
  $handler->display->display_options['fields']['text_4']['ui_name'] = 'Activity';
  $handler->display->display_options['fields']['text_4']['label'] = '';
  $handler->display->display_options['fields']['text_4']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_4']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['text_4']['xpath_selector'] = 'activity';
  $handler->display->display_options['fields']['text_4']['multiple'] = 0;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<article class="node-event node-teaser">
<div class="article-inner">
<p class="type-identifier">Event</p>
<div>[text_5]</div> 
<h2>[text]</h2>
<p class="suggest add-event"><a href="../dossier/!1/add-rec-event/[text_1]">+ add</a></p>
</div>
</article>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nothing']['element_default_classes'] = FALSE;
  /* Field: location/label: Text */
  $handler->display->display_options['fields']['text_9']['id'] = 'text_9';
  $handler->display->display_options['fields']['text_9']['table'] = 'xml';
  $handler->display->display_options['fields']['text_9']['field'] = 'text';
  $handler->display->display_options['fields']['text_9']['label'] = 'Location Name';
  $handler->display->display_options['fields']['text_9']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_9']['xpath_selector'] = 'location/label';
  $handler->display->display_options['fields']['text_9']['multiple'] = 0;
  /* Field: location/uri: Text */
  $handler->display->display_options['fields']['text_10']['id'] = 'text_10';
  $handler->display->display_options['fields']['text_10']['table'] = 'xml';
  $handler->display->display_options['fields']['text_10']['field'] = 'text';
  $handler->display->display_options['fields']['text_10']['label'] = 'Location URI';
  $handler->display->display_options['fields']['text_10']['exclude'] = TRUE;
  $handler->display->display_options['fields']['text_10']['xpath_selector'] = 'location/uri';
  $handler->display->display_options['fields']['text_10']['multiple'] = 0;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  $handler->display->display_options['argument_input'] = array(
    'passthru' => array(
      'type' => 'panel',
      'context' => 'entity:bean.url',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'XML: Pass through',
    ),
    'passthru_1' => array(
      'type' => 'panel',
      'context' => 'entity:bean.delta',
      'context_optional' => 0,
      'panel' => '0',
      'fixed' => '',
      'label' => 'XML: Pass through',
    ),
  );
  $export['semrecommender_events_demo'] = $view;

  return $export;
}

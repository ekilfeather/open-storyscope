<?php
/**
 * @file
 * views_section_story_sets.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function views_section_story_sets_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'section_object_stories';
  $view->description = 'Lists object stories (stories) in a story (narrative) section. Takes NID of section as parameter.';
  $view->tag = 'default';
  $view->base_table = 'field_collection_item';
  $view->human_name = 'Section object stories';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Object Stories in this Section';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Relationship: Field collection item: Entity with the Set (field_story_set) */
  $handler->display->display_options['relationships']['field_story_set_node']['id'] = 'field_story_set_node';
  $handler->display->display_options['relationships']['field_story_set_node']['table'] = 'field_collection_item';
  $handler->display->display_options['relationships']['field_story_set_node']['field'] = 'field_story_set_node';
  /* Field: Field collection item: Field collection item ID */
  $handler->display->display_options['fields']['item_id']['id'] = 'item_id';
  $handler->display->display_options['fields']['item_id']['table'] = 'field_collection_item';
  $handler->display->display_options['fields']['item_id']['field'] = 'item_id';
  $handler->display->display_options['fields']['item_id']['label'] = '';
  $handler->display->display_options['fields']['item_id']['element_label_colon'] = FALSE;
  /* Contextual filter: Content: Nid */
  $handler->display->display_options['arguments']['nid']['id'] = 'nid';
  $handler->display->display_options['arguments']['nid']['table'] = 'node';
  $handler->display->display_options['arguments']['nid']['field'] = 'nid';
  $handler->display->display_options['arguments']['nid']['relationship'] = 'field_story_set_node';
  $handler->display->display_options['arguments']['nid']['default_action'] = 'empty';
  $handler->display->display_options['arguments']['nid']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['nid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['nid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['nid']['summary_options']['items_per_page'] = '25';

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block_section_get_story_set_ids');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Story sets in this Section';
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $export['section_object_stories'] = $view;

  return $export;
}

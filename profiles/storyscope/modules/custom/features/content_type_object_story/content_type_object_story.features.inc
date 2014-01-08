<?php
/**
 * @file
 * content_type_object_story.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function content_type_object_story_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function content_type_object_story_node_info() {
  $items = array(
    'object_story' => array(
      'name' => t('Story'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}

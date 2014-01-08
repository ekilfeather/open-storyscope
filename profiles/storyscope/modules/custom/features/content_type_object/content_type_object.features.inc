<?php
/**
 * @file
 * content_type_object.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function content_type_object_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function content_type_object_node_info() {
  $items = array(
    'object' => array(
      'name' => t('Object'),
      'base' => 'node_content',
      'description' => t('Objects contain the media and metadata associated with an artefact such as a painting. '),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}

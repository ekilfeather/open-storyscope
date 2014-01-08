<?php
/**
 * @file
 * content_type_narrative_microsite.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function content_type_narrative_microsite_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function content_type_narrative_microsite_node_info() {
  $items = array(
    'narrative_microsite' => array(
      'name' => t('Story as microsite'),
      'base' => 'node_content',
      'description' => t('Story presented as a self-contained  Website'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}

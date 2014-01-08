<?php
/**
 * @file
 * content_type_landing_page_generic.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function content_type_landing_page_generic_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function content_type_landing_page_generic_node_info() {
  $items = array(
    'landing_page' => array(
      'name' => t('Landing Page'),
      'base' => 'node_content',
      'description' => t('Landing Page with medium amount of text, a medium image, and several blocks of text or block content'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}

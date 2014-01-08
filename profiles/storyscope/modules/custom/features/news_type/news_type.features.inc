<?php
/**
 * @file
 * news_type.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function news_type_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function news_type_node_info() {
  $items = array(
    'news_item' => array(
      'name' => t('News Item'),
      'base' => 'node_content',
      'description' => t('A news item for the website'),
      'has_title' => '1',
      'title_label' => t('Headline'),
      'help' => '',
    ),
  );
  return $items;
}

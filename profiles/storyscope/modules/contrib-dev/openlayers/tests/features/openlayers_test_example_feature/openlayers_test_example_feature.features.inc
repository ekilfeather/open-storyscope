<?php
/**
 * @file
 * openlayers_test_example_feature.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function openlayers_test_example_feature_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "openlayers" && $api == "openlayers_maps") {
    return array("version" => "1");
  }
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function openlayers_test_example_feature_views_api() {
  return array("version" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function openlayers_test_example_feature_node_info() {
  $items = array(
    'openlayers_example_content' => array(
      'name' => t('OpenLayers Example Content'),
      'base' => 'node_content',
      'description' => t('This is an example content type for the OpenLayers module.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}

<?php
/**
 * @file
 * content_type_dossier.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function content_type_dossier_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function content_type_dossier_node_info() {
  $items = array(
    'dossier' => array(
      'name' => t('Dossier'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}

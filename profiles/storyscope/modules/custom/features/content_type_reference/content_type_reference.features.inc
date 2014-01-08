<?php
/**
 * @file
 * content_type_reference.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function content_type_reference_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function content_type_reference_node_info() {
  $items = array(
    'reference' => array(
      'name' => t('Reference'),
      'base' => 'node_content',
      'description' => t('References are media, descriptive text and resources locators relating to some external source of information such as a scholarly article. References are always visible and can be used by any user but only edited by the owner.
'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}

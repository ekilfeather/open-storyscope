<?php
/**
 * @file
 * content_type_plot_element.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function content_type_plot_element_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function content_type_plot_element_node_info() {
  $items = array(
    'plot_element' => array(
      'name' => t('Plot element'),
      'base' => 'node_content',
      'description' => t('A section is a container for what used to be called a Plot Set (now un-named) which a user groups together to explain some relationship between those Plot Sets'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}

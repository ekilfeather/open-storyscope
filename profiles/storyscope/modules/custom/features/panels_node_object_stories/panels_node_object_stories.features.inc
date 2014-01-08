<?php
/**
 * @file
 * panels_node_object_stories.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function panels_node_object_stories_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
}

<?php
/**
 * @file
 * search_object_story_add_ca_objects.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function search_object_story_add_ca_objects_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}

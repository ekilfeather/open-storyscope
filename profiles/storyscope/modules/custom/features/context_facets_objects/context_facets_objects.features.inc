<?php
/**
 * @file
 * context_facets_objects.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function context_facets_objects_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}

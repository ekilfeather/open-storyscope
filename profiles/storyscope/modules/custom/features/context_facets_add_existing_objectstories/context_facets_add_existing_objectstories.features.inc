<?php
/**
 * @file
 * context_facets_add_existing_objectstories.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function context_facets_add_existing_objectstories_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}

<?php
/**
 * @file
 * context_facets_add_existing_events.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function context_facets_add_existing_events_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}

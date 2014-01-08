<?php
/**
 * @file
 * context_dossier_object_facets.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function context_dossier_object_facets_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}

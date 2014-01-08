<?php
/**
 * @file
 * context_facets_dossier_objectstories_add_objects.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function context_facets_dossier_objectstories_add_objects_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}

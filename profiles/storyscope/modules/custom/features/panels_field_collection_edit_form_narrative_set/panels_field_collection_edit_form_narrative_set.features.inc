<?php
/**
 * @file
 * panels_field_collection_edit_form_narrative_set.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function panels_field_collection_edit_form_narrative_set_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
}

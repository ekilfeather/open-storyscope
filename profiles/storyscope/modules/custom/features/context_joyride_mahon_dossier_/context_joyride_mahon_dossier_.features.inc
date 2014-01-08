<?php
/**
 * @file
 * context_joyride_mahon_dossier_.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function context_joyride_mahon_dossier__ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}

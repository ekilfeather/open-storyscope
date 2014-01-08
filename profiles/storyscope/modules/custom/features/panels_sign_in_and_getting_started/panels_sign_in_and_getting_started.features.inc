<?php
/**
 * @file
 * panels_sign_in_and_getting_started.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function panels_sign_in_and_getting_started_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
}

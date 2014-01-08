<?php
/**
 * @file
 * flexslider_options_set.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function flexslider_options_set_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "flexslider" && $api == "flexslider_default_preset") {
    return array("version" => "1");
  }
}

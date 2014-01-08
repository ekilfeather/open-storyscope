<?php
/**
 * @file
 * bean_slider_bean.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function bean_slider_bean_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "bean_admin_ui" && $api == "bean") {
    return array("version" => "5");
  }
}

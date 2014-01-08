<?php
/**
 * @file
 * bean_block_image_link.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function bean_block_image_link_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "bean_admin_ui" && $api == "bean") {
    return array("version" => "5");
  }
}

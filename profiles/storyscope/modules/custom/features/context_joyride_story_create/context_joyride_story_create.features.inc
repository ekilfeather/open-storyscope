<?php
/**
 * @file
 * context_joyride_story_create.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function context_joyride_story_create_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}

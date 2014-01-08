<?php
/**
 * @file
 * context_joyride_add_existing_object_story.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function context_joyride_add_existing_object_story_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
}

<?php
/**
 * @file
 * openlayers_geofield_event_map.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function openlayers_geofield_event_map_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "openlayers" && $api == "openlayers_maps") {
    return array("version" => "1");
  }
}

<?php
/**
 * @file
 * openlayers_geofield_event_map.openlayers_maps.inc
 */

/**
 * Implements hook_openlayers_maps().
 */
function openlayers_geofield_event_map_openlayers_maps() {
  $export = array();

  $openlayers_maps = new stdClass();
  $openlayers_maps->disabled = FALSE; /* Edit this to true to make a default openlayers_maps disabled initially */
  $openlayers_maps->api_version = 1;
  $openlayers_maps->name = 'clone_of_geofield_formatter_map';
  $openlayers_maps->title = 'Storyscope Geofield Map';
  $openlayers_maps->description = 'A Map Used for Geofield Output';
  $openlayers_maps->data = array(
    'width' => 'auto',
    'height' => '400px',
    'image_path' => 'profiles/storyscope/modules/contrib-dev/openlayers/themes/default_dark/img/',
    'css_path' => 'profiles/storyscope/modules/contrib-dev/openlayers/themes/default_dark/style.css',
    'proxy_host' => '',
    'hide_empty_map' => 0,
    'center' => array(
      'initial' => array(
        'centerpoint' => '0, 0',
        'zoom' => '1',
      ),
      'restrict' => array(
        'restrictextent' => 0,
        'restrictedExtent' => '',
      ),
    ),
    'behaviors' => array(
      'openlayers_behavior_keyboarddefaults' => array(),
      'openlayers_behavior_navigation' => array(
        'zoomWheelEnabled' => 0,
        'zoomBoxEnabled' => 1,
        'documentDrag' => 0,
      ),
      'openlayers_behavior_panzoombar' => array(
        'zoomWorldIcon' => 0,
        'panIcons' => 1,
      ),
      'openlayers_behavior_popup' => array(
        'layers' => array(
          'dossier_events_search_api_openlayers_dossier_events' => 'dossier_events_search_api_openlayers_dossier_events',
        ),
        'panMapIfOutOfView' => 0,
        'keepInMap' => 1,
      ),
      'openlayers_behavior_zoomtolayer' => array(
        'zoomtolayer' => array(
          'dossier_events_search_api_openlayers_dossier_events' => 'dossier_events_search_api_openlayers_dossier_events',
          'google_normal' => 0,
        ),
        'point_zoom_level' => '5',
        'zoomtolayer_scale' => '1',
      ),
      'openlayers_behavior_cluster' => array(
        'clusterlayer' => array(
          'dossier_events_search_api_openlayers_dossier_events' => 'dossier_events_search_api_openlayers_dossier_events',
        ),
        'distance' => '20',
        'threshold' => '',
        'display_cluster_numbers' => 1,
        'middle_lower_bound' => '15',
        'middle_upper_bound' => '50',
        'low_color' => 'rgb(141, 203, 61)',
        'middle_color' => 'rgb(49, 190, 145)',
        'high_color' => 'rgb(35, 59, 177)',
      ),
    ),
    'default_layer' => 'mapquest_osm',
    'layers' => array(
      'google_normal' => 'google_normal',
      'dossier_events_search_api_openlayers_dossier_events' => 'dossier_events_search_api_openlayers_dossier_events',
    ),
    'layer_weight' => array(
      'dossier_events_search_api_openlayers_dossier_events' => '0',
      'dossier_events_openlayers_1' => '0',
      'openlayers_geojson_picture_this' => '0',
      'openlayers_kml_example' => '0',
      'geofield_formatter' => '0',
    ),
    'layer_styles' => array(
      'geofield_formatter' => '0',
      'openlayers_kml_example' => '0',
      'openlayers_geojson_picture_this' => '0',
      'dossier_events_openlayers_1' => '0',
      'dossier_events_search_api_openlayers_dossier_events' => 'default_marker_blue',
    ),
    'layer_styles_select' => array(
      'geofield_formatter' => '0',
      'openlayers_kml_example' => '0',
      'openlayers_geojson_picture_this' => '0',
      'dossier_events_openlayers_1' => '0',
      'dossier_events_search_api_openlayers_dossier_events' => 'default_marker_green',
    ),
    'layer_styles_temporary' => array(
      'geofield_formatter' => '0',
      'openlayers_kml_example' => '0',
      'openlayers_geojson_picture_this' => '0',
      'dossier_events_openlayers_1' => '0',
      'dossier_events_search_api_openlayers_dossier_events' => '0',
    ),
    'layer_activated' => array(
      'dossier_events_search_api_openlayers_dossier_events' => 'dossier_events_search_api_openlayers_dossier_events',
      'geofield_formatter' => 0,
      'openlayers_kml_example' => 0,
      'openlayers_geojson_picture_this' => 0,
      'dossier_events_openlayers_1' => 0,
    ),
    'layer_switcher' => array(
      'dossier_events_search_api_openlayers_dossier_events' => 0,
      'geofield_formatter' => 0,
      'openlayers_kml_example' => 0,
      'openlayers_geojson_picture_this' => 0,
      'dossier_events_openlayers_1' => 0,
    ),
    'projection' => 'EPSG:900913',
    'displayProjection' => 'EPSG:4326',
    'styles' => array(
      'default' => 'default_marker_blue',
      'select' => 'default_marker_green',
      'temporary' => 'default',
    ),
  );
  $export['clone_of_geofield_formatter_map'] = $openlayers_maps;

  return $export;
}

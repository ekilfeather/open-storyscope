<?php
/**
 * @file
 * Selectivizr module - Helper functions.
 */

/**
 * Search and return Selectivizr plugin path.
 *
 * @return string
 *   returns FALSE if the library isn't found.
 */
function _selectivizr_script_path() {
  $jspath = FALSE;
  $module_path = drupal_get_path('module', 'selectivizr');

  if (module_exists('libraries') && function_exists('libraries_get_path') && file_exists(libraries_get_path('selectivizr'))) {
    $library_path = libraries_get_path('selectivizr');
    if (file_exists($library_path . '/selectivizr.js')) {
      $jspath = $library_path;
    }
  }
  elseif (file_exists($module_path . '/selectivizr.js')) {
    $jspath = $module_path;
  }

  return $jspath;
}

/**
 * Search and return Selectivizr plugin path.
 *
 * @return string
 *   returns FALSE if the files isn't found.
 */
function _selectivizr_css_path() {
  $csspath = FALSE;
  $module_path = drupal_get_path('module', 'selectivizr');

  if (file_exists($module_path . '/selectivizr.css')) {
    $csspath = $module_path;
  }
  elseif ($custom_path = variable_get('selectivizr_css_path')) {
    if (file_exists($custom_path . '/selectivizr.css')) {
      $csspath = $custom_path;
    }
  }

  return $csspath;
}

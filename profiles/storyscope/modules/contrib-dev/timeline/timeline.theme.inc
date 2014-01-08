<?php
/**
 * @file
 * Theme functions for timeline.
 */

/**
 * Implementation of template_process for views-view-timeline.
 */
function template_preprocess_views_view_timeline(&$vars) {

  if (!empty($vars['view']->live_preview)) {
    drupal_set_message(t('The timeline cannot be viewed in the preview.'), 'warning');
    return;
  }

  if (isset($vars['options']['debug'])) {
    $vars['debug'] = theme('timeline_debug', array('debug_array' => $vars['options']['debug']));
  }
    
  // check if data is available
  if ($vars['options']['timeline']['data_count'] > 0) {
    // create actual timeline
    if (_timeline_include($vars['options']['timeline']['theme'])) {

      // preprocess css information for the template
      $vars['id'] = $vars['options']['timeline']['class'];
      $vars['class'] = $vars['options']['timeline']['class'];
      $vars['height'] = $vars['options']['timeline']['height'];
      $vars['width'] = $vars['options']['timeline']['width'];
      $vars['controls'] = $vars['options']['misc']['controls'];
      $vars['timeline_theme'] = $vars['options']['timeline']['theme'];
    }
  }
  else {
    theme('timeline_nodata', array());
  }
}


/**
 * Overridable theme function.
 * This functions prints a warning when no data is available.
 */
function theme_timeline_nodata($vars) {
  drupal_set_message(t('There is no data available to show on the timeline'), 'warning');
}

/**
 * Overridable theme function.
 * This returns the title of each event bubble on the timeline.
 */
function theme_timeline_bubble_title($vars) {
  $row = $vars['row'];
  $alias = $vars['alias'];
  return $row->$alias;
}


/**
 * Overridable theme function.
 * This creates the url that the title of each event bubble is linked to.
 */
function theme_timeline_bubble_url($vars) {
  $row = $vars['row'];
  $link_enabled = $vars['link_enabled'];

  if ($link_enabled) {
    return base_path() . drupal_get_path_alias('node/' . $row->nid);
  }
  return FALSE;
}

/*
 * Function to theme a textarea with a array inside
 */
function theme_timeline_debug($vars) {
  $debug_array = $vars['debug_array'];
  $output = '<div id="timeline_debug">';
  $output .= '<label><strong>DEBUG:</strong></label>';
  $output .= '<div class="resizable-textarea"><textarea id="edit-code" class="form-textarea resizable textarea-processed" name="code" rows ="10" cols="60">';
  $output .= var_export($debug_array, TRUE);
  $output .= '</textarea></div></div>';
  return $output;
}

/**
 * Inlude all js and css files that needs the timeline.
 *
 * @return: TRUE if everything could be included properly
 *          FALSE if Simile Exhibit Libraries couldn't be included properly
 */
function _timeline_include($timeline_theme) {
  static $loaded = FALSE;

  if (!$loaded) {

    // Check correct inclusion of local timeline library
    if ($timeline_library_status = timeline_validate_library()) {

      // some error messages are available, because of detected errors during validation
      if (is_string($timeline_library_status)) {
        drupal_set_message(check_plain($timeline_library_status));
        return FALSE;
      }

      // timeline library has been validated and will be added
      elseif ($timeline_library_status == TRUE) {

        $timeline_lib_path = libraries_get_path('simile_timeline');

        // We need $base_path for the js client not drupal_add_js().
        global $base_path;
        // Set some global js variables that the library is going to need for proper inclusion and funcionality
        $timeline_inline_js = "var Timeline_ajax_url = '" . $base_path . $timeline_lib_path . "/timeline_ajax/simile-ajax-api.js'; ";
        $timeline_inline_js .= " var Timeline_urlPrefix= '" . $base_path . $timeline_lib_path . "/timeline_js/'; ";
        if (variable_get('timeline_bundle', TRUE))
          $timeline_inline_js .= " var Timeline_parameters='bundle=true'";
        else
          $timeline_inline_js .= " var Timeline_parameters='bundle=false'";
        drupal_add_js($timeline_inline_js, array('type' => 'inline', 'weight' => 10));


        // Adding general timeline library
        drupal_add_js($timeline_lib_path . '/timeline_js/timeline-api.js', array('weight' => 11, 'preprocess' => FALSE));

        // include custom theme files (if activated)
        if ($timeline_theme != 'classic_theme' && $timeline_theme != FALSE) {
          ctools_include('plugins');
          $timeline_themes = ctools_get_plugins('timeline', 'themes');
          if (isset($timeline_themes[$timeline_theme])) {
            drupal_add_js($timeline_themes[$timeline_theme]['files']['js'], array('weight' => 12));
            drupal_add_css($timeline_themes[$timeline_theme]['files']['css']);
          }
        }

        drupal_add_css('timeline', 'timeline');
        drupal_add_js(drupal_get_path('module', 'timeline') . '/js/timeline.js', array('weight' => 13));
        $loaded = TRUE;

        return TRUE;
      }
    }
    drupal_set_message(t('Simile Timeline Libraries not found'), 'error');
    return FALSE;
  }
}

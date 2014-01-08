<?php
/**
 * @file
 * only_html_input_format.features.filter.inc
 */

/**
 * Implements hook_filter_default_formats().
 */
function only_html_input_format_filter_default_formats() {
  $formats = array();

  // Exported format: Only HTML.
  $formats['only_html'] = array(
    'format' => 'only_html',
    'name' => 'Only HTML',
    'cache' => '1',
    'status' => '1',
    'weight' => '10',
    'filters' => array(
      'filter_htmlcorrector' => array(
        'weight' => '10',
        'status' => '1',
        'settings' => array(),
      ),
    ),
  );

  return $formats;
}

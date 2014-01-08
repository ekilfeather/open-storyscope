<?php
/**
 * @file
 * variables_storyscope.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function variables_storyscope_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'colorbox_compression_type';
  $strongarm->value = 'minified';
  $export['colorbox_compression_type'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'colorbox_load';
  $strongarm->value = TRUE;
  $export['colorbox_load'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'colorbox_pages';
  $strongarm->value = 'dossiers/*/stories/*/sections/*';
  $export['colorbox_pages'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'colorbox_visibility';
  $strongarm->value = '0';
  $export['colorbox_visibility'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'date_format_year_only';
  $strongarm->value = 'Y';
  $export['date_format_year_only'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'partial_date_format_long';
  $strongarm->value = array(
    'meridiem' => 'a',
    'year_designation' => 'bc',
    'display' => array(
      'year' => 'estimate_label',
      'month' => 'estimate_label',
      'day' => 'estimate_label',
      'hour' => 'estimate_label',
      'minute' => 'estimate_label',
      'second' => 'estimate_label',
      'timezone' => 'date_only',
    ),
    'separator' => array(
      'date' => ' ',
      'time' => ':',
      'datetime' => ', ',
      'other' => ' ',
      'range' => '',
    ),
    'components' => array(
      'year' => array(
        'format' => 'Y-ce',
        'empty' => '',
        'weight' => '0',
      ),
      'month' => array(
        'format' => 'F',
        'empty' => '',
        'weight' => '1',
      ),
      'day' => array(
        'format' => 'j-S',
        'empty' => '',
        'weight' => '2',
      ),
      'hour' => array(
        'format' => 'h',
        'empty' => '',
        'weight' => '3',
      ),
      'minute' => array(
        'format' => 'i',
        'empty' => '',
        'weight' => '4',
      ),
      'second' => array(
        'format' => 's',
        'empty' => '',
        'weight' => '5',
      ),
      'timezone' => array(
        'format' => 'e',
        'empty' => '',
        'weight' => '6',
      ),
      'c1' => array(
        'value' => '',
        'weight' => '7',
      ),
      'c2' => array(
        'value' => '',
        'weight' => '8',
      ),
      'c3' => array(
        'value' => '',
        'weight' => '9',
      ),
      'approx' => array(
        'value' => '',
        'weight' => '-1',
      ),
    ),
  );
  $export['partial_date_format_long'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'partial_date_format_medium';
  $strongarm->value = array(
    'meridiem' => 'a',
    'year_designation' => 'bc',
    'display' => array(
      'year' => 'estimate_label',
      'month' => 'estimate_label',
      'day' => 'estimate_label',
      'hour' => 'estimate_label',
      'minute' => 'estimate_label',
      'second' => 'estimate_label',
      'timezone' => 'date_only',
    ),
    'separator' => array(
      'date' => ' ',
      'time' => ':',
      'datetime' => ' ',
      'other' => ' ',
      'range' => '',
    ),
    'components' => array(
      'year' => array(
        'format' => 'Y-ce',
        'empty' => '',
        'weight' => '0',
      ),
      'month' => array(
        'format' => 'M',
        'empty' => '',
        'weight' => '1',
      ),
      'day' => array(
        'format' => 'j-S',
        'empty' => '',
        'weight' => '2',
      ),
      'hour' => array(
        'format' => 'h',
        'empty' => '',
        'weight' => '3',
      ),
      'minute' => array(
        'format' => 'i',
        'empty' => '',
        'weight' => '4',
      ),
      'second' => array(
        'format' => 's',
        'empty' => '',
        'weight' => '5',
      ),
      'timezone' => array(
        'format' => 'T',
        'empty' => '',
        'weight' => '6',
      ),
      'c1' => array(
        'value' => '',
        'weight' => '7',
      ),
      'c2' => array(
        'value' => '',
        'weight' => '8',
      ),
      'c3' => array(
        'value' => '',
        'weight' => '9',
      ),
      'approx' => array(
        'value' => '',
        'weight' => '-1',
      ),
    ),
  );
  $export['partial_date_format_medium'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'partial_date_format_short';
  $strongarm->value = array(
    'meridiem' => 'a',
    'year_designation' => 'bc',
    'display' => array(
      'year' => 'estimate_label',
      'month' => 'none',
      'day' => 'none',
      'hour' => 'none',
      'minute' => 'none',
      'second' => 'none',
      'timezone' => 'none',
    ),
    'separator' => array(
      'date' => '/',
      'time' => ':',
      'datetime' => ' ',
      'other' => ' ',
      'range' => '',
    ),
    'components' => array(
      'year' => array(
        'format' => 'Y',
        'empty' => '',
        'weight' => '0',
      ),
      'month' => array(
        'format' => 'm',
        'empty' => '',
        'weight' => '1',
      ),
      'day' => array(
        'format' => 'j',
        'empty' => '',
        'weight' => '2',
      ),
      'hour' => array(
        'format' => 'H',
        'empty' => '',
        'weight' => '3',
      ),
      'minute' => array(
        'format' => 'i',
        'empty' => '',
        'weight' => '4',
      ),
      'second' => array(
        'format' => 's',
        'empty' => '',
        'weight' => '5',
      ),
      'timezone' => array(
        'format' => 'T',
        'empty' => '',
        'weight' => '6',
      ),
      'c1' => array(
        'value' => '',
        'weight' => '7',
      ),
      'c2' => array(
        'value' => '',
        'weight' => '8',
      ),
      'c3' => array(
        'value' => '',
        'weight' => '9',
      ),
      'approx' => array(
        'value' => '',
        'weight' => '-1',
      ),
    ),
  );
  $export['partial_date_format_short'] = $strongarm;

  return $export;
}

<?php

/**
 * @file
 * Definition of the date module integration
 */

$plugin = array(
  'name' => t('Date field'),
  'callback' => 'timeline_date_source_date_field_conversion',
  'handler_name' => 'views_handler_field_field',
  'field_type' => 'date',
);

/**
 * Converts different expected date formats to one global date format to talk to the timeline.
 * Respects drupal's timezone handling.
 *
 * @return
 *   date in defined output
 *
 * Notes: -fd
 * 1. Adding "Z" to ISO-Date. This is a "dirty" trick to disable timeline's automatic timezone detection of the browswer
 * 2. Using two date_convert functions to be able to respect timezones. This can be done better!
 * 3. Drupal's gobal timezone settings are taken. Not the date field specific settings.
 */
function timeline_date_source_date_field_conversion($date, $output_format, $options = array()) {
  $input_format = $options['field']['date_format'];
  $tz_handling = $options['field']['tz_handling'];
  $timezone = date_get_timezone($tz_handling);
  $db_timezone = date_get_timezone_db($tz_handling);
  switch ($output_format) {
    case 'iso8601':
      return timeline_convert_to_iso($date, $input_format, $timezone, $db_timezone);
    case 'gregorian':
      return timeline_convert_to_gregorian($date, $input_format, $timezone, $db_timezone);
    case 'timestamp':
      return timeline_convert_to_timestamp($date, $input_format, $timezone, $db_timezone);
  }
}

<?php
/**
 * @file
 * Implementation of the post date plugin
 */


$plugin = array(
  'name' => t('Post date'),
  'callback' => 'timeline_date_source_post_date_conversion',
  'handler_name' => 'views_handler_field_date',
  'field_type' => 'date',
);



function timeline_date_source_post_date_conversion($date, $output_format, $options = array()) {
  $input_format = 'timestamp';
  $timezone = timeline_get_timezone();
  $db_timezone = 'UTC';
  switch ($output_format) {
    case 'iso8601':
      return timeline_convert_to_iso($date, $input_format, $timezone, $db_timezone);
    case 'gregorian':
      return timeline_convert_to_gregorian($date, $input_format, $timezone, $db_timezone);
    case 'timestamp':
      return timeline_convert_to_timestamp($date, $input_format, $timezone, $db_timezone);
  }
}



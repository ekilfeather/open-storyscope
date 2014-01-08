<?php
/**
 * @file
 * bean_slider_bean.bean.inc
 */

/**
 * Implements hook_bean_admin_ui_types().
 */
function bean_slider_bean_bean_admin_ui_types() {
  $export = array();

  $bean_type = new stdClass();
  $bean_type->disabled = FALSE; /* Edit this to true to make a default bean_type disabled initially */
  $bean_type->api_version = 5;
  $bean_type->name = 'slider_bean';
  $bean_type->label = 'Slider Bean';
  $bean_type->options = '';
  $bean_type->description = '';
  $export['slider_bean'] = $bean_type;

  return $export;
}

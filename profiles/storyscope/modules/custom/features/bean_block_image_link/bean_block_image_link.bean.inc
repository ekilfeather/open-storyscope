<?php
/**
 * @file
 * bean_block_image_link.bean.inc
 */

/**
 * Implements hook_bean_admin_ui_types().
 */
function bean_block_image_link_bean_admin_ui_types() {
  $export = array();

  $bean_type = new stdClass();
  $bean_type->disabled = FALSE; /* Edit this to true to make a default bean_type disabled initially */
  $bean_type->api_version = 5;
  $bean_type->name = 'block_image';
  $bean_type->label = 'Block - Image & Link';
  $bean_type->options = '';
  $bean_type->description = 'Block with Image and Link field';
  $export['block_image'] = $bean_type;

  return $export;
}

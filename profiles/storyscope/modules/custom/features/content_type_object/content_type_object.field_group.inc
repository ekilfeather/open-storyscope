<?php
/**
 * @file
 * content_type_object.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function content_type_object_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_creator|node|object|form';
  $field_group->group_name = 'group_creator';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'object';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Creator(s)',
    'weight' => '18',
    'children' => array(),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Creator(s)',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => '',
        'description' => 'The creator or creators of this object.',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_creator|node|object|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_dimensions|node|object|form';
  $field_group->group_name = 'group_dimensions';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'object';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Dimensions',
    'weight' => '17',
    'children' => array(),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Dimensions',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => '',
        'description' => 'Dimensions for this object.',
      ),
      'formatter' => 'collapsible',
    ),
  );
  $export['group_dimensions|node|object|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_object_lido|node|object|form';
  $field_group->group_name = 'group_object_lido';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'object';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Deprecated Facets (to be removed)',
    'weight' => '16',
    'children' => array(
      0 => 'field_object_classification',
      1 => 'field_object_collection',
      2 => 'field_object_country_of_origin',
      3 => 'field_object_creation_timestamp',
      4 => 'field_object_creator',
      5 => 'field_object_identifier',
      6 => 'field_object_materials',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Deprecated Facets (to be removed)',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => '',
        'description' => '',
      ),
      'formatter' => 'collapsible',
    ),
  );
  $export['group_object_lido|node|object|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_object_tombstone|node|object|image_and_properties';
  $field_group->group_name = 'group_object_tombstone';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'object';
  $field_group->mode = 'image_and_properties';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Object Information',
    'weight' => '3',
    'children' => array(
      0 => 'field_object_classification',
      1 => 'field_object_collection',
      2 => 'field_object_country_of_origin',
      3 => 'field_object_creator',
      4 => 'field_object_credit_line',
      5 => 'field_object_dimensions',
      6 => 'field_object_identifier',
      7 => 'field_object_materials',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Object Information',
      'instance_settings' => array(
        'classes' => 'object-properties',
        'description' => '',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_object_tombstone|node|object|image_and_properties'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_object_tombstone|node|object|thumbnail_image_and_properties';
  $field_group->group_name = 'group_object_tombstone';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'object';
  $field_group->mode = 'thumbnail_image_and_properties';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => '',
    'weight' => '1',
    'children' => array(
      0 => 'field_fb_agent',
      1 => 'field_fb_classification',
      2 => 'field_fb_country',
      3 => 'field_fb_location',
      4 => 'field_fb_materials',
      5 => 'field_fb_object_identifier',
      6 => 'field_fb_tags',
      7 => 'field_object_classification',
      8 => 'field_object_collection',
      9 => 'field_object_country_of_origin',
      10 => 'field_object_creator',
      11 => 'field_object_credit_line',
      12 => 'field_object_dimensions',
      13 => 'field_object_identifier',
      14 => 'field_object_materials',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => '',
      'instance_settings' => array(
        'classes' => 'object-properties',
        'description' => '',
      ),
      'formatter' => 'open',
    ),
  );
  $export['group_object_tombstone|node|object|thumbnail_image_and_properties'] = $field_group;

  return $export;
}

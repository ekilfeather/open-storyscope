<?php
/**
 * @file
 * content_type_event.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function content_type_event_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_event_properties|node|event|default';
  $field_group->group_name = 'group_event_properties';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'event';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Event Properties',
    'weight' => '3',
    'children' => array(
      0 => 'field_event_activity',
      1 => 'field_event_agent',
      2 => 'field_event_genre',
      3 => 'field_event_location',
      4 => 'field_event_object',
      5 => 'field_event_style_movement',
      6 => 'field_fb_agent',
      7 => 'field_fb_genre',
      8 => 'field_fb_location',
      9 => 'field_fb_style_movement',
      10 => 'field_fb_tags',
      11 => 'field_fb_value',
    ),
    'format_type' => 'div',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'show_label' => 1,
        'label_element' => 'h3',
        'effect' => 'none',
        'speed' => 'fast',
        'classes' => '',
      ),
    ),
  );
  $export['group_event_properties|node|event|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_event_properties|node|event|form';
  $field_group->group_name = 'group_event_properties';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'event';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Deprecated Properties (to be removed)',
    'weight' => '17',
    'children' => array(
      0 => 'field_event_agent',
      1 => 'field_event_genre',
      2 => 'field_event_location',
      3 => 'field_event_object',
      4 => 'field_event_style_movement',
      5 => 'field_event_value',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Deprecated Properties (to be removed)',
      'instance_settings' => array(
        'required_fields' => 1,
        'classes' => '',
        'description' => '',
      ),
      'formatter' => 'collapsible',
    ),
  );
  $export['group_event_properties|node|event|form'] = $field_group;

  return $export;
}

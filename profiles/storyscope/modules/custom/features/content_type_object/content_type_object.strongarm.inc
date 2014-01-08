<?php
/**
 * @file
 * content_type_object.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function content_type_object_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_object';
  $strongarm->value = 0;
  $export['comment_anonymous_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_object';
  $strongarm->value = 1;
  $export['comment_default_mode_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_object';
  $strongarm->value = '50';
  $export['comment_default_per_page_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_object';
  $strongarm->value = 1;
  $export['comment_form_location_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_object';
  $strongarm->value = '1';
  $export['comment_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_object';
  $strongarm->value = '1';
  $export['comment_preview_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_object';
  $strongarm->value = 1;
  $export['comment_subject_field_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'field_bundle_settings_node__object';
  $strongarm->value = array(
    'view_modes' => array(
      'teaser' => array(
        'custom_settings' => TRUE,
      ),
      'full' => array(
        'custom_settings' => FALSE,
      ),
      'rss' => array(
        'custom_settings' => FALSE,
      ),
      'search_index' => array(
        'custom_settings' => FALSE,
      ),
      'search_result' => array(
        'custom_settings' => FALSE,
      ),
      'diff_standard' => array(
        'custom_settings' => FALSE,
      ),
      'token' => array(
        'custom_settings' => FALSE,
      ),
      'entityreference_view_widget' => array(
        'custom_settings' => TRUE,
      ),
      'subtitle_teaser' => array(
        'custom_settings' => TRUE,
      ),
      'thumbnail' => array(
        'custom_settings' => TRUE,
      ),
      'thumbnail_teaser' => array(
        'custom_settings' => TRUE,
      ),
      'title_only' => array(
        'custom_settings' => TRUE,
      ),
      'highlight' => array(
        'custom_settings' => TRUE,
      ),
      'teaser_suggested' => array(
        'custom_settings' => TRUE,
      ),
      'teaser_recommender_pick' => array(
        'custom_settings' => TRUE,
      ),
      'slide' => array(
        'custom_settings' => TRUE,
      ),
      'small_thumbnail' => array(
        'custom_settings' => TRUE,
      ),
      'image_and_properties' => array(
        'custom_settings' => TRUE,
      ),
      'image_properties_and_title' => array(
        'custom_settings' => TRUE,
      ),
      'eva_node' => array(
        'custom_settings' => TRUE,
      ),
      'small_unclickable_thumbnail' => array(
        'custom_settings' => TRUE,
      ),
      'colorbox' => array(
        'custom_settings' => FALSE,
      ),
      'thumbnail_image_and_properties' => array(
        'custom_settings' => FALSE,
      ),
      'eva_node_thumbnail' => array(
        'custom_settings' => FALSE,
      ),
      'title_and_properties' => array(
        'custom_settings' => TRUE,
      ),
    ),
    'extra_fields' => array(
      'form' => array(
        'title' => array(
          'weight' => '0',
        ),
        'path' => array(
          'weight' => '15',
        ),
        'redirect' => array(
          'weight' => '30',
        ),
      ),
      'display' => array(
        'created' => array(
          'thumbnail' => array(
            'weight' => '18',
            'visible' => FALSE,
          ),
          'highlight' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'default' => array(
            'weight' => '11',
            'visible' => FALSE,
          ),
          'slide' => array(
            'weight' => '17',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
          'image_and_properties' => array(
            'weight' => '15',
            'visible' => FALSE,
          ),
          'small_thumbnail' => array(
            'weight' => '11',
            'visible' => FALSE,
          ),
          'small_unclickable_thumbnail' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'subtitle_teaser' => array(
            'weight' => '-5',
            'visible' => TRUE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
          'title_and_properties' => array(
            'weight' => '13',
            'visible' => FALSE,
          ),
        ),
        'type' => array(
          'thumbnail' => array(
            'weight' => '0',
            'visible' => FALSE,
          ),
          'highlight' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'default' => array(
            'weight' => '13',
            'visible' => FALSE,
          ),
          'slide' => array(
            'weight' => '18',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '1',
            'visible' => FALSE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'image_and_properties' => array(
            'weight' => '16',
            'visible' => FALSE,
          ),
          'small_thumbnail' => array(
            'weight' => '12',
            'visible' => FALSE,
          ),
          'small_unclickable_thumbnail' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'subtitle_teaser' => array(
            'weight' => '-5',
            'visible' => TRUE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'title_and_properties' => array(
            'weight' => '14',
            'visible' => FALSE,
          ),
        ),
        'title' => array(
          'thumbnail' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'highlight' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'default' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'slide' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'image_and_properties' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'small_thumbnail' => array(
            'weight' => '13',
            'visible' => FALSE,
          ),
          'small_unclickable_thumbnail' => array(
            'weight' => '-4',
            'visible' => FALSE,
          ),
          'subtitle_teaser' => array(
            'weight' => '-4',
            'visible' => TRUE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'title_and_properties' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
        ),
        'add_to' => array(
          'thumbnail' => array(
            'weight' => '5',
            'visible' => TRUE,
          ),
          'default' => array(
            'weight' => '17',
            'visible' => FALSE,
          ),
          'slide' => array(
            'weight' => '14',
            'visible' => FALSE,
          ),
          'highlight' => array(
            'weight' => '10',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '5',
            'visible' => TRUE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '3',
            'visible' => FALSE,
          ),
          'image_and_properties' => array(
            'weight' => '17',
            'visible' => FALSE,
          ),
          'small_thumbnail' => array(
            'weight' => '14',
            'visible' => FALSE,
          ),
          'small_unclickable_thumbnail' => array(
            'weight' => '10',
            'visible' => FALSE,
          ),
          'subtitle_teaser' => array(
            'weight' => '10',
            'visible' => TRUE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'title_and_properties' => array(
            'weight' => '15',
            'visible' => FALSE,
          ),
        ),
        'remove' => array(
          'thumbnail' => array(
            'weight' => '6',
            'visible' => TRUE,
          ),
          'slide' => array(
            'weight' => '5',
            'visible' => TRUE,
          ),
          'highlight' => array(
            'weight' => '10',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '6',
            'visible' => TRUE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
          'image_and_properties' => array(
            'weight' => '18',
            'visible' => FALSE,
          ),
          'small_thumbnail' => array(
            'weight' => '15',
            'visible' => FALSE,
          ),
          'small_unclickable_thumbnail' => array(
            'weight' => '10',
            'visible' => FALSE,
          ),
          'default' => array(
            'weight' => '16',
            'visible' => FALSE,
          ),
          'subtitle_teaser' => array(
            'weight' => '10',
            'visible' => TRUE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'title_and_properties' => array(
            'weight' => '12',
            'visible' => TRUE,
          ),
        ),
        'add_similar' => array(
          'default' => array(
            'weight' => '12',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'subtitle_teaser' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'thumbnail' => array(
            'weight' => '7',
            'visible' => FALSE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '7',
            'visible' => FALSE,
          ),
          'highlight' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'image_and_properties' => array(
            'weight' => '14',
            'visible' => FALSE,
          ),
          'small_unclickable_thumbnail' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'small_thumbnail' => array(
            'weight' => '3',
            'visible' => FALSE,
          ),
          'slide' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'title_and_properties' => array(
            'weight' => '16',
            'visible' => FALSE,
          ),
        ),
      ),
    ),
  );
  $export['field_bundle_settings_node__object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_object';
  $strongarm->value = '0';
  $export['language_content_type_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_object';
  $strongarm->value = array();
  $export['menu_options_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_object';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_object';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_object';
  $strongarm->value = '0';
  $export['node_preview_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_object';
  $strongarm->value = 0;
  $export['node_submitted_object'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_object_pattern';
  $strongarm->value = 'objects/[node:nid]';
  $export['pathauto_node_object_pattern'] = $strongarm;

  return $export;
}

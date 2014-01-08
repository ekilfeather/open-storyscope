<?php
/**
 * @file
 * content_type_story.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function content_type_story_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_story';
  $strongarm->value = 0;
  $export['comment_anonymous_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_story';
  $strongarm->value = 1;
  $export['comment_default_mode_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_story';
  $strongarm->value = '50';
  $export['comment_default_per_page_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_story';
  $strongarm->value = 1;
  $export['comment_form_location_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_story';
  $strongarm->value = '1';
  $export['comment_preview_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_story';
  $strongarm->value = '1';
  $export['comment_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_story';
  $strongarm->value = 1;
  $export['comment_subject_field_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'field_bundle_settings_node__story';
  $strongarm->value = array(
    'view_modes' => array(
      'teaser' => array(
        'custom_settings' => TRUE,
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
      'slide' => array(
        'custom_settings' => FALSE,
      ),
      'token' => array(
        'custom_settings' => FALSE,
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
    ),
    'extra_fields' => array(
      'form' => array(
        'title' => array(
          'weight' => '-5',
        ),
        'path' => array(
          'weight' => '30',
        ),
      ),
      'display' => array(
        'created' => array(
          'default' => array(
            'weight' => '-5',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '7',
            'visible' => FALSE,
          ),
          'image_properties_and_title' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
        ),
        'type' => array(
          'default' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
          'image_properties_and_title' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
        ),
        'add_to' => array(
          'default' => array(
            'weight' => '10',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'image_properties_and_title' => array(
            'weight' => '3',
            'visible' => FALSE,
          ),
        ),
        'remove' => array(
          'default' => array(
            'weight' => '10',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'image_properties_and_title' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
        ),
        'title' => array(
          'default' => array(
            'weight' => '-4',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'image_properties_and_title' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
        ),
      ),
    ),
  );
  $export['field_bundle_settings_node__story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_story';
  $strongarm->value = '0';
  $export['language_content_type_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_story';
  $strongarm->value = array();
  $export['menu_options_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_story';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_story';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_story';
  $strongarm->value = '0';
  $export['node_preview_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_story';
  $strongarm->value = 0;
  $export['node_submitted_story'] = $strongarm;

  return $export;
}

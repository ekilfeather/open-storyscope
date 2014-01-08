<?php
/**
 * @file
 * content_type_event.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function content_type_event_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_event';
  $strongarm->value = 0;
  $export['comment_anonymous_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_event';
  $strongarm->value = 1;
  $export['comment_default_mode_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_event';
  $strongarm->value = '50';
  $export['comment_default_per_page_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_event';
  $strongarm->value = '1';
  $export['comment_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_event';
  $strongarm->value = 1;
  $export['comment_form_location_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_event';
  $strongarm->value = '1';
  $export['comment_preview_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_event';
  $strongarm->value = 1;
  $export['comment_subject_field_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'field_bundle_settings_node__event';
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
      'entityreference_view_widget' => array(
        'custom_settings' => TRUE,
      ),
      'slide' => array(
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
          'weight' => '0',
        ),
        'path' => array(
          'weight' => '8',
        ),
        'redirect' => array(
          'weight' => '7',
        ),
      ),
      'display' => array(
        'created' => array(
          'title_only' => array(
            'weight' => '1',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '9',
            'visible' => FALSE,
          ),
          'default' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'highlight' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
          'subtitle_teaser' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
          'thumbnail' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
          'teaser_suggested' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
          'teaser_recommender_pick' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
        ),
        'type' => array(
          'title_only' => array(
            'weight' => '2',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '0',
            'visible' => FALSE,
          ),
          'default' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'highlight' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'subtitle_teaser' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'thumbnail' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'teaser_suggested' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'teaser_recommender_pick' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
        ),
        'title' => array(
          'title_only' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'default' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'highlight' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'subtitle_teaser' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'thumbnail' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'teaser_suggested' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'teaser_recommender_pick' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
        ),
        'add_to' => array(
          'teaser' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'default' => array(
            'weight' => '5',
            'visible' => TRUE,
          ),
        ),
        'remove' => array(
          'teaser' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'default' => array(
            'weight' => '8',
            'visible' => FALSE,
          ),
        ),
      ),
    ),
  );
  $export['field_bundle_settings_node__event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_event';
  $strongarm->value = array();
  $export['menu_options_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_event';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_event';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_event';
  $strongarm->value = '1';
  $export['node_preview_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_event';
  $strongarm->value = 0;
  $export['node_submitted_event'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_event_pattern';
  $strongarm->value = 'events/[node:nid]';
  $export['pathauto_node_event_pattern'] = $strongarm;

  return $export;
}

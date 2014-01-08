<?php
/**
 * @file
 * content_type_object_story.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function content_type_object_story_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_object_story';
  $strongarm->value = 0;
  $export['comment_anonymous_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_object_story';
  $strongarm->value = 1;
  $export['comment_default_mode_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_object_story';
  $strongarm->value = '50';
  $export['comment_default_per_page_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_object_story';
  $strongarm->value = 1;
  $export['comment_form_location_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_object_story';
  $strongarm->value = '1';
  $export['comment_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_object_story';
  $strongarm->value = '1';
  $export['comment_preview_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_object_story';
  $strongarm->value = 1;
  $export['comment_subject_field_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'field_bundle_settings_node__object_story';
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
        'custom_settings' => FALSE,
      ),
      'small_thumbnail' => array(
        'custom_settings' => TRUE,
      ),
      'image_and_properties' => array(
        'custom_settings' => TRUE,
      ),
      'eva_node' => array(
        'custom_settings' => TRUE,
      ),
      'image_properties_and_title' => array(
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
        'custom_settings' => TRUE,
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
          'teaser' => array(
            'weight' => '10',
            'visible' => FALSE,
          ),
          'highlight' => array(
            'weight' => '8',
            'visible' => FALSE,
          ),
          'default' => array(
            'weight' => '4',
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
            'weight' => '5',
            'visible' => FALSE,
          ),
          'title_only' => array(
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
          'eva_node' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'small_thumbnail' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'image_and_properties' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'eva_node_thumbnail' => array(
            'weight' => '5',
            'visible' => TRUE,
          ),
          'title_and_properties' => array(
            'weight' => '3',
            'visible' => FALSE,
          ),
        ),
        'type' => array(
          'teaser' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'highlight' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
          'default' => array(
            'weight' => '8',
            'visible' => FALSE,
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
            'weight' => '6',
            'visible' => FALSE,
          ),
          'title_only' => array(
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
          'eva_node' => array(
            'weight' => '9',
            'visible' => FALSE,
          ),
          'small_thumbnail' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'image_and_properties' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'eva_node_thumbnail' => array(
            'weight' => '9',
            'visible' => FALSE,
          ),
          'title_and_properties' => array(
            'weight' => '2',
            'visible' => FALSE,
          ),
        ),
        'title' => array(
          'teaser' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'highlight' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'default' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'subtitle_teaser' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'thumbnail' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'title_only' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'teaser_suggested' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'teaser_recommender_pick' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'eva_node' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'small_thumbnail' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'image_and_properties' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'eva_node_thumbnail' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'title_and_properties' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
        ),
        'object_nodes' => array(
          'default' => array(
            'weight' => '10',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'subtitle_teaser' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'thumbnail' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'title_only' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'teaser_suggested' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'teaser_recommender_pick' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'highlight' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'eva_node' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'small_thumbnail' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'image_and_properties' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'eva_node_thumbnail' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'title_and_properties' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
        ),
        'add_to' => array(
          'default' => array(
            'weight' => '6',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'highlight' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'eva_node' => array(
            'weight' => '6',
            'visible' => TRUE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'subtitle_teaser' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'thumbnail' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'title_only' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'teaser_suggested' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'teaser_recommender_pick' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'small_thumbnail' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'image_and_properties' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'eva_node_thumbnail' => array(
            'weight' => '7',
            'visible' => TRUE,
          ),
          'title_and_properties' => array(
            'weight' => '7',
            'visible' => FALSE,
          ),
        ),
        'remove' => array(
          'default' => array(
            'weight' => '5',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'highlight' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'eva_node' => array(
            'weight' => '7',
            'visible' => TRUE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'subtitle_teaser' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'thumbnail' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'title_only' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'teaser_suggested' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'teaser_recommender_pick' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'small_thumbnail' => array(
            'weight' => '5',
            'visible' => TRUE,
          ),
          'image_and_properties' => array(
            'weight' => '5',
            'visible' => TRUE,
          ),
          'eva_node_thumbnail' => array(
            'weight' => '6',
            'visible' => TRUE,
          ),
          'title_and_properties' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
        ),
        'object_story_events_entity_view_1' => array(
          'default' => array(
            'weight' => '9',
            'visible' => FALSE,
          ),
          'eva_node' => array(
            'weight' => '5',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '8',
            'visible' => FALSE,
          ),
          'entityreference_view_widget' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
          'subtitle_teaser' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
          'thumbnail' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '8',
            'visible' => FALSE,
          ),
          'title_only' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
          'highlight' => array(
            'weight' => '7',
            'visible' => FALSE,
          ),
          'teaser_suggested' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
          'teaser_recommender_pick' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
          'small_thumbnail' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'image_and_properties' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'eva_node_thumbnail' => array(
            'weight' => '10',
            'visible' => FALSE,
          ),
          'title_and_properties' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
        ),
        'object_story_events_story_section_object_story_events_pane' => array(
          'default' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
          'eva_node' => array(
            'weight' => '6',
            'visible' => TRUE,
          ),
          'eva_node_thumbnail' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
        ),
        'add_similar' => array(
          'teaser' => array(
            'weight' => '7',
            'visible' => FALSE,
          ),
          'subtitle_teaser' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '7',
            'visible' => FALSE,
          ),
          'title_only' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'highlight' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'teaser_suggested' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'teaser_recommender_pick' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'small_thumbnail' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'image_and_properties' => array(
            'weight' => '-5',
            'visible' => FALSE,
          ),
          'eva_node' => array(
            'weight' => '10',
            'visible' => FALSE,
          ),
          'default' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'eva_node_thumbnail' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'title_and_properties' => array(
            'weight' => '1',
            'visible' => FALSE,
          ),
        ),
        'dossier' => array(
          'default' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
          'eva_node' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'highlight' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
          'thumbnail_teaser' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
          'eva_node_thumbnail' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'title_and_properties' => array(
            'weight' => '8',
            'visible' => FALSE,
          ),
        ),
      ),
    ),
  );
  $export['field_bundle_settings_node__object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_object_story';
  $strongarm->value = '0';
  $export['language_content_type_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_object_story';
  $strongarm->value = array();
  $export['menu_options_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_object_story';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_object_story';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_object_story';
  $strongarm->value = '1';
  $export['node_preview_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_object_story';
  $strongarm->value = 0;
  $export['node_submitted_object_story'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_object_story_pattern';
  $strongarm->value = 'objectstories/[node:nid]';
  $export['pathauto_node_object_story_pattern'] = $strongarm;

  return $export;
}

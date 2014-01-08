<?php
/**
 * @file
 * content_type_plot_element.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function content_type_plot_element_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_plot_element';
  $strongarm->value = 0;
  $export['comment_anonymous_plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_plot_element';
  $strongarm->value = 1;
  $export['comment_default_mode_plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_plot_element';
  $strongarm->value = '50';
  $export['comment_default_per_page_plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_plot_element';
  $strongarm->value = 1;
  $export['comment_form_location_plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_plot_element';
  $strongarm->value = '1';
  $export['comment_plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_plot_element';
  $strongarm->value = '1';
  $export['comment_preview_plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_plot_element';
  $strongarm->value = 1;
  $export['comment_subject_field_plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'field_bundle_settings_node__plot_element';
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
      'token' => array(
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
        'redirect' => array(
          'weight' => '30',
        ),
      ),
      'display' => array(
        'created' => array(
          'highlight' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
          'default' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '3',
            'visible' => FALSE,
          ),
        ),
        'type' => array(
          'highlight' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'default' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
        ),
        'title' => array(
          'highlight' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'default' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
        ),
        'add_to' => array(
          'teaser' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
        ),
        'remove' => array(
          'teaser' => array(
            'weight' => '5',
            'visible' => TRUE,
          ),
        ),
      ),
    ),
  );
  $export['field_bundle_settings_node__plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_plot_element';
  $strongarm->value = array();
  $export['menu_options_plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_plot_element';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_plot_element';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_plot_element';
  $strongarm->value = '0';
  $export['node_preview_plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_plot_element';
  $strongarm->value = 0;
  $export['node_submitted_plot_element'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_plot_element_pattern';
  $strongarm->value = 'plotelements/[node:nid]';
  $export['pathauto_node_plot_element_pattern'] = $strongarm;

  return $export;
}

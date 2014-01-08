<?php
/**
 * @file
 * content_type_dossier.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function content_type_dossier_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_dossier';
  $strongarm->value = 0;
  $export['comment_anonymous_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_dossier';
  $strongarm->value = 1;
  $export['comment_default_mode_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_dossier';
  $strongarm->value = '50';
  $export['comment_default_per_page_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_dossier';
  $strongarm->value = '1';
  $export['comment_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_dossier';
  $strongarm->value = 1;
  $export['comment_form_location_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_dossier';
  $strongarm->value = '1';
  $export['comment_preview_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_dossier';
  $strongarm->value = 1;
  $export['comment_subject_field_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'field_bundle_settings_node__dossier';
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
    ),
    'extra_fields' => array(
      'form' => array(
        'title' => array(
          'weight' => '0',
        ),
        'path' => array(
          'weight' => '12',
        ),
        'redirect' => array(
          'weight' => '11',
        ),
      ),
      'display' => array(
        'created' => array(
          'default' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
          'eva_node' => array(
            'weight' => '2',
            'visible' => TRUE,
          ),
        ),
        'type' => array(
          'default' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
          'eva_node' => array(
            'weight' => '4',
            'visible' => FALSE,
          ),
        ),
        'title' => array(
          'default' => array(
            'weight' => '10',
            'visible' => FALSE,
          ),
          'teaser' => array(
            'weight' => '1',
            'visible' => TRUE,
          ),
          'eva_node' => array(
            'weight' => '0',
            'visible' => TRUE,
          ),
        ),
        'add_to' => array(
          'default' => array(
            'weight' => '9',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '3',
            'visible' => TRUE,
          ),
          'eva_node' => array(
            'weight' => '5',
            'visible' => FALSE,
          ),
        ),
        'remove' => array(
          'default' => array(
            'weight' => '8',
            'visible' => TRUE,
          ),
          'teaser' => array(
            'weight' => '4',
            'visible' => TRUE,
          ),
          'eva_node' => array(
            'weight' => '6',
            'visible' => FALSE,
          ),
        ),
      ),
    ),
  );
  $export['field_bundle_settings_node__dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'language_content_type_dossier';
  $strongarm->value = '0';
  $export['language_content_type_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_options_dossier';
  $strongarm->value = array();
  $export['menu_options_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'menu_parent_dossier';
  $strongarm->value = 'main-menu:0';
  $export['menu_parent_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'nodeaccess_userreference';
  $strongarm->value = array(
    'dossier' => array(
      'field_dossier_viewers' => array(
        'referenced' => array(
          'view' => 'view',
        ),
        'author' => array(
          'view' => 'view',
        ),
        'all' => array(
          'view' => 'view',
        ),
        'unused' => '1',
      ),
      'field_dossier_editors' => array(
        'referenced' => array(
          'view' => 'view',
          'update' => 'update',
        ),
        'referenced_published' => '1',
        'create' => array(
          'event' => 'event',
          'object' => 'object',
          'object_story' => 'object_story',
          'plot' => 'plot',
          'plot_element' => 'plot_element',
          'reference' => 'reference',
        ),
        'author' => array(
          'view' => 'view',
          'update' => 'update',
          'delete' => 'delete',
        ),
        'author_published' => '1',
        'unused' => '1',
      ),
    ),
  );
  $export['nodeaccess_userreference'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_dossier';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_preview_dossier';
  $strongarm->value = '1';
  $export['node_preview_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_submitted_dossier';
  $strongarm->value = 1;
  $export['node_submitted_dossier'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_node_dossier_pattern';
  $strongarm->value = 'dossiers/[node:nid]';
  $export['pathauto_node_dossier_pattern'] = $strongarm;

  return $export;
}

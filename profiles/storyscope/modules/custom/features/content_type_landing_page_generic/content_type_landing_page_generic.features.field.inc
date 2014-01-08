<?php
/**
 * @file
 * content_type_landing_page_generic.features.field.inc
 */

/**
 * Implements hook_field_default_fields().
 */
function content_type_landing_page_generic_field_default_fields() {
  $fields = array();

  // Exported field: 'node-landing_page-body'.
  $fields['node-landing_page-body'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(
        0 => 'node',
      ),
      'field_name' => 'body',
      'foreign keys' => array(
        'format' => array(
          'columns' => array(
            'format' => 'format',
          ),
          'table' => 'filter_format',
        ),
      ),
      'indexes' => array(
        'format' => array(
          0 => 'format',
        ),
      ),
      'locked' => '0',
      'module' => 'text',
      'settings' => array(),
      'translatable' => '0',
      'type' => 'text_with_summary',
    ),
    'field_instance' => array(
      'bundle' => 'landing_page',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'child_menu_list' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'default' => array(
          'label' => 'hidden',
          'module' => 'text',
          'settings' => array(),
          'type' => 'text_default',
          'weight' => '0',
        ),
        'teaser' => array(
          'label' => 'hidden',
          'module' => 'text',
          'settings' => array(
            'trim_length' => 600,
          ),
          'type' => 'text_summary_or_trimmed',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'body',
      'label' => 'Body',
      'required' => FALSE,
      'settings' => array(
        'display_summary' => TRUE,
        'text_processing' => 1,
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'module' => 'text',
        'settings' => array(
          'rows' => 20,
          'summary_rows' => 5,
        ),
        'type' => 'text_textarea_with_summary',
        'weight' => '1',
      ),
    ),
  );

  // Exported field: 'node-landing_page-field_block_content'.
  $fields['node-landing_page-field_block_content'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '6',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_block_content',
      'foreign keys' => array(
        'bid' => array(
          'columns' => array(
            'bid' => 'bid',
          ),
          'table' => 'block',
        ),
      ),
      'indexes' => array(
        'bid' => array(
          0 => 'bid',
        ),
      ),
      'locked' => '0',
      'module' => 'blockreference',
      'settings' => array(
        'referenceable_modules' => array(
          'bean' => 'bean',
          'block' => 0,
          'boxes' => 'boxes',
          'civicrm' => 0,
          'comment' => 0,
          'commerce_cart' => 0,
          'commerce_popular_month' => 0,
          'context_ui' => 0,
          'devel' => 0,
          'gmap_location' => 0,
          'menu' => 0,
          'menu_block' => 'menu_block',
          'node' => 0,
          'quicktabs' => 0,
          'search' => 0,
          'shortcut' => 0,
          'site_map' => 0,
          'system' => 0,
          'user' => 0,
          'views' => 0,
          'webform' => 0,
        ),
        'referenceable_operator' => 'AND',
        'referenceable_regions' => array(
          '' => 0,
          'content' => 0,
          'dashboard_inactive' => 0,
          'dashboard_main' => 0,
          'dashboard_sidebar' => 0,
          'featured' => 0,
          'footer' => 0,
          'footer_first' => 0,
          'footer_firstcolumn' => 0,
          'footer_fourthcolumn' => 0,
          'footer_second' => 0,
          'footer_secondcolumn' => 0,
          'footer_thirdcolumn' => 0,
          'header' => 0,
          'help' => 0,
          'highlighted' => 0,
          'page_bottom' => 0,
          'page_content_bottom' => 0,
          'page_top' => 0,
          'sidebar_first' => 0,
          'sidebar_second' => 0,
          'triptych_first' => 0,
          'triptych_last' => 0,
          'triptych_middle' => 0,
        ),
        'referenceable_theme' => 'default',
        'respect_visibility' => 1,
      ),
      'translatable' => '0',
      'type' => 'blockreference',
    ),
    'field_instance' => array(
      'bundle' => 'landing_page',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => 'Add existing content. <a href="/block/add">Create a new block</a>',
      'display' => array(
        'child_menu_list' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'default' => array(
          'label' => 'hidden',
          'module' => 'blockreference',
          'settings' => array(),
          'type' => 'blockreference_default',
          'weight' => '3',
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_block_content',
      'label' => 'Block Content',
      'required' => 0,
      'settings' => array(
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'blockreference',
        'settings' => array(
          'autocomplete_path' => 'blockreference/autocomplete',
          'size' => '60',
        ),
        'type' => 'blockreference_autocomplete',
        'weight' => '6',
      ),
    ),
  );

  // Exported field: 'node-landing_page-field_call_to_action_links'.
  $fields['node-landing_page-field_call_to_action_links'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '3',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_call_to_action_links',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'link',
      'settings' => array(
        'attributes' => array(
          'class' => '',
          'rel' => '',
          'target' => 'default',
        ),
        'display' => array(
          'url_cutoff' => 80,
        ),
        'enable_tokens' => 1,
        'title' => 'optional',
        'title_maxlength' => 128,
        'title_value' => '',
        'url' => 0,
      ),
      'translatable' => '0',
      'type' => 'link_field',
    ),
    'field_instance' => array(
      'bundle' => 'landing_page',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'child_menu_list' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'default' => array(
          'label' => 'hidden',
          'module' => 'link',
          'settings' => array(),
          'type' => 'link_default',
          'weight' => '2',
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_call_to_action_links',
      'label' => 'Call to Action',
      'required' => 0,
      'settings' => array(
        'attributes' => array(
          'class' => 'highlight',
          'configurable_title' => 0,
          'rel' => '',
          'target' => 'default',
          'title' => '',
        ),
        'display' => array(
          'url_cutoff' => '80',
        ),
        'enable_tokens' => 1,
        'title' => 'required',
        'title_maxlength' => '128',
        'title_value' => '',
        'url' => 0,
        'user_register_form' => FALSE,
        'validate_url' => 1,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'link',
        'settings' => array(),
        'type' => 'link_field',
        'weight' => '2',
      ),
    ),
  );

  // Exported field: 'node-landing_page-field_image'.
  $fields['node-landing_page-field_image'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_image',
      'foreign keys' => array(
        'fid' => array(
          'columns' => array(
            'fid' => 'fid',
          ),
          'table' => 'file_managed',
        ),
      ),
      'indexes' => array(
        'fid' => array(
          0 => 'fid',
        ),
      ),
      'locked' => '0',
      'module' => 'image',
      'settings' => array(
        'default_image' => 0,
        'uri_scheme' => 'public',
      ),
      'translatable' => '0',
      'type' => 'image',
    ),
    'field_instance' => array(
      'bundle' => 'landing_page',
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'child_menu_list' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'default' => array(
          'label' => 'hidden',
          'module' => 'image',
          'settings' => array(
            'image_link' => '',
            'image_style' => '',
          ),
          'type' => 'image',
          'weight' => '1',
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_image',
      'label' => 'Image',
      'required' => 0,
      'settings' => array(
        'alt_field' => 1,
        'default_image' => 0,
        'file_directory' => 'landing-page/images',
        'file_extensions' => 'png gif jpg jpeg',
        'max_filesize' => '',
        'max_resolution' => '1200x1200',
        'min_resolution' => '',
        'title_field' => 1,
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'image',
        'settings' => array(
          'preview_image_style' => 'thumbnail',
          'progress_indicator' => 'throbber',
        ),
        'type' => 'image_image',
        'weight' => '3',
      ),
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Add existing content. <a href="/block/add">Create a new block</a>');
  t('Block Content');
  t('Body');
  t('Call to Action');
  t('Image');

  return $fields;
}

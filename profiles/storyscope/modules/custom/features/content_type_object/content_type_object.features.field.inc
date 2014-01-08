<?php
/**
 * @file
 * content_type_object.features.field.inc
 */

/**
 * Implements hook_field_default_fields().
 */
function content_type_object_field_default_fields() {
  $fields = array();

  // Exported field: 'field_collection_item-field_fb_classification-field_fb_classification_mid'.
  $fields['field_collection_item-field_fb_classification-field_fb_classification_mid'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_classification_mid',
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
      'settings' => array(
        'max_length' => '255',
      ),
      'translatable' => '0',
      'type' => 'text',
    ),
    'field_instance' => array(
      'bundle' => 'field_fb_classification',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'hidden',
          'module' => 'text',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'text_plain',
          'weight' => '1',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_fb_classification_mid',
      'label' => 'FB Classification MID',
      'required' => 0,
      'settings' => array(
        'text_processing' => '0',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'text',
        'settings' => array(
          'size' => '60',
        ),
        'type' => 'text_textfield',
        'weight' => '2',
      ),
    ),
  );

  // Exported field: 'field_collection_item-field_fb_classification-field_fb_classification_topic'.
  $fields['field_collection_item-field_fb_classification-field_fb_classification_topic'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_classification_topic',
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
      'settings' => array(
        'max_length' => '255',
      ),
      'translatable' => '0',
      'type' => 'text',
    ),
    'field_instance' => array(
      'bundle' => 'field_fb_classification',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'hidden',
          'module' => 'text',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'text_plain',
          'weight' => '0',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_fb_classification_topic',
      'label' => 'Classification',
      'required' => 0,
      'settings' => array(
        'text_processing' => '0',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'jquery_freebase',
        'settings' => array(
          'autocomplete_arguments' => '{"key" : "AIzaSyBd2HkCKxgBgFeXlp54EMJ0wGmgSMqgOAg"  ,  "filter" : "(any type:visual_art/visual_art_form)"}',
        ),
        'type' => 'jquery_freebase_autocomplete',
        'weight' => '1',
      ),
    ),
  );

  // Exported field: 'field_collection_item-field_fb_country-field_fb_country_mid'.
  $fields['field_collection_item-field_fb_country-field_fb_country_mid'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_country_mid',
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
      'settings' => array(
        'max_length' => '255',
      ),
      'translatable' => '0',
      'type' => 'text',
    ),
    'field_instance' => array(
      'bundle' => 'field_fb_country',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'hidden',
          'module' => 'text',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'text_plain',
          'weight' => '1',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_fb_country_mid',
      'label' => 'FB Country MID',
      'required' => 0,
      'settings' => array(
        'text_processing' => '0',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'text',
        'settings' => array(
          'size' => '60',
        ),
        'type' => 'text_textfield',
        'weight' => '2',
      ),
    ),
  );

  // Exported field: 'field_collection_item-field_fb_country-field_fb_country_topic'.
  $fields['field_collection_item-field_fb_country-field_fb_country_topic'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_country_topic',
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
      'settings' => array(
        'max_length' => '255',
      ),
      'translatable' => '0',
      'type' => 'text',
    ),
    'field_instance' => array(
      'bundle' => 'field_fb_country',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'hidden',
          'module' => 'text',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'text_plain',
          'weight' => '0',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_fb_country_topic',
      'label' => 'Country',
      'required' => 0,
      'settings' => array(
        'text_processing' => '0',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'jquery_freebase',
        'settings' => array(
          'autocomplete_arguments' => '{"key" : "AIzaSyBd2HkCKxgBgFeXlp54EMJ0wGmgSMqgOAg"  ,  "filter" : "(any type:country)"}',
        ),
        'type' => 'jquery_freebase_autocomplete',
        'weight' => '1',
      ),
    ),
  );

  // Exported field: 'field_collection_item-field_fb_materials-field_fb_materials_mid'.
  $fields['field_collection_item-field_fb_materials-field_fb_materials_mid'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_materials_mid',
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
      'settings' => array(
        'max_length' => '255',
      ),
      'translatable' => '0',
      'type' => 'text',
    ),
    'field_instance' => array(
      'bundle' => 'field_fb_materials',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'hidden',
          'module' => 'text',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'text_plain',
          'weight' => '1',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_fb_materials_mid',
      'label' => 'FB Materials MID',
      'required' => FALSE,
      'settings' => array(
        'text_processing' => 0,
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'module' => 'text',
        'settings' => array(
          'size' => 60,
        ),
        'type' => 'text_textfield',
        'weight' => '2',
      ),
    ),
  );

  // Exported field: 'field_collection_item-field_fb_materials-field_fb_materials_topic'.
  $fields['field_collection_item-field_fb_materials-field_fb_materials_topic'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_materials_topic',
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
      'settings' => array(
        'max_length' => '512',
      ),
      'translatable' => '0',
      'type' => 'text',
    ),
    'field_instance' => array(
      'bundle' => 'field_fb_materials',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'hidden',
          'module' => 'text',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'text_plain',
          'weight' => '0',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_fb_materials_topic',
      'label' => 'Materials',
      'required' => 0,
      'settings' => array(
        'text_processing' => '0',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'jquery_freebase',
        'settings' => array(
          'autocomplete_arguments' => '{"key" : "AIzaSyBd2HkCKxgBgFeXlp54EMJ0wGmgSMqgOAg"  ,  "filter" : "(any type:visual_art/visual_art_medium)"}',
        ),
        'type' => 'jquery_freebase_autocomplete',
        'weight' => '1',
      ),
    ),
  );

  // Exported field: 'field_collection_item-field_fb_object_identifier-field_fb_object_identifier_mid'.
  $fields['field_collection_item-field_fb_object_identifier-field_fb_object_identifier_mid'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_object_identifier_mid',
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
      'settings' => array(
        'max_length' => '255',
      ),
      'translatable' => '0',
      'type' => 'text',
    ),
    'field_instance' => array(
      'bundle' => 'field_fb_object_identifier',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'hidden',
          'module' => 'text',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'text_plain',
          'weight' => '1',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_fb_object_identifier_mid',
      'label' => 'FB Object Identifier MID',
      'required' => 0,
      'settings' => array(
        'text_processing' => '0',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'text',
        'settings' => array(
          'size' => '60',
        ),
        'type' => 'text_textfield',
        'weight' => '2',
      ),
    ),
  );

  // Exported field: 'field_collection_item-field_fb_object_identifier-field_fb_object_identifier_topic'.
  $fields['field_collection_item-field_fb_object_identifier-field_fb_object_identifier_topic'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_object_identifier_topic',
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
      'settings' => array(
        'max_length' => '512',
      ),
      'translatable' => '0',
      'type' => 'text',
    ),
    'field_instance' => array(
      'bundle' => 'field_fb_object_identifier',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'hidden',
          'module' => 'text',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'text_default',
          'weight' => '0',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_fb_object_identifier_topic',
      'label' => 'FB Object Identifier Topic',
      'required' => 0,
      'settings' => array(
        'text_processing' => '0',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'jquery_freebase',
        'settings' => array(
          'autocomplete_arguments' => '{"key" : "AIzaSyBd2HkCKxgBgFeXlp54EMJ0wGmgSMqgOAg"  ,  "filter" : "(any type:visual_artwork)"}',
        ),
        'type' => 'jquery_freebase_autocomplete',
        'weight' => '1',
      ),
    ),
  );

  // Exported field: 'field_collection_item-field_object_dimensions-field_object_dimension_depth'.
  $fields['field_collection_item-field_object_dimensions-field_object_dimension_depth'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_object_dimension_depth',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'number',
      'settings' => array(
        'decimal_separator' => '.',
        'precision' => '10',
        'scale' => '2',
      ),
      'translatable' => '0',
      'type' => 'number_decimal',
    ),
    'field_instance' => array(
      'bundle' => 'field_object_dimensions',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'module' => 'number',
          'settings' => array(
            'decimal_separator' => '.',
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'prefix_suffix' => TRUE,
            'scale' => 2,
            'thousand_separator' => ' ',
          ),
          'type' => 'number_decimal',
          'weight' => '2',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_object_dimension_depth',
      'label' => 'Depth',
      'required' => 0,
      'settings' => array(
        'max' => '',
        'min' => '',
        'prefix' => '',
        'suffix' => '',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'number',
        'settings' => array(),
        'type' => 'number',
        'weight' => '2',
      ),
    ),
  );

  // Exported field: 'field_collection_item-field_object_dimensions-field_object_dimension_diameter'.
  $fields['field_collection_item-field_object_dimensions-field_object_dimension_diameter'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_object_dimension_diameter',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'number',
      'settings' => array(
        'decimal_separator' => '.',
        'precision' => '10',
        'scale' => '2',
      ),
      'translatable' => '0',
      'type' => 'number_decimal',
    ),
    'field_instance' => array(
      'bundle' => 'field_object_dimensions',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'module' => 'number',
          'settings' => array(
            'decimal_separator' => '.',
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'prefix_suffix' => TRUE,
            'scale' => 2,
            'thousand_separator' => ' ',
          ),
          'type' => 'number_decimal',
          'weight' => '3',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_object_dimension_diameter',
      'label' => 'Diameter',
      'required' => 0,
      'settings' => array(
        'max' => '',
        'min' => '',
        'prefix' => '',
        'suffix' => '',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'number',
        'settings' => array(),
        'type' => 'number',
        'weight' => '3',
      ),
    ),
  );

  // Exported field: 'field_collection_item-field_object_dimensions-field_object_dimension_heigth'.
  $fields['field_collection_item-field_object_dimensions-field_object_dimension_heigth'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_object_dimension_heigth',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'number',
      'settings' => array(
        'decimal_separator' => '.',
        'precision' => '10',
        'scale' => '2',
      ),
      'translatable' => '0',
      'type' => 'number_decimal',
    ),
    'field_instance' => array(
      'bundle' => 'field_object_dimensions',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'module' => 'number',
          'settings' => array(
            'decimal_separator' => '.',
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'prefix_suffix' => 1,
            'scale' => '2',
            'thousand_separator' => ',',
          ),
          'type' => 'number_decimal',
          'weight' => '0',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_object_dimension_heigth',
      'label' => 'Heigth',
      'required' => 0,
      'settings' => array(
        'max' => '',
        'min' => '',
        'prefix' => '',
        'suffix' => '',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'number',
        'settings' => array(),
        'type' => 'number',
        'weight' => '0',
      ),
    ),
  );

  // Exported field: 'field_collection_item-field_object_dimensions-field_object_dimension_unit'.
  $fields['field_collection_item-field_object_dimensions-field_object_dimension_unit'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_object_dimension_unit',
      'foreign keys' => array(),
      'indexes' => array(
        'value' => array(
          0 => 'value',
        ),
      ),
      'locked' => '0',
      'module' => 'list',
      'settings' => array(
        'allowed_values' => array(
          'm' => 'm',
          'mm' => 'mm',
          'cm' => 'cm',
          'in' => 'in',
        ),
        'allowed_values_function' => '',
      ),
      'translatable' => '0',
      'type' => 'list_text',
    ),
    'field_instance' => array(
      'bundle' => 'field_object_dimensions',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'inline',
          'module' => 'list',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'list_default',
          'weight' => '4',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_object_dimension_unit',
      'label' => 'Units',
      'required' => 0,
      'settings' => array(
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'options',
        'settings' => array(),
        'type' => 'options_select',
        'weight' => '4',
      ),
    ),
  );

  // Exported field: 'field_collection_item-field_object_dimensions-field_object_dimension_width'.
  $fields['field_collection_item-field_object_dimensions-field_object_dimension_width'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_object_dimension_width',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'number',
      'settings' => array(
        'decimal_separator' => '.',
        'precision' => '10',
        'scale' => '2',
      ),
      'translatable' => '0',
      'type' => 'number_decimal',
    ),
    'field_instance' => array(
      'bundle' => 'field_object_dimensions',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'module' => 'number',
          'settings' => array(
            'decimal_separator' => '.',
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'prefix_suffix' => TRUE,
            'scale' => 2,
            'thousand_separator' => ' ',
          ),
          'type' => 'number_decimal',
          'weight' => '1',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'field_collection_item',
      'field_name' => 'field_object_dimension_width',
      'label' => 'Width',
      'required' => 0,
      'settings' => array(
        'max' => '',
        'min' => '',
        'prefix' => '',
        'suffix' => '',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'number',
        'settings' => array(),
        'type' => 'number',
        'weight' => '1',
      ),
    ),
  );

  // Exported field: 'node-object-body'.
  $fields['node-object-body'] = array(
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
      'bundle' => 'object',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => 'Any additional notes can be added to this field. For example, notes about conservation treatments, or current condition, or any under-drawings or sketches on the reverse of a painting.',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '14',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '17',
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '18',
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'module' => 'text',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'text_default',
          'weight' => '13',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'hidden',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '19',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '27',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '7',
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser' => array(
          'label' => 'hidden',
          'module' => 'text',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'trim_length' => 600,
          ),
          'type' => 'text_summary_or_trimmed',
          'weight' => '3',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '27',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '20',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'module' => 'text',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'text_plain',
          'weight' => '11',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'body',
      'label' => 'Notes',
      'required' => 0,
      'settings' => array(
        'display_summary' => 0,
        'text_processing' => '1',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'text',
        'settings' => array(
          'rows' => '10',
          'summary_rows' => 5,
        ),
        'type' => 'text_textarea_with_summary',
        'weight' => '13',
      ),
    ),
  );

  // Exported field: 'node-object-field_ca_sec_id'.
  $fields['node-object-field_ca_sec_id'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_ca_sec_id',
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
      'settings' => array(
        'max_length' => '255',
      ),
      'translatable' => '0',
      'type' => 'text',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'hidden',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '20',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '13',
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '15',
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '20',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'hidden',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '27',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '23',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '11',
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '17',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '24',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '15',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '20',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_ca_sec_id',
      'label' => 'CA / SEC ID',
      'required' => 0,
      'settings' => array(
        'text_processing' => '0',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'text',
        'settings' => array(
          'size' => '60',
        ),
        'type' => 'text_textfield',
        'weight' => '14',
      ),
    ),
  );

  // Exported field: 'node-object-field_fb_agent'.
  $fields['node-object-field_fb_agent'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '-1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_agent',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'field_collection',
      'settings' => array(
        'hide_blank_items' => 1,
        'path' => '',
      ),
      'translatable' => '0',
      'type' => 'field_collection',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => 'This field can contain multiple values if the Object was created by more than one person.',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'add' => 'Add',
            'delete' => 'Delete',
            'description' => TRUE,
            'edit' => 'Edit',
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_view',
          'weight' => '1',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '4',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '13',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '10',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '17',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '14',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '2',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_fb_agent',
      'label' => 'FB Creator',
      'required' => 0,
      'settings' => array(
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'field_collection',
        'settings' => array(),
        'type' => 'field_collection_embed',
        'weight' => '4',
      ),
    ),
  );

  // Exported field: 'node-object-field_fb_classification'.
  $fields['node-object-field_fb_classification'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '-1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_classification',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'field_collection',
      'settings' => array(
        'hide_blank_items' => 1,
        'path' => '',
      ),
      'translatable' => '0',
      'type' => 'field_collection',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => 'Object type e.g. Painting, Photograph, Drawing etc.',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '6',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '5',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '11',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '9',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '16',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '13',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '3',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_fb_classification',
      'label' => 'FB Classification',
      'required' => 0,
      'settings' => array(
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'field_collection',
        'settings' => array(),
        'type' => 'field_collection_embed',
        'weight' => '5',
      ),
    ),
  );

  // Exported field: 'node-object-field_fb_country'.
  $fields['node-object-field_fb_country'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '-1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_country',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'field_collection',
      'settings' => array(
        'hide_blank_items' => 1,
        'path' => '',
      ),
      'translatable' => '0',
      'type' => 'field_collection',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => 'The country from which the Object originates. This is particularly important if the Object creator is unknown e.g. Egyptian papyrus scroll.',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '8',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '10',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '12',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '7',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '14',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '16',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '8',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_fb_country',
      'label' => 'Country of Origin',
      'required' => 0,
      'settings' => array(
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'field_collection',
        'settings' => array(),
        'type' => 'field_collection_embed',
        'weight' => '10',
      ),
    ),
  );

  // Exported field: 'node-object-field_fb_location'.
  $fields['node-object-field_fb_location'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '-1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_location',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'field_collection',
      'settings' => array(
        'hide_blank_items' => 1,
        'path' => '',
      ),
      'translatable' => '0',
      'type' => 'field_collection',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => 'The current location of the Object e.g. National Gallery of Ireland, Private Collection, Te Papa Museum etc.',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '5',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '8',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '10',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '8',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '13',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '17',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '6',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_fb_location',
      'label' => 'FB Current Location',
      'required' => 0,
      'settings' => array(
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'field_collection',
        'settings' => array(),
        'type' => 'field_collection_embed',
        'weight' => '8',
      ),
    ),
  );

  // Exported field: 'node-object-field_fb_materials'.
  $fields['node-object-field_fb_materials'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '-1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_materials',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'field_collection',
      'settings' => array(
        'hide_blank_items' => 1,
        'path' => '',
      ),
      'translatable' => '0',
      'type' => 'field_collection',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => 'The materials used in the creation of the Object e.g. oil on canvas.',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '7',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '6',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '8',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '4',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '15',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '19',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '4',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_fb_materials',
      'label' => 'FB Materials',
      'required' => 0,
      'settings' => array(
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'field_collection',
        'settings' => array(),
        'type' => 'field_collection_embed',
        'weight' => '6',
      ),
    ),
  );

  // Exported field: 'node-object-field_fb_object_identifier'.
  $fields['node-object-field_fb_object_identifier'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '-1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_object_identifier',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'field_collection',
      'settings' => array(
        'hide_blank_items' => 1,
        'path' => '',
      ),
      'translatable' => '0',
      'type' => 'field_collection',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => 'If the Object is an artwork with a Freebase Topic you can use this field to identify it.',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '10',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '12',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '6',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '5',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '11',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '18',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '10',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_fb_object_identifier',
      'label' => 'Object Identifier',
      'required' => 0,
      'settings' => array(
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'field_collection',
        'settings' => array(),
        'type' => 'field_collection_embed',
        'weight' => '12',
      ),
    ),
  );

  // Exported field: 'node-object-field_fb_tags'.
  $fields['node-object-field_fb_tags'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '-1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_fb_tags',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'field_collection',
      'settings' => array(
        'hide_blank_items' => 1,
        'path' => '',
      ),
      'translatable' => '0',
      'type' => 'field_collection',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '9',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '11',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '7',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '6',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '9',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '12',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '9',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_fb_tags',
      'label' => 'Tags',
      'required' => 0,
      'settings' => array(
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'field_collection',
        'settings' => array(),
        'type' => 'field_collection_embed',
        'weight' => '11',
      ),
    ),
  );

  // Exported field: 'node-object-field_image'.
  $fields['node-object-field_image'] = array(
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
      'bundle' => 'object',
      'default_value' => array(),
      'deleted' => '0',
      'description' => 'Upload an image from your local file system',
      'display' => array(
        'default' => array(
          'label' => 'hidden',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '3',
        ),
        'entityreference_view_widget' => array(
          'label' => 'hidden',
          'module' => 'image',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'image_link' => 'content',
            'image_style' => 'tiny',
          ),
          'type' => 'image',
          'weight' => '0',
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'hidden',
          'module' => 'image',
          'settings' => array(
            'field_multiple_limit' => '1',
            'field_multiple_limit_offset' => '0',
            'image_link' => 'content',
            'image_style' => 'highlight',
          ),
          'type' => 'image',
          'weight' => '0',
        ),
        'image_and_properties' => array(
          'label' => 'hidden',
          'module' => 'field_slideshow',
          'settings' => array(
            'field_multiple_limit' => '-1',
            'field_multiple_limit_offset' => '0',
            'slideshow_caption' => '',
            'slideshow_caption_link' => '',
            'slideshow_carousel_circular' => 0,
            'slideshow_carousel_follow' => 0,
            'slideshow_carousel_image_style' => 'tiny',
            'slideshow_carousel_scroll' => '1',
            'slideshow_carousel_skin' => '',
            'slideshow_carousel_speed' => '500',
            'slideshow_carousel_vertical' => 0,
            'slideshow_carousel_visible' => '3',
            'slideshow_colorbox_image_style' => '',
            'slideshow_colorbox_slideshow' => '',
            'slideshow_colorbox_slideshow_speed' => '4000',
            'slideshow_colorbox_speed' => '350',
            'slideshow_colorbox_transition' => 'elastic',
            'slideshow_controls' => 1,
            'slideshow_controls_pause' => 0,
            'slideshow_controls_position' => 'before',
            'slideshow_field_collection_image' => '',
            'slideshow_fx' => 'fade',
            'slideshow_image_style' => 'large',
            'slideshow_link' => '',
            'slideshow_order' => '',
            'slideshow_pager' => '',
            'slideshow_pager_image_style' => '',
            'slideshow_pager_position' => 'after',
            'slideshow_pause' => 0,
            'slideshow_speed' => '1000',
            'slideshow_start_on_hover' => 0,
            'slideshow_timeout' => '0',
          ),
          'type' => 'slideshow',
          'weight' => '0',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'hidden',
          'module' => 'image',
          'settings' => array(
            'field_multiple_limit' => '1',
            'field_multiple_limit_offset' => '0',
            'image_link' => 'content',
            'image_style' => 'slider',
          ),
          'type' => 'image',
          'weight' => '1',
        ),
        'small_thumbnail' => array(
          'label' => 'hidden',
          'module' => 'image',
          'settings' => array(
            'field_multiple_limit' => '-1',
            'field_multiple_limit_offset' => '0',
            'image_link' => 'content',
            'image_style' => 'tiny',
          ),
          'type' => 'image',
          'weight' => '0',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'hidden',
          'module' => 'image',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'image_link' => '',
            'image_style' => 'tiny',
          ),
          'type' => 'image',
          'weight' => '0',
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser' => array(
          'label' => 'hidden',
          'module' => 'image',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'image_link' => 'content',
            'image_style' => 'teaser',
          ),
          'type' => 'image',
          'weight' => '0',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'hidden',
          'module' => 'image',
          'settings' => array(
            'field_multiple_limit' => '1',
            'field_multiple_limit_offset' => '0',
            'image_link' => 'content',
            'image_style' => 'custom_thumbnail',
          ),
          'type' => 'image',
          'weight' => '1',
        ),
        'thumbnail_teaser' => array(
          'label' => 'hidden',
          'module' => 'colorbox',
          'settings' => array(
            'colorbox_caption' => 'auto',
            'colorbox_caption_custom' => '',
            'colorbox_gallery' => 'post',
            'colorbox_gallery_custom' => '',
            'colorbox_image_style' => '',
            'colorbox_multivalue_index' => NULL,
            'colorbox_node_style' => 'thumbnail',
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'colorbox',
          'weight' => '1',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '18',
        ),
        'title_only' => array(
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
        'file_directory' => 'images',
        'file_extensions' => 'png gif jpg jpeg mp4 mov avi',
        'max_filesize' => '',
        'max_resolution' => '',
        'min_resolution' => '',
        'title_field' => 0,
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'media',
        'settings' => array(
          'allowed_schemes' => array(
            'public' => 'public',
            'vimeo' => 'vimeo',
            'youtube' => 'youtube',
          ),
          'allowed_types' => array(
            'audio' => 0,
            'default' => 'default',
            'image' => 'image',
            'video' => 'video',
          ),
          'browser_plugins' => array(),
          'preview_image_style' => 'thumbnail',
          'progress_indicator' => 'throbber',
        ),
        'type' => 'media_generic',
        'weight' => '2',
      ),
    ),
  );

  // Exported field: 'node-object-field_media'.
  $fields['node-object-field_media'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '-1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_media',
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
      'module' => 'file',
      'settings' => array(
        'display_default' => 0,
        'display_field' => 0,
        'uri_scheme' => 'public',
      ),
      'translatable' => '0',
      'type' => 'file',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'default_value' => array(),
      'deleted' => '0',
      'description' => 'Upload images or Embed video from the web here',
      'display' => array(
        'default' => array(
          'label' => 'hidden',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '4',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'image_and_properties' => array(
          'label' => 'hidden',
          'module' => 'file_entity',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'file_view_mode' => 'default',
          ),
          'type' => 'file_rendered',
          'weight' => '1',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'hidden',
          'module' => 'file_entity',
          'settings' => array(
            'field_multiple_limit' => '1',
            'field_multiple_limit_offset' => '0',
            'file_view_mode' => 'teaser',
          ),
          'type' => 'file_rendered',
          'weight' => '2',
        ),
        'small_thumbnail' => array(
          'label' => 'hidden',
          'module' => 'file_entity',
          'settings' => array(
            'field_multiple_limit' => '-1',
            'field_multiple_limit_offset' => '0',
            'file_view_mode' => 'teaser',
          ),
          'type' => 'file_rendered',
          'weight' => '1',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'hidden',
          'module' => 'media_colorbox',
          'settings' => array(
            'audio_playlist' => 0,
            'colorbox_caption' => 'title',
            'colorbox_gallery' => 'post',
            'colorbox_gallery_custom' => '',
            'colorbox_view_mode' => 'colorbox',
            'field_multiple_limit' => '1',
            'field_multiple_limit_offset' => '0',
            'file_view_mode' => 'entityreference_view_widget',
            'fixed_height' => '',
            'fixed_width' => '',
          ),
          'type' => 'media_colorbox',
          'weight' => '2',
        ),
        'thumbnail_teaser' => array(
          'label' => 'hidden',
          'module' => 'file_entity',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'file_view_mode' => 'default',
          ),
          'type' => 'file_rendered',
          'weight' => '0',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '17',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_media',
      'label' => 'Media',
      'required' => 0,
      'settings' => array(
        'description_field' => 0,
        'file_directory' => 'media',
        'file_extensions' => 'png gif jpg jpeg mp4 mov avi pdf mp3',
        'max_filesize' => '',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'media',
        'settings' => array(
          'allowed_schemes' => array(
            'public' => 'public',
            'vimeo' => 'vimeo',
            'youtube' => 'youtube',
          ),
          'allowed_types' => array(
            'audio' => 'audio',
            'document' => 'document',
            'image' => 'image',
            'video' => 'video',
          ),
          'browser_plugins' => array(
            'media_default--media_browser_1' => 0,
            'media_default--media_browser_my_files' => 0,
            'media_internet' => 'media_internet',
            'upload' => 'upload',
          ),
          'progress_indicator' => 'throbber',
        ),
        'type' => 'media_generic',
        'weight' => '1',
      ),
    ),
  );

  // Exported field: 'node-object-field_object_creation_date'.
  $fields['node-object-field_object_creation_date'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_object_creation_date',
      'foreign keys' => array(),
      'indexes' => array(
        'timestamp' => array(
          0 => 'timestamp',
        ),
      ),
      'locked' => '0',
      'module' => 'partial_date',
      'settings' => array(
        'estimates' => array(
          'day' => array(
            '0|12' => 'The start of the month',
            '10|20' => 'The middle of the month',
            '18|31' => 'The end of the month',
          ),
          'hour' => array(
            '0|1' => 'Midnight',
            '12|13' => 'Noon',
            '12|18' => 'Afternoon',
            '18|22' => 'Evening',
            '18|6' => 'Night',
            '6|12' => 'Morning',
            '6|18' => 'Day time',
          ),
          'minute' => array(),
          'month' => array(
            '11|1' => 'Winter',
            '2|4' => 'Spring',
            '5|7' => 'Summer',
            '8|10' => 'Autumn',
          ),
          'second' => array(),
          'year' => array(
            '-60000|1600' => 'Pre-colonial',
            '1500|1599' => '16th century',
            '1600|1699' => '17th century',
            '1700|1799' => '18th century',
            '1800|1899' => '19th century',
            '1900|1999' => '20th century',
            '2000|2099' => '21st century',
          ),
        ),
        'minimum_components' => array(
          'from_estimates_day' => 0,
          'from_estimates_hour' => 0,
          'from_estimates_minute' => 0,
          'from_estimates_month' => 0,
          'from_estimates_second' => 0,
          'from_estimates_year' => 0,
          'from_granularity_day' => 0,
          'from_granularity_hour' => 0,
          'from_granularity_minute' => 0,
          'from_granularity_month' => 0,
          'from_granularity_second' => 0,
          'from_granularity_timezone' => 0,
          'from_granularity_year' => 1,
          'txt_long' => 0,
          'txt_short' => 0,
        ),
      ),
      'translatable' => '0',
      'type' => 'partial_date',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => 'The Object creation date; this can be a single date or a time-span.',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'module' => 'partial_date',
          'settings' => array(
            'component_settings' => array(),
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'format' => 'medium',
            'use_override' => 'none',
          ),
          'type' => 'partial_date_default',
          'weight' => '2',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '16',
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '6',
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'module' => 'partial_date',
          'settings' => array(
            'component_settings' => array(),
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'format' => 'medium',
            'use_override' => 'none',
          ),
          'type' => 'partial_date_default',
          'weight' => '3',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '16',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '22',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '15',
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '16',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '8',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '8',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'module' => 'partial_date',
          'settings' => array(
            'component_settings' => array(),
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'format' => 'medium',
            'use_override' => 'none',
          ),
          'type' => 'partial_date_default',
          'weight' => '1',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_object_creation_date',
      'label' => 'Creation Date',
      'required' => 0,
      'settings' => array(
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'partial_date',
        'settings' => array(
          0 => FALSE,
          'estimates' => array(
            'from' => array(
              'day' => 0,
              'hour' => 0,
              'minute' => 0,
              'month' => 0,
              'second' => 0,
              'year' => 0,
            ),
          ),
          'granularity' => array(
            'from' => array(
              'day' => 'day',
              'hour' => 0,
              'minute' => 0,
              'month' => 'month',
              'second' => 0,
              'timezone' => 0,
              'year' => 'year',
            ),
          ),
          'help_txt' => array(
            'und' => array(
              '_remove' => '',
              'check_approximate' => '',
              'components' => '',
              'txt_long' => 'Longer description of date',
              'txt_short' => 'Short description of date',
            ),
          ),
          'hide_remove' => 1,
          'increments' => array(
            'minute' => '1',
            'second' => '1',
          ),
          'theme_overrides' => array(
            'check_approximate' => 1,
            'range_inline' => 0,
            'txt_long' => 0,
            'txt_short' => 0,
          ),
          'tz_handling' => 'none',
        ),
        'type' => 'partial_date',
        'weight' => '3',
      ),
    ),
  );

  // Exported field: 'node-object-field_object_creation_timestamp'.
  $fields['node-object-field_object_creation_timestamp'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_object_creation_timestamp',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'date',
      'settings' => array(
        'cache_count' => '4',
        'cache_enabled' => 0,
        'granularity' => array(
          'day' => 'day',
          'hour' => 0,
          'minute' => 0,
          'month' => 'month',
          'second' => 0,
          'year' => 'year',
        ),
        'timezone_db' => '',
        'todate' => '',
        'tz_handling' => 'none',
      ),
      'translatable' => '0',
      'type' => 'date',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'deleted' => '0',
      'description' => '',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '19',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '12',
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '8',
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '19',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '15',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '21',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '16',
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '13',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '10',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '9',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '19',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_object_creation_timestamp',
      'label' => 'Object creation timestamp',
      'required' => 0,
      'settings' => array(
        'default_value' => 'blank',
        'default_value2' => 'same',
        'default_value_code' => '',
        'default_value_code2' => '',
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 1,
        'module' => 'date',
        'settings' => array(
          'increment' => 15,
          'input_format' => 'Y-m-d H:i:s',
          'input_format_custom' => '',
          'label_position' => 'above',
          'text_parts' => array(),
          'year_range' => '-3:+3',
        ),
        'type' => 'date_text',
        'weight' => '47',
      ),
    ),
  );

  // Exported field: 'node-object-field_object_credit_line'.
  $fields['node-object-field_object_credit_line'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_object_credit_line',
      'foreign keys' => array(
        'tid' => array(
          'columns' => array(
            'tid' => 'tid',
          ),
          'table' => 'taxonomy_term_data',
        ),
      ),
      'indexes' => array(
        'tid' => array(
          0 => 'tid',
        ),
      ),
      'locked' => '0',
      'module' => 'taxonomy',
      'settings' => array(
        'allowed_values' => array(
          0 => array(
            'vocabulary' => 'classification',
            'parent' => '0',
          ),
        ),
      ),
      'translatable' => '0',
      'type' => 'taxonomy_term_reference',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => 'This field holds the copyright information associated with the Object, or the image of the Object.',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '15',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '7',
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '10',
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'module' => 'taxonomy',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'taxonomy_term_reference_plain',
          'weight' => '9',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '24',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '16',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '9',
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '8',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '20',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '11',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'module' => 'taxonomy',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
          ),
          'type' => 'taxonomy_term_reference_plain',
          'weight' => '7',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_object_credit_line',
      'label' => 'Copyright',
      'required' => 0,
      'settings' => array(
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'taxonomy',
        'settings' => array(
          'autocomplete_path' => 'taxonomy/autocomplete',
          'size' => 60,
        ),
        'type' => 'taxonomy_autocomplete',
        'weight' => '9',
      ),
    ),
  );

  // Exported field: 'node-object-field_object_dimensions'.
  $fields['node-object-field_object_dimensions'] = array(
    'field_config' => array(
      'active' => '1',
      'cardinality' => '-1',
      'deleted' => '0',
      'entity_types' => array(),
      'field_name' => 'field_object_dimensions',
      'foreign keys' => array(),
      'indexes' => array(),
      'locked' => '0',
      'module' => 'field_collection',
      'settings' => array(
        'hide_blank_items' => 1,
        'path' => '',
      ),
      'translatable' => '0',
      'type' => 'field_collection',
    ),
    'field_instance' => array(
      'bundle' => 'object',
      'default_value' => NULL,
      'deleted' => '0',
      'description' => 'The dimensions of the Object, include a value (number), unit (mm, cm), label (height, width, breath)  ',
      'display' => array(
        'default' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '18',
        ),
        'entityreference_view_widget' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '6',
        ),
        'eva_node' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'highlight' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '9',
        ),
        'image_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => '-1',
            'field_multiple_limit_offset' => '0',
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '7',
        ),
        'image_properties_and_title' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'slide' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '26',
        ),
        'small_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '18',
        ),
        'small_unclickable_thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '4',
        ),
        'subtitle_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '0',
        ),
        'teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '7',
        ),
        'teaser_recommender_pick' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'teaser_suggested' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
        'thumbnail' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '19',
        ),
        'thumbnail_teaser' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => '10',
        ),
        'title_and_properties' => array(
          'label' => 'above',
          'module' => 'field_collection',
          'settings' => array(
            'field_multiple_limit' => -1,
            'field_multiple_limit_offset' => 0,
            'view_mode' => 'full',
          ),
          'type' => 'field_collection_fields',
          'weight' => '5',
        ),
        'title_only' => array(
          'label' => 'above',
          'settings' => array(),
          'type' => 'hidden',
          'weight' => 0,
        ),
      ),
      'entity_type' => 'node',
      'field_name' => 'field_object_dimensions',
      'label' => 'Dimensions',
      'required' => 0,
      'settings' => array(
        'user_register_form' => FALSE,
      ),
      'widget' => array(
        'active' => 0,
        'module' => 'field_collection',
        'settings' => array(),
        'type' => 'field_collection_embed',
        'weight' => '7',
      ),
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Any additional notes can be added to this field. For example, notes about conservation treatments, or current condition, or any under-drawings or sketches on the reverse of a painting.');
  t('CA / SEC ID');
  t('Classification');
  t('Copyright');
  t('Country');
  t('Country of Origin');
  t('Creation Date');
  t('Depth');
  t('Diameter');
  t('Dimensions');
  t('FB Classification');
  t('FB Classification MID');
  t('FB Country MID');
  t('FB Creator');
  t('FB Current Location');
  t('FB Materials');
  t('FB Materials MID');
  t('FB Object Identifier MID');
  t('FB Object Identifier Topic');
  t('Heigth');
  t('If the Object is an artwork with a Freebase Topic you can use this field to identify it.');
  t('Image');
  t('Materials');
  t('Media');
  t('Notes');
  t('Object Identifier');
  t('Object creation timestamp');
  t('Object type e.g. Painting, Photograph, Drawing etc.');
  t('Tags');
  t('The Object creation date; this can be a single date or a time-span.');
  t('The country from which the Object originates. This is particularly important if the Object creator is unknown e.g. Egyptian papyrus scroll.');
  t('The current location of the Object e.g. National Gallery of Ireland, Private Collection, Te Papa Museum etc.');
  t('The dimensions of the Object, include a value (number), unit (mm, cm), label (height, width, breath)  ');
  t('The materials used in the creation of the Object e.g. oil on canvas.');
  t('This field can contain multiple values if the Object was created by more than one person.');
  t('This field holds the copyright information associated with the Object, or the image of the Object.');
  t('Units');
  t('Upload an image from your local file system');
  t('Upload images or Embed video from the web here');
  t('Width');

  return $fields;
}

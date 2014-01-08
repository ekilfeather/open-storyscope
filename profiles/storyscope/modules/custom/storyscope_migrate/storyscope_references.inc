<?php
/**
* Migrate Objects
*
* Use ResourceMigration class to import nodes.
*
*/
class ReferenceNodes extends ResourceMigration {

  // Define entity type and bundle, used in garmentboxMigration.
  public $entityType = 'node';
  public $bundle = 'reference';

  // Map columns to import. ResourceMigration already mapped "id" and "title".
  public $csvColumns = array(
    array('field_reference_text', 'field_reference_text'),
    array('field_reference_source', 'field_reference_source'),
    array('field_reference_images', 'field_reference_images'),
    array('field_reference_videos', 'field_reference_videos'),
    array('field_reference_files', 'field_reference_files'),
    array('field_ca_sec_id', 'field_ca_sec_id'),
  );

  public function __construct() {
    parent::__construct();
    // Map the mapped columns to fields.
    $this->addFieldMapping('field_reference_text', 'field_reference_text');

    // Link field
    $this->addFieldMapping('field_reference_source', 'field_reference_source');

    // File Fields
    $this->addFieldMapping('field_reference_images', 'field_reference_images');
    $this->addFieldMapping('field_reference_images:file_replace')->defaultValue(FILE_EXISTS_REPLACE);
    $this->addFieldMapping('field_reference_images:source_dir')->defaultValue(drupal_get_path('module', 'storyscope_migrate') . '/images');
    $this->addFieldMapping('field_reference_videos', 'field_reference_videos');
    $this->addFieldMapping('field_reference_files', 'field_reference_files');

    // Text
    $this->addFieldMapping('field_ca_sec_id', 'field_ca_sec_id');

  }
  public function prepareRow($current_row) {
    return TRUE;
  }
}

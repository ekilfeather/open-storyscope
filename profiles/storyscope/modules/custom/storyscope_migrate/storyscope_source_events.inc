<?php
/**
* Migrate Objects
*
* Use ResourceMigration class to import nodes.
*
*/
class SourceEventNodes extends ResourceMigration {

  // Define entity type and bundle, used in garmentboxMigration.
  public $entityType = 'node';
  public $bundle = 'source_event';

  // Map columns to import. ResourceMigration already mapped "id" and "title".
  public $csvColumns = array(
    array('field_source_event_source_uri', 'field_source_event_source_uri'),
    array('field_ca_sec_id', 'field_ca_sec_id'),
  );

  public function __construct() {
    parent::__construct();
    // Map the mapped columns to fields.
    $this->addFieldMapping('field_source_event_source_uri', 'field_source_event_source_uri');
    $this->addFieldMapping('field_ca_sec_id', 'field_ca_sec_id');
  }
  public function prepareRow($current_row) {
    return TRUE;
  }
}

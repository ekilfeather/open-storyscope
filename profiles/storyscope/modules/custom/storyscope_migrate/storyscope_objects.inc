<?php
/**
* Migrate Objects
*
* Use ResourceMigration class to import nodes.
*
*/
class ObjectNodes extends ResourceMigration {

  // Define entity type and bundle, used in garmentboxMigration.
  public $entityType = 'node';
  public $bundle = 'object';

  // Map columns to import. ResourceMigration already mapped "id" and "title".
  public $csvColumns = array(
    array('field_image', 'field_image'),
    array('field_object_video', 'field_object_video'),
    array('field_object_creator', 'field_object_creator'),
    array('field_object_creation_date', 'field_object_creation_date'),
    array('field_object_creation_approx', 'field_object_creation_approx'),
    array('field_object_classification', 'field_object_classification'),
    array('field_object_materials', 'field_object_materials'),
    array('field_object_dimensions', 'field_object_dimensions'),
    array('field_object_country_of_origin', 'field_object_country_of_origin'),
    array('field_object_collection', 'field_object_collection'),
    array('field_object_credit_line', 'field_object_credit_line'),
    array('field_object_identifier', 'field_object_identifier'),
    array('field_ca_sec_id', 'field_ca_sec_id'),
  );

  public function __construct() {
    parent::__construct();
    // Map the mapped columns to fields.
    $this->addFieldMapping('field_image', 'field_image');
    $this->addFieldMapping('field_image:file_replace')
         ->defaultValue(FILE_EXISTS_REPLACE);
    $this->addFieldMapping('field_image:source_dir')
          ->defaultValue(drupal_get_path('module', 'storyscope_migrate') . '/images');

    $this->addFieldMapping('field_object_creation_date', 'field_object_creation_date')->arguments(array('year' => array('source_field' => 'field_object_creation_date')));
    $this->addFieldMapping('field_ca_sec_id', 'field_ca_sec_id');

    // Create terms as they are imported
    $this->addFieldMapping('field_object_classification', 'field_object_classification')->arguments(array('create_term' => TRUE));
    $this->addFieldMapping('field_object_materials', 'field_object_materials')
         ->arguments(array('create_term' => TRUE))
         ->separator('|');
    $this->addFieldMapping('field_object_collection', 'field_object_collection')
         ->arguments(array('create_term' => TRUE))
         ->separator('|');
    $this->addFieldMapping('field_object_credit_line', 'field_object_credit_line')
         ->arguments(array('create_term' => TRUE))
         ->separator('|');
    $this->addFieldMapping('field_object_country_of_origin', 'field_object_country_of_origin');
    $this->addFieldMapping('field_object_identifier', 'field_object_identifier')->arguments(array('create_term' => TRUE));
  }
  public function prepareRow($current_row) {
    return TRUE;
  }
}
// Field Collections - must be imported seperately
/**
 * Migrate Values 
 */
class ObjectCreatorFCs extends Migration {
  /**
   * Map the field and properties to the CSV header.
   */
  public $csvColumns = array(
    array('id', 'Unique ID'),
    array('objectid', 'Object ID'),
    array('creator_name', 'creator_name'),
    array('dob-day', 'dob-day'),
    array('dob-month', 'dob-month'),
    array('dob-year', 'dob-year'),
    array('dob-approx', 'dob-approx'),
    array('dod-day', 'dod-day'),
    array('dod-month', 'dod-month'),
    array('dod-year', 'dod-year'),
    array('dod-approx', 'dod-approx'),
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import Object Creators from a CSV file.');
    $this->dependencies = array('ObjectNodes');

    // Create a map object for tracking the relationships between source rows
    $key = array(
      'id' => array(
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
      ),
    );

    // Create a MigrateSource object.
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'storyscope_migrate') . '/csv/node/object_creator.csv', $this->csvColumns, array('header_rows' => 1));

    $this->destination = new MigrateDestinationFieldCollection(
      'field_object_creator',
      array('host_entity_type' => 'node')
    );
    $this->map = new MigrateSQLMap($this->machineName, $key, $this->destination->getKeySchema());

    $this->addFieldMapping('host_entity_id', 'objectid')->sourceMigration('ObjectNodes');

    // Generate the values in prepare row
    $this->addFieldMapping('field_object_creator_name', 'creator_name')->arguments(array('create_term' => TRUE));

    $this->addFieldMapping('field_creator_birth_date', 'dob-year')->arguments(array(
                              'year' => array('source_field' => 'dob-year'),
                              'month' => array('source_field' => 'dob-month'),
                              'day' => array('source_field' => 'dob-day')
                              ));

    $this->addFieldMapping('field_creator_death_date', 'dod-year')->arguments(array(
                              'year' => array('source_field' => 'dod-year'),
                              'month' => array('source_field' => 'dod-month'),
                              'day' => array('source_field' => 'dod-day')
                              ));

  }

  public function prepareRow($current_row) {
    return TRUE;
  }

  /**
   *
   * Process information here before migration.
   * @param stdClass $entity
   * @param stdClass $row
   */
  public function prepare($entity, stdClass $row) {
  }
}
/**
 * Migrate Dimensions
 */
class ObjectDimensionFCs extends Migration {
  /**
   * Map the field and properties to the CSV header.
   */
  public $csvColumns = array(
    array('id', 'Unique ID'),
    array('objectid', 'Object ID'),
    array('label', 'label'),
    array('value', 'value'),
    array('unit', 'unit'),
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import Object Dimensions from a CSV file.');
    $this->dependencies = array('ObjectNodes');

    // Create a map object for tracking the relationships between source rows
    $key = array(
      'id' => array(
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
      ),
    );

    // Create a MigrateSource object.
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'storyscope_migrate') . '/csv/node/object_dimension.csv', $this->csvColumns, array('header_rows' => 1));

    $this->destination = new MigrateDestinationFieldCollection(
      'field_object_dimensions',
      array('host_entity_type' => 'node')
    );
    $this->map = new MigrateSQLMap($this->machineName, $key, $this->destination->getKeySchema());

    $this->addFieldMapping('host_entity_id', 'objectid')->sourceMigration('ObjectNodes');

    // Generate the values in prepare row
    $this->addFieldMapping('field_object_dimension_label', 'label');
    $this->addFieldMapping('field_object_dimension_value', 'value');
    $this->addFieldMapping('field_object_dimension_unit', 'unit');

  }

  public function prepareRow($current_row) {
    return TRUE;
  }

  /**
   *
   * Process information here before migration.
   * @param stdClass $entity
   * @param stdClass $row
   */
  public function prepare($entity, stdClass $row) {
  }
}

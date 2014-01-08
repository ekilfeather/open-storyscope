<?php
/**
* Migrate Objects
*
* Use ResourceMigration class to import nodes.
*
*/
class SectionNodes extends ResourceMigration {

  // Define entity type and bundle, used in garmentboxMigration.
  public $entityType = 'node';
  public $bundle = 'section';

  // Map columns to import. ResourceMigration already mapped "id" and "title".
  public $csvColumns = array(
    array('field_story_events', 'field_story_events'),
    array('field_ca_sec_id', 'field_ca_sec_id'),
  );

  public function __construct() {
    parent::__construct();

    // Dependencies
    $this->dependencies = array('EventNodes');

    // Map the mapped columns to fields.
    $this->addFieldMapping('field_ca_sec_id', 'field_ca_sec_id');
    $this->addFieldMapping('field_story_events', 'field_story_events')
         ->sourceMigration('EventNodes')
         ->separator('|');
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
    if (isset($entity->field_story_events['und'])){
      foreach ($entity->field_story_events['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $entity->field_story_events['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
  }
}
// Field Collections - must be imported seperately
/**
 * Migrate Sets
 */
class SetFCs extends Migration {
  /**
   * Map the field and properties to the CSV header.
   */
  public $csvColumns = array(
    array('id', 'Unique ID'),
    array('userid', 'User ID'),
    array('sectionid', 'SectionID'),
    array('objectid', 'ObjectID'),
    array('field_ca_sec_id', 'field_ca_sec_id'),
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import Story Section Sets from a CSV file.');
    $this->dependencies = array('SectionNodes', 'ObjectNodes');

    // Create a map object for tracking the relationships between source rows
    $key = array(
      'id' => array(
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
      ),
    );

    // Create a MigrateSource object.
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'storyscope_migrate') . '/csv/node/set.csv', $this->csvColumns, array('header_rows' => 1));

    $this->destination = new MigrateDestinationFieldCollection(
      'field_story_set',
      array('host_entity_type' => 'node')
    );
    $this->map = new MigrateSQLMap($this->machineName, $key, $this->destination->getKeySchema());


    $this->addFieldMapping('host_entity_id', 'sectionid')->sourceMigration('SectionNodes');

    // Generate the values in prepare row
    $this->addFieldMapping('field_story_set_object', 'objectid')
         ->sourceMigration('ObjectNodes');
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
 * Migrate Snapshot Object Stories
 */
class SnapShotFCs extends Migration {
  /**
   * Map the field and properties to the CSV header.
   */
  public $csvColumns = array(
    array('id', 'Unique ID'),
    array('userid', 'User ID'),
    array('setid', 'Set ID'),
    array('text', 'text'),
    array('object_story_id', 'object_story_id'),
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import Snapshot Object Stories from a CSV file.');
    $this->dependencies = array('ObjectStoryNodes', 'SetFCs');

    // Create a map object for tracking the relationships between source rows
    $key = array(
      'id' => array(
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
      ),
    );

    // Create a MigrateSource object.
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'storyscope_migrate') . '/csv/node/snapshot_os.csv', $this->csvColumns, array('header_rows' => 1));

    $this->destination = new MigrateDestinationFieldCollection(
      'field_story_set_snapshot_os',
      array('host_entity_type' => 'field_collection_item')
    );
    $this->map = new MigrateSQLMap($this->machineName, $key, $this->destination->getKeySchema());

    $this->addFieldMapping('host_entity_id', 'setid')->sourceMigration('SetFCs');

    // Generate the values in prepare row
    $text_arguments = MigrateTextFieldHandler::arguments(array(), 'extra_html');
    $this->addFieldMapping('field_story_snapshot_os_text', 'text')
         ->arguments($text_arguments);
    $this->addFieldMapping('field_story_snapshot_os_object', 'object_story_id')
         ->sourceMigration('ObjectStoryNodes');

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
    if (isset($entity->field_story_snapshot_os_object['und'])){
      foreach ($entity->field_story_snapshot_os_object['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $entity->field_story_snapshot_os_object['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
  }
}

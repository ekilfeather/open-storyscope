<?php
/**
* Migrate dossiers
*
* Use ResourceMigration class to import nodes.
*
*/
class EventNodes extends ResourceMigration {

  // Define entity type and bundle, used in garmentboxMigration.
  public $entityType = 'node';
  public $bundle = 'event';

  // Map columns to import. ResourceMigration already mapped "id" and "title".
  public $csvColumns = array(
    array('field_event_source_event', 'field_event_source_event'),
    array('field_event_activity', 'field_event_activity'),
    array('field_event_start_time', 'field_event_start_time'),
    array('field_event_end_time', 'field_event_end_time'),
    array('field_event_location', 'field_event_location'),
    array('field_event_agent', 'field_event_agent'),
    array('field_event_genre', 'field_event_genre'),
    array('field_event_style_movement', 'field_event_style_movement'),
    array('field_event_object', 'field_event_object'),
    array('field_event_label', 'field_event_label'),
    array('field_event_value', 'field_event_value'),
    array('field_event_annotation_uri', 'field_event_annotation_uri'),
    array('field_ca_sec_id', 'field_ca_sec_id'),
  );

  public function __construct() {
    parent::__construct();
    // Add dependencies
    $this->dependencies = array('SourceEventNodes');

    // Map the mapped columns to fields.
    $this->addFieldMapping('field_event_source_event', 'field_event_source_event')
         ->sourceMigration('SourceEventNodes');
    $this->addFieldMapping('field_event_start_time', 'field_event_start_time')->arguments(array('year' => array('source_field' => 'field_event_start_time')));
    $this->addFieldMapping('field_event_end_time', 'field_event_end_time')->arguments(array('year' => array('source_field' => 'field_event_end_time')));
    $this->addFieldMapping('field_event_label', 'field_event_label');
    $this->addFieldMapping('field_event_annotation_uri', 'field_event_annotation_uri');
    $this->addFieldMapping('field_ca_sec_id', 'field_ca_sec_id');

    // Create terms as they are imported
    $this->addFieldMapping('field_event_activity', 'field_event_activity')->arguments(array('create_term' => TRUE));
    $this->addFieldMapping('field_event_location', 'field_event_location')
         ->arguments(array('create_term' => TRUE))
         ->separator('|');
    $this->addFieldMapping('field_event_agent', 'field_event_agent')
         ->arguments(array('create_term' => TRUE))
         ->separator('|');
    $this->addFieldMapping('field_event_genre', 'field_event_genre')->arguments(array('create_term' => TRUE));
    $this->addFieldMapping('field_event_style_movement', 'field_event_style_movement')->arguments(array('create_term' => TRUE));
    $this->addFieldMapping('field_event_object', 'field_event_object')
         ->arguments(array('create_term' => TRUE))
         ->separator('|');

  }

  public function prepareRow($current_row) {
    return TRUE;
  }
  /**
   *
   * Process information here before migration.
   * @param stdClass $node
   * @param stdClass $row
   */
  public function prepare($node, stdClass $row) {
    // Small issue with migrating multiple values
    if (isset($node->field_event_source_event['und'])){
      foreach ($node->field_event_source_event['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $node->field_event_source_event['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
  }

}


// Field Collections - must be imported seperately
/**
 * Migrate Values 
 */
class EventValueFCs extends Migration {
  /**
   * Map the field and properties to the CSV header.
   */
  public $csvColumns = array(
    array('id', 'Unique ID'),
    array('userid', 'User ID'),
    array('title', 'Title'),
    array('body', 'description'),
    array('field_event_source_event', 'field_event_source_event'),
    array('field_event_activity', 'field_event_activity'),
    array('field_event_start_time', 'field_event_start_time'),
    array('field_event_end_time', 'field_event_end_time'),
    array('field_event_location', 'field_event_location'),
    array('field_event_agent', 'field_event_agent'),
    array('field_event_genre', 'field_event_genre'),
    array('field_event_style_movement', 'field_event_style_movement'),
    array('field_event_object', 'field_event_object'),
    array('field_event_label', 'field_event_label'),
    array('field_event_value', 'field_event_value'),
    array('field_event_annotation_uri', 'field_event_annotation_uri'),
    array('field_ca_sec_id', 'field_ca_sec_id'),
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import Event Values from a CSV file.');
    $this->dependencies = array('EventNodes');

    // Create a map object for tracking the relationships between source rows
    $key = array(
      'id' => array(
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
      ),
    );

    // Create a MigrateSource object.
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'storyscope_migrate') . '/csv/node/event.csv', $this->csvColumns, array('header_rows' => 1));

    $this->destination = new MigrateDestinationFieldCollection(
      'field_event_value',
      array('host_entity_type' => 'node')
    );
    $this->map = new MigrateSQLMap($this->machineName, $key, $this->destination->getKeySchema());


    $this->addFieldMapping('host_entity_id', 'id')->sourceMigration('EventNodes');

    // Generate the values in prepare row
    $this->addFieldMapping('field_event_value_value', 'field_event_value_gen');
    $this->addFieldMapping('field_event_value_currency', 'field_event_currency_gen');

  }

  public function prepareRow($current_row) {
    $value = explode('-',$current_row->field_event_value);
    $current_row->field_event_currency_gen = $value[0];
    $current_row->field_event_value_gen = $value[1];
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

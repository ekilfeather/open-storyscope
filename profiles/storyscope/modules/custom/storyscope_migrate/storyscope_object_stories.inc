<?php
/**
* Migrate dossiers
*
* Use ResourceMigration class to import nodes.
*
*/
class ObjectStoryNodes extends ResourceMigration {

  // Define entity type and bundle, used in garmentboxMigration.
  public $entityType = 'node';
  public $bundle = 'object_story';

  // Map columns to import. ResourceMigration already mapped "id" and "title".
  public $csvColumns = array(
    array('field_object_story_objects', 'field_object_story_objects'),
    array('field_object_story_references', 'field_object_story_references'),
    array('field_object_story_events', 'field_object_story_events'),
    array('field_object_story_private', 'field_object_story_private'),
    array('field_ca_sec_id', 'field_ca_sec_id'),
  );

  public function __construct() {
    parent::__construct();
    // Add dependencies
    $this->dependencies = array(
                            'ObjectNodes',
                            'ReferenceNodes',
                            'EventNodes'
                          );

    // Map the mapped columns to fields.
    $this->addFieldMapping('field_object_story_objects', 'field_object_story_objects')
         ->sourceMigration('ObjectNodes')
         ->separator('|');
    $this->addFieldMapping('field_object_story_references', 'field_object_story_references')
         ->sourceMigration('ReferenceNodes')
         ->separator('|');
    $this->addFieldMapping('field_object_story_events', 'field_object_story_events')
         ->sourceMigration('EventNodes')
         ->separator('|');
    $this->addFieldMapping('field_ca_sec_id', 'field_ca_sec_id');
    $this->addFieldMapping('field_object_story_private', 'field_object_story_private');
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
    if (isset($node->field_object_story_objects['und'])){
      foreach ($node->field_object_story_objects['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $node->field_object_story_objects['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
    if (isset($node->field_object_story_references['und'])){
      foreach ($node->field_object_story_references['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $node->field_object_story_references['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
    if (isset($node->field_object_story_events['und'])){
      foreach ($node->field_object_story_events['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $node->field_object_story_events['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
  }

}

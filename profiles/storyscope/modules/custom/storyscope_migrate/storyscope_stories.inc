<?php
/**
* Migrate Objects
*
* Use ResourceMigration class to import nodes.
*
*/
class StoryNodes extends ResourceMigration {

  // Define entity type and bundle, used in garmentboxMigration.
  public $entityType = 'node';
  public $bundle = 'story';

  // Map columns to import. ResourceMigration already mapped "id" and "title".
  public $csvColumns = array(
    array('field_story_sections', 'field_story_sections'),
    array('field_ca_sec_id', 'field_ca_sec_id'),
  );

  public function __construct() {
    parent::__construct();

    // Dependencies
    $this->dependencies = array('SectionNodes', 'EventNodes');

    // Map the mapped columns to fields.
    $this->addFieldMapping('field_story_sections', 'field_story_sections')
         ->sourceMigration('SectionNodes')
         ->separator('|');
  }

  public function prepareRow($current_row) {
    return TRUE;
  }

  public function prepare($node, stdClass $row) {
    // Small issue with migrating multiple values
    if (isset($node->field_story_sections['und'])){
      foreach ($node->field_story_sections['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $node->field_story_sections['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
  }
}

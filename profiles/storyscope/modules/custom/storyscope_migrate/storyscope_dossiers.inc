<?php
/**
* Migrate dossiers
*
* Use ResourceMigration class to import nodes.
*
*/
class DossierNodes extends ResourceMigration {

  // Define entity type and bundle, used in garmentboxMigration.
  public $entityType = 'node';
  public $bundle = 'dossier';

  // Map columns to import. ResourceMigration already mapped "id" and "title".
  public $csvColumns = array(
    array('field_dossier_viewers', 'field_dossier_viewers'),
    array('field_dossier_editors', 'field_dossier_editors'),
    array('field_dossier_object_stories', 'field_dossier_object_stories'),
    array('field_dossier_references', 'field_dossier_references'),
    array('field_dossier_events', 'field_dossier_events'),
    array('field_dossier_plots', 'field_dossier_plots'),
    array('field_dossier_stories', 'field_dossier_stories'),
    array('field_ca_sec_id', 'field_ca_sec_id'),
    array('field_dossier_private', 'field_dossier_private'),
  );

  public function __construct() {
    parent::__construct();

    // Dependencies
    $this->dependencies = array(
                            'ObjectNodes',
                            'EventNodes',
                            'PlotNodes',
                            'ReferenceNodes',
                            'ObjectStoryNodes',
                            'StoryNodes',
                          );

    // Map the mapped columns to fields.
    $this->addFieldMapping('field_dossier_viewers', 'field_dossier_viewers')
         ->sourceMigration('StoryscopeUsers')
         ->separator('|');
    $this->addFieldMapping('field_dossier_editors', 'field_dossier_editors')
         ->sourceMigration('StoryscopeUsers')
         ->separator('|');
    $this->addFieldMapping('field_dossier_object_stories', 'field_dossier_object_stories')
         ->sourceMigration('ObjectStoryNodes')
         ->separator('|');
    $this->addFieldMapping('field_dossier_events', 'field_dossier_events')
         ->sourceMigration('EventNodes')
         ->separator('|');
    $this->addFieldMapping('field_dossier_plots', 'field_dossier_plots')
         ->sourceMigration('PlotNodes')
         ->separator('|');
    $this->addFieldMapping('field_dossier_stories', 'field_dossier_stories')
         ->sourceMigration('StoryNodes')
         ->separator('|');
    $this->addFieldMapping('field_dossier_references', 'field_dossier_references')
         ->sourceMigration('ReferenceNodes')
         ->separator('|');
    $this->addFieldMapping('field_ca_sec_id', 'field_ca_sec_id');
    $this->addFieldMapping('field_dossier_private', 'field_dossier_private');
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
    if (isset($node->field_dossier_object_stories['und'])){
      foreach ($node->field_dossier_object_stories['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $node->field_dossier_object_stories['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
    if (isset($node->field_dossier_events['und'])){
      foreach ($node->field_dossier_events['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $node->field_dossier_events['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
    if (isset($node->field_dossier_plots['und'])){
      foreach ($node->field_dossier_plots['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $node->field_dossier_plots['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
    if (isset($node->field_dossier_stories['und'])){
      foreach ($node->field_dossier_stories['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $node->field_dossier_stories['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
    if (isset($node->field_dossier_references['und'])){
      foreach ($node->field_dossier_references['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $node->field_dossier_references['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
  }
}

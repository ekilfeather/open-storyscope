<?php
/**
* Migrate Objects
*
* Use ResourceMigration class to import nodes.
*
*/
class PlotElementNodes extends ResourceMigration {

  // Define entity type and bundle, used in garmentboxMigration.
  public $entityType = 'node';
  public $bundle = 'plot_element';

  // Map columns to import. ResourceMigration already mapped "id" and "title".
  public $csvColumns = array(
    array('field_plot_element_relationship', 'field_plot_element_relationship'),
    array('field_plot_element_plot_set1', 'field_plot_element_plot_set1'),
    array('field_plot_element_plot_set2', 'field_plot_element_plot_set2'),
    array('field_ca_sec_id', 'field_ca_sec_id'),
  );

  public function __construct() {
    parent::__construct();

    // Dependencies
    $this->dependencies = array('EventNodes');

    // Map the mapped columns to fields.
    $this->addFieldMapping('field_plot_element_relationship', 'field_plot_element_relationship');
    $this->addFieldMapping('field_ca_sec_id', 'field_ca_sec_id');
    $this->addFieldMapping('field_plot_element_plot_set_1', 'field_plot_element_plot_set1')
         ->sourceMigration('EventNodes')
         ->separator('|');
    $this->addFieldMapping('field_plot_element_plot_set_2', 'field_plot_element_plot_set2')
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
    if (isset($entity->field_plot_element_plot_set_1['und'])){
      foreach ($entity->field_plot_element_plot_set_1['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $entity->field_plot_element_plot_set_1['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
    if (isset($entity->field_plot_element_plot_set_2['und'])){
      foreach ($entity->field_plot_element_plot_set_2['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $entity->field_plot_element_plot_set_2['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
  }
}

<?php
/**
* Migrate Objects
*
* Use ResourceMigration class to import nodes.
*
*/
class PlotNodes extends ResourceMigration {

  // Define entity type and bundle, used in garmentboxMigration.
  public $entityType = 'node';
  public $bundle = 'plot';

  // Map columns to import. ResourceMigration already mapped "id" and "title".
  public $csvColumns = array(
    array('field_plot_plot_elements', 'field_plot_plot_elements'),
    array('field_ca_sec_id', 'field_ca_sec_id'),
  );

  public function __construct() {
    parent::__construct();

    // Dependencies
    $this->dependencies = array('PlotElementNodes', 'EventNodes');

    // Map the mapped columns to fields.
    $this->addFieldMapping('field_plot_plot_elements', 'field_plot_plot_elements')
         ->sourceMigration('PlotElementNodes')
         ->separator('|');
    $this->addFieldMapping('field_ca_sec_id', 'field_ca_sec_id');
  }

  public function prepareRow($current_row) {
    return TRUE;
  }

  public function prepare($node, stdClass $row) {
    // Small issue with migrating multiple values
    if (isset($node->field_plot_plot_elements['und'])){
      foreach ($node->field_plot_plot_elements['und']  as $refid => $ref){
        if (is_array($ref['target_id'])) {
          $node->field_plot_plot_elements['und'][$refid]['target_id'] = array_shift($ref['target_id']);
        }
      }
    }
  }
}

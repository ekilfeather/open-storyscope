<?php

/**
 * @file
 * Bean ctools plugin
 */

/**
 * DO NOT USE THIS BEAN.  ONLY USED FOR THE UI PLUGINS
 */
class BeanCustom extends BeanPlugin {
  /**
   * Delete the record from the database.
   */
  public function delete() {
    // Delete all beans belonging to this bean type if we are removing
    // the actual bean.
    if ($this->getExportStatus() == 'Normal') {
      db_delete('bean')
      ->condition('type', $this->type)
      ->execute();
    }
    db_delete('bean_type')
    ->condition('name', $this->type)
    ->execute();
    field_attach_delete_bundle('bean', $this->type);
    drupal_flush_all_caches();
  }

  /**
   * Save the record to the database
   */
  public function save($new = FALSE) {
    $bean_type = array(
      'name' => $this->type,
      'label' => $this->getLabel(),
      'description' => $this->getDescription(),
    );

    $primary_key = $new == FALSE ? 'name' : array();
    drupal_write_record('bean_type', $bean_type, $primary_key);
    drupal_static_reset('bean_admin_ui_get_types');

    bean_reset();
  }

  /**
   * Get the export status
   */
  public function getExportStatus() {
    return $this->plugin_info['export_status'];
  }

  /**
   * Set the label.
   *
   * @param label
   */
  public function setLabel($label) {
    $this->plugin_info['label'] = $label;
  }

  /**
   * Set the description.
   *
   * @param description
   */
  public function setDescription($description) {
    $this->plugin_info['description'] = $description;
  }
}

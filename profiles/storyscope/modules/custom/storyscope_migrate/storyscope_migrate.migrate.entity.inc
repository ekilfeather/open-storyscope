<?php

/**
 * @file
 * Populate distribution with some content.
 */

abstract class ResourceMigration extends Migration {

  public function __construct() {
    parent::__construct();

    // Make sure we can use it for node and term only.
    if (!in_array($this->entityType, array('node', 'taxonomy_term'))) {
      throw new Exception('resourceMigration supports only nodes and terms.');
    }

    $this->description = t('Import @type - @bundle from CSV file.', array('@type' => $this->entityType, '@bundle' => $this->bundle));

    // Dependencies on Users
    $this->dependencies = array('StoryscopeUsers');

    $this->csvColumns = !empty($this->csvColumns) ? $this->csvColumns : array();
    $csv_cols[] = array('id', 'Unique ID');
    $csv_cols[] = array('userid', 'User ID');
    if ($this->entityType == 'node') {
      $this->addFieldMapping('title', 'title');
      $body_arguments = MigrateTextFieldHandler::arguments(array(), 'extra_html');
      $this->addFieldMapping('body', 'body')
           ->arguments($body_arguments);
      $class_name = 'MigrateDestinationNode';
      $this->addFieldMapping('uid', 'userid')
           ->sourceMigration('StoryscopeUsers')
           ->defaultValue(1);

      $csv_cols[] = array('title', 'Title');
      $csv_cols[] = array('body', 'description');
    }
    elseif ($this->entityType == 'taxonomy_term') {
      $this->addFieldMapping('name', 'name');
      $class_name = 'MigrateDestinationTerm';
      $csv_cols[] = array('name', 'Name');
    }

    // Rebuild the csv columns array.
    $this->csvColumns = array_merge($csv_cols, $this->csvColumns);

    // Create a map object for tracking the relationships between source rows
    $key = array(
      'id' => array(
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
      ),
    );

    $destination_handler = new MigrateDestinationEntityAPI($this->entityType, $this->bundle);
    $this->map = new MigrateSQLMap($this->machineName, $key, $destination_handler->getKeySchema($this->entityType));

    // Create a MigrateSource object.
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'storyscope_migrate') . '/csv/' . $this->entityType . '/' . $this->bundle . '.csv', $this->csvColumns, array('header_rows' => 1));
    $this->destination = new $class_name($this->bundle, array('text_format' => 'filtered_html'));
  }

  function prepareRow($row) {
    // Set a default timezone on all date fields, assuming the imported data
    // is in the site's timezone instead of the default UTC.
    if (!empty($this->dateFields)) {
      foreach ($this->dateFields as $date_field) {
        $date_data = array(
          'from' => $row->{$date_field},
          'timezone' => date_default_timezone_get(),
        );
        $row->{$date_field} = drupal_json_encode($date_data);
      }
    }
  }
}

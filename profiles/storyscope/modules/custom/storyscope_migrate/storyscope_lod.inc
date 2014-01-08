<?php

/**
 * Migrate Linked Object Data.
 *
 * Field Collections - must be imported seperately
 */

/**
 * Materials LOD.
 */
class MaterialsLODFCs extends Migration {
  /**
   * Map the field and properties to the CSV header.
   */
  public $csvColumns = array(
    array('id', 'LOD material'),
    array('parentid', 'Parent Object Id'),
    array('topic', 'Topic'),
    array('mid', 'MID'),
    array('first_parentid', 'First Parent Object Id'),
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import Material LODs from a CSV file.');
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
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'storyscope_migrate') . '/csv/lod/materials_lod.csv', $this->csvColumns, array('header_rows' => 1));

    $this->destination = new MigrateDestinationFieldCollection(
      'field_fb_materials',
      array('host_entity_type' => 'node')
    );
    $this->map = new MigrateSQLMap($this->machineName, $key, $this->destination->getKeySchema());

    $this->addFieldMapping('host_entity_id', 'first_parentid')
      ->sourceMigration('ObjectNodes');
    $this->addFieldMapping('parentids', 'parentid')
      ->separator('|')
      ->sourceMigration('ObjectNodes');

    $this->addFieldMapping('field_fb_materials_topic', 'topic');
    $this->addFieldMapping('field_fb_materials_mid', 'mid');
  }

  public function prepareRow($row) {
    if (parent::prepareRow($row) === FALSE) {
      return FALSE;
    }
    $parentids = explode('|', $row->parentid);
    $row->first_parentid = $parentids[0];

    return TRUE;
  }

  /**
   * Create additional field collection items for the other host entities.
   * Means on rollback these additional FCs can't be rolled back.
   */
  function complete($entity, stdClass $row) {
    foreach ($entity->parentids as $id => $parentid) {
      if ($id == 0) continue; // Skipping this record as we've just imported it.
      $nid = $parentid['destid1']; 
      if (!empty($nid)) {
        $parent_node = node_load($nid);
        $fc = entity_create('field_collection_item', array('field_name' => 'field_fb_materials'));
        $fc->setHostEntity('node', $parent_node);
        $status = entity_save('field_collection_item', $fc);
        $fc_wrapper = entity_metadata_wrapper('field_collection_item', $fc);
        $fc_wrapper->field_fb_materials_topic->set($row->topic);
        $fc_wrapper->field_fb_materials_mid->set($row->mid);
        $fc_wrapper->save();
      }
    }
  }
}


/**
 * Classifications LOD.
 */
class ClassificationsLODFCs extends Migration {
  /**
   * Map the field and properties to the CSV header.
   */
  public $csvColumns = array(
    array('id', 'LOD classification'),
    array('parentid', 'Parent Object Id'),
    array('topic', 'Topic'),
    array('mid', 'MID'),
    array('first_parentid', 'First Parent Object Id'),
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import Classification LODs from a CSV file.');
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
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'storyscope_migrate') . '/csv/lod/classifications_lod.csv', $this->csvColumns, array('header_rows' => 1));

    $this->destination = new MigrateDestinationFieldCollection(
      'field_fb_classification',
      array('host_entity_type' => 'node')
    );
    $this->map = new MigrateSQLMap($this->machineName, $key, $this->destination->getKeySchema());

    $this->addFieldMapping('host_entity_id', 'first_parentid')
      ->sourceMigration('ObjectNodes');
    $this->addFieldMapping('parentids', 'parentid')
      ->separator('|')
      ->sourceMigration('ObjectNodes');

    $this->addFieldMapping('field_fb_classification_topic', 'topic');
    $this->addFieldMapping('field_fb_classification_mid', 'mid');
  }

  public function prepareRow($row) {
    if (parent::prepareRow($row) === FALSE) {
      return FALSE;
    }
    $parentids = explode('|', $row->parentid);
    $row->first_parentid = $parentids[0];

    return TRUE;
  }

  /**
   * Create additional field collection items for the other host entities.
   * Means on rollback these additional FCs can't be rolled back.
   */
  function complete($entity, stdClass $row) {
    foreach ($entity->parentids as $id => $parentid) {
      if ($id == 0) continue; // Skipping this record as we've just imported it.
      $nid = $parentid['destid1']; 
      if (!empty($nid)) {
        $parent_node = node_load($nid);
        $fc = entity_create('field_collection_item', array('field_name' => 'field_fb_classification'));
        $fc->setHostEntity('node', $parent_node);
        $status = entity_save('field_collection_item', $fc);
        $fc_wrapper = entity_metadata_wrapper('field_collection_item', $fc);
        $fc_wrapper->field_fb_classification_topic->set($row->topic);
        $fc_wrapper->field_fb_classification_mid->set($row->mid);
        $fc_wrapper->save();
      }
    }
  }
}


/**
 * StylesMovements LOD.
 */
class StylesMovementsLODFCs extends Migration {
  /**
   * Map the field and properties to the CSV header.
   */
  public $csvColumns = array(
    array('id', 'LOD style and movements'),
    array('parentid', 'Parent Event Id'),
    array('topic', 'Topic'),
    array('mid', 'MID'),
    array('first_parentid', 'First Parent Event Id'),
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import Style and Movement LODs from a CSV file.');
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
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'storyscope_migrate') . '/csv/lod/styles_movements_lod.csv', $this->csvColumns, array('header_rows' => 1));

    $this->destination = new MigrateDestinationFieldCollection(
      'field_fb_style_movement',
      array('host_entity_type' => 'node')
    );
    $this->map = new MigrateSQLMap($this->machineName, $key, $this->destination->getKeySchema());

    $this->addFieldMapping('host_entity_id', 'first_parentid')
      ->sourceMigration('EventNodes');
    $this->addFieldMapping('parentids', 'parentid')
      ->separator('|')
      ->sourceMigration('EventNodes');

    $this->addFieldMapping('field_fb_style_movement_topic', 'topic');
    $this->addFieldMapping('field_fb_style_movement_mid', 'mid');
  }

  public function prepareRow($row) {
    if (parent::prepareRow($row) === FALSE) {
      return FALSE;
    }
    $parentids = explode('|', $row->parentid);
    $row->first_parentid = $parentids[0];

    return TRUE;
  }

  /**
   * Create additional field collection items for the other host entities.
   * Means on rollback these additional FCs can't be rolled back.
   */
  function complete($entity, stdClass $row) {
    foreach ($entity->parentids as $id => $parentid) {
      if ($id == 0) continue; // Skipping this record as we've just imported it.
      $nid = $parentid['destid1']; 
      if (!empty($nid)) {
        $parent_node = node_load($nid);
        $fc = entity_create('field_collection_item', array('field_name' => 'field_fb_style_movement'));
        $fc->setHostEntity('node', $parent_node);
        $status = entity_save('field_collection_item', $fc);
        $fc_wrapper = entity_metadata_wrapper('field_collection_item', $fc);
        $fc_wrapper->field_fb_style_movement_topic->set($row->topic);
        $fc_wrapper->field_fb_style_movement_mid->set($row->mid);
        $fc_wrapper->save();
      }
    }
  }
}


/**
 * Genres LOD.
 */
class GenresLODFCs extends Migration {
  /**
   * Map the field and properties to the CSV header.
   */
  public $csvColumns = array(
    array('id', 'LOD genre'),
    array('parentid', 'Parent Event Id'),
    array('topic', 'Topic'),
    array('mid', 'MID'),
    array('first_parentid', 'First Parent Event Id'),
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import Genre LODs from a CSV file.');
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
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'storyscope_migrate') . '/csv/lod/genres_lod.csv', $this->csvColumns, array('header_rows' => 1));

    $this->destination = new MigrateDestinationFieldCollection(
      'field_fb_genre',
      array('host_entity_type' => 'node')
    );
    $this->map = new MigrateSQLMap($this->machineName, $key, $this->destination->getKeySchema());

    $this->addFieldMapping('host_entity_id', 'first_parentid')
      ->sourceMigration('EventNodes');
    $this->addFieldMapping('parentids', 'parentid')
      ->separator('|')
      ->sourceMigration('EventNodes');

    $this->addFieldMapping('field_fb_genre_topic', 'topic');
    $this->addFieldMapping('field_fb_genre_mid', 'mid');
  }

  public function prepareRow($row) {
    if (parent::prepareRow($row) === FALSE) {
      return FALSE;
    }
    $parentids = explode('|', $row->parentid);
    $row->first_parentid = $parentids[0];

    return TRUE;
  }

  /**
   * Create additional field collection items for the other host entities.
   * Means on rollback these additional FCs can't be rolled back.
   */
  function complete($entity, stdClass $row) {
    foreach ($entity->parentids as $id => $parentid) {
      if ($id == 0) continue; // Skipping this record as we've just imported it.
      $nid = $parentid['destid1']; 
      if (!empty($nid)) {
        $parent_node = node_load($nid);
        $fc = entity_create('field_collection_item', array('field_name' => 'field_fb_genre'));
        $fc->setHostEntity('node', $parent_node);
        $status = entity_save('field_collection_item', $fc);
        $fc_wrapper = entity_metadata_wrapper('field_collection_item', $fc);
        $fc_wrapper->field_fb_genre_topic->set($row->topic);
        $fc_wrapper->field_fb_genre_mid->set($row->mid);
        $fc_wrapper->save();
      }
    }
  }
}


/**
 * Locations LOD.
 */
class LocationsLODFCs extends Migration {
  /**
   * Map the field and properties to the CSV header.
   */
  public $csvColumns = array(
    array('id', 'LOD location'),
    array('parentid', 'Parent Object / Event Id'),
    array('topic', 'Topic'),
    array('mid', 'MID'),
    array('geolocation_latitude', 'Geolocation latitude'),
    array('geolocation_longitude', 'Geolocation longitude'),
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import Location LODs from a CSV file.');
    $this->dependencies = array('ObjectNodes', 'EventNodes');

    // Create a map object for tracking the relationships between source rows
    $key = array(
      'id' => array(
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
      ),
    );

    // Create a MigrateSource object.
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'storyscope_migrate') . '/csv/lod/locations_lod.csv', $this->csvColumns, array('header_rows' => 1));

    $this->destination = new MigrateDestinationFieldCollection(
      'field_fb_location',
      array('host_entity_type' => 'node')
    );
    $this->map = new MigrateSQLMap($this->machineName, $key, $this->destination->getKeySchema());

    $this->addFieldMapping('host_entity_id', 'first_parentid')
      ->sourceMigration(array('ObjectNodes', 'EventNodes'));
    $this->addFieldMapping('parentids', 'parentid')
      ->separator('|')
      ->sourceMigration(array('ObjectNodes', 'EventNodes'));

    $this->addFieldMapping('field_fb_location_topic', 'topic');
    $this->addFieldMapping('field_fb_location_mid', 'mid');

    $this->addFieldMapping('field_fb_geolocation', '')->defaultValue('Point');
    $this->addFieldMapping('field_fb_geolocation:lat', 'geolocation_latitude');
    $this->addFieldMapping('field_fb_geolocation:lon', 'geolocation_longitude');

  }

  public function prepareRow($row) {
    if (parent::prepareRow($row) === FALSE) {
      return FALSE;
    }
    $parentids = explode('|', $row->parentid);
    $row->first_parentid = $parentids[0];

    return TRUE;
  }

  /**
   * Create additional field collection items for the other host entities.
   * Means on rollback these additional FCs can't be rolled back.
   */
  function complete($entity, stdClass $row) {
    foreach ($entity->parentids as $id => $parentid) {
      if ($id == 0) continue; // Skipping this record as we've just imported it.
      $nid = $parentid['destid1']; 
      if (!empty($nid)) {
        $parent_node = node_load($nid);
        $fc = entity_create('field_collection_item', array('field_name' => 'field_fb_location'));
        $fc->setHostEntity('node', $parent_node);
        $status = entity_save('field_collection_item', $fc);
        $fc_wrapper = entity_metadata_wrapper('field_collection_item', $fc);
        $fc_wrapper->field_fb_location_topic->set($row->topic);
        $fc_wrapper->field_fb_location_mid->set($row->mid);
        $fc_wrapper->field_fb_geolocation->set($entity->field_fb_geolocation['und'][0]);
        $fc_wrapper->save();
      }
    }
  }
}


/**
 * Agents LOD.
 */
class AgentsLODFCs extends Migration {
  /**
   * Map the field and properties to the CSV header.
   */
  public $csvColumns = array(
    array('id', 'LOD agent'),
    array('parentid', 'Parent Object / Event Id'),
    array('topic', 'Topic'),
    array('mid', 'MID'),
    array('birth_date', 'Birth Date'),
    array('death_date', 'Death Date'),
    array('first_parentid', 'First Parent Object / Event Id'),
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import Agent LODs from a CSV file.');
    $this->dependencies = array('ObjectNodes', 'EventNodes');

    // Create a map object for tracking the relationships between source rows
    $key = array(
      'id' => array(
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
      ),
    );

    // Create a MigrateSource object.
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'storyscope_migrate') . '/csv/lod/agents_lod.csv', $this->csvColumns, array('header_rows' => 1));

    $this->destination = new MigrateDestinationFieldCollection(
      'field_fb_agent',
      array('host_entity_type' => 'node')
    );
    $this->map = new MigrateSQLMap($this->machineName, $key, $this->destination->getKeySchema());

    $this->addFieldMapping('host_entity_id', 'first_parentid')
      ->sourceMigration(array('ObjectNodes', 'EventNodes'));
    $this->addFieldMapping('parentids', 'parentid')
      ->separator('|')
      ->sourceMigration(array('ObjectNodes', 'EventNodes'));

    $this->addFieldMapping('field_fb_agent_topic', 'topic');
    $this->addFieldMapping('field_fb_agent_mid', 'mid');
    $this->addFieldMapping('field_fb_agent_birth_date', 'gen_birth_date');
    $this->addFieldMapping('field_fb_agent_death_date', 'gen_death_date');
  }

  public function prepareRow($row) {
    if (parent::prepareRow($row) === FALSE) {
      return FALSE;
    }
    $parentids = explode('|', $row->parentid);
    $row->first_parentid = $parentids[0];
    // Generate the date needed
    $row->birth_date = substr($row->birth_date,-4);
    $row->death_date = substr($row->death_date,-4);
    $row->gen_birth_date = strtotime($row->birth_date . '-01-02');
    $row->gen_death_date = strtotime($row->death_date . '-01-02');

    return TRUE;
  }

  /**
   * Create additional field collection items for the other host entities.
   * Means on rollback these additional FCs can't be rolled back.
   */
  function complete($entity, stdClass $row) {
    foreach ($entity->parentids as $id => $parentid) {
      if ($id == 0) continue; // Skipping this record as we've just imported it.
      $nid = $parentid['destid1']; 
      if (!empty($nid)) {
        $parent_node = node_load($nid);
        $fc = entity_create('field_collection_item', array('field_name' => 'field_fb_agent'));
        $fc->setHostEntity('node', $parent_node);
        $status = entity_save('field_collection_item', $fc);
        $fc_wrapper = entity_metadata_wrapper('field_collection_item', $fc);
        $fc_wrapper->field_fb_agent_topic->set($row->topic);
        $fc_wrapper->field_fb_agent_mid->set($row->mid);
        $fc_wrapper->field_fb_agent_birth_date->set($row->birth_date);
        $fc_wrapper->field_fb_agent_death_date->set($row->death_date);
        $fc_wrapper->save();
      }
    }
  }
}


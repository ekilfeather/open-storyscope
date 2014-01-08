<?php

/**
 * @file
 * Bean classes and plugin interface
 */

/**
 * Interface for Plugin Classes
 */
interface BeanTypePluginInterface {

  /**
   * Constructor
   *
   * Plugin info should be called using bean_fetch_plugin_info().
   *
   * @abstract
   *
   * @param  $plugin_info array of information from the ctools plugin.
   */
  public function __construct($plugin_info);

  /**
   * Get the ctools plugin info.
   *
   * If you pass in a key, then the key from the plugin info will be returned
   * otherwise the entire plugin will be returned
   *
   * @abstract
   *
   * @param  $key
   * @return array of plugin info for value froma key
   */
  public function getInfo($key = NULL);

  /**
   * Build the URL string for the plugin
   *
   * @abstract
   *
   * @return url
   */
  public function buildURL();

  /**
   * Get the label name of the plugin
   *
   * @abstract
   *
   * @return label of the type
   */
  public function getLabel();

  /**
   * Get the description of the plugin
   *
   * @abstract
   *
   * @return description of the type
   */
  public function getDescription();

  /**
   * Set the Bean object for later use
   *
   * @abstract
   *
   * @param Bean $bean
   */
  public function setBean($bean);

  /**
   * Is this type editable?
   *
   * @abstract
   *
   * @return boolean
   */
  public function isEditable();

  /**
   * Define the form values and their defaults
   */
  public function values();

  /**
   * The Plugin Form
   *
   * The Bean object will be either loaded from the database or filled with the defaults.
   *
   * @param $bean
   * @param $form
   * @param $form_state
   * @return form array
   */
  public function form($bean, $form, &$form_state);

  /**
   * Validate function for bean type form
   *
   * @abstract
   *
   * @param  $values
   * @param $form_state
   */
  public function validate($values, &$form_state);

  /**
   * React to a bean being saved
   *
   * @abstract
   *
   * @param Bean $bean
   */
  public function submit(Bean $bean);

  /**
   * Return the block content.
   *
   * @abstract
   *
   * @param $bean
   *   The bean object being viewed.
   * @param $content
   *   The default content array created by Entity API.  This will include any
   *   fields attached to the entity.
   * @param $view_mode
   *   The view mode passed into $entity->view().
   * @return
   *   Return a renderable content array.
   */
  public function view($bean, $content, $view_mode = 'default', $langcode = NULL);
}

/**
 * The Bean entity class
 */
class Bean extends Entity {
  public $label;
  public $description;
  public $title;
  public $type;
  public $data;
  public $delta;
  public $view_mode;
  protected $plugin;

  /**
   * Get Plugin info
   *
   * @param $key
   *  The plugin key to get the info for.
   */
  public function getInfo($key = NULL) {
    if ($this->plugin instanceof BeanTypePluginInterface) {
      return $this->plugin->getInfo($key);
    }

    return NULL;
  }

  public function defaultLabel() {
    return $this->label;
  }

  public function __construct(array $values = array()) {
    // If this is new then set the type first.
    if (isset($values['is_new'])) {
      $this->type = isset($values['type']) ? $values['type'] : '';
    }

    parent::__construct($values, 'bean');
  }

  protected function setUp() {
    parent::setUp();

    if (!empty($this->type)) {
      $plugin = bean_load_plugin_class($this->type);
      $this->loadUp($plugin);
    }
  }

  /**
   * This is a work around for version of PDO that call __construct() before
   * it loads up the object with values from the DB.
   */
  public function loadUp($plugin) {
    if (empty($this->plugin)) {
      // If the plugin has been disabled, the $plugin will be a boolean.
      // just load the base plugin so something will render.
      if (!($plugin instanceof BeanTypePluginInterface)) {
        $plugin = bean_load_plugin_class('bean_default');
      }

      $this->setPlugin($plugin);
      $this->setFields();
    }
  }

  /**
   * Load and set the plugin info.
   * This can be called externally via loadUP()
   */
  protected  function setPlugin($plugin) {
    $this->plugin = $plugin;
  }

  /**
   * Set the fields from the defaults and plugin
   * This can be called externally via loadUP()
   */
  protected function setFields() {
    // NOTE: When setFields is called externally $this->data is already unserialized.
    if (!empty($this->plugin) && !empty($this->type)) {
      $values = is_array($this->data) ? $this->data : unserialize($this->data);
      foreach ($this->plugin->values() as $field => $default) {
        $this->$field = isset($values[$field]) ? $values[$field] : $default;
      }
    }
  }

  /**
   * Override this in order to implement a custom default URI and specify
   * 'entity_class_uri' as 'uri callback' hook_entity_info().
   */
  protected function defaultUri() {
    return array('path' => 'block/' . $this->identifier());
  }

  /**
   * Get the plugin form
   */
  public function getForm($form, &$form_state) {
    return $this->plugin->form($this, $form, $form_state);
  }

  /**
   * Validate the plugin form
   */
  public function validate($values, &$form_state) {
    $this->plugin->validate($values, $form_state);
  }

  /**
   * URL string
   */
  public function url() {
    $uri = $this->defaultUri();
    return $uri['path'];
  }

  /**
   * Build the URL string
   */
  protected function buildURL($type) {
    $url = $this->url();
    return $url . '/' . $type;
  }

  /**
   * View URL
   */
  public function viewURL() {
    return $this->buildURL('view');
  }

  /**
   * View URL
   */
  public function editURL() {
    return $this->buildURL('edit');
  }

  /**
   * View URL
   */
  public function deleteURL() {
    return $this->buildURL('delete');
  }

  /**
   * Type name
   */
  public function typeName() {
    return $this->getInfo('label');
  }

  /**
   * Set the values from a plugin
   */
  public function setValues($values) {
    $this->data = array();
    foreach ($this->plugin->values() as $field => $value) {
      $this->data[$field] = $values[$field];
    }
  }

  /**
   * Generate an array for rendering the entity.
   *
   * @see entity_view()
   */
  public function view($view_mode = 'default', $langcode = NULL, $page = NULL) {
    $content = parent::view($view_mode, $langcode);
    if (empty($this->plugin)) {
      return $content;
    }
    return $this->plugin->view($this, $content, $view_mode, $langcode);
  }

  /**
   * Override the save to add clearing of caches
   */
  public function save() {
    // Set the delta if it's not set already
    if (empty($this->delta)) {
      $max_length = 32;

      // Base it on the label and make sure it isn't too long for the database.
      if (module_exists('transliteration')) {
        $delta = drupal_clean_css_identifier(transliteration_get($this->label));
      }
      else {
        $delta = drupal_clean_css_identifier(strtolower($this->label));;
      }

      $this->delta = substr($delta, 0, $max_length);

      // Check if delta is unique.
      if (bean_load_delta($this->delta)) {
        $i = 0;
        $separator = '-';
        $original_delta = $this->delta;
        do {
          $unique_suffix = $separator . $i++;
          $this->delta = substr($original_delta, 0, $max_length - drupal_strlen($unique_suffix)) . $unique_suffix;
        } while (bean_load_delta($this->delta));
      }
    }

    $this->plugin->submit($this);

    $return = parent::save();
    block_flush_caches();
    cache_clear_all('bean:' . $this->delta . ':', 'cache_block', TRUE);
    return $return;
  }

  /**
   * Override the delete to remove the fields and blocks
   */
  public function delete() {
    if ($this->internalIdentifier()) {
      // Delete the field values
      field_attach_delete('bean', $this);

      // Delete any blocks
      // @see block_custom_block_delete_submit()
      db_delete('block')
        ->condition('module', 'bean')
        ->condition('delta', $this->identifier())
        ->execute();
      db_delete('block_role')
        ->condition('module', 'bean')
        ->condition('delta', $this->identifier())
        ->execute();

      // @see node_form_block_custom_block_delete_submit()
      db_delete('block_node_type')
        ->condition('module', 'bean')
        ->condition('delta', $this->identifier())
        ->execute();
      entity_get_controller($this->entityType)->delete(array($this->internalIdentifier()));
    }
  }
}

class BeanEntityAPIController extends EntityAPIController {
  protected function setPlugin(Bean $bean) {
    static $plugins = array();

    if (empty($plugins[$bean->type])) {
      $plugins[$bean->type] = bean_load_plugin_class($bean->type);
      $bean->loadUp($plugins[$bean->type]);
    }
  }

  /**
   * Overridden.
   * @see EntityAPIController#load($ids, $conditions)
   *
   * We need to load the plugin and set the defaults before
   * anything else is down to the record
   */
  public function load($ids = array(), $conditions = array()) {
    $entities = array();

    // Revisions are not statically cached, and require a different query to
    // other conditions, so separate the revision id into its own variable.
    if ($this->revisionKey && isset($conditions[$this->revisionKey])) {
      $revision_id = $conditions[$this->revisionKey];
      unset($conditions[$this->revisionKey]);
    }
    else {
      $revision_id = FALSE;
    }

    // Create a new variable which is either a prepared version of the $ids
    // array for later comparison with the entity cache, or FALSE if no $ids
    // were passed. The $ids array is reduced as items are loaded from cache,
    // and we need to know if it's empty for this reason to avoid querying the
    // database when all requested entities are loaded from cache.
    $passed_ids = !empty($ids) ? array_flip($ids) : FALSE;

    // Try to load entities from the static cache.
    if ($this->cache && !$revision_id) {
      $entities = $this->cacheGet($ids, $conditions);
      // If any entities were loaded, remove them from the ids still to load.
      if ($passed_ids) {
        $ids = array_keys(array_diff_key($passed_ids, $entities));
      }
    }

    // Load any remaining entities from the database. This is the case if $ids
    // is set to FALSE (so we load all entities), if there are any ids left to
    // load or if loading a revision.
    if (!($this->cacheComplete && $ids === FALSE && !$conditions) && ($ids === FALSE || $ids || $revision_id)) {
      $queried_entities = array();
      foreach ($this->query($ids, $conditions, $revision_id) as $record) {
        // This is what was overridden.
        $this->setPlugin($record);
        // Skip entities already retrieved from cache.
        if (isset($entities[$record->{$this->idKey}])) {
          continue;
        }

        // Take care of serialized columns.
        $schema = drupal_get_schema($this->entityInfo['base table']);

        foreach ($schema['fields'] as $field => $info) {
          if (!empty($info['serialize']) && isset($record->$field)) {
            $record->$field = unserialize($record->$field);
            // Support automatic merging of 'data' fields into the entity.
            if (!empty($info['merge']) && is_array($record->$field)) {
              foreach ($record->$field as $key => $value) {
                $record->$key = $value;
              }
              unset($record->$field);
            }
          }
        }

        $queried_entities[$record->{$this->idKey}] = $record;
      }
    }

    // Pass all entities loaded from the database through $this->attachLoad(),
    // which attaches fields (if supported by the entity type) and calls the
    // entity type specific load callback, for example hook_node_load().
    if (!empty($queried_entities)) {
      $this->attachLoad($queried_entities, $revision_id);
      $entities += $queried_entities;
    }

    if ($this->cache) {
      // Add entities to the cache if we are not loading a revision.
      if (!empty($queried_entities) && !$revision_id) {
        $this->cacheSet($queried_entities);

        // Remember if we have cached all entities now.
        if (!$conditions && $ids === FALSE) {
          $this->cacheComplete = TRUE;
        }
      }
    }
    // Ensure that the returned array is ordered the same as the original
    // $ids array if this was passed in and remove any invalid ids.
    if ($passed_ids && $passed_ids = array_intersect_key($passed_ids, $entities)) {
      foreach ($passed_ids as $id => $value) {
        $passed_ids[$id] = $entities[$id];
      }
      $entities = $passed_ids;
    }
    return $entities;
  }
}

class BeanException extends Exception {};

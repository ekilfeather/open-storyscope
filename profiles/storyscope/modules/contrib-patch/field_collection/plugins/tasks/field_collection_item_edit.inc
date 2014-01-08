<?php

/**
 * Specialized implementation of hook_page_manager_task_tasks(). See api-task.html for
 * more information.
 */
function field_collection_field_collection_item_edit_page_manager_tasks() {
  return array(
    // This is a 'page' task and will fall under the page admin UI
    'task type' => 'page',

    'title' => t('Field collection item add/edit form'),
    'admin title' => t('Field collection item add/edit form'),
    'admin description' => t('When enabled, this overrides the default Drupal behavior for adding or edit field collection items at <em>field-collection/[field-name]/%field_collection_item/edit</em> and <em>field-collection/[field-name]/add/[entity-type]/[entity-id]</em>. If you add variants, you may use selection criteria such as field collection item type or language or user access to provide different edit forms for field collection itemss. If no variant is selected, the default Drupal field collection item edit will be used.'),
    'admin path' => 'field-collection/%/%field_collection_item/edit',

    // Menu hooks so that we can alter the
    // field-collection/[field-name]/%field_collection_item menu entry to point to us.
    'hook menu' => 'field_collection_field_collection_item_edit_menu',
    'hook menu alter' => 'field_collection_field_collection_item_edit_menu_alter',

    // This is task uses 'context' handlers and must implement these to give the
    // handler data it needs.
    'handler type' => 'context',
    'get arguments' => 'field_collection_field_collection_item_edit_get_arguments',
    'get context placeholders' => 'field_collection_field_collection_item_edit_get_contexts',

    // Allow this to be enabled or disabled:
    'disabled' => variable_get('field_collection_field_collection_item_edit_disabled', TRUE),
    'enable callback' => 'field_collection_field_collection_item_edit_enable',
    'access callback' => 'field_collection_field_collection_item_edit_access_check',
  );
}

/**
 * Callback defined by field_collection_field_collection_item_edit_page_manager_tasks().
 *
 * Alter the field collection item edit input so that field collection item edit comes to
 * us rather than the normal field collection item edit process.
 */
function field_collection_field_collection_item_edit_menu_alter(&$items, $task) {
  if (variable_get('field_collection_field_collection_item_edit_disabled', TRUE)) {
    return;
  }

  foreach (field_info_fields() as $field) {
    if ($field['type'] == 'field_collection') {
      $path = field_collection_field_get_path($field);
      $count = count(explode('/', $path));

      $callback = $items[$path . '/%field_collection_item/edit']['page callback'];
      $callback_args = $items[$path . '/%field_collection_item/edit']['page arguments'];
      // Override the field collection item edit handler for our purpose.
      if (($callback == 'drupal_get_form' && $callback_args[0] == 'field_collection_item_form') || variable_get('page_manager_override_anyway', FALSE)) {
        $items[$path . '/%field_collection_item/edit']['page callback'] = 'field_collection_field_collection_item_edit';
        $items[$path . '/%field_collection_item/edit']['file path'] = $task['path'];
        $items[$path . '/%field_collection_item/edit']['file'] = $task['file'];
      }
      else {
        variable_set('field_collection_field_collection_item_edit_disabled', TRUE);
        if (!empty($GLOBALS['field_collection_enabling_field_collection_item_edit'])) {
          drupal_set_message(t('Page manager module is unable to enable @path/%field_collection_item/edit because some other module already has overridden with %callback.', array('@path' => $path, '%callback' => $callback)), 'warning');
        }
      }

      // Also catch add handling:
      $add_path = $path . '/add/%/%';
      if ($items[$add_path]['page callback'] != 'field_collection_item_add') {
        if (!empty($GLOBALS['field_collection_enabling_field_collection_item_edit'])) {
          drupal_set_message(t('Page manager module is unable to override @path because some other module already has overridden with %callback. Field collection item edit will be enabled but that edit path will not be overridden.', array('@path' => $add_path, '%callback' => $items[$add_path]['page callback'])), 'warning');
        }
        continue;
      }

      $items[$add_path]['page callback'] = 'field_collection_field_collection_item_add';
      $items[$add_path]['file path'] = $task['path'];
      $items[$add_path]['file'] = $task['file'];
    }
  }
}

/**
 * Entry point for our overridden field collection item edit.
 *
 * This function asks its assigned handlers who, if anyone, would like
 * to run with it. If no one does, it passes through to the standard
 * field collection item edit, which is drupal_get_form('field_collection_item_form').
 */
function field_collection_field_collection_item_edit($form_id, $field_collection_item) {
  // Load my task plugin
  $task = page_manager_get_task('field_collection_item_edit');

  // Load the field_collection_item into a context.
  ctools_include('context');
  ctools_include('context-task-handler');
  $contexts = ctools_context_handler_get_task_contexts($task, '', array($field_collection_item));

  $arg = array(isset($field_collection_item->item_id) ? $field_collection_item->item_id : '');
  $output = ctools_context_handler_render($task, '', $contexts, $arg);
  if ($output === FALSE) {
    // Fall back!
    // We've already built the form with the context, so we can't build it again, or
    // form_clean_id will mess up our ids. But we don't really need to, either:
    $context = reset($contexts);
    $output = $context->form;
  }

  return $output;
}

/**
 * Callback to handle the process of adding a field collection item.
 *
 * This creates a basic $field_collection_item and passes that off to field_collection_field_collection_item_edit().
 * It is modeled after field_collection_item_add() function.
 *
 * Unlike field_collection_item_add() we do not need to check
 * field_collection_item_access() because that was already checked by the menu
 * system.
 */
function field_collection_field_collection_item_add($field_name, $entity_type, $entity_id) {
  global $user;

  $info = entity_get_info();
  if (!isset($info[$entity_type])) {
    return MENU_NOT_FOUND;
  }
  $result = entity_load($entity_type, array($entity_id));
  $entity = reset($result);
  if (!$entity) {
    return MENU_NOT_FOUND;
  }
  // Ensure the given entity is of a bundle that has an instance of the field.
  list($id, $rev_id, $bundle) = entity_extract_ids($entity_type, $entity);
  $instance = field_info_instance($entity_type, $field_name, $bundle);
  if (!$instance) {
    return MENU_NOT_FOUND;
  }
  // Check field cardinality.
  $field = field_info_field($field_name);
  $langcode = LANGUAGE_NONE;
  if (!($field['cardinality'] == FIELD_CARDINALITY_UNLIMITED || !isset($entity->{$field_name}[$langcode]) || count($entity->{$field_name}[$langcode]) < $field['cardinality'])) {
    drupal_set_message(t('Too many items.'), 'error');
    return '';
  }

  $field_collection_item = entity_create('field_collection_item', array('field_name' => $field_name));
  // Do not link the field collection item with the host entity at this point,
  // as during the form-workflow we have multiple field collection item entity
  // instances, which we don't want link all with the host.
  // That way the link is going to be created when the item is saved.
  $field_collection_item->setHostEntity($entity_type, $entity, LANGUAGE_NONE, FALSE);

  $title = ($field['cardinality'] == 1) ? $instance['label'] : t('Add new !instance_label', array('!instance_label' => $field_collection_item->translatedInstanceLabel()));
  drupal_set_title($title);

  return field_collection_field_collection_item_edit('field_collection_item_form', $field_collection_item);
}

/**
 * Callback to get arguments provided by this task handler.
 *
 * Since this is the field collection item edit and there is no UI on the arguments, we
 * create dummy arguments that contain the needed data.
 */
function field_collection_field_collection_item_edit_get_arguments($task, $subtask_id) {
  return array(
    array(
      'keyword' => 'field_collection_item',
      'identifier' => t('Field collection item being edited'),
      'id' => 2,
      'name' => 'field_collection_item_edit',
      'settings' => array(),
    ),
  );
}

/**
 * Callback to get context placeholders provided by this handler.
 */
function field_collection_field_collection_item_edit_get_contexts($task, $subtask_id) {
  return ctools_context_get_placeholders_from_argument(field_collection_field_collection_item_edit_get_arguments($task, $subtask_id));
}

/**
 * Callback to enable/disable the page from the UI.
 */
function field_collection_field_collection_item_edit_enable($cache, $status) {
  variable_set('field_collection_field_collection_item_edit_disabled', $status);
  // Set a global flag so that the menu routine knows it needs
  // to set a message if enabling cannot be done.
  if (!$status) {
    $GLOBALS['field_collection_enabling_field_collection_item_edit'] = TRUE;
  }
}

/**
 * Callback to determine if a page is accessible.
 *
 * @param $task
 *   The task plugin.
 * @param $subtask_id
 *   The subtask id
 * @param $contexts
 *   The contexts loaded for the task.
 * @return
 *   TRUE if the current user can access the page.
 */
function field_collection_field_collection_item_edit_access_check($task, $subtask_id, $contexts) {
  $context = reset($contexts);
  return field_collection_item_access('create', $context->data);
  //return MENU_ACCESS_DENIED;
}

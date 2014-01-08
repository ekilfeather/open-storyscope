<?php

/**
 * @file
 *
 * Plugin to provide a field_collection_item_edit_form context
 */

/**
 * Plugins are described by creating a $plugin array which will be used
 * by the system that includes this file.
 */
$plugin = array(
  'title' => t("Field collection item edit form"),
  'description' => t('A field collection item edit form.'),
  'context' => 'field_collection_context_create_field_collection_item_edit_form',
  'edit form' => 'field_collection_context_field_collection_item_edit_form_settings_form',
  'defaults' => array('item_id' => ''),
  'keyword' => 'field_collection_item_edit',
  'context name' => 'field_collection_item_edit_form',
  'convert list' => 'field_collection_context_field_collection_item_edit_convert_list',
  'convert' => 'field_collection_context_field_collection_item_edit_convert',
  'placeholder form' => array(
    '#type' => 'textfield',
    '#description' => t('Enter the field collection item ID of a field collection item for this argument:'),
  ),
);

/**
 * It's important to remember that $conf is optional here, because contexts
 * are not always created from the UI.
 */
function field_collection_context_create_field_collection_item_edit_form($empty, $field_collection_item = NULL, $conf = FALSE) {
  static $creating = FALSE;
  $context = new ctools_context(array('form', 'field_collection_item_edit', 'field_collection_item_form',  'field_collection_item_edit_form', 'field_collection_item', 'entity:field_collection_item'));
  $context->plugin = 'field_collection_item_edit_form';

  if ($empty || ($creating)) {
    return $context;
  }
  $creating = TRUE;

  if ($conf) {
    // In this case, $field_collection_item is actually our $conf array.
    $item_id = is_array($field_collection_item) && isset($field_collection_item['item_id']) ? $field_collection_item['item_id'] : (is_object($field_collection_item) ? $field_collection_item->item_id : 0);

    if (module_exists('translation')) {
      if ($translation = module_invoke('translation', 'field_collection_item_item_id', $item_id, $GLOBALS['language']->language)) {
        $item_id = $translation;
        $reload = TRUE;
      }
    }

    if (is_array($field_collection_item) || !empty($reload)) {
      $field_collection_item = field_collection_item_load($item_id);
    }
  }

  if (!empty($field_collection_item)) {
    $form_id = 'field_collection_item_form';

    $form_state = array('want form' => TRUE, 'build_info' => array('args' => array($field_collection_item)));

    $file = drupal_get_path('module', 'field_collection') . '/field_collection.pages.inc';
    require_once DRUPAL_ROOT . '/' . $file;
    // This piece of information can let other modules know that more files
    // need to be included if this form is loaded from cache:
    $form_state['build_info']['files'] = array($file);

    $form = drupal_build_form($form_id, $form_state);

    // Fill in the 'field_collection_item' portion of the context
    $context->data     = $field_collection_item;
    $context->title    = !isset($field_collection_item->is_new) ? $field_collection_item->label() : '';
    $context->argument = isset($field_collection_item->item_id) ? $field_collection_item->item_id : $field_collection_item->field_name;

    $context->form       = $form;
    $context->form_state = &$form_state;
    $context->form_id    = $form_id;
    $context->form_title = $field_collection_item->label();
    $context->field_collection_item  = $field_collection_item->field_name;
    $context->field_name  = $field_collection_item->field_name;
    $context->restrictions['field_name'] = array($field_collection_item->field_name);
    $context->restrictions['form'] = array('form');

    $creating = FALSE;
    return $context;
  }
  $creating = FALSE;
}

function field_collection_context_field_collection_item_edit_form_settings_form($form, &$form_state) {
  $conf = &$form_state['conf'];

  $form['field_collection_item'] = array(
    '#title' => t('Enter the item id of a field_collection_item'),
    '#type' => 'textfield',
    '#maxlength' => 512,
    '#autocomplete_path' => 'ctools/autocomplete/field_collection_item',
    '#weight' => -10,
  );

  if (!empty($conf['item_id'])) {
    $info = db_query('SELECT * FROM {field_collection_item} WHERE item_id = :item_id', array(':item_id' => $conf['item_id']))->fetchObject();
    if ($info) {
      $link = l(t('%field_name [item id %item_id]', array('%field_name' => $info->field_name, '%item_id' => $info->item_id)), 'field-collection/'. strtr($info->field_name, array('_' => '-')) . '/' . $info->item_id, array('attributes' => array('target' => '_blank', 'title' => t('Open in new window')), 'html' => TRUE));
      $form['field_collection_item']['#description'] = t('Currently set to !link', array('!link' => $link));
    }
  }

  $form['item_id'] = array(
    '#type' => 'value',
    '#value' => $conf['item_id'],
  );

  return $form;
}

/**
 * Validate a field_collection_item.
 */
function field_collection_context_field_collection_item_edit_form_settings_form_validate($form, &$form_state) {
  // Validate the autocomplete
  if (empty($form_state['values']['item_id']) && empty($form_state['values']['field_collection_item'])) {
    form_error($form['field_collection_item'], t('You must select a field collection item.'));
    return;
  }

  if (empty($form_state['values']['field_collection_item'])) {
    return;
  }

  $item_id          = $form_state['values']['field_collection_item'];
  $preg_matches = array();
  $match        = preg_match('/\[id: (\d+)\]/', $item_id, $preg_matches);
  if (!$match) {
    $match = preg_match('/^id: (\d+)/', $item_id, $preg_matches);
  }

  if ($match) {
    $item_id = $preg_matches[1];
  }
  if (is_numeric($item_id)) {
    $field_collection_item = db_query('SELECT item_id, archived FROM {field_collection_item} WHERE item_id = :item_id', array(':item_id' => $item_id))->fetchObject();
  }
  else {
    $field_collection_item = db_query('SELECT item_id, archived FROM {field_collection_item} WHERE LOWER(title) = LOWER(:title)', array(':title' => $item_id))->fetchObject();
  }

  // Do not allow archived field collection items to be selected by unprivileged users
  if (!$field_collection_item || (empty($field_collection_item->archived) && !(user_access('administer field collections')))) {
    form_error($form['field_collection_item'], t('Invalid field collection item selected.'));
  }
  else {
    form_set_value($form['item_id'], $field_collection_item->item_id, $form_state);
  }
}

function field_collection_context_field_collection_item_edit_form_settings_form_submit($form, &$form_state) {
  $form_state['conf']['item_id'] = $form_state['values']['item_id'];
}

/**
 * Provide a list of ways that this context can be converted to a string.
 */
function field_collection_context_field_collection_item_edit_convert_list() {
  // Pass through to the "field_collection_item" context convert list.
  $plugin = ctools_get_context('field_collection_item');
  return field_collection_context_field_collection_item_convert_list();
}

/**
 * Convert a context into a string.
 */
function field_collection_context_field_collection_item_edit_convert($context, $type) {
  // Pass through to the "field_collection_item" context convert list.
  $plugin = ctools_get_context('field_collection_item');
  return field_collection_context_field_collection_item_convert($context, $type);
}

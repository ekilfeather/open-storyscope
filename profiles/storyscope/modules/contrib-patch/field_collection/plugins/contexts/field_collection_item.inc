<?php

/**
 * @file
 *
 * Plugin to provide a field collection item context. A field collection item
 * context is a field collection item wrapped in a
 * context object that can be utilized by anything that accepts contexts.
 */

/**
 * Plugins are described by creating a $plugin array which will be used
 * by the system that includes this file.
 */
$plugin = array(
  'title' => t('Field collection item'),
  'description' => t('A field collection item object.'),
  'context' => 'field_collection_context_create_field_collection_item',
  'edit form' => 'field_collection_context_field_collection_item_settings_form',
  'defaults' => array('item_id' => ''),
  'keyword' => 'field_collection_item',
  'context name' => 'field_collection_item',
  'convert list' => 'field_collection_context_field_collection_item_convert_list',
  'convert' => 'field_collection_context_field_collection_item_convert',
  'placeholder form' => array(
    '#type' => 'textfield',
    '#description' => t('Enter the field collection item ID of a field collection item for this context.'),
  ),
  // This context is deprecated and should not be usable in the UI.
  'no ui' => TRUE,
  'no required context ui' => TRUE,
  'superceded by' => 'entity:field_collection_item',
);

/**
 * It's important to remember that $conf is optional here, because contexts
 * are not always created from the UI.
 */
function field_collection_context_create_field_collection_item($empty, $data = NULL, $conf = FALSE) {
  $context = new ctools_context('field_collection_item');
  $context->plugin = 'field_collection_item';

  if ($empty) {
    return $context;
  }

  if ($conf) {
    $item_id = is_array($data) && isset($data['item_id']) ? $data['item_id'] : (is_object($data) ? $data->item_id : 0);

    if (module_exists('translation')) {
      if ($translation = module_invoke('translation', 'field_collection_item_item_id', $item_id, $GLOBALS['language']->language)) {
        $item_id = $translation;
        $reload = TRUE;
      }
    }

    if (is_array($data) || !empty($reload)) {
      $data = field_collection_item_load($item_id);
    }
  }

  if (!empty($data)) {
    $context->data     = $data;
    $context->title    = $data->label();
    $context->argument = $data->item_id;

    $context->restrictions['type'] = array($data->type);
    return $context;
  }
}

function field_collection_context_field_collection_item_settings_form($form, &$form_state) {
  $conf = &$form_state['conf'];

  $form['field_collection_item'] = array(
    '#title' => t('Enter the item id of a field collection item'),
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
 * Validate a field collection item.
 */
function field_collection_context_field_collection_item_settings_form_validate($form, &$form_state) {
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
  $field_collection_item = db_query('SELECT item_id, archived FROM {field_collection_item} WHERE item_id = :item_id', array(':item_id' => $item_id))->fetchObject();

  // Do not allow unpublished field collection items to be selected by unprivileged users
  if (!$field_collection_item || (empty($field_collection_item->status) && !(user_access('administer field collections')))) {
    form_error($form['field_collection_item'], t('Invalid field collection item selected.'));
  }
  else {
    form_set_value($form['item_id'], $field_collection_item->item_id, $form_state);
  }
}

function field_collection_context_field_collection_item_settings_form_submit($form, &$form_state) {
  $form_state['conf']['item_id'] = $form_state['values']['item_id'];
}

/**
 * Provide a list of ways that this context can be converted to a string.
 */
function field_collection_context_field_collection_item_convert_list() {
  $tokens = token_info();
  foreach ($tokens['tokens']['field_collection_item'] as $id => $info) {
    if (!isset($list[$id])) {
      $list[$id] = $info['name'];
    }
  }

  return $list;
}

/**
 * Convert a context into a string.
 */
function field_collection_context_field_collection_item_convert($context, $type) {
  $tokens = token_info();
  if (isset($tokens['tokens']['field_collection_item'][$type])) {
    $values = token_generate('field_collection_item', array($type => $type), array('field_collection_item' => $context->data));
    if (isset($values[$type])) {
      return $values[$type];
    }
  }
}

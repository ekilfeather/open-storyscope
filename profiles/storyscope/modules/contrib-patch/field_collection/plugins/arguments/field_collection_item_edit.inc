<?php

/**
 * @file
 *
 * Plugin to provide an argument handler for a field collection item edit form
 */

/**
 * Plugins are described by creating a $plugin array which will be used
 * by the system that includes this file.
 */
$plugin = array(
  'title' => t("Field collection item edit form: field collection item ID"),
  // keyword to use for %substitution
  'keyword' => 'field_collection_item',
  'description' => t('Creates a field collection item edit form context from a field collection item ID argument.'),
  'context' => 'field_collection_field_collection_item_edit_context',
  'placeholder form' => array(
    '#type' => 'textfield',
    '#description' => t('Enter the field collection item ID of a field collection item for this argument'),
  ),
);

/**
 * Discover if this argument gives us the field collection item we crave.
 */
function field_collection_field_collection_item_edit_context($arg = NULL, $conf = NULL, $empty = FALSE) {
  // If unset it wants a generic, unfilled context.
  if ($empty) {
    return ctools_context_create_empty('field_collection_item_edit_form');
  }

  // We can accept either a field collection item object or a pure item_id.
  if (is_object($arg)) {
    return ctools_context_create('field_collection_item_edit_form', $arg);
  }

  if (!is_numeric($arg)) {
    return FALSE;
  }

  $field_collection_item = field_collection_item_load($arg);
  if (!$field_collection_item) {
    return NULL;
  }

  // This will perform an access check, so we don't have to.
  return ctools_context_create('field_collection_item_edit_form', $field_collection_item);
}


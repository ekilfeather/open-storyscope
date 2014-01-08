<?php

/**
 * @file
 * Plugin to provide an relationship handler for term from field_collection_item.
 */

/**
 * Plugins are described by creating a $plugin array which will be used
 * by the system that includes this file.
 */
$plugin = array(
  'title' => t('Field collection item edit form from field collection item'),
  'keyword' => 'field_collection_item_form',
  'description' => t('Adds field collection item edit form from a field collection item context.'),
  'required context' => new ctools_context_required(t('Field collection item'), 'field_collection_item'),
  'context' => 'field_collection_field_collection_item_edit_form_from_field_collection_item_context',
);

/**
 * Return a new context based on an existing context.
 */
function field_collection_field_collection_item_edit_form_from_field_collection_item_context($context, $conf) {
  if (empty($context->data)) {
    return ctools_context_create_empty('field_collection_item_edit_form', NULL);
  }

  if (isset($context->data->item_id)) {
    return ctools_context_create('field_collection_item_edit_form', $context->data);
  }
}

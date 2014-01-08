<?php

/**
 * Plugins are described by creating a $plugin array which will be used
 * by the system that includes this file.
 */
$plugin = array(
  'single' => TRUE,
  'icon' => 'icon_storyscope_tweaks_form.png',
  'title' => t('Narrative set form pager links'),
  'description' => t('Pager links for the narrative set field collection form.'),
  'required context' => new ctools_context_required(t('Form'), 'field_collection_item_form'),
  'category' => t('Form'),
);

function storyscope_tweaks_narrative_set_form_pager_content_type_render($subtype, $conf, $panel_args, &$context) {
  $block = new stdClass();
  $block->module = t('field_collection_item_form');

  $block->title = '';
  $block->delta = 'storyscope_narrative_sets';

  if (isset($context->form)) {
    if (isset($context->form['storyscope_narrative_sets'])) {
      $block->content['storyscope_narrative_sets'] = $context->form['storyscope_narrative_sets'];
      unset($context->form['storyscope_narrative_sets']);
    }
  }
  else {
    $block->content = t('Narrative set form pager');
  }
  return $block;
}

function storyscope_tweaks_narrative_set_form_pager_content_type_admin_title($subtype, $conf, $context) {
  return t('"@s" narrative set field collection form pager', array('@s' => $context->identifier));
}

function storyscope_tweaks_narrative_set_form_pager_content_type_edit_form($form, &$form_state) {
  // provide a blank form so we have a place to have context setting.
  return $form;
}

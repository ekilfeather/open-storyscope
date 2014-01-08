<?php

/**
 * Plugins are described by creating a $plugin array which will be used
 * by the system that includes this file.
 */
$plugin = array(
  'single' => TRUE,
  'icon' => 'icon_storyscope_tweaks_form.png',
  'title' => t('Story Section pager links'),
  'description' => t('Pager links for the Story Sections.'),
  'required context' => new ctools_context_required(t('Node'), 'node'),
  'category' => t('Node'),
);

function storyscope_story_section_pager_content_type_render($subtype, $conf, $panel_args, &$context) {
  $block = new stdClass();
  $block->title = '';
  $block->module = t('storyscope_story_section_pager');
  $block->delta = 'storyscope_story_section_nav';

  if (isset($context->data)) {
    if (isset($context->data->section_pager)) {
      $links = $context->data->section_pager;
      $block->content = theme('item_list', array('items' => $links, 'attributes' => array('class' => array('story-section-pager'))));
    }
  }
  else {
    $block->content = t('Story Section pager');
  }
  return $block;
}

function storyscope_story_section_pager_content_type_admin_title($subtype, $conf, $context) {
  return t('"@s" story section pager', array('@s' => $context->identifier));
}

function storyscope_story_section_pager_content_type_edit_form($form, &$form_state) {
  // provide a blank form so we have a place to have context setting.
  return $form;
}

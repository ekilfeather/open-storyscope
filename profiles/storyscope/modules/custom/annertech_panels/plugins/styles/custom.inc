<?php

/**
 * @file
 * Definition of the 'naked' panel style.
 */

// Plugin definition
$plugin = array(
  'title' => t('Add More Link'),
  'pane settings form' => 'annertech_panels_custom_style_settings_form',
  'render pane' => 'annertech_panels_custom_style_render_pane'
);

/**
 * Settings form callback.
 */
function annertech_panels_custom_style_settings_form($settings) {
  $form['title'] = array(
    '#type' => 'textfield',
    '#title' => t('Title'),
    '#default_value' => (isset($settings['title'])) ? $settings['title'] : 'More',
    '#description' => t('Choose title of menu item'),
  );
  
  $form['link'] = array(
    '#type' => 'textfield',
    '#title' => t('Link'),
    '#default_value' => (isset($settings['link'])) ? $settings['link'] : '/',
    '#description' => t('Choose link of menu item'),
  );

  return $form;
}

function theme_annertech_panels_custom_style_render_pane($vars) {
  
  $content = $vars['content'];
  $pane = $vars['pane'];
  $display = $vars['display'];
  $settings = $vars['settings'];
  
  $output = theme('panels_pane', array('content' => $content, 'pane' => $pane, 'display' => $display));
  
  return $output;
}
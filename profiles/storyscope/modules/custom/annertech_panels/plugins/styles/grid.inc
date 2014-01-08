<?php


/**
 * @file
 * Definition of the 'list' panel style.
 */

// Plugin definition
$plugin = array(
  'title' => t('Grid'),
  'description' => t('Presents the panes in the form of an HTML list.'),
  'render region' => 'panels_grid_style_render_region',
  'settings form' => 'panels_grid_style_settings_form',
  'settings validate' => 'panels_grid_style_settings_validate',
);

/**
 * Render callback.
 *
 * @ingroup themeable
 */
function theme_panels_grid_style_render_region($vars) {
  $settings = $vars['settings'];
  
  if (empty($settings['grid_setting'])) {
    $settings['grid_setting'] = '';
  }
  
  $output = '<div class="panel-region has-' . count($vars['panes']) . '-items grid ' . $settings['grid_setting'] . '">';
  foreach ($vars['panes'] as $pane_id => $pane_output) {
    $output .= $pane_output;
  }
  $output .= '</div>';
  return $output;
}

/**
 * Settings form callback.
 */
function panels_grid_style_settings_form($style_settings) {
  $form['grid_setting'] = array(
    '#type' => 'select',
    '#title' => t('Grid type'),
    '#options' => array(
      'grid' => t('Grid all items same width'),
      'grid-two-75-25' => t('Grid two items 75-25'),
    ),
    '#default_value' => (isset($style_settings['grid_setting'])) ? $style_settings['grid_setting'] : 'grid_same',
  );

  return $form;
}


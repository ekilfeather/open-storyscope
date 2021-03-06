<?php

/**
 * @file
 * Admin settings for timeline module.
 */


/**
 * Declares administrative settings for the module.
 */
function timeline_admin_settings() {

  // Display settings
  $form['display'] = array(
    '#type' => 'fieldset',
    '#title' => t('Default display settings'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['display']['timeline_default_width'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Default width'),
    '#default_value' => variable_get('timeline_default_width', '100%'),
    '#size'          => 6,
    '#maxlength'     => 6,
    '#description'   => t('The default width of a timeline (in units of em, px or %), e.g. 600px or 90%.'),
  );
  $form['display']['timeline_default_height'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Default height'),
    '#default_value' => variable_get('timeline_default_height', '400px'),
    '#size'          => 6,
    '#maxlength'     => 6,
    '#description'   => t('The default height of a timeline (in units of em, px or %), e.g. 400px.'),
  );

  // Display settings
  $form['advanced'] = array(
    '#type' => 'fieldset',
    '#title' => t('Advanced information and settings'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );

  $form['advanced']['timeline_inclusion'] = array(
    '#type'          => 'item',
    '#title'         => t('State of external library inclusion'),
    '#description'   => t('No timeline library has been found locally.'),
  );

  // Check correct inclusion of local timeline library
  if ($timeline_library_status = timeline_validate_library()) {
    if (is_string($timeline_library_status)) {
      $form['advanced']['timeline_inclusion']['#description'] = t('Information for local installation:') . ' ' . t($timeline_library_status);
    }
    elseif ($timeline_library_status == TRUE) {
      $form['advanced']['timeline_inclusion']['#description'] = t('A local timeline library has been found at this location: !timeline_library_path', array('!timeline_library_path' => '<div class="status">' . libraries_get_path('simile_timeline') . '</div>'));
    }
  }

  $form['advanced']['timeline_debug'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Debug mode'),
    '#default_value' => variable_get('timeline_debug', FALSE),
    '#size'          => 6,
    '#maxlength'     => 6,
    '#description'   => t('The debug mode prints out the data array when navigating to a views with a user having "administer views" permission. This can easily be copied and sent for remote debugging.'),
  );  
  $form['advanced']['timeline_bundle'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Use bundled libraries'),
    '#default_value' => variable_get('timeline_bundle', TRUE),
    '#size'          => 6,
    '#maxlength'     => 6,
    '#description'   => t('This determins if bundled versions of the SIMILE libraries are used. It is recommened to leave this on.'),
  );
  return system_settings_form($form);
}
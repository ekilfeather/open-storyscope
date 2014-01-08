<?php
/**
 * @file
 * Administration UI functions for the Selectivizr module.
 */

/**
 * Form callback for 'admin/config/user-interface/selectivizr'.
 */
function selectivizr_admin_form() {
  $path = variable_get('selectivizr_css_path', 'sites/all/modules/selectivizr/selectvizr.css');

  $form['css_path'] = array(
    '#type' => 'textfield',
    '#title' => t('Selectivizr stylesheet file path'),
    '#description' => t('A local file system path where the custom stylesheet file will be stored. This directory must be relative to the Drupal installation directory and be accessible over the web.'),
    '#default_value' => $path,
  );

  return system_settings_form($form);
}

/**
 * Implements hook_form_validate().
 */
function selectivizr_admin_form_validate($form, &$form_state) {
  $values = $form_state['values'];
  if ($values['css_path'] == '') {
    form_set_error('css_path', 'Stylesheet path field is required.');
  }
}

/**
 * Implements hook_form_submit().
 */
function selectivizr_admin_form_submit($form, &$form_state) {
  variable_set('selectivizr_css_path', $form_state['css_path']);
}

<?php

/**
 * @file
 * Bean Admin Page
 */

/**
 * Main page callback on the bean type
 */
function bean_admin_ui_admin_page() {
  $field_ui = module_exists('field_ui');
  $rows = array();
  $i = 0;

  foreach (bean_get_types() as $bean_type) {
    $row = array();
    $row[] = array('data' => $bean_type->getLabel());
    if (method_exists($bean_type, 'getExportStatus')) {
      $export_status = $bean_type->getExportStatus();
    }
    else {
      $export_status = 'Normal';
    }
    $row[] = array('data' => $export_status);
    // Edit and delete buttons
    if ($bean_type->isEditable()) {
      $row[] = array('data' => l(t('Edit'), 'admin/structure/block-types/manage/' . $bean_type->buildURL() . '/edit'));
      switch ($export_status) {
        case 'Normal':
          $row[] = array('data' => l(t('Delete'), 'admin/structure/block-types/manage/' . $bean_type->buildURL() . '/delete'));
          break;
        case 'Overridden':
          $row[] = array('data' => l(t('Revert'), 'admin/structure/block-types/manage/' . $bean_type->buildURL() . '/delete'));
          break;
        case 'Default':
          $row[] = array();
          break;
      }
    }
    else {
      // For the operations
      $row[] = array();
      $row[] = array();
    }

    if ($field_ui) {
      // Manage fields.
      $row[] = array('data' => l(t('manage fields'), 'admin/structure/block-types/manage/' . $bean_type->buildURL() . '/fields'));

      // Display fields.
      $row[] = array('data' => l(t('manage display'), 'admin/structure/block-types/manage/' . $bean_type->buildURL() . '/display'));
    }
    //creative way to setup sorting rows; add number to prevent dual keys
    $rows[str_replace(' ', '', $bean_type->getLabel()) . '_' . $i] = $row;
  }
  ksort($rows);

  $header = array(t('Name'), t('Status'), array('data' => t('Operations'), 'colspan' => $field_ui ? '6' : '4'));

  $build['bean_table'] = array(
    '#theme' => 'table',
    '#header' => $header,
    '#rows' => $rows,
    '#empty' => t('There are no Block Types Available'),
  );
  return $build;
}

/**
 * Generates the bean type editing form.
 */
function bean_admin_ui_type_form($form, &$form_state, $bean_type = NULL) {
  $form['new'] = array(
    '#type' => 'value',
    '#value' => TRUE,
  );
  // If bean_type is null then load an empty one.
  if (is_null($bean_type)) {
    $plugin_info = _bean_admin_default_plugin();
    $plugin_info['name'] = '';

    $bean_type = new BeanCustom($plugin_info);
  }
  elseif (!method_exists($bean_type, 'getExportStatus') || $bean_type->getExportStatus() == 'Normal') {
    $form['new'] = array(
      '#type' => 'value',
      '#value' => FALSE,
    );
  }

  $disabled = !$bean_type->isEditable();

  if ($disabled) {
    drupal_set_message(t('This Block Type can not be edited'));
  }
  $form['bean_type'] = array(
    '#type' => 'value',
    '#value' => $bean_type,
  );

  $form['label'] = array(
    '#title' => t('Label'),
    '#type' => 'textfield',
    '#default_value' => $bean_type->getLabel(),
    '#description' => t('The human-readable name of this block type.'),
    '#required' => TRUE,
    '#size' => 30,
    '#disabled' => $disabled,
  );

  $form['description'] = array(
    '#title' => t('Description'),
    '#type' => 'textarea',
    '#default_value' => $bean_type->getDescription(),
    '#description' => t('The description of this block type.'),
    '#disabled' => $disabled,
  );

  // Machine-readable type name.
  $form['name'] = array(
    '#type' => 'machine_name',
    '#default_value' => isset($bean_type->type) ? $bean_type->type : '',
    '#maxlength' => 32,
    '#machine_name' => array(
      'exists' => 'bean_type_load',
      'source' => array('label'),
    ),
    '#description' => t('A unique machine-readable name for this block type. It must only contain lowercase letters, numbers, and underscores.'),
    '#disabled' => $disabled,
  );

  $form['actions'] = array('#type' => 'actions');
  $form['actions']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save Block type'),
    '#weight' => 40,
    '#disabled' => $disabled,
  );

  // This is a new bean type.
  if (isset($plugin_info)) {
    $form['actions']['delete'] = array(
      '#type' => 'submit',
      '#value' => t('Delete Block type'),
      '#weight' => 45,
      '#limit_validation_errors' => array(),
      '#submit' => array('bean_type_form_submit'),
      '#disabled' => $disabled,
    );
  }
  return $form;
}

/**
 * Form API submit callback for the type form.
 */
function bean_admin_ui_type_form_submit(&$form, &$form_state) {
  $bean_type = $form_state['values']['bean_type'];
  $bean_type->type = $form_state['values']['name'];
  $bean_type->setLabel($form_state['values']['label']);
  $bean_type->setDescription($form_state['values']['description']);
  $bean_type->save($form_state['values']['new']);
  $form_state['redirect'] = 'admin/structure/block-types';
  ctools_include('export');
}

/**
 * Form API submit callback for the delete button.
 */
function bean_admin_ui_type_form_submit_delete(&$form, &$form_state) {
  $form_state['redirect'] = 'admin/structure/block-types/manage/' . $form_state['bean_type']->type . '/delete';
}

/**
 * Menu callback; delete a single content type.
 */
function bean_admin_ui_type_delete_confirm($form, &$form_state, $type) {
  $form['type'] = array('#type' => 'value', '#value' => $type);
  $form['name'] = array('#type' => 'value', '#value' => $type->getLabel());
  $caption = '';
  if (!method_exists($type, 'getExportStatus') || $type->getExportStatus() == 'Normal') {
    $message = t('Are you sure you want to delete the block type %type?', array('%type' => $type->getLabel()));
    $num_beans = db_query("SELECT COUNT(*) FROM {bean} WHERE type = :type", array(':type' => $type->type))->fetchField();
    if ($num_beans) {
      $caption .= '<p>' . format_plural($num_beans, '%type is used by 1 block on your site. If you remove this block type, you will not be able to edit the %type blocks and it may not display correctly.', '%type is used by @count pieces of content on your site. If you remove %type, you will not be able to edit the %type content and it may not display correctly.', array('%type' => $type->getLabel())) . '</p>';
    }
    $action = t('Delete');
  }
  else {
    $message = t('Are you sure you want to revert the block type %type?', array('%type' => $type->getLabel()));
    $action = t('Revert');
  }
  $caption .= '<p>' . t('This action cannot be undone.') . '</p>';

  return confirm_form($form, $message, 'admin/structure/block-types', $caption, $action);
}

function bean_admin_ui_type_delete_confirm_submit($form, &$form_state) {
  $form_state['values']['type']->delete();
  $form_state['redirect'] = 'admin/structure/block-types';
}

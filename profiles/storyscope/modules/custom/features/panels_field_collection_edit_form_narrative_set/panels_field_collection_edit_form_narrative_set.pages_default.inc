<?php
/**
 * @file
 * panels_field_collection_edit_form_narrative_set.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_handlers().
 */
function panels_field_collection_edit_form_narrative_set_default_page_manager_handlers() {
  $export = array();

  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'field_collection_item_edit_panel_context';
  $handler->task = 'field_collection_item_edit';
  $handler->subtask = '';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'field_narrative_set',
    'no_blocks' => 1,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(
      0 => array(
        'identifier' => 'Narrative plot element [field_narrative_set_plot_element]',
        'keyword' => 'plot_element',
        'name' => 'entity_from_field:field_narrative_set_plot_element-field_collection_item-node',
        'delta' => 0,
        'context' => 'argument_field_collection_item_edit_2',
        'id' => 1,
      ),
    ),
    'access' => array(
      'plugins' => array(
        0 => array(
          'name' => 'entity_bundle:field_collection_item',
          'settings' => array(
            'type' => array(
              'field_narrative_set' => 'field_narrative_set',
            ),
          ),
          'context' => 'argument_field_collection_item_edit_2',
          'not' => FALSE,
        ),
      ),
      'logic' => 'and',
    ),
  );
  $display = new panels_display();
  $display->layout = 'sectioned';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'middle_1' => NULL,
      'middle_2_1' => NULL,
      'middle_2_2' => NULL,
      'middle_3' => NULL,
      'middle_4_1' => NULL,
      'middle_4_2' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-1';
    $pane->panel = 'middle_2_1';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'Column title',
      'title' => '',
      'body' => '<h2>Narrative as Website</h2>',
      'format' => 'only_html',
      'substitute' => 1,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $display->content['new-1'] = $pane;
    $display->panels['middle_2_1'][0] = 'new-1';
    $pane = new stdClass();
    $pane->pid = 'new-2';
    $pane->panel = 'middle_2_1';
    $pane->type = 'views_panes';
    $pane->subtype = 'plot_element_object_stories-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'arguments' => array(
        'nid' => '%plot_element:nid',
        'nid_1' => '%plot_element:nid',
      ),
      'override_title' => 1,
      'override_title_text' => 'Object Stories',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $display->content['new-2'] = $pane;
    $display->panels['middle_2_1'][1] = 'new-2';
    $pane = new stdClass();
    $pane->pid = 'new-3';
    $pane->panel = 'middle_2_1';
    $pane->type = 'views_panes';
    $pane->subtype = 'plot_element_events-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'arguments' => array(
        'nid' => '%plot_element:nid',
        'nid_1' => '%plot_element:nid',
      ),
      'override_title' => 1,
      'override_title_text' => 'Events',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $display->content['new-3'] = $pane;
    $display->panels['middle_2_1'][2] = 'new-3';
    $pane = new stdClass();
    $pane->pid = 'new-4';
    $pane->panel = 'middle_2_1';
    $pane->type = 'views_panes';
    $pane->subtype = 'plot_element_objects-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'arguments' => array(
        'nid' => '%plot_element:nid',
        'nid_1' => '%plot_element:nid',
      ),
      'override_title' => 1,
      'override_title_text' => 'Objects',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 3;
    $pane->locks = array();
    $display->content['new-4'] = $pane;
    $display->panels['middle_2_1'][3] = 'new-4';
    $pane = new stdClass();
    $pane->pid = 'new-5';
    $pane->panel = 'middle_2_2';
    $pane->type = 'narrative_set_form_pager';
    $pane->subtype = 'narrative_set_form_pager';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'context' => 'argument_field_collection_item_edit_2',
      'override_title' => 0,
      'override_title_text' => 'Links',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $display->content['new-5'] = $pane;
    $display->panels['middle_2_2'][0] = 'new-5';
    $pane = new stdClass();
    $pane->pid = 'new-6';
    $pane->panel = 'middle_2_2';
    $pane->type = 'field_collection_form_buttons';
    $pane->subtype = 'field_collection_form_buttons';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $display->content['new-6'] = $pane;
    $display->panels['middle_2_2'][1] = 'new-6';
    $pane = new stdClass();
    $pane->pid = 'new-7';
    $pane->panel = 'middle_2_2';
    $pane->type = 'form';
    $pane->subtype = 'form';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'context' => 'argument_field_collection_item_edit_2',
      'override_title' => 1,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $display->content['new-7'] = $pane;
    $display->panels['middle_2_2'][2] = 'new-7';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $export['field_collection_item_edit_panel_context'] = $handler;

  return $export;
}

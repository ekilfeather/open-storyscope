<?php

function pulp_panels_default_style_render_region($variables) {
  $region_id = drupal_html_class($variables['region_id']);
  $output = '<div class="panel-region panel-region-' . $region_id . ' has-' . count($variables['panes']) . '-items">';
  foreach ($variables['panes'] as $pane_id => $pane_output) {
    $output .= $pane_output;
  }
  $output .= '</div>';
  return $output;
}

function pulp_preprocess_panels_pane(&$variables) {
  $content = &$variables['content'];
  $pane = &$variables['pane']; 
  
  // Add pane number for browsers withtout pseudo selectors
  $variables['classes_array'][] = 'pane-num-' . ($pane->position+1);
  
  $total_panes = count($variables['display']->panels[$pane->panel]);
  if($pane->position == 0) {
    $variables['classes_array'][] = 'first'; 
  }
  if($pane->position == $total_panes-1) {
    $variables['classes_array'][] = 'last'; 
  }
  
  // You don't need the full panels-pane.tpl.php for some panes.
  // Give a way to skip most of the markup in the template
  $variables['wrapper'] = TRUE;
  if($pane->type == 'entity_field') {
    $variables['wrapper'] = FALSE;
  }
}

/*
  Add 'pane-list' class
*/
function pulp_panels_list_style_render_region($variables) {
  $display = $variables['display'];
  $region_id = $variables['region_id'];
  $panes = $variables['panes'];
  $settings = $variables['settings'];

  $items = array();

  foreach ($panes as $pane_id => $item) {
    $items[] = $item;
  }

  if (empty($settings['list_type'])) {
    $settings['list_type'] = 'ul';
  }

  $attributes = array('class' => 'pane-list items-' . count($panes));
  return theme('item_list', array('items' => $items, 'type' => $settings['list_type'], 'attributes' => $attributes));
}
<?php

// Add class for total number of rows
// Add class based on whether view has or does not have header
function pulp_preprocess_views_view(&$variables) {
  
  if (!empty($variables['view']->style_options['grouping']) ) {
    $variables['classes_array'][] = 'views-grouping-list';
  }
  
  if (!empty($variables['header'])) {
    $variables['classes_array'][] = 'has-header';
  }
  if (!empty($variables['footer'])) {
    $variables['classes_array'][] = 'has-footer';
  }
  // Give a class for the number of rows the view will have
  $variables['classes_array'][] = 'has-' . count($variables['view']->result) . '-rows';
  
  // Give class based on view handeler (i.e. view-display-page)
  $display_class = str_replace("plugin_", "", get_class( $variables['view']->display_handler ));
  $variables['classes_array'][] = drupal_html_class($display_class);
  
  $variables['classes_array'][] = 'base-table-' . $variables['view']->base_table;
  
  // If we are using Panels views rows detect that
  if (isset($variables['view']->style_plugin->row_plugin->definition['handler'])) {
    if($variables['view']->style_plugin->row_plugin->definition['handler'] == 'panels_views_plugin_row_fields') {
      $variables['classes_array'][] = 'views-panel'; 
    }
  }
}

// Add a 'views-list' class to the ol, ul
// Remove the wrapper <div class='item-list'/>
function pulp_preprocess_views_view_list(&$variables) {
  $handler  = $variables['view']->style_plugin;
  
  // Add view-list class
  $variables['list_type_prefix'] = '<' . $handler->options['type'] . ' class="views-list">';
  
  // If class has been set use it and views-list
  if ($variables['class']) {
    $variables['list_type_prefix'] = '<' . $handler->options['type'] . ' class="' . $variables['class'] . ' views-list">';
  }
}







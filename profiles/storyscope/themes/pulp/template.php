<?php

include 'includes/core_theme.inc';
include 'includes/fields_theme.inc';
include 'includes/views_theme.inc';
include 'includes/form_theme.inc';
//include 'includes/pager_theme.inc';
include 'includes/panels_theme.inc';

function pulp_preprocess_html(&$variables) {
  
  // Attributes for html element.
  $variables['html_attributes_array'] = array(
    'lang' => $variables['language']->language,
    'dir' => $variables['language']->dir,
  );

  // RDF attributes for html element.
  if (module_exists('rdf')) {
    // Adds RDF namespace prefix bindings in the form of an RDFa 1.1 prefix
    // attribute inside the html element.
    $prefixes = array();
    foreach (rdf_get_namespaces() as $prefix => $uri) {
      $variables['html_attributes_array']['prefix'][] = $prefix . ': ' . $uri . "\n";
    }
  }

  // Store the menu item since it has some useful information.
  $variables['menu_item'] = menu_get_item();

  // Add class if a views page
  switch ($variables['menu_item']['page_callback']) {
    case 'views_page':
      // Is this a Views page?
      $variables['classes_array'][] = 'page-views';
      break;
  }
  
  // Add class if a panels page
  $panel_page_callbacks = array(
    'page_manager_page_execute',
    'page_manager_node_view',
    'page_manager_node_view_page',
    'page_manager_contact_site'
  );
  if(in_array($variables['menu_item']['page_callback'], $panel_page_callbacks)) {
    $variables['classes_array'][] = 'page-panels';   
  } else {
    $variables['classes_array'][] = 'page-not-panels';   
  }

  // Add classes based on path
  $path = drupal_get_path_alias($_GET['q']);
  $sections = explode('/', $path);
  foreach ($sections as $key => $value) {
    $prefix = str_repeat("sub-", $key) . 'section-';
    $variables['classes_array'][] = drupal_html_class($prefix . $value);
    if ($key == 1) {
      break;
    }
  }
}
function pulp_process_html(&$variables, $hook) {
  // Flatten out html_attributes.
  $variables['html_attributes'] = drupal_attributes($variables['html_attributes_array']);
}

function pulp_process_page(&$variables) {
  $variables['site_name_link'] = l($variables['site_name'], '<front>',
    array('attributes' => array('title' => t('Return to homepage'))));
}

/**
 * Implementation of preprocess_entity().
 * From entity API module
 */
function pulp_preprocess_entity(&$variables) {
  // Add a class based on viewmode
  $variables['classes_array'][] = 'entity-viewmode-' . $variables['view_mode'];
}

/**
 * Implementation of preprocess_node().
 */
function pulp_preprocess_node(&$variables) {
  
  if ($variables['status']) {
    $variables['classes_array'][] = 'node-published';
  }

  // Add a class for the view mode.
  if (!$variables['teaser']) {
    $variables['classes_array'][] = 'view-mode-' . $variables['view_mode'];
  }
  
  // Add classes for node content
  $variables['content_attributes_array']['class'][] = 'content';
  
  if (isset($variables['content']['links'])) {
    $variables['links'] = $variables['content']['links'];
    unset($variables['content']['links']);
  }

  if (isset($variables['content']['comments'])) {
    $variables['comments'] = $variables['content']['comments'];
    unset($variables['content']['comments']);
  }
  
  // Find the number of fields & field group in a node
  // This does not really work because people can hide items in content
  // and we can't detech that is going to happen here
  $content = $variables['content'];
  unset($content['comments']);
  unset($content['links']);
  $number_of_items = count($content);
  $variables['content_attributes_array']['class'][] = 'has-' . $number_of_items . '-items';

  // Add template suggestion based on viewmode
  // Example: node--page--teaser
  $variables['theme_hook_suggestions'][] = 'node__' . $variables['node']->type . '__' . $variables['view_mode'];
}

/**
 * Preprocessor for preprocess_block()
 */

function pulp_preprocess_block(&$variables, $hook) {

  $variables['classes_array'][] = 'item-no-' . $variables['block_id'];
  // Classes describing the position of the block within the region.
  if ($variables['block_id'] == 1) {
    $variables['classes_array'][] = 'first';
  }
  // The last_in_region property is set in pulp_page_alter().
  if (isset($variables['block']->last_in_region)) {
    $variables['classes_array'][] = 'last';
  }
  $variables['classes_array'][] = $variables['block_zebra'];
  
  // Add a class to provide CSS for blocks without titles.
  if(empty($variables['block']->subject) && (string) $variables['block']->subject != '0') {
    $variables['classes_array'][] = 'has-title';
  } else {
    $variables['classes_array'][] = 'has-no-title';  
  }
  
  $variables['title_attributes_array']['class'] = 'block-title';
  //$variables['content_attributes_array']['class'][] = 'content';

  $variables['wrapper'] = TRUE;
  // Use a template with no wrapper for the page's main content.
  if ($variables['block_html_id'] == 'block-system-main') {
    $variables['wrapper'] = FALSE;
  } 
}

function pulp_process_block(&$variables, $hook) {
  // Drupal 7 should use a $title variable instead of $block->subject.
  $variables['title'] = $variables['block']->subject;
}

function pulp_preprocess_region(&$variables) {

  $blocks = element_children($variables['elements']);
  
  // Check to see if context flag is being used.
  // If so remove it. It is not a block
  foreach ($blocks as $key => $block) {
    if($block == 'context')
      unset($blocks[$key]);  
  }
  // Tell number of blocks in a region in a class
  $num = count($blocks);
  $variables['classes_array'][] = 'has-' . $num . '-blocks';
  
  $variables['region_id'] = 'region-' . drupal_html_id($variables['region']);
  
  // Sidebar regions get some extra classes.
  if (strpos($variables['region'], 'sidebar_') === 0) {
    $variables['classes_array'][] = 'sidebar';
  }

  $variables['wrapper'] = TRUE;
  if ($variables['region'] == 'content' ||
      $variables['region'] == 'header' ||
      $variables['region'] == 'footer'
  ) {
    $variables['wrapper'] = FALSE;
  }
}

/**
 * Implements hook_page_alter().
 * @param $page
 *   Nested array of renderable elements that make up the page.
 */
function pulp_page_alter(&$page) {
  // Look in each visible region for blocks.
  foreach (system_region_list($GLOBALS['theme'], REGIONS_VISIBLE) as $region => $name) {
    if (!empty($page[$region])) {
      // Find the last block in the region.
      $blocks = array_reverse(element_children($page[$region]));
      while ($blocks && !isset($page[$region][$blocks[0]]['#block'])) {
        array_shift($blocks);
      }
      if ($blocks) {
        $page[$region][$blocks[0]]['#block']->last_in_region = TRUE;
      }
    }
  }
}

/**
 * Return a themed breadcrumb trail.
 *
 * @param $variables
 *   - title: An optional string to be used as a navigational heading to give
 *     context for breadcrumb links to screen-reader users.
 *   - title_attributes_array: Array of HTML attributes for the title. It is
 *     flattened into a string within the theme function.
 *   - breadcrumb: An array containing the breadcrumb links.
 * @return
 *   A string containing the breadcrumb output.
 */
function pulp_preprocess_breadcrumb(&$variables) {
  $variables['breadcrumb_append_title'] = TRUE;
}
 
function pulp_breadcrumb($variables) {
  $breadcrumbs = $variables['breadcrumb'];
  
  // Return the breadcrumb with separators.
  if (!empty($breadcrumbs)) {

    $trailing_separator = $title = '';
    if ($variables['breadcrumb_append_title']) {
      $item = menu_get_item();
      if (!empty($item['tab_parent'])) {
        // If we are on a non-default tab, use the tab's title.
        $title = check_plain($item['title']);
      }
      else {
        $title = drupal_get_title();
      }
    }
    
    foreach ($breadcrumbs as $key => $breadcrumb) {
      $class = 'breadcrumb';
      if ($key == 0) {
        $class .= ' first';
      }
      $breadcrumbs[$key] = '<li class="' . $class . '">' . $breadcrumb . '</li>';
    }

    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users.
    if (empty($variables['title'])) {
      $variables['title'] = t('You are here');
    }
    // Unless overridden by a preprocess function, make the heading invisible.
    if (!isset($variables['title_attributes_array']['class'])) {
      $variables['title_attributes_array']['class'][] = 'element-invisible';
    }
    $heading = '<h2' . drupal_attributes($variables['title_attributes_array']) . '>' . $variables['title'] . '</h2>';
    
    $output = '<ol class="breadcrumbs" role="navigation">';
    $output .= $heading;
    $output .= implode('', $breadcrumbs);
    $output .= '<li class="breadcrumb-title">' . $title . '</li>';
    $output .= '</ol>';
    
    return $output;    
  }
  // Otherwise, return an empty string.
  return '';
}

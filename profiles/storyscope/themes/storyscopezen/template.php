<?php


/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
/* -- Delete this line if you want to use this function
function storyscopezen_preprocess_maintenance_page(&$variables, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  storyscopezen_preprocess_html($variables, $hook);
  storyscopezen_preprocess_page($variables, $hook);
}
// */

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
/* -- Delete this line if you want to use this function
function storyscopezen_preprocess_html(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  //$variables['classes_array'] = array_diff($variables['classes_array'], array('class-to-remove'));
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
function storyscopezen_preprocess_page(&$variables, $hook) {
  global $user;
  if ($user->uid > 0){
    $logout_string = t('You are signed in as ') . l(check_plain($user->name), 'user/' . $user->uid) . ' - ';
    $logout_string .= l(t('Sign out'), 'user/logout');
    $variables['logout_string'] = $logout_string;
  }
  // Add inline 'create new' buttons with title on certain pages.
  if (!empty($variables['page']['#views_contextual_links_info']['views_ui']['view']->name)) {
    $view_name = $variables['page']['#views_contextual_links_info']['views_ui']['view']->name;
    // We only need this inline create new button on certain views, so list them here.
    $create_new_views = array(
      'dossier_events_add_existing_search_api',
      'dossier_objects_add_existing_search_api',
      'dossier_object_stories_add_existing_search_api',
      'dossier_references_add_existing_search_api',
      'object_story_events_add_existing_search_api',
      'object_story_objects_add_existing_search_api',
      'object_story_references_add_existing_search_api',
    );
    // Create and add in the button
    if (in_array($view_name, $create_new_views)) {
      $view = views_get_view($view_name);
      $view_display = $variables['page']['#views_contextual_links_info']['views_ui']['view_display_id'];
      if (strpos($view_display,'dossier_context') !== false) {
        $view->set_arguments(array(arg(1), arg(3)));
      }
      else {
        $view->set_arguments(array(arg(1)));
      }
      $view->set_display($view_display);
      $button_html = array();
      $button_html = storyscope_listings_get_view_header_footer($view);
      if (!empty($button_html)) {
        $variables['title_suffix']['storyscope'] = array(
          '#children' => $button_html,
        );
      }
    }
  }
}

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
function storyscopezen_preprocess_node(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // Optionally, run node-type-specific preprocess functions, like
  // storyscopezen_preprocess_node_page() or storyscopezen_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function storyscopezen_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
function storyscopezen_preprocess_region(&$variables, $hook) {
  // Don't use Zen's region--sidebar.tpl.php template for sidebars.
  //if (strpos($variables['region'], 'sidebar_') === 0) {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('region__sidebar'));
  //}
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */

function storyscopezen_preprocess_block(&$variables, $hook) {
  // Adds title 'keyword' to exposed search block view for cases listed in the array
  $views_exposed_filter_blocks = array(
    'block-views-2fd4b6dd3c916ed060893347ae375581',
    'block-views-bc2b7da5373c1e59a4b20a1a58fbfbe4',
    'block-views-bd9f3123af6199601c22f662df09dd88', // object_story_objects_add_existing_search_api : page_add_object_dossier_context_internal
    'block-views-2d7119b63ec4c8565a4a64e4c785258c',
    'block-views-374bade242c96b4558b0187aaaf11973',
    'block-views-c06ad29535f492bb9491825710e74ddb', // dossier_objects_add_existing_search_api : page_add_object_internal
    'block-views-5618eb3192247dd07a23f0e425ef16a0', // object_story_objects_add_existing_search_api : page_add_object_internal
    'block-views-fb2069643f6d6019651c5c8fe63ae573',
    'block-views-e87e86e660c1a0b82f33f4af51471dc7',
    'block-views-a870b6d6040ea10a7c5ffc3484715e4d', // Dossier Objects Search API
    'block-views-0187193162bdbb9824edab3d2bd55570', // story section add object story
    '-exp-objects-page', // objects : page
    'block-views-exp-ca-search-external-ca',
    'block-views-exp-ca-search-page-1', //content aggregator
  );

  if (in_array($variables['block_html_id'], $views_exposed_filter_blocks)) {
    $variables['theme_hook_suggestions'][] = 'block__views__keyword';
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
function storyscopezen_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  $output = '';

  // Determine if we are to display the breadcrumb.
  $show_breadcrumb = theme_get_setting('zen_breadcrumb');
  if ($show_breadcrumb == 'yes' || $show_breadcrumb == 'admin' && arg(0) == 'admin') {

    // Optionally get rid of the homepage link.
    $show_breadcrumb_home = theme_get_setting('zen_breadcrumb_home');
    if (!$show_breadcrumb_home) {
      array_shift($breadcrumb);
    }

    // Return the breadcrumb with separators.
    if (!empty($breadcrumb)) {
      $breadcrumb_separator = theme_get_setting('zen_breadcrumb_separator');
      $trailing_separator = $title = '';
      if (theme_get_setting('zen_breadcrumb_title')) {
        $item = menu_get_item();
        if (!empty($item['tab_parent'])) {
          // If we are on a non-default tab, use the tab's title.
          $breadcrumb[] = check_plain($item['title']);
        }
        else {
          $breadcrumb[] = drupal_get_title();
        }
      }
      elseif (theme_get_setting('zen_breadcrumb_trailing')) {
        $trailing_separator = $breadcrumb_separator;
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

      // Build the breadcrumb trail.
      $output = '<nav class="breadcrumb" role="navigation">';
      $output .= '<h2' . drupal_attributes($variables['title_attributes_array']) . '>' . $variables['title'] . '</h2>';
      $output .= '<ol><li>' . implode($breadcrumb_separator . '</li><li>', $breadcrumb) . $trailing_separator . '</li></ol>';
      $output .= '</nav>';
    }
    // Else return just the title
    else {
      $title = drupal_get_title();
      return '<div class="breadcrumb">' . $title . '</div>';
    }
  }

  return $output;
}


/**
 * Return a themed set of dimensions.
 *
 * @param $variables
 * @return
 *   A themed dimensions field collection.
 */
function storyscopezen_field__field_object_dimensions($variables) {
  $output = '';
  // Render the items.
  foreach ($variables['items'] as $delta => $item) {
    $classes = 'field-item ' . ($delta % 2 ? 'odd' : 'even');
    if (!$variables['label_hidden']) {
    $output .= '<div class="field-label"' . $variables['title_attributes'] . '>' . $variables['label'] . ':&nbsp;</div>';
  	}
    $output .= '<span class="' . $classes . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item);
    if ($variables['element']['#title'] == 'Label') {
      $output .= ': ';
    }
    $output .= '</span>';
  }
  return $output;
}

/**
 * Implements hook_preprocess_node()
 */
function storyscopezen_preprocess_node(&$variables) {
  // Put the highlight class on listed objects in a certain view-mode.
  if ($variables['type'] == 'object' && $variables['view_mode'] == 'highlight') {
    $variables['classes_array'][] = 'highlight-image';
  }
  // Add the title to Objects in small thumbnail mode
  if ($variables['type'] == 'object' && in_array($variables['view_mode'], array('small_thumbnail', 'small_unclickable_thumbnail', 'image_properties_and_title'))) {
    if (arg(0, request_path()) == 'node'){
      $section =  arg(1, request_path());
    }
    if (arg(4, request_path()) == 'sections'){
      $section =  arg(5, request_path());
    }
    $count = storyscope_content_section_object_os_count($section, $variables['node']);
    $hover_text = $variables['title'] . ' ' . format_plural($count, '(1 object story)', '(@count object stories)');
    $variables['attributes_array']['title'] = $hover_text;
  }
  // Add the class to object stories as well if they have an object with an image on it.
  if ($variables['type'] == 'object_story' && $variables['view_mode'] == 'highlight') {
    if (!empty($variables['field_object_story_objects'][$variables['language']][0]['target_id'])) {
      // Add the class.
      $variables['classes_array'][] = 'highlight-image';
    }
  }
}

/**
 * Implements theme_form_element to output the description
 * above the form element
 *
 */
function storyscopezen_form_element($variables) {
  $element = &$variables['element'];

  // This function is invoked as theme wrapper, but the rendered form element
  // may not necessarily have been processed by form_builder().
  $element += array(
    '#title_display' => 'before',
  );

  // Add element #id for #type 'item'.
  if (isset($element['#markup']) && !empty($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }
  // Add element's #type and #name as class to aid with JS/CSS selectors.
  $attributes['class'] = array('form-item');
  if (!empty($element['#type'])) {
    $attributes['class'][] = 'form-type-' . strtr($element['#type'], '_', '-');
  }
  if (!empty($element['#name'])) {
    $attributes['class'][] = 'form-item-' . strtr($element['#name'], array(' ' => '-', '_' => '-', '[' => '-', ']' => ''));
  }
  // Add a class for disabled elements to facilitate cross-browser styling.
  if (!empty($element['#attributes']['disabled'])) {
    $attributes['class'][] = 'form-disabled';
  }
  $output = '<div' . drupal_attributes($attributes) . '>' . "\n";

  // If #title is not set, we don't display any label or required marker.
  if (!isset($element['#title'])) {
    $element['#title_display'] = 'none';
  }
  $prefix = isset($element['#field_prefix']) ? '<span class="field-prefix">' . $element['#field_prefix'] . '</span> ' : '';
  $suffix = isset($element['#field_suffix']) ? ' <span class="field-suffix">' . $element['#field_suffix'] . '</span>' : '';

  switch ($element['#title_display']) {
    case 'before':
    case 'invisible':
      $output .= ' ' . theme('form_element_label', $variables);
      if (!empty($element['#description'])) {
        $output .= '<div class="description">' . $element['#description'] . "</div>\n";
      }
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;

    case 'after':
      $output .= ' ' . $prefix . $element['#children'] . $suffix;
      if (!empty($element['#description'])) {
        $output .= '<div class="description">' . $element['#description'] . "</div>\n";
      }
      $output .= ' ' . theme('form_element_label', $variables) . "\n";
      break;

    case 'none':
    case 'attribute':
      if (!empty($element['#description'])) {
        $output .= '<div class="description">' . $element['#description'] . "</div>\n";
      }
      // Output no label and no required marker, only the children.
      $output .= ' ' . $prefix . $element['#children'] . $suffix . "\n";
      break;
  }

  $output .= "</div>\n";
  return $output;
}

/**
 * Overrides the partial date theme callback.
 */
function storyscopezen_partial_date($variables) {
  // Remove 'ce' suffix
  $variables['settings']['year_designation'] = '';
  $item = $variables['item'];
  $settings = $variables['settings'];
  $settings['format'] = $variables['format'];
  $settings['is_approximate'] = !empty($variables['is_approximate']);
  return partial_date_format($item, $settings);
}

/**
 * Overrides the theme_field for partial dates, to show approx dates indicator.
 */
function storyscopezen_field__partial_date($variables) {
  $output = '';
  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<div class="field-label"' . $variables['title_attributes'] . '>' . $variables['label'] . ':&nbsp;</div>';
  }

  // Render the items.
  $output .= '<div class="field-items"' . $variables['content_attributes'] . '>';
  foreach ($variables['items'] as $delta => $item) {
    if($variables['element']['#title'] == 'Creator Birth Date' || $variables['element']['#title'] == 'Creator Death Date') {
      // We only ever want to display the year for Creator dates.
      $item['#markup'] = $variables['element']['#items'][$delta]['from']['year'];
    }
    $classes = 'field-item ' . ($delta % 2 ? 'odd' : 'even');
    $output .= '<div class="' . $classes . '"' . $variables['item_attributes'][$delta] . '>';
    // Check to see if it is an approximate date.
    // If so, add in a span.
    if ($variables['element']['#items'][0]['data']['check_approximate'] == 1) {
      $output .= '<span class="approx-date" >' . t('Circa') . '</span> ';
    }
    $output .= drupal_render($item) . '</div>';
  }
  $output .= '</div>';

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';

  return $output;
}
/**
 * Overrides the theme_field for field_fb_location to make it clickable.
 */
function storyscopezen_field__field_fb_location($variables) {
  $output = '';
  $output = '<div class="field-label">Locations:&nbsp;</div>';
  foreach ($variables['items'] as $item) {
    $fcid = key($item['entity']['field_collection_item']);
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_location_mid'][0]['#markup'])) {
      $mid = $item['entity']['field_collection_item'][$fcid]['field_fb_location_mid'][0]['#markup'];
    }
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_location_topic'][0]['#markup'])) {
      $topic = $item['entity']['field_collection_item'][$fcid]['field_fb_location_topic'][0]['#markup'];
    }
    if (!empty($mid) && !empty($topic)) {
      //disable for storyscopekids
      //$output .= '<div class="location freebase-link">';
      //$location_link = l($topic, $mid, array('attributes' => array('target'=>'_blank')));
      //$output .= $location_link . '</div>';
      $output .= '<div class="location freebase-link">' . $topic . '</div>';

    }
    elseif (empty($mid) && !empty($topic)) {
      $output .= '<div class="location freebase-link">' . $topic . '</div>';
    }
  }
  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';
  return $output;
}

/**
* Overrides the theme_field for field_fb_genre to make it clickable.
*/
function storyscopezen_field__field_fb_genre($variables) {
	$output = '';
	$output = '<div class="field-label">Genres:&nbsp;</div>';
	foreach ($variables['items'] as $item) {
		$fcid = key($item['entity']['field_collection_item']);
		if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_genre_mid'][0]['#markup'])) {
			$mid = $item['entity']['field_collection_item'][$fcid]['field_fb_genre_mid'][0]['#markup'];
		}
		if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_genre_topic'][0]['#markup'])) {
			$topic = $item['entity']['field_collection_item'][$fcid]['field_fb_genre_topic'][0]['#markup'];
		}
		if (!empty($mid) && !empty($topic)) {
			//$output .= '<div class="genre freebase-link">';
			//$genre_link = l($topic, $mid, array('attributes' => array('target'=>'_blank')));
			//$output .= $genre_link . '</div>';
      		$output .= '<div class="genre freebase-link">' . $topic . '</div>';
		}
		elseif (empty($mid) && !empty($topic)) {
      $output .= '<div class="genre freebase-link">' . $topic . '</div>';
    }

	}
	// Render the top-level DIV.
	$output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';
	return $output;
}

/**
* Overrides the theme_field for field_fb_style_movement to make it clickable.
*/
function storyscopezen_field__field_fb_style_movement($variables) {
	$output = '';
	$output = '<div class="field-label">Styles and Movements:&nbsp;</div>';

	foreach ($variables['items'] as $item) {
		$fcid = key($item['entity']['field_collection_item']);
		if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_style_movement_mid'][0]['#markup'])) {
			$mid = $item['entity']['field_collection_item'][$fcid]['field_fb_style_movement_mid'][0]['#markup'];
		}
		if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_style_movement_topic'][0]['#markup'])) {
			$topic = $item['entity']['field_collection_item'][$fcid]['field_fb_style_movement_topic'][0]['#markup'];
		}
		if (!empty($mid) && !empty($topic)) {
			//$output .= '<div class="style_movement freebase-link">';
			//$style_movement_link = l($topic, $mid, array('attributes' => array('target'=>'_blank')));
			//$output .= $style_movement_link . '</div>';
			$output .= '<div class="style_movement freebase-link">' . $topic . '</div>';
		}
		elseif (empty($mid) && !empty($topic)) {
      $output .= '<div class="style_movement freebase-link">' . $topic . '</div>';
    }

	}
	// Render the top-level DIV.
	$output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';
	return $output;
}

/**
* Overrides the theme_field for field_fb_tags to make it clickable.
*/
function storyscopezen_field__field_fb_tags($variables) {
	$output = '';
	$output = '<div class="field-label">Tags:&nbsp;</div>';

	foreach ($variables['items'] as $item) {
		$fcid = key($item['entity']['field_collection_item']);
		if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_tags_mid'][0]['#markup'])) {
			$mid = $item['entity']['field_collection_item'][$fcid]['field_fb_tags_mid'][0]['#markup'];
		}
		if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_tags_topic'][0]['#markup'])) {
			$topic = $item['entity']['field_collection_item'][$fcid]['field_fb_tags_topic'][0]['#markup'];
		}
		if (!empty($mid) && !empty($topic)) {
			//$output .= '<div class="tags freebase-link">';
			//$tags_link = l($topic, $mid, array('attributes' => array('target'=>'_blank')));
			//$output .= $tags_link . '</div>';
			$output .= '<div class="tags freebase-link">' . $topic . '</div>';
		}
		elseif (empty($mid) && !empty($topic)) {
      $output .= '<div class="tags freebase-link">' . $topic . '</div>';
    }

	}
	// Render the top-level DIV.
	$output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';
	return $output;
}

/**
 * Overrides the theme_field for field_fb_agent to make it clickable.
 * Also format the dates.
 */
function storyscopezen_field__field_fb_agent($variables) {
  $output = '<div class="field-label">Creator(s):&nbsp;</div>';
  foreach ($variables['items'] as $item) {
    $fcid = key($item['entity']['field_collection_item']);
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_agent_mid'][0]['#markup'])) {
      $mid = $item['entity']['field_collection_item'][$fcid]['field_fb_agent_mid'][0]['#markup'];
    }
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_agent_topic'][0]['#markup'])) {
      $topic = $item['entity']['field_collection_item'][$fcid]['field_fb_agent_topic'][0]['#markup'];
    }
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_agent_birth_date'][0]['#markup'])) {
      $birth = $item['entity']['field_collection_item'][$fcid]['field_fb_agent_birth_date'][0]['#markup'];
    }
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_agent_death_date'][0]['#markup'])) {
      $death = $item['entity']['field_collection_item'][$fcid]['field_fb_agent_death_date'][0]['#markup'];
    }
    if (!empty($mid) && !empty($topic)) {
      //$output .= '<div class="agent freebase-link">';
      //$agent_link = l($topic, $mid, array('attributes' => array('target'=>'_blank')));
      //$output .= $agent_link . '</div>';
      $output .= '<div class="agent freebase-link">' . $topic . '</div>';
    }
    else if (empty($mid) && !empty($topic)) {
      $output .= '<div class="agent freebase-link">' . $topic . '</div>';
    }
    if (empty($birth) && empty($death)) {
      $output .= '';
    }
    else {
    	if (!empty($birth)) {
    		$output .= '<div class="agent dates">(' . $birth . ' - ';
    		if (!empty($death)) {
    			$output .= $death;
    		}
    		$output .= ')</div>';
    	}
    }
  
  }
  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';
  return $output;
}
/**
 * Overrides the theme_field for field_fb_country to make it clickable.
 */
function storyscopezen_field__field_fb_country($variables) {
  $output = '';
  $output = '<div class="field-label">Country of Origin:&nbsp;</div>';
  
  foreach ($variables['items'] as $item) {
    $fcid = key($item['entity']['field_collection_item']);
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_country_mid'][0]['#markup'])) {
      $mid = $item['entity']['field_collection_item'][$fcid]['field_fb_country_mid'][0]['#markup'];
    }
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_country_topic'][0]['#markup'])) {
      $topic = $item['entity']['field_collection_item'][$fcid]['field_fb_country_topic'][0]['#markup'];
    }
    if (!empty($mid) && !empty($topic)) {
      //$output .= '<div class="country freebase-link">';
      //$country_link = l($topic, $mid, array('attributes' => array('target'=>'_blank')));
      //$output .= $country_link . '</div>';
      $output .= '<div class="country freebase-link">' . $topic . '</div>';
    }
    elseif (empty($mid) && !empty($topic)) {
      $output .= '<div class="country freebase-link">' . $topic . '</div>';
    }
    
  }
  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';
  return $output;
}

/**
 * Overrides the theme_field for field_fb_materials to make it clickable.
 */
function storyscopezen_field__field_fb_materials($variables) {
  $output = '<div class="field-label">Materials:&nbsp;</div>';
  foreach ($variables['items'] as $item) {
    $fcid = key($item['entity']['field_collection_item']);
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_materials_mid'][0]['#markup'])) {
      $mid = $item['entity']['field_collection_item'][$fcid]['field_fb_materials_mid'][0]['#markup'];
    }
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_materials_topic'][0]['#markup'])) {
      $topic = $item['entity']['field_collection_item'][$fcid]['field_fb_materials_topic'][0]['#markup'];
    }
    if (!empty($mid) && !empty($topic)) {
      //$output .= '<div class="materials freebase-link">';
      //$materials_link = l($topic, $mid, array('attributes' => array('target'=>'_blank')));
      //$output .= $materials_link . '</div>';
      $output .= '<div class="materials freebase-link">' . $topic . '</div>';
    }
    elseif (empty($mid) && !empty($topic)) {
      $output .= '<div class="materials freebase-link">' . $topic . '</div>';
    }
  }
  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';
  return $output;
}
/**
 * Overrides the theme_field for field_fb_object_identifier to make it clickable.
 */
function storyscopezen_field__field_fb_object_identifier($variables) {
  $output = '<div class="field-label">Object Identifier:&nbsp;</div>';
  foreach ($variables['items'] as $item) {
    $fcid = key($item['entity']['field_collection_item']);
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_object_identifier_mid'][0]['#markup'])) {
      $mid = $item['entity']['field_collection_item'][$fcid]['field_fb_object_identifier_mid'][0]['#markup'];
    }
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_object_identifier_topic'][0]['#markup'])) {
      $topic = $item['entity']['field_collection_item'][$fcid]['field_fb_object_identifier_topic'][0]['#markup'];
    }
    if (!empty($mid) && !empty($topic)) {
      //$output .= '<div class="object_identifier freebase-link">';
      //$object_identifier_link = l($topic, $mid, array('attributes' => array('target'=>'_blank')));
      //$output .= $object_identifier_link . '</div>';
      $output .= '<div class="object_identifier freebase-link">' . $topic . '</div>';
    }
    elseif (empty($mid) && !empty($topic)) {
      $output .= '<div class="object_identifier freebase-link">' . $topic . '</div>';
    }
  }
  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';
  return $output;
}
/**
 * Overrides the theme_field for field_fb_classification to make it clickable.
 */
function storyscopezen_field__field_fb_classification($variables) {
  $output = '<div class="field-label">Classification:&nbsp;</div>';
  foreach ($variables['items'] as $item) {
    $fcid = key($item['entity']['field_collection_item']);
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_classification_mid'][0]['#markup'])) {
      $mid = $item['entity']['field_collection_item'][$fcid]['field_fb_classification_mid'][0]['#markup'];
    }
    if (!empty($item['entity']['field_collection_item'][$fcid]['field_fb_classification_topic'][0]['#markup'])) {
      $topic = $item['entity']['field_collection_item'][$fcid]['field_fb_classification_topic'][0]['#markup'];
    }
    if (!empty($mid) && !empty($topic)) {
      //$output .= '<div class="classification freebase-link">';
      //$classification_link = l($topic, $mid, array('attributes' => array('target'=>'_blank')));
      //$output .= $classification_link . '</div>';
      $output .= '<div class="classification freebase-link">' . $topic . '</div>';
    }
    elseif (empty($mid) && !empty($topic)) {
      $output .= '<div class="classification freebase-link">' . $topic . '</div>';
    }
  }
  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';
  return $output;
}

/**
 * Implements theme_field()
 *
 * Hides the event value field title if empty because Field Collection is stupid.
 * Unsetting the variables merely seems to hide the title.
 */
function storyscopezen_field__field_event_value__event($variables) {
  $values =  $variables['items'][0]['entity']['field_collection_item'];
  foreach ($values as $key => $value) {
    if ($value['field_event_value_value'][0]['#markup'] == '0.00') {
      unset($variables);
      return '';
    }
  }
}

/**
 * Implements theme_field()
 *
 * Hides the event value field if empty because Field Collection is really stupid.
 */
function storyscopezen_field__field_event_value_value__field_event_value($variables) {
  if ($variables['items'][0]['#markup'] == '0.00') {
    // We need to return something here because if we don't, then Field Collection
    // helpfully puts in 0.00 markup.
    return '<span>&nbsp;</span>';
  }
}

/**
 * Implements theme_field()
 *
 */
function storyscopezen_field__field_image__object($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<div class="field-label"' . $variables['title_attributes'] . '>' . $variables['label'] . ':&nbsp;</div>';
  }

  // Render the items.
  $output .= '<div class="field-items"' . $variables['content_attributes'] . '>';
  foreach ($variables['items'] as $delta => $item) {
    if ($delta > 0) {
      $item['#path']['options']['query'] = array('img' => $delta);
    }
    $classes = 'field-item ' . ($delta % 2 ? 'odd' : 'even');
    $output .= '<div class="' . $classes . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</div>';
  }
  $output .= '</div>';

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';

  return $output;
}

/**
* Devel hook for testing
*
*Sends Form ID to message.
*
function storyscopezen_form_alter(&$form, &$form_state, $form_id) {
  $print = '<pre>' . print_r($form, TRUE) . '</pre>';
  if (module_exists('devel')) {
    dsm($form_id); // print form ID to messages
  }
  else {
    drupal_set_message($form_id); // print form ID to messages
  }
  if (module_exists('devel')) {
    dsm($form); // pretty print array using Krumo to messages
  }
  else {
    drupal_set_message($print);  // print array to messages
  }
  if($form_id == "event_node_form"){
  	$form['field_freebase_location_title']['#type'] = 'hidden';
  }
}
*/

/**
 * Implements template_preprocess_panels_pane()
 */
function storyscopezen_preprocess_panels_pane(&$variables) {
  
  // We want create new buttons to only be added to certain panel panes.
  $panels_create_new_buttons = array(
    'dossier_objects-panel_pane_1',
    'dossier_object_stories-panel_pane_1',
    'dossier_events-panel_pane_1',
    'dossier_stories-panel_pane_dossier_stories',
    'dossier_references-panel_pane_1',
  );
  $pane_name = $variables['pane']->subtype;
  if (in_array($pane_name, $panels_create_new_buttons)) {
    $path = current_path();
    $add_destination = drupal_lookup_path('alias',$path);
    // Check for dossier context
    $path_args = explode('/', $add_destination);
    if ($path_args[0] == 'dossiers' && is_numeric($path_args[1]) && empty($path_args[2])) {
      // Create and add in the button
      switch ($pane_name) {
        case 'dossier_objects-panel_pane_1':
          $content_type = 'objects';
          $content_type_label = 'n object';
          break;
        case 'dossier_object_stories-panel_pane_1':
          $content_type = 'objectstories';
          $content_type_label = ' story';
          break;
        case 'dossier_events-panel_pane_1':
          $content_type = 'events';
          $content_type_label = 'n event';
          break;
        case 'dossier_stories-panel_pane_dossier_stories':
          $content_type = 'stories';
          $content_type_label = ' narrative';
          break;
        case 'dossier_references-panel_pane_1':
          $content_type = 'references';
          $content_type_label = ' reference';
          break;
      }
      // If the content type is story we don't search for it first we just create a new one
      if ($content_type == 'stories') {
      	$add_path = $add_destination . '/' . $content_type . '/add';
      }
      else {
      	$add_path = $add_destination . '/' . $content_type . '/search';
      }
      if ($content_type == 'events' || $content_type == 'objects') {
        // We unset the destination here because it will conflict with facet search
        // and desired destination behaviour later.
        unset($add_destination);
      }
      $options = array('@type' => t($content_type_label));
      $params = array(
        'path' => $add_path,
        'text' => t('Add a@type', $options),
      );
      if (isset($add_destination)) {
        $params['destination'] = $add_destination;
      }
      if (user_is_logged_in()) {
        $variables['title_prefix'] = theme('create_new_button', $params);
      }
    }
  }
  
  // Check to see if the Event Visualisation pane is on the Dossier panel page and if it is 
  // set the theme template file for this specific pane. The API requires that the template's filename's 
  // dashes "-" are replaced with underscores "_". see https://drupal.org/node/1089656
  if ($pane_name == 'storyscope_content-dossier_event_visualisation') {	
	$variables['theme_hook_suggestions'][] = 'panels_pane__dossier_event_visualisation';
  }
}

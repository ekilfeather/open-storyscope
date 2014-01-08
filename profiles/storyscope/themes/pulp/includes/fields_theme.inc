<?php 

function pulp_field($variables) {
  $output = '';
  
  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<h5 class="field-label"' . $variables['title_attributes'] . '>' . $variables['label'] . '<span class="colon">:&nbsp;</span></h5>';
  }

  // Render the items.
  if($variables['multiple-items']) {
    //$number_of_fields = count($variables['items']);
    $output .= '<ul class="field-items"' . $variables['content_attributes'] . '>';
    foreach ($variables['items'] as $delta => $item) {
      $classes = 'field-item ' . ($delta % 2 ? 'odd' : 'even');
      $classes .= ' item-' . ($delta+1);
      if ($delta+1 == count($variables['items'])) {
        $classes .= ' last';
      }
      $output .= '<li class="' . $classes . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</li>';
    }
    $output .= '</ul>';
  } else {
    foreach ($variables['items'] as $delta => $item) {
      $output .= drupal_render($item);  
    }
  }

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';

  return $output;
}

function pulp_preprocess_field(&$variables, $hook) {
  // detect if multitple items in pulp_field
  $variables['multiple-items'] = FALSE;
  
  if(count($variables['items']) > 1) {
    $variables['multiple-items'] = TRUE;
    $variables['classes_array'][] = 'has-' . count($variables['items']) . '-items';
    $variables['classes_array'][] = 'multiple-items';
  } else {
    $variables['classes_array'][] = 'single-item';
  }

  // determine if the field is of a text type
  if (strpos($variables['element']['#field_type'], 'text') !== FALSE) {
    $variables['classes_array'][] = 'text-is-prose';
  }
}


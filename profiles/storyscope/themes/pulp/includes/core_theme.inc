<?php

/*
  TODO find a better way to check for an image
*/
/**
 * Add classes to links based on the content of the link
 * Add 'image-link' if content is image
 */
function pulp_link(&$variables) {
  if ($variables['options']['html']) {
    if (strpos($variables['text'], '<img') !== false) {
      if (isset($variables['options']['attributes']['class']) && is_string($variables['options']['attributes']['class'])) {
        $variables['options']['attributes']['class'] .= ' image-link'; 
      }
      else {
        $variables['options']['attributes']['class'][] = ' image-link'; 
      }
    }
  }
    
  return '<a href="' . check_plain(url($variables['path'], $variables['options'])) . '"' . drupal_attributes($variables['options']['attributes']) . '>' . ($variables['options']['html'] ? $variables['text'] : check_plain($variables['text'])) . '</a>';
}

/**
 * Change feed icon to be text rather than an image.
 * Easier to swap in whatever image we want in theme layer.
 */
function pulp_feed_icon($variables) {
  $text = t('Subscribe to @feed-title', array('@feed-title' => $variables['title']));
  
  return l(
    $text, $variables['url'], array(
      'attributes' => array('class' => array('feed-icon'))
    )
  );
}

/**
 * Add class to indicate the image dimensions
 */
function pulp_preprocess_image(&$variables, $hook) {
  if (!empty($variables['width']) && !empty($variables['height'])) {
    $image_ratio = $variables['width']/$variables['height'];
    if ($image_ratio > 2) {
      if (isset($variables['attributes']['class']) && !is_string($variables['attributes']['class'])) {
        $variables['attributes']['class'][] = 'wider-image';
      }
    }
    if ($image_ratio < 0.8) {
      $variables['attributes']['class'][] = 'taller-image';
    }
  }
}

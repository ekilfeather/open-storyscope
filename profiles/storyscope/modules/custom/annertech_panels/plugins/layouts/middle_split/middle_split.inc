<?php

/**
 * Implements hook_panels_layouts()
 */

// Plugin definition
$plugin = array(
  'title' => t('Views Layout'),
  'category' => t('Annertech'),
  'icon' => 'middle_split.png',
  'theme' => 'annertech_panels_middle_split',
  'regions' => array(
    'one' => t('One'),
    'two' => t('Two'),
    'three' => t('Three (optional)'),
    'four' => t('Four (optional)')
  ),
);


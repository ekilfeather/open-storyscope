<?php

/**
 * Implements hook_panels_layouts()
 */

// Plugin definition
$plugin = array(
  'title' => t('Strip Middle Split Layout'),
  'category' => t('Annertech'),
  'icon' => 'strip_middle_split.png',
  'admin css' => 'strip-middle-split-admin.css', 
  'theme' => 'annertech_panels_strip_middle_split',
  'regions' => array(
    'top' => t('Top'),
    'middle_1' => t('Middle 1'),
    'middle_2_1' => t('Middle 2.1'),
    'middle_2_2' => t('Middle 2.2'),
    'middle_3' => t('Middle 3'),
    'bottom' => t('Bottom')
  ),
);


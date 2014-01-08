<?php

/**
 * Implements hook_panels_layouts()
 */

// Plugin definition
$plugin = array(
  'title' => t('Strip Layout'),
  'category' => t('Annertech'),
  'icon' => 'strip.png',
  'theme' => 'annertech_panels_strip',
  'regions' => array(
    'top' => t('Top'),
    'middle_1' => t('Middle 1'),
    'middle_2' => t('Middle 2'),
    'middle_3' => t('Middle 3'),
    'bottom' => t('Bottom')
  ),
);


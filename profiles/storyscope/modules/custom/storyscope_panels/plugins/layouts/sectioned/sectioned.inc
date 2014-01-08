<?php

/**
 * Implements hook_panels_layouts()
 */

// Plugin definition
$plugin = array(
  'title' => t('Sectioned Layout'),
  'category' => t('Storyscope'),
  'icon' => 'sectioned.png',
  'admin css' => 'sectioned-admin.css',
  'theme' => 'storyscope_panels_sectioned',
  'regions' => array(
    'top' => t('Top'),
    'middle_1' => t('Middle 1'),
    'middle_2_1' => t('Middle 2.1'),
    'middle_2_2' => t('Middle 2.2'),
    'middle_3' => t('Middle 3'),
    'middle_4_1' => t('Middle 4.1'),
    'middle_4_2' => t('Middle 4.2'),
    'bottom' => t('Bottom')
  ),
);


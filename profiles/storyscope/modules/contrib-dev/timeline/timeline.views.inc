<?php

/**
 * @file
 * Defines the View Style Plugins for Timeline module.
 */

/**
 * Implements of hook_views_style_plugins(). Adds view types to views UI interface.
 */
function timeline_views_plugins() {
  return array(
    'module' => 'timeline',
    'style' => array(
      'timeline' => array(
        'title' => t('Timeline'),
        'help' => t('Displays content on a SIMILE Timeline.'),
        'handler' => 'timeline_views_plugin_style',
        'uses options' => TRUE,
        'uses row plugin' => TRUE,
        'uses grouping' => TRUE,
        'uses fields' => TRUE,
        'type' => 'normal',
        'parent' => 'list',
        'path' => drupal_get_path('module', 'timeline'),
        'theme' => 'views_view_timeline',
        'theme file' => 'timeline.theme.inc',
        'even empty' => TRUE,
      ),
    ),
  );
}


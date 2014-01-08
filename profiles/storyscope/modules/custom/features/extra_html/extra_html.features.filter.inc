<?php
/**
 * @file
 * extra_html.features.filter.inc
 */

/**
 * Implements hook_filter_default_formats().
 */
function extra_html_filter_default_formats() {
  $formats = array();

  // Exported format: Extra HTML.
  $formats['extra_html'] = array(
    'format' => 'extra_html',
    'name' => 'Extra HTML',
    'cache' => '1',
    'status' => '1',
    'weight' => '0',
    'filters' => array(
      'media_filter' => array(
        'weight' => '-50',
        'status' => '1',
        'settings' => array(),
      ),
      'filter_html' => array(
        'weight' => '-49',
        'status' => '1',
        'settings' => array(
          'allowed_html' => '<a> <em> <strong> <cite> <blockquote> <code> <ul> <ol> <li> <dl> <dt> <dd> <p> <br> <h2> <h3> <h4> <img> <div> <figure> <figcaption> <span>',
          'filter_html_help' => 1,
          'filter_html_nofollow' => 0,
        ),
      ),
      'filter_url' => array(
        'weight' => '-48',
        'status' => '1',
        'settings' => array(
          'filter_url_length' => '72',
        ),
      ),
      'filter_autop' => array(
        'weight' => '-47',
        'status' => '1',
        'settings' => array(),
      ),
      'filter_htmlcorrector' => array(
        'weight' => '-46',
        'status' => '1',
        'settings' => array(),
      ),
    ),
  );

  return $formats;
}

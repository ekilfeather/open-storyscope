<?php
/**
 * @file
 * Theme functions for the news archive module.
 */


/**
 * Theme handler for theme('news_archive_block').
 */
function theme_news_archive_block($element) {
  $items = array();

  $archive = $element['element']['archive'];

  foreach ($archive as $year) {
    $item = array(
      'data' => t('!year (@count)', array('!year' => l($year['text'], $year['url'], array('attributes' => array('class' => array('news-archive-year')))), '@count' => $year['count'])),
      'children' => array(),
    );

    foreach ($year['months'] as $month) {
      $item['children'][] = array(
        'data' => t('!month (@count)', array('!month' => l($month['text'], $month['url'], array('attributes' => array('class' => array('news-archive-month')))), '@count' => $month['count'])),
      );
    }
    $items[] = $item;
  }

  return theme('item_list', array(
    'items' => $items,
    'attributes' => array('class' => 'news-archive'),
  ));
}


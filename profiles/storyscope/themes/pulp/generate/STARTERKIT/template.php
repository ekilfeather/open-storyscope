<?php

function STARTERKIT_preprocess_html(&$variables, $hook) {
}

function STARTERKIT_preprocess_page(&$variables, $hook) {
}

function STARTERKIT_preprocess_block(&$variables, $hook) {
  if ($variables['block_html_id'] == 'block-search-form') {
    //$variables['wrapper'] = FALSE;
  }
}

function STARTERKIT_preprocess_region(&$variables, $hook) {
}

function STARTERKIT_preprocess_node(&$variables, $hook) {

  // Make the $submitted a bit nicer
  $variables['date'] = date('j M Y', $variables['created']);
  $variables['submitted'] = t('By !username | !datetime', array(
    '!username' => $variables['name'],
    '!datetime' => $variables['date'],
  ));

  // Optionally, run node-type-specific preprocess functions, like
  // STARTERKIT_preprocess_node_page() or STARTERKIT_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}

function STARTERKIT_preprocess_breadcrumb(&$variables) {
  $variables['breadcrumb_append_title'] = TRUE;
}

function STARTERKIT_form_search_block_form_alter(&$form) {
  $form['search_block_form']['#attributes']['placeholder'] = t('Search');
}

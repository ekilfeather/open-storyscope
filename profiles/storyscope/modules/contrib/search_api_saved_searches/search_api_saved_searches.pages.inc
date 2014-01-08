<?php

/**
 * @file
 * User UI functions and form callbacks for saved searches.
 */

/**
 * Page callback for listing all saved searches of a user.
 *
 * @param $account
 *   The user of which to list saved searches.
 */
function search_api_saved_searches_user_listing($account) {
  $base_path = 'search-api/saved-search/';
  $header = array(
    t('Name'),
    t('Created'),
    t('Last executed'),
    t('Interval'),
    t('Operations'),
  );
  $searches = search_api_saved_search_load_multiple(FALSE, array('uid' => $account->uid));
  $rows = array();
  foreach ($searches as $search) {
    if (empty($search->options['page'])) {
      $name = check_plain($search->name);
    }
    else {
      $name = $search->l($search->name);
    }
    $created = format_date($search->created, 'short');
    $last_execute = t('@time ago', array('@time' => format_interval(REQUEST_TIME - $search->last_execute)));
    $interval = format_interval($search->notify_interval, 1);
    $path = $base_path . $search->id;
    $rows[] = array(
      $name,
      $created,
      $last_execute,
      $interval,
      l(t('delete'), $path . '/delete'),
    );
  }

  $render = array(
    '#theme' => 'table',
    '#header' => $header,
    '#rows' => $rows,
    '#empty' => t('No searches were saved yet.'),
    '#sticky' => TRUE,
  );
  return $render;
}

/**
 * Page callback for manually creating a new saved search.
 *
 * @param SearchApiSavedSearchesSettings $settings
 *   (optional) The settings to use. If not present, either the only available
 *   settings will be used, or a form for selecting one will be displayed.
 */
function search_api_saved_searches_create_manual(SearchApiSavedSearchesSettings $settings = NULL) {
  if (!isset($settings)) {
    foreach (search_api_saved_searches_settings_load_multiple(FALSE, array('enabled' => TRUE)) as $settings) {
      if (!empty($settings->options['manual']['allow'])) {
        $available_settings[$settings->delta] = $settings;
      }
    }
    if (empty($available_settings)) {
      return t('There are no searches for which saved searches can be created manually.');
    }
    if (count($available_settings) == 1) {
      $settings = reset($available_settings);
    }
    else {
      $render = array();
      $render['question']['#markup'] = t('For which search do you want to create a saved search?');
      $render['list']['#theme'] = 'list';
      $render['list']['#items'] = array();
      $base = 'search-api/saved-searches/add/';
      foreach ($available_settings as $id => $settings) {
        $name = $settings->index()->name;
        if (!empty($settings->options['manual']['page']['path'])) {
          $item = menu_get_item($settings->options['manual']['page']['path']);
          if (!empty($item['title'])) {
            $name = $item['title'];
          }
        }
        $render['list']['#items'][]['#markup'] = l($name, $base . $id);
      }
      return $render;
    }
  }

  return drupal_get_form('search_api_saved_searches_save_form', $settings);
}

/**
 * Page callback that activates a saved search.
 *
 * This is mostly necessary for anonymous users, but also when a user enters a
 * different mail address than the one he registered with.
 *
 * @param SearchApiSavedSearch $search
 *   The search to activate.
 * @param string $key
 *   The secret access key for this search, used to authenticate the user.
 */
function search_api_saved_searches_activate_page(SearchApiSavedSearch $search, $key) {
  $ret = array(
    'message' => array(
      '#markup' => '',
    ),
    'link' => array(
      '#markup' => '<p>' . $search->l(t('View this saved search')) . '</p>',
    ),
  );
  if ($search->enabled) {
    $msg = t('This saved search has already been activated.');
  }
  else {
    $search->enabled = TRUE;
    $success = $search->save();
    if (!$success) {
      drupal_set_message(t('An error occurred while trying to activate the search. Please contact the site administrator.'), 'error');
      return $ret;
    }
    $msg = t('Your saved search was successfully activated.');
  }
  $msg .= ' ' . t('You will receive e-mail notifications for all new results.');
  $ret['message']['#markup'] = '<p>' . $msg . '</p>';
  return $ret;
}

/**
 * Form builder for confirming the deletion of a saved search.
 *
 * @param SearchApiSavedSearch $search
 *   The search to delete.
 *
 * @see search_api_saved_searches_search_delete_form_submit()
 * @ingroup forms
 */
function search_api_saved_searches_search_delete_form(array $form, array &$form_state, SearchApiSavedSearch $search) {
  if ($search->uid) {
    $url = 'user/' . $search->uid . '/saved-searches';
  }
  else {
    $url = $search->url();
  }
  $form_state['search'] = $search;
  $form_state['url'] = $url;
  return confirm_form($form, t('Do you really want to delete this saved search?'), $url);
}

/**
 * Submission handler for search_api_saved_searches_search_delete_form().
 *
 * @see search_api_saved_searches_search_delete_form()
 */
function search_api_saved_searches_search_delete_form_submit(array $form, array &$form_state) {
  $form_state['search']->delete();
  drupal_set_message(t('The saved search was successfully deleted.'));
  $form_state['redirect'] = $form_state['url'];
}

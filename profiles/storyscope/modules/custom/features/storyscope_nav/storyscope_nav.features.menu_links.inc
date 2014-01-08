<?php
/**
 * @file
 * storyscope_nav.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function storyscope_nav_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: main-menu:<front>
  $menu_links['main-menu:<front>'] = array(
    'menu_name' => 'main-menu',
    'link_path' => '<front>',
    'router_path' => '',
    'link_title' => 'Home',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '1',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-50',
  );
  // Exported menu link: main-menu:dossiers
  $menu_links['main-menu:dossiers'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'dossiers',
    'router_path' => 'dossiers',
    'link_title' => 'Dossiers',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '-49',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Dossiers');
  t('Home');


  return $menu_links;
}

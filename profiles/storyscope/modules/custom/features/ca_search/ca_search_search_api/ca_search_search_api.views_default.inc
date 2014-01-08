<?php
/**
 * @file
 * ca_search_search_api.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function ca_search_search_api_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'ca_search';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'search_api_index_decipher_ca';
  $view->human_name = 'CA Search';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'CA Search';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Search: Group count */
  $handler->display->display_options['fields']['search_api_group_count']['id'] = 'search_api_group_count';
  $handler->display->display_options['fields']['search_api_group_count']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['search_api_group_count']['field'] = 'search_api_group_count';
  /* Field: Indexed CA Object: Collection */
  $handler->display->display_options['fields']['field_object_collection']['id'] = 'field_object_collection';
  $handler->display->display_options['fields']['field_object_collection']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_object_collection']['field'] = 'field_object_collection';
  $handler->display->display_options['fields']['field_object_collection']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Creation Date */
  $handler->display->display_options['fields']['field_object_creation_date']['id'] = 'field_object_creation_date';
  $handler->display->display_options['fields']['field_object_creation_date']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_object_creation_date']['field'] = 'field_object_creation_date';
  $handler->display->display_options['fields']['field_object_creation_date']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Creator */
  $handler->display->display_options['fields']['field_object_creator']['id'] = 'field_object_creator';
  $handler->display->display_options['fields']['field_object_creator']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_object_creator']['field'] = 'field_object_creator';
  $handler->display->display_options['fields']['field_object_creator']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Credit Line */
  $handler->display->display_options['fields']['field_object_credit_line']['id'] = 'field_object_credit_line';
  $handler->display->display_options['fields']['field_object_credit_line']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_object_credit_line']['field'] = 'field_object_credit_line';
  $handler->display->display_options['fields']['field_object_credit_line']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Description */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: ID */
  $handler->display->display_options['fields']['id']['id'] = 'id';
  $handler->display->display_options['fields']['id']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['id']['field'] = 'id';
  $handler->display->display_options['fields']['id']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Image */
  $handler->display->display_options['fields']['field_image']['id'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_image']['field'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Item language */
  $handler->display->display_options['fields']['search_api_language']['id'] = 'search_api_language';
  $handler->display->display_options['fields']['search_api_language']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['search_api_language']['field'] = 'search_api_language';
  $handler->display->display_options['fields']['search_api_language']['link_to_entity'] = 0;
  $handler->display->display_options['fields']['search_api_language']['format_name'] = 1;
  /* Field: Indexed CA Object: Materials */
  $handler->display->display_options['fields']['field_object_materials']['id'] = 'field_object_materials';
  $handler->display->display_options['fields']['field_object_materials']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_object_materials']['field'] = 'field_object_materials';
  $handler->display->display_options['fields']['field_object_materials']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Object Number */
  $handler->display->display_options['fields']['field_object_identifier']['id'] = 'field_object_identifier';
  $handler->display->display_options['fields']['field_object_identifier']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_object_identifier']['field'] = 'field_object_identifier';
  $handler->display->display_options['fields']['field_object_identifier']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: SEC/CA ID */
  $handler->display->display_options['fields']['field_ca_sec_id']['id'] = 'field_ca_sec_id';
  $handler->display->display_options['fields']['field_ca_sec_id']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_ca_sec_id']['field'] = 'field_ca_sec_id';
  $handler->display->display_options['fields']['field_ca_sec_id']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['link_to_entity'] = 0;
  /* Filter criterion: Europeana: Europeana search */
  $handler->display->display_options['filters']['europeana']['id'] = 'europeana';
  $handler->display->display_options['filters']['europeana']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['filters']['europeana']['field'] = 'europeana';
  $handler->display->display_options['filters']['europeana']['value'] = '0';
  $handler->display->display_options['filters']['europeana']['exposed'] = TRUE;
  $handler->display->display_options['filters']['europeana']['expose']['operator_id'] = '';
  $handler->display->display_options['filters']['europeana']['expose']['label'] = 'Europeana search';
  $handler->display->display_options['filters']['europeana']['expose']['operator'] = 'europeana_op';
  $handler->display->display_options['filters']['europeana']['expose']['identifier'] = 'europeana';
  $handler->display->display_options['filters']['europeana']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  /* Filter criterion: Search: Fulltext search */
  $handler->display->display_options['filters']['search_api_views_fulltext']['id'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['filters']['search_api_views_fulltext']['field'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['exposed'] = TRUE;
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator_id'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['label'] = 'Fulltext search';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['identifier'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
  );
  $handler->display->display_options['filters']['search_api_views_fulltext']['fields'] = array(
    'title' => 'title',
    'body' => 'body',
    'field_object_creator' => 'field_object_creator',
    'field_object_collection' => 'field_object_collection',
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['path'] = 'ca-search';
  $export['ca_search'] = $view;

  return $export;
}

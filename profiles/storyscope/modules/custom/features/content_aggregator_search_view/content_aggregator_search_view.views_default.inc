<?php
/**
 * @file
 * content_aggregator_search_view.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function content_aggregator_search_view_views_default_views() {
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
  $handler->display->display_options['title'] = 'Add Object';
  $handler->display->display_options['css_class'] = 'resource-container container-full narrow-items';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '32';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['row_class'] = 'article';
  $handler->display->display_options['style_options']['class'] = 'resources';
  $handler->display->display_options['style_options']['wrapper_class'] = '';
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  /* Field: Indexed CA Object: Image thumbnail */
  $handler->display->display_options['fields']['field_image_thumb']['id'] = 'field_image_thumb';
  $handler->display->display_options['fields']['field_image_thumb']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_image_thumb']['field'] = 'field_image_thumb';
  $handler->display->display_options['fields']['field_image_thumb']['label'] = '';
  $handler->display->display_options['fields']['field_image_thumb']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_image_thumb']['alter']['text'] = '<figure><img src="[field_image_thumb]" /></figure>';
  $handler->display->display_options['fields']['field_image_thumb']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_image_thumb']['link_to_entity'] = 0;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Field: Indexed CA Object: Image */
  $handler->display->display_options['fields']['field_image']['id'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_image']['field'] = 'field_image';
  $handler->display->display_options['fields']['field_image']['label'] = '';
  $handler->display->display_options['fields']['field_image']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_image']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_image']['alter']['text'] = '<figure><img src="[field_image]" /></figure>';
  $handler->display->display_options['fields']['field_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_image']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['text'] = '<div class="content">[title]';
  $handler->display->display_options['fields']['title']['element_type'] = 'h2';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Collection */
  $handler->display->display_options['fields']['field_object_collection']['id'] = 'field_object_collection';
  $handler->display->display_options['fields']['field_object_collection']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_object_collection']['field'] = 'field_object_collection';
  $handler->display->display_options['fields']['field_object_collection']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_object_collection']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Creation Date */
  $handler->display->display_options['fields']['field_object_creation_date']['id'] = 'field_object_creation_date';
  $handler->display->display_options['fields']['field_object_creation_date']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_object_creation_date']['field'] = 'field_object_creation_date';
  $handler->display->display_options['fields']['field_object_creation_date']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_object_creation_date']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Creator */
  $handler->display->display_options['fields']['field_object_creator']['id'] = 'field_object_creator';
  $handler->display->display_options['fields']['field_object_creator']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_object_creator']['field'] = 'field_object_creator';
  $handler->display->display_options['fields']['field_object_creator']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_object_creator']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Credit Line */
  $handler->display->display_options['fields']['field_object_credit_line']['id'] = 'field_object_credit_line';
  $handler->display->display_options['fields']['field_object_credit_line']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_object_credit_line']['field'] = 'field_object_credit_line';
  $handler->display->display_options['fields']['field_object_credit_line']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_object_credit_line']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Description */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: ID */
  $handler->display->display_options['fields']['id']['id'] = 'id';
  $handler->display->display_options['fields']['id']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['id']['field'] = 'id';
  $handler->display->display_options['fields']['id']['exclude'] = TRUE;
  $handler->display->display_options['fields']['id']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Materials */
  $handler->display->display_options['fields']['field_object_materials']['id'] = 'field_object_materials';
  $handler->display->display_options['fields']['field_object_materials']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_object_materials']['field'] = 'field_object_materials';
  $handler->display->display_options['fields']['field_object_materials']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_object_materials']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: Object Number */
  $handler->display->display_options['fields']['field_object_identifier']['id'] = 'field_object_identifier';
  $handler->display->display_options['fields']['field_object_identifier']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_object_identifier']['field'] = 'field_object_identifier';
  $handler->display->display_options['fields']['field_object_identifier']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_object_identifier']['link_to_entity'] = 0;
  /* Field: Indexed CA Object: SEC/CA ID */
  $handler->display->display_options['fields']['field_ca_sec_id']['id'] = 'field_ca_sec_id';
  $handler->display->display_options['fields']['field_ca_sec_id']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['fields']['field_ca_sec_id']['field'] = 'field_ca_sec_id';
  $handler->display->display_options['fields']['field_ca_sec_id']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_ca_sec_id']['link_to_entity'] = 0;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing_1']['id'] = 'nothing_1';
  $handler->display->display_options['fields']['nothing_1']['table'] = 'views';
  $handler->display->display_options['fields']['nothing_1']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing_1']['label'] = '';
  $handler->display->display_options['fields']['nothing_1']['alter']['text'] = '<div class="article-inner">
<h2>[title]</h2>
<p><span class="label">Collection: </span>[field_object_collection]</p>
<p><span class="label">Date: </span>[field_object_creation_date]</p>
<p><span class="label">Creator: </span>[field_object_creator]</p>
<p class="suggest" style="float:right;"><a href="/ca-search/import/[id]" >add +</a></p>
</div>';
  $handler->display->display_options['fields']['nothing_1']['element_type'] = 'div';
  $handler->display->display_options['fields']['nothing_1']['element_class'] = 'content';
  $handler->display->display_options['fields']['nothing_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nothing_1']['element_default_classes'] = FALSE;
  /* Filter criterion: Search: Fulltext search */
  $handler->display->display_options['filters']['search_api_views_fulltext']['id'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['filters']['search_api_views_fulltext']['field'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['group'] = 1;
  $handler->display->display_options['filters']['search_api_views_fulltext']['exposed'] = TRUE;
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator_id'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['label'] = 'Search term';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['description'] = 'Use OR and AND to focus the result.';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['identifier'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
    4 => 0,
  );
  $handler->display->display_options['filters']['search_api_views_fulltext']['fields'] = array(
    'title' => 'title',
    'body' => 'body',
    'field_object_creator' => 'field_object_creator',
    'field_object_creation_date' => 'field_object_creation_date',
    'field_object_collection' => 'field_object_collection',
    'field_object_credit_line' => 'field_object_credit_line',
    'field_object_materials' => 'field_object_materials',
    'field_object_identifier' => 'field_object_identifier',
    'field_ca_sec_id' => 'field_ca_sec_id',
    'field_image' => 'field_image',
  );

  /* Display: Decipher Content Aggregator (Object Story context) */
  $handler = $view->new_display('page', 'Decipher Content Aggregator (Object Story context)', 'page');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['row_class'] = 'article';
  $handler->display->display_options['style_options']['class'] = 'resources';
  $handler->display->display_options['style_options']['wrapper_class'] = '';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['path'] = 'objectstories/%/object/search/external-ca';
  $handler->display->display_options['menu']['title'] = 'External (CA)';
  $handler->display->display_options['menu']['description'] = 'Search objects through the Content Aggregator';
  $handler->display->display_options['menu']['weight'] = '1';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Decipher Content Aggregator (Dossier context) */
  $handler = $view->new_display('page', 'Decipher Content Aggregator (Dossier context)', 'external_ca');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['exposed_form'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Search';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['row_class'] = 'article';
  $handler->display->display_options['style_options']['class'] = 'resources';
  $handler->display->display_options['style_options']['wrapper_class'] = '';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['exposed_block'] = TRUE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Search: Fulltext search */
  $handler->display->display_options['filters']['search_api_views_fulltext']['id'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['filters']['search_api_views_fulltext']['field'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['value'] = 'art';
  $handler->display->display_options['filters']['search_api_views_fulltext']['group'] = 1;
  $handler->display->display_options['filters']['search_api_views_fulltext']['exposed'] = TRUE;
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator_id'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['identifier'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
    4 => 0,
  );
  $handler->display->display_options['filters']['search_api_views_fulltext']['fields'] = array(
    'title' => 'title',
    'body' => 'body',
    'field_object_creator' => 'field_object_creator',
    'field_object_creation_date' => 'field_object_creation_date',
    'field_object_collection' => 'field_object_collection',
    'field_object_credit_line' => 'field_object_credit_line',
    'field_object_materials' => 'field_object_materials',
    'field_object_identifier' => 'field_object_identifier',
    'field_ca_sec_id' => 'field_ca_sec_id',
    'field_image' => 'field_image',
  );
  $handler->display->display_options['path'] = 'dossiers/%/objectstories/%/objects/search/external-ca';
  $handler->display->display_options['menu']['type'] = 'tab';
  $handler->display->display_options['menu']['title'] = 'External';
  $handler->display->display_options['menu']['description'] = 'Search for objects through the Content Aggregator';
  $handler->display->display_options['menu']['weight'] = '1';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Decipher Content Aggregator (Dossier context) */
  $handler = $view->new_display('page', 'Decipher Content Aggregator (Dossier context)', 'page_1');
  $handler->display->display_options['defaults']['hide_admin_links'] = FALSE;
  $handler->display->display_options['defaults']['exposed_form'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Search';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['row_class'] = 'article';
  $handler->display->display_options['style_options']['class'] = 'resources';
  $handler->display->display_options['style_options']['wrapper_class'] = '';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['exposed_block'] = TRUE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = 'Search for and add Objects which are in Collections which have given their permission to be used in this Storyscope.';
  $handler->display->display_options['header']['area']['format'] = 'extra_html';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Search: Fulltext search */
  $handler->display->display_options['filters']['search_api_views_fulltext']['id'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['table'] = 'search_api_index_decipher_ca';
  $handler->display->display_options['filters']['search_api_views_fulltext']['field'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['value'] = 'art';
  $handler->display->display_options['filters']['search_api_views_fulltext']['group'] = 1;
  $handler->display->display_options['filters']['search_api_views_fulltext']['exposed'] = TRUE;
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator_id'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['operator'] = 'search_api_views_fulltext_op';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['identifier'] = 'search_api_views_fulltext';
  $handler->display->display_options['filters']['search_api_views_fulltext']['expose']['remember_roles'] = array(
    2 => '2',
    1 => 0,
    3 => 0,
    4 => 0,
  );
  $handler->display->display_options['filters']['search_api_views_fulltext']['fields'] = array(
    'title' => 'title',
    'body' => 'body',
    'field_object_creator' => 'field_object_creator',
    'field_object_creation_date' => 'field_object_creation_date',
    'field_object_collection' => 'field_object_collection',
    'field_object_credit_line' => 'field_object_credit_line',
    'field_object_materials' => 'field_object_materials',
    'field_object_identifier' => 'field_object_identifier',
    'field_ca_sec_id' => 'field_ca_sec_id',
    'field_image' => 'field_image',
  );
  $handler->display->display_options['path'] = 'dossiers/%/objects/search/external-ca';
  $handler->display->display_options['menu']['type'] = 'tab';
  $handler->display->display_options['menu']['title'] = 'Collections';
  $handler->display->display_options['menu']['description'] = 'Search for objects through the Content Aggregator';
  $handler->display->display_options['menu']['weight'] = '1';
  $handler->display->display_options['menu']['context'] = 0;
  $export['ca_search'] = $view;

  return $export;
}

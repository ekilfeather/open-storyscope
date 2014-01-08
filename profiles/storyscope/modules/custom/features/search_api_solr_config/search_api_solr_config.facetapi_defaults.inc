<?php
/**
 * @file
 * search_api_solr_config.facetapi_defaults.inc
 */

/**
 * Implements hook_facetapi_default_facet_settings().
 */
function search_api_solr_config_facetapi_default_facet_settings() {
  $export = array();

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_activity';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_activity';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_event_activity'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_agent';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_agent';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_event_agent'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_dimensions:field_event_dimension_label';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_dimensions:field_event_dimension_label';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '5',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_events_add_existing_search_api:page_add_event' => 'search_api_views:dossier_events_add_existing_search_api:page_add_event',
      'search_api_views:object_story_events_add_existing_search_api:page_add_event' => 'search_api_views:object_story_events_add_existing_search_api:page_add_event',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_event_dimensions:field_event_dimension_label'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_dimensions:field_event_dimension_unit';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_dimensions:field_event_dimension_unit';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '5',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_events_add_existing_search_api:page_add_event' => 'search_api_views:dossier_events_add_existing_search_api:page_add_event',
      'search_api_views:object_story_events_add_existing_search_api:page_add_event' => 'search_api_views:object_story_events_add_existing_search_api:page_add_event',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_event_dimensions:field_event_dimension_unit'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_dimensions:field_event_dimension_value';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_dimensions:field_event_dimension_value';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '5',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_events_add_existing_search_api:page_add_event' => 'search_api_views:dossier_events_add_existing_search_api:page_add_event',
      'search_api_views:object_story_events_add_existing_search_api:page_add_event' => 'search_api_views:object_story_events_add_existing_search_api:page_add_event',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_event_dimensions:field_event_dimension_value'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_end_time';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_end_time';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_events_add_existing_search_api:page_add_event' => 'search_api_views:dossier_events_add_existing_search_api:page_add_event',
      'search_api_views:object_story_events_add_existing_search_api:page_add_event' => 'search_api_views:object_story_events_add_existing_search_api:page_add_event',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_event_end_time'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_genre';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_genre';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '0',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_event_genre'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_label';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_label';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_events_search_api:default' => 'search_api_views:dossier_events_search_api:default',
      'search_api_views:dossier_events_search_api:page_1' => 'search_api_views:dossier_events_search_api:page_1',
      'search_api_views:dossier_events_search_api:timeline_data_page' => 'search_api_views:dossier_events_search_api:timeline_data_page',
      'search_api_views:dossier_events_search_api:dossier_events_page' => 'search_api_views:dossier_events_search_api:dossier_events_page',
      'search_api_views:dossier_events_search_api:panel_pane_1' => 'search_api_views:dossier_events_search_api:panel_pane_1',
      'search_api_views:dossier_events_search_api:dossier_events_pane' => 'search_api_views:dossier_events_search_api:dossier_events_pane',
      'search_api_views:object_story_events_add_existing_search_api:page_add_event_dossier_context' => 'search_api_views:object_story_events_add_existing_search_api:page_add_event_dossier_context',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_event_label'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_location';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_location';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_event_location'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_materials';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_materials';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_events_add_existing_search_api:page_add_event' => 'search_api_views:dossier_events_add_existing_search_api:page_add_event',
      'search_api_views:object_story_events_add_existing_search_api:page_add_event' => 'search_api_views:object_story_events_add_existing_search_api:page_add_event',
      'search_api_views:events_search_api_:events_listing' => 'search_api_views:events_search_api_:events_listing',
      'search_api_views:dossier_events_timeline_search_api_:page' => 'search_api_views:dossier_events_timeline_search_api_:page',
      'search_api_views:dossier_events_timeline_search_api:default' => 'search_api_views:dossier_events_timeline_search_api:default',
      'search_api_views:dossier_events_timeline_search_api:page_add_event' => 'search_api_views:dossier_events_timeline_search_api:page_add_event',
      'search_api_views:dossier_events_timeline_search_api:page_timeline' => 'search_api_views:dossier_events_timeline_search_api:page_timeline',
      'search_api_views:dossier_events_search_api:default' => 'search_api_views:dossier_events_search_api:default',
      'search_api_views:dossier_events_search_api:page_1' => 'search_api_views:dossier_events_search_api:page_1',
      'search_api_views:dossier_events_search_api:timeline_data_page' => 'search_api_views:dossier_events_search_api:timeline_data_page',
      'search_api_views:dossier_events_search_api:dossier_events_page' => 'search_api_views:dossier_events_search_api:dossier_events_page',
      'search_api_views:dossier_events_search_api:panel_pane_1' => 'search_api_views:dossier_events_search_api:panel_pane_1',
      'search_api_views:dossier_events_search_api:dossier_events_pane' => 'search_api_views:dossier_events_search_api:dossier_events_pane',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_event_materials'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_object';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_object';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_event_object'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_start_time';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_start_time';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_events_add_existing_search_api:page_add_event' => 'search_api_views:dossier_events_add_existing_search_api:page_add_event',
      'search_api_views:object_story_events_add_existing_search_api:page_add_event' => 'search_api_views:object_story_events_add_existing_search_api:page_add_event',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_event_start_time'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_style_movement';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_style_movement';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_event_style_movement'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_value:field_event_value_currency';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_value:field_event_value_currency';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '20',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_event_value:field_event_value_currency'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_event_value:field_event_value_value';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_event_value:field_event_value_value';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '5',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_event_value:field_event_value_value'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_fb_agent:field_fb_agent_mid';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_fb_agent:field_fb_agent_mid';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_fb_agent:field_fb_agent_mid'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_fb_agent:field_fb_agent_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_fb_agent:field_fb_agent_topic';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal',
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_fb_agent:field_fb_agent_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_fb_classification:field_fb_classification_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_fb_classification:field_fb_classification_topic';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal',
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_fb_classification:field_fb_classification_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_fb_genre:field_fb_genre_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_fb_genre:field_fb_genre_topic';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(
      'search_api_views:dossier_events_search_api:dossier_events_page' => 'search_api_views:dossier_events_search_api:dossier_events_page',
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal',
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_fb_genre:field_fb_genre_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_fb_location:field_fb_location_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_fb_location:field_fb_location_topic';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal',
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_fb_location:field_fb_location_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_fb_materials:field_fb_materials_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_fb_materials:field_fb_materials_topic';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal',
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_fb_materials:field_fb_materials_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_fb_style_movement:field_fb_style_movement_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_fb_style_movement:field_fb_style_movement_topic';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal',
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_fb_style_movement:field_fb_style_movement_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_classification';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_classification';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_object_classification'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_collection';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_collection';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object',
      'search_api_views:objects_search_api:object_listing' => 'search_api_views:objects_search_api:object_listing',
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object_dossier_context' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object_dossier_context',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_collection'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_creation_date:field_object_creation_approx';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_creation_date:field_object_creation_approx';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_creation_date:field_object_creation_approx'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_creation_date:field_object_creation_year';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_creation_date:field_object_creation_year';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_creation_date:field_object_creation_year'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_creator:field_compund_date_approximate';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_creator:field_compund_date_approximate';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_creator:field_compund_date_approximate'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_creator:field_compund_date_day';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_creator:field_compund_date_day';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_creator:field_compund_date_day'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_creator:field_compund_date_month';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_creator:field_compund_date_month';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_creator:field_compund_date_month'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_creator:field_compund_date_year';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_creator:field_compund_date_year';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_creator:field_compund_date_year'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_creator:field_object_creator_culture';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_creator:field_object_creator_culture';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object',
      'search_api_views:objects_search_api:object_listing' => 'search_api_views:objects_search_api:object_listing',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_creator:field_object_creator_culture'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_creator:field_object_creator_name';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_creator:field_object_creator_name';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object',
      'search_api_views:objects_search_api:object_listing' => 'search_api_views:objects_search_api:object_listing',
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object_dossier_context' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object_dossier_context',
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object_dossier_context_internal' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object_dossier_context_internal',
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object_internal',
      'search_api_views:dossier_objects_add_existing_search_api:page_add_object' => 'search_api_views:dossier_objects_add_existing_search_api:page_add_object',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_creator:field_object_creator_name'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_creator:field_object_creator_role';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_creator:field_object_creator_role';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:object_story_objects_add_existing_search_api:page_add_object' => 'search_api_views:object_story_objects_add_existing_search_api:page_add_object',
      'search_api_views:objects_search_api:object_listing' => 'search_api_views:objects_search_api:object_listing',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_creator:field_object_creator_role'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_credit_line';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_credit_line';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_object_credit_line'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_dimensions:field_object_dimension_label';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_dimensions:field_object_dimension_label';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '5',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_object_dimensions:field_object_dimension_label'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_dimensions:field_object_dimension_unit';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_dimensions:field_object_dimension_unit';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '5',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_object_dimensions:field_object_dimension_unit'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_dimensions:field_object_dimension_value';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_dimensions:field_object_dimension_value';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '20',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_object_dimensions:field_object_dimension_value'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_identifier';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_identifier';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '5',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_object_identifier'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_materials';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_materials';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_object_materials'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_activity';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_activity';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '-1',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
      'search_api_views:dossier_events_timeline_search_api_:page' => 'search_api_views:dossier_events_timeline_search_api_:page',
      'search_api_views:dossier_events_timeline_search_api:default' => 'search_api_views:dossier_events_timeline_search_api:default',
      'search_api_views:dossier_events_timeline_search_api:page_add_event' => 'search_api_views:dossier_events_timeline_search_api:page_add_event',
      'search_api_views:dossier_events_timeline_search_api:page_timeline' => 'search_api_views:dossier_events_timeline_search_api:page_timeline',
      'search_api_views:dossier_events_timeline_search_api:timeline_data_page' => 'search_api_views:dossier_events_timeline_search_api:timeline_data_page',
      'search_api_views:dossier_events_search_api:dossier_events_pane' => 'search_api_views:dossier_events_search_api:dossier_events_pane',
      'search_api_views:dossier_object_stories_add_existing_search_api:internal' => 'search_api_views:dossier_object_stories_add_existing_search_api:internal',
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story_internal' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story_internal',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_activity'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_agent';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_agent';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
      'search_api_views:dossier_events_timeline_search_api_:page' => 'search_api_views:dossier_events_timeline_search_api_:page',
      'search_api_views:dossier_events_timeline_search_api:default' => 'search_api_views:dossier_events_timeline_search_api:default',
      'search_api_views:dossier_events_timeline_search_api:page_add_event' => 'search_api_views:dossier_events_timeline_search_api:page_add_event',
      'search_api_views:dossier_events_timeline_search_api:page_timeline' => 'search_api_views:dossier_events_timeline_search_api:page_timeline',
      'search_api_views:dossier_events_timeline_search_api:timeline_data_page' => 'search_api_views:dossier_events_timeline_search_api:timeline_data_page',
      'search_api_views:dossier_events_search_api:dossier_events_pane' => 'search_api_views:dossier_events_search_api:dossier_events_pane',
      'search_api_views:dossier_object_stories_add_existing_search_api:internal' => 'search_api_views:dossier_object_stories_add_existing_search_api:internal',
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story_internal' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story_internal',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_agent'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_dimensions:field_event_dimension_label';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_dimensions:field_event_dimension_label';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '5',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_dimensions:field_event_dimension_label'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_dimensions:field_event_dimension_unit';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_dimensions:field_event_dimension_unit';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '5',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_dimensions:field_event_dimension_unit'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_dimensions:field_event_dimension_value';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_dimensions:field_event_dimension_value';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '5',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_dimensions:field_event_dimension_value'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_end_time';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_end_time';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_end_time'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_genre';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_genre';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '5',
    'dependencies' => array(
      'roles' => array(
        1 => 0,
        2 => 0,
        3 => 0,
      ),
      'bundle' => 'none',
      'bundle_selected' => array(
        'content_page' => 0,
        'dossier' => 0,
        'event' => 0,
        'news_item' => 0,
        'object' => 0,
        'object_story' => 0,
        'plot' => 0,
        'plot_element' => 0,
        'reference' => 0,
        'source_event' => 0,
        'webform' => 0,
      ),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
      'search_api_views:dossier_events_timeline_search_api_:page' => 'search_api_views:dossier_events_timeline_search_api_:page',
      'search_api_views:dossier_events_timeline_search_api:default' => 'search_api_views:dossier_events_timeline_search_api:default',
      'search_api_views:dossier_events_timeline_search_api:page_add_event' => 'search_api_views:dossier_events_timeline_search_api:page_add_event',
      'search_api_views:dossier_events_timeline_search_api:page_timeline' => 'search_api_views:dossier_events_timeline_search_api:page_timeline',
      'search_api_views:dossier_events_timeline_search_api:timeline_data_page' => 'search_api_views:dossier_events_timeline_search_api:timeline_data_page',
      'search_api_views:dossier_events_search_api:dossier_events_pane' => 'search_api_views:dossier_events_search_api:dossier_events_pane',
      'search_api_views:dossier_object_stories_add_existing_search_api:internal' => 'search_api_views:dossier_object_stories_add_existing_search_api:internal',
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story_internal' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story_internal',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_genre'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_label';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_label';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
      'search_api_views:dossier_events_timeline_search_api_:page' => 'search_api_views:dossier_events_timeline_search_api_:page',
      'search_api_views:dossier_events_timeline_search_api:default' => 'search_api_views:dossier_events_timeline_search_api:default',
      'search_api_views:dossier_events_timeline_search_api:page_add_event' => 'search_api_views:dossier_events_timeline_search_api:page_add_event',
      'search_api_views:dossier_events_timeline_search_api:page_timeline' => 'search_api_views:dossier_events_timeline_search_api:page_timeline',
      'search_api_views:dossier_events_timeline_search_api:timeline_data_page' => 'search_api_views:dossier_events_timeline_search_api:timeline_data_page',
      'search_api_views:dossier_events_search_api:dossier_events_pane' => 'search_api_views:dossier_events_search_api:dossier_events_pane',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_label'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_location';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_location';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
      'search_api_views:dossier_events_timeline_search_api_:page' => 'search_api_views:dossier_events_timeline_search_api_:page',
      'search_api_views:dossier_events_timeline_search_api:default' => 'search_api_views:dossier_events_timeline_search_api:default',
      'search_api_views:dossier_events_timeline_search_api:page_add_event' => 'search_api_views:dossier_events_timeline_search_api:page_add_event',
      'search_api_views:dossier_events_timeline_search_api:page_timeline' => 'search_api_views:dossier_events_timeline_search_api:page_timeline',
      'search_api_views:dossier_events_timeline_search_api:timeline_data_page' => 'search_api_views:dossier_events_timeline_search_api:timeline_data_page',
      'search_api_views:dossier_events_search_api:dossier_events_pane' => 'search_api_views:dossier_events_search_api:dossier_events_pane',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_location'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_materials';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_materials';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
      'search_api_views:dossier_events_timeline_search_api_:page' => 'search_api_views:dossier_events_timeline_search_api_:page',
      'search_api_views:dossier_events_timeline_search_api:default' => 'search_api_views:dossier_events_timeline_search_api:default',
      'search_api_views:dossier_events_timeline_search_api:page_add_event' => 'search_api_views:dossier_events_timeline_search_api:page_add_event',
      'search_api_views:dossier_events_timeline_search_api:page_timeline' => 'search_api_views:dossier_events_timeline_search_api:page_timeline',
      'search_api_views:dossier_events_timeline_search_api:timeline_data_page' => 'search_api_views:dossier_events_timeline_search_api:timeline_data_page',
      'search_api_views:dossier_events_search_api:dossier_events_pane' => 'search_api_views:dossier_events_search_api:dossier_events_pane',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_materials'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_object';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_object';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
      'search_api_views:dossier_events_timeline_search_api_:page' => 'search_api_views:dossier_events_timeline_search_api_:page',
      'search_api_views:dossier_events_timeline_search_api:default' => 'search_api_views:dossier_events_timeline_search_api:default',
      'search_api_views:dossier_events_timeline_search_api:page_add_event' => 'search_api_views:dossier_events_timeline_search_api:page_add_event',
      'search_api_views:dossier_events_timeline_search_api:page_timeline' => 'search_api_views:dossier_events_timeline_search_api:page_timeline',
      'search_api_views:dossier_events_timeline_search_api:timeline_data_page' => 'search_api_views:dossier_events_timeline_search_api:timeline_data_page',
      'search_api_views:dossier_events_search_api:dossier_events_pane' => 'search_api_views:dossier_events_search_api:dossier_events_pane',
      'search_api_views:dossier_object_stories_add_existing_search_api:internal' => 'search_api_views:dossier_object_stories_add_existing_search_api:internal',
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story_internal' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story_internal',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_object'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_start_time';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_start_time';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_start_time'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_style_movement';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_style_movement';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => '0',
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
      'search_api_views:dossier_events_timeline_search_api_:page' => 'search_api_views:dossier_events_timeline_search_api_:page',
      'search_api_views:dossier_events_timeline_search_api:default' => 'search_api_views:dossier_events_timeline_search_api:default',
      'search_api_views:dossier_events_timeline_search_api:page_add_event' => 'search_api_views:dossier_events_timeline_search_api:page_add_event',
      'search_api_views:dossier_events_timeline_search_api:page_timeline' => 'search_api_views:dossier_events_timeline_search_api:page_timeline',
      'search_api_views:dossier_events_timeline_search_api:timeline_data_page' => 'search_api_views:dossier_events_timeline_search_api:timeline_data_page',
      'search_api_views:dossier_events_search_api:dossier_events_pane' => 'search_api_views:dossier_events_search_api:dossier_events_pane',
      'search_api_views:dossier_object_stories_add_existing_search_api:internal' => 'search_api_views:dossier_object_stories_add_existing_search_api:internal',
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story_internal' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story_internal',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_style_movement'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_value:field_event_value_currency';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_value:field_event_value_currency';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '10',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_value:field_event_value_currency'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_event_value:field_event_value_value';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_event_value:field_event_value_value';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '5',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
      'roles' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '0',
    'facet_search_ids' => array(
      'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story' => 'search_api_views:dossier_object_stories_add_existing_search_api:page_add_object_story',
      'search_api_views:object_stories_search_api_:object_story_listing' => 'search_api_views:object_stories_search_api_:object_story_listing',
    ),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_event_value:field_event_value_value'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes::field_object_story_events:field_fb_agent:field_fb_agent_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = '';
  $facet->facet = 'field_object_story_events:field_fb_agent:field_fb_agent_topic';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'operator' => 'and',
    'hard_limit' => '50',
    'dependencies' => array(
      'bundle' => 'none',
      'bundle_selected' => array(),
    ),
    'facet_mincount' => '1',
    'facet_missing' => '0',
    'flatten' => 0,
    'query_type' => 'term',
    'default_true' => '1',
    'facet_search_ids' => array(),
  );
  $export['search_api@internal_search_index_nodes::field_object_story_events:field_fb_agent:field_fb_agent_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_activity';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_activity';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_activity'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_agent';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_agent';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_agent'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_dimensions:field_event_dimension_label';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_dimensions:field_event_dimension_label';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_dimensions:field_event_dimension_label'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_dimensions:field_event_dimension_unit';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_dimensions:field_event_dimension_unit';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_dimensions:field_event_dimension_unit'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_dimensions:field_event_dimension_value';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_dimensions:field_event_dimension_value';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_dimensions:field_event_dimension_value'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_end_time';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_end_time';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '20',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_end_time'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_genre';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_genre';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 1,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_genre'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_label';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_label';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_label'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_location';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_location';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_location'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_materials';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_materials';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_materials'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_object';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_object';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_object'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_start_time';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_start_time';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '20',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_start_time'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_style_movement';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_style_movement';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_style_movement'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_value:field_event_value_currency';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_value:field_event_value_currency';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_value:field_event_value_currency'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_event_value:field_event_value_value';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_event_value:field_event_value_value';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_event_value:field_event_value_value'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_fb_agent';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_fb_agent';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
    ),
    'sort_weight' => array(
      'active' => -50,
      'count' => -49,
      'display' => -48,
    ),
    'sort_order' => array(
      'active' => 3,
      'count' => 3,
      'display' => 4,
    ),
    'empty_behavior' => 'none',
    'soft_limit' => 20,
    'nofollow' => 1,
    'show_expanded' => 0,
  );
  $export['search_api@internal_search_index_nodes:block:field_fb_agent'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_fb_agent:field_fb_agent_birth_date';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_fb_agent:field_fb_agent_birth_date';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
    ),
    'sort_weight' => array(
      'active' => -50,
      'count' => -49,
      'display' => -48,
    ),
    'sort_order' => array(
      'active' => 3,
      'count' => 3,
      'display' => 4,
    ),
    'empty_behavior' => 'none',
    'soft_limit' => 20,
    'nofollow' => 1,
    'show_expanded' => 0,
  );
  $export['search_api@internal_search_index_nodes:block:field_fb_agent:field_fb_agent_birth_date'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_fb_agent:field_fb_agent_death_date';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_fb_agent:field_fb_agent_death_date';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
    ),
    'sort_weight' => array(
      'active' => -50,
      'count' => -49,
      'display' => -48,
    ),
    'sort_order' => array(
      'active' => 3,
      'count' => 3,
      'display' => 4,
    ),
    'empty_behavior' => 'none',
    'soft_limit' => 20,
    'nofollow' => 1,
    'show_expanded' => 0,
  );
  $export['search_api@internal_search_index_nodes:block:field_fb_agent:field_fb_agent_death_date'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_fb_agent:field_fb_agent_mid';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_fb_agent:field_fb_agent_mid';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'text',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '<p><strong>fb agent mid </strong>some empty text here</p>
',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_fb_agent:field_fb_agent_mid'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_fb_agent:field_fb_agent_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_fb_agent:field_fb_agent_topic';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'count' => 'count',
      'display' => 'display',
      'active' => 'active',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'count' => '-50',
      'display' => '-49',
      'active' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'count' => '3',
      'display' => '4',
      'active' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'text',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '<p>Empty</p>',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_fb_agent:field_fb_agent_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_fb_classification:field_fb_classification_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_fb_classification:field_fb_classification_topic';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_fb_classification:field_fb_classification_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_fb_genre:field_fb_genre_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_fb_genre:field_fb_genre_topic';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_fb_genre:field_fb_genre_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_fb_location:field_fb_location_latitude';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_fb_location:field_fb_location_latitude';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
    ),
    'sort_weight' => array(
      'active' => -50,
      'count' => -49,
      'display' => -48,
    ),
    'sort_order' => array(
      'active' => 3,
      'count' => 3,
      'display' => 4,
    ),
    'empty_behavior' => 'none',
    'soft_limit' => 20,
    'nofollow' => 1,
    'show_expanded' => 0,
  );
  $export['search_api@internal_search_index_nodes:block:field_fb_location:field_fb_location_latitude'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_fb_location:field_fb_location_longitude';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_fb_location:field_fb_location_longitude';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
    ),
    'sort_weight' => array(
      'active' => -50,
      'count' => -49,
      'display' => -48,
    ),
    'sort_order' => array(
      'active' => 3,
      'count' => 3,
      'display' => 4,
    ),
    'empty_behavior' => 'none',
    'soft_limit' => 20,
    'nofollow' => 1,
    'show_expanded' => 0,
  );
  $export['search_api@internal_search_index_nodes:block:field_fb_location:field_fb_location_longitude'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_fb_location:field_fb_location_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_fb_location:field_fb_location_topic';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_fb_location:field_fb_location_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_fb_materials:field_fb_materials_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_fb_materials:field_fb_materials_topic';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_fb_materials:field_fb_materials_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_fb_style_movement:field_fb_style_movement_topic';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_fb_style_movement:field_fb_style_movement_topic';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '20',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_fb_style_movement:field_fb_style_movement_topic'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_classification';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_classification';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_classification'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_collection';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_collection';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_collection'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_creation_date:field_object_creation_approx';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_creation_date:field_object_creation_approx';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '20',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_creation_date:field_object_creation_approx'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_creation_date:field_object_creation_year';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_creation_date:field_object_creation_year';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '20',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_creation_date:field_object_creation_year'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_creator:field_compund_date_approximate';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_creator:field_compund_date_approximate';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '20',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_creator:field_compund_date_approximate'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_creator:field_compund_date_day';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_creator:field_compund_date_day';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '20',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_creator:field_compund_date_day'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_creator:field_compund_date_month';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_creator:field_compund_date_month';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '20',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_creator:field_compund_date_month'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_creator:field_compund_date_year';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_creator:field_compund_date_year';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '20',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_creator:field_compund_date_year'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_creator:field_object_creator_culture';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_creator:field_object_creator_culture';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_creator:field_object_creator_culture'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_creator:field_object_creator_name';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_creator:field_object_creator_name';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_creator:field_object_creator_name'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_creator:field_object_creator_role';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_creator:field_object_creator_role';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_creator:field_object_creator_role'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_credit_line';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_credit_line';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_credit_line'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_dimensions:field_object_dimension_label';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_dimensions:field_object_dimension_label';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_dimensions:field_object_dimension_label'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_dimensions:field_object_dimension_unit';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_dimensions:field_object_dimension_unit';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_dimensions:field_object_dimension_unit'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_dimensions:field_object_dimension_value';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_dimensions:field_object_dimension_value';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_dimensions:field_object_dimension_value'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_identifier';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_identifier';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_identifier'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_materials';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_materials';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'display' => 'display',
      'active' => 'active',
      'count' => 'count',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'display' => '-50',
      'active' => '-49',
      'count' => '-48',
      'indexed' => '-47',
    ),
    'sort_order' => array(
      'display' => '4',
      'active' => '3',
      'count' => '3',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_materials'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
    ),
    'sort_weight' => array(
      'active' => -50,
      'count' => -49,
      'display' => -48,
    ),
    'sort_order' => array(
      'active' => 3,
      'count' => 3,
      'display' => 4,
    ),
    'empty_behavior' => 'none',
    'soft_limit' => 20,
    'nofollow' => 1,
    'show_expanded' => 0,
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_activity';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_activity';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_activity'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_agent';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_agent';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_agent'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_dimensions:field_event_dimension_label';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_dimensions:field_event_dimension_label';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_dimensions:field_event_dimension_label'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_dimensions:field_event_dimension_unit';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_dimensions:field_event_dimension_unit';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_dimensions:field_event_dimension_unit'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_dimensions:field_event_dimension_value';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_dimensions:field_event_dimension_value';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_dimensions:field_event_dimension_value'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_end_time';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_end_time';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '20',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_end_time'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_genre';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_genre';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(
      'active_items' => array(
        'status' => 0,
        'weight' => '-50',
      ),
      'current_depth' => array(
        'status' => 0,
        'weight' => '-49',
      ),
    ),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_genre'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_label';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_label';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_label'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_location';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_location';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_location'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_materials';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_materials';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_materials'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_object';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_object';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_object'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_start_time';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_start_time';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '20',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_start_time'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_style_movement';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_style_movement';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_style_movement'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_value:field_event_dimension_value';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_value:field_event_dimension_value';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
    ),
    'sort_weight' => array(
      'active' => -50,
      'count' => -49,
      'display' => -48,
    ),
    'sort_order' => array(
      'active' => 3,
      'count' => 3,
      'display' => 4,
    ),
    'empty_behavior' => 'none',
    'soft_limit' => 20,
    'nofollow' => 1,
    'show_expanded' => 0,
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_value:field_event_dimension_value'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_value:field_event_value_currency';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_value:field_event_value_currency';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_value:field_event_value_currency'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_event_value:field_event_value_value';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_event_value:field_event_value_value';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
      'indexed' => 0,
    ),
    'sort_weight' => array(
      'active' => '-50',
      'count' => '-49',
      'display' => '-48',
      'indexed' => '0',
    ),
    'sort_order' => array(
      'active' => '3',
      'count' => '3',
      'display' => '4',
      'indexed' => '4',
    ),
    'empty_behavior' => 'none',
    'soft_limit' => '5',
    'nofollow' => 1,
    'show_expanded' => 0,
    'empty_text' => array(
      'value' => '',
      'format' => 'extra_html',
    ),
    'submit_realm' => 'Save and go back to realm settings',
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_event_value:field_event_value_value'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_object_classification';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_object_classification';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
    ),
    'sort_weight' => array(
      'active' => -50,
      'count' => -49,
      'display' => -48,
    ),
    'sort_order' => array(
      'active' => 3,
      'count' => 3,
      'display' => 4,
    ),
    'empty_behavior' => 'none',
    'soft_limit' => 20,
    'nofollow' => 1,
    'show_expanded' => 0,
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_object_classification'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_object_collection';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_object_collection';
  $facet->enabled = TRUE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
    ),
    'sort_weight' => array(
      'active' => -50,
      'count' => -49,
      'display' => -48,
    ),
    'sort_order' => array(
      'active' => 3,
      'count' => 3,
      'display' => 4,
    ),
    'empty_behavior' => 'none',
    'soft_limit' => 20,
    'nofollow' => 1,
    'show_expanded' => 0,
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_object_collection'] = $facet;

  $facet = new stdClass();
  $facet->disabled = FALSE; /* Edit this to true to make a default facet disabled initially */
  $facet->api_version = 1;
  $facet->name = 'search_api@internal_search_index_nodes:block:field_object_story_events:field_object_creation_date';
  $facet->searcher = 'search_api@internal_search_index_nodes';
  $facet->realm = 'block';
  $facet->facet = 'field_object_story_events:field_object_creation_date';
  $facet->enabled = FALSE;
  $facet->settings = array(
    'weight' => 0,
    'widget' => 'facetapi_links',
    'filters' => array(),
    'active_sorts' => array(
      'active' => 'active',
      'count' => 'count',
      'display' => 'display',
    ),
    'sort_weight' => array(
      'active' => -50,
      'count' => -49,
      'display' => -48,
    ),
    'sort_order' => array(
      'active' => 3,
      'count' => 3,
      'display' => 4,
    ),
    'empty_behavior' => 'none',
    'soft_limit' => 20,
    'nofollow' => 1,
    'show_expanded' => 0,
  );
  $export['search_api@internal_search_index_nodes:block:field_object_story_events:field_object_creation_date'] = $facet;

  return $export;
}

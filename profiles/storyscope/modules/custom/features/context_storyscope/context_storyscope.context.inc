<?php
/**
 * @file
 * context_storyscope.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_storyscope_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'global_context';
  $context->description = '';
  $context->tag = '';
  $context->conditions = array(
    'sitewide' => array(
      'values' => array(
        1 => 1,
      ),
    ),
  );
  $context->reactions = array();
  $context->condition_mode = 0;
  $export['global_context'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'non_facet_search';
  $context->description = '';
  $context->tag = '';
  $context->conditions = array(
    'context' => array(
      'values' => array(
        '~facet_search_addexisting_events' => '~facet_search_addexisting_events',
        '~facet_search_dossier_addexisting_objectstories' => '~facet_search_dossier_addexisting_objectstories',
        '~facet_search_object_story_addexisting_objects' => '~facet_search_object_story_addexisting_objects',
      ),
    ),
    'sitewide' => array(
      'values' => array(
        1 => 1,
      ),
    ),
  );
  $context->reactions = array();
  $context->condition_mode = 1;
  $export['non_facet_search'] = $context;

  return $export;
}

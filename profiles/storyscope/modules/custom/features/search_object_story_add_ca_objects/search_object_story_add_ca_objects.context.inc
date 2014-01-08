<?php
/**
 * @file
 * search_object_story_add_ca_objects.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function search_object_story_add_ca_objects_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'search_object_story_add_ca_objects';
  $context->description = 'Search blocks on CA for objectstories/*/objects/search';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/objectstories/*/objects/search/external-ca' => 'dossiers/*/objectstories/*/objects/search/external-ca',
        'dossiers/*/objects/search/external-ca' => 'dossiers/*/objects/search/external-ca',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views--exp-ca_search-external_ca' => array(
          'module' => 'views',
          'delta' => '-exp-ca_search-external_ca',
          'region' => 'sidebar_second',
          'weight' => '-10',
        ),
        'facetapi-NqZKSnZgAm03B1LXj6mi6lURzNfn7eYo' => array(
          'module' => 'facetapi',
          'delta' => 'NqZKSnZgAm03B1LXj6mi6lURzNfn7eYo',
          'region' => 'sidebar_second',
          'weight' => '-9',
        ),
        'facetapi-fDQub3zJy31GGOhK1d0Obw1tcEA0s9Yn' => array(
          'module' => 'facetapi',
          'delta' => 'fDQub3zJy31GGOhK1d0Obw1tcEA0s9Yn',
          'region' => 'sidebar_second',
          'weight' => '-8',
        ),
        'facetapi-OElve1g5A8M00bruUTQDuxoQGLdCJMHZ' => array(
          'module' => 'facetapi',
          'delta' => 'OElve1g5A8M00bruUTQDuxoQGLdCJMHZ',
          'region' => 'sidebar_second',
          'weight' => '-7',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Search blocks on CA for objectstories/*/objects/search');
  $export['search_object_story_add_ca_objects'] = $context;

  return $export;
}

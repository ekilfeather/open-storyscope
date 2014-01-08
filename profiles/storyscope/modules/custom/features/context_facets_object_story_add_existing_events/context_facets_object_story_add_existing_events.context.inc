<?php
/**
 * @file
 * context_facets_object_story_add_existing_events.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_facets_object_story_add_existing_events_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'facet_search_object_story_addexisting_events';
  $context->description = 'Facet search blocks on event properties';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/objectstories/*/events/search/internal' => 'dossiers/*/objectstories/*/events/search/internal',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-2d7119b63ec4c8565a4a64e4c785258c' => array(
          'module' => 'views',
          'delta' => '2d7119b63ec4c8565a4a64e4c785258c',
          'region' => 'sidebar_second',
          'weight' => '-10',
        ),
        'facetapi-xlNmgfzsvRZNkXsEFopB1jJxKFwjJLHp' => array(
          'module' => 'facetapi',
          'delta' => 'xlNmgfzsvRZNkXsEFopB1jJxKFwjJLHp',
          'region' => 'sidebar_second',
          'weight' => '-9',
        ),
        'facetapi-jekIDwxkxJLjQstgP766zZmFMZh4svkQ' => array(
          'module' => 'facetapi',
          'delta' => 'jekIDwxkxJLjQstgP766zZmFMZh4svkQ',
          'region' => 'sidebar_second',
          'weight' => '-8',
        ),
        'facetapi-cpwXwRahXdFJNUznMritPNWBj9hRUBOF' => array(
          'module' => 'facetapi',
          'delta' => 'cpwXwRahXdFJNUznMritPNWBj9hRUBOF',
          'region' => 'sidebar_second',
          'weight' => '-7',
        ),
        'facetapi-IR0Nd5EmbwNi1SSFu51Ml08wYeZjH7gv' => array(
          'module' => 'facetapi',
          'delta' => 'IR0Nd5EmbwNi1SSFu51Ml08wYeZjH7gv',
          'region' => 'sidebar_second',
          'weight' => '-6',
        ),
        'facetapi-f2gE10gGQPFFduYkUiTW2SjeHUQTGJ9F' => array(
          'module' => 'facetapi',
          'delta' => 'f2gE10gGQPFFduYkUiTW2SjeHUQTGJ9F',
          'region' => 'sidebar_second',
          'weight' => '-5',
        ),
        'facetapi-i8VhkJwxsPKo4fDelgdfLFx12ZY86rv2' => array(
          'module' => 'facetapi',
          'delta' => 'i8VhkJwxsPKo4fDelgdfLFx12ZY86rv2',
          'region' => 'sidebar_second',
          'weight' => '-4',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Facet search blocks on event properties');
  $export['facet_search_object_story_addexisting_events'] = $context;

  return $export;
}

<?php
/**
 * @file
 * context_facets_add_existing_events.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_facets_add_existing_events_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'facet_search_addexisting_events';
  $context->description = 'Facet search blocks on event properties';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/events/addexisting' => 'dossiers/*/events/addexisting',
        'dossiers/*/events/search' => 'dossiers/*/events/search',
        'dossiers/*/events/search/timeline' => 'dossiers/*/events/search/timeline',
        'dossiers/*/events/search/internal' => 'dossiers/*/events/search/internal',
        '~dossiers/*/objectstories/*/events/search/internal' => '~dossiers/*/objectstories/*/events/search/internal',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-bc2b7da5373c1e59a4b20a1a58fbfbe4' => array(
          'module' => 'views',
          'delta' => 'bc2b7da5373c1e59a4b20a1a58fbfbe4',
          'region' => 'sidebar_second',
          'weight' => '-34',
        ),
        'facetapi-IR0Nd5EmbwNi1SSFu51Ml08wYeZjH7gv' => array(
          'module' => 'facetapi',
          'delta' => 'IR0Nd5EmbwNi1SSFu51Ml08wYeZjH7gv',
          'region' => 'sidebar_second',
          'weight' => '-32',
        ),
        'facetapi-OB1v3wq2ay1zdMhy8YJdyF1sNFYqGatB' => array(
          'module' => 'facetapi',
          'delta' => 'OB1v3wq2ay1zdMhy8YJdyF1sNFYqGatB',
          'region' => 'sidebar_second',
          'weight' => '-7',
        ),
        'facetapi-Xr0qM4EX0QnMK6tBNMyv6XmViXnWiAbb' => array(
          'module' => 'facetapi',
          'delta' => 'Xr0qM4EX0QnMK6tBNMyv6XmViXnWiAbb',
          'region' => 'sidebar_second',
          'weight' => '-6',
        ),
        'facetapi-cTlM1rYewLoSf10bCZSy0oe6NKNzSOqI' => array(
          'module' => 'facetapi',
          'delta' => 'cTlM1rYewLoSf10bCZSy0oe6NKNzSOqI',
          'region' => 'sidebar_second',
          'weight' => '-5',
        ),
        'facetapi-sun0GgvLJk3NY4mOEzXhulYqNPnGe1qX' => array(
          'module' => 'facetapi',
          'delta' => 'sun0GgvLJk3NY4mOEzXhulYqNPnGe1qX',
          'region' => 'sidebar_second',
          'weight' => '-4',
        ),
        'facetapi-XzN18e25zpl0GUJBm76VemD3EmlbHtnw' => array(
          'module' => 'facetapi',
          'delta' => 'XzN18e25zpl0GUJBm76VemD3EmlbHtnw',
          'region' => 'sidebar_second',
          'weight' => '-3',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Facet search blocks on event properties');
  $export['facet_search_addexisting_events'] = $context;

  return $export;
}

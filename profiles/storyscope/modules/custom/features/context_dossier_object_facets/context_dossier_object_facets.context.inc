<?php
/**
 * @file
 * context_dossier_object_facets.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_dossier_object_facets_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'facet_search_dossier_objects';
  $context->description = 'Places facets for dossier object search /dossiers/%/objects';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/objects' => 'dossiers/*/objects',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-fb2069643f6d6019651c5c8fe63ae573' => array(
          'module' => 'views',
          'delta' => 'fb2069643f6d6019651c5c8fe63ae573',
          'region' => 'sidebar_second',
          'weight' => '-49',
        ),
        'facetapi-tKx9OkrfgDWcaf0M9H88tEVwZka4oIEO' => array(
          'module' => 'facetapi',
          'delta' => 'tKx9OkrfgDWcaf0M9H88tEVwZka4oIEO',
          'region' => 'sidebar_second',
          'weight' => '-48',
        ),
        'facetapi-OB1v3wq2ay1zdMhy8YJdyF1sNFYqGatB' => array(
          'module' => 'facetapi',
          'delta' => 'OB1v3wq2ay1zdMhy8YJdyF1sNFYqGatB',
          'region' => 'sidebar_second',
          'weight' => '-47',
        ),
        'facetapi-Xr0qM4EX0QnMK6tBNMyv6XmViXnWiAbb' => array(
          'module' => 'facetapi',
          'delta' => 'Xr0qM4EX0QnMK6tBNMyv6XmViXnWiAbb',
          'region' => 'sidebar_second',
          'weight' => '-46',
        ),
        'facetapi-gSWdewybqZVVYSBZQ3dgsBoxjv70s7NS' => array(
          'module' => 'facetapi',
          'delta' => 'gSWdewybqZVVYSBZQ3dgsBoxjv70s7NS',
          'region' => 'sidebar_second',
          'weight' => '-45',
        ),
        'facetapi-XzN18e25zpl0GUJBm76VemD3EmlbHtnw' => array(
          'module' => 'facetapi',
          'delta' => 'XzN18e25zpl0GUJBm76VemD3EmlbHtnw',
          'region' => 'sidebar_second',
          'weight' => '-44',
        ),
        'facetapi-cTlM1rYewLoSf10bCZSy0oe6NKNzSOqI' => array(
          'module' => 'facetapi',
          'delta' => 'cTlM1rYewLoSf10bCZSy0oe6NKNzSOqI',
          'region' => 'sidebar_second',
          'weight' => '-43',
        ),
        'facetapi-sun0GgvLJk3NY4mOEzXhulYqNPnGe1qX' => array(
          'module' => 'facetapi',
          'delta' => 'sun0GgvLJk3NY4mOEzXhulYqNPnGe1qX',
          'region' => 'sidebar_second',
          'weight' => '-42',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Places facets for dossier object search /dossiers/%/objects');
  $export['facet_search_dossier_objects'] = $context;

  return $export;
}

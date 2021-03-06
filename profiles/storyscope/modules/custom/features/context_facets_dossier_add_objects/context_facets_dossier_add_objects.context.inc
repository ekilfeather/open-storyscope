<?php
/**
 * @file
 * context_facets_dossier_add_objects.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_facets_dossier_add_objects_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'facet_search_dossier_addexisting_objects';
  $context->description = 'Facet search blocks on object properties for dossier/*/objects/search view';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/objects/search' => 'dossiers/*/objects/search',
        'dossiers/*/objects/search/internal' => 'dossiers/*/objects/search/internal',
        '~dossiers/*/objectstories/*/objects/search' => '~dossiers/*/objectstories/*/objects/search',
        '~dossiers/*/objectstories/*/objects/search/internal' => '~dossiers/*/objectstories/*/objects/search/internal',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-c06ad29535f492bb9491825710e74ddb' => array(
          'module' => 'views',
          'delta' => 'c06ad29535f492bb9491825710e74ddb',
          'region' => 'sidebar_second',
          'weight' => '-10',
        ),
        'facetapi-CTr0nc3Z0hXlrMIUXoSLcSHoIo8xT3pu' => array(
          'module' => 'facetapi',
          'delta' => 'CTr0nc3Z0hXlrMIUXoSLcSHoIo8xT3pu',
          'region' => 'sidebar_second',
          'weight' => '-8',
        ),
        'facetapi-5vTV3M0THDjZ9xoGHCGLzwjah0NJ0u6D' => array(
          'module' => 'facetapi',
          'delta' => '5vTV3M0THDjZ9xoGHCGLzwjah0NJ0u6D',
          'region' => 'sidebar_second',
          'weight' => '-7',
        ),
        'facetapi-tKx9OkrfgDWcaf0M9H88tEVwZka4oIEO' => array(
          'module' => 'facetapi',
          'delta' => 'tKx9OkrfgDWcaf0M9H88tEVwZka4oIEO',
          'region' => 'sidebar_second',
          'weight' => '-6',
        ),
        'facetapi-OB1v3wq2ay1zdMhy8YJdyF1sNFYqGatB' => array(
          'module' => 'facetapi',
          'delta' => 'OB1v3wq2ay1zdMhy8YJdyF1sNFYqGatB',
          'region' => 'sidebar_second',
          'weight' => '-5',
        ),
        'facetapi-Xr0qM4EX0QnMK6tBNMyv6XmViXnWiAbb' => array(
          'module' => 'facetapi',
          'delta' => 'Xr0qM4EX0QnMK6tBNMyv6XmViXnWiAbb',
          'region' => 'sidebar_second',
          'weight' => '-4',
        ),
        'facetapi-gSWdewybqZVVYSBZQ3dgsBoxjv70s7NS' => array(
          'module' => 'facetapi',
          'delta' => 'gSWdewybqZVVYSBZQ3dgsBoxjv70s7NS',
          'region' => 'sidebar_second',
          'weight' => '-3',
        ),
        'facetapi-XzN18e25zpl0GUJBm76VemD3EmlbHtnw' => array(
          'module' => 'facetapi',
          'delta' => 'XzN18e25zpl0GUJBm76VemD3EmlbHtnw',
          'region' => 'sidebar_second',
          'weight' => '-2',
        ),
        'facetapi-cTlM1rYewLoSf10bCZSy0oe6NKNzSOqI' => array(
          'module' => 'facetapi',
          'delta' => 'cTlM1rYewLoSf10bCZSy0oe6NKNzSOqI',
          'region' => 'sidebar_second',
          'weight' => '-1',
        ),
        'facetapi-sun0GgvLJk3NY4mOEzXhulYqNPnGe1qX' => array(
          'module' => 'facetapi',
          'delta' => 'sun0GgvLJk3NY4mOEzXhulYqNPnGe1qX',
          'region' => 'sidebar_second',
          'weight' => '0',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Facet search blocks on object properties for dossier/*/objects/search view');
  $export['facet_search_dossier_addexisting_objects'] = $context;

  return $export;
}

<?php
/**
 * @file
 * context_facets_add_existing_objectstories.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_facets_add_existing_objectstories_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'facet_search_dossier_addexisting_objectstories';
  $context->description = 'Facet search blocks on an object story\'s event properties ';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/objectstories/addexisting' => 'dossiers/*/objectstories/addexisting',
        'dossiers/*/objectstories/search' => 'dossiers/*/objectstories/search',
        'dossiers/*/objectstories/search/internal' => 'dossiers/*/objectstories/search/internal',
        'objectstories' => 'objectstories',
        'dossiers/*/objectstories-search-api' => 'dossiers/*/objectstories-search-api',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-2fd4b6dd3c916ed060893347ae375581' => array(
          'module' => 'views',
          'delta' => '2fd4b6dd3c916ed060893347ae375581',
          'region' => 'sidebar_second',
          'weight' => '-9',
        ),
        'facetapi-t9eSg53wxMkWFgSOCKx9tzNIZmERK2AO' => array(
          'module' => 'facetapi',
          'delta' => 't9eSg53wxMkWFgSOCKx9tzNIZmERK2AO',
          'region' => 'sidebar_second',
          'weight' => '-8',
        ),
        'facetapi-3RmnRcdFwkXppqO5HaNsln8jROPLIpX2' => array(
          'module' => 'facetapi',
          'delta' => '3RmnRcdFwkXppqO5HaNsln8jROPLIpX2',
          'region' => 'sidebar_second',
          'weight' => '-7',
        ),
        'facetapi-x9pQGfuzOSDLygfp5eyWahyYwHb2d0ke' => array(
          'module' => 'facetapi',
          'delta' => 'x9pQGfuzOSDLygfp5eyWahyYwHb2d0ke',
          'region' => 'sidebar_second',
          'weight' => '2',
        ),
        'facetapi-DsC4HEF8Q8rrnQZ1UnZLbwofSppV5QQ9' => array(
          'module' => 'facetapi',
          'delta' => 'DsC4HEF8Q8rrnQZ1UnZLbwofSppV5QQ9',
          'region' => 'sidebar_second',
          'weight' => '3',
        ),
        'facetapi-U4WYveosVwqG6E8AAy3t0B6wh9FDUN1c' => array(
          'module' => 'facetapi',
          'delta' => 'U4WYveosVwqG6E8AAy3t0B6wh9FDUN1c',
          'region' => 'sidebar_second',
          'weight' => '4',
        ),
        'facetapi-gSWdewybqZVVYSBZQ3dgsBoxjv70s7NS' => array(
          'module' => 'facetapi',
          'delta' => 'gSWdewybqZVVYSBZQ3dgsBoxjv70s7NS',
          'region' => 'sidebar_second',
          'weight' => '5',
        ),
        'facetapi-XzN18e25zpl0GUJBm76VemD3EmlbHtnw' => array(
          'module' => 'facetapi',
          'delta' => 'XzN18e25zpl0GUJBm76VemD3EmlbHtnw',
          'region' => 'sidebar_second',
          'weight' => '6',
        ),
        'facetapi-Xr0qM4EX0QnMK6tBNMyv6XmViXnWiAbb' => array(
          'module' => 'facetapi',
          'delta' => 'Xr0qM4EX0QnMK6tBNMyv6XmViXnWiAbb',
          'region' => 'sidebar_second',
          'weight' => '7',
        ),
        'facetapi-OB1v3wq2ay1zdMhy8YJdyF1sNFYqGatB' => array(
          'module' => 'facetapi',
          'delta' => 'OB1v3wq2ay1zdMhy8YJdyF1sNFYqGatB',
          'region' => 'sidebar_second',
          'weight' => '8',
        ),
        'facetapi-sun0GgvLJk3NY4mOEzXhulYqNPnGe1qX' => array(
          'module' => 'facetapi',
          'delta' => 'sun0GgvLJk3NY4mOEzXhulYqNPnGe1qX',
          'region' => 'sidebar_second',
          'weight' => '9',
        ),
        'facetapi-cTlM1rYewLoSf10bCZSy0oe6NKNzSOqI' => array(
          'module' => 'facetapi',
          'delta' => 'cTlM1rYewLoSf10bCZSy0oe6NKNzSOqI',
          'region' => 'sidebar_second',
          'weight' => '10',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Facet search blocks on an object story\'s event properties ');
  $export['facet_search_dossier_addexisting_objectstories'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'facet_search_section_add_objectstories';
  $context->description = 'Facet search blocks on an object story\'s event properties ';
  $context->tag = '';
  $context->conditions = array(
    'node' => array(
      'values' => array(
        'section' => 'section',
      ),
      'options' => array(
        'node_form' => '0',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'facetapi-t9eSg53wxMkWFgSOCKx9tzNIZmERK2AO' => array(
          'module' => 'facetapi',
          'delta' => 't9eSg53wxMkWFgSOCKx9tzNIZmERK2AO',
          'region' => 'sidebar_second',
          'weight' => '-8',
        ),
        'facetapi-3RmnRcdFwkXppqO5HaNsln8jROPLIpX2' => array(
          'module' => 'facetapi',
          'delta' => '3RmnRcdFwkXppqO5HaNsln8jROPLIpX2',
          'region' => 'sidebar_second',
          'weight' => '-7',
        ),
        'facetapi-x9pQGfuzOSDLygfp5eyWahyYwHb2d0ke' => array(
          'module' => 'facetapi',
          'delta' => 'x9pQGfuzOSDLygfp5eyWahyYwHb2d0ke',
          'region' => 'sidebar_second',
          'weight' => '2',
        ),
        'facetapi-DsC4HEF8Q8rrnQZ1UnZLbwofSppV5QQ9' => array(
          'module' => 'facetapi',
          'delta' => 'DsC4HEF8Q8rrnQZ1UnZLbwofSppV5QQ9',
          'region' => 'sidebar_second',
          'weight' => '3',
        ),
        'facetapi-U4WYveosVwqG6E8AAy3t0B6wh9FDUN1c' => array(
          'module' => 'facetapi',
          'delta' => 'U4WYveosVwqG6E8AAy3t0B6wh9FDUN1c',
          'region' => 'sidebar_second',
          'weight' => '4',
        ),
        'facetapi-gSWdewybqZVVYSBZQ3dgsBoxjv70s7NS' => array(
          'module' => 'facetapi',
          'delta' => 'gSWdewybqZVVYSBZQ3dgsBoxjv70s7NS',
          'region' => 'sidebar_second',
          'weight' => '5',
        ),
        'facetapi-XzN18e25zpl0GUJBm76VemD3EmlbHtnw' => array(
          'module' => 'facetapi',
          'delta' => 'XzN18e25zpl0GUJBm76VemD3EmlbHtnw',
          'region' => 'sidebar_second',
          'weight' => '6',
        ),
        'facetapi-Xr0qM4EX0QnMK6tBNMyv6XmViXnWiAbb' => array(
          'module' => 'facetapi',
          'delta' => 'Xr0qM4EX0QnMK6tBNMyv6XmViXnWiAbb',
          'region' => 'sidebar_second',
          'weight' => '7',
        ),
        'facetapi-OB1v3wq2ay1zdMhy8YJdyF1sNFYqGatB' => array(
          'module' => 'facetapi',
          'delta' => 'OB1v3wq2ay1zdMhy8YJdyF1sNFYqGatB',
          'region' => 'sidebar_second',
          'weight' => '8',
        ),
        'facetapi-sun0GgvLJk3NY4mOEzXhulYqNPnGe1qX' => array(
          'module' => 'facetapi',
          'delta' => 'sun0GgvLJk3NY4mOEzXhulYqNPnGe1qX',
          'region' => 'sidebar_second',
          'weight' => '9',
        ),
        'facetapi-cTlM1rYewLoSf10bCZSy0oe6NKNzSOqI' => array(
          'module' => 'facetapi',
          'delta' => 'cTlM1rYewLoSf10bCZSy0oe6NKNzSOqI',
          'region' => 'sidebar_second',
          'weight' => '10',
        ),
        'views-0187193162bdbb9824edab3d2bd55570' => array(
          'module' => 'views',
          'delta' => '0187193162bdbb9824edab3d2bd55570',
          'region' => 'sidebar_second',
          'weight' => '-9',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Facet search blocks on an object story\'s event properties ');
  $export['facet_search_section_add_objectstories'] = $context;

  return $export;
}

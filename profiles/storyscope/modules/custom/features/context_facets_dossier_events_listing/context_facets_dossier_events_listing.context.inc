<?php
/**
 * @file
 * context_facets_dossier_events_listing.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_facets_dossier_events_listing_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'dossier_events_text_search_filter_grid';
  $context->description = 'Places full text search block for dossier events grid view';
  $context->tag = '';
  $context->conditions = array(
    'views' => array(
      'values' => array(
        'dossier_events_search_api:dossier_events_page' => 'dossier_events_search_api:dossier_events_page',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-374bade242c96b4558b0187aaaf11973' => array(
          'module' => 'views',
          'delta' => '374bade242c96b4558b0187aaaf11973',
          'region' => 'sidebar_second',
          'weight' => '-10',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Places full text search block for dossier events grid view');
  $export['dossier_events_text_search_filter_grid'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'dossier_events_text_search_filter_map';
  $context->description = 'Places full text search block for dossier events map view';
  $context->tag = '';
  $context->conditions = array(
    'views' => array(
      'values' => array(
        'dossier_events_search_api:map_page' => 'dossier_events_search_api:map_page',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-a870b6d6040ea10a7c5ffc3484715e4d' => array(
          'module' => 'views',
          'delta' => 'a870b6d6040ea10a7c5ffc3484715e4d',
          'region' => 'sidebar_second',
          'weight' => '-8',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Places full text search block for dossier events map view');
  $export['dossier_events_text_search_filter_map'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'dossier_events_text_search_filter_timeline';
  $context->description = 'Places full text search block for dossier events timeline view';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/events/timeline' => 'dossiers/*/events/timeline',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-e87e86e660c1a0b82f33f4af51471dc7' => array(
          'module' => 'views',
          'delta' => 'e87e86e660c1a0b82f33f4af51471dc7',
          'region' => 'sidebar_second',
          'weight' => '-9',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Places full text search block for dossier events timeline view');
  $export['dossier_events_text_search_filter_timeline'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'facet_search_dossier_events_listing';
  $context->description = 'Facet search blocks of a dossiers event properties ';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/events' => 'dossiers/*/events',
        'dossiers/*/events/grid' => 'dossiers/*/events/grid',
        'dossiers/*/events/timeline' => 'dossiers/*/events/timeline',
        'dossiers/*/events/map' => 'dossiers/*/events/map',
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
          'weight' => '-9',
        ),
        'facetapi-3RmnRcdFwkXppqO5HaNsln8jROPLIpX2' => array(
          'module' => 'facetapi',
          'delta' => '3RmnRcdFwkXppqO5HaNsln8jROPLIpX2',
          'region' => 'sidebar_second',
          'weight' => '-8',
        ),
        'facetapi-x9pQGfuzOSDLygfp5eyWahyYwHb2d0ke' => array(
          'module' => 'facetapi',
          'delta' => 'x9pQGfuzOSDLygfp5eyWahyYwHb2d0ke',
          'region' => 'sidebar_second',
          'weight' => '-7',
        ),
        'facetapi-DsC4HEF8Q8rrnQZ1UnZLbwofSppV5QQ9' => array(
          'module' => 'facetapi',
          'delta' => 'DsC4HEF8Q8rrnQZ1UnZLbwofSppV5QQ9',
          'region' => 'sidebar_second',
          'weight' => '-6',
        ),
        'facetapi-U4WYveosVwqG6E8AAy3t0B6wh9FDUN1c' => array(
          'module' => 'facetapi',
          'delta' => 'U4WYveosVwqG6E8AAy3t0B6wh9FDUN1c',
          'region' => 'sidebar_second',
          'weight' => '-5',
        ),
        'facetapi-OB1v3wq2ay1zdMhy8YJdyF1sNFYqGatB' => array(
          'module' => 'facetapi',
          'delta' => 'OB1v3wq2ay1zdMhy8YJdyF1sNFYqGatB',
          'region' => 'sidebar_second',
          'weight' => '-4',
        ),
        'facetapi-Xr0qM4EX0QnMK6tBNMyv6XmViXnWiAbb' => array(
          'module' => 'facetapi',
          'delta' => 'Xr0qM4EX0QnMK6tBNMyv6XmViXnWiAbb',
          'region' => 'sidebar_second',
          'weight' => '-3',
        ),
        'facetapi-cTlM1rYewLoSf10bCZSy0oe6NKNzSOqI' => array(
          'module' => 'facetapi',
          'delta' => 'cTlM1rYewLoSf10bCZSy0oe6NKNzSOqI',
          'region' => 'sidebar_second',
          'weight' => '-2',
        ),
        'facetapi-sun0GgvLJk3NY4mOEzXhulYqNPnGe1qX' => array(
          'module' => 'facetapi',
          'delta' => 'sun0GgvLJk3NY4mOEzXhulYqNPnGe1qX',
          'region' => 'sidebar_second',
          'weight' => '-1',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Facet search blocks of a dossiers event properties ');
  $export['facet_search_dossier_events_listing'] = $context;

  return $export;
}

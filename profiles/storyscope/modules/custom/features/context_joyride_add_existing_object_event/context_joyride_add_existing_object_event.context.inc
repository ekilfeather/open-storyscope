<?php
/**
 * @file
 * context_joyride_add_existing_object_event.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_joyride_add_existing_object_event_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_dossier_add_existing_event';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/events/search/internal' => 'dossiers/*/events/search/internal',
        '~objectstories*' => '~objectstories*',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Add an Event to your Dossier</h2>
  <p>Here you will find all Events that are currently available in Storyscope. You can browse through the Events, or use a keyword search or the filters to refine the display of Events. If you cannot find an Event you need, you can create a new Event by clicking the button at the bottom of the page. </p>
</li>
<li data-id="views-exposed-form-dossier-events-add-existing-search-api-page-add-event-search-internal" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Search</h2>
  <p>Search existing Events from within the Dossier. </p>
</li>
<li data-class="block-facetapi.contextual-links-region h2" data-text="Next" class="custom" data-options="tipAnimation:fade;tipLocation:top">
  <h2>Facets</h2>
  <p>Narrow down the selection of existing Events using facets. Facet values are ordered alphabetically </p>
</li>
<li data-class="facetapi-limit-link" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Expand Facets</h2>
  <p>By default you only see the first five facet values, expand to see up to fifty facet values at once by clicking on this link. </p>
</li>
<li data-class="add-event a" data-text="Next" class="custom-right" data-options="tipAnimation:fade;tipLocation:right">
  <h2>Add</h2>
  <p>Once you have decided upon an Event, use this link to add it to the Dossier. </p>
</li>
<li data-class="button" data-text="Next" class="custom-left" data-options="tipAnimation:fade;tipLocation:left">
  <h2>Create New</h2>
  <p>Or else create your own brand new Event.</p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_dossier_add_existing_event'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_objectstory_add_existing_event';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/objectstories/*/events/search/internal' => 'dossiers/*/objectstories/*/events/search/internal',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Add an Event to your Story</h2>
  <p>You can either add an existing Event from below, using the search box and filters in the right hand column to narrow down your choice, or create you own new Event.</p>
</li>
<li data-id="views-exposed-form-object-story-events-add-existing-search-api-page-add-event-dossier-context-internal" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Search</h2>
  <p>Search from existing Events within the Dossier. </p>
</li>
<li data-class="block-facetapi.contextual-links-region h2" data-text="Next" class="custom" data-options="tipAnimation:fade;tipLocation:top">
  <h2>Facets</h2>
  <p>Narrow down the selection of existing Events using facets. Facet values are ordered alphabetically </p>
</li>
<li data-class="facetapi-limit-link" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Expand Facets</h2>
  <p>By default you only see the first five facet values, expand to see up to fifty facet values at once by clicking this link. </p>
</li>
<li data-class="suggest" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Add</h2>
  <p>Once you have decided upon an Event, use this link to add it to the Dossier. </p>
</li>
<li data-class="button" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Create New</h2>
  <p>Or else create your own brand new Event.</p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_objectstory_add_existing_event'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_objectstory_add_existing_object';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/objectstories/*/objects/search/internal' => 'dossiers/*/objectstories/*/objects/search/internal',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Add an Object to your Story</h2>
  <p>You can either add an existing Object from below, using the search box and filters in the right hand column to narrow down your choice, or create you own new Object.</p>
</li>
<li data-id="views-exposed-form-object-story-objects-add-existing-search-api-page-add-object-dossier-context-internal" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Search</h2>
  <p>Search existing Objects from within your Dossier. </p>
</li>
<li data-class="block-facetapi.contextual-links-region h2" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Facets</h2>
  <p>Narrow down the selection of existing Objects using facets. Facet values are ordered alphabetically </p>
</li>
<li data-class="facetapi-limit-link" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Expand Facets</h2>
  <p>By default you only see the first five facet values, expand to see up to fifty facet values at once by clicking this link. </p>
</li>
<li data-class="add-event a" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Add</h2>
  <p>Once you have decided upon an Object, use this link to add it to your Dossier. </p>
</li>
<li data-class="button" data-text="Close" class="custom-left" data-options="tipAnimation:fade;tipLocation:left">
  <h2>Create New</h2>
  <p>Or else create your own brand new Object.</p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_objectstory_add_existing_object'] = $context;

  return $export;
}

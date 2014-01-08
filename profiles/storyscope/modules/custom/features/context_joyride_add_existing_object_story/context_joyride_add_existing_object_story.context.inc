<?php
/**
 * @file
 * context_joyride_add_existing_object_story.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_joyride_add_existing_object_story_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_add_existing_object_story';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/objectstories/search/internal' => 'dossiers/*/objectstories/search/internal',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Add a Story to your Dossier</h2>
  <p>You can either add an existing  Story from below, or create a new Story.</p>
</li>
<li data-id="views-exposed-form-dossier-object-stories-add-existing-search-api-page-add-object-story-internal" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Search</h2>
  <p>Search existing Stories from within your Dossier. </p>
</li>
<li data-class="facetapi-limit-link" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Facets</h2>
  <p>Search existing Stories using facets. Click on Show more to see the full list of facet values</p>
</li>
<li data-class="add-event a" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Add</h2>
  <p>Once you have decided upon your Story use this link to add it to your Dossier. </p>
</li>
<li data-class="button" data-text="Close" class="custom-left" data-options="tipAnimation:fade;tipLocation:left">
  <h2>Create New</h2>
  <p>Or else create your own brand new Story.</p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_add_existing_object_story'] = $context;

  return $export;
}

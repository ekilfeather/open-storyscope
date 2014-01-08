<?php
/**
 * @file
 * context_joyride_story_create.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_joyride_story_create_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_story_create';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/stories/add' => 'dossiers/*/stories/add',
        '~*sections*' => '~*sections*',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-id="edit-title" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Title</h2>
  <p>The title of your Story should be concise and clear. It should express the central idea of your Story. </p>
</li>
<li data-class="form-textarea-wrapper" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Description</h2>
  <p>Provide other users with a brief summary of your Story here. </p>
</li>
<li data-class="form-submit" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Save</h2>
  <p>Don\'t forget to hit save before you leave the page. </p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_story_create'] = $context;

  return $export;
}

<?php
/**
 * @file
 * context_story_output.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_story_output_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'section_web_output';
  $context->description = '';
  $context->tag = 'output';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/stories/*/sections/*/output' => 'dossiers/*/stories/*/sections/*/output',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'storyscope_story-microsite_dossier_links' => array(
          'module' => 'storyscope_story',
          'delta' => 'microsite_dossier_links',
          'region' => 'content',
          'weight' => '-52',
        ),
        'views-story_sections-block_1' => array(
          'module' => 'views',
          'delta' => 'story_sections-block_1',
          'region' => 'content',
          'weight' => '-51',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('output');
  $export['section_web_output'] = $context;

  return $export;
}

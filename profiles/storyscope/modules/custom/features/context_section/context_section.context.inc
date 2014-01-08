<?php
/**
 * @file
 * context_section.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_section_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'section';
  $context->description = 'Sets pager on Section pages';
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
        'storyscope_story-story_section_pager' => array(
          'module' => 'storyscope_story',
          'delta' => 'story_section_pager',
          'region' => 'highlighted',
          'weight' => '-10',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Sets pager on Section pages');
  $export['section'] = $context;

  return $export;
}

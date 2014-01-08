<?php
/**
 * @file
 * context_joyride_front.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_joyride_front_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_front';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        '<front>' => '<front>',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Dossier Overview</h2>
  <p>A Dossier is a container/folder in which to gather all of your research materials related to a single topic or project. It is your personal workspace, which you can choose to keep private, or to share with other Storyscope users. 
<br>
On this page you will find a listing of all the Dossiers available to you</p>
</li>
<li data-class="node-title" data-text="Next" class="custom" data-options="tipAnimation:pop">
  <p>Clicking on the title of a Dossier will bring you into its primary page. </p>
</li>
<li data-class="links .active" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Home</h2>
  <p>Clicking on this button at any point will bring you back to this page. </p>
</li>
<li data-class="button" data-text="Close" class="custom-left" data-options="tipAnimation:fade;tipLocation:left">
  <h2>Create</h2>
  <p>Click here to get started on creating your own Dossier. </p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_front'] = $context;

  return $export;
}

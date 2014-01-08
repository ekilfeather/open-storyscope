<?php
/**
 * @file
 * context_joyride_dossier_overview.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_joyride_dossier_overview_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_dossier_overview';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        '*dossier*' => '*dossier*',
        '~*event*' => '~*event*',
        '~*objectstories*' => '~*objectstories*',
        '~<front>' => '~<front>',
        '~*objects*' => '~*objects*',
        '~*references*' => '~*references*',
        '~*stories*' => '~*stories*',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 0,
      'joyride_play_once' => FALSE,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Dossier Overview</h2>
  <p>A Dossier is a container/folder in which to gather all of your research materials related to a single topic or project. It is your personal workspace, which you can choose to keep private, or to share with other Storyscope users. <br>A Dossier is made up of content of various types; Objects, Stories, Events, References and Narratives, which will be explained as we move down the page.</p>
</li>
<li data-id="addnew" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Add New</h2>
  <p>Here is where a user can begin to populate their own Dossier, or build up an existing Dossier with new content. </p>
</li>
<li data-id="suggestedresources" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Suggestions</h2>
  <p>These resources have been suggested to you because the system has analized all free text within this dossier and searched all content within the system to suggest possible resources for your approval. You can choose to use these suggestions or ignore them. </p>
</li>
<li data-button="Next" class="custom">
  <h2>Dossier Contents</h2>
  <p>From here on down the Dossier contents will be listed through groupings of content types, hit the view all button at the bottom right of any list to see the entire listing, with an added search box and the ability to filter results through facets.</p>
</li>
<li data-id="stories" data-text="Next" class="custom">
  <h2>Stories</h2>
  <p>A Story is about a particular Object. The story could relate to how the Object was made and by whom, what the Object represents, or what has happened to the Object since it was made. An Object can have multiple Stories. </p>
</li>
<li data-class="more-link a" data-text="Next" class="custom-left" data-options="tipAnimation:fade;tipLocation:left">
  <h2>View all</h2>
  <p>Click here to view a full listing of all the Stories in this Dossier. </p>
</li>
<li data-id="objects" data-text="Next" class="custom">
  <h2>Objects</h2>
  <p>An Object is an item/installation of cultural and/or historical significance. Each Object can have multiple Stories associated with it. </p>
</li>
<li data-id="events" data-text="Next" class="custom">
  <h2>Events</h2>
  <p>An Event is a situation, action, or occurrence that happens or takes place, especially something of importance. </p>
</li>
<li data-id="references" data-text="Next" class="custom">
  <h2>References</h2>
  <p>References are source materials, such as books, newspaper/journal articles, video/audio clips, which assist in building the Narrative. </p>
</li>
<li data-id="narratives" data-text="Next" class="custom">
  <h2>Narratives</h2>
  <p>A Narrative is what you want others to learn about your research. It is constructed from all the resources that you gather in your Dossier. Multiple SNarratives can be produced from a single Dossier, with each Narrative suiting a different audience, or approaching the research topic from a different point of view. You can decide the format in which you want to export your Narrative- a website or a PDF document for example. Narratives can be kept private, but are best when they are shared with others. </p>
</li>
<li data-class="node-story .content" data-text="Next" class="custom">
  <h2>View Microsite</h2>
  <p>Click on this link to see this Narrative transform into a plain HTML microsite. </p>
</li>
<li data-id="addnew" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Get Started</h2>
  <p>Here is a good place to start customising this Dossier to your own interests</p>
</li>
<li data-class="survey-link" data-text="Close" class="custom" data-options="tipAnimation:fade">
  <h2>Take our Survey</h2>
  <p>Please take our quick survey and let us know what you think of Storyscope</p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_dossier_overview'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_start_link';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        '<front>' => '<front>',
        'dossiers/*' => 'dossiers/*',
        'dossiers/*/events/add' => 'dossiers/*/events/add',
        'dossiers/*/events/search/internal' => 'dossiers/*/events/search/internal',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'joyride-joyride_start_link' => array(
          'module' => 'joyride',
          'delta' => 'joyride_start_link',
          'region' => 'header',
          'weight' => '-10',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_start_link'] = $context;

  return $export;
}

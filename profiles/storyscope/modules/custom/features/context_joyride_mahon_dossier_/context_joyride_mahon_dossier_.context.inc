<?php
/**
 * @file
 * context_joyride_mahon_dossier_.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_joyride_mahon_dossier__context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_mahon_dossier';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        '*dossier*' => '*dossier*',
        '~*event*' => '~*event*',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Dossier</h2>
  <p>A Dossier is a container/folder in which to gather all of your research materials related to a single topic or project. It is the user’s personal workspace, which they can choose to keep private, or to share with other Storyscope users.</p>
</li>
<li data-id="recentactivity" data-text="Next" class="custom" data-options="tipAnimation:pop">
  <h2>Activity</h2>
  <p>This section shows us the 4 most recent items to be added to this dossier, these can be of any content type; Objects, Object Stories, Events, References, and Story Outlines. </p>
 <p>These content types will be explained in greater detail as we move down the page. </p>
</li>
<li data-id="addnew" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Add New</h2>
  <p>Here is where a user can begin to populate their own dossier, or build up an existing dossier with new content of various types; Object Stories, Events, References, Story Outlines. </p>
</li>
<li data-id="suggestedresources" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Suggestions</h2>
  <p>These resources have been suggested to you because the system has analized all free text within this dossier and searched all content within the system to suggest possible resources for your approval. You can choose to use these suggestions or ignore them. </p>
</li>
<li data-button="Next" class="custom">
  <h2>Dossier</h2>
  <p>From here on down the dossier contents will be listed through groupings of content types, hit the view all button at the bottom right of any list to see the full story</p>
</li>
<li data-id="objectstories" data-text="Next" class="custom">
  <h2>Object Stories</h2>
  <p>An Object Story is a story about a particular Object. The story could relate to how the Object was made and by whom, what the Object represents, or what has happened to the Object since it was made. An Object can have multiple Object Stories. </p>
</li>
<li data-id="objects" data-text="Next" class="custom">
  <h2>Objects</h2>
  <p>An Object is an item/installation of cultural and/or historical significance. Each Object can have multiple Object Stories associated with it. </p>
</li>
<li data-id="events" data-text="Next" class="custom">
  <h2>Events</h2>
  <p>An Event is a situation, action, or occurrence that happens or takes place, especially something of importance. </p>
</li>
<li data-id="storyoutlines" data-text="Next" class="custom">
  <h2>Story Outlines</h2>
  <p>Users create Story Outlines from the contents of their Dossier. A Story Outline is the starting point of a Story; the rough plan for, or the skeleton of, the finished Story. Users create Story Outlines by identifying connections between Events and ordering them into an outline. </p>
</li>
<li data-id="references" data-text="Next" class="custom">
  <h2>References</h2>
  <p>References are source materials, such as books, newspaper/journal articles, video/audio clips, which assist in building the story. </p>
</li>
<li data-id="addnew" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Get Started</h2>
  <p>Here is a good place to start customising this dossier to your own interestes</p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_mahon_dossier'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_start_mahon_dossier';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'node' => array(
      'values' => array(
        'dossier' => 'dossier',
      ),
      'options' => array(
        'node_form' => '1',
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
  $export['joyride_start_mahon_dossier'] = $context;

  return $export;
}

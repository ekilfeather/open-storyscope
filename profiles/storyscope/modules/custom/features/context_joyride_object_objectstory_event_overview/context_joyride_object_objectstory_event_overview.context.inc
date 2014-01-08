<?php
/**
 * @file
 * context_joyride_object_objectstory_event_overview.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_joyride_object_objectstory_event_overview_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_event_overview';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/events/*' => 'dossiers/*/events/*',
        '~*search*' => '~*search*',
        '~*timeline' => '~*timeline',
        '~*grid' => '~*grid',
        '~*map' => '~*map',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Event</h2>
  <p>An Event is a situation, action, or occurrence that happens or takes place, especially something of importance.</p>
</li>
<li data-class="panel-pane.pane-custom.pane-1" data-text="Next" class="custom-right" data-options="tipAnimation:fade;tipLocation:right">
  <h2>Event Properties</h2>
  <p>An Event can be described by a number of Event Properties i.e. the ‘Who’, ‘What’, ‘When’, ‘Where’ and ‘How’ of an Event. These Event Properties allow the user to search and filter content efficiently, as well as to identify connections between disparate Objects. Event Properties also enable the system to suggest relevant new resources to the user.</p>
</li>
<li data-class="node.node-object .node-title" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Objects</h2>
  <p>Here is a listing of Objects which this event is attached to.</p>
</li>
<li data-class="node-object-story.node-teaser .node-title" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Object Stories</h2>
  <p>This event has been used to describe these Object Stories.</p>
</li>
<li data-class="tabs.primary" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Edit</h2>
  <p>If you have permission you can edit this object by hitting this tab.</p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_event_overview'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_object_overview';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/objectstories/*/objects/*' => 'dossiers/*/objectstories/*/objects/*',
        '~*search*' => '~*search*',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Object</h2>
  <p>An Object is an item/installation of cultural and/or historical significance. Each Object can have multiple Object Stories associated with it.</p>
</li>
<li data-class="pane-node-field-image" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Resources</h2>
  <p>Media Resources can include images and videos</p>
</li>
<li data-class="middle-2-1" data-text="Next" class="custom-right" data-options="tipAnimation:fade;tipLocation:right">
  <h2>Object information</h2>
  <p>An Object can be described by a number of Properties, such as creation date, classification, country of origin, materials, dimensions, current location, creator name. </p>
</li>
<li data-class="node-object-story.node-teaser .content" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Object Stories</h2>
  <p>Here you can see the Object Stories which this Object is attached to.</p>
</li>
<li data-class="node-event.node-teaser .content" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Events</h2>
  <p>An Event is a situation, action, or occurrence that happens or takes place, especially something of importance. Here you can find events which are attached to this Object story.</p>
</li>
<li data-class="tabs.primary" data-text="Close" class="custom" data-options="tipAnimation:fade">
  <h2>Edit</h2>
  <p>If you have permission you can edit this object by hitting this tab.</p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_object_overview'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_object_story_overview';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/objectstories/*' => 'dossiers/*/objectstories/*',
        '~*search*' => '~*search*',
        '~dossiers/*/objectstories/*/objects/*' => '~dossiers/*/objectstories/*/objects/*',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom modal">
  <h2>Object Story</h2>
  <p>An Object Story is a story about a particular Object. The story could relate to how the Object was made and by whom, what the Object represents, or what has happened to the Object since it was made. An Object can have multiple Object Stories.</p>
</li>
<li data-class="field-name-field-image" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Media Resources</h2>
  <p>Media Resources obtained from the attached Object, will display here, they can be images and video</p>
</li>
<li data-class="middle-2-1 .pane-entity-field-extra" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Description</h2>
  <p>This is the text of the Object Story and is added by a user, who is named below it. </p>
</li>
<li data-class="node-event.node-teaser" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Events</h2>
  <p>An Event is a situation, action, or occurrence that happens or takes place, especially something of importance. Here you can find events which are attached to this Object Story. If you have sufficient permissions, you may remove events from this Object Story by hitting the remove link.</p>
</li>
<li data-class="node-object.view-mode-thumbnail .node-title" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Object</h2>
  <p>An Object is an item/installation of cultural and/or historical significance. An Object Story can have only one Object, which is listed here. With sufficient permissions you can remove this Object by hitting the remove link.</p>
</li>
<li data-class="middle-2-2" data-text="Close" class="custom" data-options="tipAnimation:fade">
  <h2>Add a Resource</h2>
  <p>You can begin to add more Resources to flesh out this Object Story, these include an Object if one is not already attached, Events and References.</p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_object_story_overview'] = $context;

  return $export;
}

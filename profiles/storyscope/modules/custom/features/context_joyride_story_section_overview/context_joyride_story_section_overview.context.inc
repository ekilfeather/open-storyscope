<?php
/**
 * @file
 * context_joyride_story_section_overview.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_joyride_story_section_overview_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_story_overview';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/stories/*' => 'dossiers/*/stories/*',
        '~*sections*' => '~*sections*',
        '~*add' => '~*add',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Story</h2>
  <p>A Story is a way for you to output your work. A Story is made up of a title and description and a number of sections. When creating a new Story you simply entre a title and description (optional) hit save and then you will be brought to your first section. <br>This page is similar to a table of contents- it shows you the various Sections that you have added to your Story. </p>
</li>
<li data-class="tabs.primary" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>View/Edit</h2>
  <p>Clicking the Edit tag will allow you to edit the title and description of this story. </p>
</li>
<li data-class="button" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Re-order/Add new</h2>
  <p>Click Add new to create a new Section and hitting Re-order will allow you to drag and drop the sections to re-order them for output. </p>
</li>
<li data-class="article-inner" data-text="Close" class="custom" data-options="tipAnimation:fade">
  <h2>Section</h2>
  <p>Clicking on a Section title will bring you to a page where you can add new content to that Section and edit/re-order content. </p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_story_overview'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_story_section_edit';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/stories/*/sections/*/*/edit' => 'dossiers/*/stories/*/sections/*/*/edit',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Section - Write</h2>
  <p>Here you can edit the text you gathered, reorder the Objects and Object Stories, and provide an introductory paragraph to this Section if needed. You can also edit the Section title. The Events to the left are for reference as you write.</p>
</li>
<li data-class="tabs.primary" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Gather/Write</h2>
  <p>Clicking between Gather and Write allows you to switch between adding new content and editing content. </p>
</li>
<li data-class="node-object" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2> Chosen Object</h2>
  <p>Here is a list of the chosen objects for this section. </p>
</li>
<li data-class="pane-section-events-panel-pane-section-events .pane-title" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Associated Events</h2>
  <p>A listing of Associated Events listed in chronological order. These events are shown to help you compose your thoughts and inform your writing, they will not appear on the final output</p>
</li>
<li data-id="edit-title" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Title</h2>
  <p>Here you can edit the title. </p>
</li>
<li data-class="form-textarea-wrapper" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Interpretation</h2>
  <p>This is an optional text field which can be used to provide additional context to the Object Stories which follow, providing an introduction or overview of the Story.</p>
</li>
<li data-class="field-name-field-story-set-snapshot-os" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Object Story</h2>
  <p>You can change the order in which these Objects appear in your Story. Edit the text to make it more relevant to your Story.</p>
</li>
<li data-class="up-down .down-button" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Re-Order</h2>
  <p>Change the position of the content on the page</p>
</li>
<li data-id="edit-field-story-set-und-0-remove-button" data-text="Next" class="custom-right" data-options="tipAnimation:fade;tipLocation:left">
  <h2>Remove</h2>
  <p>Remove this content, you can always re-add it again from the Gather tab</p>
</li>
<li data-id="edit-actions" data-text="Close" class="custom" data-options="tipAnimation:fade">
  <h2>Save</h2>
  <p>Don\'t forget to save any changes</p>
</li>
',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_story_section_edit'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_story_section_overview';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/stories/*/sections/*' => 'dossiers/*/stories/*/sections/*',
        '~*edit*' => '~*edit*',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Section - Gather</h2>
  <p>Your Story is made up of Sections. Sections are like chapters in a book- they structure your Story. Each Section contains Objects, Object Stories and Events. 
<br>On this page you can access all the resources in your Dossier and select the material you would like to use in your final Story.  Click on an Object to select its associated Object Stories.  Add Events, which will assist in writing this Story Section.  All material added to your Section from the Gather page can be viewed and used when in the Write page.</p>
</li>
<li data-class="story-section-pager" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Sections overview</h2>
  <p>Click between Sections here. </p>
</li>
<li data-class="story-section-pager li.last" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Add new</h2>
  <p>Click here to add a new Section to your Story. You can add as many Sections as you need to tell your Story. </p>
</li>
<li data-class="title" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Title</h2>
  <p>Each Section should have a title. The title should express they key point of the Section. To add a title click on the Write tab. </p>
</li>
<li data-class="tabs.primary" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Gather/Write</h2>
  <p>Clicking between Gather and Write allows you to switch between adding new content and editing content. </p>
</li>
<li data-class="view-content" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Choose an Object</h2>
  <p>Use the arrows to find Objects you would like to work with.  Click on an Object if you would like to view its associated Object Stories. By clicking on Add, you can add useful Object Stories and their Associated Objects and Events to the Section.  </p>
</li>
<li data-class="expand" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Show more</h2>
  <p>Clicking this link will reveal the rest of the text in this Object Story, plus associated Events. </p>
</li>
<li data-class="pane-dossier-events-search-api-dossier-events-pane .pane-title" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Dossier Events</h2>
  <p>You can add more Events to your Section to provide extra context for your selected Objects.</p>
</li>
<li data-class="add-event a" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Add</h2>
  <p>Clicking this link will add this Object Story plus its associated Events to the write page. Once and Object Story is added this link will change to [added] to indicate that it now exists on the write tab and can only be removed from there. </p>
</li>
<li data-class="tabs.primary li a" data-text="Close" class="custom" data-options="tipAnimation:fade">
  <h2>Gather/Write</h2>
  <p>Once you are finished gathering it\'s time to start writing, click on the Write tab to begin. </p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_story_section_overview'] = $context;

  return $export;
}

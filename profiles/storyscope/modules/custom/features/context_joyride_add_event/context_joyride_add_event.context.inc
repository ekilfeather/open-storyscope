<?php
/**
 * @file
 * context_joyride_add_event.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function context_joyride_add_event_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_add_event';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/events/add' => 'dossiers/*/events/add',
      ),
    ),
  );
  $context->reactions = array(
    'joyride_add' => array(
      'joyride_auto_start' => 1,
      'joyride_play_once' => 0,
      'joyride_tour_content' => '<li data-button="Next" class="custom">
  <h2>Create a New Event</h2>
  <p>A set of instructions will help you fill in each field of this new Event form, once you have sucessfully filled in a field and want to move on, simply click Next.</p>
</li>
<li data-class="form-item-title" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Title</h2>
  <p>Event titles should be expressed in the past tense. They should not include dates. Generally, the format for titling is Agent, Activity, Object/Location. </p>
</li>
<li data-class="form-type-textarea" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Description</h2>
  <p>Any extra, contextual information can be added to this field. This text will be searchable in the system, and can be used by the system to suggest new Events to the user. </p>
</li>
<li data-class="form-field-name-field-event-activity" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Activity</h2>
  <p>This denotes the verb that is associated with the Event. Example: Event: Claude Monet painted Impression Sunrise. Activity: Paint Verbs include actions (bring, read, walk, run, learn), an occurrence (happen, become), or a state of being (be, exist, stand). The Activity should be entered in the Infinitive form i.e. Paint, Write, however, if this is not possible, a short phrase can be used e.g. Artist Residency. This field is mandatory.</p>
</li>
<li data-class="form-field-name-field-event-start-time" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Start time</h2>
  <p>This denotes the start date of an Event and can include day, month, and year if these values are known. Example: Event: Sir Kenneth Clark was Director of the National Gallery, London Start Date: 1933. The user can choose to flag a Start Date as estimated. It is strongly recommended that users attempt to fill this field in each Event. </p>
</li>
<li data-id="edit-field-event-end-time" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>End time</h2>
  <p>This denotes the end date of an Event and can include day, month, and year if these values are known. Example: Event: Sir Kenneth Clark was Director of the National Gallery, London End Date: 1945. The user can choose to flag a Start date as estimated. </p>
</li>
<li data-id="edit-field-event-location" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Location</h2>
  <p>This field should be added to if a location e.g. an address, town, village, city, county, province, state, country, continent is associated with an Event. This field should auto-complete, but if your location is not found, use the next most general location (neighbourhood, city, country) moving up the hierarchy. </p>
</li>
<li data-id="edit-field-event-agent" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Agent</h2>
  <p>This field should be added to if a person (or group of people), organization, or organism is associated with the Event. Examples: Claude Monet or National Gallery of Ireland. This field can contain multiple values. </p>
</li>
<li data-id="edit-field-event-object" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Object</h2>
  <p>This field should be added to if the Event is associated with an Object e.g. James Joyce wrote Dubliners. Users should use this field to link the Event to a Storyscope Object. If the Object does not exist in the system, the user can create a new Object. </p>
</li>
<li data-id="edit-field-event-genre" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Genre</h2>
  <p>This field should be added to if the Event is associated with an Object with a known genre or category. Genres of painting include portraiture, landscape, history etc. </p>
</li>
<li data-id="edit-field-event-style-movement" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Style & Movement</h2>
  <p>This field should be added to if an Event is associated with an Object with a known style e.g. Impressionist style of painting, or if the Event is associated with an artistic movement e.g. Impressionism. Example: Event: Filippo Tommaso Marinetti wrote the Futurist Manifesto Style/Movement: Futurism. </p>
</li>
<li data-id="edit-field-event-value" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Value</h2>
  <p>This field should be filled if monetary value is associated with an Event. Example: Event: Monet’s drawing sold for $5000.00 at auction. </p>
</li>
<li data-id="edit-actions" data-text="Next" class="custom" data-options="tipAnimation:fade">
  <h2>Save</h2>
  <p>Don\'t forget to hit save. </p>
</li>',
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('joyride');
  $export['joyride_add_event'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'joyride_start_add_event';
  $context->description = '';
  $context->tag = 'joyride';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dossiers/*/events/add' => 'dossiers/*/events/add',
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
  $export['joyride_start_add_event'] = $context;

  return $export;
}

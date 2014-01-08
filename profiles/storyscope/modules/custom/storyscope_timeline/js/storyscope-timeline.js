/**
 * @file
 * A JavaScript file to initialize timeline.js.
 *
 */

(function ($) {
  Drupal.behaviors.timeline = {
    attach: function (context) {
      //var timeline_json = Drupal.settings.storyscope.timeline_json;
      var dataObject = $.parseJSON(Drupal.settings.storyscope.timeline_data_object);
      if ($('#dossier-timeline').length > 0) {
        createStoryJS({
          type: 'timeline',
          width: '100%',
          height: '500',
          start_zoom_adjust: '-5',
          source: dataObject,
          //source: timeline_json, // path to the json feed when using a URL
          //source: 'http://decipher.loc/sites/default/files/test-json.json', // for testing
          embed_id: 'dossier-timeline', // ID of the DIV you want to load the timeline into
          debug: true
        });
      }
    }
  }
})(jQuery);
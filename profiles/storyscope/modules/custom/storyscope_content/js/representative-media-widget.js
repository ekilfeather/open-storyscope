/**
 * @file
 * A JavaScript file to show the selected state of the team image chooser widget.
 *
 */

(function ($) {
  Drupal.behaviors.representativeMediaWidget = {
    attach: function (context) {
      var $image_widget_labels = $('#edit-media-select-widget label');
      $image_widget_labels.click(function(e) {
        $image_widget_labels.removeClass('selected-media');
        $(this).addClass('selected-media');
      });
    }
  }
})(jQuery);


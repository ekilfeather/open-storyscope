(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.storyscopeTweaksHideHelp = {
    attach: function (context) {

      // Find the help text on a node/edit form.
      var $help_items = $('.form-wrapper .description').not('.form-type-partial-datetime-element .description');
      // Hide the text and in its place add in a help button.
      $help_items.each(function() {
        var $help_item = $(this);
        $help_item.addClass('toggle-help');
        $help_item.hide();
        $toggle_button = '<span class="off"></span><div class="toggle-help-button">Help</div>';
        $help_item.before($toggle_button);
      });
      // Add in show/hide toggle functionality.
      $('.toggle-help-button').mouseover(function() {
        $(this).toggleClass('help-off');
        $(this).toggleClass('help-on');
        $(this).next().slideToggle("fast");
      });
      $('.toggle-help-button').mouseout(function() {
        $(this).toggleClass('help-off');
        $(this).toggleClass('help-on');
        $(this).next().slideToggle("fast");
      });
    }
  }
})(jQuery, Drupal, this, this.document);

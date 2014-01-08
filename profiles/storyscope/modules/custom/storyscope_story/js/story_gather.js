(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.storyscopeStory = {
    attach: function (context) {
      // Features for story manipulation.

      // -------------------------------------------------------------------
      // Show/hide functionality for events associated with an object story.
      // -------------------------------------------------------------------
      var $object_story_events = $('.node-object-story .view-content');
      var $object_story_no_events = $('.node-object-story .view-empty');
      $object_story_events = $object_story_events.add('.node-object-story .view-empty');
      var $object_stories = $('.node-object-story .field-name-body');
      $object_stories.find('.field-item').each(function() {
        var full_text = $(this).html();
        var $os_children = $(this).children();
        var i = 0;
        $os_children.each(function() {
          if (i == 0) {
            var summary = $(this).html().substring(0, 140);
            var ellipsis = '&hellip;';
            var extra_text = $(this).html().substr(140);
            if (extra_text) {
              $(this).html('<span class="object-story-summary">' + summary +  '</span>' + '<span class="ellipsis">' + ellipsis +  '</span>' + '<span class="object-story-extra-text">' + extra_text +  '</span>');
            }
          }
          else {
            $(this).addClass('object-story-extra-text');
          }
          i++;
        });
        
      });
      $object_story_events.find('article').hide();
      var $object_stories_extra_text = $('.node-object-story .field-name-body .object-story-extra-text');
      $object_stories_extra_text.hide();
      if ($('div.expand').length == 0) {
        $object_story_events.each(function() {
          if ($(this).parents('.node-object-story').find('.object-story-extra-text').length > 0) {
            $(this).append(Drupal.t('<div class="expand">+ Show more</div>'));
          }
        });
      }
      $object_story_events.find('div.expand').click(function() {
        $elem = $(this);
        // Show/hide the OS events
        $elem.siblings('article').toggle();
        // Show/hide the OS extra text & ellipsis.
        var $this_extra_text = $elem.parents('.view-object-story-events').siblings('.field-name-body').find('.object-story-extra-text');
        $this_extra_text.toggle();
        var $ellipsis =         $elem.parents('.view-object-story-events').siblings('.field-name-body').find('.ellipsis');
        $ellipsis.toggle();
        if ($ellipsis.css('display') == 'none' ) {
          $elem.html(Drupal.t('<div class="expand">- Show less</div>'));
        }
        else if ($this_extra_text.length == 0) {
          $elem.html(Drupal.t('<div class="expand">- Show less</div>'));
        }
        else {
          $elem.html(Drupal.t('<div class="expand">+ Show more</div>'));
        }
      });

      // -------------------------------------------------------------------
      // Ajax treatment of adding an OS to a section.
      // -------------------------------------------------------------------
      var $add_os_button = $('.view-dossier-object-stories-add-existing-search-api article .add-event a');
      var $os_in_section = $('.pane-storyscope-story-story-section-object-stories .pane-content');
      var $add_os_title = $('.pane-dossier-object-stories-add-existing-search-api .pane-title');
      var $spinner = $('<img src="' + location.protocol + '//' + location.hostname + Drupal.settings.basePath + '/profiles/storyscope/modules/custom/storyscope_story/js/loading-large.gif" class="spinner" style="margin:auto;" alt="Spinning ajax activity indicator" />');
      var $saved_message = $('<div class="saved-message">Section saved.</div>');
      var $empty_text = $('.empty-section-text');
      $add_os_title.append($spinner);
      $add_os_title.append($saved_message);
      $spinner.hide();
      $saved_message.hide();

      $add_os_button.click(function(e) {
        e.preventDefault();
        // Add in a spinner.
        // Make ajax request in the background.
        storyscope_story_section_add_object_story($(this));
        // Move the DOM node into the section.
        // Find the Article, find the target parent & move the article.
        $moving_article = $(this).parents('article');
        $(this).remove();
        $moving_article.appendTo($os_in_section);
        if ($empty_text.length > 0) {
          $empty_text.remove();
        }
      });

      // -------------------------------------------------------------------
      // Make Ajax request to add OS to the section.
      // -------------------------------------------------------------------
      function storyscope_story_section_add_object_story($os) {
        $url = $os.attr('href');
        // Whenever an ajax call is made, add a counter into the DOM.
        var $counter_div = '<div class="ajax-request-counter"></div>';
        $('body').append($counter_div);
        // Show the spinner.
        $spinner.show();
        $saved_message.hide();
        $.get($url, 'ajax=1', storyscope_story_section_refresh_views);
      }

      function storyscope_story_section_refresh_views(data) {
        // Update the spinner.
        storyscope_story_section_update_spinner();
        // TODO somehow refresh the data without causing a headache.
        // Make an AJAX call to get new Views data and insert it.
      }

      function storyscope_story_section_update_spinner() {
        console.log('update spinner');
        var $request_counters = $('.ajax-request-counter');
        // Whenever an ajax response comes in, remove a counter.
        $request_counters.first().remove();
        console.log($request_counters.length, 'length');
        if ($request_counters.length > 1 ) {
          // Whist a counter exists, show the spinner.
          $spinner.show();
          $saved_message.hide();
          console.log('we have a pending request');
        }
        else {
          // Hide the spinner. And show a message.
          $spinner.hide();
          $saved_message.show();
          console.log('no request pending');
        }
      }
    }
  }
})(jQuery, Drupal, this, this.document);

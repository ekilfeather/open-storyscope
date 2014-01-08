(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.storyscopePlots = {
    attach: function (context) {
      // Ajax features for plot/plot element manipulation.
      var $spin1 = $('<img src="' + location.protocol + '//' + location.hostname + Drupal.settings.basePath + '/profiles/storyscope/modules/custom/storyscope_listings/js/spinner.gif" class="spinner" style="margin:auto;" alt="Spinning ajax activity indicator" />');
      var $spin2 = $('<img src="' + location.protocol + '//' + location.hostname + Drupal.settings.basePath + '/profiles/storyscope/modules/custom/storyscope_listings/js/spinner.gif" class="spinner" style="margin:auto;" alt="Spinning ajax activity indicator" />');
      var $plot_set_pane_1 = $('.pane-plot-element-events-panel-pane-plot-set-1');
      var $plot_set_pane_2 = $('.pane-plot-element-events-panel-pane-plot-set-2');

      // Initially set up Pane title for plot sets.
      storyscope_listings_set_pane_titles();

      // Make Plot Element Selector form work on change.
      var $plot_element_selector = $('#storyscope-listings-plot-element-selector-form #edit-element-selector');
      var $plot_element_selector_submit = $('#storyscope-listings-plot-element-selector-form .form-submit');
      $plot_element_selector_submit.hide();
      $plot_element_selector.change(function(e){
        $("form#storyscope-listings-plot-element-selector-form").submit();
      });

      // Make Plot Structure selector work onchange.
      var $plot_structure_selector = $('#storyscope-listings-plot-set-relationship-selector-form #edit-relationship');
      var $plot_structure_selector_submit = $('#storyscope-listings-plot-set-relationship-selector-form .form-submit');
      $plot_structure_selector_submit.hide();
      $plot_structure_selector.change(function(e){
        $("form#storyscope-listings-plot-set-relationship-selector-form").submit();
      });

      // *************************************************************
      // Move events from one plot set to another without page reload.
      // *************************************************************
      // Get all move buttons.
      var $move_buttons = $('.move-event a');
      // Give them a click handler.
      $move_buttons.click(function(e) {
        e.preventDefault();
        storyscope_listings_move_event($(this));
      });

      // Show the spinners and make the ajax calls.
      function storyscope_listings_move_event(e) {
        // Show an activity spinner
        if ($('.spinner').length == 0) {
          $('.pane-plot-element-events-panel-pane-plot-set-1 .pane-content').prepend($spin1);
          $('.pane-plot-element-events-panel-pane-plot-set-2 .pane-content').prepend($spin2);
        }
        $.get(e.attr('href'), 'ajax=1', storyscope_listings_refresh_both_plot_sets);
      }
      // Get back the new views and update the page.
      function storyscope_listings_refresh_both_plot_sets(plot_element_nid) {
        $.getJSON(location.protocol + '//' + location.hostname + Drupal.settings.basePath + 'ajax/view/plot_element_events/panel_pane_plot_set_1', 'nid=' + plot_element_nid, function(json){
          var $plot_set_1 = $('.pane-plot-element-events-panel-pane-plot-set-1 .view');
          $plot_set_1.html(json).ready(function(){
            $('.pane-plot-element-events-panel-pane-plot-set-1 .pane-content .spinner').remove();
            $plot_set_1.show();
            storyscope_listings_fix_move_paths();
          });
        });
        $.getJSON(location.protocol + '//' + location.hostname + Drupal.settings.basePath + 'ajax/view/plot_element_events/panel_pane_plot_set_2', 'nid=' + plot_element_nid, function(json){
          var $plot_set_2 = $('.pane-plot-element-events-panel-pane-plot-set-2 .view');
          $plot_set_2.html(json).ready(function(){
            $('.pane-plot-element-events-panel-pane-plot-set-2 .pane-content .spinner').remove();
            $plot_set_2.show();
            storyscope_listings_fix_move_paths();
            storyscope_listings_set_pane_titles();
          });
        });
      }

      // *************************************************************
      // Ajaxify add & remove buttons
      // *************************************************************
      var $add_buttons = $('.add-event a');
      var $remove_buttons = $('.remove-event a');
      // Give them a click handler.
      $add_buttons.delegate('', 'click', function(e) {
        e.preventDefault();
        storyscope_listings_add_event($(this));
      });
      $remove_buttons.delegate('', 'click', function(e) {
        e.preventDefault();
        storyscope_listings_remove_event($(this));
      });

      function storyscope_listings_add_event(e) {
        // Show a spinner
        if ($plot_set_pane_1.find('.spinner').length == 0) {
          $('.pane-plot-element-events-panel-pane-plot-set-1 .pane-content').append($spin1);
        }
        // Make the change
        $.get(e.attr('href'), 'ajax=1', storyscope_listings_update_add);
        // change the button from add to remove
        e.html('remove x');
        e.parent().removeClass('add-event').addClass('remove-event');
        var url = e.attr('href');
        url = url.replace('/add?destination=', '/remove?destination=');
        e.attr('href', url);
      }

      // Update the DOM & UI to reflect an event addition
      function storyscope_listings_update_add(plot_element_nid) {
        // get a new view and insert.
        $.getJSON(location.protocol + '//' + location.hostname + Drupal.settings.basePath + 'ajax/view/plot_element_events/panel_pane_plot_set_1', 'nid=' + plot_element_nid, function(json){
          var $plot_set_1 = $('.pane-plot-element-events-panel-pane-plot-set-1 .view');
          $plot_set_1.html(json).ready(function(){
            $('.pane-plot-element-events-panel-pane-plot-set-1 .pane-content .spinner').remove();
            $plot_set_1.show();
            storyscope_listings_fix_move_paths();
            storyscope_listings_set_pane_titles();
          });
        });
      }

      // Update the DOM & UI to reflect the removal of an event.
      function storyscope_listings_remove_event(e) {
        // Hide the event from plot set 1
        var url = e.attr('href');
        // Hide the target event and show a spinner
        var $target_event = $('.pane-plot-element-events-panel-pane-plot-set-1 .view a[href*="' + url + '"], .pane-plot-element-events-panel-pane-plot-set-2 .view a[href*="' + url + '"]').parents('article');
        $target_event.after($spin1);
        $target_event.remove();
        // Make the change & if successful, remove the spinner
        $.get(e.attr('href'), 'ajax=1', function(){
          $('.spinner').remove()
        });
        // Find the event in the grid, if it's there & make it an add button.
        var $clicked_button = $('.view-dossier-events-search-api a[href*="' + url + '"]');
        if ($clicked_button.length > 0) {
          // Change the button from add to remove
          $clicked_button.html('add +');
          $clicked_button.parent().removeClass('remove-event').addClass('add-event');
          url = url.replace('/remove?destination=', '/add?destination=');
          $clicked_button.attr('href', url);
        }
        // Check to see if there's nothing left in plot set 2
        // If so, we need to reload both plot set views. 
        var $plot_set_2_events = $('.pane-plot-element-events-panel-pane-plot-set-2 .view article');
        if ($plot_set_2_events.length == 0) {
          var plot_element_path = window.location.pathname.split("/");
          var plot_element_nid = plot_element_path[6];
          storyscope_listings_refresh_both_plot_sets(plot_element_nid);
        }
      }

      // *************************************************************
      // Set pane titles for plot sets
      // *************************************************************
      function storyscope_listings_set_pane_titles() {
        // Look at plot set 2 - look for empty text.
        // If empty, then related title. Otherwise, influence/consequence titles.
        var $pane_2 = $('.pane-plot-element-events-panel-pane-plot-set-2');
        var $pane_1 = $('.pane-plot-element-events-panel-pane-plot-set-1');
        if ($pane_2.find('.view-empty').length == 1) {
          if ($pane_2.find('.pane-title').length == 0) {
            $pane_2.prepend('<h2 class="pane-title" >&nbsp;</h2>');
          }
          else {
            $pane_2.find('.pane-title').html('&nbsp;');
          }
          $pane_1.find('.pane-title').html('Related events');
          // Hide plot set 2 when there are no events at all
          if ($pane_1.find('.view-empty').length == 1) {
            $pane_2.find('.view-empty').hide();
            $pane_1.find('.pane-title').html('&nbsp;');
          }
          else {
            $pane_2.find('.view-empty').show();
          }
        }
        else {
          $pane_2.find('.pane-title').html('Consequences');
          $pane_1.find('.pane-title').html('Sources');
        }
      }

      // *************************************************************
      // Move & remove buttons get broken with ajax so fix them.
      // We're just reloading plot sets 1 & 2 though, so only worried about this.
      // *************************************************************
      function storyscope_listings_fix_move_paths() {
        var $move_buttons = $('.pane-plot-element-events-panel-pane-plot-set-1 .move-event a, .pane-plot-element-events-panel-pane-plot-set-2 .move-event a');
        var path = window.location;
        var destination = window.location.pathname;
        // So Window.location.pathname gives an annoying leading '/' that we need to kill.
        destination = destination.substr(1, destination.length-1);
        $move_buttons.each(function(){
          var $item = $(this);
          // Parent node.
          var $node = $item.parents('article');
          $node_alias = $node.attr('about');
          // Set the href.
          var href = $node_alias + '/move?destination=' + destination;
          $item.attr('href', href);
          if ($node.find('.remove-event').length == 0) {
            // For each move button, create a remove button.
            // The button we create will be very similar to the move button.
            var $new_button = $item.parent().clone();
            href = $node_alias + '/remove?destination=' + destination;
            $new_button.attr('class', 'suggest remove-event');
            $new_button.find('a').html('remove x').attr('href', href);
            $item.after($new_button);
          }
        });
        // Attach the required ajaxiness to the new buttons.
        $move_buttons.click(function(e) {
            e.preventDefault();
            storyscope_listings_move_event($(this));
          });
        $remove_buttons.each(function(){
          var $item = $(this);
         // $item.
          var href = path + '/remove?destination=' + destination;
          $item.attr('href', href);
        });
      }

      // *************************************************************
      // Check for Timeline & add in add & remove buttons as required.
      // Checks for changes in the DOM below the timeline DIV.
      // *************************************************************
      var plot_element_events = Drupal.settings.storyscope.plot_element_events;
      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      var target = document.querySelector('#dossier-timeline');
      // create an observer instance
      var observer = new MutationObserver(function(mutations) {
        var is_nodes_added = false;
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            is_nodes_added = true;
          }
        });
        if (is_nodes_added) {
          storyscope_listings_timeline_buttons();
          is_nodes_added = false;
        }
      });

      observer.observe(target, {
        subtree: true,
        childList: true,
        characterData: true
      });

      function storyscope_listings_timeline_buttons() {
        // Refresh the collection of slides
        var $timeline_slides = $('#dossier-timeline .slider-item');
        // Add in buttons
        $timeline_slides.each(function(){
          var $button_container = $(this).find('.container p:last-child');
          if ($button_container.length > 0) {
            var $slide_class = $(this).attr('class');
            // Find the NID
            $nid = $slide_class.replace('slider-item timeline-event-', '');
            //var request_path = window.location;
            var button = '';
            /*var add_button = '<a class="add-event" href="' + request_path + '/event/' + $nid + '/add?destination=' + request_path + '" >add +</a>';
            var remove_button = '<a class="remove-event" href="' + request_path + '/event/' + $nid + '/remove?destination=' + request_path + '" >add +</a>'; */
            // loop through - see if they are in the array of added elements.
            if ($.inArray($nid, plot_element_events) != -1) {
              // button = remove_button;
              button = 'This event is in the story';
            }
            else {
              // button = add_button;
            }
            // add in add or remove buttons as appropriate
            $button_container.html(button);
          }
        });
      }
    }
  }
})(jQuery, Drupal, this, this.document);

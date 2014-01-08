(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.storyscopeDeleteObjectStory = {
    attach: function (context) {
      // Find the Remove links.
      var $remove_links = $('.suggest.remove-event a');
      // Find the link that would delete the currently viewed OS.
      var $index = 0;
      $remove_links.each(function() {
        $index++;
        $path = $(this).attr('href');
        $location = window.location.pathname;
        $path_components = $path.split('/');
        $location_components = $location.split('/');
        $query_string_start = $path.indexOf('?');
        $path = $path.substring(0, $query_string_start);
        console.log($remove_links.length);
        if ($path_components[4] == $location_components[4]) {
          if ($index > 1) {
            $last_item = $remove_links[$index-2];
            $last_href = $($last_item).attr('href');
            $last_href_components = $last_href.split('/');
            $alternative_destination = '?destination=';
            for (var i = 1; i < 5; i++) {
              $alternative_destination += $last_href_components[i] + '/';
            }
            $alternative_destination += $location_components[5] + '/' + $location_components[6];
            $path += $alternative_destination;
          }
          else if ($index == 1 && $remove_links.length > 1) {
            $next_item = $remove_links[$index];
            $next_href = $($next_item).attr('href');
            $next_href_components = $next_href.split('/');
            $alternative_destination = '?destination=';
            for (var i = 1; i < 5; i++) {
              $alternative_destination += $next_href_components[i] + '/';
            }
            $alternative_destination += $location_components[5] + '/' + $location_components[6];
            $path += $alternative_destination;
          }
          else {
            // Default destination.
            $path += '?destination=dossiers/' + $location_components[2] + '/objectstories/';
          }
          $(this).attr('href', $path);
          $(this).attr('href');
        }
      });
      // Warn if user about to delete an object story.
      $remove_links.click(function (e) {
        var target = $(this).attr('href');
        e.preventDefault();
        // Grab the title of the target OS.
        var $title = $(this).parent().siblings('.node-title').find('a').text();
        // Create a popup with a warning message
        var $last_os_warning = '';
        if ($remove_links.length == 1) {
          $last_os_warning = '<p>This is the last object story using this object. On deletion, the object will <strong>disappear from your dossier</strong>.</p>';
        }
        $('body').append('<div id="navigation-warning-dialog" title="Warning!"><p>Do you really want to delete object story <em>' + $title + '</em>?</p> <p><strong>There is no undo.</strong></p>' + $last_os_warning + '</div>');
        // Continue with pageload, save or cancel.
        $( "#navigation-warning-dialog" ).dialog({
          resizable: false,
          modal: true,
          buttons: {
            "DELETE FOREVER": function() {
              $( this ).dialog( "close" );
              window.location = target;
            },
            "Cancel": function() {
              $( this ).dialog( "close" );
            }
          }
        });
      });
    }
  }
})(jQuery, Drupal, this, this.document);

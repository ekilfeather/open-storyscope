(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.storyscopeStory = {
    attach: function (context) {
      // Need to prevent navigation away without a warning.
      $('a').not('a[href$]="#"').click(function(e) {
        var target = $(this).attr('href');
        console.log(target);
        e.preventDefault();
        // Create a popup with a warning message
        $('body').append('<div id="navigation-warning-dialog" title="Warning!"><p>Are you sure you want to leave this page?</p> <p>Have you saved all your changes?</p></div>');
        // Continue with pageload, save or cancel.
        $( "#navigation-warning-dialog" ).dialog({
          resizable: false,
          modal: true,
          buttons: {
            "Proceed": function() {
              $( this ).dialog( "close" );
              window.location = target;
            },
            "Stay on page": function() {
              $( this ).dialog( "close" );
            }
          }
        });
      });

      // Hide the existing drag handles.
      $('.field-multiple-drag .handle').hide();
      // Find the Combo Story Sets
      var $os_fcs = $('#field-story-set-values > tbody > tr.draggable');
      // Add in new controls
      var up_down = '<td class="up-down"><span class="up-button">&#x2191;</span><span class="down-button">&#x2193;</span></td>';
      $os_fcs.each(function () {
        if ($(this).find('.up-down').length == 0) {
          $(this).prepend(up_down);
        }
      });

      // Make our new controls clickable.
      $os_fcs.find('.up-down .up-button').each(
        function() {
          if ($(this).parents('tr').prev().length == 0) {
            $(this).remove();
          }
          else {
            $(this).click(function(e) {
              storyscope_story_move_set($(this), 'up');
            });
          }
      });
      $os_fcs.find('.up-down .down-button').each(
        function() {
          if ($(this).parents('tr').next().length == 0) {
              $(this).remove();
            }
          else {
            $(this).click(function(e) {
              storyscope_story_move_set($(this), 'down');
            });
          }
      });

      // *******************************************************************
      // Move a story set
      // *******************************************************************
      function storyscope_story_move_set($elem, direction) {
        // swap table row with adjacent
        // find delta-order 
        // set delta-order value
        $delta_this = $elem.parent().siblings('.delta-order').find('select');
        $this_row = $elem.parents('tr.draggable');
        if (direction == 'up') {
          $other_row = $this_row.prev('tr');
        }
        else {
          $other_row = $this_row.next('tr');
        }
        if ($other_row.length > 0) {
          // We will swap the weights and save - reoloading - to save the reorder.
          // We do this because iframes lose their content when moved in the DOM.
          // TODO - figure out how tabledrag.js does it.
          $this_row_weight_control = $this_row.children('.delta-order').find('select');
          $this_row_weight = $this_row_weight_control.find('option:selected').val();
          $other_row_weight_control = $other_row.children('.delta-order').find('select');
          $other_row_weight = $other_row_weight_control.find('option:selected').val();
          $this_row_weight_control.val($other_row_weight);
          $other_row_weight_control.val($this_row_weight);
          $('#edit-save-and-continue').click();
        }
      }
    }
  }
})(jQuery, Drupal, this, this.document);

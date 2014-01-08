/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

  // Events in story section page should not be clickable
  $(document).ready(function() {
    $(".page-dossiers-stories-sections .view-dossier-events-search-api .node-title a").bind('click', function(e){
          e.preventDefault();
    });
    $(".node-type-section .view-dossier-events-search-api .node-title a").bind('click', function(e){
          e.preventDefault();
    });
  });
  // Quietly stop ajax errors from showing up in a popup window when the user does
  // something to kill them off
  $.ajaxSetup({
    beforeSend: function(jqXHR, settings) {
      settings.error = function(jqXHR, textStatus, errorThrown) {  
      //do nothing... end user doesn't need to see debugging info, uncomment console log code to debug
      //{console.log('ajax error: ' + textStatus);};
      };
    }
  });

})(jQuery, Drupal, this, this.document);

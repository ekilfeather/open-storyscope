Drupal.behaviors.jquery_freebase = {
  attach: function (context, settings) {
    var $ = jQuery;
    var jf = Drupal.settings.jquery_freebase;
    var freebase_basepath = 'https://www.googleapis.com/freebase/v1/topic/';

    // Since this runs in a loop, you might think
    // a "closure" would be needed to bind things properly...
    if (jf && jf.elements) {
      for (var ii=0; ii<jf.elements.length; ii++) {
        var elem = jf.elements[ii];
        var elem_object = jQuery.parseJSON(elem.arguments);
        elem_object.suggest_new = "Click on me to add a new topic if you don't see anything in the list";
        elem_object.animate = true;
	// ... However, since we're using JQuery's 'bind', we can make 
        // use of the "optional" eventData (here, msg) parameter 
        // see docs at http://api.jquery.com/bind/

        $(elem.id, context).suggest(elem_object).bind("fb-select", {msg : elem}, function(e, data) {

          // Note that the "element id" and the Freebase ID are different 
          // The "id_selector" points to the place to store the Freebase ID.
          // The topic_title_elem points to the place to store the Freebase title. 

          var id_selector = (e.data.msg.id.replace(/topic/, "mid"));
          var topic_id_elem = $(id_selector);
          var topic_title_elem = $(e.data.msg.id);
          $(topic_id_elem).val(Drupal.checkPlain('http://freebase.com' + data.mid));//

	  // ==============================================
          // Go fetch geocode data from Freebase if needed.
          // ==============================================
/*        var lat_elem = $(e.data.msg.id.replace(/topic/, "latitude"));
          var long_elem = $(e.data.msg.id.replace(/topic/, "longitude"));
          if (lat_elem.length > 0) {
            var freebase_api_request = freebase_basepath + data.mid + '?filter=/location/location/geolocation'; */

          var geofield_elem = $(e.data.msg.id.replace(/value/, "geom").replace(/location-topic/, "geolocation"));
          console.log($(e.data.msg.id.replace(/value/, "geom").replace(/location-topic/, "geolocation")));
          //var long_elem = $(e.data.msg.id.replace(/value/, "geom-lon").replace(/location-topic/, "geolocation"));
          if (geofield_elem.length > 0) {
            var freebase_api_request = 'https://www.googleapis.com/freebase/v1/topic/' + data.mid + '?filter=/location/location/geolocation';
            $.getJSON(freebase_api_request, null, function(json) {
              var json_object = json;
              try {
                var geo_data = json_object.property["/location/location/geolocation"].values[0].property;
                var lat = geo_data["/location/geocode/latitude"].values[0].value;
				var long = geo_data["/location/geocode/longitude"].values[0].value;                
				// we need to use a single Well Known Text value or we loose the values when the form is reloaded
				geofield_elem.val("POINT(" + long + " " + lat + ")");

                //console.log(geofield_elem.val);
                }
              catch(err) {
                $(e.data.msg.id).parent().prepend('<div id="no-location-message" class="message">NB Freebase has no geo-data for this location.</div>');
                setTimeout(function(){$('#no-location-message').slideUp('slow')}, 3000);
                geofield_elem.val(null);
                //long_elem.val(null);
              }
            });
          }
          // ==================================================
          // For agents we can try to get birth or death dates.
          // ==================================================
          var birth_elem = $(e.data.msg.id.replace(/topic/, "birth-date")).find('input.form-text');
          var death_elem = $(e.data.msg.id.replace(/topic/, "death-date")).find('input.form-text');
          if (birth_elem.length > 0) {
            var freebase_api_request = freebase_basepath + data.mid + '?filter=/people/person/date_of_birth';
            $.getJSON(freebase_api_request, null, function(json) {
              var json_object = json;
              try {
                // Fetch the birth date if it exists.
                var birth_date = json_object.property["/people/person/date_of_birth"].values[0].value;
                //Freebase stores the birth date value in datetime format but we only want the year so chop off any further bits.
                birth_date = birth_date.slice(0,4);
                birth_elem.val(Drupal.checkPlain(birth_date));
              }
              catch(err) {
                $(e.data.msg.id).parent().prepend('<div id="no-birth-message" class="message">NB Freebase has no birth date for this agent.</div>');
                setTimeout(function(){$('#no-birth-message').slideUp('slow')}, 3000);
                birth_elem.val(null);
              }
            });
          }
          // And the death date.
          if (death_elem.length > 0) {
            var freebase_api_request = freebase_basepath + data.mid + '?filter=/people/deceased_person/date_of_death';
            $.getJSON(freebase_api_request, null, function(json) {
              var json_object = json;
              try {
                // Fetch the death date if it exists.
                var death_date = json_object.property["/people/deceased_person/date_of_death"].values[0].value;
                //Freebase stores the death date value in datetime format but we only want the year so chop off any further bits.
                death_date = death_date.slice(0,4);
                death_elem.val(Drupal.checkPlain(death_date));
              }
              catch(err) {
                $(e.data.msg.id).parent().prepend('<div id="no-death-message" class="message">NB Freebase has no death date for this agent.</div>');
                setTimeout(function(){$('#no-death-message').slideUp('slow')}, 3000);
                death_elem.val(null);
              }
            });
          }

        }).bind("fb-select-new", {msg : elem}, function(e, data) {

          // Open a new Freebase Window.
          var args = jQuery.parseJSON(e.data.msg.arguments);
          var filter = args.filter;
          var url_fragment = '';
          if (typeof(filter) != 'undefined') {
            if (filter.length > 0) {
              // Find the last ).
              var end_bracket = filter.lastIndexOf(')');
              // Find the last type:
              var end_type = filter.lastIndexOf('type:') + 5;
              // Take out the substring. To bring a user to the actual create page
              // we need to append this to the fragment:  + '?create='
              url_fragment = filter.substring(end_type, end_bracket);
            }
          }
          // If nothing is found, open a freebase window.

          // Fetch the freebase domain list for a modal dialogue.
          var service_url = 'https://www.googleapis.com/freebase/v1/mqlread';
          var query = [{
            "id": null,
            "name": null,
            "type": "/type/domain",
            "!/freebase/domain_category/domains": {
              "id": "/category/commons"
            }
          }];
          var params = {
            'query': JSON.stringify(query)
          };
          $.getJSON(service_url + '?callback=?', params, function(response) {
            storyscope_freebase_topic_chooser(response);
          });

         /* if (confirm($(elem.id).val() + "Have you had a really good search? Confirm to continue to add a term to Freebase.")) {
	          window.open('http://www.freebase.com' + '/' + url_fragment, '_blank');
	        } */
	      });
      }
    }

    function storyscope_freebase_topic_chooser(domains) {
      var form_content = {'content':'<div id="freebase-topic-chooser" title="Choose a freebase domain and category"><form class="freebase-chooser"><div class="domains" ><label>Domains</label><p><select name="domains" id="freebase-domain-chooser"></select></p></form></div>'}
      var target = 'http://www.freebase.com';
      $('#content').prepend(form_content.content);
      var $freebase_topic_chooser = $('#freebase-topic-chooser');
      // Fetch domain values from the domains object.
      var domain_list = '<option>---Select a domain---</option>';
      for (var i = 0; i < domains.result.length; i++) {
        var domain_name = domains.result[i].name;
        var domain_id = domains.result[i].id;
        domain_list += '<option value="' + Drupal.checkPlain(domain_id) + '">' + Drupal.checkPlain(domain_name) + '</option>';
      }
      var $domain_select = $freebase_topic_chooser.find('select');
      $domain_select.html(domain_list);
      $domain_select.change(function(e){
        var chosen_domain = $(this).val();
        storyscope_lookup_category(chosen_domain);
      });
      $freebase_topic_chooser.dialog({
        height: "auto",
        width: 350,
        modal: true,
        buttons: {
          "Proceed": function() {
            $( this ).dialog( "close" );
            console.log($('#freebase-domain-chooser').val(), $('#freebase-category-chooser').val());
            window.open(target + $('#freebase-category-chooser').val(), '_blank');
          },
          Cancel: function() {
            $( this ).dialog( "close" );
          }
        }
      });
    }

    function storyscope_lookup_category(chosen_domain) {
      // Fetch the freebase category list for a given domain.
      console.log(chosen_domain);
      var service_url = 'https://www.googleapis.com/freebase/v1/mqlread';
      var query = [{
        "id":     null,
        "name":   null,
        "type":   "/type/type",
        "domain": chosen_domain
      }];
      var params = {
        'query': JSON.stringify(query)
      };
      $.getJSON(service_url + '?callback=?', params, function(categories) {
        // Parse the category list from Freebase.
        console.log(categories);
        var cat_list = '<p><label>Category</label><select id="freebase-category-chooser"><option>---Select a category---</option>';
        for (var i = 0; i < categories.result.length; i++) {
          var cat_name = categories.result[i].name;
          var cat_id = categories.result[i].id;
          cat_list += '<option value="' + Drupal.checkPlain(cat_id) + '">' + Drupal.checkPlain(cat_name) + '</option>';
        }
        cat_list += '</select></p>';
        $('#freebase-domain-chooser').parent().after(cat_list);
      });
    }
  }
};

// This is the form of a get request to fetch geodata for a location:
// https://www.googleapis.com/freebase/v1/topic/en/cork?filter=/location/location/geolocation

/**
 * editor_plugin_src.js
 *
 * @author: Martin Kleban 
 */

(function() {
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('aed');

	tinymce.create('tinymce.plugins.AedPlugin', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		


    
    init : function(ed, url) {


	   	// stores unique ID assigned by AEd
	  	var annoID;
      // NodeChange event handler
      var fnNodeChangeHandler = function(ed) {
          if (AEd && annoID) {
              AEd.activateAnnotationsEditor(annoID);
          }
      }			
		
      // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceAed');
			ed.addCommand('mceAed', function() {
			
        var btnAed = ed.controlManager.get('aed');
           
        if (btnAed.isActive()) {
           btnAed.setActive(false); 
           
           if (AEd) {
              ed.onNodeChange.remove(fnNodeChangeHandler); 
              
              AEd.destroyAnnotationsEditor(annoID);

           }

        }
        else {
           btnAed.setActive(true);
           
           if (AEd) {  
               var resUri = (Drupal.settings.aed.uri) ? Drupal.settings.aed.uri : null;
               var resLogin = (Drupal.settings.aed.login) ? Drupal.settings.aed.login : null;
               var resToken = (Drupal.settings.aed.token) ? Drupal.settings.aed.token : null;
               var resSystem = (Drupal.settings.aed.system) ? Drupal.settings.aed.system : null;
                             
               annoID = AEd.createAnnotationsEditor({
                  editorType: "tinymce",                   
                  editorNativeObject: ed,
                  resourceUri: resUri,
                  resourceLogin: resLogin,
                  resourceToken: resToken,
                  resourceSystem: resSystem
               });  
               
               ed.onNodeChange.add(fnNodeChangeHandler);         
           }
        }
			
			});





			// Register example button
			ed.addButton('aed', {
				title : AEd.I18n.t("AEd_button_title"),
				cmd : 'mceAed',
				image : Drupal.settings.aed.path + 'aed/img/aed.gif'
			});

            




		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Annotations editor plugin for TinyMCE',
				author : 'Martin Kleban',
				authorurl : '',
				infourl : '',
				version : "1.0"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('aed', tinymce.plugins.AedPlugin);
})();

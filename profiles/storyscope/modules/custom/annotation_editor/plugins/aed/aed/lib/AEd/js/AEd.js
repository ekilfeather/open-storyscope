/**
 * AEd.js
 *
 * Core Namespace and core functionality for Annotations Editor.
 * Contains:
 * AEd Namespace and AEd singleton
 *
 * @authors: Martin Kleban, Milos Cudrak
 *
 */

// *****************************************************************************
// class AEd
// *****************************************************************************


// -------------------------------------------------------------- fileExists
/**
  * Determines if testfile is located on uri passed as parameter
  *
  * @name fileExists
  * @function
  * @param {String} strURL url of testfile.
  * @return {Boolean} True if testfile was found else false.
  */

function fileExists(strURL) {
    oHttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    oHttp.open("GET", strURL, false);
    oHttp.send(null);

    var xmlDoc = '';

    if (oHttp.responseXML){

      xmlDoc = oHttp.responseXML.documentElement;
    }

    if(xmlDoc && (xmlDoc.childNodes && xmlDoc.childNodes.length == 1) && (xmlDoc.childNodes[0].textContent.toString() == "uri test")) {
      return true;
    } else {
      if (oHttp.responseText == "<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n<rootElement><value>uri test</value></rootElement>\n") {
        return true;
      }
	  // for windows
	  else if (oHttp.responseText == "<?xml version=\"1.0\" encoding=\"utf-8\" ?>\r\n<rootElement><value>uri test</value></rootElement>\r\n") {
	    return true;
      }

      return false;
    }
}

if (typeof AEd == "undefined" || !AEd) {
    /**
     * AEd is a global namespace object. If already exists, the
     * existing AEd object will not be overwritten.
     *
     * @name AEd
     * @class AEd
     * @static
     *
     */

    var AEd = (function() {





        // *********************************************************************
        // variables
        // *********************************************************************

        // object to return
        var t = {};



        // *********************************************************************
        // constants
        // *********************************************************************



        // *********************************************************************
        // AEd PUBLIC properties
        // *********************************************************************


        /**
         * Configuration object
         * @name config
         * @memberOf AEd
         * @type Object
         * @property
         */
        t.config = null;

        /**
         * isDomReady Determines whether DOM is ready.
         * @name isDomReady
         * @memberOf AEd
         * @type Boolean
         * @property
         */
        t.isDomReady = false;

        /**
         * Reference to AEd.lang.I18n singleton. It enables to use shorter variant of AEd.lang.I18n object methods. For example: AEd.i18n.t("some string") instead of  AEd.langs.I18n.t("some string").
         * @name I18n
         * @memberOf AEd
         * @type AEd.lang.I18n
         * @property
         */
        t.I18n = null;

        /**
         * Reference to AEd.editors.EditorsManager singleton.
         * @name EM
         * @memberOf AEd
         * @type AEd.editors.EditorsManager
         * @property
         */
        t.EM = null;

        /**
         * Reference to AEd.dom.DOMUtils singleton.
         * @name DOM
         * @memberOf AEd
         * @type AEd.dom.DOMUtils
         * @property
         */
        t.DOM = null;

        /**
         * Reference to AEd.dom.ElementUtils singleton.
         * @name ElU
         * @memberOf AEd
         * @type AEd.dom.ElementUtils
         * @property
         */
        t.ElU = null;

        /**
         * Reference to AEd.dom.Events singleton.
         * @name Events
         * @memberOf AEd
         * @type AEd.dom.Events
         * @property
         */
        t.Events = null;

        /**
         * Reference to AEd.dom.Mouse singleton.
         * @name Mouse
         * @memberOf AEd
         * @type AEd.dom.Mouse
         * @property
         */
        t.Mouse = null;

        /**
         * Reference to AEd.dom.CSSLoader singleton.
         * @name CSSLoader
         * @memberOf AEd
         * @type AEd.dom.CSSLoader
         * @property
         */
        t.CSSLoader = null;

        /**
         * Reference to AEd.ui.DialogManager singleton.
         * @name Dialogs
         * @memberOf AEd
         * @type AEd.ui.DialogManager
         * @property
         */
        t.Dialogs = null;

        /**
         * Reference to AEd.ajax.XHR singleton.
         * @name XHR
         * @memberOf AEd
         * @type AEd.ajax.XHR
         * @property
         */
        t.XHR = null;

        /**
         * Reference to AEd.xml.XMLUtils singleton.
         * @name XML
         * @memberOf AEd
         * @type AEd.xml.XMLUtils
         * @property
         */
        t.XML = null;

        /**
         * Reference to AEd.comm.Protocol singleton.
         * @name Protocol
         * @memberOf AEd
         * @type AEd.comm.Protocol
         * @property
         */
        t.Protocol = null;

        /**
         * Reference to AEd.utils.Cleanup singleton.
         * @name Cleanup
         * @memberOf AEd
         * @type AEd.utils.Cleanup
         * @property
         */
        t.Cleanup = null;

        /**
         * Reference to AEd.utils.Fragments singleton.
         * @name Fragments
         * @memberOf AEd
         * @type AEd.utils.Fragments
         * @property
         */
        t.Fragments = null;

        /**
         * Reference to AEd.entities.FragmentsManager .
         * @name FragmentsMan
         * @memberOf AEd
         * @type AEd.entities.FragmentsManager
         * @property
         */
        t.FragmentsMan = null;

        /**
         * Reference to AEd.entities.SuggestionsManager .
         * @name SuggestionsMan
         * @memberOf AEd
         * @type AEd.entities.SuggestionsManager
         * @property
         */
        t.SuggestionsMan = null;

        /**
         * Reference to AEd.entities.Annotations .
         * @name Annotations
         * @memberOf AEd
         * @type AEd.entities.Annotations
         * @property
         */
        t.Annotations = null;

        /**
         * Reference to AEd.utils.Object singleton.
         * @name Object
         * @memberOf AEd
         * @type AEd.utils.Object
         * @property
         */
        t.Object = null;

        /**
         * isIE Determines whether plugin is running in Internet Explorer.
         * @name isIE
         * @memberOf AEd
         * @type Boolean
         * @property
         */
        t.isIE = false;

        /**
         * IEversion Determines Internet Explorer version.
         * @name IEversion
         * @memberOf AEd
         * @type Integer
         * @property
         */
        t.IEversion = 0;

        /**
         * isFF Determines whether plugin is running in Mozilla Firefox.
         * @name isFF
         * @memberOf AEd
         * @type Boolean
         * @property
         */
        t.isFF = false;

        /**
         * FFversion Determines Mozilla Firefox version.
         * @name FFversion
         * @memberOf AEd
         * @type Integer
         * @property
         */
        t.FFversion = 0;

        /**
         * isGoogleChrome Determines whether plugin is running in Google Chrome.
         * @name isGoogleChrome
         * @memberOf AEd
         * @type Boolean
         * @property
         */
        t.isGoogleChrome = false;

        /**
         * isAppleSafari Determines whether plugin is running in Apple Safari.
         * @name isAppleSafari
         * @memberOf AEd
         * @type Boolean
         * @property
         */
        t.isAppleSafari = false;
        
        /**
         * userGroupSwitching Determines if user changed user group.
         * @name userGroupSwitching 
         * @memberOf AEd
         * @type Boolean
         * @property
         */
        t.userGroupSwitching = false;


        // *********************************************************************
        // AEd events
        // *********************************************************************

      /**
       * Fires when DOM structure is ready.
       *
       * @name onDomReady
       * @memberOf AEd
       * @event
       */

        t.onDomReady = {};



        // *********************************************************************
        // AEd PUBLIC methods
        // *********************************************************************



        // ----------------------------------------------------------- AEd.init
        /**
         * Global configuration of annotation editor(or editors, if there are
         * multiple wysiwyg editors on one page and each uses own Annotation editor
         * to annotate content).
         *
         * @name init
         * @memberOf AEd
         * @function
         * @param {Object} configObject Configuration object.
         * @return {Boolean} True, if configuration of annotation editor was successful. Otherwise returns false.
         */

        t.init = function(configObject) {

            // Set browser detection properties
            t.checkBrowser();

            // if there is no configutaion object created
            if (!AEd.CONFIG) {
               throw new Error(AEd.I18n.t("Error_AEd_Config_object_not_found"));
            }

            // is PATH set right?
            var loop_count = 0;

            AEd.CONFIG.AED_ROOT_PATH = '/' + AEd.CONFIG.AED_PATH.replace(/\.\/|\.\.\//g, '');

            while(!(fileExists(AEd.CONFIG.AED_PATH + "lib/AEd/testfile"))) {
              AEd.CONFIG.AED_PATH = "../" + AEd.CONFIG.AED_PATH;
              loop_count++;
              // we search only a limited count of directories
              if(loop_count == AEd.CONFIG.AED_MAX_LOOP) {
                break;
              }
            }

            // init the variables (paths)
            AEd.CONFIG.AED_BASE_DLG_CSS_ADDRESS = AEd.CONFIG.AED_PATH;
            AEd.CONFIG.PROXY_SERVER_ADDRESS = AEd.CONFIG.AED_PATH + AEd.CONFIG.PROXY_SERVER_ADDRESS;
            AEd.CONFIG.DLG_CONNECT_PATH = AEd.CONFIG.AED_PATH + AEd.CONFIG.DLG_CONNECT_PATH;
            AEd.CONFIG.DLG_SETTINGS_PATH = AEd.CONFIG.AED_PATH + AEd.CONFIG.DLG_SETTINGS_PATH;
            AEd.CONFIG.DLG_ANNOTATE_PATH = AEd.CONFIG.AED_PATH + AEd.CONFIG.DLG_ANNOTATE_PATH;
            AEd.CONFIG.DLG_PERSONS_PATH = AEd.CONFIG.AED_PATH + AEd.CONFIG.DLG_PERSONS_PATH;
            AEd.CONFIG.DLG_GROUPS_PATH = AEd.CONFIG.AED_PATH + AEd.CONFIG.DLG_GROUPS_PATH;
            AEd.CONFIG.DLG_TYPES_PATH = AEd.CONFIG.AED_PATH + AEd.CONFIG.DLG_TYPES_PATH;
            AEd.CONFIG.DLG_ATTRTYPES_PATH = AEd.CONFIG.AED_PATH + AEd.CONFIG.DLG_ATTRTYPES_PATH;
            AEd.CONFIG.DLG_ATTR_FROM_ONTOLOGY_PATH = AEd.CONFIG.AED_PATH + AEd.CONFIG.DLG_ATTR_FROM_ONTOLOGY_PATH;
            AEd.CONFIG.DLG_SYNCHRONIZE_PATH = AEd.CONFIG.AED_PATH + AEd.CONFIG.DLG_SYNCHRONIZE_PATH;
            AEd.CONFIG.DLG_SUBSCRIPTIONS_PATH = AEd.CONFIG.AED_PATH + AEd.CONFIG.DLG_SUBSCRIPTIONS_PATH;
            AEd.CONFIG.DLG_SUGGEST_ANNOTATIONS_PATH = AEd.CONFIG.AED_PATH + AEd.CONFIG.DLG_SUGGEST_ANNOTATIONS_PATH;
            AEd.CONFIG.DLG_TYPECOLORS_PATH = AEd.CONFIG.AED_PATH + AEd.CONFIG.DLG_TYPECOLORS_PATH;

            // load theme
            t.CSSLoader.load(AEd.CONFIG.AED_BASE_DLG_CSS_ADDRESS + "lib/AEd/themes/" + AEd.CONFIG.DEFAULT_THEME + "/theme.css");
            // load IE9 specific styles
            if (t.isIE && t.IEversion >= 9)
               t.CSSLoader.load(AEd.CONFIG.AED_BASE_DLG_CSS_ADDRESS + "lib/AEd/themes/" + AEd.CONFIG.DEFAULT_THEME + "/ie9.css");

            // if there is some config object passed to AEd.init() function,
            // settings in passed object will overwrite the values in defaul
            // config object defined in Config.js
            if (configObject) {
               for(var key in configObject){
                   AEd.CONFIG[key] = configObject[key];
               }
            }


            // onDomReady
            t.onDomReady.addHandler(function(){
                this.isDomReady = true;
            }, t);

            // ****************************************************************
        }



        // ---------------------------------------- AEd.createAnnotationsEditor
        /**
         * Creates new annotations editor instance. Method is called from
         * wysiwyg editors plugins after pressing a button in wysiwyg editor
         * toolbar.
         *
         * @example
         * myID = AEd.createAnnotationsEditor({
         *          editorType: "tinymce",
         *          editorObject: ed
         *        });
         *
         * @name createAnnotationsEditor
         * @memberOf AEd
         * @function
         * @param {Object} configObject Configuration object.
         * @return {Number} Returns unique annotations editor ID or 0 when error occured and no editor was created.
         */

        t.createAnnotationsEditor = function(configObject) {
            if (t.isIE || t.isFF) {
              if ((t.isFF && t.FFversion >= 4) || (t.isIE && t.IEversion >= 8)) { // is Mozilla Firefox 4.0 and above or Internet Explorer 9 and above
                if (t.isIE && t.IEversion == 8)
                  alert("WARNING: Internet Explorer 8 is supported, but because of better performance it is strongly recommended to upgrade to Internet Explorer 9 or above or use Mozilla Firefox 4.0 or above.");
                if (configObject) {
                  if (t.EM.editorsCount == 0) {
                    t.XHR.init();
                  }
                  return t.EM.createEditor(configObject);
                }
                else {
                  // no editor created
                  return 0;
                }
              }
              else {
                alert("Only Mozilla Firefox 4.0 and above or Internet Explorer 9 and above is fully supported.");
              }
            }
            else if(/Safari/.test(navigator.userAgent) || /Opera/.test(navigator.userAgent)) { // is Chrome or Safari
                if (configObject) {
                  if (t.EM.editorsCount == 0) {
                    t.XHR.init();
                  }
                  return t.EM.createEditor(configObject);
                }
                else { // no editor created
                  return 0;
                }
            }
            else { // is not Mozilla Firefox
              alert("Only Mozilla Firefox 4.0 and above or Internet Explorer 9 and above is fully supported.");
            }

        }

        // --------------------------------------- AEd.destroyAnnotationsEditor
        /**
         * Destroys  annotations editor instance specified by ID. Method is
         * called from wysiwyg editors plugins after pressing a button
         * in wysiwyg editor toolbar.
         *
         * @name destroyAnnotationsEditor
         * @memberOf AEd
         * @function
         * @param {Number} id ID of annotations editor instance to destroy.
         */

        t.destroyAnnotationsEditor = function(id) {
            if (id) {
                t.EM.destroyEditor(id);
                if (t.EM.editorsCount == 0) {
                    t.XHR.destroy();
                }
            }
        }


        // -------------------------------------- AEd.activateAnnotationsEditor
        /**
         * Activates annotations editor instance specified by ID. Method is
         * called from wysiwyg editors plugins after gaining a focus.
         *
         * @name activateAnnotationsEditor
         * @memberOf AEd
         * @function
         * @param {Number} id ID of annotations editor instance to activate.
         */

        t.activateAnnotationsEditor = function(id) {
            if (id) {
                t.EM.activateEditor(id);
            }
        }





        // ------------------------------------------ AEd.onDomReady.addHandler
        /**
         * Executes callback when DOM is ready.
         *
         * @method addHandler
         * @memberOf AEd
         * @function
         * @param {Function} callback Function to execute.
         * @param {Object} scope Callback function scope.
         */
        t.onDomReady.addHandler = function(callback, scope) {

           var s = scope || window;
           if (callback && typeof callback === "function") {
               if (t.isDomReady) {
                  callback.call(s);
               }
               else if (document.addEventListener) {
                  document.addEventListener("DOMContentLoaded", function() {
                     callback.call(s);
                  }, false);
               }
               else if (document.attachEvent) {
                  document.attachEvent("DOMContentLoaded", function() {
                     callback.call(s);
                  });
               }
               else {
                  if (document.body && document.body.lastChild) {
                     callback.call(s);
                  }
                  else {
                     return setTimeout(function() {
                        arguments.callee.call(this, arguments);
                     }, 0);
                  }
               }
           }
        }



        // ------------------------------------------------ AEd.createNamespace
        /**
         * Creates a new namespace specified by namespace argument.
         *
         * @example
         * Examples:
         * AEd.createNamespace("A.Foo");
         * AEd.createNamespace("AEd.A.Foo");
         * Either of above would create namespace AEd.A (if it doesn't exist) and then
         * AEd.A.Foo
         *
         * @name createNamespace
         * @memberOf AEd
         * @function
         * @param {String} namespace Namespace to create.
         * @return {Object} A reference to created namespace object.
         */
        t.createNamespace = function(namespace) {
            var tmpObject = null, aNamespaces;
            var startPoint;

            aNamespaces = namespace.split(".");
            tmpObject = AEd;
            startPoint = aNamespaces[0] == "AEd" ? 1 : 0;

            for (var i=startPoint; i<aNamespaces.length; i++) {
                tmpObject[aNamespaces[i]] = tmpObject[aNamespaces[i]] || {};
                tmpObject = tmpObject[aNamespaces[i]];
            }

            return tmpObject;
        }



        // ---------------------------------------------------- AEd.extendClass
        /**
         * Method to support inheritance.
         *
         * @name extendClass
         * @memberOf AEd
         * @function
         * @param {Function} subClass Object to modify.
         * @param {Function} superClass Object to inherit from.
         * @param {Function} overrides Properties and methods to add to subClass
         *                             prototype.
         *
         */
        t.extendClass = function(subClass, superClass, overrides) {
           if (subClass && superClass) {
              // temporary constructor
              var F = function () {
              }
              F.prototype = superClass.prototype;
              subClass.prototype = new F();
              subClass.prototype.constructor = subClass;
              subClass.superClass = superClass.prototype;
              if (superClass.prototype.constructor == Object.prototype.constructor) {
                 superClass.prototype.constructor=superClass;
              }

              if (overrides) {
                 for (i in overrides) {
                    if (overrides.hasOwnProperty(i)) {
                       subClass.prototype[i]=overrides[i];
                    }
                 }
              }
           }
        }



        // ------------------------------------------- AEd.inheritFromPrototype
        /**
         * Method to support multiple inheritance.
         *
         * @name inheritFromPrototype
         * @memberOf AEd
         * @function
         * @param {Function} subClass Object to modify.
         * @param {Function} superClass Object to inherit from.
         *
         */
        t.inheritFromPrototype = function(subClass, superClass) {
           if (subClass && superClass) {
              for (i in superClass.prototype) {

                 if (superClass.prototype.hasOwnProperty(i)) {
                    subClass.prototype[i] = superClass.prototype[i];
                 }
              }

           }
        }



        // ---------------------------------------------- AEd.inheritFromObject
        /**
         * Method to support multiple inheritance.
         *
         * @name inheritFromObject
         * @memberOf AEd
         * @function
         * @param {Function} subObject Object to modify.
         * @param {Function} superObject Object to inherit from.
         *
         */
        t.inheritFromObject = function(subObject, superObject) {
           if (subObject && superObject) {
               for (i in superObject) {

                    if (superObject.hasOwnProperty(i)) {

                        subObject[i] = superObject[i];
                    }
               }
           }
        }


        // -------------------------------------------------------------- AEd.$
        /**
         * Creates AEd.dom.Element instance for specified DOM element or DOM
         * element ID.
         *
         * @name $
         * @memberOf AEd
         * @function
         * @param {Element or String} el DOM element or ID of DOM element.
         * @return {AEd.dom.Element} AEd.dom.Element instance.
         */
        t.$ = function(el) {
           return new AEd.dom.Element(el);
        }

        // *********************************************************************
        // AEd PRIVATE methods
        // *********************************************************************

        // -------------------------------------------------------------- AEd.$
        /**
         * Initializes browser specific properties.
         *
         * @name checkBrowser
         * @memberOf AEd
         * @function
         *
         */
        t.checkBrowser = function(el) {
            // Source: http://www.javascriptkit.com/javatutors/navigator.shtml
           if (/MSIE[\/\s](\d+)/.test(navigator.userAgent)) {
              this.isIE = true;
              this.IEversion = new Number(RegExp.$1);
           }
           else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
              this.isFF = true;
              this.FFversion = new Number(RegExp.$1);
           }
           else if ((navigator.userAgent.toLowerCase().indexOf('webkit') > -1) && (navigator.userAgent.toLowerCase().indexOf('chrome') > -1)) {
              this.isGoogleChrome = true;

           }
           else if ((navigator.userAgent.toLowerCase().indexOf('webkit') > -1) && (navigator.userAgent.toLowerCase().indexOf('safari') > -1)) {
              this.isAppleSafari = true;
           }


        }



        // *********************************************************************
        // return
        // *********************************************************************

        return t;

    })();


}



// *****************************************************************************
// class AEd
// *****************************************************************************

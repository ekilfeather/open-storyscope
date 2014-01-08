/**
 * I18n.js
 *
 * Contains AEd.langs.I18n class definition.
 *  
 * @author: Martin Kleban 
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.langs.I18n
// ***************************************************************************** 


     
/**
 * Functionality for localization. 
 * 
 * @name I18n
 * @memberOf AEd.langs        
 * @class 
 * @static
 *      
 */
AEd.langs.I18n = (function() {
        

    // *************************************************************************
    // variables
    // *************************************************************************   
    
    // object to return
    var t = {};
 
        
        
    // *************************************************************************
    // I18n public properties
    // *************************************************************************               
    
    /**
     * Current language name.  
     * @name lang
     * @memberOf AEd.langs.I18n
     * @type String
     * @property                              
     */            
    t.lang = null;    
 
    // *************************************************************************
    // I18n events
    // *************************************************************************        

  
          
    // *************************************************************************
    // I18n PUBLIC methods
    // *************************************************************************  
      
        
        
    // ----------------------------------------------------------- I18n.getLang
    /**
     * Returns current language name.
     * 
     * @name getLang
     * @memberOf AEd.langs.I18n                 
     * @function
     * @public           
     * @return {String} Current language name. If not set, returns null value.  
     */    
    t.getLang = function() {              
        if (t.lang) {
            return t.lang;
        }
        else {
            if (AEd.CONFIG && AEd.CONFIG.DEFAULT_LANG) {
                t.setLang(AEd.CONFIG.DEFAULT_LANG);
                return t.lang;
            }
            else {
                t.t("Error_AEd_langs_I18n_Config_object_DEFAULT_LANG_property_not_found");
                return null;
            }                            
        }
    }
    
    
    
    // ----------------------------------------------------------- I18n.setLang
    /**
     * Sets current language name.
     * 
     * @name setLang
     * @memberOf AEd.langs.I18n                 
     * @function
     * @public           
     * @param {String} Current language name. 
     */    
    t.setLang = function(lang) {              
        if (lang) {
            t.lang = lang;
        }
    }
    
        
    // --------------------------------------------------------- I18n.translate
    /**
     * Returns translated string.
     *      
     * @name translate
     * @memberOf AEd.langs.I18n   
     * @function           
     * @public           
     * @param {String} msg String to translate.	
     * @return {String} Translated string.  
     */
    t.translate = function(msg) {                      
        var l = t.getLang();
        if (l) {
            if (AEd.langs[l]) {
                
                var m = AEd.langs[l][msg];
                if (m) {
                    return m;
                } 
                else {
                    return msg;
                }
            }
            else {
                return msg;
            }
        }
        else {
            return msg;
        }          
    }

    // ----------------------------------------------------------------- I18n.t
    /**
     * Returns translated string. Reference to translate method, used to shorten method name from translate to t.
     *  
     * @name t
     * @memberOf AEd.langs.I18n   
     * @function           
     * @public           
     * @param {String} msg String to translate.	
     * @return {String} Translated string.  
     */    
    t.t = t.translate;
        
        
    // *************************************************************************
    // return
    // *************************************************************************               
  
    return t; 

})();



// *****************************************************************************
// class AEd.langs.I18n
// ***************************************************************************** 
    


// shorten name
AEd.I18n = AEd.langs.I18n;
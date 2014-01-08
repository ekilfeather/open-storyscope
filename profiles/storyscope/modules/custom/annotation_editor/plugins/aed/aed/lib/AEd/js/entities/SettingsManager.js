/**
 * SettingsManager.js
 *
 * Contains AEd.entities.SettingsManager class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.entities.SettingsManager
// *****************************************************************************  



/**
 * This class provides functionality for settings entities.
 *      
 *
 * @name SettingsManager
 * @memberOf AEd.entities      
 * @class 
 * @param {Aed.editors.Editor} editor Editor instance. 	 
 * @property {Array} settings Collection of settings. 
 * @property {Array} rules Collection of rules. 	 		  
 */
AEd.entities.SettingsManager = function(editor) {

   this.editor   = editor;
   this.settings = new Array();
   this.rules    = new Array();
  
}


AEd.entities.SettingsManager.prototype.constructor = AEd.entities.SettingsManager;



// ---------------------------------------------------------------- setSettings
/**
 * Sets new settings array.
 *  
 * @name setSettings
 * @memberOf AEd.entities.SettingsManager
 * @function
 * @param {Array} aSettings Settings array. 
 *  	
 */
AEd.entities.SettingsManager.prototype.setSettings = function(aSettings) {
     this.settings = aSettings;
} 



// ---------------------------------------------------------------- getSettings
/**
 * Gets settings array.
 *  
 * @name getSettings
 * @memberOf AEd.entities.SettingsManager
 * @function
 * @return {Array} aSettings Settings array. 
 *  	
 */
AEd.entities.SettingsManager.prototype.getSettings = function() {
     return this.settings;
}



// ---------------------------------------------------------------- getSetting
/**
 * Gets setting.
 *  
 * @name getSetting
 * @memberOf AEd.entities.SettingsManager
 * @function
 * @param {String} name Name of the setting. 
 * @return {String} value Setting value. 
 *  	
 */
AEd.entities.SettingsManager.prototype.getSetting = function(name) {
    var settings = this.settings;
    for (var i in settings) {
        if (settings[i].name == name) {
            return settings[i].value;
        }
    }
    return null;
}



// ------------------------------------------------------------------------ add
/**
 * Appends settings to existing array.
 *  
 * @name add
 * @memberOf AEd.entities.SettingsManager
 * @function
 * @param {Array} aAddSettings Settings array. 
 *  	
 */
AEd.entities.SettingsManager.prototype.add = function(aAddSettings) {
     if (aAddSettings) {
        for (var i=0; i < aAddSettings.length; i++) {
             
             var tmpSet = this.getObjectByName(aAddSettings[i].name);
             if (tmpSet) {
                  this.remove([tmpSet]);
             }             
             this.settings.push(aAddSettings[i]);           
        }
        
        this.editor.sendSettings(this.settings);
     }       
} 



// --------------------------------------------------------------------- remove
/**
 * Removes specified settings to existing array.
 *  
 * @name remove
 * @memberOf AEd.entities.SettingsManager
 * @function
 * @param {Array} aRemoveSettings array. 
 *  	
 */
AEd.entities.SettingsManager.prototype.remove = function(aRemoveSettings) {
     if (aRemoveSettings) {

        for (var i=0; i < aRemoveSettings.length; i++) {  
            var j = 0;
            while (j < this.settings.length) {
                if (aRemoveSettings[i].name == this.settings[j].name) {
                    this.removeSettingsByIndex(j);
                }
                else {
                    j++;
                }                   
            }            
        }
        
        this.editor.sendSettings(this.settings);
     }       
} 



// ---------------------------------------------------------- removeAllSettings
/**
 * Removes all settings.
 *  
 * @name removeAllSettings
 * @memberOf AEd.entities.SettingsManager
 * @function
 *  	
 */
AEd.entities.SettingsManager.prototype.removeAllSettings = function() {
     this.settings = null;
} 

  
  
// ------------------------------------------------------ removeSettingsByIndex
/**
 * Removes settings by index.
 *  
 * @name removeSettingsByIndex
 * @memberOf AEd.entities.SettingsManager
 * @function
 * @param {Number} index Index of item to be removed. 
 *  	
 */
AEd.entities.SettingsManager.prototype.removeSettingsByIndex = function(index) {
      if (index >= 0 && index < this.settings.length) {
         this.settings.splice(index, 1);
      }
}  


    
// ------------------------------------------------------------- getValueByName
/**
 * Returns value of setting with specified name.
 *  
 * @name getValueByName
 * @memberOf AEd.entities.SettingsManager
 * @function
 * @param {String} name Name of parameter. 
 * @return {String} Value of parameter.
 *  	
 */
AEd.entities.SettingsManager.prototype.getValueByName = function(name) {
      if (name) {
          for(var i=0; i<this.settings.length; i++) {
              if (this.settings[i].name == name) {
                  return this.settings[i].value;
              }
          }
          return null;
      }
      else {
          return null;
      }
}  



// ------------------------------------------------------------ getObjectByName
/**
 * Returns one setting object with specified name.
 *  
 * @name getObjectByName
 * @memberOf AEd.entities.SettingsManager
 * @function
 * @param {String} name Name of parameter. 
 * @return {Object} setting object.   
 *  	
 */
AEd.entities.SettingsManager.prototype.getObjectByName = function(name) {
      if (name) {
          for(var i=0; i<this.settings.length; i++) {
              if (this.settings[i].name == name) {
                  return this.settings[i];
              }
          }
          return null;
      }
      else {
          return null;
      }
}  


  
// -------------------------------------------------------------------- addRule
/**
 * Appends rule to this.rules array. 
 * @example
 * ruleObject = {
 *    name: String,  // Optional rule name 
 *    regExp: String, // Regular expression that is used to match the setting names
 *    onApply: Function // Fuction to execute when setting name matches the regExp 
 *    onApplyScope: Object 
 *    onClean: Function // Function to execute when we want to take back the 
 *                       // changes made by onApply function  
 *    onCleanScope: Object                    
 * } 
 *  
 *  
 * @name addRule
 * @memberOf AEd.entities.SettingsManager
 * @function
 * @param {Array} oRule Rule object. 
 *  	
 */
AEd.entities.SettingsManager.prototype.addRule = function(oRule) {
     if (oRule) {
        this.rules.push(oRule);
     }       
} 



// ----------------------------------------------------------------- removeRule
/**
 * Removes rule from this.rules array. 
 * @example
 * ruleObject = {
 *    name: String,  // Optional rule name  
 *    regExp: String, // Regular expression that is used to match the setting names
 *    onApply: Function // Fuction to execute when setting name matches the regExp 
 *    onApplyScope: Object 
 *    onClean: Function // Function to execute when we want to take back the 
 *                       // changes made by onApply function  
 *    onCleanScope: Object                    
 * } 
 *  
 *  
 * @name removeRule
 * @memberOf AEd.entities.SettingsManager
 * @function
 * @param {Array} oRule Rule object to remove. 
 *  	
 */
AEd.entities.SettingsManager.prototype.removeRule = function(oRule) {
     if (oRule) {
        for (var i=0; i<this.rules.length; i++) {
            if (this.rules[i] === oRule) {
                this.rules.slice(i, 1);
            }
        }
     }       
} 



// ----------------------------------------------------------------- applyRules
/**
 * Calls onApply function of all rules
 * @example
 * ruleObject = {
 *    name: String,  // Optional rule name
 *    regExp: String, // Regular expression that is used to match the setting names
 *    onApply: Function // Fuction to execute when setting name matches the regExp 
 *    onApplyScope: Object 
 *    onClean: Function // Function to execute when we want to take back the 
 *                       // changes made by onApply function  
 *    onCleanScope: Object                    
 * } 
 *  
 *  
 * @name applyRules
 * @memberOf AEd.entities.SettingsManager
 * @function
 *  	
 */
AEd.entities.SettingsManager.prototype.applyRules = function() {
     
   if(this.settings){ 
     for (var s=0; s<this.settings.length; s++) {
         for (var i=0; i<this.rules.length; i++) {
              if (this.settings[s].name.match(this.rules[i].regExp)) {
                  var scope = window;                                  
                  if (this.rules[i].onApplyScope) {                                  
                        scope = this.rules[i].onApplyScope;                          
                  }                                                                  
                  this.rules[i].onApply.call(scope, this.settings[s]);  
                               
              }
         }          
     }
   }    
} 



// ----------------------------------------------------------------- cleanRules
/**
 * Calls onClean function of all rules
 * @example
 * ruleObject = {
 *    name: String,  // Optional rule name 
 *    regExp: String, // Regular expression that is used to match the setting names
 *    onApply: Function // Fuction to execute when setting name matches the regExp 
 *    onApplyScope: Object 
 *    onClean: Function // Function to execute when we want to take back the 
 *                       // changes made by onApply function  
 *    onCleanScope: Object                    
 * } 
 *  
 * @name cleanRules
 * @memberOf AEd.entities.SettingsManager
 * @function
 *  	
 */
AEd.entities.SettingsManager.prototype.cleanRules = function() {
 
   if(this.settings){    
     for (var s=0; s<this.settings.length; s++) {
         for (var i=0; i<this.rules.length; i++) {
              var scope = window;
              if (this.rules[i].onCleanScope) {
                    scope = this.rules[i].onCleanScope;
              }
              this.rules[i].onClean.call(scope, this.settings[s]);
         }          
     }    
   }
} 

// *****************************************************************************
// class AEd.entities.SettingsManager
// ***************************************************************************** 

/**
 * GroupsManager.js
 *
 * Contains AEd.entities.GroupsManager class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.entities.GroupsManager
// *****************************************************************************  



/**
 * This class provides functionality for groups entities.
 * 
 * oGroup = {
 *     uri : String,
 *     name : String 
 *     persons: Array of oPerson 
 * }   
 * oPerson = {
 *    id: String,
 *    login: String,
 *    name: String,
 *    email: String,
 *    photoUri: String, 
 *    groups: Array of oGroup
 * }     
 *
 *
 * @name GroupsManager
 * @memberOf AEd.entities      
 * @class 
 * @param {Aed.editors.Editor} editor Editor instance. 	 
 * @property {Array} groups Collection of groups. 	 		  
 */
AEd.entities.GroupsManager = function(editor) {

   this.editor   = editor;
   this.groups   = new Array();

  
}


AEd.entities.GroupsManager.prototype.constructor = AEd.entities.GroupsManager;



// ------------------------------------------------------------------ setGroups
/**
 * Sets new Groups array.
 *  
 * @name setGroups
 * @memberOf AEd.entities.GroupsManager
 * @function
 * @param {Array} aGroups Groups array. 
 *  	
 */
AEd.entities.GroupsManager.prototype.setGroups = function(aGroups) {
     this.groups = aGroups;
} 



// ------------------------------------------------------------------ getGroups
/**
 * Gets Groups array.
 *  
 * @name getGroups
 * @memberOf AEd.entities.GroupsManager
 * @function
 * @return {Array} aGroups Groups array. 
 *  	
 */
AEd.entities.GroupsManager.prototype.getGroups = function() {
     return this.groups;
} 



// ------------------------------------------------------------ removeAllGroups
/**
 * Removes all Groups.
 *  
 * @name removeAllGroups
 * @memberOf AEd.entities.GroupsManager
 * @function
 *  	
 */
AEd.entities.GroupsManager.prototype.removeAllGroups = function() {
     this.groups = null;
} 


    
// -------------------------------------------------------------- getGroupByUri
/**
 * Returns group with specified uri.
 *  
 * @name getGroupByUri
 * @memberOf AEd.entities.GroupsManager
 * @function
 * @param {String} uri Uri of group. 
 * @return {Object} Group Object.
 *  	
 */
AEd.entities.GroupsManager.prototype.getGroupByUri = function(uri) {
      if (uri) {
          for(var i=0; i<this.groups.length; i++) {
              if (this.groups[i].uri == uri) {
                  return this.groups[i];
              }
          }
      }
      else {
          return null;
      }
}  



// *****************************************************************************
// class AEd.entities.PersonsManager
// ***************************************************************************** 
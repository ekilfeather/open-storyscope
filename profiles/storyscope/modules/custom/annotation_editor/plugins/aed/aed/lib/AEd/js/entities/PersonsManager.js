/**
 * PersonsManager.js
 *
 * Contains AEd.entities.PersonsManager class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.entities.PersonsManager
// *****************************************************************************  



/**
 * This class provides functionality for persons entities.
 * person = {
 *    id: String,
 *    login: String,
 *    name: String,
 *    email: String,
 *    photoUri: String, 
 *    groups: Array of oGroup
 * }     
 * 
 * oGroup = {
 *     uri : String,
 *     name : String 
 * }  
 *
 * @name PersonsManager
 * @memberOf AEd.entities      
 * @class 
 * @param {Aed.editors.Editor} editor Editor instance. 	 
 * @property {Array} persons Collection of persons.  	 		  
 */
AEd.entities.PersonsManager = function(editor) {

   this.editor   = editor;
   this.persons = new Array();

  
}


AEd.entities.PersonsManager.prototype.constructor = AEd.entities.PersonsManager;



// ----------------------------------------------------------------- setPersons
/**
 * Sets new persons array.
 *  
 * @name setPersons
 * @memberOf AEd.entities.PersonsManager
 * @function
 * @param {Array} aPersons Persons array. 
 *  	
 */
AEd.entities.PersonsManager.prototype.setPersons = function(aPersons) {
     this.persons = aPersons;
} 



// ----------------------------------------------------------------- getPersons
/**
 * Gets persons array.
 *  
 * @name getPersons
 * @memberOf AEd.entities.PersonsManager
 * @function
 * @return {Array} aPersons Persons array. 
 *  	
 */
AEd.entities.PersonsManager.prototype.getPersons = function() {
     return this.persons;
} 



// ----------------------------------------------------------- removeAllPersons
/**
 * Removes all persons.
 *  
 * @name removeAllPersons
 * @memberOf AEd.entities.PersonsManager
 * @function
 *  	
 */
AEd.entities.PersonsManager.prototype.removeAllPersons = function() {
     this.persons = null;
} 


    
// -------------------------------------------------------------- getPersonById
/**
 * Returns person with id.
 *  
 * @name getPersonById
 * @memberOf AEd.entities.PersonsManager
 * @function
 * @param {String} id Id of person. 
 * @return {Object} Person Object.
 *  	
 */
AEd.entities.PersonsManager.prototype.getPersonById = function(id) {
      if (id) {
          for(var i=0; i<this.persons.length; i++) {
              if (this.persons[i].id == id) {
                  return this.persons[i];
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
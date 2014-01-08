/**
 * EditorsManager.js
 *
 * Contains AEd.editors.EditorsManager class definition.
 *  
 * @author: Martin Kleban 
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.editors.EditorsManager 
// ***************************************************************************** 


     
/**
 * EditorsManager class is used to manage multiple annotation editor instances. 
 *       
 * @name EditorsManager
 * @memberOf AEd.editors        
 * @class 
 * @static 
 *      
 */
AEd.editors.EditorsManager = (function() {
        

    // *************************************************************************
    // constants
    // *************************************************************************   



    // *************************************************************************
    // variables
    // *************************************************************************   
    
    // object to return
    var t = {};
    
    // short                      
    var Dispatcher = AEd.utils.Dispatcher;      
    
    // tmp variable for generating IDs for editors  
    var idSeed = 0;    
        
    // *************************************************************************
    // EditorsManager public properties
    // *************************************************************************               
        
    /**
     * Collection of editor instances.             
     * @name editors
     * @memberOf AEd.editors.EditorsManager
     * @type Object                   
     */                                  
    t.editors = {};


    /**
     * Number of editor instances.             
     * @name editorsCount
     * @memberOf AEd.editors.EditorsManager
     * @type Number                   
     */                                  
    t.editorsCount = 0;
        
 
   /**
     * Reference to currently active annotations editor instance.        
     * @name activeEditor
     * @memberOf AEd.editors.EditorsManager
     * @type AEd.editor.Editor                   
     */  
    t.activeEditor = null;        

 
    // *************************************************************************
    // EditorsManager events
    // ************************************************************************* 
 
    /**
     * Fires when a new annotations editor instance is created and added to 
     * the editors collection.
     * 
     * @name onCreateEditor
     * @memberOf AEd.editors.EditorsManager          
     * @event 
     * @param {AEd.editor.Editor} editor Editor instance.                                                   
     */           
    t.onCreateEditor = new Dispatcher();   
        
    /**
     * Fires BEFORE some annotations editor instance is destroyed and
     * removed from editors collection.
     * 
     * @name onDestroyEditor
     * @memberOf AEd.editors.EditorsManager        
     * @event 
     * @param {AEd.editor.Editor} editor Editor instance.                                                   
     */           
    t.onDestroyEditor = new Dispatcher();          

    /**
     * Fires after some annotations editor instance is activated 
     * 
     * @name onActivatedEditor
     * @memberOf AEd.editors.EditorsManager        
     * @event 
     * @param {AEd.editor.Editor} editor Activated editor instance.                                                   
     */           
    t.onActivatedEditor = new Dispatcher();      
          
    /**
     * Fires after some annotations editor instance is deactivated 
     * 
     * @name onDeactivatedEditor
     * @memberOf AEd.editors.EditorsManager        
     * @event 
     * @param {AEd.editor.Editor} editor Deactivated editor instance.                                                   
     */           
    t.onDeactivatedEditor = new Dispatcher();             
          
    // *************************************************************************
    // EditorsManager PUBLIC methods
    // *************************************************************************  
        
        
    // -------------------------------------------- EditorsManager.createEditor 
    /**
     * Creates an editor instance and adds it to the editors collection.
     *  
     * @example                                    
     * myID = AEd.EM.createEditor({
     *          editorType: "tinymce",
     *          editorNativeObject: ed,
     *          resourceUri: "http://localhost:8080/Annotations/doc2.html"     
     *        }); 
     *               
     * @name createEditor
     * @memberOf AEd.editors.EditorsManager  
     * @function            
     * @public           
     * @param {Object} configObject Configuration object.	
     * @return {Object} Returns unique annotations editor ID or 0 when error occured and no editor was created.      
     */
    t.createEditor = function(configObject) { 
            
        if (configObject) {
            if (configObject.editorType && configObject.editorNativeObject)  {
                var newID = _generateEditorId();

                var newEditor = new AEd.editors.Editor({
                   id: newID,
                   editorType: configObject.editorType,
                   editorNativeObject: configObject.editorNativeObject,
                   resourceUri: configObject.resourceUri,
                   resourceLogin: configObject.resourceLogin,
                   resourceToken: configObject.resourceToken,
                   resourceSystem: configObject.resourceSystem
                });

                t.editors[newID] = newEditor;
                _setActive(newEditor);
                t.editorsCount++;
                t.onCreateEditor.fire(newEditor);  
                                                  
                return newID;                  
            }
            else {
                return 0;
            }      
        }
        else {
            return 0;
        }
    }



    // ------------------------------------------- EditorsManager.destroyEditor 
    /**
     * Destroys Editor instance and removes it from the editors collection.
     *       
     * @name destroyEditor
     * @memberOf AEd.editors.EditorsManager  
     * @function       
     * @public           
     * @param {Object} id ID of Editor instance to be destroyed.	
     */
    t.destroyEditor = function(id) {              
        
        if (id) {
           if (t.editors[id]) {
                t.editors[id].disconnect(true, t, id);               
           }          
        }

    }        



    // ------------------------------------------ EditorsManager.activateEditor
    /**
     * Activates editor with specified ID.
     *       
     * @name activateEditor
     * @memberOf AEd.editors.EditorsManager  
     * @function       
     * @public           
     * @param {Object} id ID of Editor instance to be activated. 
     * @return {AEd.Editor} Activated editor instance.     
     */
    t.activateEditor = function(id) {              
        if (id) {
            return _setActive(id, true);
        }
        else {
            return null;
        }
    }  



    // ----------------------------- EditorsManager.deactivateEditor
    /**
     * Deactivates editor with specified ID.
     *       
     * @name deactivateEditor
     * @memberOf AEd.editors.EditorsManager  
     * @function       
     * @public           
     * @param {Object} id ID of Editor instance to be deactivated. 
     * @return {AEd.Editor} Deactivated editor instance.     
     */
    t.deactivateEditor = function(id) {              
        if (id) {
            return _setActive(id, false);
        }
        else {
            return null;
        }
    }  
    
    // *************************************************************************
    // EditorsManager PRIVATE methods
    // *************************************************************************  
        
        
    // ---------------------------------------------- EditorsManager._setActive 
    /**
     * Sets editor with specified ID to activated or deactivated  
     * due to active parameter. 
     *       
     * @method _setActive
     * @private         
     * @param {AEd.Editor} editor Editor instance to be activated.	
     * @param {Boolean} active True or false value - activate or deactivate editor.     
     * @return {AEd.Editor} Activated or deactivated editor instance.  
     */
    var _setActive = function(id, active) {
        if (id) {
            if (t.editors[id]) {  // Editor with id exists
                if (typeof active != 'undefined') {
                    if (active) {   // Activate editor
                        if (t.activeEditor) {  // Deactivate currently active editor
                            t.activeEditor.setActive(false);
                            t.onDeactivatedEditor.fire(t.activeEditor);                        
                        }                             
                        t.activeEditor = t.editors[id];   // Activate editor due to parameters
                        t.activeEditor.setActive(true); 
                        t.onActivatedEditor.fire(t.activeEditor)
                        return t.activeEditor;
                    }
                    else {   // Deactivate editor
                        t.editors[id].setActive(false);
                        t.onDeactivatedEditor.fire(t.editors[id]);
                        t.activeEditor = null;  
                        return t.editors[id];
                    }
                }
                else {
                    return null;
                }              
            }
            else {
                return null;
            }           
        }
        else {
            return null;
        }
    }        
        
    // --------------------------------------- EditorsManager._generateEditorId 
    /**
     * Generates unique editor's ID. 
     *       
     * @method _generateEditorId
     * @private         	
     * @return {Number} Unique editor's ID.  
     */
    var _generateEditorId = function() {      
        idSeed++;        
        return AEd.CONFIG.EDITOR_ID_PREFIX + idSeed;
    }          
        
    // *************************************************************************
    // return
    // *************************************************************************               

    
    return t; 

})();



// *****************************************************************************
// class AEd.editors.EditorsManager 
// ***************************************************************************** 



// shorten name
AEd.EM = AEd.editors.EditorsManager;

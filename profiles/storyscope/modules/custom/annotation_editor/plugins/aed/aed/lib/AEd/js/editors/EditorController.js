/**
 * EditorController.js
 *
 * Contains AEd.editors.EditorController class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.editors.EditorController 
// *****************************************************************************  



/**
 * This class is used to create editor controller.
 *       
 * @name EditorController
 * @memberOf AEd.editors        
 * @class 
 * @param {AEd.editors.Editor} editor Editor instance  
 */
AEd.editors.EditorController = function(editor) {
    

   // if there is no or wrong editor object passed
    if (!editor || !(editor instanceof AEd.editors.Editor)) {
        throw new Error(AEd.I18n.t("Error_AEd_editors_EditorController_Missing_editor_instance_argument"));
    }
        
    /**
     * Editor instance.
     * @name editor
     * @memberOf AEd.editors.EditorController
     * @type AEd.editors.Editor     
     * @property                              
     */      
    this.editor = editor;
    
    /**
     * Editor GUI instance.
     * @name gui
     * @memberOf AEd.editors.EditorController
     * @type AEd.editors.EditorGUI     
     * @property                              
     */      
    this.gui = editor.gui;    
 

}


AEd.editors.EditorController.prototype.constructor = AEd.editors.EditorController;



// ----------------------------------------------------------------------- init
/**
 *  
 *
 * @name init
 * @memberOf AEd.editors.EditorController
 * @function   
 *  	
 */
AEd.editors.EditorController.prototype.init = function() {
    
} 





// *****************************************************************************
// class AEd.editors.EditorController 
// ***************************************************************************** 
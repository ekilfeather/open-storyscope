/**
 * DialogManager.js
 *
 * Contains AEd.ui.DialogManager class definition.
 *  
 * @author: Martin Kleban 
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.ui.DialogManager
// ***************************************************************************** 


     
/**
 * DialogManager singleton is used to manage all dialogs of annotations editor. 
 * 
 * @name DialogManager
 * @memberOf AEd.ui        
 * @class 
 * @static       
 *      
 */
AEd.ui.DialogManager = (function() {
        

    // *************************************************************************
    // variables
    // *************************************************************************   
    
    // object to return
    var t = {};        
        
    // *************************************************************************
    // DialogManager public properties
    // *************************************************************************               
    t.Z_INDEX_DLG               = AEd.CONFIG.Z_INDEX_DLG;
    t.Z_INDEX_DLG_FRONT         = AEd.CONFIG.Z_INDEX_DLG_FRONT;
    t.Z_INDEX_DLG_MODAL         = AEd.CONFIG.Z_INDEX_DLG_MODAL;
    t.Z_INDEX_DLG_DOUBLEMODAL   = AEd.CONFIG.Z_INDEX_DLG_DOUBLEMODAL
    t.Z_INDEX_TOOLBAR           = AEd.CONFIG.Z_INDEX_DLG_TOOLBAR;
    t.Z_INDEX_TOOLBAR_FRONT     = AEd.CONFIG.Z_INDEX_DLG_TOOLBAR_FRONT;

    t.Z_INDEX_DLG_TOOLBAR       = AEd.CONFIG.Z_INDEX_DLG_TOOLBAR;
    t.Z_INDEX_DLG_TOOLBAR_FRONT = AEd.CONFIG.Z_INDEX_DLG_TOOLBAR_FRONT;
    t.Z_INDEX_ANNO              = AEd.CONFIG.Z_INDEX_DLG_ANNO;
    t.Z_INDEX_ANNO_FRONT        = AEd.CONFIG.Z_INDEX_DLG_ANNO_FRONT;
   
    t.openDialogs = new Array();
    t.openToolbars = new Array();
    t.openAnnotations = new Array();
    
    t.frontDialog = null;
    t.frontToolbar = null;
    t.frontAnnotation = null;   
    
    t.isDialog = {};
    t.isModal = {};
    t.isToolbar = {};
    t.isAnnotation = {};  
 
    // *************************************************************************
    // DialogManager events
    // ************************************************************************* 
 
          
    // *************************************************************************
    // DialogManager PUBLIC methods
    // *************************************************************************  
        
        
    // -------------------------------------------------------------------- add 
    /**
     * Adds a new dialog to manage.
     *       
     * @name add
     * @memberOf AEd.ui.DialogManager            
     * @function      
     * @public           
     * @param {AEd.ui.UIDialog || AEd.ui.Toolbar} dialog Dialog to add.	
     * @param {String} type Type of dialog - "dialog" || "annotation" || "modal" || "toolbar"
     */
    t.add = function(dialog, type) {              
        
        if (dialog) {
            if (type) {
                switch (type) {
                    case "modal":
                        dialog.setZIndex(t.Z_INDEX_DLG_MODAL);
                        t.openDialogs.push(dialog);
                        dialog.setTag("dialogType", "modal");
                    break;

                    case "doublemodal":
                        dialog.setZIndex(t.Z_INDEX_DLG_DOUBLEMODAL);
                        t.openDialogs.push(dialog);
                        dialog.setTag("dialogType", "modal");
                    break;
                    
                    case "toolbar":
                        dialog.setZIndex(t.Z_INDEX_TOOLBAR_FRONT);
                        t.openToolbars.push(dialog);
                        if (t.frontToolbar) {
                           t.frontToolbar.setZIndex(t.Z_INDEX_TOOLBAR);  
                        }  
                        t.frontToolbar = dialog;   
                        dialog.setTag("dialogType", "toolbar");
                        dialog.onClick.addHandler(t.bringToFront, t);      
                    break;   
                    
                    case "annotation":
                        dialog.setZIndex(t.Z_INDEX_DLG_ANNO_FRONT);
                        t.openAnnotations.push(dialog);
                        if (t.frontAnnotation) {
                           t.frontAnnotation.setZIndex(t.Z_INDEX_DLG_ANNO);  
                        }  
                        t.frontAnnotation = dialog;   
                        dialog.setTag("dialogType", "annotation");
                        dialog.onClick.addHandler(t.bringToFront, t);                    
                    break;    
                    
                    case "dialog":
                        dialog.setZIndex(t.Z_INDEX_DLG_FRONT);
                        t.openDialogs.push(dialog);
                        if (t.frontDialog) {
                           t.frontDialog.setZIndex(t.Z_INDEX_DLG);  
                        }  
                        t.frontDialog = dialog; 
                        dialog.setTag("dialogType", "dialog");
                        dialog.onClick.addHandler(t.bringToFront, t);                      
                    break;                                                          
                    
                    default:
                    break;
                }
            }             
        }  
    }

    // ----------------------------------------------------------------- remove 
    /**
     * Removes dialog from dialog manager.
     *       
     * @name remove
     * @memberOf AEd.ui.DialogManager            
     * @function      
     * @public           
     * @param {AEd.ui.UIDialog || AEd.ui.Toolbar} dialog Dialog to add.	
     */
    t.remove = function(dialog) {              
        
        if (dialog) {
            var tag = dialog.getTag("dialogType");
            if (tag) {
                switch (tag) {
                    case "modal": 
                    case "dialog":                     
                         if (t.frontDialog === dialog) {
                            t.frontDialog = null; 
                         }      
                         for (var i = 0; i < t.openDialogs.length; i++) {
                            if (t.openDialogs[i] === dialog) {
                               t.openDialogs.splice(i, 1);
                               break;
                            }
                         }  
                         dialog.onClick.removeHandler(t.bringToFront);                   
                    break;
                    
                    case "annotation":                                                  
                         if (t.frontAnnotation === dialog) {
                            t.frontAnnotation = null; 
                         }      
                         for (var i = 0; i < t.openAnnotations.length; i++) {
                            if (t.openAnnotations[i] === dialog) {
                               t.openAnnotations.splice(i, 1);
                               break;
                            }
                         }
                         dialog.onClick.removeHandler(t.bringToFront);                                              
                    break;                    
                    
                    case "toolbar":
                         if (t.frontToolbar === dialog) {
                            t.frontToolbar = null; 
                         }      
                         for (var i = 0; i < t.openToolbars.length; i++) {
                            if (t.openToolbars[i] === dialog) {
                               t.openToolbars.splice(i, 1);
                               break;
                            }
                         }
                         dialog.onClick.removeHandler(t.bringToFront);                      
                    break;
                    
                    default:
                    break;
                }               
            }
        }
    }
    
    
    
    
    // ----------------------------------------------------------- bringToFront 
    /**
     * Brings dialog to front.
     *       
     * @name bringToFront
     * @memberOf AEd.ui.DialogManager            
     * @function      
     * @public           
     * @param {AEd.ui.UIDialog || AEd.ui.Toolbar} dialog Dialog.	
     */
    t.bringToFront = function(dialog) {              
        
        if (dialog) {
            var tag = dialog.getTag("dialogType");
            if (tag) { 
                switch (tag) {
                    case "dialog":
                         if (t.frontDialog) {
                            t.frontDialog.setZIndex(t.Z_INDEX_DLG);  
                         }    
                         dialog.setZIndex(t.Z_INDEX_DLG_FRONT);  
                         t.frontDialog = dialog;                                         
                    break;
                    
                    case "annotation":
                         if (t.frontAnnotation) {
                            t.frontAnnotation.setZIndex(t.Z_INDEX_DLG_ANNO);  
                         }    
                         dialog.setZIndex(t.Z_INDEX_DLG_ANNO_FRONT);  
                         t.frontAnnotation = dialog;                                         
                    break;  
                    
                    case "toolbar":
                         if (t.frontToolbar) {
                            t.frontToolbar.setZIndex(t.Z_INDEX_DLG_TOOLBAR);  
                         }    
                         dialog.setZIndex(t.Z_INDEX_DLG_TOOLBAR_FRONT);  
                         t.frontToolbar = dialog;                                         
                    break;                      
                                      
                    default:
                    break;
                }                    
            }       
        }
    }    
    
    
    // *************************************************************************
    // DialogManager PRIVATE methods
    // *************************************************************************  
        
  
        
        
        
    // *************************************************************************
    // return
    // *************************************************************************               
    
    return t; 

})();



// *****************************************************************************
// class AEd.ui.DialogManager 
// ***************************************************************************** 



// shorten name
AEd.Dialogs = AEd.ui.DialogManager;

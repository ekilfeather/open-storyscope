/**
 * DlgDocAnnotations.js
 *
 * Contains AEd.ui.DlgDocAnnotations class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgDocAnnotations
// *****************************************************************************  



/**
 * This class creates DlgDocAnnotations.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *  
 *    {String}  title         - dialog title text, 
 *    {String}  width         - dialog width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height        - dialog height with or without units, e.g.: "300px" or "100%", default unit is px,  
 *    {String}  minWidth      - dialog minWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  minHeight     - dialog minHeight with or without units, e.g.: "300px" or "100%", default unit is px,   
 *    {String}  maxWidth      - dialog maxWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  maxHeight     - dialog maxHeight with or without units, e.g.: "300px" or "100%", default unit is px,    
 *    {String}  corners       - rounded dialog corners: "tl", "tr", "bl", "br", "top", "bottom", "right", "left", "all", "none", default is "all",  
 *    
 *    {Boolean} draggable     - will be dialog draggable?, 
 *    {Boolean} resizable     - will be dialog resizable?,  
 *    {Boolean} render        - determines wheteher dialog should be rendered after creating
 *    {Boolean} center        - determines wheteher dialog should be centered to screen after rendering
 *    {Boolean} allwaysOnTop  - will be this dialog allways in the front of other dialogs?,        
 *    
 *    {Boolean} showOverlay   - will the overlay layer be displayed?,    
 *    
 *    {Element} srcElement     - DOM element to create dialog from. 
 *    {Element} targetElement  - DOM element to render dialog to. Default is document.body. 
 *    {Element} contentElement - DOM element to place as a content of dialog. Default is none.
 * }
 * 
 * @name DlgDocAnnotations
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgDocAnnotations = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_docAnnotations_title");
   c.width     = AEd.CONFIG.DLG_DOCANNOTATIONS_WIDTH;
   c.height    = AEd.CONFIG.DLG_DOCANNOTATIONS_HEIGHT;      
   c.showOverlay = false;
   c.resizable = true;
   c.autoInit = false;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);  
      
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_DOCANNOTATIONS);
   
   this.contentLoaded = false;
   
   // Buttons
   this.btnClose    = new AEd.ui.core.UIButton({icon: "close"});
   this.headerButtonsArea.addItem(this.btnClose);
   
   // Inputs
     
   this.onRender.addHandler(function() {
           this.contentLoaded = true;
           this.onContentLoaded.fire(this); 
           this.setWidth(this.width);
           this.setHeight(this.height);
   },this );
}



AEd.ui.DlgDocAnnotations.prototype.constructor = AEd.ui.DlgDocAnnotations;

AEd.inheritFromPrototype(AEd.ui.DlgDocAnnotations, AEd.ui.core.UIDialog);



// ------------------------------------------------------------------------ add
/**
 * Adds a new document annotations to dialog
 *
 * @name add
 * @memberOf AEd.ui.DlgDocAnnotations 
 * @function   
 * @param {AEd.entities.Annotation} annotation New annotation.  
 */
AEd.ui.DlgDocAnnotations.prototype.add = function(annotation) {
    if (annotation) {
        this.contentArea.addItem(annotation, 0);
    }
}



// --------------------------------------------------------------------- remove
/**
 * Removes document annotations from dialog
 *
 * @name remove
 * @memberOf AEd.ui.DlgDocAnnotations 
 * @function   
 * @param {AEd.entities.Annotation} annotation Annotation to remove.
 */
AEd.ui.DlgDocAnnotations.prototype.remove = function(annotation) {
    // removing annotation
    if (annotation) {        
            this.contentArea.removeItem(annotation);               
    }
    // removing whole dialog
    else {
       if (this.elementTarget && this.elementRoot && this.isRendered) {
          this.onRemove.fire();             
          if (this.hasOverlay && this.elementOverlay) {
             this.elementTarget.removeChild(this.elementOverlay);
          }           
          this.elementTarget.removeChild(this.elementRoot);
          this.isRendered = false;
       }
    }
}



// *****************************************************************************
// class AEd.ui.DlgDocAnnotations
// ***************************************************************************** 

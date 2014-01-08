/**
 * DlgDocSuggestions.js
 *
 * Contains AEd.ui.DlgDocSuggestions class definition. 
 *  
 * @author: Petr Loukota 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgDocSuggestions
// *****************************************************************************  



/**
 * This class creates DlgDocSuggestions.
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
 * @name DlgDocSuggestions
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgDocSuggestions = function(config) {
    
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_docSuggestions_title");
   c.width     = AEd.CONFIG.DLG_DOCSUGGESTIONS_WIDTH;
   c.height    = AEd.CONFIG.DLG_DOCSUGGESTIONS_HEIGHT;      
   c.showOverlay = false;
   c.resizable = true;
   c.autoInit = false;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);  
      
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_DOCSUGGESTIONS);
   
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



AEd.ui.DlgDocSuggestions.prototype.constructor = AEd.ui.DlgDocSuggestions;

AEd.inheritFromPrototype(AEd.ui.DlgDocSuggestions, AEd.ui.core.UIDialog);



// ------------------------------------------------------------------------ add
/**
 * Adds a new document suggestions to dialog
 *
 * @name add
 * @memberOf AEd.ui.DlgDocSuggestions 
 * @function   
 * @param {AEd.entities.Suggestion} suggestion New suggestion.  
 */
AEd.ui.DlgDocSuggestions.prototype.add = function(suggestion) {
    if (suggestion) {
        this.contentArea.addItem(suggestion, 0);
    }
}



// --------------------------------------------------------------------- remove
/**
 * Removes document suggestions from dialog
 *
 * @name remove
 * @memberOf AEd.ui.DlgDocSuggestions 
 * @function   
 * @param {AEd.entities.Suggestion} suggestion Suggestion to remove.
 */
AEd.ui.DlgDocSuggestions.prototype.remove = function(suggestion) {
    // removing suggestion
    if (suggestion) {        
            this.contentArea.removeItem(suggestion);               
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
// class AEd.ui.DlgDocSuggestions
// ***************************************************************************** 

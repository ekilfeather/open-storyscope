/**
 * DlgSuggestedAnnotations.js
 *
 * Contains AEd.ui.DlgSuggestedAnnotations class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgSuggestedAnnotations
// *****************************************************************************  



/**
 * This class creates DlgSuggestedAnnotations.
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
 * @name DlgSuggestedAnnotations
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgSuggestedAnnotations = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_suggestedAnnotations_title");
   c.width     = AEd.CONFIG.DLG_SUGGESTED_ANNOTATIONS_WIDTH;
   c.height    = AEd.CONFIG.DLG_SUGGESTED_ANNOTATIONS_HEIGHT;      
   c.showOverlay = false;
   c.resizable = true;
   c.autoInit = false;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);  
      
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_SUGGESTED_ANNOTATIONS);
   
   this.contentLoaded = false;
   
   this.position = 0;
   
   // *************************************************************************
   // EVENTS
   // ************************************************************************* 
   
   /**
    * Fires on mouse over content area.
    * 
    * @event onMouseOverContentArea                                                 
    */         
   this.onMouseOverContentArea = new AEd.utils.Dispatcher();
   
   /**
    * Fires on mouse out of content area.
    * 
    * @event onMouseOutContentArea                                                 
    */         
   this.onMouseOutContentArea = new AEd.utils.Dispatcher();
   
   /**
    * Fires on click on content area.
    * 
    * @event onMouseOutContentArea                                                 
    */
   this.onClickContentArea = new AEd.utils.Dispatcher();
   
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



AEd.ui.DlgSuggestedAnnotations.prototype.constructor = AEd.ui.DlgSuggestedAnnotations;

AEd.inheritFromPrototype(AEd.ui.DlgSuggestedAnnotations, AEd.ui.core.UIDialog);



// ------------------------------------------------------------------------ add
/**
 * Adds a new suggestion to dialog
 *
 * @name add
 * @memberOf AEd.ui.DlgSuggestedAnnotations 
 * @function   
 * @param {AEd.entities.Suggestion} suggestion New suggestion.
 * @param (Number) tmpId Suggestion tmpId.   
 */
AEd.ui.DlgSuggestedAnnotations.prototype.add = function(suggestion, tmpId) {
    if (suggestion) {
        this.contentArea.addItem(suggestion, this.position);
        
        var stop = false;      
        this.contentArea.items[this.contentArea.items.length - 1].onMouseOver.addHandler(function(e) {
            this.onMouseOverContentArea.fire(tmpId);
            stop = true;          
        }, this);
        
        this.contentArea.onMouseOut.addHandler(function() {
            if (!stop) {
            this.onMouseOutContentArea.fire();
            }
            else {
                stop = false;
            }       
        }, this);
        
        this.contentArea.items[this.contentArea.items.length - 1].onClick.addHandler(function(e) {
            this.onClickContentArea.fire();          
        }, this);
        
        this.position++;
    }  
}



// --------------------------------------------------------------------- remove
/**
 * Removes message from status bar dialog or removes whole dialog
 *
 * @name remove
 * @memberOf AEd.ui.DlgSuggestedAnnotations 
 * @function   
 * @param {AEd.entities.Suggestion} suggestion Suggestion to remove.
 */
AEd.ui.DlgSuggestedAnnotations.prototype.remove = function(suggestion) {
    // removing message
    if (suggestion) {        
        this.contentArea.removeItem(suggestion);
        this.position--;               
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
// class AEd.ui.DlgSuggestedAnnotations
// ***************************************************************************** 

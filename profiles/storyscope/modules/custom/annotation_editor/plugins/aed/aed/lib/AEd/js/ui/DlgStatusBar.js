/**
 * DlgStatusBar.js
 *
 * Contains AEd.ui.DlgStatusBar class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgStatusBar
// *****************************************************************************  



/**
 * This class creates DlgStatusBar.
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
 * @name DlgStatusBar
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgStatusBar = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_statusbar_title");
   c.width     = AEd.CONFIG.DLG_STATUSBAR_WIDTH;
   c.height    = AEd.CONFIG.DLG_STATUSBAR_HEIGHT; 
   c.minWidth  = AEd.CONFIG.DLG_STATUSBAR_MIN_WIDTH;
   c.minHeight = AEd.CONFIG.DLG_STATUSBAR_MIN_HEIGHT;   
   c.maxWidth  = AEd.CONFIG.DLG_STATUSBAR_MAX_WIDTH;
   c.maxHeight = AEd.CONFIG.DLG_STATUSBAR_MAX_HEIGHT;       
   c.showOverlay = false;
   c.resizable = true;
   c.autoInit = false;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);  
      
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_STATUSBAR);
   
   this.contentLoaded = false;
   this.DEFAULT_AUTOCLOSE_DELAY = 5000;
   
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
   
   this.itemCount = 0;
   

}



AEd.ui.DlgStatusBar.prototype.constructor = AEd.ui.DlgStatusBar;

AEd.inheritFromPrototype(AEd.ui.DlgStatusBar, AEd.ui.core.UIDialog);


// ------------------------------------------------------------------------ get
/**
 * Gets last message from statusbar
 *
 * @name get
 * @memberOf AEd.ui.DlgStatusBar 
 * @function    
 * @return {AEd.ui.Message} msg
 */
AEd.ui.DlgStatusBar.prototype.get = function() {


   msg = this.contentArea.getItem();
   return msg;  
}


// ------------------------------------------------------------------------ add
/**
 * Adds a new message to status bar dialog
 *
 * @name add
 * @memberOf AEd.ui.DlgStatusBar 
 * @function   
 * @param {AEd.ui.Message} msg New message.
 * @param {Boolean} autoclose Optional - Should be message closed automaticly after default delay?.
 * @param {Number} delay Optional - Custom autoclose delay.  
 */
AEd.ui.DlgStatusBar.prototype.add = function(msg, autoclose, delay) {
    if (msg) {
        this.contentArea.addItem(msg, 0);
        this.itemCount++;
        
        // remove last item when maximum items in status bar
        if (this.itemCount > AEd.CONFIG.MAX_MSGS_IN_STATUS_BAR) {
          this.contentArea.removeItem(this.contentArea.items[0]);  
        }
                
        if (autoclose) {
            if (delay) {
                this.remove(msg, delay);
            }
            else {
                this.remove(msg, this.DEFAULT_AUTOCLOSE_DELAY);
            }
        }
    }
}


// --------------------------------------------------------------------- remove
/**
 * Removes message from status bar dialog or removes whole dialog
 *
 * @name remove
 * @memberOf AEd.ui.DlgStatusBar 
 * @function   
 * @param {AEd.ui.Message} msg Message to remove.
 */
AEd.ui.DlgStatusBar.prototype.remove = function(msg, delay) {
    // removing message
    if (msg) {
        if (delay) {
            t = this;
            setTimeout(function() {
                t.remove(msg);
            }, delay);               
        }
        else {              
            this.contentArea.removeItem(msg);
        }
        
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
// class AEd.ui.DlgStatusBar
// ***************************************************************************** 

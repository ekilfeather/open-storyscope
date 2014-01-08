/**
 * DlgSynchronize.js
 *
 * Contains AEd.ui.DlgSynchronize class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgSynchronize
// *****************************************************************************  



/**
 * This class creates DlgSynchronize.
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
 * @name DlgSynchronize
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgSynchronize = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_synchronize_title");
   c.width     = AEd.CONFIG.DLG_SYNCHRONIZE_WIDTH;
   c.height    = AEd.CONFIG.DLG_SYNCHRONIZE_HEIGHT; 

   c.resizable = true;
   c.autoInit = false;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);  
      
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_SYNCHRONIZE);
   
   this.contentArea.loadFrom(AEd.CONFIG.DLG_SYNCHRONIZE_PATH);
   
   this.contentLoaded = false;
   
   // Buttons
   this.btnClose    = new AEd.ui.core.UIButton({icon: "close"});
   this.btnUpdate    = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_synchronize_button_update_from_server")});  
   this.btnSynchronizeOverwrite    = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_synchronize_button_synchronize_overwrite")});  
   this.btnCancel    = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_synchronize_button_cancel")});  
         
   this.headerButtonsArea.addItem(this.btnClose);
   
   this.buttonsArea.addItem(this.btnUpdate);   
   this.buttonsArea.addItem(this.btnSynchronizeOverwrite); 
   this.buttonsArea.addItem(this.btnCancel); 
   
   // Inputs
   this.iframe = this.contentArea.domElementIframe; 
   this.elementIframe = AEd.$(this.iframe);
     
   this.onRender.addHandler(function() {
   
       // Browsers compatibility
   
       var dstIframe;       

       if (window.opera){  // Opera compatibility
         
         dstIframe = this.iframe;
       }

       else {

         dstIframe  = this.iframe.contentWindow;
       }
  
       AEd.Events.addHandler(dstIframe, "load", function(e) {
           this.contentLoaded = true;
           this.onContentLoaded.fire(this);
           
           this.setWidth(this.width);
           this.setHeight(this.height);   
           this.iframeDocument       = this.iframe.contentWindow.document;
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnDragStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnDragIframeMove, this);
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnResizeStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnResizeIframeMove, this);
       
           this.domElementSynchronizeFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SYNCHRONIZE_ID_SYNCHRONIZE_FIELDSET);
           this.elementSynchronizeFieldset = AEd.$(this.domElementSynchronizeFieldset);
       
           this.domElementSynchronizeInput  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SYNCHRONIZE_ID_SYNCHRONIZE_INPUT);
           this.elementSynchronizeInput = AEd.$(this.domElementSynchronizeInput);
       
       }, this);
   },this );

}



AEd.ui.DlgSynchronize.prototype.constructor = AEd.ui.DlgSynchronize;

AEd.inheritFromPrototype(AEd.ui.DlgSynchronize, AEd.ui.core.UIDialog);



// --------------------------------------------------------------- getInputValue
/**
 * Gets value of "aedSynchronizeInput" input in annotate dialog.
 *
 * @name getInputValue
 * @memberOf AEd.ui.DlgSynchronize 
 * @function   
 * @return {String} Value of aedSynchronizeInput textfield.
 */
AEd.ui.DlgSynchronize.prototype.getInputValue = function() {
    if (this.contentLoaded) {
        if (this.domElementSynchronizeInput) {
            return this.domElementSynchronizeInput.value;
        }
        else {
            return null;
        }
    }
}

// --------------------------------------------------------------- setInputValue
/**
 * Sets value of "aedSynchronizeInput" input in annotate dialog.
 *
 * @name setInputValue
 * @memberOf AEd.ui.DlgSynchronize 
 * @function  
 * @param {String} newValue New Value of aedSynchronizeInput textfield.  
 */
AEd.ui.DlgSynchronize.prototype.setInputValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementSynchronizeInput && newValue) {
            this.domElementSynchronizeInput.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setInputValue(newValue);
        }, this);     
    }
}



// --------------------------------------------------------------- enableUpdateFromServer
/**
 * Enables update document from server.
 *
 * @name enableUpdateFromServer
 * @memberOf AEd.ui.DlgSynchronize 
 * @function  
 */
AEd.ui.DlgSynchronize.prototype.enableUpdateFromServer = function() {
    this.domElementSynchronizeInput.disabled = false;
    this.btnUpdate.setDisabled(false);       
}



// --------------------------------------------------------------- disableUpdateFromServer
/**
 * Disables update document from server.
 *
 * @name disableUpdateFromServer
 * @memberOf AEd.ui.DlgSynchronize 
 * @function 
 */
AEd.ui.DlgSynchronize.prototype.disableUpdateFromServer = function() {
    this.domElementSynchronizeInput.disabled = true;
    this.btnUpdate.setDisabled(true);       
}



// *****************************************************************************
// class AEd.ui.DlgSynchronize
// ***************************************************************************** 

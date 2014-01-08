/**
 * DlgConnect.js
 *
 * Contains AEd.ui.DlgConnect class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgConnect
// *****************************************************************************  



/**
 * This class creates DlgConnect.
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
 * @name DlgConnect
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgConnect = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_connect_title");
   c.width     = AEd.CONFIG.DLG_CONNECT_WIDTH;
   c.height    = AEd.CONFIG.DLG_CONNECT_HEIGHT; 
   c.minWidth  = AEd.CONFIG.DLG_CONNECT_MIN_WIDTH;
   c.minHeight = AEd.CONFIG.DLG_CONNECT_MIN_HEIGHT;   
   c.maxWidth  = AEd.CONFIG.DLG_CONNECT_MAX_WIDTH;
   c.maxHeight = AEd.CONFIG.DLG_CONNECT_MAX_HEIGHT;       
   c.showOverlay = true;
   c.resizable = true;
   c.autoInit = false;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);   
   
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_CONNECT);
   
   this.contentArea.loadFrom(AEd.CONFIG.DLG_CONNECT_PATH);
   this.contentLoaded = false;
   
   // Buttons
   this.btnClose    = new AEd.ui.core.UIButton({icon: "close"});
   this.btnOk       = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_connect_button_ok"), toggle: false});
   this.btnCancel   = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_connect_button_cancel"), toggle: false});
   this.buttonsArea.addItem(this.btnOk);
   this.buttonsArea.addItem(this.btnCancel);
   this.headerButtonsArea.addItem(this.btnClose);
   
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
           
           
           this.domElementInputServer   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_CONNECT_ID_SERVER);
           this.domElementInputUser     = this.iframeDocument.getElementById(AEd.CONFIG.DLG_CONNECT_ID_USER);
           this.domElementInputPassword = this.iframeDocument.getElementById(AEd.CONFIG.DLG_CONNECT_ID_PASSWORD);       
                  
           this.elementInputServer   = AEd.$(this.domElementInputServer);
           this.elementInputUser     = AEd.$(this.domElementInputUser);
           this.elementInputPassword = AEd.$(this.domElementInputPassword);  
           
           this.setServer(AEd.CONFIG.DEFAULT_SERVER_URI);
           this.setUser(AEd.CONFIG.DEFAULT_USER_NAME);
           this.setPassword(AEd.CONFIG.DEFAULT_USER_PASSWORD);
           
       }, this);   
   
   },this );


}



AEd.ui.DlgConnect.prototype.constructor = AEd.ui.DlgConnect;

AEd.inheritFromPrototype(AEd.ui.DlgConnect, AEd.ui.core.UIDialog);



// ------------------------------------------------------------------ getServer
/**
 * Gets value of "aedServer" input in connect dialog.
 *
 * @name getServer
 * @memberOf AEd.ui.DlgConnect 
 * @function   
 */
AEd.ui.DlgConnect.prototype.getServer = function() {
    if (this.contentLoaded) {
        if (this.domElementInputServer) {
           return this.domElementInputServer.value;
        }
        else {
           return null;
        }
    }
}

// ------------------------------------------------------------------ setServer
/**
 * Sets value of "aedServer" input in connect dialog.
 *
 * @name setServer
 * @memberOf AEd.ui.DlgConnect 
 * @function  
 * @param {String} newValue new input server value 
 */
AEd.ui.DlgConnect.prototype.setServer = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputServer) {
            this.domElementInputServer.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setServer(newValue);
        }, this);     
    }
}   

// -------------------------------------------------------------------- getUser
/**
 * Gets value of "aedUser" input in connect dialog.
 *
 * @name getUser
 * @memberOf AEd.ui.DlgConnect 
 * @function   
 * @return {String} user input value
 */
AEd.ui.DlgConnect.prototype.getUser = function() {
    if (this.contentLoaded) {    
        if (this.domElementInputUser) {
           return this.domElementInputUser.value;
        }
        else {
           return null;
        }
    }       
}   

// -------------------------------------------------------------------- setUser
/**
 * Sets value of "aedUser" input in connect dialog.
 *
 * @name setUser
 * @memberOf AEd.ui.DlgConnect 
 * @function 
 * @param {String} newValue new user input value  
 */
AEd.ui.DlgConnect.prototype.setUser = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputUser) {
            this.domElementInputUser.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setUser(newValue);
        }, this);     
    }
}

// ---------------------------------------------------------------- getPassword
/**
 * Gets value of "aedPassword" input in connect dialog.
 *
 * @name getPassword
 * @memberOf AEd.ui.DlgConnect 
 * @function  
 * @return {String} element password input value 
 */
AEd.ui.DlgConnect.prototype.getPassword = function() {
    if (this.contentLoaded) {       
        if (this.domElementInputPassword) {
           return this.domElementInputPassword.value;
        }
        else {
           return null;
        }        
    }       
}

// ---------------------------------------------------------------- setPassword
/**
 * Sets value of "aedPassword" input in connect dialog.
 *
 * @name setPassword
 * @memberOf AEd.ui.DlgConnect 
 * @function 
 * @param {String} newValue new input password value  
 */
AEd.ui.DlgConnect.prototype.setPassword = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputPassword) {
            this.domElementInputPassword.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setPassword(newValue);
        }, this);     
    }
}
   
// *****************************************************************************
// class AEd.ui.DlgConnect
// ***************************************************************************** 

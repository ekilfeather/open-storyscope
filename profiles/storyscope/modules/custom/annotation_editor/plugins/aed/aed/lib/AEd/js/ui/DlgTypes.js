/**
 * DlgTypes.js
 *
 * Contains AEd.ui.DlgTypes class definition. 
 *  
 * @authors: Martin Kleban, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgTypes
// *****************************************************************************  



/**
 * This class creates DlgTypes.
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
 * @name DlgTypes
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgTypes = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_types_title");
   c.width     = AEd.CONFIG.DLG_TYPES_WIDTH;
   c.height    = AEd.CONFIG.DLG_TYPES_HEIGHT;    
   c.resizable = true;
   c.autoInit  = false;
   c.showOverlay = true;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);    
   
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_TYPES);
   
   this.contentArea.loadFrom(AEd.CONFIG.DLG_TYPES_PATH);
   
   
   this.tree = null;
   this.shownBy = "";
   
   // *************************************************************************
   // EVENTS
   // *************************************************************************  
   
   
   /**
    * Fires when btnAddType is clicked.
    * 
    * @event onAddType                                                 
    */         
   this.onAddType = new AEd.utils.Dispatcher();  
   
   /**
    * Fires when btnRemoveType is clicked.
    * 
    * @event onRemoveType                                                 
    */         
   this.onRemoveType = new AEd.utils.Dispatcher(); 
      
   // ************************************************************************* 
   
   
   // Buttons
   this.btnClose    = new AEd.ui.core.UIButton({icon: "close"});    
   this.btnOk     = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_types_button_ok"), toggle: false});
   this.btnCancel   = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_types_button_cancel"), toggle: false});      
   
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
           this.onContentLoaded.fire(this);
           
           this.setWidth(this.width);
           this.setHeight(this.height);   
           this.iframeDocument       = this.iframe.contentWindow.document;
           
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnDragStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnDragIframeMove, this);
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnResizeStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnResizeIframeMove, this);       
           
 
           var domElementBtnAddType   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPES_ID_BTN_ADD_TYPE);
           this.btnAddType            = new AEd.ui.core.UIButton({srcElement: domElementBtnAddType});      
           
           var domElementBtnRemoveType   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPES_ID_BTN_REMOVE_TYPE);
           this.btnRemoveType            = new AEd.ui.core.UIButton({srcElement: domElementBtnRemoveType});              
           
           this.domElementInputType   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPES_ID_INPUT_TYPE);                
           this.domElementTreeWrapper = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPES_ID_TREE_WRAPPER); 
         
           this.elementInputType      = AEd.$(this.domElementInputType);
           this.elementTreeWrapper    = AEd.$(this.domElementTreeWrapper);
           
           this.btnAddType.onClick.addHandler(function(){
                this.onAddType.fire();
           }, this);
           
           this.btnRemoveType.onClick.addHandler(function(){
                this.onRemoveType.fire();
           }, this);           
           
           AEd.Events.addHandler(this.domElementTreeWrapper, "click", function() {
              if (this.tree) {
                  var node = this.tree.getSelectedTreeNode();
                  if (node) {
                      this.tree.setSelectedTreeNode(null);
                      this.btnRemoveType.setDisabled(true);
                  }
                  
              }
           }, this); 
           
           this.reset();
           
       }, this);
   },this );   
   
}



AEd.ui.DlgTypes.prototype.constructor = AEd.ui.DlgTypes;

AEd.inheritFromPrototype(AEd.ui.DlgTypes, AEd.ui.core.UIDialog);



// -------------------------------------------------------------------- getTree
/**
 * Gets tree object.
 *
 * @name getTree
 * @memberOf AEd.ui.DlgTypes 
 * @function   
 * @return {AEd.ui.core.UITree} Tree instance.
 */
AEd.ui.DlgTypes.prototype.getTree = function() {          
    return this.tree;
}



// -------------------------------------------------------------------- setTree
/**
 * Sets tree object and renders it to tree wrapper.
 *
 * @name setTree
 * @memberOf AEd.ui.DlgTypes 
 * @function  
 * @param {AEd.ui.core.UITree} tree New tree.  
 */
AEd.ui.DlgTypes.prototype.setTree = function(tree) {       
    if (this.contentLoaded) {  // content is loaded - set tree object now
        if (this.elementTreeWrapper) {
            this.tree = tree;
            this.elementTreeWrapper.setInnerHTML("");
            this.tree.render(this.elementTreeWrapper);
            this.tree.onNodeSelected.addHandler(function () {
                this.btnRemoveType.setDisabled(false);
            }, this);
        }
    }
    else { // content is not loaded - add handler
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setTree(tree);
        }, this);     
    }    
}



// -------------------------------------------------------------------- getNewTypeName
/**
 * Gets value of "aedAddType" input in types dialog.
 *
 * @name getNewTypeName
 * @memberOf AEd.ui.DlgTypes 
 * @function   
 * @return {String} Value of aedAddType input.
 */
AEd.ui.DlgTypes.prototype.getNewTypeName = function() {
    if (this.contentLoaded) {
        if (this.domElementInputType) {
            return this.domElementInputType.value;  
        }
        else {
            return null;
        }
    }
}



// -------------------------------------------------------------------- setNewTypeName
/**
 * Sets value of "aedAddType" input in types dialog.
 *
 * @name setNewTypeName
 * @memberOf AEd.ui.DlgTypes 
 * @function  
 * @param {String} newValue New Value of aedAddType input.  
 */
AEd.ui.DlgTypes.prototype.setNewTypeName = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputType) {
            this.domElementInputType.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setNewTypeName(newValue);
        }, this);     
    }
}



// ---------------------------------------------------------------------- reset
/**
 * Resets the DlgTypes dialog
 *
 * @name reset
 * @memberOf AEd.ui.DlgTypes 
 * @function   
 */
AEd.ui.DlgTypes.prototype.reset = function() {
    this.setNewTypeName("");  
    this.btnRemoveType.setDisabled(true); 
}

// *****************************************************************************
// class AEd.ui.DlgTypes
// ***************************************************************************** 

/**
 * DlgAttrTypes.js
 *
 * Contains AEd.ui.DlgAttrTypes class definition. 
 *  
 * @authors: Martin Kleban, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgAttrTypes
// *****************************************************************************  



/**
 * This class creates DlgAttrTypes.
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
 * @name DlgAttrTypes
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgAttrTypes = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_attrTypes_title");
   c.width     = AEd.CONFIG.DLG_ATTRTYPES_WIDTH;
   c.height    = AEd.CONFIG.DLG_ATTRTYPES_HEIGHT;    
   c.resizable = true;
   c.autoInit  = false;
   c.showOverlay = true;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);    
   
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_ATTRTYPES);
   
   this.contentArea.loadFrom(AEd.CONFIG.DLG_ATTRTYPES_PATH);
   
   
   this.tree = null;
   
   // *************************************************************************
   // EVENTS
   // *************************************************************************  
   
   
   /**
    * Fires when btnAddType is clicked.
    * 
    * @event onBrowseTypes                                                 
    */         
   this.onAddType = new AEd.utils.Dispatcher();  
   
   /**
    * Fires when btnRemoveType is clicked.
    * 
    * @event onRemoveType                                                 
    */         
   this.onRemoveType = new AEd.utils.Dispatcher();    
   // ************************************************************************* 
   
   
   // *************************************************************************
   // EVENTS
   // ************************************************************************* 
   
   /**
    * Fires when key is up on aedSuggestType input element.
    * 
    * @event onInputTypeKeyUp                                                 
    */         
   this.onInputTypeKeyUp = new AEd.utils.Dispatcher();

   /**
    * Fires when btnAddAttributeFromOntology is clicked.   
    * 
    * @event onBrowseAttrTypesFromOntologyForAdd                                                 
    */         
   this.onBrowseAttrTypesFromOntologyForAdd = new AEd.utils.Dispatcher();
   
   /**
    * Fires when btnBrowse is clicked.
    * 
    * @event onBrowseTypes                                                 
    */         
   this.onBrowseTypes = new AEd.utils.Dispatcher();
   
   
   // Buttons
   this.btnClose    = new AEd.ui.core.UIButton({icon: "close"});    
   this.btnOk       = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_attrTypes_button_ok"), toggle: false});
   this.btnCancel   = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_attrTypes_button_cancel"), toggle: false});      
   
   this.buttonsArea.addItem(this.btnOk);
   this.buttonsArea.addItem(this.btnCancel);
   this.headerButtonsArea.addItem(this.btnClose);

   if (!AEd.isAppleSafari){  // Safari has problem with context (document namespace)

      this.suggestionsBar = new AEd.ui.SuggestionsBar({render: false});
   }

   // Inputs        
  
   this.iframe = this.contentArea.domElementIframe; 
   this.elementIframe = AEd.$(this.iframe); 

   // Annotation type uri from ontology

   this.annoTypeUriFromOnto = "";   
  
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
           
           if (AEd.isAppleSafari){  // Safari support - context parameter

              this.suggestionsBar = new AEd.ui.SuggestionsBar({render: false, context: this.iframeDocument});
           }

           var domElementBtnAddType   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ATTRTYPES_ID_BTN_ADD_TYPE);
           this.btnAddType            = new AEd.ui.core.UIButton({srcElement: domElementBtnAddType});    

           var domElementBtnRemoveType   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ATTRTYPES_ID_BTN_REMOVE_TYPE);
           this.btnRemoveType            = new AEd.ui.core.UIButton({srcElement: domElementBtnRemoveType});                
           
           this.domElementInputName   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ATTRTYPES_ID_INPUT_NAME);    
           var domElementBtnAddAttributesFromOntology = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_BTN_ADD_ATTRIBUTES_FROM_ONTOLOGY);  
           this.domElementInputType   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ATTRTYPES_ID_INPUT_TYPE);                
           this.domElementTreeWrapper = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ATTRTYPES_ID_TREE_WRAPPER); 
           this.domElementCheckboxAddToTypeAttr  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ATTRTYPES_ID_CHECKBOX_ADDTOTYPEATTR);    
           this.domElementCheckboxRequired = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ATTRTYPES_ID_CHECKBOX_REQUIRED); 
           this.domElementRequiredWrapper = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ATTRTYPES_ID_REQUIRED_WRAPPER); 
           this.domElementInputType       = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ATTRTYPES_ID_TYPE);
           this.domElementSuggestions     = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ATTRTYPES_ID_SUGGESTIONS);
                 
           this.elementInputName      = AEd.$(this.domElementInputName);
           this.btnAddAttributesFromOntology = new AEd.ui.core.UIButton({srcElement: domElementBtnAddAttributesFromOntology});
           this.elementInputType      = AEd.$(this.domElementInputType);
           this.elementTreeWrapper    = AEd.$(this.domElementTreeWrapper);
           this.elementCheckboxAddToTypeAttr  = AEd.$(this.domElementCheckboxAddToTypeAttr);
           this.elementCheckboxRequired = AEd.$(this.domElementCheckboxRequired);   
           this.elementRequiredWrapper = AEd.$(this.domElementRequiredWrapper);           
           this.elementInputType          = AEd.$(this.domElementInputType);
           this.elementSuggestions        = AEd.$(this.domElementSuggestions);          
           this.suggestionsBar.render(this.domElementSuggestions);           
           this.suggestionsBar.hide();
           
           AEd.Events.addHandler(this.iframeDocument, "click", function(e) { 
               this.suggestionsBar.hide();
          },this);
          
          this.suggestionsBar.onClick.addHandler( function (item) {
               this.suggestionBarOnClick(item); 
           }, this);

           this.btnAddAttributesFromOntology.onClick.addHandler(function() {
               if (!this.btnAddAttributesFromOntology.isDisabled) {
                  this.onBrowseAttrTypesFromOntologyForAdd.fire();       
               }                   
           }, this);
           
           this.elementInputType.addEventHandler("keydown", function(e) {
              this.elementInputTypeKeyDown(e);               
           }, this);     
           
           this.elementInputType.addEventHandler("keyup", function(e) {
               this.elementInputTypeKeyUp(e);               
           }, this);
           
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
           
           AEd.Events.addHandler(this.domElementCheckboxAddToTypeAttr, "click", function(e) {
              if (this.domElementCheckboxAddToTypeAttr.checked) {
                  this.elementRequiredWrapper.show();
                  this.domElementCheckboxRequired.disabled = false;
              }
              else {
                  this.domElementCheckboxRequired.disabled = true;
                  this.domElementCheckboxRequired.checked = false;
                  this.elementRequiredWrapper.hide();
              }
           }, this);              
           
           
           
           this.reset();         

       }, this);
   },this );   
   
}



AEd.ui.DlgAttrTypes.prototype.constructor = AEd.ui.DlgAttrTypes;

AEd.inheritFromPrototype(AEd.ui.DlgAttrTypes, AEd.ui.core.UIDialog);



// -------------------------------------------------------------------- getTree
/**
 * Gets tree object.
 *
 * @name getTree
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function   
 * @return {AEd.ui.core.UITree} Tree instance.
 */
AEd.ui.DlgAttrTypes.prototype.getTree = function() {          
    return this.tree;
}



// -------------------------------------------------------------------- setTree
/**
 * Sets tree object and renders it to tree wrapper.
 *
 * @name setTree
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function  
 * @param {AEd.ui.core.UITree} tree New tree.  
 */
AEd.ui.DlgAttrTypes.prototype.setTree = function(tree) {       
    if (this.contentLoaded) {
        //set checkboxes
        this.domElementCheckboxAddToTypeAttr.checked = true;
        this.elementRequiredWrapper.show();
        this.domElementCheckboxRequired.disabled = false;
        this.domElementCheckboxRequired.checked = false;
        
        if (this.elementTreeWrapper) {
            this.tree = tree;
            this.elementTreeWrapper.setInnerHTML("");
            this.tree.render(this.elementTreeWrapper);
            this.tree.onNodeSelected.addHandler(function (node) {             
                if (node) {
                    if (node.assignedObject) {
                    if (!node.assignedObject.notAllowed && !node.assignedObject.simpleType) {
                        this.btnRemoveType.setDisabled(false);
                    }  
                    }                          
                }
                
            }, this);            
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setTree(tree);
        }, this);     
    }    
}



// ------------------------------------------------------------- getNewTypeName
/**
 * Gets value of "aedAddType" input in types dialog.
 *
 * @name getNewTypeName
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function   
 * @return {String} Value of aedAddType input.
 */
AEd.ui.DlgAttrTypes.prototype.getNewTypeName = function() {
    if (this.contentLoaded) {
        if (this.domElementInputType) {
            return this.domElementInputType.value;  
        }
        else {
            return null;
        }
    }
}



// ------------------------------------------------------------- setNewTypeName
/**
 * Sets value of "aedAddType" input in types dialog.
 *
 * @name setNewTypeName
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function  
 * @param {String} newValue New Value of aedAddType input.  
 */
AEd.ui.DlgAttrTypes.prototype.setNewTypeName = function(newValue) {
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



// -------------------------------------------------------------------- getName
/**
 * Gets value of input in types dialog.
 *
 * @name getName
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAttrTypes.prototype.getName = function() {
    if (this.contentLoaded) {
        if (this.domElementInputName) {
            return this.domElementInputName.value;  
        }
        else {
            return null;
        }
    }
}



// -------------------------------------------------------------------- setName
/**
 * Sets value of input in types dialog.
 *
 * @name setName
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAttrTypes.prototype.setName = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputName) {
            this.domElementInputName.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setName(newValue);
        }, this);     
    }
}


// -------------------------------------------------------------------- getType
/**
 * Gets value of "aedSuggestType" input in DlgAttrTypes dialog.
 *
 * @name getType
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function   
 * @return {String} Value of aedAttrTypesType input.
 */
AEd.ui.DlgAttrTypes.prototype.getType = function() {
    if (this.contentLoaded) {
        if (this.domElementInputType) {
            return this.domElementInputType.value;  
        }
        else {
            return null;
        }
    }
}


// -------------------------------------------------------------------- setType
/**
 * Sets value of "aedSuggestType" input in DlgAttrTypes dialog.
 *
 * @name setType
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function  
 * @param {String} newValue New Value of aedAttrTypesType input.  
 */
AEd.ui.DlgAttrTypes.prototype.setType = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputType) {
            this.domElementInputType.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setType(newValue);
        }, this);     
    }
}
 

// -------------------------------------------------------------------- setAnnoTypeUriFromOnto
/**
 * Sets value of annoUriFromOnto property in DlgAttrTypes dialog.
 *
 * @name setAnnoTypeUriFromOnto
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function  
 * @param {String} uri Uri of annotation from ontology.  
 */
AEd.ui.DlgAttrTypes.prototype.setAnnoTypeUriFromOnto = function(uri) {

   this.annoTypeUriFromOnto = uri;
}

// ----------------------------------------------------- isAddToTypeAttrChecked
/**
 * Gets value of input in types dialog.
 *
 * @name isAddToTypeAttrChecked
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function   
 * @return {Boolean} True if checkbox is checked.
 */
AEd.ui.DlgAttrTypes.prototype.isAddToTypeAttrChecked = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxAddToTypeAttr) {
            return this.domElementCheckboxAddToTypeAttr.checked;  
        }
        else {
            return null;
        }
    }
}

// ---------------------------------------------------------- isRequiredChecked
/**
 * Gets value of input in types dialog.
 *
 * @name isRequiredChecked
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function   
 * @return {Boolean} True if checkbox is checked.
 */
AEd.ui.DlgAttrTypes.prototype.isRequiredChecked = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxRequired) {
            return this.domElementCheckboxRequired.checked;  
        }
        else {
            return null;
        }
    }
}



// ---------------------------------------------------------------------- reset
/**
 * Resets the DlgAttrTypes dialog
 *
 * @name reset
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function   
 */
AEd.ui.DlgAttrTypes.prototype.reset = function() {
    this.setName("");  
    this.setNewTypeName("");
    this.domElementCheckboxAddToTypeAttr.checked = false;
    this.domElementCheckboxRequired.checked = false; 
    this.domElementCheckboxRequired.disabled = true;    
    this.elementRequiredWrapper.hide();
    this.btnRemoveType.setDisabled(true); 
    this.annoTypeUriFromOnto = "";    
}



// --------------------------------------------------------------- elementInputTypeKeyDown
/**
 * Suggestion bar control when key down
 *
 * @name elementInputTypeKeyDown
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function
 * @param {Event} e event 
 */
AEd.ui.DlgAttrTypes.prototype.elementInputTypeKeyDown = function(e) {  
    var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event); 
    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 40: // down arrow
            this.suggestionsBar.selectNextItem();
            this.suggestionsBar.show();
            AEd.Events.preventDefault(event);
        break;
                   
        case 38: // up arrow
            this.suggestionsBar.selectPreviousItem();
        break;                                
        default:
        break;
    }            
}



// --------------------------------------------------------------- elementInputTypeKeyUp
/**
 * Suggestion bar control when key up
 *
 * @name elementInputTypeKeyUp
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function
 * @param {Event} e event 
 */
AEd.ui.DlgAttrTypes.prototype.elementInputTypeKeyUp = function(e) {  
    var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event);
    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 13: // enter or right arrow
        case 39:
            this.tree.childTreeNodes[0].collapse();
            this.tree.childTreeNodes[1].collapse();
        
            if (!this.suggestionsBar.isHidden) {
                if (this.suggestionsBar.selectedItem) {
                    if (this.suggestionsBar.selectedItem.isSimpleType()) {
                        this.setType(this.suggestionsBar.selectedItem.getName());
                    }
                    else if (!this.suggestionsBar.selectedItem.isSimpleType()) {
                        this.setType(this.suggestionsBar.selectedItem.getText());
                    }        
                }
                this.suggestionsBar.hide();
            }
        break;
                                     
        default:
            if ( ((code > 31) && (code != 37) && (code != 38) && (code != 39) && (code != 40)) || (code == 8) )  {
                this.onInputTypeKeyUp.fire();
            }
            this.suggestionsBar.show();                       
        break;
    }    
}



// --------------------------------------------------------------- suggestionBarOnClick
/**
 * Suggestion bar control when clicked
 *
 * @name suggestionBarOnClick
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function
 * @param {Item} item of suggestion bar 
 */
AEd.ui.DlgAttrTypes.prototype.suggestionBarOnClick = function(item) {
    if (this.suggestionsBar.selectedItem.isSimpleType()) {
        this.setType(this.suggestionsBar.selectedItem.getName());
    }
    else if (!this.suggestionsBar.selectedItem.isSimpleType()) {
        this.setType(this.suggestionsBar.selectedItem.getText());
    }
    this.suggestionsBar.hide();    
}



// *****************************************************************************
// class AEd.ui.DlgAttrTypes
// ***************************************************************************** 

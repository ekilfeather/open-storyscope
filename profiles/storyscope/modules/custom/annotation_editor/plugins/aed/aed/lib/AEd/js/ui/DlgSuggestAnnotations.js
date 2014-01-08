/**
 * DlgSuggestAnnotations.js
 *
 * Contains AEd.ui.DlgSuggestAnnotations class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgSuggestAnnotations
// *****************************************************************************  



/**
 * This class creates DlgSuggestAnnotations.
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
 * @name DlgSuggestAnnotations
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgSuggestAnnotations = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_suggestAnnotations_title");
   c.width     = AEd.CONFIG.DLG_SUGGEST_ANNOTATIONS_WIDTH;
   c.height    = AEd.CONFIG.DLG_SUGGEST_ANNOTATIONS_HEIGHT;    
   c.showOverlay = false;
   c.resizable = true;
   c.autoInit = false;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);

         
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_SUGGEST_ANNOTATIONS);
   
   this.contentArea.loadFrom(AEd.CONFIG.DLG_SUGGEST_ANNOTATIONS_PATH);
   
   this.contentLoaded = false;
   
   this.suggestion = null;
   this.suggestDlg = null;
   
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
    * Fires when btnBrowse is clicked.
    * 
    * @event onBrowseTypes                                                 
    */         
   this.onBrowseTypes = new AEd.utils.Dispatcher();
   
   // Buttons
   this.btnClose    = new AEd.ui.core.UIButton({icon: "close"});
   this.btnSuggest  = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_suggestAnnotations_button_suggest"), toggle: false});
   this.btnCancel   = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_suggestAnnotations_button_cancel"), toggle: false});      
   this.buttonsArea.addItem(this.btnSuggest);
   this.buttonsArea.addItem(this.btnCancel);
   this.headerButtonsArea.addItem(this.btnClose);

   if (!AEd.isAppleSafari){ // Safari has problem with context (document namespace)

      this.suggestionsBar = new AEd.ui.SuggestionsBar({render: false});

   }
   
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
           this.iframeDocument = this.iframe.contentWindow.document;
           
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnDragStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnDragIframeMove, this);
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnResizeStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnResizeIframeMove, this);

           if (AEd.isAppleSafari){ // Safari support - context parameter

              this.suggestionsBar = new AEd.ui.SuggestionsBar({render: false, context: this.iframeDocument});
           }
             
           this.domElementInputSelection  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUGGEST_ANNOTATIONS_ID_SELECTION);
           this.domElementInputType       = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUGGEST_ANNOTATIONS_ID_TYPE);     
           this.domElementSuggestions     = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUGGEST_ANNOTATIONS_ID_SUGGESTIONS);                          
           this.domElementBtnBrowse       = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUGGEST_ANNOTATIONS_ID_BTN_BROWSE);
           this.btnBrowse                 = new AEd.ui.core.UIButton({srcElement: this.domElementBtnBrowse});
           this.domElementBtnWholeDoc     = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUGGEST_ANNOTATIONS_ID_BTN_WHOLE_DOC);
           this.btnWholeDoc               = new AEd.ui.core.UIButton({srcElement: this.domElementBtnWholeDoc, toggle: true});             
           this.domElementBtnNoSuggestion = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUGGEST_ANNOTATIONS_ID_BTN_NO_SUGGESTIONS);
           this.btnNoSuggestion          = new AEd.ui.core.UIButton({srcElement: this.domElementBtnNoSuggestion, toggle: true});
           
           this.elementInputSelection     = AEd.$(this.domElementInputSelection);
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
           
           this.elementInputType.addEventHandler("keydown", function(e) {
              this.elementInputTypeKeyDown(e);               
           }, this);     
           
           this.elementInputType.addEventHandler("keyup", function(e) {
               this.elementInputTypeKeyUp(e);               
           }, this);
          
          this.btnBrowse.onClick.addHandler(function() {
              if (!this.btnBrowse.isDisabled) {
                  this.onBrowseTypes.fire();
              }                            
          }, this);
          
          this.btnWholeDoc.onClick.addHandler(function() {
              if (this.btnWholeDoc.isSelected) {
                  this.btnNoSuggestion.setSelected(false);
                  this.setSuggestWholeDoc(true); 
              }
              else {
                  this.btnWholeDoc.setSelected(true);    
              }                          
          }, this);
          
          this.btnNoSuggestion.onClick.addHandler(function() {
              if (this.btnNoSuggestion.isSelected) {
                  this.btnWholeDoc.setSelected(false);
                  this.setNoSuggestion(true); 
              }
              else {
                  this.btnNoSuggestion.setSelected(true);    
              }                          
          }, this);
          
          this.reset();
               
       }, this);
   },this );  
  
}



AEd.ui.DlgSuggestAnnotations.prototype.constructor = AEd.ui.DlgSuggestAnnotations;

AEd.inheritFromPrototype(AEd.ui.DlgSuggestAnnotations, AEd.ui.core.UIDialog);


// --------------------------------------------------------------- getSelection
/**
 * Gets value of "aedSuggestSelection" input in suggestAnnotations dialog.
 *
 * @name DlgSuggestAnnotations
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of aedSuggestSelection textfield.
 */
AEd.ui.DlgSuggestAnnotations.prototype.getSelection = function() {
    if (this.contentLoaded) {
        if (this.domElementInputSelection) {
            return this.domElementInputSelection.value;
        }
        else {
            return null;
        }
    }
}

// --------------------------------------------------------------- setSelection
/**
 * Sets value of "aedSuggestSelection" input in suggestAnnotations dialog.
 *
 * @name setSelection
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function  
 * @param {String} newValue New Value of aedSuggestSelection textfield.  
 */
AEd.ui.DlgSuggestAnnotations.prototype.setSelection = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputSelection) {
            this.domElementInputSelection.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setSelection(newValue);
        }, this);     
    }
}



// -------------------------------------------------------------------- getType
/**
 * Gets value of "aedSuggestType" input in suggestAnnotations dialog.
 *
 * @name getType
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function   
 * @return {String} Value of aedSuggestType input.
 */
AEd.ui.DlgSuggestAnnotations.prototype.getType = function() {
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
 * Sets value of "aedSuggestType" input in suggestAnnotations dialog.
 *
 * @name setType
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function  
 * @param {String} newValue New Value of aedSuggestType input.  
 */
AEd.ui.DlgSuggestAnnotations.prototype.setType = function(newValue) {
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



// --------------------------------------------------------- setSelectionObject
/**
 * Sets selection object of suggestion
 *
 * @name setSelectionObject
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function  
 * @param {Selection} oSelection Selection object.  
 */
AEd.ui.DlgSuggestAnnotations.prototype.setSelectionObject = function(oSelection) {


    if (oSelection != null && oSelection.selection.length > 0) {
        if (this.suggestion && oSelection) {
            this.storeSuggestion(this.suggestion);
            this.suggestion.selectionObject = oSelection;
            this.suggestion.wholeDoc = false;
            this.suggestion.noSuggestion = false;
            this.suggestion.selection = oSelection.toString();
            this.updateSuggestion(this.suggestion);       
        }
    }  
}


// -------------------------------------------------------- setSuggestWholeDoc
/**
 * Sets selection to whole document
 *
 * @name setSuggestWholeDoc
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function  
 * @param {Boolean} value Suggestion for whole doc or not.  
 */
AEd.ui.DlgSuggestAnnotations.prototype.setSuggestWholeDoc = function(value) {

    
    if (this.suggestion) {
        this.storeSuggestion(this.suggestion);
        this.suggestion.selectionObject = null;
        if (value) {
            this.suggestion.wholeDoc = true;
            this.suggestion.noSuggestion = false;
            this.suggestion.selection = AEd.I18n.t("Dlg_suggestAnnotations_selection_whole_doc");
        }
        else {
            this.suggestion.wholeDoc = false;
            this.suggestion.selection = "";                              
        }
        this.updateSuggestion(this.suggestion);
    }      
}

     

// -------------------------------------------------------- setNoSuggestion
/**
 * Sets no suggestions
 *
 * @name setNoSuggestion
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function  
 * @param {Boolean} value Suggest nothing or not.  
 */
AEd.ui.DlgSuggestAnnotations.prototype.setNoSuggestion = function(value) {

    if (this.suggestion) {
        this.storeSuggestion(this.suggestion);
        this.suggestion.selectionObject = null;
        if (value) {
            this.suggestion.noSuggestion = true;
            this.suggestion.wholeDoc = false;
            this.suggestion.selection = AEd.I18n.t("Dlg_suggestAnnotations_selection_no_suggestions");
        }
        else {
            this.suggestion.noSuggestion = true;
            this.suggestion.selection = "";                              
        }
        this.updateSuggestion(this.suggestion);
    }      
}



// ------------------------------------------------------------- storeSuggestion
/**
 * Stores changes in suggestion
 *
 * @name storeSuggestion
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function 
 * @param {Object} suggest Object of suggestion   
 */
AEd.ui.DlgSuggestAnnotations.prototype.storeSuggestion = function(suggest) { 


    if (suggest) {
        suggest.selection = this.getSelection();
        suggest.typePath = this.getType();   
    }
}



// ------------------------------------------------------------- updateSuggestion
/**
 * Updates suggestion
 *
 * @name updateSuggestion
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function 
 * @param {Object} newSuggest Object of new suggestion   
 */
AEd.ui.DlgSuggestAnnotations.prototype.updateSuggestion = function(newSuggest) {

        
    if (newSuggest && (this.btnWholeDoc || this.btnNoSuggestion)) {      
        this.setSelection(newSuggest.selection); 
        this.setType(newSuggest.typePath);
        if (newSuggest.wholeDoc) {
            this.btnWholeDoc.setSelected(true);
        } 
        else {
            this.btnWholeDoc.setSelected(false);
        }
        if (newSuggest.noSuggestion) {
            this.btnNoSuggestion.setSelected(true);
        }
        else {
            this.btnNoSuggestion.setSelected(false);
        }                     
    } 
}



// -------------------------------------------------------------- getSuggestion
/**
 * Returns created suggestion
 *
 * @name getSuggestion
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @return {Object} Created suggestion.  
 */
AEd.ui.DlgSuggestAnnotations.prototype.getSuggestion = function() { 


    if (this.suggestion) { 
        this.storeSuggestion(this.suggestion);
        return this.suggestion;
    }   
    else {
        return null;
    }   
}



// ---------------------------------------------------------------------- loadSuggestDlg
/**
 * Load content of suggestAnnotations dialog
 *
 * @name loadSuggestDlg
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function   
 */
AEd.ui.DlgSuggestAnnotations.prototype.loadSuggestDlg = function() {

    
    this.suggestion.selection = this.suggestDlg.selection;
    this.suggestion.selectionObject = this.suggestDlg.selectionObject;
    this.suggestion.typePath = this.suggestDlg.typePath;
    this.suggestion.wholeDoc = this.suggestDlg.wholeDoc;
    this.suggestion.noSuggestion = this.suggestDlg.noSuggestion;
    
    this.setSelection(this.suggestion.selection);
    this.setSelectionObject(this.suggestion.selectionObject);
    this.setType(this.suggestion.typePath);    
    
    this.updateSuggestion(this.suggestion);
}



// ---------------------------------------------------------------------- saveSuggestDlg
/**
 * Save content of suggestAnnotations dialog
 *
 * @name saveSuggestDlg
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function   
 */
AEd.ui.DlgSuggestAnnotations.prototype.saveSuggestDlg = function() {

    
    this.suggestDlg.selection = this.suggestion.selection;
    this.suggestDlg.selectionObject = this.suggestion.selectionObject;
    this.suggestDlg.typePath = this.suggestion.typePath;
    this.suggestDlg.wholeDoc = this.suggestion.wholeDoc;
    this.suggestDlg.noSuggestion = this.suggestion.noSuggestion;
}



// ---------------------------------------------------------------------- quickSuggestions
/**
 * Sets suggestAnnotations dialog for quick suggestions.
 *
 * @name quickSuggestions
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function   
 */
AEd.ui.DlgSuggestAnnotations.prototype.quickSuggestions = function() {

    
    this.suggestion = {};
    this.suggestion.selection = AEd.I18n.t("Dlg_suggestAnnotations_selection_whole_doc");
    this.suggestion.selectionObject = null;
    this.suggestion.typePath = "";
    this.suggestion.wholeDoc = true;
    this.suggestion.noSuggestion = false;
    
    this.suggestDlg = {};
    this.suggestDlg = this.suggestion;
    
    this.setSelection(this.suggestion.selection);
    this.setSelectionObject(null);
    this.setType("");    
    
    this.setSuggestWholeDoc(true);
}



// ---------------------------------------------------------------------- reset
/**
 * Resets the suggestAnnotations dialog
 *
 * @name reset
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function   
 */
AEd.ui.DlgSuggestAnnotations.prototype.reset = function() {

    
    this.suggestion = {};
    this.suggestion.selection = AEd.I18n.t("Dlg_suggestAnnotations_selection_no_suggestions");
    this.suggestion.selectionObject = null;
    this.suggestion.typePath = "";
    this.suggestion.wholeDoc = false;
    this.suggestion.noSuggestion = true;
    
    this.suggestDlg = {};
    this.suggestDlg = this.suggestion;
    
    this.setSelection("");
    this.setSelectionObject(null);
    this.setType("");    
    
    this.setSuggestWholeDoc(false);
    this.setNoSuggestion(true);
}



// --------------------------------------------------------------- elementInputTypeKeyDown
/**
 * Suggestion bar control when key down
 *
 * @name elementInputTypeKeyDown
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function
 * @param {Event} e event 
 */
AEd.ui.DlgSuggestAnnotations.prototype.elementInputTypeKeyDown = function(e) {  
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
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function
 * @param {Event} e event 
 */
AEd.ui.DlgSuggestAnnotations.prototype.elementInputTypeKeyUp = function(e) {  
    var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event);
    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 13: // enter or right arrow
        case 39:
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
 * @memberOf AEd.ui.DlgSuggestAnnotations 
 * @function
 * @param {Item} item of suggestion bar 
 */
AEd.ui.DlgSuggestAnnotations.prototype.suggestionBarOnClick = function(item) {
    if (this.suggestionsBar.selectedItem.isSimpleType()) {
        this.setType(this.suggestionsBar.selectedItem.getName());
    }
    else if (!this.suggestionsBar.selectedItem.isSimpleType()) {
        this.setType(this.suggestionsBar.selectedItem.getText());
    }
    this.suggestionsBar.hide();    
}



// *****************************************************************************
// class AEd.ui.DlgSuggestAnnotations
// ***************************************************************************** 

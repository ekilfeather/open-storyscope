/**
 * DlgSettings.js
 *
 * Contains AEd.ui.DlgSettings class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgSettings
// *****************************************************************************  



/**
 * This class creates DlgSettings.
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
 * @name DlgSettings
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgSettings = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_settings_title");
   c.width     = AEd.CONFIG.DLG_SETTINGS_WIDTH;
   c.height    = AEd.CONFIG.DLG_SETTINGS_HEIGHT;    
   c.showOverlay = false;
   c.resizable = true;
   c.autoInit = false;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);
         
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_SETTINGS);
   
   this.contentArea.loadFrom(AEd.CONFIG.DLG_SETTINGS_PATH);
   
   this.contentLoaded = false;
   
   this.tree            = null;
   this.fieldset        = null;
   
   // *************************************************************************
   // EVENTS
   // ************************************************************************* 
   
   /**
    * Fires when btnSelect is clicked.
    * 
    * @event onBtnSelect                                                 
    */         
   this.onBtnSelect = new AEd.utils.Dispatcher();
   
   /**
    * Fires when ClientFoldingOfNestedsLevels settings is created.
    * 
    * @event onCreateClientFoldingOfNestedsLevels                                                 
    */         
   this.onCreateClientFoldingOfNestedsLevels = new AEd.utils.Dispatcher();
   
   /**
    * Fires when ClientFoldingOfNestedsHideLevel settings is created.
    * 
    * @event onCreateClientFoldingOfNestedsHideLevel                                                 
    */         
   this.onCreateClientFoldingOfNestedsHideLevel = new AEd.utils.Dispatcher();
   
   /**
    * Fires when DefaultUserGroup settings is created.
    * 
    * @event onCreateDefaultUserGroup                                                 
    */         
   this.onCreateDefaultUserGroup = new AEd.utils.Dispatcher();
   
   // Buttons
   this.btnClose    = new AEd.ui.core.UIButton({icon: "close"});
   this.btnSave     = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_settings_button_save"), toggle: false});
   this.btnCancel   = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_settings_button_cancel"), toggle: false});
   this.buttonsArea.addItem(this.btnSave);
   this.buttonsArea.addItem(this.btnCancel);
   this.headerButtonsArea.addItem(this.btnClose);
   
   // Inputs
   this.btnClose.onClick.addHandler(function (){
                                        
   }, this);
     
   this.btnCancel.onClick.addHandler(function (){
                                       
   }, this);
      
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
           
           // LEFT SIDE
           // -----------------------------------------------------------------
           this.domElementTreeWrapper = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_TREE_WRAPPER);
           this.elementTreeWrapper = AEd.$(this.domElementTreeWrapper);
           
           // RIGHT SIDE 
           // Fieldset Settings 
           // -----------------------------------------------------------------
           this.domElementSettingsFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_SETTINGS_FIELDSET);
           this.elementSettingFieldset = AEd.$(this.domElementSettingsFieldset);
            
           // Fieldset Client 
           // -----------------------------------------------------------------
           this.domElementClientFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FIELDSET);
           this.elementClientFieldset = AEd.$(this.domElementClientFieldset);        
           
           // Fieldset Server 
           // -----------------------------------------------------------------
           this.domElementServerFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_SERVER_FIELDSET);
           this.elementServerFieldset = AEd.$(this.domElementServerFieldset);
            
           // Fieldset Common 
           // -----------------------------------------------------------------
           this.domElementCommonFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_COMMON_FIELDSET);
           this.elementCommonFieldset = AEd.$(this.domElementCommonFieldset);

           // Fieldset (Un)subscriptions 
           // -----------------------------------------------------------------
           this.domElementUsubscriptionsFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_USUBSCRIPTIONS_FIELDSET);
           this.elementUsubscriptionsFieldset = AEd.$(this.domElementUsubscriptionsFieldset);
            
           // Fieldset Unknown 
           // -----------------------------------------------------------------
           this.domElementUnknownFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_UNKNOWN_FIELDSET);
           this.elementUnknownFieldset = AEd.$(this.domElementUnknownFieldset);
           this.domElementUnknownTableHeader = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_UNKNOWN_TABLE_HEADER);
           this.elementUnknownTableHeader   = AEd.$(this.domElementUnknownTableHeader);          
           this.domElementUnknownTable = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_UNKNOWN_TABLE);
           this.elementUnknownTable   = AEd.$(this.domElementUnknownTable);    
           var domElementUnknownBtnAdd = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_UNKNOWN_BTN_ADD);
           this.unknownBtnAdd    = new AEd.ui.core.UIButton({srcElement: domElementUnknownBtnAdd});
           this.unknownBtnAdd.onClick.addHandler(function() { this.addTableRow(this.elementUnknownTable); }, this);
    
           // Fieldset Subscriptions 
           // -----------------------------------------------------------------
           this.domElementSubscriptionsFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_SUBSCRIPTIONS_FIELDSET);
           this.elementSubscriptionsFieldset = AEd.$(this.domElementSubscriptionsFieldset);
           this.domElementInputSubscriptionsValue = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_SUBSCRIPTIONS_INPUT);
           this.elementSubscriptionsInput = AEd.$(this.domElementInputSubscriptionsValue);

           // Fieldset Unsubscriptions 
           // -----------------------------------------------------------------
           this.domElementUnsubscriptionsFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_UNSUBSCRIPTIONS_FIELDSET);
           this.elementUnsubscriptionsFieldset = AEd.$(this.domElementUnsubscriptionsFieldset);
           this.domElementInputUnsubscriptionsValue = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_UNSUBSCRIPTIONS_INPUT);
           this.elementUnsubscriptionsInput = AEd.$(this.domElementInputUnsubscriptionsValue);

           // Fieldset ClientAnnotationTypeColor 
           // -----------------------------------------------------------------
           this.domElementClientAnnotationTypeColorFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_ANNOTATION_TYPE_COLOR_FIELDSET);
           this.elementClientAnnotationTypeColorFieldset = AEd.$(this.domElementClientAnnotationTypeColorFieldset);
           this.domElementClientAnnotationTypeColorTableHeader = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_ANNOTATION_TYPE_COLOR_TABLE_HEADER);
           this.elementClientAnnotationTypeColorTableHeader   = AEd.$(this.domElementClientAnnotationTypeColorTableHeader);          
           this.domElementClientAnnotationTypeColorTable = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_ANNOTATION_TYPE_COLOR_TABLE);
           this.elementClientAnnotationTypeColorTable   = AEd.$(this.domElementClientAnnotationTypeColorTable);    
           var domElementClientAnnotationTypeColorBtnAdd = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_ANNOTATION_TYPE_COLOR_BTN_ADD);
           this.clientAnnotationTypeColorBtnAdd    = new AEd.ui.core.UIButton({srcElement: domElementClientAnnotationTypeColorBtnAdd});
           this.clientAnnotationTypeColorBtnAdd.onClick.addHandler(function() { this.addTableRow(this.elementClientAnnotationTypeColorTable); }, this);  

           // Fieldset ClientAdvancedToolbarOptions
           // -----------------------------------------------------------------
           this.domElementClientAdvancedToolbarOptionsFieldset = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_ADVANCED_TOOLBAR_OPTIONS_FIELDSET);
           this.elementClientAdvancedToolbarOptionsFieldset = AEd.$(this.domElementClientAdvancedToolbarOptionsFieldset); 
           this.domElementClientAdvancedToolbarOptionsWrapper = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_ADVANCED_TOOLBAR_OPTIONS_WRAPPER);
           this.domElementClientAdvancedToolbarOptionsAllInOneRadio = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_ADVANCED_TOOLBAR_OPTIONS_ALL_IN_ONE);
           this.elementClientAdvancedToolbarOptionsAllInOneRadio = AEd.$(this.domElementClientAdvancedToolbarOptionsAllInOneRadio);
           this.domElementClientAdvancedToolbarOptionsTwoToolbarsRadio = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_ADVANCED_TOOLBAR_OPTIONS_TWO_TOOLBARS);
           this.elementClientAdvancedToolbarOptionsTwoToolbarsRadio = AEd.$(this.domElementClientAdvancedToolbarOptionsTwoToolbarsRadio);
    
           // Fieldset ClientRefuseSuggestion
           // -----------------------------------------------------------------
           this.domElementClientRefuseSuggestionFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_REFUSE_SUGGESTION_FIELDSET);
           this.elementClientRefuseSuggestionFieldset = AEd.$(this.domElementClientRefuseSuggestionFieldset);
           this.domElementClientRefuseSuggestionWrapper  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_REFUSE_SUGGESTION_WRAPPER);
           this.elementClientRefuseSuggestionWrapper = AEd.$(this.domElementClientRefuseSuggestionWrapper);
           this.domElementCheckboxClientRefuseSuggestionValue   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_REFUSE_SUGGESTION_CHECKBOX);
           this.elementCheckboxClientRefuseSuggestionValue      = AEd.$(this.domElementCheckboxClientRefuseSuggestionValue);     
           
           // Fieldset ClientSuggestionConfidence 
           // -----------------------------------------------------------------
           this.domElementClientSuggestionConfidenceFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_SUGGESTION_CONFIDENCE_FIELDSET);
           this.elementClientSuggestionConfidenceFieldset = AEd.$(this.domElementClientSuggestionConfidenceFieldset);
           this.domElementInputClientSuggestionConfidenceValue   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_SUGGESTION_CONFIDENCE_VALUE);
           this.elementInputClientSuggestionConfidenceValue      = AEd.$(this.domElementInputClientSuggestionConfidenceValue);     
    
           // Fieldset ClientSuggestionAutoConfirming 
           // -----------------------------------------------------------------
           this.domElementClientSuggestionAutoConfirmingFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_SUGGESTION_AUTO_CONFIRMING_FIELDSET);
           this.elementClientSuggestionAutoConfirmingFieldset = AEd.$(this.domElementClientSuggestionAutoConfirmingFieldset);
           this.domElementInputClientSuggestionAutoConfirmingValue   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_SUGGESTION_AUTO_CONFIRMING_VALUE);
           this.elementInputClientSuggestionAutoConfirmingValue      = AEd.$(this.domElementInputClientSuggestionAutoConfirmingValue); 
    
           // Fieldset ClientFoldingOfAttributes
           // -----------------------------------------------------------------
           this.domElementClientFoldingOfAttributesFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_FIELDSET);
           this.elementClientFoldingOfAttributesFieldset = AEd.$(this.domElementClientFoldingOfAttributesFieldset);
           this.domElementClientFoldingOfAttributesWrapper  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_WRAPPER);
           this.elementClientFoldingOfAttributesWrapper = AEd.$(this.domElementClientFoldingOfAttributesWrapper);
           this.domElementCheckboxClientFoldingOfAttributesValue   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_CHECKBOX);
           this.elementCheckboxClientFoldingOfAttributesValue      = AEd.$(this.domElementCheckboxClientFoldingOfAttributesValue);
           this.domElementClientFoldingOfAttributesResizeWrapper = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_RESIZE_WRAPPER);
           this.elementClientFoldingOfAttributesResizeWrapper = AEd.$(this.domElementClientFoldingOfAttributesResizeWrapper);
           this.domElementCheckboxClientFoldingOfAttributesResize = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_RESIZE_CHECKBOX); 
           this.elementCheckboxClientFoldingOfAttributesResize = AEd.$(this.domElementCheckboxClientFoldingOfAttributesResize);
           this.domElementClientFoldingOfAttributesHideButtonWrapper = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_HIDE_BUTTON_WRAPPER);
           this.elementClientFoldingOfAttributesHideButtonWrapper = AEd.$(this.domElementClientFoldingOfAttributesHideButtonWrapper);
           this.domElementCheckboxClientFoldingOfAttributesHideButton = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_HIDE_BUTTON_CHECKBOX); 
           this.elementCheckboxClientFoldingOfAttributesHideButton = AEd.$(this.domElementCheckboxClientFoldingOfAttributesHideButton);
           this.domElementClientFoldingOfNestedsWrapper  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_NESTEDS_WRAPPER);
           this.elementClientFoldingOfNestedsWrapper = AEd.$(this.domElementClientFoldingOfNestedsWrapper);
           this.domElementCheckboxClientFoldingOfNestedsValue   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_NESTEDS_CHECKBOX);
           this.elementCheckboxClientFoldingOfNestedsValue      = AEd.$(this.domElementCheckboxClientFoldingOfNestedsValue);
           this.domElementClientFoldingOfNestedsHideButtonWrapper = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_NESTEDS_HIDE_BUTTON_WRAPPER);
           this.elementClientFoldingOfNestedsHideButtonWrapper = AEd.$(this.domElementClientFoldingOfNestedsHideButtonWrapper);
           this.domElementCheckboxClientFoldingOfNestedsHideButton = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_NESTEDS_HIDE_BUTTON_CHECKBOX); 
           this.elementCheckboxClientFoldingOfNestedsHideButton = AEd.$(this.domElementCheckboxClientFoldingOfNestedsHideButton); 
           this.domElementCheckboxClientFoldingOfNestedsLevelsValue   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_NESTEDS_LEVELS_VALUE);
           this.elementCheckboxClientFoldingOfNestedsLevelsValue      = AEd.$(this.domElementCheckboxClientFoldingOfNestedsLevelsValue);       
           this.domElementCheckboxClientFoldingOfNestedsHideLevelValue   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_CLIENT_FOLDING_OF_NESTEDS_HIDE_LEVEL_VALUE);
           this.elementCheckboxClientFoldingOfNestedsHideLevelValue      = AEd.$(this.domElementCheckboxClientFoldingOfNestedsHideLevelValue);
                 
           // Fieldset ServerLanguage 
           // -----------------------------------------------------------------
           this.domElementServerLanguageFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_SERVER_LANGUAGE_FIELDSET);
           this.elementServerLanguageFieldset = AEd.$(this.domElementServerLanguageFieldset);
           this.domElementInputServerLanguageValue   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_SERVER_LANGUAGE_VALUE);
           this.elementInputServerLanguageValue      = AEd.$(this.domElementInputServerLanguageValue);
           
           // Fieldset DefaultUserGroup 
           // -----------------------------------------------------------------
           this.domElementDefaultUserGroupFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_DEFAULT_USER_GROUP_FIELDSET);
           this.elementDefaultUserGroupFieldset = AEd.$(this.domElementDefaultUserGroupFieldset);
           this.domElementInputDefaultUserGroupValue   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SETTINGS_ID_DEFAULT_USER_GROUP_VALUE);
           this.elementInputDefaultUserGroupValue      = AEd.$(this.domElementInputDefaultUserGroupValue);
            
           AEd.Events.addHandler(this.domElementCheckboxClientFoldingOfAttributesValue, "click", function(e) {
              if (this.domElementCheckboxClientFoldingOfAttributesValue.checked) {
                  this.elementClientFoldingOfAttributesResizeWrapper.show();
                  this.elementClientFoldingOfAttributesHideButtonWrapper.show();
                  this.domElementCheckboxClientFoldingOfAttributesResize.disabled = false;
                  this.domElementCheckboxClientFoldingOfAttributesHideButton.disabled = false;
                  this.domElementCheckboxClientFoldingOfAttributesResize.checked = false;
                  this.domElementCheckboxClientFoldingOfAttributesHideButton.checked = false;
              }
              else {
                  this.domElementCheckboxClientFoldingOfAttributesResize.disabled = true;
                  this.domElementCheckboxClientFoldingOfAttributesResize.checked = false;
                  this.domElementCheckboxClientFoldingOfAttributesHideButton.disabled = true;
                  this.domElementCheckboxClientFoldingOfAttributesHideButton.checked = false;
                  this.elementClientFoldingOfAttributesResizeWrapper.hide();
                  this.elementClientFoldingOfAttributesHideButtonWrapper.hide();
              }
           }, this);
           
           AEd.Events.addHandler(this.domElementCheckboxClientFoldingOfNestedsValue, "click", function(e) {           
              if (this.domElementCheckboxClientFoldingOfNestedsValue.checked) {
                  this.elementClientFoldingOfNestedsHideButtonWrapper.show();
                  this.domElementCheckboxClientFoldingOfNestedsHideButton.disabled = false;
                  this.domElementCheckboxClientFoldingOfNestedsHideButton.checked = false;
              }
              else {
                  this.domElementCheckboxClientFoldingOfNestedsHideButton.disabled = true;
                  this.domElementCheckboxClientFoldingOfNestedsHideButton.checked = false;
                  this.elementClientFoldingOfNestedsHideButtonWrapper.hide();
              }
           }, this);

           // -----------------------------------------------------------------
           this.reset();
       }, this);
   },this );  
  
}



AEd.ui.DlgSettings.prototype.constructor = AEd.ui.DlgSettings;

AEd.inheritFromPrototype(AEd.ui.DlgSettings, AEd.ui.core.UIDialog);



// -------------------------------------------------------------------- setClientAnnotationTypeColor
/**
 * Sets value of "aedSettingsClientAnnotationTypeColorTable" input in settings dialog.
 *
 * @name setClientAnnotationTypeColor
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {Number} trIndex tree node index
 * @param {String} name name
 * @param {Object} color
 * @return {String} newValue New Value of aedSettingsClientAnnotationTypeColorTable input.  
 */
AEd.ui.DlgSettings.prototype.setClientAnnotationTypeColor = function(trIndex, name, value) {
    if (this.contentLoaded) {
        this.elementClientAnnotationTypeColorTable.domElement.childNodes[trIndex].childNodes[0].firstChild.value = name;
		  var appearance = value.colorRGB + ";" + 
								 value.fontColorRGB + ";" + 
								 value.bold + ";" + 
								 value.italic  + ";" + 
								 value.underlined;
        this.elementClientAnnotationTypeColorTable.domElement.childNodes[trIndex].childNodes[1].firstChild.value = appearance;         
    }
}

// --------------------------------------------------------------- getClientAdvancedToolbarValue
/**
 * Gets value of "aedSettingsClientAdvancedToolbarOptionsValue" (which radiobutton is checked).
 *
 * @name getClientAdvancedToolbarValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsClientAdvancedToolbarOptionsValue (checked radiobutton).
 */
AEd.ui.DlgSettings.prototype.getClientAdvancedToolbarOptionsValue = function() {
    if (this.contentLoaded) {
        if (this.domElementClientAdvancedToolbarOptionsAllInOneRadio && this.domElementClientAdvancedToolbarOptionsAllInOneRadio.checked) {
            return "AllInOne";
        }
        else if (this.domElementClientAdvancedToolbarOptionsTwoToolbarsRadio && this.domElementClientAdvancedToolbarOptionsTwoToolbarsRadio.checked) {
            return "TwoToolbars";
        }
        else {
            this.domElementClientAdvancedToolbarOptionsTwoToolbarsRadio.checked = true;
            return "TwoToolbars";
        }
    }
}

// -------------------------------------------------------------------- setClientAdvancedToolbarValue
/**
 * Sets value of "aedSettingsClientAdvancedToolbarOptionsValue" checks radiobutton.
 *
 * @name setClientAdvancedToolbarValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsClientAdvancedToolbarOptionsValue radiobutton.  
 */
AEd.ui.DlgSettings.prototype.setClientAdvancedToolbarOptionsValue = function(newValue) {
    if (this.contentLoaded) {
        if (newValue == "AllInOne") {
            this.domElementClientAdvancedToolbarOptionsAllInOneRadio.checked = true;
        }
        else if (newValue == "TwoToolbars") {
            this.domElementClientAdvancedToolbarOptionsTwoToolbarsRadio.checked = true;
        }
        else {
            this.domElementClientAdvancedToolbarOptionsTwoToolbarsRadio.checked = true;
        }
    }
}

// --------------------------------------------------------------- getClientRefuseSuggestionValue
/**
 * Gets value of "aedSettingsClientRefuseSuggestionValue" checkbox in settings dialog.
 *
 * @name getClientRefuseSuggestionValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsClientRefuseSuggestionValue checkbox.
 */
AEd.ui.DlgSettings.prototype.getClientRefuseSuggestionValue = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientRefuseSuggestionValue) {
            return this.domElementCheckboxClientRefuseSuggestionValue.checked;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setClientRefuseSuggestionValue
/**
 * Sets value of "aedSettingsClientRefuseSuggestionValue" checkbox in settings dialog.
 *
 * @name setClientRefuseSuggestionValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsClientRefuseSuggestionValue checkbox.  
 */
AEd.ui.DlgSettings.prototype.setClientRefuseSuggestionValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientRefuseSuggestionValue) {
            this.domElementCheckboxClientRefuseSuggestionValue.checked = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setClientRefuseSuggestionValue(newValue);
        }, this);     
    }
}

// --------------------------------------------------------------- getClientSuggestionConfidenceValue
/**
 * Gets value of "aedSettingsClientSuggestionConfidenceValue" input in settings dialog.
 *
 * @name getClientSuggestionConfidenceValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsClientSuggestionConfidenceValue input.
 */
AEd.ui.DlgSettings.prototype.getClientSuggestionConfidenceValue = function() {
    if (this.contentLoaded) {
        if (this.domElementInputClientSuggestionConfidenceValue) {
            return this.domElementInputClientSuggestionConfidenceValue.value;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setClientSuggestionConfidenceValue
/**
 * Sets value of "aedSettingsClientSuggestionConfidenceValue" input in settings dialog.
 *
 * @name setClientSuggestionConfidenceValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsClientSuggestionConfidenceValue input.  
 */
AEd.ui.DlgSettings.prototype.setClientSuggestionConfidenceValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputClientSuggestionConfidenceValue) {
            this.domElementInputClientSuggestionConfidenceValue.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setClientSuggestionConfidenceValue(newValue);
        }, this);     
    }
}

// --------------------------------------------------------------- getClientSuggestionAutoConfirmingValue
/**
 * Gets value of "aedSettingsClientSuggestionAutoConfirmingValue" input in settings dialog.
 *
 * @name getClientSuggestionAutoConfirmingValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsClientSuggestionAutoConfirmingValue input.
 */
AEd.ui.DlgSettings.prototype.getClientSuggestionAutoConfirmingValue = function() {
    if (this.contentLoaded) {
        if (this.domElementInputClientSuggestionAutoConfirmingValue) {
            return this.domElementInputClientSuggestionAutoConfirmingValue.value;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setClientSuggestionAutoConfirmingValue
/**
 * Sets value of "aedSettingsClientSuggestionAutoConfirmingValue" input in settings dialog.
 *
 * @name setClientSuggestionAutoConfirmingValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsClientSuggestionAutoConfirmingValue input.  
 */
AEd.ui.DlgSettings.prototype.setClientSuggestionAutoConfirmingValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputClientSuggestionAutoConfirmingValue) {
            this.domElementInputClientSuggestionAutoConfirmingValue.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setClientSuggestionAutoConfirmingValue(newValue);
        }, this);     
    }
}

// --------------------------------------------------------------- getServerLanguageValue
/**
 * Gets value of "aedSettingsServerLanguageValue" input in settings dialog.
 *
 * @name getServerLanguageValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsServerLanguageValue input.
 */
AEd.ui.DlgSettings.prototype.getServerLanguageValue = function() {
    if (this.contentLoaded) {
        if (this.domElementInputServerLanguageValue) {
            return this.domElementInputServerLanguageValue.value;
        }
        else {
            return null;
        }
    }
}      

// -------------------------------------------------------------------- setServerLanguageValue
/**
 * Sets value of "aedSettingsServerLanguageValue" input in settings dialog.
 *
 * @name setServerLanguageValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsServerLanguageValue input.  
 */
AEd.ui.DlgSettings.prototype.setServerLanguageValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputServerLanguageValue) {
            this.domElementInputServerLanguageValue.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setServerLanguageValue(newValue);
        }, this);     
    }
}

// -------------------------------------------------------------------- getSubscriptionsValue
/**
 * Gets value of "aedSettingsSubscriptionsValue" input in settings dialog.
 *
 * @name getSubscriptionsValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 */
AEd.ui.DlgSettings.prototype.getSubscriptionsValue = function() {
    if (this.contentLoaded) {
        if (this.domElementInputSubscriptionsValue) {
            return this.domElementInputSubscriptionsValue.value;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setSubscriptionsValue
/**
 * Sets value of "aedSettingsSubscriptionsValue" input in settings dialog.
 *
 * @name setSubscriptionsValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsSubscriptionsValue input.  
 */
AEd.ui.DlgSettings.prototype.setSubscriptionsValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputSubscriptionsValue) {
            this.domElementInputSubscriptionsValue.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setSubscriptionsValue(newValue);
        }, this);     
    }
}

// -------------------------------------------------------------------- getUnsubscriptionsValue
/**
 * Gets value of "aedSettingsUnsubscriptionsValue" input in settings dialog.
 *
 * @name getUnsubscriptionsValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 */
AEd.ui.DlgSettings.prototype.getUnsubscriptionsValue = function() {
    if (this.contentLoaded) {
        if (this.domElementInputUnsubscriptionsValue) {
            return this.domElementInputUnsubscriptionsValue.value;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setUnsubscriptionsValue
/**
 * Sets value of "aedSettingsUnsubscriptionsValue" input in settings dialog.
 *
 * @name setUnsubscriptionsValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsUnsubscriptionsValue input.  
 */
AEd.ui.DlgSettings.prototype.setUnsubscriptionsValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputUnsubscriptionsValue) {
            this.domElementInputUnsubscriptionsValue.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setUnsubscriptionsValue(newValue);
        }, this);     
    }
}

// --------------------------------------------------------------- getDefaultUserGroupValue
/**
 * Gets value of "aedSettingsDefaultUserGroupValue" input in settings dialog.
 *
 * @name getDefaultUserGroupValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsDefaultUserGroupValue input.
 */
AEd.ui.DlgSettings.prototype.getDefaultUserGroupValue = function() {
    if (this.contentLoaded) {
        if (this.domElementInputDefaultUserGroupValue) {
            return this.domElementInputDefaultUserGroupValue.value;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setDefaultUserGroupValue
/**
 * Sets value of "aedSettingsDefaultUserGroupValue" input in settings dialog.
 *
 * @name setDefaultUserGroupValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsDefaultUserGroupValue input.  
 */
AEd.ui.DlgSettings.prototype.setDefaultUserGroupValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputDefaultUserGroupValue) {
            this.domElementInputDefaultUserGroupValue.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setDefaultUserGroupValue(newValue);
        }, this);     
    }
}

// --------------------------------------------------------------- getClientFoldingOfAttributesValue
/**
 * Gets value of "aedSettingsClientFoldingOfAttributesValue" checkbox in settings dialog.
 *
 * @name getClientFoldingOfAttributesValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsClientFoldingOfAttributesValue checkbox.
 */
AEd.ui.DlgSettings.prototype.getClientFoldingOfAttributesValue = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfAttributesValue) {
            return this.domElementCheckboxClientFoldingOfAttributesValue.checked;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setClientFoldingOfAttributesValue
/**
 * Sets value of "aedSettingsClientFoldingOfAttributesValue" checkbox in settings dialog.
 *
 * @name setClientFoldingOfAttributesValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsClientFoldingOfAttributesValue checkbox.  
 */
AEd.ui.DlgSettings.prototype.setClientFoldingOfAttributesValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfAttributesValue) {
            this.domElementCheckboxClientFoldingOfAttributesValue.checked = newValue;

            if (newValue) {
                this.elementClientFoldingOfAttributesResizeWrapper.show();
                this.domElementCheckboxClientFoldingOfAttributesResize.disabled = false;
                this.domElementCheckboxClientFoldingOfAttributesHideButton.disabled = false;
            }
            else {
                this.domElementCheckboxClientFoldingOfAttributesResize.disabled = true;
                this.domElementCheckboxClientFoldingOfAttributesResize.checked = false;
                this.elementClientFoldingOfAttributesResizeWrapper.hide();
                this.domElementCheckboxClientFoldingOfAttributesHideButton.disabled = true;
                this.domElementCheckboxClientFoldingOfAttributesHideButton.checked = false;
                this.elementClientFoldingOfAttributesHideButtonWrapper.hide();
            }
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setClientFoldingOfAttributesValue(newValue);
        }, this);     
    }
}

// --------------------------------------------------------------- getClientFoldingOfAttributesResizeDynamicallyValue
/**
 * Gets value of "aedSettingsClientFoldingOfAttributesResizeValue" checkbox in settings dialog.
 *
 * @name getClientFoldingOfAttributesResizeDynamicallyValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsClientFoldingOfAttributesResizeValue checkbox.
 */
AEd.ui.DlgSettings.prototype.getClientFoldingOfAttributesResizeDynamicallyValue = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfAttributesResize) {
            return this.domElementCheckboxClientFoldingOfAttributesResize.checked;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setClientFoldingOfAttributesResizeDynamicallyValue
/**
 * Sets value of "aedSettingsClientFoldingOfAttributesResizeValue" checkbox in settings dialog.
 *
 * @name setClientFoldingOfAttributesResizeDynamicallyValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsClientFoldingOfAttributesResizeValue checkbox.  
 */
AEd.ui.DlgSettings.prototype.setClientFoldingOfAttributesResizeDynamicallyValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfAttributesResize) {
            this.domElementCheckboxClientFoldingOfAttributesResize.checked = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setClientFoldingOfAttributesResizeDynamicallyValue(newValue);
        }, this);     
    }
}

// --------------------------------------------------------------- getClientFoldingOfAttributesHideButtonValue
/**
 * Gets value of "aedSettingsClientFoldingOfAttributesHideButtonValue" checkbox in settings dialog.
 *
 * @name getClientFoldingOfAttributesHideButtonValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsClientFoldingOfAttributesHideButtonValue checkbox.
 */
AEd.ui.DlgSettings.prototype.getClientFoldingOfAttributesHideButtonValue = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfAttributesHideButton) {
            return this.domElementCheckboxClientFoldingOfAttributesHideButton.checked;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setClientFoldingOfAttributesHideButtonValue
/**
 * Sets value of "aedSettingsClientFoldingOfAttributesHideButtonValue" checkbox in settings dialog.
 *
 * @name setClientFoldingOfAttributesHideButtonValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsClientFoldingOfAttributesHideButtonValue checkbox.  
 */
AEd.ui.DlgSettings.prototype.setClientFoldingOfAttributesHideButtonValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfAttributesHideButton) {
            this.domElementCheckboxClientFoldingOfAttributesHideButton.checked = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setClientFoldingOfAttributesHideButtonValue(newValue);
        }, this);     
    }
}

// --------------------------------------------------------------- getClientFoldingOfAttributesNestedsValue
/**
 * Gets value of "aedSettingsClientFoldingOfNestedsValue" checkbox in settings dialog.
 *
 * @name getClientFoldingOfAttributesNestedsValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsClientFoldingOfNestedsValue checkbox.
 */
AEd.ui.DlgSettings.prototype.getClientFoldingOfAttributesNestedsValue = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfNestedsValue) {
            return this.domElementCheckboxClientFoldingOfNestedsValue.checked;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setClientFoldingOfAttributesNestedsValue
/**
 * Sets value of "aedSettingsClientFoldingOfNestedsValue" checkbox in settings dialog.
 *
 * @name setClientFoldingOfAttributesNestedsValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsClientFoldingOfNestedsValue checkbox.  
 */
AEd.ui.DlgSettings.prototype.setClientFoldingOfAttributesNestedsValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfNestedsValue) {
            this.domElementCheckboxClientFoldingOfNestedsValue.checked = newValue;

            if (newValue) {
                this.elementClientFoldingOfNestedsHideButtonWrapper.show();
                this.domElementCheckboxClientFoldingOfNestedsHideButton.disabled = false;
            }
            else {
                this.domElementCheckboxClientFoldingOfNestedsHideButton.disabled = true;
                this.domElementCheckboxClientFoldingOfNestedsHideButton.checked = false;
                this.elementClientFoldingOfNestedsHideButtonWrapper.hide();
            }
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setClientFoldingOfAttributesNestedsValue(newValue);
        }, this);     
    }
}

// --------------------------------------------------------------- getClientFoldingOfAttributesNestedsHideButtonValue
/**
 * Gets value of "aedSettingsClientFoldingOfNestedsHideButtonValue" checkbox in settings dialog.
 *
 * @name getClientFoldingOfAttributesNestedsHideButtonValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsClientFoldingOfNestedsHideButtonValue checkbox.
 */
AEd.ui.DlgSettings.prototype.getClientFoldingOfAttributesNestedsHideButtonValue = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfNestedsHideButton) {
            return this.domElementCheckboxClientFoldingOfNestedsHideButton.checked;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setClientFoldingOfAttributesNestedsHideButtonValue
/**
 * Sets value of "aedSettingsClientFoldingOfNestedsHideButtonValue" checkbox in settings dialog.
 *
 * @name setClientFoldingOfAttributesNestedsHideButtonValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsClientFoldingOfNestedsHideButtonValue checkbox.  
 */
AEd.ui.DlgSettings.prototype.setClientFoldingOfAttributesNestedsHideButtonValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfNestedsHideButton) {
            this.domElementCheckboxClientFoldingOfNestedsHideButton.checked = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setClientFoldingOfAttributesNestedsHideButtonValue(newValue);
        }, this);     
    }
}

// --------------------------------------------------------------- getClientFoldingOfAttributesNestedsLevelsValue
/**
 * Gets value of "aedSettingsClientFoldingOfNestedsLevels" input in settings dialog.
 *
 * @name getClientFoldingOfAttributesNestedsLevelsValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsDefaultUserGroupValue input.
 */
AEd.ui.DlgSettings.prototype.getClientFoldingOfAttributesNestedsLevelsValue = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfNestedsLevelsValue) {
            return this.domElementCheckboxClientFoldingOfNestedsLevelsValue.value;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setClientFoldingOfAttributesNestedsLevelsValue
/**
 * Sets value of "aedSettingsClientFoldingOfNestedsLevels" input in settings dialog.
 *
 * @name setClientFoldingOfAttributesNestedsLevelsValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsClientFoldingOfNestedsLevels input.  
 */
AEd.ui.DlgSettings.prototype.setClientFoldingOfAttributesNestedsLevelsValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfNestedsLevelsValue) {
            this.domElementCheckboxClientFoldingOfNestedsLevelsValue.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setClientFoldingOfAttributesNestedsLevelsValue(newValue);
        }, this);     
    }
}

// --------------------------------------------------------------- getClientFoldingOfAttributesNestedsHideLevelValue
/**
 * Gets value of "aedSettingsClientFoldingOfNestedsHideLevel" input in settings dialog.
 *
 * @name getClientFoldingOfAttributesNestedsHideLevelValue
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {String} Value of aedSettingsDefaultUserGroupValue input.
 */
AEd.ui.DlgSettings.prototype.getClientFoldingOfAttributesNestedsHideLevelValue = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfNestedsHideLevelValue) {
            return this.domElementCheckboxClientFoldingOfNestedsHideLevelValue.value;
        }
        else {
            return null;
        }
    }
}

// -------------------------------------------------------------------- setClientFoldingOfAttributesNestedsHideLevelValue
/**
 * Sets value of "aedSettingsClientFoldingOfNestedsHideLevel" input in settings dialog.
 *
 * @name setClientFoldingOfAttributesNestedsHideLevelValue
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {String} newValue New Value of aedSettingsClientFoldingOfNestedsLevels input.  
 */
AEd.ui.DlgSettings.prototype.setClientFoldingOfAttributesNestedsHideLevelValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementCheckboxClientFoldingOfNestedsHideLevelValue) {
            this.domElementCheckboxClientFoldingOfNestedsHideLevelValue.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setClientFoldingOfAttributesNestedsHideLevelValue(newValue);
        }, this);     
    }
}

// ---------------------------------------------------------------- addTableRow
/**
 * Adds a new row to table.
 *
 * @name addTableRow
 * @memberOf AEd.ui.DlgSettings  
 * @function   
 * @param table Specifies the table to operate with  
 * @param {String} name Setting name.   
 * @param {String} value Setting value. 
 */
AEd.ui.DlgSettings.prototype.addTableRow = function(table, name, value) {
    if (this.contentLoaded) {
        if (table) {
            var selNode = this.tree.getSelectedTreeNode().assignedObject.type;

            var domElementTR = document.createElement('tr');
            var domElementTDname = document.createElement('td');
            var domElementTDvalue = document.createElement('td');
            if (selNode == "ClientAnnotationTypeColor") {
                var domElementTDbtnSelect = document.createElement('td');
            }
            var domElementTDbtn = document.createElement('td');
            var domElementInputName = document.createElement('input');
            var domElementInputValue = document.createElement('input');
           
            domElementInputName.type  = "text";
            domElementInputValue.type  = "text";
            
            if (typeof name != 'undefined') {
                domElementInputName.value  = name;
            }
            if (typeof value != 'undefined') {
                domElementInputValue.value  = value;
            }            
            
            
            var elementTR = AEd.$(domElementTR);
            var elementTDname = AEd.$(domElementTDname);
            var elementTDvalue = AEd.$(domElementTDvalue);
            if (selNode == "ClientAnnotationTypeColor") {
                var elementTDbtnSelect = AEd.$(domElementTDbtnSelect);
            }
            var elementTDbtn = AEd.$(domElementTDbtn);    
            var elementInputName = AEd.$(domElementInputName);
            var elementInputValue = AEd.$(domElementInputValue);
           
            elementTDname.addClass(AEd.CONFIG.CLASS_UI_TABLE_COLUMN1);
            elementTDvalue.addClass(AEd.CONFIG.CLASS_UI_TABLE_COLUMN2);
            if (selNode == "ClientAnnotationTypeColor") {
                elementTDbtnSelect.addClass(AEd.CONFIG.CLASS_UI_TABLE_COLUMN3);
                elementTDbtn.addClass(AEd.CONFIG.CLASS_UI_TABLE_COLUMN4);
            }
            else {
                elementTDbtn.addClass(AEd.CONFIG.CLASS_UI_TABLE_COLUMN3);
            }
            
            elementTR.addChild(elementTDname);
            elementTR.addChild(elementTDvalue);
            if (selNode == "ClientAnnotationTypeColor") {
                elementTR.addChild(elementTDbtnSelect);
            }
            elementTR.addChild(elementTDbtn);
            
            elementTDname.addChild(elementInputName);
            elementTDvalue.addChild(elementInputValue);
            
            if (selNode == "ClientAnnotationTypeColor") {
                var btnSelect = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_settings_button_select"), targetElement: domElementTDbtnSelect});
            }
            var btnDelete = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_settings_button_delete"), targetElement: domElementTDbtn});
            
            if (selNode == "ClientAnnotationTypeColor") {
                btnSelect.onClick.addHandler(function (targetButton) {
                    var trIndex = null;
                    var aChildNodes = table.getChildNodes();
                    for (var j = 0; j < aChildNodes.length; j++) {
                        if (aChildNodes[j] === targetButton.elementRoot.domElement.parentNode.parentNode) {
                            trIndex = j;
                            break;
                        }
                    } 
                    if (typeof trIndex != "undefined") {
                        var name = table.domElement.childNodes[trIndex].childNodes[0].firstChild.value;
                        var value = table.domElement.childNodes[trIndex].childNodes[1].firstChild.value;
                        this.onBtnSelect.fire(trIndex, name, value);
                    }                            
                }, this);
            }
            
            btnDelete.onClick.addHandler(function (targetButton) {            
                var trIndex = null;
                var aChildNodes = table.getChildNodes();
                for (var j = 0; j < aChildNodes.length; j++) {
                    if (aChildNodes[j] === targetButton.elementRoot.domElement.parentNode.parentNode) {
                        trIndex = j;
                        break;
                    }
                } 
                if (typeof trIndex != "undefined") {
                    this.deleteTableRow(table, trIndex);
                }
                
                if (table.getChildNodes().length < 1) {
                    this.elementClientAnnotationTypeColorTableHeader.hide();
                    this.elementUnknownTableHeader.hide();    
                }
                }, this);
            
            table.addChild(elementTR);
            
            if (table.getChildNodes().length > 0) {
                this.elementClientAnnotationTypeColorTableHeader.show();
                this.elementUnknownTableHeader.show();    
            }
        }
    }
    else {         
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.addTableRow(table, name, value);
        }, this);  
    }
} 

// --------------------------------------------------------- getTableRows
/**
 * Gets table rows and return them as array.
 *
 * @name getTableRows
 * @memberOf AEd.ui.DlgSettings 
 * @function
 * @param table Specifies the table to operate with    
 */
AEd.ui.DlgSettings.prototype.getTableRows = function(table) {
    if (table) {
        var aReturnArray = new Array();
        
        var rows = new Array();
        rows = table.getChildNodes();
        
        for (var i = 0; i < rows.length; i++)
        {
          if (rows[i].cells[0].firstChild.value == ""
                && rows[i].cells[1].firstChild.value == "") {
                continue;
            }
          aReturnArray.push({
              name: rows[i].cells[0].firstChild.value,
              value: rows[i].cells[1].firstChild.value
          });
        }

        return aReturnArray;
    }
}

// ------------------------------------------------------------- deleteTableRow
/**
 * Deletes a row from table.
 *
 * @name deleteTableRow
 * @memberOf AEd.ui.DlgSettings
 * @param table Specifies the table to operate with  
 * @param {Number} index Row index.   
 * @function   
 */
AEd.ui.DlgSettings.prototype.deleteTableRow = function(table, index) {
    if (this.contentLoaded) {    
        if (typeof index != 'undefined') {
            var aChildNodes = table.getChildNodes(); 
            if (aChildNodes && (aChildNodes.length > 0)) {
                if (index >= 0 && index < aChildNodes.length) {
                    if (aChildNodes[index]) {
                        table.removeChild(aChildNodes[index]);
                    }
                }         
            }               
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.deleteTableRow(table, index);
        }, this);     
    }
} 

// --------------------------------------------------------- deleteEmptyTableRows
/**
 * Deletes empty rows from table.
 *
 * @name deleteEmptyTableRows
 * @memberOf AEd.ui.DlgSettings 
 * @function
 * @param table Specifies the table to operate with    
 */
AEd.ui.DlgSettings.prototype.deleteEmptyTableRows = function(table) {
    if (table) {
        var i = 0;
        var aChildNodes = table.getChildNodes();
        while (i < aChildNodes.length) {
            if (table.domElement.childNodes[i].childNodes[0].firstChild.value == ""
                && table.domElement.childNodes[i].childNodes[1].firstChild.value == "") {
                this.deleteTableRow(table, i);
                continue;
            }
            i++;
        }
    }
}

// --------------------------------------------------------- deleteAllTableRows
/**
 * Deletes all rows from table.
 *
 * @name deleteAllTableRows
 * @memberOf AEd.ui.DlgSettings 
 * @function
 * @param table Specifies the table to operate with    
 */
AEd.ui.DlgSettings.prototype.deleteAllTableRows = function(table) {
    if (this.contentLoaded) {
        while(table.domElement.firstChild) {
            table.removeChild(table.domElement.firstChild);
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.deleteAllTableRows();
        }, this);      
    }
} 

// ---------------------------------------------------------------- getSetting
/**
 * Returns name and value of the setting or null if setting does not exist
 *
 * @name getSetting
 * @memberOf AEd.ui.DlgSettings 
 * @function
 * @param {String} name Name of the setting    
 * @return {Object} the setting. 
 */
AEd.ui.DlgSettings.prototype.getSetting = function(name) {
    var oSetting = {};
    var settings = this.getSettings();
    for (var i in settings) {
        if (settings[i].name == name) {
            oSetting = {
                name: settings[i].name,
                value: settings[i].value
            }
            return oSetting;
        }
    }
    
    return null;
}

// ---------------------------------------------------------------- getSettings
/**
 * Returns array of settings : 
 * [{name: name1, value: value1}, {name: name2, value: value2}, {...}]
 *
 * @name getSettings
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 * @return {Array} Array of settings. 
 */
AEd.ui.DlgSettings.prototype.getSettings = function() {
    if (this.contentLoaded) {
        var aReturnArray = new Array();
        
        // Cient
        for (var i in this.treeNodeClient.childTreeNodes) {
            var childNode = this.treeNodeClient.childTreeNodes[i];
            switch (childNode.assignedObject.type) {
                case "ClientAnnotationTypeColor":
                    for (var j in childNode.assignedObject.table) {
                        aReturnArray.push({
                            name: childNode.assignedObject.table[j].name,
                            value: childNode.assignedObject.table[j].value
                        });    
                    }   
                break;
                case "ClientAdvancedToolbarOptions":
                    if (!childNode.assignedObject.value) {
                        childNode.assignedObject.value = AEd.CONFIG.DEFAULT_ADV_TOOLBAR;   
                    }
                    aReturnArray.push({
                        name: childNode.assignedObject.name,
                        value: childNode.assignedObject.value
                    });                     
                break;
                case "ClientRefuseSuggestion":
                    aReturnArray.push({
                        name: childNode.assignedObject.name,
                        value: childNode.assignedObject.value
                    });    
                break;
                case "ClientSuggestionConfidence":
                    if (!childNode.assignedObject.value) {
                        childNode.assignedObject.value = AEd.CONFIG.DEFAULT_SETTINGS_SUGGESTION_CONFIDENCE;   
                    }
                    aReturnArray.push({
                        name: childNode.assignedObject.name,
                        value: childNode.assignedObject.value
                    });    
                break;
                case "ClientSuggestionAutoConfirming":
                    if (!childNode.assignedObject.value) {
                        childNode.assignedObject.value = AEd.CONFIG.DEFAULT_SETTINGS_SUGGESTION_AUTO_CONFIRMING;   
                    }
                    aReturnArray.push({
                        name: childNode.assignedObject.name,
                        value: childNode.assignedObject.value
                    });    
                break;
                case "ClientFoldingOfAttributes":
                
                    aReturnArray.push({
                        name: childNode.assignedObject.name,
                        value: childNode.assignedObject.value
                    });
                    aReturnArray.push({
                        name: childNode.assignedObject.name + "ResizeDynamically",
                        value: childNode.assignedObject.resizeDynamically
                    });
                    aReturnArray.push({
                        name: childNode.assignedObject.name + "HideButton",
                        value: childNode.assignedObject.hideButton
                    });
                    aReturnArray.push({
                        name: childNode.assignedObject.name + "Nesteds",
                        value: childNode.assignedObject.nestedsValue
                    });
                    aReturnArray.push({
                        name: childNode.assignedObject.name + "NestedsHideButton",
                        value: childNode.assignedObject.nestedsHideButton
                    });
                    aReturnArray.push({
                        name: childNode.assignedObject.name + "NestedsLevels",
                        value: childNode.assignedObject.nestedsLevels
                    });
                    aReturnArray.push({
                        name: childNode.assignedObject.name + "NestedsHideLevel",
                        value: childNode.assignedObject.nestedsHideLevel
                    });
                     
                break;

                default:
                break;
            }
        }
        
        // Server
        for (var i in this.treeNodeServer.childTreeNodes) {
            var childNode = this.treeNodeServer.childTreeNodes[i];
            switch (childNode.assignedObject.type) {
                case "ServerLanguage":
                    if (!childNode.assignedObject.value) {
                        childNode.assignedObject.value = AEd.CONFIG.DEFAULT_SETTINGS_SERVER_LANGUAGE;   
                    }
                    aReturnArray.push({
                        name: childNode.assignedObject.name,
                        value: childNode.assignedObject.value
                    });    
                break;
                default:
                break;
            }
        }
        
        // Common
        for (var i in this.treeNodeCommon.childTreeNodes) {
            var childNode = this.treeNodeCommon.childTreeNodes[i];
            switch (childNode.assignedObject.type) {
                case "DefaultUserGroup":
                    aReturnArray.push({
                        name: childNode.assignedObject.name,
                        value: childNode.assignedObject.value
                    });    
                break;
                default:
                break;
            }
        }

        // (Un)subscriptions
        for (var i in this.treeNodeUnsubscriptions.childTreeNodes) {
            var childNode = this.treeNodeUnsubscriptions.childTreeNodes[i];
            switch (childNode.assignedObject.type) {
                case "Subscriptions":
                    if (!childNode.assignedObject.value) {
                        childNode.assignedObject.value = "";   
                    }
                    aReturnArray.push({
                        name: childNode.assignedObject.name,
                        value: childNode.assignedObject.value
                    });    
                break;
                case "Unsubscriptions":
                    if (!childNode.assignedObject.value) {
                        childNode.assignedObject.value = "";   
                    }
                    aReturnArray.push({
                        name: childNode.assignedObject.name,
                        value: childNode.assignedObject.value
                    });    
                break;
                default:
                break;
            }   
        }

 
        
        // Unknown
        for (var i in this.treeNodeUnknown.assignedObject.table) {
            aReturnArray.push({
                name: this.treeNodeUnknown.assignedObject.table[i].name,
                value: this.treeNodeUnknown.assignedObject.table[i].value
            });    
        }

        return aReturnArray;
    }
}        

// ---------------------------------------------------------------- setSettings
/**
 * Creates TreeNodes for known setting and table for unknown settings
 *
 * @name setSettings
 * @memberOf AEd.ui.DlgSettings 
 * @function  
 * @param {Array} aSettings Array of settings.  
 */
AEd.ui.DlgSettings.prototype.setSettings = function(aSettings) {


    if (this.contentLoaded) {
        this.deleteAllTableRows(this.elementClientAnnotationTypeColorTable);
        this.deleteAllTableRows(this.elementUnknownTable);
        
        if (typeof aSettings != 'undefined') {
            var regExp = new RegExp(/^ClientAnnotationTypeColor:/);
            for (var i = 0; i < aSettings.length; i++) {
                if (aSettings[i].name.match(regExp)) { // case "ClientAnnotationTypeColor"
                    this.ClientAnnotationTypeColor.assignedObject.table.push({
                        name: aSettings[i].name,
                        value: aSettings[i].value                            
                    });              
                    continue;
                }
                switch (aSettings[i].name) {
                    // known settings
                    case "ClientRefuseSuggestion":
                        if (aSettings[i].value == "true") {
                            this.ClientRefuseSuggestion.assignedObject.value = true;
                        }
                        else {
                            this.ClientRefuseSuggestion.assignedObject.value = false;    
                        }    
                    break;
                    case "ClientAdvancedToolbarOptions":
                        this.ClientAdvancedToolbarOptions.assignedObject.value = aSettings[i].value;
                    break;
                    case "ClientSuggestionConfidence":
                        this.ClientSuggestionConfidence.assignedObject.value = aSettings[i].value;    
                    break;                
                    case "ClientFoldingOfAttributes":
                        if (aSettings[i].value == "true") {
                            this.ClientFoldingOfAttributes.assignedObject.value = true;
                        }
                        else {
                            this.ClientFoldingOfAttributes.assignedObject.value = false;    
                        }    
                    break;
                    case "ClientFoldingOfAttributesResizeDynamically":
                        if (aSettings[i].value == "true") {
                            this.ClientFoldingOfAttributes.assignedObject.resizeDynamically = true;
                        }
                        else {
                            this.ClientFoldingOfAttributes.assignedObject.resizeDynamically = false;    
                        }    
                    break;
                    case "ClientFoldingOfAttributesHideButton":
                        if (aSettings[i].value == "true") {
                            this.ClientFoldingOfAttributes.assignedObject.hideButton = true;
                        }
                        else {
                            this.ClientFoldingOfAttributes.assignedObject.hideButton = false;    
                        }    
                    break;
                    case "ClientFoldingOfAttributesNesteds":
                        if (aSettings[i].value == "true") {
                            this.ClientFoldingOfAttributes.assignedObject.nestedsValue = true;
                        }
                        else {
                            this.ClientFoldingOfAttributes.assignedObject.nestedsValue = false;    
                        }
                    break;
                    case "ClientFoldingOfAttributesNestedsHideButton":
                        if (aSettings[i].value == "true") {
                            this.ClientFoldingOfAttributes.assignedObject.nestedsHideButton = true;
                        }
                        else {
                            this.ClientFoldingOfAttributes.assignedObject.nestedsHideButton = false;    
                        }    
                    break;
                    case "ClientFoldingOfAttributesNestedsLevels":
                        this.ClientFoldingOfAttributes.assignedObject.nestedsLevels = aSettings[i].value;
                    break;
                    case "ClientFoldingOfAttributesNestedsHideLevel":
                        this.ClientFoldingOfAttributes.assignedObject.nestedsHideLevel = aSettings[i].value;
                    break;
                    case "ClientSuggestionAutoConfirming":
                        this.ClientSuggestionAutoConfirming.assignedObject.value = aSettings[i].value;    
                    break;

                    case "ServerLanguage":
                        this.ServerLanguage.assignedObject.value = aSettings[i].value;    
                    break;
                    case "DefaultUserGroup":
                        this.DefaultUserGroup.assignedObject.value = aSettings[i].value;    
                    break;
                    case "Subscriptions":
                        this.Subscriptions.assignedObject.value = aSettings[i].value;
                    break;
                    case "Unsubscriptions":
                        this.Unsubscriptions.assignedObject.value = aSettings[i].value;
                    break;
                    // unknown settings
                    default:                       
                        this.treeNodeUnknown.assignedObject.table.push({name: aSettings[i].name, value: aSettings[i].value});   
                    break;                
                }
            }
        }
        
        if (this.ClientSuggestionConfidence.assignedObject.value == "") {
            this.ClientSuggestionConfidence.assignedObject.value = AEd.CONFIG.DEFAULT_SETTINGS_SUGGESTION_CONFIDENCE;    
        }
        if (this.ClientSuggestionAutoConfirming.assignedObject.value == "") {
            this.ClientSuggestionAutoConfirming.assignedObject.value = AEd.CONFIG.DEFAULT_SETTINGS_SUGGESTION_AUTO_CONFIRMING;   
        }
        if (this.ServerLanguage.assignedObject.value == "") {
            this.ServerLanguage.assignedObject.value = AEd.CONFIG.DEFAULT_SETTINGS_SERVER_LANGUAGE;
        }
        if (this.DefaultUserGroup.assignedObject.value == "") {
            this.DefaultUserGroup.assignedObject.value = this.getDefaultUserGroupValue();;
        }
        if (this.ClientFoldingOfAttributes.assignedObject.nestedsLevels == "") {
            this.ClientFoldingOfAttributes.assignedObject.nestedsLevels = this.getClientFoldingOfAttributesNestedsLevelsValue();
        }
        if (this.ClientFoldingOfAttributes.assignedObject.nestedsHideLevel == "") {
            this.ClientFoldingOfAttributes.assignedObject.nestedsHideLevel = this.getClientFoldingOfAttributesNestedsHideLevelValue();
        }
    }
}

// ---------------------------------------------------------------- setFieldset
/**
 * Sets fieldset on right side of settings dialog
 *
 * @name setFieldset
 * @memberOf AEd.ui.DlgSettings 
 * @function 
 * @param {String} fieldset Value   
 */
AEd.ui.DlgSettings.prototype.setFieldset = function(fieldset) {

    
    if (fieldset) {
        this.fieldset = fieldset;
        this.elementSettingFieldset.hide();
        this.elementClientFieldset.hide();
        this.elementServerFieldset.hide();
        this.elementCommonFieldset.hide();
        this.elementUsubscriptionsFieldset.hide();
        this.elementUnknownFieldset.hide();
        this.elementSubscriptionsFieldset.hide();
        this.elementUnsubscriptionsFieldset.hide();
        this.elementClientAnnotationTypeColorFieldset.hide();
        this.elementClientAdvancedToolbarOptionsFieldset.hide();
        this.elementClientRefuseSuggestionFieldset.hide();
        this.elementClientSuggestionConfidenceFieldset.hide();
        this.elementClientSuggestionAutoConfirmingFieldset.hide();
        this.elementClientFoldingOfAttributesFieldset.hide();
        this.elementServerLanguageFieldset.hide();
        this.elementDefaultUserGroupFieldset.hide();
                
        switch (this.fieldset) {
            case "Settings":
                this.elementSettingFieldset.show();               
            break;
            case "Client":
                this.elementClientFieldset.show();       
            break;
            case "Server":
                this.elementServerFieldset.show();            
            break;
            case "Common":  
                this.elementCommonFieldset.show();              
            break;
            case "(Un)subscriptions":  
                this.elementUsubscriptionsFieldset.show();              
            break;
            case "Subscriptions":
                this.elementSubscriptionsFieldset.show();
            break;
            case "Unsubscriptions":
                this.elementUnsubscriptionsFieldset.show();
            break;
            case "Unknown":  
                this.elementUnknownFieldset.show();              
            break;
            case "ClientAnnotationTypeColor":
                this.elementClientAnnotationTypeColorFieldset.show();    
            break;
            case "ClientAdvancedToolbarOptions":
                this.elementClientAdvancedToolbarOptionsFieldset.show();
            break; 
            case "ClientRefuseSuggestion":
                this.elementClientRefuseSuggestionFieldset.show();
            break;
            case "ClientSuggestionConfidence":
                this.elementClientSuggestionConfidenceFieldset.show();
            break;
            case "ClientSuggestionAutoConfirming":
                this.elementClientSuggestionAutoConfirmingFieldset.show();
            break;
            case "ClientFoldingOfAttributes":
                this.elementClientFoldingOfAttributesFieldset.show();
            break;

            case "ServerLanguage":
                this.elementServerLanguageFieldset.show(); 
            break;
            case "DefaultUserGroup":
                this.elementDefaultUserGroupFieldset.show();
            break;
            default:
            break;
        }    
    }
}

// ------------------------------------------------------------- storeSettings
/**
 * Stores changes to actual setting
 *
 * @name storeSettings
 * @memberOf AEd.ui.DlgSettings 
 * @function 
 * @param {AEd.ui.core.UITreeNode} oTreeNode Tree node to store   
 */
AEd.ui.DlgSettings.prototype.storeSettings = function(oTreeNode) {

    
    if (oTreeNode) {
        if (oTreeNode.assignedObject) {
            switch (oTreeNode.assignedObject.type) {
                case "ClientAnnotationTypeColor":
                    var aTable = this.getTableRows(this.elementClientAnnotationTypeColorTable);
                    for (var i in aTable) {
                        aTable[i].name = "ClientAnnotationTypeColor:" + aTable[i].name;
                    }
                    oTreeNode.assignedObject.table = aTable;
                break;
                case "ClientRefuseSuggestion":
                    oTreeNode.assignedObject.value = this.getClientRefuseSuggestionValue();    
                break;      
                case "ClientAdvancedToolbarOptions":
                    oTreeNode.assignedObject.value = this.getClientAdvancedToolbarOptionsValue();    
                break;           
                case "ClientSuggestionConfidence":
                    oTreeNode.assignedObject.value = this.getClientSuggestionConfidenceValue();
                break;
                case "ClientSuggestionAutoConfirming":
                    oTreeNode.assignedObject.value = this.getClientSuggestionAutoConfirmingValue();
                break;
                case "ClientFoldingOfAttributes":
                    oTreeNode.assignedObject.value = this.getClientFoldingOfAttributesValue();
                    oTreeNode.assignedObject.resizeDynamically = this.getClientFoldingOfAttributesResizeDynamicallyValue();
                    oTreeNode.assignedObject.hideButton = this.getClientFoldingOfAttributesHideButtonValue();    
                    oTreeNode.assignedObject.nestedsValue = this.getClientFoldingOfAttributesNestedsValue();
                    oTreeNode.assignedObject.nestedsHideButton = this.getClientFoldingOfAttributesNestedsHideButtonValue();
                    oTreeNode.assignedObject.nestedsLevels = this.getClientFoldingOfAttributesNestedsLevelsValue();
                    oTreeNode.assignedObject.nestedsHideLevel = this.getClientFoldingOfAttributesNestedsHideLevelValue();
                break;
                case "ServerLanguage":
                    oTreeNode.assignedObject.value = this.getServerLanguageValue();
                break;                   
                case "DefaultUserGroup":
                    oTreeNode.assignedObject.value = this.getDefaultUserGroupValue();      
                break;
                case "Subscriptions":
                    oTreeNode.assignedObject.value = this.getSubscriptionsValue();
                break;
                case "Unsubscriptions":
                    oTreeNode.assignedObject.value = this.getUnsubscriptionsValue();
                break;
                case "Unknown":
                    oTreeNode.assignedObject.table = this.getTableRows(this.elementUnknownTable);
                break;                                   
                default:
                break;           
            }    
        }
    }  
}

// ------------------------------------------------------------- updateFieldset
/**
 * Updates fieldset due to tree node parameter
 *
 * @name updateFieldset
 * @memberOf AEd.ui.DlgSettings 
 * @function 
 * @param {AEd.ui.core.UITreeNode} oTreeNode TreeNode of settings   
 */
AEd.ui.DlgSettings.prototype.updateFieldset = function(oTreeNode) {

        
    if (oTreeNode) {      
       if (oTreeNode.assignedObject) {
          this.setFieldset(oTreeNode.assignedObject.fieldset);
          
          switch (oTreeNode.assignedObject.type) {
            case "ClientAnnotationTypeColor":
                this.deleteEmptyTableRows(this.elementClientAnnotationTypeColorTable);
                if (this.elementClientAnnotationTypeColorTable.getChildNodes().length < 1) {
                    this.elementClientAnnotationTypeColorTableHeader.hide();    
                }
                this.deleteAllTableRows(this.elementClientAnnotationTypeColorTable);
                for (var i in oTreeNode.assignedObject.table) {
                    var name = oTreeNode.assignedObject.table[i].name.substr("ClientAnnotationTypeColor:".length, oTreeNode.assignedObject.table[i].name.length);
                    this.addTableRow(this.elementClientAnnotationTypeColorTable, name, oTreeNode.assignedObject.table[i].value);
                }    
            break;
            case "ClientRefuseSuggestion":
                this.setClientRefuseSuggestionValue(oTreeNode.assignedObject.value);
            break;            
            case "ClientAdvancedToolbarOptions":
                this.setClientAdvancedToolbarOptionsValue(oTreeNode.assignedObject.value);
            break;
            case "ClientSuggestionConfidence":
                this.setClientSuggestionConfidenceValue(oTreeNode.assignedObject.value);
            break;
            case "ClientSuggestionAutoConfirming":
                this.setClientSuggestionAutoConfirmingValue(oTreeNode.assignedObject.value);
            break;
            case "ClientFoldingOfAttributes":
                this.setClientFoldingOfAttributesValue(oTreeNode.assignedObject.value);
                this.setClientFoldingOfAttributesResizeDynamicallyValue(oTreeNode.assignedObject.resizeDynamically);
                this.setClientFoldingOfAttributesHideButtonValue(oTreeNode.assignedObject.hideButton); 
                this.setClientFoldingOfAttributesNestedsValue(oTreeNode.assignedObject.nestedsValue);
                this.setClientFoldingOfAttributesNestedsHideButtonValue(oTreeNode.assignedObject.nestedsHideButton);
                this.setClientFoldingOfAttributesNestedsLevelsValue(oTreeNode.assignedObject.nestedsLevels);
                this.setClientFoldingOfAttributesNestedsHideLevelValue(oTreeNode.assignedObject.nestedsHideLevel);
            break; 
            case "ServerLanguage":
                this.setServerLanguageValue(oTreeNode.assignedObject.value);                               
            break;  
            case "Subscriptions":
                 this.setSubscriptionsValue(oTreeNode.assignedObject.value); 
            break;   
            case "Unsubscriptions":
                 this.setUnsubscriptionsValue(oTreeNode.assignedObject.value); 
            break;               
            case "DefaultUserGroup":
                this.setDefaultUserGroupValue(oTreeNode.assignedObject.value);                                                
            break;
            case "Unknown":
                this.deleteEmptyTableRows(this.elementUnknownTable);
                if (this.elementUnknownTable.getChildNodes().length < 1) {
                    this.elementUnknownTableHeader.hide();    
                }
                this.deleteAllTableRows(this.elementUnknownTable);
                for (var i in oTreeNode.assignedObject.table) {
                    this.addTableRow(this.elementUnknownTable, oTreeNode.assignedObject.table[i].name, oTreeNode.assignedObject.table[i].value);
                }
            break;                                   
            default:
            break;           
          }
       }
    } 
}

// --------------------------------------------------------- onTreeNodeSelected
/**
 * Handler to tree.onNodeSelected event
 *
 * @name onTreeNodeSelected
 * @memberOf AEd.ui.DlgSettings 
 * @function 
 * @param {AEd.ui.core.UITreeNode} oTreeNode TreeNode of settings   
 */
AEd.ui.DlgSettings.prototype.onTreeNodeSelected = function(oTreeNode) {

       
    this.storeSettings(this.tree.lastSelectedTreeNode);
    this.updateFieldset(oTreeNode);
}

// ------------------------------------------------------------ checkSettings
/**
 * Checks settings before sending.
 *
 * @name checkSettings
 * @memberOf AEd.ui.DlgSettings 
 * @function 
 * @param {AEd.ui.core.UITreeNode} node Tree node   
 * @return (Boolean) True / false   
 */
AEd.ui.DlgSettings.prototype.checkSettings = function(node) {

    
    this.storeSettings(this.tree.getSelectedTreeNode());    
    
    var value = "";
    
    // Client
    // -----------------------------------------
    
    // ClientAnnotationTypeColor
    var table = this.ClientAnnotationTypeColor.assignedObject.table;
    for (var i in table) {
        if (!table[i].name || !table[i].value) {
            this.tree.setSelectedTreeNode(this.ClientAnnotationTypeColor);
            return false;
        }
       if (!table[i].value.match(/^rgba\(\d+,\d+,\d+,\d+(\.\d+)?\)\;rgba\(\d+,\d+,\d+,\d+(\.\d+)?\);\S+;\S+;\S+$/)) {
            this.tree.setSelectedTreeNode(this.ClientAnnotationTypeColor);
            return false;
        }
		  var attrArray = table[i].value.split(';');
		  // background color
        var integers = attrArray[0].substr("rgba(".length, table[i].value.length - 1);
        integers = integers.split(",");
        for (var j in integers) {
            if (j < 3) { // rgb
                if (integers[j] < 0 || integers[j] > 255) {
                    this.tree.setSelectedTreeNode(this.ClientAnnotationTypeColor);
                    return false;
                }
            }
            else { // alpha
                if (integers[j] < 0.0 || integers[j] > 1.0) {
                    this.tree.setSelectedTreeNode(this.ClientAnnotationTypeColor);
                    return false;
                }
            }
        }
		  // font Color
		  integers = attrArray[1].substr("rgba(".length, table[i].value.length - 1);
        integers = integers.split(",");
        for (var j in integers) {
            if (j < 3) { // rgb
                if (integers[j] < 0 || integers[j] > 255) {
                    this.tree.setSelectedTreeNode(this.ClientAnnotationTypeColor);
                    return false;
                }
            }
            else { // alpha
                if (integers[j] < 0.0 || integers[j] > 1.0) {
                    this.tree.setSelectedTreeNode(this.ClientAnnotationTypeColor);
                    return false;
                }
            }
        }
    }
    
    // ClientRefuseSuggestion - checkbox
    if (this.ClientRefuseSuggestion.assignedObject.value) {
        this.ClientRefuseSuggestion.assignedObject.value = "true";    
    }
    else {
        this.ClientRefuseSuggestion.assignedObject.value = "false";
    }
    
    // ClientSuggestionConfidence
    var regExpE = new RegExp("e", 'i');
    value = this.ClientSuggestionConfidence.assignedObject.value;
    if (value) {
        if (!isFinite(value) || value.search(/\./) >= 0 || 
            value.search(regExpE) >= 0 || value < 0 || value > 100) {
            this.tree.setSelectedTreeNode(this.ClientSuggestionConfidence);
            return false;
        }
    }
    
    // ClientSuggestionAutoConfirming
    var regExpE = new RegExp("e", 'i');
    value = this.ClientSuggestionAutoConfirming.assignedObject.value;
    if (value) {
        if (!isFinite(value) || value.search(/\./) >= 0 || 
            value.search(regExpE) >= 0 || value < 0 || value > 100) {
            this.tree.setSelectedTreeNode(this.ClientSuggestionAutoConfirming);
            return false;
        }
    }
    
    // ClientFoldingOfAttributes - checkbox
    if (this.ClientFoldingOfAttributes.assignedObject.value) {
        this.ClientFoldingOfAttributes.assignedObject.value = "true";    
    }
    else {
        this.ClientFoldingOfAttributes.assignedObject.value = "false";
    }
    if (this.ClientFoldingOfAttributes.assignedObject.resizeDynamically) {
        this.ClientFoldingOfAttributes.assignedObject.resizeDynamically = "true";    
    }
    else {
        this.ClientFoldingOfAttributes.assignedObject.resizeDynamically = "false";
    }
    if (this.ClientFoldingOfAttributes.assignedObject.hideButton) {
        this.ClientFoldingOfAttributes.assignedObject.hideButton = "true";    
    }
    else {
        this.ClientFoldingOfAttributes.assignedObject.hideButton = "false";
    }
    if (this.ClientFoldingOfAttributes.assignedObject.nestedsValue) {
        this.ClientFoldingOfAttributes.assignedObject.nestedsValue = "true";    
    }
    else {
        this.ClientFoldingOfAttributes.assignedObject.nestedsValue = "false";
    }
    if (this.ClientFoldingOfAttributes.assignedObject.nestedsHideButton) {
        this.ClientFoldingOfAttributes.assignedObject.nestedsHideButton = "true";    
    }
    else {
        this.ClientFoldingOfAttributes.assignedObject.nestedsHideButton = "false";
    }    
    // ClientFoldingOfNestedsLevels - 1-5
    value = this.ClientFoldingOfAttributes.assignedObject.nestedsLevels;
    if (!value) {
        this.tree.setSelectedTreeNode(this.ClientFoldingOfAttributes);
        return false;
    }
    // ClientFoldingOfNestedsHideLevel - 1-5 + off
    value = this.ClientFoldingOfAttributes.assignedObject.nestedsHideLevel;
    if (!value) {
        this.tree.setSelectedTreeNode(this.ClientFoldingOfAttributes);
        return false;
    }
    
    // Server
    // -----------------------------------------
    
    // ServerLanguage - any string
    
    // Common
    // -----------------------------------------
    
    // DefaultUserGroup - any string
    value = this.DefaultUserGroup.assignedObject.value;
    if (!value) {
        this.tree.setSelectedTreeNode(this.DefaultUserGroup);
        return false;
    }
    
    // Unknown
    // -----------------------------------------
    
    var table = this.treeNodeUnknown.assignedObject.table;
    for (var i in table) {
        if (!table[i].name) {
            this.tree.setSelectedTreeNode(this.treeNodeUnknown);
            return false;
        }
        if (table[i].name.match(/^ClientAnnotationTypeColor:/) ||
            table[i].name == "ClientRefuseSuggestion" ||
            table[i].name == "ClientSuggestionConfidence" ||
            table[i].name == "ServerLanguage" ||
            table[i].name == "DefaultUserGroup" || 
            table[i].name == "ClientFoldingOfAttributes" ||
            table[i].name == "ClientAdvancedToolbarOptions" ||
            table[i].name == "ClientSuggestionAutoConfirming") {
            this.tree.setSelectedTreeNode(this.treeNodeUnknown);
            return false;
        }
    }
    
    return true;
}

// ---------------------------------------------------------------------- createSettings
/**
 * Create TreeNodes for known settings
 *
 * @name createSettings
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 */
AEd.ui.DlgSettings.prototype.createSettings = function() {
    
    // Client
    // -----------------------------------------
    
    // ClientAnnotationTypeColor
    this.ClientAnnotationTypeColor = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_clientAnnotationTypeColor"), id: "ClientAnnotationTypeColor", assignedObject:{type: "ClientAnnotationTypeColor", fieldset: "ClientAnnotationTypeColor", table: []} , context: this.domElementTreeWrapper.ownerDocument});
    this.treeNodeClient.addChild(this.ClientAnnotationTypeColor);
    // ClientAdvancedToolbarOptions
    this.ClientAdvancedToolbarOptions = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_clientAdvancedToolbarOptions"), id: "ClientAdvancedToolbarOptions", assignedObject:{name: "ClientAdvancedToolbarOptions", type: "ClientAdvancedToolbarOptions", fieldset: "ClientAdvancedToolbarOptions", value: "", resizeDynamically: false} , context: this.domElementTreeWrapper.ownerDocument});
    this.treeNodeClient.addChild(this.ClientAdvancedToolbarOptions);  
    // ClientFoldingOfAttributes
    this.ClientFoldingOfAttributes = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_clientFoldingOfAttributes"), id: "ClientFoldingOfAttributes", assignedObject:{name: "ClientFoldingOfAttributes", type: "ClientFoldingOfAttributes", fieldset: "ClientFoldingOfAttributes", value: "", resizeDynamically: false, hideButton: false, nestedsValue: false, nestedsHideButton: false, nestedsLevels: "", nestedsHideLevel: ""} , context: this.domElementTreeWrapper.ownerDocument});
    this.treeNodeClient.addChild(this.ClientFoldingOfAttributes);
    
    // ClientFoldingOfNestedsLevels
    while (this.domElementCheckboxClientFoldingOfNestedsLevelsValue.length > 0){
        this.domElementCheckboxClientFoldingOfNestedsLevelsValue.remove(this.domElementCheckboxClientFoldingOfNestedsLevelsValue.length - 1);
    }
    this.onCreateClientFoldingOfNestedsLevels.fire();
    // ClientFoldingOfNestedsHideLevel
    while (this.domElementCheckboxClientFoldingOfNestedsHideLevelValue.length > 0){
        this.domElementCheckboxClientFoldingOfNestedsHideLevelValue.remove(this.domElementCheckboxClientFoldingOfNestedsHideLevelValue.length - 1);
    }
    this.onCreateClientFoldingOfNestedsHideLevel.fire();
        
    // ClientSuggestionConfidence
    this.ClientSuggestionConfidence = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_clientSuggestionConfidence"), id: "ClientSuggestionConfidence", assignedObject:{name: "ClientSuggestionConfidence", type: "ClientSuggestionConfidence", fieldset: "ClientSuggestionConfidence", value: ""} , context: this.domElementTreeWrapper.ownerDocument});
    this.treeNodeClient.addChild(this.ClientSuggestionConfidence);
    // ClientSuggestionAutoConfirming
    this.ClientSuggestionAutoConfirming = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_clientSuggestionAutoConfirming"), id: "ClientSuggestionAutoConfirming", assignedObject:{name: "ClientSuggestionAutoConfirming", type: "ClientSuggestionAutoConfirming", fieldset: "ClientSuggestionAutoConfirming", value: ""} , context: this.domElementTreeWrapper.ownerDocument});
    this.treeNodeClient.addChild(this.ClientSuggestionAutoConfirming);
    // ClientRefuseSuggestion
    this.ClientRefuseSuggestion = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_clientRefuseSuggestion"), id: "ClientRefuseSuggestion", assignedObject:{name: "ClientRefuseSuggestion", type: "ClientRefuseSuggestion", fieldset: "ClientRefuseSuggestion", value: ""} , context: this.domElementTreeWrapper.ownerDocument});;
    this.treeNodeClient.addChild(this.ClientRefuseSuggestion);    
    
    // Server
    // -----------------------------------------
    
    // ServerLanguage
    this.ServerLanguage = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_serverLanguage"), id: "ServerLanguage", assignedObject:{name: "ServerLanguage", type: "ServerLanguage", fieldset: "ServerLanguage", value: ""} , context: this.domElementTreeWrapper.ownerDocument});
    this.treeNodeServer.addChild(this.ServerLanguage);

    // (Un)subscriptions
    // -----------------------------------------
    
    // Subscriptions
    this.Subscriptions = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_subscribtions_button_subscribe"), id: "Subscriptions", assignedObject:{name: "Subscriptions", type: "Subscriptions", fieldset: "Subscriptions", value: ""} , context: this.domElementTreeWrapper.ownerDocument});
    this.treeNodeUnsubscriptions.addChild(this.Subscriptions);

    // Unsubscriptions
    this.Unsubscriptions = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_subscribtions_button_unsubscribe"), id: "Unsubscriptions", assignedObject:{name: "Unsubscriptions", type: "Unsubscriptions", fieldset: "Unsubscriptions", value: ""} , context: this.domElementTreeWrapper.ownerDocument});
    this.treeNodeUnsubscriptions.addChild(this.Unsubscriptions);
    
    // Common
    // -----------------------------------------
    
    // DefaultUserGroup
    this.DefaultUserGroup = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_defaultUserGroup"), id: "DefaultUserGroup", assignedObject:{name: "DefaultUserGroup", type: "DefaultUserGroup", fieldset: "DefaultUserGroup", value: ""} , context: this.domElementTreeWrapper.ownerDocument});
    this.treeNodeCommon.addChild(this.DefaultUserGroup);
    while (this.domElementInputDefaultUserGroupValue.length > 0){
        this.domElementInputDefaultUserGroupValue.remove(this.domElementInputDefaultUserGroupValue.length - 1);
    }
    this.onCreateDefaultUserGroup.fire();
}

// ---------------------------------------------------------------------- reset
/**
 * Resets the settings dialog
 *
 * @name reset
 * @memberOf AEd.ui.DlgSettings 
 * @function   
 */
AEd.ui.DlgSettings.prototype.reset = function() {

    
    // tree
    this.elementTreeWrapper.setInnerHTML("");
    this.tree = new AEd.ui.core.UITree({context: this.domElementTreeWrapper.ownerDocument});             
    this.tree.render(this.domElementTreeWrapper);
                 
    this.treeNodeSettings = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_settings"), id: "Settings", assignedObject:{type: "Settings", fieldset: "Settings"}, context: this.domElementTreeWrapper.ownerDocument});
    this.tree.addChild(this.treeNodeSettings);
    this.tree.setSelectedTreeNode(this.treeNodeSettings);
    
    this.treeNodeClient = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_client"), id: "Client", assignedObject:{type: "Client", fieldset: "Client"}, context: this.domElementTreeWrapper.ownerDocument });
    this.treeNodeSettings.addChild(this.treeNodeClient);
    
    this.treeNodeServer = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_server"), id: "Server", assignedObject:{type: "Server", fieldset: "Server"}, context: this.domElementTreeWrapper.ownerDocument });
    this.treeNodeSettings.addChild(this.treeNodeServer);
    
    this.treeNodeCommon = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_common"), id: "Common", assignedObject:{type: "Common", fieldset: "Common"}, context: this.domElementTreeWrapper.ownerDocument });
    this.treeNodeSettings.addChild(this.treeNodeCommon);

    this.treeNodeUnsubscriptions = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_unsubscriptions"), id: "(Un)subscriptions", assignedObject:{type: "(Un)subscriptions", fieldset: "(Un)subscriptions", table: []}, context: this.domElementTreeWrapper.ownerDocument });
    this.treeNodeSettings.addChild(this.treeNodeUnsubscriptions);
    
    this.treeNodeUnknown = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_settings_node_unknown"), id: "Unknown", assignedObject:{type: "Unknown", fieldset: "Unknown", table: []}, context: this.domElementTreeWrapper.ownerDocument });
    this.treeNodeSettings.addChild(this.treeNodeUnknown);
    
    this.createSettings();
    
    this.tree.onNodeSelected.addHandler(this.onTreeNodeSelected, this);
    this.treeNodeSettings.collapse();
    this.treeNodeSettings.expand();
    this.treeNodeClient.collapse();
    this.treeNodeClient.expand();
    this.treeNodeServer.collapse();
    this.treeNodeServer.expand();
    this.treeNodeCommon.collapse();
    this.treeNodeCommon.expand();
    this.treeNodeUnsubscriptions.collapse();
    this.treeNodeUnsubscriptions.expand();

    this.setFieldset("Settings");
}  

// *****************************************************************************
// class AEd.ui.DlgSettings
// ***************************************************************************** 

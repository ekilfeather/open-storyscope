/**
 * DlgAnnotate.js
 *
 * Contains AEd.ui.DlgAnnotate class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgAnnotate
// *****************************************************************************  



/**
 * This class creates DlgAnnotate.
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
 * @name DlgAnnotate
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgAnnotate = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_annotate_title");
   c.width     = AEd.CONFIG.DLG_ANNOTATE_WIDTH;
   c.height    = AEd.CONFIG.DLG_ANNOTATE_HEIGHT;    
   c.resizable = true;
   c.autoInit = false;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);    
   
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_ANNOTATE);
   
   this.contentArea.loadFrom(AEd.CONFIG.DLG_ANNOTATE_PATH); 
   

   this.serverUri       = null;
   this.tree            = null;
   this.fieldset        = null;
   this.modeAnnotationLink = false;
   this.modeWholeDoc = false;
   this.modeEditAnnotation = false;
   this.modeEditSuggestion = false;
   this.modeEditSuggestionTmpId = null;
   this.annotationLinkURIs = new Array();   // Mutual linking loop prevention
   this.suggestionLinkTmpIds = new Array(); 

   // *************************************************************************
   // EVENTS
   // *************************************************************************  
   
   /**
    * Fires when key is up on aedType input element.
    * 
    * @event onInputTypeKeyUp                                                 
    */         
   this.onInputTypeKeyUp = new AEd.utils.Dispatcher();
   
   /**
    * Fires when Type is selected on aedType input element.
    * 
    * @event onInputTypeSelect                                                 
    */         
   this.onInputTypeSelect = new AEd.utils.Dispatcher();
   
   /**
    * Fires when modeAnnotationLink or modeWholeDoc is set to true
    * or selection is set.    
    * 
    * @event onNestedSet                                                 
    */ 
   this.onNestedSet = new AEd.utils.Dispatcher();
   
   /**
    * Fires when btnBrowse is clicked.
    * 
    * @event onBrowseTypes                                                 
    */         
   this.onBrowseTypes = new AEd.utils.Dispatcher();  
   
   /**
    * Fires when btnAddAttribute is clicked.   
    * 
    * @event onBrowseAttrTypesForAdd                                                 
    */         
   this.onBrowseAttrTypesForAdd = new AEd.utils.Dispatcher();          
   
   /**
    * Fires when btnDeleteAttribute is clicked.   
    * 
    * @event onDeleteAttribute                                                 
    */ 
   this.onDeleteAttribute = new AEd.utils.Dispatcher();
   
   /**
    * Fires when e is clicked.
    * 
    * @event onBrowseAttrTypesForEdit                                                 
    */         
   this.onBrowseAttrTypesForEdit = new AEd.utils.Dispatcher();      
   
   /**
    * Fires when btnNestedSelect is clicked.
    * 
    * @event onSelectAnnotationLink   
    * @param {Boolean} selected Is actual state of button selected?                                                 
    */         
   this.onSelectAnnotationLink = new AEd.utils.Dispatcher();      
   
   /**
    * Fires when required checkbox is check off.
    * 
    * @event onRequiredCheckOff                                                
    */
   this.onRequiredCheckOff = new AEd.utils.Dispatcher();
   
   /**
    * Fires when fieldset is updated.
    * 
    * @event onRequiredCheckOff                                                
    */
   this.onUpdateFieldset = new AEd.utils.Dispatcher();
   
    /**
    * Fires when linked annotation is loaded.
    * 
    * @event onSetAnnotationLink                                                
    */
   this.onSetAnnotationLink = new AEd.utils.Dispatcher();
   
    /**
    * Fires when new type is in simple type input.
    * 
    * @event onSimpleToNestedAttr                                                
    */
   this.onSimpleToNestedAttr = new AEd.utils.Dispatcher();
   
    /**
    * Fires when loading annotation contains empty nested annotation.
    * 
    * @event onLoadAnnotation                                                
    */
   this.onLoadAnnotation = new AEd.utils.Dispatcher();
   
   /**
    * Fires when nested list check attribute returns false.
    * 
    * @event onNestedListCheckAttribute                                                
    */
   this.onNestedListCheckAttribute = new AEd.utils.Dispatcher();
   
   /**
    * Fires when annotation link is removed from nested list.
    * 
    * @event onNestedAnnotationLinkRemove                                                
    */
   this.onNestedAnnotationLinkRemove = new AEd.utils.Dispatcher();
   
   /**
    * Fires when annotation link is loaded.
    * 
    * @event onLoadAnnotationLinkSetSelection                                                
    */
   this.onLoadAnnotationLinkSetSelection = new AEd.utils.Dispatcher();
   
   /**
    * Fires when annotation type is set.
    * 
    * @event onSetType                                                
    */
   this.onSetType = new AEd.utils.Dispatcher();
   
   /**
    * Fires when user types into entity name inputfield.
    * 
    * @event onEntityNameType
    */
   this.onEntityNameType = new AEd.utils.Dispatcher();

   /**
    * Fires when btnEntity is clicked.   
    * 
    * @event onAddEntityAttribute                                                 
    */         
   this.onAddEntityAttribute = new AEd.utils.Dispatcher();  

   /**
    * Fires when btnClearAttribute is clicked.   
    * 
    * @event onClearAttribute                                                 
    */         
   this.onClearAttribute = new AEd.utils.Dispatcher();  
   
   // ************************************************************************* 
   
   // Buttons
   this.btnClose    = new AEd.ui.core.UIButton({icon: "close"});    
   this.btnSave     = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_annotate_button_save"), toggle: false});
   this.btnCancel   = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_annotate_button_cancel"), toggle: false});      
   this.buttonsArea.addItem(this.btnSave);
   this.buttonsArea.addItem(this.btnCancel);
   this.headerButtonsArea.addItem(this.btnClose); 

   if (!AEd.isAppleSafari){  // Safari has problem with context (document namespace)
  
      this.suggestionsBar = new AEd.ui.SuggestionsBar({render: false});
      this.suggestionsBarSimple = new AEd.ui.SuggestionsBar({render: false});
      this.suggestionsBarGeoPoint = new AEd.ui.SuggestionsBar({render: false});
      this.suggestionsBarEntity = new AEd.ui.SuggestionsBar({render: false});
      this.suggestionsBarNested = new AEd.ui.SuggestionsBar({render: false});
      this.suggestionsBarEntityName = new AEd.ui.SuggestionsBar({render: false});
   
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
           this.iframeDocument       = this.iframe.contentWindow.document;
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnDragStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnDragIframeMove, this);
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnResizeStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnResizeIframeMove, this);  

           if (AEd.isAppleSafari){ // Safari support - context parameter

              this.suggestionsBar = new AEd.ui.SuggestionsBar({render: false, context: this.iframeDocument});
              this.suggestionsBarSimple = new AEd.ui.SuggestionsBar({render: false, context: this.iframeDocument});
              this.suggestionsBarGeoPoint = new AEd.ui.SuggestionsBar({render: false, context: this.iframeDocument});
              this.suggestionsBarEntity = new AEd.ui.SuggestionsBar({render: false, context: this.iframeDocument});
              this.suggestionsBarNested = new AEd.ui.SuggestionsBar({render: false, context: this.iframeDocument});
              this.suggestionsBarEntityName = new AEd.ui.SuggestionsBar({render: false, context: this.iframeDocument});

           }       

           // LEFT SIDE
           // -----------------------------------------------------------------
           var domElementBtnAddAttribute = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_BTN_ADD_ATTRIBUTE);
           var domElementBtnDeleteAttribute = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_BTN_DELETE_ATTRIBUTE); 
           var domElementBtnEntity = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_BTN_ENTITY);
           var domElementBtnClearAttribute = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_BTN_CLEAR_ATTRIBUTE);

          
           this.btnAddAttribute    = new AEd.ui.core.UIButton({srcElement: domElementBtnAddAttribute});
           this.btnDeleteAttribute = new AEd.ui.core.UIButton({srcElement: domElementBtnDeleteAttribute});  
           this.btnClearAttribute = new AEd.ui.core.UIButton({srcElement: domElementBtnClearAttribute});  
           this.btnEntity = new AEd.ui.core.UIButton({srcElement: domElementBtnEntity});    
                   
           this.domElementTreeWrapper = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_TREE_WRAPPER);
           this.elementTreeWrapper = AEd.$(this.domElementTreeWrapper);
           
           this.btnAddAttribute.onClick.addHandler(function() {
               if (!this.btnAddAttribute.isDisabled) {
                  this.onBrowseAttrTypesForAdd.fire();       
               }                   
           }, this);
            
           this.btnDeleteAttribute.onClick.addHandler(function() {
               if (!this.btnDeleteAttribute.isDisabled) {
                  this.onDeleteAttribute.fire();

                  if (Cal != undefined) {   // hides date and time picker
                     
                     closewin(Cal.Ctrl);
                  }

                  if (AEdlibsduration != '') { // hides duration picker

                     AEdlibsduration.hidePicker();
                  }       
               }                   
           }, this);

           this.btnClearAttribute.onClick.addHandler(function() {
               if (!this.btnClearAttribute.isDisabled) {
                  this.onClearAttribute.fire();       
               }                   
           }, this);

           this.btnEntity.onClick.addHandler(function() {
               if (!this.btnEntity.isDisabled) {
                  this.onAddEntityAttribute.fire();       
               }                   
           }, this);

           
           // RIGHT SIDE
           // Fieldset Annotation 
           // -----------------------------------------------------------------
           this.domElementAnnotationFieldset  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ANNOTATION_FIELDSET);  
           this.domElementInputSelection  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SELECTION);
           this.domElementInputType       = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_TYPE);
           this.domElementInputContent    = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_CONTENT);     
           this.domElementSuggestions     = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SUGGESTIONS);                          
           this.domElementBtnBrowse       = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_BTN_BROWSE);
           this.btnBrowse                 = new AEd.ui.core.UIButton({srcElement: this.domElementBtnBrowse});                
           this.domElementBtnWholeDoc     = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_BTN_WHOLE_DOC);
           this.btnWholeDoc               = new AEd.ui.core.UIButton({srcElement: this.domElementBtnWholeDoc, toggle: true});             
           
           this.elementAnnotationFieldset = AEd.$(this.domElementAnnotationFieldset);
           this.elementInputSelection     = AEd.$(this.domElementInputSelection);
           this.elementInputType          = AEd.$(this.domElementInputType);
           this.elementInputContent       = AEd.$(this.domElementInputContent);  
           this.elementSuggestions        = AEd.$(this.domElementSuggestions);          
           this.suggestionsBar.render(this.domElementSuggestions);           
           this.suggestionsBar.hide();
           
           AEd.Events.addHandler(this.iframeDocument, "click", function(e) {
               this.suggestionsBar.hide();
               this.suggestionsBarSimple.hide();
               this.suggestionsBarGeoPoint.hide();
               this.suggestionsBarEntity.hide();
               this.suggestionsBarNested.hide();
               
               var eTarget = (e.target) ? e.target : e.srcElement;
               if(eTarget.id != AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_NAME)
                   this.suggestionsBarEntityName.hide();
               else
                   this.suggestionsBarEntityName.show();
               
           },this);
           
           this.suggestionsBar.onClick.addHandler( function (item) {
               this.suggestionBarOnClick("Annotation", item); 
           }, this);
           
           this.elementInputType.addEventHandler("keydown", function(e) {
              this.elementInputTypeKeyDown("Annotation" , e);               
           }, this);     
           
           this.elementInputType.addEventHandler("keyup", function(e) {
               this.elementInputTypeKeyUp("Annotation", e);               
           }, this); 

           this.btnBrowse.onClick.addHandler(function() {
              if (!this.btnBrowse.isDisabled) {
                  this.onBrowseTypes.fire(); 
              }                            
           }, this); 
          
           this.btnWholeDoc.onClick.addHandler(function() {
              if (this.btnWholeDoc.isSelected) {
                  this.setAnnotateWholeDoc(true); 
              }
              else {
                  this.btnWholeDoc.setSelected(true);    
              }                          
           }, this);           
          
           // -----------------------------------------------------------------          
           // Fieldset Simple 
           // -----------------------------------------------------------------                      
           this.domElementSimpleFieldset    = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_FIELDSET);
           this.domElementSimpleInputType   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_TYPE);
           this.domElementSimpleInputValueLabel  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_VALUE_LABEL);
           this.domElementSimpleInputValue  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_VALUE);
           this.domElementSimpleTextareaValue  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_TEXT_VALUE);
           this.domElementSimpleBinaryValue  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_BINARY_VALUE);
           this.domElementSimpleTextareaValueLabel  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_TEXT_VALUE_LABEL);
           this.domElementSimpleBinaryValueLabel  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_BINARY_VALUE_LABEL);
           this.domElementSimpleSuggestions = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_SUGGESTIONS);  
           this.domElementSimpleBtnBrowse   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_BTN_BROWSE);
           this.domElementSimpleBtnBinaryBrowse   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_BTN_BINARY_BROWSE);
           this.domElementCheckboxAddToTypeAttrSimple  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_CHECKBOX_ADDTOTYPEATTR);
           this.domElementAddToTypeAttrSimpleSpan = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_ADDTOTYPEATTR_SPAN);
           this.domElementAddToTypeAttrWrapperSimple  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_ADDTOTYPEATTR_WRAPPER);     
           this.domElementCheckboxRequiredSimple = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_CHECKBOX_REQUIRED);
           this.domElementRequiredWrapperSimple = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_REQUIRED_WRAPPER);
           this.domElementSimpleBtnPicker = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_BTN_PICKER);
           this.domElementSimpleBtnDurationPicker = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_BTN_DURATION_PICKER);
           this.domElementSimpleBtnDownloadBinary = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_SIMPLE_BTN_DOWNLOAD_BINARY);
 
 
           this.durationPicker = new AEd.libs.durationPicker(10, 10, this.domElementSimpleInputValue, this.iframeDocument);          
           this.SimpleBtnPicker             = new AEd.ui.core.UIButton({srcElement: this.domElementSimpleBtnPicker}); 
           this.SimpleBtnDurationPicker     = new AEd.ui.core.UIButton({srcElement: this.domElementSimpleBtnDurationPicker}); 
           this.btnSimpleBrowse             = new AEd.ui.core.UIButton({srcElement: this.domElementSimpleBtnBrowse}); 
           this.btnSimpleBinaryBrowse       = new AEd.ui.core.UIButton({srcElement: this.domElementSimpleBtnBinaryBrowse});
           this.btnSimpleDownloadBinary     = new AEd.ui.core.UIButton({srcElement: this.domElementSimpleBtnDownloadBinary});             
           this.elementSimpleFieldset       = AEd.$(this.domElementSimpleFieldset);
           this.elementSimpleInputType      = AEd.$(this.domElementSimpleInputType);
           this.elementSimpleInputValueLabel     = AEd.$(this.domElementSimpleInputValueLabel); 
           this.elementSimpleTextareaValueLabel = AEd.$(this.domElementSimpleTextareaValueLabel); 
           this.elementSimpleBinaryValueLabel = AEd.$(this.domElementSimpleBinaryValueLabel); 
           this.elementSimpleInputValue     = AEd.$(this.domElementSimpleInputValue); 
           this.elementSimpleTextareaValue = AEd.$(this.domElementSimpleTextareaValue); 
           this.elementSimpleBinaryValue = AEd.$(this.domElementSimpleBinaryValue); 
           this.elementSimpleSuggestions     = AEd.$(this.domElementSimpleSuggestions);
           this.elementCheckboxAddToTypeAttrSimple  = AEd.$(this.domElementCheckboxAddToTypeAttrSimple);
           this.elementAddToTypeAttrSimpleSpan = AEd.$(this.domElementAddToTypeAttrSimpleSpan);
           this.elementAddToTypeAttrWrapperSimple  = AEd.$(this.domElementAddToTypeAttrWrapperSimple);
           this.elementCheckboxRequiredSimple = AEd.$(this.domElementCheckboxRequiredSimple);
           this.elementRequiredWrapperSimple = AEd.$(this.domElementRequiredWrapperSimple); 
           this.suggestionsBarSimple.render(this.elementSimpleSuggestions);           
           this.suggestionsBarSimple.hide();   
           this.durationPicker.createPicker();
           this.durationPicker.hidePicker();

           this.base64 = new AEd.libs.base64d_encoder();
           this.base64.setInput(this.domElementSimpleInputValue);


           AEd.Events.addHandler(this.domElementCheckboxAddToTypeAttrSimple, "click", function(e) {
             if (this.domElementCheckboxAddToTypeAttrSimple.checked) {
                  this.elementRequiredWrapperSimple.show();
                  this.domElementCheckboxRequiredSimple.disabled = false;
              }
              else {
                  this.domElementCheckboxRequiredSimple.disabled = true;
                  this.domElementCheckboxRequiredSimple.checked = false;
                  this.elementRequiredWrapperSimple.hide();
              }
           }, this);
           
           AEd.Events.addHandler(this.domElementCheckboxRequiredSimple, "click", function(e) {
             if (!this.domElementCheckboxRequiredSimple.checked && this.domElementCheckboxAddToTypeAttrSimple.checked) {
                  this.onRequiredCheckOff.fire("Simple");
              }
           }, this);
          
           this.suggestionsBarSimple.onClick.addHandler( function (item) {
               this.suggestionBarOnClick("Simple", item);
           }, this);
           
           this.elementSimpleInputType.addEventHandler("keydown", function(e) {
               this.elementInputTypeKeyDown("Simple" , e);              
           }, this);     
           
           this.elementSimpleInputType.addEventHandler("keyup", function(e) {
               this.elementInputTypeKeyUp("Simple", e);              
           }, this);

           this.elementSimpleBinaryValue.addEventHandler("change", function(e) {
                 
              this.base64.setInput(this.domElementSimpleInputValue);
              this.base64.encode(this.domElementSimpleBinaryValue.files[0]);              
              this.domElementSimpleInputValue.value = this.domElementSimpleBinaryValue.value;
               
              // Opera support
              
              if (window.opera){

                this.domElementSimpleBinaryValue.style.display='none';
                this.domElementSimpleBinaryValue.style.visibility='hidden';
              }
  
           }, this);
           
         
           this.btnSimpleBrowse.onClick.addHandler(function() {
              if (!this.btnSimpleBrowse.isDisabled) {
                  this.onBrowseAttrTypesForEdit.fire();
              }                            
           }, this);

           this.btnSimpleBinaryBrowse.onClick.addHandler(function() {
              
              // Opera support
              
              if (window.opera){

                this.domElementSimpleBinaryValue.style.display='inline';
                this.domElementSimpleBinaryValue.style.visibility='hidden';
              }

              this.domElementSimpleBinaryValue.click();                              
           }, this);

           this.btnSimpleDownloadBinary.onClick.addHandler(function() {

              this.base64.setEncodedData(this.domElementSimpleInputValue.value);
              this.base64.download(); 
           }, this);

                            
           // -----------------------------------------------------------------          
           // fieldset Geo Point
           // ----------------------------------------------------------------- 
           this.domElementGeoPointFieldset   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_GEOPOINT_FIELDSET);
           this.domElementGeoPointInputType  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_GEOPOINT_TYPE);
           this.domElementGeoPointInputLat   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_GEOPOINT_LAT);           
           this.domElementGeoPointInputLong  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_GEOPOINT_LONG); 
           this.domElementGeoPointSuggestions= this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_GEOPOINT_SUGGESTIONS);  
           this.domElementGeoPointBtnBrowse  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_GEOPOINT_BTN_BROWSE);
           this.domElementCheckboxAddToTypeAttrGeoPoint  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_GEOPOINT_CHECKBOX_ADDTOTYPEATTR);    
           this.domElementAddToTypeAttrGeoPointSpan = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_GEOPOINT_ADDTOTYPEATTR_SPAN);
           this.domElementAddToTypeAttrWrapperGeoPoint  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_GEOPOINT_ADDTOTYPEATTR_WRAPPER);
           this.domElementCheckboxRequiredGeoPoint = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_GEOPOINT_CHECKBOX_REQUIRED);
           this.domElementRequiredWrapperGeoPoint = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_GEOPOINT_REQUIRED_WRAPPER);
           this.btnGeoPointBrowse            = new AEd.ui.core.UIButton({srcElement: this.domElementGeoPointBtnBrowse});            
           this.elementGeoPointFieldset      = AEd.$(this.domElementGeoPointFieldset);
           this.elementGeoPointInputType     = AEd.$(this.domElementGeoPointInputType);
           this.elementGeoPointInputLat      = AEd.$(this.domElementGeoPointInputLat);
           this.elementGeoPointInputLong     = AEd.$(this.domElementGeoPointInputLong);
           this.elementGeoPointSuggestions   = AEd.$(this.domElementGeoPointSuggestions);
           this.elementCheckboxAddToTypeAttrGeoPoint  = AEd.$(this.domElementCheckboxAddToTypeAttrGeoPoint);
           this.elementAddToTypeAttrGeoPointSpan = AEd.$(this.domElementAddToTypeAttrGeoPointSpan);
           this.elementAddToTypeAttrWrapperGeoPoint  = AEd.$(this.domElementAddToTypeAttrWrapperGeoPoint);
           this.elementCheckboxRequiredGeoPoint = AEd.$(this.domElementCheckboxRequiredGeoPoint);
           this.elementRequiredWrapperGeoPoint = AEd.$(this.domElementRequiredWrapperGeoPoint);
           this.suggestionsBarGeoPoint.render(this.elementGeoPointSuggestions);           
           this.suggestionsBarGeoPoint.hide();   
          
           AEd.Events.addHandler(this.domElementCheckboxAddToTypeAttrGeoPoint, "click", function(e) {
             if (this.domElementCheckboxAddToTypeAttrGeoPoint.checked) {
                  this.elementRequiredWrapperGeoPoint.show();
                  this.domElementCheckboxRequiredGeoPoint.disabled = false;
              }
              else {
                  this.domElementCheckboxRequiredGeoPoint.disabled = true;
                  this.domElementCheckboxRequiredGeoPoint.checked = false;
                  this.elementRequiredWrapperGeoPoint.hide();
              }
           }, this);
          
           AEd.Events.addHandler(this.domElementCheckboxRequiredGeoPoint, "click", function(e) {
             if (!this.domElementCheckboxRequiredGeoPoint.checked && this.domElementCheckboxAddToTypeAttrGeoPoint.checked) {
                  this.onRequiredCheckOff.fire("GeoPoint");
              }
           }, this);
          
           this.suggestionsBarGeoPoint.onClick.addHandler( function (item) {
               this.suggestionBarOnClick("GeoPoint", item); 
           }, this);
           
           this.elementGeoPointInputType.addEventHandler("keydown", function(e) {
              this.elementInputTypeKeyDown("GeoPoint" , e);              
           }, this);     
           
           this.elementGeoPointInputType.addEventHandler("keyup", function(e) {
               this.elementInputTypeKeyUp("GeoPoint", e);              
           }, this);
          
           this.btnGeoPointBrowse.onClick.addHandler(function() {
              if (!this.btnGeoPointBrowse.isDisabled) {
                  this.onBrowseAttrTypesForEdit.fire();
              }                            
           }, this);
          
           // -----------------------------------------------------------------          
           // fieldset Entity
           // ----------------------------------------------------------------- 
           this.domElementEntityFieldset   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_FIELDSET);
           this.domElementEntityInputType  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_TYPE);

           this.domElementEntityInputName  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_NAME); 
           this.domElementEntitySuggestions= this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_SUGGESTIONS);  
           this.domElementEntityNameSuggestions= this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_NAME_SUGGESTIONS);  
           this.domElementEntityBtnBrowse  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_BTN_BROWSE);
           this.domElementEntityDescription  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_DESCRIPTION);
           this.domElementEntityImage  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_IMAGE);
           this.domElementCheckboxAddToTypeAttrEntity  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_CHECKBOX_ADDTOTYPEATTR);    
           this.domElementAddToTypeAttrEntitySpan = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_ADDTOTYPEATTR_SPAN);
           this.domElementAddToTypeAttrWrapperEntity  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_ADDTOTYPEATTR_WRAPPER);
           this.domElementCheckboxRequiredEntity = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_CHECKBOX_REQUIRED);
           this.domElementRequiredWrapperEntity = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_REQUIRED_WRAPPER);
           this.btnEntityBrowse            = new AEd.ui.core.UIButton({srcElement: this.domElementEntityBtnBrowse});        
          
           this.elementEntityFieldset      = AEd.$(this.domElementEntityFieldset);
           this.elementEntityInputType     = AEd.$(this.domElementEntityInputType);
           this.elementEntityInputName     = AEd.$(this.domElementEntityInputName);
           this.elementEntityDescription     = AEd.$(this.domElementEntityDescription);
           this.elementEntityImage     = AEd.$(this.domElementEntityImage);
           this.elementEntitySuggestions   = AEd.$(this.domElementEntitySuggestions);
           this.elementEntityNameSuggestions   = AEd.$(this.domElementEntityNameSuggestions);
           this.elementCheckboxAddToTypeAttrEntity  = AEd.$(this.domElementCheckboxAddToTypeAttrEntity);
           this.elementAddToTypeAttrEntitySpan = AEd.$(this.domElementAddToTypeAttrEntitySpan);
           this.elementAddToTypeAttrWrapperEntity  = AEd.$(this.domElementAddToTypeAttrWrapperEntity);
           this.elementCheckboxRequiredEntity = AEd.$(this.domElementCheckboxRequiredEntity);
           this.elementRequiredWrapperEntity = AEd.$(this.domElementRequiredWrapperEntity);
          
          
           this.suggestionsBarEntity.render(this.elementEntitySuggestions);           
           this.suggestionsBarEntity.hide();   

           this.suggestionsBarEntityName.render(this.elementEntityNameSuggestions);           
           this.suggestionsBarEntityName.hide();  
          
           AEd.Events.addHandler(this.domElementCheckboxAddToTypeAttrEntity, "click", function(e) {
             if (this.domElementCheckboxAddToTypeAttrEntity.checked) {
                  this.elementRequiredWrapperEntity.show();
                  this.domElementCheckboxRequiredEntity.disabled = false;
              }
              else {
                  this.domElementCheckboxRequiredEntity.disabled = true;
                  this.domElementCheckboxRequiredEntity.checked = false;
                  this.elementRequiredWrapperEntity.hide();
              }
           }, this);
          
           AEd.Events.addHandler(this.domElementCheckboxRequiredEntity, "click", function(e) {
             if (!this.domElementCheckboxRequiredEntity.checked && this.domElementCheckboxAddToTypeAttrEntity.checked) {
                  this.onRequiredCheckOff.fire("Entity");
              }
           }, this);
          
           this.suggestionsBarEntity.onClick.addHandler( function (item) {
               this.suggestionBarOnClick("Entity", item); 
           }, this);

           this.elementEntityInputType.addEventHandler("keydown", function(e) {
              this.elementInputTypeKeyDown("Entity" , e);              
           }, this);     
           
           this.elementEntityInputType.addEventHandler("keyup", function(e) {
               this.elementInputTypeKeyUp("Entity", e);              
           }, this);
          
           this.btnEntityBrowse.onClick.addHandler(function() {
              if (!this.btnEntityBrowse.isDisabled) {
                  this.onBrowseAttrTypesForEdit.fire();
              }                            
           }, this);
          
          
           /**
            * the function sets the dialog when an item from entity name autocompleter is selected
            */
           var selectItem = function()
           {
             var selectedItem = this.suggestionsBarEntityName.selectedItem;
             if(selectedItem)
             {
                var selNode = this.tree.getSelectedTreeNode().assignedObject;
                
                //update the dialog
                this.setEntityName(selectedItem.name);
                this.suggestionsBarEntityName.hide();
                this.setEntityDescription(selectedItem.description);
                this.setEntityImage(selectedItem.visualRepresentation);
                
                //create a new type
                var typeName = this.getEntityType();
                var type = {
                    name: typeName,
                    path: typeName,
                    simpleType: true
                }

                //set some properties
                selNode.entityDescription = selectedItem.description;
                selNode.entityImage = selectedItem.visualRepresentation;
                selNode.entityURI = selectedItem.uri;
                selNode.entityType = selectedItem.type;
                selNode.entityIsSelected = true;
                
                this.setEntityImage(selNode.entityImage);
                this.setEntityDescription(selNode.entityDescription);
                
                //update the attribute
                this.updateAttribute(selNode.name, type, selNode.addToTypeAttr, selNode.required);
             }
           }
          
           /**
             * The following two handlers are executed when user types into entity name inputfield.
            */
           this.elementEntityInputName.addEventHandler("keydown", function(e)
           {
             //show autocompleter suggestions
             this.suggestionsBarEntityName.show();
        
             var event = AEd.Events.getEvent(e);
             var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
            
             if(code == 40) // down arrow
             {
                this.suggestionsBarEntityName.selectNextItem();
                this.suggestionsBarEntityName.show();
             }
             else if(code == 38) // up arrow
                this.suggestionsBarEntityName.selectPreviousItem();

           }, this);
          
        
           //entity name that user typed into the field before hitting next key
           this.lastEntityName = "";

           this.elementEntityInputName.addEventHandler("keyup", function(e)
           {
             var event = AEd.Events.getEvent(e); 
             var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);

             var selNode = this.tree.getSelectedTreeNode().assignedObject;
                
             if(this.getEntityName().toLowerCase() != this.lastEntityName)
             {
                this.onEntityNameType.fire(e);
                
                //entity name modified -- no entity is selected any more
                selNode.entityDescription = "";
                selNode.entityImage = "";
                selNode.entityType = "";
                selNode.entityURI = "";
                selNode.entityIsSelected = false;
                this.setEntityImage("");
                this.setEntityDescription("");
             }
            
             //user selects an entity from the autocompleter
             if(code == 13)
                selectItem.call(this);
           }, this);
        
           this.suggestionsBarEntityName.onClick.addHandler(function(e)
           {
             selectItem.call(this);
           }, this);
        
           this.elementEntityInputName.addEventHandler("click", function(e)
           {
             this.onEntityNameType.fire(e);
             this.suggestionsBarEntityName.show();
           }, this);
        



           
                   
           // -----------------------------------------------------------------          
           // fieldset Nested Annotation  
           // ----------------------------------------------------------------- 
           this.domElementNestedFieldset   = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_FIELDSET);
           this.domElementNestedInputType  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_TYPE);
           this.domElementNestedInputSelection = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_SELECTION);
           this.domElementNestedInputContentWrapper = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_CONTENT_WRAPPER);
           this.domElementNestedInputContent = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_CONTENT);  
           this.domElementNestedSuggestions = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_SUGGESTIONS);  
           this.domElementNestedBtnBrowse  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_BTN_BROWSE);
           this.domElementCheckboxAddToTypeAttrNested  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_CHECKBOX_ADDTOTYPEATTR);    
           this.domElementAddToTypeAttrNestedSpan = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_ADDTOTYPEATTR_SPAN);
           this.domElementAddToTypeAttrWrapperNested  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_ADDTOTYPEATTR_WRAPPER);
           this.domElementCheckboxRequiredNested = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_CHECKBOX_REQUIRED);
           this.domElementRequiredWrapperNested = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_REQUIRED_WRAPPER);
           this.btnNestedBrowse            = new AEd.ui.core.UIButton({srcElement: this.domElementNestedBtnBrowse}); 
           this.domElementNestedBtnSelect  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_BTN_SELECT);
           this.btnNestedSelect            = new AEd.ui.core.UIButton({srcElement: this.domElementNestedBtnSelect, toggle: true});            
           this.domElementNestedBtnWholeDoc  = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_BTN_WHOLE_DOC);
           this.btnNestedWholeDoc            = new AEd.ui.core.UIButton({srcElement: this.domElementNestedBtnWholeDoc, toggle: true});
           this.domElementNestedBtnPrevious = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_BTN_PREVIOUS);
           this.btnNestedPrevious            = new AEd.ui.core.UIButton({srcElement: this.domElementNestedBtnPrevious});
           this.domElementNestedBtnNext    = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_BTN_NEXT);
           this.btnNestedNext               = new AEd.ui.core.UIButton({srcElement: this.domElementNestedBtnNext}); 
           this.domElementNestedBtnAdd    = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_BTN_ADD);
           this.btnNestedAdd               = new AEd.ui.core.UIButton({srcElement: this.domElementNestedBtnAdd}); 
           this.domElementNestedBtnDelete = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_BTN_DELETE);
           this.btnNestedDelete            = new AEd.ui.core.UIButton({srcElement: this.domElementNestedBtnDelete});
           this.domElementListNested      = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_NESTED_LIST);
           this.elementListNested          = AEd.$(this.domElementListNested);   
           this.elementNestedFieldset        = AEd.$(this.domElementNestedFieldset);
           this.elementNestedInputType       = AEd.$(this.domElementNestedInputType);
           this.elementNestedInputSelection  = AEd.$(this.domElementNestedInputSelection);
           this.elementNestedInputContentWrapper = AEd.$(this.domElementNestedInputContentWrapper);
           this.elementNestedInputContent    = AEd.$(this.domElementNestedInputContent);
           this.elementNestedSuggestions     = AEd.$(this.domElementNestedSuggestions);
           this.elementCheckboxAddToTypeAttrNested  = AEd.$(this.domElementCheckboxAddToTypeAttrNested);
           this.elementAddToTypeAttrNestedSpan = AEd.$(this.domElementAddToTypeAttrNestedSpan);
           this.elementAddToTypeAttrWrapperNested  = AEd.$(this.domElementAddToTypeAttrWrapperNested);
           this.elementCheckboxRequiredNested = AEd.$(this.domElementCheckboxRequiredNested);
           this.elementRequiredWrapperNested = AEd.$(this.domElementRequiredWrapperNested);
           this.suggestionsBarNested.render(this.elementNestedSuggestions);           
           this.suggestionsBarNested.hide();
          
           this.btnNestedPrevious.onClick.addHandler(function() {
              if (!this.btnNestedPrevious.isDisabled) {
                var node = this.tree.getSelectedTreeNode().assignedObject;
                if (node.listPosition >= 1) {
                    this.storeAttribute(this.tree.getSelectedTreeNode());
                    // ---------- load item
                    node.listPosition--;
                    node.annotationLink = node.list[node.listPosition].annotationLink;
                    node.selectionObject = node.list[node.listPosition].selectionObject;
                    node.selection = node.list[node.listPosition].selection;
                    node.wholeDoc = node.list[node.listPosition].wholeDoc;
                    this.updateFieldset(this.tree.getSelectedTreeNode());
                    // ----------
                    this.nestedListButtonsController(node);
                }   
              }                            
           }, this);
          
           this.btnNestedNext.onClick.addHandler(function() {
              if (!this.btnNestedNext.isDisabled) {
                var node = this.tree.getSelectedTreeNode().assignedObject;
                if (node.listPosition < node.list.length - 1) {
                    this.storeAttribute(this.tree.getSelectedTreeNode());
                    // ---------- load item
                    node.listPosition++;
                    node.annotationLink = node.list[node.listPosition].annotationLink;
                    node.selectionObject = node.list[node.listPosition].selectionObject;
                    node.selection = node.list[node.listPosition].selection;
                    node.wholeDoc = node.list[node.listPosition].wholeDoc;
                    this.updateFieldset(this.tree.getSelectedTreeNode());
                    // ----------
                    this.nestedListButtonsController(node);
                }   
              }                            
           }, this);
          
           this.btnNestedAdd.onClick.addHandler(function() {
              if (!this.btnNestedAdd.isDisabled) {
                var node = this.tree.getSelectedTreeNode().assignedObject;
                this.storeAttribute(this.tree.getSelectedTreeNode());
                // ---------- load item
                node.list.push({
                    annotationLink: null,
                    selectionObject: null,
                    selection: AEd.I18n.t("Dlg_annotate_selection_nothing"),
                    wholeDoc: false    
                });
                node.listPosition = node.list.length - 1;
                node.annotationLink = null;
                node.selectionObject = null;
                node.selection = AEd.I18n.t("Dlg_annotate_selection_nothing");
                node.wholeDoc = false;
                this.updateFieldset(this.tree.getSelectedTreeNode());
                // ----------                   
                this.nestedListButtonsController(node);
              }                            
           }, this);
          
           this.btnNestedDelete.onClick.addHandler(function() {
              if (!this.btnNestedDelete.isDisabled) {
                var node = this.tree.getSelectedTreeNode().assignedObject;
                var removeLast = false;
                if (node.listPosition == node.list.length - 1) { // remove last
                    removeLast = true;
                }
                node.list.splice(node.listPosition, 1); // remove item from list
                // ---------- load item
                if (removeLast) { // removed last
                    node.listPosition--;    
                }
                node.annotationLink = node.list[node.listPosition].annotationLink;
                node.selectionObject = node.list[node.listPosition].selectionObject;
                node.selection = node.list[node.listPosition].selection;
                node.wholeDoc = node.list[node.listPosition].wholeDoc;
                this.updateFieldset(this.tree.getSelectedTreeNode());
                // ----------
                this.nestedListButtonsController(node);
                
                // ---------- load annotation link attributes and content if only one
                var linkCount = 0;
                var linkPosition = -1;
                for (var i in node.list) {
                    if (node.list[i].annotationLink) {
                        linkCount++;
                        linkPosition = i;
                    }    
                }
                if (linkCount == 1) {
                    // load attributes and show content
                    this.onNestedAnnotationLinkRemove.fire(node, linkPosition);
                    this.elementNestedInputContentWrapper.show(); 
                }
                // ----------  
              }                            
           }, this);
          
           AEd.Events.addHandler(this.domElementCheckboxAddToTypeAttrNested, "click", function(e) {
             if (this.domElementCheckboxAddToTypeAttrNested.checked) {
                  this.elementRequiredWrapperNested.show();
                  this.domElementCheckboxRequiredNested.disabled = false;
              }
              else {
                  this.domElementCheckboxRequiredNested.disabled = true;
                  this.domElementCheckboxRequiredNested.checked = false;
                  this.elementRequiredWrapperNested.hide();
              }
           }, this);           
          
           AEd.Events.addHandler(this.domElementCheckboxRequiredNested, "click", function(e) {
             if (!this.domElementCheckboxRequiredNested.checked && this.domElementCheckboxAddToTypeAttrNested.checked) {
                  this.onRequiredCheckOff.fire("Nested");
              }
           }, this);
          
           this.suggestionsBarNested.onClick.addHandler( function (item) {
               this.suggestionBarOnClick("NestedAnnotation", item);
           }, this);
          
           this.elementNestedInputType.addEventHandler("keydown", function(e) {
               this.elementInputTypeKeyDown("NestedAnnotation" , e);              
           }, this);
                
           this.elementNestedInputType.addEventHandler("keyup", function(e) {
               this.elementInputTypeKeyUp("NestedAnnotation", e);              
           }, this);
          
           this.btnNestedBrowse.onClick.addHandler(function() {
              if (!this.btnNestedBrowse.isDisabled) {
                  this.onBrowseAttrTypesForEdit.fire();
              }                            
           }, this);     
         
           /**
            * Adds a handler that is executed by clicking on Select button in link annotation edit dialog.
            */
           this.btnNestedSelect.onClick.addHandler(function() {
             //if the Select button is disabled its handler is disabled too
             if (!this.btnNestedSelect.isDisabled) {
                //select button clicked
                if (this.btnNestedSelect.isSelected) {
                    //the annotation's attribute has to be of type annotationLink
                    if (this.nestedListCheckAttribute("annotationLink")) {
                        //Removes all attributes from linked annotation
                        this.removeAttrsFromLinkedAnnotation(this.tree.getSelectedTreeNode());
                        //Unset annotating the whole document
                        this.setAnnotateWholeDoc(false);
                        //current mode is "selecting annotation link"
                        this.modeAnnotationLink = true;
                        //fires an event: selecting annotation link
                        this.onSelectAnnotationLink.fire(true, this.getNestedType());
                        
                        //if Select button is not clicked
                        if (!this.btnNestedSelect.isSelected) {
                            //current mode isn't selecting annotation link
                            this.modeAnnotationLink = false;
                            //fires an event: selecting annotation link
                            this.onSelectAnnotationLink.fire(false);
                        }
                        
                        var node = this.tree.getSelectedTreeNode();

                        this.domElementNestedInputSelection.style.color = AEd.CONFIG.DEFAULT_WARNING_COLOR;
                        
                        node.assignedObject.selection = AEd.I18n.t("Dlg_annotate_selection_nothing"); 
                        
                        //updates the fieldset
                        this.updateFieldset(node);
                        //disable Add button in attributes section of edit ennotation dialog
                        this.btnAddAttribute.setDisabled(true);
                        this.btnEntity.setDisabled(true);
                        
                        this.domElementNestedInputContent.disabled = true;
                        
                        var node = this.tree.getSelectedTreeNode();

                        //stores attribute
                        this.storeAttribute(node);
                    } 
                }
                
                //select button not clicked
                else {
                    this.modeAnnotationLink = false;
                    this.onSelectAnnotationLink.fire(false);
                    
                    var node = this.tree.getSelectedTreeNode();
                    this.storeAttribute(node);
                    var treeNode = node.assignedObject;
                    
                    var isLink = false;
                    var linkCount = 0;
                    var linkPosition = -1;
                    for (var i in treeNode.list) {
                        if (treeNode.list[i].annotationLink) {
                            isLink = true;
                            linkCount++;
                            linkPosition = i;
                            break;    
                        }
                    }
                    if (!isLink) {
                        this.btnAddAttribute.setDisabled(false);
                        this.btnEntity.setDisabled(false);
                        this.domElementNestedInputContent.disabled = false;
                        this.elementNestedInputContentWrapper.show();
                    }
                    if (linkCount == 1) {
                        // load attributes and show content
                        this.onNestedAnnotationLinkRemove.fire(treeNode, linkPosition);
                        this.elementNestedInputContentWrapper.show(); 
                    }
                }
             }                            
           }, this);           
         
           this.btnNestedWholeDoc.onClick.addHandler(function() {
             if (!this.btnNestedWholeDoc.isDisabled) {
                if (this.btnNestedWholeDoc.isSelected) {
                    if (this.nestedListCheckAttribute("nestedAnnotation")) {
                        this.removeAttrsFromLinkedAnnotation(this.tree.getSelectedTreeNode());
                        this.setAnnotateWholeDoc(true);
                        this.onNestedSet.fire();
                        this.domElementNestedInputSelection.style.color = null;
                    } 
                }
                else {
                    this.btnNestedWholeDoc.setSelected(true); 
                }
             }                           
           }, this);
          
           // ----------------------------------------------------------------- 
           this.reset();

           // Add File API workaround
           if (this.iframe.contentWindow.missingFileAPI)
              this.iframe.contentWindow.AfterLoad(this);
       }, this);

   },this );  
}



AEd.ui.DlgAnnotate.prototype.constructor = AEd.ui.DlgAnnotate;

AEd.inheritFromPrototype(AEd.ui.DlgAnnotate, AEd.ui.core.UIDialog);



// --------------------------------------------------------------- getSelection
/**
 * Gets value of "aedSelection" input in annotate dialog.
 *
 * @name getSelection
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of aedSelection textfield.
 */

AEd.ui.DlgAnnotate.prototype.getSelection = function() {
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
 * Sets value of "aedSelection" input in annotate dialog.
 *
 * @name setSelection
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of aedSelection textfield.  
 */

AEd.ui.DlgAnnotate.prototype.setSelection = function(newValue) {
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
 * Gets value of "aedType" input in annotate dialog.
 *
 * @name getType
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of aedType input.
 */

AEd.ui.DlgAnnotate.prototype.getType = function() {
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
 * Sets value of "aedType" input in annotate dialog.
 *
 * @name setType
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of aedType input.  
 */
AEd.ui.DlgAnnotate.prototype.setType = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputType) {
            this.domElementInputType.value = newValue;
            this.onSetType.fire(newValue);
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setType(newValue);
        }, this);     
    }
}



// ----------------------------------------------------------------- getContent
/**
 * Gets value of "aedContent" input in annotate dialog.
 *
 * @name getContent
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of aedContent input.
 */
AEd.ui.DlgAnnotate.prototype.getContent = function() {
    if (this.contentLoaded) {
        if (this.domElementInputContent) {
            return this.domElementInputContent.value;  
        }
        else {
            return null;
        }
    }
}

// ----------------------------------------------------------------- setContent
/**
 * Sets value of "aedContent" input in annotate dialog.
 *
 * @name setContent
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of aedContent input.  
 */
AEd.ui.DlgAnnotate.prototype.setContent = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputContent) {
            this.domElementInputContent.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setContent(newValue);
        }, this);     
    }
}



// --------------------------------------------------------------- setSimpleType
/**
 * Sets value of input in annotate dialog.
 *
 * @name setSimpleType
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAnnotate.prototype.setSimpleType = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementSimpleInputType) {
            this.domElementSimpleInputType.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setSimpleType(newValue);
        }, this);     
    }
}



// -------------------------------------------------------------- getSimpleType
/**
 * Gets value of input in annotate dialog.
 *
 * @name getSimpleType
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.getSimpleType = function() {
    if (this.contentLoaded) {
        if (this.domElementSimpleInputType) {
            return this.domElementSimpleInputType.value;  
        }
        else {
            return null;
        }
    }
}



// ------------------------------------------------------------- setSimpleValue
/**
 * Sets value of input in annotate dialog.
 *
 * @name setSimpleValue
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAnnotate.prototype.setSimpleValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementSimpleInputValue) {
            this.domElementSimpleInputValue.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setSimpleValue(newValue);
        }, this);     
    }
}

// ------------------------------------------------------------- setSimpleTextareaValue
/**
 * Sets value of textarea in annotate dialog.
 *
 * @name setSimpleTextareaValue
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of textarea.  
 */
AEd.ui.DlgAnnotate.prototype.setSimpleTextareaValue = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementSimpleTextareaValue) {
            this.domElementSimpleTextareaValue.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setSimpleTextareaValue(newValue);
        }, this);     
    }
}

// ------------------------------------------------------------- getSimpleValue
/**
 * Gets value of input in annotate dialog.
 *
 * @name getSimpleValue
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.getSimpleValue = function() {
    if (this.contentLoaded) {
        if (this.domElementSimpleInputValue) {
            return this.domElementSimpleInputValue.value;  
        }
        else {
            return null;
        }
    }
}

// ------------------------------------------------------------- getSimpleTextareaValue
/**
 * Gets value of textarea in annotate dialog.
 *
 * @name getSimpleTextareaValue
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of textarea.
 */
AEd.ui.DlgAnnotate.prototype.getSimpleTextareaValue = function() {
    if (this.contentLoaded) {
        if (this.domElementSimpleTextareaValue) {
            return this.domElementSimpleTextareaValue.value;  
        }
        else {
            return null;
        }
    }
}



// ----------------------------------------------------- isSimpleAddToTypeAttrChecked
/**
 * Gets value of input in types dialog.
 *
 * @name isSimpleAddToTypeAttrChecked
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.isSimpleAddToTypeAttrChecked = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxAddToTypeAttrSimple) {
            return this.domElementCheckboxAddToTypeAttrSimple.checked;  
        }
        else {
            return null;
        }
    }
}



// ---------------------------------------------------------- isSimpleRequiredChecked
/**
 * Gets value of input in types dialog.
 *
 * @name isSimpleRequiredChecked
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.isSimpleRequiredChecked = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxRequiredSimple) {
            return this.domElementCheckboxRequiredSimple.checked;  
        }
        else {
            return null;
        }
    }
}


// ------------------------------------------------------- setEntityDescription
/**
 * Sets value of div in annotate dialog.
 *
 * @name setEntityDescription
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAnnotate.prototype.setEntityDescription = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementEntityDescription) {
            this.domElementEntityDescription.innerHTML = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setEntityDescription(newValue);
        }, this);     
    }
}



// ------------------------------------------------------- getEntityDescription
/**
 * Gets value of div in annotate dialog.
 *
 * @name getEntityDescription
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.getEntityDescription = function() {
    if (this.contentLoaded) {
        if (this.domElementEntityDescription) {
            return this.domElementEntityDescription.innerHTML;  
        }
        else {
            return null;
        }
    }
}



// ------------------------------------------------------------- setEntityImage
/**
 * Sets value of div in annotate dialog.
 *
 * @name setEntityImage
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAnnotate.prototype.setEntityImage = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementEntityImage) {
            if(newValue && newValue.length > 0)
            {
                this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_IMAGE).style.backgroundImage = "url('" + newValue + "')";
            }
            else
            {
                this.iframeDocument.getElementById(AEd.CONFIG.DLG_ANNOTATE_ID_ENTITY_IMAGE).style.backgroundImage = 'none';
            }
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setEntityImage(newValue);
        }, this);     
    }
}


// ------------------------------------------------------------- getEntityImage
/**
 * Gets value of div in annotate dialog.
 *
 * @name getEntityImage
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.getEntityImage = function() {
    if (this.contentLoaded) {
        if (this.domElementEntityImage) {
            return this.domElementEntityImage.style.backgroundImage.replace(/url\(['\"]?(.*)['\"]?\)/g, "$1");
        }
        else {
            return null;
        }
    }
}


// -------------------------------------------------------------- setEntityType
/**
 * Sets value of input in annotate dialog.
 *
 * @name setEntityType
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAnnotate.prototype.setEntityType = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementEntityInputType) {
            this.domElementEntityInputType.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setEntityType(newValue);
        }, this);     
    }
}



// -------------------------------------------------------------- getEntityType
/**
 * Gets value of input in annotate dialog.
 *
 * @name getEntityType
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.getEntityType = function() {
    if (this.contentLoaded) {
        if (this.domElementEntityInputType) {
            return this.domElementEntityInputType.value;  
        }
        else {
            return null;
        }
    }
}



// -------------------------------------------------------------- setEntityName
/**
 * Sets value of input in annotate dialog.
 *
 * @name setEntityName
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAnnotate.prototype.setEntityName = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementEntityInputName) {
            this.domElementEntityInputName.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setEntityName(newValue);
        }, this);     
    }
}



// -------------------------------------------------------------- getEntityName
/**
 * Gets value of input in annotate dialog.
 *
 * @name getEntityName
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.getEntityName = function() {
    if (this.contentLoaded) {
        if (this.domElementEntityInputName) {
            return this.domElementEntityInputName.value;  
        }
        else {
            return null;
        }
    }
}



// ----------------------------------------------- isEntityAddToTypeAttrChecked
/**
 * Gets value of input in types dialog.
 *
 * @name isEntityAddToTypeAttrChecked
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.isEntityAddToTypeAttrChecked = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxAddToTypeAttrEntity) {
            return this.domElementCheckboxAddToTypeAttrEntity.checked;  
        }
        else {
            return null;
        }
    }
}



// ---------------------------------------------------- isEntityRequiredChecked
/**
 * Gets value of input in types dialog.
 *
 * @name isEntityRequiredChecked
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.isEntityRequiredChecked = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxRequiredEntity) {
            return this.domElementCheckboxRequiredEntity.checked;  
        }
        else {
            return null;
        }
    }
}


// ------------------------------------------------------------ setGeoPointType
/**
 * Sets value of input in annotate dialog.
 *
 * @name setGeoPointType
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAnnotate.prototype.setGeoPointType = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementGeoPointInputType) {
            this.domElementGeoPointInputType.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setGeoPointType(newValue);
        }, this);     
    }
}



// ------------------------------------------------------------ getGeoPointType
/**
 * Gets value of input in annotate dialog.
 *
 * @name getGeoPointType
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.getGeoPointType = function() {
    if (this.contentLoaded) {
        if (this.domElementGeoPointInputType) {
            return this.domElementGeoPointInputType.value;  
        }
        else {
            return null;
        }
    }
}



// ------------------------------------------------------------- setGeoPointLat
/**
 * Sets value of input in annotate dialog.
 *
 * @name setGeoPointLat
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAnnotate.prototype.setGeoPointLat = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementGeoPointInputLat) {
            this.domElementGeoPointInputLat.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setGeoPointLat(newValue);
        }, this);     
    }
}



// ------------------------------------------------------------- getGeoPointLat
/**
 * Gets value of input in annotate dialog.
 *
 * @name getGeoPointLat
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.getGeoPointLat = function() {
    if (this.contentLoaded) {
        if (this.domElementGeoPointInputLat) {
            return this.domElementGeoPointInputLat.value;  
        }
        else {
            return null;
        }
    }
}



// ------------------------------------------------------------ setGeoPointLong
/**
 * Sets value of input in annotate dialog.
 *
 * @name setGeoPointLong
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAnnotate.prototype.setGeoPointLong = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementGeoPointInputLong) {
            this.domElementGeoPointInputLong.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setGeoPointLong(newValue);
        }, this);     
    }
}



// ------------------------------------------------------------ getGeoPointLong
/**
 * Gets value of input in annotate dialog.
 *
 * @name getGeoPointLong
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.getGeoPointLong = function() {
    if (this.contentLoaded) {
        if (this.domElementGeoPointInputLong) {
            return this.domElementGeoPointInputLong.value;  
        }
        else {
            return null;
        }
    }
}



// ----------------------------------------------------- isGeoPointAddToTypeAttrChecked
/**
 * Gets value of input in types dialog.
 *
 * @name isGeoPointAddToTypeAttrChecked
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.isGeoPointAddToTypeAttrChecked = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxAddToTypeAttrGeoPoint) {
            return this.domElementCheckboxAddToTypeAttrGeoPoint.checked;  
        }
        else {
            return null;
        }
    }
}



// ---------------------------------------------------------- isGeoPointRequiredChecked
/**
 * Gets value of input in types dialog.
 *
 * @name isGeoPointRequiredChecked
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.isGeoPointRequiredChecked = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxRequiredGeoPoint) {
            return this.domElementCheckboxRequiredGeoPoint.checked;  
        }
        else {
            return null;
        }
    }
}



// -------------------------------------------------------------- setNestedType
/**
 * Sets value of input in annotate dialog.
 *
 * @name setNestedType
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAnnotate.prototype.setNestedType = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementNestedInputType) {
            this.domElementNestedInputType.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setNestedType(newValue);
        }, this);     
    }
}


// -------------------------------------------------------------- getNestedType
/**
 * Gets value of input in annotate dialog.
 *
 * @name getNestedType
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.getNestedType = function() {
    if (this.contentLoaded) {
        if (this.domElementNestedInputType) {
            return this.domElementNestedInputType.value;  
        }
        else {
            return null;
        }
    }
}



// --------------------------------------------------------- setNestedSelection
/**
 * Sets value of input in annotate dialog.
 *
 * @name setNestedSelection
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAnnotate.prototype.setNestedSelection = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementNestedInputSelection) {
            this.domElementNestedInputSelection.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setNestedSelection(newValue);
        }, this);     
    }
}



// --------------------------------------------------------- getNestedSelection
/**
 * Gets value of input in annotate dialog.
 *
 * @name getNestedSelection
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.getNestedSelection = function() {
    if (this.contentLoaded) {
        if (this.domElementNestedInputSelection) {
            return this.domElementNestedInputSelection.value;
        }
        else {
            return null;
        }
    }
}



// ----------------------------------------------------------- setNestedContent
/**
 * Sets value of input in annotate dialog.
 *
 * @name setNestedContent
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {String} newValue New Value of input.  
 */
AEd.ui.DlgAnnotate.prototype.setNestedContent = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementNestedInputContent) {
            this.domElementNestedInputContent.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setNestedContent(newValue);
        }, this);     
    }
}


// ----------------------------------------------------------- getNestedContent
/**
 * Gets value of input in annotate dialog.
 *
 * @name getNestedContent
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.getNestedContent = function() {
    if (this.contentLoaded) {
        if (this.domElementNestedInputContent) {
            return this.domElementNestedInputContent.value;  
        }
        else {
            return null;
        }
    }
}



// ----------------------------------------------------- isNestedAddToTypeAttrChecked
/**
 * Gets value of input in types dialog.
 *
 * @name isNestedAddToTypeAttrChecked
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.isNestedAddToTypeAttrChecked = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxAddToTypeAttrNested) {
            return this.domElementCheckboxAddToTypeAttrNested.checked;  
        }
        else {
            return null;
        }
    }
}

// ---------------------------------------------------------- isNestedRequiredChecked
/**
 * Gets value of input in types dialog.
 *
 * @name isNestedRequiredChecked
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Value of input.
 */
AEd.ui.DlgAnnotate.prototype.isNestedRequiredChecked = function() {
    if (this.contentLoaded) {
        if (this.domElementCheckboxRequiredNested) {
            return this.domElementCheckboxRequiredNested.checked;  
        }
        else {
            return null;
        }
    }
}

// ---------------------------------------------------------------------- reset
/**
 * Resets the annotate dialog
 *
 * @name reset
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 */
AEd.ui.DlgAnnotate.prototype.reset = function() {
    // tree
    this.elementTreeWrapper.setInnerHTML("");
    this.tree = new AEd.ui.core.UITree({context: this.domElementTreeWrapper.ownerDocument});             
    this.tree.render(this.domElementTreeWrapper);             
    this.treeNodeAnnotation = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Dlg_annotate_node_annotation"),        id: "Annotation",        assignedObject:{type: "Annotation", selection: "", selectionObject: null, content: "", typePath: "", fieldset: "Annotation"} , context: this.domElementTreeWrapper.ownerDocument});
    this.tree.addChild(this.treeNodeAnnotation);
    this.tree.setSelectedTreeNode(this.treeNodeAnnotation);
    
    this.tree.onNodeSelected.addHandler(this.onTreeNodeSelected, this);
    // btn delete,add and entity
    this.btnDeleteAttribute.setDisabled(true);
    this.btnClearAttribute.setDisabled(true);
    this.btnAddAttribute.setDisabled(false);
    this.btnEntity.setDisabled(false);
    // fieldset 
    this.setFieldset("Annotation");

    this.setSelection("");
    this.setSelectionObject(null);
    this.setType("");    
    this.setContent("");
    
    this.modeEditAnnotation = false;
    this.modeAnnotationLink = false;
    this.modeEditSuggestion = false;
    this.modeEditSuggestionTmpId = null;
    // anotate whole document
    this.setAnnotateWholeDoc(true);
}

// ---------------------------------------------------------------- setFieldset
/**
 * Sets fieldset on right side of annotate dialog
 *
 * @name setFieldset
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {String} fieldset Value: "Annotation", "Simple", "GeoPoint", ""NestedAnnotation"   
 */
AEd.ui.DlgAnnotate.prototype.setFieldset = function(fieldset) {
  
    
    if (fieldset) {
        this.fieldset = fieldset;
        this.elementAnnotationFieldset.hide();
        this.elementSimpleFieldset.hide();
        this.elementGeoPointFieldset.hide();
        this.elementEntityFieldset.hide();
        this.elementNestedFieldset.hide();
                
        switch (this.fieldset) {
            case "Annotation":
                this.elementAnnotationFieldset.show();
                this.setType("");
                this.setSelection("");
                this.setContent("");               
            break;
            
            case "Simple":
                this.elementSimpleFieldset.show();
                this.setSimpleType("");
                this.setSimpleValue("");     
                this.setSimpleTextareaValue("");   
            break;
            
            case "GeoPoint":
                this.elementGeoPointFieldset.show();
                this.setGeoPointType("");
                this.setGeoPointLat("");
                this.setGeoPointLong("");            
            break;
            
            case "Entity":
                this.elementEntityFieldset.show();
                this.setEntityType("");
                this.setEntityName("");            
            break;
            
            case "NestedAnnotation":  
                this.elementNestedFieldset.show();             
                this.setNestedType("");
                this.setNestedSelection("");
                this.setNestedContent("");              
            break;                                                
            
            default:
            break;
        }    
    }
}

// --------------------------------------------------------------- loadAttrsOfType
/**
 * Load attributes of selected Type
 *
 * @name loadAttrsOfType
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @param {Object} type Selected annotation Type
 * @param (AEd.entities.typesManager) types All annotation types. 
 */
AEd.ui.DlgAnnotate.prototype.loadAttrsOfType = function(type, types) {

    var node = this.tree.getSelectedTreeNode();
    
    // remove existing attributes without a value
    // --------------------------------------- 
    
    var remove = true;
    var iAttr = 0;
    while (iAttr < node.childTreeNodes.length) {
        var childNode = node.childTreeNodes[iAttr];
        for (var i = 0; i < type.attributes.length; i++) {
            if (type.attributes[i].name == childNode.assignedObject.name) {
                remove = false;
                break;    
            }
        }
        if (remove) {
            switch (childNode.assignedObject.type) {
                case "String":
                case "Integer":
                case "Time":
                case "Date":
                case "DateTime":  
                case "Boolean":
                case "URI":
                case "Duration":
                case "Binary":
                case "Text":
                case "Image":
                    if (!childNode.assignedObject.value) {
                        node.removeChild(childNode);
                        continue;
                    }
                break;
                case "GeoPoint":
                    if (!childNode.assignedObject.lat && !childNode.assignedObject.long) {
                        node.removeChild(childNode);
                        continue;
                    }    
                break;
                case "Entity":
                    if (!childNode.assignedObject.entityName) {
                        node.removeChild(childNode);
                        continue;
                    }    
                break;
                case "annotationLink":             
                case "nestedAnnotation": 
                    if (!childNode.assignedObject.selectionObject && !childNode.assignedObject.annotationLink
                        && !childNode.assignedObject.wholeDoc && !childNode.childTreeNodes[0]) {
                        node.removeChild(childNode);
                        continue;
                    }  
                break;
            }
        }
        remove = true;
        iAttr++;
    }  
    
    // ---------------------------------------
    
    // load attributes of selected Type
    // ---------------------------------------
     
    for (var i = 0; i < type.attributes.length; i++) {
    
        // test existing attributes with a value
        // ---------------------------------------
    
        var removeAttrs = function(typeOfAttribute) {      
            iAttr = 0;
            while (iAttr < node.childTreeNodes.length) {
                var childNode = node.childTreeNodes[iAttr];       
                if (type.attributes[i].name == childNode.assignedObject.name) {
                    switch (typeOfAttribute) {
                        case "Simple":
                        case "GeoPoint":
                        case "Entity":
                            if (type.attributes[i].type == childNode.assignedObject.type) {
                                return true;
                            }
                            else {
                                node.removeChild(childNode);
                                return false;
                            }
                        break;
                        case "Nested":
                            return true; 
                        break;    
                    }    
                }
                iAttr++;
            }
        }       
    
        // ---------------------------------------

        switch (type.attributes[i].type) {
            
            case "String":
            case "Integer":
            case "Time":
            case "Date":
            case "DateTime":  
            case "Boolean":
            case "URI":
            case "Duration":
            case "Binary":
            case "Text":
            case "Image":
                
                if (removeAttrs.call(this, "Simple"))
                    continue;

                oType = {};
                oType.simpleType = true;
                oType.name = type.attributes[i].type;
                oType.path = type.attributes[i].type;                             
                                              
                this.addAttribute(type.attributes[i].name, oType, true, type.attributes[i].required, false);
                this.setSimpleValue("");    
                this.setSimpleTextareaValue("");                          
                this.tree.setSelectedTreeNode(node);                                                                                                             
            
            break;
        
            case "GeoPoint":
              
                if (removeAttrs.call(this, "GeoPoint"))
                    continue;
              
                oType = {};
                oType.simpleType = true;
                oType.name = type.attributes[i].type;
                oType.path = type.attributes[i].type;                             
                                  
                this.addAttribute(type.attributes[i].name, oType, true, type.attributes[i].required, false);
                this.setGeoPointLat("");      
                this.setGeoPointLong("");                        
                this.tree.setSelectedTreeNode(node);
                
            break;
            
            case "Entity":
                if (removeAttrs.call(this, "Entity"))
                    continue;
              
                oType = {};
                oType.simpleType = true;
                oType.name = type.attributes[i].type;
                oType.path = type.attributes[i].type;                             
                                     
                this.addAttribute(type.attributes[i].name, oType, true, type.attributes[i].required, false);
                this.setEntityName("");                        
                this.tree.setSelectedTreeNode(node);
                
            break;
                         
            default:
                
                if (removeAttrs.call(this, "Nested"))
                    continue;
                   
                var typeOfAttr = this.getTypeOfNestedAnnotation(type.attributes[i].type);

                oType = {};
                oType.simpleType = false;
                oType.name = typeOfAttr;
                oType.path = typeOfAttr;
                if (typeOfAttr) {
                    oType.color = types.getTypeByPath(typeOfAttr).color;
                }
                                 
                this.addAttribute(type.attributes[i].name, oType, true, type.attributes[i].required, false);
                             
                var newNode = this.tree.getSelectedTreeNode();
                var newNodeAttrObject = newNode.getAssignedObject();                                                               
                
                this.tree.setSelectedTreeNode(node);    
                    
            break;
        }
    }
        
    // ----------------------------------------
    
    this.tree.setSelectedTreeNode(this.treeNodeAnnotation);
    this.tree.getSelectedTreeNode().collapse();
    this.tree.getSelectedTreeNode().expand();
    this.tree.setSelectedTreeNode(node);
}

// --------------------------------------------------------------- addAttribute
/**
 * Adds new attribute
 *
 * @name addAttribute
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {String} name Name of attribute   
 * @param {Object} type Type of attribute   
 * @param {Boolean} addToTypeAttr Add to the basic attributes of given annotation type
 * @param {Boolean} required Will be this attribute required in given annotation type? 
 * @param {Boolean} isAttrOfLinkedAnnotation determines if attribute is attribute of linked annotation  
 */
AEd.ui.DlgAnnotate.prototype.addAttribute = function(name, type, addToTypeAttr, required, isAttrOfLinkedAnnotation) {

    if (name && type) {
       // if user selected Simple or Structured nodes in types tree - which are not
       // regular types
       if (type.notAllowed) {
          // do nothing
       }
       else {

          // do not add attribute that already exists
          // ---------------------------------------

          var node = this.tree.getSelectedTreeNode();

          for (var i = 0; i < node.childTreeNodes.length; i++) {

              if (node.childTreeNodes[i].assignedObject.name == name) {
                  this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                  return;
              }
          }
          
          // ----------------------------------------
       
          var oAttribute = {};
          // Simple type
          if (type.simpleType) {
               oAttribute.simpleType = true;
               switch(type.name) {
                  case "Integer":
                  case "String":
                  case "Time":
                  case "Date":
                  case "DateTime":
                  case "Boolean":
                  case "URI":
                  case "Duration":
                  case "Binary":
                  case "Text":
                  case "Image":
                       oAttribute.type = type.name;
                       oAttribute.typePath = type.path;
                       oAttribute.name = name;
                       oAttribute.value = "";
                       oAttribute.fieldset = "Simple";
                       oAttribute.addToTypeAttr = addToTypeAttr;
                       oAttribute.required = required;
                       oAttribute.isAttrOfLinkedAnnotation = isAttrOfLinkedAnnotation;
                       oAttribute.color = null;
                  break;
                  case "GeoPoint":
                       oAttribute.type = type.name;
                       oAttribute.typePath = type.path;
                       oAttribute.name = name;
                       oAttribute.lat = "";  
                       oAttribute.long = ""; 
                       oAttribute.fieldset = "GeoPoint";  
                       oAttribute.addToTypeAttr = addToTypeAttr;
                       oAttribute.required = required;
                       oAttribute.isAttrOfLinkedAnnotation = isAttrOfLinkedAnnotation;
                       oAttribute.color = null;                                              
                  break;                                    
                  case "Entity":
                       oAttribute.type = type.name;
                       oAttribute.typePath = type.path;
                       oAttribute.name = name;
                       oAttribute.entityName = type.entityName || "";   
                       oAttribute.entityDescription = type.entityDescription || "";
                       oAttribute.entityImage = type.entityImage || "";
                       oAttribute.entityURI = type.entityURI || "";
                       oAttribute.entityType = type.entityType || "";
                       oAttribute.entityIsSelected = type.entityIsSelected || false;
                       oAttribute.fieldset = "Entity";  
                       oAttribute.addToTypeAttr = addToTypeAttr;
                       oAttribute.required = required;
                       oAttribute.isAttrOfLinkedAnnotation = isAttrOfLinkedAnnotation;
                       oAttribute.color = null;                                             
                  break; 
                  default:                  
                  break;               
               }
          }
          // Structured type
          else {
              oAttribute.name = name;
              oAttribute.type = "nestedAnnotation";
              oAttribute.typePath = type.path != "anyAnnotation" ? type.path : "";
              oAttribute.fieldset = "NestedAnnotation"; 
              oAttribute.content = "";    
              oAttribute.addToTypeAttr = addToTypeAttr;
              oAttribute.required = required;
              oAttribute.list = new Array();
              oAttribute.list.push({
                annotationLink: null,
                selectionObject: null,
                selection: AEd.I18n.t("Dlg_annotate_selection_nothing"),
                wholeDoc: false  
              });
              oAttribute.listPosition = 0;
              oAttribute.annotationLink = null;
              oAttribute.selectionObject = null;
              oAttribute.wholeDoc = false;
              oAttribute.isAttrOfLinkedAnnotation = isAttrOfLinkedAnnotation; 
              oAttribute.color = type.color;
          }
          
          var nodeAttr = new AEd.ui.core.UITreeNode({text: name, assignedObject: oAttribute, render: false});               
          this.tree.getSelectedTreeNode().addChild(nodeAttr);   
          this.tree.getSelectedTreeNode().collapse();  
          this.tree.getSelectedTreeNode().expand();       
          this.tree.setSelectedTreeNode(nodeAttr);    

       }     
    } 
}

// --------------------------------------------------------------- addAttributeFromExisting
/**
 * Add attribute from attribute that already exists
 *
 * @name addAttributeFromExisting
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {String} name Name of attribute   
 * @param {Object} type Type of attribute   
 * @param {Boolean} addToTypeAttr Add to the basic attributes of given annotation type
 * @param {Boolean} required Will be this attribute required in given annotation type?   
 */
AEd.ui.DlgAnnotate.prototype.addAttributeFromExisting = function(name, type, addToTypeAttr, required) {

    
    if (name && type) {
       // if user selected Simple or Structured nodes in types tree - which are not
       // regular types
       if (type.notAllowed) {
          // do nothing
       }
       else {

          // do not add attribute that already exists or do not have a value
          // ---------------------------------------

          var node = this.tree.getSelectedTreeNode();
          for (var i = 0; i < node.childTreeNodes.length; i++) {
              if (node.childTreeNodes[i].assignedObject.name == name) {
                  return;
              }
              else if (type.simpleType && !type.value) {
                  return;
              }
          }
          
          // ----------------------------------------
       
          var oAttribute = {};
          // Simple type
          if (type.simpleType) {
               oAttribute.simpleType = true;
               switch(type.type) {
                  case "Integer":
                  case "String":
                  case "Time":
                  case "Date":
                  case "DateTime":
                  case "Boolean":
                  case "URI":
                  case "Duration":
                  case "Binary":
                  case "Text":
                  case "Image":
                       oAttribute.type = type.type;
                       oAttribute.typePath = type.typePath;
                       oAttribute.name = name;
                       oAttribute.value = type.value;
                       oAttribute.fieldset = "Simple";
                       oAttribute.addToTypeAttr = addToTypeAttr;
                       oAttribute.required = required;
                  break;
                  case "GeoPoint":
                       oAttribute.type = type.type;
                       oAttribute.typePath = type.typePath;
                       oAttribute.name = name;
                       oAttribute.lat = type.lat;  
                       oAttribute.long = type.long; 
                       oAttribute.fieldset = "GeoPoint";  
                       oAttribute.addToTypeAttr = addToTypeAttr;
                       oAttribute.required = required;                                              
                  break;                                    
                  case "Entity":
                       oAttribute.type = type.type;
                       oAttribute.typePath = type.typePath;
                       oAttribute.name = name;
                       oAttribute.entityName = type.entityName; 
                       oAttribute.entityImage = type.entityImage; 
                       oAttribute.entityURI = type.entityURI; 
                       oAttribute.entityType = type.entityType;
                       oAttribute.entityIsSelected = type.entityIsSelected;
                       oAttribute.entityDescription = type.entityDescription; 
                       oAttribute.fieldset = "Entity";  
                       oAttribute.addToTypeAttr = addToTypeAttr;
                       oAttribute.required = required;                                              
                  break; 
                  default:                 
                  break;               
               }
          }
          // Structured type
          else {
              oAttribute.name = name;
              oAttribute.type = "nestedAnnotation";
              oAttribute.typePath = type.typePath;
              oAttribute.fieldset = "NestedAnnotation"; 
              oAttribute.content = "";    
              oAttribute.addToTypeAttr = addToTypeAttr;
              oAttribute.required = required;
              oAttribute.selection = type.selection;
              oAttribute.annotationLink = type.annotationLink;
              oAttribute.selectionObject = type.selectionObject;
              oAttribute.wholeDoc = type.wholeDoc;
              oAttribute.list = new Array();
              for (var i in type.list) {
                oAttribute.list.push(type.list[i]);
              }
              oAttribute.listPosition = type.listPosition;                         
          }

          var nodeAttr = new AEd.ui.core.UITreeNode({text: name, assignedObject: oAttribute});               
          this.tree.getSelectedTreeNode().addChild(nodeAttr);
          this.tree.getSelectedTreeNode().collapse();
          this.tree.getSelectedTreeNode().expand();  
          this.tree.setSelectedTreeNode(nodeAttr);
       }     
    } 
}

// --------------------------------------------------------------- moveAttributes
/**
 * Move attributes from treeNode to parent of treeNode
 * 
 * @name moveAttributes
 * @memberOf AEd.ui.DlgAnnotate 
 * @function
 * @param {Boolean} required Will be this attribute required in given annotation type?   
 */
AEd.ui.DlgAnnotate.prototype.moveAttributes = function(node) {

    
    var iAttr = 0;
    while (iAttr < node.childTreeNodes.length) {
        this.tree.setSelectedTreeNode(node.parent);                
        this.tree.setSelectedTreeNode(node);
        node.removeChild(node.childTreeNodes[iAttr]);        
    } 
}

// ------------------------------------------------------------ updateAttribute
/**
 * Updates attribute after change
 *
 * @name updateAttribute
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {String} name Name of attribute   
 * @param {Object} newType Type of attribute   
 * @param {Boolean} addToTypeAttr Add to the basic attributes of given annotation type
 * @param {Boolean} required Will be this attribute required in given annotation type?   
 */
AEd.ui.DlgAnnotate.prototype.updateAttribute = function(name, newType, addToTypeAttr, required) {

    if (newType) {
       // if user selected Simple or Structured nodes in types tree - which are not
       // regular types
       if (newType.notAllowed) {
          // do nothing
       }
       else {
          var selNode = this.tree.getSelectedTreeNode();
          this.storeAttribute(selNode);
          if (selNode && selNode.assignedObject) {
              var actualAttribute = selNode.assignedObject;
              var newAttribute = {};         
              
              if (actualAttribute.simpleType && newType.simpleType) { // simple to simple
                       newAttribute.type = newType.name;
                       newAttribute.typePath = newType.path;
                       newAttribute.name = name;
                       newAttribute.fieldset = "Simple";
                       newAttribute.addToTypeAttr = addToTypeAttr;
                       newAttribute.required = required;  
                       newAttribute.simpleType = true;  
                               
                       if (actualAttribute.type == "GeoPoint") {
                           if (newType.name == "GeoPoint" ) {
                                 newAttribute.lat = actualAttribute.lat;  
                                 newAttribute.long = actualAttribute.long; 
                                 newAttribute.fieldset = "GeoPoint";  
                           }
                           else if (newType.name == "Entity") {
                                 newAttribute.entityName = actualAttribute.lat ? actualAttribute.lat : "";
                                 newAttribute.entityName += actualAttribute.lat && actualAttribute.long ? " " : "";
                                 newAttribute.entityName += actualAttribute.long ? actualAttribute.long : "";
                                 newAttribute.fieldset = "Entity";
                           }
                           else {
                                 newAttribute.value = actualAttribute.lat ? actualAttribute.lat : "";
                                 newAttribute.value += actualAttribute.lat && actualAttribute.long ? " " : "";
                                 newAttribute.value += actualAttribute.long ? actualAttribute.long : "";       
                           }
                       }
                       else if (actualAttribute.type == "Entity") {
                           if (newType.name == "Entity") {
                                 newAttribute.entityName = actualAttribute.entityName;
                                 newAttribute.fieldset = "Entity";  
                                 newAttribute.entityDescription = actualAttribute.entityDescription;
                                 newAttribute.entityImage = actualAttribute.entityImage;
                                 newAttribute.entityURI = actualAttribute.entityURI;
                                 newAttribute.entityType = actualAttribute.entityType;
                                 newAttribute.entityIsSelected = actualAttribute.entityIsSelected;
                           }
                           else if (newType.name == "GeoPoint") {
                                 newAttribute.lat = actualAttribute.entityName;  
                                 newAttribute.long = actualAttribute.entityName;
                                 newAttribute.fieldset = "GeoPoint"; 
                           }
                           else {
                                 newAttribute.value = actualAttribute.lat ? actualAttribute.lat : "";
                                 newAttribute.value += actualAttribute.lat && actualAttribute.long ? " " : "";
                                 newAttribute.value += actualAttribute.long ? actualAttribute.long : "";       
                           }
                       }    
                       else {
                           if (newType.name == "GeoPoint" ) {
                                 newAttribute.lat = actualAttribute.value; 
                                 newAttribute.long = actualAttribute.value; 
                                 newAttribute.fieldset = "GeoPoint";                          
                           }
                           else if (newType.name == "Entity") {
                                newAttribute.entityName = actualAttribute.value; 
                                newAttribute.fieldset = "Entity";
                           }
                           else {
                                 newAttribute.value = actualAttribute.value;
                           }                       
                       }                         
              }
              else if (actualAttribute.simpleType) { // simple to structured
                       newAttribute.name = name;
                       newAttribute.type = "nestedAnnotation";
                       newAttribute.typePath = newType.path;
                       newAttribute.fieldset = "NestedAnnotation"; 
                       newAttribute.selection = AEd.I18n.t("Dlg_annotate_selection_nothing");  
                       newAttribute.selectionObject = null;
                       newAttribute.annotationLink = null;
                       newAttribute.wholeDoc = false;  
                       newAttribute.content = actualAttribute.value ? actualAttribute.value : "";
                       newAttribute.content += actualAttribute.lat ? actualAttribute.lat : "";
                       newAttribute.content += actualAttribute.lat && actualAttribute.long ? " " : "";
                       newAttribute.content += actualAttribute.long ? actualAttribute.long : "";    
                       newAttribute.addToTypeAttr = addToTypeAttr;
                       newAttribute.required = required;
                       newAttribute.color = newType.color; 
                       newAttribute.list = new Array();
                       newAttribute.list.push({
                            annotationLink: null,
                            selectionObject: null,
                            selection: AEd.I18n.t("Dlg_annotate_selection_nothing"),
                            wholeDoc: false  
                        });
                        newAttribute.listPosition = 0; 
                                   
              }
              else if (newType.simpleType) { // structured to simple
                       newAttribute.type = newType.name;
                       newAttribute.typePath = newType.path;
                       newAttribute.name = name;                                              
                       newAttribute.addToTypeAttr = addToTypeAttr;
                       newAttribute.required = required;                        
                       newAttribute.simpleType = true;
                       newAttribute.color = null;     
                       if (newType.name == "GeoPoint" ) {
                                 newAttribute.lat = actualAttribute.content;  
                                 newAttribute.long = actualAttribute.content; 
                                 newAttribute.fieldset = "GeoPoint";  
                       }     
                       else if (newType.name == "Entity") {
                                 newAttribute.entityName = actualAttribute.content; 
                                 newAttribute.fieldset = "Entity";
                       } 
                       else {
                                 newAttribute.value = actualAttribute.content; 
                                 newAttribute.fieldset = "Simple";  
                       }                         
              }
              else { // structured to structured
                       newAttribute.name = name;
                       newAttribute.type = "nestedAnnotation";
                       newAttribute.typePath = newType.path;
                       newAttribute.fieldset = "NestedAnnotation"; 
                       newAttribute.selection = actualAttribute.selection;  
                       newAttribute.selectionObject = actualAttribute.selectionObject;                       
                       newAttribute.content = actualAttribute.content;    
                       newAttribute.addToTypeAttr = addToTypeAttr;
                       newAttribute.required = required;                  
                       newAttribute.wholeDoc = actualAttribute.wholeDoc;
                       newAttribute.color = newType.color; 
                       newAttribute.list = new Array();
                       for (var i in actualAttribute.list) {
                           newAttribute.list.push(actualAttribute.list[i]);
                       }
                       newAttribute.listPosition = actualAttribute.listPosition;
              }      
          }

          selNode.setAssignedObject(newAttribute);
          this.updateFieldset(selNode);

          this.tree.setSelectedTreeNode(this.treeNodeAnnotation);
          this.tree.getSelectedTreeNode().collapse();
          this.tree.getSelectedTreeNode().expand();
          this.tree.setSelectedTreeNode(selNode);
       }     
    } 
}

// ------------------------------------------------------------ checkAttributes
/**
 * Checks attributes of annotation before sending.
 *
 * @name checkAttributes
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {AEd.ui.core.UITreeNode} node Tree node   
 * @return (Boolean) True / false   
 */
AEd.ui.DlgAnnotate.prototype.checkAttributes = function(node) {

    
    this.storeAttribute(this.tree.getSelectedTreeNode()); 
    var regExpE = new RegExp("e", 'i');
    var regExpTrue = new RegExp("^true$", 'i');
    var regExpFalse = new RegExp("^false$", 'i');
    var regExpDuration = new RegExp("^([\-])?P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+(?:\.[0-9]+)?)?S)?)?$",'i');  // regex taken and modified from http://code.google.com/p/rdfquery/issues/detail?id=24
    for (var i = 0; i < node.childTreeNodes.length; i++) {
        var childNode = node.childTreeNodes[i].assignedObject;
        if (childNode.simpleType) {
            switch (childNode.type) {
                case "Integer":
                    if (!childNode.required && !childNode.value) {
                        continue;
                    }
                    if ((childNode.required && !childNode.value) ||
                    !isFinite(childNode.value) || childNode.value.search(/\./) >= 0 || 
                    childNode.value.search(regExpE) >= 0) {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                break;
                case "String":
                case "URI":
                case "Image":
                    if (!childNode.required && !childNode.value) {
                        continue;
                    }
                    if (childNode.required && !childNode.value) {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                    childNode.value = childNode.value.replace("&", "&amp;");
                    childNode.value = childNode.value.replace("\"", "&quot;");
                    childNode.value = childNode.value.replace("'", "&apos;");
                    childNode.value = childNode.value.replace("<", "&lt;");
                    childNode.value = childNode.value.replace(">", "&gt;");
                break;
                case "Time":
                    if (!childNode.required && !childNode.value) {
                        continue;
                    }
                    if (childNode.required && !childNode.value)  {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                    if (childNode.value.search(/\+/) >= 0) {
                        var timeAndZone = childNode.value.split("+");
                        var time = timeAndZone[0];
                        var timeZone = timeAndZone[1];
                    }
                    else if (childNode.value.search(/-/) >= 0) {
                        var timeAndZone = childNode.value.split("-");
                        var time = timeAndZone[0];
                        var timeZone = timeAndZone[1];
                    }
                    else {
                        var timeAndZone = {};
                        var time = childNode.value;
                        var timeZone = "00:00";
                    }
                    if (!this.parseTime(time) || !this.parseTimeZone(timeZone) || timeAndZone[2]) {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                break;
                case "Date":
                    if (!childNode.required && !childNode.value) {
                        continue;
                    }
                    if (childNode.required && !childNode.value) {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                    if (childNode.value.search(/\+/) >= 0) {
                        var dateAndZone = childNode.value.split("+");
                        var date = dateAndZone[0];
                        var timeZone = dateAndZone[1];
                        var dateAndZoneArray = dateAndZone[2] ? true : false;
                    }
                    else if (childNode.value.search(/-/) >= 0) {
                        var dateAndZone = childNode.value.split("-");
                        var date = dateAndZone[0] + "-" + dateAndZone[1] + "-" + dateAndZone[2];
                        var timeZone = dateAndZone[3] ? dateAndZone[3] : "00:00";
                        var dateAndZoneArray = dateAndZone[4] ? true : false;
                    }
                    if (!this.parseDate(date) || !this.parseTimeZone(timeZone) ||
                        dateAndZoneArray || childNode.value.substr(-1) === "-") {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                break;
                case "DateTime":
                    if (!childNode.required && !childNode.value) {
                        continue;
                    }
                    if (childNode.required && !childNode.value) {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                    var dateTime = childNode.value.split("T");
                    var date = dateTime[0];
                    var timeX = dateTime[1];
                    if (timeX.search(/\+/) >= 0) {
                        var timeAndZone = timeX.split("+");
                        var time = timeAndZone[0];
                        var timeZone = timeAndZone[1];
                    }
                    else if (timeX.search(/-/) >= 0) {
                        var timeAndZone = timeX.split("-");
                        var time = timeAndZone[0];
                        var timeZone = timeAndZone[1];
                    }
                    else {
                        var timeAndZone = {};
                        var time = timeX;
                        var timeZone = "00:00";
                    }
                    if (!this.parseDate(date) || !this.parseTime(time) ||
                    !this.parseTimeZone(timeZone) || dateTime[2] || timeAndZone[2]) {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                    if (timeZone == "00:00") {
                        childNode.value = childNode.value + "Z";
                    }
                break;
                case "Boolean":
                    if (!childNode.required && !childNode.value) {
                        continue;
                    }
                    if ((childNode.required && !childNode.value) ||
                    (childNode.value != "0" && childNode.value != "1" && 
                    !childNode.value.match(regExpTrue) && !childNode.value.match(regExpFalse))) {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                break;
                case "Duration":
                    if (!childNode.required && !childNode.value) {
                        continue;
                    }
                    if ((childNode.required && !childNode.value) || !childNode.value.match(regExpDuration)) {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                break;
                case "Binary":
                    if (!childNode.required && !childNode.value) {
                        continue;
                    }    
                    if (childNode.required && !childNode.value) {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                break;
                case "Text":
                    if (!childNode.required && !childNode.value) {
                        continue;
                    }
                    if (childNode.required && !childNode.value) {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                break;
                case "GeoPoint":
                    if (!childNode.required && !childNode.lat && !childNode.long) {
                        continue;
                    }
                    if (childNode.required && (!childNode.lat || !childNode.long) || 
                    (childNode.lat && !childNode.long) ||
                    (!childNode.lat && childNode.long) ||
                    !isFinite(childNode.lat) || !isFinite(childNode.long) ||
                    childNode.lat.search(regExpE) >= 0 || childNode.long.search(regExpE) >= 0 ||
                    childNode.lat.search(/^\./) >= 0 || childNode.long.search(/^\./) >= 0 ||
                    childNode.lat.search(/\.$/) >= 0 || childNode.long.search(/\.$/) >= 0) {
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);
                        return false;
                    }
                break;
                case "Entity":
                    //an entity needs to be selected or loaded from existing annotation
                    if(!childNode.entityIsSelected && !childNode.entityName)
                    {
                        if(childNode.required)
                            return false;

                        else
                        {
                            node.childTreeNodes[i].assignedObject.entityName = "";
                            node.childTreeNodes[i].assignedObject.entityType = "";
                            node.childTreeNodes[i].assignedObject.entityURI = "";
                            node.childTreeNodes[i].assignedObject.entityImage = "";
                            node.childTreeNodes[i].assignedObject.entityDescription = "";
                        }
                    }
                break;
            }
        }
        else {
            // remove empty items if more than one
            
            for (var iAttr = childNode.list.length - 1; iAttr >= 0; iAttr--) {
                if (childNode.list.length > 1 && !childNode.list[iAttr].selectionObject && !childNode.list[iAttr].annotationLink && !childNode.list[iAttr].wholeDoc) {

                    this.btnNestedDelete.onClick.fire();
                }
            }
            
            // checks the list of annotations
            for (var j in childNode.list) {
            
                if (childNode.required && !childNode.list[j].selectionObject && !childNode.list[j].annotationLink && !childNode.list[j].wholeDoc) {
                    // ---------- load item
                    childNode.listPosition = j;
                    childNode.annotationLink = childNode.list[j].annotationLink;
                    childNode.selectionObject = childNode.list[j].selectionObject;
                    childNode.selection = childNode.list[j].selection;
                    childNode.wholeDoc = childNode.list[j].wholeDoc;
                    this.updateFieldset(childNode);
                    // ----------
                    this.nestedListButtonsController(childNode);
                    this.tree.setSelectedTreeNode(node.childTreeNodes[i]);                                                                                
                    return false;
                }
                else if (!childNode.required) {
                    if ((node.childTreeNodes[i].childTreeNodes.length > 0 || childNode.content) && (!childNode.list[j].selectionObject && !childNode.list[j].annotationLink && !childNode.list[j].wholeDoc)) {
                        // ---------- load item
                        childNode.listPosition = j;
                        childNode.annotationLink = childNode.list[j].annotationLink;
                        childNode.selectionObject = childNode.list[j].selectionObject;
                        childNode.selection = childNode.list[j].selection;
                        childNode.wholeDoc = childNode.list[j].wholeDoc;
                        this.updateFieldset(childNode);
                        // ----------
                        this.nestedListButtonsController(childNode);
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);                        
                        return false;
                    }
                    else if (!childNode.typePath && (node.childTreeNodes[i].childTreeNodes.length > 0 || childNode.content || childNode.list[j].selectionObject || childNode.list[j].annotationLink || childNode.list[j].wholeDoc)) {
                        // ---------- load item
                        childNode.listPosition = j;
                        childNode.annotationLink = childNode.list[j].annotationLink;
                        childNode.selectionObject = childNode.list[j].selectionObject;
                        childNode.selection = childNode.list[j].selection;
                        childNode.wholeDoc = childNode.list[j].wholeDoc;
                        this.updateFieldset(childNode);
                        // ----------
                        this.nestedListButtonsController(childNode);
                        this.tree.setSelectedTreeNode(node.childTreeNodes[i]);                        
                        return false;
                    }
                    /* else if (!childNode.typePath) {
                        childNode.typePath = "AnyAnnotation";        
                    } */
                } 
            }
            
            if (!this.checkAttributes(node.childTreeNodes[i])) {
                return false;    
            }
        }
    }
    return true;
}

// ------------------------------------------------------------ removeEmptyAttributes
/**
 * Removes attributes with empty values.
 *
 * @name removeEmptyAttributes
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {AEd.ui.core.UITreeNode} node Tree node     
 */
AEd.ui.DlgAnnotate.prototype.removeEmptyAttributes = function(node) {
   
    var len = node.childTreeNodes.length;  // length will change after every removed node

    for (var i = 0; i < len; i++) {  // Array shifts so zero element will contain different value every iteration
 
        var childNode = node.childTreeNodes[0].assignedObject;

        if (childNode.simpleType) {
            switch (childNode.type) {
                case "Integer":
                case "String":
                case "URI":
                case "Image":
                case "Time":
                case "Date":
                case "DateTime":
                case "Boolean":
                case "Duration":
                case "Binary":
                case "Text":
                     if (!childNode.value){
                        node.childTreeNodes[0].parent.removeChild(node.childTreeNodes[0]);
                     }
                break;
                case "GeoPoint":
                     if (!childNode.lat && !childNode.long) {
                        node.childTreeNodes[0].parent.removeChild(node.childTreeNodes[0]);           
                     }
                break;
                case "Entity":
                     if(!childNode.entityIsSelected && !childNode.entityName){
                        node.childTreeNodes[0].parent.removeChild(node.childTreeNodes[0]);           
                     }
                break;
            }
        }
      
    }
   
}

// ------------------------------------------------------------ clearAttributeValue
/**
 * Clears attribute value
 *
 * @name clearAttributeValue
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {AEd.ui.core.UITreeNode} node Tree node     
 */
AEd.ui.DlgAnnotate.prototype.clearAttributeValue = function(node) {
   
     if (node.assignedObject) {
            switch (node.assignedObject.type) {
                case "Integer":
                case "String":
                case "URI":
                case "Image":
                case "Time":
                case "Date":
                case "DateTime":
                case "Boolean":
                case "Duration":
                case "Binary":
                     this.setSimpleValue("");
                break;
                case "Text":
                     this.setSimpleTextareaValue("");
                break;
                case "GeoPoint":
                     this.setGeoPointLat("");
                     this.setGeoPointLong("");
                break;
                case "Entity":
                     this.setEntityName("");
                     this.setEntityDescription("");
                     this.setEntityImage("");
                break;
                case "annotationLink":
                case "nestedAnnotation":
                     node.assignedObject.selectionObject = "";  // Remove selection object and its depedencies
                     node.assignedObject.selection = "";
                     node.assignedObject.list = [];
                     node.assignedObject.listPosition = 0;
                     node.assignedObject.list.push({annotationLink : null,
                                               selection : "*** NOTHING ***",
                                               selectionObject : null,
                                               wholeDoc : false});
                     node.assignedObject.annotationLink = null;
                     this.updateFieldset(node);
                     this.setNestedSelection("*** NOTHING ***");   
                     this.setNestedContent(""); 
                     
                     var len = node.childTreeNodes.length;

                     for (var i = 0; i < len; i++){   // Remove attributes

                         node.childTreeNodes[0].parent.removeChild(node.childTreeNodes[0]);
                     }
                break;
            }
      }
  
}

// --------------------------------------------------------- onTreeNodeSelected
/**
 * Handler to tree.onNodeSelected event
 *
 * @name onTreeNodeSelected
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {AEd.ui.core.UITreeNode} oTreeNode Name of attribute   
 */
AEd.ui.DlgAnnotate.prototype.onTreeNodeSelected = function(oTreeNode) {

        // annotationLink mode
        // ---------------------------------------
       
        if (this.btnNestedSelect.isSelected) {
            this.btnNestedSelect.setSelected(false);         
        }
        this.modeAnnotationLink = false;
       
        // nested annotation
        // ---------------------------------------
       
        var node = oTreeNode.assignedObject;
        if (node.type == "nestedAnnotation") {
            // ---------- update text
            this.domElementListNested.innerHTML = node.listPosition + 1 + "/" + node.list.length;
            // ----------
            if (!node.selectionObject && !node.annotationLink && !node.wholeDoc) {
                node.selection = AEd.I18n.t("Dlg_annotate_selection_nothing");
                this.domElementNestedInputSelection.style.color = AEd.CONFIG.DEFAULT_WARNING_COLOR;
            }
            else {
                this.domElementNestedInputSelection.style.color = null;
            }
        }
        
        // ---------------------------------------
       
        // ---------------------------------------
       
        this.storeAttribute(this.tree.lastSelectedTreeNode);
        this.updateFieldset(oTreeNode);
        this.onUpdateFieldset.fire();
        
        if (node.type == "nestedAnnotation") {
            this.nestedListButtonsController(node);
        }
}

// ------------------------------------------------------------- SimpleToNestedAttr
/**
 * Changes fieldset when new type is in simple type input
 *
 * @name SimpleToNestedAttr
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 */
AEd.ui.DlgAnnotate.prototype.SimpleToNestedAttr = function() {
    this.onSimpleToNestedAttr.fire();
}

// ------------------------------------------------------------- storeAttribute
/**
 * Stores changes to actual attribute
 *
 * @name storeAttribute
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {AEd.ui.core.UITreeNode} oTreeNode Tree node to store   
 */
AEd.ui.DlgAnnotate.prototype.storeAttribute = function(oTreeNode) {
    // store actual attribute values
    var actualAttribute = oTreeNode ? oTreeNode.assignedObject : null;
    
    if (actualAttribute) {
        switch (actualAttribute.type) {
                      case "Annotation":
                          actualAttribute.typePath = this.getType();
                          actualAttribute.selection = this.getSelection();
                          actualAttribute.content = this.getContent();
                      break;                   
                      case "Integer":
                      case "String":
                      case "Time":
                      case "Date":
                      case "DateTime":
                      case "Boolean":
                      case "URI":
                      case "Duration":
                      case "Image":
                           actualAttribute.value = this.getSimpleValue();  
                           actualAttribute.typePath = this.getSimpleType();
                           actualAttribute.addToTypeAttr = this.isSimpleAddToTypeAttrChecked();
                           actualAttribute.required = this.isSimpleRequiredChecked();             
                      break;
                      case "Binary":
                           actualAttribute.value = this.getSimpleValue();
                           actualAttribute.typePath = this.getSimpleType();
                           actualAttribute.addToTypeAttr = this.isSimpleAddToTypeAttrChecked();
                           actualAttribute.required = this.isSimpleRequiredChecked(); 
                      break;
                      case "Text":
                           actualAttribute.value = this.getSimpleTextareaValue().toString(); 
                           actualAttribute.typePath = this.getSimpleType();
                           actualAttribute.addToTypeAttr = this.isSimpleAddToTypeAttrChecked();
                           actualAttribute.required = this.isSimpleRequiredChecked();             
                      break;
                      case "GeoPoint":
                           actualAttribute.lat = this.getGeoPointLat(); 
                           actualAttribute.long = this.getGeoPointLong(); 
                           actualAttribute.typePath = this.getGeoPointType();
                           actualAttribute.addToTypeAttr = this.isGeoPointAddToTypeAttrChecked();
                           actualAttribute.required = this.isGeoPointRequiredChecked();                                                              
                      break;           
                      case "Entity":
                           actualAttribute.entityName = this.getEntityName();
                           actualAttribute.typePath = this.getEntityType();
                           actualAttribute.addToTypeAttr = this.isEntityAddToTypeAttrChecked();
                           actualAttribute.required = this.isEntityRequiredChecked();                                                              
                      break;
                      case "nestedAnnotation":
                           actualAttribute.selection = this.getNestedSelection(); 
                           actualAttribute.content = this.getNestedContent(); 
                           actualAttribute.typePath = this.getNestedType();
                           actualAttribute.addToTypeAttr = this.isNestedAddToTypeAttrChecked();
                           actualAttribute.required = this.isNestedRequiredChecked();

                           actualAttribute.list[actualAttribute.listPosition].annotationLink = actualAttribute.annotationLink;
                           actualAttribute.list[actualAttribute.listPosition].selectionObject = actualAttribute.selectionObject;
                           actualAttribute.list[actualAttribute.listPosition].selection = actualAttribute.selection;
                           actualAttribute.list[actualAttribute.listPosition].wholeDoc = actualAttribute.wholeDoc;
                           actualAttribute.list[actualAttribute.listPosition].suggUiTmpId = actualAttribute.suggUiTmpId;    
                      break;                                   
                      default:
                      break;           
        }    
    }  
}

// ------------------------------------------------------------- updateFieldset
/**
 * Updates fieldset due to tree node parameter
 *
 * @name updateFieldset
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {AEd.ui.core.UITreeNode} name Name of attribute   
 */
AEd.ui.DlgAnnotate.prototype.updateFieldset = function(oTreeNode) {

    if (oTreeNode) {      
       if (oTreeNode.assignedObject) {
          this.setFieldset(oTreeNode.assignedObject.fieldset);
          
          switch (oTreeNode.assignedObject.type) {
              case "Integer":
                  this.domElementSimpleInputValue.title = AEd.I18n.t("Dlg_annotate_simpletype_example_integer");
                  this.SimpleBtnPicker.hide(); 
                  this.SimpleBtnDurationPicker.hide();
                  this.elementSimpleTextareaValue.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleTextareaValueLabel.hide();
                  this.elementSimpleBinaryValueLabel.hide();
                  this.btnSimpleDownloadBinary.hide();
                  this.btnSimpleBinaryBrowse.hide();

                  this.elementSimpleInputValueLabel.show();
                  this.elementSimpleInputValue.show();
                  this.domElementSimpleInputValue.readOnly = false;
                  this.domElementSimpleInputValue.style.width = "100%";                  
              break;
              case "String":
                  this.domElementSimpleInputValue.title = AEd.I18n.t("Dlg_annotate_simpletype_example_string");
                  this.SimpleBtnPicker.hide(); 
                  this.SimpleBtnDurationPicker.hide();
                  this.elementSimpleTextareaValue.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleTextareaValueLabel.hide();
                  this.elementSimpleBinaryValueLabel.hide();
                  this.btnSimpleDownloadBinary.hide();
                  this.btnSimpleBinaryBrowse.hide();

                  this.elementSimpleInputValueLabel.show();
                  this.elementSimpleInputValue.show();
                  this.domElementSimpleInputValue.readOnly = false;
                  this.domElementSimpleInputValue.style.width = "100%"; 
              break;
              case "Time":
                  this.domElementSimpleInputValue.title = AEd.I18n.t("Dlg_annotate_simpletype_example_time");
                  this.SimpleBtnDurationPicker.hide();
                  this.elementSimpleTextareaValue.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleTextareaValueLabel.hide();
                  this.btnSimpleDownloadBinary.hide();
                  this.btnSimpleBinaryBrowse.hide();

                  this.SimpleBtnPicker.show();
                  this.elementSimpleInputValueLabel.show();
                  this.elementSimpleInputValue.show();
                  this.domElementSimpleInputValue.readOnly = false;
                  this.domElementSimpleInputValue.style.width = "70%";

                  this.SimpleBtnPicker.onClick.addHandler(function() {
                       NewCssCal(10, 10, this.domElementSimpleInputValue, this.iframeDocument, true, 'yyyyMMdd','dropdown',true,'24',true, undefined, false);                        
                  }, this); 
              break;
              case "Date":
                  this.domElementSimpleInputValue.title = AEd.I18n.t("Dlg_annotate_simpletype_example_date");
                  this.SimpleBtnDurationPicker.hide();
                  this.elementSimpleTextareaValue.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleTextareaValueLabel.hide();
                  this.elementSimpleBinaryValueLabel.hide();
                  this.btnSimpleDownloadBinary.hide();
                  this.btnSimpleBinaryBrowse.hide();

                  this.SimpleBtnPicker.show();
                  this.elementSimpleInputValueLabel.show();
                  this.elementSimpleInputValue.show();
                  this.domElementSimpleInputValue.readOnly = false;
                  this.domElementSimpleInputValue.style.width = "70%";

                  this.SimpleBtnPicker.onClick.addHandler(function() {
                       NewCssCal(10, 10, this.domElementSimpleInputValue, this.iframeDocument, true, 'yyyyMMdd');                        
                  }, this);  
              break;
              case "DateTime":
                  this.domElementSimpleInputValue.title = AEd.I18n.t("Dlg_annotate_simpletype_example_datetime");
                  this.SimpleBtnDurationPicker.hide();
                  this.elementSimpleTextareaValue.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleTextareaValueLabel.hide();
                  this.elementSimpleBinaryValueLabel.hide();
                  this.btnSimpleDownloadBinary.hide();
                  this.btnSimpleBinaryBrowse.hide();

                  this.SimpleBtnPicker.show();
                  this.elementSimpleInputValueLabel.show();
                  this.elementSimpleInputValue.show();
                  this.domElementSimpleInputValue.readOnly = false;
                  this.domElementSimpleInputValue.style.width = "70%";

                  this.SimpleBtnPicker.onClick.addHandler(function() {
                       NewCssCal(10, 10, this.domElementSimpleInputValue, this.iframeDocument, true,  'yyyyMMdd','dropdown',true,'24',true);                        
                  }, this); 
              break;
              case "Boolean":
                  this.domElementSimpleInputValue.title = AEd.I18n.t("Dlg_annotate_simpletype_example_boolean");
                  this.SimpleBtnPicker.hide(); 
                  this.SimpleBtnDurationPicker.hide();
                  this.elementSimpleTextareaValue.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleTextareaValueLabel.hide();
                  this.elementSimpleBinaryValueLabel.hide();
                  this.btnSimpleDownloadBinary.hide();
                  this.btnSimpleBinaryBrowse.hide();

                  this.elementSimpleInputValueLabel.show();
                  this.elementSimpleInputValue.show();
                  this.domElementSimpleInputValue.readOnly = false;
                  this.domElementSimpleInputValue.style.width = "100%"; 
              break;
              case "URI":
                  this.domElementSimpleInputValue.title = AEd.I18n.t("Dlg_annotate_simpletype_example_URI");
                  this.SimpleBtnPicker.hide(); 
                  this.SimpleBtnDurationPicker.hide(); 
                  this.elementSimpleTextareaValue.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleTextareaValueLabel.hide();
                  this.elementSimpleBinaryValueLabel.hide();
                  this.btnSimpleDownloadBinary.hide();
                  this.btnSimpleBinaryBrowse.hide();

                  this.elementSimpleInputValueLabel.show();
                  this.elementSimpleInputValue.show();
                  this.domElementSimpleInputValue.readOnly = false;
                  this.domElementSimpleInputValue.style.width = "100%"; 
              break;
              case "Image":
                  this.domElementSimpleInputValue.title = AEd.I18n.t("Dlg_annotate_simpletype_example_Image");
                  this.SimpleBtnPicker.hide();
                  this.SimpleBtnDurationPicker.hide(); 
                  this.elementSimpleTextareaValue.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleTextareaValueLabel.hide();
                  this.elementSimpleBinaryValueLabel.hide();
                  this.btnSimpleDownloadBinary.hide();
                  this.btnSimpleBinaryBrowse.hide();

                  this.elementSimpleInputValueLabel.show();
                  this.elementSimpleInputValue.show();
                  this.domElementSimpleInputValue.readOnly = false;
                  this.domElementSimpleInputValue.style.width = "100%"; 
              break;	
              case "Duration":
                  this.domElementSimpleInputValue.title = AEd.I18n.t("Dlg_annotate_simpletype_example_duration");
                  this.SimpleBtnPicker.hide();
                  this.elementSimpleTextareaValue.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleTextareaValueLabel.hide();
                  this.elementSimpleBinaryValueLabel.hide();
                  this.btnSimpleDownloadBinary.hide();
                  this.btnSimpleBinaryBrowse.hide();

                  this.SimpleBtnDurationPicker.show();
                  this.elementSimpleInputValueLabel.show();
                  this.elementSimpleInputValue.show();
                  this.domElementSimpleInputValue.readOnly = false;
                  this.domElementSimpleInputValue.style.width = "70%"; 

                  this.SimpleBtnDurationPicker.onClick.addHandler(function() {
                       this.durationPicker.showPicker();
                  }, this);
              break;  
              case "Binary":
                  this.domElementSimpleInputValue.title = AEd.I18n.t("Dlg_annotate_simpletype_example_binary");
                  this.SimpleBtnPicker.hide();
                  this.SimpleBtnDurationPicker.hide();
                  this.elementSimpleTextareaValue.hide();
                  this.elementSimpleTextareaValueLabel.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleBinaryValueLabel.hide();
                  this.btnSimpleBinaryBrowse.show();

                  this.elementSimpleInputValueLabel.show();
                  this.elementSimpleInputValue.show();
                  this.btnSimpleDownloadBinary.show();
 
                  this.domElementSimpleInputValue.readOnly = true;
                  this.domElementSimpleInputValue.style.width = "70%"; 
              break; 
              case "Text":
                  this.domElementSimpleInputValue.title = AEd.I18n.t("Dlg_annotate_simpletype_example_text");
                  this.SimpleBtnPicker.hide();
                  this.SimpleBtnDurationPicker.hide();
                  this.elementSimpleInputValue.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleBinaryValueLabel.hide();
                  this.elementSimpleInputValueLabel.hide();
                  this.btnSimpleDownloadBinary.hide();
                  this.btnSimpleBinaryBrowse.hide();

                  this.elementSimpleTextareaValueLabel.show();
                  this.elementSimpleTextareaValue.show();
                  this.domElementSimpleTextareaValue.style.verticalAlign = "top";
                  this.domElementSimpleTextareaValueLabel.style.verticalAlign = "top";
                  this.domElementSimpleInputValue.readOnly = false;
                  this.domElementSimpleInputValue.style.width = "100%";  
              break;     
              case "GeoPoint":
                  this.domElementGeoPointInputLat.title = AEd.I18n.t("Dlg_annotate_simpletype_example_geopointlat");
                  this.domElementGeoPointInputLong.title = AEd.I18n.t("Dlg_annotate_simpletype_example_geopointlong");
                  this.SimpleBtnPicker.hide(); 
                  this.SimpleBtnDurationPicker.hide();
                  this.elementSimpleTextareaValue.hide();
                  this.elementSimpleTextareaValueLabel.hide();
                  this.elementSimpleInputValueLabel.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleBinaryValueLabel.hide();
                  this.btnSimpleDownloadBinary.hide();
                  this.btnSimpleBinaryBrowse.hide();

                  this.elementSimpleInputValue.show();
                  this.domElementSimpleInputValue.readOnly = false;
                  this.domElementSimpleInputValue.style.width = "100%"; 
              break;
              default:
                  this.domElementSimpleInputValue.title = null;
                  this.domElementGeoPointInputLat.title = null;
                  this.domElementGeoPointInputLong.title = null; 
                  this.SimpleBtnPicker.hide(); 
                  this.SimpleBtnDurationPicker.hide();
                  this.elementSimpleTextareaValue.hide();
                  this.elementSimpleTextareaValueLabel.hide();
                  this.elementSimpleBinaryValue.hide();
                  this.elementSimpleBinaryValueLabel.hide();
                  this.btnSimpleDownloadBinary.hide();
                  this.btnSimpleBinaryBrowse.hide();

                  this.elementSimpleInputValueLabel.show();
                  this.elementSimpleInputValue.show();
                  this.domElementSimpleInputValue.readOnly = false;
                  this.domElementSimpleInputValue.style.width = "100%"; 
              break;
          }
          
          switch (oTreeNode.assignedObject.type) {
                  case "Annotation":
                      this.btnAddAttribute.setDisabled(false);
                      this.btnEntity.setDisabled(false);
                      this.btnDeleteAttribute.setDisabled(true);
                      this.btnClearAttribute.setDisabled(true);
                      this.setSelection(oTreeNode.assignedObject.selection); 
                      this.setContent(oTreeNode.assignedObject.content); 
                      this.setType(oTreeNode.assignedObject.typePath);
                      if (oTreeNode.assignedObject.wholeDoc) {
                          this.btnWholeDoc.setSelected(true);
                      } 
                      else {
                          this.btnWholeDoc.setSelected(false);
                      }                     
                  break;                   
                  case "Integer":
                  case "String":
                  case "Time":
                  case "Date":
                  case "DateTime":
                  case "Boolean":
                  case "URI":
                  case "Duration":
                  case "Binary":
                  case "Text":
                  case "Image":
                       this.btnAddAttribute.setDisabled(true);
                       this.btnEntity.setDisabled(true);
                       this.btnDeleteAttribute.setDisabled(false);
                       this.btnClearAttribute.setDisabled(false);
                       this.setSimpleType(oTreeNode.assignedObject.typePath);
                       this.setSimpleValue(oTreeNode.assignedObject.value);
                       this.setSimpleTextareaValue(oTreeNode.assignedObject.value);

                       this.elementRequiredWrapperSimple.hide();
                       this.domElementCheckboxRequiredSimple.disabled = true;
                       this.domElementCheckboxAddToTypeAttrSimple.checked = oTreeNode.assignedObject.addToTypeAttr;
                       if (oTreeNode.assignedObject.addToTypeAttr) {
                           this.elementRequiredWrapperSimple.show();
                           this.domElementCheckboxRequiredSimple.disabled = false;
                        }
                        this.domElementCheckboxRequiredSimple.checked = oTreeNode.assignedObject.required;
                       
                       if (oTreeNode.assignedObject.isAttrOfLinkedAnnotation) {
                           this.btnDeleteAttribute.setDisabled(true);
                           this.btnClearAttribute.setDisabled(true);
                           this.domElementSimpleInputType.disabled = true;
                           this.btnSimpleBrowse.setDisabled(true);
                           this.domElementSimpleInputValue.disabled = true;
                           this.elementAddToTypeAttrWrapperSimple.hide();    
                       }
                       else {
                           this.domElementSimpleInputType.disabled = false;
                           this.btnSimpleBrowse.setDisabled(false);
                           this.domElementSimpleInputValue.disabled = false;
                           this.elementAddToTypeAttrWrapperSimple.show();
                       }                  
                  break;
                  case "GeoPoint":
                       this.btnAddAttribute.setDisabled(true);
                       this.btnEntity.setDisabled(true);
                       this.btnDeleteAttribute.setDisabled(false);    
                       this.btnClearAttribute.setDisabled(false);              
                       this.setGeoPointType(oTreeNode.assignedObject.typePath);
                       this.setGeoPointLat(oTreeNode.assignedObject.lat);  
                       this.setGeoPointLong(oTreeNode.assignedObject.long);
                       
                       this.elementRequiredWrapperGeoPoint.hide();
                       this.domElementCheckboxRequiredGeoPoint.disabled = true;
                       this.domElementCheckboxAddToTypeAttrGeoPoint.checked = oTreeNode.assignedObject.addToTypeAttr;
                       if (oTreeNode.assignedObject.addToTypeAttr) {
                           this.elementRequiredWrapperGeoPoint.show();
                           this.domElementCheckboxRequiredGeoPoint.disabled = false;
                        }
                        this.domElementCheckboxRequiredGeoPoint.checked = oTreeNode.assignedObject.required;
                       
                       if (oTreeNode.assignedObject.isAttrOfLinkedAnnotation) {
                           this.btnDeleteAttribute.setDisabled(true);
                           this.btnClearAttribute.setDisabled(true);
                           this.domElementGeoPointInputType.disabled = true;
                           this.btnGeoPointBrowse.setDisabled(true);
                           this.domElementGeoPointInputLat.disabled = true;
                           this.domElementGeoPointInputLong.disabled = true;
                           this.elementAddToTypeAttrWrapperGeoPoint.hide();    
                       }
                       else {
                           this.domElementGeoPointInputType.disabled = false;
                           this.btnGeoPointBrowse.setDisabled(false);
                           this.domElementGeoPointInputLat.disabled = false;
                           this.domElementGeoPointInputLong.disabled = false;
                           this.elementAddToTypeAttrWrapperGeoPoint.show();
                       }                                                                  
                  break;  
                  case "Entity":
                       this.btnAddAttribute.setDisabled(true);
                       this.btnEntity.setDisabled(true);
                       this.btnClearAttribute.setDisabled(false);
                       this.btnDeleteAttribute.setDisabled(false);  
                       this.setEntityType(oTreeNode.assignedObject.typePath);
                       this.setEntityName(oTreeNode.assignedObject.entityName);
                       this.setEntityDescription(oTreeNode.assignedObject.entityDescription);
                       this.setEntityImage(oTreeNode.assignedObject.entityImage);
                       this.lastEntityName = "";
                       this.suggestionsBarEntityName.removeAllItems();
                       this.entitiesReceived = false;
                       
                       this.elementRequiredWrapperEntity.hide();
                       this.domElementCheckboxRequiredEntity.disabled = true;
                       this.domElementCheckboxAddToTypeAttrEntity.checked = oTreeNode.assignedObject.addToTypeAttr;
                       if (oTreeNode.assignedObject.addToTypeAttr) {
                           this.elementRequiredWrapperEntity.show();
                           this.domElementCheckboxRequiredEntity.disabled = false;
                        }
                        this.domElementCheckboxRequiredEntity.checked = oTreeNode.assignedObject.required;
                       
                       if (oTreeNode.assignedObject.isAttrOfLinkedAnnotation) {
                           this.btnDeleteAttribute.setDisabled(true);
                           this.btnClearAttribute.setDisabled(true); 
                           this.domElementEntityInputType.disabled = true;
                           this.btnEntityBrowse.setDisabled(true);
                           this.domElementEntityInputName.disabled = true;
                           this.elementAddToTypeAttrWrapperEntity.hide();    
                       }
                       else {
                           this.domElementEntityInputType.disabled = false;
                           this.btnEntityBrowse.setDisabled(false);
                           this.domElementEntityInputName.disabled = false;
                           this.elementAddToTypeAttrWrapperEntity.show();
                       }                                                                  
                  break;
                  case "nestedAnnotation":
                        if (!oTreeNode.assignedObject.selectionObject && !oTreeNode.assignedObject.annotationLink && !oTreeNode.assignedObject.wholeDoc) {
                            this.domElementNestedInputSelection.style.color = AEd.CONFIG.DEFAULT_WARNING_COLOR;
                        }
                        else {
                            this.domElementNestedInputSelection.style.color = null;
                        }
                  
                       if (oTreeNode.assignedObject.annotationLink) {
                          this.btnAddAttribute.setDisabled(true);
                          this.btnEntity.setDisabled(true);
                          this.domElementNestedInputContent.disabled = true;
                       }
                       else {
                          this.btnAddAttribute.setDisabled(false);
                          this.btnEntity.setDisabled(false);
                          this.domElementNestedInputContent.disabled = false;
                       }
                       
                       this.btnDeleteAttribute.setDisabled(false);        
                       this.btnClearAttribute.setDisabled(false);          
                       this.setNestedType(oTreeNode.assignedObject.typePath);
                       this.setNestedSelection(oTreeNode.assignedObject.selection);   
                       this.setNestedContent(oTreeNode.assignedObject.content);                                             
                       if (oTreeNode.assignedObject.wholeDoc) {
                           this.btnNestedWholeDoc.setSelected(true);
                       } 
                       else {
                           this.btnNestedWholeDoc.setSelected(false);
                       }
                       
                       this.elementRequiredWrapperNested.hide();
                       this.domElementCheckboxRequiredNested.disabled = true;
                       this.domElementCheckboxAddToTypeAttrNested.checked = oTreeNode.assignedObject.addToTypeAttr;
                       if (oTreeNode.assignedObject.addToTypeAttr) {
                           this.elementRequiredWrapperNested.show();
                           this.domElementCheckboxRequiredNested.disabled = false;
                        }
                        this.domElementCheckboxRequiredNested.checked = oTreeNode.assignedObject.required;
                       
                       if (oTreeNode.assignedObject.isAttrOfLinkedAnnotation) {
                           this.btnDeleteAttribute.setDisabled(true);
                           this.btnClearAttribute.setDisabled(true);
                           this.btnAddAttribute.setDisabled(true);
                           this.btnEntity.setDisabled(true);
                           this.btnNestedSelect.setDisabled(true);
                           this.btnNestedWholeDoc.setDisabled(true);
                           this.domElementNestedInputType.disabled = true;
                           this.btnNestedBrowse.setDisabled(true);
                           this.domElementNestedInputContent.disabled = true;
                           this.elementAddToTypeAttrWrapperNested.hide();    
                       }
                       else {
                           this.btnNestedSelect.setDisabled(false);
                           this.btnNestedWholeDoc.setDisabled(false);
                           this.domElementNestedInputType.disabled = false;
                           this.btnNestedBrowse.setDisabled(false);
                           this.elementAddToTypeAttrWrapperNested.show();
                       }                                                              
                  break;                                   
                  default:
                  break;           
          }
       }
    } 
}

// --------------------------------------------------------- setSelectionObject
/**
 * Sets selection object of current nested annotation or main annotation
 *
 * @name setSelectionObject
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {Selection} oSelection Selection object.  
 */
AEd.ui.DlgAnnotate.prototype.setSelectionObject = function(oSelection) {
    
    if (!this.modeAnnotationLink && oSelection != null && oSelection.selection.length > 0 && this.nestedListCheckAttribute("nestedAnnotation")) {


        if (this.tree && oSelection) {
        
            var actualTreeNode = this.tree.getSelectedTreeNode();
            var actualAttribute = actualTreeNode ? actualTreeNode.assignedObject : null;
            
            if (actualAttribute) {
                switch (actualAttribute.type) {
                              case "nestedAnnotation":
                                  this.onNestedSet.fire();
                              case "Annotation":
                                  this.storeAttribute(actualTreeNode);
                                  actualAttribute.selectionObject = oSelection;
                                  actualAttribute.annotationLink = null;
                                  actualAttribute.wholeDoc = false;
                                  actualAttribute.selection = oSelection.toString();
                                  this.updateFieldset(actualTreeNode);
                                  actualAttribute.nestedAnnotationNoEdit = false;
                              break;                                                    
                              default:
                              break;           
                }              
            }        
        }
        this.domElementNestedInputSelection.style.color = null;
    }  
}

// --------------------------------------------------------- setAnnotationLink
/**
 * Sets annotation uri when user has selected annotation from document.
 *
 * @name setAnnotationLink
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {AEd.entites.Annotation} oAnnotation Selected annotation.
 * @param (AEd.entities.TypesManager) types All annotations types.   
 */
AEd.ui.DlgAnnotate.prototype.setAnnotationLink = function(oAnnotation, types) {



    if (this.btnNestedSelect.isSelected) {
        this.btnNestedSelect.setSelected(false);         
    }  
    
    this.modeAnnotationLink = false;
    
    if (this.tree && oAnnotation) {
    
        var actualTreeNode = this.tree.getSelectedTreeNode();
        var actualAttribute = actualTreeNode ? actualTreeNode.assignedObject : null;
        
        if (actualAttribute) {
            switch (actualAttribute.type) {
                          case "nestedAnnotation":
                          case "annotationLink":
                           
                              var node = this.tree.getSelectedTreeNode();
                              var iAttr = 0;
                              while (iAttr < node.childTreeNodes.length) {
                                  node.removeChild(node.childTreeNodes[iAttr]);
                              }                            
                              this.loadAnnotation(oAnnotation, types, true);
                               
                              this.storeAttribute(actualTreeNode);                         
                              this.setAnnotateWholeDoc(false); 
                              this.btnNestedWholeDoc.setSelected(false); 
                              actualAttribute.wholeDoc = false;
                                                            
                              actualAttribute.annotationLink = oAnnotation.uri || oAnnotation.tmpId;
                              actualAttribute.selectionObject = null;
                              
                              actualAttribute.selection = oAnnotation.uri || oAnnotation.tmpId + ": ";
                              if (oAnnotation.fragments && oAnnotation.fragments.length) {
                                  for (var j = 0; j < oAnnotation.fragments.length; j++ ) {
                                      actualAttribute.selection += oAnnotation.fragments[j].fragmentText;
                                  }
                             }
                              
                              actualAttribute.content = oAnnotation.content || "";
  
                              this.domElementNestedInputSelection.style.color = null;
                              this.updateFieldset(actualTreeNode);
                              
                              // ---------- hide annotation link attributes and content if more than one
                              var linkCount = 0;
                              for (var i in actualAttribute.list) {
                                  if (actualAttribute.list[i].annotationLink) {
                                      linkCount++;
                                  }    
                              }
                              if (linkCount >= 1) {
                                  // removes attributes
                                  var iAttr = 0;
                                  while (iAttr < node.childTreeNodes.length) {
                                      node.removeChild(node.childTreeNodes[iAttr]);
                                  }
                                  // hides content
                                  this.elementNestedInputContentWrapper.hide();
                              }
                          break;                                                    
                          default:
                          break;           
            }
        }
    }      
}

// --------------------------------------------------------------- removeAttrsFromLinkedAnnotation
/**
 * Removes all attributes from linked annotation
 *
 * @name removeAttrsFromLinkedAnnotation
 * @memberOf AEd.ui.DlgAnnotate 
 * @function
 * @param {AEd.ui.core.UITreeNode} node Tree node  
 */
AEd.ui.DlgAnnotate.prototype.removeAttrsFromLinkedAnnotation = function(node) {
    if (node.assignedObject.annotationLink) {
        node.assignedObject.content = "";
        this.updateFieldset(node);
        var iAttr = 0;
        while (iAttr < node.childTreeNodes.length) {
            node.removeChild(node.childTreeNodes[iAttr]);
        }
    }
}

// -------------------------------------------------------- setAnnotateWholeDoc
/**
 * Sets selection to whole document
 *
 * @name setAnnotateWholeDoc
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {Boolean} value Annotate whole doc or not.  
 */
AEd.ui.DlgAnnotate.prototype.setAnnotateWholeDoc = function(value) {

    if (this.tree) {
    
        var actualTreeNode = this.tree.getSelectedTreeNode();
        var actualAttribute = actualTreeNode ? actualTreeNode.assignedObject : null;
        
        if (actualAttribute) {
            switch (actualAttribute.type) {
                          case "nestedAnnotation":                            
                          case "Annotation":
                              this.storeAttribute(actualTreeNode);
                              actualAttribute.selectionObject = null;
                              actualAttribute.annotationLink = null;
                              if (value) {
                                  this.modeWholeDoc = true;
                                  actualAttribute.wholeDoc = true;
                                  actualAttribute.selection = AEd.I18n.t("Dlg_annotate_selection_whole_doc");
                                  if (this.btnNestedSelect.isSelected) {
                                      this.btnNestedSelect.setSelected(false);
                                      this.modeAnnotationLink = false;
                                      this.onSelectAnnotationLink.fire(false);         
                                  }
                              }
                              else {
                                  this.modeWholeDoc = false;
                                  actualAttribute.wholeDoc = false;
                                  actualAttribute.selection = "";                              
                              }
                              this.updateFieldset(actualTreeNode);
                          break;                                                    
                          default:
                          break;           
            }    
        
        }        
    
    }      
}

// -------------------------------------------------------------- getAnnotation
/**
 * Returns created annotation with attributes
 *
 * @name getAnnotation
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @return {Object} Created annotation with attributes.  
 */
AEd.ui.DlgAnnotate.prototype.getAnnotation = function() {

    
    var fnGetAttributes = function (aTreeNodes) {
        var aAttributes = new Array();
        if (aTreeNodes) {
             for (var i = 0; i < aTreeNodes.length; i++) {
                  
                  if (aTreeNodes[i].assignedObject.type == "nestedAnnotation") {
                      aTreeNodes[i].assignedObject.attributes = arguments.callee(aTreeNodes[i].childTreeNodes);
                  }
                  aAttributes.push(aTreeNodes[i].assignedObject);                  
             }
        }        
        return aAttributes;  
    };

    if (this.tree && this.treeNodeAnnotation) { 

        var oAnnotation = this.treeNodeAnnotation.assignedObject;
        oAnnotation.attributes = fnGetAttributes(this.treeNodeAnnotation.childTreeNodes);
        return oAnnotation;
    }   
    else {
        return null;
    }   
}

// ------------------------------------------------------------- loadAnnotation
/**
 * Loads annotation to dialog to enable editing
 *
 * @name loadAnnotation
 * @memberOf AEd.ui.DlgAnnotate 
 * @function  
 * @param {AEd.entities.Annotation} annotation Annotation to load.
 * @param {AEd.entities.TypesManager} types All annotations types. 
 * @param {Boolean} annotationLink annotation is linked
 * @param {Boolean} clearAnnoLinkURIs clear annotationLinkUri array (prevent mutual linking loops)
 * @param {Boolean} clearSuggLinkTmpIds clear suggLinkUri array (prevent mutual linking loops)
 */
AEd.ui.DlgAnnotate.prototype.loadAnnotation = function(annotation, types, annotationLink, clearAnnoLinkURIs, clearSuggLinkTmpIds) {

    if (annotation) {

        this.annotationLinkURIs = clearAnnoLinkURIs ? new Array() : this.annotationLinkURIs;   // Mutual linking loop prevention
        this.suggestionLinkTmpIds = clearSuggLinkTmpIds ? new Array() : this.suggestionLinkTmpIds;  

        if (!annotationLink) {
            this.reset();
            this.modeEditAnnotation = true;
            // ROOT ANNOTATION
            var oAnnotation = {}
            oAnnotation.type = "Annotation";
            oAnnotation.fieldset = "Annotation";          
            oAnnotation.typePath = (annotation.annoType && annotation.annoType.path) ? annotation.annoType.path : types.getPathByURI(annotation.typeUri);
            oAnnotation.fragments = annotation.fragments;       
            oAnnotation.content = annotation.content || "";  
            oAnnotation.selectionObject = null;
            oAnnotation.selection = "";
        
            oAnnotation.uri = annotation.uri;
        
            var wholeDoc = false;
            if (oAnnotation.fragments && oAnnotation.fragments.length) {
                for (var i = 0; i < oAnnotation.fragments.length; i++ ) {
                    oAnnotation.selection += oAnnotation.fragments[i].fragmentText;   
                }
            }        
            else { // document annotation           
                wholeDoc = true; 
            }
       
            this.treeNodeAnnotation.setAssignedObject(oAnnotation);
            this.updateFieldset(this.treeNodeAnnotation);
            if (wholeDoc) {
                this.setAnnotateWholeDoc(true);
            }
        }

        // ATTRIBUTES
        
        var fnCreateAttributes = function(treeNode, types, annotation) {
            
            var typeAttributes = types.typesByURI[annotation.typeUri].attributes;
            var attributes = annotation.attributes;
            
            if (treeNode && attributes && attributes.length) {
                var isAttrOfLinkedAnnotation = annotationLink ? true : false;
                for (var i = 0; i < attributes.length; i++) {
                    
                    var addToType = false;
                    var required = false;
                    for(var j = 0; j < typeAttributes.length; j++)
                    {
                        if(attributes[i].name == typeAttributes[j].name && attributes[i].type == typeAttributes[j].type)
                        {
                            addToType = true;
                            required = typeAttributes[j].required;
                            break;
                        }
                    }
                    
                    // load lists of annotations - first item already loaded
                     if (attributes[i].type == "nestedAnnotation" || attributes[i].type == "annotationLink") {
                        var insertedToList = false;
                        var node = this.tree.getSelectedTreeNode();
                        for (var j in node.childTreeNodes) {
                            var nodeObject = node.childTreeNodes[j].assignedObject;
                            
                            if (nodeObject.name == attributes[i].name && nodeObject.type == "nestedAnnotation" && attributes[i].type == "nestedAnnotation") {                               
                                var obj = {};
                                obj.annotationLink = null;
                                obj.fragments = attributes[i].annotation.fragments;
                                obj.selection = "";
                                
                                obj.wholeDoc = false;
                                if (attributes[i].fragments && attributes[i].fragments.length) {
                                    obj.selectionObject = true;
                                    for (var k = 0; k < attributes[i].fragments.length; k++ ) {
                                        obj.selection += attributes[i].fragments[k].fragmentText;
                                    }
                                }        
                                else { // document annotation
                                    obj.wholeDoc = true;
                                    obj.selectionObject = false;
                                    obj.selection = AEd.I18n.t("Dlg_annotate_selection_whole_doc");                                      
                                }

                                nodeObject.list.push(obj);
                                insertedToList = true;
                                break;
                            }  
                            else if (nodeObject.name == attributes[i].name && nodeObject.type == "nestedAnnotation" && attributes[i].type == "annotationLink") {
                                var node;
                                this.onLoadAnnotationLinkSetSelection.fire(attributes[i].value || attributes[i].tmpId, node); 
                                nodeObject.list.push({
                                    annotationLink: attributes[i].value || attributes[i].tmpId,
                                    selectionObject: null,
                                    selection: node.selection,
                                    wholeDoc: false    
                                });
                                
                                // removes attributes, because more than one annotation link
                                var iAttr = 0;
                                while (iAttr < node.childTreeNodes[j].childTreeNodes.length) {
                                    node.childTreeNodes[j].removeChild(node.childTreeNodes[j].childTreeNodes[iAttr]);
                                }
                                insertedToList = true;
                                break;
                            }
                        }
                        if (insertedToList) {
                            continue;    
                        }
                     }
                
                     switch(attributes[i].type) {
                         case "String":
                         case "Integer":
                         case "Time":
                         case "Date":
                         case "DateTime":  
                         case "Boolean":
                         case "URI":
                         case "Duration":
                         case "Binary":
                         case "Text":
                         case "Image":
                             oType = {};
                             oType.simpleType = true;
                             oType.name = attributes[i].type;
                             oType.path = attributes[i].type;                             
                             
                             this.addAttribute(attributes[i].name, oType, addToType, required, isAttrOfLinkedAnnotation);
                             this.setSimpleValue(attributes[i].value);  
                             this.setSimpleTextareaValue((attributes[i].value || "")); 
                             this.base64.setEncodedData(attributes[i].value);                           
                             this.tree.setSelectedTreeNode(treeNode);                                                                                                             
                         break;

                         case "GeoPoint":  
                             oType = {};
                             oType.simpleType = true;
                             oType.name = attributes[i].type;
                             oType.path = attributes[i].type;
                                                  
                             this.addAttribute(attributes[i].name, oType, addToType, required, isAttrOfLinkedAnnotation);
                             this.setGeoPointLat(attributes[i].lat || "");      
                             this.setGeoPointLong(attributes[i].long || "");                        
                             this.tree.setSelectedTreeNode(treeNode);                                                         
                         break;
                         
                         case "Entity":
                             oType = {};
                             oType.simpleType = true;
                             oType.name = attributes[i].type;
                             oType.path = attributes[i].type;
                             oType.entityName = attributes[i].entityName;
                             oType.entityDescription = attributes[i].entityDescription;
                             oType.entityImage = attributes[i].entityImage;
                             oType.entityURI = attributes[i].entityURI;
                             oType.entityType = attributes[i].entityType;
                             oType.entityIsSelected = attributes[i].entityIsSelected;

                             this.addAttribute(attributes[i].name, oType, addToType, required, isAttrOfLinkedAnnotation);
                             this.setEntityName(attributes[i].entityName || "");  
                             this.tree.setSelectedTreeNode(treeNode);                                                         
                         break;
                         
                         case "annotationLink": 
                             oType = {};
                             oType.simpleType = false;
                             oType.name = "nestedAnnotation";

                             oType.path = attributes[i].annoTypePath ? attributes[i].annoTypePath : attributes[i].name;    
                       
                             if (attributes[i].annoTypePath){  // Type is known
                             
                                oType.color = (types.getTypeByPath(attributes[i].annoTypePath) && (types.getTypeByPath(attributes[i].annoTypePath)).color) ? (types.getTypeByPath(attributes[i].annoTypePath)).color : (types.getTypeByPath(attributes[i].name.replace(/\//g, "->"))).color;
                             }

                             else {  // Type is unknown
 
                                oType.color = AEd.CONFIG.DEFAULT_TYPE_COLOR;  // Select default color
                             }

                             this.addAttribute(attributes[i].name, oType, addToType, required, isAttrOfLinkedAnnotation);
                             
                             var newNode = this.tree.getSelectedTreeNode();

                             newNode.assignedObject.annotationLink = attributes[i].value || attributes[i].tmpId;
                             newNode.assignedObject.selection = attributes[i].value || attributes[i].tmpId + ": ";                          
                             newNode.assignedObject.list[0].annotationLink = newNode.assignedObject.annotationLink;
                             newNode.assignedObject.list[0].selection = newNode.assignedObject.selection;
                             newNode.assignedObject.list[0].wholeDoc = false;
                             newNode.assignedObject.list[0].selectionObject = null; 

                             this.updateFieldset(newNode);

                             if ((!attributes[i].tmpId && !this.annotationLinkURIs[attributes[i].value]) || (attributes[i].tmpId && !this.suggestionLinkTmpIds[attributes[i].tmpId])){  // Mutual linking  prevention

                                this.onSetAnnotationLink.fire(attributes[i].value || attributes[i].tmpId, this.annotationLinkURIs);  
                             }
 

                             this.tree.setSelectedTreeNode(treeNode);                          
                                                                               
                         break;    
                         
                         case "nestedAnnotation": 
                             oType = {};
                             oType.simpleType = false;
                             oType.name = attributes[i].type;

                             oType.path = (attributes[i].annotation && attributes[i].annotation.annoType && attributes[i].annotation.annoType.path) ? attributes[i].annotation.annoType.path : types.getPathByURI(attributes[i].typeUri); 

                             oType.color = (attributes[i].annotation && attributes[i].annotation.annoType && attributes[i].annotation.annoType.color) ? attributes[i].annotation.annoType.color : (types.getTypeByURI(attributes[i].typeUri)).color;

                             this.addAttribute(attributes[i].name, oType, addToType, required, isAttrOfLinkedAnnotation);
                             
                             var newNode = this.tree.getSelectedTreeNode();
                             var newNodeAttrObject = newNode.getAssignedObject();                              
                             
                             newNodeAttrObject.fragments = (attributes[i].annotation && attributes[i].annotation.fragments) ? attributes[i].annotation.fragments : attributes[i].fragments;

                             newNodeAttrObject.content = (attributes[i].annotation && attributes[i].annotation.content) ? (attributes[i].annotation.content || "") : (attributes[i].content || "");

                             newNodeAttrObject.selectionObject = null;
                             newNodeAttrObject.selection = ""; 
                             newNodeAttrObject.uri = (attributes[i].annotation && attributes[i].annotation.uri) ? attributes[i].annotation.uri : attributes[i].uri;          
                             newNodeAttrObject.nestedAnnotationNoEdit = true; // because of true selectionObject
                             if (attributes[i].tmpId) {
                                newNodeAttrObject.suggUiTmpId = attributes[i].tmpId;
                             }
                                            
                             var wholeDoc = false;
                             if (newNodeAttrObject.fragments && newNodeAttrObject.fragments.length) {
                                  newNodeAttrObject.selectionObject = true;
                                  for (var j = 0; j < newNodeAttrObject.fragments.length; j++ ) {
                                      newNodeAttrObject.selection += newNodeAttrObject.fragments[j].fragmentText;
                                  }
                             }        
                             else { // document annotation
                                  wholeDoc = true;                                      
                             }                                            

                             this.updateFieldset(newNode);
                             if (wholeDoc) {
                                  this.setAnnotateWholeDoc(true);
                             }                
                             
                             // save to list of annotations
                             if (newNodeAttrObject.fragments && newNodeAttrObject.fragments.length) {
                                newNodeAttrObject.list[0].fragments = new Array();
                                for (var j = 0; j < newNodeAttrObject.fragments.length; j++ ) {
                                    newNodeAttrObject.list[0].fragments.push(newNodeAttrObject.fragments[j]);
                                }
                             }
                             newNodeAttrObject.list[0].selectionObject = newNodeAttrObject.selectionObject;
                             newNodeAttrObject.list[0].selection = newNodeAttrObject.selection;
                             newNodeAttrObject.list[0].wholeDoc = wholeDoc;
                             // already saved 
                             

                             // load attributes
                             if (attributes[i]) {     
                                  arguments.callee.call(this, newNode, types, attributes[i]);
                             }
                   
                             this.tree.setSelectedTreeNode(treeNode);    

                         break;                                                 
                         
                         default:

                            // nested attribute without annotation
                            this.onLoadAnnotation.fire(treeNode, attributes[i], addToType, required, isAttrOfLinkedAnnotation);
                                                  
                         break;
                     }
                }            
            }        
        };
        
        var node;
        if (!annotationLink) {
            node = this.treeNodeAnnotation;
        }
        else {
            node = this.tree.getSelectedTreeNode();
        }

        fnCreateAttributes.call(this, node, types, annotation);    
    }  
}

// --------------------------------------------------------------- setServerUri
/**
 * Sets server uri.
 *
 * @name setServerUri
 * @memberOf AEd.ui.DlgAnnotate 
 * @function
 * @param {AEd.comm} server Server uri    
 * @return {String} Server uri
 */
AEd.ui.DlgAnnotate.prototype.setServerUri = function(server) {
    this.serverUri = server;
}

// --------------------------------------------------------------- getTypeOfNestedAnnotation
/**
 * Extracts type of nested attribute from type uri
 *
 * @name getTypeOfNestedAnnotation
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @return {String} Type of nested attribute
 */
AEd.ui.DlgAnnotate.prototype.getTypeOfNestedAnnotation = function(typeOfAttr) {
    // get server URI without suffix
    var uri = this.serverUri;
    var serverUriSuffix = AEd.CONFIG.DEFAULT_SERVER_URI_SUFFIX;
    uri = uri.substr(0, uri.search(serverUriSuffix));
    // get type prefix
    var typePrefix = AEd.CONFIG.DEFAULT_TYPE_URN_PREFIX;
    // get type of nested attribute
    typeOfAttr = typeOfAttr.substr(typeOfAttr.search(uri));
    typeOfAttr = typeOfAttr.substr(uri.length);
    typeOfAttr = typeOfAttr.substr(typeOfAttr.search(typePrefix));
    typeOfAttr = typeOfAttr.substr(typePrefix.length);
    typeOfAttr = typeOfAttr.substr(typeOfAttr.search("/") + 1);
    typeOfAttr = typeOfAttr.replace(/\//g, "->");
    return typeOfAttr;
}

// --------------------------------------------------------------- elementInputTypeKeyDown
/**
 * Suggestion bar control when key down
 *
 * @name elementInputTypeKeyDown
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @param {String} typeOfAttribute Type of attribute
 * @param e Event 
 */
AEd.ui.DlgAnnotate.prototype.elementInputTypeKeyDown = function(typeOfAttribute, e) {
    var suggestion;
    switch (typeOfAttribute) {
        case "Annotation":
            suggestion = this.suggestionsBar;
        break;
        case "Simple":
            suggestion = this.suggestionsBarSimple;
        break;
        case "GeoPoint":
            suggestion = this.suggestionsBarGeoPoint;
        break;
        case "Entity":
            suggestion = this.suggestionsBarEntity;
        break;
        case "NestedAnnotation":
            suggestion = this.suggestionsBarNested;
        break;
    }
    
    var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event); 
    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 40: // down arrow
            suggestion.selectNextItem();
            suggestion.show();
            AEd.Events.preventDefault(event);
        break;
                   
        case 38: // up arrow
            suggestion.selectPreviousItem();
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
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @param {String} typeOfAttribute Type of attribute
 * @param e Event 
 */
AEd.ui.DlgAnnotate.prototype.elementInputTypeKeyUp = function(typeOfAttribute, e) {
    var suggestion, type;
    switch (typeOfAttribute) {
        case "Annotation":
            suggestion = this.suggestionsBar;
            type = function() {
                if (suggestion.selectedItem.isSimpleType()) {
                    this.setType(suggestion.selectedItem.getName());
                }
                else if (!suggestion.selectedItem.isSimpleType()) {
                    this.setType(suggestion.selectedItem.getText());
                }   
            };
        break;
        case "Simple":
            suggestion = this.suggestionsBarSimple;
            type = function() {
                if (suggestion.selectedItem.isSimpleType()) {
                    this.setSimpleType(suggestion.selectedItem.getName());
                }
                else if (!suggestion.selectedItem.isSimpleType()) {
                    this.setSimpleType(suggestion.selectedItem.getText());
                }
            };
        break;
        case "GeoPoint":
            suggestion = this.suggestionsBarGeoPoint;
            type = function() {
                if (suggestion.selectedItem.isSimpleType()) {
                    this.setGeoPointType(suggestion.selectedItem.getName());
                }
                else if (!suggestion.selectedItem.isSimpleType()) {
                    this.setGeoPointType(suggestion.selectedItem.getText());
                }
            };
        break;
        case "Entity":
            suggestion = this.suggestionsBarEntity;
            type = function() {
                if (suggestion.selectedItem.isSimpleType()) {
                    this.setEntityType(suggestion.selectedItem.getName());
                }
                else if (!suggestion.selectedItem.isSimpleType()) {
                    this.setEntityType(suggestion.selectedItem.getText());
                }
            };
        break;
        case "NestedAnnotation":
            suggestion = this.suggestionsBarNested;
            type = function() {
                if (suggestion.selectedItem.isSimpleType()) {
                    this.setNestedType(suggestion.selectedItem.getName());
                }
                else if (!suggestion.selectedItem.isSimpleType()) {
                    this.setNestedType(suggestion.selectedItem.getText());
                }
            };
        break;
    }    
    
    var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event);
    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 13: // enter or right arrow
        case 39:
            if (!suggestion.isHidden) {
                if (suggestion.selectedItem) {
                    type.call(this);
                    this.onInputTypeSelect.fire(typeOfAttribute, suggestion.selectedItem.isSimpleType());        
                }
                else if (this.tree.getSelectedTreeNode().selectedTreeNode) {
                    this.updateAttributeFromSimpleToNested(this.tree.getSelectedTreeNode());
                }
                else {
                    this.onInputTypeSelect.fire(typeOfAttribute, false);
                }
                
                suggestion.hide();
            }
        break;
                                     
        default:
            if ( ((code > 31) && (code != 37) && (code != 38) && (code != 39) && (code != 40)) || (code == 8) )  {
                this.onInputTypeKeyUp.fire(typeOfAttribute);
            }
            suggestion.show();                       
        break;
    }    
}



// --------------------------------------------------------------- suggestionBarOnClick
/**
 * Suggestion bar control when clicked
 *
 * @name suggestionBarOnClick
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @param {String} typeOfAttribute Type of attribute
 * @param item Item of suggestion bar 
 */
AEd.ui.DlgAnnotate.prototype.suggestionBarOnClick = function(typeOfAttribute, item) {
    switch (typeOfAttribute) {
        case "Annotation":
            if (item.isSimpleType()) {
                this.setType(item.getName());
            }
            else if (!item.isSimpleType()) {
                this.setType(item.getText());
            } 
            this.onInputTypeSelect.fire(typeOfAttribute, item.isSimpleType());
            this.suggestionsBar.hide();    
        break;
        case "Simple":
            if (item.isSimpleType()) {
                this.setSimpleType(item.getName());
            }
            else if (!item.isSimpleType()) {
                this.setSimpleType(item.getText());
            }
            this.onInputTypeSelect.fire(typeOfAttribute, item.isSimpleType());
            this.suggestionsBarSimple.hide();
        break;
        case "GeoPoint":
            if (item.isSimpleType()) {
                this.setGeoPointType(item.getName());
            }
            else if (!item.isSimpleType()) {
                this.setGeoPointType(item.getText());
            }
            this.onInputTypeSelect.fire(typeOfAttribute, item.isSimpleType());
            this.suggestionsBarGeoPoint.hide(); 
        break;
        case "Entity":
            suggestion = this.suggestionsBarEntity;
            type = function() {
                if (suggestion.selectedItem.isSimpleType()) {
                    this.setEntityType(suggestion.selectedItem.getName());
                }
                else if (!suggestion.selectedItem.isSimpleType()) {
                    this.setEntityType(suggestion.selectedItem.getText());
                }
            };
        break;
        case "NestedAnnotation":
            if (item.isSimpleType()) {
                this.setNestedType(item.getName());
            }
            else if (!item.isSimpleType()) {
                this.setNestedType(item.getText());
            }
            this.onInputTypeSelect.fire(typeOfAttribute, item.isSimpleType());
            this.suggestionsBarNested.hide();
        break;    
    }
}

// --------------------------------------------------------------- updateAttributeFromSimpleToNested
/**
 * Updates attribute after change from simple to nested
 *
 * @name updateAttributeFromSimpleToNested
 * @memberOf AEd.ui.DlgAnnotate 
 * @function   
 * @param {AEd.ui.core.UITreeNode} node Tree node
 */
AEd.ui.DlgAnnotate.prototype.updateAttributeFromSimpleToNested = function(node) {
    var selNode = node.assignedObject;
    var typeName = "";
    switch (selNode.type) {
        case "Integer":
        case "String":
        case "Time":
        case "Date":
        case "DateTime":
        case "Boolean":
        case "URI":
        case "Duration":
        case "Binary":
        case "Text":
        case "Image":
            typeName = this.getSimpleType();
        break;
        case "GeoPoint":
            typeName = this.getGeoPointType();
        break;
        case "Entity":
            typeName = this.getEntityType();
        break;
        default:
            typeName = this.getNestedType();    
        break;
    }
    
    var type = {
        name: typeName,
        path: typeName
    }
    this.updateAttribute(selNode.name, type, selNode.addToTypeAttr, selNode.required);
}

// --------------------------------------------------------- parseDate
/**
 * Parses Date and return true if it is in valid format
 *
 * @name parseDate
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {String} date Value of attribute which is Date type
 * @return (Boolean) True / false    
 */
AEd.ui.DlgAnnotate.prototype.parseDate = function(date) {

        //http://www.javascriptkit.com/script/script2/validatedate.shtml
        
        var formatOfDate=/^\d{4}-\d{2}-\d{2}$/;
        if (!formatOfDate.test(date)) {
            return false;
        }
         
        var year = date.split("-")[0];
        var month = date.split("-")[1];
        var day = date.split("-")[2];
        
        if (year < 1) {
            return false;
        }
        if (month < 1 || month > 12) {
            return false;
        }
        if (day < 1 || day > 31) {
            return false;
        }
        
        return true;
}

// --------------------------------------------------------- parseTime
/**
 * Parses Time and return true if it is in valid format
 *
 * @name parseTime
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {String} time Value of attribute which is Time type
 * @return (Boolean) True / false    
 */
AEd.ui.DlgAnnotate.prototype.parseTime = function(time) {
 
        
        var formatOfTime=/^\d{2}\:\d{2}\:\d{2}$/;
        if (!formatOfTime.test(time)) {
            return false;
        }
         
        var hour = time.split(":")[0];
        var minute = time.split(":")[1];
        var second = time.split(":")[2];
        
        if (hour < 0 || hour > 23) {
            return false;
        }
        if (minute < 0 || minute > 59) {
            return false;
        }
        if (second < 0 || second > 59) {
            return false;
        }
        
        return true;
}

// --------------------------------------------------------- parseTimeZone
/**
 * Parses timeZone and return true if it is in valid format
 *
 * @name parseTimeZone
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {String} timeZone Value of attribute
 * @return (Boolean) True / false    
 */
AEd.ui.DlgAnnotate.prototype.parseTimeZone = function(timeZone) {
        
        
        if (timeZone == "00:00") {
            return true;
        }
        else if (timeZone == "") {
            return false;
        }
        
        var formatOfTimeZone = /^\d{2}\:\d{2}$/;
        if (!formatOfTimeZone.test(timeZone)) {
            return false;
        }
        
        var hour = timeZone.split(":")[0];
        var minute = timeZone.split(":")[1];
        
        if (hour < 0 || hour > 12) {
            return false;
        }
        if (minute < 0 || minute > 59) {
            return false;
        }
        
        return true;
}

// --------------------------------------------------------- removeDiacriticFromString
/**
 * Removes diacritic from string
 *
 * @name removeDiacriticFromString
 * @memberOf AEd.ui.DlgAnnotate 
 * @function 
 * @param {String} string String with diacritic
 * @return (String) newString   
 */
AEd.ui.DlgAnnotate.prototype.removeDiacriticFromString = function(string) {
   
  
    var newString = string.toLowerCase();
    newString = newString.replace(new RegExp('ě', 'g'), 'e');
    newString = newString.replace(new RegExp('š', 'g'), 's');
    newString = newString.replace(new RegExp('č', 'g'), 'c');
    newString = newString.replace(new RegExp('ř', 'g'), 'r');
    newString = newString.replace(new RegExp('ž', 'g'), 'z');
    newString = newString.replace(new RegExp('ý', 'g'), 'y');
    newString = newString.replace(new RegExp('á', 'g'), 'a');                            
    newString = newString.replace(new RegExp('í', 'g'), 'i');
    newString = newString.replace(new RegExp('é', 'g'), 'e');
    newString = newString.replace(new RegExp('ó', 'g'), 'o');
    newString = newString.replace(new RegExp('ú', 'g'), 'u');
    newString = newString.replace(new RegExp('ů', 'g'), 'u');
    newString = newString.replace(new RegExp('ď', 'g'), 'd');
    newString = newString.replace(new RegExp('ť', 'g'), 't');
    newString = newString.replace(new RegExp('ň', 'g'), 'n');
    newString = newString.replace(new RegExp('ö', 'g'), 'o');
    newString = newString.replace(new RegExp('ü', 'g'), 'u');
    newString = newString.replace(new RegExp('ä', 'g'), 'a');
    newString = newString.replace(new RegExp(' ', 'g'), '_');
    
    return newString;
}

// --------------------------------------------------------- nestedListButtonsController
/**
 * Nested list buttons controller - enabling and disabling
 *
 * @name nestedListButtonsController
 * @memberOf AEd.ui.DlgAnnotate 
 * @function
 * @param {AEd.ui.core.UITreeNode} node Tree node    
 */
AEd.ui.DlgAnnotate.prototype.nestedListButtonsController = function(oTreeNode) {

    if (oTreeNode.list.length == 1) { // only one item
        this.btnNestedPrevious.setDisabled(true);
        this.btnNestedNext.setDisabled(true);
        this.btnNestedAdd.setDisabled(false);
        this.btnNestedDelete.setDisabled(true);  
    }
    else if (oTreeNode.listPosition == 0) { // first item
        this.btnNestedPrevious.setDisabled(true);
        this.btnNestedNext.setDisabled(false);
        this.btnNestedAdd.setDisabled(false);
        this.btnNestedDelete.setDisabled(false);
    }
    else if (oTreeNode.listPosition == oTreeNode.list.length - 1) { // last item
        this.btnNestedPrevious.setDisabled(false);
        this.btnNestedNext.setDisabled(true);
        this.btnNestedAdd.setDisabled(false);
        this.btnNestedDelete.setDisabled(false);
    }
    else { // not first, not last
        this.btnNestedPrevious.setDisabled(false);
        this.btnNestedNext.setDisabled(false);
        this.btnNestedAdd.setDisabled(false);
        this.btnNestedDelete.setDisabled(false);
    }
    
    for (var i in oTreeNode.list) {
        if (oTreeNode.list[i].annotationLink) {
            this.btnAddAttribute.setDisabled(true);
            this.btnEntity.setDisabled(true);
            this.domElementNestedInputContent.disabled = true;
            break;    
        }
    }
    
    // ---------- update text
    this.domElementListNested.innerHTML = oTreeNode.listPosition + 1 + "/" + oTreeNode.list.length;
    // ---------- 
}

// --------------------------------------------------------- nestedListCheckAttribute
/**
 * Checks items of list of annotations
 *
 * @name nestedListCheckAttribute
 * @memberOf AEd.ui.DlgAnnotate 
 * @function
 * @param {String} annotation Nested annotation or linked annotation
 * @return (Boolean) True / false     
 */
AEd.ui.DlgAnnotate.prototype.nestedListCheckAttribute = function(annotation) {

    if (!this.tree){  // Text is selected but annotation editor is not running 

       return false;
    }
    
    var node = this.tree.getSelectedTreeNode().assignedObject;
    var cantInsertLink = false;
    var cantInsertNested = false;
    
    switch (annotation) {
        case "nestedAnnotation":        
            for (var i in node.list) {
                if (node.list[i].annotationLink && i != node.listPosition) {
                    cantInsertNested = true;
                    break;        
                }
            }
        break;
        case "annotationLink":            
            for (var i in node.list) {
                if ((node.list[i].selectionObject || node.list[i].wholeDoc) && i != node.listPosition) {
                    cantInsertLink = true;
                    break;        
                }
            }
        break;
        default:
        break;
    }
    
    if (cantInsertNested) {
        this.onNestedListCheckAttribute.fire("nestedAnnotation");
        this.btnNestedWholeDoc.setSelected(false);
        return false;
    }
    else if (cantInsertLink) {
        this.onNestedListCheckAttribute.fire("annotationLink");
        this.btnNestedSelect.setSelected(false);
        return false;
    }

    return true;
}

// --------------------------------------------------------- updateAttributesColors
/**
 * Updates colors in attributes tree when types colors are changed during annotating.
 *
 * @name updateAttributesColors
 * @memberOf AEd.ui.DlgAnnotate 
 * @function
 * @param (AEd.entities.typesManager) types All annotations types.     
 */
AEd.ui.DlgAnnotate.prototype.updateAttributesColors = function(types) {
 

    // only when dlgAnnotate is shown
    if (this.tree && (this.treeNodeAnnotation && this.treeNodeAnnotation.childTreeNodes.length > 0 || this.treeNodeAnnotation.assignedObject.typePath)) {
        
        var forAllAttrs = function(treeNode) {
            for (var i in treeNode.childTreeNodes) {
                var node = treeNode.childTreeNodes[i].assignedObject;
                if ((node.type == "annotationLink" || node.type == "nestedAnnotation") && node.typePath) {
                    var type = types.getTypeByPath(node.typePath);
                    if (node.color != type.color) {
                        node.color = type.color;
                        treeNode.childTreeNodes[i].setNodeAppearance(node.color);    
                    }
                }
                
                // children of children
                if (treeNode.childTreeNodes[i].childTreeNodes && treeNode.childTreeNodes[i].childTreeNodes.length) {
                    forAllAttrs.call(this, treeNode.childTreeNodes[i]);    
                }
            }
        }
        
        // treeNodeAnnotation
        var node = this.treeNodeAnnotation.assignedObject;
        if (node.typePath) {
            var type = types.getTypeByPath(node.typePath);
            if (node.color != type.color) {
                node.color = type.color;
                this.treeNodeAnnotation.setNodeAppearance(node.color);
            }    
        }
        // children
        forAllAttrs.call(this, this.treeNodeAnnotation);
    }
}



// *****************************************************************************
// class AEd.ui.DlgAnnotate
// ***************************************************************************** 

/**
 * Annotation.js
 *
 * Contains AEd.ui.Annotation class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak
 * 
 */
 

// *****************************************************************************
// class AEd.ui.Annotation
// *****************************************************************************  



/**
 * This class creates Annotation UI component.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *    {String}  title         - message title text, 
 *    {String}  subtitle      - message subtitle text,
 *    {String | Element | AEd.dom.Element}  headerContent - header content text or Element,
 *    {String | Element | AEd.dom.Element}  content - content text or Element,
 *     
 *    {String}  icon          - "none" | "anno" | "info" | "error" | "warning" | "ok" | "loading" | "close" | ...
 *    {String}  iconColor     - "#FFFFFF" | ...
 *      
 *    {String}  width         - dialog width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height        - dialog height with or without units, e.g.: "300px" or "100%", default unit is px,  
 *    {String}  minWidth      - dialog minWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  minHeight     - dialog minHeight with or without units, e.g.: "300px" or "100%", default unit is px,   
 *    {String}  maxWidth      - dialog maxWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  maxHeight     - dialog maxHeight with or without units, e.g.: "300px" or "100%", default unit is px,     
 *      
 *    {Boolean} render        - determines wheteher dialog should be rendered after creating   
 *    
 *    {Element} srcElement     - DOM element to create dialog from. 
 *    {Element} targetElement  - DOM element to render dialog to. Default is document.body. 
 *    {Element} contentElement - DOM element to place as a content of dialog. Default is none.
 *    
 *
 *    {String} annoUiType        - text
 *    {String} annoUiAuthor      - text 
 *    {String} annoUiDateTime    - text
 *    {String} annoUiContent     - text
 *    {String} annoUiBadFragment - text 
 *    {Array}  annoUiAttributes  - array of attributes 
 *  
 * }
 * 
 * @name Annotation
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIMessage 
 */
AEd.ui.Annotation = function(config, annotations, fragments, gui, annotationManager, level, annoLinkURIs, suggLinkTmpIds) {
    
   var c = config || {};    
   c.icon   = typeof c.icon != "undefined" ? c.icon : "color";
   c.render = typeof c.render != "undefined" ? c.render : false; 
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIMessage(c));
  
   c.annoUiType       = typeof c.annoUiType != 'undefined' ? c.annoUiType : "";
   c.annoUiAuthor     = typeof c.annoUiAuthor != 'undefined' ? c.annoUiAuthor : "";  
   c.annoUiDateTime   = typeof c.annoUiDateTime != 'undefined' ? c.annoUiDateTime : "";     
   c.annoUiContent    = typeof c.annoUiContent != 'undefined' ? c.annoUiContent : "";    
   c.annoUiBadFragment = typeof c.annoUiBadFragment != 'undefined' ? c.annoUiBadFragment : "";
   c.annoUiAttributes = typeof c.annoUiAttributes != 'undefined' ? c.annoUiAttributes : null;     

   this.annoUiType       = c.annoUiType;
   this.annoUiAuthor     = c.annoUiAuthor;
   this.annoUiDateTime   = c.annoUiDateTime;
   this.annoUiContent    = c.annoUiContent;
   this.annoUiBadFragment = c.annoUiBadFragment;
   this.annoUiAttributes = c.annoUiAttributes;   
   
   this.btnEdit          = new AEd.ui.core.UIButton({title: AEd.I18n.t("Annotation_button_edit"), icon: "edit"});  
   this.btnDelete        = new AEd.ui.core.UIButton({title: AEd.I18n.t("Annotation_button_delete"), icon: "delete"});
   this.btnDetails       = new AEd.ui.core.UIButton({title: AEd.I18n.t("Annotation_button_show_details"), icon: "show-details"});    
   this.btnNestedDetails = new AEd.ui.core.UIButton({title: AEd.I18n.t("Annotation_button_show_nested_details"), icon: "show-nested-details"});
    
   this.buttonsArea.addItem(this.btnDetails);
   this.buttonsArea.addItem(this.btnNestedDetails);
   this.buttonsArea.addItem(this.btnEdit);
   this.buttonsArea.addItem(this.btnDelete);
   
   this.annotations = annotations;
   this.fragments = fragments;
   this.gui = gui;
   this.annotationManager = annotationManager;
   this.level = level;
   this.annotationManager.level = this.level;
   this.annotationLinkURIs = annoLinkURIs ? annoLinkURIs : new Array(); // Mutual linking loop prevention
   this.suggestionLinkTmpIds = suggLinkTmpIds ? suggLinkTmpIds : new Array(); // Mutual linking loop prevention
         
   // *************************************************************************
   // EVENTS
   // *************************************************************************
    
   /**
    * Fires when user clicks the edit button.
    * 
    * @event onEdit
    * @param {AEd.entities.Annotation} annotation Target Annotation                                                 
    */         
   this.onEdit = new AEd.utils.Dispatcher();    
   
   /**
    * Fires when user clicks the delete button.
    * 
    * @event onDelete
    * @param {AEd.entities.Annotation} annotation Target Annotation                                                 
    */         
   this.onDelete = new AEd.utils.Dispatcher();    
   
   /**
    * Fires when user clicks the details button to show details.
    * 
    * @event onShowDetails
    * @param {AEd.ui.Annotation} annotation Target Annotation                                                 
    */         
   this.onShowDetails = new AEd.utils.Dispatcher();      
   
   /**
    * Fires when user clicks the details button to hide details.
    * 
    * @event onHideDetails
    * @param {AEd.ui.Annotation} annotation Target Annotation                                                 
    */         
   this.onHideDetails = new AEd.utils.Dispatcher();
  
   /**
    * Fires when user clicks the nested details button to show nested details.
    * 
    * @event onShowNestedDetails
    * @param {AEd.ui.Annotation} annotation Target Annotation                                                 
    */         
   this.onShowNestedDetails = new AEd.utils.Dispatcher();      
   
   /**
    * Fires when user clicks the nested details button to hide nested details.
    * 
    * @event onHideNestedDetails
    * @param {AEd.ui.Annotation} annotation Target Annotation                                                 
    */         
   this.onHideNestedDetails = new AEd.utils.Dispatcher();
  
   /**
    * Fires when user clicks annotation attribute to show nested annotation or annotation link.
    * 
    * @event onShowNestedAnnotation
    * @param {String} uri Nested annotation URI.                                                
    */         
   this.onShowNestedAnnotation = new AEd.utils.Dispatcher();
   
   // *************************************************************************
   // INIT
   // *************************************************************************


   this.setAnnoUiType(this.annoUiType);
   this.setAnnoUiAuthor(this.annoUiAuthor);  
   this.setAnnoUiDateTime(this.annoUiDateTime);  
   this.setAnnoUiContent(this.annoUiContent);
   this.setAnnoUiBadFragment(this.annoUiBadFragment);
   this.setAnnoUiAttributes(this.annoUiAttributes);    
 

   this.btnDetails.onClick.addHandler(function () {
       if (!this.btnDetails.isDisabled) {         
           if (this.isContentHidden) {
              this.showContent();
              this.btnDetails.setIcon("hide-details");
              this.btnDetails.setTitle(AEd.I18n.t("Annotation_button_hide_details"));
              this.onShowDetails.fire(this);
           }
           else {
              this.hideContent();
              this.btnDetails.setIcon("show-details");
              this.btnDetails.setTitle(AEd.I18n.t("Annotation_button_show_details"));   
              this.onHideDetails.fire(this);    
           }       
       }
   }, this );
   
   if (!this.content) {
      this.btnDetails.setDisabled(true);
   }  
   this.onContentChange.addHandler(function(content) {
       if (content) {
          this.btnDetails.setDisabled(false);
       }
       else {
          this.btnDetails.setDisabled(true);
       }
   }, this );  
   
   
   this.btnNestedDetails.onClick.addHandler(function () {
       if (!this.btnNestedDetails.isDisabled) {         
           if (this.isNestedContentHidden) {
              this.showNestedContent();
              this.btnNestedDetails.setIcon("hide-nested-details");
              this.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_hide_nested_details"));
              this.onShowNestedDetails.fire(this);
           }
           else {
              this.hideNestedContent();
              this.btnNestedDetails.setIcon("show-nested-details");
              this.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_show_nested_details"));   
              this.onHideNestedDetails.fire(this);    
           }       
       }
   }, this );
  
   if (this.nestedContent.length == 0) {
      this.btnNestedDetails.setDisabled(true);
   }  
   this.onNestedContentChange.addHandler(function(content) {
       if (content) {
          this.btnNestedDetails.setDisabled(false);
       }
       else {
          this.btnNestedDetails.setDisabled(true);
       }
   }, this );
    

   this.btnEdit.onClick.addHandler(function () {
       this.onEdit.fire(this);
   }, this );    
   
   this.btnDelete.onClick.addHandler(function () {
       this.onDelete.fire(this); 
   }, this );        
}



AEd.ui.Annotation.prototype.constructor = AEd.ui.Annotation;

AEd.inheritFromPrototype(AEd.ui.Annotation, AEd.ui.core.UIMessage);



// -------------------------------------------------------------- setAnnoUiType
/**
 * Sets Annotation Type text
 *
 * @name setAnnoUiType
 * @memberOf AEd.ui.Annotation
 * @function    
 * @return {String} value New value.    
 */
AEd.ui.Annotation.prototype.setAnnoUiType = function(value) {
    if (typeof value != "undefined") {
          this.annoUiType = value;
          this.setTitle(this.annoUiType);  
    }    
}



// ------------------------------------------------------------ setAnnoUiAuthor
/**
 * Sets Annotation Author text
 *
 * @name setAnnoUiAuthor
 * @memberOf AEd.ui.Annotation
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Annotation.prototype.setAnnoUiAuthor = function(value) {
    if (typeof value != "undefined") {
          this.annoUiAuthor = value;
          this.setSubtitle(this.annoUiAuthor + " (" + this.annoUiDateTime + ")");   
    }       
}



// ---------------------------------------------------------- setAnnoUiDateTime
/**
 * Sets Annotation DateTime text
 *
 * @name setAnnoUiDateTime
 * @memberOf AEd.ui.Annotation
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Annotation.prototype.setAnnoUiDateTime = function(value) {
    if (typeof value != "undefined") {
          this.annoUiDateTime = value;
          this.setSubtitle(this.annoUiAuthor + " (" + this.annoUiDateTime + ")"); 
    }         
}



// ----------------------------------------------------------- setAnnoUiContent
/**
 * Sets Annotation Content text
 *
 * @name setAnnoUiContent
 * @memberOf AEd.ui.Annotation
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Annotation.prototype.setAnnoUiContent = function(value) {
    if (typeof value != "undefined") {
          this.annoUiContent = value;
          this.setHeaderContent(this.annoUiContent); 
    }         
}



// ------------------------------------------------------- setAnnoUiBadFragment
/**
 * Sets Annotation bad fragment
 *
 * @name setAnnoUiBadFragment
 * @memberOf AEd.ui.Annotation
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Annotation.prototype.setAnnoUiBadFragment = function(value) {
    if (typeof value != "undefined") {
          this.annoUiBadFragment = value;
          this.setHeaderBadFragment(this.annoUiBadFragment); 
    }         
}



// -------------------------------------------------------- setAnnoUiAttributes
/**
 * Sets Annotation Attributes text
 *
 * @name setAnnoUiAttributes
 * @memberOf AEd.ui.Annotation
 * @function    
 * @param {Array} attributes Array of attributes.    
 */
AEd.ui.Annotation.prototype.setAnnoUiAttributes = function(attributes) {
    
    if (attributes) {
          this.annoUiAttributes = attributes;
          
          if (attributes.length) {

              for (var i = 0; i < attributes.length; i++){  // Remove dead annotation links

                  if (attributes[i].type == "annotationLink" && !(attributes[i].value)){

                     attributes.splice(i, 1);
                  }
              }

              this.annoUiAttributes = attributes;

              var elementContainer = AEd.$(document.createElement('div'));
              
              for (var i = 0; i < attributes.length; i++) {
              
                  if (attributes[i].loaded) { // skip loaded items of lists
                    continue;
                  }

                  switch(attributes[i].type) {
                      case "String":
                      case "Integer":
                      case "Time":
                      case "Date":
                      case "DateTime":  
                      case "Boolean": 
                      case "Duration":  
                      case "Binary":
                      case "Text":
                          if (!attributes[i].value){ // Skip attributes with empty values
                             break;
                          }
                          var elementAttr = AEd.$(document.createElement('p'));
                          elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_SIMPLE_ATTR_STYLE); 
                          elementAttr.setInnerHTML(attributes[i].name + ": " + (attributes[i].value || "")); 
                          elementContainer.addChild(elementAttr);                     
                      break;
                      
                      case "URI":
                          if (!attributes[i].value){ // Skip attributes with empty values
                             break;
                          }
                          var elementAttr = AEd.$(document.createElement('p'));
                          elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_SIMPLE_ATTR_STYLE); 
                          if (attributes[i].value) {
                              elementAttr.setInnerHTML(attributes[i].name + ": " + '<a target="_blank" href="' + attributes[i].value + '">' + attributes[i].value + '</a>');
                          } else {
                              elementAttr.setInnerHTML(attributes[i].name + ": " + (attributes[i].value || ""));
                          }
                          elementContainer.addChild(elementAttr);
                      break;
                      case "Image":
                          if (!attributes[i].value){ // Skip attributes with empty values
                             break;
                          }
                          var image = new Image();
                          image.src = attributes[i].value;
                          var width = image.width;
                          var height = image.height;
                          
                          var imgSize = "";
                          if (width <= height) {
                              imgSize = AEd.CONFIG.DLG_FRAGMENT_IMAGE_ATTR_STYLE_HEIGHT;
                          }
                          else {
                              imgSize = AEd.CONFIG.DLG_FRAGMENT_IMAGE_ATTR_STYLE_WIDTH;  
                          }
                                                
                          var elementAttr = AEd.$(document.createElement('p'));
                          elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_SIMPLE_ATTR_STYLE); 
                          elementAttr.setInnerHTML(attributes[i].name + ": " + '<a target="_blank" href="' + attributes[i].value + '"><img src="' + attributes[i].value + '"' + imgSize + '></a>'); 
                          elementContainer.addChild(elementAttr);    
                      break;      
                      
                      case "GeoPoint":  
                          if (!(attributes[i].lat && attributes[i].long)){ // Skip attributes with empty values
                             break;
                          }
                          var elementAttr = AEd.$(document.createElement('p'));
                          elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_SIMPLE_ATTR_STYLE); 
                          if (attributes[i].lat && attributes[i].long) {
                              elementAttr.setInnerHTML(attributes[i].name + ": " + '<a target="_blank" href="http://maps.google.com/maps?q=' + (attributes[i].lat || "") + ',' + (attributes[i].long || "") + '">' + ((attributes[i].lat || attributes[i].long)?((attributes[i].lat || "") + ", " + (attributes[i].long || "")):'') + '</a>'); // eliminated comma without numbers
                          } else {
                              elementAttr.setInnerHTML(attributes[i].name + ": " + ((attributes[i].lat || attributes[i].long)?((attributes[i].lat || "") + ", " + (attributes[i].long || "")):'')); // eliminated comma without numbers
                          }
                          elementContainer.addChild(elementAttr);
                      break;
                      
                      case "Entity":
                          if (attributes[i].entityName){ // Skip attributes with empty values
                             break;
                          }
                          if(attributes[i].entityURI)
                          {
                            var elementAttr = AEd.$(document.createElement('p'));
                            elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_SIMPLE_ATTR_STYLE);
                            
                            var t = '<div class="' + AEd.CONFIG.CLASS_UI_ANNOTATION_ENTITY + '">';
                            t += attributes[i].name + ': ' + attributes[i].entityName + ' (' + attributes[i].entityType + ')<br>'
                            t += '<img class="' + AEd.CONFIG.CLASS_UI_ANNOTATION_ENTITY_IMAGE + '" src="' + attributes[i].entityImage +'">';
                            t += attributes[i].entityDescription;
                            t += ' <a href="' + attributes[i].entityURI + '" target="_blank">' + AEd.I18n.t("Annotation_read_more") + '</a></div>';
                            elementAttr.setInnerHTML(t);

                            elementContainer.addChild(elementAttr);
                          }
                      break;
                                                                            
                      case "annotationLink":
                          if (!(attributes[i].value || attributes[i].tmpId || (attributes[i].uri && this.annotations.getAnnotationByURI(attributes[i].uri)))){ // Skip attributes with empty values
                             break;
                          }                     
                          var isList = false;
                          var firstAttrInListLoaded = false;
                          for (var iAttr = i + 1; iAttr < attributes.length; iAttr++) {
                              if (attributes[i].name == attributes[iAttr].name && attributes[i].type == attributes[iAttr].type) {
                                  
                                  // load first item of the list
                                  if (!firstAttrInListLoaded) {
                                  
                                      // ----- name of attribute
                                      var elementAttr = AEd.$(document.createElement('p'));
                                      elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_SIMPLE_ATTR_STYLE);
                                      
                                      var j = i;
                                      elementAttr.setInnerHTML(attributes[j].name + ": " + AEd.I18n.t("Fragment_annotation_links")); 
                                      elementContainer.addChild(elementAttr);
                                      // -----
                                      
                                      // ----- first item
                                      elementAttr = AEd.$(document.createElement('p'));
                                      elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE);
                                      
                                      var text = "";
                                      var annotation = this.annotations.getAnnotationByURI(attributes[j].value);
                                      if (annotation && annotation.isDocAnnotation) {
                                          text = AEd.I18n.t("Fragment_document_annotation");
                                      }
                                      else if (annotation && annotation.fragments && annotation.fragments.length) {
                                          for (var k = 0; k < annotation.fragments.length; k++) {
                                              text += annotation.fragments[k].fragmentText;
                                          }
                                          if (text.length > 15) {
                                              text = text.substr(0, 15) + " ...";   
                                          }
                                      }
                                      
                                      var btnAttr = new AEd.ui.core.UIButton({icon: "explore", text: text});                            
                                      btnAttr.render(elementAttr); 
                                      
                                      var uri = attributes[j].value;
                                      btnAttr.setTag("uri", uri);
                          
                                      btnAttr.onClick.addHandler(function(btn) {
                                          var u = btn.getTag("uri");
                                          this.onShowNestedAnnotation.fire(u);
                                      }, this);
                                      
                                      firstAttrInListLoaded = true;
                                      
                                      elementContainer.addChild(elementAttr);
                                      this.setAnnoUiNestedAttributes(annotation, elementContainer);
                                      // -----
                                  }
                                  
                                  // ----- load other items of the list
                                  elementAttr = AEd.$(document.createElement('p'));
                                  elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE);
                                  
                                  var j = iAttr;
                                  var text = "";
                                  var annotation = this.annotations.getAnnotationByURI(attributes[j].value);
                                  if (annotation && annotation.isDocAnnotation) {
                                      text = AEd.I18n.t("Fragment_document_annotation");
                                  }
                                  else if (annotation && annotation.fragments && annotation.fragments.length) {
                                      for (var k = 0; k < annotation.fragments.length; k++) {
                                          text += annotation.fragments[k].fragmentText;
                                      }
                                      if (text.length > 15) {
                                          text = text.substr(0, 15) + " ...";  
                                      }
                                  }
                                  
                                  var btnAttr = new AEd.ui.core.UIButton({icon: "explore", text: text});                            
                                  btnAttr.render(elementAttr);
                                      
                                  var uri = attributes[j].value;
                                  btnAttr.setTag("uri", uri);
                          
                                  btnAttr.onClick.addHandler(function(btn) {
                                      var u = btn.getTag("uri");
                                      this.onShowNestedAnnotation.fire(u);
                                  }, this);
                                  
                                  attributes[iAttr].loaded = true; 
                                  isList = true;
                                  
                                  elementContainer.addChild(elementAttr);

                                  this.setAnnoUiNestedAttributes(annotation, elementContainer);
                                  // -----
                              }
                          }
                                                    
                          if (!isList) { // if there is no list, list already loaded
                            
                              // ----- name of attribute
                              var elementAttr = AEd.$(document.createElement('p'));
                              elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_SIMPLE_ATTR_STYLE);
                                      
                              var j = i;
                              elementAttr.setInnerHTML(attributes[j].name + ": " + AEd.I18n.t("Fragment_annotation_links")); 
                              elementContainer.addChild(elementAttr);
                              // -----
                              
                              // ----- item                 
                              elementAttr = AEd.$(document.createElement('p'));
                              elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE);
                              
                              var text = "";
                              var annotation = this.annotations.getAnnotationByURI(attributes[j].value);
                              if (annotation && annotation.isDocAnnotation) {
                                  text = AEd.I18n.t("Fragment_document_annotation");
                              }
                              else if (annotation && annotation.fragments && annotation.fragments.length) {
                                  for (var k = 0; k < annotation.fragments.length; k++) {
                                      text += annotation.fragments[k].fragmentText;
                                  }
                                  if (text.length > 15) {
                                      text = text.substr(0, 15) + " ...";   
                                  }
                              } 
                          
                              var btnAttr = new AEd.ui.core.UIButton({icon: "explore", text: text});                            
                              btnAttr.render(elementAttr);
                          
                              var uri = attributes[j].value;
                              btnAttr.setTag("uri", uri);
                          
                              btnAttr.onClick.addHandler(function(btn) {
                                  var u = btn.getTag("uri");
                                  this.onShowNestedAnnotation.fire(u);
                              }, this);
                        
                              elementContainer.addChild(elementAttr);
                              this.setAnnoUiNestedAttributes(annotation, elementContainer);
                              // -----
                          }                              
                      break;
                                           
                      case "nestedAnnotation":
                          if (!attributes[i].annotation){ // Skip attributes with empty values
                             break;
                          }                           
                          var isList = false;
                          var firstAttrInListLoaded = false;
                          for (var iAttr = i + 1; iAttr < attributes.length; iAttr++) {
                              if (attributes[i].name == attributes[iAttr].name && attributes[i].type == attributes[iAttr].type) {
                                  
                                  // load first item of the list
                                  if (!firstAttrInListLoaded) {
                                  
                                      // ----- name of attribute
                                      var elementAttr = AEd.$(document.createElement('p'));
                                      elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_SIMPLE_ATTR_STYLE);
                                      
                                      var j = i;
                                      elementAttr.setInnerHTML(attributes[j].name + ": " + AEd.I18n.t("Fragment_nested_annotations")); 
                                      elementContainer.addChild(elementAttr);
                                      // -----
                                      
                                      // ----- first item
                                      elementAttr = AEd.$(document.createElement('p'));
                                      elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE);
                                      
                                      var text = "";
                                      if (attributes[j].annotation.isDocAnnotation) {
                                          text = AEd.I18n.t("Fragment_document_annotation");
                                      }
                                      else if (attributes[j].annotation.fragments && attributes[j].annotation.fragments.length) {
                                          for (var k = 0; k < attributes[j].annotation.fragments.length; k++) {
                                              text += attributes[j].annotation.fragments[k].fragmentText;
                                          }
                                          if (text.length > 15) {
                                              text = text.substr(0, 15) + " ...";   
                                          }
                                      }
                                      
                                      var btnAttr = new AEd.ui.core.UIButton({icon: "explore", text: text});                            
                                      btnAttr.render(elementAttr);
                                      
                                      var uri = attributes[j].uri;
                                      btnAttr.setTag("uri", uri);
                          
                                      btnAttr.onClick.addHandler(function(btn) {
                                          var u = btn.getTag("uri");
                                          this.onShowNestedAnnotation.fire(u);
                                      }, this);
                                      
                                      firstAttrInListLoaded = true;
                                      
                                      elementContainer.addChild(elementAttr);
                                      this.setAnnoUiNestedAttributes(attributes[j].annotation, elementContainer, true);
                                      // -----
                                  }
                                  
                                  // ----- load other items of the list
                                  elementAttr = AEd.$(document.createElement('p'));
                                  elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE);
                                  
                                  var j = iAttr;
                                  var text = "";
                                  if (attributes[j].annotation.isDocAnnotation) {
                                      text = AEd.I18n.t("Fragment_document_annotation");
                                  }
                                  else if (attributes[j].annotation.fragments && attributes[j].annotation.fragments.length) {
                                      for (var k = 0; k < attributes[j].annotation.fragments.length; k++) {
                                          text += attributes[j].annotation.fragments[k].fragmentText;
                                      }
                                      if (text.length > 15) {
                                          text = text.substr(0, 15) + " ...";  
                                      }
                                  }
                                  
                                  var btnAttr = new AEd.ui.core.UIButton({icon: "explore", text: text});                            
                                  btnAttr.render(elementAttr);
                                      
                                  var uri = attributes[j].uri;
                                  btnAttr.setTag("uri", uri);
                          
                                  btnAttr.onClick.addHandler(function(btn) {
                                      var u = btn.getTag("uri");
                                      this.onShowNestedAnnotation.fire(u);
                                  }, this);
                                  
                                  attributes[iAttr].loaded = true;
                                  isList = true;
                                  
                                  elementContainer.addChild(elementAttr);
                                  this.setAnnoUiNestedAttributes(attributes[j].annotation, elementContainer, true);
                                  // -----
                              }
                          }
                                                    
                          if (!isList) { // if there is no list, list already loaded
                              
                              // ----- name of attribute                     
                              var elementAttr = AEd.$(document.createElement('p'));
                              elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_SIMPLE_ATTR_STYLE);
                          
                              var j = i;
                              elementAttr.setInnerHTML(attributes[j].name + ": " + AEd.I18n.t("Fragment_nested_annotations")); 
                              elementContainer.addChild(elementAttr);
                              // -----
                              
                              // ----- item
                              elementAttr = AEd.$(document.createElement('p'));
                              elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE);
                              
                              var text = "";
                              if (attributes[j].annotation.isDocAnnotation) {
                                  text = AEd.I18n.t("Fragment_document_annotation");
                              }
                              else if (attributes[j].annotation.fragments && attributes[j].annotation.fragments.length) {
                                  for (var k = 0; k < attributes[j].annotation.fragments.length; k++) {
                                      text += attributes[j].annotation.fragments[k].fragmentText;
                                  }
                                  if (text.length > 15) {
                                      text = text.substr(0, 15) + " ...";  
                                  }
                              } 
                          
                              var btnAttr = new AEd.ui.core.UIButton({icon: "explore", text: text});                            
                              btnAttr.render(elementAttr);
                          
                              var uri = attributes[j].uri;
                              btnAttr.setTag("uri", uri);
                          
                              btnAttr.onClick.addHandler(function(btn) {
                                  var u = btn.getTag("uri");
                                  this.onShowNestedAnnotation.fire(u);
                              }, this);
                          
                              elementContainer.addChild(elementAttr);
                              this.setAnnoUiNestedAttributes(attributes[j].annotation, elementContainer, true);
                              // -----
                          }                                                                     
                      break;

                      default:
                      break; 
                  }
              }

              this.annotationManager.level--;
              this.setContent(elementContainer);
          }
          else {
              // this.setContent(AEd.I18n.t("No_Attributes"));
          }        
    }         
}



// -------------------------------------------------------- setAnnoUiNestedAttributes
/**
 * Sets Annotation Nested Attributes text
 *
 * @name setAnnoUiNestedAttributes
 * @memberOf AEd.ui.Annotation
 * @function    
 * @param {Object} annotation Annotation to load.
 * @param (Element) element Element to which to add nested content.
 * @param {Boolean} nestedAnn calling with nested annotation   
 */
AEd.ui.Annotation.prototype.setAnnoUiNestedAttributes = function(annotation, element, nestedAnn) {

    if(!annotation){ // Annotation does not exist

       if (element.domElement.childNodes && element.domElement.childNodes.length){  // create this annotation link

          var child = element.domElement.childNodes[element.domElement.childNodes.length - 1];  
        
          if (child){  // append textNode

             element.domElement.removeChild(child);
 
             var thisAnn = document.createTextNode(AEd.I18n.t("Fragment_document_this_annotation"));
             element.domElement.appendChild(thisAnn);
          }
       }

       return;
    }

    if (!nestedAnn && ((annotation instanceof AEd.entities.Suggestion && this.suggestionLinkTmpIds[annotation.tmpId]) || (annotation instanceof AEd.entities.Annotation && this.annotationLinkURIs[annotation.uri]))){   // Mutual linking loop prevention

       return;
    }    

    this.annotationLinkURIs[annotation.uri] = true;
    this.annotationManager.level++;

    // creates new element for nested content
    var newObj = this.addNestedContent(element);
    
    // creates new annotation instance for given annotation
    var clonnedAnnotation = new AEd.entities.Annotation(
    {   
    uri: annotation.uri, // "http://example.com/annotations/123456"     
    typeUri: annotation.typeUri, // "http://example.com/type/annotation/task"
    annoType: annotation.annoType, // Type object
    dateTime: annotation.dateTime, // "2011-01-01T:20:00:00Z"
    authorId: annotation.authorId, // (String)
    authorName: annotation.authorName, // (String)
    authorAddress: annotation.authorAddress, // (String)
    resourceUri: annotation.resourceUri, // (String)        
    fragments: annotation.fragments, // Array of fragments    
    content: annotation.content,    
    attributes: annotation.attributes  // Array of attributes
    }, this.annotations, this.fragments, this.gui, this.annotationManager, this.annotationManager.level, this.annotationLinkURIs);
            
    // hide buttons
    clonnedAnnotation.ui.btnEdit.hide();
    clonnedAnnotation.ui.btnDelete.hide();
    // sets clonnedAnnotation content
    if (!clonnedAnnotation.ui.btnDetails.isDisabled) { // show content if exists
        clonnedAnnotation.ui.showContent();
        clonnedAnnotation.ui.btnDetails.setIcon("hide-details");
        clonnedAnnotation.ui.btnDetails.setTitle(AEd.I18n.t("Annotation_button_hide_details"));  
    }
    if (!clonnedAnnotation.ui.btnNestedDetails.isDisabled) { // show nested content if exists
        clonnedAnnotation.ui.showNestedContent();
        clonnedAnnotation.ui.btnNestedDetails.setIcon("hide-nested-details");
        clonnedAnnotation.ui.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_hide_nested_details"));  
    }
            
    // sets important handler
    clonnedAnnotation.ui.onShowNestedAnnotation.addHandler(function(uri) {
        var a = this.annotations.getAnnotationByURI(uri);
        if (a) {
            if (a.isDocAnnotation) {
                this.gui.showMessage(AEd.I18n.t("Selected_annotation_is_document_annotation"), AEd.I18n.t("You_can_find_it_in_Document_Annotations_dialog"), "info");
            }
            else {
                this.fragments.showNestedAnnotation(uri); 
            }    
        }        
    }, this);
    
    // sets nested content
    this.setNestedContent(newObj.element, clonnedAnnotation.ui.elementRoot, newObj.index);
        
    // save as nestedAnnotation of given annotation

    if (this.annotationManager.nestedAnnotations){

      this.annotationManager.nestedAnnotations.push(clonnedAnnotation);
    }

    else {

      this.annotationManager.nestedSuggestions.push(clonnedAnnotation);
    }
}



// ----------------------------------------------------------------------- open
/**
 * Opens the message.  
 *
 * @name open
 * @memberOf AEd.ui.Annotation
 * @function
 * @param {Element} element Optional element to render UIComponent to. 
 * @param {Number} index Optional index to render UIComponent at.	    	
 */
AEd.ui.Annotation.prototype.open = function(element, index) {  
    this.render(element, index);
} 



// ---------------------------------------------------------------------- close
/**
 * Closes the message.  
 *
 * @name close
 * @memberOf AEd.ui.Annotation
 * @function   	
 */
AEd.ui.Annotation.prototype.close = function() {  
    this.remove();
}



// -------------------------------------------------------- setAnnoUiAttributesNotFolded
/**
 * Sets Annotation Attributes not folded
 *
 * @name setAnnoUiAttributesNotFolded
 * @memberOf AEd.ui.Annotation
 * @function    
 */
AEd.ui.Annotation.prototype.setAnnoUiAttributesNotFolded = function() {
    if (!this.btnDetails.isDisabled) {         
        this.showContent();
        this.btnDetails.setIcon("hide-details");
        this.btnDetails.setTitle(AEd.I18n.t("Annotation_button_hide_details"));
        this.onShowDetails.fire(this);      
    }
}



// -------------------------------------------------------- setAnnoUiAttributesFolded
/**
 * Sets Annotation Attributes folded
 *
 * @name setAnnoUiAttributesFolded
 * @memberOf AEd.ui.Annotation
 * @function    
 */
AEd.ui.Annotation.prototype.setAnnoUiAttributesFolded = function() {
    if (!this.btnDetails.isDisabled) {         
        this.hideContent();
        this.btnDetails.setIcon("show-details");
        this.btnDetails.setTitle(AEd.I18n.t("Annotation_button_show_details"));   
        this.onHideDetails.fire(this);      
    }
}



// -------------------------------------------------------- setAnnoUiNestedAttributesNotFolded
/**
 * Sets Annotation Nested Attributes not folded
 *
 * @name setAnnoUiNestedAttributesNotFolded
 * @memberOf AEd.ui.Annotation
 * @function    
 */
AEd.ui.Annotation.prototype.setAnnoUiNestedAttributesNotFolded = function() {
    if (!this.btnNestedDetails.isDisabled) {         
        this.showNestedContent();
        this.btnNestedDetails.setIcon("hide-nested-details");
        this.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_hide_nested_details"));
        this.onShowNestedDetails.fire(this);      
    }
}



// -------------------------------------------------------- setAnnoUiNestedAttributesFolded
/**
 * Sets Annotation Nested Attributes folded
 *
 * @name setAnnoUiNestedAttributesFolded
 * @memberOf AEd.ui.Annotation
 * @function    
 */
AEd.ui.Annotation.prototype.setAnnoUiNestedAttributesFolded = function() {
    if (!this.btnNestedDetails.isDisabled) {         
        this.hideNestedContent();
        this.btnNestedDetails.setIcon("show-nested-details");
        this.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_show_nested_details"));   
        this.onHideNestedDetails.fire(this);      
    }
}



// *****************************************************************************
// class AEd.ui.Annotation
// ***************************************************************************** 

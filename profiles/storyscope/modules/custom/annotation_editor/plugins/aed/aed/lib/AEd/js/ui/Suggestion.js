/**
 * Suggestion.js
 *
 * Contains AEd.ui.Suggestion class definition. 
 *  
 * @author: Petr Loukota, Milos Cudrak
 * 
 */
 

// *****************************************************************************
// class AEd.ui.Suggestion
// *****************************************************************************  



/**
 * This class creates Suggestion UI component.
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
 *    {String} suggUiType       - text
 *    {String} suggUiAuthor     - text 
 *    {String} suggUiDateTime   - text
 *    {String} suggUiContent    - text
 *    {Array}  suggUiAttributes - array of attributes 
 *  
 * }
 * 
 * @name Suggestion
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIMessage 
 */
AEd.ui.Suggestion = function(config, annotations, suggestions, fragments, gui, suggestionManager, level, suggLinkTmpIds, annoLinkURIs) {
   
   var c = config || {};    
   c.icon   = typeof c.icon != "undefined" ? c.icon : "color";
   c.render = typeof c.render != "undefined" ? c.render : false; 
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIMessage(c));
  
   c.suggUiType        = typeof c.suggUiType != 'undefined' ? c.suggUiType : "";
   c.suggUiAuthor      = AEd.I18n.t("Suggestion_no_author");  
   c.suggUiDateTime    = AEd.I18n.t("Suggestion_no_datetime");     
   c.suggUiContent     = typeof c.suggUiContent != 'undefined' ? c.suggUiContent : "";    
   c.suggUiAttributes  = typeof c.suggUiAttributes != 'undefined' ? c.suggUiAttributes : null;     
   c.suggUiParentTmpId = typeof c.suggUiParentTmpId != 'undefined' ? c.suggUiParentTmpId : "";
  
   this.suggUiType        = c.suggUiType;
   this.suggUiAuthor      = c.suggUiAuthor;
   this.suggUiDateTime    = c.suggUiDateTime;
   this.suggUiContent     = c.suggUiContent;
   this.suggUiAttributes  = c.suggUiAttributes;   
   this.suggUiParentTmpId = c.suggUiParentTmpId;

   this.elementSubtitle.hide();

   this.btnDetails  = new AEd.ui.core.UIButton({title: AEd.I18n.t("Suggestion_button_show_details"), icon: "show-details"});
   this.btnNestedDetails  = new AEd.ui.core.UIButton({title: AEd.I18n.t("Suggestion_button_show_nested_details"), icon: "show-nested-details"});
   this.btnEdit     = new AEd.ui.core.UIButton({title: AEd.I18n.t("Suggestion_button_edit"), icon: "edit"});
   if (!this.suggUiParentTmpId) {    
       this.btnAccept   = new AEd.ui.core.UIButton({title: AEd.I18n.t("Suggestion_button_confirm"), icon: "accept"});
       this.btnRefuse   = new AEd.ui.core.UIButton({title: AEd.I18n.t("Suggestion_button_refuse"), icon: "delete"});
   }
   
   // set buttons in required order
   if (!this.suggUiParentTmpId) {
       this.buttonsArea.addItem(this.btnAccept);
       this.buttonsArea.addItem(this.btnDetails);
       this.buttonsArea.addItem(this.btnNestedDetails);
       this.buttonsArea.addItem(this.btnEdit);
       this.buttonsArea.addItem(this.btnRefuse);
       
   }
   else {
       this.buttonsArea.addItem(this.btnDetails);
       this.buttonsArea.addItem(this.btnNestedDetails);
       this.buttonsArea.addItem(this.btnEdit);       
   }
   
   this.annotations = annotations;
   this.suggestions = suggestions;
   this.fragments = fragments;
   this.gui = gui;
   this.suggestionManager = suggestionManager;     
   this.level = level;
   this.suggestionManager.level = this.level;
   this.suggestionLinkTmpIds = suggLinkTmpIds ? suggLinkTmpIds : new Array(); // Mutual linking loop prevention
   this.annotationLinkURIs = annoLinkURIs ? annoLinkURIs : new Array();// Mutual linking loop prevention
   
   // *************************************************************************
   // EVENTS
   // *************************************************************************
   
   /**
    * Fires when user clicks the accept button.
    * 
    * @event onAccept
    * @param {AEd.entities.Suggestion} suggestion Target Suggestion                                                 
    */         
   this.onAccept = new AEd.utils.Dispatcher();
   
   /**
    * Fires when user clicks the refuse button.
    * 
    * @event onRefuse
    * @param {AEd.entities.Suggestion} suggestion Target Suggestion                                                 
    */         
   this.onRefuse = new AEd.utils.Dispatcher();
    
   /**
    * Fires when user clicks the edit button.
    * 
    * @event onEdit
    * @param {AEd.entities.Suggestion} suggestion Target Suggestion                                                 
    */         
   this.onEdit = new AEd.utils.Dispatcher();    
   
   /**
    * Fires when user clicks the details button to show details.
    * 
    * @event onShowDetails
    * @param {AEd.ui.Suggestion} suggestion Target Suggestion                                                 
    */         
   this.onShowDetails = new AEd.utils.Dispatcher();      
   
   /**
    * Fires when user clicks the details button to hide details.
    * 
    * @event onHideDetails
    * @param {AEd.ui.Suggestion} suggestion Target Suggestion                                                 
    */         
   this.onHideDetails = new AEd.utils.Dispatcher();
  
   /**
    * Fires when user clicks the nested details button to show nested details.
    * 
    * @event onShowNestedDetails
    * @param {AEd.ui.Suggestion} suggestion Target Suggestion                                                 
    */         
   this.onShowNestedDetails = new AEd.utils.Dispatcher();      
   
   /**
    * Fires when user clicks the nested details button to hide nested details.
    * 
    * @event onHideNestedDetails
    * @param {AEd.ui.Suggestion} suggestion Target Suggestion                                                 
    */         
   this.onHideNestedDetails = new AEd.utils.Dispatcher();
  
   /**
    * Fires when user clicks suggestion attribute to show nested suggestion.
    * 
    * @event onShowNestedSuggestion
    * @param {String} uri Nested annotation URI.                                                
    */         
   this.onShowNestedSuggestion = new AEd.utils.Dispatcher();

   /**
    * Fires when user clicks suggestion attribute to show annotation link.
    * 
    * @event onShowAnnotationLink
    * @param {String} uri Annotation link URI.                                                
    */
   this.onShowAnnotationLink = new AEd.utils.Dispatcher();

   // *************************************************************************
   // INIT
   // *************************************************************************

   this.setSuggUiType(this.suggUiType);
   this.setSuggUiAuthor(this.suggUiAuthor);  
   this.setSuggUiDateTime(this.suggUiDateTime);  
   this.setSuggUiContent(this.suggUiContent); 
   this.setSuggUiAttributes(this.suggUiAttributes);
   
   this.btnDetails.onClick.addHandler(function () {
       if (!this.btnDetails.isDisabled) {         
           if (this.isContentHidden) {
              this.showContent();
              this.btnDetails.setIcon("hide-details");
              this.btnDetails.setTitle(AEd.I18n.t("Suggestion_button_hide_details"));
              this.onShowDetails.fire(this);
           }
           else {
              this.hideContent();
              this.btnDetails.setIcon("show-details");
              this.btnDetails.setTitle(AEd.I18n.t("Suggestion_button_show_details"));   
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
              this.btnNestedDetails.setTitle(AEd.I18n.t("Suggestion_button_hide_nested_details"));
              this.onShowNestedDetails.fire(this);
          }
          else {
              this.hideNestedContent();
              this.btnNestedDetails.setIcon("show-nested-details");
              this.btnNestedDetails.setTitle(AEd.I18n.t("Suggestion_button_show_nested_details"));   
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
     
   
   if (!this.suggUiParentTmpId) {
       this.btnAccept.onClick.addHandler(function () {
           this.onAccept.fire(this); 
       }, this );    
   
       this.btnRefuse.onClick.addHandler(function () {
           this.onRefuse.fire(this); 
       }, this );
   }
   
   this.btnEdit.onClick.addHandler(function () {
       this.onEdit.fire(this); 
   }, this );       
}



AEd.ui.Suggestion.prototype.constructor = AEd.ui.Suggestion;

AEd.inheritFromPrototype(AEd.ui.Suggestion, AEd.ui.core.UIMessage);



// -------------------------------------------------------------- setSuggUiType
/**
 * Sets Suggestion Type text
 *
 * @name setSuggUiType
 * @memberOf AEd.ui.Suggestion
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Suggestion.prototype.setSuggUiType = function(value) {
    if (typeof value != "undefined") {
          this.suggUiType = value;
          this.setTitle(this.suggUiType);  
    }    
}



// ------------------------------------------------------------ setSuggUiAuthor
/**
 * Sets Suggestion Author text
 *
 * @name setSuggUiAuthor
 * @memberOf AEd.ui.Suggestion
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Suggestion.prototype.setSuggUiAuthor = function(value) {
    if (typeof value != "undefined") {
          this.suggUiAuthor = value;
          this.setSubtitle(this.suggUiAuthor + " (" + this.suggUiDateTime + ")");   
    }       
}



// ---------------------------------------------------------- setSuggUiDateTime
/**
 * Sets Suggestion DateTime text
 *
 * @name setSuggUiDateTime
 * @memberOf AEd.ui.Suggestion
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Suggestion.prototype.setSuggUiDateTime = function(value) {
    if (typeof value != "undefined") {
          this.suggUiDateTime = value;
          this.setSubtitle(this.suggUiAuthor + " (" + this.suggUiDateTime + ")"); 
    }         
}



// ----------------------------------------------------------- setSuggUiContent
/**
 * Sets Suggestion Content text
 *
 * @name setSuggUiContent
 * @memberOf AEd.ui.Suggestion
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Suggestion.prototype.setSuggUiContent = function(value) {
    if (typeof value != "undefined") {
          this.suggUiContent = value;
          this.setHeaderContent(this.suggUiContent); 
    }         
}



// -------------------------------------------------------- setSuggUiAttributes
/**
 * Sets Suggestion Attributes text
 *
 * @name setSuggUiAttributes
 * @memberOf AEd.ui.Suggestion
 * @function    
 * @param {Array} attributes Array of attributes.    
 */
AEd.ui.Suggestion.prototype.setSuggUiAttributes = function(attributes) {
   
    if (attributes) {
          this.suggUiAttributes = attributes;
          
          if (attributes.length) {

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
                          if (!attributes[i].value){  // Skip attributes with empty values
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
                              elementAttr.setInnerHTML(attributes[i].name + ": " + '<a target="_blank" href="http://maps.google.com/maps?q=' + (attributes[i].lat || "") + ',' + (attributes[i].long || "") + '">' + (attributes[i].lat || "") + ", " + (attributes[i].long || "") + '</a>'); 
                          } else {
                              elementAttr.setInnerHTML(attributes[i].name + ": " + (attributes[i].lat || "") + ", " + (attributes[i].long || ""));
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
                      
                      case "AnyAnnotation":
                          if (!attributes[i].value){ // Skip attributes with empty values
                             break;
                          }
                          var elementAttr = AEd.$(document.createElement('p'));
                          elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_SIMPLE_ATTR_STYLE); 
                          elementAttr.setInnerHTML(attributes[i].name + ": " + AEd.I18n.t("Fragment_suggestion_anyAnnotation_attribute")); 
                          elementContainer.addChild(elementAttr);
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
                                      var linkToAnno = false;
                                      var linkToSugg = false;
                                      var annotation = null;
                                      if (this.annotations && this.annotations.getAnnotationByURI(attributes[j].value)) {
                                          annotation = this.annotations.getAnnotationByURI(attributes[j].value);
                                          linkToAnno = true;  
                                      }
                                      else if (this.suggestions && this.suggestions.getSuggestionByTmpId(attributes[j].tmpId)) {
                                          annotation = this.suggestions.getSuggestionByTmpId(attributes[j].tmpId);
                                          linkToSugg = true;
                                      }
                                      
                                      if (linkToAnno) {
                                          elementAttr.setInnerHTML(attributes[j].name + ": " + AEd.I18n.t("Fragment_annotation_links"));
                                      }
                                      else if (linkToSugg) {
                                          elementAttr.setInnerHTML(attributes[j].name + ": " + AEd.I18n.t("Fragment_suggestion_links"));
                                      } 
                                      elementContainer.addChild(elementAttr);
                                      // -----
                                      
                                      // ----- first item
                                      elementAttr = AEd.$(document.createElement('p'));
                                      elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE);                                                                                 
                                      
                                      var text = "";
                                      if (linkToAnno) {
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
                                      }
                                      else if (linkToSugg) {
                                          if (annotation && annotation.isDocSuggestion) {
                                              text = AEd.I18n.t("Fragment_document_suggestion");
                                          }
                                          else if (annotation && annotation.fragments && annotation.fragments.length) {
                                             for (var k = 0; k < annotation.fragments.length; k++) {
                                                 text += annotation.fragments[k].fragmentText;
                                             }
                                             if (text.length > 15) {
                                                 text = text.substr(0, 15) + " ...";   
                                             }
                                         }    
                                      }
                                      
                                      var btnAttr = new AEd.ui.core.UIButton({icon: "explore", text: text});                            
                                      btnAttr.render(elementAttr); 
                                      
                                      if (linkToAnno) {
                                          var uri = attributes[j].value;
                                          btnAttr.setTag("uri", uri);   
                                      }
                                      else if (linkToSugg) {
                                          var tmpId = attributes[j].tmpId;
                                          btnAttr.setTag("tmpId", tmpId);    
                                      }
                          
                                      btnAttr.onClick.addHandler(function(btn) {
                                          if (linkToAnno) {
                                              var u = btn.getTag("uri");
                                              this.onShowAnnotationLink.fire(u);
                                          }
                                          else if (linkToSugg) {
                                              var tmp = btn.getTag("tmpId");
                                              this.onShowNestedSuggestion.fire(tmp);
                                          }
                                          
                                      }, this);
                                      
                                      firstAttrInListLoaded = true;
                                      
                                      elementContainer.addChild(elementAttr);
                                      this.setSuggUiNestedAttributes(annotation, elementContainer);
                                      // -----
                                  }
                                  
                                  // ----- load other items of the list
                                  elementAttr = AEd.$(document.createElement('p'));
                                  elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE);
                                  
                                  var j = iAttr;
                                  var text = "";
                                  
                                  var linkToAnno = false;
                                  var linkToSugg = false;
                                  var annotation = null;
                                  if (this.annotations && this.annotations.getAnnotationByURI(attributes[j].value)) {
                                      annotation = this.annotations.getAnnotationByURI(attributes[j].value);
                                      linkToAnno = true;  
                                  }
                                  else if (this.suggestions && this.suggestions.getSuggestionByTmpId(attributes[j].tmpId)) {
                                      annotation = this.suggestions.getSuggestionByTmpId(attributes[j].tmpId);
                                      linkToSugg = true;
                                  }
                                  
                                  if (linkToAnno) {
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
                                  }
                                  else if (linkToSugg) {
                                      if (annotation && annotation.isDocSuggestion) {
                                          text = AEd.I18n.t("Fragment_document_suggestion");
                                      }
                                      else if (annotation && annotation.fragments && annotation.fragments.length) {
                                         for (var k = 0; k < annotation.fragments.length; k++) {
                                              text += annotation.fragments[k].fragmentText;
                                         }
                                         if (text.length > 15) {
                                              text = text.substr(0, 15) + " ...";  
                                         }
                                     }    
                                  }
                                  
                                  var btnAttr = new AEd.ui.core.UIButton({icon: "explore", text: text});                            
                                  btnAttr.render(elementAttr);
                                  
                                  if (linkToAnno) {
                                      var uri = attributes[j].value;
                                      btnAttr.setTag("uri", uri);   
                                  }
                                  else if (linkToSugg) {
                                      var tmpId = attributes[j].tmpId;
                                      btnAttr.setTag("tmpId", tmpId);    
                                  }
                          
                                  btnAttr.onClick.addHandler(function(btn) {
                                      if (linkToAnno) {
                                          var u = btn.getTag("uri");
                                          this.onShowAnnotationLink.fire(u);
                                      }
                                      else if (linkToSugg) {
                                          var tmp = btn.getTag("tmpId");
                                          this.onShowNestedSuggestion.fire(tmp);
                                      }
                                  }, this);
                                  
                                  attributes[iAttr].loaded = true; 
                                  isList = true;
                                  
                                  elementContainer.addChild(elementAttr);
                                  this.setSuggUiNestedAttributes(annotation, elementContainer);
                                  // -----
                              }
                          }
                                                    
                          if (!isList) { // if there is no list, list already loaded                     
                              
                              // ----- name of attribute
                              var elementAttr = AEd.$(document.createElement('p'));
                              elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_SIMPLE_ATTR_STYLE);
                              
                              var j = i;
                              var linkToAnno = false;
                              var linkToSugg = false;
                              var annotation = null; 
                              if (this.annotations && this.annotations.getAnnotationByURI(attributes[j].value)) {
                                  annotation = this.annotations.getAnnotationByURI(attributes[j].value);
                                  linkToAnno = true;  
                              }
                              else if (this.suggestions && this.suggestions.getSuggestionByTmpId(attributes[j].tmpId)) {
                                  annotation = this.suggestions.getSuggestionByTmpId(attributes[j].tmpId);
                                  linkToSugg = true;
                              }
                               
                              if (linkToAnno) {
                                  elementAttr.setInnerHTML(attributes[j].name + ": " + AEd.I18n.t("Fragment_annotation_links"));
                              }
                              else if (linkToSugg) {
                                  elementAttr.setInnerHTML(attributes[j].name + ": " + AEd.I18n.t("Fragment_suggestion_links"));
                              } 
                              elementContainer.addChild(elementAttr);
                              // -----
                          
                              // ----- item
                              elementAttr = AEd.$(document.createElement('p'));
                              elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE);                                                                                 
                                      
                              var text = "";
                              if (linkToAnno) {
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
                              }
                              else if (linkToSugg) {
                                  if (annotation && annotation.isDocSuggestion) {
                                      text = AEd.I18n.t("Fragment_document_suggestion");
                                  }
                                  else if (annotation && annotation.fragments && annotation.fragments.length) {
                                     for (var k = 0; k < annotation.fragments.length; k++) {
                                          text += annotation.fragments[k].fragmentText;
                                     }
                                     if (text.length > 15) {
                                          text = text.substr(0, 15) + " ...";   
                                      }
                                 }    
                              }
                          
                              var btnAttr = new AEd.ui.core.UIButton({icon: "explore", text: text});                            
                              btnAttr.render(elementAttr);
                          
                              if (linkToAnno) {
                                  var uri = attributes[j].value;
                                  btnAttr.setTag("uri", uri);   
                              }
                              else if (linkToSugg) {
                                  var tmpId = attributes[j].tmpId;
                                  btnAttr.setTag("tmpId", tmpId);    
                              }
                          
                              btnAttr.onClick.addHandler(function(btn) {
                                  if (linkToAnno) {
                                      var u = btn.getTag("uri");
                                      this.onShowAnnotationLink.fire(u);
                                  }
                                  else if (linkToSugg) {
                                      var tmp = btn.getTag("tmpId");
                                      this.onShowNestedSuggestion.fire(tmp);
                                  }
                              }, this);
                              
                              elementContainer.addChild(elementAttr);
                              this.setSuggUiNestedAttributes(annotation, elementContainer);
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
                                      elementAttr.setInnerHTML(attributes[j].name + ": " + AEd.I18n.t("Fragment_nested_suggestions")); 
                                      elementContainer.addChild(elementAttr);
                                      // -----
                                      
                                      // ----- first item
                                      elementAttr = AEd.$(document.createElement('p'));
                                      elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE);
                                      
                                      var text = "";
                                      if (attributes[j].annotation.isDocSuggestion) {
                                          text = AEd.I18n.t("Fragment_document_suggestion");
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
                                      
                                      var tmpId = attributes[j].tmpId;
                                      btnAttr.setTag("tmpId", tmpId);
                          
                                      btnAttr.onClick.addHandler(function(btn) {
                                          var Id = btn.getTag("tmpId");
                                          this.onShowNestedSuggestion.fire(Id);
                                      }, this);
                                      
                                      firstAttrInListLoaded = true;
                                      
                                      elementContainer.addChild(elementAttr);
                                      this.setSuggUiNestedAttributes(attributes[j].annotation, elementContainer, true);
                                      // -----
                                  }
                                  
                                  // ----- load other items of the list
                                  elementAttr = AEd.$(document.createElement('p'));
                                  elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE);
                                  
                                  var j = iAttr;
                                  var text = "";
                                  if (attributes[j].annotation.isDocSuggestion) {
                                      text = AEd.I18n.t("Fragment_document_suggestion");
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
                                      
                                  var tmpId = attributes[j].tmpId;
                                  btnAttr.setTag("tmpId", tmpId);
                          
                                  btnAttr.onClick.addHandler(function(btn) {
                                      var Id = btn.getTag("tmpId");
                                      this.onShowNestedSuggestion.fire(Id);
                                  }, this);
                                  
                                  attributes[iAttr].loaded = true;
                                  isList = true;
                                  
                                  elementContainer.addChild(elementAttr);
                                  this.setSuggUiNestedAttributes(attributes[j].annotation, elementContainer, true);
                                  // -----
                              }
                          }
                                                    
                          if (!isList) { // if there is no list, list already loaded                     
                              
                              // ----- name of attribute
                              var elementAttr = AEd.$(document.createElement('p'));
                              elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_SIMPLE_ATTR_STYLE);
                          
                              var j = i;
                              elementAttr.setInnerHTML(attributes[j].name + ": " + AEd.I18n.t("Fragment_nested_suggestions")); 
                              elementContainer.addChild(elementAttr);
                              // ----- 
                          
                              // ----- item
                              elementAttr = AEd.$(document.createElement('p'));
                              elementAttr.setAttribute("style", AEd.CONFIG.DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE);
                                      
                              var text = "";
                              if (attributes[j].annotation.isDocSuggestion) {
                                  text = AEd.I18n.t("Fragment_document_suggestion");
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
                          
                              var tmpId = attributes[j].tmpId;
                              btnAttr.setTag("tmpId", tmpId);
                          
                              btnAttr.onClick.addHandler(function(btn) {
                                  var Id = btn.getTag("tmpId");
                                  this.onShowNestedSuggestion.fire(Id);
                              }, this);
                          
                              elementContainer.addChild(elementAttr);
                              this.setSuggUiNestedAttributes(attributes[j].annotation, elementContainer, true);
                              // -----
                          }                                                                
                      break;

                      default:
                      break; 
                  }
              }

              this.suggestionManager.level--;
              this.setContent(elementContainer);
          }
          else {

          }               
    }         
}



// -------------------------------------------------------- setSuggUiNestedAttributes
/**
 * Sets Suggestions Nested Attributes text
 *
 * @name setSuggUiNestedAttributes
 * @memberOf AEd.ui.Suggestion
 * @function    
 * @param {Object} annotation Annotation / suggestion to load.   
 * @param {Object} element annotation / suggestion element 
 * @param {Boolean} nestedSugg true if suggestion is nested suggestion  
 */
AEd.ui.Suggestion.prototype.setSuggUiNestedAttributes = function(annotation, element, nestedSugg) {

    if(!annotation){ // Annotation does not exist

       if (element.domElement.childNodes && element.domElement.childNodes.length){  // create this annotation link

          var child = element.domElement.childNodes[element.domElement.childNodes.length - 1];  
        
          if (child){  // append textNode

             element.domElement.removeChild(child);
 
             var thisAnn = document.createTextNode(AEd.I18n.t("Fragment_document_this_suggestion"));
             element.domElement.appendChild(thisAnn);
          }
       }

       return;
    }

    if (!nestedSugg && ((annotation instanceof AEd.entities.Suggestion && this.suggestionLinkTmpIds[annotation.tmpId]) || (annotation instanceof AEd.entities.Annotation && this.annotationLinkURIs[annotation.uri]))){   // Mutual linking loop prevention
 
       return;
    }    

    this.suggestionManager.level++;
    
    // creates new element for nested content
    var newObj = this.addNestedContent(element);
    
    var clonnedAnnotation = null;
    // creates new annotation instance for given annotation
    if (annotation instanceof AEd.entities.Annotation) {

        this.annotationLinkURIs[annotation.uri] = true;

        clonnedAnnotation = new AEd.entities.Annotation(
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
        attributes: annotation.attributes // Array of attributes
        }, this.annotations, this.fragments, this.gui, this.suggestionManager, this.suggestionManager.level, this.annotationLinkURIs, this.suggestionLinkTmpIds);
                
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
        
        // hide buttons
        clonnedAnnotation.ui.btnEdit.hide();
        clonnedAnnotation.ui.btnDelete.hide();
    }
    // or creates new suggestion instance for given suggestion
    else if (annotation instanceof AEd.entities.Suggestion) {

       this.suggestionLinkTmpIds[annotation.tmpId] = true;

        clonnedAnnotation = new AEd.entities.Suggestion(
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
        attributes: annotation.attributes, // Array of attributes
        tmpId: annotation.tmpId, // (Integer)
        confidence: annotation.confidence, // (Integer)
        parentTmpId: annotation.parentTmpId ? annotation.parentTmpId : "" // (Integer)
        }, this.annotations, this.suggestions, this.fragments, this.gui, this.suggestionManager, this.suggestionManager.level, this.suggestionLinkTmpIds, this.annotationLinkURIs);
            
        // sets important handlers
        clonnedAnnotation.ui.onShowNestedSuggestion.addHandler(function(tmpId) {
            var sugg = this.suggestions.getSuggestionByTmpId(tmpId);
            if (sugg) {
                if (sugg.isDocSuggestion) {
                    this.gui.showMessage(AEd.I18n.t("Selected_suggestion_is_document_suggestion"), AEd.I18n.t("You_can_find_it_in_Document_Suggestions_dialog"), "info");
                }
                else {
                    this.fragments.showNestedSuggestion(tmpId); 
                }    
            }           
        }, this);
          
        clonnedAnnotation.ui.onShowAnnotationLink.addHandler(function(uri) {
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
        
        // hide buttons accept and refuse do not exist in nested suggestion

        if (clonnedAnnotation.ui.btnAccept) {

           clonnedAnnotation.ui.btnAccept.hide();
        }

        clonnedAnnotation.ui.btnEdit.hide();

        if (clonnedAnnotation.ui.btnRefuse){

           clonnedAnnotation.ui.btnRefuse.hide();
        }
    }        
    
    // sets clonnedAnnotation content
    if (clonnedAnnotation && !clonnedAnnotation.ui.btnDetails.isDisabled) { // show content if exists
        clonnedAnnotation.ui.showContent();
        clonnedAnnotation.ui.btnDetails.setIcon("hide-details");
        clonnedAnnotation.ui.btnDetails.setTitle(AEd.I18n.t("Annotation_button_hide_details"));  
    }
    if (clonnedAnnotation && !clonnedAnnotation.ui.btnNestedDetails.isDisabled) { // show nested content if exists
        clonnedAnnotation.ui.showNestedContent();
        clonnedAnnotation.ui.btnNestedDetails.setIcon("hide-nested-details");
        clonnedAnnotation.ui.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_hide_nested_details"));  
    }
    
    // sets nested content
    if (clonnedAnnotation) {
      this.setNestedContent(newObj.element, clonnedAnnotation.ui.elementRoot, newObj.index);
    }
    
    // save as nestedSuggestion of given suggestion

    if (this.suggestionManager.nestedSuggestions){
      
       this.suggestionManager.nestedSuggestions.push(clonnedAnnotation);
    }

    else {

      this.suggestionManager.nestedAnnotations.push(clonnedAnnotation);
    }
}



// ----------------------------------------------------------------------- open
/**
 * Opens the message.  
 *
 * @name open
 * @memberOf AEd.ui.Suggestion
 * @function
 * @param {Element} element Optional element to render UIComponent to. 
 * @param {Number} index Optional index to render UIComponent at.	    	
 */
AEd.ui.Suggestion.prototype.open = function(element, index) {  
    this.render(element, index);
} 



// ---------------------------------------------------------------------- close
/**
 * Closes the message.  
 *
 * @name close
 * @memberOf AEd.ui.Suggestion
 * @function   	
 */
AEd.ui.Suggestion.prototype.close = function() {  
    this.remove();
}



// -------------------------------------------------------- setSuggUiAttributesNotFolded
/**
 * Sets Suggestion Attributes not folded
 *
 * @name setSuggUiAttributesNotFolded
 * @memberOf AEd.ui.Suggestion
 * @function
 */
AEd.ui.Suggestion.prototype.setSuggUiAttributesNotFolded = function(attributes) {
    if (!this.btnDetails.isDisabled) {         
        this.showContent();
        this.btnDetails.setIcon("hide-details");
        this.btnDetails.setTitle(AEd.I18n.t("Suggestion_button_hide_details"));
        this.onShowDetails.fire(this);       
    }
}



// -------------------------------------------------------- setSuggUiAttributesFolded
/**
 * Sets Suggestion Attributes folded
 *
 * @name setSuggUiAttributesFolded
 * @memberOf AEd.ui.Suggestion
 * @function
 */
AEd.ui.Suggestion.prototype.setSuggUiAttributesFolded = function(attributes) {
    if (!this.btnDetails.isDisabled) {         
        this.hideContent();
        this.btnDetails.setIcon("show-details");
        this.btnDetails.setTitle(AEd.I18n.t("Suggestion_button_show_details"));   
        this.onHideDetails.fire(this);       
    }
}



// -------------------------------------------------------- setSuggUiNestedAttributesNotFolded
/**
 * Sets Suggestion Nested Attributes not folded
 *
 * @name setSuggUiNestedAttributesNotFolded
 * @memberOf AEd.ui.Suggestion
 * @function
 */
AEd.ui.Suggestion.prototype.setSuggUiNestedAttributesNotFolded = function(attributes) {
    if (!this.btnNestedDetails.isDisabled) {         
        this.showNestedContent();
        this.btnNestedDetails.setIcon("hide-nested-details");
        this.btnNestedDetails.setTitle(AEd.I18n.t("Suggestion_button_hide_nested_details"));
        this.onShowNestedDetails.fire(this);       
    }
}



// -------------------------------------------------------- setSuggUiNestedAttributesFolded
/**
 * Sets Suggestion Nested Attributes folded
 *
 * @name setSuggUiNestedAttributesFolded
 * @memberOf AEd.ui.Suggestion
 * @function
 */
AEd.ui.Suggestion.prototype.setSuggUiNestedAttributesFolded = function(attributes) {
    if (!this.btnNestedDetails.isDisabled) {         
        this.hideNestedContent();
        this.btnNestedDetails.setIcon("show-nested-details");
        this.btnNestedDetails.setTitle(AEd.I18n.t("Suggestion_button_show_nested_details"));   
        this.onHideNestedDetails.fire(this);       
    }
}



// *****************************************************************************
// class AEd.ui.Suggestion
// ***************************************************************************** 

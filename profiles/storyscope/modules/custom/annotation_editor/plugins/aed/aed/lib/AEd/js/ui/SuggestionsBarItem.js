/**
 * SuggestionsBarItem.js
 *
 * Contains AEd.ui.SuggestionsBarItem class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.SuggestionBarItem
// *****************************************************************************  



/**
 * This class creates SuggestionsBarItem.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *    {String}  width           - button width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height          - button height with or without units, e.g.: "300px" or "100%", default unit is px, 
 *      
 *    {Element} srcElement      - DOM element to create button from.   
 *    {Element} targetElement   - DOM element to render button to. Default is document.body,    
 *    {Element} contentElement  - DOM element to place as a content of UIContainer. Default is none,      
 *    {Boolean} render          - determines wheteher UIContainer should be rendered after creating, 
 *    
 *    {String} text             - Content of item  
 *    {Boolean} isSelected      - is / is not this item selected 
 *    {Document} context        - safari support (ownerDocument of element)   
 * }
 *
 *        
 * @name SuggestionsBarItem
 * @memberOf AEd.ui.core      
 * @class 
 * @augments AEd.ui.core.UIComponent 
 */
AEd.ui.SuggestionsBarItem = function(config) {
   var c = config || {};    
   AEd.inheritFromObject(this, new AEd.ui.core.UIComponent(c));        
   
   this.CLASS_SUGGESTIONS_BAR_ITEM     = AEd.CONFIG.CLASS_UI_SUGGESTIONS_BAR_ITEM;
   this.CLASS_SUGGESTIONS_BAR_ITEM_SELECTED = AEd.CONFIG.CLASS_UI_SUGGESTIONS_BAR_ITEM_SELECTED;
   
   // *************************************************************************
   // DEFAULTS
   // *************************************************************************  

   this.DEFAULT_RENDER         = true;
   this.DEFAULT_NAME           = "";
   this.DEFAULT_TEXT           = "";
   this.DEFAULT_IS_SELECTED    = false;
   this.DEFAULT_SIMPLE_TYPE    = false;

   // *************************************************************************
   // CONFIG - OPTIONS
   // ************************************************************************* 
   
   c.srcElement     = typeof c.srcElement != 'undefined' ? c.srcElement : null;               
   c.contentElement = typeof c.contentElement != 'undefined' ? c.contentElement : null;  
   c.render         = typeof c.render != 'undefined' ? c.render : this.DEFAULT_RENDER;
   c.name           = typeof c.name != 'undefined' ? c.name : this.DEFAULT_NAME;
   c.text           = typeof c.text != 'undefined' ? c.text : this.DEFAULT_TEXT;
   c.simpleType     = typeof c.simpleType != 'undefined' ? c.simpleType : this.DEFAULT_SIMPLE_TYPE;
   c.isSelected     = typeof c.isSelected != 'undefined' ? c.isSelected : this.DEFAULT_IS_SELECTED;

   // *************************************************************************
   // EVENTS
   // *************************************************************************        

   /**
    * Fires when item is selected.
    * 
    * @event onSelected
    * @param {AEd.ui.SuggestionBarItem} oSuggestionsBatITem Target item.                                                   
    */         
   this.onSelected = new AEd.utils.Dispatcher();  
   
   /**
    * Fires when item is deselected.
    * 
    * @event onDeselected
    * @param {AEd.ui.SuggestionBarIteme} oSuggestionsBatITem Target item.                                                   
    */         
   this.onDeselected = new AEd.utils.Dispatcher();     
   
   /**
    * Fires when item is clicked.
    * 
    * @event onClick
    * @param {AEd.ui.SuggestionBarItem} oSuggestionsBatITem Target item.                                                   
    */         
   this.onClick = new AEd.utils.Dispatcher();           
   
   /**
    * Fires when mouse is over item.
    * 
    * @event onMouseOver
    * @param {AEd.ui.SuggestionBarItem} oSuggestionsBatITem Target item.                                                   
    */         
   this.onMouseOver = new AEd.utils.Dispatcher();      
  
   /**
    * Fires when mouse is out of item.
    * 
    * @event onMouseOut
    * @param {AEd.ui.SuggestionBarItem} oSuggestionsBatITem Target item.                                                   
    */         
   this.onMouseOut = new AEd.utils.Dispatcher();      

   // *************************************************************************
   // PROPERTIES
   // *************************************************************************   
   this.isRendered = false;
   this.name = c.name; 
   this.text = c.text;
   this.simpleType = c.simpleType;
   this.isSelected = c.isSelected;
   this.type = c.type;
   this.description = c.description;
   this.visualRepresentation = c.visualRepresentation;
   this.type = c.type;
   this.uri = c.uri;
   // *************************************************************************
   // CREATING HTML STRUCTURE
   // ************************************************************************* 
   
   // if creating from existing dom element
   if (c.srcElement) {        
      c.render = false;
      this.isRendered = true;    
      
      if (!this.elementRoot.hasClass(this.CLASS_SUGGESTIONS_BAR_ITEM)) {                                        
          throw new Error(AEd.I18n.t("Error_AEd_ui_core_SuggestionsBarItem_Error_in_creating_SuggestionsBarItem_from_source_element"));
      }
   }
   // creating new dom element
   else {            
      this.elementRoot.addClass(this.CLASS_SUGGESTIONS_BAR_ITEM);                      
   }

   if (c.contentElement) {
      this.add(c.contentElement);
   }

           
   // *************************************************************************
   // HANDLERS SETUP
   // *************************************************************************  

   this.elementRoot.addEventHandler("click", function() {
      this.onClick.fire(this);
   }, this);
   
   this.elementRoot.addEventHandler("mouseover", function() {
      this.onMouseOver.fire(this);
   }, this);  
  
   this.elementRoot.addEventHandler("mouseout", function() {
      this.onMouseOut.fire(this);
      
   }, this);  
   
   // *************************************************************************         
   if (c.render) {  
      this.render(this.elementTarget);   
   }


   // *************************************************************************
   //  SETUP
   // *************************************************************************   
   if (this.isSelected) {
      this.setSelected(true);
   }
   
   this.setText(this.text);
}



AEd.ui.SuggestionsBarItem.prototype.constructor = AEd.ui.SuggestionsBarItem;

AEd.inheritFromPrototype(AEd.ui.SuggestionsBarItem, AEd.ui.core.UIComponent);



// -------------------------------------------------------------------- getName
/**
 * Gets item name
 *
 * @name getName
 * @memberOf AEd.ui.SuggestionsBarItem
 * @function    
 * @return (String} Name value.    
 */
AEd.ui.SuggestionsBarItem.prototype.getName = function() {
    return this.name;
}

// -------------------------------------------------------------------- setText
/**
 * Sets item text
 *
 * @name setText
 * @memberOf AEd.ui.SuggestionsBarItem
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.SuggestionsBarItem.prototype.setText = function(value) {
    this.text = value;
    this.elementRoot.setInnerHTML(this.text); 
}


// -------------------------------------------------------------------- getText
/**
 * Gets item text
 *
 * @name getText
 * @memberOf AEd.ui.SuggestionsBarItem
 * @function    
 * @return (String} Text value.    
 */
AEd.ui.SuggestionsBarItem.prototype.getText = function() {
    if (this.simpleType) {
        return this.text.substr(0, this.text.search(AEd.I18n.t("Suggestion_bar_simple_types_suffix")) - 2);    
    }
    else {
        return this.text;
    }
}

// -------------------------------------------------------------------- isSimpleType
/**
 * Find out if item is simpleType or not.
 *
 * @name isSimpleType
 * @memberOf AEd.ui.SuggestionsBarItem
 * @function    
 * @return (Boolean} true if item is simpleType.    
 */
AEd.ui.SuggestionsBarItem.prototype.isSimpleType = function() {
    return this.simpleType;
}


// ---------------------------------------------------------------- setSelected
/**
 * Sets selection.
 *
 * @name setSelected
 * @memberOf AEd.ui.SuggestionsBarItem
 * @function  
 * @param {Object} value Value to assign.    
 */
AEd.ui.SuggestionsBarItem.prototype.setSelected = function(value) {      
    if (value) {
           this.isSelected = true;  
           this.elementRoot.addClass(this.CLASS_SUGGESTIONS_BAR_ITEM_SELECTED);
           this.onSelected.fire(this);                    
    }  
    else {   
           this.isSelected = false;  
           this.elementRoot.removeClass(this.CLASS_SUGGESTIONS_BAR_ITEM_SELECTED); 
           this.onDeselected.fire(this);     
    }  
} 


// *****************************************************************************
// class AEd.ui.SuggestionsBarItem
// ***************************************************************************** 

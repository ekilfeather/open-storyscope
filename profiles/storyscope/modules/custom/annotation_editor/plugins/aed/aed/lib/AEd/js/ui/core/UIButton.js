/**
 * UIButton.js
 *
 * Contains AEd.ui.core.UIButton class definition. 
 *  
 * @author: Martin Kleban, Petr Loukota 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.core.UIButton
// *****************************************************************************  



/**
 * This class creates UI button.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *    {String}  text         - button text,
 *    (String)  title        - button title,
 *    {String}  width        - button width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height       - button height with or without units, e.g.: "300px" or "100%", default unit is px,  
 *    
 *    {Boolean} toggle       - determines wheteher button should be toggle button,
 *    {Boolean} render       - determines wheteher button should be rendered after creating,
 *    {Boolean} disabled     - determines wheteher button should be disabled after creating, 
 *    {Boolean} selected     - determines wheteher button should be selected after creating, 
 *     
 *    {Element} targetElement  - DOM element to render button to. Default is document.body,
 *    {Element} srcElement     - DOM element to create button from.    
 *           
 *    {String}  icon         - "none" | "anno" | "info" | "error" | "warning" | "ok" | "loading" | "close"  | ...
 *    {Document} context        - safari support (ownerDocument of element)
 *    
 * }
 *
 *        
 * @name UIButton
 * @memberOf AEd.ui.core      
 * @class 
 * @augments AEd.ui.core.UIComponent 
 */
AEd.ui.core.UIButton = function(config) {
   var c = config || {};    
   c.rootElementType = "button";
   AEd.inheritFromObject(this, new AEd.ui.core.UIComponent(c));
   
  
   // *************************************************************************
   // CLASS NAMES
   // *************************************************************************    
   this.CLASS_BTN                      = AEd.CONFIG.CLASS_UI_BTN; 
   this.CLASS_BTN_NOTEXT               = AEd.CONFIG.CLASS_UI_BTN_NOTEXT;    
   this.CLASS_BTN_NOICON               = AEd.CONFIG.CLASS_UI_BTN_NOICON;     
   this.CLASS_BTN_DISABLED             = AEd.CONFIG.CLASS_UI_BTN_DISABLED;
   this.CLASS_BTN_SELECTED             = AEd.CONFIG.CLASS_UI_BTN_SELECTED;
   this.CLASS_BTN_HOVER                = AEd.CONFIG.CLASS_UI_BTN_HOVER; 

   this.CLASS_TEXT                     = AEd.CONFIG.CLASS_UI_BTN_TEXT;   
      
   this.CLASS_ICON                     = AEd.CONFIG.CLASS_UI_ICON;  
   this.CLASS_ICON_ERROR               = AEd.CONFIG.CLASS_UI_ICON_ERROR;
   this.CLASS_ICON_WARNING             = AEd.CONFIG.CLASS_UI_ICON_WARNING;
   this.CLASS_ICON_LOADING             = AEd.CONFIG.CLASS_UI_ICON_LOADING;
   this.CLASS_ICON_OK                  = AEd.CONFIG.CLASS_UI_ICON_OK;
   this.CLASS_ICON_INFO                = AEd.CONFIG.CLASS_UI_ICON_INFO;
   this.CLASS_ICON_ANNO                = AEd.CONFIG.CLASS_UI_ICON_ANNO;
   this.CLASS_ICON_CLOSE               = AEd.CONFIG.CLASS_UI_ICON_CLOSE; 
   this.CLASS_ICON_EDIT                = AEd.CONFIG.CLASS_UI_ICON_EDIT;                                                              
   this.CLASS_ICON_DELETE              = AEd.CONFIG.CLASS_UI_ICON_DELETE; 
   this.CLASS_ICON_ACCEPT              = AEd.CONFIG.CLASS_UI_ICON_ACCEPT;    
   this.CLASS_ICON_DECLINE             = AEd.CONFIG.CLASS_UI_ICON_DECLINE; 
   this.CLASS_ICON_SHOW_DETAILS        = AEd.CONFIG.CLASS_UI_ICON_SHOW_DETAILS;  
   this.CLASS_ICON_HIDE_DETAILS        = AEd.CONFIG.CLASS_UI_ICON_HIDE_DETAILS;
   this.CLASS_ICON_SHOW_NESTED_DETAILS = AEd.CONFIG.CLASS_UI_ICON_SHOW_NESTED_DETAILS;
   this.CLASS_ICON_HIDE_NESTED_DETAILS = AEd.CONFIG.CLASS_UI_ICON_HIDE_NESTED_DETAILS;  
   this.CLASS_ICON_EXPLORE             = AEd.CONFIG.CLASS_UI_ICON_EXPLORE;    
   this.CLASS_ICON_COLOR               = AEd.CONFIG.CLASS_UI_ICON_COLOR;                    
   this.CLASS_ICON_JOIN                = AEd.CONFIG.CLASS_UI_ICON_JOIN;                     
   this.CLASS_ICON_LEAVE               = AEd.CONFIG.CLASS_UI_ICON_LEAVE;
   this.CLASS_ICON_EXPAND_TREE         = AEd.CONFIG.CLASS_UI_ICON_EXPAND_TREE;
   this.CLASS_ICON_COLLAPSE_TREE       = AEd.CONFIG.CLASS_UI_ICON_COLLAPSE_TREE;     
   this.CLASS_ICON_SHOW_SELECTED       = AEd.CONFIG.CLASS_UI_ICON_SHOW_SELECTED;  
   
   this.iconClasses = {};
   this.iconClasses["error"]               = this.CLASS_ICON_ERROR;
   this.iconClasses["warning"]             = this.CLASS_ICON_WARNING;
   this.iconClasses["loading"]             = this.CLASS_ICON_LOADING;
   this.iconClasses["ok"]                  = this.CLASS_ICON_OK;
   this.iconClasses["info"]                = this.CLASS_ICON_INFO;
   this.iconClasses["anno"]                = this.CLASS_ICON_ANNO;    
   this.iconClasses["close"]               = this.CLASS_ICON_CLOSE; 
   this.iconClasses["edit"]                = this.CLASS_ICON_EDIT;      
   this.iconClasses["delete"]              = this.CLASS_ICON_DELETE; 
   this.iconClasses["accept"]              = this.CLASS_ICON_ACCEPT; 
   this.iconClasses["decline"]             = this.CLASS_ICON_DECLINE; 
   this.iconClasses["show-details"]        = this.CLASS_ICON_SHOW_DETAILS; 
   this.iconClasses["hide-details"]        = this.CLASS_ICON_HIDE_DETAILS;
   this.iconClasses["show-nested-details"] = this.CLASS_ICON_SHOW_NESTED_DETAILS; 
   this.iconClasses["hide-nested-details"] = this.CLASS_ICON_HIDE_NESTED_DETAILS; 
   this.iconClasses["explore"]             = this.CLASS_ICON_EXPLORE; 
   this.iconClasses["color"]               = this.CLASS_ICON_COLOR;                          
   this.iconClasses["join"]                = this.CLASS_ICON_JOIN;   
   this.iconClasses["leave"]               = this.CLASS_ICON_LEAVE;   
   this.iconClasses["expand-tree"]         = this.CLASS_ICON_EXPAND_TREE; 
   this.iconClasses["collapse-tree"]       = this.CLASS_ICON_COLLAPSE_TREE;    
   this.iconClasses["show-selected"]       = this.CLASS_ICON_SHOW_SELECTED;    
   
   this.iconClasses[this.CLASS_ICON_ERROR]               = "error";
   this.iconClasses[this.CLASS_ICON_WARNING]             = "warning";
   this.iconClasses[this.CLASS_ICON_LOADING]             = "loading";
   this.iconClasses[this.CLASS_ICON_OK]                  = "ok";
   this.iconClasses[this.CLASS_ICON_INFO]                = "info";
   this.iconClasses[this.CLASS_ICON_ANNO]                = "anno";            
   this.iconClasses[this.CLASS_ICON_CLOSE]               = "close";  
   this.iconClasses[this.CLASS_ICON_EDIT]                = "edit";     
   this.iconClasses[this.CLASS_ICON_DELETE]              = "delete";    
   this.iconClasses[this.CLASS_ICON_ACCEPT]              = "accept";    
   this.iconClasses[this.CLASS_ICON_DECLINE]             = "decline";    
   this.iconClasses[this.CLASS_ICON_SHOW_DETAILS]        = "show-details";    
   this.iconClasses[this.CLASS_ICON_HIDE_DETAILS]        = "hide-details";
   this.iconClasses[this.CLASS_ICON_SHOW_NESTED_DETAILS] = "show-nested-details";    
   this.iconClasses[this.CLASS_ICON_HIDE_NESTED_DETAILS] = "hide-nested-details";    
   this.iconClasses[this.CLASS_ICON_EXPLORE]             = "explore";    
   this.iconClasses[this.CLASS_ICON_COLOR]               = "color";     
   this.iconClasses[this.CLASS_ICON_JOIN]                = "join";  
   this.iconClasses[this.CLASS_ICON_LEAVE]               = "leave";    
   this.iconClasses[this.CLASS_ICON_EXPAND_TREE]         = "expand-tree";
   this.iconClasses[this.CLASS_ICON_COLLAPSE_TREE]       = "collapse-tree";  
   this.iconClasses[this.CLASS_ICON_SHOW_SELECTED]       = "show-selected";      
   
   // *************************************************************************
   // DEFAULTS
   // *************************************************************************  
   this.DEFAULT_TEXT           = "";
   this.DEFAULT_TITLE          = "";
   this.DEFAULT_ICON           = "none";   
   this.DEFAULT_TOGGLE         = false; 
   this.DEFAULT_RENDER         = true;
   this.DEFAULT_DISABLED       = false;
   this.DEFAULT_SELECTED       = false;  

   // *************************************************************************
   // CONFIG - BUTTON OPTIONS
   // ************************************************************************* 
   
   c.srcElement    = typeof c.srcElement != 'undefined' ? c.srcElement : null;               
   c.text          = typeof c.text != 'undefined' ? c.text : this.DEFAULT_TEXT;
   c.title         = typeof c.title != 'undefined' ? c.title : this.DEFAULT_TITLE;
   c.icon          = typeof c.icon != 'undefined' ? c.icon : this.DEFAULT_ICON;        
   c.render        = typeof c.render != 'undefined' ? c.render : this.DEFAULT_RENDER;
   c.disabled      = typeof c.disabled != 'undefined' ? c.disabled : this.DEFAULT_DISABLED;
   c.selected      = typeof c.selected != 'undefined' ? c.selected : this.DEFAULT_SELECTED;    

   // *************************************************************************
   // EVENTS
   // *************************************************************************        

   /**
    * Fires when button is selected.
    * 
    * @event onSelect
    * @param {AEd.ui.core.UIButton} button Target button.                                                   
    */         
   this.onSelect = new AEd.utils.Dispatcher();  
   
   /**
    * Fires when button is deselected.
    * 
    * @event onDeselect
    * @param {AEd.ui.core.UIButton} button Target button.                                                   
    */         
   this.onDeselect = new AEd.utils.Dispatcher();     
   
   /**
    * Fires when button is enabled.
    * 
    * @event onEnable
    * @param {AEd.ui.core.UIButton} button Target button.                                                   
    */         
   this.onEnable = new AEd.utils.Dispatcher();  
   
   /**
    * Fires when button is disabled.
    * 
    * @event onDisable
    * @param {AEd.ui.core.UIButton} button Target button.                                                   
    */         
   this.onDisable = new AEd.utils.Dispatcher();     
   
         
  
   // *************************************************************************
   // PROPERTIES
   // *************************************************************************   
        
   this.isDisabled    = c.disabled;     
   this.isSelected    = c.selected;        
   this.isHovered     = false;
     
   this.text          = c.text;
   this.title         = c.title;
   this.icon          = c.icon;
 
       

   // *************************************************************************
   // CREATING BUTTON HTML STRUCTURE
   // ************************************************************************* 
   
   // if creating from existing dom element
   if (c.srcElement) {     
   
      this.domElementIcon = null;
      this.domElementText = null;         
      this.elementIcon    = null;
      this.elementText    = null;
      
      
      this.isDisabled = this.elementRoot.hasClass(this.CLASS_BTN_DISABLED);     
      this.isSelected = this.elementRoot.hasClass(this.CLASS_BTN_SELECTED);       
      c.render = false;
      this.isRendered = true;      
      
      this.setTitle(this.title); // add button title            
            
      if (this.elementRoot.getChildNodes.length == 2) {
          this.domElementIcon = this.elementRoot.getChildNodes[0];
          this.domElementText = this.elementRoot.getChildNodes[1];
          this.elementIcon = AEd.$(this.domElementIcon);
          this.elementText = AEd.$(this.domElementText);
          if (this.elementIcon.getNodeName != "SPAN" || !this.elementIcon.hasClass(this.CLASS_ICON)) {
              throw new Error(AEd.I18n.t("Error_AEd_ui_core_UIButton_Error_in_creating_UIButton_from_source_element"));
          }
          if (this.elementText.getNodeName != "SPAN" || !this.elementText.hasClass(this.CLASS_TEXT)) {
              throw new Error(AEd.I18n.t("Error_AEd_ui_core_UIButton_Error_in_creating_UIButton_from_source_element"));
          }
           
          if (this.elementIcon.hasClass(this.CLASS_ICON_ERROR)) {
              this.icon = this.iconClasses[this.CLASS_ICON_ERROR];
          }
          else if (this.elementIcon.hasClass(this.CLASS_ICON_WARNING)) {
              this.icon = this.iconClasses[this.CLASS_ICON_WARNING];
          }
          else if (this.elementIcon.hasClass(this.CLASS_ICON_LOADING)) {
              this.icon = this.iconClasses[this.CLASS_ICON_LOADING];
          }
          else if (this.elementIcon.hasClass(this.CLASS_ICON_OK)) {
              this.icon = this.iconClasses[this.CLASS_ICON_OK];
          }
          else if (this.elementIcon.hasClass(this.CLASS_ICON_INFO)) {
              this.icon = this.iconClasses[this.CLASS_ICON_INFO];
          }
          else if (this.elementIcon.hasClass(this.CLASS_ICON_ANNO)) {                                        
              this.icon = this.iconClasses[this.CLASS_ICON_ANNO];
          }
          else {
              throw new Error(AEd.I18n.t("Error_AEd_ui_core_UIButton_Error_in_creating_UIButton_from_source_element"));
          }
                   
          this.text = this.elementText.getInnerHTML();  
             
      }
      else if (this.elementRoot.getChildNodes.length == 1) {     
          var tmpElement = AEd.$(this.elementRoot.getChildNodes[0]);              
          if (tmpElement.hasClass(this.CLASS_ICON)) {
              this.elementIcon = tmpElement;
              this.domElementIcon = tmpElement.domElement;
          }
          else if (tmpElement.hasClass(this.CLASS_TEXT)) {
              this.elementText = tmpElement;
              this.domElementText = tmpElement.domElement;
          } 
          else {
              throw new Error(AEd.I18n.t("Error_AEd_ui_core_UIButton_Error_in_creating_UIButton_from_source_element"));
          } 
      }
      else if (this.elementRoot.getChildNodes.length == 0) {           
         if (!this.elementRoot.hasClass(this.CLASS_BTN_NOICON)) {
            this.elementRoot.addClass(this.CLASS_BTN_NOICON);
         }
         if (!this.elementRoot.hasClass(this.CLASS_BTN_NOTEXT)) {
            this.elementRoot.addClass(this.CLASS_BTN_NOTEXT);
         }         
      }
      else {
          throw new Error(AEd.I18n.t("Error_AEd_ui_core_UIButton_Error_in_creating_UIButton_from_source_element"));
      }
   }
   // creating new dom element
   else {

      var doc = (c.context && AEd.isAppleSafari) ? c.context : document;

      this.domElementIcon      = doc.createElement('span');
      this.domElementText      = doc.createElement('span');
      this.elementIcon         = AEd.$(this.domElementIcon);      
      this.elementText         = AEd.$(this.domElementText);
           
      this.elementRoot.addClass(this.CLASS_BTN);
      this.elementIcon.addClass(this.CLASS_ICON);
      this.elementText.addClass(this.CLASS_TEXT);
      
      // button with icon?
      if (this.icon != "none") {
          this.elementRoot.addChild(this.elementIcon);
          this.setIcon(this.icon);
      }
      else {
          this.elementRoot.addClass(this.CLASS_BTN_NOICON);
      }          
      // button with text?
      if (this.text) {
          this.elementRoot.addChild(this.elementText);
      }
      else {
          this.elementRoot.addClass(this.CLASS_BTN_NOTEXT);
      }              
               
      this.setText(this.text);
      this.setTitle(this.title); // add button title 
      this.setDisabled(this.isDisabled); 
      this.setSelected(this.isSelected);          
   }

           
   // *************************************************************************
   // HANDLERS SETUP
   // *************************************************************************  
   this.onMouseOver.addHandler(function(target) {
      this.setHover(true);
   }, this);

   this.onMouseOut.addHandler(function(target) {
      this.setHover(false);
   }, this);        

   if (c.toggle) {
       this.onClick.addHandler(function(target) {
          this.setSelected(!this.isSelected);
       }, this);   
   }

   // *************************************************************************         
   if (c.render) {  
      this.render(this.elementTarget);   
   }
   
   
}



AEd.ui.core.UIButton.prototype.constructor = AEd.ui.core.UIButton;

AEd.inheritFromPrototype(AEd.ui.core.UIButton, AEd.ui.core.UIComponent);

// --------------------------------------------------------- Button.setDisabled
/**
 * Sets disabled property.
 *
 * @name setDisabled
 * @memberOf AEd.ui.core.UIButton 
 * @function  
 * @param {Boolean} disabled New disabled value.   
 */
AEd.ui.core.UIButton.prototype.setDisabled = function(disabled) {
   if (this.isDisabled != disabled) {
      this.isDisabled = disabled;
      if (this.isDisabled) {
         this.elementRoot.addClass(this.CLASS_BTN_DISABLED); 
      }
      else {
         this.elementRoot.removeClass(this.CLASS_BTN_DISABLED);
      }      
   }
} 

// --------------------------------------------------------- Button.setSelected
/**
 * Sets selected property.
 *
 * @name setSelected
 * @memberOf AEd.ui.core.UIButton 
 * @function   
 * @param {Boolean} selected New selected value.   
 */
AEd.ui.core.UIButton.prototype.setSelected = function(selected) {
   if (this.isSelected != selected) {
      this.isSelected = selected;
      if (this.isSelected) {
         this.elementRoot.addClass(this.CLASS_BTN_SELECTED); 
      }
      else {
         this.elementRoot.removeClass(this.CLASS_BTN_SELECTED);
      }      
   }
} 

// ------------------------------------------------------------ Button.setHover
/**
 * Sets hover property.
 *
 * @name setHover
 * @memberOf AEd.ui.core.UIButton 
 * @function  
 * @param {Boolean} hover New hover value.   
 */
AEd.ui.core.UIButton.prototype.setHover = function(hover) {
   if (this.isHovered != hover) {
      this.isHovered = hover;
      if (this.isHovered) {
         this.elementRoot.addClass(this.CLASS_BTN_HOVER); 
      }
      else {
         this.elementRoot.removeClass(this.CLASS_BTN_HOVER);
      }      
   }
} 

// ------------------------------------------------------------- Button.setIcon
/**
 * Sets icon.
 *
 * @name setIcon
 * @memberOf AEd.ui.core.UIButton 
 * @function  
 * @param {String} icon New icon type.   
 */
AEd.ui.core.UIButton.prototype.setIcon = function(icon) {
    if (icon) {
   
       for (props in this.iconClasses) {
          this.elementIcon.removeClass(this.iconClasses[props]);
       }       
       this.icon = icon; 
       
       if (this.elementRoot.hasClass(this.CLASS_BTN_NOICON)) {
           if (icon != "none") {
              this.elementIcon.addClass(this.iconClasses[icon]);                          
              this.elementRoot.addChild(this.elementIcon, 0); 
           }          
       }
       else {
           if (icon != "none") {     
              this.elementIcon.addClass(this.iconClasses[icon]);            
           } 
           // icon == "none" 
           else {
              this.elementRoot.removeChild(this.elementIcon); 
              this.elementRoot.addClass(this.CLASS_BTN_NOICON);               
           }               
       }

    }
} 

// ------------------------------------------------------------- Button.setText
/**
 * Sets button text.
 *
 * @name setText
 * @memberOf AEd.ui.core.UIButton 
 * @function    
 * @param {String} text New text.   
 */
AEd.ui.core.UIButton.prototype.setText = function(text) {
    if (text) {
        if (this.elementRoot.hasClass(this.CLASS_BTN_NOTEXT)) {
            this.elementRoot.addChild(this.elementText);
            this.text = text;
            this.elementText.setInnerHTML(this.text);    
            this.elementRoot.removeClass(this.CLASS_BTN_NOTEXT);             
        }
        else {
            this.text = text;
            this.elementText.setInnerHTML(this.text);        
        }
    }
    else {
        if (!this.elementRoot.hasClass(this.CLASS_BTN_NOTEXT)) {
            this.elementRoot.addClass(this.CLASS_BTN_NOTEXT);
            this.elementRoot.removeChild(this.elementText);
            this.text = "";
            this.elementText.setInnerHTML(this.text);         
        }
    }
}

// ------------------------------------------------------------- Button.getText
/**
 * Returns button text.
 *
 * @name getText
 * @memberOf AEd.ui.core.UIButton 
 * @function   
 * @return {String} Dialog title text.   
 */
AEd.ui.core.UIButton.prototype.getText = function() {  
    return this.text;    
}   



// ------------------------------------------------------------- Button.setTitle
/**
 * Sets button title.
 *
 * @name setTitle
 * @memberOf AEd.ui.core.UIButton 
 * @function    
 * @param {String} title New title.   
 */
AEd.ui.core.UIButton.prototype.setTitle = function(title) {
    
    this.domElementRoot.title = title;
    this.title = title;
}



// ------------------------------------------------------------- Button.getTitle
/**
 * Returns button title.
 *
 * @name getTitle
 * @memberOf AEd.ui.core.UIButton 
 * @function   
 * @return {String} Button title.   
 */
AEd.ui.core.UIButton.prototype.getTitle = function() {  
    return this.title;    
}



// *****************************************************************************
// class AEd.ui.core.UIButton
// ***************************************************************************** 

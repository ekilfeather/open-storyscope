/**
 * UIMessage.js
 *
 * Contains AEd.ui.core.UIMessage class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.core.UIMessage
// *****************************************************************************  



/**
 * This class creates UIMessage.
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
 *    {Boolean} photo         - used in Person.js to display photo 
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
 * }
 *
 *        
 * @name UIMessage
 * @memberOf AEd.ui.core      
 * @class 
 * @augments AEd.ui.core.UIComponent 
 */
AEd.ui.core.UIMessage = function(config) {
   var c = config || {};    
   AEd.inheritFromObject(this, new AEd.ui.core.UIComponent(c));


   // *************************************************************************
   // CLASS NAMES
   // *************************************************************************    
   this.CLASS_MSG                      = AEd.CONFIG.CLASS_UI_MSG;
   this.CLASS_MSG_BUTTONS              = AEd.CONFIG.CLASS_UI_MSG_BUTTONS;   
   this.CLASS_MSG_MAIN                 = AEd.CONFIG.CLASS_UI_MSG_MAIN; 
   this.CLASS_MSG_MAIN_HEADER          = AEd.CONFIG.CLASS_UI_MSG_MAIN_HEADER; 
   this.CLASS_MSG_MAIN_CONTENT         = AEd.CONFIG.CLASS_UI_MSG_MAIN_CONTENT;
   this.CLASS_MSG_MAIN_NESTED_CONTENT  = AEd.CONFIG.CLASS_UI_MSG_MAIN_NESTED_CONTENT;       
   this.CLASS_MSG_TITLE                = AEd.CONFIG.CLASS_UI_MSG_TITLE;   
   this.CLASS_MSG_SUBTITLE             = AEd.CONFIG.CLASS_UI_MSG_SUBTITLE;   
   this.CLASS_MSG_HEADER_CONTENT       = AEd.CONFIG.CLASS_UI_MSG_HEADER_CONTENT;
   this.CLASS_MSG_HEADER_BAD_FRAGMENT  = AEd.CONFIG.CLASS_UI_MSG_HEADER_BAD_FRAGMENT;
   this.CLASS_MSG_NOICON               = AEd.CONFIG.CLASS_UI_MSG_NOICON;
   this.CLASS_MSG_PHOTO                = AEd.CONFIG.CLASS_UI_MSG_PHOTO;
          
          
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
   // *************************************************************************
   // DEFAULTS
   // ************************************************************************* 
   
   this.DEFAULT_TITLE          = "";
   this.DEFAULT_SUBTITLE       = "";   
   this.DEFAULT_RENDER         = true;
   this.DEFAULT_ICON           = "none"; 
   this.DEFAULT_ICON_COLOR     = "#FFFFFF";
   this.DEFAULT_HEADER_CONTENT = "";
   this.DEFAULT_CONTENT        = "";    
   this.DEFAULT_HEADER_BAD_FRAGMENT = "";
   this.DEFAULT_PHOTO          = false;     

   // *************************************************************************
   // CONFIG - DIALOG OPTIONS
   // ************************************************************************* 
   c.title         = typeof c.title != 'undefined' ? c.title : this.DEFAULT_TITLE;
   c.subtitle      = typeof c.subtitle != 'undefined' ? c.subtitle : this.DEFAULT_SUBTITLE;   
   c.render        = typeof c.render != 'undefined' ? c.render : this.DEFAULT_RENDER;
   c.icon          = typeof c.icon != 'undefined' ? c.icon : this.DEFAULT_ICON;     
   c.iconColor     = typeof c.iconColor != 'undefined' ? c.iconColor : this.DEFAULT_ICON_COLOR; 
   c.headerContent = typeof c.headerContent != 'undefined' ? c.headerContent : this.DEFAULT_HEADER_CONTENT; 
   c.headerBadFragment = typeof c.headerBadFragment != 'undefined' ? c.headerBadFragment : this.DEFAULT_HEADER_BAD_FRAGMENT;
   c.content       = typeof c.content != 'undefined' ? c.content : this.DEFAULT_CONTENT;    
   c.photo         = typeof c.photo != 'undefined' ? c.photo : this.DEFAULT_PHOTO;        
   // *************************************************************************
   // EVENTS
   // ************************************************************************* 
   /**
    * Fires when content is changed.
    * 
    * @event onContentChange
    * @param {String | Element | AEd.dom.Element} content New content                                                   
    */         
   this.onContentChange = new AEd.utils.Dispatcher();    
   
   /**
    * Fires when nested content is changed.
    * 
    * @event onNestedContentChange
    * @param {String | Element | AEd.dom.Element} content New content                                                   
    */         
   this.onNestedContentChange = new AEd.utils.Dispatcher();
   
   
   // *************************************************************************
   // PROPERTIES
   // *************************************************************************   

   this.title         = c.title;
   this.subtitle      = c.subtitle;   
   this.icon          = c.icon;
   this.iconColor     = c.iconColor;
   this.headerContent = c.headerContent;
   this.headerBadFragment = c.headerBadFragment;
   this.content       = c.content;
   this.nestedContent = new Array();   
   this.isContentHidden = false;
   this.isNestedContentHidden = false;
   
   // *************************************************************************
   // CREATING MESSAGE HTML STRUCTURE
   // ************************************************************************* 
   
   this.domElementMain          = document.createElement('div'); 
   this.domElementHeader        = document.createElement('div');
   this.domElementContent       = document.createElement('div');    
   this.domElementIcon          = document.createElement('span');
   this.domElementTitle         = document.createElement('span');
   this.domElementSubtitle      = document.createElement('span');
   this.domElementHeaderContent = document.createElement('div');       
   this.domElementHeaderBadFragment = document.createElement('div');
   this.domElementImg           = document.createElement('img');  
   
   this.elementMain          = AEd.$(this.domElementMain);
   this.elementHeader        = AEd.$(this.domElementHeader);
   this.elementContent       = AEd.$(this.domElementContent);    
   this.elementIcon          = AEd.$(this.domElementIcon);
   this.elementTitle         = AEd.$(this.domElementTitle);
   this.elementSubtitle      = AEd.$(this.domElementSubtitle);
   this.elementHeaderContent = AEd.$(this.domElementHeaderContent);
   this.elementHeaderBadFragment = AEd.$(this.domElementHeaderBadFragment);   
   this.elementImg           = AEd.$(this.domElementImg);     

   this.elementMain.addChild(this.elementHeader);  
   this.elementMain.addChild(this.elementContent);       
   this.elementHeader.addChild(this.elementTitle); 
   this.elementHeader.addChild(this.elementSubtitle);
   this.elementHeader.addChild(this.elementHeaderContent);
   this.elementHeader.addChild(this.elementHeaderBadFragment)          
   this.elementRoot.addChild(this.elementMain);  
   
   this.elementRoot.onSetAnnoUiNestedAttributesFoldedFromLevel = new AEd.utils.Dispatcher();
   
   // message with icon?
   if (this.icon != "none") {
       this.elementRoot.addChild(this.elementIcon);
       this.setIcon(this.icon);
       if (this.icon == "color") {
           this.setIconColor(this.iconColor);
       }
   }
   else {
       this.elementRoot.addClass(this.CLASS_MSG_NOICON);
   }         
         
   this.buttonsArea = new AEd.ui.core.UIContainer();   
   this.buttonsArea.render(this.elementRoot);

   if (c.photo) {
       this.elementRoot.addChild(this.elementImg);
   }

   // *************************************************************************   
   
   this.elementRoot.addClass(this.CLASS_MSG);
   this.elementMain.addClass(this.CLASS_MSG_MAIN);  
   this.elementHeader.addClass(this.CLASS_MSG_MAIN_HEADER);  
   this.elementContent.addClass(this.CLASS_MSG_MAIN_CONTENT); 
   this.elementIcon.addClass(this.CLASS_ICON);    
   this.elementTitle.addClass(this.CLASS_MSG_TITLE);        
   this.elementSubtitle.addClass(this.CLASS_MSG_SUBTITLE);     
   this.elementHeaderContent.addClass(this.CLASS_MSG_HEADER_CONTENT);
   this.elementHeaderBadFragment.addClass(this.CLASS_MSG_HEADER_BAD_FRAGMENT);            
   this.buttonsArea.addClass(this.CLASS_MSG_BUTTONS);
   this.elementImg.addClass(this.CLASS_MSG_PHOTO);
   
   // *************************************************************************     
   
   this.setTitle(this.title);     
   this.setSubtitle(this.subtitle);
   this.setHeaderContent(this.headerContent);
   this.setHeaderBadFragment(this.headerBadFragment);
   this.setContent(this.content);   
   this.hideContent();     
   
   // *************************************************************************         
   if (c.render) {  
      this.render(this.elementTarget);   
   }   
   
}



AEd.ui.core.UIMessage.prototype.constructor = AEd.ui.core.UIMessage;

AEd.inheritFromPrototype(AEd.ui.core.UIMessage, AEd.ui.core.UIComponent);




// -------------------------------------------------------------------- setIcon
/**
 * Sets icon.
 *
 * @name setIcon
 * @memberOf AEd.ui.core.UIMessage 
 * @function  
 * @param {String} icon New icon type.   
 */
AEd.ui.core.UIMessage.prototype.setIcon = function(icon) {
    if (icon) {      
       for (props in this.iconClasses) {
          this.elementIcon.removeClass(this.iconClasses[props]);
       }       
       this.icon = icon; 
       
       if (this.elementRoot.hasClass(this.CLASS_MSG_NOICON)) {
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
              this.elementRoot.addClass(this.CLASS_MSG_NOICON);               
           }               
       }

    }
} 


// ------------------------------------------------------------------- setTitle
/**
 * Sets message title text.
 *
 * @name setTitle
 * @memberOf AEd.ui.core.UIMessage 
 * @function    
 * @param {String | Element | AEd.dom.Element} title New title.   
 */
AEd.ui.core.UIMessage.prototype.setTitle = function(title) {

    this.elementTitle.setInnerHTML("");
    
    if ((title && title.nodeType) || (title instanceof AEd.dom.Element)) {  
        this.elementTitle.addChild(title);
    }
    else {
        this.elementTitle.setInnerHTML(title); 
    }
    this.title = title;       
}


// ------------------------------------------------------------------- getTitle
/**
 * Gets message title text.
 *
 * @name getTitle
 * @memberOf AEd.ui.core.UIMessage 
 * @function    
 * @return {String | Element | AEd.dom.Element} title text.    
 */
AEd.ui.core.UIMessage.prototype.getTitle = function() {
    return this.elementTitle.getInnerHTML();       
}

// ---------------------------------------------------------------- setSubtitle
/**
 * Sets message subtitle text.
 *
 * @name setSubtitle
 * @memberOf AEd.ui.core.UIMessage 
 * @function    
 * @param {String | Element | AEd.dom.Element} subtitle New subtitle.   
 */
AEd.ui.core.UIMessage.prototype.setSubtitle = function(subtitle) {

    this.elementSubtitle.setInnerHTML("");
    
    if ((subtitle && subtitle.nodeType) || (subtitle instanceof AEd.dom.Element)) {  
        this.elementSubtitle.addChild(subtitle);
    }
    else {
        this.elementSubtitle.setInnerHTML(subtitle); 
    }
    this.subtitle = subtitle;         
}


// ---------------------------------------------------------------- getSubtitle
/**
 * Gets message subtitle text.
 *
 * @name getSubtitle
 * @memberOf AEd.ui.core.UIMessage 
 * @function    
 * @return {String | Element | AEd.dom.Element} subtitle text.    
 */
AEd.ui.core.UIMessage.prototype.getSubtitle = function() {
    return this.elementSubtitle.getInnerHTML();           
}



// ----------------------------------------------------------- setHeaderContent
/**
 * Sets header content.
 *
 * @name setHeaderContent
 * @memberOf AEd.ui.core.UIMessage 
 * @function    
 * @param {String | Element | AEd.dom.Element} content New content.   
 */
AEd.ui.core.UIMessage.prototype.setHeaderContent = function(content) {

    this.elementHeaderContent.setInnerHTML("");
    
    if ((content && content.nodeType) || (content instanceof AEd.dom.Element)) {  
        this.elementHeaderContent.addChild(content);
    }
    else {
        this.elementHeaderContent.setInnerHTML(content); 
    }
    this.headerContent = content;         
}


// ----------------------------------------------------------- getHeaderContent
/**
 * Gets header content.
 *
 * @name getHeaderContent
 * @memberOf AEd.ui.core.UIMessage 
 * @function    
 * @return {String | Element | AEd.dom.Element} Header content.    
 */
AEd.ui.core.UIMessage.prototype.getHeaderContent = function() {
    return this.elementHeaderContent.getInnerHTML();           
}



// ------------------------------------------------------- setHeaderBadFragment
/**
 * Sets header bad fragment.
 *
 * @name setHeaderBadFragment
 * @memberOf AEd.ui.core.UIMessage 
 * @function    
 * @param {String | Element | AEd.dom.Element} fragment New bad fragment.   
 */
AEd.ui.core.UIMessage.prototype.setHeaderBadFragment = function(fragment) {

    this.elementHeaderBadFragment.setInnerHTML("");
    
    if ((fragment && fragment.nodeType) || (fragment instanceof AEd.dom.Element)) {  
        this.elementHeaderBadFragment.addChild(fragment);
    }
    else {
        this.elementHeaderBadFragment.setInnerHTML(fragment); 
    }
    this.headerBadFragment = fragment;         
}


// ------------------------------------------------------- getHeaderBadFragment
/**
 * Gets header bad fragment.
 *
 * @name getHeaderBadFragment
 * @memberOf AEd.ui.core.UIMessage 
 * @function    
 * @return {String | Element | AEd.dom.Element} Header bad fragment.    
 */
AEd.ui.core.UIMessage.prototype.getHeaderBadFragment = function() {
    return this.elementHeaderBadFragment.getInnerHTML();           
}



// ----------------------------------------------------------------- setContent
/**
 * Sets content.
 *
 * @name setContent
 * @memberOf AEd.ui.core.UIMessage 
 * @function    
 * @param {String | Element | AEd.dom.Element} content New content.   
 */
AEd.ui.core.UIMessage.prototype.setContent = function(content) {

    this.elementContent.setInnerHTML("");
    
    if ((content && content.nodeType) || (content instanceof AEd.dom.Element)) {  
        this.elementContent.addChild(content);
    }
    else {
        // Add zero-width spaces for line-breaking after slashes in message content
        content = content.replace(/([^:\/])\/([^>].)/g, "$1&#8203;/$2");
        this.elementContent.setInnerHTML(content);
    }
    this.content = content;     
    this.onContentChange.fire(content);        
}


// ----------------------------------------------------------------- getContent
/**
 * Gets content.
 *
 * @name getContent
 * @memberOf AEd.ui.core.UIMessage 
 * @function    
 * @return {String | Element | AEd.dom.Element} content.    
 */
AEd.ui.core.UIMessage.prototype.getContent = function() {
    return this.elementContent.getInnerHTML();           
}



// ---------------------------------------------------------------- hideContent
/**
 * Hides Content.  
 *
 * @name hideContent
 * @memberOf AEd.ui.core.UIMessage 
 * @function   
 *  	
 */
AEd.ui.core.UIMessage.prototype.hideContent = function() {  

   if (!this.isContentHidden) {
       this.isContentHidden = true;               
       this.elementContent.hide();    
   }

} 



// ---------------------------------------------------------------- showContent
/**
 * Shows Content.  
 *
 * @name showContent
 * @memberOf AEd.ui.core.UIMessage 
 * @function   
 *  	
 */
AEd.ui.core.UIMessage.prototype.showContent = function() {  
   if (this.isContentHidden) {
       this.isContentHidden = false;           
       this.elementContent.show();    
   }

} 


// --------------------------------------------------------------- setIconColor
/**
 * Sets icon color.  
 *
 * @name setIconColor
 * @memberOf AEd.ui.core.UIMessage 
 * @function   
 * @param {String} color Icon color (#FFFFFF, ...)	
 */
AEd.ui.core.UIMessage.prototype.setIconColor = function(color) {  
   if (color) {      
       this.elementIcon.setCssValue("background-color", color);    
   }

} 

// ----------------------------------------------------------------------- open
/**
 * Opens the message.  
 *
 * @name open
 * @memberOf AEd.ui.core.UIMessage 
 * @function
 * @param {Element} element Optional element to render UIComponent to. 
 * @param {Number} index Optional index to render UIComponent at.	    	
 */
AEd.ui.core.UIMessage.prototype.open = function(element, index) {  
    this.render(element, index);
    this.fadeIn(300);
} 

// ---------------------------------------------------------------------- close
/**
 * Closes the message.  
 *
 * @name close
 * @memberOf AEd.ui.core.UIMessage 
 * @function   	
 */
AEd.ui.core.UIMessage.prototype.close = function() {  
    this.fadeOut(300, this.remove, this);
}



// ---------------------------------------------------------------- addNestedContent
/**
 * Adds nested content.  
 *
 * @name addNestedContent
 * @memberOf AEd.ui.core.UIMessage 
 * @function   
 * 
 * @return (Element) elementNestedContent Created element for nested content.  	
 */
AEd.ui.core.UIMessage.prototype.addNestedContent = function(elem) {  

    var domElementNestedContent = document.createElement('div');
    var elementNestedContent = AEd.$(domElementNestedContent);
    elem.addChild(elementNestedContent);
    
    var object = {element: elementNestedContent,
                  content: null};
    this.nestedContent.push(object);
    
    elementNestedContent.addClass(this.CLASS_MSG_MAIN_NESTED_CONTENT);
    object["index"] = this.nestedContent.length - 1;
    
    elementNestedContent.show();
    return object;
}



// ----------------------------------------------------------------- setNestedContent
/**
 * Sets nested content to given element.
 *
 * @name setNestedContent
 * @memberOf AEd.ui.core.UIMessage 
 * @function
 * @param (Element) element Created element for nested content.     
 * @param {String | Element | AEd.dom.Element} content New content.
 * @param (Integer) index Index of element in array of nested elements.     
 */
AEd.ui.core.UIMessage.prototype.setNestedContent = function(element, content, index) {

    element.setInnerHTML("");
    if ((content && content.nodeType) || (content instanceof AEd.dom.Element)) {  
        element.addChild(content);
    }
    else {
        // Add zero-width spaces for line-breaking after slashes in message content
        content = content.replace(/([^:\/])\/([^>].)/g, "$1&#8203;/$2");
        element.setInnerHTML(content);
    }
    this.nestedContent[index].content = content;     
    this.onNestedContentChange.fire(content);        
}



// ----------------------------------------------------------------- getNestedContent
/**
 * Gets nested content.
 *
 * @name getNestedContent
 * @memberOf AEd.ui.core.UIMessage 
 * @function
 * @param (Integer) index Index of element in array of nested elements 
 *      
 * @return {String | Element | AEd.dom.Element} content.    
 */
AEd.ui.core.UIMessage.prototype.getNestedContent = function(index) {
    if (index) {
        return this.nestedContent[index].content.getInnerHTML();
    }
    else {
        var nestedContent = "";
        for (var i in this.nestedContent) {
            nestedContent += this.nestedContent[i].content.getInnerHTML();        
        }
        return nestedContent;
    }           
}



// ----------------------------------------------------------------- hasNestedContent
/**
 * Returns true if has nested content.
 *
 * @name hasNestedContent
 * @memberOf AEd.ui.core.UIMessage 
 * @function
 *      
 * @return {Boolean} true / false.    
 */
AEd.ui.core.UIMessage.prototype.hasNestedContent = function() {
    if (this.nestedContent.length > 0) {
        return true;
    }
    else {
        return false;
    }           
}



// ---------------------------------------------------------------- hideNestedContent
/**
 * Hides nested content.  
 *
 * @name hideNestedContent
 * @memberOf AEd.ui.core.UIMessage 
 * @function   
 *  	
 */
AEd.ui.core.UIMessage.prototype.hideNestedContent = function() {  

   if (!this.isNestedContentHidden) {
       this.isNestedContentHidden = true;               
       
       for (var i = 0; i < this.nestedContent.length; i++) {
          this.nestedContent[i].element.hide();
       }    
   }
} 



// ---------------------------------------------------------------- showNestedContent
/**
 * Shows nested content.  
 *
 * @name showNestedContent
 * @memberOf AEd.ui.core.UIMessage 
 * @function   
 *  	
 */
AEd.ui.core.UIMessage.prototype.showNestedContent = function() {  
   if (this.isNestedContentHidden) {
       this.isNestedContentHidden = false;           
       
       for (var i = 0; i < this.nestedContent.length; i++) {
          this.nestedContent[i].element.show();
       }   
   }
}



// *****************************************************************************
// class AEd.ui.core.UIMessage
// ***************************************************************************** 

/**
 * UIContainer.js
 *
 * Contains AEd.ui.core.UIContainer class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.core.UIContainer
// *****************************************************************************  



/**
 * This class creates UIContainer.
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
 *    {Document} context        - safari support (ownerDocument of element)    
 * }
 *
 *        
 * @name UIContainer
 * @memberOf AEd.ui.core      
 * @class 
 * @augments AEd.ui.core.UIComponent 
 */
AEd.ui.core.UIContainer = function(config) {
   var c = config || {};    
   AEd.inheritFromObject(this, new AEd.ui.core.UIComponent(c));
   
   this.CLASS_CONTAINER        = AEd.CONFIG.CLASS_UI_CONTAINER;
   this.CLASS_IFRAME_WRAPPER   = AEd.CONFIG.CLASS_UI_IFRAME_WRAPPER;     
       
   
   // *************************************************************************
   // DEFAULTS
   // *************************************************************************  

   this.DEFAULT_RENDER         = true;

   // *************************************************************************
   // CONFIG - BUTTON OPTIONS
   // ************************************************************************* 
   
   c.srcElement     = typeof c.srcElement != 'undefined' ? c.srcElement : null;               
   c.contentElement = typeof c.contentElement != 'undefined' ? c.contentElement : null;  
   c.render         = typeof c.render != 'undefined' ? c.render : this.DEFAULT_RENDER;
 
   // *************************************************************************
   // EVENTS
   // *************************************************************************        

        
  
   // *************************************************************************
   // PROPERTIES
   // *************************************************************************   
   this.isRendered = false; 
   this.items = new Array();    

   // *************************************************************************
   // CREATING HTML STRUCTURE
   // ************************************************************************* 
   
   // if creating from existing dom element
   if (c.srcElement) {        
      c.render = false;
      this.isRendered = true;    
      
      if (!this.elementRoot.hasClass(this.CLASS_CONTAINER)) {                                        
          throw new Error(AEd.I18n.t("Error_AEd_ui_core_UIContainer_Error_in_creating_UIContainer_from_source_element"));
      }
   }
   // creating new dom element
   else {            
      this.elementRoot.addClass(this.CLASS_CONTAINER);                      
   }

   if (c.contentElement) {
      this.add(c.contentElement);
   }

           
   // *************************************************************************
   // HANDLERS SETUP
   // *************************************************************************  


   // *************************************************************************         
   if (c.render) {  
      this.render(this.elementTarget);   
   }
   
   
}



AEd.ui.core.UIContainer.prototype.constructor = AEd.ui.core.UIContainer;

AEd.inheritFromPrototype(AEd.ui.core.UIContainer, AEd.ui.core.UIComponent);


// -------------------------------------------------------------------- getItem
/**
 * Gets item from container.
 *
 * @name getItem
 * @memberOf AEd.ui.core.UIContainer 
 * @function   
 * @return {Object} item Item. 
 */
AEd.ui.core.UIContainer.prototype.getItem = function() {  
   
   if (this.items && (this.items.length >= 1)) {

      return this.items[this.items.length - 1];
   }

}

// -------------------------------------------------------------------- addItem
/**
 * Adds item to container.
 *
 * @name addItem
 * @memberOf AEd.ui.core.UIContainer 
 * @function   
 * @param {Object} item Item to add. 
 * @param {Number} index for open call
 */
AEd.ui.core.UIContainer.prototype.addItem = function(item, index) {  

   if (item) {
      this.items.push(item);

      if (typeof index != 'undefined') {
          item.open(this.elementRoot, index);
      }
      else {
          item.open(this.elementRoot);
      }
   }

} 


// ----------------------------------------------------------------- removeItem
/**
 * Removes item from container.
 *
 * @name removeItem
 * @memberOf AEd.ui.core.UIContainer 
 * @function   
 * @param {Object} item Item to remove. 
 */
AEd.ui.core.UIContainer.prototype.removeItem = function(item) {  
      
   if (item) {    
      for (var i = 0 ; i < this.items.length; i++) {
         if (this.items[i] === item) {
            this.items.splice(i, 1);
         }             
      }     
      item.close();     
   }

} 


// ------------------------------------------------------------- removeAllItems
/**
 * Removes all items from container.
 *
 * @name removeAllItems
 * @memberOf AEd.ui.core.UIContainer 
 * @function   
 * @param {Object} item Item to remove. 
 */
AEd.ui.core.UIContainer.prototype.removeAllItems = function() {  
   this.items = new Array();
   this.elementRoot.setInnerHTML("");   
}


// ------------------------------------------------------------------- loadFrom
/**
 * Loads container content from file.
 *
 * @name loadFrom
 * @memberOf AEd.ui.core.UIContainer 
 * @function   
 * @param {String} pathToFile Path to file with content. 
 */
AEd.ui.core.UIContainer.prototype.loadFrom = function(pathToFile) {  
   
   if (pathToFile) {     
     
     var domElementIframeWrapper = document.createElement("div");
     var elementIframeWrapper    = AEd.$(domElementIframeWrapper);
     
     elementIframeWrapper.addClass(this.CLASS_IFRAME_WRAPPER);     
     
     this.domElementIframe =  document.createElement("iframe");
     this.domElementIframe.allowTransparency = true;
     this.domElementIframe.frameBorder = 0;
     this.domElementIframe.src = pathToFile;
     
     elementIframeWrapper.addChild(this.domElementIframe);                 
     this.elementRoot.addChild(elementIframeWrapper);
      
   }

} 

// *****************************************************************************
// class AEd.ui.core.UIContainer
// ***************************************************************************** 

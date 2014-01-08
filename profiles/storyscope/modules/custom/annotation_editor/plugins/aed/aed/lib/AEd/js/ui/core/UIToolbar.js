/**
 * UIToolbar.js
 *
 * Contains AEd.ui.core.UIToolbar class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.core.UIToolbar
// *****************************************************************************  



/**
 * This class creates UIToolbar.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *  
 *    {String}  title         - toolbar title text, 
 *    {String}  width         - toolbar width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height        - toolbar height with or without units, e.g.: "300px" or "100%", default unit is px,  
 *    {String}  minWidth      - toolbar minWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  minHeight     - toolbar minHeight with or without units, e.g.: "300px" or "100%", default unit is px,   
 *    {String}  maxWidth      - toolbar maxWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  maxHeight     - toolbar maxHeight with or without units, e.g.: "300px" or "100%", default unit is px,    
 *    {String}  corners       - rounded toolbar corners: "tl", "tr", "bl", "br", "top", "bottom", "right", "left", "all", "none", default is "all",  
 *    
 *    {Boolean} draggable     - will be toolbar draggable?, 
 *    {Boolean} resizable     - will be toolbar resizable?,  
 *    {Boolean} render        - determines wheteher toolbar should be rendered after creating
 *    {Boolean} center        - determines wheteher toolbar should be centered to screen after rendering
 *    {Boolean} allwaysOnTop  - will be this toolbar allways in the front of other dialogs?,        
 *    {Boolean} showOverlay   - will the overlay layer be displayed?,    
 *    {Element} srcElement     - DOM element to create dialog from. 
 *    {Element} targetElement  - DOM element to render dialog to. Default is document.body. 
 *    {Element} contentElement - DOM element to place as a content of dialog. Default is none.
 * }
 * 
 * @name UIToolbar
 * @memberOf AEd.ui.core      
 * @class 
 * @augments AEd.ui.core.UIDialog 
 */
AEd.ui.core.UIToolbar = function(config) {
   var c = config || {};    
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   
  
   // *************************************************************************
   // CLASS NAMES
   // *************************************************************************    
   this.CLASS_TOOLBAR                = AEd.CONFIG.CLASS_UI_TOOLBAR;                    
   
   // *************************************************************************
   // DEFAULTS
   // ************************************************************************* 
   
   this.DEFAULT_TITLE          = "";
   this.DEFAULT_WIDTH          = 300;
   this.DEFAULT_HEIGHT         = 25;
   this.DEFAULT_MIN_WIDTH      = 200;
   this.DEFAULT_MIN_HEIGHT     = 25;
   this.DEFAULT_MAX_WIDTH      = 800;
   this.DEFAULT_MAX_HEIGHT     = 600;  
       
   this.DEFAULT_CORNERS        = "all";
   this.DEFAULT_DRAGGABLE      = true;
   this.DEFAULT_RESIZABLE      = true;
   this.DEFAULT_RENDER         = true;
   this.DEFAULT_CENTER         = false;
   this.DEFAULT_ALLWAYS_ON_TOP = true;
   
   // *************************************************************************
   // CONFIG - DIALOG OPTIONS
   // ************************************************************************* 
   c.title          = typeof c.title != 'undefined' ? c.title : this.DEFAULT_TITLE;
   c.corners        = typeof c.corners != 'undefined' ? c.corners : this.DEFAULT_CORNERS; 
   c.draggable      = typeof c.draggable != 'undefined' ? c.draggable : this.DEFAULT_DRAGGABLE;
   c.resizable      = typeof c.resizable != 'undefined' ? c.resizable : this.DEFAULT_RESIZABLE;
   c.render         = typeof c.render != 'undefined' ? c.render : this.DEFAULT_RENDER;
   c.center         = typeof c.center != 'undefined' ? c.center : this.DEFAULT_CENTER;
   c.allwaysOnTop   = typeof c.allwaysOnTop != 'undefined' ? c.allwaysOnTop : this.DEFAULT_ALLWAYS_ON_TOP;   
   c.contentElement = typeof c.contentElement != 'undefined' ? c.contentElement : null; 
   
 
   // *************************************************************************
   // PROPERTIES
   // *************************************************************************   

   this.isDraggable    = c.draggable;
   this.isResizable    = c.resizable;
   this.isAllwaysOnTop = c.allwaysOnTop;
 

   
   // *************************************************************************
   // CREATING TOOLBAR HTML STRUCTURE
   // ************************************************************************* 


   this.elementRoot.addClass(this.CLASS_TOOLBAR);  
}



AEd.ui.core.UIToolbar.prototype.constructor = AEd.ui.core.UIToolbar;

AEd.inheritFromPrototype(AEd.ui.core.UIToolbar, AEd.ui.core.UIDialog);


// *****************************************************************************
// class AEd.ui.core.UIDialog
// ***************************************************************************** 

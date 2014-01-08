/**
 * UIDialog.js
 *
 * Contains AEd.ui.core.UIDialog class definition. 
 *  
 * @author: Martin Kleban, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.core.UIDialog
// *****************************************************************************  



/**
 * This class creates UIDialog.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
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
 *   
 * }
 *
 *        
 * @name UIDialog
 * @memberOf AEd.ui.core      
 * @class 
 * @augments AEd.ui.core.UIComponent 
 */
AEd.ui.core.UIDialog = function(config) {
   var c = config || {};    
   AEd.inheritFromObject(this, new AEd.ui.core.UIComponent(c));
   
  
   // *************************************************************************
   // CLASS NAMES
   // *************************************************************************    
   this.CLASS_DLG                 = AEd.CONFIG.CLASS_UI_DLG; 
   this.CLASS_DLG_HEADER          = AEd.CONFIG.CLASS_UI_DLG_HEADER; 
   this.CLASS_DLG_HEADER_BUTTONS  = AEd.CONFIG.CLASS_UI_DLG_HEADER_BUTTONS; 
   this.CLASS_DLG_TITLEBAR        = AEd.CONFIG.CLASS_UI_DLG_TITLEBAR;   
   this.CLASS_DLG_TITLE           = AEd.CONFIG.CLASS_UI_DLG_TITLE;       
   this.CLASS_DLG_CONTENT         = AEd.CONFIG.CLASS_UI_DLG_CONTENT;
   this.CLASS_DLG_BUTTONS         = AEd.CONFIG.CLASS_UI_DLG_BUTTONS;          
   this.CLASS_DLG_OVERLAY         = AEd.CONFIG.CLASS_UI_DLG_OVERLAY;   
   this.CLASS_CORNER_ALL          = AEd.CONFIG.CLASS_UI_CORNER_ALL;
   this.CLASS_CORNER_TOP          = AEd.CONFIG.CLASS_UI_CORNER_TOP;    
   this.CLASS_CORNER_RIGHT        = AEd.CONFIG.CLASS_UI_CORNER_RIGHT;   
   this.CLASS_CORNER_BOTTOM       = AEd.CONFIG.CLASS_UI_CORNER_BOTTOM;   
   this.CLASS_CORNER_LEFT         = AEd.CONFIG.CLASS_UI_CORNER_LEFT;   
   this.CLASS_CORNER_TL           = AEd.CONFIG.CLASS_UI_CORNER_TL; 
   this.CLASS_CORNER_TR           = AEd.CONFIG.CLASS_UI_CORNER_TR; 
   this.CLASS_CORNER_BL           = AEd.CONFIG.CLASS_UI_CORNER_BL; 
   this.CLASS_CORNER_BR           = AEd.CONFIG.CLASS_UI_CORNER_BR;         
   this.CLASS_CORNER_NONE         = AEd.CONFIG.CLASS_UI_CORNER_NONE;  


      
   this.cornerClasses = {};
   this.cornerClasses["all"]    = this.CLASS_CORNER_ALL;
   this.cornerClasses["top"]    = this.CLASS_CORNER_TOP;
   this.cornerClasses["bottom"] = this.CLASS_CORNER_BOTTOM;
   this.cornerClasses["right"]  = this.CLASS_CORNER_RIGHT;
   this.cornerClasses["left"]   = this.CLASS_CORNER_LEFT;     
   this.cornerClasses["tr"]     = this.CLASS_CORNER_TR;
   this.cornerClasses["tl"]     = this.CLASS_CORNER_TL;
   this.cornerClasses["br"]     = this.CLASS_CORNER_BR;
   this.cornerClasses["bl"]     = this.CLASS_CORNER_BL;   
   this.cornerClasses["none"]   = this.CLASS_CORNER_NONE;     
               
                     
   
   // *************************************************************************
   // DEFAULTS
   // ************************************************************************* 
   
   this.DEFAULT_TITLE          = "";
   this.DEFAULT_WIDTH          = 300;
   this.DEFAULT_HEIGHT         = 200;
   this.DEFAULT_MIN_WIDTH      = 200;
   this.DEFAULT_MIN_HEIGHT     = 100;
   this.DEFAULT_MAX_WIDTH      = 800;
   this.DEFAULT_MAX_HEIGHT     = 600;  
       
   this.DEFAULT_CORNERS        = "all";
   this.DEFAULT_DRAGGABLE      = true;
   this.DEFAULT_RESIZABLE      = true;
   this.DEFAULT_RENDER         = true;
   this.DEFAULT_CENTER         = true;
   this.DEFAULT_ALLWAYS_ON_TOP = false;
   this.DEFAULT_SHOW_OVERLAY   = false;        
   this.DEFAULT_AUTO_INIT      = true;  

   // *************************************************************************
   // CONFIG - DIALOG OPTIONS
   // ************************************************************************* 
   c.title         = typeof c.title != 'undefined' ? c.title : this.DEFAULT_TITLE;
   c.corners       = typeof c.corners != 'undefined' ? c.corners : this.DEFAULT_CORNERS; 
   c.draggable     = typeof c.draggable != 'undefined' ? c.draggable : this.DEFAULT_DRAGGABLE;
   c.resizable     = typeof c.resizable != 'undefined' ? c.resizable : this.DEFAULT_RESIZABLE;
   c.render        = typeof c.render != 'undefined' ? c.render : this.DEFAULT_RENDER;
   c.center        = typeof c.center != 'undefined' ? c.center : this.DEFAULT_CENTER;
   c.allwaysOnTop  = typeof c.allwaysOnTop != 'undefined' ? c.allwaysOnTop : this.DEFAULT_ALLWAYS_ON_TOP;
   c.showOverlay   = typeof c.showOverlay != 'undefined' ?  c.showOverlay : this.DEFAULT_SHOW_OVERLAY;   
   
   c.width         =  typeof c.width != 'undefined' ?  c.width : this.DEFAULT_WIDTH;  
   c.height        =  typeof c.height != 'undefined' ?  c.height : this.DEFAULT_HEIGHT;     
   c.minWidth      =  typeof c.minWidth != 'undefined' ?  c.minWidth : this.DEFAULT_MIN_WIDTH;  
   c.minHeight     =  typeof c.minHeight != 'undefined' ?  c.minHeight : this.DEFAULT_MIN_HEIGHT;  
   c.maxWidth      =  typeof c.maxWidth != 'undefined' ?  c.maxWidth : this.DEFAULT_MAX_WIDTH;  
   c.maxHeight     =  typeof c.maxHeight != 'undefined' ?  c.maxHeight : this.DEFAULT_MAX_HEIGHT;  
         
   c.contentElement = typeof c.contentElement != 'undefined' ?  c.contentElement : null; 
   c.autoInit       = typeof c.autoInit != 'undefined' ?  c.autoInit : this.DEFAULT_AUTO_INIT; 
    
   
   // *************************************************************************
   // EVENTS
   // ************************************************************************* 
   
   /**
    * Fires when iframe content is loaded.
    * 
    * @event onContentLoaded  
    * @param {AEd.ui.core.UIComponent} target Target UIComponent.                                                   
    */   
   this.onContentLoaded = new AEd.utils.Dispatcher(); 
      
   /**
    * Fires before UIComponent is closed.
    * 
    * @event onClose  
    * @param {AEd.ui.core.UIComponent} target Target UIComponent.                                                   
    */   
   this.onClose = new AEd.utils.Dispatcher();     
   
   // *************************************************************************
   // PROPERTIES
   // *************************************************************************   

   this.isDraggable    = c.draggable;
   this.isResizable    = c.resizable;
   this.isAllwaysOnTop = c.allwaysOnTop;
   this.hasOverlay     = c.showOverlay;  

   
   // *************************************************************************
   // CREATING DIALOG HTML STRUCTURE
   // ************************************************************************* 
   this.domElementHeader          = document.createElement('div'); 
   this.domElementTitlebar        = document.createElement('div');   
   this.domElementTitle           = document.createElement('span'); 
   
   this.elementHeader         = AEd.$(this.domElementHeader);
   this.elementTitlebar       = AEd.$(this.domElementTitlebar);   
   this.elementTitle          = AEd.$(this.domElementTitle);
   
   this.elementHeader.addChild(this.elementTitlebar);  
   this.elementTitlebar.addChild(this.elementTitle);
   this.elementRoot.addChild(this.elementHeader); 
     
   this.headerButtonsArea  = new AEd.ui.core.UIContainer();
   this.contentArea        = new AEd.ui.core.UIContainer();
   this.buttonsArea        = new AEd.ui.core.UIContainer();   
   
   this.headerButtonsArea.render(this.elementHeader);   
   this.contentArea.render(this.elementRoot);
   this.buttonsArea.render(this.elementRoot);

   // *************************************************************************   
  
   
   this.elementRoot.addClass(this.CLASS_DLG);
   this.elementHeader.addClass(this.CLASS_DLG_HEADER);   
   this.elementTitlebar.addClass(this.CLASS_DLG_TITLEBAR);
   this.elementTitle.addClass(this.CLASS_DLG_TITLE);     
   this.headerButtonsArea.addClass(this.CLASS_DLG_HEADER_BUTTONS);   
   this.contentArea.addClass(this.CLASS_DLG_CONTENT);
   this.buttonsArea.addClass(this.CLASS_DLG_BUTTONS);     

   this.elementRoot.addClass(this.cornerClasses[c.corners]);
   this.elementHeader.addClass(this.cornerClasses[c.corners]);
   // *************************************************************************   

   if (c.autoInit) {
      this.init(c);
   }

   
   
}



AEd.ui.core.UIDialog.prototype.constructor = AEd.ui.core.UIDialog;

AEd.inheritFromPrototype(AEd.ui.core.UIDialog, AEd.ui.core.UIComponent);


// ----------------------------------------------------------------------- init
/**
 * Initialization function, 
 *
 * @name parentConstructor
 * @memberOf AEd.ui.core.UIDialog 
 * @function  
 */
AEd.ui.core.UIDialog.prototype.init = function(c) {

   this.contentLoaded = false;
   this.onContentLoaded.addHandler(function () {
      this.contentLoaded = true;
   }, this ) ;

   if (this.isDraggable) {
      this.setDraggable(this.elementTitlebar);
   }
   
   if (this.isResizable) {
      this.setResizable({
          width: c.width,
          height: c.height,      
          resizeMinWidth: c.minWidth,
          resizeMinHeight: c.minHeight,
          resizeMaxWidth: c.maxWidth,
          resizeMaxHeight: c.maxHeight         
      });
   }   
    
   if (this.hasOverlay) {
      this.createOverlay();
   }  
   
   this.setTitle(c.title);   
   this.setPosX(0);     
   this.setPosY(0);   

   // centered
   if (c.center) {
      this.onRender.addHandler(function(targetDialog) {

            var w = this.getWidth();
            var h = this.getHeight();
            
            if (!w) { w = this.elementRoot.getMaxWidth(); }
            if (!h) { h = this.elementRoot.getMaxHeight(); }
            
            var posX = ((AEd.DOM.getClientWidth() - w)/2 + AEd.DOM.getScrollX());
            var posY = ((AEd.DOM.getClientHeight() - h)/2 + AEd.DOM.getScrollY());
            this.moveTo(posX, posY);                  
      }, this);      
   }


   // *************************************************************************         
   if (c.render) {  
      this.render(this.elementTarget);   
   }
} 



// --------------------------------------------------------------------- render
/**
 * Renders UIDialog to this.domElementTarget element. Element document.body
 * is used as default. 
 *
 * @name render
 * @memberOf AEd.ui.core.UIDialog 
 * @function  
 * @param {Element} element Optional element to render UIComponent to. 
 * @param {Number} index Optional index to render UIComponent at.
 */
AEd.ui.core.UIDialog.prototype.render = function(element, index) {
    if (this.elementRoot) {
        if (element) {
            if (element instanceof AEd.dom.Element) {
                this.elementTarget = element;
                this.domElementTarget = this.elementTarget.domElement;
            }
            else {
                this.domElementTarget = element;
                this.elementTarget = AEd.$(element);            
            }   
        }
        if (this.elementTarget){
            if (this.hasOverlay) {
                if (this.elementOverlay) {
                    this.elementTarget.addChild(this.elementOverlay);
                }
            }          
        
            if (typeof index == 'number') {
                var childNodes = this.elementTarget.getChildNodes();
                if (childNodes[index]) { 
                    this.elementTarget.addChild(this.elementRoot, index);
                }
                else {
                    this.elementTarget.addChild(this.elementRoot);
                }
            }
            else {
                this.elementTarget.addChild(this.elementRoot);          
            }
            this.isRendered = true;   
            this.onRender.fire(this);          
        }      
    }
} 

// --------------------------------------------------------------------- remove
/**
 * Removes UIDialog.  
 *
 * @name remove
 * @memberOf AEd.ui.core.UIDialog 
 * @function   
 *  	
 */
AEd.ui.core.UIDialog.prototype.remove = function() {

   if (this.elementTarget && this.elementRoot && this.isRendered) {
      this.onRemove.fire();             
      if (this.hasOverlay && this.elementOverlay) {
         this.elementTarget.removeChild(this.elementOverlay);
      }           
      this.elementTarget.removeChild(this.elementRoot);
      this.isRendered = false;
   }
} 


// ---------------------------------------------------------------------- close
/**
 * Closes dialog.
 *
 * @name close
 * @memberOf AEd.ui.core.UIDialog 
 * @function  
 *  	
 */
AEd.ui.core.UIDialog.prototype.close = function() { 
   this.onClose.fire(this);
   this.remove(); 
}  


// ----------------------------------------------------------------------- hide
/**
 * Hides UIDialog.  
 *
 * @name hide
 * @memberOf AEd.ui.core.UIDialog 
 * @function   
 *  	
 */
AEd.ui.core.UIDialog.prototype.hide = function() {  

   if (!this.isHidden) {
       if (Cal != undefined) {   // hides date and time picker

         closewin(Cal.Ctrl);
       }

       if (AEdlibsduration != '') { // hides duration picker

         AEdlibsduration.hidePicker();
       }

       this.isHidden = true;
       if (this.hasOverlay && this.elementOverlay) {
           this.elementOverlay.hide();
       }                
       this.elementRoot.hide();  

   }

} 



// ----------------------------------------------------------------------- show
/**
 * Shows UIDialog.  
 *
 * @name show
 * @memberOf AEd.ui.core.UIDialog 
 * @function   
 *  	
 */
AEd.ui.core.UIDialog.prototype.show = function() {  
   if (this.isHidden) {
       this.isHidden = false;
       if (this.hasOverlay && this.elementOverlay) {
           this.elementOverlay.show();
       }                
       this.elementRoot.show();    
   }

} 



// ------------------------------------------------------------------ setZIndex
/**
 * Sets z-index css property.
 *
 * @name setZIndex
 * @memberOf AEd.ui.core.UIDialog 
 * @function    
 * @param {Number} zIndex New z-index value.  
 *  	
 */
AEd.ui.core.UIDialog.prototype.setZIndex = function(zIndex) {

    if (this.hasOverlay) {
       if (this.elementOverlay) {
           this.elementOverlay.setCssValue("zIndex", zIndex-1);
       }
    }  

    this.elementRoot.setCssValue("zIndex", zIndex);          

} 

// ------------------------------------------------------------------- setTitle
/**
 * Sets dialog title text.
 *
 * @name setTitle
 * @memberOf AEd.ui.core.UIDialog 
 * @function   
 * @param {String} title New title text.   
 */
AEd.ui.core.UIDialog.prototype.setTitle = function(title) {
    if (typeof title != 'undefined') {
       this.elementTitle.setInnerHTML(title); 
    }
}   

// ------------------------------------------------------------------- getTitle
/**
 * Returns dialog title text.
 *
 * @name getTitle
 * @memberOf AEd.ui.core.UIDialog 
 * @function   
 * @return {String} Dialog title text.   
 */
AEd.ui.core.UIDialog.prototype.getTitle = function() {
    return this.elementTitle.getInnerHTML();    
}  
        
// -------------------------------------------------------------- createOverlay
/**
 * Creates overlay layer.
 *
 * @name createOverlay
 * @memberOf AEd.ui.core.UIDialog 
 * @function  
 */
AEd.ui.core.UIDialog.prototype.createOverlay = function() {
    
    this.domElementOverlay  = document.createElement('div'); 
    this.elementOverlay     = AEd.$(this.domElementOverlay);  
    
    this.elementOverlay.addClass(this.CLASS_DLG_OVERLAY);

    this.resizeOverlay = function (e) {
       if (this.domElementOverlay) {   
          this.elementOverlay.setWidth(AEd.DOM.getClientWidth()  + AEd.DOM.getScrollX() + "px");
          this.elementOverlay.setHeight(AEd.DOM.getClientHeight()  + AEd.DOM.getScrollY() + "px");          
       }      
    };

    AEd.Events.addHandler(window, "resize", this.resizeOverlay, this);
    AEd.Events.addHandler(window, "scroll", this.resizeOverlay, this);
    
    this.onRemove.addHandler(function() { AEd.Events.removeHandler(window, "resize", this.resizeOverlay); }, this);   
    this.onRemove.addHandler(function() { AEd.Events.removeHandler(window, "move", this.resizeOverlay); }, this);
     
} 

// ------------------------------------------------------------------ setHeight
/**
 * Sets height css property.
 *
 * @name setHeight
 * @memberOf AEd.ui.core.UIDialog 
 * @function     
 * @param {Number or String} height New height value with or without units.  
 */
AEd.ui.core.UIDialog.prototype.setHeight = function(height) {
    if (typeof height == "number" || typeof height == "string") {
        this.elementRoot.setHeight(height); 
        var h;
        if (this.isHidden) {
            this.show();
            h = this.buttonsArea.elementRoot.getHeight();
            if (!h) { h = this.buttonsArea.elementRoot.getMaxHeight(); }
            this.hide();
        }
        else {
            h = this.buttonsArea.elementRoot.getHeight();
            if (!h) { h = this.buttonsArea.elementRoot.getMaxHeight(); }        
        }

        this.contentArea.setHeight(this.getHeight() -  h); 
        
    }
} 


// ------------------------------------------------------------- onContentReady
/**
 * Executes callback when content is loaded.
 *
 * @name onContentReady
 * @memberOf AEd.ui.core.UIDialog 
 * @function   
 * @param {Function} callback Function to execute.
 * @param {Object} scope Callback function scope.   
 */

AEd.ui.core.UIDialog.prototype.onContentReady = function(callback, scope) {
    var s = scope || window;
    
    
    if (typeof callback == "function") {
        if (this.contentLoaded) {
            callback.call(s);
        } 
        else {
            this.onContentLoaded.addHandler(callback, s);
        }                            
    }    
}  
// *****************************************************************************
// class AEd.ui.core.UIDialog
// ***************************************************************************** 

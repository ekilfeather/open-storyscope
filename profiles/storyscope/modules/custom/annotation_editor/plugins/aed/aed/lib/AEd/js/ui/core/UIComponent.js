/**
 * UIComponent.js
 *
 * Contains AEd.ui.core.UIComponent class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.core.UIComponent
// *****************************************************************************  



/**
 * This class creates UI Component.
 *
 * var config = {
 *    {String}  width           - button width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height          - button height with or without units, e.g.: "300px" or "100%", default unit is px,   
 *    {Element} srcElement      - DOM element to create Component from.   
 *    {Element} targetElement   - DOM element to render Component to. Default is document.body,      
 *    {String}  rootElementType - 'button' || 'div' || 'span' || ...
 *    {Document} context        - safari support (ownerDocument of element)    
 *    
 * }
 *         
 * @name UIComponent
 * @memberOf AEd.ui.core      
 * @class     
 */
AEd.ui.core.UIComponent = function(config) {
   var c = config || {};

   // *************************************************************************
   // CLASS NAMES
   // *************************************************************************    
   this.CLASS_DRAGGABLE             = AEd.CONFIG.CLASS_UI_DRAGGABLE; 
   this.CLASS_DRAGGABLE_HANDLE      = AEd.CONFIG.CLASS_UI_DRAGGABLE_HANDLE;
   this.CLASS_RESIZABLE             = AEd.CONFIG.CLASS_UI_RESIZABLE;
   this.CLASS_RESIZABLE_HANDLE      = AEd.CONFIG.CLASS_UI_RESIZABLE_HANDLE;
   this.CLASS_RESIZABLE_HANDLE_N    = AEd.CONFIG.CLASS_UI_RESIZABLE_HANDLE_N;
   this.CLASS_RESIZABLE_HANDLE_S    = AEd.CONFIG.CLASS_UI_RESIZABLE_HANDLE_S;
   this.CLASS_RESIZABLE_HANDLE_E    = AEd.CONFIG.CLASS_UI_RESIZABLE_HANDLE_E;         
   this.CLASS_RESIZABLE_HANDLE_W    = AEd.CONFIG.CLASS_UI_RESIZABLE_HANDLE_W; 
   this.CLASS_RESIZABLE_HANDLE_NE   = AEd.CONFIG.CLASS_UI_RESIZABLE_HANDLE_NE;
   this.CLASS_RESIZABLE_HANDLE_NW   = AEd.CONFIG.CLASS_UI_RESIZABLE_HANDLE_NW;
   this.CLASS_RESIZABLE_HANDLE_SE   = AEd.CONFIG.CLASS_UI_RESIZABLE_HANDLE_SE;         
   this.CLASS_RESIZABLE_HANDLE_SW   = AEd.CONFIG.CLASS_UI_RESIZABLE_HANDLE_SW; 
   
   
   this.DEFAULT_WIDTH             = null;
   this.DEFAULT_HEIGHT            = null;   
   this.DEFAULT_TARGET_ELEMENT    = (c.context && AEd.isAppleSafari) ? c.context.body : document.body;
   this.DEFAULT_ROOT_ELEMENT_TYPE = 'div';
   
   c.width           = typeof c.width != 'undefined' ? c.width : this.DEFAULT_WIDTH;
   c.height          = typeof c.height != 'undefined' ? c.height : this.DEFAULT_HEIGHT;   
   c.targetElement   = typeof c.targetElement != 'undefined' ? c.targetElement : this.DEFAULT_TARGET_ELEMENT; 
   c.rootElementType = typeof c.rootElementType != 'undefined' ? c.rootElementType : this.DEFAULT_ROOT_ELEMENT_TYPE; 
   c.srcElement      = typeof c.srcElement != 'undefined' ? c.srcElement : null; 
   
   
   // *************************************************************************
   // PROPERTIES
   // *************************************************************************
   this.width         = c.width;
   this.height        = c.height;
   this.isRendered    = false;
   this.isHidden      = false;   
   this.tags          = {} ; // tags object is used to store key = value 
                             // custom properties  

   if (c.srcElement) {
       this.domElementRoot      = c.srcElement;   
       this.domElementTarget    = AEd.$(this.domElementRoot).getParentNode();  
       this.elementTarget       = AEd.$(this.domElementTarget);              
       this.elementRoot         = AEd.$(this.domElementRoot);   
   }
   else {
       this.domElementTarget    = c.targetElement;

       var doc = (c.context && AEd.isAppleSafari) ? c.context : document;


       this.domElementRoot      = doc.createElement(c.rootElementType); 

   
       this.elementTarget       = AEd.$(this.domElementTarget);              
       this.elementRoot         = AEd.$(this.domElementRoot);          
       this.setWidth(c.width);
       this.setHeight(c.height);         
   }
   
  
 



   // *************************************************************************
   // EVENTS
   // ************************************************************************* 
   
   
   /**
    * Fires when UIComponent is rendered.
    * 
    * @event onRender  
    * @param {AEd.ui.core.UIComponent} target Target UIComponent.                                                   
    */   
   this.onRender = new AEd.utils.Dispatcher();  
   
   /**
    * Fires BEFORE UIComponent is removed.
    * 
    * @event onRemove                                                
    */   
   this.onRemove = new AEd.utils.Dispatcher();  
   
   /**
    * Fires when UIComponent is clicked.
    * 
    * @event onClick 
    * @param {AEd.ui.core.UIComponent} target Target UIComponent.                                                   
    */         
   this.onClick = new AEd.utils.Dispatcher();   

   /**
    * Fires when mouse is over the UIComponent.
    * 
    * @event onMouseOver 
    * @param {AEd.ui.core.UIComponent} target Target UIComponent.                                                   
    */         
   this.onMouseOver = new AEd.utils.Dispatcher();   

   /**
    * Fires when mouse is out of UIComponent.
    * 
    * @event onMouseOut
    * @param {AEd.ui.core.UIComponent} target Target UIComponent.                                                   
    */         
   this.onMouseOut = new AEd.utils.Dispatcher();   
   
   /**
    * Fires when component starts dragging.
    * 
    * @event onDragStart
    * @param {AEd.ui.core.UIComponent} target Target UIComponent.                                                   
    */         
   this.onDragStart = new AEd.utils.Dispatcher();   
   
   /**
    * Fires when dragging.
    * 
    * @event onDragMove
    * @param {AEd.ui.core.UIComponent} target Target UIComponent.                                                   
    */           
   this.onDragMove = new AEd.utils.Dispatcher();   
   
   /**
    * Fires when dragging stops.
    * 
    * @event onDragEnd    
    * @param {AEd.ui.core.UIComponent} target Target UIComponent.                                                   
    */         
   this.onDragStop = new AEd.utils.Dispatcher();     
   
   /**
    * Fires when resizing starts.
    * 
    * @event onResizeStart    
    * @param {AEd.ui.core.UIComponent} target Target UIComponent.                                                   
    */         
   this.onResizeStart = new AEd.utils.Dispatcher();      
   
   /**
    * Fires when resizing.
    * 
    * @event onResizeMove    
    * @param {AEd.ui.core.UIComponent} target Target UIComponent.                                                   
    */         
   this.onResizeMove = new AEd.utils.Dispatcher();    
   
   /**
    * Fires when resizing stops.
    * 
    * @event onResizeStop    
    * @param {AEd.ui.core.UIComponent} target Target UIComponent.                                                   
    */         
   this.onResizeStop = new AEd.utils.Dispatcher();     
   

   // *************************************************************************
   // EVENTS SETUP
   // *************************************************************************   
    
   // onClick
   this.elementRoot.addEventHandler("click", function(e) {                
       var event = AEd.Events.getEvent(e);
       AEd.Events.stopPropagation(event);       
       this.onClick.fire(this); 
       
   } , this);   
   
   // onMouseOver
   this.elementRoot.addEventHandler("mouseover", function(e) {
       this.onMouseOver.fire(this); 
   } , this);   
     
   // onMouseOut   
   this.elementRoot.addEventHandler("mouseout", function(e) {
       this.onMouseOut.fire(this); 
   } , this);    

     
}

AEd.ui.core.UIComponent.prototype.constructor = AEd.ui.core.UIComponent;



// --------------------------------------------------------------------- render
/**
 * Renders UIComponent to this.domElementTarget element. Element document.body
 * is used as default. 
 *
 * @name render
 * @memberOf AEd.ui.core.UIComponent 
 * @function  
 * @param {Element} element Optional element to render UIComponent to. 
 * @param {Number} index Optional index to render UIComponent at.
 */
AEd.ui.core.UIComponent.prototype.render = function(element, index) {
       
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
 * Removes UIComponent.  
 *
 * @name remove
 * @memberOf AEd.ui.core.UIComponent 
 * @function   
 *  	
 */
AEd.ui.core.UIComponent.prototype.remove = function() {
   
   if (this.elementTarget && this.elementRoot && this.isRendered) {
      this.onRemove.fire();
      this.elementTarget.removeChild(this.elementRoot);
      this.isRendered = false;
   }
} 



// ----------------------------------------------------------------------- open
/**
 * Opens UIComponent. In most cases it is the same as the render method.
 *
 * @name open
 * @memberOf AEd.ui.core.UIComponent 
 * @function   
 * @param {Element} element Optional element to render UIComponent to. 
 * @param {Number} index Optional index to render UIComponent at.	
 */
AEd.ui.core.UIComponent.prototype.open = function(element, index) {
    this.render(element, index);
} 



// ---------------------------------------------------------------------- close
/**
 * Closes UIComponent. In most cases it is the same as the remove.
 *
 * @name close
 * @memberOf AEd.ui.core.UIComponent 
 * @function   
 *  	
 */
AEd.ui.core.UIComponent.prototype.close = function() {
    this.remove();
} 


// ----------------------------------------------------------------------- hide
/**
 * Hides UIComponent.
 *
 * @name hide
 * @memberOf AEd.ui.core.UIComponent 
 * @function   
 *  	
 */
AEd.ui.core.UIComponent.prototype.hide = function() {
   this.isHidden = true;
   this.elementRoot.hide(); 
}         

// ----------------------------------------------------------------------- show
/**
 * Shows hidden UIComponent.
 *
 * @name show
 * @memberOf AEd.ui.core.UIComponent 
 * @function   
 *  	
 */
AEd.ui.core.UIComponent.prototype.show = function() {
   this.isHidden = false;
   this.elementRoot.show(); 
}      

// --------------------------------------------------------------------- fadeIn
/**
 * FadeIn animation of UIComponent.
 *
 * @name fadeIn
 * @memberOf AEd.ui.core.UIComponent 
 * @function   
 * @param {Number} duration Duration of animation in ms. 
 * @param {Number} callback Callback function to call after animation ends. 
 * @param {Number} scope Scope of callback function.  	
 */
AEd.ui.core.UIComponent.prototype.fadeIn = function(duration, callback, scope) {  
   this.elementRoot.fadeIn(duration, callback, scope);      
}    

// -------------------------------------------------------------------- fadeOut
/**
 * fadeOut animation of UIComponent.
 *
 * @name fadeOut
 * @memberOf AEd.ui.core.UIComponent 
 * @function   
 * @param {Number} duration Duration of animation in ms. 
 * @param {Number} callback Callback function to call after animation ends. 
 * @param {Number} scope Scope of callback function.  	
 */
AEd.ui.core.UIComponent.prototype.fadeOut = function(duration, callback, scope) {  
   this.elementRoot.fadeOut(duration, callback, scope);      
} 

// ----------------------------------------------------------------------- setVisibility
/**
 * Sets visibility css property.
 *
 * @name setVisibility
 * @memberOf AEd.ui.core.UIComponent 
 * @function   
 *  	
 */

AEd.ui.core.UIComponent.prototype.setVisibility = function(visibility) {

   this.elementRoot.setCssValue("visibility", visibility);
}


// ------------------------------------------------------------------ setZIndex
/**
 * Sets z-index css property.
 *
 * @name setZIndex
 * @memberOf AEd.ui.core.UIComponent 
 * @function   
 * @param {Number} zIndex New z-index value.  
 *  	
 */
AEd.ui.core.UIComponent.prototype.setZIndex = function(zIndex) { 
    this.elementRoot.setCssValue("zIndex", zIndex);          
} 

// ------------------------------------------------------------------- setWidth
/**
 * Sets width css property.
 *
 * @name setWidth
 * @memberOf AEd.ui.core.UIComponent 
 * @function   
 * @param {Number or String} width New width value with or without units.   
 */
AEd.ui.core.UIComponent.prototype.setWidth = function(width) {
    if (typeof width == "number" || typeof width == "string") {
        this.elementRoot.setWidth(width);  
    }
} 

// ------------------------------------------------------------------- getWidth
/**
 * Returns width css property.
 *
 * @name getWidth
 * @memberOf AEd.ui.core.UIComponent 
 * @function  
 * @return {Number} Width value without units.   
 */
AEd.ui.core.UIComponent.prototype.getWidth = function() {
    return this.elementRoot.getWidth();
} 

// ------------------------------------------------------------------ setHeight
/**
 * Sets height css property.
 *
 * @name setHeight
 * @memberOf AEd.ui.core.UIComponent 
 * @function     
 * @param {Number or String} height New height value with or without units.  
 */
AEd.ui.core.UIComponent.prototype.setHeight = function(height) {
    if (typeof height == "number" || typeof height == "string") {
        this.elementRoot.setHeight(height);  
    }
} 

// ------------------------------------------------------------------ getHeight
/**
 * Returns height css property.
 *
 * @name getHeight
 * @memberOf AEd.ui.core.UIComponent
 * @function     
 * @return {Number} Height value without units.   
 */
AEd.ui.core.UIComponent.prototype.getHeight = function() {
    return this.elementRoot.getHeight();
} 

// ------------------------------------------------------------------- addClass
/**
 * Adds specified class name to root div element
 *
 * @name addClass
 * @memberOf AEd.ui.core.UIComponent
 * @function   
 * @param {String} className Classname string. 
 */
AEd.ui.core.UIComponent.prototype.addClass = function(className) {
   this.elementRoot.addClass(className);
} 


// ---------------------------------------------------------------- removeClass
/**
 * Removes specified class name from root div element
 *
 * @name removeClass
 * @memberOf AEd.ui.core.UIComponent
 * @function   
 * @param {String} className Classname string. 
 */
AEd.ui.core.UIComponent.prototype.removeClass = function(className) {
   this.elementRoot.removeClass(className);
} 

// --------------------------------------------------------------------- moveBy
/**
 * Moves component by x and y px.
 *
 * @name moveBy
 * @memberOf AEd.ui.core.UIComponent
 * @function  
 * @param {Number} x Number of pixels to move by in X axis.  
 * @param {Number} y Number of pixels to move by in Y axis. 
 *  	
 */
AEd.ui.core.UIComponent.prototype.moveBy = function(x, y) {
    this.elementRoot.moveBy(x, y);
} 

// --------------------------------------------------------------------- moveTo
/**
 * Sets X and Y position of component.
 *
 * @name moveTo
 * @memberOf AEd.ui.core.UIComponent 
 * @function    
 * @param {Number} x New X position.  
 * @param {Number} y New Y position. 
 *  	
 */
AEd.ui.core.UIComponent.prototype.moveTo = function(x, y) {
    this.elementRoot.moveTo(x, y);
} 

// -------------------------------------------------------------------- setPosX
/**
 * Sets X position of component.
 *
 * @name setPosX
 * @memberOf AEd.ui.core.UIComponent
 * @function   
 * @param {Number} x New X position.  
 *  	
 */
AEd.ui.core.UIComponent.prototype.setPosX = function(x) {
    this.elementRoot.setPosX(x);
} 

// -------------------------------------------------------------------- setPosY
/**
 * Sets Y position of component.
 *
 * @name setPosY
 * @memberOf AEd.ui.core.UIComponent
 * @function   
 * @param {Number} y New Y position.  
 *  	
 */
AEd.ui.core.UIComponent.prototype.setPosY = function(y) {
    this.elementRoot.setPosY(y);
} 



// --------------------------------------------------------------- setDraggable
/**
 * Makes component draggable.
 *
 * @name setDraggable
 * @memberOf AEd.ui.core.UIComponent
 * @function 
 * @param {DOM Element | AEd.dom.Element} element Element that will be used as dragging handle.  
 */
AEd.ui.core.UIComponent.prototype.setDraggable = function(element) {

    var elementDrag;
    
    if (element) {
        if (element instanceof AEd.dom.Element) {
            elementDrag = element;
        }
        else {
            elementDrag = AEd.$(element);        
        }             
    }
    else {
        elementDrag = this.elementRoot;
    }    

    elementDrag.addClass(this.CLASS_DRAGGABLE_HANDLE);
    this.elementRoot.addClass(this.CLASS_DRAGGABLE);
     
    this.elementRoot.moveTo(this.elementRoot.getAbsPosX(),this.elementRoot.getAbsPosY());
    
    this.draggingState = "none";
    this.draggingStartPosX = 0;
    this.draggingStartPosY = 0;
    
    

    this.fnOnDragStart = function (e) {
       var event = AEd.Events.getEvent(e);
       AEd.Events.preventDefault(event);
       this.draggingState = "moving";         
       this.draggingStartPosX = AEd.Mouse.getAbsMouseX(event);
       this.draggingStartPosY = AEd.Mouse.getAbsMouseY(event);               
       this.onDragStart.fire(this);     
    }
  
    this.fnOnDragStop = function (e) {
       var event = AEd.Events.getEvent(e);
       AEd.Events.preventDefault(event);
       this.draggingState = "none";   
       this.onDragStop.fire(this);     
    }   
     
    this.fnOnDragMove = function (e) {
       var event = AEd.Events.getEvent(e);          
       
       if (this.draggingState == "moving" && (typeof this.resizingState == 'undefined' || this.resizingState == "none")) {
          AEd.Events.preventDefault(event);
          var tmpX, tmpY;
          tmpX = AEd.Mouse.getAbsMouseX(event);
          tmpY = AEd.Mouse.getAbsMouseY(event);
          this.moveBy(tmpX - this.draggingStartPosX, tmpY - this.draggingStartPosY);           
          this.draggingStartPosX = tmpX;
          this.draggingStartPosY = tmpY;   
          this.onDragMove.fire(this);
       }          
    }   
    
    this.fnOnDragIframeMove = function (e) {                   
        var event = AEd.Events.getEvent(e, this.iframe.contentWindow);          
        if (this.draggingState == "moving" && (typeof this.resizingState == 'undefined' || this.resizingState == "none")) {
            AEd.Events.preventDefault(event);
            var tmpX, tmpY; 
            tmpX = AEd.Mouse.getAbsMouseX(event);
            tmpY = AEd.Mouse.getAbsMouseY(event);                                       
            var newPosX = tmpX + this.elementRoot.getAbsPosX();
            var newPosY = tmpY + this.elementRoot.getAbsPosY();                     
            this.moveBy(newPosX - this.draggingStartPosX, newPosY - this.draggingStartPosY);           
            this.draggingStartPosX = newPosX;
            this.draggingStartPosY = newPosY;   
            this.onDragMove.fire(this);
                    
        }          
    }     
     
    elementDrag.addEventHandler("mousedown", this.fnOnDragStart, this);
    AEd.Events.addHandler(document, "mouseup", this.fnOnDragStop, this);
    AEd.Events.addHandler(document, "mousemove", this.fnOnDragMove, this);
   
} 



// --------------------------------------------------------------- setResizable
/**
 * Makes component resizable.
 * @example
 * params = {
 *    {Number} width,
 *    {Number} height, 
 *    {Number} resizeMinWidth,
 *    {Number} resizeMinHeight,
 *    {Number} resizeMaxWidth,
 *    {Number} resizeMaxHeight,   
 * } 
 *   
 *
 * @name setResizable
 * @memberOf AEd.ui.core.UIComponent 
 * @function  
 * @param {Object} params Parameters object.    
 */
AEd.ui.core.UIComponent.prototype.setResizable = function(params) {
    var p = params || {};

    var RESIZE_MIN_WIDTH   = typeof p.resizeMinWidth != 'undefined' ? p.resizeMinWidth : 0;
    var RESIZE_MIN_HEIGHT  = typeof p.resizeMinHeight != 'undefined' ? p.resizeMinHeight : 0;    
    var RESIZE_MAX_WIDTH   = typeof p.resizeMaxWidth != 'undefined' ? p.resizeMaxWidth : 10000;
    var RESIZE_MAX_HEIGHT  = typeof p.resizeMaxHeight != 'undefined' ? p.resizeMaxHeight : 10000;
    var RESIZE_WIDTH       = typeof p.width != 'undefined' ? p.width : RESIZE_MIN_WIDTH;
    var RESIZE_HEIGHT      = typeof p.height != 'undefined' ? p.height : RESIZE_MIN_HEIGHT;  
      
    // resize handles
    this.domElementResizeHandleN  = document.createElement('div');  
    this.domElementResizeHandleS  = document.createElement('div');
    this.domElementResizeHandleE  = document.createElement('div');
    this.domElementResizeHandleW  = document.createElement('div');
    this.domElementResizeHandleNE = document.createElement('div');
    this.domElementResizeHandleNW = document.createElement('div');
    this.domElementResizeHandleSE = document.createElement('div');
    this.domElementResizeHandleSW = document.createElement('div');

    this.elementResizeHandleN     = AEd.$(this.domElementResizeHandleN);    
    this.elementResizeHandleS     = AEd.$(this.domElementResizeHandleS);  
    this.elementResizeHandleE     = AEd.$(this.domElementResizeHandleE);  
    this.elementResizeHandleW     = AEd.$(this.domElementResizeHandleW);  
    this.elementResizeHandleNE    = AEd.$(this.domElementResizeHandleNE);  
    this.elementResizeHandleNW    = AEd.$(this.domElementResizeHandleNW);  
    this.elementResizeHandleSE    = AEd.$(this.domElementResizeHandleSE);  
    this.elementResizeHandleSW    = AEd.$(this.domElementResizeHandleSW);      
    
    this.elementRoot.addChild(this.elementResizeHandleN);
    this.elementRoot.addChild(this.elementResizeHandleS);
    this.elementRoot.addChild(this.elementResizeHandleE);
    this.elementRoot.addChild(this.elementResizeHandleW);
    this.elementRoot.addChild(this.elementResizeHandleNE);
    this.elementRoot.addChild(this.elementResizeHandleNW);
    this.elementRoot.addChild(this.elementResizeHandleSE);
    this.elementRoot.addChild(this.elementResizeHandleSW);       
   
    this.elementRoot.addClasses(this.CLASS_RESIZABLE); 
    
    this.elementResizeHandleN.addClass(this.CLASS_RESIZABLE_HANDLE);  
    this.elementResizeHandleS.addClass(this.CLASS_RESIZABLE_HANDLE);  
    this.elementResizeHandleE.addClass(this.CLASS_RESIZABLE_HANDLE);  
    this.elementResizeHandleW.addClass(this.CLASS_RESIZABLE_HANDLE);  
    this.elementResizeHandleNE.addClass(this.CLASS_RESIZABLE_HANDLE);  
    this.elementResizeHandleNW.addClass(this.CLASS_RESIZABLE_HANDLE);  
    this.elementResizeHandleSE.addClass(this.CLASS_RESIZABLE_HANDLE);  
    this.elementResizeHandleSW.addClass(this.CLASS_RESIZABLE_HANDLE);  
           
    this.elementResizeHandleN.addClass(this.CLASS_RESIZABLE_HANDLE_N);  
    this.elementResizeHandleS.addClass(this.CLASS_RESIZABLE_HANDLE_S);  
    this.elementResizeHandleE.addClass(this.CLASS_RESIZABLE_HANDLE_E);  
    this.elementResizeHandleW.addClass(this.CLASS_RESIZABLE_HANDLE_W);  
    this.elementResizeHandleNE.addClass(this.CLASS_RESIZABLE_HANDLE_NE);  
    this.elementResizeHandleNW.addClass(this.CLASS_RESIZABLE_HANDLE_NW);  
    this.elementResizeHandleSE.addClass(this.CLASS_RESIZABLE_HANDLE_SE);  
    this.elementResizeHandleSW.addClass(this.CLASS_RESIZABLE_HANDLE_SW);         

    this.resizingState = "none";
    this.resizingStartPosX = 0;
    this.resizingStartPosY = 0;   
    
    this.setWidth(RESIZE_WIDTH);
    this.setHeight(RESIZE_HEIGHT);
    
    
    this.fnOnResizeStartN = function(e) {
       var event = AEd.Events.getEvent(e);
       AEd.Events.preventDefault(event);
       this.resizingState = "n";         
       this.resizingStartPosX = AEd.Mouse.getAbsMouseX(event);
       this.resizingStartPosY = AEd.Mouse.getAbsMouseY(event); 
       this.onResizeStart.fire(this);   
    };     
    
    this.fnOnResizeStartS = function(e) {
       var event = AEd.Events.getEvent(e);
       AEd.Events.preventDefault(event);
       this.resizingState = "s";         
       this.resizingStartPosX = AEd.Mouse.getAbsMouseX(event);
       this.resizingStartPosY = AEd.Mouse.getAbsMouseY(event); 
       this.onResizeStart.fire(this);   
    };
    
    this.fnOnResizeStartE = function(e) {
       var event = AEd.Events.getEvent(e);
       AEd.Events.preventDefault(event);
       this.resizingState = "e";         
       this.resizingStartPosX = AEd.Mouse.getAbsMouseX(event);
       this.resizingStartPosY = AEd.Mouse.getAbsMouseY(event);  
       this.onResizeStart.fire(this);  
    };
    
    this.fnOnResizeStartW = function(e) {
       var event = AEd.Events.getEvent(e);
       AEd.Events.preventDefault(event);
       this.resizingState = "w";         
       this.resizingStartPosX = AEd.Mouse.getAbsMouseX(event);
       this.resizingStartPosY = AEd.Mouse.getAbsMouseY(event);  
       this.onResizeStart.fire(this);  
    };
    
    this.fnOnResizeStartNE = function(e) {
       var event = AEd.Events.getEvent(e);
       AEd.Events.preventDefault(event);
       this.resizingState = "ne";         
       this.resizingStartPosX = AEd.Mouse.getAbsMouseX(event);
       this.resizingStartPosY = AEd.Mouse.getAbsMouseY(event);  
       this.onResizeStart.fire(this);  
    };
    
    this.fnOnResizeStartNW = function(e) {
       var event = AEd.Events.getEvent(e);
       AEd.Events.preventDefault(event);
       this.resizingState = "nw";         
       this.resizingStartPosX = AEd.Mouse.getAbsMouseX(event);
       this.resizingStartPosY = AEd.Mouse.getAbsMouseY(event);  
       this.onResizeStart.fire(this);  
    };
    
    this.fnOnResizeStartSE = function(e) {
       var event = AEd.Events.getEvent(e);
       AEd.Events.preventDefault(event);
       this.resizingState = "se";         
       this.resizingStartPosX = AEd.Mouse.getAbsMouseX(event);
       this.resizingStartPosY = AEd.Mouse.getAbsMouseY(event);
       this.onResizeStart.fire(this);    
    };
    
    this.fnOnResizeStartSW = function(e) {
       var event = AEd.Events.getEvent(e);
       AEd.Events.preventDefault(event);
       this.resizingState = "sw";         
       this.resizingStartPosX = AEd.Mouse.getAbsMouseX(event);
       this.resizingStartPosY = AEd.Mouse.getAbsMouseY(event);   
       this.onResizeStart.fire(this); 
    };
      
      
    this.elementResizeHandleN.addEventHandler("mousedown", this.fnOnResizeStartN, this); 
    this.elementResizeHandleS.addEventHandler("mousedown", this.fnOnResizeStartS, this);
    this.elementResizeHandleE.addEventHandler("mousedown", this.fnOnResizeStartE, this);  
    this.elementResizeHandleW.addEventHandler("mousedown", this.fnOnResizeStartW, this);     
    this.elementResizeHandleNE.addEventHandler("mousedown", this.fnOnResizeStartNE, this); 
    this.elementResizeHandleNW.addEventHandler("mousedown", this.fnOnResizeStartNW, this);     
    this.elementResizeHandleSE.addEventHandler("mousedown", this.fnOnResizeStartSE, this);  
    this.elementResizeHandleSW.addEventHandler("mousedown", this.fnOnResizeStartSW, this);                


    this.fnOnResizeStop = function(e) {    
       var event = AEd.Events.getEvent(e);
       AEd.Events.preventDefault(event);
       this.resizingState = "none";       
       this.onResizeStop.fire(this); 
    } 
  
    AEd.Events.addHandler(document, "mouseup", this.fnOnResizeStop, this);    

    this.fnOnResizeMove = function(e) {
       var event = AEd.Events.getEvent(e);
       
       if (this.resizingState != "none") {
          AEd.Events.preventDefault(event);
          
          var tmpX, tmpY, dw, dh, w, h;
          tmpX = AEd.Mouse.getAbsMouseX(event);
          tmpY = AEd.Mouse.getAbsMouseY(event);
          dw = tmpX - this.resizingStartPosX;
          dh = tmpY - this.resizingStartPosY;      
          w = this.getWidth();
          h = this.getHeight();

                
          switch(this.resizingState) {
             case "n":
                if (dh<0) { if ((h-dh) >= RESIZE_MAX_HEIGHT) { this.setHeight(RESIZE_MAX_HEIGHT); dh = 0; } }
                else if (dh>0) { if ((h-dh) <= RESIZE_MIN_HEIGHT) {this.setHeight(RESIZE_MIN_HEIGHT); dh = 0; } }                                
                this.moveBy(0, dh);
                this.setHeight(h-dh);   
             break;                
             case "s": 
                if (dh<0) { if ((h+dh) <= RESIZE_MIN_HEIGHT) { this.setHeight(RESIZE_MIN_HEIGHT); dh = 0; } }
                else if (dh>0) { if ((h+dh) >= RESIZE_MAX_HEIGHT) {  this.setHeight(RESIZE_MAX_HEIGHT); dh = 0; } }               
                this.setHeight(h+dh);     
             break;
             case "e":
                if (dw<0) { if ((w-dw) <= RESIZE_MIN_WIDTH) { this.setWidth(RESIZE_MIN_WIDTH); dw = 0; } }
                else if (dw>0) { if ((w-dw) >= RESIZE_MAX_WIDTH) { this.setWidth(RESIZE_MAX_WIDTH); dw = 0; } }              
                this.setWidth(w+dw); 
             break;                          
             case "w": 
                if (dw<0) { if ((w+dw) >= RESIZE_MAX_WIDTH) { this.setWidth(RESIZE_MAX_WIDTH); dw = 0; } }
                else if (dw>0) { if ((w+dw) <= RESIZE_MIN_WIDTH) { this.setWidth(RESIZE_MIN_WIDTH); dw = 0; } }               
                this.moveBy(dw, 0);  
                this.setWidth(w-dw);             
             break;  
             
             case "ne":
                if (dh<0) { if ((h-dh) >= RESIZE_MAX_HEIGHT) { this.setHeight(RESIZE_MAX_HEIGHT); dh = 0; } }
                else if (dh>0) { if ((h-dh) <= RESIZE_MIN_HEIGHT) { this.setHeight(RESIZE_MIN_HEIGHT); dh = 0; } } 
                if (dw<0) { if ((w-dw) <= RESIZE_MIN_WIDTH) { this.setWidth(RESIZE_MIN_WIDTH); dw = 0; } }
                else if (dw>0) { if ((w-dw) >= RESIZE_MAX_WIDTH) { this.setWidth(RESIZE_MAX_WIDTH); dw = 0; } }                                   
                this.moveBy(0, dh);
                this.setHeight(h-dh);            
                this.setWidth(w+dw); 
             break;                  
             case "nw": 
                if (dh<0) { if ((h-dh) >= RESIZE_MAX_HEIGHT) { this.setHeight(RESIZE_MAX_HEIGHT); dh = 0; } }
                else if (dh>0) { if ((h-dh) <= RESIZE_MIN_HEIGHT) { this.setHeight(RESIZE_MIN_HEIGHT); dh = 0; } }  
                if (dw<0) { if ((w+dw) >= RESIZE_MAX_WIDTH) { this.setWidth(RESIZE_MAX_WIDTH); dw = 0; } }
                else if (dw>0) { if ((w+dw) <= RESIZE_MIN_WIDTH) { this.setWidth(RESIZE_MIN_WIDTH); dw = 0; } }                                
                this.moveBy(dw, dh); 
                this.setHeight(h-dh);            
                this.setWidth(w-dw);    
             break;                              
             case "se":
                if (dh<0) { if ((h+dh) <= RESIZE_MIN_HEIGHT) { this.setHeight(RESIZE_MIN_HEIGHT); dh = 0; } }
                else if (dh>0) { if ((h+dh) >= RESIZE_MAX_HEIGHT) { this.setHeight(RESIZE_MAX_HEIGHT); dh = 0; } } 
                if (dw<0) { if ((w-dw) <= RESIZE_MIN_WIDTH) { this.setWidth(RESIZE_MIN_WIDTH); dw = 0; } }
                else if (dw>0) { if ((w-dw) >= RESIZE_MAX_WIDTH) { this.setWidth(RESIZE_MAX_WIDTH); dw = 0; } }                                     
                this.setHeight(h+dh);            
                this.setWidth(w+dw);     
             break;                               
             case "sw": 
                if (dh<0) { if ((h+dh) <= RESIZE_MIN_HEIGHT) { this.setHeight(RESIZE_MIN_HEIGHT); dh = 0; } }
                else if (dh>0) { if ((h+dh) >= RESIZE_MAX_HEIGHT) { this.setHeight(RESIZE_MAX_HEIGHT); dh = 0; } } 
                if (dw<0) { if ((w+dw) >= RESIZE_MAX_WIDTH) { this.setWidth(RESIZE_MAX_WIDTH); dw = 0; } }
                else if (dw>0) { if ((w+dw) <= RESIZE_MIN_WIDTH) { this.setWidth(RESIZE_MIN_WIDTH); dw = 0; } }                                   
                this.moveBy(dw, 0);
                this.setHeight(h+dh);            
                this.setWidth(w-dw);           
             break; 
             default:
             break;                          
          }
         
          this.resizingStartPosX = tmpX;
          this.resizingStartPosY = tmpY;  
          this.onResizeMove.fire(this); 
       }           
            
    };

    this.fnOnResizeIframeMove = function(e) {
       var event = AEd.Events.getEvent(e, this.iframe.contentWindow);
      
       if (this.resizingState != "none") {
          AEd.Events.preventDefault(event);
          
          var tmpX, tmpY, dw, dh, w, h;
          tmpX = AEd.Mouse.getAbsMouseX(event) + this.elementRoot.getAbsPosX();
          tmpY = AEd.Mouse.getAbsMouseY(event) + this.elementRoot.getAbsPosY();
          
          dw = tmpX - this.resizingStartPosX;
          dh = tmpY - this.resizingStartPosY;      
          
          w = this.getWidth();
          h = this.getHeight();

                
          switch(this.resizingState) {
             case "n":
                if (dh<0) { if ((h-dh) >= RESIZE_MAX_HEIGHT) { this.setHeight(RESIZE_MAX_HEIGHT); dh = 0; } }
                else if (dh>0) { if ((h-dh) <= RESIZE_MIN_HEIGHT) {this.setHeight(RESIZE_MIN_HEIGHT); dh = 0; } }                                
                this.moveBy(0, dh);
                this.setHeight(h-dh);   
             break;                
             case "s": 
                if (dh<0) { if ((h+dh) <= RESIZE_MIN_HEIGHT) { this.setHeight(RESIZE_MIN_HEIGHT); dh = 0; } }
                else if (dh>0) { if ((h+dh) >= RESIZE_MAX_HEIGHT) {  this.setHeight(RESIZE_MAX_HEIGHT); dh = 0; } }               
                this.setHeight(h+dh);     
             break;
             case "e":
                if (dw<0) { if ((w-dw) <= RESIZE_MIN_WIDTH) { this.setWidth(RESIZE_MIN_WIDTH); dw = 0; } }
                else if (dw>0) { if ((w-dw) >= RESIZE_MAX_WIDTH) { this.setWidth(RESIZE_MAX_WIDTH); dw = 0; } }              
                this.setWidth(w+dw); 
             break;                          
             case "w": 
                if (dw<0) { if ((w+dw) >= RESIZE_MAX_WIDTH) { this.setWidth(RESIZE_MAX_WIDTH); dw = 0; } }
                else if (dw>0) { if ((w+dw) <= RESIZE_MIN_WIDTH) { this.setWidth(RESIZE_MIN_WIDTH); dw = 0; } }               
                this.moveBy(dw, 0);  
                this.setWidth(w-dw);             
             break;  
             
             case "ne":
                if (dh<0) { if ((h-dh) >= RESIZE_MAX_HEIGHT) { this.setHeight(RESIZE_MAX_HEIGHT); dh = 0; } }
                else if (dh>0) { if ((h-dh) <= RESIZE_MIN_HEIGHT) { this.setHeight(RESIZE_MIN_HEIGHT); dh = 0; } } 
                if (dw<0) { if ((w-dw) <= RESIZE_MIN_WIDTH) { this.setWidth(RESIZE_MIN_WIDTH); dw = 0; } }
                else if (dw>0) { if ((w-dw) >= RESIZE_MAX_WIDTH) { this.setWidth(RESIZE_MAX_WIDTH); dw = 0; } }                                   
                this.moveBy(0, dh);
                this.setHeight(h-dh);            
                this.setWidth(w+dw); 
             break;                  
             case "nw": 
                if (dh<0) { if ((h-dh) >= RESIZE_MAX_HEIGHT) { this.setHeight(RESIZE_MAX_HEIGHT); dh = 0; } }
                else if (dh>0) { if ((h-dh) <= RESIZE_MIN_HEIGHT) { this.setHeight(RESIZE_MIN_HEIGHT); dh = 0; } }  
                if (dw<0) { if ((w+dw) >= RESIZE_MAX_WIDTH) { this.setWidth(RESIZE_MAX_WIDTH); dw = 0; } }
                else if (dw>0) { if ((w+dw) <= RESIZE_MIN_WIDTH) { this.setWidth(RESIZE_MIN_WIDTH); dw = 0; } }                                
                this.moveBy(dw, dh); 
                this.setHeight(h-dh);            
                this.setWidth(w-dw);    
             break;                              
             case "se":
                if (dh<0) { if ((h+dh) <= RESIZE_MIN_HEIGHT) { this.setHeight(RESIZE_MIN_HEIGHT); dh = 0; } }
                else if (dh>0) { if ((h+dh) >= RESIZE_MAX_HEIGHT) { this.setHeight(RESIZE_MAX_HEIGHT); dh = 0; } } 
                if (dw<0) { if ((w-dw) <= RESIZE_MIN_WIDTH) { this.setWidth(RESIZE_MIN_WIDTH); dw = 0; } }
                else if (dw>0) { if ((w-dw) >= RESIZE_MAX_WIDTH) { this.setWidth(RESIZE_MAX_WIDTH); dw = 0; } }                                     
                this.setHeight(h+dh);            
                this.setWidth(w+dw);     
             break;                               
             case "sw": 
                if (dh<0) { if ((h+dh) <= RESIZE_MIN_HEIGHT) { this.setHeight(RESIZE_MIN_HEIGHT); dh = 0; } }
                else if (dh>0) { if ((h+dh) >= RESIZE_MAX_HEIGHT) { this.setHeight(RESIZE_MAX_HEIGHT); dh = 0; } } 
                if (dw<0) { if ((w+dw) >= RESIZE_MAX_WIDTH) { this.setWidth(RESIZE_MAX_WIDTH); dw = 0; } }
                else if (dw>0) { if ((w+dw) <= RESIZE_MIN_WIDTH) { this.setWidth(RESIZE_MIN_WIDTH); dw = 0; } }                                   
                this.moveBy(dw, 0);
                this.setHeight(h+dh);            
                this.setWidth(w-dw);           
             break; 
             default:
             break;                          
          }
         
          this.resizingStartPosX = tmpX;
          this.resizingStartPosY = tmpY;  
          this.onResizeMove.fire(this); 
       }           
            
    }

    AEd.Events.addHandler(document, "mousemove", this.fnOnResizeMove , this);   
    
   
} 

// --------------------------------------------------------------------- setTag
/**
 * setTag method s used to store key = value custom properties 
 *
 * @name setTag
 * @memberOf AEd.ui.core.UIComponent
 * @function   
 * @param {String} key Key.  
 * @param {Object} value Value to store.  
 *  	
 */
AEd.ui.core.UIComponent.prototype.setTag = function(key, value) {
    if (typeof key != 'undefined') {
         this.tags[key] = value;
    }
   
} 

// --------------------------------------------------------------------- getTag
/**
 * getTag method s used to get key = value custom properties 
 *
 * @name getTag
 * @memberOf AEd.ui.core.UIComponent
 * @function   
 * @param {String} key Key.  
 *  	
 */
AEd.ui.core.UIComponent.prototype.getTag = function(key) {
    if (typeof key != 'undefined') {
         return this.tags[key];
    }
} 
// *****************************************************************************
// class AEd.ui.core.UIComponent
// ***************************************************************************** 

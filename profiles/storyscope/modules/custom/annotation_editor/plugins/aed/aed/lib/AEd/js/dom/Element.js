/**
 * Element.js
 *
 * Contains AEd.dom.Element class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.dom.Element 
// *****************************************************************************  



/**
 * This class adds useful funcionality to DOM elements. Requires DOM tree
 * to be fully loaded. 
 * 
 * @name Element
 * @memberOf AEd.dom        
 * @class      
 * @param {Element | String} domElement DOM element or ID of DOM element.  
 * @property {Element | String} domElement DOM element or ID of DOM element. 	
 */
AEd.dom.Element = function(el) {

   if (this === window) {
       return new AEd.dom.Element(el);
   }
   
   this.domElement = null;

   var type = typeof el;

   if (type == "string") {      
      this.domElement = document.getElementById(el);
   } else if (type == "object" && el.nodeType != "undefined" && (el.nodeType == 1 || el.nodeType == 9) ) {
      this.domElement = el;
   }
   
   if (!this.domElement) {
      throw new Error(AEd.I18n.t("Error_AEd_dom_Element_Argument_passed_to_constructor_is_of_wrong_type"));
   }
}


AEd.dom.Element.prototype.constructor = AEd.dom.Element;


// *****************************************************************************
// child nodes
// *****************************************************************************  

// ----------------------------------------------------------- Element.addChild
/**
 * Adds child to element.    
 *
 * @name addChild
 * @memberOf AEd.dom.Element             
 * @function 
 * @param {Element || AEd.dom.Element} childElement Element to add. 	
 * @param {Number} index Optional index to add element at. 	   
 */
AEd.dom.Element.prototype.addChild = function(childElement, index) {
    if (childElement) {
        if (typeof index == 'number') {
            if (this.domElement.childNodes[index]) {
                if (childElement instanceof AEd.dom.Element) {
                    this.domElement.insertBefore(childElement.domElement, this.domElement.childNodes[index]);
                }
                else {
                    this.domElement.insertBefore(childElement, this.domElement.childNodes[index]); 
                }            
            } 
            else {
                if (childElement instanceof AEd.dom.Element) {
                    this.domElement.appendChild(childElement.domElement); 
                }
                else {
                    this.domElement.appendChild(childElement); 
                }                
            }
        }
        else {
            if (childElement instanceof AEd.dom.Element) {
                this.domElement.appendChild(childElement.domElement); 
            }
            else {
                this.domElement.appendChild(childElement); 
            }

        }
    }

} 

// -------------------------------------------------------- Element.removeChild
/**
 * Removes the child node of the current element.    
 *
 * @name removeChild
 * @memberOf AEd.dom.Element             
 * @function 
 * @param {Element || AEd.dom.Element} childElement Element to remove. 		   
 */
AEd.dom.Element.prototype.removeChild = function(childElement) {
    if (childElement) { 

        if (childElement instanceof AEd.dom.Element) {

            if (this.hasChildNode(childElement.domElement)){  // Check if element has this element as child

               this.domElement.removeChild(childElement.domElement);
            }
        }
        else {

            if (this.hasChildNode(childElement)){ // Check if element has this element as child

               this.domElement.removeChild(childElement);    
            }    
        }

    }
} 

// ------------------------------------------------------- Element.replaceChild
/**
 * Replaces one child node of the current node with another child node.    
 *
 * @name replaceChild
 * @memberOf AEd.dom.Element             
 * @function 
 * @param {Element || AEd.dom.Element} newChildElement New child element. 
 * @param {Element || AEd.dom.Element} oldChildElement Old child element to be replaced. 		     		   
 */
AEd.dom.Element.prototype.replaceChild = function(newChildElement, oldChildElement) {
    if (newChildElement && oldChildElement) {
        if (childElement instanceof AEd.dom.Element) {
            this.domElement.replaceChild(newChildElement.domElement, oldChildElement.domElement);
        }
        else {  
            this.domElement.replaceChild(newChildElement, oldChildElement);     
        }        
    }
} 


// *****************************************************************************
// nodes
// *****************************************************************************  

// ---------------------------------------------------------- Element.cloneNode
/**
 * Clones node and returns it as AEd.dom.Element type.    
 *
 * @name cloneNode
 * @memberOf AEd.dom.Element             
 * @function 
 * @param {Boolean} deepBoolean When set to true, clones all the sub nodes of the current node as well, such as any text contained within. 
 * @return {AEd.dom.Element} Cloned element. 	   
 */
AEd.dom.Element.prototype.cloneNode = function(deepBoolean) {
    if (typeof deepBoolean == "boolean" && deepBoolean == false) {         
        var elClone = this.domElement.cloneNode(false);
    }
    else {
        var elClone = this.domElement.cloneNode(true);   
    }
    return AEd.$(elClone);
} 


// ------------------------------------------------------ Element.getChildNodes
/**
 * Gets child nodes array.    
 *
 * @name addChild
 * @memberOf AEd.dom.Element             
 * @function 
 * @return {Array} Array of child nodes. 		
 */
AEd.dom.Element.prototype.getChildNodes = function() {
    return this.domElement.childNodes;
} 

// ------------------------------------------------------ Element.hasChildNode
/**
 * Determines if an element has node as first level child.    
 *
 * @name hasChildNode
 * @memberOf AEd.dom.Element             
 * @function 
 * @param {Node} node which we want to find
 * @return {Boolean} True if node is child of an element. 		
 */
AEd.dom.Element.prototype.hasChildNode = function(node) {

    if (!this.domElement.childNodes){

       return false;
    }
    else {

       for (var i = 0; i < this.domElement.childNodes.length; i++){

           if (this.domElement.childNodes[i] === node){

              return true;
           } 
       }
       return false; 
    }
}

// -------------------------------------------------------- Element.getNodeName
/**
 * Gets element nodeName property.    
 *
 * @name getNodeName
 * @memberOf AEd.dom.Element             
 * @function 
 * @return {String} Node name ("DIV", "SPAN", ...). 		
 */
AEd.dom.Element.prototype.getNodeName = function() {    
    return this.domElement.nodeName;
} 

// -------------------------------------------------------- Element.getNodeType
/**
 * Gets element nodeType property.    
 *
 * @name getNodeType
 * @memberOf AEd.dom.Element             
 * @function 
 * @return {Number} Node type. 		
 */
AEd.dom.Element.prototype.getNodeType = function() {    
    return this.domElement.nodeType;
} 

// ------------------------------------------------------ Element.getParentNode
/**
 * Gets element parentNode property.    
 *
 * @name getParentNode
 * @memberOf AEd.dom.Element             
 * @function 
 * @return {Element} Parent node. 		
 */
AEd.dom.Element.prototype.getParentNode = function() {    
    return this.domElement.parentNode;
} 

// -------------------------------------------------------------- Element.getId
/**
 * Gets element id.    
 *
 * @name getId
 * @memberOf AEd.dom.Element             
 * @function 
 * @return {String} Element id . 		
 */
AEd.dom.Element.prototype.getId = function() {
    return this.domElement.id;
} 

// -------------------------------------------------------------- Element.setId
/**
 * Sets element id.    
 *
 * @name setId
 * @memberOf AEd.dom.Element             
 * @function 
 * @param {String} id Element id . 		
 */
AEd.dom.Element.prototype.setId = function(id) {
    if (id) {
        this.domElement.id = id;
    }
} 

// ------------------------------------------------------- Element.getInnerHTML
/**
 * Gets element innerHTML property.    
 *
 * @name getInnerHTML
 * @memberOf AEd.dom.Element             
 * @function 
 * @return {String} Element innerHTML property. 		
 */
AEd.dom.Element.prototype.getInnerHTML = function() {
    return this.domElement.innerHTML;
} 

// ------------------------------------------------------- Element.setInnerHTML
/**
 * Sets element innerHTML property.    
 *
 * @name setInnerHTML
 * @memberOf AEd.dom.Element             
 * @function 
 * @param {String} html Element innerHTML property. 		
 */
AEd.dom.Element.prototype.setInnerHTML = function(html) {    
    this.domElement.innerHTML = html;
} 

// *****************************************************************************
// attributes
// *****************************************************************************  
    
// ------------------------------------------------------ Element.getAttributes
/**
 * Gets attributes array.    
 *
 * @name getAttributes
 * @memberOf AEd.dom.Element             
 * @function 
 * @return {Array} Array of attributes. 		
 */
AEd.dom.Element.prototype.getAttributes = function() {
    return this.domElement.attributes;
} 

// ------------------------------------------------------- Element.getAttribute
/**
 * Returns the value of the attribute.   
 *
 * @name getAttribute
 * @memberOf AEd.dom.Element             
 * @function 
 * @param {String} attributeName Name of attribute.   
 * @return {String} Value of the attribute. 		
 */
AEd.dom.Element.prototype.getAttribute = function(attributeName) {
    if (attributeName) {
        return this.domElement.getAttribute(attributeName);
    }        
} 

// ------------------------------------------------------- Element.setAttribute
/**
 * Sets an attribute's value for the current element.   
 *
 * @name setAttribute
 * @memberOf AEd.dom.Element             
 * @function 
 * @param {String} attributeName Name of attribute.   
 * @param {String} attributeValue Value of the attribute. 		
 */
AEd.dom.Element.prototype.setAttribute = function(attributeName, attributeValue) {
    if (attributeName && attributeValue) {
        this.domElement.setAttribute(attributeName, attributeValue);
    }        
} 

// ---------------------------------------------------- Element.removeAttribute
/**
 * Removes an attribute by its name.   
 *
 * @name removeAttribute
 * @memberOf AEd.dom.Element             
 * @function 
 * @param {String} attributeName Name of attribute.   	
 */
AEd.dom.Element.prototype.removeAttribute = function(attributeName) {
    if (attributeName) {
        this.domElement.removeAttribute(attributeName);
    }        
}

// ------------------------------------------------------- Element.hasAttribute
/**
 * Returns true / false indicating whether the current element contains an attribute.   
 *
 * @name hasAttribute
 * @memberOf AEd.dom.Element             
 * @function 
 * @param {String} attributeName Name of attribute.   
 * @return {Boolean} True / false indicating whether the current element contains an attribute. 		
 */
AEd.dom.Element.prototype.hasAttribute = function(attributeName) {
    if (attributeName) {
        return this.domElement.hasAttribute(attributeName);
    }        
} 

// *****************************************************************************
// from ElementUtils.js
// *****************************************************************************  



// --------------------------------------------------------- Element.getRelPosX
/**
 * Gets current X position relative to parent element.    
 *
 * @name getRelPosX
 * @memberOf AEd.dom.Element             
 * @function 
 * @return {Number} Current element X position relative to parent element. 
 *  	
 */
AEd.dom.Element.prototype.getRelPosX = function() {
   return AEd.ElU.getRelPosX(this.domElement);
} 

// --------------------------------------------------------- Element.getRelPosY
/**
 * Gets current Y position relative to parent element.    
 *
 * @name getRelPosY
 * @memberOf AEd.dom.Element             
 * @function 
 * @return {Number} Current element Y position relative to parent element. 
 *  	
 */
AEd.dom.Element.prototype.getRelPosY = function() {
   return AEd.ElU.getRelPosY(this.domElement);
} 

// --------------------------------------------------------- Element.getAbsPosX
/**
 * Gets current X position relative to page.    
 *
 * @name getAbsPosX
 * @memberOf AEd.dom.Element             
 * @function  
 * @return {Number} Current element X position relative to page.
 *  	
 */
AEd.dom.Element.prototype.getAbsPosX = function() {
   return AEd.ElU.getAbsPosX(this.domElement);
} 

// --------------------------------------------------------- Element.getAbsPosY
/**
 * Gets current Y position relative to page.    
 *
 * @name getAbsPosY
 * @memberOf AEd.dom.Element             
 * @function 
 * @return {Number} Current element Y position relative to page.
 *  	
 */
AEd.dom.Element.prototype.getAbsPosY = function() {
   return AEd.ElU.getAbsPosY(this.domElement);
} 

// --------------------------------------------------------- Element.getCssPosX
/**
 * Gets CSS X position (css left offset value).      
 *
 * @name getCssPosX
 * @memberOf AEd.dom.Element             
 * @function  
 * @return {Number} Current element CSS X position.
 *  	
 */
AEd.dom.Element.prototype.getCssPosX = function() {
   return AEd.ElU.getCssPosX(this.domElement);
} 

// --------------------------------------------------------- Element.getCssPosY
/**
 * Gets CSS Y position (css top offset value).      
 *
 * @name getCssPosY
 * @memberOf AEd.dom.Element             
 * @function  
 * @return {Number} Current element CSS Y position.
 *  	
 */
AEd.dom.Element.prototype.getCssPosY = function() {
   return AEd.ElU.getCssPosY(this.domElement);
} 

// -------------------------------------------------------- Element.getCssValue
/**
 * Gets current value of styleName of element.       
 *
 * @name getCssValue
 * @memberOf AEd.dom.Element             
 * @function   
 * @param {String} styleName Name of CSS property.     
 * @return {String} Current value of styleName of element. 
 *  	
 */
AEd.dom.Element.prototype.getCssValue = function(styleName) {
   return AEd.ElU.getCssValue(this.domElement, styleName);
} 

// -------------------------------------------------------- Element.setCssValue
/**
 * Sets value of styleName of element.       
 *        
 * @name setCssValue
 * @memberOf AEd.dom.Element             
 * @function  
 * @param {String} styleName Name of CSS property. 
 * @param {String} styleValue Value of CSS property.   
 *  	
 */
AEd.dom.Element.prototype.setCssValue = function(styleName, styleValue) {
   AEd.ElU.setCssValue(this.domElement, styleName, styleValue);
} 

// ------------------------------------------------------------ Element.setPosX
/**
 * Sets CSS X position.       
 *
 * @name setPosX
 * @memberOf AEd.dom.Element             
 * @function  
 * @param {Number} x New X position.   
 *  	
 */
AEd.dom.Element.prototype.setPosX = function(x) {
   AEd.ElU.setPosX(this.domElement, x);
} 

// ------------------------------------------------------------ Element.setPosY
/**
 * Sets CSS Y position.       
 *
 * @name setPosY
 * @memberOf AEd.dom.Element             
 * @function   
 * @param {Number} y New Y position.   
 *  	
 */
AEd.dom.Element.prototype.setPosY = function(y) {
   AEd.ElU.setPosY(this.domElement, y);
} 

// ------------------------------------------------------------ Element.moveByX
/**
 * Moves element by X px.      
 *
 * @name moveByX
 * @memberOf AEd.dom.Element             
 * @function  
 * @param {Number} x Number of pixels to move by.  
 *  	
 */
AEd.dom.Element.prototype.moveByX = function(x) {
   AEd.ElU.moveByX(this.domElement, x);
} 

// ------------------------------------------------------------ Element.moveByY
/**
 * Moves element by Y px.      
 *
 * @name moveByY
 * @memberOf AEd.dom.Element             
 * @function   
 * @param {Number} y Number of pixels to move by.  
 *  	
 */
AEd.dom.Element.prototype.moveByY = function(y) {
   AEd.ElU.moveByY(this.domElement, y);
} 

// ------------------------------------------------------------- Element.moveBy
/**
 * Moves element by X px on X axis and Y px on Y axis.        
 *
 * @name moveBy
 * @memberOf AEd.dom.Element             
 * @function  
 * @param {Number} x Number of pixels to move by on X axis.    
 * @param {Number} y Number of pixels to move by on Y axis. 
 *  	
 */
AEd.dom.Element.prototype.moveBy = function(x, y) {
   AEd.ElU.moveBy(this.domElement, x, y);
} 

// ------------------------------------------------------------- Element.moveTo
/**
 * Moves element to X pos on X axis and Y pos on Y axis.          
 *
 * @name moveTo
 * @memberOf AEd.dom.Element             
 * @function   
 * @param {Number} x New position on X axis.    
 * @param {Number} y New position on Y axis.   
 *  	
 */
AEd.dom.Element.prototype.moveTo = function(x, y) {
   AEd.ElU.moveTo(this.domElement, x, y);
} 


// ------------------------------------------------------------------- setWidth
/**
 * Sets width css property.
 *
 * @name setWidth
 * @memberOf AEd.dom.Element
 * @function   
 * @param {Number or String} width New width value with or without units.   
 */
AEd.dom.Element.prototype.setWidth = function(width) {
    if (typeof width != "undefined") {
        if (typeof width == "number" && !isNaN(width)) {
            var w;
            if (typeof width == "number") {
               var w = width + "px";
            }
            else {
               var w = width;
            }
            this.setCssValue("width", w);
        }
    }
}


// ----------------------------------------------------------- Element.getWidth
/**
 * Gets element's width.          
 *
 * @name getWidth
 * @memberOf AEd.dom.Element             
 * @function    
 * @return {Number} Width of element.   
 *  	
 */
AEd.dom.Element.prototype.getWidth = function() {
   return AEd.ElU.getWidth(this.domElement);
} 

// ------------------------------------------------------------------ setHeight
/**
 * Sets height css property.
 *
 * @name setHeight
 * @memberOf AEd.dom.Element 
 * @function     
 * @param {Number or String} height New height value with or without units.  
 */
AEd.dom.Element.prototype.setHeight = function(height) {
    if (typeof height != "undefined") {
        if (typeof height == "number" && !isNaN(height)) {
            var h;
            if (typeof height == "number") {
               var h = height + "px";
            }
            else {
               var h = height;
            }
            this.setCssValue("height", h);
        }
    }
}


// ---------------------------------------------------------- Element.getHeight
/**
 * Gets element's height.      
 *
 * @name getHeight
 * @memberOf AEd.dom.Element             
 * @function       
 * @return {Number} Height of element.   
 *  	
 */
AEd.dom.Element.prototype.getHeight = function() {
   return AEd.ElU.getHeight(this.domElement);
} 

// -------------------------------------------------------- Element.getMaxWidth
/**
 * Gets element's max width.      
 *
 * @name getMaxWidth
 * @memberOf AEd.dom.Element             
 * @function  
 * @return {Number} MAX width of element.     
 *  	
 */
AEd.dom.Element.prototype.getMaxWidth = function() {
   return AEd.ElU.getMaxWidth(this.domElement);
} 

// ------------------------------------------------------- Element.getMaxHeight
/**
 * Gets element's max height.      
 *
 * @name getMaxHeight
 * @memberOf AEd.dom.Element             
 * @function    
 * @return {Number} MAX height of element.     
 *  	
 */
AEd.dom.Element.prototype.getMaxHeight = function() {
   return AEd.ElU.getMaxHeight(this.domElement);
} 

// --------------------------------------------------------------- Element.hide
/**
 * Hides element. 
 *
 * @name hide
 * @memberOf AEd.dom.Element             
 * @function     
 *  	
 */
AEd.dom.Element.prototype.hide = function() {
   AEd.ElU.hide(this.domElement);
} 

// --------------------------------------------------------------- Element.show
/**
 * Shows element. 
 *
 * @name show
 * @memberOf AEd.dom.Element             
 * @function   
 *  	
 */
AEd.dom.Element.prototype.show = function() {
   AEd.ElU.show(this.domElement);
} 

// --------------------------------------------------------- Element.setOpacity
/**
 * Sets opacity (0 - 100) to element.       
 *        
 * @name setOpacity
 * @memberOf AEd.dom.Element             
 * @function   
 * @param {Number} opacity New opacity value (0-100). 
 *  	
 */
AEd.dom.Element.prototype.setOpacity = function(opacity) {
   AEd.ElU.setOpacity(this.domElement, opacity);
} 

// --------------------------------------------------------- Element.getOpacity
/**
 * Returns opacity (0 - 100) of element.       
 *        
 * @name getOpacity
 * @memberOf AEd.dom.Element             
 * @function   
 * @return {Number} opacity New opacity value (0-100).   
 *  	
 */
AEd.dom.Element.prototype.getOpacity = function() {
   return AEd.ElU.getOpacity(this.domElement);
} 

// ------------------------------------------------------ Element.getAllClasses
/**
 * Gets all classes applied to element.        
 *        
 * @name getAllClasses
 * @memberOf AEd.dom.Element             
 * @function   
 * @return {Array of Strings} Array of classnames.       
 *  	
 */
AEd.dom.Element.prototype.getAllClasses = function() {
   return AEd.ElU.getAllClasses(this.domElement);
} 

// ----------------------------------------------------------- Element.addClass
/**
 * Adds a new class to element.      
 *        
 * @name addClass
 * @memberOf AEd.dom.Element             
 * @function   
 * @param {String} className New classname.           
 *  	
 */
AEd.dom.Element.prototype.addClass = function(className) {
   AEd.ElU.addClass(this.domElement, className);
} 

// -------------------------------------------------------- Element.removeClass
/**
 * Removes specified class from element.      
 *        
 * @name removeClass
 * @memberOf AEd.dom.Element             
 * @function   
 * @param {String} className Classname to remove.            
 *  	
 */
AEd.dom.Element.prototype.removeClass = function(className) {
   AEd.ElU.removeClass(this.domElement, className);
} 

// --------------------------------------------------------- Element.addClasses
/**
 * Adds new classes to element.      
 *        
 * @name addClasses
 * @memberOf AEd.dom.Element             
 * @function   
 * @param {String} classNames New classnames string ("class01 class02 class03 ...").           
 *  	
 */
AEd.dom.Element.prototype.addClasses = function(classNames) {
   AEd.ElU.addClasses(this.domElement, classNames);
} 

// ------------------------------------------------------ Element.removeClasses
/**
 * Removes classes from element.      
 *        
 * @name removeClasses
 * @memberOf AEd.dom.Element             
 * @function   
 * @param {String} classNames Classnames to remove.       
 *  	
 */
AEd.dom.Element.prototype.removeClasses = function(classNames) {
   AEd.ElU.removeClasses(this.domElement, classNames);
} 

// ----------------------------------------------------------- Element.hasClass
/**
 * Determines if element has specified classname.      
 *        
 * @name hasClass
 * @memberOf AEd.dom.Element             
 * @function   
 * @param {String} className Classname to look for. 
 * @return {Boolean} True/false if element has specified classname or not.             
 *    	
 */
AEd.dom.Element.prototype.hasClass = function(className) {
   return AEd.ElU.hasClass(this.domElement, className);
} 


// --------------------------------------------- Element.getElementParentsArray
/**
 * Returns array of all parent elements.      
 *        
 * @name getElementParentsArray  
 * @memberOf AEd.dom.Element             
 * @function   
 * @return {Array of Elements} Array of parent elements.              
 *    	
 */
AEd.dom.Element.prototype.getElementParentsArray = function() {
   return AEd.ElU.getElementParentsArray(this.domElement);
} 

// ---------------------------------------------------- Element.addEventHandler
/**
 * Adds event handler to element.   
 *        
 * @name addEventHandler  
 * @memberOf AEd.dom.Element             
 * @function   
 * @param {String} type Type of event.
 * @param {Function} handler Handler function to be executed on event.  
 * @param {Object} scope Scope of handler.             
 *    	
 */
AEd.dom.Element.prototype.addEventHandler = function(type, handler, scope) {
   AEd.Events.addHandler(this.domElement, type, handler, scope);
} 

// ------------------------------------------------- Element.removeEventHandler
/**           
 * Removes event handler from element.        
 *        
 * @name removeEventHandler
 * @memberOf AEd.dom.Element             
 * @function   
 * @param {String} type Type of event.
 * @param {Function} handler Assigned handler function to be removed.    	
 */
AEd.dom.Element.prototype.removeEventHandler = function(type, handler) {
   AEd.Events.removeHandler(this.domElement, type, handler);
}    

// ------------------------------------------------------------- Element.fadeIn
/**           
 * Creates a fadeIn animation of element.    
 *        
 * @name fadeIn
 * @memberOf AEd.dom.Element               
 * @function          
 * @param {Number} duration Duration of animation in ms. 
 * @param {Number} callback Callback function to call after animation ends. 
 * @param {Number} scope Scope of callback function.     	
 */
AEd.dom.Element.prototype.fadeIn = function(duration, callback, scope) {
   AEd.ElU.fadeIn(this.domElement, duration, callback, scope);
} 

// ------------------------------------------------------------ Element.fadeOut
/**           
 * Creates a fadeOut animation of element.    
 *        
 * @name fadeOut
 * @memberOf AEd.dom.Element               
 * @function          
 * @param {Number} duration Duration of animation in ms. 
 * @param {Number} callback Callback function to call after animation ends. 
 * @param {Number} scope Scope of callback function.     	
 */
AEd.dom.Element.prototype.fadeOut = function(duration, callback, scope) {
   AEd.ElU.fadeOut(this.domElement, duration, callback, scope);
} 


// *****************************************************************************
// class AEd.dom.Element 
// ***************************************************************************** 

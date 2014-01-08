/**
 * ElementUtils.js
 *
 * Contains AEd.dom.ElementUtils class definition.
 *  
 * @author: Martin Kleban 
 *       
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.dom.ElementUtils 
// ***************************************************************************** 


     
/**
 * ElementUtils class contains useful methods working with DOM elements. 
 * 
 * @name ElementUtils
 * @memberOf AEd.dom        
 * @class 
 * @static
 *      
 */
AEd.dom.ElementUtils = (function() {

    // *************************************************************************
    // variables
    // *************************************************************************   
    
    // object to return
    var t = {};

      
    // *************************************************************************
    // ElementUtils public properties
    // *************************************************************************               
        
        
        
    // *************************************************************************
    // ElementUtils events
    // ************************************************************************* 
    
    
    
    // *************************************************************************
    // ElementUtils PUBLIC methods
    // *************************************************************************   
    
   // -------------------------------------------------------------- getRelPosX
   /**
     * Gets current X position relative to parent element.        
     * 
     * @name getRelPosX
     * @memberOf AEd.dom.ElementUtils                 
     * @function
     * @param {Element} element DOM element object.
     * @return {Number} Current element X position relative to parent element. 
     *          
     */     
   t.getRelPosX = function(element) {       
      return element.parentNode == element.offsetParent ?
      element.offsetLeft : 
      t.getAbsPosX(element) - t.getAbsPosX(element.parentNode);   
   } 
   
   // -------------------------------------------------------------- getRelPosY
   /**
     * Gets current Y position relative to parent element.       
     * 
     * @name getRelPosY
     * @memberOf AEd.dom.ElementUtils                 
     * @function          
     * @param {Element} element DOM element object.
     * @return {Number} Current element Y position relative to parent element. 
     *          
     */    
   t.getRelPosY = function(element) {       
      return element.parentNode == element.offsetParent ?
      element.offsetTop : 
      t.getAbsPosY(element) - t.getAbsPosY(element.parentNode);   
   } 

   // -------------------------------------------------------------- getAbsPosX
   /**
     * Gets current X position relative to page.       
     *   
     * @name getAbsPosX
     * @memberOf AEd.dom.ElementUtils                 
     * @function           
     * @param {Element} element DOM element object.
     * @return {Number} Current element X position relative to page. 
     *          
     */      
   t.getAbsPosX = function(element) {       
      return element.offsetParent ?
      element.offsetLeft + t.getAbsPosX( element.offsetParent ) :
      element.offsetLeft;      
   }     
   
   // -------------------------------------------------------------- getAbsPosY
   /**
     * Gets current Y position relative to page.       
     *        
     * @name getAbsPosY
     * @memberOf AEd.dom.ElementUtils                 
     * @function     
     * @param {Element} element DOM element object.
     * @return {Number} Current element Y position relative to page. 
     *          
     */    
   t.getAbsPosY = function(element) {       
      return element.offsetParent ? 
      element.offsetTop + t.getAbsPosY( element.offsetParent ) :
      element.offsetTop;   
   }  

   // -------------------------------------------------------------- getCssPosX
   /**
     * Gets CSS X position.       
     *        
     * @name getCssPosX
     * @memberOf AEd.dom.ElementUtils                 
     * @function       
     * @param {Element} element DOM element object.
     * @return {Number} Current element CSS X position. 
     *          
     */      
   t.getCssPosX = function(element) {       
      var value = t.getCssValue(element, "left");
      if (value) {
          return parseInt(value);
      }
      else {
          return null;
      }
   } 
    
   // -------------------------------------------------------------- getCssPosY
   /**
     * Gets CSS Y position.       
     *        
     * @name getCssPosY
     * @memberOf AEd.dom.ElementUtils                 
     * @function       
     * @param {Element} element DOM element object.
     * @return {Number} Current element CSS Y position. 
     *          
     */     
   t.getCssPosY = function(element) {       
      var value = t.getCssValue(element, "top");
      if (value) {
          return parseInt(value);
      }
      else {
          return null;
      }      
   }  
      
   // ------------------------------------------------------------- getCssValue
   /**
     * Gets current value of styleName of element.       
     *        
     * @name getCssValue
     * @memberOf AEd.dom.ElementUtils                 
     * @function         
     * @param {Element} element DOM element object.
     * @param {String} styleName Name of CSS property.     
     * @return {String} Current value of styleName of element. 
     *          
     */      
   t.getCssValue = function(element, styleName) {          
      if (element.style) {
         return element.style[styleName];
      }
      else if (element.currentStyle) {  // IE
         return element.currentStyle[styleName];
      }
      // W3C
      else if (document.defaultView && document.defaultView.getComputedStyle) {
         styleName = styleName.replace(/(A-Z)/g, "-$1");
         styleName = styleName.toLowerCase();
         
         var style = document.defaultView.getComputedStyle(element,"");
         return style && style.getPropertyValue(styleName);         
      }
      else return null;       
   }

   // ------------------------------------------------------------- setCssValue
   /**
     * Sets value of styleName of element.       
     *        
     * @name setCssValue
     * @memberOf AEd.dom.ElementUtils                 
     * @function      
     * @param {Element} element DOM element object.
     * @param {String} styleName Name of CSS property. 
     * @param {String} styleValue Value of CSS property.        
     *          
     */      
   t.setCssValue = function(element, styleName, styleValue) {               
      if (element) {
          if (element.style) {
              element.style[styleName] = styleValue;
          }    
          else if (element.currentStyle) {  // IE
              element.currentStyle[styleName] = styleValue;
          }     
          // W3C
          else if (document.defaultView && document.defaultView.getComputedStyle) {

          }
      } 
   }



   // ----------------------------------------------------------------- setPosX
   /**
     * Sets CSS X position.       
     *        
     * @name setPosX
     * @memberOf AEd.dom.ElementUtils                 
     * @function        
     * @param {Element} element DOM element object.
     * @param {Number} x New X position.     
     *          
     */     
   t.setPosX = function(element, x) {       
      element.style.left = x + "px";
   }  

   // ----------------------------------------------------------------- setPosY
   /**
     * Sets CSS Y position.       
     *        
     * @name setPosY
     * @memberOf AEd.dom.ElementUtils                 
     * @function      
     * @param {Element} element DOM element object.
     * @param {Number} y New Y position.     
     *          
     */     
   t.setPosY = function(element, y) {       
      element.style.top = y + "px";
   }  

   // ----------------------------------------------------------------- moveByX
   /**
     * Moves element by X px.       
     *        
     * @name moveByX
     * @memberOf AEd.dom.ElementUtils                 
     * @function       
     * @param {Element} element DOM element object.
     * @param {Number} x Number of pixels to move by.     
     *          
     */    
   t.moveByX = function(element, x) {       
      t.setPosX(element, t.getCssPosX(element) + x);
   }  

   // ----------------------------------------------------------------- moveByY
   /**
     * Moves element by Y px.       
     *        
     * @name moveByY
     * @memberOf AEd.dom.ElementUtils                 
     * @function       
     * @param {Element} element DOM element object.
     * @param {Number} y Number of pixels to move by.     
     *          
     */    
   t.moveByY = function(element, y) {       
      t.setPosY(element, t.getCssPosY(element)+y);
   } 
   
   // ------------------------------------------------------------------ moveBy
   /**
     * Moves element by X px on X axis and Y px on Y axis.       
     *        
     * @name moveBy
     * @memberOf AEd.dom.ElementUtils                 
     * @function        
     * @param {Element} element DOM element object.
     * @param {Number} x Number of pixels to move by on X axis.    
     * @param {Number} y Number of pixels to move by on Y axis.      
     *          
     */    
   t.moveBy = function(element, x, y) {       
      t.moveByX(element, x);
      t.moveByY(element, y);
   } 
   
   // ------------------------------------------------------------------ moveTo
   /**
     * Moves element to X pos on X axis and Y pos on Y axis.       
     *        
     * @name moveTo
     * @memberOf AEd.dom.ElementUtils                 
     * @function           
     * @param {Element} element DOM element object.
     * @param {Number} x New position on X axis.    
     * @param {Number} y New position on Y axis.     
     *          
     */    
   t.moveTo = function(element, x, y) {       
      t.setPosX(element, x);
      t.setPosY(element, y);
   }    
   
   
   
   // ---------------------------------------------------------------- getWidth
   /**
     * Gets element's width.       
     *        
     * @name getWidth
     * @memberOf AEd.dom.ElementUtils                 
     * @function      
     * @param {Element} element DOM element object.
     * @return {Number} Width of element.     
     *          
     */     
   t.getWidth = function(element) {       
      return parseInt(t.getCssValue(element, 'width')); 
   } 
   
   // --------------------------------------------------------------- getHeight
   /**
     * Gets element's height.       
     *        
     * @name getHeight
     * @memberOf AEd.dom.ElementUtils                 
     * @function        
     * @param {Element} element DOM element object.
     * @return {Number} Height of element.     
     *          
     */     
   t.getHeight = function(element) {       
      return parseInt(t.getCssValue(element, 'height')); 
   } 

   // ------------------------------------------------------------- getMaxWidth
   /**
     * Gets element's max width.       
     *        
     * @name getMaxWidth
     * @memberOf AEd.dom.ElementUtils                 
     * @function        
     * @param {Element} element DOM element object.
     * @return {Number} Max width of element.     
     *          
     */    
   t.getMaxWidth = function(element) {       
 
      if (t.getCssValue(element, 'display' ) != 'none') {
         return element.offsetWidth || t.getWidth(element);
      }

      var oldCSS = {
         display: t.getCssValue(element, 'display'),
         visibility: t.getCssValue(element, 'visibility'),
         position: t.getCssValue(element, 'position')
      }
      
      element.style['display'] = '';
      element.style['visibility'] = 'hidden';
      element.style['position'] = 'absolute';
      
      var w = element.clientWidth || t.getWidth(element);

      element.style['display'] = oldCSS.display;
      element.style['visibility'] = oldCSS.visibility;
      element.style['position'] = oldCSS.position;

      return w;
   } 

   // ------------------------------------------------------------ getMaxHeight
   /**
     * Gets element's max height.       
     *        
     * @name getMaxHeight
     * @memberOf AEd.dom.ElementUtils                 
     * @function      
     * @param {Element} element DOM element object.
     * @return {Number} Max height of element.     
     *          
     */      
   t.getMaxHeight = function(element) {       
 
      if (t.getCssValue(element, 'display' ) != 'none') {
         return element.offsetHeight || t.getHeight(element);
      }

      var oldCSS = {
         display: t.getCssValue(element, 'display'),
         visibility: t.getCssValue(element, 'visibility'),
         position: t.getCssValue(element, 'position')
      }
      
      element.style['display'] = '';
      element.style['visibility'] = 'hidden';
      element.style['position'] = 'absolute';
      
      var h = element.clientHeight || t.getHeight(element);

      element.style['display'] = oldCSS.display;
      element.style['visibility'] = oldCSS.visibility;
      element.style['position'] = oldCSS.position;

      return h;
   } 

   // -------------------------------------------------------------------- hide
   /**
     * Hides element.       
     *        
     * @name hide
     * @memberOf AEd.dom.ElementUtils                 
     * @function      
     * @param {Element} element DOM element object.  
     *          
     */   
   t.hide = function(element) {       
      var actualDisplayValue = t.getCssValue(element, 'display');
      if (actualDisplayValue != 'none') {
          element.$oldDisplayValue = actualDisplayValue;
      }
      element.style.display = 'none';
   } 

   // -------------------------------------------------------------------- show
   /**
     * Shows element.       
     *        
     * @name show
     * @memberOf AEd.dom.ElementUtils                 
     * @function      
     * @param {Element} element DOM element object.  
     *          
     */      
   t.show = function(element) {           
      element.style.display = element.$oldDisplayValue || '';
   } 

   // -------------------------------------------------------------- setOpacity
   /**
     * Sets opacity (0 - 100) to element.       
     *        
     * @name setOpacity
     * @memberOf AEd.dom.ElementUtils                 
     * @function            
     * @param {Element} element DOM element object. 
     * @param {Number} opacity New opacity value (0-100).      
     *          
     */    
   t.setOpacity = function(element, opacity) {           
      if (AEd.isIE && AEd.IEversion < 9) { // IE < 9
         element.style.filters = 'alpha(opacity=' + opacity + ')';
      }
      else { // IE >= 9 and other modern browsers
         element.style.opacity = opacity / 100;
      }
   } 

   // -------------------------------------------------------------- getOpacity
   /**
     * Returns opacity (0 - 100) of element.       
     *        
     * @name getOpacity
     * @memberOf AEd.dom.ElementUtils                 
     * @function        
     * @param {Element} element DOM element object. 
     * @return {Number} opacity New opacity value (0-100).      
     *          
     */    
   t.getOpacity = function(element) {           
      if (AEd.isIE && AEd.IEversion < 9) { // IE < 9
         if (element.filters.alpha && element.filters.alpha.opacity) {
            return element.filters.alpha.opacity;
         }
         else {
            return 100;
         }

      }
      else { // IE >= 9 and other modern browsers
         if (element.style.opacity) {
            return element.style.opacity * 100;  
         }
         else {
            return 100;
         }              
      }
       
   } 

   // ----------------------------------------------------------- getAllClasses
   /**
     * Gets all classes applied to element.       
     *        
     * @name getAllClasses
     * @memberOf AEd.dom.ElementUtils                 
     * @function        
     * @param {Element} element DOM element object. 
     * @return {Array of Strings} Array of classnames.      
     *          
     */     
   t.getAllClasses = function(element) {           
      var classNames = [];
      if (element && element.className) {
         classNames = element.className.split(' ');
      }
      return classNames;
   } 

   // ---------------------------------------------------------------- addClass
   /**
     * Adds a new class to element.      
     *        
     * @name addClass
     * @memberOf AEd.dom.ElementUtils                 
     * @function       
     * @param {Element} element DOM element object. 
     * @param {String} className New classname.      
     *          
     */     
   t.addClass = function(element, className) {           
      var classNames = t.getAllClasses(element);       
      classNames.push(className);
      element.className = classNames.join(' ');
   }       
 
   // ------------------------------------------------------------- removeClass
   /**
     * Removes specified class from element.      
     *        
     * @name removeClass
     * @memberOf AEd.dom.ElementUtils                 
     * @function        
     * @param {Element} element DOM element object. 
     * @param {String} className Classname to remove.      
     *          
     */    
   t.removeClass = function(element, className) {           
      var classNames = t.getAllClasses(element);    
      var newClassNames = [];
      for (var i = 0; i < classNames.length; i++) {
         if (classNames[i] != className) {
            newClassNames.push(classNames[i]);
         }
      }

      element.className = newClassNames.join(' ');
   } 

   // -------------------------------------------------------------- addClasses
   /**
     * Adds new classes to element.      
     *        
     * @name addClasses
     * @memberOf AEd.dom.ElementUtils                 
     * @function         
     * @param {Element} element DOM element object. 
     * @param {String} classNamesString New classnames string.      
     *          
     */     
   t.addClasses = function(element, classNamesString) {           
      if (classNamesString) {
         var classNamesArray = [];
         classNamesArray = classNamesString.split(' ');
         for (var i = 0; i < classNamesArray.length; i++) {
            t.addClass(element, classNamesArray[i]); 
         }
      }
   }   

   // ----------------------------------------------------------- removeClasses
   /**
     * Removes classes from element.      
     *        
     * @name removeClasses
     * @memberOf AEd.dom.ElementUtils                 
     * @function      
     * @param {Element} element DOM element object. 
     * @param {String} classNamesString Classnames to remove.      
     *          
     */     
   t.removeClasses = function(element, classNamesString) {           
      if (classNamesString) {
         var classNamesArray = [];
         classNamesArray = classNamesString.split(' ');
         for (var i = 0; i < classNamesArray.length; i++) {
            t.removeClass(element, classNamesArray[i]); 
         }
      }
   }   

   // ---------------------------------------------------------------- hasClass
   /**
     * Determines if element has specified classname.      
     *        
     * @name hasClass
     * @memberOf AEd.dom.ElementUtils                 
     * @function        
     * @param {Element} element DOM element object. 
     * @param {String} className Classname to look for. 
     * @return {Boolean} True/false if element has specified classname or not.             
     *          
     */   
   t.hasClass = function(element, className) {           
      var hasClass = false;         
      var classNames = t.getAllClasses(element);    

      for (var i = 0; i < classNames.length; i++) {
         if (classNames[i] == className) {
            hasClass = true;
         }
      }

      return hasClass;
   } 

   // -------------------------------------------------- getElementsByClassName
   /**
     * Get all elements with className class, contextElement is optional      
     *        
     * @name getElementsByClassName
     * @memberOf AEd.dom.ElementUtils                 
     * @function        
     * @param {String} className Classname of elements.      
     * @param {Element} contextElement Context element. 
     * @return {Array of Elements} Array of elements with specified classname.      
     *          
     */     
   t.getElementsByClassName = function(className, contextElement) {           
      var allElements = null;
      if (contextElement) {
         allElements = contextElement.getElementsByTagName("*");
      }
      else {
         allElements = document.getElementsByTagName("*");
      }
      
      var resultElements = [];
      for (var i = 0; i < allElements.length; i++) {
         if (t.hasClass(allElements[i], className)) {
            resultElements.push(allElements[i]);
         }
      } 
      
      return resultElements;        
   } 


   // -------------------------------------------------- getElementParentsArray
   /**
     * Returns array of all parent elements.      
     *        
     * @name getElementParentsArray
     * @memberOf AEd.dom.ElementUtils                 
     * @function       
     * @param {Element} element DOM element object. 
     * @return {Array of Elements} Array of parent elements.      
     *          
     */     
   t.getElementParentsArray = function(element) {           
     
      var parents = new Array();
      for (; element; element = element.parentNode) {
         parents.unshift(element);
      }
      return parents;      
      
   } 
   
   // ---------------------------------------------- getElementsNearestAncestor
   /**
     * Returns the nearest common ancestor of specified elements.      
     *        
     * @name getElementsNearestAncestor
     * @memberOf AEd.dom.ElementUtils                 
     * @function       
     * @param {Element} element1 DOM element object. 
     * @param {Element} element2 DOM element object.      
     * @return {Elements} Nearest ancestor of element1 and element2.      
     *          
     */     
   t.getElementsNearestAncestor = function(element1, element2) {           
     
      var parents1 = t.getElementParentsArray(element1);
      var parents2 = t.getElementParentsArray(element2);

      if (parents1[0] != parents2[0]) return null;

      for (var i = 0; i < parents1.length; i++) {
         if (parents1[i] != parents2[i]) return parents1[i - 1];
      }
      
      if (parents1[parents1.length-1].nodeType == 3)  {
        return parents1[parents1.length-1].parentNode; 
      }
      else {
         return parents1[parents1.length-1]; 
      }
  
   }       
     
     
   // ------------------------------------------------------------------- _fade   
   /**
     * Creates a fading animation of element.    
     *        
     * @method _fade
     * @private     
     * @param {Element} element DOM element to be faded.      
     * @param {Number} direction Number [1,-1] which determines direction of 
     *                           animation (fade in or fade out). 
     * @param {Number} opacity New opacity.    
     * @param {Number} stepDuration Duration of one step in animation. 
     * @param {Number} callback Callback function to call after animation ends. 
     * @param {Number} scope Scope of callback function.                                              
     *          
     */     
   t._fade = function(element, direction, opacity, stepDuration, callback, scope) {
      if (direction == -1) { // fade out
         if (opacity > 0) {
            t.setOpacity(element, opacity - 2);
            setTimeout(function(){
               t._fade(element, direction, opacity-2, stepDuration, callback, scope)
            }, stepDuration );
         }
         else {
            t.setOpacity(element, 0);
            if (typeof callback == 'function') {
               callback.call(scope);
            }
         }      
      }
      else { // fade in
         if (opacity < 100) {
            t.setOpacity(element, opacity + 2);
            setTimeout(function(){
               t._fade(element, direction, opacity+2, stepDuration, callback, scope)
            }, stepDuration );
         }
         else {
            if (typeof callback == 'function') {
               callback.call(scope ? scope : window);
            }
         }
      }
   }     
     
   // -------------------------------------------------------------- animFadeIn
   /**
     * Creates a FadeIn animation of element.    
     *         
     * @name animFadeIn
     * @memberOf AEd.dom.ElementUtils                 
     * @function      
     * @param {Element} element DOM element to be faded.     
     * @param {Number} duration Duration of animation in ms. 
     * @param {Number} callback Callback function to call after animation ends. 
     * @param {Number} scope Scope of callback function.                                              
     *          
     */      
   t.animFadeIn = function(element, duration, callback, scope) {           
     
      var totalDuration =  duration ? duration : 2000; 
      var stepDuration = Math.round(totalDuration / 50); 
      
      t.setOpacity(element, 0);
      t.show(element);
      
      t._fade(element, 1, 0, stepDuration, callback, scope);
   
   } 
   
   
   // ------------------------------------------------------------- animFadeOut
   /**
     * Creates a FadeOut animation of element.    
     *        
     * @name animFadeOut
     * @memberOf AEd.dom.ElementUtils                 
     * @function          
     * @param {Element} element DOM element to be faded.     
     * @param {Number} duration Duration of animation in ms. 
     * @param {Number} callback Callback function to call after animation ends. 
     * @param {Number} scope Scope of callback function.                                              
     *          
     */      
   t.animFadeOut = function(element, duration, callback, scope) {           
      
      var startOpacity = t.getOpacity(element);

      
      var totalDuration =  duration ? duration : 2000; 
      var stepDuration = Math.round(totalDuration / 50); 

      t.setOpacity(element, startOpacity);
      t.show(element);

      
      t._fade(element, -1, startOpacity, stepDuration, callback, scope);
   
   }      
    
   
   
   
   
   
   
   
   // ----------------------------------------------------------------- fadeOut
   /**
     * Creates a FadeOut animation of element.    
     *        
     * @name fadeOut
     * @memberOf AEd.dom.ElementUtils                 
     * @function          
     * @param {Element} element DOM element to be faded out.     
     * @param {Number} duration Duration of animation in ms. 
     * @param {Number} callback Callback function to call after animation ends. 
     * @param {Number} scope Scope of callback function.                                              
     *          
     */      
   t.fadeOut = function(element, duration, callback, scope) {           
      
      
      if (element) {
          var d = duration || 2000;                   
          var startOpacity = t.getOpacity(element);
                    
          var steps = startOpacity;
          var stepDuration = Math.round(duration / steps);            


          // function fade
          var fade = function (element, opacity, stepDuration) {
              if (element) {
                 
                 t.setOpacity(element, opacity);

                 if (opacity > 0) {
                 
                     var fn = fade;
                     setTimeout ( function () {
                         fn(element, opacity-1, stepDuration);                                         
                     }, stepDuration);   
                                          
                 }
                 else {                   
                     element.AEdFadingOut = false;
                     element.AEdFadeOutDispatcher.fire();                                   
                 }                              
              }             
          }
          // end of function fade
          
          
          if (element.AEdFadingIn) {
              if (element.AEdFadeInDispatcher) {
                  element.AEdFadeInDispatcher.addHandler(function() {
                      t.fadeOut(element, duration, callback, scope);
                  });
              }
          }          
          else {
              if (element.AEdFadingOut) {
                  if (element.AEdFadeOutDispatcher) {
                      if (typeof callback == "function") {
                          element.AEdFadeOutDispatcher.addHandler(callback, scope);
                      }                   
                  }
              }
              else {              
                  element.AEdFadingOut = true;
                  element.AEdFadeOutDispatcher = new AEd.utils.Dispatcher();
                  if (typeof callback == "function") {
                      element.AEdFadeOutDispatcher.addHandler(callback, scope);
                  }                   
                  fade(element, startOpacity, stepDuration);              
              }                     
          }
        
      }
   
   }    
   
   
    
   // ------------------------------------------------------------------ fadeIn
   /**
     * Creates a fadeIn animation of element.    
     *        
     * @name fadeIn
     * @memberOf AEd.dom.ElementUtils                 
     * @function          
     * @param {Element} element DOM element to be faded in.     
     * @param {Number} duration Duration of animation in ms. 
     * @param {Number} callback Callback function to call after animation ends. 
     * @param {Number} scope Scope of callback function.                                              
     *          
     */      
   t.fadeIn = function(element, duration, callback, scope) {           
      
      
      if (element) {
        


          // function fade
          var fade = function (element, opacity, maxOpacity, stepDuration) {
              if (element) {
                 
                 t.setOpacity(element, opacity);

                 if (opacity < maxOpacity) {
                 
                     var fn = fade;
                     setTimeout ( function () {
                         fn(element, opacity + 1, maxOpacity, stepDuration);                                         
                     }, stepDuration);   
                                          
                 }
                 else {                   
                     element.AEdFadingIn = false;
                     element.AEdFadeInDispatcher.fire();                                   
                 }                              
              }             
          }
          // end of function fade
          
          
          if (element.AEdFadingOut) {
              if (element.AEdFadeOutDispatcher) {
                  element.AEdFadeOutDispatcher.addHandler(function() {
                      t.fadeIn(element, duration, callback, scope);
                  });
              }
          }          
          else {
              if (element.AEdFadingIn) {
                  if (element.AEdFadeInDispatcher) {
                      if (typeof callback == "function") {
                          element.AEdFadeInDispatcher.addHandler(callback, scope);
                      }                                             
                  }
              }
              else {   
                  element.AEdFadingIn = true;

                  var d = duration || 2000;                                 
                  var maxOpacity = t.getOpacity(element);
                  if (!maxOpacity) { maxOpacity = 100; }
                  
                  var steps = maxOpacity;
                  var stepDuration = Math.round(duration / steps);   
                                                     
                  element.AEdFadeInDispatcher = new AEd.utils.Dispatcher();
                  
                  if (typeof callback == "function") {
                      element.AEdFadeInDispatcher.addHandler(callback, scope);
                  }                     

                  fade(element, 0, maxOpacity, stepDuration);              
              }                     
          }
        
      }
   
   }      
    
    
    // *************************************************************************
    // return
    // *************************************************************************               
    
        
      
    return t;     
    
    
    
})();




// *****************************************************************************
// class AEd.dom.ElementUtils 
// ***************************************************************************** 



// shorten name
AEd.ElU = AEd.dom.ElementUtils;         

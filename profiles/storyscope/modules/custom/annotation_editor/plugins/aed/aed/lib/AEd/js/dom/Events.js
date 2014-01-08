/**
 * Events.js
 *
 * Contains AEd.dom.Events class definition.
 *  
 * @author: Martin Kleban 
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.dom.Events 
// ***************************************************************************** 


     
/**
 * Events class is a singleton with methods for working with DOM events.
 *       
 * @name Events
 * @memberOf AEd.dom        
 * @class 
 * @static 
 *      
 */
AEd.dom.Events = (function() {
        

    // *************************************************************************
    // variables
    // *************************************************************************   
    
    // object to return
    var t = {};
   
       
    // *************************************************************************
    // Events public properties
    // *************************************************************************               



 
    // *************************************************************************
    // Events events
    // ************************************************************************* 
      

  
          
    // *************************************************************************
    // Events PUBLIC methods
    // *************************************************************************  
        
        
   // -------------------------------------------------------------- addHandler
   /**
     * Adds event handler to specified element.        
     *        
     * @name addHandler
     * @memberOf AEd.dom.Events             
     * @function      
     * @param {Element} element DOM element object.
     * @param {String} type Type of event.
     * @param {Function} handler Handler function to be executed on event.  
     * @param {Object} scope Scope of handler.             
     *          
     */     
   t.addHandler = function(element, type, handler, scope) {       
      
      var F = function(e) { handler.call(scope, e); }
      
      if (element.addEventListener) {
         element.addEventListener(type, F, false);
      } 
      else if (element.attachEvent) {
         element.attachEvent("on"+type, F);
      }
      else {
         element["on"+type] = F;
      }
   }    
   
   // ----------------------------------------------------------- removeHandler
   /**
     * Removes event handler from specified element.        
     *        
     * @name removeHandler
     * @memberOf AEd.dom.Events             
     * @function       
     * @param {Element} element DOM element object.
     * @param {String} type Type of event.
     * @param {Function} handler Assigned handler function to be removed.          
     *          
     */     
   t.removeHandler = function(element, type, handler) {       
      if (element.removeEventListener) {
         element.removeEventListener(type, handler, false);
      } 
      else if (element.detachEvent) {
         element.detachEvent("on"+type, handler);
      }
      else {
         element["on"+type] = null;
      }
   }    
   
   // ---------------------------------------------------------------- getEvent
   /**
     * Returns event object (To fix cross browser issues).        
     *        
     * @name getEvent
     * @memberOf AEd.dom.Events             
     * @function       
     * @param {Event} event Event object.
     * @param {Object} win Optional argument, window object.     
     * @return {Event} Event object.          
     *          
     */     
   t.getEvent = function(event, win) {       
      if (typeof win != 'undefined') {
          return event ? event : win.event;
      }
      else {
          return event ? event : window.event;
      }
      
   }      

   // --------------------------------------------------------------- getTarget
   /**
     * Returns target element where event happened.        
     *        
     * @name getTarget
     * @memberOf AEd.dom.Events             
     * @function        
     * @param {Event} event Event object.
     * @return {Element} DOM element object.          
     *          
     */     
   t.getTarget = function(event) {       
      return event.target || event.srcElement;
   }   
   
   // ---------------------------------------------------------- preventDefault
   /**
     * Prevents default event handling action from being executed.        
     *        
     * @name preventDefault
     * @memberOf AEd.dom.Events             
     * @function       
     * @param {Event} event Event object.       
     *          
     */     
   t.preventDefault = function(event) {       
      if (event.preventDefault) {
         event.preventDefault();
      }
      else {
         event.returnValue = false;
      }
   } 

   // --------------------------------------------------------- stopPropagation
   /**
     * Stops event propagation throught DOM structure.             
     *        
     * @name stopPropagation
     * @memberOf AEd.dom.Events             
     * @function       
     * @param {Event} event Event object.       
     *          
     */     
   t.stopPropagation = function(event) {       
      if (event.stopPropagation) {
         event.stopPropagation();
      }
      else {
         event.cancelBubble = true;
      }
   }  
   
       
    // *************************************************************************
    // Events PRIVATE methods
    // *************************************************************************  
        
   
        
        
        
    // *************************************************************************
    // return
    // *************************************************************************               
         
        
    return t; 

})();



// *****************************************************************************
// class AEd.dom.Events 
// ***************************************************************************** 



// shorten name
AEd.Events = AEd.dom.Events;

/**
 * Dispatcher.js
 *
 * Contains AEd.utils.Dispatcher class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.utils.Dispatcher 
// *****************************************************************************  



/**
 * This class is used to dispatch event to listeners.
 *      
 *
 * @name Dispatcher
 * @memberOf AEd.utils        
 * @class 
 * @property {Array} handlers Collection of event handlers. 	
 */
AEd.utils.Dispatcher = function() {
   this.handlers = new Array();
   
}


AEd.utils.Dispatcher.prototype.constructor = AEd.utils.Dispatcher;



// ------------------------------------------------------ Dispatcher.addHandler
/**
 * Adds an handler function to be executed when an event occurs.
 *
 * @name addHandler
 * @memberOf AEd.utils.Dispatcher
 * @function
 * @param {Function} handler Callback function to execute when an event occurs.
 * @param {Object} scope Callback function scope. 
 *  	
 */
AEd.utils.Dispatcher.prototype.addHandler = function(handler, scope) {
   this.handlers.push({handler: handler, scope: scope ? scope : this});
} 



// ------------------------------------------------- Dispatcher.addHandlerToTop
/**
 * Adds an handler function to be executed first when an event occurs.
 *
 * @name addHandlerToTop
 * @memberOf AEd.utils.Dispatcher
 * @function
 * @param {Function} handler Callback function to execute when an event occurs.
 * @param {Object} scope Callback function scope. 
 *  	
 */
AEd.utils.Dispatcher.prototype.addHandlerToTop = function(handler, scope) {
   this.handlers.unshift({handler: handler, scope: scope ? scope : this});
} 
   


// --------------------------------------------------- Dispatcher.removeHandler  
/**
 * Removes a handler function.
 *
 * @name removeHandler
 * @memberOf AEd.utils.Dispatcher
 * @function
 * @param {Function} handler Callback function to remove.
 *  	
 */
AEd.utils.Dispatcher.prototype.removeHandler = function(handler) {
   for (var i = 0; i < this.handlers.length; i++) {
      if (this.handlers[i].handler === handler) {
         this.handlers.splice(i, 1);   
         break;
      }
   }    
} 



// ------------------------------------------------------------ Dispatcher.fire  
/**
 * Fires an event to all listeners.
 *
 * @name fire
 * @memberOf AEd.utils.Dispatcher
 * @function
 *  	
 */
AEd.utils.Dispatcher.prototype.fire = function() {

   var h;
	 
   for (var i = 0; i < this.handlers.length; i++) {
	h = this.handlers[i].handler;
	h.apply(this.handlers[i].scope, arguments);
   }  
}  



// *****************************************************************************
// class AEd.utils.Dispatcher 
// ***************************************************************************** 

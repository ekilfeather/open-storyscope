/**
 * SubscriptionsManager.js
 *
 * Contains AEd.entities.SubscriptionsManager class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.entities.SubscriptionsManager
// *****************************************************************************  



/**
 * This class provides functionality for subscriptions.
 *      
 *
 * @name SubscriptionsManager
 * @memberOf AEd.entities      
 * @class 
 * @param {Aed.editors.Editor} editor Editor instance. 	 
 * @property {Array} subscriptions Collection of subscriptions.  		  
 */
AEd.entities.SubscriptionsManager = function(editor) {

   this.editor   = editor;
   this.subscriptions = {};
   this.subscriptions.subscribed = [];
   this.subscriptions.unsubscribed = [];
}


AEd.entities.SubscriptionsManager.prototype.constructor = AEd.entities.SubscriptionsManager;



// ----------------------------------------------------------- setSubscriptions
/**
 * Sets new subscriptions array.
 *  
 * @name setSubscriptions
 * @memberOf AEd.entities.SubscriptionsManager
 * @function
 * @param {Array} aSubscriptions Subscriptions array. 
 *  	
 */
AEd.entities.SubscriptionsManager.prototype.setSubscriptions = function(aSubscriptions) {
     this.subscriptions = aSubscriptions;
} 



// ----------------------------------------------------------- getSubscriptions
/**
 * Gets subscriptions array.
 *  
 * @name getSubscriptions
 * @memberOf AEd.entities.SubscriptionsManager
 * @function
 * @return {Array} aSubscriptions Subscriptions array. 
 *  	
 */
AEd.entities.SubscriptionsManager.prototype.getSubscriptions = function() {
     return this.subscriptions;
} 



// ----------------------------------------------------- removeAllSubscriptions
/**
 * Removes all subscriptions.
 *  
 * @name removeAllSubscriptions
 * @memberOf AEd.entities.SubscriptionsManager
 * @function
 *  	
 */
AEd.entities.SubscriptionsManager.prototype.removeAllSubscriptions = function() {
     this.removeAllSubscribed();
     this.removeAllUnsubscribed();
} 
// ----------------------------------------------------- removeAllUnsubscribed
/**
 * Removes all Unsubscribed
 *  
 * @name removeAllUnsubscribed
 * @memberOf AEd.entities.SubscriptionsManager
 * @function
 *  	
 */
AEd.entities.SubscriptionsManager.prototype.removeAllUnsubscribed = function() {
     this.subscriptions.unsubscribed = [];
} 

// ----------------------------------------------------- removeAllSubscribed
/**
 * Removes all Subscribed
 *  
 * @name removeAllSubscribed
 * @memberOf AEd.entities.SubscriptionsManager
 * @function
 *  	
 */
AEd.entities.SubscriptionsManager.prototype.removeAllSubscribed = function() {
     this.subscriptions.subscribed = [];
} 



// *****************************************************************************
// class AEd.entities.SubscriptionsManager
// ***************************************************************************** 
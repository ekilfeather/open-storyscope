/**
 * Subscription.js
 *
 * Contains AEd.ui.Subscription class definition. 
 *  
 * @author: Marie Kratochvílová
 * 
 */
 

// *****************************************************************************
// class AEd.ui.Subscription
// *****************************************************************************  



/**
 * This class creates Subscription UI component.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *    {String}  title         - message title text, 
 *    {String}  subtitle      - message subtitle text,
 *    {String | Element | AEd.dom.Element}  headerContent - header content text or Element,
 *    {String | Element | AEd.dom.Element}  content - content text or Element,
 *     
 *    {String}  icon          - "none" | "info" | "error" | "warning" | "ok" | "loading" | "close" | ...
 *    {String}  iconColor     - "#FFFFFF" | ...
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
 *
 *  
 * }
 * 
 * @name Subscription
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIMessage 
 */
AEd.ui.Subscription = function(config) {
  
    //defaults
    this.STATE_SUBSCRIBED = "subscribed";
    this.STATE_UNSUBSCRIBED = "unsubscribed";
    this.STATE_DELETED = "deleted";
     this.STATE_NEW = "new";
   
    this.DEFAULT_ORIGIN = this.STATE_NEW;
    this.DEFAULT_STATE = "unchanged";
   
    var c = config || {};  
   
    c.origin   = typeof c.origin != "undefined" ? c.origin : this.DEFAULT_ORIGIN;
    c.type   = typeof c.type != "undefined" ? c.type : "";
    c.user   = typeof c.user != "undefined" ? c.user : "";
    c.uri   = typeof c.uri != "undefined" ? c.uri : "";
   
    c.icon   = typeof c.icon != "undefined" ? c.icon : "color";
    c.render = typeof c.render != "undefined" ? c.render : false; 
    c.subtitle = "";
   
   
    if(c.type != ""){
        c.title = AEd.I18n.t("type")+ ": "  + c.type; 
    }
    if(c.user != ""){
        c.subtitle = AEd.I18n.t("user")+ ": " + c.user + "<br/>"; 
    }
    if(c.uri != ""){
        c.subtitle = c.subtitle != "undefined" ? c.subtitle : "";
        c.subtitle = AEd.I18n.t("uri")+ ": "  + c.uri + "<br/>"; 
    }
   
    this.origin = c.origin;
    this.state = this.DEFAULT_STATE;
    this.type = c.type;
    this.user = c.user;
    this.uri  = c.uri; 
   
    AEd.inheritFromObject(this, new AEd.ui.core.UIMessage(c));
    
    this.btnChange     = new AEd.ui.core.UIButton({
        icon: "edit"
    });  
    this.btnDelete   = new AEd.ui.core.UIButton({
        icon: "delete"
    });   
  
    this.buttonsArea.addItem(this.btnChange);
    this.buttonsArea.addItem(this.btnDelete);  
      
    // *************************************************************************
    // EVENTS
    // *************************************************************************
    
    /**
    * Fires when user clicks the edit button.
    * 
    * @event onEdit
    * @param {AEd.entities.Subscription} subscription Target Subscription                                                 
    */         
    this.onChange = new AEd.utils.Dispatcher();    
  
    /**
    * Fires when user clicks the delete button.
    * 
    * @event onDelete
    * @param {AEd.entities.Subscription} subscription Target Subscription                                                 
    */         
    this.onDelete = new AEd.utils.Dispatcher();    
   
    /**
    * Fires when user clicks the details button to show details.
    * 
    * @event onShowDetails
    * @param {AEd.ui.Subscription} subscription Target Subscription                                                 
    */         
    this.onShowDetails = new AEd.utils.Dispatcher();      
   
    /**
    * Fires when user clicks the details button to hide details.
    * 
    * @event onHideDetails
    * @param {AEd.ui.Subscription} subscription Target Subscription                                                 
    */         
    this.onHideDetails = new AEd.utils.Dispatcher();

    // *************************************************************************
    // INIT
    // *************************************************************************


   

    this.btnChange.onClick.addHandler(function () {
        this.onChange.fire(this); 
    }, this );    
   
    this.btnDelete.onClick.addHandler(function () {
        this.onDelete.fire(this); 
    }, this ); 

              
}



AEd.ui.Subscription.prototype.constructor = AEd.ui.Subscription;

AEd.inheritFromPrototype(AEd.ui.Subscription, AEd.ui.core.UIMessage);


// ---------------------------------------------------------------- getValues 
/**
 * Returns clean subscription values without message Subscription object
 *
 * @name getValues 
 * @memberOf AEd.ui.Subscription   
 * @function   
 * @return {Object} oSubscription subscriptions object
 * 
 */
AEd.ui.Subscription.prototype.getValues = function() {
    var oSubscription = {};
    oSubscription.type = this.type;
    oSubscription.user = this.user;
    oSubscription.uri = this.uri;
    oSubscription.origin = this.origin;
    return oSubscription;
}
// ---------------------------------------------------------------- isStateDeleted 
/**
 * Returns true if state of subscription is deleted;
 *
 * @name isStateDeleted
 * @memberOf AEd.ui.Subscription   
 * @function   
 * return {Boolean} true if state is deleted 
 * 
 */
AEd.ui.Subscription.prototype.isStateDeleted = function() {
    if(this.state != this.origin){
        return this.state == this.STATE_DELETED ? true : false;
    } else {
        return false;
    }
}

// ---------------------------------------------------------------- isNew
/**
 * Returns true if origin of subscription is new;
 *
 * @name isNew
 * @memberOf AEd.ui.Subscription   
 * @function   
 * return {Boolean} true if state is new
 * 
 */
AEd.ui.Subscription.prototype.isNew = function() {
    if(this.origin == this.STATE_NEW){
            return true;
    } else {
        return false;
    }
}

// ---------------------------------------------------------------- isStateSubscribed 
/**
 * Returns true if state of subscription changed and now is subscribed;
 *
 * @name isStateSubscribed 
 * @memberOf AEd.ui.Subscription   
 * @function   
 * return {Boolean} true if state is subscribed
 * 
 */
AEd.ui.Subscription.prototype.isStateSubscribed = function() {
    if(this.state != this.origin){
            return this.state == this.STATE_SUBSCRIBED ? true : false;
    } else {
        return false;
    }
}
// ---------------------------------------------------------------- isStateUnsubscribed
/**
 * Returns true if state of subscription changed and now is unsubscribed;
 *
 * @name isStateUnsubscribed
 * @memberOf AEd.ui.Subscription 
 * @function   
 * return {Boolean} true if state is subscribed 
 * 
 */
AEd.ui.Subscription.prototype.isStateUnsubscribed = function() {
    if(this.state != this.origin){
            return this.state == this.STATE_UNSUBSCRIBED ? true : false;
    } else {
        return false;
    }
}

// ---------------------------------------------------------------- setStateDeleted
/**
 * Change state of subscription to deleted if it is not new subscription;
 *
 * @name setStateDeleted
 * @memberOf AEd.ui.Subscription  
 * @function   
 * 
 */
AEd.ui.Subscription.prototype.setStateDeleted = function() {
    this.state = this.STATE_DELETED;
}

// ---------------------------------------------------------------- setStateSubscribed
/**
 * Change state of subscription to unsubscribed if it is not new subscription;
 *
 * @name setStateSubscribed
 * @memberOf AEd.ui.Subscription   
 * @function   
 * 
 */
AEd.ui.Subscription.prototype.setStateSubscribed = function() {
    this.state = this.STATE_SUBSCRIBED;
}

// ---------------------------------------------------------------- setStateUnsubscribed
/**
 * Change state of subscription to unsubscribed if it is not new subscription;
 *
 * @name setStateUnsubscribed
 * @memberOf AEd.ui.Subscription   
 * @function   
 * 
 */
AEd.ui.Subscription.prototype.setStateUnsubscribed = function() {
    this.state = this.STATE_UNSUBSCRIBED;
}

// *****************************************************************************
// class AEd.ui.Subscription
// *****************************************************************************

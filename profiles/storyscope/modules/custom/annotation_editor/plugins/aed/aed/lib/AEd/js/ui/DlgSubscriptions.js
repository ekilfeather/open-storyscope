/**
 * DlgSubscriptions.js
 *
 * Contains AEd.ui.DlgSubscriptions class definition. 
 *  
 * @authors: Martin Kleban, Milos Cudrak, Marie Kratochvilova
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgSubscriptions
// *****************************************************************************  



/**
 * This class creates DlgSubscriptions.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *  
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
 * }
 * 
 * @name DlgSubscriptions
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgSubscriptions = function(config) {
   
    var c = config || {};    
   
    c.title     = AEd.I18n.t("Dlg_subscribtions_title");
    c.width     = AEd.CONFIG.DLG_SUBSCRIPTIONS_WIDTH;
    c.height    = AEd.CONFIG.DLG_SUBSCRIPTIONS_HEIGHT;    
    c.showOverlay   = false;
    c.resizable     = true;
    c.autoInit      = false;
   
    AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
    this.init(c);

         
    this.addClass(AEd.CONFIG.CLASS_UI_DLG_SUBSCRIPTIONS);
   
    this.contentArea.loadFrom(AEd.CONFIG.DLG_SUBSCRIPTIONS_PATH);
   
    this.contentLoaded = false;
   
 
    if (!AEd.isAppleSafari){   // Safari has problem with context (document namespace)

       this.suggestionsUserBar = new AEd.ui.SuggestionsBar({
           render: false
       });
    
 
       this.suggestionsTypeBar = new AEd.ui.SuggestionsBar({
           render: false
       });
    
    
       this.suggestionsUriBar = new AEd.ui.SuggestionsBar({
           render: false
       });
    }
   
    // Buttons
    this.btnClose    = new AEd.ui.core.UIButton({
        icon: "close"
    });
    this.btnSave   = new AEd.ui.core.UIButton({
        text: AEd.I18n.t("Dlg_subscribtions_button_save"), 
        toggle: false
    });
    this.btnCancel   = new AEd.ui.core.UIButton({
        text: AEd.I18n.t("Dlg_subscribtions_button_cancel"), 
        toggle: false
    });   
    this.buttonsArea.addItem(this.btnSave);
    this.buttonsArea.addItem(this.btnCancel);
    this.headerButtonsArea.addItem(this.btnClose);
   
    // Inputs
    

    this.iframe = this.contentArea.domElementIframe; 
    this.elementIframe = AEd.$(this.iframe);

    if (!AEd.isAppleSafari){

      this.deletedContainer        = new AEd.ui.core.UIContainer();
      this.subscribedContainer     = new AEd.ui.core.UIContainer();
      this.unsubscribedContainer   = new AEd.ui.core.UIContainer();    
    }
   
    this.onRender.addHandler(function() {

        // Browsers compatibility
   
        var dstIframe;       

        if (window.opera){  // Opera compatibility
         
            dstIframe = this.iframe;
        }

        else {

            dstIframe  = this.iframe.contentWindow;
        }
         
        AEd.Events.addHandler(dstIframe, "load", function(e) {
            this.contentLoaded = true;
            this.onContentLoaded.fire(this);

            if (AEd.isAppleSafari){

               this.setWidth(this.width + 100);         
            }

            else {

               this.setWidth(this.width); 
            }
 
            this.setHeight(this.height);

           
            this.iframeDocument = this.iframe.contentWindow.document;

            if (AEd.isAppleSafari){  // Safari support - context parameter

              this.deletedContainer        = new AEd.ui.core.UIContainer({context: this.iframeDocument, render:false});
              this.subscribedContainer     = new AEd.ui.core.UIContainer({context: this.iframeDocument});
              this.unsubscribedContainer   = new AEd.ui.core.UIContainer({context: this.iframeDocument});    
            }        
           
            AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnDragStop, this);
            AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnDragIframeMove, this);
            AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnResizeStop, this);
            AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnResizeIframeMove, this);

            if (AEd.isAppleSafari){  // Safari support - context parameter

               this.suggestionsUserBar = new AEd.ui.SuggestionsBar({
                  render: false,
                  context: this.iframeDocument
               });
    
 
               this.suggestionsTypeBar = new AEd.ui.SuggestionsBar({
                  render: false,
                  context: this.iframeDocument
               });
    
    
               this.suggestionsUriBar = new AEd.ui.SuggestionsBar({
                  render: false,
                  context: this.iframeDocument
               });
             }
           
            this.domElementBtnSubscribe             = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUBSCRIPTIONS_ID_BTN_SUBSCRIBE);             
            this.domElementBtnUnsubscribe           = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUBSCRIPTIONS_ID_BTN_UNSUBSCRIBE);             
            this.domElementContainerSubscribed      = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUBSCRIPTIONS_ID_SUBSCRIBED);              
            this.domElementContainerUnsubscribed    = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUBSCRIPTIONS_ID_UNSUBSCRIBED);                   
            this.domElementTableSubscriptions       = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUBSCRIPTIONS_ID_TABLE);           
            this.domElementInputUser                = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUBSCRIPTIONS_ID_INPUT_USER);
            this.domElementInputType                = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUBSCRIPTIONS_ID_INPUT_TYPE);           
            this.domElementInputUri                 = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUBSCRIPTIONS_ID_INPUT_URI);
            this.domElementSuggestionsType              = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUBSCRIPTIONS_ID_TYPE_SUGGESTIONS);                          
            this.domElementSuggestionsUri              = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUBSCRIPTIONS_ID_URI_SUGGESTIONS);                          
            this.domElementSuggestionsUser              = this.iframeDocument.getElementById(AEd.CONFIG.DLG_SUBSCRIPTIONS_ID_USER_SUGGESTIONS);                          
            
            this.btnSubscribe = new AEd.ui.core.UIButton({
                srcElement: this.domElementBtnSubscribe
            });     
            this.btnUnsubscribe = new AEd.ui.core.UIButton({
                srcElement: this.domElementBtnUnsubscribe
            });     
            this.elementBtnSubscribe            = AEd.$(this.domElementBtnSubscribe);
            this.elementBtnUnsubscribe          = AEd.$(this.domElementBtnUnsubscribe);
            this.elementContainerSubscribed     = AEd.$(this.domElementContainerSubscribed);
            this.elementContainerUnsubscribed   = AEd.$(this.domElementContainerUnsubscribed);
            this.elementTableSubscriptions      = AEd.$(this.domElementTableSubscriptions);
            this.elementInputUser               = AEd.$(this.domElementInputUser);
            this.elementInputType               = AEd.$(this.domElementInputType);
            this.elementInputUri                = AEd.$(this.domElementInputUri);
            this.elementSuggestionsType         = AEd.$(this.domElementSuggestionsType);
            this.elementSuggestionsUri          = AEd.$(this.domElementSuggestionsUri);
            this.elementSuggestionsUser         = AEd.$(this.domElementSuggestionsUser);
            
            this.suggestionsUserBar.render(this.domElementSuggestionsUser);           
            this.suggestionsUserBar.hide();
            this.suggestionsTypeBar.render(this.domElementSuggestionsType);           
            this.suggestionsTypeBar.hide();
            this.suggestionsUriBar.render(this.domElementSuggestionsUri);           
            this.suggestionsUriBar.hide();
      
            this.subscribedContainer.render(this.elementContainerSubscribed);
            this.unsubscribedContainer.render(this.elementContainerUnsubscribed);
            
            this.btnSubscribe.onClick.addHandler(function() {
                if(this.domElementInputType.value || this.domElementInputUser.value || this.domElementInputUri.value){
                    this.addSubscribed(this.domElementInputUser.value, this.domElementInputType.value, this.domElementInputUri.value);
                    this.clearInputs();
                }
            }, this);
            
            this.btnUnsubscribe.onClick.addHandler(function() {
                if(this.domElementInputType.value || this.domElementInputUser.value || this.domElementInputUri.value){
                    this.addUnsubscribed(this.domElementInputUser.value, this.domElementInputType.value, this.domElementInputUri.value);
                    this.clearInputs();
                }
            }, this);
            
            AEd.Events.addHandler(this.iframeDocument, "click", function(e) { 
                this.suggestionsUserBar.hide();
                this.suggestionsTypeBar.hide();
                this.suggestionsUriBar.hide();
            },this);
          
            this.suggestionsUserBar.onClick.addHandler( function (item) {
                this.suggestionsUserBarOnClick(item); 
            },this);
            this.suggestionsTypeBar.onClick.addHandler( function (item) {
                this.suggestionsTypeBarOnClick(item); 
            },this);
          
           this.suggestionsUriBar.onClick.addHandler( function (item) {
                this.suggestionsUriBarOnClick(item); 
            },this);
            

            
            this.elementInputUser.addEventHandler("keyup", function(e) {
                this.elementInputUserKeyUp(e);
            },this);
            
            this.elementInputType.addEventHandler("keyup", function(e) {
                this.elementInputTypeKeyUp(e);
                
            },this);
            this.elementInputUri.addEventHandler("keyup", function(e) {
                this.elementInputUriKeyUp(e);
            },this);
            
            this.elementInputUser.addEventHandler("keydown", function(e) {
                this.elementInputUserKeyDown(e);
            },this);
            
            this.elementInputType.addEventHandler("keydown", function(e) {
                this.elementInputTypeKeyDown(e);
                
            },this);
            this.elementInputUri.addEventHandler("keydown", function(e) {
                this.elementInputUriKeyDown(e);
            },this);
            

        }, this);
    },this );  
     
    
    /**
     * Fires when key is up on aedType input element.
     * 
     * @event onInputTypeKeyUp                                                 
     */         
    this.onInputTypeKeyUp = new AEd.utils.Dispatcher();
    
    /**
     * Fires when key is up on aedUser input element.
     * 
     * @event onInputUserKeyUp                                                 
     */             
    this.onInputUserKeyUp = new AEd.utils.Dispatcher();
    
    /**
     * Fires when key is up on aedUri input element.
     * 
     * @event onInputUriKeyUp                                                 
     */         
    this.onInputUriKeyUp = new AEd.utils.Dispatcher();
}



AEd.ui.DlgSubscriptions.prototype.constructor = AEd.ui.DlgSubscriptions;

AEd.inheritFromPrototype(AEd.ui.DlgSubscriptions, AEd.ui.core.UIDialog);


// ---------------------------------------------------------------- getType
/**
 * Returns Type from elementInputType
 *
 * @name getType
 * @memberOf AEd.ui.DlgSubscriptions   
 * @function   
 * @return {String} input value
 */
AEd.ui.DlgSubscriptions.prototype.getType = function() {
    return this.domElementInputType.value;
    
}
// ---------------------------------------------------------------- getUser
/**
 * Returns user input value
 *
 * @name getUser
 * @memberOf AEd.ui.DlgSubscriptions   
 * @function   
 * @return {String} input value
 */
AEd.ui.DlgSubscriptions.prototype.getUser = function() {
    return this.domElementInputUser.value;
}
// ---------------------------------------------------------------- getUri
/**
 * returns uri input value
 *
 * @name setUser
 * @memberOf AEd.ui.DlgSubscriptions   
 * @function   
 * @return {String} input value
 */
AEd.ui.DlgSubscriptions.prototype.getUri = function() {
    return  this.domElementInputUri.value;
}

// ---------------------------------------------------------------- setType
/**
 * Set type input value
 *
 * @name setType
 * @memberOf AEd.ui.DlgSubscriptions   
 * @param {String} type
 * @function   
 * @param {String} type new input value
 */
AEd.ui.DlgSubscriptions.prototype.setType = function(type) {
    this.domElementInputType.value = type
}
// ---------------------------------------------------------------- setUser
/**
 * Set user input value
 *
 * @name setUser
 * @memberOf AEd.ui.DlgSubscriptions   
 * @param {String} user
 * @function   
 * @param {String} user new input value
 */
AEd.ui.DlgSubscriptions.prototype.setUser = function(user) {
    this.domElementInputUser.value = user;
}
// ---------------------------------------------------------------- setUri
/**
 * Set uri input value
 *
 * @name setUri
 * @memberOf AEd.ui.DlgSubscriptions   
 * @param {String} uri
 * @function   
 * @param {String} uri new input value
 */
AEd.ui.DlgSubscriptions.prototype.setUri = function(uri) {
    this.domElementInputUri.value = uri;
}
// ---------------------------------------------------------------- clearInputs
/**
 * Set empty values to dialog inputs
 *
 * @name clearInputs
 * @memberOf AEd.ui.DlgSubscriptions   
 * @function   
 */
AEd.ui.DlgSubscriptions.prototype.clearInputs = function() {
    this.setType("");
    this.setUser("");
    this.setUri("");
}

// --------------------------------------------------------------- isEverythigEmpty
/**
 * Returns true if all containers (subscribed, unsubscribed and deleted) are empty
 *
 * @name isEverythigEmpty
 * @memberOf AEd.ui.DlgSubscriptions
 * @function
 * @return {Boolean} true if all containers are empty
 */

AEd.ui.DlgSubscriptions.prototype.isEverythigEmpty = function() {

    return (this.subscribedContainer.length == 0 && this.unsubscribedContainer.length == 0 && this.deletedContainer.length == 0);    
}

// ---------------------------------------------------------------- addSubscribed
/**
 * Creates subscription and append it to subscribedContainer
 *
 * @name addSubscribed
 * @memberOf AEd.ui.DlgSubscriptions     
 * @function   
 * @param {String} user .   
 * @param {String} type .   
 * @param {String} uri .
 * @param {String} origin .     
 * @return AEd.ui.Subscription
 */
AEd.ui.DlgSubscriptions.prototype.addSubscribed = function(user, type, uri, origin) {

    if(this.isSubscribed(user, type, uri) === false){

        var item; // IE8 fix
        if((item = this.isUnsubscribed(user, type, uri)) !== false){
            this.unsubscribedContainer.removeItem(item);
        }
        var subscription = new AEd.ui.Subscription({
            origin: origin == null ? "new" : origin,
            type: type, 
            user: user, 
            uri: uri
        });  
        subscription.btnChange.setIcon('join');
        subscription.btnDelete.onClick.addHandler(function() {
            if(!subscription.isNew()){
                this.addDeleted(subscription.user, subscription.type, subscription.uri, subscription.origin);
            }
            this.subscribedContainer.removeItem(subscription);
        },this);
        subscription.btnChange.onClick.addHandler(function() {
            var newSubscription = this.addUnsubscribed(subscription.user, subscription.type, subscription.uri);
            newSubscription.setStateUnsubscribed();
            this.subscribedContainer.removeItem(subscription);
            

        },this);

        this.subscribedContainer.addItem(subscription);

        return subscription;
    }
}
    
    
// ---------------------------------------------------------------- addUnsubscribed
/**
 * Creates subscription and append it to unsubscribedContainer
 *
 * @name addUnsubscribed
 * @memberOf AEd.ui.DlgSubscriptions     
 * @function   
 * @param {String} user .   
 * @param {String} type .   
 * @param {String} uri .
 * @param {String} origin .  
 * @return AEd.ui.Subscription
 */
AEd.ui.DlgSubscriptions.prototype.addUnsubscribed = function(user, type, uri, origin) {
    if(this.isUnsubscribed(user, type, uri) === false){

        var item; // IE8 fix
        if((item = this.isSubscribed(user, type, uri)) !== false){
            this.subscribedContainer.removeItem(item);
        }
        var subscription = new AEd.ui.Subscription({
            origin: origin == null ? "new" : origin,
            type: type, 
            user: user, 
            uri: uri
        });  
        subscription.btnChange.setIcon('leave');
        subscription.btnDelete.onClick.addHandler(function() {
            if(!subscription.isNew()){
                this.addDeleted(subscription.user, subscription.type, subscription.uri, subscription.origin);
            }
            this.unsubscribedContainer.removeItem(subscription);
        },this);
        subscription.btnChange.onClick.addHandler(function() {
            var newSubscription = this.addSubscribed(subscription.user, subscription.type, subscription.uri)
            newSubscription.setStateSubscribed();
            this.unsubscribedContainer.removeItem(subscription);
            
            
        },this);
        this.unsubscribedContainer.addItem(subscription);
        return subscription;
    }
    
   
}


// ---------------------------------------------------------------- addDeleted
/**
 * Creates subscription and append it to deletedContainer
 *
 * @name addDeleted
 * @memberOf AEd.ui.DlgSubscriptions     
 * @function   
 * @param {String} user .   
 * @param {String} type .   
 * @param {String} uri . 
 * @param {String} origin . 
 */
AEd.ui.DlgSubscriptions.prototype.addDeleted = function(user, type, uri, origin) {

        var subscription = new AEd.ui.Subscription({
            type: type, 
            user: user, 
            uri: uri,
            origin: origin
        }); 
        subscription.setStateDeleted();
        this.deletedContainer.addItem(subscription);
}
// ---------------------------------------------------------------- isUnsubscribed
/**
 * Cheks if subscription exists in unsubscribed container
 *
 * @name isUnsubscribed
 * @memberOf AEd.ui.DlgSubscriptions    
 * @function   
 * @param {String} user .   
 * @param {String} type .   
 * @param {String} uri . 
 * @return AEd.ui.Subscription or false 
 */
AEd.ui.DlgSubscriptions.prototype.isUnsubscribed = function(user, type, uri) {

    for (var i = 0; i < this.unsubscribedContainer.items.length; i++){

        if(this.unsubscribedContainer.items[i].type == type && this.unsubscribedContainer.items[i].user == user && this.unsubscribedContainer.items[i].uri == uri){
            return this.unsubscribedContainer.items[i];
        }
          
    }
    return false;
}
// ---------------------------------------------------------------- isSubscribed
/**
 * Cheks if subscription exists in subscribed container
 *
 * @name isSubscribed
 * @memberOf AEd.ui.DlgSubscriptions    
 * @function   
 * @param {String} user .   
 * @param {String} type .   
 * @param {String} uri . 
 * @return AEd.ui.Subscription or false 
 */
AEd.ui.DlgSubscriptions.prototype.isSubscribed = function(user, type, uri) {

    for (var i = 0; i < this.subscribedContainer.items.length; i++){

        if(this.subscribedContainer.items[i].type == type && this.subscribedContainer.items[i].user ==user && this.subscribedContainer.items[i].uri == uri){
            return this.subscribedContainer.items[i];
        } 
      
    }
    return false;
    
}

// ------------------------------------------------------------- getSubscriptions
/**
 * Retuns subscribed and unsubscribed subscriptions
 *
 * @name getSubscriptions
 * @memberOf AEd.ui.DlgSubscriptions 
 * @function   
 * @param {Boolean} noLoadControl prevent contentLoaded control
 * @return {Object} of all subscriptions
 */
AEd.ui.DlgSubscriptions.prototype.getSubscriptions = function(noLoadControl) {
    var subscriptions = {};
    if (noLoadControl || this.contentLoaded) {

        subscriptions.subscribed = this.getSubscribed(true);
        subscriptions.unsubscribed = this.getUnsubscribed(true);

    }
    return subscriptions;
}
     
// ------------------------------------------------------------- getSubscriptionsToSubscribe
/**
 * Retuns subscriptions marked as to subscribe
 *
 * @name getSubscriptionsToSubscribe
 * @memberOf AEd.ui.DlgSubscriptions 
 * @function   
 * @return {Array} aSubscribed subscribed items array
 */
AEd.ui.DlgSubscriptions.prototype.getSubscriptionsToSubscribe = function() {
    if (this.contentLoaded) {
        aSubscribed = new Array();
        for (var i = 0; i < this.subscribedContainer.items.length; i++){

            if(this.subscribedContainer.items[i].isStateSubscribed() || this.subscribedContainer.items[i].isNew()){
                aSubscribed.push(this.subscribedContainer.items[i].getValues());
            }
        }
        return aSubscribed;
    }
}  
    
// ------------------------------------------------------------- getSubscriptionsToUnsubscribe
/**
 * Retuns subscriptions marked as to  delete
 *
 * @name getSubscriptionsToUnsubscribe
 * @memberOf AEd.ui.DlgSubscriptions 
 * @function   
 * @return {Array} aUnsubscribed unsubscribed items array
 */
AEd.ui.DlgSubscriptions.prototype.getSubscriptionsToUnsubscribe  = function() {
    if (this.contentLoaded) {
        aUnsubscribed = new Array();
        for (var i = 0; i < this.unsubscribedContainer.items.length; i++){

            if(this.unsubscribedContainer.items[i].isStateUnsubscribed() || this.unsubscribedContainer.items[i].isNew()){
                aUnsubscribed.push(this.unsubscribedContainer.items[i].getValues());
                
            }
        }
        return aUnsubscribed;
    }
}
      
// ------------------------------------------------------------- getSubscriptionsToDelete
/**
 * Retuns subscribed subscriptions
 *
 * @name getSubscriptionsToDelete 
 * @memberOf AEd.ui.DlgSubscriptions 
 * @function   
 * @return {Array} aDeleted deleted items array
 */
AEd.ui.DlgSubscriptions.prototype.getSubscriptionsToDelete = function() {
    if (this.contentLoaded) {
        aDeleted = new Array();
        for (var i = 0; i < this.deletedContainer.items.length; i++){

            aDeleted.push(this.deletedContainer.items[i].getValues());
        }
        return aDeleted;
    }
}      

// ------------------------------------------------------------- removeAllDeleted
/**
 * Remove all items from deletedContainer
 *
 * @name removeAllDeleted 
 * @memberOf AEd.ui.DlgSubscriptions 
 * @function   
 */
AEd.ui.DlgSubscriptions.prototype.removeAllDeleted = function() {
    if (this.contentLoaded) {
        this.deletedContainer.removeAllItems();
    }
}

// ------------------------------------------------------------- removeAll
/**
 * Removes all items from all containers
 *
 * @name removeAll 
 * @memberOf AEd.ui.DlgSubscriptions 
 * @function   
 */
AEd.ui.DlgSubscriptions.prototype.removeAll = function() {
    if (this.contentLoaded) {
        this.deletedContainer.removeAllItems();
        this.subscribedContainer.removeAllItems();
        this.unsubscribedContainer.removeAllItems();
    }
}

// ------------------------------------------------------------- getSubscribed
/**
 * Retuns subscribed subscriptions
 *
 * @name getSubscribed
 * @memberOf AEd.ui.DlgSubscriptions 
 * @function   
 * @param {Boolean} noLoadControl prevent contentLoaded control
 * @return {Array} aSubscribed of subscribed subscriptions
 */
AEd.ui.DlgSubscriptions.prototype.getSubscribed = function(noLoadControl) {
    if (noLoadControl || this.contentLoaded) {

        aSubscribed = new Array();

        for (var i = 0; i < this.subscribedContainer.items.length; i++){

           aSubscribed.push(this.subscribedContainer.items[i].getValues());
        }
        return aSubscribed;
    }
}        

// ------------------------------------------------------------ getUnsubscribed
/**
 * Deletes a row from subscriptions table.
 *
 * @name getUnsubscribed
 * @memberOf AEd.ui.DlgSubscriptions 
 * @function   
 * @param {Boolean} noLoadControl prevent contentLoaded control
 * @return {Array} aUnsubscribed of unsubscribed subscriptions
 */
AEd.ui.DlgSubscriptions.prototype.getUnsubscribed = function(noLoadControl) {
    if (noLoadControl || this.contentLoaded) {        
        aUnsubscribed = new Array();
        for (var i = 0; i < this.unsubscribedContainer.items.length; i++){
            aUnsubscribed.push(this.unsubscribedContainer.items[i].getValues());
        }
        return aUnsubscribed;
    }
} 
       
// ----------------------------------------------------------- setSubscriptions
/**
 * Creates subscripitions containers from input array of settings : 
 * {unsubscribed: [{user: user1, type: type1, uri: uri1}, {user: user2, type: type2, uri: uri2}, {...}],{subscribed:[.....]}
 *
 * @name setSubscriptions
 * @memberOf AEd.ui.DlgSubscriptions 
 * @function  
 * @param {Object} oSubscriptions Object of arrays of subscriptions.  
 */
AEd.ui.DlgSubscriptions.prototype.setSubscriptions = function(oSubscriptions) {
    if (this.contentLoaded) {
        this.subscribedContainer.removeAllItems();
        this.unsubscribedContainer.removeAllItems();
        this.deletedContainer.removeAllItems();
        if(oSubscriptions.subscribed){
            for (var i = 0; i < oSubscriptions.subscribed.length; i++){
                this.addSubscribed(oSubscriptions.subscribed[i].user, oSubscriptions.subscribed[i].type, oSubscriptions.subscribed[i].uri, "subscribed");
            }
        }
        if(oSubscriptions.unsubscribed){
            for (var i = 0; i < oSubscriptions.unsubscribed.length; i++){
                this.addUnsubscribed(oSubscriptions.unsubscribed[i].user, oSubscriptions.unsubscribed[i].type, oSubscriptions.unsubscribed[i].uri, "unsubscribed");
            }
        }
    }
}

// -------------------------------------------------------- elementInputUserKeyUp
/**
 * on elementUserType key up
 *
 * @name elementInputUserKeyUp
 * @memberOf AEd.ui.DlgSubscriptions
 * @function 
 * @param {Event} e event   
 */
AEd.ui.DlgSubscriptions.prototype.elementInputUserKeyUp = function (e){
     var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event);
    
    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 13: // enter or right arrow
        case 39:
            if (!this.suggestionsUserBar.isHidden) {
                if (this.suggestionsUserBar.selectedItem && typeof(this.suggestionsUserBar.selectedItem.isSimpleUser) == 'function') {
                    if (this.suggestionsUserBar.selectedItem.isSimpleUser()) {
                        this.setUser(this.suggestionsUserBar.selectedItem.getName());
                    }
                    else if (!this.suggestionsUserBar.selectedItem.isSimpleUser()) {
                        this.setUser(this.suggestionsUserBar.selectedItem.getText());
                    }        
                }
                this.suggestionsUserBar.hide();
            }
            break;
                                     
        default:
            if ( ((code > 31) && (code != 37) && (code != 38) && (code != 39) && (code != 40)) || (code == 8) )  {
                this.onInputUserKeyUp.fire();
            }
            this.suggestionsUserBar.show();                       
            break;
    } 
}

// -------------------------------------------------------- elementInputTypeKeyUp
/**
 * on elementInputType key up
 *
 * @name elementInputTypeKeyUp
 * @memberOf AEd.ui.DlgSubscriptions
 * @function    
 * @param {Event} e event  
 */
AEd.ui.DlgSubscriptions.prototype.elementInputTypeKeyUp = function (e){
    var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event);
    
    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 13: // enter or right arrow
        case 39:
            if (!this.suggestionsTypeBar.isHidden) {
                if (this.suggestionsTypeBar.selectedItem && typeof(this.suggestionsTypeBar.selectedItem.isSimpleType) == 'function') {
                    if (this.suggestionsTypeBar.selectedItem.isSimpleType()) {
                        this.setType(this.suggestionsTypeBar.selectedItem.getName());
                    }
                    else if (!this.suggestionsTypeBar.selectedItem.isSimpleType()) {
                        this.setType(this.suggestionsTypeBar.selectedItem.getText());
                    }        
                }
                this.suggestionsTypeBar.hide();
            }
            break;
                                     
        default:
            if ( ((code > 31) && (code != 37) && (code != 38) && (code != 39) && (code != 40)) || (code == 8) )  {
                this.onInputTypeKeyUp.fire();
            }
            this.suggestionsTypeBar.show();                       
            break;
    }    
}

// -------------------------------------------------------- elementInputUriKeyUp
/**
 * on elementInputUri key up
 *
 * @name elementInputUriKeyUp
 * @memberOf AEd.ui.DlgSubscriptions
 * @function   
 * @param {Event} e event   
 */
AEd.ui.DlgSubscriptions.prototype.elementInputUriKeyUp = function (e){
     var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event);
    
    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 13: // enter or right arrow
        case 39:
            if (!this.suggestionsUriBar.isHidden) {
                if (this.suggestionsUriBar.selectedItem && typeof(this.suggestionsUriBar.selectedItem.isSimpleUri) == 'function') {
                    if (this.suggestionsUriBar.selectedItem.isSimpleUri()) {
                        this.setUri(this.suggestionsUriBar.selectedItem.getName());
                    }
                    else if (!this.suggestionsUriBar.selectedItem.isSimpleUri()) {
                        this.setUri(this.suggestionsUriBar.selectedItem.getText());
                    }        
                }
                this.suggestionsUriBar.hide();
            }
            break;
                                     
        default:
            if ( ((code > 31) && (code != 37) && (code != 38) && (code != 39) && (code != 40)) || (code == 8) )  {
                this.onInputUriKeyUp.fire();
            }
            this.suggestionsUriBar.show();                       
            break;
    } 
    }


// --------------------------------------------------------------- elementInputUserKeyDown
/**
 * Suggestion bar control when key down
 *
 * @name elementInputUserKeyDown
 * @memberOf AEd.ui.DlgSubscriptions 
 * @function
 * @param {Event} e event  
 */
AEd.ui.DlgSubscriptions.prototype.elementInputUserKeyDown = function(e) {  
    var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event); 

    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 40: // down arrow
            this.suggestionsUserBar.selectNextItem();
            this.suggestionsUserBar.show();
            AEd.Events.preventDefault(event);
            break;
                   
        case 38: // up arrow
            this.suggestionsUserBar.selectPreviousItem();
            break;                                
        default:
            break;
    }            
}

// --------------------------------------------------------------- elementInputTypeKeyDown
/**
 * Suggestion bar control when key down
 *
 * @name elementInputTypeKeyDown
 * @memberOf AEd.ui.DlgSubscriptions 
 * @function
 * @param {Event} e event   
 */
AEd.ui.DlgSubscriptions.prototype.elementInputTypeKeyDown = function(e) {  
    var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event); 

    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 40: // down arrow
            this.suggestionsTypeBar.selectNextItem();
            this.suggestionsTypeBar.show();
            AEd.Events.preventDefault(event);
            break;
                   
        case 38: // up arrow
            this.suggestionsTypeBar.selectPreviousItem();
            break;                                
        default:
            break;
    }            
}

// --------------------------------------------------------------- elementInputUriKeyDown
/**
 * Suggestion bar control when key down
 *
 * @name elementInputUriKeyDown
 * @memberOf AEd.ui.DlgSubscriptions 
 * @function
 * @param {Event} e event  
 */
AEd.ui.DlgSubscriptions.prototype.elementInputUriKeyDown = function(e) {  
    var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event); 

    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 40: // down arrow
            this.suggestionsUriBar.selectNextItem();
            this.suggestionsUriBar.show();
            AEd.Events.preventDefault(event);
            break;
                   
        case 38: // up arrow
            this.suggestionsUriBar.selectPreviousItem();
            break;                                
        default:
            break;
    }            
}

// --------------------------------------------------------------- suggestionsUserBarOnClick
/**
 * Suggestion bar control when clicked
 *
 * @name suggestionsUserBarOnClick
 * @memberOf AEd.ui.DlgSubscriptions
 * @function
 * @param {Item} item of suggestion bar 
 */
AEd.ui.DlgSubscriptions.prototype.suggestionsUserBarOnClick = function(item) {
        this.setUser(this.suggestionsUserBar.selectedItem.getText());
    this.suggestionsUserBar.hide();    
}

// --------------------------------------------------------------- suggestionsTypeBarOnClic
/**
 * Suggestion bar control when clicked
 *
 * @name suggestionsTypeBarOnClic
 * @memberOf AEd.ui.DlgSubscriptions
 * @function
 * @param {Item} item of suggestion bar  
 */
AEd.ui.DlgSubscriptions.prototype.suggestionsTypeBarOnClick = function(item) {
    if (this.suggestionsTypeBar.selectedItem.isSimpleType()) {
        this.setType(this.suggestionsTypeBar.selectedItem.getName());
    }
    else if (!this.suggestionsTypeBar.selectedItem.isSimpleType()) {
        this.setType(this.suggestionsTypeBar.selectedItem.getText());
    }
    this.suggestionsTypeBar.hide();    
}

// --------------------------------------------------------------- suggestionsUriBarOnClick
/**
 * Suggestion bar control when clicked
 *
 * @name suggestionsUriBarOnClick
 * @memberOf AEd.ui.DlgSubscriptions
 * @function
 * @param {Item} item of suggestion bar 
 */
AEd.ui.DlgSubscriptions.prototype.suggestionsUriBarOnClick = function(item) {

    this.setUri(this.suggestionsUriBar.selectedItem.getText());
    this.suggestionsUriBar.hide();    
}

// *****************************************************************************
// class AEd.ui.DlgSubscriptions
// ***************************************************************************** 

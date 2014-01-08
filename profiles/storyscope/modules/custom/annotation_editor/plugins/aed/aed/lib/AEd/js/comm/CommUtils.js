/**
 * CommUtils.js
 *
 * Contains AEd.comm.CommUtils class definition. 
 *  
 * @authors: Martin Kleban, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.comm.CommUtils
// *****************************************************************************  



/**
 * Functionality for server communication..
 * 
 *
 * @name CommUtils
 * @memberOf AEd.comm      
 * @class    	  
 */
AEd.comm.CommUtils = function() {
    
    // *************************************************************************
    // CommUtils public properties
    // *************************************************************************               
    
    /**
     *  Server protocol version.     
     *  @name serverProtocolVersion
     *  @memberOf AEd.comm.CommUtils
     *  @property        
     *  @type String                      
     */  
    this.serverProtocolVersion = null;
    
    /**
     *  Session ID.     
     *  @name sid
     *  @memberOf AEd.comm.CommUtils
     *  @property        
     *  @type String                      
     */ 
    this.sid = null;
    
    /**
     *  Server address.     
     *  @name server
     *  @memberOf AEd.comm.CommUtils
     *  @property        
     *  @type String                      
     */     
    this.server = null;    
    
    /**
     *  True or false if comet communication was enabled.     
     *  @name isCometEnabled
     *  @memberOf AEd.comm.CommUtils
     *  @property        
     *  @type Boolean                      
     */     
    this.isCometEnabled = false;   
    
    /**
     *  Last send get request.     
     *  @name lastGetRequest
     *  @memberOf AEd.comm.CommUtils
     *  @property        
     *  @type Object                      
     */     
    this.lastGetRequest = null;      


    // *************************************************************************
    // CommUtils events
    // *************************************************************************        

    /**
     * Fires when CONNECTED msg was received.
     * 
     * @name onServerMsgConnected 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.      
     *                                                      
     */           
    this.onServerMsgConnected = new AEd.utils.Dispatcher();  

          
    /**
     * Fires when DISCONNECTED msg was received.
     * 
     * @name onServerMsgDisconnect 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgDisconnect = new AEd.utils.Dispatcher();            
          
    /**
     * Fires when LOGGED msg was received.
     * 
     * @name onServerMsgLogged 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgLogged = new AEd.utils.Dispatcher();  
          
    /**
     * Fires when PERSONS msg was received.
     * 
     * @name onServerMsgPersons 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgPersons = new AEd.utils.Dispatcher();      
    
    /**
     * Fires when USER GROUPS msg was received.
     * 
     * @name onServerMsgUserGroups 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgUserGroups = new AEd.utils.Dispatcher(); 
    
    /**
     * Fires when RESYNCHRONIZE msg was received.
     * 
     * @name onServerMsgResynchronize 
     * @memberOf AEd.comm.CommUtils            
     * @event
     * @param {Object} msg Received message.      
     *                                                      
     */           
    this.onServerMsgResynchronize = new AEd.utils.Dispatcher(); 
    
    /**
     * Fires when SYNCHRONIZED msg was received.
     * 
     * @name onServerMsgSynchronized 
     * @memberOf AEd.comm.CommUtils            
     * @event
     * @param {Object} msg Received message.      
     *                                                      
     */           
    this.onServerMsgSynchronized = new AEd.utils.Dispatcher(); 
    
    /**
     * Fires when TEXT MODIFICATION msg was received.
     * 
     * @name onServerMsgTextModification 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgTextModification = new AEd.utils.Dispatcher();               

    /**
     * Fires when TYPES msg was received.
     * 
     * @name onServerMsgTypes 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgTypes = new AEd.utils.Dispatcher();   
    
    /**
     * Fires when ANNOTATIONS msg was received.
     * 
     * @name onServerMsgAnnotations 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgAnnotations = new AEd.utils.Dispatcher();      
    
    /**
     * Fires when SUGGESTIONS msg was received.
     * 
     * @name onServerMsgSuggestions 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgSuggestions = new AEd.utils.Dispatcher();    
    
    /**
     * Fires when SETTINGS msg was received.
     * 
     * @name onServerMsgSettings 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgSettings = new AEd.utils.Dispatcher();          
    
    /**
     * Fires when ERROR msg was received.
     * 
     * @name onServerMsgError 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgError = new AEd.utils.Dispatcher();     
          
    /**
     * Fires when WARNING msg was received.
     * 
     * @name onServerMsgWarning 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgWarning = new AEd.utils.Dispatcher();   
    
    /**
     * Fires when OK msg was received.
     * 
     * @name onServerMsgOk 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgOk = new AEd.utils.Dispatcher();    
    
    /**
     * Fires when UNKNOWN msg was received.
     * 
     * @name onServerMsgUnknown 
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgUnknown = new AEd.utils.Dispatcher(); 

    /**
     * Fires when ENTITIES msg was received.
     * 
     * @name onServerMsgEntities
     * @memberOf AEd.comm.CommUtils            
     * @event 
     * @param {Object} msg Received message.     
     *                                                      
     */           
    this.onServerMsgEntities = new AEd.utils.Dispatcher(); 

    /**
     * Fires when server connection is lost.
     * 
     * @name onServerConnectionLost
     * @memberOf AEd.comm.CommUtils            
     * @event    
     *                                                      
     */           
    this.onServerConnectionLost = new AEd.utils.Dispatcher();

    /**
     * Counts empty responses.
     * 
     * @name numOfErrors
     * @memberOf AEd.comm.CommUtils            
     * @property    
     *                                                      
     */         
    this.numOfErrors = 0;

    /**
     * Determines previous error.
     * 
     * @name previousError
     * @memberOf AEd.comm.CommUtils            
     * @property    
     *                                                      
     */         
    this.previousError = false;
    
}


AEd.comm.CommUtils.prototype.constructor = AEd.comm.CommUtils;

// ------------------------------------------------------------ sendPostRequest
/**
 * Sends post request.
 *  
 * @name sendPostRequest
 * @memberOf AEd.comm.CommUtils  
 * @function
 * @param {Array} aMsgParams Msg parameters.
 * @param {Object} oHandlers Object with callback functions.    	
 */
AEd.comm.CommUtils.prototype.sendPostRequest = function(aMsgParams, oHandlers) {
      if (this.sid) {aMsgParams.unshift({msgtype: "session", sId: this.sid});}

      var xmlMsg = AEd.Protocol.createMsg(aMsgParams);
      

      var oRequest = {             
         method: "POST", 
         url: AEd.CONFIG.PROXY_SERVER_USE ? AEd.CONFIG.PROXY_SERVER_ADDRESS + "?serverAddress=" + this.server : this.server,
         data: xmlMsg,
         requestHeaders : ["Content-Type", "text/xml;charset=UTF-8"],
         onSuccess: oHandlers.onSuccess,
         onNotModified: oHandlers.onSuccess,
         onFailure: oHandlers.onFailure, 
         scope: oHandlers.scope
      } 

      AEd.XHR.sendRequest(oRequest); 
}


// ------------------------------------------------------------- sendGetRequest
/**
 * Sends GET request.
 *  
 * @name sendGetRequest
 * @memberOf AEd.comm.CommUtils  
 * @function  	
 */
AEd.comm.CommUtils.prototype.sendGetRequest = function() {
 
      var timeSeed = new Date().getTime(); // Avoid caching XHR responses by adding unique seed to URL  

      this.lastGetRequest = {
         method: "GET", 
         url: AEd.CONFIG.PROXY_SERVER_USE ? AEd.CONFIG.PROXY_SERVER_ADDRESS + "?session=" + this.sid + "&serverAddress=" + this.server + "&ts=" + timeSeed : this.server + "?session=" + this.sid + "&ts=" + timeSeed,
         onSuccess: function(oResponse) {

                    this.handleServerMsg(oResponse); 
                    if (this.isCometEnabled) { this.sendGetRequest();} 

                    if (!oResponse.xmlData){  // Response is empty, count it
                   
                       if (this.previousError){  // Count only cluster of errors

                          this.numOfErrors++; 
                       }

                       this.previousError = true;
                    }              
                    else {

                      this.previousError = false;
                      this.numOfErrors = 0;
                    } 
                    if (this.numOfErrors > 10){this.handleServerMsg(null);}   // 10 or more empty responses - server connection is lost
         },
         onNotModified: function(oResponse) {this.handleServerMsg(oResponse); if (this.isCometEnabled) { this.sendGetRequest();} },

         onFailure: function() {

                    if (this.isCometEnabled) { this.sendGetRequest() } 
                    this.numOfErrors = this.numOfErrors + 10; // Agregate errors - error showing on page refresh prevention
                    
                    if (this.numOfErrors >= 20){  // Show not connected error - prevent showing on page refresh

                       this.handleServerMsg(null); 
                    }
         },  
         scope: this
      }  
     
      if (this.numOfErrors < 10) {

         AEd.XHR.sendRequest(this.lastGetRequest); 
      }

}  


// ------------------------------------------------------- cancelLastGetRequest
/**
 * Cancels GET request.
 *  
 * @name cancelLastGetRequest
 * @memberOf AEd.comm.CommUtils  
 * @function  	
 */
AEd.comm.CommUtils.prototype.cancelLastGetRequest = function() { 
      AEd.XHR.cancelRequest(this.lastGetRequest); 
}  




// ------------------------------------------------------------ handleServerMsg
/**
 * Handles server response.
 *  
 * @name handleServerMsg
 * @memberOf AEd.comm.CommUtils  
 * @function
 * @param {Object} oResponse Response object.    	
 */
AEd.comm.CommUtils.prototype.handleServerMsg = function(oResponse) {
      if (oResponse) {
           var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);

           for (var i = 0; i < aMsgs.length; i++) {
              switch(aMsgs[i].msgtype) {
                 case "connected":
                    this.onServerMsgConnected.fire(aMsgs[i]);
                 break;
                 case "disconnect":
                    this.onServerMsgDisconnect.fire(aMsgs[i]);
                 break;
                 case "logged":
                    this.onServerMsgLogged.fire(aMsgs[i]);
                 break;
                 case "persons":
                    this.onServerMsgPersons.fire(aMsgs[i]);
                 break;
                 case "userGroups":
                    this.onServerMsgUserGroups.fire(aMsgs[i]);
                 break;
                 case "resynchronize":
                    this.onServerMsgResynchronize.fire(aMsgs[i]);
                 break;
                 case "synchronized":
                    this.onServerMsgSynchronized.fire(aMsgs[i]);
                 break;
                 case "textModification":
                    this.onServerMsgTextModification.fire(aMsgs[i]);
                 break;
                 case "types":
                    this.onServerMsgTypes.fire(aMsgs[i]);
                 break;
                 case "annotations":
                    this.onServerMsgAnnotations.fire(aMsgs[i]);
                 break;
                 case "suggestions":
                    this.onServerMsgSuggestions.fire(aMsgs[i]);
                 break;
                 case "settings":
                    this.onServerMsgSettings.fire(aMsgs[i]);
                 break;
                 case "error":
                    this.onServerMsgError.fire(aMsgs[i]);
                 break;
                 case "warning":
                    this.onServerMsgWarning.fire(aMsgs[i]);
                 break;
                 case "ok":
                    this.onServerMsgOk.fire(aMsgs[i]);
                 break;
                 case "entities":
                    this.onServerMsgEntities.fire(aMsgs[i]);
                 break;
                 // unknown message
                 default:
                    this.onServerMsgUnknown.fire(aMsgs[i]);
                 break;
              }
           }
      }

      else {   // Server connection is lost

         this.onServerConnectionLost.fire();
      }
}  



// ------------------------------------------------------------------ setServer
/**
 * Sets server property.
 *  
 * @name setServer
 * @memberOf AEd.comm.CommUtils  
 * @function
 * @param {String} server New server address.  	
 */
AEd.comm.CommUtils.prototype.setServer = function(server) {  
    this.server = server;       
}  
    
    
    
// --------------------------------------------------- setServerProtocolVersion
/**
 * Sets serverProtocolVersion property.
 *  
 * @name setServerProtocolVersion
 * @memberOf AEd.comm.CommUtils  
 * @function
 * @param {String} serverVersion Server protocol version.	
 */
AEd.comm.CommUtils.prototype.setServerProtocolVersion = function(serverVersion) {  
    this.serverProtocolVersion = serverVersion;       
}      



// --------------------------------------------------------------- setSessionId
/**
 * Sets sid property.
 *  
 * @name setSessionId
 * @memberOf AEd.comm.CommUtils  
 * @function
 * @param {String} sid Session ID value.	
 */
AEd.comm.CommUtils.prototype.setSessionId = function(sid) {  
    this.sid = sid;       
}   


// ------------------------------------------------------------ setCometEnabled
/**
 * Enables / disables comet polling.
 *  
 * @name setCometEnabled
 * @memberOf AEd.comm.CommUtils  
 * @function
 * @param {boolean} value New value for this.isCometEnabled.	
 */
AEd.comm.CommUtils.prototype.setCometEnabled = function(value) {  
    if (value) {
        this.isCometEnabled = true;    
    }
    else {
        this.isCometEnabled = false;    
    }          
}        

// *****************************************************************************
// class AEd.wysiwyg.WysiwygEditor
// ***************************************************************************** 

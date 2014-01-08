/**
 * XHR.js
 *
 * Contains AEd.ajax.XHR class definition.
 *  
 * @author: Martin Kleban 
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.ajax.XHR 
// ***************************************************************************** 


     
/**
 * XHR class enables you to send XMLHTTPRequests cross browser. 
 * @name XHR
 * @memberOf AEd.ajax        
 * @class XHR
 * @static
 *      
 */
AEd.ajax.XHR = (function() {
        

    // *************************************************************************
    // variables
    // *************************************************************************   
    
    // object to return
    var t = {};
    
           
    // *************************************************************************
    // XHR public properties
    // *************************************************************************               
        




    // *************************************************************************
    // XHR private properties
    // *************************************************************************     
    
           
    // constant - interval for checking responses and sending next requests
    var INTERVAL = 250;             
    // array of oRequest objects 
    var aRequests = new Array();  
    // array of active requests
    var aActiveRequests = new Array();      
    // handler of timeout
    var iTimeout = null;      
    // continue with another call of _checkInterval method ?
    var continuePolling = true;  


 
    // *************************************************************************
    // XHR events
    // ************************************************************************* 
 
  

  
          
    // *************************************************************************
    // XHR PUBLIC methods
    // *************************************************************************  
        
    // --------------------------------------------------------------- XHR.init 
    /**
     * Initializes XHR class.   
     * @name init   
     * @memberOf AEd.ajax.XHR                         
     * @function
     * @public      
     *          
     */         
    t.init = function() {

       if (iTimeout) {
          clearTimeout(iTimeout);
          iTimeout = null;
       }
       continuePolling = true;
       iTimeout = setTimeout(_checkInterval, INTERVAL);
    }      



    // ------------------------------------------------------------ XHR.destroy 
    /**
     * Aborts all active requests and clears timer.   
     * @name destroy   
     * @memberOf AEd.ajax.XHR                         
     * @function
     * @public      
     *          
     */      
    t.destroy = function() {

         continuePolling = false;
         while (aRequests[0]) {
             aRequests.splice(0, 1);
         }       
               
    }   
    
    
    
    // -------------------------------------------------------- XHR.sendRequest 
    /**
     * Sends a XHR request.
     * @example 
     *     oRequest = {              
     *        method: "GET" or "POST" or "HEAD"
     *        url: "example.php"
     *        data: POST_DATA
     *        requestHeaders : [header_name01, header_value01, header_name02, header_value02]
     *        onSuccess: function() 
     *        onNotModified: function()
     *        onFailure: function() 
     *        scope: Object
     *     }   
     * @name sendRequest             
     * @memberOf AEd.ajax.XHR   
     * @function     
     * @public           
     * @param {Object} oRequest Request config object.	
     */    
    t.sendRequest = function(oRequest) {                
       oRequest.active = false;
       aRequests.push(oRequest);    
    } 



    // ------------------------------------------------------ XHR.cancelRequest 
    /**
     * Cancel a XHR request. 
     * @name cancelRequest             
     * @memberOf AEd.ajax.XHR   
     * @function     
     * @public           
     * @param {Object} oRequest Request object.	
     */    
    t.cancelRequest = function(oRequest) {                
        var found = false;
        for (var i = 0; i < aRequests.length; i++) {
            if (aRequests[i] === oRequest) {
                found = true;
                aRequests.splice(i, 1);
                break;
            }
        }   
        
        if (!found) {
            for (var i = 0; i < aActiveRequests.length; i++) {
                if (aActiveRequests[i] === oRequest) {
                    found = true;
                    oRequest.oXHR.abort();
                    aActiveRequests.splice(i, 1);                      
                    break;
                }
            }         
        }
                 
    } 


    // *************************************************************************
    // XHR PRIVATE methods
    // *************************************************************************  


    // ----------------------------------------------------- _cancelAllRequests 
    /**
     * Aborts all active requests
     *       
     * @method _cancelAllRequests
     * @private         
     */          
    var _cancelAllRequests = function() {         
        while (aActiveRequests[0]) {
            aActiveRequests[0].oXHR.abort();
            aActiveRequests.splice(0, 1);
        }     
        
            
    }    


    // --------------------------------------------------------- _checkInterval 
    /**
     * Active checking for responses and sending new request. 
     *       
     * @method _checkInterval
     * @private         
     */          
    var _checkInterval = function() {
        if (continuePolling) {
             _checkActiveRequests(); 
             _sendNextRequest();
             if (iTimeout) {
                clearTimeout(iTimeout);
                iTimeout = null;
             }
             iTimeout = setTimeout(_checkInterval, INTERVAL);
        } 
        else {
             _cancelAllRequests();
        }            
    }    
    
    
            
    // ------------------------------------------------------- _sendNextRequest 
    /**
     * Updates the activeEditor property to editor parameter. 
     *       
     * @method _sendNextRequest
     * @private         
     */           
    var _sendNextRequest = function() {

       // if we have some request and number of active requests < 2
       if (aRequests.length > 0 && aActiveRequests.length < 2) {
          var oNextRequest = aRequests.shift();
          if (oNextRequest != null) {
                   aActiveRequests.push(oNextRequest);

                   oNextRequest.oXHR = _createXHR();
                   if (oNextRequest.oXHR) {

                      oNextRequest.oXHR.open(oNextRequest.method,oNextRequest.url,true);                       
                      if (oNextRequest.requestHeaders) {
                           for (var i = 0; i < oNextRequest.requestHeaders.length; i += 2 ) {
                             
                              oNextRequest.oXHR.setRequestHeader(oNextRequest.requestHeaders[i], oNextRequest.requestHeaders[i+1]);
                           }
                      }    
                                                 
                      oNextRequest.oXHR.send(oNextRequest.data); 
                      oNextRequest.active = true;
                   }
                   else { // error in creating new XHR
                      // unshift selected request
                      aRequests.unshift(oNextRequest);
                   }                    
          }
       }
    } 
    
    

    // ------------------------------------------------------------- _createXHR 
    /**
     * Creates new XHR object. 
     *       
     * @method _createXHR
     * @private         
     */      
    var _createXHR = function() {             
             if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
             }
             else if (typeof window.ActiveXObject != "undefined") { // MS IE
                var aTmpVersions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
                for (var i=0; i<iTmpVersions.length; i++) {
                   try {
                      var oXHR = new ActiveXObject(aTmpVersions[i]);
                      return oXHR;
                   } catch (oError) {            
                   }
                }
             }
             throw new Error(AEd.I18n.t("Error_AEd_ajax_XHR_XMLHttp_not_created"));
             return null;
    }   



    // --------------------------------------------------- _checkActiveRequests 
    /**
     * Check for responses for active requests.  
     *       
     * @method _checkActiveRequests
     * @private         
     */      
    var _checkActiveRequests = function() {                
             var oRequest = null;
             var oXHR = null;
             
             for (var i = aActiveRequests.length - 1; i >= 0; i--) {
                
                oRequest = aActiveRequests[i];
                oXHR = aActiveRequests[i].oXHR; 
                
                if (oXHR.readyState == 4) {

                   oRequest.active = false;
                   aActiveRequests.splice(i, 1);
                   var fnCallback = null;
                   
                   if (oXHR.status >= 200 && oXHR.status < 300 ) {
                      if (typeof oRequest.onSuccess == "function") {
                         fnCallback = oRequest.onSuccess; 
                      }
                   } 
                   else if (oXHR.status == 304) {
                      if (typeof oRequest.onNotModified == "function") {
                         fnCallback = oRequest.onNotModified; 
                      }                  
                   }
                   else {
                      if (typeof oRequest.onFailure == "function") {
                         fnCallback = oRequest.onFailure; 
                      }                   
                   }
                   
                   if (fnCallback != null) {
                      setTimeout(                     
                         (function (fnCallback, oRequest, oXHR) {
                            return function() {
                               fnCallback.call(oRequest.scope || window, {
                                  status : oXHR.status,
                                  contentType : oXHR.getResponseHeader("Content-Type"),
                                  data : oXHR.responseText,
                                  xmlData : oXHR.responseXML,
                                  request : oRequest                                  
                               });
                            };
                         })(fnCallback, oRequest, oXHR), 1); 
                   }                                         
                } // if readyState == 4
             } // for
              
  
    } 
        
    // *************************************************************************
    // return
    // *************************************************************************               

    
    return t; 

})();



// *****************************************************************************
// class AEd.ajax.XHR 
// ***************************************************************************** 



// shorten name
AEd.XHR = AEd.ajax.XHR;

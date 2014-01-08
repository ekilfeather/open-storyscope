/**
 * Protocol.js
 *
 * Namespace and functionality for Client-Server XML Communication protocol.
 * Contains class AEd.comm.Protocol 
 * 
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak 
 * 
 */

// *****************************************************************************
// class AEd.comm.Protocol
// ***************************************************************************** 

/**
 * Class for Client-Server XML Communication protocol. 
 * 
 * @name Protocol
 * @memberOf AEd.comm        
 * @class 
 * @static
 *      
 */ 

AEd.comm.Protocol = (function() {
   
    // *************************************************************************
    // variables
    // *************************************************************************   
    
    // object to return
    var t = {};
 
        
        
    // *************************************************************************
    // Protocol public properties
    // *************************************************************************               
    
    // CONST - protocol version
    t.VERSION = "1.1"; 
    // CONST - minimal supported protocol version
    t.MIN_SUPPORTED_VERSION = "1.0"; 
 
    // *************************************************************************
    // Protocol events
    // *************************************************************************        

  
          
    // *************************************************************************
    // Protocol PUBLIC methods
    // *************************************************************************  
    
       
   // --------------------------------------------------------------- createMsg 
    /**
     * Creates protocol message
     * 
     * @name createMsg
     * @memberOf AEd.comm.Protocol                 
     * @function
     * @public        
     * @param {Object} aMsgParams Message object.         
     */              
   t.createMsg = function(aMsgParams) {
      
      var sMsg = '<?xml version="1.0" encoding="utf-8" ?>';

         sMsg += '<messages xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" ';
         sMsg += 'xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#" ';
         sMsg += 'xmlns:a="http://knot.fit.vutbr.cz/annotations/AnnotXMLSchema" >';      
       
      for (var i = 0; i < aMsgParams.length; i++) {         
            switch(aMsgParams[i].msgtype) {
               case "session":
                  sMsg += _createMsgSession(aMsgParams[i]);
                  break;
               case "connect":
                  sMsg += _createMsgConnect(aMsgParams[i]);
                  break;
               case "disconnect":
                  sMsg += _createMsgDisconnect(aMsgParams[i]);   
                  break;
               case "login":
                  sMsg += _createMsgLogin(aMsgParams[i]); 
                  break;
               case "logout":
                  sMsg += _createMsgLogout(aMsgParams[i]); 
                  break;
               case "queryPersons":
                  sMsg += _createMsgQueryPersons(aMsgParams[i]); 
                  break;                  
               case "queryUserGroups":
                  sMsg += _createMsgQueryUserGroups(aMsgParams[i]); 
                  break;   
               case "joinGroup":
                  sMsg += _createMsgJoinGroup(aMsgParams[i]); 
                  break;                                     
               case "leaveGroup":
                  sMsg += _createMsgLeaveGroup(aMsgParams[i]); 
                  break;                     
               case "subscribe":                 
                  sMsg += _createMsgSubscribe(aMsgParams[i]); 
                  break; 
               case "unsubscribe":
                  sMsg += _createMsgUnsubscribe(aMsgParams[i]); 
                  break;                   
               case "synchronize":
                  sMsg += _createMsgSynchronize(aMsgParams[i]); 
                  break;                    
               case "resynchronize":
                  sMsg += _createMsgResynchronize(aMsgParams[i]); 
                  break;   
               case "textModification":
                  sMsg += _createMsgTextModification(aMsgParams[i]); 
                  break; 
               case "queryTypes":
                  sMsg += _createMsgQueryTypes(aMsgParams[i]); 
                  break;                                    
               case "types":
                  sMsg += _createMsgTypes(aMsgParams[i]);  
                  break;                                                               
               case "annotations":
                  sMsg += _createMsgAnnotations(aMsgParams[i]); 
                  break;                   
               case "reload":
                  sMsg += _createMsgReload(aMsgParams[i]); 
                  break;                                   
               case "suggestAnnotations":
                  sMsg += _createMsgSuggestAnnotations(aMsgParams[i]); 
                  break;  
               case "refusedSuggestions":
                  sMsg += _createMsgRefusedSuggestions(aMsgParams[i]); 
                  break;   
               case "settings":
                  sMsg += _createMsgSettings(aMsgParams[i]); 
                  break;                                                 
               case "queryEntities":
                  sMsg += _createMsgQueryEntities(aMsgParams[i]);
                  break;
               case "queryAttrFromOnto":
                  sMsg += _createMsgQueryAttrFromOnto(aMsgParams[i]);
                  break;                  
               default:
                  return null;
            }   
                      
      }            
      sMsg += '</messages>';
      return sMsg;
   } 
   


   // ------------------------------------------------ parseServerMsgFromString   
    /**
     * Parses server message from string.
     * 
     * @name parseServerMsgFromString
     * @memberOf AEd.comm.Protocol                 
     * @function
     * @public        
     * @param {String} xmlMsg String message.         
     */             
   t.parseServerMsgFromString = function(xmlMsg) {

      var xmldom = null;
      try {
         xmldom = AEd.XML.xmlParser(xmlMsg);
      } catch (ex) {
         throw new Error(AEd.I18n.t("Error_AEd_comm_Protocol_XML_Parsing_server_message_error") + " " + ex.message);
      }
      if (xmldom) {
         return t.parseServerMsgFromXml(xmldom);
      }
      else {
         return null;
      } 
   }
   
   
   
   
   // ---------------------------------------------------- parseServerMsgFromXml 
    /**
     * Parses server message from xml.
     * 
     * @name parseServerMsgFromXml
     * @memberOf AEd.comm.Protocol                 
     * @function
     * @public        
     * @param {String} xmlMsg XML message.         
     */            
   t.parseServerMsgFromXml = function(xmlMsg) {
      
      var aMessages = new Array();
  
      if (xmlMsg != null && xmlMsg.documentElement && xmlMsg.documentElement.tagName.toLowerCase() == 'messages'){

        for (var i=0; i<xmlMsg.documentElement.childNodes.length; i++) {
         switch(xmlMsg.documentElement.childNodes[i].tagName) {
            case "connected":
               var msgConnected = _parseServerMsgConnected(xmlMsg.documentElement.childNodes[i]);
               if (msgConnected) { aMessages.push(msgConnected); }
            break;
            case "disconnect":
               var msgDisconnect = _parseServerMsgDisconnect(xmlMsg.documentElement.childNodes[i]);
               if (msgDisconnect) { aMessages.push(msgDisconnect); }
            break;
            case "logged":
               var msgLogged = _parseServerMsgLogged(xmlMsg.documentElement.childNodes[i]);
               if (msgLogged) { aMessages.push(msgLogged); }
            break;
            case "persons":
               var msgPersons = _parseServerMsgPersons(xmlMsg.documentElement.childNodes[i]);
               if (msgPersons) { aMessages.push(msgPersons); }
            break;
            case "userGroups":
               var msgUserGroups = _parseServerMsgUserGroups(xmlMsg.documentElement.childNodes[i]);
               if (msgUserGroups) { aMessages.push(msgUserGroups); }
            break;
            case "resynchronize":
               var msgResynchronize = _parseServerMsgResynchronize(xmlMsg.documentElement.childNodes[i]);
               if (msgResynchronize) { aMessages.push(msgResynchronize); }
            break;
            case "synchronized":
               var msgSynchronized = _parseServerMsgSynchronized(xmlMsg.documentElement.childNodes[i]);
               if (msgSynchronized) { aMessages.push(msgSynchronized); }
            break;
            case "textModification":
               var msgTextModification = _parseServerMsgTextModification(xmlMsg.documentElement.childNodes[i]);
               if (msgTextModification) { aMessages.push(msgTextModification); }
            break;
            case "types":
               var msgTypes = _parseServerMsgTypes(xmlMsg.documentElement.childNodes[i]);
               if (msgTypes) { aMessages.push(msgTypes); }
            break;
            case "annotations":
               var msgAnnotations = _parseServerMsgAnnotations(xmlMsg.documentElement.childNodes[i]);
               if (msgAnnotations) { aMessages.push(msgAnnotations); }
            break;
            case "suggestions":
               var msgSuggestions = _parseServerMsgSuggestions(xmlMsg.documentElement.childNodes[i]);
               if (msgSuggestions) { aMessages.push(msgSuggestions); }
            break;
            case "settings":
               var msgSettings = _parseServerMsgSettings(xmlMsg.documentElement.childNodes[i]);
               if (msgSettings) { aMessages.push(msgSettings); }
            break;
            case "error":
               var msgError = _parseServerMsgError(xmlMsg.documentElement.childNodes[i]);
               if (msgError) { aMessages.push(msgError); }
            break;
            case "warning":
               var msgWarning = _parseServerMsgWarning(xmlMsg.documentElement.childNodes[i]);
               if (msgWarning) { aMessages.push(msgWarning); }
            break;
            case "ok":
               var msgOk = _parseServerMsgOk(xmlMsg.documentElement.childNodes[i]);
               if (msgOk) { aMessages.push(msgOk); }
            break;
            case "entities":
               var msgEntities = _parseServerMsgEntities(xmlMsg.documentElement.childNodes[i]);
               if (msgEntities) { aMessages.push(msgEntities); }
            break;
            case "attrsFromOntology":
               var msgAttrsFromOntology = _parseServerMsgAttrsFromOntology(xmlMsg.documentElement.childNodes[i]);
               if (msgAttrsFromOntology) { aMessages.push(msgAttrsFromOntology); }
            break;
            default:
            break;
         }
        }
      }

      return aMessages;
 
   }








    // *************************************************************************
    // Protocol PRIVATE methods
    // *************************************************************************
    
         
   // **************************************************************************
   // **************************************************************** MESSAGES 
   
   // ------------------------------------------------------- _createMsgSession           
   /** _createMsgSession
    * creates xml message string.
    * 
    * @name _createMsgSession
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param 
    *  oMsgParams = {
    *     msgtype : "session" (String),
    *     sId : "sId" (String)    
    *  }
    * @return {String} xml string : <session id="sessID" />
    *           
    */
   function _createMsgSession(oMsgParams) {
      return '<session id="' + oMsgParams.sId + '" />'; 
   }     
   
      
   // ------------------------------------------------------- _createMsgConnect           
   /** _createMsgConnect
    * creates xml message string.
    * 
    * @name _createMsgConnect
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param 
    *  oMsgParams = {
    *     msgtype : "connect" (String)
    *  }
    * @return {String} xml string : <connect protocolVersion="version" />
    *           
    */
   function _createMsgConnect(oMsgParams) {
      return '<connect protocolVersion="' + t.VERSION + '" />'; 
   }      
   
    
      
   // ---------------------------------------------------- _createMsgDisconnect           
   /** _createMsgDisconnect
    * creates xml message string.
    * 
    * @name _createMsgDisconnect
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param 
    *  oMsgParams = {
    *     msgtype : "disconnect" (String)
    *  }  
    * @return {String} xml string : <disconnect />
    *         
    */
   function _createMsgDisconnect(oMsgParams) {
      return '<disconnect />'; 
   }      



   // --------------------------------------------------------- _createMsgLogin              
   /** _createMsgLogin
    * creates xml message string.
    * 
    * @name _createMsgLogin
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "login" (String),
    *     user : "username" (String), 
    *     password : "pswd" (String)       
    *  }  
    * or
    *  oMsgParams = {
    *     msgtype : "login" (String),
    *     user : "username" (String), 
    *     token : "token" (String)
    *     system : "system" (String)
    *  } 
    * @return {String} xml string 
    *         
    */
   function _createMsgLogin(oMsgParams) {
      if (AEd.CONFIG.AED_AUTH_TYPE == 1) {
        return '<login user="' + oMsgParams.user + 
               '" token="' + oMsgParams.token + 
               '" system="' + oMsgParams.system + '" />';
      }
      return '<login user="' + oMsgParams.user + 
             '" password="' + oMsgParams.password + '" />';
   }   



   // -------------------------------------------------------- _createMsgLogout               
   /** _createMsgLogout
    * creates xml message string.
    * 
    * @name _createMsgLogout
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "logout" (String)
    *  }  
    * @return {String} xml string     
    */
   function _createMsgLogout(oMsgParams) {
      return '<logout />'; 
   }     
    
  
  
   // -------------------------------------------------- _createMsgQueryPersons               
   /** _createMsgQueryPersons
    * creates xml message string.
    * 
    * @name _createMsgQueryPersons
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "queryPersons" (String),
    *     filter : "filter" (String),
    *     withGroups : "true" or "false" (String)        
    *  }  
    * @return {String} xml string      
    */
   function _createMsgQueryPersons(oMsgParams) {
      return '<queryPersons ' + (oMsgParams.filter ? ('filter="' + oMsgParams.filter + '" ') : "" ) + 
             (oMsgParams.withGroups ? ('withGroups="' + oMsgParams.withGroups + '" ') : "") + '/>'; 
   }     
  
  
  
   // ----------------------------------------------- _createMsgQueryUserGroups               
   /** _createMsgQueryUserGroups
    * creates xml message string.
    * 
    * @name _createMsgQueryUserGroups
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "queryUserGroups" (String),
    *     filter : "filter" (String),
    *     withPersons : "true" or "false" (String)        
    *  }  
    * @return {String} xml string        
    */
   function _createMsgQueryUserGroups(oMsgParams) {
      return '<queryUserGroups ' + (oMsgParams.filter ? ('filter="' + oMsgParams.filter + '" ') : "" ) + 
             (oMsgParams.withPersons ? ('withPersons="' + oMsgParams.withPersons + '" ') : "") + '/>'; 
   }  
   
   
   
   // ----------------------------------------------------- _createMsgJoinGroup               
   /** _createMsgJoinGroup
    * creates xml message string.
    * 
    * @name _createMsgJoinGroup
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "joinGroup" (String),
    *     group : "URI" (String),     
    *  }  
    * @return {String} xml string       
    */
   function _createMsgJoinGroup(oMsgParams) {
      return '<join group="' + oMsgParams.group  + '" />'; 
   }     
   


   // ---------------------------------------------------- _createMsgLeaveGroup               
   /** _createMsgLeaveGroup
    * creates xml message string.
    * 
    * @name _createMsgLeaveGroup
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "leaveGroup" (String),
    *     group : "URI" (String),     
    *  }  
    * @return {String} xml string        
    */
   function _createMsgLeaveGroup(oMsgParams) {
      return '<leave group="' + oMsgParams.group  + '" />'; 
   }      
    
   
   
   // ----------------------------------------------------- _createMsgSubscribe               
   /** _createMsgSubscribe
    * creates xml message string.
    * 
    * @name _createMsgSubscribe
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "subscribe" (String),
    *     sources : (Array) of oSource     
    *  } 
    *  
    *  oSource = {
    *     type : "type" (String),
    *     user : "user" (String),
    *     uri : "URI" (String)        
    *  }        
    * @return {String} xml string         
    */
   function _createMsgSubscribe(oMsgParams) {
      var msg = '<subscribe>';
      if (oMsgParams.sources) {
         for (var i = 0; i < oMsgParams.sources.length; i++) {
             msg += '<source ';
             if (oMsgParams.sources[i].type) {
                msg += 'type="' + oMsgParams.sources[i].type + '" ';
             }
             if (oMsgParams.sources[i].user) {
                msg += 'user="' + oMsgParams.sources[i].user + '" ';
             }
             if (oMsgParams.sources[i].uri) {
                msg += 'uri="' + oMsgParams.sources[i].uri + '" ';
             }                          
             msg += '/>';
         }
      }
      msg += '</subscribe>';
      return msg;
   }     
   


   // --------------------------------------------------- _createMsgUnsubscribe               
   /** _createMsgUnsubscribe
    * creates xml message string.
    * 
    * @name _createMsgUnsubscribe
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "unsubscribe" (String),
    *     sources : (Array) of oSource     
    *  } 
    *  
    *  oSource = {
    *     type : "type" (String),
    *     user : "user" (String),
    *     uri : "URI" (String)        
    *  }        
    * @return {String} xml string       
    */
   function _createMsgUnsubscribe(oMsgParams) {
      var msg = '<unsubscribe>';
      if (oMsgParams.sources) {
         for (var i = 0; i < oMsgParams.sources.length; i++) {
             msg += '<source ';
             if (oMsgParams.sources[i].type) {
                msg += 'type="' + oMsgParams.sources[i].type + '" ';
             }
             if (oMsgParams.sources[i].user) {
                msg += 'user="' + oMsgParams.sources[i].user + '" ';
             }
             if (oMsgParams.sources[i].uri) {
                msg += 'uri="' + oMsgParams.sources[i].uri + '" ';
             }                          
             msg += '/>';
         }
      }
      msg += '</unsubscribe>';
      return msg;
   }  
   
      
   
   // --------------------------------------------------- _createMsgSynchronize               
   /** _createMsgSynchronize
    * creates xml message string.
    * 
    * @name _createMsgSynchronize
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "synchronize" (String),
    *     resource : "URI" (String),
    *     linearize : "true" or "false" (String),
    *     overwrite : "true" or "false" (String),
    *     content : "<hmtl><head>..." (String)                      
    *  } 
    * @return {String} xml string    
    *         
    */
   function _createMsgSynchronize(oMsgParams) {
      var msg = '<synchronize ';           
      if (oMsgParams.resource) {
          msg += 'resource="' + oMsgParams.resource + '" ';
      }         
      if (oMsgParams.linearize) {
          msg += 'linearize="' + oMsgParams.linearize + '" ';
      }  
      if (oMsgParams.overwrite) {
          msg += 'overwrite="' + oMsgParams.overwrite + '" ';
      }            
      msg += '><content><![CDATA[';
      msg += oMsgParams.content;
      msg += ']]></content>';
      msg += '</synchronize>';
      return msg;
   }  

   
   
   // ------------------------------------------------- _createMsgResynchronize               
   /** _createMsgResynchronize                    
    * creates xml message string.
    * 
    * @name _createMsgResynchronize
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "resynchronize" (String),
    *     content : "<hmtl><head>..." (String)                    
    *  } 
    * @return {String} xml string      
    *         
    */
   function _createMsgResynchronize(oMsgParams) {
      var msg = '<resynchronize> ';              
      msg += '<content><![CDATA[';
      msg += oMsgParams.content;
      msg += ']]></content>';
      msg += '</resynchronize>';
      return msg;
   }    
   
  
  
   // ---------------------------------------------- _createMsgTextModification               
   /** _createMsgTextModification                    
    * creates xml message string.
    * 
    * @name _createMsgTextModification
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "textModification" (String),
    *     path : "XPath" (String),
    *     offset : Number,
    *     length : Number,     
    *     content : "<hmtl><head>..." (String)                     
    *  } 
    * @return {String} xml string      
    *         
    */
   function _createMsgTextModification(oMsgParams) {
      var msg = '<textModification ';           
      if (oMsgParams.path) {
          msg += 'path="' + oMsgParams.path + '" ';
      }         
      if (oMsgParams.offset) {
          msg += 'offset="' + oMsgParams.offset + '" ';
      }  
      if (oMsgParams.length) {
          msg += 'length="' + oMsgParams.length + '" ';
      }            
      msg += '><![CDATA[';
      msg += oMsgParams.content;
      msg += ']]>';
      msg += '</textModification>';
      return msg;
   }    
   
   
   
   // ---------------------------------------------------- _createMsgQueryTypes              
   /** _createMsgQueryTypes
    * creates xml message string.
    * 
    * @name _createMsgQueryTypes
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "queryTypes" (String),
    *     filter : (String),     
    *  }  
    * @return {String} xml string        
    */
   function _createMsgQueryTypes(oMsgParams) {
      return '<queryTypes ' + (oMsgParams.filter ? ('filter="' + oMsgParams.filter + '" ') : "" ) + '/>'; 
   }      
   
   
   
   // --------------------------------------------------------- _createMsgTypes              
   /** _createMsgTypes
    * creates xml message string.
    * 
    * @name _createMsgTypes
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "types" (String),
    *     add : Array of oType,    
    *     change : Array of oType, 
    *     remove : Array of oType         
    *  }
    *  
    *   oType = {
    *      name : (String),
    *      ancestor : (String),
    *      uri : URI (String),
    *      group : (String),            
    *      attributes : Array of oAttribute      
    *   }  
    *   
    *   oAttribute {
    *      name : (String),
    *      type : (String),
    *      required : "true" or "false" (String), 
    *   }         
    * @return {String} xml string       
    */
   function _createMsgTypes(oMsgParams) {
      var msg = "";
      
      msg += '<types>';
      
      if (oMsgParams.add && typeof oMsgParams.add == "object") {         
         msg += '<add>';           
         for (var i = 0; i < oMsgParams.add.length; i++) {
            msg += '<type ';
            if (oMsgParams.add[i].name) {
               msg += 'name="';
               msg += oMsgParams.add[i].name;
               msg += '" ';
            } 
            if (oMsgParams.add[i].ancestor) {
               msg += 'ancestor="';
               msg += oMsgParams.add[i].ancestor;
               msg += '" ';
            } 
            if (oMsgParams.add[i].uri) {
               msg += 'uri="';
               msg += oMsgParams.add[i].uri;
               msg += '" ';
            } 
            if (oMsgParams.add[i].group) {
               msg += 'group="';
               msg += oMsgParams.add[i].group;
               msg += '" ';
            }   
            if (oMsgParams.add[i].attributes && typeof oMsgParams.add[i].attributes == "object") {
               msg += '>';  
               
               for (var j = 0; j < oMsgParams.add[i].attributes.length; j++) {
                  msg += '<attribute ';
                  if (oMsgParams.add[i].attributes[j].name) {
                     msg += 'name="';
                     msg += oMsgParams.add[i].attributes[j].name;
                     msg += '" ';
                  }  
                  if (oMsgParams.add[i].attributes[j].type) {
                     msg += 'type="';
                     msg += oMsgParams.add[i].attributes[j].type;
                     msg += '" ';
                  } 
                  if (oMsgParams.add[i].attributes[j].required) {
                     msg += 'required="';
                     msg += oMsgParams.add[i].attributes[j].required;
                     msg += '" ';
                  }
                  msg += '/>';                                                                       
               }                  
               msg += '</type>'; 
            }
            else {
               msg += '/>'; 
            }                                   
         }           
         msg += '</add>';
      }
     
      // change     
      if (oMsgParams.change && typeof oMsgParams.change == "object") {         
         msg += '<change>';           
         for (var i = 0; i < oMsgParams.change.length; i++) {
            msg += '<type ';
            if (oMsgParams.change[i].name) {
               msg += 'name="';
               msg += oMsgParams.change[i].name;
               msg += '" ';
            } 
            if (oMsgParams.change[i].ancestor) {
               msg += 'ancestor="';
               msg += oMsgParams.change[i].ancestor;
               msg += '" ';
            } 
            if (oMsgParams.change[i].uri) {
               msg += 'uri="';
               msg += oMsgParams.change[i].uri;
               msg += '" ';
            } 
            if (oMsgParams.change[i].group) {
               msg += 'group="';
               msg += oMsgParams.change[i].group;
               msg += '" ';
            }   
            if (oMsgParams.change[i].attributes && typeof oMsgParams.change[i].attributes == "object") {
               msg += '>';  
               
               for (var j = 0; j < oMsgParams.change[i].attributes.length; j++) {
                  msg += '<attribute ';
                  if (oMsgParams.change[i].attributes[j].name) {
                     msg += 'name="';
                     msg += oMsgParams.change[i].attributes[j].name;
                     msg += '" ';
                  }  
                  if (oMsgParams.change[i].attributes[j].type) {
                     msg += 'type="';
                     msg += oMsgParams.change[i].attributes[j].type;
                     msg += '" ';
                  } 
                  if (oMsgParams.change[i].attributes[j].required) {
                     msg += 'required="';
                     msg += oMsgParams.change[i].attributes[j].required;
                     msg += '" ';
                  }
                  msg += '/>';                                                                       
               }                  
               msg += '</type>'; 
            }
            else {
               msg += '/>'; 
            }                                   
         }           
         msg += '</change>';
      }   

      // remove     
      if (oMsgParams.remove && typeof oMsgParams.remove == "object") {         
         msg += '<remove>';           
         for (var i = 0; i < oMsgParams.remove.length; i++) {
            msg += '<type ';
            if (oMsgParams.remove[i].name) {
               msg += 'name="';
               msg += oMsgParams.remove[i].name;
               msg += '" ';
            } 
            if (oMsgParams.remove[i].ancestor) {
               msg += 'ancestor="';
               msg += oMsgParams.remove[i].ancestor;
               msg += '" ';
            } 
            if (oMsgParams.remove[i].uri) {
               msg += 'uri="';
               msg += oMsgParams.remove[i].uri;
               msg += '" ';
            } 
            if (oMsgParams.remove[i].group) {
               msg += 'group="';
               msg += oMsgParams.remove[i].group;
               msg += '" ';
            }   
            if (oMsgParams.remove[i].attributes && typeof oMsgParams.remove[i].attributes == "object") {
               msg += '>';  
               
               for (var j = 0; j < oMsgParams.remove[i].attributes.length; j++) {
                  msg += '<attribute ';
                  if (oMsgParams.remove[i].attributes[j].name) {
                     msg += 'name="';
                     msg += oMsgParams.remove[i].attributes[j].name;
                     msg += '" ';
                  }  
                  if (oMsgParams.remove[i].attributes[j].type) {
                     msg += 'type="';
                     msg += oMsgParams.remove[i].attributes[j].type;
                     msg += '" ';
                  } 
                  if (oMsgParams.remove[i].attributes[j].required) {
                     msg += 'required="';
                     msg += oMsgParams.remove[i].attributes[j].required;
                     msg += '" ';
                  }
                  msg += '/>';                                                                       
               }                  
               msg += '</type>'; 
            }
            else {
               msg += '/>'; 
            }                                   
         }           
         msg += '</remove>';
      }   
      
      msg += '</types>';  

      return msg; 
   }      
   
   
   
    
   // --------------------------------------------------- _createMsgAnnotations               
   /** _createMsgAnnotations
    * creates xml message string.
    * 
    * @name _createMsgAnnotations
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "annotations" (String),
    *     add : Array of oAnnotation,    
    *     change : Array of oAnnotation, 
    *     remove : Array of oAnnotation         
    *  }
    *   
    *  oAnnotation = {
    *     tmpId : ID of suggestion (String),
    *     confirmed : Type of suggestion confirmation (String), 
    *     type : "nestedAnnotation", 
    *     uri : (String),
    *     typeUri : (String),  
    *     dateTime : (Date),
    *     authorId : (String), 
    *     authorName : (String),
    *     authorAddress : (String),
    *     resourceUri : (String), 
    *     fragments : (Array),
    *     content : (String), 
    *     attributes : (Array)     
    *   } 
    * @return {String} xml string 
    *                      
    */
   function _createMsgAnnotations(oMsgParams) {
      var msg = "";
      
      msg += '<annotations>';

      if (oMsgParams.add && typeof oMsgParams.add == "object") {         
         msg += '<add>';           
         for (var i = 0; i < oMsgParams.add.length; i++) {
            msg += '<annotation';
            if (oMsgParams.add[i].tmpId) { // accept suggestion
                msg += ' tmpId="' + oMsgParams.add[i].tmpId + '"';
            }
            if (oMsgParams.add[i].confirmed) { // accept suggestion
                msg += ' confirmed="' + oMsgParams.add[i].confirmed + '"';
            }
            msg += '>';
            msg += _createAttrAnnotation(oMsgParams.add[i]);
            msg += '</annotation>';
         }       
         msg += '</add>';
      }
      if (oMsgParams.change && typeof oMsgParams.change == "object") {         
         msg += '<change>';           
         for (var i = 0; i < oMsgParams.change.length; i++) {
            msg += '<annotation>';
            msg += _createAttrAnnotation(oMsgParams.change[i]);
            msg += '</annotation>';
         }       
         msg += '</change>';
      }      
      if (oMsgParams.remove && typeof oMsgParams.remove == "object") {         
         msg += '<remove>';           
         for (var i = 0; i < oMsgParams.remove.length; i++) {
            msg += '<annotation>';
            msg += _createAttrAnnotation(oMsgParams.remove[i]);
            msg += '</annotation>';
         }       
         msg += '</remove>';
      }      
      msg += '</annotations>';  
      return msg;
   }  
       
       
   // --------------------------------------------------- _createAttrAnnotation               
   /** _createAttrAnnotation
    * creates xml message string.
    * 
    * @name _createAttrAnnotation
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oAnnotation = {
    *     type : "nestedAnnotation", 
    *     name : (String)    
    *     uri : (String),
    *     typeUri : (String),  
    *     dateTime : (Date),
    *     authorId : (String), 
    *     authorName : (String),
    *     authorAddress : (String),
    *     resourceUri : (String), 
    *     fragments : (Array) of oFragment,  
    *     content : (String), 
    *     attributes : (Array)                                              
    *  }  
    *  
    *  oFragment = {
    *     fragmentPath : XPath (String),  
    *     fragmentOffset : Number,
    *     fragmentLength : Number,
    *     fragmentText : (String),   
    *  }
    *            
    *  <a:attribute name="Name" type="String" rdf:value="Jaroslav Dytrych"/> 
    *  oAttribute {
    *     type: "String",
    *     name: String,
    *     value: String,           
    *  }
    *      
    *  <a:attribute name="Age" type="Integer" rdf:value="26"/>  
    *  oAttribute {
    *     type: "Integer",
    *     name: String,
    *     value: Number     \      
    *  }
    *
    *  <a:attribute name="TXT" type="Text" rdf:value="longer text">  
    *   <a:Content>
    *    <![CDATA[]]>
    *   </a:Content>
    *  </a:attribute>
    *  oAttribute {
    *     type: "Text",
    *     name: String,
    *     value: String     \      
    *
    *  }
    *
    *  <a:attribute name="Dinner" type="Time" rdf:value="11:30:00Z"/>
    *  oAttribute {
    *     type: "Time", "Date", "DateTime"
    *     name: String,
    *     value: String             
    *  }
    *
    *  <a:attribute name="Durr" type="Duration" rdf:value="P5Y2M4D"/>
    *  oAttribute {
    *     type: "Duration"
    *     name: String,
    *     value: String             
    *  }
    *      
    *  <a:attribute name="Enabled" type="Boolean" rdf:value="true"/>
    *  oAttribute {
    *     type: "Boolean",
    *     name: String,
    *     value: String             
    *  }    
    *  
    *  <a:attribute name="Src" type="Uri" rdf:value="http://www.google.com/"/>
    *  oAttribute {
    *     type: "Uri",
    *     name: String,
    *     value: String           
    *  }  
    *
    *  <a:attribute name="Img" type="Image" rdf:value="imageURI"/>
    *  oAttribute {
    *     type: "Image",
    *     name: String,
    *     value: String           
    *  } 
    *      
    *  <a:attribute name="File" type="Binary" rdf:value="base64string"/>
    *  oAttribute {
    *     type: "Binary",
    *     name: String,
    *     value: String             
    *  } 
    *
    *  <a:attribute name="Thing" type="Entity" rdf:value="base64string">
    *   <entity name="Name" uri="entityURI" type="entityType" visualRepresentation="entityImage">
    *    <![CDATA["entityDescription"]]>
    *   </entity>
    *  </a:attribute>
    *  oAttribute {
    *     type: "Entity",
    *     name: String,
    *     entityName: String,
    *     entityURI: String,
    *     entityType: String,
    *     entityImage: String,
    *     entityDescription: String,
    *     value: String             
    *  } 
    *        
    *  <a:attribute name="Home" type="GeoPoint">
    *     <geo:Point> <geo:lat>55.701</geo:lat> <geo:long>12.552</geo:long> </geo:Point>
    *  </a:attribute>
    *  oAttribute {
    *     type: "GeoPoint",
    *     name: String,
    *     lat: Number,  
    *     long: Number,             
    *  }   
    *  
    *  <a:attribute name="Interesting" type="annotationLink" uri="http://example.com/annotations/1"/>
    *  oAttribute {
    *     type: "annotationLink",
    *     name: String,
    *     value: String             
    *  }  
    *
    *  <a:attribute name="nested" type="nestedAnnotation" typeUri="http://example.com/types/type1"/>
    *  oAttribute {
    *     type: "nestedAnnotation",
    *     name: String,
    *     typeUri: String             
    *  }  
    *
    *  <a:attribute name="nested" type="nestedAnnotation">
    *  <annotation>.....</annotation>
    *  </a:attribute>
    *  oAttribute {
    *     type: "nestedAnnotation",
    *     name: String,
    *     list: Array           
    *  }  
    * @return {String} xml string                                                       
    *                      
    */
   function _createAttrAnnotation(oAnnotation) {

      var msg = '<rdf:Description ' + (oAnnotation.uri ? ('rdf:about="' + oAnnotation.uri + '" ') : ('')) + (oAnnotation.tmpId ? (' tmpId="' + oAnnotation.tmpId + '" ') : ('')) + '>' +             
                '<rdf:type ' + (oAnnotation.typeUri ? ('rdf:resource="' + oAnnotation.typeUri + '" ') : ('')) + '/>' +                  
                '<a:dateTime rdf:value="'  + oAnnotation.dateTime + '"/>' +                
                '<a:author id="' + oAnnotation.authorId + '" name="' + oAnnotation.authorName + '" address="' + oAnnotation.authorAddress + '" />' +                                    
                '<a:source rdf:resource="' + oAnnotation.resourceUri + '" />';
      
      if (oAnnotation.fragments) {          
          for (var i = 0; i < oAnnotation.fragments.length; i++) {
             msg += '<a:fragment>' + 
                       '<a:path>' + oAnnotation.fragments[i].fragmentPath + '</a:path>' +
                       '<a:offset>' + oAnnotation.fragments[i].fragmentOffset + '</a:offset>' +
                       '<a:length>' + oAnnotation.fragments[i].fragmentLength + '</a:length>' +
                       '<a:annotatedText>' + oAnnotation.fragments[i].fragmentText + '</a:annotatedText>' +             
                    '</a:fragment>';          
          }      
      }   
                            
      msg +=    '<a:content><![CDATA[' + (oAnnotation.content || "") + ']]></a:content>';                                                     
                // attributes
                if (oAnnotation.attributes) {
                   for (var i = 0; i < oAnnotation.attributes.length; i++) {
                      switch (oAnnotation.attributes[i].type) {
                         case "String":
                         case "Integer":
                         case "Time":
                         case "Date":
                         case "DateTime":  
                         case "Boolean":    
                         case "URI":
                         case "Image":
                         case "Duration":  
                         case "Binary":                                                                                                 
                            msg += '<a:attribute name="' + oAnnotation.attributes[i].name + '" type="' + oAnnotation.attributes[i].type + '" rdf:value="' + oAnnotation.attributes[i].value + '" />';
                         break;
                         case "Text":
                            msg += '<a:attribute name="' + oAnnotation.attributes[i].name + '" type="' + oAnnotation.attributes[i].type + '">';
                            msg += '<a:Content>';
                            msg += '<![CDATA[' + oAnnotation.attributes[i].value + ']]>';
                            msg += '</a:Content>';
                            msg += '</a:attribute>';
                         break;
                         case "annotationLink":
                            var regExp = /^http\:\/\//;
                                for (var j in oAnnotation.attributes[i].list) {
                                    if (oAnnotation.attributes[i].list[j].annotationLink == null) {
                                      msg += '<a:attribute name="' + oAnnotation.attributes[i].name + '" type="' + oAnnotation.attributes[i].type + '"/>';
                                    } else if (oAnnotation.attributes[i].list[j].annotationLink.match(regExp)) { // is annotationLink                                                                                               
                                        msg += '<a:attribute name="' + oAnnotation.attributes[i].name + '" type="' + oAnnotation.attributes[i].type + '" uri="' + oAnnotation.attributes[i].list[j].annotationLink + '" />';
                                    }
                                    else { // is tmpId
                                        msg += '<a:attribute name="' + oAnnotation.attributes[i].name + '" type="' + oAnnotation.attributes[i].type + '" tmpId="' + oAnnotation.attributes[i].list[j].annotationLink + '" />';
                                    }
                                }
                         break;                         
                         case "GeoPoint":
                            msg += '<a:attribute name="' + oAnnotation.attributes[i].name + '" type="' + oAnnotation.attributes[i].type + '">';
                            if (oAnnotation.attributes[i].lat && oAnnotation.attributes[i].long) {
                                msg += '<geo:Point> <geo:lat>' + oAnnotation.attributes[i].lat + '</geo:lat> <geo:long>' + oAnnotation.attributes[i].long + '</geo:long> </geo:Point>';
                            }
                            msg += '</a:attribute>'; 
                         break;                                          
                         case "Entity":
                            var attr = oAnnotation.attributes[i];
                            msg += '<a:attribute type="entity"\n';
                            msg += '             name="' + attr.name + '">\n';
                            msg += '    <entity name="' + attr.entityName + '"\n';
                            if(attr.entityURI != "undefined")
                                msg += '         uri="' + attr.entityURI + '"\n';
                            if(attr.entityType != "undefined")
                                msg += '         type="' + attr.entityType + '"\n';
                            if(attr.entityImage != "undefined")
                                msg += '         visualRepresentation="' + attr.entityImage + '"';
                            msg += '>\n';
                            if(attr.entityDescription != "undefined")
                                msg += '     <![CDATA[' + attr.entityDescription + ']]>\n';
                            msg += '    </entity>\n';
                            msg += '</a:attribute>\n';
                         break;
                         case "nestedAnnotation":
                            for (var j in oAnnotation.attributes[i].list) {
                                if (oAnnotation.attributes[i].list[j].noAnnotation) {
                                    msg += '<a:attribute name="' + oAnnotation.attributes[i].name + '" type="' + oAnnotation.attributes[i].typeUri + '" />';
                                }
                                else {
                                    msg += '<a:attribute name="' + oAnnotation.attributes[i].name + '" type="' + oAnnotation.attributes[i].type + '">'; 
                                    msg += _createAttrAnnotation(oAnnotation.attributes[i].list[j]);
                                    msg += '</a:attribute>';
                                }
                            }
                         break;
                         
                         default:
                         break;
                      }
                   }
                }
                // attributes
         msg += '</rdf:Description>';
    
      return msg;
   }      
    
    
    
    
       
       
       
       
       
   // -------------------------------------------------------- _createMsgReload              
   /** _createMsgReload
    * creates xml message string.
    * 
    * @name _createMsgReload 
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "reload" (String),
    *     uri : "URI" (String),
    *     all : "true" (String),                   
    *  } 
    * @return {String} xml string      
    *         
    */
   function _createMsgReload(oMsgParams) {
      var msg = '<reload ';           
      if (oMsgParams.uri) {
          msg += 'uri="' + oMsgParams.uri + '" ';
      }         
      if (oMsgParams.all) {
          msg += 'all="' + oMsgParams.all + '" ';
      }  
      msg += '/>';
      return msg;
   }  
   
   
         
   // -------------------------------------------- _createMsgSuggestAnnotations               
   /** _createMsgSuggestAnnotations                    
    * 
    * creates xml message string.
    * 
    * @name _createMsgReload 
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "suggestAnnotations" (String),
    *     add : Array of oAnnotation,    
    *     refuse : Array of oAnnotation         
    *  }        
    *  oMsgParams = {
    *     msgtype : "suggestAnnotations" (String),
    *     path : "XPath" (String),
    *     offset : Number,
    *     length : Number,     
    *     type : (String),    
    *     tmpId : (String),
    *     method : (String)                 
    *  } 
    * @return {String} xml string    
    *         
    */
   function _createMsgSuggestAnnotations(oMsgParams) {
      var msg = "";
      for (var i in oMsgParams.add) {
        if (oMsgParams.add[i].fragments.length > 0) {
            for (var j = 0; j < oMsgParams.add[i].fragments.length; j++) {
                msg += '<suggestAnnotations ';    
                if (oMsgParams.add[i].fragments[j].fragmentPath) {
                    msg += 'path="' + oMsgParams.add[i].fragments[j].fragmentPath + '" ';
                }         
                if (oMsgParams.add[i].fragments[j].fragmentOffset || oMsgParams.add[i].fragments[j].fragmentOffset == 0) {
                    msg += 'offset="' + oMsgParams.add[i].fragments[j].fragmentOffset + '" ';
                }  
                if (oMsgParams.add[i].fragments[j].fragmentLength) {
                    msg += 'length="' + oMsgParams.add[i].fragments[j].fragmentLength + '" ';
                }
                if (oMsgParams.add[i].type) {
                    msg += 'type="' + oMsgParams.add[i].type + '" ';
                }      
                msg += '/>';
            } 
        }
        else {
            msg += '<suggestAnnotations ';
            if (oMsgParams.add[i].type) {
                msg += 'type="' + oMsgParams.add[i].type + '" ';
            }      
            msg += '/>';    
        }
      }
      if (oMsgParams.refuse && oMsgParams.refuse.length > 0) {
         msg += '<refusedSuggestions>';
         for (var i in oMsgParams.refuse) {
            msg += '<suggestion ';
            if (oMsgParams.refuse[i].tmpId) {
                msg += 'tmpId="' + oMsgParams.refuse[i].tmpId + '" ';
            }
            if (oMsgParams.refuse[i].method) {
                msg += 'method="' + oMsgParams.refuse[i].method + '" ';
            }
            msg += '/>';      
         }
         msg += '</refusedSuggestions>';
      }
      
    return msg;
   }         
   
   
   
   // -------------------------------------------- _createMsgRefusedSuggestions               
   /** _createMsgRefusedSuggestions                    
    * creates xml message string.
    * 
    * @name _createMsgRefusedSuggestions 
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "refusedSuggestions" (String),    
    *     suggestions : (Array) od oSuggestion                  
    *  } 
    *  
    *  oSuggestion {
    *     tmpId : (String),
    *     method : "manually" or "automatically" (String)    
    *  }          
    * @return {String} xml string         
    */
   function _createMsgRefusedSuggestions(oMsgParams) {
      var msg = '<refusedSuggestions>';           
            
      if (oMsgParams.suggestions && typeof oMsgParams.suggestions == "object") {
         for (var i = 0; i < oMsgParams.suggestions.length; i++) {
            msg += '<suggestion ';
            if (oMsgParams.suggestions[i].tmpId) {
               msg += 'tmpId="' + oMsgParams.suggestions[i].tmpId + '" ';
            }
            if (oMsgParams.suggestions[i].method) {
               msg += 'method="' + oMsgParams.suggestions[i].method + '" ';
            }            
            msg += '/>';
         }
      }                 
      msg += '</refusedSuggestions>';
      return msg;
   }             
   
   
   
   // ------------------------------------------------------ _createMsgSettings               
   /** _createMsgSettings                    
    * creates xml message string.
    * 
    * @name _createMsgSettings 
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "settings" (String),    
    *     params : (Array) od oParam                  
    *  } 
    *  
    *  oParam {
    *     name : (String),
    *     value : (String)  
    *  }          
    * @return {String} xml string       
    */
   function _createMsgSettings(oMsgParams) {
      var msg = '<settings>';           
            
      if (oMsgParams.params && typeof oMsgParams.params == "object") {
         for (var i = 0; i < oMsgParams.params.length; i++) {
            msg += '<param ';
            msg += 'name="' + oMsgParams.params[i].name + '" ';
            msg += 'value="' + oMsgParams.params[i].value + '" ';            
            msg += '/>';
         }
      }                 
      msg += '</settings>';
      return msg;
   }  
   
   // ------------------------------------------------------ _createMsgQueryEntities               
   /** _createMsgQueryEntities                    
    * creates xml message string.
    * 
    * @name _createMsgQueryEntities 
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "queryEntities" (String),    
    *     filter : (String)                  
    *  } 
    * @return {String} xml string   
    */
   function _createMsgQueryEntities(oMsgParams)
   {
       return '<queryEntities filter="' + oMsgParams.filter + '"/>';
   }

   // ------------------------------------------------------ _createMsgQueryAttrFromOnto               
   /** _createMsgQueryAttrFromOnto                    
    * creates xml message string.
    * 
    * @name _createMsgQueryAttrFromOnto
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param
    *  oMsgParams = {
    *     msgtype : "queryAttrFromOnto" (String),    
    *     userGroup : (String)                  
    *  } 
    * @return {String} xml string   
    */
   function _createMsgQueryAttrFromOnto(oMsgParams)
   {
       return '<queryAttrFromOnto group="' + oMsgParams.userGroup + '"/>';
   }
            
   // **************************************************************** MESSAGES     
   //***************************************************************************
   
          

          
   // ****************************************************************** SERVER     
   //***************************************************************************
   
 
 
   // ------------------------------------------------ _parseServerMsgConnected 
   /** _parseServerMsgConnected                    
    * parses xml message string.
    * 
    * @name _parseServerMsgConnected
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return
    *  oObject {
    *     msgtype : "connected",
    *     protocolVersion : (String),
    *     sessionID : (String),     
    *  }          
    *         
    */        
   function _parseServerMsgConnected(xmlTag) {    
      var oObject  = null;
      oObject = {};
      oObject.msgtype = 'connected';
      oObject.protocolVersion = xmlTag.getAttribute('protocolVersion');
      oObject.sessionID = xmlTag.getAttribute('sessionID');
      return oObject;      
   }  

   // ----------------------------------------------- _parseServerMsgDisconnect
   /** _parseServerMsgDisconnect                    
    * parses xml message string.
    * 
    * @name _parseServerMsgDisconnect
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return
    *  oObject {
    *     msgtype : "disconnect"   
    *  }          
    *         
    */        
   function _parseServerMsgDisconnect(xmlTag) {
      var oObject  = null;
      oObject = {};
      oObject.msgtype = 'disconnect';
      return oObject;             

   }  
   
   // --------------------------------------------------- _parseServerMsgLogged
   /** _parseServerMsgLogged                    
    * parses xml message string.
    * 
    * @name _parseServerMsgLogged
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return 
    *  oObject {
    *     msgtype : "logged"   
    *     id : (String),
    *     name : (String),           
    *  }          
    *         
    */        
   function _parseServerMsgLogged(xmlTag) { 
      var oObject  = null;
      oObject = {};
      oObject.msgtype = 'logged';
      oObject.id = xmlTag.getAttribute('id');
      oObject.name = xmlTag.getAttribute('name');           
      return oObject;
   }  

   // -------------------------------------------------- _parseServerMsgPersons
   /** _parseServerMsgPersons                    
    * parses xml message string.
    * 
    * @name _parseServerMsgPersons
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return 
    *  oObject {
    *     msgtype : "persons",   
    *     persons : Array of oPerson,
    *  }
    *  
    *  oPerson {    
    *     id : (String),
    *     login : (String),    
    *     name : (String),  
    *     email : (String),      
    *     photoURI : (String),   
    *     groups: Array of oGroup              
    *  }
    *  
    *  oGroup {     
    *     name : (String),    
    *     uri : (String),       
    *  }
    *                           
    */        
   function _parseServerMsgPersons(xmlTag) {

      var oObject  = null;
      var oPerson  = null;
      var oGroup   = null;
      
      oObject = {};
      oObject.msgtype = 'persons';
      oObject.persons = new Array();
            
      var aXmlPerson = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "person");      
      for (var j = 0; j < aXmlPerson.length; j++) {
         oPerson = {};
         oPerson.id = aXmlPerson[j].getAttribute('id');
         oPerson.login = aXmlPerson[j].getAttribute('login');
         oPerson.name = aXmlPerson[j].getAttribute('name');
         oPerson.email = aXmlPerson[j].getAttribute('email');
         oPerson.photoURI = aXmlPerson[j].getAttribute('photoURI');
         oPerson.groups = new Array();
         var aXmlUserGroup = AEd.XML.getFirstLevelElementsByTagName(aXmlPerson[j], "userGroups");        
         for (var k = 0; k < aXmlUserGroup.length; k++) {
            var aXmlGroup = AEd.XML.getFirstLevelElementsByTagName(aXmlUserGroup[k], "group");       
            for (var l = 0; l < aXmlGroup.length; l++) {
               oGroup = {};
               oGroup.name = aXmlGroup[l].getAttribute('name');
               oGroup.uri = aXmlGroup[l].getAttribute('uri');
               oPerson.groups.push(oGroup);
            }
         }
         oObject.persons.push(oPerson);
      }        
      return oObject;             

   }  

   // ----------------------------------------------- _parseServerMsgUserGroups
   /** _parseServerMsgUserGroups                    
    * parses xml message string.
    * 
    * @name _parseServerMsgUserGroups
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return 
    *  oObject {
    *     msgtype : "userGroups",   
    *     groups : Array of oGroup,
    *  }
    *      
    *  oGroup {     
    *     name : (String),    
    *     uri : (String),
    *     persons: Array of oPerson           
    *  }  
    *  
    *  oPerson {    
    *     id : (String),
    *     login : (String),    
    *     name : (String),  
    *     email : (String),      
    *     photoURI : (String),               
    *  }
    *                    
    *         
    */        
   function _parseServerMsgUserGroups(xmlTag) {

      var oObject  = null;
      var oGroup   = null;
      var oPerson  = null;
      
      oObject = {};
      oObject.msgtype = 'userGroups';
      oObject.groups = new Array();
            
      var aXmlGroup = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "group");
      for (var j = 0; j < aXmlGroup.length; j++) {
         oGroup = {};
         oGroup.name = aXmlGroup[j].getAttribute('name');
         oGroup.uri = aXmlGroup[j].getAttribute('uri');
         oGroup.persons = new Array();          
         var aXmlPersons = AEd.XML.getFirstLevelElementsByTagName(aXmlGroup[j], "persons");   
         for (var k = 0; k < aXmlPersons.length; k++) {          
            var aXmlPerson = AEd.XML.getFirstLevelElementsByTagName(aXmlPersons[k], "person");     
            for (var l = 0; l < aXmlPerson.length; l++) {
               oPerson = {};
               oPerson.id = aXmlPerson[l].getAttribute('id');
               oPerson.login = aXmlPerson[l].getAttribute('login');
               oPerson.name = aXmlPerson[l].getAttribute('name');
               oPerson.email = aXmlPerson[l].getAttribute('email');
               oPerson.photoURI = aXmlPerson[l].getAttribute('photoURI');                     
               oGroup.persons.push(oPerson);
            }
         }
         oObject.groups.push(oGroup);
      }        
      return oObject;      
   } 

   // -------------------------------------------- _parseServerMsgResynchronize
   /** _parseServerMsgResynchronize                    
    * parses xml message string.
    * 
    * @name _parseServerMsgResynchronize 
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return 
    *  oObject {
    *     msgtype : "resynchronize"            
    *  }          
    *         
    */        
   function _parseServerMsgResynchronize(xmlTag) {
      var oObject  = null;
      oObject = {};
      oObject.msgtype = 'resynchronize';
      return oObject;   
   } 


   // --------------------------------------------- _parseServerMsgSynchronized
   /** _parseServerMsgSynchronized                    
    * parses xml message string.
    * 
    * @name _parseServerMsgSynchronized 
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return 
    *  oObject {
    *     msgtype : "synchronized"   
    *     resource : (String),          
    *  }          
    *         
    */        
   function _parseServerMsgSynchronized(xmlTag) {
      var oObject  = null;
      oObject = {};
      oObject.msgtype = 'synchronized';
      oObject.resource = xmlTag.getAttribute('resource');
      return oObject;   
   }  

   // ----------------------------------------- _parseServerMsgTextModification
   /** _parseServerMsgTextModification                    
    * parses xml message string.
    * 
    * @name _parseServerMsgTextModification 
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return 
    *  oObject {
    *     msgtype : "textModification"   
    *     path : XPath(String),   
    *     offset : (Number),                
    *     length : (Number), 
    *     content : (String), 
    *  }          
    *         
    */        
   function _parseServerMsgTextModification(xmlTag) {    
      var oObject  = null;               
      oObject = {};
      oObject.msgtype = 'textModification';
      oObject.path = xmlTag.getAttribute('path');
      oObject.offset = xmlTag.getAttribute('offset');
      oObject.length = xmlTag.getAttribute('length');
      oObject.content = xmlTag.textContent || xmlTag.text;
      return oObject;                    
   }  

    // --------------------------------------------------- _parseServerMsgTypes
   /** _parseServerMsgTypes                    
    * parses xml message string.
    * 
    * @name _parseServerMsgTypes  
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return 
    *  oObject {
    *     msgtype : "types",
    *     add : Array of oType,
    *     change : Array of oType,           
          remove : Array of oType
    *  }
    *  
    *  oType {
    *     name : (String),   
    *     ancestor : (String),                
    *     uri : (String), 
    *     group : (String), 
    *     attributes: Array of oAttribute     
    *  }  
    *  
    *  oAttribute {
    *     name : (String),   
    *     type : (String),                
    *     required : (String)
    *  }                         
    *         
    */        
   function _parseServerMsgTypes(xmlTag) {

      var oObject  = null;
      var oType = null;
 
      oObject = {};
      oObject.msgtype = 'types';
      oObject.add = new Array();
      oObject.change = new Array();
      oObject.remove = new Array();
      
      var aXmlAdds = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "add"); 
      var aXmlChanges = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "change");
      var aXmlRemoves = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "remove");
            
      for (var iAdds = 0; iAdds < aXmlAdds.length; iAdds++) {
         var aXmlAddTypes = AEd.XML.getFirstLevelElementsByTagName(aXmlAdds[iAdds], "type");
         for (var iAddTypes = 0; iAddTypes < aXmlAddTypes.length; iAddTypes++) {
            oType = {};
            oType.name = aXmlAddTypes[iAddTypes].getAttribute('name');
            oType.ancestor = aXmlAddTypes[iAddTypes].getAttribute('ancestor');
            oType.uri = aXmlAddTypes[iAddTypes].getAttribute('uri');
            oType.group = aXmlAddTypes[iAddTypes].getAttribute('group');
            oType.attributes = new Array();
            
            var aAttributes = AEd.XML.getFirstLevelElementsByTagName(aXmlAddTypes[iAddTypes], "a:attribute");
            for (var iAttr = 0; iAttr < aAttributes.length; iAttr++) {
               var oAttr = {};
               oAttr.name = aAttributes[iAttr].getAttribute('name');
               oAttr.type = aAttributes[iAttr].getAttribute('type');
               oAttr.required = aAttributes[iAttr].getAttribute('required');
               oType.attributes.push(oAttr);
            }
            oObject.add.push(oType);
         }
      }
      for (var iChanges = 0; iChanges < aXmlChanges.length; iChanges++) {
         var aXmlChangeTypes = AEd.XML.getFirstLevelElementsByTagName(aXmlChanges[iChanges], "type");
         for (var iChangeTypes = 0; iChangeTypes < aXmlChangeTypes.length; iChangeTypes++) {
            oType = {};
            oType.name = aXmlChangeTypes[iChangeTypes].getAttribute('name');
            oType.ancestor = aXmlChangeTypes[iChangeTypes].getAttribute('ancestor');
            oType.uri = aXmlChangeTypes[iChangeTypes].getAttribute('uri');
            oType.group = aXmlChangeTypes[iChangeTypes].getAttribute('group');
            oType.attributes = new Array();
            
            var aAttributes = AEd.XML.getFirstLevelElementsByTagName(aXmlChangeTypes[iChangeTypes], "a:attribute");
            for (var iAttr = 0; iAttr < aAttributes.length; iAttr++) {
               var oAttr = {};
               oAttr.name = aAttributes[iAttr].getAttribute('name');
               oAttr.type = aAttributes[iAttr].getAttribute('type');
               oAttr.required = aAttributes[iAttr].getAttribute('required');
               oType.attributes.push(oAttr);
            }
            oObject.change.push(oType);
         }
      }      
      for (var iRemoves = 0; iRemoves < aXmlRemoves.length; iRemoves++) {
         var aXmlRemoveTypes = AEd.XML.getFirstLevelElementsByTagName(aXmlRemoves[iRemoves], "type");
         for (var iRemoveTypes = 0; iRemoveTypes < aXmlRemoveTypes.length; iRemoveTypes++) {
            oType = {};
            oType.name = aXmlRemoveTypes[iRemoveTypes].getAttribute('name');
            oType.ancestor = aXmlRemoveTypes[iRemoveTypes].getAttribute('ancestor');
            oType.uri = aXmlRemoveTypes[iRemoveTypes].getAttribute('uri');
            oType.group = aXmlRemoveTypes[iRemoveTypes].getAttribute('group');
            oType.attributes = new Array();
            
            var aAttributes = AEd.XML.getFirstLevelElementsByTagName(aXmlRemoveTypes[iRemoveTypes], "a:attribute");
            for (var iAttr = 0; iAttr < aAttributes.length; iAttr++) {
               var oAttr = {};
               oAttr.name = aAttributes[iAttr].getAttribute('name');
               oAttr.type = aAttributes[iAttr].getAttribute('type');
               oAttr.required = aAttributes[iAttr].getAttribute('required');
               oType.attributes.push(oAttr);
            }
            oObject.remove.push(oType);
         }
      }        
      
      return oObject;                  

   } 

    // --------------------------------------------- _parseServerMsgAnnotations
   /** _parseServerMsgAnnotations                    
    * parses xml message string.
    * 
    * @name _parseServerMsgAnnotations   
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return 
    *  oObject {
    *     msgtype : "annotations",
    *     add : Array of oAnnotation,
    *     change : Array of oAnnotation,           
    *     remove : Array of oAnnotation
    *  }
    *  
    *  oAnnotation = {
    *     msgtype : "annotation", 
    *     
    *     name : (String)  // for nested Annotations 
    *     
    *     uri : (String),
    *     typeUri : (String),  
    *     dateTime : (Date),
    *     authorId : (String), 
    *     authorName : (String),
    *     authorAddress : (String),
    *     resourceUri : (String), 
    *     fragments : (Array),
    *     content : (String), 
    *     attributes : (Array)                                              
    *  }   
    *  
    *  oFragment = {
    *     fragmentPath : XPath (String),  
    *     fragmentOffset : Number,
    *     fragmentLength : Number,
    *     fragmentText : (String), 
    *  }   
    *                     
    *         
    */        
   function _parseServerMsgAnnotations(xmlTag) {

      var oObject  = null;
      var oAnnotation = null;
 
      oObject = {};
      oObject.msgtype = 'annotations';
      oObject.add = new Array();
      oObject.change = new Array();
      oObject.remove = new Array();
      
      var aXmlAdds = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "add"); 
      var aXmlChanges = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "change");
      var aXmlRemoves = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "remove");
            
      for (var iAdds = 0; iAdds < aXmlAdds.length; iAdds++) {
         var aXmlAddAnnotations = AEd.XML.getFirstLevelElementsByTagName(aXmlAdds[iAdds], "annotation");
         
         for (var iAddAnno = 0; iAddAnno < aXmlAddAnnotations.length; iAddAnno++) {               
            oAnnotation = _parseServerMsgAnnotation(aXmlAddAnnotations[iAddAnno]);           
            oObject.add.push(oAnnotation);
         }
      }
      
      for (var iChanges = 0; iChanges < aXmlChanges.length; iChanges++) {
         var aXmlChangeAnnotations = AEd.XML.getFirstLevelElementsByTagName(aXmlChanges[iChanges], "annotation");
         
         for (var iChangeAnno = 0; iChangeAnno < aXmlChangeAnnotations.length; iChangeAnno++) {               
            oAnnotation = _parseServerMsgAnnotation(aXmlChangeAnnotations[iChangeAnno]);           
            oObject.change.push(oAnnotation);
         }
      } 
           
      for (var iRemoves = 0; iRemoves < aXmlRemoves.length; iRemoves++) {
         var aXmlRemoveAnnotations = AEd.XML.getFirstLevelElementsByTagName(aXmlRemoves[iRemoves], "annotation");
         
         for (var iRemoveAnno = 0; iRemoveAnno < aXmlRemoveAnnotations.length; iRemoveAnno++) {               
            oAnnotation = _parseServerMsgAnnotation(aXmlRemoveAnnotations[iRemoveAnno]);           
            oObject.remove.push(oAnnotation);
         }
      }  
          
      return oObject;                  

   } 

    // ---------------------------------------------- _parseServerMsgAnnotation
   /** _parseServerMsgAnnotation                    
    * parses xml message string.
    * 
    * @name _parseServerMsgAnnotation   
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return
    *  oAnnotation = {
    *     msgtype : "annotation", 
    *     
    *     name : (String)  // for nested Annotations 
    *     
    *     uri : (String),
    *     typeUri : (String),  
    *     dateTime : (Date),
    *     authorId : (String), 
    *     authorName : (String),
    *     authorAddress : (String),
    *     resourceUri : (String), 
    *     fragments : (Array),
    *     content : (String), 
    *     attributes : (Array)                                              
    *  }   
    *  
    *  oFragment = {
    *     fragmentPath : XPath (String),  
    *     fragmentOffset : Number,
    *     fragmentLength : Number,
    *     fragmentText : (String), 
    *  }                        
    *         
    */        
   function _parseServerMsgAnnotation(xmlTag) {

      var oAnnotation = {};
      
      oAnnotation.msgtype = 'annotation';
      
      var aUri = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "rdf:Description");
      if (aUri && aUri.length > 0) { 
        oAnnotation.uri = aUri[0].getAttribute('rdf:about');
        if (aUri[0].getAttribute('tmpId')) { // suggestedAnnotation
            oAnnotation.tmpId = aUri[0].getAttribute('tmpId');
        }
      }
      
      var aTypeUri = AEd.XML.getFirstLevelElementsByTagName(aUri[0], "rdf:type");
      if (aTypeUri && aTypeUri.length > 0) { oAnnotation.typeUri = aTypeUri[0].getAttribute('rdf:resource'); }
      
      var aDateTime = AEd.XML.getFirstLevelElementsByTagName(aUri[0], "a:dateTime");
      if (aDateTime && aDateTime.length > 0) { oAnnotation.dateTime = aDateTime[0].getAttribute('rdf:value'); }       
     
      var aAuthor = AEd.XML.getFirstLevelElementsByTagName(aUri[0], "a:author");
      if (aAuthor && aAuthor.length > 0) { oAnnotation.authorId = aAuthor[0].getAttribute('id'); 
                                oAnnotation.authorName = aAuthor[0].getAttribute('name'); 
                                oAnnotation.authorAddress = aAuthor[0].getAttribute('address'); 
                              }          
      
      var aResourceUri = AEd.XML.getFirstLevelElementsByTagName(aUri[0], "a:source");
      if (aResourceUri && aResourceUri.length > 0) { oAnnotation.resourceUri = aResourceUri[0].getAttribute('rdf:resource'); }        


      var aFragment = AEd.XML.getFirstLevelElementsByTagName(aUri[0], "a:fragment");
      oAnnotation.badFragment = "";
      oAnnotation.badAnnotation = true;
      if (aFragment && aFragment.length > 0) {
         oAnnotation.fragments = new Array();
         for (var iFr = 0; iFr < aFragment.length; iFr++) {
            
             // bad fragments
             if (aFragment[iFr].getAttribute('valid') == "false") {
                var tmpFragmentText = null;
                if (oAnnotation.badFragment == "") {
                    oAnnotation.badFragment += AEd.I18n.t("Fragment_bad_fragment") + ": ";    
                }
                else {
                    oAnnotation.badFragment += " ";
                }
                var aFragmentText = AEd.XML.getFirstLevelElementsByTagName(aFragment[iFr], "a:annotatedText");
                if (aFragmentText && aFragmentText.length > 0) { tmpFragmentText = aFragmentText[0].textContent || aFragmentText[0].text; }
                oAnnotation.badFragment += tmpFragmentText;
                continue;
             }
             oAnnotation.badAnnotation = false;
            
             var tmpFragmentPath = null;
             var aFragmentPath = AEd.XML.getFirstLevelElementsByTagName(aFragment[iFr], "a:path");
             if (aFragmentPath && aFragmentPath.length > 0) { tmpFragmentPath = aFragmentPath[0].textContent || aFragmentPath[0].text; }
             
             var tmpFragmentOffset = null;
             var aFragmentOffset = AEd.XML.getFirstLevelElementsByTagName(aFragment[iFr], "a:offset");
             if (aFragmentOffset && aFragmentOffset.length > 0) { tmpFragmentOffset = aFragmentOffset[0].textContent || aFragmentOffset[0].text; }
            
             var tmpFragmentLength = null;
             var aFragmentLength = AEd.XML.getFirstLevelElementsByTagName(aFragment[iFr], "a:length");
             if (aFragmentLength && aFragmentLength.length > 0) { tmpFragmentLength = aFragmentLength[0].textContent || aFragmentLength[0].text; }
             
             var tmpFragmentText = null;
             var aFragmentText = AEd.XML.getFirstLevelElementsByTagName(aFragment[iFr], "a:annotatedText");
             if (aFragmentText && aFragmentText.length > 0) { tmpFragmentText = aFragmentText[0].textContent || aFragmentText[0].text; }
             
             oAnnotation.fragments.push({fragmentPath: tmpFragmentPath, fragmentOffset: tmpFragmentOffset, fragmentLength: tmpFragmentLength, fragmentText: tmpFragmentText});                      
         }                            
      }     

      var aContent = AEd.XML.getFirstLevelElementsByTagName(aUri[0], "a:content");
      if (aContent && aContent.length > 0) { oAnnotation.content = aContent[0].textContent || aContent[0].text; }

      var aAttributes = AEd.XML.getFirstLevelElementsByTagName(aUri[0], "a:attribute");
      oAnnotation.attributes = new Array();

      if (aAttributes) {
        for (var i = 0; i < aAttributes.length; i++) {
           var oAttr = {};
           switch(aAttributes[i].getAttribute('type'))  {
              case "String":
              case "Integer":
              case "Time":
              case "Date":
              case "DateTime":  
              case "Boolean":    
              case "URI":
              case "Duration":
              case "Binary":
              case "Image":    
                 oAttr.type = aAttributes[i].getAttribute('type');
                 oAttr.name = aAttributes[i].getAttribute('name');
                 oAttr.value = aAttributes[i].getAttribute('rdf:value');
                 if (aAttributes[i].getAttribute('type') == "Binary") // Fix for Firefox 4 (and probably some newer FF versions)
                    oAttr.value = oAttr.value.replace(/\s/g, '');
              break;
              case "Text":
                 oAttr.type = aAttributes[i].getAttribute('type');
                 oAttr.name = aAttributes[i].getAttribute('name');
                 var aContent= AEd.XML.getFirstLevelElementsByTagName(aAttributes[i], "a:Content");

                 if (aContent.length == 1){

                   oAttr.value = aContent[0].textContent || aContent[0].text;
                 }
              break;
              case "annotationLink": 
                 oAttr.type = aAttributes[i].getAttribute('type');
                 oAttr.name = aAttributes[i].getAttribute('name');
                 oAttr.value = aAttributes[i].getAttribute('uri');
                 if (aAttributes[i].getAttribute('tmpId')) { // suggestedAnnotation
                     oAttr.tmpId = aAttributes[i].getAttribute('tmpId');
                 } 
              break;                                      
              case "GeoPoint":  
                 oAttr.type = aAttributes[i].getAttribute('type');
                 oAttr.name = aAttributes[i].getAttribute('name');   
                 var aGeoPoint= AEd.XML.getFirstLevelElementsByTagName(aAttributes[i], "geo:Point"); 
                 if (aGeoPoint.length > 0) {
                    var aLat = AEd.XML.getFirstLevelElementsByTagName(aGeoPoint[0], "geo:lat"); 
                    if (aLat.length > 0) { oAttr.lat = aLat[0].textContent || aLat[0].text; }
                    var aLong = AEd.XML.getFirstLevelElementsByTagName(aGeoPoint[0], "geo:long"); 
                    if (aLong.length > 0) { oAttr.long = aLong[0].textContent || aLong[0].text; }
                 }                           
              break;   
              case "Entity":
                 oAttr.type = aAttributes[i].getAttribute('type');
                 oAttr.name = aAttributes[i].getAttribute('name');
                 var attrs = aAttributes[i].childNodes[0].attributes;
                 
                 for(var j = 0; j < attrs.length; j++)
                 {
                     switch(attrs[j].name)
                     {
                         case 'name':
                             oAttr.entityName = attrs[j].nodeValue;
                             break;
                         case 'uri':
                             oAttr.entityURI = attrs[j].nodeValue;
                             break;
                         case 'type':
                             oAttr.entityType = attrs[j].nodeValue;
                             break;
                         case 'visualRepresentation':
                             oAttr.entityImage = attrs[j].nodeValue;
                             break;
                     }
                 }

                 if(!oAttr.entityImage)
                     oAttr.entityImage = "";
                 if(!oAttr.entityName)
                     oAttr.entityName = "";
                 if(!oAttr.entityURI)
                     oAttr.entityURI = "";
                 if(!oAttr.entityType)
                     oAttr.entityType = "";

                 oAttr.entityDescription = aAttributes[i].childNodes[0].textContent || "";
              break;   
              case "nestedAnnotation":  
                 var aAnno = AEd.XML.getFirstLevelElementsByTagName(aAttributes[i], "annotation");
                 if (aAnno && aAnno.length > 0) {
                    oAttr = _parseServerMsgAnnotation(aAnno[0]);
                 }
                 else {
                    oAttr = _parseServerMsgAnnotation(aAttributes[i]);
                 }
                 
                 oAttr.type = aAttributes[i].getAttribute('type');
                 oAttr.name = aAttributes[i].getAttribute('name');                 
              break;
                     
              default: 
                var regExp = /^http\:\/\//;
                if (aAttributes[i].getAttribute('type').match(regExp)) {
                    oAttr.type = aAttributes[i].getAttribute('type');
                    oAttr.name = aAttributes[i].getAttribute('name');    
                }
                else {
                    oAttr.type = aAttributes[i].getAttribute('type');
                    oAttr.name = aAttributes[i].getAttribute('name'); 
                    oAttr.value = aAttributes[i].getAttribute('rdf:value');
                }                 
              break;
           }
           
           oAnnotation.attributes.push(oAttr);
        }      
      
      }
      
      return oAnnotation;                  

   }




   // ---------------------------------------------- _parseServerMsgSuggestions
   /** _parseServerMsgSuggestions                    
    * parses xml message string.
    * 
    * @name _parseServerMsgSuggestions    
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return
    *  oObject {
    *     msgtype : "suggestions"   
    *     suggestions : Array of oSuggestions, 
    *     deletes : Array of oDeletes    
    *  } 
    *  
    *  oSuggestions {
    *     suggestAnnotation    
    *     tmpId: (String),
    *     confidence: (String)    
    *  }   
    *      
    *  oDelete {
    *     tmpId: (String),   
    *  }                      
    *         
    */        
   function _parseServerMsgSuggestions(xmlTag) {
      var oObject  = null;               
      oObject = {};
      oObject.msgtype = 'suggestions';
      oObject.suggestions = new Array();
      oObject.deletes = new Array();
      
      var nestedConfidence = function(oSuggestions, confidence) {
        for (var j in oSuggestions.attributes) {
            oSuggestions.attributes[j].confidence = confidence;
            if (oSuggestions.attributes[j].attributes) {
                for (var k in oSuggestions.attributes[j].attributes) {
                    nestedConfidence(oSuggestions.attributes[j], confidence)   
                }
            }            
        }
      }
      
      var aSuggestions = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "annotation");
 
      for (var i = 0; i < aSuggestions.length; i++) {

         var oSuggestions = _parseServerMsgAnnotation(aSuggestions[i]);        
         nestedConfidence(oSuggestions, aSuggestions[i].getAttribute('confidence'));
         oSuggestions.tmpId = aSuggestions[i].getAttribute('tmpId');
         oSuggestions.confidence = aSuggestions[i].getAttribute('confidence');
         oObject.suggestions.push(oSuggestions);
      } 
      
      var aDeletes = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "delete");
      for (var i = 0; i < aDeletes.length; i++) {
         var oDeletes = {};
         oDeletes.tmpId = aDeletes[i].getAttribute('tmpId');
         oObject.deletes.push(oDeletes);
      }   

    return oObject;                    
   }  
   
   
   // ------------------------------------------------- _parseServerMsgSettings
   /** _parseServerMsgSettings                    
    * parses xml message string.
    * 
    * @name _parseServerMsgSettings     
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return
    *  oObject {
    *     msgtype : "settings"   
    *     params : Array of oParam, 
    *  } 
    *  
    *  oParam {
    *     name: (String),
    *     value: (String)    
    *  }   
    *                         
    *         
    */        
   function _parseServerMsgSettings(xmlTag) {    
      var oObject  = null;               
      oObject = {};
      oObject.msgtype = 'settings';
      oObject.params = new Array();
      
      var aParams = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "param");
      for (var i = 0; i < aParams.length; i++) {
         var oParam = {};
         oParam.name = aParams[i].getAttribute('name');
         oParam.value = aParams[i].getAttribute('value');
         oObject.params.push(oParam);
      }               
      return oObject;                    
   }


   // ---------------------------------------------------- _parseServerMsgError
   /** _parseServerMsgError                    
    * parses xml message string.
    * 
    * @name _parseServerMsgError      
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return
    *  oObject {
    *     msgtype : "error",   
    *     number : (Number), 
    *     message: (String),
    *     reloadUri : (String),                         
    *     accessDenied : Array of oAccess, 
    *     attributes : Array of oAttribute,    
    *  } 
    *  
    *  oAccess {
    *     user: (String),
    *     type: (String),    
    *     uri: (String)    
    *  }   
    *                         
    *  oAttribute {
    *     name: (String),
    *     type: (String)   
    *  }         
    */        
   function _parseServerMsgError(xmlTag) {    
      var oObject  = null;               
      oObject = {};
      oObject.msgtype = 'error';
      oObject.number = xmlTag.getAttribute('number');
      
      var aMessage = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "message");
      if (aMessage && aMessage[0] && aMessage.length > 0) { oObject.message = aMessage[0].textContent || aMessage[0].text; }
     
      var aContent = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "content");
      if (aContent && aContent[0] && aMessage.length > 0) { oObject.content = aContent[0].textContent || aContent[0].text; }
     
      var aReload = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "reload");
      if (aReload && aReload[0] && aReload.length > 0) { oObject.reloadUri = aReload[0].getAttribute('uri'); }         
            
      oObject.accessDenied = new Array();
      oObject.attributes = new Array();
      
      var aAccess = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "accessDenied");
      for (var i = 0; i < aAccess.length; i++) {
         var oAccess = {};
         oAccess.user = aAccess[i].getAttribute('user');
         oAccess.type = aAccess[i].getAttribute('type');
         oAccess.uri = aAccess[i].getAttribute('uri');
         oObject.accessDenied.push(oAccess);
      }       
      
      var aAttribute = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "attribute");
      for (var i = 0; i < aAttribute.length; i++) {
         var oAttribute = {};
         aAttribute.name = aAttribute[i].getAttribute('name');
         aAttribute.type = aAttribute[i].getAttribute('type');
         oObject.accessDenied.push(aAttribute);
      }  
                   
      return oObject;                    
   }


   // -------------------------------------------------- _parseServerMsgWarning
   /** _parseServerMsgWarning                    
    * parses xml message string.
    * 
    * @name _parseServerMsgWarning      
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return
    *  oObject {
    *     msgtype : "warning" ,
    *     number: (Number),
    *     annotation : (String),
    *     message : (String)            
    *  }   
    *                         
    *         
    */        
   function _parseServerMsgWarning(xmlTag) {    
      var oObject  = null;               
      oObject = {};
      oObject.msgtype = 'warning';  
      oObject.number = xmlTag.getAttribute('number');    
      oObject.annotation = xmlTag.getAttribute('annotation');
      oObject.message = xmlTag.textContent || xmlTag.text;
          
      return oObject;                    
   }
   

   // ------------------------------------------------------- _parseServerMsgOk
   /** _parseServerMsgOk                    
    * parses xml message string.
    * 
    * @name _parseServerMsgOk      
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return
    *  oObject {
    *     msgtype : "ok" 
    *  }   
    *                         
    *         
    */        
   function _parseServerMsgOk(xmlTag) {    
      var oObject  = null;               
      oObject = {};
      oObject.msgtype = 'ok';         
      return oObject;                    
   }
   

    // ------------------------------------------------------- _parseServerMsgEntities
    /** _parseServerMsgEntities                    
    * parses xml message string.
    * 
    * @name _parseServerMsgEntities       
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return
    *  oObject {
    *     msgtype : "entities", 
    *     entities : Array of entities
    *  }   
    *                         
    *         
    */        
    function _parseServerMsgEntities(xmlTag)
    {
        var entities = [];
        //process all entities
        for(var i = 0; i < xmlTag.childNodes.length; i++)
        {
            var childNode = xmlTag.childNodes[i];
            var entity = {description: childNode.textContent}
            //add all attributes to entity object
            for(var j = 0; j < childNode.attributes.length; j++)
            {
                var attr = childNode.attributes[j];
                entity[attr.name] = attr.nodeValue;
            }
            
            entities.push(entity);
        }

        //create parsed message
        var oObject =
        {
            msgtype: 'entities',
            entities: entities
        }

        return oObject;                    
    }

    // ------------------------------------------------------- _parseServerMsgAttrsFromOntology
    /** _parseServerMsgAttrsFromOntology                    
    * parses xml message string.
    * 
    * @name _parseServerMsgAttrsFromOntology       
    * @memberOf AEd.comm.Protocol                 
    * @function
    * @private        
    * @param {XMLElement} xmlTag 
    * @return
    *  oObject {
    *     msgtype : "types",
    *     attrsFromOntology : Array of oAttribute,
    *  } 
    *  
    *  oAttribute {
    *     name : (String),   
    *     type : (String),                
    *     group : (String)
    *  }                     
    *         
    */        
    function _parseServerMsgAttrsFromOntology(xmlTag)
    {

      var oObject  = null;
      var oType = null;
 
      oObject = {};
      oObject.msgtype = 'attrsFromOntology';
      oObject.attrsFromOntology = new Array();
      
      var attrs = AEd.XML.getFirstLevelElementsByTagName(xmlTag, "a:attribute"); 

      for (var iAttr = 0; iAttr < attrs.length; iAttr++) {
      
          var oAttr = {};
          oAttr.name = attrs[iAttr].getAttribute('name');
          oAttr.type = attrs[iAttr].getAttribute('type');
          oAttr.group = attrs[iAttr].getAttribute('group');
          oObject.attrsFromOntology.push(oAttr);
      }  
      
      
      return oObject;                    
    }




   
   //***************************************************************************
   // ****************************************************************** SERVER     




   // ------------------------------------------------------------------ return
   return t


})(); 
// *****************************************************************************
// class AEd.comm.Protocol
// ***************************************************************************** 


// shorten name
AEd.Protocol = AEd.comm.Protocol;

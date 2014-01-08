/**
 * XMLUtils.js
 *
 * Contains AEd.xml.XMLUtils class definition.
 *  
 * @author: Martin Kleban 
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.xml.XMLUtils
// ***************************************************************************** 


     
/**
 * Namespace and functionality for XML and XPath parser. 
 *       
 * @name XMLUtils
 * @memberOf AEd.xml        
 * @class 
 * @static 
 *      
 */
AEd.xml.XMLUtils = (function() {
        

    // *************************************************************************
    // variables
    // *************************************************************************   
    
    // object to return
    var t = {};
 
        
        
    // *************************************************************************
    // XMLUtils public properties
    // *************************************************************************               
    

 
    // *************************************************************************
    // XMLUtils events
    // *************************************************************************        

  
          
    // *************************************************************************
    // XMLUtils PUBLIC methods
    // *************************************************************************  
      

    // ----------------------------------------------------- XMLUtils.xmlParser
    /**
     * Creates XML Parser.
     *       
     * @name xmlParser
     * @memberOf AEd.xml.XMLUtils                 
     * @function     
     * @public           
     * @param {String} xml XML String.	     
     * @return {Object} XML Parser.  
     */
    t.xmlParser = function(xml) {
             var xmldom = null;
             
             if (typeof DOMParser != "undefined") {
                xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
                var errors = xmldom.getElementsByTagName("parseerror");
                if (errors.length) {
                   throw new Error(AEd.I18n.t("Error_AEd_xml_XMLUtils_Parsing_error") + " " + errors[0].textContent() || errors[0].text);
                }
             }
             else if (document.implementation.hasFeature("LS", "3.0")) {
                var implementation = document.implementation;
                var parser = implementation.createLSParser(implementation.MODE_SYNCHRONOUS, null);
                var input = implementation.createLSInput();
                input.stringData = xml;
                xmldom = parser.parse(input);
             }
             else if (typeof ActiveXObject != "undefined") {
                xmldom = createDocument();
                xmldom.loadXML(xml);
                if (xmldom.parseError != 0) {
                   throw new Error(AEd.I18n.t("Error_AEd_xml_XMLUtils_Parsing_error") + " " + xmldom.parseError.reason);
                }
             }
             else {
                throw new Error(AEd.I18n.t("Error_AEd_xml_XMLUtils_Parsing_error") + AEd.I18n.t("No_parser_available"));
             }  
             
             return xmldom;
    }
        
    // -------------------------------- XMLUtils.getFirstLevelElementsByTagName
    /**
     * Returns array of first level element with specified tagName. 
     *       
     * @name getFirstLevelElementsByTagName
     * @memberOf AEd.xml.XMLUtils                 
     * @function       
     * @public           
     * @param {Element} element XML element.	   
     * @param {String} tagName Tag name of elements.       
     * @return {Array} Array of first level element with specified tagName.  
     */        
    t.getFirstLevelElementsByTagName = function(element, tagName) {
       if (element && tagName) {
          var allElements;
          // chrome or safari have problem with namespace in tag
          // so we need use different function
          if(/Safari/.test(navigator.userAgent) || /Opera/.test(navigator.userAgent)) {
            tags = tagName.split(':');
            allElements = element.getElementsByTagNameNS('*', tags[tags.length-1]);
          }
          else { // firefox
            allElements = element.getElementsByTagName(tagName);
          }

          var firstLevelElements = new Array();
          
          for (var i = 0; i < allElements.length; i++) {
             if (allElements[i].parentNode === element) {
                firstLevelElements.push(allElements[i]);
             }
          }
          return firstLevelElements;
       }
       else {
          return null;
       }      
    }  
        

    // ---------------------------------------------- getElementWorkingDocXPath  
    /**
     * Returns XPath of specified element in working document. 
     *       
     * @name getElementWorkingDocXPath
     * @memberOf AEd.xml.XMLUtils                 
     * @function           
     * @public           
     * @param {Element} element DOM element.	       
     * @return {String} XPath of specified element in working document.  
     */      
    t.getElementWorkingDocXPath = function(element) {
       var path = "";
     
       var newPar = null;
       for (; element && ((element.nodeType == 1) || (element.nodeType == 3)); element = newPar) {

             var count = _getElementPreviousSiblingsCount(element);
           	 var name = element.nodeName;
           	 name = name.toLowerCase();
           	 if (name == "#text") name = "text()";

    	       if (count > 0) {
                count++;
                name += "[" + count + "]";
             }
             else if (count == 0) {
                if (_getElementNexSiblingsCount(element) > 0) {
                   count++;
                   name += "[" + count + "]";
                }
             }
    	       path = "/" + name + path;

             newPar = element.parentNode;
             if (newPar == null && element != element.ownerDocument.documentElement 
                 && ((element.nodeType == 1) || (element.nodeType == 3))) {
               newPar = _findLostParent(element, element.ownerDocument.documentElement);
             }
       }

       return path;      	
    }

    /**
     * Finds parent element of given element if it is impossible to do it by standard way.
     * It is recursively searching it in given element from the top.
     * For comparison it is using only node type and content so it is not so reliable. 
     * But it is only way how to find anything and prevent application to crash. This 
     * method is called infrequently and only in particular situations in some browsers.
     * @param {Element} element DOM element for which we are searching parent
     * @param {Element} search DOM element in which we are searching
     * @return {Element} Parent element or null if it was not found
     */
    var _findLostParent = function(element, search) {
      var chlidCount = search.childNodes.length;
      var found = null;
      for (var i = 0; i < chlidCount && found == null; i++) {
        if (search.childNodes[i].nodeName == element.nodeName && search.childNodes[i].nodeValue == element.nodeValue) {
          found = search;
        } else if (search.childNodes[i].firstChild != null) {
          found = _findLostParent(element, search.childNodes[i]);
        }
      }
      return found;
    }


   // -------------------------------------------------- getElementOrigDocXPath 
    /**
     * Returns XPath of specified element. Path is filtered due to filter parameter
     * object.            
     *      
     * @name getElementOrigDocXPath
     * @memberOf AEd.xml.XMLUtils                 
     * @function       
     * @public           
     * @param {Element} element DOM element.   	       
     * @return {String} XPath of specified element in original document.  
     */       
   t.getElementOrigDocXPath = function(element) {
     var path = "";

     
     for (; element && ((element.nodeType == 1) || (element.nodeType == 3)); element = element.parentNode) {
         if (!AEd.ElU.hasClass(element, AEd.CONFIG.CLASS_ANNOTATION)) {
             
             var tmpNode = element;
             var tmpParentNode = element.parentNode;
             while (AEd.ElU.hasClass(tmpParentNode, AEd.CONFIG.CLASS_ANNOTATION)) {
                tmpNode = tmpParentNode;
                tmpParentNode = tmpParentNode.parentNode;
             }
             var merging = false;
             if (tmpNode !== element) {
                merging = true; 
             }

              var count = _getElementCleanedPreviousSiblingsCount(tmpNode, element, merging);
             
           	 var name = element.nodeName;
           	 name = name.toLowerCase();
           	 if (name == "#text") name = "text()";

    	       if (count > 0) {
                count++;
                name += "[" + count + "]";
             }
             else if (count == 0) {
                if (_getElementCleanedNexSiblingsCount(tmpNode, element, merging) > 0) {
                   count++;
                   name += "[" + count + "]";
                }
             }
    	       path = "/" + name + path;               
         }        
     }      

     return path;      	
   }  

    // ------------------------------------------------------------ xmlToString 
    /**
     * Serializes XML to String.              
     *      
     * @name xmlToString
     * @memberOf AEd.xml.XMLUtils                 
     * @function       
     * @public           
     * @param {XML} xmlNode XML Node.  
     * @param {Boolean} doReplace Should be all < characters replaced with &gt and > with &lt.        	       
     * @return {String} Serialized String.  
     */   
   t.xmlToString = function(xmlNode, doReplace) {
      var s;
      try {  
         s = (new XMLSerializer()).serializeToString(xmlNode);
         if (doReplace) {
             s = t.escapeXmlString(s);
         } 
         return s;
      }
      catch (e) {
         try {
            // IE
            s = xmlNode.xml;
            if (doReplace) {
                s = t.escapeXmlString(s);
            }             
            return s;
         }
         catch (e) {  
           throw new Error(AEd.I18n.t("Error_AEd_xml_XMLUtils_Serializer_error_XML_Serializer_not_supported"));
        }
      }
      return false;
   }          
  
    // -------------------------------------------------------- escapeXmlString 
    /**
     * Replaces all < and > characters with &gt and &lt.              
     *      
     * @name escapeXmlString
     * @memberOf AEd.xml.XMLUtils                 
     * @function       
     * @public           
     * @param {String} s String to escape. 
     * @return {String} s escaped string. 
     */   
   t.escapeXmlString = function(s) {
        s = s.replace(/>/g, "&gt");
        s = s.replace(/</g, "&lt");
        return s;
   }    
  
   // ---------------------------------------------------- serializeNodeContent 
    /**
     * Serializes XML node content to String.              
     *      
     * @name serializeNodeContent
     * @memberOf AEd.xml.XMLUtils                 
     * @function       
     * @public           
     * @param {XML} xmlNode XML Node.    	       
     * @return {String} Serialized node content.  
     */   
   t.serializeNodeContent = function(xmlNode) {
      var s = t.xmlToString(xmlNode);
      var startIndex = s.indexOf(">") + 1;
      var endIndex = s.lastIndexOf("<");
      return s.substring(startIndex, endIndex);
   }
   
   
   
   // --------------------------------------------------- selectSingleNodeXPath 
    /**
     * Returns node that match XPath expression.              
     *      
     * @name selectSingleNodeXPath
     * @memberOf AEd.xml.XMLUtils                 
     * @function       
     * @public           
     * @param {Element} context Context element or document.    
     * @param {String} expression XPath expression.      	       
     * @return {Node} Node that match XPath expression.  
     */     
   t.selectSingleNodeXPath = function(context, expression) {
      var doc = (context.nodeType != 9 ? context.ownerDocument : context);
      if (AEd.isIE)
         doc.evaluate = document.evaluate;

      if (typeof doc.evaluate != "undefined") {

         // Opera and Chrome/Safari support

         if (window.opera || /Safari/.test(navigator.userAgent)){
          
           var result = doc.evaluate(expression, context, null, 9 /*FIRST_ORDERED_NODE_TYPE*/, null);
         }         

         else {

           var result = doc.evaluate(expression, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
         }

         return (result !== null ? (AEd.isIE ? result.getSingleNodeValue() : result.singleNodeValue) : null);
      }
      else if (typeof context.selectSingleNode != "undefined") {
         return context.selectSingleNode(expression);
      }
      else {
         throw new Error(AEd.I18n.t("Error_AEd_xml_XMLUtils_XPath_error_No_XPath_subsystem_available"));
      }
   }   



   // ------------------------------------------------------ origToWorkingXPath 
    /**
     * Converts original document xpath to xpath in working document          
     *      
     * @name origToWorkingXPath
     * @memberOf AEd.xml.XMLUtils                 
     * @function       
     * @public             
     * @param {String} origXPath XPath expression in original document.   
     * @param {Element} context Optional - Context document or element, default is window.document         	       
     * @return {String} Working document xpath.  
     */     
   t.origToWorkingXPath = function(origXPath, context) {
      if (origXPath) {
          var doc = context || window.document;
          doc = (doc.nodeType != 9 ? doc.ownerDocument : doc);
  
          var aSubstrings = origXPath.split("/");
    
          var actualElement = doc;

          // iterate all items in xpath string
          for (var i = 0; i < aSubstrings.length; i++) {
              // not empty 
              if ((aSubstrings[i])) {
                  
                  var nodesCount = 0;                       
                  var pathItem   = aSubstrings[i];  // example: span[2]
                  var startIndex = pathItem.indexOf("[");
                  var endIndex   = pathItem.lastIndexOf("]");
                  var nodeName   = null; // span (from example above)
                  var nodePos    = 1;    // 2 (from example above)
                  var fAC        = false; // fully annotated node was counted
                  var lWS        = false; // last operation was substraction
                  var lWA        = false; // last operation was addition
                  if (startIndex == -1) {
                      nodeName = pathItem;
                  }
                  else {
                      nodeName = pathItem.substring(0, startIndex);
                      nodePos  = parseInt(pathItem.substring(startIndex+1, endIndex));
                  }
                         
                  if (nodeName.search("text()") != -1){
                      nodeName = nodeName.replace(/text\(\)/i, "#text");
                  }  
                  else {
                      nodeName = nodeName.toUpperCase();
                  }
                  

                  // iterate all child nodes of actual node and search for nodes
                  // with actual nodeName and skip annotation elements
                  for (var j = 0; j < actualElement.childNodes.length; j++) {

                      if (actualElement.childNodes[j].nodeName == nodeName && AEd.ElU.hasClass(actualElement.childNodes[j], AEd.CONFIG.CLASS_ANNOTATION)) {
                          // simply skip node which is not in original document
                      } else if ((nodeName.match(/^#.*/) && AEd.ElU.hasClass(actualElement.childNodes[j], AEd.CONFIG.CLASS_ANNOTATION)) || (actualElement.childNodes[j].nodeType == 3 && AEd.ElU.hasClass(actualElement.childNodes[j], AEd.CONFIG.CLASS_ANNOTATION))) { // nodeName.match(/^#.*/) solves problem with fragments in formatting html tags 
                          if (j > 0 && j < (actualElement.childNodes.length - 1)) {
                              // if it is not starting or ending by this annotation
                              var auxCnt = 1;
                              var pITN = false;
                              var nITN = false;
                              while ((j - auxCnt) >= 0 && AEd.ElU.hasClass(actualElement.childNodes[(j - auxCnt)], AEd.CONFIG.CLASS_ANNOTATION)) {
                                  auxCnt++;  // go to previous node
                              }
                              if ((j - auxCnt) >= 0) {  // if something else than annotation was found in previous nodes
                                  if (actualElement.childNodes[(j - auxCnt)].nodeType == 3 && nodeName == "#text") {
                                      // if previous node is text node
                                      pITN = true;
                                  }
                              }
                              var auxCnt = 1;
                              while ((j + auxCnt) < actualElement.childNodes.length && AEd.ElU.hasClass(actualElement.childNodes[(j + auxCnt)], AEd.CONFIG.CLASS_ANNOTATION)) {
                                  auxCnt++;  // go to next node
                              }
                              if ((j + auxCnt) < actualElement.childNodes.length) {  // if something else than annotation was found in next nodes
                                  if (actualElement.childNodes[(j + auxCnt)].nodeType == 3 && nodeName == "#text") {
                                      // if next node is text node
                                      nITN = true;
                                  }
                              }
                              if (pITN && nITN && !AEd.ElU.hasClass(actualElement.childNodes[(j - 1)], AEd.CONFIG.CLASS_ANNOTATION) && nodesCount > 0) {  // if text is before and after annotations block
                                  if (!lWS && lWA) {  // only last added node can be substracted
                                      nodesCount--;  // annotation node was splitted original text node into three parts (one will be skipped, one must be substracted)
                                      lWS = true;
                                      lWA = false;
                                  }
                              } else if (!pITN && !nITN && !fAC) {  // if whole text node is annotated, it is necessary to count it (if it was not already done)
                                  nodesCount++;
                                  fAC = true;
                                  lWS = false;
                                  lWA = true;
                              }
                          } else if (actualElement.childNodes.length == 2 
                                     && AEd.ElU.hasClass(actualElement.childNodes[0], AEd.CONFIG.CLASS_ANNOTATION) 
                                     && AEd.ElU.hasClass(actualElement.childNodes[1], AEd.CONFIG.CLASS_ANNOTATION)
                                     && j == 0) {  // if whole short text node is annotated, it is necessary to count it
                              nodesCount++;
                              lWS = false;
                              lWA = true;
                          } else if (actualElement.childNodes.length == 1) {
                              nodesCount++;
                              lWS = false;
                              lWA = true;
                          }
                      } else  if (actualElement.childNodes[j].nodeName == nodeName && actualElement.childNodes[j].nodeType != 3) {
                          nodesCount++;  // name matches - count it
                          lWS = false;
                          lWA = true;
                      } else if (actualElement.childNodes[j].nodeType == 3 && nodeName == "#text") {  // TEXT NODE
                          var tmpText = actualElement.childNodes[j].nodeValue;
                          // Skipping of nodes with white spaces was commented out on another places so it will be consistent here
                          if (tmpText == "" && j > 0 && j < (actualElement.childNodes.length - 1)) {
                              if ((AEd.ElU.hasClass(actualElement.childNodes[(j + 1)], AEd.CONFIG.CLASS_ANNOTATION)
                                  && actualElement.childNodes[j - 1].nodeType == 3 ) || 
                                  (actualElement.childNodes[j - 1].nodeType == 3 && actualElement.childNodes[j - 1].nodeValue == "") ||
                                  (AEd.ElU.hasClass(actualElement.childNodes[(j - 1)], AEd.CONFIG.CLASS_ANNOTATION)
                                  && actualElement.childNodes[j + 1].nodeType == 3) ||
                                  (j > 1 && AEd.ElU.hasClass(actualElement.childNodes[(j - 2)], AEd.CONFIG.CLASS_ANNOTATION)
                                  && actualElement.childNodes[j - 1].nodeType == 3 && actualElement.childNodes[j + 1].nodeType == 3 
                                  && actualElement.childNodes[j + 1].nodeValue == "")) {
                                  // skip empty node before annotation if it follows text node or annotation
                              } else {
                                nodesCount++;  // counting of text nodes if we are searching it
                                lWS = false;
                                lWA = true;
                              }
                          }
                          else {
                            nodesCount++;  // counting of text nodes if we are searching it
                            lWA = true;
                            lWS = false;
                          }
                      } else {
                          fAC = false;
                          lWS = false;
                          lWA = false;
                          // some additional nodes will be skipped as they are not interesting
                      }
                      
                      if (nodesCount >= nodePos) {
                          if (actualElement.childNodes[j].nodeType == 3 && AEd.ElU.hasClass(actualElement.childNodes[j], AEd.CONFIG.CLASS_ANNOTATION)) {
                              actualElement = actualElement.childNodes[j].firstChild;
                             
                          }
                          else {
          
                              actualElement = actualElement.childNodes[j];

                          } 
                         
                          break;
                      }
                  }
          
              }               
          }

          return t.getElementWorkingDocXPath(actualElement);         
      }
      else {
          return null;
      } 
   }  

    // *************************************************************************
    // XMLUtils PRIVATE methods
    // *************************************************************************  

   // ---------------------------------------- _getElementPreviousSiblingsCount
   /**
     * Gets number of element previous siblings   
     * @param {Element} element
     */
   var _getElementPreviousSiblingsCount = function(element) {
      var count = 0;
      for (var sib = element.previousSibling; sib ; sib = sib.previousSibling) {
         if (((sib.nodeType == 1) || (sib.nodeType == 3)) && sib.nodeName == element.nodeName)	{ count++; }
      }        
      return count;
   }
   
   // --------------------------------------------- _getElementNexSiblingsCount
   /**
     * Gets number of element next siblings   
     * @param {Element} element
     */   
   var _getElementNexSiblingsCount = function(element) {
      var count = 0;
      for (var sib = element.nextSibling; sib ; sib = sib.nextSibling) {
         if (((sib.nodeType == 1) || (sib.nodeType == 3)) && sib.nodeName == element.nodeName)	{ count++; }
      }        
      return count;
   }   
   
   // --------------------------------- _getElementCleanedPreviousSiblingsCount  
   /**
     * Gets number of element cleaned (from annotation nodes) previous siblings   
     * @param {Element} element
     */ 
   var _getElementCleanedPreviousSiblingsCount = function(parentElement, element, merging) {
      
      var name = element.nodeName;
      name = name.toLowerCase();

      var textNodesMerging = false;
      if (name == "#text") textNodesMerging = true;
      var textNodesMergingStarted = false;

      var count = 0;
      var doMerging = merging;
      var sequenceCounted = false;

      for (var sib = parentElement.previousSibling; sib ; sib = sib.previousSibling) {      

         if ((name.match(/^#.*/) && AEd.ElU.hasClass(sib, AEd.CONFIG.CLASS_ANNOTATION)) || (sib.nodeType == 3 && AEd.ElU.hasClass(sib, AEd.CONFIG.CLASS_ANNOTATION))) { // name.match(/^#.*/) solves problem with fragments in formatting html tags
            doMerging = true;
            textNodesMergingStarted = false;
            if (!sequenceCounted) {
                count++;
                sequenceCounted = true;
            }
         }
         else {
             if ((((sib.nodeType == 1) || (sib.nodeType == 3)) && sib.nodeName.toLowerCase() == name))	{
                if (!doMerging) {
                   if (textNodesMerging) {
                      if (!textNodesMergingStarted) {  // merge sequence of text nodes (skip empty text nodes)
                          textNodesMergingStarted = true;
                          count++;
                          sequenceCounted = true;
                      }
                   }
                   else {
                       count++; 
                       sequenceCounted = true;
                   }
                }
             }
             else {
                doMerging = false;
                sequenceCounted = false;
                textNodesMergingStarted = false;
             }
         }

      }  

      
      return count;
   }
   
   // -------------------------------------- _getElementCleanedNexSiblingsCount 
   /**
     * Gets number of element cleaned (from annotation nodes) next siblings   
     * @param {Element} element
     */
  
   var _getElementCleanedNexSiblingsCount = function(parentElement, element, merging) {
     
      var name = element.nodeName;
      name = name.toLowerCase();
      var count = 0;
      var doMerging = merging;
      var sequenceCounted = false;
      
      var textNodesMerging = false;
      if (name == "#text") textNodesMerging = true;
      var textNodesMergingStarted = false;
      
      for (var sib = parentElement.nextSibling; sib ; sib = sib.nextSibling) {
         if ((name.match(/^#.*/) && AEd.ElU.hasClass(sib, AEd.CONFIG.CLASS_ANNOTATION)) || sib.nodeType == 3 && AEd.ElU.hasClass(sib, AEd.CONFIG.CLASS_ANNOTATION)) {  // name.match(/^#.*/) solves problem with fragments in formatting html tags
            doMerging = true;
            textNodesMergingStarted = false;
            if (!sequenceCounted) {
                count++;
                sequenceCounted = true;
            }
         }
         else {
             if ((((sib.nodeType == 1) || (sib.nodeType == 3)) && sib.nodeName.toLowerCase() == name))	{
                if (!doMerging) {
                   if (textNodesMerging) {
                      if (!textNodesMergingStarted) {  // merge sequence of text nodes (skip empty text nodes)
                          textNodesMergingStarted = true;
                          count++;
                          sequenceCounted = true;
                      }
                   }
                   else {
                       count++; 
                       sequenceCounted = true;
                   }
                }
             }
             else {
                doMerging = false;
                sequenceCounted = false;
                textNodesMergingStarted = false;
             }
         }
      }        
      return count;
   }     

        
    // *************************************************************************
    // return
    // *************************************************************************               
  
    return t; 

})();



// *****************************************************************************
// class AEd.xml.XMLUtils
// ***************************************************************************** 
    


// shorten name
AEd.XML = AEd.xml.XMLUtils;

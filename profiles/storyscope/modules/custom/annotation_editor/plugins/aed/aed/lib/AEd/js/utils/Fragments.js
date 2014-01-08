/**
 * FragmentsUtils.js
 *
 * Contains AEd.utils.FragmentsUtils class definition.
 *  
 * @authors: Martin Kleban, Milos Cudrak
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.utils.FragmentsUtils 
// ***************************************************************************** 


     
/**
 * FragmentsUtils class provides useful methods for working with fragments in 
 * wysiwyg editor. 
 *       
 * @name FragmentsUtils
 * @memberOf AEd.utils        
 * @class 
 * @static 
 *      
 */
AEd.utils.FragmentsUtils = (function() {
        

    // *************************************************************************
    // constants
    // *************************************************************************   



    // *************************************************************************
    // variables
    // *************************************************************************   
    
    // object to return
    var t = {};
    
    // short                      
    var Dispatcher = AEd.utils.Dispatcher;      
    

        
    // *************************************************************************
    // FragmentsUtils public properties
    // *************************************************************************               
        

 
    // *************************************************************************
    // FragmentsUtils events
    // ************************************************************************* 
 



    // *************************************************************************
    // FragmentsUtils PUBLIC methods
    // *************************************************************************  
        






    // ---------------------------------------------- getFragmentsFromSelection
    /**
     * Returns array of fragments in specified selection.
     * 
     * @example
     * Principes of creating fragment from selection object:
     * 
     * <span>a bc<strong>def</strong>gh i</span>  
     *        |                        |
     *   selection start         selection end
     *   
     *   
     *   [span]
     *     |
     * ---- ------ ---------
     * |          |         |
     * [text1]  [strong]  [text2]
     *            | 
     *          [text]
     *          
     *
     * In example above, selection anchorNode is text1 (from tree) and selection
     * focusNode is text2 (from tree).
     * 
     * Method returns an array of fragments, where fragment is a javascript object like:
     * fragment = {
     *    fragmentLength : value,
     *    fragmentOffset : value,
     *    fragmentPath   : value,
     *    fragmentText   : value
     * }   
     *  
     * where NO fragment can contain nested element. Fragments in example should 
     * look like:
     * 
     * <span>a <FRAGMENT01>bc</FRAGMENT01><strong><FRAGMENT02>def</FRAGMENT02>
     * </strong><FRAGMENT03>gh</FRAGMENT03> i</span>      
     *
     *   
     * @name getFragmentsFromSelection
     * @memberOf AEd.utils.FragmentsUtils
     * @function   
     * @param {Object} oSelection Browser Selection object. https://developer.mozilla.org/en/DOM/selection
     * @param {Boolean} removeWhiteSpaceFragments Should be fragments whit only white spaces characters removed?          
     * @return {Array} Array of fragments.    
     *  	
     */
    t.getFragmentsFromSelection = function(oSelection, removeWhiteSpaceFragments) { 

       // --------------------------------------------------------------------------
       // VARIABLES
          // array of fragments to return
          var aFragments = new Array();
          // boolean variable, determines if selection is empty      
          var isSelectionEmpty = false;
          // boolean variable, determines if selection start and end node are the same      
          var areSelectionStartEndNodesSame = false;  
          // boolean variable, determines if selection start or end node are inside annotated fragment            
          var isSelectionStartNodeInsideAnnotation = false;        
          var isSelectionEndNodeInsideAnnotation = false;
          
          // selection start node and offset
          var elSelectionStart = oSelection.anchorNode;
          var elSelectionStartOffset = oSelection.anchorOffset;
          // selection end node and offset
          var elSelectionEnd = oSelection.focusNode;
          var elSelectionEndOffset = oSelection.focusOffset;        
          
                               
          
       // --------------------------------------------------------------------------
       // DETERMINES WHETHER SELECTION start and end node are the same 
       
          if (elSelectionStart === elSelectionEnd) {
             areSelectionStartEndNodesSame = true;
          } 
                     
       // --------------------------------------------------------------------------
       // DETERMINES WHETHER SELECTION IS EMPTY    
       
          if ((elSelectionStart === elSelectionEnd) && (elSelectionStartOffset == elSelectionEndOffset)) {
             isSelectionEmpty = true;
          }
          else {
             isSelectionEmpty = false;
          }
          
       // --------------------------------------------------------------------------     
        
         if (!isSelectionEmpty) {
          
          
              if ((elSelectionStart.nodeType == 3) && (AEd.ElU.hasClass(elSelectionStart.parentNode, AEd.CONFIG.CLASS_ANNOTATION))) {

                  isSelectionStartNodeInsideAnnotation = true;
              }
              
              if ((elSelectionEnd.nodeType == 3) && (AEd.ElU.hasClass(elSelectionEnd.parentNode, AEd.CONFIG.CLASS_ANNOTATION))) {

                   isSelectionEndNodeInsideAnnotation = true;
              }           
          

          
          // -----------------------------------------------------------------------
          // SEARCH FOR THE NEAREST COMMON ANCESTOR OF START AND END NODE 
              var commonAncestor = AEd.ElU.getElementsNearestAncestor(elSelectionStart, elSelectionEnd);
             
              if (commonAncestor.nodeType == 3) {
                  
                  commonAncestor = commonAncestor.parentNode;
                
              }
              

              
              while(AEd.ElU.hasClass(commonAncestor, AEd.CONFIG.CLASS_ANNOTATION)) {
                  commonAncestor = commonAncestor.parentNode;
              }
              
              
    
          // -----------------------------------------------------------------------
          // TRYING TO CREATE NODE ITERATOR OBJECT https://developer.mozilla.org/En/DOM/NodeIterator             
              try {
                 var iterator;
                 if (AEd.isIE || (AEd.isFF && AEd.FFversion >= 4) || window.opera || /Safari/.test(navigator.userAgent)) // Is this testing really necessary?! CreateTreeWalker should work in all supported browsers and if it doesn't, the surrounding try-catch will catch it anyway.
                     iterator = document.createTreeWalker(commonAncestor, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
                 
             // --------------------------------------------------------------------
             // VARIABLES             
                 
                 // The first call to nextNode() returns the first node in the set.
                 var node = iterator.nextNode();

    
                 // tmp variables to store offset, length, path and text for each
                 // fragment
                 var fragmentOffset = 0;
                 var fragmentLength = 0;
                 var fragmentPath   = null;
                 var fragmentText   = null;
             
             // --------------------------------------------------------------------
             // INTERATING THROUGH ALL CHILD NODES OF COMMON ANCESTOR UNTIL 
             // SELECTION START OR END NODE IS FOUND
    
                 while ((node) && ((node !== elSelectionStart) && (node !== elSelectionEnd))) {
                    node = iterator.nextNode();
                 }
             
             // --------------------------------------------------------------------
             // IF USER MADE SELECTION FROM RIGHT TO LEFT - END NODE FOUND FIRST
    
                 // boolean which determines whether to switch start and end
                 // selection nodes
                 var doSwitchNodes = false;            
    
                 if (node === elSelectionEnd) {
                    if (elSelectionStart === elSelectionEnd) {
                       if (elSelectionStartOffset > elSelectionEndOffset) {
                          doSwitchNodes = true;
                       }
                    }
                    else {
                       doSwitchNodes = true;
                    }                              
                 }
                 
                 if (doSwitchNodes) {
                    var tmpElSelectionStart = elSelectionStart;
                    var tmpElSelectionStartOffset = elSelectionStartOffset;
                    elSelectionStart = elSelectionEnd;
                    elSelectionStartOffset = elSelectionEndOffset;
                    elSelectionEnd = tmpElSelectionStart;
                    elSelectionEndOffset = tmpElSelectionStartOffset;             
                 }
  
             // --------------------------------------------------------------------
             // CHECK FOR PREVIOUS TEXT NODES TO GET RIGHT OFFSET VALUE         
                 
                 var lastNotNullPreviousNode = node;
                 // tmp variable to hold actual sibling      
                 var previousNode = node.previousSibling;

                 var doCycle = true;
                 // while there are some previous nodes 
                 while (doCycle) {
                     // while there are some previous nodes 
                     while (previousNode) {
                        
                        // if node is a TEXT NODE
                        if (previousNode.nodeType == 3) { 
                           // add node length to fragment offset
                           fragmentOffset += previousNode.nodeValue.length;
                           lastNotNullPreviousNode = previousNode;
                           previousNode = previousNode.previousSibling;
                        }   
                        // if node is a tmp node for annotation visualization 
                        // has CLASS_ANNOTATION               
                        else if (AEd.ElU.hasClass(previousNode, AEd.CONFIG.CLASS_ANNOTATION)) { 
                           
                           // childNode should always have only one child element (CLASS_ANNOTATION or TextNode)
                           var childNode = previousNode;
                           
                           // skip all CLASS_ANNOTATION elements
                           while (childNode && AEd.ElU.hasClass(childNode, AEd.CONFIG.CLASS_ANNOTATION)) { 
                              childNode = childNode.firstChild;
                           }
                           // if node is a TEXT NODE
                           // add node length to fragment offset
                           if ((childNode) && (childNode.nodeType == 3)) { 
                              fragmentOffset += childNode.nodeValue.length;
                              // if there are another text nodes 
                              var nSib = childNode.nextSibling;                           
                              while(childNode.nextSibling) {
                                  fragmentOffset += nSib.nodeValue.length;
                              }                             
                           }
                           else {
                              break;
                           }
                           lastNotNullPreviousNode = previousNode;                      
                           previousNode = previousNode.previousSibling;
                        }
                        else { // break
                           break;
                        }              
                     } // while previousNode
                     
                     if (AEd.ElU.hasClass(lastNotNullPreviousNode.parentNode, AEd.CONFIG.CLASS_ANNOTATION)) {
                         lastNotNullPreviousNode = lastNotNullPreviousNode.parentNode;
                         previousNode = lastNotNullPreviousNode.previousSibling;
                     }
                     else {
                         doCycle = false;
                     }
                 
                 } // while doCycle
             // --------------------------------------------------------------------
             // SET FIRST FRAGMENT OFFSET               
    
                 fragmentOffset += elSelectionStartOffset;
                 
                 
             // --------------------------------------------------------------------
             // SET FIRST FRAGMENT PATH               
                
                 fragmentPath = AEd.XML.getElementOrigDocXPath(lastNotNullPreviousNode);


             // --------------------------------------------------------------------
             // SET FIRST FRAGMENT LENGTH AND TEXT             
                 
                 // if start and end nodes are the same
                 if (areSelectionStartEndNodesSame) {                   
                    fragmentLength = elSelectionEndOffset - elSelectionStartOffset;
                    fragmentText = node.nodeValue.substr(elSelectionStartOffset, fragmentLength);
                    // --------------------------------------------------------------------
                    // PUSH FIRST FRAGMENT OBJECT TO ARRAY            
                    aFragments.push ({fragmentPath: fragmentPath, fragmentOffset: fragmentOffset, fragmentLength: fragmentLength, fragmentText: fragmentText});
                    // --------------------------------------------------------------------
                    // WE HAVE NOW CREATED THE FIRST AND THE ONLY FRAGMENT 
                 }
                 // if start and end node are identical, there will be only
                 // one fragment, otherwise...
                 else {
                    // WE HAVE TO FIND THE END OF THE FIRST FRAGMENT - 

                    fragmentLength = node.nodeValue.length - elSelectionStartOffset;
                    fragmentText = node.nodeValue.substr(elSelectionStartOffset);

                    
                    
                    // if there are next text nodes, keep offset value from the beginning
       
                    if (node.parentNode.nodeType == 1){  // Fixes problem with annotating <strong>aaa</strong>bbb
                    
                          aFragments.push ({fragmentPath: fragmentPath, fragmentOffset: fragmentOffset, fragmentLength: fragmentLength, fragmentText: fragmentText});
                          fragmentOffset = 0;
                          fragmentLength = 0;
                          fragmentText = "";
                          fragmentPath = null; 
                    }                   
                    
                    // tmp variable to hold parent node of actual node                
                    var lastNodeParent = node.parentNode;

                    while(AEd.ElU.hasClass(lastNodeParent, AEd.CONFIG.CLASS_ANNOTATION)) {
                        lastNodeParent = lastNodeParent.parentNode;
                    }                    
                    
                    // -------------------------------------------------------------
                    // ITERATE THROUGH ALL NODES IN SELECTION EXCEPT THE LAST ONE                
                    node = iterator.nextNode();  
                    
                    // if there is no next node = finalize first fragment
                    // this situation should not occure if the start and end 
                    // selection elements are not identical - and they aren't
                    if (!node) {
                        aFragments.push ({fragmentPath: fragmentPath, fragmentOffset: fragmentOffset, fragmentLength: fragmentLength, fragmentText: fragmentText});
                    }
            
                    while (node ) {                      

                       if ((node === elSelectionEnd)) {
                           if (!fragmentPath) {
                               fragmentPath = AEd.XML.getElementOrigDocXPath(node);
                           }
                           
                           fragmentLength += elSelectionEndOffset; 
                           fragmentText += node.nodeValue.substr(0, elSelectionEndOffset);
                           aFragments.push ({fragmentPath: fragmentPath, fragmentOffset: fragmentOffset, fragmentLength: fragmentLength, fragmentText: fragmentText});
                                                  
                           break;
                       }
                    
                       // if next node is text node
                       if (node.nodeType == 3) { 
                          // SET FRAGMENT PATH
                          if (!fragmentPath) {
                             fragmentPath = AEd.XML.getElementOrigDocXPath(node);
                             fragmentLength += node.nodeValue.length;  
                             fragmentText += node.nodeValue;                               
                          }
                          else {
                             if (/*AEd.Cleanup.trim(node.nodeValue) != ""*//*true*/node.nodeValue && node.nodeValue != "") {  // NOTE : fixed bug : Unable to annotate more annotation fragments. 
                                  fragmentLength += node.nodeValue.length;  
                                  fragmentText += node.nodeValue;  
                             }
                          }

                          
                                                    
                          
                          var tmpParentNode = node.parentNode;
                          // skip all CLASS_ANNOTATION elements
                          while (AEd.ElU.hasClass(tmpParentNode, AEd.CONFIG.CLASS_ANNOTATION)) { 
                             tmpParentNode = tmpParentNode.parentNode;
                          } 
                          // when 2 nodes have identical parent element means,
                          // that there is no nested element except CLASS_ANNOTATION 
                          // elements == we will keep offset from previous node                   
                          if (tmpParentNode !== lastNodeParent)  {                               
                              aFragments.push ({fragmentPath: fragmentPath, fragmentOffset: fragmentOffset, fragmentLength: fragmentLength, fragmentText: fragmentText});
                              fragmentOffset = 0;
                              fragmentLength = 0;
                              fragmentText = "";
                              fragmentPath = null;                                         
                          
                          }
                 
                               
                          
                          lastNodeParent = tmpParentNode;
                          node = iterator.nextNode();
                       }
                       // skip all CLASS_ANNOTATION elements
                       else if (AEd.ElU.hasClass(node, AEd.CONFIG.CLASS_ANNOTATION)) { 
                          node = iterator.nextNode();
                       } 
                       else {
                          aFragments.push ({fragmentPath: fragmentPath, fragmentOffset: fragmentOffset, fragmentLength: fragmentLength, fragmentText: fragmentText});
                          fragmentOffset = 0;
                          fragmentLength = 0;
                          fragmentText = "";
                          fragmentPath = null; 
                          node = iterator.nextNode();
                       }           
                    }
                    
                    // -------------------------------------------------------------
                    // END NODE 
                 
                 }     
        
              }
              catch (e) {
                 throw new Error(AEd.I18n.t("Error_AEd_entities_Annotations_CreateNodeIterator_error_Your_browser_does_not_support_the_createNodeIterator_method") );
              }
         
         }
         
         if (removeWhiteSpaceFragments) {
            var i = 0;
            while (i < aFragments.length) {
                var tmpText = aFragments[i].fragmentText;
                if (AEd.Cleanup.trim(tmpText) == "") {
                    aFragments.splice(i, 1);
                }
                else {
                    i++;
                }            
            }
         }
         

         return aFragments;
    
    }

    /*
     * @name addXPathIndexes
     * @memberOf AEd.utils.FragmentsUtils
     * @function   
     * @param {String} xpath        
     * @return {String} xpath with indexes.    
     *  	
     */

    t.addXPathIndexes = function(xpath){

        // Transforms xpath from /html/body/p[2]/text() to  /html[1]/body[1]/p[2]/text()[1]

        var segments = xpath.split("/");   // Split xpath

        for (var i = 1; i < segments.length; i++){

            if (!segments[i].match(/\[\d+\]$/)){  // Add missing indexes
 
               segments[i] = segments[i] + "[1]";
            }

            if (i < segments.length - 1){   // Add "/" separator

               segments[i] = segments[i] + "/";
            }
        }

        
       return (("/" + segments.join().toString()).replace(/\,/g, ""));  // Join and replace "," - split method separator
    }


    /*
     * @name mergeFragments
     * @memberOf AEd.utils.FragmentsUtils
     * @function   
     * @param {Array} array of fragments.        
     * @return {Array} array of merged fragments.    
     *  	
     */

    t.mergeFragments = function(oFragments) {

       for (var i = 0; i < oFragments.length; i++){     // Loops through fragments

           for (var j = i + 1; j < oFragments.length; j++){

               if (this.addXPathIndexes(oFragments[i].fragmentPath) == this.addXPathIndexes(oFragments[j].fragmentPath)){  // Splitted fragments found - megre them

                  oFragments[i].fragmentLength = oFragments[i].fragmentLength + oFragments[j].fragmentLength;
                  oFragments[i].fragmentText = oFragments[i].fragmentText + oFragments[j].fragmentTexth;
                  oFragments.splice(j, 1);
               }
           }
       }

       return oFragments;
    } 



    
    // *************************************************************************
    // FragmentsUtils PRIVATE methods
    // *************************************************************************  
        
        
    
        
    // *************************************************************************
    // return
    // *************************************************************************               

    
    return t; 

})();



// *****************************************************************************
// class AEd.utils.FragmentsUtils 
// ***************************************************************************** 



// shorten name
AEd.Fragments = AEd.utils.FragmentsUtils;

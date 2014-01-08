/**
 * Cleanup.js
 *
 * Contains AEd.utils.Cleanup class definition.
 *  
 * @author: Martin Kleban 
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.utils.Cleanup 
// ***************************************************************************** 


     
/**
 * Cleanup class provides useful methods for working with wysiwyg editor content. 
 *       
 * @name Cleanup
 * @memberOf AEd.utils        
 * @class 
 * @static 
 *      
 */
AEd.utils.Cleanup = (function() {
        

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
    // Cleanup public properties
    // *************************************************************************               
        

 
    // *************************************************************************
    // Cleanup events
    // ************************************************************************* 
 



    // *************************************************************************
    // Cleanup PUBLIC methods
    // *************************************************************************  
        
        
    // ---------------------------------------- cleanAnnotationsFromHTMLContent 
    /**
     * Cleans all inserted annotation elements from htmlContent argument.    
     *               
     * @name cleanAnnotationsFromHTMLContent
     * @memberOf AEd.utils.Cleanup  
     * @function            
     * @public           
     * @param {String} htmlContent Input HTML content to be cleaned.	
     * @return {String} Cleaned HTML content or null.   
     */
    t.cleanAnnotationsFromHTMLContent = function(htmlContent) { 
               
        if (htmlContent) {
            var elContent = document.createElement("div");
            var elCleanedContent = document.createElement("div");
            
            elContent.innerHTML = htmlContent;
            
           (function() {
               if (arguments.length > 1) {
                  var elFrom = arguments[0];
                  var elTo = arguments[1];              
                  for (var i = 0; i < elFrom.childNodes.length; i++) {                            
                     if (AEd.ElU.hasClass(elFrom.childNodes[i], AEd.CONFIG.CLASS_ANNOTATION)) {
                        arguments.callee(elFrom.childNodes[i], elTo);
                     }
                     else {
                        var elClone = elFrom.childNodes[i].cloneNode(false);
                        elTo.appendChild(elClone);
                        arguments.callee(elFrom.childNodes[i], elClone);
                     }
                  }
    
               }     
            } )(elContent, elCleanedContent);
            
            return elCleanedContent.innerHTML;
        }
        else {
            return null;
        }
    }



    // ------------------------------------------------------------------- trim 
    /**
     * Cleans all white spaces from left and right of specfified string.    
     *               
     * @name trim
     * @memberOf AEd.utils.Cleanup  
     * @function            
     * @public           
     * @param {String} str String to be cleaned.	
     * @return {String} Cleaned string.   
     */
    t.trim = function(str) { 
        return str.replace(/^\s*/, "").replace(/\s*$/, "");
    }
    
    // *************************************************************************
    // Cleanup PRIVATE methods
    // *************************************************************************  
        
        
    
        
    // *************************************************************************
    // return
    // *************************************************************************               

    
    return t; 

})();



// *****************************************************************************
// class AEd.utils.Cleanup 
// ***************************************************************************** 



// shorten name
AEd.Cleanup = AEd.utils.Cleanup;
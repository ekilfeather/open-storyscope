/**
 * CSSLoader.js
 *
 * Contains AEd.dom.CSSLoader class definition.
 *  
 * @author: Martin Kleban 
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.dom.CSSLoader
// ***************************************************************************** 


     
/**
 * CSSLoader class is responsible for dynamic loading of external css files. 
 * 
 * @name CSSLoader
 * @memberOf AEd.dom        
 * @class 
 * @static       
 *      
 */
AEd.dom.CSSLoader = (function() {
        

    // *************************************************************************
    // variables
    // *************************************************************************   
    
    // object to return
    var t = {};        
        
    // *************************************************************************
    // CSSLoader public properties
    // *************************************************************************               
     
 
    // *************************************************************************
    // CSSLoader events
    // ************************************************************************* 
 
          
    // *************************************************************************
    // CSSLoader PUBLIC methods
    // *************************************************************************  
        
        
    // --------------------------------------------------------- CSSLoader.load 
    /**
     * Loads an external css files.
     *       
     * @name load
     * @memberOf AEd.dom.CSSLoader             
     * @function      
     * @public           
     * @param {String} path Path to external css file.	
     */
    t.load = function(path) {              
       var head = document.getElementsByTagName("head")[0];
       var link = document.createElement("link");
       link.setAttribute("rel", "stylesheet");
       link.setAttribute("type", "text/css");
       link.setAttribute("href", path);

       head.appendChild(link);
    }


    
    // *************************************************************************
    // CSSLoader PRIVATE methods
    // *************************************************************************  
        
  
        
        
        
    // *************************************************************************
    // return
    // *************************************************************************               
    
    return t; 

})();



// *****************************************************************************
// class AEd.dom.CSSLoader 
// ***************************************************************************** 



// shorten name
AEd.CSSLoader = AEd.dom.CSSLoader;
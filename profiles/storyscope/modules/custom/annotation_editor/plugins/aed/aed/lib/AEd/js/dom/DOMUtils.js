/**
 * DOMUtils.js
 *
 * Contains AEd.dom.DOMUtils class definition.
 *  
 * @author: Martin Kleban 
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.dom.DOMUtils
// ***************************************************************************** 


     
/**
 * DOMUtils class offers useful methods for working with document. 
 *
 * @name DOMUtils
 * @memberOf AEd.dom        
 * @class 
 * @static        
 *      
 */
AEd.dom.DOMUtils = (function() {
        

    // *************************************************************************
    // variables
    // *************************************************************************   
    
    // object to return
    var t = {};
 
        
        
    // *************************************************************************
    // DOMUtils public properties
    // *************************************************************************               
    


 
    // *************************************************************************
    // DOMUtils events
    // ************************************************************************* 
 


  
          
    // *************************************************************************
    // DOMUtils PUBLIC methods
    // *************************************************************************  
        

    // ------------------------------------------------ DOMUtils.getClientWidth
    /**
     * Returns client width value.
     *       
     * @name getClientWidth
     * @memberOf AEd.dom.DOMUtils             
     * @function      
     * @public           
     * @return {AEd.Editor} Client width value.  
     */    
    t.getClientWidth = function() {
       var width;
     
       if (typeof window.innerWidth != 'undefined') {
          
          // without scrollbar width 
          width = document.documentElement.clientWidth;
       }
       else if (typeof document.documentElement != 'undefined'
                && typeof document.documentElement.clientWidth != 'undefined' 
                && document.documentElement.clientWidth != 0) {
          width = document.documentElement.clientWidth;
       }  
       else {
          width = document.getElementsByTagName('body')[0].clientWidth;
       }
    
       return width;
    }
    
    // ----------------------------------------------- DOMUtils.getClientHeight
    /**
     * Returns client height value.
     *       
     * @name getClientHeight
     * @memberOf AEd.dom.DOMUtils             
     * @function      
     * @public           
     * @return {AEd.Editor} Client height value.  
     */        
    t.getClientHeight = function() {
       var height;
    
       if (typeof window.innerHeight != 'undefined') {
          
          // without scrollbar height
          height = document.documentElement.clientHeight;
       }
       else if (typeof document.documentElement != 'undefined'
                && typeof document.documentElement.clientHeight != 'undefined' 
                && document.documentElement.clientHeight != 0) {
          height = document.documentElement.clientHeight;
       }  
       else {
          height = document.getElementsByTagName('body')[0].clientHeight;
       }
    
       return height;
    }
    
    // ---------------------------------------------------- DOMUtils.getScrollX
    /**
     * Returns document offset scrolled from left.
     *       
     * @name getScrollX
     * @memberOf AEd.dom.DOMUtils             
     * @function         
     * @public
     * @param {Document} doc Document object
     * @param {Window} win Window object           
     * @return {AEd.Editor} Document offset scrolled from left.  
     */     
    t.getScrollX = function(doc, win) {
      var d = doc || document;
      var w = win || window;
    
      var scrollOfX = 0;
      if( typeof( w.pageXOffset ) == 'number' ) {
        scrollOfX = w.pageXOffset;
      } else if( d.body && ( d.body.scrollLeft || d.body.scrollTop ) ) {
        scrollOfX = d.body.scrollLeft;
      } else if( d.documentElement && ( d.documentElement.scrollLeft || d.documentElement.scrollTop ) ) {
        scrollOfX = d.documentElement.scrollLeft;
      }
      return scrollOfX;
    }
    
      
    
    // ---------------------------------------------------- DOMUtils.getScrollY
    /**
     * Returns document offset scrolled from top.
     *       
     * @name getScrollY
     * @memberOf AEd.dom.DOMUtils             
     * @function        
     * @public 
     * @param {Document} doc Document object
     * @param {Window} win Window object           
     * @return {AEd.Editor} Document offset scrolled from top.  
     */      
    t.getScrollY = function(doc, win) {
      var d = doc || document;
      var w = win || window;    
    
      var scrollOfY = 0;
      if( typeof( w.pageYOffset ) == 'number' ) {
        scrollOfY = w.pageYOffset;
      } else if( d.body && ( d.body.scrollLeft || d.body.scrollTop ) ) {
        scrollOfY = d.body.scrollTop;
      } else if( d.documentElement && ( d.documentElement.scrollLeft || d.documentElement.scrollTop ) ) {
        scrollOfY = d.documentElement.scrollTop;
      }
      return scrollOfY;
    }


    
    // *************************************************************************
    // DOMUtils PRIVATE methods
    // *************************************************************************  
        
        

        
        
        
    // *************************************************************************
    // return
    // *************************************************************************               

    
    return t; 

})();



// *****************************************************************************
// class AEd.dom.DOMUtils
// ***************************************************************************** 



// shorten name
AEd.DOM = AEd.dom.DOMUtils;

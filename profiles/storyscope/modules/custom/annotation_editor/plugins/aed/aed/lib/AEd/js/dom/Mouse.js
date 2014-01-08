/**
 * Mouse.js
 *
 * Contains AEd.dom.Mouse class definition.
 *  
 * @author: Martin Kleban 
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.dom.Mouse 
// ***************************************************************************** 


     
/**
 * Mouse class is a singleton with methods for working with mouse.
 *       
 * @name Mouse
 * @memberOf AEd.dom        
 * @class 
 * @static 
 *      
 */
AEd.dom.Mouse = (function() {
        

    // *************************************************************************
    // variables
    // *************************************************************************   
    
    // object to return
    var t = {};
   
       
    // *************************************************************************
    // Mouse public properties
    // *************************************************************************               



 
    // *************************************************************************
    // Mouse events
    // ************************************************************************* 
      

  
          
    // *************************************************************************
    // Mouse PUBLIC methods
    // *************************************************************************  
        

    
    // *************************************************************************
    // Mouse PRIVATE methods
    // *************************************************************************  
        
   // ------------------------------------------------------------ getAbsMouseX
   /**
     * Returns mouse X position relative to page.           
     *        
     * @name getAbsMouseX
     * @memberOf AEd.dom.Mouse             
     * @function      
     * @param {Event} event Event object. 
     * @param {Object} win Optional argument, window object.             
     * @return {Number} Mouse X position relative to page.            
     *          
     */     
   t.getAbsMouseX = function(event, win) {       
      var x = 0;
      var w = (typeof win != 'undefined' ? win : window);
      
      if (event.pageX) {
         x = event.pageX;
      }
      else if (event.clientX){
         x = event.clientX + w.document.body.scrollLeft + w.document.documentElement.scrollLeft;
      }
      return x;
   }  

   // ------------------------------------------------------------ getAbsMouseY
   /**
     * Returns mouse Y position relative to page.           
     *        
     * @name getAbsMouseY
     * @memberOf AEd.dom.Mouse             
     * @function          
     * @param {Event} event Event object. 
     * @return {Number} Mouse Y position relative to page.            
     *          
     */     
   t.getAbsMouseY = function(event) {       
      var y = 0;
      if (event.pageY) {
         x = event.pageY;
      }
      else if (event.clientY){
         x = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      return x;
   }     
        
        
        
    // *************************************************************************
    // return
    // *************************************************************************               
          
        
    return t; 

})();



// *****************************************************************************
// class AEd.dom.Mouse 
// ***************************************************************************** 



// shorten name
AEd.Mouse = AEd.dom.Mouse;

/**
 * Object.js
 *
 * Contains AEd.utils.Object class definition.
 *  
 * @author: Martin Kleban 
 * 
 */
 
 
  
// *****************************************************************************
// class AEd.utils.Object 
// ***************************************************************************** 


     
/**
 * Object class provides useful methods for working with javascript objects. 
 *       
 * @name Object
 * @memberOf AEd.utils        
 * @class 
 * @static 
 *      
 */
AEd.utils.Object = (function() {
        

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
    // Object public properties
    // *************************************************************************               
        

 
    // *************************************************************************
    // Object events
    // ************************************************************************* 
 



    // *************************************************************************
    // Object PUBLIC methods
    // *************************************************************************  
        
        
    // ------------------------------------------------------------------ clone 
    /**
     * Clones specified object    
     *               
     * @name clone
     * @memberOf AEd.utils.Object  
     * @function            
     * @public           
     * @param {Object} obj Object to clone.	
     * @return {Object} Cloned object.   
     */
    t.clone = function(obj) { 

        var clone = {};
        for(var i in obj) {
            clone[i] = obj[i];  
            if(typeof(obj[i])=="object")
                clone[i] = t.clone(obj[i]);
            else
                clone[i] = obj[i];
        }
        return clone;

    }


    
    // *************************************************************************
    // Object PRIVATE methods
    // *************************************************************************  
        
        
    
        
    // *************************************************************************
    // return
    // *************************************************************************               

    
    return t; 

})();



// *****************************************************************************
// class AEd.utils.Object 
// ***************************************************************************** 



// shorten name
AEd.Object = AEd.utils.Object;
/**                                                                             
 * plugins.js
 *
 * Configuration file for wysiwyg extensions implementing Annotations editor 
 * WYSIWYG API.
 * 
 * @author: Martin Kleban 
 * 
 */



AEd.wysiwyg.plugins = (function() {
    
    // object to return
    var t = {};
    
    t["tinymce"] = AEd.wysiwyg.TinyMCE;



    
// *****************************************************************************     
    return t;  
})();
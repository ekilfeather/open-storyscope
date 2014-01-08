/**
 * TinyMCE.js
 *
 * Contains AEd.wysiwyg.TinyMCE class definition. 
 *  
 * @authors: Martin Kleban, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.wysiwyg.TinyMCE
// *****************************************************************************  



/**
 * Class for TinyMCE.
 * 
 *
 * @name TinyMCE
 * @memberOf AEd.wysiwyg      
 * @class 	
 * @property {Object} editorNativeObject Native wysiwyg editor instance    	  
 */
AEd.wysiwyg.TinyMCE = function(editorNativeObject) {

    if (!editorNativeObject) {
        throw new Error(AEd.I18n.t("Error_AEd_wysiwyg_TinyMCE_Missing_editorNativeObject_argument"));
    }
    else {
        /**
         * Native wysiwyg editor instance. 
         *                                
         * @name editorNativeObject
         * @memberOf AEd.wysiwyg.TinyMCE
         * @type Object
         * @property                              
         */      
        this.editorNativeObject = editorNativeObject;

        // **********
        // EVENTS
        // **********
        this.onClick         = new AEd.utils.Dispatcher();           
        this.onNodeChange    = new AEd.utils.Dispatcher();         
        this.onMouseUp       = new AEd.utils.Dispatcher();             
        this.onMouseDown     = new AEd.utils.Dispatcher();        
        this.onDblClick      = new AEd.utils.Dispatcher();                         
        this.onKeyDown       = new AEd.utils.Dispatcher();           
        this.onKeyUp         = new AEd.utils.Dispatcher();                        
        this.onKeyPress      = new AEd.utils.Dispatcher(); 
        this.onSubmit        = new AEd.utils.Dispatcher();                     
        this.onReset         = new AEd.utils.Dispatcher();        
        this.onPaste         = new AEd.utils.Dispatcher();          
        this.onContentChange = new AEd.utils.Dispatcher();                    
        this.onUndo          = new AEd.utils.Dispatcher();           
        this.onRedo          = new AEd.utils.Dispatcher(); 
 
        // onClick
        this.editorNativeObject.onClick.add(function(ed, e) {
            this.onClick.fire();
        }, this);
        
        // onNodeChange
        this.editorNativeObject.onNodeChange.add(function(ed, cm, a){
             this.onNodeChange.fire();
        }, this);        
               
        // onMouseUp
        this.editorNativeObject.onMouseUp.add(function(ed, e) {
            this.onMouseUp.fire();
        }, this);
        
        // onMouseDown
        this.editorNativeObject.onMouseDown.add(function(ed, e) {
            this.onMouseDown.fire();
        }, this);

        // onDblClick
        this.editorNativeObject.onDblClick.add(function(ed, e) {
            this.onDblClick.fire();
        }, this);

        // onKeyDown
        this.editorNativeObject.onKeyDown.add(function(ed, e) {
            this.onKeyDown.fire();
        }, this);
        
        // onKeyUp
        this.editorNativeObject.onKeyUp.add(function(ed, e) {
            this.onKeyUp.fire();
        }, this);
        
        // onKeyPress
        this.editorNativeObject.onKeyPress.add(function(ed, e) {
            this.onKeyPress.fire();
        }, this);  
        
        // onSubmit
        this.editorNativeObject.onSubmit.add(function(ed, e) {
            this.onSubmit.fire();
        }, this);   
               
        // onReset
        this.editorNativeObject.onReset.add(function(ed, e) {
            this.onReset.fire();
        }, this);  
        
        // onPaste
        this.editorNativeObject.onPaste.add(function(ed, e) {
            this.onPaste.fire();
        }, this);  
        
        // onContentChange
        this.editorNativeObject.onChange.add(function(ed, level) {
            this.onContentChange.fire(level);
        }, this);  
        
        // onUndo
        this.editorNativeObject.onUndo.add(function(ed, level) {
            this.onUndo.fire();
        }, this);  
        
        // onRedo
        this.editorNativeObject.onRedo.add(function(ed, level) {
            this.onRedo.fire();
        }, this);                                              
    }
     
 
   
}

AEd.wysiwyg.TinyMCE.prototype.constructor = AEd.wysiwyg.TinyMCE;



// ****************************************************************************
// general methods
// ****************************************************************************


// ---------------------------------------------------------------- getDocument
/**
 * Gets the document element of editor instance.
 *  
 * @name getDocument
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @return {Element} Document element.  	
 */
AEd.wysiwyg.TinyMCE.prototype.getDocument = function() {
    var doc = this.editorNativeObject.getDoc();
    // In case of missing createTreeWalker method, copy reference from main document if present
    if (!doc.createTreeWalker && document.createTreeWalker) {
      doc.createTreeWalker = document.createTreeWalker;
    }

    return doc;
} 



// ------------------------------------------------------------------ getWindow
/**
 * Gets the window object of editor instance.
 *  
 * @name getWindow
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @return {Object} Window object.	
 */
AEd.wysiwyg.TinyMCE.prototype.getWindow = function() {
    return this.editorNativeObject.getWin(); 
} 



// --------------------------------------------------------- getReplacedElement
/**
 * Gets the element replaced by wysiwyg editor.
 *  
 * @name getReplacedElement
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @return {Element} Replaced element.
 */
AEd.wysiwyg.TinyMCE.prototype.getReplacedElement = function() {
    return this.editorNativeObject.getElement(); 
} 



// ----------------------------------------------------------- getIFrameElement
/**
 * Gets the iframe element.
 *  
 * @name getIFrameElement
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @return {Element} IFrame element.  	
 */
AEd.wysiwyg.TinyMCE.prototype.getIFrameElement = function() {
    var iframe = document.getElementById(this.editorNativeObject.id+"_ifr");
    
    return iframe; 
} 


// ****************************************************************************
// working with editors content
// ****************************************************************************



// ----------------------------------------------------------------- getContent
/**
 * Gets the content from the editor instance.
 *  
 * @name getContent
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @return {String} Editor instance content in HTML format.  	
 */
AEd.wysiwyg.TinyMCE.prototype.getContent = function() {
    return this.editorNativeObject.getContent();
} 



// ----------------------------------------------------------------- setContent
/**
 * Sets the content of the editor instance.
 *  
 * @name setContent
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @param {String} htmlContent New content in HTML format.	
 * @return {String} htmlContent New content in HTML format.  	
 */
AEd.wysiwyg.TinyMCE.prototype.setContent = function(htmlContent) {
    return this.editorNativeObject.setContent(htmlContent); 
} 



// ****************************************************************************
// working with selection
// ****************************************************************************



// -------------------------------------------------------- getSelectionContent
/**
 * Gets the content of the selection.
 *  
 * @name getSelectionContent
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @return {String} HTML content of current selection.	 	
 */
AEd.wysiwyg.TinyMCE.prototype.getSelectionContent = function() {
    return this.editorNativeObject.selection.getContent({format : 'text'}); 
} 



// ----------------------------------------------------------- getSelectionText
/**
 * Gets the text content of the selection.
 *  
 * @name getSelectionText
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @return {String} text content of current selection.	 	
 */
AEd.wysiwyg.TinyMCE.prototype.getSelectionText = function() {
    return this.editorNativeObject.selection.getContent({format : 'text'}); 
} 


// -------------------------------------------------------- setSelectionContent
/**
 * Sets the content of the selection.
 *  
 * @name setSelectionContent
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @param {String} htmlContent New HTML content of current selection.	 	
 * @return {String} New HTML content of current selection.	
 */
AEd.wysiwyg.TinyMCE.prototype.setSelectionContent = function(htmlContent) {
    
    this.editorNativeObject.selection.setContent(htmlContent);
    return htmlContent;    
} 



// --------------------------------------------------------- getSelectionObject
/**
 * Returns the browsers internal selection object.
 *  
 * @name getSelectionObject
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @return {Object} Browsers internal selection object.	 	
 */
AEd.wysiwyg.TinyMCE.prototype.getSelectionObject = function() {
    return this.editorNativeObject.selection.getSel(); 
} 



// ---------------------------------------------------------- getSelectionRange
/**
 * Returns the browsers internal range object.
 *  
 * @name getSelectionRange
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @return {Object} Browsers internal range object.	 	
 */
AEd.wysiwyg.TinyMCE.prototype.getSelectionRange = function() {
    return this.editorNativeObject.selection.getRng(); 
} 



// ---------------------------------------------------------- setSelectionRange
/**
 * Sets the selection due to browsers internal range object argument.
 *  
 * @name setSelectionRange
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @param {Object} range Browsers internal range object.	 	
 * @return {Object} Current browsers internal range object.	 
 */
AEd.wysiwyg.TinyMCE.prototype.setSelectionRange = function(range) {
    return this.editorNativeObject.selection.setRng(range); 
} 



// ----------------------------------------------------------- getSelectionNode
/**
 * Returns the currently selected element or the common ancestor element for 
 * both start and end of the selection.
 *  
 * @name getSelectionNode
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @return {Element} Currently selected element or the common ancestor element. 	
 */
AEd.wysiwyg.TinyMCE.prototype.getSelectionNode = function() {
    return this.editorNativeObject.selection.getNode(); 
} 



// ----------------------------------------------------------- setSelectionNode
/**
 * Sets selection to specified node
 *  
 * @name setSelectionNode
 * @memberOf AEd.wysiwyg.TinyMCE
 * @function
 * @param {Element} node Node. 	
 */
AEd.wysiwyg.TinyMCE.prototype.setSelectionNode = function(node) {

    this.editorNativeObject.selection.select(node); 
} 

// *****************************************************************************
// class AEd.wysiwyg.TinyMCE
// ***************************************************************************** 

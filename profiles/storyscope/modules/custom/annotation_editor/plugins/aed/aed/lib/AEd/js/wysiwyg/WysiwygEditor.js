/**
 * WysiwygEditor.js
 *
 * Contains AEd.wysiwyg.WysiwygEditor class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.wysiwyg.WysiwygEditor
// *****************************************************************************  



/**
 * Class for wysiwyg editors API.
 * 
 *
 * @name WysiwygEditor
 * @memberOf AEd.wysiwyg      
 * @class 
 * @property {String} editorType "tinymce" | "ckeditor" | ... 	
 * @property {Object} editorNativeObject Native wysiwyg editor instance    	  
 */
AEd.wysiwyg.WysiwygEditor = function(editorType, editorNativeObject) {
    

    if (!editorType) {
        throw new Error(AEd.I18n.t("Error_AEd_wysiwyg_WysiwygEditor_Missing_editorType_argument"));
    }      
    if (!editorNativeObject) {
        throw new Error(AEd.I18n.t("Error_AEd_wysiwyg_WysiwygEditor_Missing_editorNativeObject_argument"));
    }


    /**
      * Editor native object - added bacause of problems with caret (setSelectionContent : pluginInstance vs. editorNativeObject).
      *       
      * @name onClick
      * @memberOf AEd.wysiwyg.WysiwygEditor 
      * @property                             
      */     
 
    this.editorNativeObject = editorNativeObject;

    if (AEd.wysiwyg.plugins[editorType]) {
        /**
         * Instance of plugin, that implements the Wysiwyg editor interface. 
         * @example
         * this.pluginInstance = new AEd.wysiwyg.TinyMCE(editorNativeObject);
         *                                
         * @name pluginInstance
         * @memberOf AEd.wysiwyg.WysiwygEditor
         * @type Object
         * @property                              
         */         
        this.pluginInstance = new AEd.wysiwyg.plugins[editorType](editorNativeObject);
        if (this.pluginInstance) {              
                                              
           /**
            * Fires when something in the body of the editor is clicked.
            *       
            * @name onClick
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onClick = this.pluginInstance.onClick;             
          
          
          
           /**
            * Fires when the user changes node location using the mouse or keyboard.
            *       
            * @name onNodeChange
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onNodeChange = this.pluginInstance.onNodeChange;   
   
   
   
           /**
            * Fires when a mouseup event is intercepted inside the editor.
            *       
            * @name onMouseUp
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onMouseUp = this.pluginInstance.onMouseUp;        

       
       
           /**
            * Fires when a mousedown event is intercepted inside the editor.
            *       
            * @name onMouseDown
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onMouseDown = this.pluginInstance.onMouseDown;   
            
            
            
           /**
            * Fires when a double click event is intercepted inside the editor.
            *       
            * @name onDblClick
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onDblClick = this.pluginInstance.onDblClick;               
            
            
            
           /**
            * Fires when a keydown event is intercepted inside the editor.
            *       
            * @name onKeyDown
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onKeyDown = this.pluginInstance.onKeyDown;   
            
            
            
           /**
            * Fires when a keyup event is intercepted inside the editor.
            *       
            * @name onKeyUp
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onKeyUp = this.pluginInstance.onKeyUp;               
            
            
            
           /**
            * Fires when a keypress event is intercepted inside the editor.
            *       
            * @name onKeyPress
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onKeyPress = this.pluginInstance.onKeyPress;   
            
                  
                  
           /**
            * Fires when a submit event is intercepted.
            *       
            * @name onSubmit
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onSubmit = this.pluginInstance.onSubmit;               
            
            
            
           /**
            * Fires when a reset event is intercepted.
            *       
            * @name onReset
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onReset = this.pluginInstance.onReset;     
            
            
            
           /**
            * Fires when a paste event is intercepted.
            *       
            * @name onPaste
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onPaste = this.pluginInstance.onPaste;   
            
            
            
            /**
            * Fires when a new undo level is added to the editor.
            *       
            * @name onContentChange
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onContentChange = this.pluginInstance.onContentChange;              
            


            /**
            * Fires when the contents is undoed.
            *       
            * @name onUndo
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onUndo = this.pluginInstance.onUndo;               



           /**
            * Fires when the contents is redoed.
            *       
            * @name onRedo
            * @memberOf AEd.wysiwyg.WysiwygEditor 
            * @event                             
            */            
            this.onRedo = this.pluginInstance.onRedo; 
 
                                  
                            
       
       }
       else {
           throw new Error(AEd.I18n.t("Error_AEd_wysiwyg_WysiwygEditor_Couldnt_create_instance_of_wysiwyg_editor") + ": " + editorType);
       }         
    }
    else {
       throw new Error(AEd.I18n.t("Error_AEd_wysiwyg_WysiwygEditor_Wysiwyg_editor_not_supported") + ": " + editorType);
    }
    
}


AEd.wysiwyg.WysiwygEditor.prototype.constructor = AEd.wysiwyg.WysiwygEditor;

// ****************************************************************************
// general methods
// ****************************************************************************



// ---------------------------------------------------------------- getDocument
/**
 * Gets the document element of editor instance.
 *  
 * @name getDocument
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @return {Element} Document element.  	
 */
AEd.wysiwyg.WysiwygEditor.prototype.getDocument = function() {
    var doc = this.pluginInstance.getDocument();
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
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @return {Object} Window object.  	
 */
AEd.wysiwyg.WysiwygEditor.prototype.getWindow = function() {
    return this.pluginInstance.getWindow(); 
} 



// --------------------------------------------------------- getReplacedElement
/**
 * Gets the element replaced by wysiwyg editor.
 *  
 * @name getReplacedElement
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @return {Element} Replaced element.  	
 */
AEd.wysiwyg.WysiwygEditor.prototype.getReplacedElement = function() {
    return this.pluginInstance.getReplacedElement(); 
} 



// ----------------------------------------------------------- getIFrameElement
/**
 * Gets the iframe element.
 *  
 * @name getIFrameElement
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @return {Element} IFrame element.  	
 */
AEd.wysiwyg.WysiwygEditor.prototype.getIFrameElement = function() {
    return this.pluginInstance.getIFrameElement(); 
} 


// ****************************************************************************
// working with editors content
// ****************************************************************************



// ----------------------------------------------------------------- getContent
/**
 * Gets the content from the editor instance.
 *  
 * @name getContent
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @return {String} Editor instance content in HTML format.  	
 */
AEd.wysiwyg.WysiwygEditor.prototype.getContent = function() {
    return this.pluginInstance.getContent(); 
} 



// ---------------------------------------------------------- getOrigDocContent
/**
 * Gets the content from the editor instance, that is cleand up from 
 * annotation elements with AEd.CONFIG.CLASS_ANNOTATION class.
 *  
 * @name getOrigDocContent
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @return {String} Editor instance cleaned content in HTML format. 	
 */
AEd.wysiwyg.WysiwygEditor.prototype.getOrigDocContent = function() {
    return AEd.Cleanup.cleanAnnotationsFromHTMLContent(this.pluginInstance.getContent()); 
} 



// ----------------------------------------------------------------- setContent
/**
 * Sets the content of the editor instance.
 *  
 * @name setContent
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @param {String} htmlContent New content in HTML format.	
 * @return {String} htmlContent New content in HTML format.  	
 */
AEd.wysiwyg.WysiwygEditor.prototype.setContent = function(htmlContent) {
    return this.pluginInstance.setContent(htmlContent); 
} 




// ****************************************************************************
// working with selection
// ****************************************************************************



// -------------------------------------------------------- getSelectionContent
/**
 * Gets the content of the selection.
 *  
 * @name getSelectionContent
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @return {String} HTML content of current selection.	 	
 */
AEd.wysiwyg.WysiwygEditor.prototype.getSelectionContent = function() {
    return this.pluginInstance.getSelectionContent(); 
} 


// ----------------------------------------------------------- getSelectionText
/**
 * Gets the text content of the selection.
 *  
 * @name getSelectionText
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @return {String} Text content of current selection.	 	
 */
AEd.wysiwyg.WysiwygEditor.prototype.getSelectionText = function() {
    return this.pluginInstance.getSelectionText(); 
} 


// -------------------------------------------------------- setSelectionContent
/**
 * Sets the content of the selection.
 *  
 * @name setSelectionContent
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @param {String} htmlContent New HTML content of current selection.	 	
 * @return {String} New HTML content of current selection.	
 */
AEd.wysiwyg.WysiwygEditor.prototype.setSelectionContent = function(htmlContent) {
    return this.editorNativeObject.selection.setContent(htmlContent); 
} 



// --------------------------------------------------------- getSelectionObject
/**
 * Returns the browsers internal selection object.
 *  
 * @name getSelectionObject
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @return {Object} Browsers internal selection object.	 	
 */
AEd.wysiwyg.WysiwygEditor.prototype.getSelectionObject = function() {
    return this.pluginInstance.getSelectionObject(); 
} 



// ---------------------------------------------------------- getSelectionRange
/**
 * Returns the browsers internal range object.
 *  
 * @name getSelectionRange
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @return {Object} Browsers internal range object.	 	
 */
AEd.wysiwyg.WysiwygEditor.prototype.getSelectionRange = function() {
    return this.pluginInstance.getSelectionRange(); 
} 



// ---------------------------------------------------------- setSelectionRange
/**
 * Sets the selection due to browsers internal range object argument.
 *  
 * @name setSelectionRange
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @param {Object} range Browsers internal range object.	 	
 * @return {Object} Current browsers internal range object.	 
 */
AEd.wysiwyg.WysiwygEditor.prototype.setSelectionRange = function(range) {
    return this.pluginInstance.setSelectionRange(range); 
} 



// ----------------------------------------------------------- getSelectionNode
/**
 * Returns the currently selected element or the common ancestor element for 
 * both start and end of the selection.
 *  
 * @name getSelectionNode
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @return {Element} Currently selected element or the common ancestor element. 	
 */
AEd.wysiwyg.WysiwygEditor.prototype.getSelectionNode = function() {
    return this.pluginInstance.getSelectionNode(); 
} 



// ----------------------------------------------------------- setSelectionNode
/**
 * Sets selection to specified node
 *  
 * @name setSelectionNode
 * @memberOf AEd.wysiwyg.WysiwygEditor
 * @function
 * @param {Element} node Node. 	
 */
AEd.wysiwyg.WysiwygEditor.prototype.setSelectionNode = function(node) {
    return this.pluginInstance.setSelectionNode(node); 
} 

// *****************************************************************************
// class AEd.wysiwyg.WysiwygEditor
// ***************************************************************************** 

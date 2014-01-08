/**
 * Annotation.js
 *
 * Contains AEd.entities.Annotation class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.entities.Annotation
// *****************************************************************************  



/**
 * This class represents annotation entity.
 * 
 * @example
 * oParams {
 *     type : "nestedAnnotation" - Optional parameter
 *     name : (String) - Optional - Name of attribute if used as nested annotation 
 *       
 *     uri : "http://example.com/annotations/123456",
 *     typeUri : "http://example.com/type/annotation/task", 
 *     annoType : type object
 *       
 *     dateTime : "2011-01-01T:20:00:00Z",
 *     authorId : (String), 
 *     authorName : (String),
 *     authorAddress : (String),
 *     resourceUri : (String), 
 *     fragments : (Array),   
 *     attributes : (Array)                                                
 * }     
 *
 * @name Annotation
 * @memberOf AEd.entities      
 * @class 
 * @property {Object} oParams Annotation parameters.
 * @property {AEd.Entities.AnnotationsManager} annotationsManager object
 * @property {AEd.Entities.FragmentsManager} fragments object 
 * @property {AEd.Entities.EditorGUI} gui object
 * @property {AEd.Entities.AnnotationsManager} annotationManager
 * @property {Number} level level of the ui
 * @property {Array} annoLinkURIs array of annotation links uri strings 	
 * @property {Array} suggLinkTmpIds array of suggestions links tmpId strings 
 */
AEd.entities.Annotation = function(oParams, annotations, fragments, gui, annotationManager, level, annoLinkURIs, suggLinkTmpIds) {
    if (!oParams) {
        throw new Error(AEd.I18n.t("Error_AEd_entites_Annotation_Missing_params_object_argument"));
    }

    this.uri = oParams.uri; // "http://example.com/annotations/123456"     
    this.typeUri = oParams.typeUri; // "http://example.com/type/annotation/task"
    this.annoType = oParams.annoType; // Type object
    this.dateTime = oParams.dateTime; // "2011-01-01T:20:00:00Z"
    this.authorId = oParams.authorId; // (String)
    this.authorName = oParams.authorName; // (String)
    this.authorAddress = oParams.authorAddress; // (String)
    this.resourceUri = oParams.resourceUri; // (String)        
    this.fragments = oParams.fragments; // Array of fragments    
    this.content = oParams.content;
    this.badAnnotation = oParams.badAnnotation;
    this.badFragment = oParams.badFragment;    
    this.attributes = oParams.attributes; // Array of attributes   
    
    this.modeAnnotationLink = false;

    this.ui = new AEd.ui.Annotation({
        annoUiType: this.annoType.name,
        annoUiAuthor: this.authorName,
        annoUiDateTime: this.dateTime,
        annoUiContent: this.content,
        annoUiBadFragment: this.badFragment,
        annoUiAttributes: this.attributes       
    }, annotations, fragments, gui, annotationManager, level, annoLinkURIs, suggLinkTmpIds);
    
   this.ui.onMouseOver.addHandler(function() {
       if (this.modeAnnotationLink) {
          this.ui.addClass(AEd.CONFIG.CLASS_UI_ANNOTATION_MODE_ANNO_LINK_HOVER);       
       }   
   }, this);
   

   this.ui.onMouseOut.addHandler(function() {
       this.ui.removeClass(AEd.CONFIG.CLASS_UI_ANNOTATION_MODE_ANNO_LINK_HOVER);         
   }, this);   
}


AEd.entities.Annotation.prototype.constructor = AEd.entities.Annotation;


// -------------------------------------------------------------------- destroy
/**
 * Deletes all references to created objects to be garbage collected.
 *  
 * @name destroy
 * @memberOf AEd.editors.Annotation
 * @function
 *  	
 */
AEd.entities.Annotation.prototype.destroy = function() {

} 


// ------------------------------------------------------ setModeAnnotationLink
/**
 * Sets true/false - if annotation should be highlighted 
 * when user wants to select annotation to create annotation link attribute 
 *  
 * @name setModeAnnotationLink
 * @memberOf AEd.editors.Annotation
 * @function
 * @param {Boolean} value Boolean value - fragment is highlighted or not 
 *  	
 */
AEd.entities.Annotation.prototype.setModeAnnotationLink = function(value) {
    if (value) {
        this.modeAnnotationLink = true;
        this.ui.addClass(AEd.CONFIG.CLASS_UI_ANNOTATION_MODE_ANNO_LINK);
        this.ui.removeClass(AEd.CONFIG.CLASS_UI_ANNOTATION_MODE_ANNO_LINK_HOVER);
    }
    else {
        this.modeAnnotationLink = false;
        this.ui.removeClass(AEd.CONFIG.CLASS_UI_ANNOTATION_MODE_ANNO_LINK);    
        this.ui.removeClass(AEd.CONFIG.CLASS_UI_ANNOTATION_MODE_ANNO_LINK_HOVER);
    }
} 


// *****************************************************************************
// class AEd.entities.Annotation
// ***************************************************************************** 

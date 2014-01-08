/**
 * Suggestion.js
 *
 * Contains AEd.entities.Suggestion class definition. 
 *  
 * @authors: Petr Loukota, Milos Cudrak
 * 
 */
 

// *****************************************************************************
// class AEd.entities.Suggestion
// *****************************************************************************  



/**
 * This class represents suggestion entity.
 * 
 * @example
 * oParams {
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
 *     attributes : (Array),
 *     tmpId :  Number,
 *     confidence :  Number                                                  
 * }     
 *
 * @name Suggestion
 * @memberOf AEd.entities.Suggestion      
 * @class 
 * @property {Object} oParams Suggestion parameters. 
 * @property {AEd.Entities.SuggestionsManager} annotations object
 * @property {AEd.Entities.FragmentsManager} fragments object 
 * @property {AEd.Entities.EditorGUI} gui object
 * @property {AEd.Entities.SuggestionsManager} suggestionManager
 * @property {Number} level level of the ui
 * @property {Array} suggLinkTmpIds array of suggestions links tmpId strings
 * @property {Array} annoLinkURIs array of annotation links uri strings 	 	 	  
 */
AEd.entities.Suggestion = function(oParams, annotations, suggestions, fragments, gui, suggestionManager, level, suggLinkTmpIds, annoLinkURIs) {
    if (!oParams) {
        throw new Error(AEd.I18n.t("Error_AEd_entities_Suggestion_Missing_params_object_argument"));
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
    this.attributes = oParams.attributes; // Array of attributes
    this.tmpId = oParams.tmpId; // (Integer)
    this.confidence = oParams.confidence; // (Integer)
    this.parentTmpId = oParams.parentTmpId ? oParams.parentTmpId : ""; // (Integer)

    this.modeAnnotationLink = false;
    
    this.ui = new AEd.ui.Suggestion({
        suggUiType: this.annoType.name,
        suggUiAuthor: this.authorName,
        suggUiDateTime: this.dateTime,
        suggUiContent: this.content,
        suggUiAttributes: this.attributes,
        suggUiParentTmpId: this.parentTmpId       
    }, annotations, suggestions, fragments, gui, suggestionManager, level, suggLinkTmpIds, annoLinkURIs);
    
    this.ui.onMouseOver.addHandler(function() {
        if (this.modeAnnotationLink) {
            this.ui.addClass(AEd.CONFIG.CLASS_UI_ANNOTATION_MODE_ANNO_LINK_HOVER);       
        }   
    }, this);
    
   this.ui.onMouseOut.addHandler(function() {
       this.ui.removeClass(AEd.CONFIG.CLASS_UI_ANNOTATION_MODE_ANNO_LINK_HOVER);         
   }, this);   
}


AEd.entities.Suggestion.prototype.constructor = AEd.entities.Suggestion;


// -------------------------------------------------------------------- destroy
/**
 * Deletes all references to created objects to be garbage collected.
 *  
 * @name destroy
 * @memberOf AEd.editors.Suggestion
 * @function
 *  	
 */
AEd.entities.Suggestion.prototype.destroy = function() {

}


// ------------------------------------------------------ setModeAnnotationLink
/**
 * Sets true/false - if suggestion should be highlighted 
 * when user wants to select suggestion to create annotation link attribute 
 *  
 * @name setModeAnnotationLink
 * @memberOf AEd.editors.Suggestion
 * @function
 * @param {Boolean} value Boolean value - fragment is highlighted or not 
 *      
 */
AEd.entities.Suggestion.prototype.setModeAnnotationLink = function(value) {
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
// class AEd.entities.Suggestion
// ***************************************************************************** 

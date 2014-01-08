/**
 * AnnotationsManager.js
 *
 * Contains AEd.entities.AnnotationsManager class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak
 * 
 */
 

// *****************************************************************************
// class AEd.entities.AnnotationsManager
// *****************************************************************************  



/**
 * This class provides functionality for managing annotations.
 *      
 *
 * @name AnnotationsManager
 * @memberOf AEd.entities      
 * @class 
 * @param {AEd.editors.Editor} editor Instance of editor. 
 * @property {Array} annotations Collection of annotations. 	
 * @property {Object} annotationsByURI Object for searching annotations by URI. 	  
 */
AEd.entities.AnnotationsManager = function(editor) {
   if ( (editor) && (editor instanceof AEd.editors.Editor)) {
       this.editor = editor;
       this.fragmentsManager = editor.fragments;
       this.annotations = new Array();
       this.annotationsByURI = {};     
       this.onSelectedAnnotationLink = new AEd.utils.Dispatcher();
       this.onAddAnnotationFinished  = new AEd.utils.Dispatcher();
       this.modeAnnotationLink = false;
       this.nestedAnnotations = new Array();
       this.level = 0;
   }
   else {
       throw new Error(AEd.I18n.t("Error_AEd_entities_AnnotationsManager_Missing_argument"));
   } 
}


AEd.entities.AnnotationsManager.prototype.constructor = AEd.entities.AnnotationsManager;


// ------------------------------------------------------------- addAnnotations
/**
 * Creates annotations from specified array of annotation parameters received
 * from server. It is a handler to server message 
 * <annotations><add>  ... annotations params ...  </add></annotations>
 *  
 * @name addAnnotations
 * @memberOf AEd.entities.AnnotationsManager
 * @function
 * @param {Array} aAdd Array of annotation params objects crated by AEd.Protocol._parseServerMsgAnnotations() method.  
 *  	
 */
AEd.entities.AnnotationsManager.prototype.addAnnotations = function(aAdd) {

    if (aAdd) {

        var tmpAnnots = new Array(); // Array for mutual annotations        

        for (var i = 0; i < aAdd.length; i++) {

            if (aAdd[i].attributes){   // Annotation has attributes

               var tmp = jQuery.extend(true, {}, aAdd[i]);   // Save annotation (deep copy)
               tmpAnnots.push(tmp);

               for (var j = 0; j < aAdd[i].attributes.length; j++){  // Loops through attributes and removes annotationLinks

                   if (aAdd[i].attributes[j].type == "annotationLink"){  // Annotation has annotationLink attribute(s)

                      aAdd[i].attributes.splice(j, 1);
                   }
               }

               var tmp2 = jQuery.extend(true, {}, aAdd[i]);  // Create annotation without links
               this.createAnnotation(tmp2);
            }

            else {  // Annotation has no attributes

                if (!aAdd[i].created) {

                   var tmp = jQuery.extend(true, {}, aAdd[i]);
                   this.createAnnotation(tmp);
                   aAdd[i].created = true;
                }                  
            } 

        }

        this.onAddAnnotationFinished.fire();
        this.changeAnnotations(tmpAnnots);   // Add links to annotations
    }
} 



// ---------------------------------------------------------- changeAnnotations
/**
 * Updates annotations due to array of annotation parameters received
 * from server. It is a handler to server message 
 * <annotations><change>  ... annotations params ...  </change></annotations>
 *  
 * @name changeAnnotations
 * @memberOf AEd.entities.AnnotationsManager
 * @function
 * @param {Array} aChange Array of annotation params objects crated by AEd.Protocol._parseServerMsgAnnotations() method.  
 *  	
 */
AEd.entities.AnnotationsManager.prototype.changeAnnotations = function(aChange) {
    if (aChange) {
        for (var i = 0; i < aChange.length; i++) {
            var tmpAnno = this.getAnnotationByURI(aChange[i].uri);
            if (tmpAnno) {

                   this.destroyNestedAnnotations(tmpAnno);
                   this.destroyAnnotation(tmpAnno);

                   var tmp = jQuery.extend(true, {}, aChange[i]);

                   var newAnno = this.createAnnotation(tmp);
               
                   // search for annotation, that has this annotation as a nested 
                   // and replace reference to new annotation
                   for (var j = 0; j < this.annotations.length; j++) {
                       if (this.annotations[j].attributes && this.annotations[j].attributes.length) {
                            for (var a = 0; a < this.annotations[j].attributes.length; a++)  {
                                 if (this.annotations[j].attributes[a].type == "nestedAnnotation") {
                                       if (this.annotations[j].attributes[a].annotation.uri == newAnno.uri) {
                                             this.annotations[j].attributes[a].annotation = newAnno;
                                       }
                               }                                
                            }
                       
                      }
                   }  

                   if (aChange[i].attributes){   // Annotation contains attributes

                     for (var k = 0; k < aChange[i].attributes.length; k++){

                       if (aChange[i].attributes[k].type == "annotationLink" && aChange[i].attributes[k].value == aChange[i].uri){  // Annotation has self link
                          this.destroyAnnotation(newAnno); // destroy old annotation
                          this.createAnnotation(tmp);   // recreate annotation
                       }
                     }
                   }
            }
        }

    }
} 



// ---------------------------------------------------------- removeAnnotations
/**
 * Removes annotations due to array of annotation parameters received
 * from server. It is a handler to server message 
 * <annotations><remove>  ... annotations params ...  </remove></annotations>
 *  
 * @name removeAnnotations
 * @memberOf AEd.entities.AnnotationsManager
 * @function
 * @param {Array} aRemove Array of annotation params objects crated by AEd.Protocol._parseServerMsgAnnotations() method.  
 *  	
 */
AEd.entities.AnnotationsManager.prototype.removeAnnotations = function(aRemove) {
    if (aRemove) {
        for (var i = 0; i < aRemove.length; i++) {
            var tmpAnno = this.getAnnotationByURI(aRemove[i].uri);
            if (tmpAnno) {
                this.destroyAnnotation(tmpAnno);
            }
        }
    }
} 



// ----------------------------------------------------------- createAnnotation
/**
 * Creates an annotation and adds it to annotations array.
 * @example
 * oAnnoParams {
 *     uri : "http://example.com/annotations/123456",
 *     typeUri : "http://example.com/type/annotation/task", 
 *     dateTime : "2011-01-01T:20:00:00Z",
 *     authorId : (String), 
 *     authorName : (String),
 *     authorAddress : (String),
 *     resourceUri : (String), 
 *     fragments : (Array) 
 *        fragmentPath : XPath (String),  
 *        fragmentOffset : Number,
 *        fragmentLength : Number,
 *        fragmentText : (String), 
 *     content : (String),
 *     badFragment : (String),  
 *     attributes : (Array)   

 *     annoType       {AEd.entities.Types}                                         
 * } 
 *  
 * @name createAnnotation
 * @memberOf AEd.entities.AnnotationsManager
 * @function
 * @param {Object} oAnnoParams Annotation parameters object. 
 * @return {AEd.entities.Annotation} Annotation instance. 	
 */
AEd.entities.AnnotationsManager.prototype.createAnnotation = function(oAnnoParams) {
      if (oAnnoParams && this.editor.types.getTypeByURI(oAnnoParams.typeUri)) {
          
          oAnnoParams.annoType      = this.editor.types.getTypeByURI(oAnnoParams.typeUri);
 
          // Search for nested annotations to create them first and add them 
          // to this.annotations array      
          if (oAnnoParams.attributes) {
              for (var i = 0; i < oAnnoParams.attributes.length; i++) {
                  if (oAnnoParams.attributes[i].type == "nestedAnnotation") {  // Annotation has nestedAnnotation attribute
                      oAnnoParams.attributes[i].annotation = arguments.callee.call(this, oAnnoParams.attributes[i]);
                  }
                  else if (oAnnoParams.attributes[i].type == "annotationLink") {  // Annotaiton has link attribute
                      var a = this.getAnnotationByURI(oAnnoParams.attributes[i].value);
                      if (a) {   // Linked annotation exists
                          var t = this.editor.types.getTypeByURI(a.typeUri);
                          if (t) {
                              oAnnoParams.attributes[i].annoTypePath = t.path;
                          }
                          else {
                              oAnnoParams.attributes[i].annoTypePath = "";
                          }                      
                      }
                      else {   // Linked annotation does not exist
                          var oAttr = oAnnoParams.attributes[i];
                          this.onAddAnnotationFinished.addHandler(function(){
                              if (!oAttr.annoTypePath) {
                                    var a = this.getAnnotationByURI(oAttr.value);
                                    if (a) {
                                        var t = this.editor.types.getTypeByURI(a.typeUri);
                                        if (t) {
                                            oAttr.annoTypePath = t.path;
                                        }
                                        else {
                                            oAttr.annoTypePath = "";
                                        }                                    
                                    }
                                    else {
                                        oAttr.annoTypePath = "";
                                    }
                              }
                          }, this);
                      }
                  }
              }
          }
          
          this.level = 0;              
          var annotation = new AEd.entities.Annotation(oAnnoParams,
                                                       this.editor.annotations,
                                                       this.editor.fragments,
                                                       this.editor.gui,
                                                       this,
                                                       this.level);
     
          annotation.ui.onEdit.addHandler(function() {
              this.editAnnotation(annotation);
          }, this.editor);
        
          annotation.ui.onDelete.addHandler(function() {
              this.gui.showConfirm(AEd.I18n.t("Remove_annotation"), AEd.I18n.t("Do_you_really_want_to_remove_this_annotation"), "info",
                  function () {
                      this.sendRemoveAnnotation(annotation);
                  }, this
              );
          }, this.editor);  
                  
          annotation.ui.onClick.addHandler(function() {
              if (this.modeAnnotationLink) {
                  if (annotation.modeAnnotationLink) {
                      this.onSelectedAnnotationLink.fire(annotation);
                  }                          
              }
          }, this);
          
          annotation.ui.onShowNestedAnnotation.addHandler(function(uri) {
               var a = this.getAnnotationByURI(uri);
               if (a) {
                  if (a.isDocAnnotation) {
                      this.editor.gui.showMessage(AEd.I18n.t("Selected_annotation_is_document_annotation"), AEd.I18n.t("You_can_find_it_in_Document_Annotations_dialog"), "info");
                  }
                  else {
                      this.fragmentsManager.showNestedAnnotation(uri, annotation.uri); 
                  }    
               }        
          }, this);           
          
          annotation.nestedAnnotations = [];
          annotation.nestedAnnotations = this.nestedAnnotations;
          this.nestedAnnotations = [];                    
          this.annotations.push(annotation);
          this.annotationsByURI[annotation.uri] = annotation;
                             
          
          if (annotation.fragments && annotation.fragments.length && !annotation.badAnnotation) {
              annotation.ui.setAnnoUiBadFragment(""); // not all fragments are bad, do not display
                 
              this.fragmentsManager.createFragments(annotation); 
              this.editor.documentModification(); 
             
          }
          else { // document annotations or annotations with all bad fragments
            // Add to document annotations
            annotation.isDocAnnotation = true;
            this.editor.gui.dlgDocAnnotations.add(annotation.ui);
          }
          
          return annotation;     
      }
      else {
          return null;
      }
}



// --------------------------------------------------------- getAnnotationByURI
/**
 * Returns annotation with specified URI.
 *  
 * @name getAnnotationByURI
 * @memberOf AEd.entities.AnnotationsManager
 * @function
 * @param {String} sURI URI.  
 * @return {Object} Annotation with specified URI. 
 *  	
 */
AEd.entities.AnnotationsManager.prototype.getAnnotationByURI = function(sURI) {
    if (sURI) {
        return this.annotationsByURI[sURI];
    }
    else {
        return null;
    }
} 



// --------------------------------------------------- destroyNestedAnnotations
/**
 * Destroys all nested annotations of specified annotation
 *  
 * @name destroyNestedAnnotations
 * @memberOf AEd.entities.AnnotationsManager
 * @function
 * @param {AEd.entities.Annotation} oAnnotation Annotation instance.  
 *  	
 */
AEd.entities.AnnotationsManager.prototype.destroyNestedAnnotations = function(oAnnotation) {
    if (oAnnotation)  {    
          if (oAnnotation.attributes && oAnnotation.attributes.length) {
              for (var i = 0; i < oAnnotation.attributes.length; i++) {
              
                  if (oAnnotation.attributes[i].type == "nestedAnnotation") {
                      this.destroyNestedAnnotations(oAnnotation.attributes[i].annotation);
                      this.destroyAnnotation(oAnnotation.attributes[i].annotation);      
                  }
              }
          }  
    }
} 



// ---------------------------------------------------------- destroyAnnotation
/**
 * Removes annotation with specified URI.
 *  
 * @name destroyAnnotation
 * @memberOf AEd.entities.AnnotationsManager
 * @function   
 * @param {String | AEd.entities.Annotation} anno Annotation URI or AEd.entities.Annotation object.    
 *  	
 */
AEd.entities.AnnotationsManager.prototype.destroyAnnotation = function(anno) {
      var tmpAnnotation = null;
      
      if (anno instanceof AEd.entities.Annotation) {
          tmpAnnotation = anno;
      }
      else {
          tmpAnnotation = this.getAnnotationByURI[anno];
      }

      for (var i = 0 ; i < this.annotations.length; i++) {
         if (this.annotations[i] === tmpAnnotation) {
            this.annotations.splice(i, 1);
            break;
         }             
      }
      delete this.annotationsByURI[tmpAnnotation.uri];
      
      if (tmpAnnotation.isDocAnnotation) {
          this.editor.gui.dlgDocAnnotations.remove(tmpAnnotation.ui);
      }
      else {
          this.fragmentsManager.destroyFragments(tmpAnnotation);
      }
      
      tmpAnnotation.destroy();

      // Document normalization for IERange.js library
      if (AEd.isIE && AEd.IEversion < 9) // IE < 9
          this.editor.wysiwyg.getDocument().body.normalize();
}

// ---------------------------------------------------------- setModeAnnotationLink
/**
 * Enables editor mode for selectiong annotationLink.
 *  
 * @name setModeAnnotationLink
 * @memberOf AEd.entities.AnnotationsManager
 * @function   
 * @param {Boolean} value true for enable, false for disable.    
 * @param {String} typePath path of annotationLink type.
 * @return {Boolean} true if mode is enabled else false.	
 */

AEd.entities.AnnotationsManager.prototype.setModeAnnotationLink = function(value, typePath)
{
    // enabling mode for selecting annotation link  
    if (value)
    {
        var type = this.editor.types.getTypeByPath(typePath);
        if(type)
        {
            //this function returns all subtypes of given type
            var getAllSubtypes = function(types, typeUri)
            {
                var subtypes = types.getChildrenByURI(typeUri);
                var currentSubtypeChildren = [];
                for(var i = 0; i < subtypes.length; i++)
                {
                    var children = getAllSubtypes(types, subtypes[i].uri);
                    currentSubtypeChildren = currentSubtypeChildren.concat(children);
                }
                
                return subtypes.concat(currentSubtypeChildren);
            }
            
            this.editor.fragments.modeAnnotationLink = true;
            this.editor.fragments.annoLinkTypeUri = type.uri;
            
            var subtypes = getAllSubtypes(this.editor.types, type.uri);
            subtypes.push(type);
            var typeURIs = [];
            for(var i = 0; i < subtypes.length; i++)
                typeURIs.push(subtypes[i].uri);
            
            var aAnnotations = [];
            var aSuggestions = [];
            
            for(var i = 0; i < subtypes.length; i++)
            {
                //get all annotations of selected type
                var annotsOfType = this.getAnnotationsByType(subtypes[i].uri);
                aAnnotations = aAnnotations.concat(annotsOfType);
                
                //get all suggestions of selected type
                var suggsOfType = this.editor.suggestions.getSuggestionsByType(subtypes[i].uri);
                aSuggestions = aSuggestions.concat(suggsOfType);
            }
            
            //if there are any annotations or suggestions of selected type
            if (aAnnotations && aAnnotations.length > 0 || aSuggestions && aSuggestions.length > 0)
            {
                this.modeAnnotationLink = true;   
                this.editor.suggestions.modeAnnotationLink = true;
                
                //sets all annotations of selected type to annotation link mode so they can be highlighted
                for (var i = 0; i < aAnnotations.length; i++) {
                    aAnnotations[i].setModeAnnotationLink(true);
                }
                //sets all suggestions of selected type to annotation link mode so they can be highlighted
                for (var i = 0; i < aSuggestions.length; i++) {
                    aSuggestions[i].setModeAnnotationLink(true);
                }
            }
            else
            {
                this.editor.gui.showMessage(AEd.I18n.t("No_annotations"), AEd.I18n.t("There_are_no_annotations_with_specified_type"), "warning");
                return false;
            }  
            
            for(var i = 0; i < this.editor.fragments.fragments.length; i++)
            {
                var fragment = this.editor.fragments.fragments[i];
                
                var makeHighlighted = false;
                var annosWithThisTypeCount = 0;
                
                var annotations = fragment.getAssignedAnnotations();
                for(var j = 0; j < annotations.length; j++)
                {
                    //like: if(typeURIs.indexOf(annotations[j].typeUri) != -1) NOTE: this is IE < 9 support
                    for(var k = 0; k < typeURIs.length; k++)
                        if(typeURIs[k] == annotations[j].typeUri)
                        {
                            makeHighlighted = true;
                            annosWithThisTypeCount++;
                            break;
                        }
                }
                
                //highlight the fragment
                if (makeHighlighted)
                    fragment.setHighlight(true);
                
                //autoselect when only 1 annotation exists
                if (annosWithThisTypeCount == 1)
                    fragment.setModeAnnotationLink(true);
            }
        }
        //incorrect type selected
        else {
            this.editor.gui.showMessage(AEd.I18n.t("Specified_attribute_type_not_exists"), AEd.I18n.t("Please_select_existing_attribute_type"), "warning");
            return false;
        }
    }
    
    // disabling mode for selecting annotation link
    else {
       this.modeAnnotationLink = false;   
       this.editor.suggestions.modeAnnotationLink = false;
       for (var i = 0; i < this.annotations.length; i++) {
          this.annotations[i].setModeAnnotationLink(false);
       }
       
       var suggestions = this.editor.suggestions.suggestions;
       for (var i = 0; i < suggestions.length; i++) {
          suggestions[i].setModeAnnotationLink(false);
       }
       this.editor.fragments.setModeAnnotationLink(false);
    }
          
    return true;
}



// ------------------------------------------------------- getAnnotationsByType
/**
 * Returns array of annotations with specified type
 *  
 * @name getAnnotationsByType
 * @memberOf AEd.entities.AnnotationsManager
 * @function   
 * @param {String} typeUri Uri of annotations type.    
 * @return {Array} returnArray array of annotations with specified type 	
 */
AEd.entities.AnnotationsManager.prototype.getAnnotationsByType = function(typeUri) {

    var returnArray = new Array(); 
    if (typeUri) {         
        for (var i = 0; i < this.annotations.length; i++) {
            if (this.annotations[i].typeUri == typeUri) {
                returnArray.push(this.annotations[i]);
            }
        }
    }        
    return returnArray;
}



// ----------------------------------------------------------------- destroyAll
/**
 * Removes all annotations
 *  
 * @name destroyAll
 * @memberOf AEd.entities.AnnotationsManager
 * @function   
 *  	
 */
AEd.entities.AnnotationsManager.prototype.destroyAll = function() {

       while (this.annotations.length) {
           this.destroyAnnotation(this.annotations[0]);
       }

       this.annotations = new Array();
       this.annotationsByURI = {};     
       this.modeAnnotationLink = false;
}

// *****************************************************************************
// class AEd.entities.AnnotationsManager
// ***************************************************************************** 

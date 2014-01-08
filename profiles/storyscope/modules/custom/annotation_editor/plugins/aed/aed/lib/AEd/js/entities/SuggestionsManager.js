/**
 * SuggestionsManager.js
 *
 * Contains AEd.entities.SuggestionsManager class definition. 
 *  
 * @authors: Petr Loukota, Milos Cudrak
 * 
 */
 

// *****************************************************************************
// class AEd.entities.SuggestionsManager
// *****************************************************************************  



/**
 * This class provides functionality for managing suggestions.
 *      
 *
 * @name SuggestionsManager
 * @memberOf AEd.entities      
 * @class 
 * @param {AEd.editors.Editor} editor Instance of editor. 
 * @property {Array} suggestions Collection of suggestions. 	
 * @property {Object} suggestionsByTmpId Object for searching suggestions by tmpId. 	  
 */
AEd.entities.SuggestionsManager = function(editor) {
   if ( (editor) && (editor instanceof AEd.editors.Editor)) {
       this.editor = editor;
       this.fragmentsManager = editor.fragments;
       this.suggestions = new Array();
       this.suggestionsByTmpId = {};
       this.onAddSuggestionFinished  = new AEd.utils.Dispatcher();
       this.nestedSuggestions = new Array();
       this.modeAnnotationLink = false;
       this.onSelectedAnnotationLink = new AEd.utils.Dispatcher();
       this.level = 0;
   }
   else {
       throw new Error(AEd.I18n.t("Error_AEd_entities_SuggestionsManager_Missing_argument"));
   } 
}


AEd.entities.SuggestionsManager.prototype.constructor = AEd.entities.SuggestionsManager;


// ------------------------------------------------------------- addSuggestions
/**
 * Creates suggestions from specified array of suggestion parameters received
 * from server. It is a handler to server message.
 *  
 * @name addSuggestions
 * @memberOf AEd.entities.SuggestionsManager
 * @function
 * @param {Array} aAdd Array of suggestion params objects crated by AEd.Protocol._parseServerMsgSuggestions() method.  
 *  	
 */
AEd.entities.SuggestionsManager.prototype.addSuggestions = function(aAdd) {
    if (aAdd) {

        var tmpSuggestions = new Array();

        for (var i = 0; i < aAdd.length; i++) {
            
             if (aAdd[i].attributes){   // Suggestion has attributes

               var tmp = jQuery.extend(true, {}, aAdd[i]);   // Save suggestion (deep copy)
               tmpSuggestions.push(tmp);

               for (var j = 0; j < aAdd[i].attributes.length; j++){  // Loops through attributes and removes annotationLinks

                   if (aAdd[i].attributes[j].type == "annotationLink"){  // Suggestion has annotationLink attribute(s)

                      aAdd[i].attributes.splice(j, 1);
                   }
               }

               var tmp2 = jQuery.extend(true, {}, aAdd[i]);  // Create suggestion without links
               this.createSuggestion(tmp2);
            }

            else {  // Suggestion has no attributes

                if (!aAdd[i].created) {

                   var tmp = jQuery.extend(true, {}, aAdd[i]);
                   this.createSuggestion(tmp);
                   aAdd[i].created = true;
                }                  
            } 
        }
        this.fragmentsManager.setSuggestionsClass();
        this.onAddSuggestionFinished.fire();

        // Create suggestions with annotationLink attributes

        this.changeSuggestions(tmpSuggestions);

        this.fragmentsManager.setSuggestionsClass();
        this.onAddSuggestionFinished.fire();        
    }
}

// ---------------------------------------------------------- changeSuggestions
/**
 * Updates suggestions due to array of suggestion parameters
 *  
 * @name changeSuggestions
 * @memberOf AEd.entities.SuggestionsManager
 * @function
 * @param {Array} aChange Array of suggestion params objects.  
 *  	
 */
AEd.entities.SuggestionsManager.prototype.changeSuggestions = function(aChange) {
    if (aChange) {
        for (var i = 0; i < aChange.length; i++) {
            var tmpSugg = this.getSuggestionByTmpId(aChange[i].tmpId);
            if (tmpSugg) {

                   this.destroyNestedSuggestions(tmpSugg);
                   this.destroySuggestion(tmpSugg);

                   var tmp = jQuery.extend(true, {}, aChange[i]);

                   var newSugg = this.createSuggestion(tmp);
               
                   // search for suggestion, that has this suggestion as a nested 
                   // and replace reference to new suggestion
                   for (var j = 0; j < this.suggestions.length; j++) {
                       if (this.suggestions[j].attributes && this.suggestions[j].attributes.length) {
                            for (var a = 0; a < this.suggestions[j].attributes.length; a++)  {
                                 if (this.suggestions[j].attributes[a].type == "nestedAnnotation") {
                                       if (this.suggestions[j].attributes[a].annotation.tmpId == newSugg.tmpId) {
                                             this.suggestions[j].attributes[a].annotation = newSugg;
                                       }
                               }                                
                            }
                       
                      }
                   }  

                   if (aChange[i].attributes){   // Annotation contains attributes

                     for (var k = 0; k < aChange[i].attributes.length; k++){

                       if (aChange[i].attributes[k].type == "annotationLink" && aChange[i].attributes[k].tmpId == aChange[i].tmpId){  // Annotation has self link
                          this.destroySuggestion(newSugg);  // destroy old annotation
                          this.createSuggestion(tmp);   // recreate annotation
                       }
                     }
                   }
            }
        }

    }
} 



// ---------------------------------------------------------- removeSuggestions
/**
 * Removes suggestions due to array of suggestion parameters received
 * from server. It is a handler to server message.
 *  
 * @name removeSuggestions
 * @memberOf AEd.entities.SuggestionsManager
 * @function
 * @param {Array} aRemove Array of suggestion params objects crated by AEd.Protocol._parseServerMsgSuggestions() method.  
 *  	
 */
AEd.entities.SuggestionsManager.prototype.removeSuggestions = function(aRemove) {
    if (aRemove) {
        for (var i = 0; i < aRemove.length; i++) {
            var tmpSugg = this.getSuggestionByTmpId(aRemove[i].tmpId);
            if (tmpSugg) {
                this.destroySuggestion(tmpSugg);
            }
        }
        this.fragmentsManager.setSuggestionsClass();
    }
}



// ---------------------------------------------------------- updateSuggestedAnnotationDlg
/**
 * Updates suggestion in suggestedAnnotation dialog.
 *  
 * @name updateSuggestedAnnotationDlg
 * @memberOf AEd.entities.SuggestionsManager
 * @function  	
 */
AEd.entities.SuggestionsManager.prototype.updateSuggestedAnnotationDlg = function() {


    while (this.editor.gui.dlgSuggestedAnnotations.contentArea.items.length > 0) {
        this.editor.gui.dlgSuggestedAnnotations.remove(this.editor.gui.dlgSuggestedAnnotations.contentArea.items[0]);
    }
   
    var onAcceptFnc = function(i) {  // Accept suggestion
        suggestedAnnotations.ui.onAccept.addHandler(function() {
            this.suggestions[i].confirmed = "manually";
            this.confirmLinkedSuggestions(this.suggestions[i]);           
        }, this);
    };
    
    var onRefuseFnc = function(i) {  // Refuse suggestion
        suggestedAnnotations.ui.onRefuse.addHandler(function() {
            var refuseSuggestion = null;
            var settings = this.editor.settings.getSettings();
            for (var j in settings) {
                if (settings[j].name == "ClientRefuseSuggestion") {
                    refuseSuggestion = settings[j].value;
                    break;
                }
            }
            if (refuseSuggestion == "true") {
                this.editor.gui.showConfirm(AEd.I18n.t("Suggestion_entities_Refuse_suggestion"), AEd.I18n.t("Suggestion_entities_Do_you_really_want_to_refuse_this_suggestion"), "info",
                    function () {
                        var refuse = {
                            tmpId : this.suggestions[i].tmpId,
                            method : "manually"
                        }
                        this.editor.sendRefuseSuggestion([refuse]);
                    }, this
                );
            }
            else {
                var refuse = {
                    tmpId : this.suggestions[i].tmpId,
                    method : "manually"
                }
                this.editor.sendRefuseSuggestion([refuse]);
            }
        }, this);
    };
    
    var onEditFnc = function(i) {  // Edit suggestion
        suggestedAnnotations.ui.onEdit.addHandler(function() {            
            if (!this.suggestions[i].parentTmpId) {
              this.editor.editAnnotation(this.suggestions[i], true);
            }
            else {
                var sugg = {};
                sugg.parentTmpId = this.suggestions[i].parentTmpId;
                while (sugg.parentTmpId) {
                    sugg = this.getSuggestionByTmpId(sugg.parentTmpId);
                }
                this.editor.editAnnotation(sugg, true);
                  
                var findNestedSuggestion = function(parentSuggestion) {
                  for (var j in parentSuggestion.childTreeNodes) {
                    if (parentSuggestion.childTreeNodes[j].assignedObject.type == "nestedAnnotation") {
                        if (parentSuggestion.childTreeNodes[j].assignedObject.suggUiTmpId == this.suggestions[i].tmpId) {
                            this.editor.gui.dlgAnnotate.tree.setSelectedTreeNode(parentSuggestion.childTreeNodes[j]);
                            break;
                        }
                        findNestedSuggestion.call(this, parentSuggestion.childTreeNodes[j]);   
                    }
                  }
                }
                findNestedSuggestion.call(this, this.editor.gui.dlgAnnotate.treeNodeAnnotation);      
              }
        }, this);
    };

    for (var i = 0; i < this.suggestions.length; i++) {
        
        // do not add document suggestions to suggestedAnnotation dialog
        if (this.suggestions[i].isDocSuggestion) {
            continue;
        }
        
        this.level = 0;
        var suggestedAnnotations = new AEd.entities.Suggestion(this.suggestions[i].params,
                                                               this.editor.annotations,
                                                               this.editor.suggestions,
                                                               this.editor.fragments,
                                                               this.editor.gui,
                                                               this,
                                                               this.level);
        
        if (!suggestedAnnotations.parentTmpId) {
            onAcceptFnc.call(this, i);
          
            onRefuseFnc.call(this, i);
        }
        
        onEditFnc.call(this, i);
          
        suggestedAnnotations.ui.onShowNestedSuggestion.addHandler(function(tmpId) {
            var sugg = this.getSuggestionByTmpId(tmpId);
            if (sugg) {
                if (sugg.isDocSuggestion) {
                    this.editor.gui.showMessage(AEd.I18n.t("Selected_suggestion_is_document_suggestion"), AEd.I18n.t("You_can_find_it_in_Document_Suggestions_dialog"), "info");
                }
                else {
                    this.fragmentsManager.showNestedSuggestion(tmpId); 
                }    
            }           
        }, this);           
          
        suggestedAnnotations.ui.onShowAnnotationLink.addHandler(function(uri) {
            var a = this.editor.annotations.getAnnotationByURI(uri);
            if (a) {
                if (a.isDocAnnotation) {
                    this.editor.gui.showMessage(AEd.I18n.t("Selected_annotation_is_document_annotation"), AEd.I18n.t("You_can_find_it_in_Document_Annotations_dialog"), "info");
                }
                else {
                    this.fragmentsManager.showNestedAnnotation(uri); 
                }    
            }        
        }, this);  
          
        this.editor.gui.dlgSuggestedAnnotations.add(suggestedAnnotations.ui, suggestedAnnotations.tmpId);
    }
} 



// ----------------------------------------------------------- createSuggestion
/**
 * Creates a suggestion and adds it to suggestions array.
 * @example
 * oSuggParams {
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
 *     attributes : (Array),
 *     tmpId :  Number,
 *     confidence :  Number     
 *
 *     annoType       {AEd.entities.Types}                                         
 * } 
 *  
 * @name createAnnotation
 * @memberOf AEd.entities.SuggestionsManager
 * @function
 * @param {Object} oSuggParams Suggestion parameters object. 
 * @return {AEd.entities.Suggestion} Suggestion instance. 	
 */
AEd.entities.SuggestionsManager.prototype.createSuggestion = function(oSuggParams) {

      
      if (oSuggParams && this.editor.types.getTypeByURI(oSuggParams.typeUri)) {

          oSuggParams.annoType      = this.editor.types.getTypeByURI(oSuggParams.typeUri);
          
          // Search for nested suggestion to create them first and add them 
          // to this.suggestions array      
          if (oSuggParams.attributes) {          
              for (var i = 0; i < oSuggParams.attributes.length; i++) {
                  if (oSuggParams.attributes[i].type == "nestedAnnotation") {  // Suggestion has nestedAnnotation attribute
                      oSuggParams.attributes[i].parentTmpId = oSuggParams.tmpId;
                      oSuggParams.attributes[i].annotation = arguments.callee.call(this, oSuggParams.attributes[i]);
                  }
                  else if (oSuggParams.attributes[i].type == "annotationLink") { // Suggestion has annotationLink attribute
                      var a = this.editor.annotations.getAnnotationByURI(oSuggParams.attributes[i].value) || this.editor.suggestions.getSuggestionByTmpId(oSuggParams.attributes[i].tmpId);
                      if (a) {   // Linked annotation exists
                          var t = this.editor.types.getTypeByURI(a.typeUri);
                          if (t) {
                              oSuggParams.attributes[i].annoTypePath = t.path;
                          }
                          else {
                              oSuggParams.attributes[i].annoTypePath = "";
                          }                      
                      }
                      else { // Linked annotation does not exist
                          var oAttr = oSuggParams.attributes[i];
                          this.onAddSuggestionFinished.addHandler(function(){
                              if (!oAttr.annoTypePath) {
                                    var a = this.editor.annotations.getAnnotationByURI(oAttr.value) || this.editor.suggestions.getSuggestionByTmpId(oAttr.tmpId);
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
          var suggestion = new AEd.entities.Suggestion(oSuggParams,
                                                       this.editor.annotations,
                                                       this.editor.suggestions,
                                                       this.editor.fragments,
                                                       this.editor.gui,
                                                       this,
                                                       this.level);
          
          suggestion.ui.onClick.addHandler(function() {
              if (this.modeAnnotationLink) {
                  if (suggestion.modeAnnotationLink) {
                      this.onSelectedAnnotationLink.fire(suggestion);
                  }                          
              }
          }, this);
          
          suggestion.params = oSuggParams;
          
          if (!suggestion.parentTmpId) {
            suggestion.ui.onAccept.addHandler(function() {
                suggestion.confirmed = "manually";
                this.confirmLinkedSuggestions(suggestion);                
            }, this);
        
            suggestion.ui.onRefuse.addHandler(function() {
                var refuseSuggestion = null;
                var settings = this.settings.getSettings();
                for (var i in settings) {
                    if (settings[i].name == "ClientRefuseSuggestion") {
                        refuseSuggestion = settings[i].value;
                        break;
                    }
                }
                if (refuseSuggestion == "true") {
                        this.gui.showConfirm(AEd.I18n.t("Suggestion_entities_Refuse_suggestion"), AEd.I18n.t("Suggestion_entities_Do_you_really_want_to_refuse_this_suggestion"), "info",
                            function () {
                                var refuse = {
                                    tmpId : suggestion.tmpId,
                                    method : "manually"
                                }
                                this.sendRefuseSuggestion([refuse]);
                            }, this
                        );
                }
                else {
                    var refuse = {
                        tmpId : suggestion.tmpId,
                        method : "manually"
                    }       
                    this.sendRefuseSuggestion([refuse]);
                }
            }, this.editor);
          }
          
          suggestion.ui.onEdit.addHandler(function() {   // Suggestion edit handler
              if (!suggestion.parentTmpId) {
                  this.editor.editAnnotation(suggestion, true);
              }
              else {
                  var sugg = {};
                  sugg.parentTmpId = suggestion.parentTmpId;
                  while (sugg.parentTmpId) {
                    sugg = this.getSuggestionByTmpId(sugg.parentTmpId);
                  }
                  this.editor.editAnnotation(sugg, true);
                  
                  var findNestedSuggestion = function(parentSuggestion) {
                    for (var i in parentSuggestion.childTreeNodes) {
                        if (parentSuggestion.childTreeNodes[i].assignedObject.type == "nestedAnnotation") {
                            if (parentSuggestion.childTreeNodes[i].assignedObject.suggUiTmpId == suggestion.tmpId) {
                                this.editor.gui.dlgAnnotate.tree.setSelectedTreeNode(parentSuggestion.childTreeNodes[i]);
                                break;
                            }
                            findNestedSuggestion.call(this, parentSuggestion.childTreeNodes[i]);   
                        }
                    }
                  }
                  findNestedSuggestion.call(this, this.editor.gui.dlgAnnotate.treeNodeAnnotation);      
              }
          }, this); 
          
          suggestion.ui.onShowNestedSuggestion.addHandler(function(tmpId) {
               var sugg = this.getSuggestionByTmpId(tmpId);
               if (sugg) {
                  if (sugg.isDocSuggestion) {
                      this.editor.gui.showMessage(AEd.I18n.t("Selected_suggestion_is_document_suggestion"), AEd.I18n.t("You_can_find_it_in_Document_Suggestions_dialog"), "info");
                  }
                  else {
                      this.fragmentsManager.showNestedSuggestion(tmpId); 
                  }    
               }           
          }, this);
          
          suggestion.ui.onShowAnnotationLink.addHandler(function(uri) {
               var a = this.editor.annotations.getAnnotationByURI(uri);
               if (a) {
                  if (a.isDocAnnotation) {
                      this.editor.gui.showMessage(AEd.I18n.t("Selected_annotation_is_document_annotation"), AEd.I18n.t("You_can_find_it_in_Document_Annotations_dialog"), "info");
                  }
                  else {
                      this.fragmentsManager.showNestedAnnotation(uri); 
                  }    
               }        
          }, this);
          
          suggestion.nestedAnnotations = [];
          suggestion.nestedAnnotations = this.nestedSuggestions;
          this.nestedSuggestions = [];                    
          this.suggestions.push(suggestion);
          this.suggestionsByTmpId[suggestion.tmpId] = suggestion;
          
          if (suggestion.fragments && suggestion.fragments.length) {
              this.fragmentsManager.createFragments(suggestion); 
              this.editor.documentModification();
                     
          }
          else {
              // Add to document suggestions
              suggestion.isDocSuggestion = true;
              this.editor.gui.dlgDocSuggestions.add(suggestion.ui);
          }
          
          return suggestion;     
      }
      else {
          return null;
      }
} 



// --------------------------------------------------------- getSuggestionByTmpId
/**
 * Returns suggestion with specified tmpId.
 *  
 * @name getSuggestionByTmpId
 * @memberOf AEd.entities.SuggestionsManager
 * @function
 * @param {String} sTmpId TmpId.  
 * @return {Object} Suggestion with specified tmpId. 
 *  	
 */
AEd.entities.SuggestionsManager.prototype.getSuggestionByTmpId = function(sTmpId) {
    if (sTmpId) {
        return this.suggestionsByTmpId[sTmpId];
    }
    else {
        return null;
    }
} 



// --------------------------------------------------- confirmLinkedSuggestions
/**
 * Confirms all linked suggestions when suggestion is confirmed.
 *  
 * @name confirmLinkedSuggestions
 * @memberOf AEd.entities.SuggestionsManager
 * @function
 * @param {AEd.entities.Suggestion} oSuggestion Suggestion instance.
 * @param (Boolean) edit Says, if suggestion was confirmed after editing.   
 *  	
 */
AEd.entities.SuggestionsManager.prototype.confirmLinkedSuggestions = function(oSuggestion, edit) {
    
    //we put all suggestions into this array
    var suggestionsToSend = new Array();
    suggestionsToSend.push(oSuggestion);
    
    //this function puts all nested suggestions into suggestionsToSend array
    var attrs = function(suggestion) {
        //loop through all suggestions's attributes
        for (var i = 0; i < suggestion.attributes.length; i++) {
            //if the attribute's type is an annotation link

            if (suggestion.attributes[i].type == "annotationLink" || (suggestion.attributes[i].type == "nestedAnnotation") && ( this.editor.suggestions.getSuggestionByTmpId(suggestion.attributes[i].annotationLink) || this.editor.suggestions.getSuggestionByTmpId(suggestion.attributes[i].tmpId))) {
                //get linked suggestion
                var linked = this.editor.suggestions.getSuggestionByTmpId(suggestion.attributes[i].tmpId) || this.editor.suggestions.getSuggestionByTmpId(suggestion.attributes[i].annotationLink);
                
                //include it if exists
                if (linked) {
                    
                    var found = false;

                    for (var x = 0; x < suggestionsToSend.length; x++){   // Infinite loop prevention on mutual linking A<->B

                        if (suggestionsToSend[x].tmpId == linked.tmpId){

                           found = true;
                           break;
                        }
                    }

                    if (!found){

                      suggestionsToSend.push(linked);
                      attrs.call(this, linked);//process any nested suggestions       
                    }
                }
                // check list -- mustn't be empty
                if (suggestion.attributes[i].list && suggestion.attributes[i].list.length) {
                    //loop through all list items
                    for (var j = 0; j < suggestion.attributes[i].list.length; j++) {
                        var anotherLinked = this.editor.suggestions.getSuggestionByTmpId(suggestion.attributes[i].list[j].annotationLink);
                        if (anotherLinked) {
                            suggestionsToSend.push(anotherLinked);
                        }
                    }
                }
            }
        }
    }
    //put all nested suggestions into suggestionsToSend array
    attrs.call(this, oSuggestion);
    if (!edit) {
        this.editor.sendAcceptSuggestion(suggestionsToSend);
    }
    else {
        this.editor.sendAcceptEditedSuggestion(suggestionsToSend);
    }
}



// --------------------------------------------------- destroyNestedSuggestions
/**
 * Destroys all nested suggestions of specified suggestion
 *  
 * @name destroyNestedSuggestions
 * @memberOf AEd.entities.SuggestionsManager
 * @function
 * @param {AEd.entities.Suggestion} oSuggestion Suggestion instance.  
 *  	
 */
AEd.entities.SuggestionsManager.prototype.destroyNestedSuggestions = function(oSuggestion) {
    if (oSuggestion)  {    
          if (oSuggestion.attributes && oSuggestion.attributes.length) {
              for (var i = 0; i < oSuggestion.attributes.length; i++) {
              
                  if (oSuggestion.attributes[i].type == "nestedAnnotation") {
                      this.destroyNestedSuggestions(oSuggestion.attributes[i].annotation);
                      this.destroySuggestion(oSuggestion.attributes[i].annotation);      
                  }
              }
          }  
    }
} 



// ---------------------------------------------------------- destroySuggestion
/**
 * Removes suggestion with specified tmpId.
 *  
 * @name destroySuggestion
 * @memberOf AEd.entities.SuggestionsManager
 * @function   
 * @param {String | AEd.entities.Suggestion} sugg Suggestion tmpId or AEd.entities.Suggestion object.    
 *  	
 */
AEd.entities.SuggestionsManager.prototype.destroySuggestion = function(sugg) {
      var tmpSuggestion = null;
      
      if (sugg instanceof AEd.entities.Suggestion) {
          tmpSuggestion = sugg;
      }
      else {
          tmpSuggestion = this.getSuggestionByTmpId[sugg];
      }

      for (var i = 0 ; i < this.suggestions.length; i++) {
         if (this.suggestions[i] === tmpSuggestion) {
            this.suggestions.splice(i, 1);
            break;
         }             
      }
      this.destroyNestedSuggestions(tmpSuggestion);
      delete this.suggestionsByTmpId[tmpSuggestion.tmpId];
      
      if (tmpSuggestion.isDocSuggestion) {
          this.editor.gui.dlgDocSuggestions.remove(tmpSuggestion.ui);
      }
      else {
          this.fragmentsManager.destroyFragments(tmpSuggestion);
      }
      
      tmpSuggestion.destroy();

      // Document normalization for IERange.js library
      if (AEd.isIE && AEd.IEversion < 9) // IE < 9
          this.editor.wysiwyg.getDocument().body.normalize();
}



// ------------------------------------------------------- getSuggestionsByType
/**
 * Returns array of suggestions with specified type
 *  
 * @name getAnnotationsByType
 * @memberOf AEd.entities.SuggestionsManager
 * @function   
 * @param {String} typeUri Uri of annotations type.    
 * @return {Array} returnArray array of suggestions	
 */
AEd.entities.SuggestionsManager.prototype.getSuggestionsByType = function(typeUri) {

    var returnArray = new Array(); 
    if (typeUri) {         
        for (var i = 0; i < this.suggestions.length; i++) {
            if (this.suggestions[i].typeUri == typeUri) {
                returnArray.push(this.suggestions[i]);
            }
        }
    }        
    return returnArray;
}



// ----------------------------------------------------------------- destroyAll
/**
 * Removes all suggestions
 *  
 * @name destroyAll
 * @memberOf AEd.entities.SuggestionsManager
 * @function   
 *  	
 */
AEd.entities.SuggestionsManager.prototype.destroyAll = function() {

       while (this.suggestions.length) {
           this.destroySuggestion(this.suggestions[0]);
       }

       this.suggestions = new Array();
       this.suggestionsByTmpId = {};
}



// *****************************************************************************
// class AEd.entities.SuggestionsManager
// ***************************************************************************** 

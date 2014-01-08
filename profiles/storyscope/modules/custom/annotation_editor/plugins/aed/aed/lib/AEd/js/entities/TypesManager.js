/**
 * TypesManager.js
 *
 * Contains AEd.entities.TypesManager class definition. 
 *  
 * @author: Martin Kleban, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.entities.TypesManager
// *****************************************************************************  



/**
 * This class provides functionality for managing types.
 *      
 *
 * @name TypesManager
 * @memberOf AEd.entities      
 * @class 
 * @param {AEd.editors.Editor} editor Instance of editor. 
 * @property {Array} types Collection of types. 	
 * @property {Object} typesByURI Object for searching types by URI. 	  
 */
AEd.entities.TypesManager = function(editor) {
   if ( (editor) && (editor instanceof AEd.editors.Editor)) {
       this.editor = editor;
       this.types = new Array();
       this.typesByURI = {};  
       this.typesByPath = {};    
   }
   else {
       throw new Error(AEd.I18n.t("Error_AEd_entities_TypesManager_Missing_argument"));
   } 
}


AEd.entities.TypesManager.prototype.constructor = AEd.entities.TypesManager;


// ------------------------------------------------------------------- addTypes
/**
 * Creates types from specified array of type parameters received
 * from server. It is a handler to server message 
 * <types><add>  ... types params ...  </add></types>
 *  
 * @name addTypes
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {Array} aAdd Array of type params objects crated by AEd.Protocol._parseServerMsgTypes() method.  
 *  	
 */
AEd.entities.TypesManager.prototype.addTypes = function(aAdd) {
    if (aAdd) {
        for (var i = 0; i < aAdd.length; i++) {
            this.createType(aAdd[i]);
        }
        // DO POSTPROCESSING 
        // find paths for types "type -> subtype ..."
        // find farent objects
        var done = false;
        
        while(!done) {
            done = true;
            for (var i = 0; i < this.types.length; i++) {

                if (this.types[i].doPostprocessing) {
                    done = false;
                    // type with ancestor
                    if (this.types[i].ancestor) {
                        var tmpParent = this.getTypeByURI(this.types[i].ancestor);
                        if (tmpParent && !tmpParent.doPostprocessing) {
                        
                            this.types[i].parent = tmpParent;
                            this.types[i].path = tmpParent.path + "->" + this.types[i].name;
                     
                            this.typesByPath[this.types[i].path] = this.types[i];
                            this.types[i].doPostprocessing = false;
                        }                            
                        
                    }
                    // type without ancestor
                    else {
                        this.typesByPath[this.types[i].path] = this.types[i];
                        this.types[i].doPostprocessing = false;
                    }                  
                    
                }              
            }       
        }      
    }
   
} 



// ---------------------------------------------------------------- changeTypes
/**
 * Updates types due to array of type parameters received
 * from server. It is a handler to server message 
 * <types><change>  ... types params ...  </change></types>
 *  
 * @name changeTypes
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {Array} aChange Array of type params objects crated by AEd.Protocol._parseServerMsgTypes() method.  
 *  	
 */
AEd.entities.TypesManager.prototype.changeTypes = function(aChange) {
    if (aChange) {
        for (var i = 0; i < aChange.length; i++) {
            var tmpType = this.getTypeByURI(aChange[i].uri);
            if (tmpType) {
                // backup child types
                var childTypes = this.getChildrenByURI(tmpType.uri);

                this.destroyType(tmpType);
                this.createType(aChange[i]);

                // set children parent object to the newly created
                for (var j = 0; j < childTypes.length; j++) {
                  childTypes[j].parent = aChange[i];
                }
            }
        }
        
        // DO POSTPROCESSING 
        // find paths for types "type -> subtype ..."
        // find parent objects
        var done = false;
        
        while(!done) {
            done = true;
            for (var i = 0; i < this.types.length; i++) {

                if (this.types[i].doPostprocessing) {
                    done = false;
                    // type with ancestor
                    if (this.types[i].ancestor) {
                        var tmpParent = this.getTypeByURI(this.types[i].ancestor);
                        if (tmpParent && !tmpParent.doPostprocessing) {
                        
                            this.types[i].parent = tmpParent;
                            this.types[i].path = tmpParent.path + "->" + this.types[i].name;
                     
                            this.typesByPath[this.types[i].path] = this.types[i];
                            this.types[i].doPostprocessing = false;
                        }                            
                        
                    }
                    // type without ancestor
                    else {
                        this.typesByPath[this.types[i].path] = this.types[i];
                        this.types[i].doPostprocessing = false;
                    }                  
                    
                }              
            }       
        }                 
    }
} 



// ---------------------------------------------------------------- removeTypes
/**
 * Removes types due to array of type parameters received
 * from server. It is a handler to server message 
 * <types><remove>  ... types params ...  </remove></types>
 *  
 * @name removeTypes
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {Array} aRemove Array of type params objects crated by AEd.Protocol._parseServerMsgTypes() method.  
 *  	
 */
AEd.entities.TypesManager.prototype.removeTypes = function(aRemove) {
    if (aRemove) {
        for (var i = 0; i < aRemove.length; i++) {
            var tmpType = this.getTypeByURI(aRemove[i].uri);
            if (tmpType) {
                this.destroyType(tmpType);
            }
        }
    }
} 



// ----------------------------------------------------------------- createType
/**
 * Creates an annotation type and adds it to types array.
 * @example
 *
 *  oType {
 *     name : (String),   
 *     ancestor : (String),                
 *     uri : (String), 
 *     group : (String), 
 *     attributes : Array of oAttribute,
 *      
 *     children : Array of oType,
 *     parent: object,
 *     path: Type > Subtype ... 
 *     color: "#ffffff"                 
 *  }  
 *  
 *  oAttribute {
 *     name : (String),   
 *     type : (String),                
 *     required : (String)
 *  }  
 *    
 *  
 * @name createType
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {Object} oTypeParams oType parameters object. 	
 */
AEd.entities.TypesManager.prototype.createType = function(oTypeParams) {      
      if (oTypeParams) {
          // type not exist yet
          if (!this.getTypeByURI(oTypeParams.uri)) {
              oTypeParams.children = new Array();
              oTypeParams.parent = null;
              oTypeParams.path = oTypeParams.name;
              oTypeParams.color = AEd.CONFIG.DEFAULT_TYPE_COLOR;
              oTypeParams.colorParentDistance = "none";
              oTypeParams.doPostprocessing = true;
              this.types.push(oTypeParams);   
              this.typesByURI[oTypeParams.uri] = oTypeParams;                           
          }             
      }
} 



// --------------------------------------------------------------- getTypeByURI
/**
 * Returns type with specified URI.
 *  
 * @name getTypeByURI
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {String} sURI URI.  
 * @return {Object} Type with specified URI. 
 *  	
 */
AEd.entities.TypesManager.prototype.getTypeByURI = function(sURI) {
    if (sURI) {
        return this.typesByURI[sURI];
    }
    else {
        return null;
    }
} 



// --------------------------------------------------------------- getPathByURI
/**
 * Returns type path.
 *  
 * @name getPathByURI
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {String} sURI URI.  
 * @return {Object} Type path. 
 *  	
 */
AEd.entities.TypesManager.prototype.getPathByURI = function(sURI) {
    if (sURI) {
        var type = this.getTypeByURI(sURI);
        if (type) {
            return type.path;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
} 



// --------------------------------------------------------------- getNameByURI
/**
 * Returns type name.
 *  
 * @name getNameByURI
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {String} sURI URI.  
 * @return {Object} Type name. 
 *  	
 */
AEd.entities.TypesManager.prototype.getNameByURI = function(sURI) {
    if (sURI) {
        var type = this.getTypeByURI(sURI);
        if (type) {
            return type.name;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
} 



// -------------------------------------------------------------- getColorByURI
/**
 * Returns type color.
 *  
 * @name getColorByURI
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {String} sURI URI.  
 * @return {Object} Type color. 
 *  	
 */
AEd.entities.TypesManager.prototype.getColorByURI = function(sURI) {
    if (sURI) {
        var type = this.getTypeByURI(sURI);
        if (type) {
            return type.color;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
} 



// -------------------------------------------------------------- getTypeByPath
/**
 * Returns type with specified path.
 *  
 * @name getTypeByPath
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {String} sPath Path.  
 * @return {Object} Type with specified path. 
 *  	
 */
AEd.entities.TypesManager.prototype.getTypeByPath = function(sPath) {
    if (sPath) {
        return this.typesByPath[sPath];
    }
    else {
        return null;
    }
}



// -------------------------------------------------------------- getSimpleTypeByPath
/**
 * Returns simple type with specified path.
 *  
 * @name getSimpleTypeByPath
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {String} sPath Path.  
 * @return {Object} Simple type with specified path. 
 *  	
 */
AEd.entities.TypesManager.prototype.getSimpleTypeByPath = function(sPath) {
    var simpleTypesTree = this.getAttrTypesTree().childTreeNodes[0];
    for (var i = 0; i < simpleTypesTree.childTreeNodes.length; i++) {
        if (simpleTypesTree.childTreeNodes[i].assignedObject.path == sPath) {
            return simpleTypesTree.childTreeNodes[i].assignedObject;    
        }    
    }   
    return null;
}



// -------------------------------------------------------------- getSimpleTypes
/**
 * Returns simple types.
 *  
 * @name getSimpleTypes
 * @memberOf AEd.entities.TypesManager
 * @function
 * @return {AEd.ui.core.UITree} Created types tree  
 *  	
 */
AEd.entities.TypesManager.prototype.getSimpleTypes = function() {    
    var simpleTypesTree = this.getAttrTypesTree().childTreeNodes[0];  
    return simpleTypesTree;
} 



// --------------------------------------------------------------- getURIByPath
/**
 * Returns type uri.
 *  
 * @name getURIByPath
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {String} sPath Path.  
 * @return {String} Type uri with specified path.  
 *  	
 */
AEd.entities.TypesManager.prototype.getURIByPath = function(sPath) {
    if (sPath) {
        var type = this.getTypeByPath(sPath);
        if (type) {
            return type.uri;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
} 




// ----------------------------------------------------------- getChildrenByURI
/**
 * Returns array of child type object of specified type.
 *  
 * @name getChildrenByURI
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {String} sURI URI.  
 * @return {Array} Array of child types. 
 *  	
 */
AEd.entities.TypesManager.prototype.getChildrenByURI = function(sURI) {
    if (sURI) {
        var type = this.getTypeByURI(sURI);
        if (type) {
            var children = new Array();
            
            for (var i = 0; i < this.types.length; i++ ) {
                if (this.types[i].parent === type) {
                    children.push(this.types[i]);
                }
            }
            
            return children;                         
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
} 




// ---------------------------------------------------------------- destroyType
/**
 * Removes type.
 *  
 * @name destroyType
 * @memberOf AEd.entities.TypesManager
 * @function   
 * @param {String | Object} t Type URI or Type object.    
 *  	
 */
AEd.entities.TypesManager.prototype.destroyType = function(t) {
      var tmpType = null;
      
      // t is type object
      if (typeof t == "object") {
          tmpType = t;
      }
      // t is URI
      else if (typeof t == "string") {
          tmpType = this.getTypeByURI(t);
      }

      if (tmpType) {
          delete this.typesByURI[tmpType.uri];
          delete this.typesByPath[tmpType.path];
          
          for (var i = 0 ; i < this.types.length; i++) {
             if (this.types[i] === tmpType) {
                this.types.splice(i, 1);
                break;
             }             
          }
      }
     
} 



// ------------------------------------------------------------- removeAllTypes
/**
 * Removes all types
 *  
 * @name removeAllTypes
 * @memberOf AEd.entities.TypesManager
 * @function
 *  	
 */
AEd.entities.TypesManager.prototype.removeAllTypes = function() {   
        while (this.types.length) {
            this.destroyType(this.types[0]);
        }            
} 



// --------------------------------------------------------------- getTypesTree
/**
 * Retruns tree instance filled with types
 *  
 * @name getTypesTree
 * @memberOf AEd.entities.TypesManager
 * @function
 * @return {AEd.ui.core.UITree} Created types tree 
 *  	
 */
AEd.entities.TypesManager.prototype.getTypesTree = function(params) {   

      var tree;

      if (AEd.isAppleSafari && params && params.context){  // Safari support - context is needed

         tree = new AEd.ui.core.UITree({context: params.context});
      }

      else {

        tree = new AEd.ui.core.UITree();
      }
      
      var fnPopulateNodes = function (parentTreeNode, type) {
      
          var node;

          if (AEd.isAppleSafari && params && params.context){  // Safari support - context is needed

            node = new AEd.ui.core.UITreeNode({text: type.name, assignedObject: type, showSelection: true, context: params.context});
          }

          else {

            node = new AEd.ui.core.UITreeNode({text: type.name, assignedObject: type, showSelection: true});
          }

          parentTreeNode.addChild(node);         
            
          var children = this.getChildrenByURI(type.uri);
          
          if (children) {
             for (var j = 0; j < children.length; j++) {
                 arguments.callee.call(this, node, children[j]);
             }
          }
      };


      for (var i = 0; i < this.types.length; i++) {
         // only root nodes
         if (!this.types[i].parent) {
             fnPopulateNodes.call(this, tree, this.types[i]);
         }
      }
      
      return tree;    
} 



// ----------------------------------------------------------- getAttrTypesTree
/**
 * Retruns tree instance filled with types and simple types
 *  
 * @name getAttrTypesTree
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {Boolean} renderParam If tree show be rendered.  
 * @return {AEd.ui.core.UITree} Created types tree 
 *  	
 */
AEd.entities.TypesManager.prototype.getAttrTypesTree = function(renderParam) {   
    
      var render = typeof renderParam != 'undefined' ? renderParam : false;

      var tree = new AEd.ui.core.UITree({render: render});
      var nodeSimple     = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Simple"),     id: "simple",     assignedObject: {path: "Simple", name: "Simple", notAllowed: true}});  
      var nodeStructured = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Structured"), id: "structured", assignedObject: {path: "Structured", name: "Structured", notAllowed: true} });
      
      tree.addChild(nodeSimple);
      tree.addChild(nodeStructured);
      
      var fnPopulateNodes = function (parentTreeNode, type) {
      
          var node = new AEd.ui.core.UITreeNode({text: type.name, assignedObject: type, showSelection: true});
          parentTreeNode.addChild(node);         
            
          var children = this.getChildrenByURI(type.uri);
          
          if (children) {
          for (var j = 0; j < children.length; j++) {
             arguments.callee.call(this, node, children[j]);
          }
          }
      };  

      for (var i = 0; i < this.types.length; i++) {
         // only root nodes
         if (!this.types[i].parent) {
             fnPopulateNodes.call(this, nodeStructured, this.types[i]);
         }
      }
      
      // ADD Simple types
      var nodeInteger        = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Integer"),        id: "Integer",        assignedObject:{path: "Integer", name: "Integer", simpleType: true} });
      var nodeString         = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("String"),         id: "String",         assignedObject:{path: "String", name: "String", simpleType: true} });  
      var nodeTime           = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Time"),           id: "Time",           assignedObject:{path: "Time", name: "Time", simpleType: true} });
      var nodeDate           = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Date"),           id: "Date",           assignedObject:{path: "Date", name: "Date", simpleType: true} });
      var nodeDateTime       = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("DateTime"),       id: "DateTime",       assignedObject:{path: "DateTime", name: "DateTime", simpleType: true} });
      var nodeBoolean        = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Boolean"),        id: "Boolean",        assignedObject:{path: "Boolean", name: "Boolean", simpleType: true} });
      var nodeURI            = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("URI"),            id: "URI",            assignedObject:{path: "URI", name: "URI", simpleType: true} });   
      var nodeImage          = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Image"),          id: "Image",          assignedObject:{path: "Image", name: "Image", simpleType: true} });
      var nodeGeoPoint       = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("GeoPoint"),       id: "GeoPoint",       assignedObject:{path: "GeoPoint", name: "GeoPoint", simpleType: true} });
      var nodeDuration       = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Duration"),       id: "Duration",       assignedObject:{path: "Duration", name: "Duration", simpleType: true} });
      var nodeBinary       = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Binary"),       id: "Binary",       assignedObject:{path: "Binary", name: "Binary", simpleType: true} });
      var nodeText       = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Text"),       id: "Text",       assignedObject:{path: "Text", name: "Text", simpleType: true} });
      var nodeEntity        = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Entity"),       id: "Entity",       assignedObject:{path: "Entity", name: "Entity", simpleType: true} });
      nodeSimple.addChild(nodeInteger);
      nodeSimple.addChild(nodeString);
      nodeSimple.addChild(nodeText);
      nodeSimple.addChild(nodeTime);
      nodeSimple.addChild(nodeDate);
      nodeSimple.addChild(nodeDateTime);
      nodeSimple.addChild(nodeDuration);
      nodeSimple.addChild(nodeBoolean);
      nodeSimple.addChild(nodeURI);
      nodeSimple.addChild(nodeImage);
      nodeSimple.addChild(nodeGeoPoint);
      nodeSimple.addChild(nodeBinary);
      nodeSimple.addChild(nodeEntity);
      
      return tree;            
} 




// ------------------------------------------------- settingsRuleApplyTypeColor
/**
 * Handler to Rule-ClientAnnotationTypeColor settings rule
 *  
 * @name settingsRuleApplyTypeColor
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {Object} oSetting Setting object 	
 */
AEd.entities.TypesManager.prototype.settingsRuleApplyTypeColor = function(oSetting) {   
    
    var name = oSetting.name;

    var fnSetColorToTypesSubtree = function (type, color, parentDistance) {
      
          var change = false;
          
          if (typeof type.colorParentDistance == "string")  {
              change = true;
          }
          else {
              if (parentDistance < type.colorParentDistance){
                  change = true;
              }
          }
          if (change) {
              type.color = color;
              type.colorParentDistance = parentDistance;
              
              var children = this.getChildrenByURI(type.uri);                
              for (var j = 0; j < children.length; j++) {
                  arguments.callee.call(this, children[j], color, parentDistance + 1);
              }  
          }
    }; 
    
    if (name.match(new RegExp("^ClientAnnotationTypeColor"))) {
         name = name.replace("ClientAnnotationTypeColor", ""); 
         if (name.match(new RegExp("^:"))) {
             name = name.replace(":", ""); 
         }
    
         // setting name was like "ClientAnnotationTypeColor:type" or
         // "ClientAnnotationTypeColor:type->subtype->subtype2"
         // set new color to this type and all subtypes of this type 
         var type = null;
         if ((name) && (type = this.getTypeByPath(name)) ) {
             fnSetColorToTypesSubtree.call(this, type, oSetting.value, 0);
             // Fixes problem with newly added fragment with attribute color settings 
             var affectedAnnots = this.editor.annotations.getAnnotationsByType(type.uri);

             for (var i = 0; i < affectedAnnots.length; i++){  // Update the color of affected annotations

                 affectedAnnots[i].annoType = type;
             }
         }
         // no name => setting name was like "ClientAnnotationTypeColor"
         // or "ClientAnnotationTypeColor:" - this should take effect 
         // to all types
         else {
            for (var i = 0; i < this.types.length; i++) {
                if (this.types[i].colorParentDistance == "none") {
                    this.types[i].color = oSetting.value;
                    this.types[i].colorParentDistance = "none"; 

                    // Fixes : newly added fragment with attribute color settings 
                    var affectedAnnots = this.editor.annotations.getAnnotationsByType(this.types[i].uri);

                    for (var j = 0; j < affectedAnnots.length; j++){  // Update the color of affected annotations

                        affectedAnnots[j].annoType = this.types[i];
                    }               
                }
            } 
         }  
         
         // update fragments 
         this.editor.fragments.updateFragmentsColors();
         // update colors in attributes tree in dlgAnnotate
         this.editor.gui.dlgAnnotate.updateAttributesColors(this);       
    }
 
} 



// ------------------------------------------------- settingsRuleCleanTypeColor
/**
 * Handler to Rule-ClientAnnotationTypeColor settings rule
 *  
 * @name settingsRuleCleanTypeColor
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {Object} oSetting Setting object 	
 */
AEd.entities.TypesManager.prototype.settingsRuleCleanTypeColor = function(oSetting) {   
   
    // sets color of all types to default    
    for (var i = 0; i < this.types.length; i++) {
        this.types[i].color = AEd.CONFIG.DEFAULT_TYPE_COLOR;
        this.types[i].colorParentDistance = "none";   
    }     
    
    //update fragments     
    this.editor.fragments.updateFragmentsColors();
} 




// ------------------------------------------------------------ generateTypeURI
/**
 * Creates type uri from specified type path
 *  
 * @name generateTypeURI
 * @memberOf AEd.entities.TypesManager
 * @function
 * @param {Object} typePath Type path. 	
 */
AEd.entities.TypesManager.prototype.generateTypeURI = function(typePath) {   
   
   if (typePath) {
        // get server URI without suffix
        var server = this.editor.comm.server;
        var serverUriSuffix = AEd.CONFIG.DEFAULT_SERVER_URI_SUFFIX;
        server = server.substr(0, server.search(serverUriSuffix));
        
       var uri = server + "/" + AEd.CONFIG.DEFAULT_TYPE_URN_PREFIX;
       var typeSplitted = typePath.split("->");
       
       if (typeSplitted && typeSplitted.length) {
            for (var i = 0; i < typeSplitted.length; i++) {
                 typeSplitted[i] = AEd.Cleanup.trim(typeSplitted[i]);     
                 uri += typeSplitted[i];  
                 if (i < typeSplitted.length-1) {
                     uri += "/";
                 }  
                                                             
            }                             
       }  

       return uri;    
   
   }
   else {
       return null;
   }

} 


// *****************************************************************************
// class AEd.entities.TypesManager
// ***************************************************************************** 

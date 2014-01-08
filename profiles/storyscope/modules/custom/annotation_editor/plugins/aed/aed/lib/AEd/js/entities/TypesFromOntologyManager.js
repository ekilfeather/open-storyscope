/**
 * TypesFromOntologyManager.js
 *
 * Contains AEd.entities.TypesFromOntologyManager class definition. 
 *  
 * @author: Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.entities.TypesFromOntologyManager
// *****************************************************************************  



/**
 * This class provides functionality for managing attribute types from ontology.
 *      
 *
 * @name TypesFromOntologyManager
 * @memberOf AEd.entities      
 * @class 
 * @param {AEd.editors.Editor} editor Instance of editor. 
 * @property {Array} types Collection of types. 	
 * @property {Object} typesByURI Object for searching types by URI. 	  
 */
AEd.entities.TypesFromOntologyManager = function(editor) {
   if ( (editor) && (editor instanceof AEd.editors.Editor)) {
       this.editor = editor;
       this.types = new Array();    
   }
   else {
       throw new Error(AEd.I18n.t("Error_AEd_entities_TypesFromOntologyManager_Missing_argument"));
   } 
}


AEd.entities.TypesFromOntologyManager.prototype.constructor = AEd.entities.TypesFromOntologyManager;


// ------------------------------------------------------------------- addTypes
/**
 * Creates types from specified array of type parameters received
 * from server. It is a handler to server message 
 * <types><add>  ... types params ...  </add></types>
 *  
 * @name addTypes
 * @memberOf AEd.entities.TypesFromOntologyManager
 * @function
 * @param {Array} aAdd Array of type params objects crated by AEd.Protocol._parseServerMsgTypes() method.  
 *  	
 */
AEd.entities.TypesFromOntologyManager.prototype.addTypes = function(aAdd) {
    if (aAdd) {
        for (var i = 0; i < aAdd.length; i++) {
            this.createType(aAdd[i]);
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
 * @memberOf AEd.entities.TypesFromOntologyManager
 * @function
 * @param {Object} oTypeParams oType parameters object. 	
 */
AEd.entities.TypesFromOntologyManager.prototype.createType = function(oTypeParams) {      
      if (oTypeParams) {

              oTypeParams.children = new Array();
              oTypeParams.parent = null;
              oTypeParams.path = oTypeParams.name;
              oTypeParams.color = AEd.CONFIG.DEFAULT_TYPE_COLOR;
              oTypeParams.colorParentDistance = "none";
              oTypeParams.doPostprocessing = true;
              this.types.push(oTypeParams);   
            
      }
} 



// ---------------------------------------------------------------- destroyType
/**
 * Removes type.
 *  
 * @name destroyType
 * @memberOf AEd.entities.TypesFromOntologyManager
 * @function   
 * @param {String | Object} t Type URI or Type object.    
 *  	
 */
AEd.entities.TypesFromOntologyManager.prototype.destroyType = function(t) {
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
 * @memberOf AEd.entities.TypesFromOntologyManager
 * @function
 *  	
 */
AEd.entities.TypesFromOntologyManager.prototype.removeAllTypes = function() {   
        while (this.types.length) {
            this.destroyType(this.types[0]);
        }            
} 



// --------------------------------------------------------------- getTypesTree
/**
 * Retruns tree instance filled with types
 *  
 * @name getTypesTree
 * @memberOf AEd.entities.TypesFromOntologyManager
 * @function
 * @return {AEd.ui.core.UITree} Created types tree 
 *  	
 */
AEd.entities.TypesFromOntologyManager.prototype.getTypesTree = function() {   

      var tree = new AEd.ui.core.UITree();
      
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
 * @memberOf AEd.entities.TypesFromOntologyManager
 * @function
 * @param {Boolean} renderParam If tree show be rendered.  
 * @return {AEd.ui.core.UITree} Created types tree 
 *  	
 */
AEd.entities.TypesFromOntologyManager.prototype.getAttrTypesTree = function(renderParam) {   
    
      var render = typeof renderParam != 'undefined' ? renderParam : false;

      var tree = new AEd.ui.core.UITree({render: render});

      var nodeOntology = new AEd.ui.core.UITreeNode({text: AEd.I18n.t("Ontology"), id: "ontology", assignedObject: {path: "Ontology", name: "Ontology", notAllowed: true} });
      

      tree.addChild(nodeOntology);
      
      var fnPopulateNodes = function (parentTreeNode, type) {
      
          var node = new AEd.ui.core.UITreeNode({text: type.name, assignedObject: type, showSelection: true});
          parentTreeNode.addChild(node);         
      };  

      for (var i = 0; i < this.types.length; i++) {
         // only root nodes
         if (!this.types[i].parent) {
             fnPopulateNodes.call(this, nodeOntology, this.types[i]);
         }
      }
     
      return tree;            
} 




// ------------------------------------------------- settingsRuleApplyTypeColor
/**
 * Handler to Rule-ClientAnnotationTypeColor settings rule
 *  
 * @name settingsRuleApplyTypeColor
 * @memberOf AEd.entities.TypesFromOntologyManager
 * @function
 * @param {Object} oSetting Setting object 	
 */
AEd.entities.TypesFromOntologyManager.prototype.settingsRuleApplyTypeColor = function(oSetting) {   
    
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
         }
         // no name => setting name was like "ClientAnnotationTypeColor"
         // or "ClientAnnotationTypeColor:" - this should take effect 
         // to all types
         else {
            for (var i = 0; i < this.types.length; i++) {
                if (this.types[i].colorParentDistance == "none") {
                    this.types[i].color = oSetting.value;
                    this.types[i].colorParentDistance = "none";                
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
 * @memberOf AEd.entities.TypesFromOntologyManager
 * @function
 * @param {Object} oSetting Setting object 	
 */
AEd.entities.TypesFromOntologyManager.prototype.settingsRuleCleanTypeColor = function(oSetting) {   
   
    // sets color of all types to default    
    for (var i = 0; i < this.types.length; i++) {
        this.types[i].color = AEd.CONFIG.DEFAULT_TYPE_COLOR;
        this.types[i].colorParentDistance = "none";   
    }     
    
    //update fragments     
    this.editor.fragments.updateFragmentsColors();
} 


// *****************************************************************************
// class AEd.entities.TypesFromOntologyManager
// ***************************************************************************** 

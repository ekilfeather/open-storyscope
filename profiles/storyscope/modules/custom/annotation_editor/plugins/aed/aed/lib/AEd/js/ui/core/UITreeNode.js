/**
 * UITreeNode.js
 *
 * Contains AEd.ui.core.UITreeNode class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.core.UITreeNode
// *****************************************************************************  



/**
 * This class creates UITreeNode.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *    {String}  width           - button width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height          - button height with or without units, e.g.: "300px" or "100%", default unit is px, 
 *      
 *    {Element} srcElement      - DOM element to create button from.   
 *    {Element} targetElement   - DOM element to render button to. Default is document.body,    
 *    {Element} contentElement  - DOM element to place as a content of UIContainer. Default is none,      
 *    {Boolean} render          - determines wheteher UIContainer should be rendered after creating,  
 *    
 *    {String}  text            - Text caption
 *    {String}  id              - Optional ID for tree node
 *    {oTreeNode}  parent       - Optional Reference to parent tree node, if null - node is root
 *    {oTree}   tree            - Optional Reference to tree instance 
 *    {Object}  assignedObject  - Reference to assigned object 
 *    {Boolean} selectable      - is / is not this node selectable after onClick event?
 *    {Boolean} isSelected      - is / is not this node selected
 *    {Boolean} isExpanded      - is / is not this node expanded  
 *    {Boolean} showSelection   - is / is not shown the selection of this node (via special icon)
 *    {Document} context        - safari support (ownerDocument of element)    
 * }
 *
 *        
 * @name UITreeNode
 * @memberOf AEd.ui.core      
 * @class 
 * @augments AEd.ui.core.UIComponent 
 */
AEd.ui.core.UITreeNode = function(config) {
   var c = config || {};    
   c.rootElementType = "li";
   AEd.inheritFromObject(this, new AEd.ui.core.UIComponent(c));
   
   this.CLASS_TREE_NODE            = AEd.CONFIG.CLASS_UI_TREE_NODE;
   this.CLASS_TREE_NODE_SELECTED   = AEd.CONFIG.CLASS_UI_TREE_NODE_SELECTED;
   this.CLASS_TREE_NODE_BTN_EXPAND = AEd.CONFIG.CLASS_UI_TREE_NODE_BTN_EXPAND;
   this.CLASS_TREE_NODE_BTN_TEXT   = AEd.CONFIG.CLASS_UI_TREE_NODE_BTN_TEXT;
   
       
   // *************************************************************************
   // DEFAULTS
   // *************************************************************************  

   this.DEFAULT_RENDER             = true;
   this.DEFAULT_TEXT               = "";
   this.DEFAULT_ID                 = "";
   this.DEFAULT_PARENT             = null;
   this.DEFAULT_TREE               = null;
   this.DEFAULT_ASSIGNED_OBJECT    = null;
   this.DEFAULT_SELECTABLE         = true;
   this.DEFAULT_IS_SELECTED        = false;
   this.DEFAULT_IS_EXPANDED        = false;
   this.DEFAULT_SHOW_SELECTION     = false;
   
   // *************************************************************************
   // CONFIG - BUTTON OPTIONS
   // ************************************************************************* 
             
   c.render          = typeof c.render != 'undefined' ? c.render : this.DEFAULT_RENDER;   
   c.text            = typeof c.text != 'undefined' ? c.text : this.DEFAULT_TEXT;
   c.id              = typeof c.id != 'undefined' ? c.id : this.DEFAULT_ID;
   c.parent          = typeof c.parent != 'undefined' ? c.parent : this.DEFAULT_PARENT;
   c.tree            = typeof c.tree != 'undefined' ? c.tree : this.DEFAULT_TREE;
   c.assignedObject  = typeof c.assignedObject != 'undefined' ? c.assignedObject : this.DEFAULT_ASSIGNED_OBJECT;
   c.selectable      = typeof c.selectable != 'undefined' ? c.selectable : this.DEFAULT_SELECTABLE;
   c.isSelected      = typeof c.isSelected != 'undefined' ? c.isSelected : this.DEFAULT_IS_SELECTED;
   c.isExpanded      = typeof c.isExpanded != 'undefined' ? c.isExpanded : this.DEFAULT_IS_EXPANDED;
   c.showSelection   = typeof c.showSelection != 'undefined' ? c.showSelection : this.DEFAULT_SHOW_SELECTION;
	
   // *************************************************************************
   // EVENTS
   // *************************************************************************        

   /**
    * Fires when node is selected.
    * 
    * @event onSelected
    * @param {AEd.ui.core.UITreeNode} oTreeNode Target node.                                                   
    */         
   this.onSelected = new AEd.utils.Dispatcher();  
   
   /**
    * Fires when node is deselected.
    * 
    * @event onDeselected
    * @param {AEd.ui.core.UITreeNode} oTreeNode Target node.                                                   
    */         
   this.onDeselected = new AEd.utils.Dispatcher();     
   
   /**
    * Fires when node is clicked.
    * 
    * @event onClick
    * @param {AEd.ui.core.UITreeNode} oTreeNode Target node.                                                   
    */         
   this.onClick = new AEd.utils.Dispatcher();   
  
   // *************************************************************************
   // PROPERTIES
   // *************************************************************************   
   
   this.childTreeNodes = new Array(); 
   this.selectedTreeNode = null;  
   this.isSelected = c.isSelected;
   this.isExpanded = c.isSelected; 
   this.isSelectable = c.selectable;
   this.indent = 0;
   
   this.text = c.text;
   this.parent = c.parent;
   this.tree = c.tree;
   this.assignedObject = c.assignedObject;
  

   // *************************************************************************
   // CREATING HTML STRUCTURE
   // *************************************************************************    
   
   this.elementRoot.addClass(this.CLASS_TREE_NODE);
   
   this.btnExpand    = new AEd.ui.core.UIButton({icon: "expand-tree", context: c.context});
   this.btnText      = new AEd.ui.core.UIButton({icon: "none", text: this.text, context: c.context});

   if (c.showSelection){

      this.btnSelected  = new AEd.ui.core.UIButton({icon: "show-selected", context: c.context});
   }

	//workaround before refactorization
        this.setNodeAppearance(this.assignedObject.color); 



   if (c.showSelection){

      this.elementRoot.addChild(this.btnSelected.elementRoot);
      this.btnSelected.setVisibility("hidden");
   }


   this.elementRoot.addChild(this.btnExpand.elementRoot);
   this.elementRoot.addChild(this.btnText.elementRoot);
   
   var doc = (c.context && AEd.isAppleSafari) ? c.context : document;

   this.domElementChildren = doc.createElement("ul");
   this.elementChildren    = AEd.$(this.domElementChildren);
   
   this.elementRoot.addChild(this.elementChildren);
  

   if (c.showSelection){

      this.btnSelected.addClass(this.CLASS_TREE_NODE_BTN_SELECTED);
   }

   this.btnExpand.addClass(this.CLASS_TREE_NODE_BTN_EXPAND);
   this.btnText.addClass(this.CLASS_TREE_NODE_BTN_TEXT);     
         
   // *************************************************************************
   // HANDLERS SETUP
   // *************************************************************************  

   
   AEd.Events.addHandler(this.btnText.elementRoot.domElement, "click", function(e) {
      var event = AEd.Events.getEvent(e);
      AEd.Events.stopPropagation(event);
   }, this); 
   
   this.btnText.onClick.addHandler(function() {
      this.onClick.fire(this);

   }, this);
   
   this.btnExpand.onClick.addHandler(function() {
      if (this.isExpanded) {
          this.collapse();
      }
      else {
          this.expand();
      }
   }, this);



   // *************************************************************************         
   if (c.render) {  
      this.render(this.elementTarget);   
   }
   

           
   // *************************************************************************
   //  SETUP
   // *************************************************************************    
   this.setId(c.id);
   if (this.isSelected) {
      this.setSelected(true);
   }
   if (this.isExpanded) {
      this.expand();
   }  
   this.btnExpand.hide();
   this.elementChildren.hide(); 
   
}



AEd.ui.core.UITreeNode.prototype.constructor = AEd.ui.core.UITreeNode;

AEd.inheritFromPrototype(AEd.ui.core.UITreeNode, AEd.ui.core.UIComponent);




// ---------------------------------------------------------------------- setId
/**
 * Sets node id.
 *
 * @name setId
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @param {String} id New id. 
 */
AEd.ui.core.UITreeNode.prototype.setId = function(id) {      
    this.elementRoot.domElement.id = id;            
} 

// ---------------------------------------------------------------------- getId
/**
 * Sets node id.
 *
 * @name getId
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @return {String} Node id. 
 */
AEd.ui.core.UITreeNode.prototype.getId = function() {      
    return this.elementRoot.domElement.id;            
} 


// -------------------------------------------------------------------- setText
/**
 * Sets node text.
 *
 * @name setText
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @param {String} text New text. 
 */
AEd.ui.core.UITreeNode.prototype.setText = function(text) {      
    this.text = text;
    this.btnText.setText(text);      
} 


// -------------------------------------------------------------------- getText
/**
 * Gets node text.
 *
 * @name getText
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @return {String} Node text. 
 */
AEd.ui.core.UITreeNode.prototype.getText = function() {      
    return this.btnText.getText();      
} 



// ------------------------------------------------------------------ setIndent
/**
 * Sets node indent.
 *
 * @name setIndent
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @param {Number} value New value. 
 */
AEd.ui.core.UITreeNode.prototype.setIndent = function(value) {      
    this.indent = value;    
} 



// ------------------------------------------------------------------ getIndent
/**
 * Gets node indent.
 *
 * @name getIndent
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @return {Number} Indent value. 
 */
AEd.ui.core.UITreeNode.prototype.getIndent = function() {      
    return this.indent;    
} 



// ------------------------------------------------------------------ setParent
/**
 * Sets node parent.
 *
 * @name setParent
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @param {Object} value New value. 
 */
AEd.ui.core.UITreeNode.prototype.setParent = function(value) {      
    this.parent = value;    
} 



// ------------------------------------------------------------------ getParent
/**
 * Gets node parent.
 *
 * @name getParent
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @return {Number} parent object. 
 */
AEd.ui.core.UITreeNode.prototype.getParent = function() {      
    return this.parent;    
} 



// -------------------------------------------------------------------- setTree
/**
 * Sets node tree.
 *
 * @name setTree
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @param {Object} value New value. 
 */
AEd.ui.core.UITreeNode.prototype.setTree = function(value) {      
    this.tree = value;    
} 



// -------------------------------------------------------------------- getTree
/**
 * Gets node tree.
 *
 * @name getTree
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @return {Object} Tree object. 
 */
AEd.ui.core.UITreeNode.prototype.getTree = function() {      
    return this.tree;    
} 


// ---------------------------------------------------------- setNodeAppearance
/**
 * Sets node appearance.
 *
 * @name setNodeAppearance
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @param {Object} appearance appearance. 
 */
AEd.ui.core.UITreeNode.prototype.setNodeAppearance = function(appearance) {      

   var child = AEd.$(this.btnText.domElementRoot).getChildNodes();
   child = child[0];

   if (appearance) {
     var attribsArray = appearance.split(';');
     this.btnText.domElementRoot.style.background = AEd.entities.Fragment.prototype.convertBackground(attribsArray[0]);
     this.btnText.domElementRoot.style.color = AEd.entities.Fragment.prototype.convertFontColor(attribsArray[1]);

     if (child){   // Child is undefined sometimes 

        child.style.fontWeight = (attribsArray[2] == "true") ? "bold" : "normal";
        child.style.fontStyle = (attribsArray[3] == "true") ? "italic" : "normal";
        child.style.textDecoration = (attribsArray[4] == "true") ? "underline" : "none";
    }
   }
   else {
     this.btnText.domElementRoot.style.background = "";
     this.btnText.domElementRoot.style.color = "";
    
     if (child){  // Child is undefined sometimes  

        child.style.fontWeight = "normal";
        child.style.fontStyle = "normal";
        child.style.textDecoration = "none";
     }
   }    
}

// ---------------------------------------------------------- setAssignedObject
/**
 * Sets assigned object.
 *
 * @name setAssignedObject
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @param {Object} o Object to assign. 
 */
AEd.ui.core.UITreeNode.prototype.setAssignedObject = function(o) {      
    this.assignedObject = o;  

    this.setNodeAppearance(o.color);    
} 


// ---------------------------------------------------------- getAssignedObject
/**
 * Gets assigned object.
 *
 * @name getAssignedObject
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @return {Object} Assigned object. 
 */
AEd.ui.core.UITreeNode.prototype.getAssignedObject = function(o) {      
    return this.assignedObject;      
} 


// -------------------------------------------------------------- setSelectable
/**
 * Sets isSelectable property.
 *
 * @name setSelectable
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @param {Object} value Value to assign. 
 */
AEd.ui.core.UITreeNode.prototype.setSelectable = function(value) {      
    if (value) {
        this.isSelectable = true;
    }
    else {
        if (this.isSelected) {
            this.setSelected(false);
        }
        this.isSelectable = false;        
    }       
} 


// ------------------------------------------------------------ toggleSelection
/**
 * Toggles selection.
 *
 * @name toggleSelection
 * @memberOf AEd.ui.core.UITreeNode 
 * @function    
 */
AEd.ui.core.UITreeNode.prototype.toggleSelection = function() {      
    if (this.isSelected) {
       this.setSelected(false);      
    }  
    else {
       this.setSelected(true);   
    }  
} 


// ---------------------------------------------------------------- setSelected
/**
 * Sets selection.
 *
 * @name setSelected
 * @memberOf AEd.ui.core.UITreeNode 
 * @function  
 * @param {Object} value Value to assign.    
 */
AEd.ui.core.UITreeNode.prototype.setSelected = function(value) {      
    if (value) {
       if (this.isSelectable) {
           this.isSelected = true;  
           this.elementRoot.addClass(this.CLASS_TREE_NODE_SELECTED); 
   
           if (this.btnSelected){ 

              this.btnSelected.setVisibility("visible");
           }

           this.onSelected.fire(this);       
       }        
    }  
    else {
       if (this.isSelectable) {
           this.isSelected = false;  
           this.elementRoot.removeClass(this.CLASS_TREE_NODE_SELECTED); 

           if (this.btnSelected){

              this.btnSelected.setVisibility("hidden");  
           }

           this.onDeselected.fire(this);      
       }
    }  
} 



// ------------------------------------------------------------------- addChild
/**
 * Adds child to Tree.
 *
 * @name addChild
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @param {Object} oChildTreeNode Child TreeNode to add. 
 * @param {Number} index Index to add child node to. 
 * @return Added Child TreeNode. 
 */
AEd.ui.core.UITreeNode.prototype.addChild = function(oChildTreeNode, index) {

    if (oChildTreeNode) {
        
        if (this.childTreeNodes.length == 0) {
            if (this.isExpanded) {
                this.btnExpand.setIcon("collapse-tree");
            }
            else {
                this.btnExpand.setIcon("expand-tree");         
            }
            this.btnExpand.show();     
        }
        
        if (typeof index != 'undefined') {
            this.childTreeNodes.splice(index, 0, oChildTreeNode);
            this.elementChildren.addChild(oChildTreeNode.elementRoot, index);
        }
        else {
            this.childTreeNodes[this.childTreeNodes.length] = oChildTreeNode;
            this.elementChildren.addChild(oChildTreeNode.elementRoot);  
        }  
        
        oChildTreeNode.setIndent(this.indent + 1);
        oChildTreeNode.setParent(this);
        oChildTreeNode.setTree(this.tree);           
        
        oChildTreeNode.onClick.addHandler(function(oClickedTreeNode) {
             this.tree.onNodeClicked(oClickedTreeNode);
        }, this);       
        
        oChildTreeNode.onSelected.addHandler(function(oClickedTreeNode) {
             this.tree.onNodeSelected.fire(oClickedTreeNode);
        }, this);            
                 
        return oChildTreeNode;    
    }
    else {
        return null;
    }        

} 



// ---------------------------------------------------------------- removeChild
/**
 * Removes child from Tree.
 *
 * @name removeChild
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 * @param {Object} oChildTreeNode Child TreeNode to remove. 
 */
AEd.ui.core.UITreeNode.prototype.removeChild = function(oChildTreeNode) {

    if (oChildTreeNode) {
        for (var i = 0; i < this.childTreeNodes.length; i++) {
           if (this.childTreeNodes[i] === oChildTreeNode) {
               this.elementChildren.removeChild(oChildTreeNode.elementRoot);
               this.childTreeNodes[i] = null;
               this.childTreeNodes.splice(i, 1);
           }
        } 
        
        if (this.childTreeNodes.length == 0) {
            this.btnExpand.hide();     
        }           
    }
} 



// ------------------------------------------------------------------ removeAll
/**
 * Removes all children from Tree.
 *
 * @name removeAll
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 */
AEd.ui.core.UITreeNode.prototype.removeAll = function() {

    for (var i = 0; i < this.childTreeNodes.length; i++) {
        this.childTreeNodes[i].removeAll();
    }

    this.childTreeNodes = new Array();
    this.elementChildren.setInnerHTML("");

} 



// --------------------------------------------------------------------- expand
/**
 * Expands node to show child nodes.
 *
 * @name expand
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 */
AEd.ui.core.UITreeNode.prototype.expand = function() {
    
        if (!this.isExpanded) {
            this.btnExpand.setIcon("collapse-tree");
            this.isExpanded = true;
            if (this.childTreeNodes.length > 0) {
                this.elementChildren.show();
            }
        }
    
} 



// ------------------------------------------------------------------- collapse
/**
 * Collapses node to hide child nodes.
 *
 * @name collapse
 * @memberOf AEd.ui.core.UITreeNode 
 * @function   
 */
AEd.ui.core.UITreeNode.prototype.collapse = function() {
        if (this.isExpanded) {
            this.btnExpand.setIcon("expand-tree");
            this.isExpanded = false;
            this.elementChildren.hide();
        }  
   
} 


// *****************************************************************************
// class AEd.ui.core.UITreeNode
// ***************************************************************************** 

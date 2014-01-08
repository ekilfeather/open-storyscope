/**
 * UITree.js
 *
 * Contains AEd.ui.core.UITree class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.core.UITree
// *****************************************************************************  



/**
 * This class creates UITree.
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
 *    {Document} context        - safari support (ownerDocument of element)      
 * }
 *
 *        
 * @name UITree
 * @memberOf AEd.ui.core      
 * @class 
 * @augments AEd.ui.core.UIComponent 
 */
AEd.ui.core.UITree = function(config) {
   var c = config || {};    
   c.rootElementType = "ul";
   AEd.inheritFromObject(this, new AEd.ui.core.UIComponent(c));
   
   this.CLASS_TREE        = AEd.CONFIG.CLASS_UI_TREE;

   // *************************************************************************
   // DEFAULTS
   // *************************************************************************  

   this.DEFAULT_RENDER             = true;
   
   // *************************************************************************
   // CONFIG - BUTTON OPTIONS
   // ************************************************************************* 
             
   c.render           = typeof c.render != 'undefined' ? c.render : this.DEFAULT_RENDER;
 
   // *************************************************************************
   // EVENTS
   // *************************************************************************        

   /**
    * Fires when node is selected.
    * 
    * @event onNodeSelected
    * @param {AEd.ui.core.UITreeNode} oTreeNode Target node.                                                   
    */         
   this.onNodeSelected = new AEd.utils.Dispatcher(); 
  
   // *************************************************************************
   // PROPERTIES
   // *************************************************************************   
   
   this.childTreeNodes = new Array(); 
   this.selectedTreeNode = null;   
   this.lastSelectedTreeNode = null;

   // *************************************************************************
   // CREATING HTML STRUCTURE
   // *************************************************************************    
   
   this.elementRoot.addClass(this.CLASS_TREE);
   

           
   // *************************************************************************
   // HANDLERS SETUP
   // *************************************************************************  
   
   
   this.onNodeClicked = function (oClickedTreeNode) {
            if (this.selectedTreeNode) {
               if (this.selectedTreeNode === oClickedTreeNode) {

               }
               else {
                  this.setSelectedTreeNode(oClickedTreeNode);
               }
               
            }
            else { 
               this.setSelectedTreeNode(oClickedTreeNode); 
            }      
   };
   


   // *************************************************************************      
   if (c.render) {
      this.render(this.elementTarget);   
   }
   
   
}



AEd.ui.core.UITree.prototype.constructor = AEd.ui.core.UITree;

AEd.inheritFromPrototype(AEd.ui.core.UITree, AEd.ui.core.UIComponent);



// ------------------------------------------------------------------- addChild
/**
 * Adds child to Tree.
 *
 * @name addChild
 * @memberOf AEd.ui.core.UITree 
 * @function   
 * @param {Object} oChildTreeNode Child TreeNode to add. 
 * @param {Number} index Index to add child node to. 
 * @return Added Child TreeNode. 
 */
AEd.ui.core.UITree.prototype.addChild = function(oChildTreeNode, index) {
    if (oChildTreeNode) {
       
        if (typeof index != 'undefined') {
            this.childTreeNodes.splice(index, 0, oChildTreeNode);
            this.elementRoot.addChild(oChildTreeNode.elementRoot, index);
        }
        else {
            this.childTreeNodes[this.childTreeNodes.length] = oChildTreeNode;
            this.elementRoot.addChild(oChildTreeNode.elementRoot);  
        }  
        
        oChildTreeNode.setIndent(0);
        oChildTreeNode.setParent(null);
        oChildTreeNode.setTree(this);  
               
        oChildTreeNode.onClick.addHandler(function(oClickedTreeNode) {
             this.onNodeClicked(oClickedTreeNode);
        }, this);           
        oChildTreeNode.onSelected.addHandler(function(oClickedTreeNode) {
             this.onNodeSelected.fire(oClickedTreeNode);
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
 * @memberOf AEd.ui.core.UITree 
 * @function   
 * @param {Object} oChildTreeNode Child TreeNode to remove. 
 */
AEd.ui.core.UITree.prototype.removeChild = function(oChildTreeNode) {
    if (oChildTreeNode) {
        for (var i = 0; i < this.childTreeNodes.length; i++) {
           if (this.childTreeNodes[i] === oChildTreeNode) {
               this.elementRoot.removeChild(oChildTreeNode.elementRoot);
               this.childTreeNodes[i] = null;
               this.childTreeNodes.splice(i, 1);
           }
        }        
    }
} 



// ------------------------------------------------------------------ removeAll
/**
 * Removes all children from Tree.
 *
 * @name removeAll
 * @memberOf AEd.ui.core.UITree 
 * @function   
 */
AEd.ui.core.UITree.prototype.removeAll = function() {

    for (var i = 0; i < this.childTreeNodes.length; i++) {
        this.childTreeNodes[i].removeAll();
    }

    this.selectedTreeNode = null;
    this.childTreeNodes = new Array();
    this.elementRoot.setInnerHTML("");

} 


// -------------------------------------------------------- getSelectedTreeNode
/**
 * Returns selected node.
 *
 * @name getSelectedTreeNode
 * @memberOf AEd.ui.core.UITree 
 * @function   
 * @return selected tree node
 */
AEd.ui.core.UITree.prototype.getSelectedTreeNode = function() {      
    return this.selectedTreeNode;
} 



// -------------------------------------------------------- setSelectedTreeNode
/**
 * Sets selected node.
 *
 * @name setSelectedTreeNode
 * @memberOf AEd.ui.core.UITree 
 * @function   
 * @param {Object} oChildTreeNode Selected Child TreeNode.  
 */
AEd.ui.core.UITree.prototype.setSelectedTreeNode = function(oChildTreeNode) { 
    if (this.selectedTreeNode) {                  
        this.selectedTreeNode.setSelected(false); 
        this.lastSelectedTreeNode = this.selectedTreeNode;
    } 
    else {
        this.lastSelectedTreeNode = null;
    } 
         
    this.selectedTreeNode = oChildTreeNode;  
    if (this.selectedTreeNode) {
         this.selectedTreeNode.setSelected(true);
    }

} 



// -------------------------------------------------------- getNextTreeNode
/**
 * Gets next tree node.
 *
 * @name getNextTreeNode
 * @memberOf AEd.ui.core.UITree 
 * @function   
 * @param {Object} oChildTreeNode Child TreeNode. 
 * @return next tree node 
 */
AEd.ui.core.UITree.prototype.getNextTreeNode = function(oChildTreeNode) {  
    if (oChildTreeNode && oChildTreeNode.parent) {
        var childParent = oChildTreeNode.parent;
        for (var i = 0; i < childParent.childTreeNodes.length; i++) {
            if (oChildTreeNode == childParent.childTreeNodes[i] && i != childParent.childTreeNodes.length - 1) {
                return childParent.childTreeNodes[i + 1];
            }
        }
        return childParent;
    }   
}

// -------------------------------------------------------- getPreviousTreeNode
/**
 * Gets previous tree node.
 *
 * @name getPreviousTreeNode
 * @memberOf AEd.ui.core.UITree 
 * @function   
 * @param {Object} oChildTreeNode Child TreeNode. 
 * @return previous tree node 
 */
AEd.ui.core.UITree.prototype.getPreviousTreeNode = function(oChildTreeNode) {  
    if (oChildTreeNode && oChildTreeNode.parent) {
        var childParent = oChildTreeNode.parent;
        for (var i = 0; i < childParent.childTreeNodes.length; i++) {
            if (oChildTreeNode == childParent.childTreeNodes[i] && i != 0) {
                return childParent.childTreeNodes[i - 1];
            }
        }
        return childParent;
    }   
}

// *****************************************************************************
// class AEd.ui.core.UITree
// ***************************************************************************** 

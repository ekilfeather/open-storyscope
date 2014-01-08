/**
 * DlgAttrFromOntology.js
 *
 * Contains AEd.ui.DlgAttrFromOntology class definition. 
 *  
 * @author: Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgAttrFromOntology
// *****************************************************************************  



/**
 * This class creates DlgAttrFromOntology.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *  
 *    {String}  title         - dialog title text, 
 *    {String}  width         - dialog width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height        - dialog height with or without units, e.g.: "300px" or "100%", default unit is px,  
 *    {String}  minWidth      - dialog minWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  minHeight     - dialog minHeight with or without units, e.g.: "300px" or "100%", default unit is px,   
 *    {String}  maxWidth      - dialog maxWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  maxHeight     - dialog maxHeight with or without units, e.g.: "300px" or "100%", default unit is px,    
 *    {String}  corners       - rounded dialog corners: "tl", "tr", "bl", "br", "top", "bottom", "right", "left", "all", "none", default is "all",  
 *    
 *    {Boolean} draggable     - will be dialog draggable?, 
 *    {Boolean} resizable     - will be dialog resizable?,  
 *    {Boolean} render        - determines wheteher dialog should be rendered after creating
 *    {Boolean} center        - determines wheteher dialog should be centered to screen after rendering
 *    {Boolean} allwaysOnTop  - will be this dialog allways in the front of other dialogs?,        
 *    
 *    {Boolean} showOverlay   - will the overlay layer be displayed?,    
 *    
 *    {Element} srcElement     - DOM element to create dialog from. 
 *    {Element} targetElement  - DOM element to render dialog to. Default is document.body. 
 *    {Element} contentElement - DOM element to place as a content of dialog. Default is none.
 * }
 * 
 * @name DlgAttrFromOntology
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgAttrFromOntology = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_attrTypesFromOntology_title");
   c.width     = AEd.CONFIG.DLG_ATTR_FROM_ONTOLOGY_WIDTH;
   c.height    = AEd.CONFIG.DLG_ATTR_FROM_ONTOLOGY_HEIGHT;    
   c.resizable = true;
   c.autoInit  = false;
   c.showOverlay = true;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));

   this.init(c);    
   
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_ATTRTYPES);
   
   this.contentArea.loadFrom(AEd.CONFIG.DLG_ATTR_FROM_ONTOLOGY_PATH);
   
   
   this.tree = null;
   
   // Buttons
   this.btnClose    = new AEd.ui.core.UIButton({icon: "close"});    
   this.btnOk       = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_attrTypes_button_ok"), toggle: false});
   this.btnCancel   = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_attrTypes_button_cancel"), toggle: false});      
   
   this.buttonsArea.addItem(this.btnOk);
   this.buttonsArea.addItem(this.btnCancel);
   this.headerButtonsArea.addItem(this.btnClose);

   // Inputs        
  
   this.iframe = this.contentArea.domElementIframe; 
   this.elementIframe = AEd.$(this.iframe);    
  
   this.onRender.addHandler(function() { 

       // Browsers compatibility
   
       var dstIframe;       

       if (window.opera){  // Opera compatibility
         
         dstIframe = this.iframe;
       }

       else {

         dstIframe  = this.iframe.contentWindow;
       }
  
       AEd.Events.addHandler(dstIframe, "load", function(e) {
           this.contentLoaded = true;
           this.onContentLoaded.fire(this);
           
           this.setWidth(this.width);
           this.setHeight(this.height);   
           this.iframeDocument       = this.iframe.contentWindow.document;

           this.domElementTreeWrapper = this.iframeDocument.getElementById(AEd.CONFIG.DLG_ATTR_FROM_ONTOLOGY_ID_TREE_WRAPPER);  


           this.elementTreeWrapper    = AEd.$(this.domElementTreeWrapper);
           
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnDragStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnDragIframeMove, this);
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnResizeStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnResizeIframeMove, this);  

           AEd.Events.addHandler(this.domElementTreeWrapper, "click", function() {
              if (this.tree) {
                  var node = this.tree.getSelectedTreeNode();
                  if (node) {
                      this.tree.setSelectedTreeNode(null);
                      this.btnRemoveType.setDisabled(true);
                  }
              }
           }, this);       
           
           this.reset();         

       }, this);
   },this );   
   
}



AEd.ui.DlgAttrFromOntology.prototype.constructor = AEd.ui.DlgAttrFromOntology;

AEd.inheritFromPrototype(AEd.ui.DlgAttrFromOntology, AEd.ui.core.UIDialog);


// -------------------------------------------------------------------- getTree
/**
 * Gets tree object.
 *
 * @name getTree
 * @memberOf AEd.ui.DlgAttrFromOntology 
 * @function   
 * @return {AEd.ui.core.UITree} Tree instance.
 */
AEd.ui.DlgAttrFromOntology.prototype.getTree = function() {          
    return this.tree;
}

// -------------------------------------------------------------------- setTree
/**
 * Sets tree object and renders it to tree wrapper.
 *
 * @name setTree
 * @memberOf AEd.ui.DlgAttrFromOntology 
 * @function  
 * @param {AEd.ui.core.UITree} tree New tree.  
 */
AEd.ui.DlgAttrFromOntology.prototype.setTree = function(tree) {       
    if (this.contentLoaded) {
        
        if (this.elementTreeWrapper) {
            this.tree = tree;
            this.elementTreeWrapper.setInnerHTML("");
            this.tree.render(this.elementTreeWrapper);
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setTree(tree);
        }, this);     
    }    
}

// ---------------------------------------------------------- getType
/**
 * Gets type object from ontology
 *
 * @name getType
 * @memberOf AEd.ui.DlgAttrFromOntology 
 * @function   
 * @return {Object} Type object.
 */
AEd.ui.DlgAttrFromOntology.prototype.getType = function() {
    if (this.contentLoaded) {
  
       var returnType = {};

       var type = this.getTree().getSelectedTreeNode().assignedObject;

       switch(type.type) {

              case "Integer":
              case "String":
              case "Time":
              case "Date":
              case "DateTime":
              case "Boolean":
              case "URI":
              case "Duration":
              case "Binary":
              case "Text":
              case "Image":
              case "GeoPoint":
              case "Entity":

                   returnType.type = type.type;
                   returnType.name = type.name;
                   returnType.simpleType = true;
              break;             
              default :

                   if (!type.type){

                      break;
                   }
                   else if (type.type.match(/http:\/\//g) || type.type.match(/https:\/\//g)){

                     returnType.type = "";
                     returnType.name = type.name;
                     returnType.uri = type.type;
                     returnType.simpleType = false;                      
                   }
                   else {

                     returnType.type = "";
                     returnType.name = type.name;
                     returnType.uri = "";
                     returnType.simpleType = false;
                   }
              break;
       }

       return returnType;
    }
}

// -------------------------------------------------------------------- setSimpleType
/**
 * Sets selected value of simple type tree.
 *
 * @name setSimpleType
 * @memberOf AEd.ui.DlgAttrTypes 
 * @function  
 * @param {String} newValue value of new selected tree node.  
 */
AEd.ui.DlgAttrTypes.prototype.setSimpleType = function(newValue) {
    if (this.contentLoaded) {  // Content is loaded - set simple type
        if (this.tree && this.tree.childTreeNodes && this.tree.childTreeNodes[0].childTreeNodes) {
       
           this.tree.childTreeNodes[0].expand();

           for (var i = 0; i < this.tree.childTreeNodes[0].childTreeNodes.length; i++){

               if (this.tree.childTreeNodes[0].childTreeNodes[i].assignedObject.name == newValue){

                  this.tree.childTreeNodes[0].childTreeNodes[i].onClick.fire(this.tree.childTreeNodes[0].childTreeNodes[i]);
                  break;
               }
           }
        }
    }
    else { // Content is loaded - set simple type but first wait till the content is loaded
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {

          if (this.tree && this.tree.childTreeNodes && this.tree.childTreeNodes[0].childTreeNodes) {
           
             this.tree.childTreeNodes[0].expand();

             for (var i = 0; i < this.tree.childTreeNodes[0].childTreeNodes.length; i++){

                 if (this.tree.childTreeNodes[0].childTreeNodes[i].assignedObject.name == newValue){
  
                    this.tree.childTreeNodes[0].childTreeNodes[i].onClick.fire(this.tree.childTreeNodes[0].childTreeNodes[i]);
                    break;
                 }
             }
          }
        }, this);     
    }
}


// ---------------------------------------------------------------------- reset
/**
 * Resets the DlgAttrTypes dialog
 *
 * @name reset
 * @memberOf AEd.ui.DlgAttrFromOntology 
 * @function   
 */
AEd.ui.DlgAttrFromOntology.prototype.reset = function() {

}


// *****************************************************************************
// class AEd.ui.DlgAttrFromOntology
// ***************************************************************************** 

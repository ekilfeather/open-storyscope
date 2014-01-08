/**
 * DlgGroups.js
 *
 * Contains AEd.ui.DlgGroups class definition. 
 *  
 * @author: Martin Kleban, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgGroups
// *****************************************************************************  



/**
 * This class creates DlgGroups.
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
 * @name DlgGroups
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgGroups = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_groups_title");
   c.width     = AEd.CONFIG.DLG_GROUPS_WIDTH;
   c.height    = AEd.CONFIG.DLG_GROUPS_HEIGHT;    
   c.showOverlay = false;
   c.resizable = true;
   c.autoInit = false;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);

         
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_GROUPS);
   
   this.contentArea.loadFrom(AEd.CONFIG.DLG_GROUPS_PATH);
   
   this.contentLoaded = false;
   
   this.groups = new Array(); // array of groups
   this.loggedUserGroups = null;
   
   // Buttons
   this.btnClose    = new AEd.ui.core.UIButton({icon: "close"});
   this.headerButtonsArea.addItem(this.btnClose);
   
   // Inputs

     
   this.iframe = this.contentArea.domElementIframe; 
   this.elementIframe = AEd.$(this.iframe);
   
   // *************************************************************************
   // EVENTS
   // *************************************************************************
   
   /**
    * Fires when user clicks the filter button
    * 
    * @event onFilter                                                
    */         
   this.onFilter = new AEd.utils.Dispatcher();   
   
   /**
    * Fires when user clicks the join button to join group.
    * 
    * @event onJoin
    * @param {AEd.entities.Group} group Target Group                                                 
    */         
   this.onJoin = new AEd.utils.Dispatcher();   
   
   /**
    * Fires when user clicks the leave button to leave group.
    * 
    * @event onLeave
    * @param {AEd.entities.Group} group Target Group                                                 
    */         
   this.onLeave = new AEd.utils.Dispatcher();   
   // *************************************************************************
      
      
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

           
           this.iframeDocument = this.iframe.contentWindow.document;
    
        
           
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnDragStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnDragIframeMove, this);
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnResizeStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnResizeIframeMove, this);
           
           this.domElementInputSearch      = this.iframeDocument.getElementById(AEd.CONFIG.DLG_GROUPS_ID_INPUT_SEARCH);
           this.domElementGroupsContainer = this.iframeDocument.getElementById(AEd.CONFIG.DLG_GROUPS_ID_CONTAINER);
           this.domElementBtnFilter        = this.iframeDocument.getElementById(AEd.CONFIG.DLG_GROUPS_ID_BTN_FILTER);           

           this.groupsArea  = new AEd.ui.core.UIContainer ({srcElement: this.domElementGroupsContainer});
           this.btnFilter   = new AEd.ui.core.UIButton({srcElement: this.domElementBtnFilter});
           
           this.btnFilter.onClick.addHandler(function() { this.onFilter.fire(); }, this);
    

    
       }, this);
   },this );  
  
}



AEd.ui.DlgGroups.prototype.constructor = AEd.ui.DlgGroups;

AEd.inheritFromPrototype(AEd.ui.DlgGroups, AEd.ui.core.UIDialog);


// ------------------------------------------------------------------ setGroups
/**
 * Sets groups to groupsArea
 *
 * @name setGroups
 * @memberOf AEd.ui.DlgGroups 
 * @function   
 * @param {Array} groups New groups.  
 * @param {Array} loggedUserGroups Logged user groups.   
 */
AEd.ui.DlgGroups.prototype.setGroups = function(groups, loggedUserGroups) {

    this.groups = groups;
    this.loggedUserGroups = loggedUserGroups;
    this.removeAll();
    
    if (groups) {
        for (var i = 0; i < groups.length; i++) {
           var makeJoined = false;
           for (var j = 0; j < loggedUserGroups.length; j++) {
              if (groups[i].uri == loggedUserGroups[j].uri) {
                  makeJoined = true;
              } 
           }

           var g = new AEd.ui.Group({group: groups[i]});     
           
           if (makeJoined) {
              g.addClass(AEd.CONFIG.CLASS_UI_MSG_GROUP_JOINED); 
              g.btnJoin.setDisabled(true); 
              g.btnLeave.setDisabled(false);            
           }
           else {              
              g.btnJoin.setDisabled(false); 
              g.btnLeave.setDisabled(true);            
           }
           
           g.onJoin.addHandler(function(uiGroup) {
                this.onJoin.fire(uiGroup);
           }, this);
           
           
           g.onLeave.addHandler(function(uiGroup) {
                this.onLeave.fire(uiGroup);
           }, this);
                 
           this.add(g);
        }
    }
}




// ------------------------------------------------------------------ getGroups
/**
 * Gets groups
 *
 * @name getGroups
 * @memberOf AEd.ui.DlgGroups 
 * @function   
 * @return {Array} Groups array.  
 */
AEd.ui.DlgGroups.prototype.getGroups = function() {
    return this.groups;
}



// ------------------------------------------------------------------------ add
/**
 * Adds a new group to groupsArea
 *
 * @name add
 * @memberOf AEd.ui.DlgGroups 
 * @function   
 * @param {AEd.ui.Group} group New group.  
 */
AEd.ui.DlgGroups.prototype.add = function(group) {
    if (group && this.groupsArea) {
        this.groupsArea.addItem(group);
    }
}



// --------------------------------------------------------------------- remove
/**
 * Removes group from groupsArea or whole dialog
 *
 * @name remove
 * @memberOf AEd.ui.DlgGroups 
 * @function   
 * @param {AEd.ui.Group} group Group to remove.
 */
AEd.ui.DlgGroups.prototype.remove = function(group) {
    //  removing group
    if (group && this.groupsArea) {          
        this.groupsArea.removeItem(group);        
    }       
    // removing dialog
    else {
       if (this.elementTarget && this.elementRoot && this.isRendered) {
          this.onRemove.fire();             
          if (this.hasOverlay && this.elementOverlay) {
             this.elementTarget.removeChild(this.elementOverlay);
          }           
          this.elementTarget.removeChild(this.elementRoot);
          this.isRendered = false;
       }    
    }
}



// ------------------------------------------------------------------ removeAll
/**
 * Removes all group from groupsArea
 *
 * @name removeAll
 * @memberOf AEd.ui.DlgGroups 
 * @function   
 */
AEd.ui.DlgGroups.prototype.removeAll = function() {

   if (this.groupsArea){

     this.groupsArea.removeAllItems();          
   }
}



// -------------------------------------------------------- getInputSearchValue
/**
 * Return value of input element 
 *
 * @name getInputSearchValue
 * @memberOf AEd.ui.DlgGroups 
 * @function   
 * @return {String} Value of input element 
 */
AEd.ui.DlgGroups.prototype.getInputSearchValue = function() {
     return this.domElementInputSearch.value;        
}

// *****************************************************************************
// class AEd.ui.DlgGroups
// ***************************************************************************** 

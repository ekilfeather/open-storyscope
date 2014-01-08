/**
 * Group.js
 *
 * Contains AEd.ui.Group class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.Group
// *****************************************************************************  



/**
 * This class creates Group UI component.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *    {String}  title         - message title text, 
 *    {String}  subtitle      - message subtitle text,
 *    {String | Element | AEd.dom.Element}  headerContent - header content text or Element,
 *    {String | Element | AEd.dom.Element}  content - content text or Element,
 *     
 *    {String}  icon          - "none" | "anno" | "info" | "error" | "warning" | "ok" | "loading" | "close" | ...
 *    {String}  iconColor     - "#FFFFFF" | ...
 *      
 *    {String}  width         - dialog width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height        - dialog height with or without units, e.g.: "300px" or "100%", default unit is px,  
 *    {String}  minWidth      - dialog minWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  minHeight     - dialog minHeight with or without units, e.g.: "300px" or "100%", default unit is px,   
 *    {String}  maxWidth      - dialog maxWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  maxHeight     - dialog maxHeight with or without units, e.g.: "300px" or "100%", default unit is px,     
 *      
 *    {Boolean} render        - determines wheteher dialog should be rendered after creating   
 *    
 *    {Element} srcElement     - DOM element to create dialog from. 
 *    {Element} targetElement  - DOM element to render dialog to. Default is document.body. 
 *    {Element} contentElement - DOM element to place as a content of dialog. Default is none.
 *    
 *    {Object} group             oGroup = {
 *                                 uri : String,
 *                                 name : String 
 *                                 persons: Array of oPerson 
 *                               }   
 *  
 * }
 * 
 * @name Group
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIMessage 
 */
AEd.ui.Group = function(config) {
   
   var c = config || {};    
   c.icon   = typeof c.icon != "undefined" ? c.icon : "none";
   c.render = typeof c.render != "undefined" ? c.render : false;  
   AEd.inheritFromObject(this, new AEd.ui.core.UIMessage(c));
  
   if (!c.group) {
      throw new Error(AEd.I18n.t("Error_AEd_ui_Group_Error_missing_group_object"));
   }
     
   this.assignedGroup    = c.group;      

   this.groupUiUri      = typeof c.group.uri != 'undefined' ? c.group.uri : "";
   this.groupUiName      = typeof c.group.name != 'undefined' ? c.group.name : "";     
   this.groupUiPersons   = typeof c.group.persons != 'undefined' ? c.group.persons : null;      


 
   this.btnJoin     = new AEd.ui.core.UIButton({icon: "join"});    
   this.btnLeave    = new AEd.ui.core.UIButton({icon: "leave"});   
   this.btnDetails  = new AEd.ui.core.UIButton({icon: "show-details"});  
       
   this.buttonsArea.addItem(this.btnJoin);      
   this.buttonsArea.addItem(this.btnLeave); 
   this.buttonsArea.addItem(this.btnDetails); 
      
   this.elementRoot.addClass(AEd.CONFIG.CLASS_UI_MSG_GROUP);
   
   // *************************************************************************
   // EVENTS
   // *************************************************************************
      
   /**
    * Fires when user clicks the details button to show details.
    * 
    * @event onShowDetails
    * @param {AEd.entities.Group} group Target Group                                                 
    */         
   this.onShowDetails = new AEd.utils.Dispatcher();      
   
   /**
    * Fires when user clicks the details button to hide details.
    * 
    * @event onHideDetails
    * @param {AEd.entities.Group} group Target Group                                                 
    */         
   this.onHideDetails = new AEd.utils.Dispatcher();
   
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
   // INIT
   // *************************************************************************




   this.btnDetails.onClick.addHandler(function () {
       if (!this.btnDetails.isDisabled) {         
           if (this.isContentHidden) {
              this.showContent();
              this.btnDetails.setIcon("hide-details");
              this.onShowDetails.fire(this);
           }
           else {
              this.hideContent();
              this.btnDetails.setIcon("show-details");   
              this.onHideDetails.fire(this);    
           }       
       }

   }, this ); 
   
   this.btnJoin.onClick.addHandler(function () {
       if (!this.btnJoin.isDisabled) {         
              this.onJoin.fire(this);     
       }
   }, this );    
   
   this.btnLeave.onClick.addHandler(function () {
       if (!this.btnLeave.isDisabled) {         
              this.onLeave.fire(this);     
       }
   }, this );    
   
   
   if (!this.content) {
      this.btnDetails.setDisabled(true);
   }  
   this.onContentChange.addHandler(function(content) {
       if (content) {
          this.btnDetails.setDisabled(false);
       }
       else {
          this.btnDetails.setDisabled(true);
       }
   }, this );  
      
   
   this.setGroupUiUri(this.groupUiUri);
   this.setGroupUiName(this.groupUiName);   
   this.setGroupUiPersons(this.groupUiPersons);                
}



AEd.ui.Group.prototype.constructor = AEd.ui.Group;

AEd.inheritFromPrototype(AEd.ui.Group, AEd.ui.core.UIMessage);



// -------------------------------------------------------------- setGroupUiUri
/**
 * Sets Group Uri text
 *
 * @name setGroupUiUri
 * @memberOf AEd.ui.Group
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Group.prototype.setGroupUiUri = function(value) {
    if (typeof value != "undefined") {
          this.groupUiUri = value;
          this.setSubtitle(this.groupUiUri);  
    }    
}



// ------------------------------------------------------------- setGroupUiName
/**
 * Sets Group Name text
 *
 * @name setGroupUiName
 * @memberOf AEd.ui.Group
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Group.prototype.setGroupUiName = function(value) {
    if (typeof value != "undefined") {
          this.groupUiName = value;
          this.setTitle(this.groupUiName);  
    }    
}




// ---------------------------------------------------------- setGroupUiPersons
/**
 * Sets Group Persons text
 *
 * @name setGroupUiPersons
 * @memberOf AEd.ui.Group
 * @function    
 * @param {Array} persons Array of persons.    
 */
AEd.ui.Group.prototype.setGroupUiPersons = function(persons) {
    if (persons) {
          this.groupUiPersons = persons;
          
          var content = AEd.I18n.t("Group_Assigned_Persons") + ":<br/>";
          
          if (persons.length == 0) {
                  content += AEd.I18n.t("Group_No_Persons"); 
          }
          else {
              for (var i = 0; i < persons.length; i++) {
                  content += persons[i].name + "<br/>";              
              }          
          
          }
          
          this.setContent(content);              
    }         
}



// --------------------------------------------------------------- removePerson
/**
 * Removes specified person from Group Persons text
 *
 * @name removePerson
 * @memberOf AEd.ui.Group
 * @function    
 * @param {Object} oPerson Person object.    
 */
AEd.ui.Group.prototype.removePerson = function(oPerson) {
    if (oPerson) {
          for (var i = 0; i < this.assignedGroup.persons.length; i++) {
              if (this.assignedGroup.persons[i].id == oPerson.id) {
                  this.assignedGroup.persons.splice(i, 1);                  
                  break;
              }
          }  
          this.setGroupUiPersons(this.assignedGroup.persons);     
    }         
}


// ------------------------------------------------------------------ addPerson
/**
 * Adds specified person to Group Persons text
 *
 * @name addPerson
 * @memberOf AEd.ui.Group
 * @function    
 * @param {Object} oPerson Person object.    
 */
AEd.ui.Group.prototype.addPerson = function(oPerson) {
    if (oPerson) {
          this.assignedGroup.persons.push(oPerson);
          this.setGroupUiPersons(this.assignedGroup.persons);    
    }         
}



// *****************************************************************************
// class AEd.ui.Group
// ***************************************************************************** 
/**
 * Person.js
 *
 * Contains AEd.ui.Person class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.Person
// *****************************************************************************  



/**
 * This class creates Person UI component.
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
 *    {Object} person             oPerson = {
 *                                     id: String,
 *                                     login: String,
 *                                     name: String,
 *                                     email: String,
 *                                     photoUri: String, 
 *                                     groups: Array of oGroup
 *                               }  
 *  
 * }
 * 
 * @name Person
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIMessage 
 */
AEd.ui.Person = function(config) {
   
   var c = config || {};    
   c.icon   = typeof c.icon != "undefined" ? c.icon : "none";
   c.render = typeof c.render != "undefined" ? c.render : false; 
   c.photo  = typeof c.photo != "undefined" ? c.photo : true;  
   AEd.inheritFromObject(this, new AEd.ui.core.UIMessage(c));
   
   if (!c.person) {
      throw new Error(AEd.I18n.t("Error_AEd_ui_Person_Error_missing_person_object"));
   }   
  
   this.assignedPerson   = c.person;
   this.personUiId       = typeof c.person.id != 'undefined' ? c.person.id : "";
   this.personUiLogin    = typeof c.person.login != 'undefined' ? c.person.login : "";  
   this.personUiName     = typeof c.person.name != 'undefined' ? c.person.name : "";     
   this.personUiEmail    = typeof c.person.email != 'undefined' ? c.person.email : "";  
   this.personUiPhotoUri = typeof c.person.photoUri != 'undefined' ? c.person.photoUri : "";      
   this.personUiGroups   = typeof c.person.groups != 'undefined' ? c.person.groups : null;     


   this.btnDetails  = new AEd.ui.core.UIButton({icon: "show-details"});    
 
   this.buttonsArea.addItem(this.btnDetails);      

   this.elementRoot.addClass(AEd.CONFIG.CLASS_UI_MSG_PERSON);
   
   // *************************************************************************
   // EVENTS
   // *************************************************************************
      
   /**
    * Fires when user clicks the details button to show details.
    * 
    * @event onShowDetails
    * @param {AEd.entities.Person} person Target Person                                                 
    */         
   this.onShowDetails = new AEd.utils.Dispatcher();      
   
   /**
    * Fires when user clicks the details button to hide details.
    * 
    * @event onHideDetails
    * @param {AEd.entities.Person} person Target Person                                                 
    */         
   this.onHideDetails = new AEd.utils.Dispatcher();
   
   /**
    * Fires when user changes photo image.
    * 
    * @event onImgChange                                                
    */         
   this.onImgChange = new AEd.utils.Dispatcher();   


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
   
   
   var fnImgOnClick = function () {
      window.open(this.personUiPhotoUri,this.personUiName); 
   };

   this.onImgChange.addHandler(function() {
      if (this.personUiPhotoUri) {
          this.elementImg.addClass(AEd.CONFIG.CLASS_UI_CLICKABLE);
          this.elementImg.addEventHandler("click", fnImgOnClick, this);
      }
      else {
          this.elementImg.removeClass(AEd.CONFIG.CLASS_UI_CLICKABLE);
          this.elementImg.removeEventHandler("click", fnImgOnClick);
      }  
   
   }, this);
   
   
   this.setPersonUiId(this.personUiId);
   this.setPersonUiLogin(this.personUiLogin);  
   this.setPersonUiName(this.personUiName);  
   this.setPersonUiEmail(this.personUiEmail); 
   this.setPersonUiPhoto(this.personUiPhotoUri);      
   this.setPersonUiGroups(this.personUiGroups);                
}



AEd.ui.Person.prototype.constructor = AEd.ui.Person;

AEd.inheritFromPrototype(AEd.ui.Person, AEd.ui.core.UIMessage);



// ----------------------------------------------------------- setPersonUiLogin
/**
 * Sets Person ID text
 *
 * @name setPersonUiLogin
 * @memberOf AEd.ui.Person
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Person.prototype.setPersonUiLogin = function(value) {
    if (typeof value != "undefined") {
          this.personUiLogin = value;
          this.setTitle(this.personUiName + " (" + this.personUiLogin + ")");  
    }    
}



// ------------------------------------------------------------ setPersonUiName
/**
 * Sets Person Name text
 *
 * @name setPersonUiName
 * @memberOf AEd.ui.Person
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Person.prototype.setPersonUiName = function(value) {
    if (typeof value != "undefined") {
          this.personUiName = value;
          this.setTitle(this.personUiName + " (" + this.personUiLogin + ")");  
    }    
}



// ----------------------------------------------------------- setPersonUiEmail
/**
 * Sets Person Email text
 *
 * @name setPersonUiEmail
 * @memberOf AEd.ui.Person
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Person.prototype.setPersonUiEmail = function(value) {
    if (typeof value != "undefined") {
          this.personUiEmail = value;
          this.setSubtitle(this.personUiEmail);  
    }    
}



// -------------------------------------------------------------- setPersonUiId
/**
 * Sets Person ID text
 *
 * @name setPersonUiId
 * @memberOf AEd.ui.Person
 * @function    
 * @param {String} value New value.    
 */
AEd.ui.Person.prototype.setPersonUiId = function(value) {
    if (typeof value != "undefined") {
          this.personUiId = value;
          this.setHeaderContent(this.personUiId);  
    }    
}



// ----------------------------------------------------------- setPersonUiPhoto
/**
 * Sets Person photo
 *
 * @name setPersonUiPhoto
 * @memberOf AEd.ui.Person
 * @function    
 * @param {String} uri URI of photo.    
 */
AEd.ui.Person.prototype.setPersonUiPhoto = function(uri) {
    if (typeof uri != "undefined") {

          this.personUiPhotoUri = uri;
          this.domElementImg.src = this.personUiPhotoUri;  
          this.onImgChange.fire();           
    }    
}



// ---------------------------------------------------------- setPersonUiGroups
/**
 * Sets Person Groups text
 *
 * @name setPersonUiGroups
 * @memberOf AEd.ui.Person
 * @function    
 * @param {Array} groups Array of groups.    
 */
AEd.ui.Person.prototype.setPersonUiGroups = function(groups) {
    if (groups) {
          this.personUiGroups = groups;
          
          var content = AEd.I18n.t("Person_Assigned_Groups") + ":<br/>";
          
          if (groups.length == 0) {
                  content += AEd.I18n.t("Person_No_Groups"); 
          }
          else {
              for (var i = 0; i < groups.length; i++) {
                  content += groups[i].name + "<br/>";              
              }          
          
          }
          
          this.setContent(content);              
    }         
}


// *****************************************************************************
// class AEd.ui.Person
// ***************************************************************************** 

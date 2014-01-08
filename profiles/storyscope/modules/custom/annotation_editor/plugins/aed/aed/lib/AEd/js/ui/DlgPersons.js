/**
 * DlgPersons.js
 *
 * Contains AEd.ui.DlgPersons class definition. 
 *  
 * @author: Martin Kleban, Milos Cudrak
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgPersons
// *****************************************************************************  



/**
 * This class creates DlgPersons.
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
 * @name DlgPersons
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgPersons = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_persons_title");
   c.width     = AEd.CONFIG.DLG_PERSONS_WIDTH;
   c.height    = AEd.CONFIG.DLG_PERSONS_HEIGHT;    
   c.showOverlay = false;
   c.resizable = true;
   c.autoInit = false;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);

         
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_PERSONS);
   
   this.contentArea.loadFrom(AEd.CONFIG.DLG_PERSONS_PATH);
   
   this.contentLoaded = false;
   
   this.persons = new Array(); // array of persons
   
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
           
           this.domElementInputSearch      = this.iframeDocument.getElementById(AEd.CONFIG.DLG_PERSONS_ID_INPUT_SEARCH);
           this.domElementPersonsContainer = this.iframeDocument.getElementById(AEd.CONFIG.DLG_PERSONS_ID_CONTAINER);
           this.domElementBtnFilter        = this.iframeDocument.getElementById(AEd.CONFIG.DLG_PERSONS_ID_BTN_FILTER);           

           this.personsArea = new AEd.ui.core.UIContainer ({srcElement: this.domElementPersonsContainer});
           this.btnFilter   = new AEd.ui.core.UIButton({srcElement: this.domElementBtnFilter});
           
           this.btnFilter.onClick.addHandler(function() { this.onFilter.fire(); }, this);
    

    
       }, this);
   },this );  
  
}



AEd.ui.DlgPersons.prototype.constructor = AEd.ui.DlgPersons;

AEd.inheritFromPrototype(AEd.ui.DlgPersons, AEd.ui.core.UIDialog);


// ----------------------------------------------------------------- setPersons
/**
 * Sets persons to personsArea
 *
 * @name setPersons
 * @memberOf AEd.ui.DlgPersons 
 * @function   
 * @param {Array} persons New persons.  
 */
AEd.ui.DlgPersons.prototype.setPersons = function(persons) {

    this.persons = persons;
    this.removeAll(); 
    
    if (persons) {
        for (var i = 0; i < persons.length; i++) {
           var p = new AEd.ui.Person({person: persons[i]});           
           this.add(p);
        }
    }
}




// ----------------------------------------------------------------- getPersons
/**
 * Gets persons
 *
 * @name getPersons
 * @memberOf AEd.ui.DlgPersons 
 * @function   
 * @return {Array} Persons array.  
 */
AEd.ui.DlgPersons.prototype.getPersons = function() {
    return this.persons;
}



// ------------------------------------------------------------------------ add
/**
 * Adds a new person to personsArea
 *
 * @name add
 * @memberOf AEd.ui.DlgPersons 
 * @function   
 * @param {AEd.ui.Person} person New person.  
 */
AEd.ui.DlgPersons.prototype.add = function(person) {
    if (person && this.personsArea) {
        this.personsArea.addItem(person);
    }
}



// --------------------------------------------------------------------- remove
/**
 * Removes person from personsArea or whole dialog
 *
 * @name remove
 * @memberOf AEd.ui.DlgPersons 
 * @function   
 * @param {AEd.ui.Person} person Person to remove.
 */
AEd.ui.DlgPersons.prototype.remove = function(person) {
    //  removing person
    if (person && this.personsArea) {          
        this.personsArea.removeItem(person);        
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
 * Removes all persons from personsArea
 *
 * @name removeAll
 * @memberOf AEd.ui.DlgPersons 
 * @function   
 */
AEd.ui.DlgPersons.prototype.removeAll = function() {

   if (this.personsArea) {

     this.personsArea.removeAllItems();         
   }
}



// -------------------------------------------------------- getInputSearchValue
/**
 * Return value of input element 
 *
 * @name getInputSearchValue
 * @memberOf AEd.ui.DlgPersons 
 * @function   
 * @return {String} Value of input element 
 */
AEd.ui.DlgPersons.prototype.getInputSearchValue = function() {
     return this.domElementInputSearch.value;        
}

// *****************************************************************************
// class AEd.ui.DlgPersons
// ***************************************************************************** 

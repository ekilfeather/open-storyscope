/**
 * AdvancedToolbar.js
 *
 * Contains AEd.ui.AdvancedToolbar class definition. 
 *  
 * @authors: Milos Cudrak, Petr Loukota 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.AdvancedToolbar
// *****************************************************************************  



/**
 * This class creates AdvancedToolbar.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *  
 *    {String}  title         - toolbar title text, 
 *    {String}  width         - toolbar width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height        - toolbar height with or without units, e.g.: "300px" or "100%", default unit is px,  
 *    {String}  minWidth      - toolbar minWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  minHeight     - toolbar minHeight with or without units, e.g.: "300px" or "100%", default unit is px,   
 *    {String}  maxWidth      - toolbar maxWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  maxHeight     - toolbar maxHeight with or without units, e.g.: "300px" or "100%", default unit is px,    
 *    {String}  corners       - rounded toolbar corners: "tl", "tr", "bl", "br", "top", "bottom", "right", "left", "all", "none", default is "all",  
 *    
 *    {Boolean} draggable     - will be toolbar draggable?, 
 *    {Boolean} resizable     - will be toolbar resizable?,  
 *    {Boolean} render        - determines wheteher toolbar should be rendered after creating
 *    {Boolean} center        - determines wheteher toolbar should be centered to screen after rendering
 *    {Boolean} allwaysOnTop  - will be this toolbar allways in the front of other dialogs?,        
 *    {Boolean} showOverlay   - will the overlay layer be displayed?,    
 *    {Element} srcElement     - DOM element to create dialog from. 
 *    {Element} targetElement  - DOM element to render dialog to. Default is document.body. 
 *    {Element} contentElement - DOM element to place as a content of dialog. Default is none.
 * }
 * 
 * @name AdvancedToolbar
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIToolbar 
 */
AEd.ui.AdvancedToolbar = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Advanced_toolbar_title");
   c.minWidth  = AEd.CONFIG.ADVANCED_TOOLBAR_MIN_WIDTH;
   c.minHeight = AEd.CONFIG.ADVANCED_TOOLBAR_MIN_HEIGHT;   
   c.maxWidth  = AEd.CONFIG.ADVANCED_TOOLBAR_MAX_WIDTH;
   c.maxHeight = AEd.CONFIG.ADVANCED_TOOLBAR_MAX_HEIGHT; 
   c.width     = AEd.CONFIG.ADVANCED_TOOLBAR_WIDTH;
   c.height    = AEd.CONFIG.ADVANCED_TOOLBAR_HEIGHT;         
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIToolbar(c));

   this.actualState = null;    // "NOT_LOGGED" | "LOGGED";


      this.btnDocAnnotations = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_docAnnotations"), toggle: true});
      this.buttonsArea.addItem(this.btnDocAnnotations);

      this.btnQuickSuggestions = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_quickSuggestions"), toggle: true});
      this.buttonsArea.addItem(this.btnQuickSuggestions);

      this.btnSuggestAnnotations = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_suggestAnnotations"), toggle: true});  
      this.buttonsArea.addItem(this.btnSuggestAnnotations);

      this.btnSuggestedAnnotations = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_suggestedAnnotations"), toggle: true});
      this.buttonsArea.addItem(this.btnSuggestedAnnotations);

      this.btnDocSuggestions = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_docSuggestions"), toggle: true});
      this.buttonsArea.addItem(this.btnDocSuggestions);

      this.btnPersons = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_persons"), toggle: true});  
      this.buttonsArea.addItem(this.btnPersons);

      this.btnGroups = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_groups"), toggle: true}); 
      this.buttonsArea.addItem(this.btnGroups);

      this.btnSubscriptions = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_subscriptions"), toggle: true});     
      this.buttonsArea.addItem(this.btnSubscriptions);

      this.btnSettings = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_settings"), toggle: true});
      this.buttonsArea.addItem(this.btnSettings);

      this.btnStatusBar = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_statusbar"), toggle: true});
      this.buttonsArea.addItem(this.btnStatusBar);

      this.btnShowAnnoDlgs = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_showAnnoDlgs"), toggle: true});        
      this.buttonsArea.addItem(this.btnShowAnnoDlgs);

}



AEd.ui.AdvancedToolbar.prototype.constructor = AEd.ui.AdvancedToolbar;

AEd.inheritFromPrototype(AEd.ui.AdvancedToolbar, AEd.ui.core.UIToolbar);


// ------------------------------------------------------------------- setState
/**
 * Sets Toolbar state.
 *
 * @name setState
 * @memberOf AEd.ui.AdvancedToolbar 
 * @function   
 * @param {String} state New state.   
 */
AEd.ui.AdvancedToolbar.prototype.setState = function(state) {
    if (typeof state != 'undefined') {
        if (this.actualState != state) {
           this.actualState = state;
           switch (state) {
               case "NOT_LOGGED":
                    this.hide();
                    
                    if (AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 2)
                        this.btnDocAnnotations.hide();
                    if (AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 2)
                        this.btnQuickSuggestions.hide();
                    if (AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 2)
                        this.btnSuggestAnnotations.hide();
                    if (AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 2)
                        this.btnSuggestedAnnotations.hide();
                    if (AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 2)
                        this.btnDocSuggestions.hide();                     
                    if (AEd.CONFIG.DISPLAY_BTNPERSONS == 2)
                        this.btnPersons.hide();
                    if (AEd.CONFIG.DISPLAY_BTNGROUPS == 2)
                        this.btnGroups.hide();
                    if (AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 2)
                        this.btnSubscriptions.hide();
                    if (AEd.CONFIG.DISPLAY_BTNSETTINGS == 2)
                        this.btnSettings.hide();
                    if (AEd.CONFIG.DISPLAY_BTNSTATUSBAR == 2)
                        this.btnStatusBar.hide();
                    if (AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 2)
                        this.btnShowAnnoDlgs.hide();
            
               break;
               
               case "LOGGED":
                    this.hide();
                    
                    if (AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 2)
                        this.btnDocAnnotations.show();
                    if (AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 2)
                        this.btnQuickSuggestions.show();
                    if (AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 2)
                        this.btnSuggestAnnotations.show();
                    if (AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 2)
                        this.btnSuggestedAnnotations.show();
                    if (AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 2)
                        this.btnDocSuggestions.show();                     
                    if (AEd.CONFIG.DISPLAY_BTNPERSONS == 2)
                        this.btnPersons.show();
                    if (AEd.CONFIG.DISPLAY_BTNGROUPS == 2)
                        this.btnGroups.show();
                    if (AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 2)
                        this.btnSubscriptions.show();
                    if (AEd.CONFIG.DISPLAY_BTNSETTINGS == 2)
                        this.btnSettings.show();
                    if (AEd.CONFIG.DISPLAY_BTNSTATUSBAR == 2)
                        this.btnStatusBar.show();
                    if (AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 2)
                        this.btnShowAnnoDlgs.show();
           
               break;
               
               default:
               break;
           }              
        }       
    }
}

// ------------------------------------------------------------------- setStyle
/**
 * Sets AdvancedToolbar style.
 *
 * @name setStyle
 * @memberOf AEd.ui.Toolbar 
 * @function   
 * @param {String} state New style.   
 */
AEd.ui.AdvancedToolbar.prototype.setStyle = function(style){

    if (typeof style != 'undefined') {
        if (this.actualStyle != style) {
           this.actualStyle = style;
           switch (style) {
               case "AllInOne":
                
                    AEd.CONFIG.DISPLAY_BTNADVANCED = 0;
                    AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS = 1;
                    AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS = 1;
                    AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS = 1;
                    AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS = 1;
                    AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS = 1;
                    AEd.CONFIG.DISPLAY_BTNPERSONS = 1;
                    AEd.CONFIG.DISPLAY_BTNGROUPS = 1;
                    AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS = 1;
                    AEd.CONFIG.DISPLAY_BTNSETTINGS = 1;
                    AEd.CONFIG.DISPLAY_BTNSTATUSBAR = 1;
                    AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS = 1;

                    this.hide();

               break;
               
               case "TwoToolbars":

                    AEd.CONFIG.DISPLAY_BTNADVANCED = 1;
                    AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS = 2;
                    AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS = 2;
                    AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS = 2;
                    AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS = 2;
                    AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS = 2;
                    AEd.CONFIG.DISPLAY_BTNPERSONS = 2;
                    AEd.CONFIG.DISPLAY_BTNGROUPS = 2;
                    AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS = 2;
                    AEd.CONFIG.DISPLAY_BTNSETTINGS = 2;
                    AEd.CONFIG.DISPLAY_BTNSTATUSBAR = 2;
                    AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS = 2;

                    this.btnDocAnnotations.show();
                    this.btnQuickSuggestions.show();
                    this.btnSuggestAnnotations.show(); 
                    this.btnSuggestedAnnotations.show();
                    this.btnDocSuggestions.show();
                    this.btnPersons.show();
                    this.btnGroups.show();
                    this.btnSubscriptions.show();   
                    this.btnSettings.show();
                    this.btnStatusBar.show();
                    this.btnShowAnnoDlgs.show();


               break;
               
               default:
               break;
           }      
        }       
    }

}


// ------------------------------------------------------------------- setSelected
/**
 * Sets buttons selected or unselected.
 * Method is called on login and logout, some buttons are commented!
 *
 * @name setSelected
 * @memberOf AEd.ui.AdvancedToolbar 
 * @function   
 * @param {Boolean} selected If button show be selected or not.   
 */
AEd.ui.AdvancedToolbar.prototype.setSelected = function(state) {
    switch (state) {
        case true:                 
            if (AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 2)
                this.btnShowAnnoDlgs.setSelected(true);
        break;
        
        case false:
            if (AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 2)
                this.btnDocAnnotations.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 2)
                this.btnQuickSuggestions.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 2)
                this.btnSuggestAnnotations.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 2)
                this.btnSuggestedAnnotations.setSelected(false);            
            if (AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 2)
                this.btnDocSuggestions.setSelected(false);    
            if (AEd.CONFIG.DISPLAY_BTNPERSONS == 2)
                this.btnPersons.setSelected(false);    
            if (AEd.CONFIG.DISPLAY_BTNGROUPS == 2)
                this.btnGroups.setSelected(false);    
            if (AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 2)
                this.btnSubscriptions.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNSETTINGS == 2)
                this.btnSettings.setSelected(false);         
            if (AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 2)
                this.btnShowAnnoDlgs.setSelected(false);
        break;
        
        default:
        break;
    }
}



// *****************************************************************************
// class AEd.ui.AdvancedToolbar
// ***************************************************************************** 

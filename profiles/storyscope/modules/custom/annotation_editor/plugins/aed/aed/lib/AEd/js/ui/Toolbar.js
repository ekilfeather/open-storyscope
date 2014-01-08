/**
 * Toolbar.js
 *
 * Contains AEd.ui.Toolbar class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.Toolbar
// *****************************************************************************  



/**
 * This class creates Toolbar.
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
 *     {Boolean} showOverlay   - will the overlay layer be displayed?,    
 *    {Element} srcElement     - DOM element to create dialog from. 
 *    {Element} targetElement  - DOM element to render dialog to. Default is document.body. 
 *    {Element} contentElement - DOM element to place as a content of dialog. Default is none.
 * }
 * 
 * @name Toolbar
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIToolbar 
 */
AEd.ui.Toolbar = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Toolbar_title");
   c.minWidth  = AEd.CONFIG.TOOLBAR_MIN_WIDTH;
   c.minHeight = AEd.CONFIG.TOOLBAR_MIN_HEIGHT;   
   c.maxWidth  = AEd.CONFIG.TOOLBAR_MAX_WIDTH;
   c.maxHeight = AEd.CONFIG.TOOLBAR_MAX_HEIGHT; 
   c.width     = AEd.CONFIG.TOOLBAR_WIDTH;
   c.height    = AEd.CONFIG.TOOLBAR_HEIGHT;         
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIToolbar(c));

   this.actualState = null;    // "NOT_LOGGED" | "LOGGED";
   this.actualStyle = null;    // "AllInOne"   | "TwoToolbars"
   
   // create always
   this.btnConnect = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_connect"), toggle: false});
   this.buttonsArea.addItem(this.btnConnect); 
   this.btnAnnotate = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_annotate"), toggle: true});
   this.buttonsArea.addItem(this.btnAnnotate);
   this.btnAdvanced = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_advanced"), toggle: true});
   this.buttonsArea.addItem(this.btnAdvanced);

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
   
   // create always
   this.btnDisconnect = new AEd.ui.core.UIButton({text: AEd.I18n.t("Toolbar_button_disconnect"), toggle: false});
   this.buttonsArea.addItem(this.btnDisconnect); 
}



AEd.ui.Toolbar.prototype.constructor = AEd.ui.Toolbar;

AEd.inheritFromPrototype(AEd.ui.Toolbar, AEd.ui.core.UIToolbar);


// ------------------------------------------------------------------- setState
/**
 * Sets Toolbar state.
 *
 * @name setState
 * @memberOf AEd.ui.Toolbar 
 * @function   
 * @param {String} state New state.   
 */
AEd.ui.Toolbar.prototype.setState = function(state) {
    if (typeof state != 'undefined') {
        if (this.actualState != state) {
           this.actualState = state;
           switch (state) {
               case "NOT_LOGGED":
                    // always exist
                    if (AEd.CONFIG.AED_AUTH_TYPE == 1)
                        this.btnConnect.hide();
                    else
                        this.btnConnect.show();
                    this.btnAnnotate.hide();
                    this.btnAdvanced.hide();
                    
                    if (AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 0 || AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 1)
                        this.btnDocAnnotations.hide();
                    if (AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 0 || AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 1)
                        this.btnQuickSuggestions.hide();
                    if (AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 0 || AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 1)
                        this.btnSuggestAnnotations.hide();
                    if (AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 0 || AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 1)
                        this.btnSuggestedAnnotations.hide();
                    if (AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 0 || AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 1)
                        this.btnDocSuggestions.hide();                     
                    if (AEd.CONFIG.DISPLAY_BTNPERSONS == 0 || AEd.CONFIG.DISPLAY_BTNPERSONS == 1)
                        this.btnPersons.hide();
                    if (AEd.CONFIG.DISPLAY_BTNGROUPS == 0 || AEd.CONFIG.DISPLAY_BTNGROUPS == 1)
                        this.btnGroups.hide();
                    if (AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 0 || AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 1)
                        this.btnSubscriptions.hide();
                    if (AEd.CONFIG.DISPLAY_BTNSETTINGS == 0 || AEd.CONFIG.DISPLAY_BTNSETTINGS == 1)
                        this.btnSettings.hide();
                    if (AEd.CONFIG.DISPLAY_BTNSTATUSBAR == 0 || AEd.CONFIG.DISPLAY_BTNSTATUSBAR == 1) {
                        if (AEd.CONFIG.DISPLAY_BTNSTATUSBAR == 0)
                            this.btnStatusBar.hide();
                        else if (AEd.CONFIG.DISPLAY_BTNSTATUSBAR == 1)
                            this.btnStatusBar.show();
                    }
                    if (AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 0 || AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 1)
                        this.btnShowAnnoDlgs.hide();
                    
                    // always exist
                    this.btnDisconnect.hide();              
               break;
               
               case "LOGGED":
                    // always exist
                    this.btnConnect.hide();
                    this.btnAnnotate.show();
                    if (AEd.CONFIG.DISPLAY_BTNADVANCED == 0) this.btnAdvanced.hide(); else this.btnAdvanced.show();
                    
                    if (AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 0 || AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 1) {
                        if (AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 0) this.btnDocAnnotations.hide(); else this.btnDocAnnotations.show();
                    }
                    if (AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 0 || AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 1) {
                        if (AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 0) this.btnQuickSuggestions.hide(); else this.btnQuickSuggestions.show();
                    }
                    if (AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 0 || AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 1) {
                        if (AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 0) this.btnSuggestAnnotations.hide(); else this.btnSuggestAnnotations.show();
                    }
                    if (AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 0 || AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 1) {
                        if (AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 0) this.btnSuggestedAnnotations.hide(); else this.btnSuggestedAnnotations.show();
                    }
                    if (AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 0 || AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 1) {
                        if (AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 0) this.btnDocSuggestions.hide(); else this.btnDocSuggestions.show();
                    }
                    if (AEd.CONFIG.DISPLAY_BTNPERSONS == 0 || AEd.CONFIG.DISPLAY_BTNPERSONS == 1) {
                        if (AEd.CONFIG.DISPLAY_BTNPERSONS == 0) this.btnPersons.hide(); else this.btnPersons.show();
                    }
                    if (AEd.CONFIG.DISPLAY_BTNGROUPS == 0 || AEd.CONFIG.DISPLAY_BTNGROUPS == 1) {
                        if (AEd.CONFIG.DISPLAY_BTNGROUPS == 0) this.btnGroups.hide(); else this.btnGroups.show();
                    }
                    if (AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 0 || AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 1) {
                        if (AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 0) this.btnSubscriptions.hide(); else this.btnSubscriptions.show();
                    }
                    if (AEd.CONFIG.DISPLAY_BTNSETTINGS == 0 || AEd.CONFIG.DISPLAY_BTNSETTINGS == 1) {
                        if (AEd.CONFIG.DISPLAY_BTNSETTINGS == 0) this.btnSettings.hide(); else this.btnSettings.show();
                    }
                    if (AEd.CONFIG.DISPLAY_BTNSTATUSBAR == 0 || AEd.CONFIG.DISPLAY_BTNSTATUSBAR == 1) {
                        if (AEd.CONFIG.DISPLAY_BTNSTATUSBAR == 0) this.btnStatusBar.hide(); else this.btnStatusBar.show();
                    }
                    if (AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 0 || AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 1) {
                        if (AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 0) this.btnShowAnnoDlgs.hide(); else this.btnShowAnnoDlgs.show();
                    }
                    
                    // always exist
                    if (AEd.CONFIG.AED_AUTH_TYPE == 1)
                        this.btnDisconnect.hide();
                    else {
                        if (AEd.CONFIG.DISPLAY_BTNDISCONNECT == 0) this.btnDisconnect.hide(); else this.btnDisconnect.show();
                    }
               break;               
               default:
               break;
           }              
        }       
    }
}

// ------------------------------------------------------------------- setStyle
/**
 * Sets Toolbar style.
 *
 * @name setStyle
 * @memberOf AEd.ui.Toolbar 
 * @function   
 * @param {String} state New style.   
 */
AEd.ui.Toolbar.prototype.setStyle = function(style){

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

                    this.btnAdvanced.hide();
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

                    this.setWidth(AEd.CONFIG.ADVANCED_TOOLBAR_MIN_WIDTH);
                    this.setHeight(AEd.CONFIG.ADVANCED_TOOLBAR_MIN_HEIGHT);   


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

                    this.btnAdvanced.show();
                    this.btnAdvanced.setSelected(false);
                    this.btnDocAnnotations.hide();
                    this.btnQuickSuggestions.hide();
                    this.btnSuggestAnnotations.hide(); 
                    this.btnSuggestedAnnotations.hide();
                    this.btnDocSuggestions.hide();
                    this.btnPersons.hide();
                    this.btnGroups.hide();
                    this.btnSubscriptions.hide();   
                    this.btnSettings.hide();
                    this.btnStatusBar.hide();
                    this.btnShowAnnoDlgs.hide();

                    this.setWidth(AEd.CONFIG.TOOLBAR_MIN_WIDTH);
                    this.setHeight(AEd.CONFIG.TOOLBAR_MIN_HEIGHT);  

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
 * @memberOf AEd.ui.Toolbar 
 * @function   
 * @param {Boolean} selected If button show be selected or not.   
 */
AEd.ui.Toolbar.prototype.setSelected = function(state) {
    switch (state) {
        case true:        
            if (AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 0 || AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 1)
                this.btnShowAnnoDlgs.setSelected(true);
            
        break;
        
        case false:
            this.btnAnnotate.setSelected(false);
            this.btnAdvanced.setSelected(false);
            
            if (AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 0 || AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 1)
                this.btnDocAnnotations.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 0 || AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 1)
                this.btnQuickSuggestions.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 0 || AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 1)
                this.btnSuggestAnnotations.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 0 || AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 1)
                this.btnSuggestedAnnotations.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 0 || AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 1)
                this.btnDocSuggestions.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNPERSONS == 0 || AEd.CONFIG.DISPLAY_BTNPERSONS == 1)
                this.btnPersons.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNGROUPS == 0 || AEd.CONFIG.DISPLAY_BTNGROUPS == 1)
                this.btnGroups.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 0 || AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 1)
                this.btnSubscriptions.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNSETTINGS == 0 || AEd.CONFIG.DISPLAY_BTNSETTINGS == 1)
                this.btnSettings.setSelected(false);
            if (AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 0 || AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 1)
                this.btnShowAnnoDlgs.setSelected(false); 
        break;
        
        default:
        break;
    }
}
   


// *****************************************************************************
// class AEd.ui.Toolbar
// ***************************************************************************** 

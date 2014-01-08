/**
 * EditorGUI.js
 *
 * Contains AEd.editors.EditorGUI class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.editors.EditorGUI 
// *****************************************************************************  



/**
 * This class is used to create annotation editor GUI.
 * 
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *    {Boolean} render        - determines wheteher GUI should be rendered after creating
 *    {Element} targetElement  - DOM element to render GUI to. Default is document.body. 
 * }
 *     
 * @name EditorGUI
 * @memberOf AEd.editors        
 * @class 
 */
AEd.editors.EditorGUI = function(config) {
    
    var c = config || {}; 
    
    this.DEFAULT_RENDER         = true;
    this.DEFAULT_TARGET_ELEMENT = document.body;
    
    c.render = (typeof c.render != "undefined") ? c.render : this.DEFAULT_RENDER ;   
    c.targetElement = (typeof c.targetElement != "undefined") ? c.targetElement : this.DEFAULT_TARGET_ELEMENT ;
 
    
    /**
     * Element to render GUI to.             
     * @name domElementTarget
     * @memberOf AEd.editors.EditorGUI
     * @type Element 
     * @property                        
     */   
    this.domElementTarget = null;         

    if (c.targetElement instanceof AEd.dom.Element) {
        this.domElementTarget = c.targetElement.domElement;
    }
    else {
        this.domElementTarget = c.targetElement;
    }
    
    
    /**
     * Toolbar GUI component             
     * @name toolbar
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.Toolbar 
     * @property                        
     */         
    this.toolbar = new AEd.ui.Toolbar({render: c.render, targetElement: this.domElementTarget});

    /**
     * Advanced toolbar GUI component             
     * @name advancedToolbar
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.AdvancedToolbar 
     * @property                        
     */         
    this.advancedToolbar = new AEd.ui.AdvancedToolbar({render: c.render, targetElement: this.domElementTarget});
    
    
    /**
     * StatusBar GUI component             
     * @name dlgStatusBar
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.StatusBar 
     * @property                        
     */    
    this.dlgStatusBar = new AEd.ui.DlgStatusBar({render: c.render, targetElement: this.domElementTarget}); 
    
      
    /**
     * DlgConnect GUI component             
     * @name dlgConnect
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgConnect 
     * @property                        
     */    
    this.dlgConnect = new AEd.ui.DlgConnect({render: c.render, targetElement: this.domElementTarget});
    
    
    /**
     * DlgAnnotate GUI component             
     * @name dlgAnnotate
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgAnnotate 
     * @property                        
     */    
    this.dlgAnnotate = new AEd.ui.DlgAnnotate({render: c.render, targetElement: this.domElementTarget});    
    
    
    /**
     * DlgSettings GUI component             
     * @name dlgSettings
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgSettings 
     * @property                        
     */    
    this.dlgSettings = new AEd.ui.DlgSettings({render: c.render, targetElement: this.domElementTarget});    
    
    /**
     * DlgPersons GUI component             
     * @name dlgPersons
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgPersons 
     * @property                        
     */    
    this.dlgPersons = new AEd.ui.DlgPersons({render: c.render, targetElement: this.domElementTarget});       
   
    /**
     * DlgGroups GUI component             
     * @name dlgGroups
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgGroups 
     * @property                        
     */    
    this.dlgGroups = new AEd.ui.DlgGroups({render: c.render, targetElement: this.domElementTarget}); 
    
    /**
     * DlgTypes GUI component             
     * @name dlgTypes
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgTypes 
     * @property                        
     */    
    this.dlgTypes = new AEd.ui.DlgTypes({render: c.render, targetElement: this.domElementTarget}); 
    
    /**
     * DlgAttrTypes GUI component             
     * @name dlgAttrTypes
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgTypes 
     * @property                        
     */    
    this.dlgAttrTypes = new AEd.ui.DlgAttrTypes({render: c.render, targetElement: this.domElementTarget});

    /**
     * DlgAttrFromOntology GUI component             
     * @name DlgAttrFromOntology
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgAttrFromOntology 
     * @property                        
     */    
    this.dlgAttrFromOntology = new AEd.ui.DlgAttrFromOntology({render: c.render, targetElement: this.domElementTarget});
    
    /**
     * DlgSynchronize GUI component             
     * @name dlgSynchronize
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgSynchronize 
     * @property                        
     */    
    this.dlgSynchronize = new AEd.ui.DlgSynchronize({render: c.render, targetElement: this.domElementTarget});    
    
    /**
     * DlgSubscriptions GUI component             
     * @name dlgSubscriptions
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgSubscriptions 
     * @property                        
     */    
    this.dlgSubscriptions = new AEd.ui.DlgSubscriptions({render: c.render, targetElement: this.domElementTarget});  
    
    /**
     * DlgDocAnnotations GUI component             
     * @name dlgDocAnnotations
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgDocAnnotations 
     * @property                        
     */    
    this.dlgDocAnnotations = new AEd.ui.DlgDocAnnotations({render: c.render, targetElement: this.domElementTarget});        

    /**
     * DlgSuggestAnnotations GUI component             
     * @name dlgSuggestAnnotations
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgSuggestAnnotations 
     * @property                        
     */    
    this.dlgSuggestAnnotations = new AEd.ui.DlgSuggestAnnotations({render: c.render, targetElement: this.domElementTarget});  
    
    /**
     * DlgSuggestedAnnotations GUI component             
     * @name dlgSuggestedAnnotations
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgSuggestedAnnotations 
     * @property                        
     */    
    this.dlgSuggestedAnnotations = new AEd.ui.DlgSuggestedAnnotations({render: c.render, targetElement: this.domElementTarget});
     
    /**
     * DlgDocSuggestions GUI component             
     * @name dlgDocSuggestions
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgDocSuggestions 
     * @property                        
     */    
    this.dlgDocSuggestions = new AEd.ui.DlgDocSuggestions({render: c.render, targetElement: this.domElementTarget});
      
    /**
     * DlgTypeColors GUI component             
     * @name dlgTypeColors
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.DlgTypeColors 
     * @property                        
     */    
    this.dlgTypeColors = new AEd.ui.DlgTypeColors({render: c.render, targetElement: this.domElementTarget});

    /**
     * dlgNotConnected GUI component             
     * @name dlgNotConnected
     * @memberOf AEd.editors.EditorGUI
     * @type AEd.ui.dlgNotConnected 
     * @property                        
     */ 

    this.dlgNotConnected = new AEd.ui.core.UIDialog({
          render: false,
          showOverlay: true,
          title: AEd.I18n.t("Dlg_not_connected_title"),
          width: AEd.CONFIG.DLG_MESSAGE_WIDTH,
          height: AEd.CONFIG.DLG_MESSAGE_HEIGHT
    });
}


AEd.editors.EditorGUI.prototype.constructor = AEd.editors.EditorGUI;




// ----------------------------------------------------------- EditorGUI.render
/**
 * Renders editor GUI.  
 *
 * @name renderTo
 * @memberOf AEd.editors.EditorGUI
 * @function    
 * @param {Element} element Optional element to render editor GUI to.   
 *  	
 */
AEd.editors.EditorGUI.prototype.render = function(element) {
    if (element) {
        this.domElementTarget = element;
        
        this.toolbar.render(this.domElementTarget);
        this.advancedToolbar.render(this.domElementTarget);
        this.dlgStatusBar.render(this.domElementTarget);                
        this.dlgConnect.render(this.domElementTarget);
        this.dlgAnnotate.render(this.domElementTarget);
        this.dlgSettings.render(this.domElementTarget);  
        this.dlgPersons.render(this.domElementTarget); 
        this.dlgGroups.render(this.domElementTarget);         
        this.dlgTypes.render(this.domElementTarget); 
        this.dlgAttrTypes.render(this.domElementTarget); 
        this.dlgAttrFromOntology.render(this.domElementTarget);  
        this.dlgSynchronize.render(this.domElementTarget);    
        this.dlgSubscriptions.render(this.domElementTarget);    
        this.dlgDocAnnotations.render(this.domElementTarget);    
        this.dlgSuggestAnnotations.render(this.domElementTarget);    
        this.dlgSuggestedAnnotations.render(this.domElementTarget);
        this.dlgDocSuggestions.render(this.domElementTarget);                                    
        this.dlgTypeColors.render(this.domElementTarget);
       
        AEd.Dialogs.add(this.toolbar, "toolbar");
        AEd.Dialogs.add(this.advancedToolbar, "toolbar");
        AEd.Dialogs.add(this.dlgStatusBar, "dialog");
        AEd.Dialogs.add(this.dlgConnect, "modal");     
        AEd.Dialogs.add(this.dlgAnnotate, "dialog");
        AEd.Dialogs.add(this.dlgSettings, "dialog");   
        AEd.Dialogs.add(this.dlgPersons, "dialog");   
        AEd.Dialogs.add(this.dlgGroups, "dialog"); 
        AEd.Dialogs.add(this.dlgTypes, "modal");                   
        AEd.Dialogs.add(this.dlgAttrTypes, "modal");  
        AEd.Dialogs.add(this.dlgAttrFromOntology, "doublemodal");         
        AEd.Dialogs.add(this.dlgSynchronize, "dialog"); 
        AEd.Dialogs.add(this.dlgSubscriptions, "dialog"); 
        AEd.Dialogs.add(this.dlgDocAnnotations, "dialog"); 
        AEd.Dialogs.add(this.dlgSuggestAnnotations, "dialog"); 
        AEd.Dialogs.add(this.dlgSuggestedAnnotations, "dialog");
        AEd.Dialogs.add(this.dlgDocSuggestions, "dialog");                                 
        AEd.Dialogs.add(this.dlgTypeColors, "dialog"); 
        
        if (AEd.CONFIG.TOOLBAR_INIT_POS_X && AEd.CONFIG.TOOLBAR_INIT_POS_Y) {
            this.toolbar.moveTo(AEd.CONFIG.TOOLBAR_INIT_POS_X + AEd.DOM.getScrollX(), AEd.CONFIG.TOOLBAR_INIT_POS_Y + AEd.DOM.getScrollY());
            this.advancedToolbar.moveTo(AEd.CONFIG.ADVANCED_TOOLBAR_INIT_POS_X + AEd.DOM.getScrollX(), AEd.CONFIG.ADVANCED_TOOLBAR_INIT_POS_Y + AEd.DOM.getScrollY());
        }
                
        if (AEd.CONFIG.DLG_STATUSBAR_INIT_POS_X && AEd.CONFIG.DLG_STATUSBAR_INIT_POS_Y) {
            this.dlgStatusBar.moveTo(AEd.CONFIG.DLG_STATUSBAR_INIT_POS_X + AEd.DOM.getScrollX(), AEd.CONFIG.DLG_STATUSBAR_INIT_POS_Y + AEd.DOM.getScrollY());
        }
     
    }
    else {
        this.render(this.domElementTarget);
    }
} 


// ------------------------------------------------------------- EditorGUI.hide
/**
 * Hides editor GUI.
 *
 * @name hide
 * @memberOf AEd.editors.EditorGUI
 * @function
 * @param {Boolean} loggedOut Hide on logout.      
 *  	
 */
AEd.editors.EditorGUI.prototype.hide = function(loggedOut) {

   if (!loggedOut) {
       this.toolbar.setTag("lastStateOfIsHidden", this.toolbar.isHidden);
       this.toolbar.hide();

       this.advancedToolbar.setTag("lastStateOfIsHidden", this.advancedToolbar.isHidden);
       this.toolbar.hide();

       this.dlgStatusBar.setTag("lastStateOfIsHidden", this.dlgStatusBar.isHidden);
       this.dlgStatusBar.hide();
   }   
   
   this.dlgConnect.setTag("lastStateOfIsHidden", this.dlgConnect.isHidden);
   this.dlgConnect.hide();
   
   this.dlgAnnotate.setTag("lastStateOfIsHidden", this.dlgAnnotate.isHidden);
   this.dlgAnnotate.hide();   

   this.dlgSettings.setTag("lastStateOfIsHidden", this.dlgSettings.isHidden);
   this.dlgSettings.hide();   
   
   this.dlgPersons.setTag("lastStateOfIsHidden", this.dlgPersons.isHidden);
   this.dlgPersons.hide();    
   
   this.dlgGroups.setTag("lastStateOfIsHidden", this.dlgGroups.isHidden);
   this.dlgGroups.hide();       
   
   this.dlgTypes.setTag("lastStateOfIsHidden", this.dlgTypes.isHidden);
   this.dlgTypes.hide();      
   
   this.dlgAttrTypes.setTag("lastStateOfIsHidden", this.dlgAttrTypes.isHidden);
   this.dlgAttrTypes.hide();

   this.dlgAttrFromOntology.setTag("lastStateOfIsHidden", this.dlgAttrFromOntology.isHidden); 
   this.dlgAttrFromOntology.hide(); 

   this.dlgSynchronize.setTag("lastStateOfIsHidden", this.dlgSynchronize.isHidden);
   this.dlgSynchronize.hide(); 
   
   this.dlgSubscriptions.setTag("lastStateOfIsHidden", this.dlgSubscriptions.isHidden);
   this.dlgSubscriptions.hide(); 
   
   this.dlgDocAnnotations.setTag("lastStateOfIsHidden", this.dlgDocAnnotations.isHidden);
   this.dlgDocAnnotations.hide(); 
   
   this.dlgSuggestAnnotations.setTag("lastStateOfIsHidden", this.dlgSuggestAnnotations.isHidden);
   this.dlgSuggestAnnotations.hide(); 
   
   this.dlgSuggestedAnnotations.setTag("lastStateOfIsHidden", this.dlgSuggestedAnnotations.isHidden);
   this.dlgSuggestedAnnotations.hide();
   
   this.dlgDocSuggestions.setTag("lastStateOfIsHidden", this.dlgDocSuggestions.isHidden);
   this.dlgDocSuggestions.hide();             
   
   this.dlgTypeColors.setTag("lastStateOfIsHidden", this.dlgTypeColors.isHidden);
   this.dlgTypeColors.hide();   
} 


// ------------------------------------------------------------- EditorGUI.show
/**
 * Shows hidden editor GUI.
 *
 * @name show
 * @memberOf AEd.editors.EditorGUI
 * @function   
 *  	
 */
AEd.editors.EditorGUI.prototype.show = function() {

   if (!this.toolbar.getTag("lastStateOfIsHidden")) {this.toolbar.show();}
   if (!this.advancedToolbar.getTag("lastStateOfIsHidden")) {this.advancedToolbar.show();}
   if (!this.dlgStatusBar.getTag("lastStateOfIsHidden")) {this.dlgStatusBar.show();}   
   if (!this.dlgConnect.getTag("lastStateOfIsHidden")) {this.dlgConnect.show();}
   if (!this.dlgAnnotate.getTag("lastStateOfIsHidden")) {this.dlgAnnotate.show();}
   if (!this.dlgSettings.getTag("lastStateOfIsHidden")) {this.dlgSettings.show();}
   if (!this.dlgPersons.getTag("lastStateOfIsHidden")) {this.dlgPersons.show();}   
   if (!this.dlgGroups.getTag("lastStateOfIsHidden")) {this.dlgGroups.show();}     
   if (!this.dlgTypes.getTag("lastStateOfIsHidden")) {this.dlgTypes.show();} 
   if (!this.dlgAttrTypes.getTag("lastStateOfIsHidden")) {this.dlgAttrTypes.show();} 
   if (!this.dlgAttrFromOntology.getTag("lastStateOfIsHidden")) {this.dlgAttrFromOntology.show();}   
   if (!this.dlgSynchronize.getTag("lastStateOfIsHidden")) {this.dlgSynchronize.show();} 
   if (!this.dlgSubscriptions.getTag("lastStateOfIsHidden")) {this.dlgSubscriptions.show();} 
   if (!this.dlgDocAnnotations.getTag("lastStateOfIsHidden")) {this.dlgDocAnnotations.show();} 
   if (!this.dlgSuggestAnnotations.getTag("lastStateOfIsHidden")) {this.dlgSuggestAnnotations.show();}  
   if (!this.dlgSuggestedAnnotations.getTag("lastStateOfIsHidden")) {this.dlgSuggestedAnnotations.show();}
   if (!this.dlgDocSuggestions.getTag("lastStateOfIsHidden")) {this.dlgDocSuggestions.show();}
   if (!this.dlgTypeColors.getTag("lastStateOfIsHidden")) {this.dlgTypeColors.show();}               
} 


// ---------------------------------------------------------- EditorGUI.destroy
/**
 * Removes editor GUI.  
 *
 * @name remove
 * @memberOf AEd.editors.EditorGUI
 * @function   
 *  	
 */
AEd.editors.EditorGUI.prototype.destroy = function() {
    AEd.Dialogs.remove(this.toolbar);
    AEd.Dialogs.remove(this.advancedToolbar);
    AEd.Dialogs.remove(this.dlgStatusBar); 
    AEd.Dialogs.remove(this.dlgConnect);
    AEd.Dialogs.remove(this.dlgAnnotate);
    AEd.Dialogs.remove(this.dlgSettings);
    AEd.Dialogs.remove(this.dlgPersons);  
    AEd.Dialogs.remove(this.dlgGroups);      
    AEd.Dialogs.remove(this.dlgTypes);  
    AEd.Dialogs.remove(this.dlgAttrTypes); 
    AEd.Dialogs.remove(this.dlgAttrFromOntology);   
    AEd.Dialogs.remove(this.dlgSynchronize);
    AEd.Dialogs.remove(this.dlgSubscriptions);
    AEd.Dialogs.remove(this.dlgDocAnnotations);
    AEd.Dialogs.remove(this.dlgSuggestAnnotations);
    AEd.Dialogs.remove(this.dlgSuggestedAnnotations);
    AEd.Dialogs.remove(this.dlgDocSuggestions);                
    AEd.Dialogs.remove(this.dlgTypeColors);
             
    this.toolbar.remove();
    this.advancedToolbar.remove();
    this.dlgStatusBar.remove();
    this.dlgConnect.remove();
    this.dlgAnnotate.remove();  
    this.dlgSettings.remove(); 
    this.dlgPersons.remove(); 
    this.dlgGroups.remove();  
    this.dlgTypes.remove();
    this.dlgAttrTypes.remove();  
    this.dlgAttrFromOntology.remove();    
    this.dlgSynchronize.remove();   
    this.dlgSubscriptions.remove();   
    this.dlgDocAnnotations.remove();   
    this.dlgSuggestAnnotations.remove();   
    this.dlgSuggestedAnnotations.remove();
    this.dlgDocSuggestions.remove();                   
    this.dlgTypeColors.remove();
     
} 


// --------------------------------------------------------- EditorGUI.setState
/**
 * Sets GUI to specified state  
 * @example
 * this.gui.setState("NOT_LOGGED"); 
 * this.gui.setState("LOGGED");  
 *  
 * @name setState
 * @memberOf AEd.editors.EditorGUI
 * @function   
 * @param {String} state New state.
 *  	
 */
AEd.editors.EditorGUI.prototype.setState = function(state) {
   if (typeof state != "undefined") {
       switch (state) {
           case "LOGGED":   
               this.toolbar.setTag("lastStateOfIsHidden", false);
               this.dlgStatusBar.setTag("lastStateOfIsHidden", true);     
               this.advancedToolbar.setTag("lastStateOfIsHidden", true);
               this.dlgConnect.setTag("lastStateOfIsHidden", true);  
               this.dlgAnnotate.setTag("lastStateOfIsHidden", true); 
               this.dlgSettings.setTag("lastStateOfIsHidden", true);                                           
               this.dlgPersons.setTag("lastStateOfIsHidden", true); 
               this.dlgGroups.setTag("lastStateOfIsHidden", true);                
               this.dlgTypes.setTag("lastStateOfIsHidden", true); 
               this.dlgAttrTypes.setTag("lastStateOfIsHidden", true);  
               this.dlgAttrFromOntology.setTag("lastStateOfIsHidden", true);              
               this.dlgSynchronize.setTag("lastStateOfIsHidden", true); 
               this.dlgSubscriptions.setTag("lastStateOfIsHidden", true); 
               this.dlgDocAnnotations.setTag("lastStateOfIsHidden", true); 
               this.dlgSuggestAnnotations.setTag("lastStateOfIsHidden", true); 
               this.dlgSuggestedAnnotations.setTag("lastStateOfIsHidden", true);
               this.dlgDocSuggestions.setTag("lastStateOfIsHidden", true);                                                                            
               this.dlgTypeColors.setTag("lastStateOfIsHidden", true);
               
               this.toolbar.setState(state);   
               this.advancedToolbar.setState(state);          
           break;
           
           case "NOT_LOGGED":
           default: 
               this.toolbar.setTag("lastStateOfIsHidden", false);
               this.dlgStatusBar.setTag("lastStateOfIsHidden", true);
               this.advancedToolbar.setTag("lastStateOfIsHidden", true);
               this.dlgConnect.setTag("lastStateOfIsHidden", true); 
               this.dlgAnnotate.setTag("lastStateOfIsHidden", true);  
               this.dlgSettings.setTag("lastStateOfIsHidden", true);              
               this.dlgPersons.setTag("lastStateOfIsHidden", true); 
               this.dlgGroups.setTag("lastStateOfIsHidden", true); 
               this.dlgTypes.setTag("lastStateOfIsHidden", true); 
               this.dlgAttrTypes.setTag("lastStateOfIsHidden", true);   
               this.dlgAttrFromOntology.setTag("lastStateOfIsHidden", true);
               this.dlgSynchronize.setTag("lastStateOfIsHidden", true); 
               this.dlgSubscriptions.setTag("lastStateOfIsHidden", true); 
               this.dlgDocAnnotations.setTag("lastStateOfIsHidden", true); 
               this.dlgSuggestAnnotations.setTag("lastStateOfIsHidden", true); 
               this.dlgSuggestedAnnotations.setTag("lastStateOfIsHidden", true);                              
               this.dlgDocSuggestions.setTag("lastStateOfIsHidden", true);
               this.dlgTypeColors.setTag("lastStateOfIsHidden", true);
               
               this.toolbar.setState(state);  
               this.advancedToolbar.setState(state);          
           break;         
       
       }

   }
 
} 



// ------------------------------------------------------ EditorGUI.showMessage
/**
 * Shows message dialog  
 *
 * @name showMessage
 * @memberOf AEd.editors.EditorGUI
 * @function   
 * @param {String} title Message title. 
 * @param {String} text Message text. 
 * @param {String} msgType Type of message : "error, warning, ..." defined in UIMessage.js.   	
 */
AEd.editors.EditorGUI.prototype.showMessage = function(title, text, msgType) {
    
    var dlg = new AEd.ui.core.UIDialog({
        render: false,
        showOverlay: true,
        title: AEd.I18n.t("Dlg_message_title"),
        width: AEd.CONFIG.DLG_MESSAGE_WIDTH,
        height: AEd.CONFIG.DLG_MESSAGE_HEIGHT
    });
    
    var msg = new AEd.ui.core.UIMessage({
       title: title,
       headerContent: text,
       icon: msgType
    });
    
    dlg.contentArea.addItem(msg);
    
    var btnClose = new AEd.ui.core.UIButton({icon: "close"}); 
    var btnOk = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_message_ok")});
    
    dlg.headerButtonsArea.addItem(btnClose);
    dlg.buttonsArea.addItem(btnOk);
    
    btnClose.onClick.addHandler(function() {
        AEd.Dialogs.remove(dlg);
        dlg.remove(); 
    });
    
    btnOk.onClick.addHandler(function() {
        AEd.Dialogs.remove(dlg);
        dlg.remove(); 
    });    

    dlg.render(this.domElementTarget);    
    AEd.Dialogs.add(dlg, "modal");
} 



// ------------------------------------------------------ EditorGUI.showConfirm
/**
 * Shows confirmation dialog  
 *
 * @name showConfirm
 * @memberOf AEd.editors.EditorGUI
 * @function   
 * @param {String} title Message title. 
 * @param {String} text Message text. 
 * @param {String} msgType Type of message : "error, warning, ..." defined in UIMessage.js.  	     
 * @param {Function} onYes    On YES button click handler.  
 * @param {Object} onYesScope On YES button click handler scope. 
 * @param {Function} onNo     On NO button click handler.   
 * @param {Object} onNoScope  On NO button click handler scope.      
 */
AEd.editors.EditorGUI.prototype.showConfirm = function(title, text, msgType, onYes, onYesScope, onNo, onNoScope) {
    
    var dlg = new AEd.ui.core.UIDialog({
        render: false,
        showOverlay: true,
        title: AEd.I18n.t("Dlg_confirm_title"),
        width: AEd.CONFIG.DLG_CONFIRM_WIDTH,
        height: AEd.CONFIG.DLG_CONFIRM_HEIGHT
    });
    
    var msg = new AEd.ui.core.UIMessage({
       title: title,
       headerContent: text,
       icon: msgType
    });
    
    msg.domElementHeader.style.paddingRight = "0px";
    dlg.contentArea.addItem(msg);
    
    var btnClose = new AEd.ui.core.UIButton({icon: "close"}); 
    var btnYes = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_confirm_yes")});
    var btnNo = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_confirm_no")});
    
    dlg.headerButtonsArea.addItem(btnClose);
    dlg.buttonsArea.addItem(btnYes);
    dlg.buttonsArea.addItem(btnNo);
        
    btnClose.onClick.addHandler(function() {
        AEd.Dialogs.remove(dlg);
        dlg.remove(); 
    });
    
    btnYes.onClick.addHandler(function () {
        AEd.Dialogs.remove(dlg);
        dlg.remove();     
    }); 
    
    btnNo.onClick.addHandler(function () {
        AEd.Dialogs.remove(dlg);
        dlg.remove();     
    });    
    
    if (typeof onYes == "function") {        
        if (onYesScope) {
             btnYes.onClick.addHandler(onYes, onYesScope);  
        }
        else {
            btnYes.onClick.addHandler(onYes);  
        }       
    }
    
    if (typeof onNo == "function") {    
        if (onNoScope) {
             btnNo.onClick.addHandler(onNo, onNoScope);   
        }
        else {
            btnNo.onClick.addHandler(onNo); ;  
        }       
    }    
    
    dlg.render(this.domElementTarget);    
    AEd.Dialogs.add(dlg, "modal");
} 



// ------------------------------------------------ EditorGUI.showCustomConfirm
/**
 * Shows confirmation dialog  
 *
 * @name showCustomConfirm
 * @memberOf AEd.editors.EditorGUI
 * @function   
 * @param {String} title Message title. 
 * @param {String} text Message text. 
 * @param {String} msgType Type of message : "error, warning, ..." defined in UIMessage.js.  	     
 * @param {Array} buttons Array of custom buttons     
 */
AEd.editors.EditorGUI.prototype.showCustomConfirm = function(title, text, msgType, buttons) {
    
    var dlg = new AEd.ui.core.UIDialog({
        render: false,
        showOverlay: true,
        title: AEd.I18n.t("Dlg_confirm_title"),
        width: AEd.CONFIG.DLG_CONFIRM_WIDTH,
        height: AEd.CONFIG.DLG_CONFIRM_HEIGHT
    });
    
    var msg = new AEd.ui.core.UIMessage({
       title: title,
       headerContent: text,
       icon: msgType
    });
    
    dlg.contentArea.addItem(msg);
    
    var btnClose = new AEd.ui.core.UIButton({icon: "close"}); 

    dlg.headerButtonsArea.addItem(btnClose);
                 
    if (buttons) {
        for (var i = 0; i < buttons.length; i++) {
            dlg.buttonsArea.addItem(buttons[i]);
            buttons[i].onClick.addHandler(function () {                    
                AEd.Dialogs.remove(dlg);
                dlg.remove();             
            });
            

        }
    }
     
    btnClose.onClick.addHandler(function() {
        AEd.Dialogs.remove(dlg);
        dlg.remove(); 
    });
  
    dlg.render(this.domElementTarget);    
    AEd.Dialogs.add(dlg, "modal");
} 

// *****************************************************************************
// class AEd.editors.EditorGUI 
// ***************************************************************************** 

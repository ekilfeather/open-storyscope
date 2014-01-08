/**
 * Editor.js
 *
 * Contains AEd.editors.Editor class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.editors.Editor 
// *****************************************************************************  



/**
 * This class is used to create annotation editor instances.
 * 
 * @example
 * 
 * var config = 
 *   id: value,                 // assigned id,
 *   editorType: value,         // "tinymce" | "ckeditor" | ...
 *   editorNativeObject: value, // native wysiwyg editor instance
 * };   
 *       
 * @name Editor
 * @memberOf AEd.editors        
 * @class 
 */



AEd.editors.Editor = function(config) {
    

   // if there is no configutaion object passed
    if (!config) {
        throw new Error(AEd.I18n.t("Error_AEd_editors_Editor_Missing_config_object_argument"));
    }
        
    /**
     * Editor ID.
     * @name id
     * @memberOf AEd.editors.Editor
     * @type String     
     * @property                              
     */      
    this.id = config.id;
    
    /**
     * Editor Type (tinymce" | "ckeditor" | ...)
     * @name editorType
     * @memberOf AEd.editors.Editor
     * @type String     
     * @property                              
     */      
    this.editorType = config.editorType;
    
    /**
     * Native wysiwyg editor instance
     * @name editorNativeObject
     * @memberOf AEd.editors.Editor
     * @type Object     
     * @property                              
     */       
    this.editorNativeObject = config.editorNativeObject;
    
    /**
     * Resource URI 
     * @name resourceUri
     * @memberOf AEd.editors.Editor
     * @type String     
     * @property                              
     */      
    this.resourceUri = config.resourceUri;
    
    /**
     * Resource login
     * @name resourceLogin
     * @memberOf AEd.editors.Editor
     * @type String     
     * @property                              
     */      
    this.resourceLogin = config.resourceLogin;
    
    /**
     * Resource token
     * @name resourceToken
     * @memberOf AEd.editors.Editor
     * @type String     
     * @property                              
     */      
    this.resourceToken = config.resourceToken;
    
    /**
     * Resource system
     * @name resourceSystem
     * @memberOf AEd.editors.Editor
     * @type String     
     * @property                              
     */      
    this.resourceSystem = config.resourceSystem;
    
    /**
     * Resource URI received from server in synchronized message
     * @name resourceUriFromServer
     * @memberOf AEd.editors.Editor
     * @type String     
     * @property                              
     */      
    this.resourceUriFromServer = null;     

    /**
     * Is this editor activated?
     * @name isActive
     * @memberOf AEd.editors.Editor
     * @type Boolean     
     * @property                              
     */   
    this.isActive = false;
    
    /**
     * Instance of WysiwygEditor provides API for working with wysiwyg editor
     * @name wysiwyg
     * @memberOf AEd.editors.Editor
     * @type AEd.wysiwyg.WysiwygEditor     
     * @property                              
     */     
    this.wysiwyg = new AEd.wysiwyg.WysiwygEditor(this.editorType, this.editorNativeObject);
    this.tinymce = new AEd.wysiwyg.TinyMCE(this.editorNativeObject);
    
    /**
     * Provides functionality for server communication
     * @name comm
     * @memberOf AEd.editors.Editor
     * @type AEd.comm.CommUtils    
     * @property                              
     */      
    this.comm    = new AEd.comm.CommUtils(); 

    /**
     * Instance of editor's GUI
     * @name gui
     * @memberOf AEd.editors.Editor
     * @type AEd.editors.EditorGUI    
     * @property                              
     */ 
    this.gui     = new AEd.editors.EditorGUI({render: false});

    /**
     * Instance of editor's controller
     * @name controller
     * @memberOf AEd.editors.Editor
     * @type AEd.editors.EditorController    
     * @property                              
     */ 
    this.controller = new AEd.editors.EditorController(this);    
    
    /**
     * Determines whether editor received msg connected
     * @name isConnected
     * @memberOf AEd.editors.Editor
     * @type Boolean    
     * @property                              
     */  
    this.isConnected = false;

    /**
     * Logged user object
     * @name user
     * @memberOf AEd.editors.Editor
     * @type Object    
     * @property                              
     */  
    this.user = {};   
    this.user.isLogged = false;    
    this.user.id = null;
    this.user.name = null;
    this.user.login = null;
    this.user.email = null;
    this.user.photoUri = null; 
    this.user.groups = null; 
  
    /**
     * Instance of fragments manager
     * @name fragments
     * @memberOf AEd.editors.Editor
     * @type AEd.entities.FragmentsManager    
     * @property                              
     */  
    this.fragments = new AEd.entities.FragmentsManager(this); 
    AEd.FragmentsMan = this.fragments; 
    
    /**
     * Instance of annotations manager
     * @name annotations
     * @memberOf AEd.editors.Editor
     * @type AEd.entities.AnnotationsManager    
     * @property                              
     */  
    this.annotations = new AEd.entities.AnnotationsManager(this); 
    AEd.Annotations = this.annotations;    
    
    /**
     * Instance of SettingsManager
     * @name settings
     * @memberOf AEd.editors.Editor
     * @type AEd.entities.SettingsManager    
     * @property                              
     */  
    this.settings = new AEd.entities.SettingsManager(this);          
    AEd.EditorParent;  // Parent object for timer (document modifications)
    /**
     * Determines if initial settings were set by editor
     * @name areInitalSettingsSet
     * @memberOf AEd.editors.Editor
     * @type Boolean    
     * @property                              
     */      
    this.areInitalSettingsSet = false;       
    
    /**
     * Instance of PersonsManager
     * @name persons
     * @memberOf AEd.editors.Editor
     * @type AEd.entities.PersonsManager    
     * @property                              
     */  
    this.persons = new AEd.entities.PersonsManager(this);       
    
    /**
     * Determines if DlgPersons was initialized
     * @name isDlgPersonsInitialized
     * @memberOf AEd.editors.Editor
     * @type Boolean    
     * @property                              
     */      
    this.isDlgPersonsInitialized = false;
    
    /**
     * Instance of GroupsManager
     * @name groups
     * @memberOf AEd.editors.Editor
     * @type AEd.entities.GroupsManager    
     * @property                              
     */  
    this.groups = new AEd.entities.GroupsManager(this);  
    
    /**
     * Determines if DlgGroups was initialized
     * @name isDlgGroupsInitialized
     * @memberOf AEd.editors.Editor
     * @type Boolean    
     * @property                              
     */      
    this.isDlgGroupsInitialized = false;

    /**
     * Determines if DlgSubscriptions was initialized
     * @name isDlgSubscriptionsInitialized
     * @memberOf AEd.editors.Editor
     * @type Boolean    
     * @property                              
     */      
    this.isDlgSubscriptionsInitialized = false;

    /**
     * Determines if sunscribe/unsubscribe messages were sent when the settings message is received (only once per session)
     * @name unSubscribeFromSettingsOncePerSession
     * @memberOf AEd.editors.Editor
     * @type Boolean    
     * @property                              
     */  
    this.unSubscribeFromSettingsOncePerSession = false;
    
    /**
     * Instance of TypesManager
     * @name types
     * @memberOf AEd.editors.Editor
     * @type AEd.entities.TypesManager    
     * @property                              
     */  
    this.types = new AEd.entities.TypesManager(this);

    /**
     * Instance of TypesManager
     * @name typesFromOntology
     * @memberOf AEd.editors.Editor
     * @type AEd.entities.TypesManager    
     * @property                              
     */  
    this.typesFromOntology = new AEd.entities.TypesFromOntologyManager(this);

    /**
     * @name attributesFromOntology
     * @memberOf AEd.editors.Editor    
     * @property                              
     */  
    this.attributesFromOntology = [];

    /**
     * Instance of SubscriptionsManager
     * @name subscriptions
     * @memberOf AEd.editors.Editor
     * @type AEd.entities.TypesManager    
     * @property                              
     */      
    this.subscriptions = new AEd.entities.SubscriptionsManager(this);

    /**
     * Instance of suggestions manager
     * @name suggestions
     * @memberOf AEd.editors.Editor
     * @type AEd.entities.SuggestionsManager    
     * @property                              
     */  
    this.suggestions = new AEd.entities.SuggestionsManager(this);
    AEd.SuggestionsMan = this.suggestions;

    this.specialHtmlCharacters = new AEd.libs.SpecialHtmlCharacters();   // Library for escaping special characters
    this.previousFragments = this.parseTagValuesFromString(AEd.CONFIG.RESOURCE_PREFIX + this.wysiwyg.getOrigDocContent() + AEd.CONFIG.RESOURCE_SUFFIX); // For comparsion when document is modified 

    this.unsuccessfulConnectionTimeout = null;  // Timeout for controlConnection method

    // Create Toolbars object for working with buttons
    // independently on in which toolbar buttons were created
    // --------------------------------------------

    this.gui.toolbars = {};

    this.domElementTarget = document.body;
    
    this.render(this.domElementTarget);
    this.hide();
    this.init();
    
}


AEd.editors.Editor.prototype.constructor = AEd.editors.Editor;


// ---------------------------------------------------------------- Editor.init
/**
 * Initializes editor.  
 *
 * @name init
 * @memberOf AEd.editors.Editor
 * @function     
 *  	
 */
AEd.editors.Editor.prototype.init = function() {
    this.gui.setState("NOT_LOGGED");
    // automatically connect with creating editor instance
    if (AEd.CONFIG.AED_AUTH_TYPE == 1) {
        this.connect(AEd.CONFIG.DEFAULT_SERVER_URI + AEd.CONFIG.DEFAULT_SERVER_URI_SUFFIX,
            this.resourceLogin,
            this.resourceToken,
		    this.resourceSystem);
    }
      

    // always toolbar (1)
    this.gui.toolbars.btnConnect = this.gui.toolbar.btnConnect;
    this.gui.toolbars.btnAnnotate = this.gui.toolbar.btnAnnotate;
    this.gui.toolbars.btnAdvanced = this.gui.toolbar.btnAdvanced;
    


    // always toolbar (1)
    this.gui.toolbars.btnDisconnect = this.gui.toolbar.btnDisconnect;
    
    this.refreshToolbarButtons(); 

    // TOOLBARS
    // --------------------------------------------



    // btnConnect
    this.gui.toolbars.btnConnect.onClick.addHandler(function () {
        if (AEd.CONFIG.AED_AUTH_TYPE == 0) {
            this.gui.dlgConnect.show();
        } else {  // external authentication
            this.connect(AEd.CONFIG.DEFAULT_SERVER_URI + AEd.CONFIG.DEFAULT_SERVER_URI_SUFFIX,
                         this.resourceLogin,
                         this.resourceToken,
			 this.resourceSystem);
        }
    }, this );
    
    // btnAnnotate
    this.gui.toolbars.btnAnnotate.setSelected(false);           
    this.gui.toolbars.btnAnnotate.onClick.addHandler(function () {
        if (this.gui.dlgAnnotate.isHidden) {
            this.gui.dlgAnnotate.show();     
        }
        else {
            this.gui.dlgAnnotate.hide();       
        }
    }, this );
    
    // btnAdvanced
    this.gui.toolbars.btnAdvanced.setSelected(false);           
    this.gui.toolbars.btnAdvanced.onClick.addHandler(function () {
        if (this.gui.advancedToolbar.isHidden){
             this.gui.advancedToolbar.show();     
        }
        else {
             this.gui.advancedToolbar.hide(); 
        }
    }, this );
        
    // btnDocAnnotations toolbar 1
    this.gui.toolbar.btnDocAnnotations.setSelected(false);           
    this.gui.toolbar.btnDocAnnotations.onClick.addHandler(function () {
        if (this.gui.dlgDocAnnotations.isHidden) {
            this.gui.dlgDocAnnotations.show();     
        }    
        else {
            this.gui.dlgDocAnnotations.hide();       
        }
    }, this );

    // btnDocAnnotations toolbar 2
    this.gui.advancedToolbar.btnDocAnnotations.setSelected(false);           
    this.gui.advancedToolbar.btnDocAnnotations.onClick.addHandler(function () {
        if (this.gui.dlgDocAnnotations.isHidden) {
            this.gui.dlgDocAnnotations.show();     
        }    
        else {
            this.gui.dlgDocAnnotations.hide();       
        }
    }, this );
    
    // btnQuickSuggestions toolbar 1
    this.gui.toolbar.btnQuickSuggestions.setSelected(false);           
    this.gui.toolbar.btnQuickSuggestions.onClick.addHandler(function () {
        this.quickSuggestions();
    }, this );

    // btnQuickSuggestions toolbar 2
    this.gui.advancedToolbar.btnQuickSuggestions.setSelected(false);           
    this.gui.advancedToolbar.btnQuickSuggestions.onClick.addHandler(function () {
        this.quickSuggestions();
    }, this );
    
    // btnSuggestAnnotations toolbar 1
    this.gui.toolbar.btnSuggestAnnotations.setSelected(false);           
    this.gui.toolbar.btnSuggestAnnotations.onClick.addHandler(function () {
        if (this.gui.dlgSuggestAnnotations.isHidden) {
            this.gui.dlgSuggestAnnotations.loadSuggestDlg();
            this.gui.dlgSuggestAnnotations.show();     
        }    
        else {
            this.gui.dlgSuggestAnnotations.hide();       
        }
    }, this );

    // btnSuggestAnnotations toolbar 2
    this.gui.advancedToolbar.btnSuggestAnnotations.setSelected(false);           
    this.gui.advancedToolbar.btnSuggestAnnotations.onClick.addHandler(function () {
        if (this.gui.dlgSuggestAnnotations.isHidden) {
            this.gui.dlgSuggestAnnotations.loadSuggestDlg();
            this.gui.dlgSuggestAnnotations.show();     
        }    
        else {
            this.gui.dlgSuggestAnnotations.hide();       
        }
    }, this );
     
    // btnSuggestedAnnotations toolbar 1
    this.gui.toolbar.btnSuggestedAnnotations.setSelected(false);           
    this.gui.toolbar.btnSuggestedAnnotations.onClick.addHandler(function () {
        if (this.gui.dlgSuggestedAnnotations.isHidden) {
            this.gui.dlgSuggestedAnnotations.show();     
        }    
        else {
            this.gui.dlgSuggestedAnnotations.hide();       
        }
    }, this );

    // btnSuggestedAnnotations toolbar 2
    this.gui.advancedToolbar.btnSuggestedAnnotations.setSelected(false);           
    this.gui.advancedToolbar.btnSuggestedAnnotations.onClick.addHandler(function () {
        if (this.gui.dlgSuggestedAnnotations.isHidden) {
            this.gui.dlgSuggestedAnnotations.show();     
        }    
        else {
            this.gui.dlgSuggestedAnnotations.hide();       
        }
    }, this );
    
    // btnDocSuggestions toolbar 1
    this.gui.toolbar.btnDocSuggestions.setSelected(false);           
    this.gui.toolbar.btnDocSuggestions.onClick.addHandler(function () {
        if (this.gui.dlgDocSuggestions.isHidden) {
            this.gui.dlgDocSuggestions.show();     
        }    
        else {
            this.gui.dlgDocSuggestions.hide();       
        }
    }, this );

    // btnDocSuggestions toolbar 2
    this.gui.advancedToolbar.btnDocSuggestions.setSelected(false);           
    this.gui.advancedToolbar.btnDocSuggestions.onClick.addHandler(function () {
        if (this.gui.dlgDocSuggestions.isHidden) {
            this.gui.dlgDocSuggestions.show();     
        }    
        else {
            this.gui.dlgDocSuggestions.hide();       
        }
    }, this );
     
    // btnPersons toolbar 1
    this.gui.toolbar.btnPersons.setSelected(false);           
    this.gui.toolbar.btnPersons.onClick.addHandler(function () {
        if (this.gui.dlgPersons.isHidden) {
            this.gui.dlgPersons.show();    
        }    
        else {
            this.gui.dlgPersons.hide();       
        }
    }, this );

    // btnPersons toolbar
    this.gui.advancedToolbar.btnPersons.setSelected(false);           
    this.gui.advancedToolbar.btnPersons.onClick.addHandler(function () {
        if (this.gui.dlgPersons.isHidden) {
            this.gui.dlgPersons.show();    
        }    
        else {
            this.gui.dlgPersons.hide();       
        }
    }, this );
         
    // btnGroups toolbar 1
    this.gui.toolbar.btnGroups.setSelected(false);           
    this.gui.toolbar.btnGroups.onClick.addHandler(function () {
        if (this.gui.dlgGroups.isHidden) {
            this.gui.dlgGroups.show();     
        }    
        else {
            this.gui.dlgGroups.hide();       
        }
    }, this );

    // btnGroups toolbar 2
    this.gui.advancedToolbar.btnGroups.setSelected(false);           
    this.gui.advancedToolbar.btnGroups.onClick.addHandler(function () {
        if (this.gui.dlgGroups.isHidden) {
            this.gui.dlgGroups.show();     
        }    
        else {
            this.gui.dlgGroups.hide();       
        }
    }, this );
    
    // btnSubscriptions toolbar 1
    this.gui.toolbar.btnSubscriptions.setSelected(false);           
    this.gui.toolbar.btnSubscriptions.onClick.addHandler(function () {
        if (this.gui.dlgSubscriptions.isHidden) {
            this.gui.dlgSubscriptions.show();     
        }    
        else {
            this.gui.dlgSubscriptions.hide();       
        }
    }, this ); 

    // btnSubscriptions toolbar 2
    this.gui.advancedToolbar.btnSubscriptions.setSelected(false);           
    this.gui.advancedToolbar.btnSubscriptions.onClick.addHandler(function () {
        if (this.gui.dlgSubscriptions.isHidden) {
            this.gui.dlgSubscriptions.show();     
        }    
        else {
            this.gui.dlgSubscriptions.hide();       
        }
    }, this ); 
      
    // btnSettings toolbar 1
    this.gui.toolbar.btnSettings.setSelected(false);           
    this.gui.toolbar.btnSettings.onClick.addHandler(function () {
        if (this.gui.dlgSettings.isHidden) {
            this.gui.dlgSettings.reset();
            this.gui.dlgSettings.show();  
            this.gui.dlgSettings.setSettings(this.settings.getSettings());    
        }
        else {
            this.gui.dlgSettings.hide();       
        }
    }, this );  

    // btnSettings toolbar 2
    this.gui.advancedToolbar.btnSettings.setSelected(false);           
    this.gui.advancedToolbar.btnSettings.onClick.addHandler(function () {
        if (this.gui.dlgSettings.isHidden) {
            this.gui.dlgSettings.reset();
            this.gui.dlgSettings.show();  
            this.gui.dlgSettings.setSettings(this.settings.getSettings());    
        }
        else {
            this.gui.dlgSettings.hide();       
        }
    }, this );                          
    
    // btnStatusBar toolbar 1
    this.gui.toolbar.btnStatusBar.setSelected(false);           
    this.gui.toolbar.btnStatusBar.onClick.addHandler(function () {
        if (this.gui.dlgStatusBar.isHidden) {
            this.gui.dlgStatusBar.show();      
        }
        else {
            this.gui.dlgStatusBar.hide();       
        }
    }, this );

    // btnStatusBar toolbar 2
    this.gui.advancedToolbar.btnStatusBar.setSelected(false);           
    this.gui.advancedToolbar.btnStatusBar.onClick.addHandler(function () {
        if (this.gui.dlgStatusBar.isHidden) {
            this.gui.dlgStatusBar.show();      
        }
        else {
            this.gui.dlgStatusBar.hide();       
        }
    }, this );
    
    // btnShowAnnoDlgs toolbar 1
    this.gui.toolbar.btnShowAnnoDlgs.setSelected(true);           
    this.gui.toolbar.btnShowAnnoDlgs.onClick.addHandler(function () {
        if (this.gui.toolbars.btnShowAnnoDlgs.isSelected) {
            this.fragments.setShowAnnotations(true);     
        }    
        else {
            this.fragments.setShowAnnotations(false);      
        }
    }, this );

    // btnShowAnnoDlgs toolbar 2
    this.gui.advancedToolbar.btnShowAnnoDlgs.setSelected(true);           
    this.gui.advancedToolbar.btnShowAnnoDlgs.onClick.addHandler(function () {
        if (this.gui.toolbars.btnShowAnnoDlgs.isSelected) {
            this.fragments.setShowAnnotations(true);     
        }    
        else {
            this.fragments.setShowAnnotations(false);      
        }
    }, this );
    
    // btnDisconnect
    this.gui.toolbars.btnDisconnect.onClick.addHandler(function () {
        this.disconnect(false, null, null);
    }, this );  

                
    // DLG STATUSBAR 
    // --------------------------------------------  
    this.gui.dlgStatusBar.btnClose.onClick.addHandler(function () {
        this.gui.dlgStatusBar.hide();
        this.gui.toolbars.btnStatusBar.setSelected(false);
    }, this ); 
    
    // DLG CONNECT
    // --------------------------------------------    
    this.gui.dlgConnect.btnCancel.onClick.addHandler(function () {
        this.gui.dlgConnect.hide();
    }, this );   

    this.gui.dlgConnect.btnClose.onClick.addHandler(function () {
        this.gui.dlgConnect.hide();
    }, this ); 

    this.gui.dlgConnect.btnOk.onClick.addHandler(function () {
        this.gui.dlgConnect.onContentReady(function () {
            this.connect(this.gui.dlgConnect.getServer() + AEd.CONFIG.DEFAULT_SERVER_URI_SUFFIX,
                         this.gui.dlgConnect.getUser(),
                         this.gui.dlgConnect.getPassword(),"");
        },this)
    }, this );    
    
    // DLG SETTINGS
    // --------------------------------------------  
    this.gui.dlgSettings.btnClose.onClick.addHandler(function () {
        this.gui.dlgSettings.hide();
        this.gui.toolbars.btnSettings.setSelected(false);
    }, this );  
    
    this.gui.dlgSettings.btnCancel.onClick.addHandler(function () {
        this.gui.dlgSettings.hide();
        this.gui.toolbars.btnSettings.setSelected(false);
    }, this );      
    
    this.gui.dlgSettings.btnSave.onClick.addHandler(function () {


        if (this.gui.dlgSettings.checkSettings()) {
            this.gui.dlgSettings.hide();
            this.gui.toolbars.btnSettings.setSelected(false);
            this.sendSettings(this.gui.dlgSettings.getSettings());           
        }
        else {
            this.gui.showMessage(AEd.I18n.t("Dlg_settings_one_or_more_settings_incorrect"), AEd.I18n.t("Dlg_settings_please_fill_in_the_correct_settings"), "warning");
        }
    }, this );
    
    this.gui.dlgSettings.onCreateDefaultUserGroup.addHandler(function () {    
        for (var i in this.groups.groups) {    // Find default user group and set it selected
            for (var j in this.groups.groups[i].persons) {
                if (this.groups.groups[i].persons[j].id == this.user.id) {
                    var newSelect = document.createElement('option');
                    newSelect.text = this.groups.groups[i].name;
                    newSelect.value = this.groups.groups[i].name;
                    this.gui.dlgSettings.domElementInputDefaultUserGroupValue.appendChild(newSelect);
                    
                    if (this.gui.dlgSettings.domElementInputDefaultUserGroupValue.options.length == 1) {
                        this.gui.dlgSettings.domElementInputDefaultUserGroupValue.options[0].selected = true;
                    }
                    
                    break;
                }
            }
        }       
    }, this );
    
    this.gui.dlgSettings.onCreateClientFoldingOfNestedsLevels.addHandler(function () {   
        for (var i = 0; i <= 5; i++) {
            var newSelect = document.createElement('option');
            newSelect.text = i;
            newSelect.value = i;
            this.gui.dlgSettings.domElementCheckboxClientFoldingOfNestedsLevelsValue.appendChild(newSelect);

            if (this.gui.dlgSettings.domElementCheckboxClientFoldingOfNestedsLevelsValue.options.length == 1) {
                this.gui.dlgSettings.domElementCheckboxClientFoldingOfNestedsLevelsValue.options[0].selected = true;
            }
        }       
    }, this );
    
    this.gui.dlgSettings.onCreateClientFoldingOfNestedsHideLevel.addHandler(function () {   
        var newSelect = null;
        for (var i = 0; i < 5; i++) {
            newSelect = document.createElement('option');
            newSelect.text = i;
            newSelect.value = i;
            this.gui.dlgSettings.domElementCheckboxClientFoldingOfNestedsHideLevelValue.appendChild(newSelect);
        }
        newSelect = document.createElement('option');
        newSelect.text = AEd.I18n.t("Dlg_settings_node_clientFoldingOfNestedsHideLevel_off");
        newSelect.value = -1;
        this.gui.dlgSettings.domElementCheckboxClientFoldingOfNestedsHideLevelValue.appendChild(newSelect);
        this.gui.dlgSettings.domElementCheckboxClientFoldingOfNestedsHideLevelValue.options[5].selected = true;       
    }, this );
    
    this.gui.dlgSettings.onBtnSelect.addHandler(function (trIndex, name, value) {
        this.gui.dlgTypeColors.trIndex = trIndex;
        this.gui.dlgTypeColors.setTypeColors(name, value);
        this.gui.dlgTypeColors.show();   
    }, this );

    // DLG ANNOTATE + DLG TYPES + DLG ATTRTYPES
    // --------------------------------------------  
    this.gui.dlgAnnotate.btnClose.onClick.addHandler(function () {
        this.gui.dlgAnnotate.hide();
        this.gui.toolbars.btnAnnotate.setSelected(false);
        this.gui.dlgAnnotate.reset();
    }, this );  
    
    this.gui.dlgAnnotate.btnCancel.onClick.addHandler(function () {
        this.gui.dlgAnnotate.hide();
        this.gui.toolbars.btnAnnotate.setSelected(false);
        this.gui.dlgAnnotate.reset();
    }, this );      
    
    /**
     * This is a handler that is executed when Save button in edit annotation dialog is clicked.
     */
    this.gui.dlgAnnotate.btnSave.onClick.addHandler(function () {

        this.gui.dlgAnnotate.storeAttribute(this.gui.dlgAnnotate.treeNodeAnnotation);

        //when no type selected
        if (!this.gui.dlgAnnotate.treeNodeAnnotation.assignedObject.typePath) {
            this.gui.dlgAnnotate.tree.setSelectedTreeNode(this.gui.dlgAnnotate.treeNodeAnnotation);
            this.gui.showMessage(AEd.I18n.t("No_annotation_type"), AEd.I18n.t("Please_select_annotation_type_first"), "warning");
            return;
        }
        
        if (this.gui.dlgAnnotate.checkAttributes(this.gui.dlgAnnotate.treeNodeAnnotation)) {
            //suggestion mode
            if (this.gui.dlgAnnotate.modeEditSuggestion) { // edit suggestion, must be first!
                this.suggestions.confirmLinkedSuggestions(this.gui.dlgAnnotate.getAnnotation(), true);
            }
            //annotation mode
            else if (this.gui.dlgAnnotate.modeEditAnnotation) {
                this.sendChangeAnnotation();
            }
            else {
                this.sendAddAnnotation();
            }
            this.gui.toolbars.btnAnnotate.setSelected(false);
        }
        else {
            this.gui.showMessage(AEd.I18n.t("Incorrect_attributes_values"), AEd.I18n.t("Please_fill_in_correct_values_first"), "warning");
        }
    }, this ); 
   
    this.gui.dlgAnnotate.onSetType.addHandler(function(typePath) {
        var type = this.types.getTypeByPath(typePath);
        if (type) {
            this.gui.dlgAnnotate.treeNodeAnnotation.assignedObject.color = type.color;
            this.gui.dlgAnnotate.treeNodeAnnotation.setNodeAppearance(this.gui.dlgAnnotate.treeNodeAnnotation.assignedObject.color);
        }
    }, this);
   
    this.gui.dlgAnnotate.onInputTypeKeyUp.addHandler(function(typeOfAttribute) {
        var filterText = null;
        var params = {};
        switch (typeOfAttribute)
        {
          case "Annotation":
            filterText = this.gui.dlgAnnotate.getType();
          break;
          case "Simple":
            filterText = this.gui.dlgAnnotate.getSimpleType();
          break;
          case "GeoPoint":
            filterText = this.gui.dlgAnnotate.getGeoPointType();
          break;
          case "Entity":
            filterText = this.gui.dlgAnnotate.getEntityType();
            params.type = "Entity"; 
          break;
          case "NestedAnnotation":
            filterText = this.gui.dlgAnnotate.getNestedType();
          break;
        }


        
        filter = filterText.toLowerCase();
        
        //get filtered types
        var types = this.filterStructuredTypes(filter);
        //simple types not allowed as annotation types
        if(typeOfAttribute != "Annotation")
            types = types.concat(this.filterSimpleTypes(filter));
        
        //add the types into the suggestion bar
        switch (typeOfAttribute)
        {
          case "Annotation":
            this.gui.dlgAnnotate.suggestionsBar.addNewItems(types);
            break;
          case "Simple":
            this.gui.dlgAnnotate.suggestionsBarSimple.addNewItems(types);
            break;
          case "GeoPoint":
              this.gui.dlgAnnotate.suggestionsBarGeoPoint.addNewItems(types);
            break;
          case "NestedAnnotation":
            this.gui.dlgAnnotate.suggestionsBarNested.addNewItems(types);
            break;
        }
    }, this);
    
    this.gui.dlgAnnotate.onInputTypeSelect.addHandler(function(typeOfAttribute, simpleType) {
        var typePath = "";
        var type = null;
        switch (typeOfAttribute) {
          case "Annotation":
            typePath = this.gui.dlgAnnotate.getType();
          break;
          case "Simple":
            typePath = this.gui.dlgAnnotate.getSimpleType();   
          break;
          case "GeoPoint":
            typePath = this.gui.dlgAnnotate.getGeoPointType();         
          break;
          case "NestedAnnotation":
            typePath = this.gui.dlgAnnotate.getNestedType();
          break;
        }
        
        // Get type

        if (simpleType) {
            type = this.types.getSimpleTypeByPath(typePath)
        }
        else {
            type = this.types.getTypeByPath(typePath);
        }
        
        this.gui.dlgAnnotate.removeAttrsFromLinkedAnnotation(this.gui.dlgAnnotate.tree.getSelectedTreeNode());
        if (typeOfAttribute != "Annotation") {
            this.gui.dlgAnnotate.storeAttribute(this.gui.dlgAnnotate.tree.getSelectedTreeNode());
            var name = this.gui.dlgAnnotate.tree.getSelectedTreeNode().assignedObject.name;
            var addToTypeAttr = this.gui.dlgAnnotate.tree.getSelectedTreeNode().assignedObject.addToTypeAttr;
            var required = this.gui.dlgAnnotate.tree.getSelectedTreeNode().assignedObject.required;
            this.gui.dlgAnnotate.updateAttribute(name, type, addToTypeAttr, required);
        }
        if (type && type.simpleType) {
            this.gui.dlgAnnotate.moveAttributes(this.gui.dlgAnnotate.tree.getSelectedTreeNode());      
        }
        else if (type) {
            this.gui.dlgAnnotate.loadAttrsOfType(type, this.types);
        }
    }, this);
    
    this.gui.dlgAnnotate.onNestedSet.addHandler(function(typeOfAttribute) {
        var type = this.types.getTypeByPath(this.gui.dlgAnnotate.getNestedType());
        if (type && type.name) {
            this.gui.dlgAnnotate.loadAttrsOfType(type, this.types);
        }    
    }, this);
    
    /**
     * This handler is executed when Select button of link annotation edit dialog is clicked.
     */
    this.gui.dlgAnnotate.onSelectAnnotationLink.addHandler(function(selected, allowedTypePath) {
        //a handler that is executed when Select button in edit link annotation dialog is clicked
        var fnAnnoLinkSelected = function (annotation) {
            //set annotation link
            this.gui.dlgAnnotate.setAnnotationLink(annotation, this.types);
            //unset mode from "selecting annotation link"
            this.annotations.setModeAnnotationLink(false);
            //handler removes itself so it is not repeated
            this.annotations.onSelectedAnnotationLink.removeHandler(fnAnnoLinkSelected);
        };

        //Select button clicked
        if (selected) {
            if (allowedTypePath) {
                //try to set annotation link type to allowedTypePath
                if  (!this.annotations.setModeAnnotationLink(true, allowedTypePath)) {
                    //unclick Select button in edit annotation dialog
                    this.gui.dlgAnnotate.btnNestedSelect.setSelected(false);
                    return;
                }
                
                //adds the handler
                this.annotations.onSelectedAnnotationLink.addHandler(fnAnnoLinkSelected, this);     
                this.suggestions.onSelectedAnnotationLink.addHandler(fnAnnoLinkSelected, this);
            }
            
            //No annotation type selected
            else {
                this.gui.showMessage(AEd.I18n.t("No_type_selected"), AEd.I18n.t("Please_select_attribute_type_first"), "warning");
                this.gui.dlgAnnotate.btnNestedSelect.setSelected(false);
            }
        }
        
        //Select button not clicked
        else {
            this.annotations.setModeAnnotationLink(false);
            this.annotations.onSelectedAnnotationLink.removeHandler(fnAnnoLinkSelected);
        }
   
    }, this); 
    
    
    
    this.gui.dlgAnnotate.onDeleteAttribute.addHandler(function() {
        var node = this.gui.dlgAnnotate.tree.getSelectedTreeNode();
        this.gui.dlgAnnotate.storeAttribute(node);
        if (node && node.parent) {
            var type = this.types.getTypeByPath(node.parent.assignedObject.typePath);        
            var removeFromType = false;
            if (type) {
                for (var i in type.attributes) {
                    if (type.attributes[i].name == node.assignedObject.name) {
                        switch (node.assignedObject.type) {
                            case "Integer":
                            case "String":
                            case "Time":
                            case "Date":
                            case "DateTime":
                            case "Boolean":
                            case "URI":
                            case "Image":
                            case "Duration":
                            case "Binary":
                            case "Text":
                            case "GeoPoint":
                            case "Entity":
                                if (type.attributes[i].type == node.assignedObject.typePath) {
                                    removeFromType = true;
                                }
                            break;
                            case "nestedAnnotation":
                                var typePath = node.assignedObject.typePath || "AnyAnnotation";
                                if (type.attributes[i].type == "AnyAnnotation") {
                                    if (typePath == "AnyAnnotation") {
                                        removeFromType = true;    
                                    }
                                }
                                else {
                                    var nestedType = this.types.getTypeByURI(type.attributes[i].type);                                
                                    if (nestedType && nestedType.path == typePath) {
                                        removeFromType = true;    
                                    }
                                }
                            break;
                        }
                        break;
                    }
                }
            }

            if (removeFromType) {
                this.gui.showConfirm(AEd.I18n.t("Dlg_annotate_remove_attr_from_type"), AEd.I18n.t("Dlg_annotate_do_you_want_to_remove_attr_from_type"), "info",
                    function () {
                        var type = this.types.getTypeByPath(node.parent.assignedObject.typePath);
                        if (type) {
                            oType = {};
                            oType.name = type.name;
                            oType.uri = type.uri;
                            oType.ancestor = type.ancestor;
                            
                            oType.attributes = []
                            for (var i in type.attributes) {
                                if (type.attributes[i].name != node.assignedObject.name) {
                                    oType.attributes.push({
                                        name: type.attributes[i].name,
                                        type: type.attributes[i].type,
                                        required: type.attributes[i].required}
                                    );
                                }
                            }
                            this.sendTypes({change:[oType]});
                        }
                    }, this
                );
            }

            var newNode = this.gui.dlgAnnotate.tree.getNextTreeNode(node);
            if (newNode == node.parent) {
                newNode = this.gui.dlgAnnotate.tree.getPreviousTreeNode(node);
            }
            this.gui.dlgAnnotate.tree.setSelectedTreeNode(newNode);
            node.parent.removeChild(node);
        }
    }, this);

    this.gui.dlgAnnotate.onRequiredCheckOff.addHandler(function(typeOfAttribute) {
        switch (typeOfAttribute) {
            case "Simple":
            case "GeoPoint":
                this.gui.showMessage(AEd.I18n.t("Required_check_off"), AEd.I18n.t("Required_check_off_make_sure"), "warning");
            break;
            case "Nested":
                this.gui.showMessage(AEd.I18n.t("Required_check_off"), AEd.I18n.t("Required_check_off_make_sure_Nested"), "warning");
            break;
        }   
    }, this);    

    this.gui.dlgAnnotate.onUpdateFieldset.addHandler(function() {
        var node = this.gui.dlgAnnotate.tree.getSelectedTreeNode();
        if (node && node.parent) {
            var type = this.types.getTypeByPath(node.parent.assignedObject.typePath);
            if (type && type.attributes.length > 0) {
                for (var i = 0; i < type.attributes.length; i++) {
                    switch (node.assignedObject.type) {
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
                            if (type.attributes[i].name == node.assignedObject.name) {
                                if (type.attributes[i].type == node.assignedObject.typePath) {
                                    this.gui.dlgAnnotate.domElementAddToTypeAttrSimpleSpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_attributes");
                                }
                                else {
                                    this.gui.dlgAnnotate.domElementAddToTypeAttrSimpleSpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_change_attributes");
                                }
                                return;
                            }
                            else {
                                this.gui.dlgAnnotate.domElementAddToTypeAttrSimpleSpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_attributes");
                            }
                        break;
                        case "GeoPoint":
                            if (type.attributes[i].name == node.assignedObject.name) {
                                if (type.attributes[i].type == node.assignedObject.typePath) {
                                    this.gui.dlgAnnotate.domElementAddToTypeAttrGeoPointSpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_attributes");
                                }
                                else {
                                    this.gui.dlgAnnotate.domElementAddToTypeAttrGeoPointSpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_change_attributes");
                                }
                                return;
                            }
                            else {
                                this.gui.dlgAnnotate.domElementAddToTypeAttrGeoPointSpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_attributes");
                            }
                        break;
                        case "Entity":
                            if (type.attributes[i].name == node.assignedObject.name) {
                                if (type.attributes[i].type == node.assignedObject.typePath) {
                                    this.gui.dlgAnnotate.domElementAddToTypeAttrEntitySpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_attributes");
                                }
                                else {
                                    this.gui.dlgAnnotate.domElementAddToTypeAttrEntitySpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_change_attributes");
                                }
                                return;
                            }
                            else {
                                this.gui.dlgAnnotate.domElementAddToTypeAttrEntitySpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_attributes");
                            }
                        break;
                        case "nestedAnnotation":
                            var nestedType = this.types.getTypeByURI(type.attributes[i].type);
                            if (type && nestedType && type.attributes[i].name == node.assignedObject.name) {
                                if (nestedType.path == node.assignedObject.typePath) {
                                    this.gui.dlgAnnotate.domElementAddToTypeAttrNestedSpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_attributes");
                                }
                                else {
                                    this.gui.dlgAnnotate.domElementAddToTypeAttrNestedSpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_change_attributes");
                                }
                                return;
                            }
                            else {
                                this.gui.dlgAnnotate.domElementAddToTypeAttrNestedSpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_attributes");
                            }
                        break;
                    }
                }
            }
            else {
                switch (node.assignedObject.type) {
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
                        this.gui.dlgAnnotate.domElementAddToTypeAttrSimpleSpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_attributes");
                    break;
                    case "GeoPoint":
                        this.gui.dlgAnnotate.domElementAddToTypeAttrGeoPointSpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_attributes");
                    break;
                    case "Entity":
                        this.gui.dlgAnnotate.domElementAddToTypeAttrEntitySpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_attributes");
                    break;
                    case "nestedAnnotation":
                        this.gui.dlgAnnotate.domElementAddToTypeAttrNestedSpan.innerHTML = AEd.I18n.t("Dlg_annotate_checkbox_add_to_type_attributes");
                    break;
                }
            }
        }     
    }, this);

    this.gui.dlgAnnotate.onAddEntityAttribute.addHandler(function() {

          this.gui.dlgAnnotate.removeEmptyAttributes(this.gui.dlgAnnotate.tree.getSelectedTreeNode());
          this.gui.dlgAnnotate.addAttribute("Entity", {simpleType: true, name: "Entity", path: "Entity"}, false, false, false);    
    }, this);

    this.gui.dlgAnnotate.onClearAttribute.addHandler(function() {

          this.gui.dlgAnnotate.clearAttributeValue(this.gui.dlgAnnotate.tree.getSelectedTreeNode());    
    }, this);

    this.gui.dlgAnnotate.onSetAnnotationLink.addHandler(function(annotationUri) {
        var linkedAnnotation = this.annotations.getAnnotationByURI(annotationUri) || this.suggestions.getSuggestionByTmpId(annotationUri);

        if (linkedAnnotation) {
            this.gui.dlgAnnotate.annotationLinkURIs[annotationUri] = true;  // Mutual linking loop prevention
            if (linkedAnnotation.tmpId){
              this.gui.dlgAnnotate.suggestionLinkTmpIds[linkedAnnotation.tmpId] = true;
            }
            this.gui.dlgAnnotate.setAnnotationLink(linkedAnnotation, this.types);
            this.gui.dlgAnnotate.loadAnnotation(linkedAnnotation, this.types, true);
        }    
    }, this);
    
    this.gui.dlgAnnotate.onLoadAnnotationLinkSetSelection.addHandler(function(annotationUri, node) {
        var linkedAnnotation = this.annotations.getAnnotationByURI(annotationUri) || this.suggestions.getSuggestionByTmpId(annotationUri);
        if (linkedAnnotation) {
            node.selection = annotationUri + ": ";
            if (linkedAnnotation.fragments && linkedAnnotation.fragments.length) {
                for (var j = 0; j < linkedAnnotation.fragments.length; j++ ) {
                    node.selection += linkedAnnotation.fragments[j].fragmentText;
                }
            }
        }        
    }, this);

    this.gui.dlgAnnotate.onSimpleToNestedAttr.addHandler(function() {
        var node = this.gui.dlgAnnotate.tree.getSelectedTreeNode();
        this.gui.dlgAnnotate.storeAttribute(node);
        if (node.assignedObject.simpleType) {
            var type = this.types.getTypeByPath(node.assignedObject.typePath);
            if (type) {
                this.gui.dlgAnnotate.updateAttributeFromSimpleToNested(node);
            }
            else {
                type = this.types.getSimpleTypeByPath(node.assignedObject.typePath);
                if (!type) {
                    this.gui.dlgAnnotate.updateAttributeFromSimpleToNested(node);
                }    
            }
        }    
    }, this);
    
    this.gui.dlgAnnotate.onLoadAnnotation.addHandler(function(treeNode, attribute, addToType, required, isAttrOfLinkedAnnotation) {
        var type = this.types.getTypeByURI(attribute.type);
        if (type) { // nestedAnnotation with type but without annotation
            oType = {};
            oType.simpleType = false;
            oType.name = type.name;
            oType.path = type.path;                     
        }
        else { // anyAnnotation
            oType = {};
            oType.simpleType = false;
            oType.name = "anyAnnotation";
            oType.path = "anyAnnotation";
        }
        this.gui.dlgAnnotate.addAttribute(attribute.name, oType, addToType, required, isAttrOfLinkedAnnotation);                            
        this.gui.dlgAnnotate.tree.setSelectedTreeNode(treeNode);        
    }, this);
    
    this.gui.dlgAnnotate.onNestedListCheckAttribute.addHandler(function(annotation) {
        switch (annotation) {
            case "nestedAnnotation":
                this.gui.showMessage(AEd.I18n.t("Dlg_annotate_nested_list_incorrect"), AEd.I18n.t("Dlg_annotate_nested_list_incorrect_nested"), "warning");
            break;
            case "annotationLink":
                this.gui.showMessage(AEd.I18n.t("Dlg_annotate_nested_list_incorrect"), AEd.I18n.t("Dlg_annotate_nested_list_incorrect_link"), "warning");
            break;
            default:
            break;
        }        
    }, this);
    
    this.gui.dlgAnnotate.onNestedAnnotationLinkRemove.addHandler(function(node, linkPosition) {
        var linkedAnnotation = this.annotations.getAnnotationByURI(node.list[linkPosition].annotationLink);            
        if (linkedAnnotation) {
            this.gui.dlgAnnotate.setNestedContent(linkedAnnotation.content || "");
            this.gui.dlgAnnotate.loadAnnotation(linkedAnnotation, this.types, true);
        }
    }, this);

    // DLG TYPES
    // --------------------------------------------
    
    this.gui.dlgTypeColors.onBrowseTypes.addHandler(function () {
        if (this.gui.dlgTypes.isHidden) {
            this.gui.dlgTypes.shownBy = "dlgTypeColors";
            this.gui.dlgTypes.setTree(this.types.getTypesTree({context: this.gui.dlgTypes.iframe.contentWindow.document})); 
            this.gui.dlgTypes.show();      
        }
        else {
            this.gui.dlgTypes.reset();
            this.gui.dlgTypes.hide();       
        }
    }, this );
    
    this.gui.dlgSuggestAnnotations.onBrowseTypes.addHandler(function () {
        if (this.gui.dlgTypes.isHidden) {
            this.gui.dlgTypes.shownBy = "dlgSuggestAnnotations";
            this.gui.dlgTypes.setTree(this.types.getTypesTree({context: this.gui.dlgTypes.iframe.contentWindow.document})); 
            this.gui.dlgTypes.show();      
        }
        else {
            this.gui.dlgTypes.reset();
            this.gui.dlgTypes.hide();       
        }
    }, this );
    
    this.gui.dlgAnnotate.onBrowseTypes.addHandler(function () {
        if (this.gui.dlgTypes.isHidden) {
            this.gui.dlgTypes.shownBy = "dlgAnnotate";
            this.gui.dlgTypes.setTree(this.types.getTypesTree({context: this.gui.dlgTypes.iframe.contentWindow.document})); 
            this.gui.dlgTypes.show();      
        }
        else {
            this.gui.dlgTypes.reset();
            this.gui.dlgTypes.hide();       
        }
    }, this ); 
    
    this.gui.dlgTypes.btnClose.onClick.addHandler(function () {
        this.gui.dlgTypes.reset();
        this.gui.dlgTypes.hide();
    }, this );     
    
    this.gui.dlgTypes.btnCancel.onClick.addHandler(function () {
        this.gui.dlgTypes.reset();
        this.gui.dlgTypes.hide();
    }, this );    
    
    this.gui.dlgTypes.btnOk.onClick.addHandler(function () {
        var type = this.gui.dlgTypes.getTree().getSelectedTreeNode();

        if (type && type.assignedObject) {
            if (this.gui.dlgTypes.shownBy == "dlgAnnotate") {
                this.gui.dlgAnnotate.setType(type.assignedObject.path);
                this.gui.dlgAnnotate.loadAttrsOfType(type.assignedObject, this.types);
            }
            else if (this.gui.dlgTypes.shownBy == "dlgSuggestAnnotations") {
                this.gui.dlgSuggestAnnotations.setType(type.assignedObject.path);
            }
            else if (this.gui.dlgTypes.shownBy == "dlgTypeColors") {
                this.gui.dlgTypeColors.setType(type.assignedObject.path);
            }
        } 
        this.gui.dlgTypes.reset();               
        this.gui.dlgTypes.hide();
    }, this );  

    this.gui.dlgTypes.onAddType.addHandler(function () {
        var parentTreeNode = this.gui.dlgTypes.getTree().getSelectedTreeNode();
        var parentType = parentTreeNode ? parentTreeNode.assignedObject : null;
        var newName = this.gui.dlgTypes.getNewTypeName();
        this.gui.dlgTypes.setNewTypeName("");
        
        if (newName) {
            oType = {};
            oType.name = newName;
     
            
            if (parentType) {
                oType.ancestor = parentType.uri;
            }
            else {
                oType.ancestor = null;
            }
            this.sendTypes({add:[oType]});
        }
    }, this );  
    
    this.gui.dlgTypes.onRemoveType.addHandler(function () {
        var treeNode = this.gui.dlgTypes.getTree().getSelectedTreeNode();
        var type = treeNode ? treeNode.assignedObject : null; 
        if (type) {
            oType = {};
            oType.name = type.name;
            oType.uri = type.uri;
            oType.ancestor = type.ancestor;
            this.sendTypes({remove:[oType]});   
        }            
    }, this );
    
    // DLG ATTR TYPES
    // --------------------------------------------
         
    this.gui.dlgAnnotate.onBrowseAttrTypesForAdd.addHandler(function () {
            if (this.gui.dlgAttrTypes.isHidden) {
                this.gui.dlgAttrTypes.setTree(this.types.getAttrTypesTree()); 
                this.gui.dlgAttrTypes.show();      
            }
            else {
                this.gui.dlgAttrTypes.reset();
                this.gui.dlgAttrTypes.hide();       
            }        
    }, this );
    
    this.gui.dlgAnnotate.onBrowseAttrTypesForEdit.addHandler(function () {
            this.gui.dlgAnnotate.storeAttribute(this.gui.dlgAnnotate.tree.getSelectedTreeNode());
            if (this.gui.dlgAttrTypes.isHidden) {
                this.gui.dlgAttrTypes.setTree(this.types.getAttrTypesTree()); 
                this.gui.dlgAttrTypes.show();  
                this.gui.dlgAttrTypes.setTag("EDIT", true);
                var oTreeNode = this.gui.dlgAnnotate.tree.getSelectedTreeNode(); 
                if (oTreeNode && oTreeNode.assignedObject) {
                    this.gui.dlgAttrTypes.setName(oTreeNode.assignedObject.name);
                    this.gui.dlgAttrTypes.domElementInputName.disabled = true;
                    this.gui.dlgAttrTypes.domElementCheckboxAddToTypeAttr.checked = oTreeNode.assignedObject.addToTypeAttr;
                    if (oTreeNode.assignedObject.addToTypeAttr) {
                        this.gui.dlgAttrTypes.elementRequiredWrapper.show();
                        this.gui.dlgAttrTypes.domElementCheckboxRequired.disabled = false;
                    }
                    this.gui.dlgAttrTypes.domElementCheckboxRequired.checked = oTreeNode.assignedObject.required;
                }
 
            }
            else {
                this.gui.dlgAttrTypes.reset();
                this.gui.dlgAttrTypes.hide();       
            }        
    }, this );   
    
    this.gui.dlgAnnotate.onEntityNameType.addHandler(function(e) {
        var entityName = this.gui.dlgAnnotate.getEntityName().toLowerCase();
        var lastEntityName = this.gui.dlgAnnotate.lastEntityName.toLowerCase();
        
        
        if(entityName == lastEntityName)
        {
            //entity name hasn't changed -- do nothing
        }
        //if previous entity name is a prefix of current entity name (e.g. "Sunflower" => "Sunflowers") than there is no need to query the server for entities -- we just filter the current entities
        else if(entityName.substr(0, lastEntityName.length) == lastEntityName && this.gui.dlgAnnotate.entitiesReceived)
        {
            var entities = this.gui.dlgAnnotate.suggestionsBarEntityName.items;

            //filter the entities
            var filteredEntities = [];
            for (var i = 0; i < entities.length; i++)
            {
                if(entities[i].name.toLowerCase().substr(0, entityName.length) == entityName)
                    filteredEntities.push(entities[i]);
            }

            this.gui.dlgAnnotate.suggestionsBarEntityName.addNewItemsEntities(filteredEntities);
        }
        else
        {
            this.gui.dlgAnnotate.entitiesReceived = false;
            this.gui.dlgAnnotate.suggestionsBarEntityName.removeAllItems();
            
            //query the server for entities
            if(entityName.length > 3)
            {

                var aMsgParams =
                [{
                    msgtype: 'queryEntities',
                    filter: entityName
                }];

                var oHandlers =
                {
                    onSuccess: null,
                    onFailure: null
                }

                this.comm.sendPostRequest(aMsgParams, oHandlers);
            }
        }
        
        this.gui.dlgAnnotate.lastEntityName = entityName;
    }, this);   

    this.gui.dlgAttrTypes.btnClose.onClick.addHandler(function () {
        this.gui.dlgAttrTypes.reset();
        this.gui.dlgAttrTypes.domElementInputName.disabled = false;
        this.gui.dlgAttrTypes.hide();
    }, this );     
    
    this.gui.dlgAttrTypes.btnCancel.onClick.addHandler(function () {
        this.gui.dlgAttrTypes.reset();
        this.gui.dlgAttrTypes.domElementInputName.disabled = false;
        this.gui.dlgAttrTypes.hide();
    }, this );    
    
    this.gui.dlgAttrTypes.btnOk.onClick.addHandler(function () {
        var type = this.gui.dlgAttrTypes.getTree().getSelectedTreeNode();

        type ? type = type.assignedObject : type = this.types.getTypeByPath(this.gui.dlgAttrTypes.getType());
        type ? type = type : type = this.types.getSimpleTypeByPath(this.gui.dlgAttrTypes.getType());

        if (!type){

           type = {};
           type.simpleType = false;
           type.path = this.gui.dlgAttrTypes.getType() ? this.gui.dlgAttrTypes.getType()  :"anyAnnotation";
           type.name = this.gui.dlgAttrTypes.getType() ? this.gui.dlgAttrTypes.getType()  :"anyAnnotation";
        }

        var name = this.gui.dlgAttrTypes.getName();
        
        var addToTypeAttr = this.gui.dlgAttrTypes.isAddToTypeAttrChecked();
        var required = this.gui.dlgAttrTypes.isRequiredChecked();
        if (type && !type.notAllowed && name) {
            if (this.gui.dlgAttrTypes.getTag("EDIT")) {
                this.gui.dlgAnnotate.removeAttrsFromLinkedAnnotation(this.gui.dlgAnnotate.tree.getSelectedTreeNode());
                this.gui.dlgAnnotate.updateAttribute(name, type, addToTypeAttr, required); 
                if (type.simpleType) {
                    this.gui.dlgAnnotate.moveAttributes(this.gui.dlgAnnotate.tree.getSelectedTreeNode());    
                }
                else {
                    this.gui.dlgAnnotate.loadAttrsOfType(type, this.types);
                }
                this.gui.dlgAttrTypes.setTag("EDIT", false);
            }
            else {
                this.gui.dlgAnnotate.addAttribute(name, type, addToTypeAttr, required, false); 
            }
            this.gui.dlgAttrTypes.domElementInputName.disabled = false;                       
            this.gui.dlgAttrTypes.reset();
            this.gui.dlgAttrTypes.hide();            
        } 
        
    }, this );   
    
    this.gui.dlgAttrTypes.onAddType.addHandler(function () {
        var parentTreeNode = this.gui.dlgAttrTypes.getTree().getSelectedTreeNode();
        var parentType = parentTreeNode ? parentTreeNode.assignedObject : null;
        var newName = this.gui.dlgAttrTypes.getNewTypeName();
        this.gui.dlgAttrTypes.setNewTypeName("");
        
        if (newName) {
            oType = {};
            oType.name = newName;
          
            if (parentType) {
                if (parentType.notAllowed || parentType.simpleType) {
                    oType.ancestor = null;
                }
                else {
                    oType.ancestor = parentType.uri;
                }
            }
            else {
                oType.ancestor = null;
            }
            this.sendTypes({add:[oType]});
        }   
        
   
    }, this );  
    
    this.gui.dlgAttrTypes.onRemoveType.addHandler(function () {
        var treeNode = this.gui.dlgAttrTypes.getTree().getSelectedTreeNode();
        var type = treeNode ? treeNode.assignedObject : null; 
        if (type) {
            if (type.notAllowed || type.simpleType) {
            }
            else {
                  oType = {};
                  oType.name = type.name;
                  oType.uri = type.uri;
                  oType.ancestor = type.ancestor;
                  this.sendTypes({remove:[oType]}); 
            } 
        }            
    }, this );
    
    this.gui.dlgAttrTypes.onInputTypeKeyUp.addHandler(function() { 
      
        var filterText = null;
        var params = {};
      
        filter = this.gui.dlgAttrTypes.getType().toLowerCase();
        
        //get filtered types
        var types = this.filterStructuredTypes(filter);
        // Simple types selection allowed only from simple type tree - due to possible name interferention with structured types
        
        //add the types into the suggestion bar
        this.gui.dlgAttrTypes.suggestionsBar.addNewItems(types);

    }, this); 

    // DLG ATTR FROM ONTOLOGY
    // --------------------------------------------

    this.gui.dlgAttrTypes.onBrowseAttrTypesFromOntologyForAdd.addHandler(function () {
            if (this.gui.dlgAttrFromOntology.isHidden) {
                this.gui.dlgAttrFromOntology.setTree(this.typesFromOntology.getAttrTypesTree()); 
                this.gui.dlgAttrFromOntology.show();      
            }
            else {
                this.gui.dlgAttrFromOntology.reset();
                this.gui.dlgAttrFromOntology.hide();       
            }        
    }, this );  

    this.gui.dlgAttrFromOntology.btnClose.onClick.addHandler(function () {
        this.gui.dlgAttrFromOntology.reset();
        this.gui.dlgAttrFromOntology.hide();
    }, this );     
    
    this.gui.dlgAttrFromOntology.btnCancel.onClick.addHandler(function () {
        this.gui.dlgAttrFromOntology.reset();
        this.gui.dlgAttrFromOntology.hide();
    }, this );    
    
    this.gui.dlgAttrFromOntology.btnOk.onClick.addHandler(function () {

        var type = this.gui.dlgAttrFromOntology.getType();

        if (type.name){

           this.gui.dlgAttrTypes.setName(type.name);
 
           if (type.simpleType){

              this.gui.dlgAttrTypes.setSimpleType(type.type);
           }

           else if (type.uri){

              if (this.types.getTypeByURI(type.uri)){

                 this.gui.dlgAttrTypes.setType(this.types.getPathByURI(type.uri));
              }
           }
  
           else {

             this.gui.dlgAttrTypes.setType(type.type);
           }
        }
                      
        this.gui.dlgAttrFromOntology.reset();
        this.gui.dlgAttrFromOntology.hide();            
     
    }, this );   
           
    // DLG PERSONS
    // --------------------------------------------
      
    this.gui.dlgPersons.btnClose.onClick.addHandler(function () {
        this.gui.dlgPersons.hide();
        this.gui.toolbars.btnPersons.setSelected(false);
    }, this );  
    
    this.gui.dlgPersons.onFilter.addHandler(function () {
        var filterText = this.gui.dlgPersons.getInputSearchValue();
        var params = {};
        params.withGroups = true;
        params.isQueryPersonsForSearching  = true;
        if (filterText) {
            params.filter = filterText;
        }
        else {
            params.filter = "";
        }
        this.queryPersons(params);    
        
    }, this);

    // DLG GROUPS
    // --------------------------------------------
      
    this.gui.dlgGroups.btnClose.onClick.addHandler(function () {
        this.gui.dlgGroups.hide();
        this.gui.toolbars.btnGroups.setSelected(false);
    }, this );  
    
    this.gui.dlgGroups.onFilter.addHandler(function () {
        var filterText = this.gui.dlgGroups.getInputSearchValue();
        var params = {};
        params.withPersons = true;
        params.isQueryGroupsForSearching = true;
        if (filterText) {
            params.filter = filterText;
        }
        else {
            params.filter = "";
        }
        this.queryGroups(params);    
        
    }, this);    
    
    this.gui.dlgGroups.onJoin.addHandler(function(uiGroup) {
        this.joinGroup(uiGroup);
    }, this);
    
    this.gui.dlgGroups.onLeave.addHandler(function(uiGroup) {
        this.leaveGroup(uiGroup);
    }, this);    
    
    // DLG SYNCHRONIZE
    // --------------------------------------------
      
    this.gui.dlgSynchronize.btnClose.onClick.addHandler(function () {
        this.gui.dlgSynchronize.hide();
        this.disconnect(false, null, null);
    }, this );  
    
    this.gui.dlgSynchronize.btnCancel.onClick.addHandler(function () {
        this.gui.dlgSynchronize.hide();
        this.disconnect(false, null, null);
    }, this );      
    
    this.gui.dlgSynchronize.btnUpdate.onClick.addHandler(function () {
        if (!this.gui.dlgSynchronize.btnUpdate.isDisabled) {
            this.gui.dlgSynchronize.hide();
        
        // Update document from annotation server

        for (var i = 0; i < this.annotations.annotations.length; i++) {  // Remove fragments

          this.fragments.destroyFragments(this.annotations.annotations[i]);
        }        

        this.wysiwyg.setContent(this.gui.dlgSynchronize.getInputValue());   // Update content

        for (var i = 0; i < this.annotations.annotations.length; i++) { // Create fragments

          this.fragments.createFragments(this.annotations.annotations[i]);
        }
        
            this.synchronize();
        }           
    }, this );       
    
    this.gui.dlgSynchronize.btnSynchronizeOverwrite.onClick.addHandler(function () {
        this.gui.dlgSynchronize.hide();
        this.synchronize({overwrite: "true"});            
    }, this );

    // DLG SUBSCRIPTIONS
    // --------------------------------------------  

    this.gui.dlgSubscriptions.btnClose.onClick.addHandler(function () {
        this.gui.dlgSubscriptions.hide();
        this.gui.toolbars.btnSubscriptions.setSelected(false);
    }, this );  
    
    this.gui.dlgSubscriptions.btnCancel.onClick.addHandler(function () {
        this.gui.dlgSubscriptions.hide();
        this.gui.toolbars.btnSubscriptions.setSelected(false);
    }, this );      
    
    this.gui.dlgSubscriptions.btnSave.onClick.addHandler(function () {

        var newSubscriptions = this.gui.dlgSubscriptions.getSubscriptions();       
        this.subscriptions.setSubscriptions(newSubscriptions);
        
        var aUnsubscribe = this.gui.dlgSubscriptions.getSubscriptionsToUnsubscribe();
        var aSubscribe = this.gui.dlgSubscriptions.getSubscriptionsToSubscribe();
        var aDelete = this.gui.dlgSubscriptions.getSubscriptionsToDelete(); 
   
        this.gui.dlgSubscriptions.hide();
        this.gui.toolbars.btnSubscriptions.setSelected(false);

        if (aDelete.length) {
         
            for (var i = 0; i < aDelete.length; i++){  

              if (aDelete[i].origin == "unsubscribed"){  // unsubscribed -> unsubscribe() = deleted

                 var tmpArr = new Array();
                 tmpArr.push(aDelete[i]);
                 this.unsubscribe(tmpArr);
              }

              else if (aDelete[i].origin == "subscribed"){  // Duplicating items only for origin subscribed : subscribed -> unsubscribe() = unsubscribed -> unsubscribe() = deleted
                 
                  var tmpArr = new Array();
                  tmpArr.push(aDelete[i]);
                  this.unsubscribe(tmpArr);
                  this.unsubscribe(tmpArr);
              }
            }
        }
        if (aUnsubscribe.length) {
            this.unsubscribe(aUnsubscribe);
        }
        if (aSubscribe.length) {
            this.subscribe(aSubscribe);
        }          
        this.gui.dlgSubscriptions.setSubscriptions(newSubscriptions);

        // Save settings - not only from new (un)subscriptions 
          
        aSubscribeSettings = this.gui.dlgSubscriptions.getSubscriptions().subscribed;
        aUnsubscribeSettings = this.gui.dlgSubscriptions.getSubscriptions().unsubscribed;


        var aSubscriptions= {};
        var aUnsubscriptions = {};
        aSubscriptions.value = "";
        aUnsubscriptions.value = "";

        if (aSubscribeSettings.length == 0){

           this.settings.add([{ name: "Subscriptions", value: ""}]);
        }

        if (aUnsubscribeSettings.length == 0){

           this.settings.add([{ name: "Unsubscriptions", value: ""}]);
        }

        for (var i = 0; i < aSubscribeSettings.length; i++){  // Save subscribe settings (prepare)

          aSubscriptions.name = "Subscriptions";

          if (aSubscribeSettings[i].user){

             aSubscriptions.value += "user#";
             aSubscriptions.value += aSubscribeSettings[i].user + "#";
          }

          if (aSubscribeSettings[i].type){

             aSubscriptions.value += "type#";
             aSubscriptions.value += aSubscribeSettings[i].type + "#";
          }

          if (aSubscribeSettings[i].uri){

             aSubscriptions.value += "uri#";
             aSubscriptions.value += aSubscribeSettings[i].uri + "#";              
          }

          aSubscriptions.value += "@";

        } 

        for (var i = 0; i < aUnsubscribeSettings.length; i++){  // Save unsubscribe settings (prepare)

          aUnsubscriptions.name = "Unsubscriptions";

          if (aUnsubscribeSettings[i].user){

             aUnsubscriptions.value += "user#";
             aUnsubscriptions.value += aUnsubscribeSettings[i].user + "#";
          }

          if (aUnsubscribeSettings[i].type){

             aUnsubscriptions.value += "type#";
             aUnsubscriptions.value += aUnsubscribeSettings[i].type + "#";
          }

          if (aUnsubscribeSettings[i].uri){

             aUnsubscriptions.value += "uri#";
             aUnsubscriptions.value += aUnsubscribeSettings[i].uri + "#";              
          }
          
          aUnsubscriptions.value += "@";
        } 


        if (aSubscribeSettings.length >= 1){  // Save subscription settings

          this.settings.add([{ name: aSubscriptions.name, value: aSubscriptions.value}]);
        }

        if (aUnsubscribeSettings.length >= 1){ // Save unsubscriptions settings

          this.settings.add([{ name: aUnsubscriptions.name, value: aUnsubscriptions.value}]);
        }

        if (aSubscribeSettings.length == 0 && aUnsubscribeSettings.length == 0){  // Clear all subscriptions and restore defaults

          this.gui.dlgSubscriptions.removeAll();

          var params = {};
          params.dialog = "dlgSubscriptions";
          params.isQueryPersonsForDefaultSubscriptions = true;
          params.withGroups = true;
          params.filter = "id:" + this.user.id;

          this.queryPersons(params);
                     
        }

        this.reloadAllAnnotations();
      

    }, this );

    this.gui.dlgSubscriptions.onInputUserKeyUp.addHandler(function() {  
        var filterText = null;
        var params = {};
        filterText = this.gui.dlgSubscriptions.getUser();
        params.dialog = "dlgSubscriptions";
        params.isQueryPersonsForSuggestions = true;
        if (filterText != "") {
            params.filter = filterText;
        }
        this.queryPersons(params);        

    }, this);
    
    this.gui.dlgSubscriptions.onInputTypeKeyUp.addHandler(function() {  
        var filterText = null;
        var params = {};
              
        filter = this.gui.dlgSubscriptions.getType().toLowerCase();
        
        //get filtered types
        var types = this.filterStructuredTypes(filter);
        
        //add the types into the suggestion bar
        this.gui.dlgSubscriptions.suggestionsTypeBar.addNewItems(types);      

    }, this);

    this.gui.dlgSubscriptions.onInputUriKeyUp.addHandler(function() {  
        var filterText = null;
        var params = {};
        filterText = this.gui.dlgSubscriptions.getUri();
        params.type = "Annotation";
        params.dialog = "dlgSubscriptions";
        params.isQueryGroupsForSuggestions = true;
        if (filterText != "") {
            params.filter = filterText;
        }
        else {
            params.queryGroups = true;
        }
        this.queryGroups(params);     

    }, this);
    
    // DLG SUGGEST ANNOTATIONS
    // --------------------------------------------   
    
    this.gui.dlgSuggestAnnotations.btnClose.onClick.addHandler(function () {
        this.gui.dlgSuggestAnnotations.hide();
        this.gui.toolbars.btnSuggestAnnotations.setSelected(false);
    }, this );  
    
    this.gui.dlgSuggestAnnotations.btnCancel.onClick.addHandler(function () {
        this.gui.dlgSuggestAnnotations.hide();
        this.gui.toolbars.btnSuggestAnnotations.setSelected(false);
    }, this );      
    
    this.gui.dlgSuggestAnnotations.btnSuggest.onClick.addHandler(function () {
        var type = this.types.getTypeByPath(this.gui.dlgSuggestAnnotations.getType());
        if (type || this.gui.dlgSuggestAnnotations.getType() == "") {
            this.gui.dlgSuggestAnnotations.hide();
            this.gui.toolbars.btnSuggestAnnotations.setSelected(false);
            this.sendSuggestion();
        }
        else {
            this.gui.showMessage(AEd.I18n.t("Dlg_suggestAnnotations_selected_type_does_not_exist"), AEd.I18n.t("Dlg_suggestAnnotations_select_existing_type_first"), "warning");
        }
    }, this );

    this.gui.dlgSuggestAnnotations.onInputTypeKeyUp.addHandler(function() {  
        var filterText = null;
        var params = {};
              
        filter = this.gui.dlgSuggestAnnotations.getType().toLowerCase();
        
        //get filtered types
        var types = this.filterStructuredTypes(filter);
        
        //add the types into the suggestion bar
        this.gui.dlgSuggestAnnotations.suggestionsBar.addNewItems(types);

    }, this);
    
    // DLG SUGGESTED ANNOTATIONS
    // --------------------------------------------
      
    this.gui.dlgSuggestedAnnotations.btnClose.onClick.addHandler(function () {
        this.gui.dlgSuggestedAnnotations.hide();
        this.gui.toolbars.btnSuggestedAnnotations.setSelected(false);
    }, this );
    
    this.gui.dlgSuggestedAnnotations.onMouseOverContentArea.addHandler(function (tmpId) {
        this.fragments.showSuggestion(tmpId);    
    }, this );
    
    this.gui.dlgSuggestedAnnotations.onMouseOutContentArea.addHandler(function () {
        this.fragments.hideOpenedFragments();   
    }, this );
    
    this.gui.dlgSuggestedAnnotations.onClickContentArea.addHandler(function () {
        this.fragments.modeNestedAnnotations = true;   
    }, this );
    
    // DLG DOC ANNOTATIONS
    // --------------------------------------------
      
    this.gui.dlgDocAnnotations.btnClose.onClick.addHandler(function () {
        this.gui.dlgDocAnnotations.hide();
        this.gui.toolbars.btnDocAnnotations.setSelected(false);
    }, this );
    
    // DLG DOC SUGGESTIONS
    // --------------------------------------------
      
    this.gui.dlgDocSuggestions.btnClose.onClick.addHandler(function () {
        this.gui.dlgDocSuggestions.hide();
        this.gui.toolbars.btnDocSuggestions.setSelected(false);
    }, this );     
    
    // DLG TYPECOLORS
    // --------------------------------------------
    
    this.gui.dlgTypeColors.btnClose.onClick.addHandler(function () {
        this.gui.dlgTypeColors.reset();
        this.gui.dlgTypeColors.hide();
    }, this );     
    
    this.gui.dlgTypeColors.btnCancel.onClick.addHandler(function () {
        this.gui.dlgTypeColors.reset();
        this.gui.dlgTypeColors.hide();
    }, this );
    
    this.gui.dlgTypeColors.btnOk.onClick.addHandler(function () {
        if (this.gui.dlgTypeColors.checkTypeColors(this.gui.dlgTypeColors.typeColors)) {
            this.gui.dlgSettings.setClientAnnotationTypeColor(this.gui.dlgTypeColors.trIndex, this.gui.dlgTypeColors.typeColors.typePath, this.gui.dlgTypeColors.typeColors);
            this.gui.dlgTypeColors.reset();
            this.gui.dlgTypeColors.hide();
        }
        else {
            this.gui.showMessage(AEd.I18n.t("Dlg_typeColors_color_or_alpha_incorrect"), AEd.I18n.t("Dlg_typeColors_please_fill_in_the_correct_values"), "warning");
        }
    }, this );   
    
    this.gui.dlgTypeColors.onInputTypeKeyUp.addHandler(function() {  
        var filterText = null;
        var params = {};
              
        filter = this.gui.dlgTypeColors.getType().toLowerCase();
        
        //get filtered types
        var types = this.filterStructuredTypes(filter);
        
        //add the types into the suggestion bar
        this.gui.dlgTypeColors.suggestionsBar.addNewItems(types);      
    }, this);
        
    
    // --------------------------------------------   
    // WYSIWYG
    // --------------------------------------------
          
    this.wysiwyg.onNodeChange.addHandler(function () {
        if (AEd.isIE && AEd.IEversion < 9) { // IE < 9
            var domSelection = window.getSelection(this.wysiwyg.getDocument());
        }
        else { // IE >= 9 and other modern browsers
            var domSelection = this.wysiwyg.getSelectionObject();
        }

        var oSelection = {
            anchorNode : domSelection.anchorNode,
            anchorOffset : domSelection.anchorOffset,
            focusNode : domSelection.focusNode, 
            focusOffset : domSelection.focusOffset,
            isCollapsed : domSelection.isCollapsed,
            rangeCount : domSelection.rangeCount,
            selection : domSelection.toString(),
            toString : function() {
                return oSelection.selection; 
            }
        }
  
        this.gui.dlgAnnotate.setSelectionObject(oSelection);  
        this.gui.dlgSuggestAnnotations.setSelectionObject(oSelection);
    }, this);    
    

   
    this.wysiwyg.onUndo.addHandler(this.BeforeDocumentModification, this);
    this.wysiwyg.onRedo.addHandler(this.BeforeDocumentModification, this); 

    this.enterPressed = false;

    AEd.Events.addHandler(this.wysiwyg.getDocument().body,"keyup", function(e){   // Enter press detector

        if (e.keyCode == 13){

           this.enterPressed = true;
        }       

        else {

           this.enterPressed = false;
        }

    }, this);

    this.wysiwyg.onKeyUp.addHandler(this.BeforeDocumentModification, this);  // Changes on every key
    this.wysiwyg.onContentChange.addHandler(this.BeforeDocumentModification, this);  // Changes caused by editor tools (e.g. bold)
    this.wysiwyg.onClick.addHandler(function() {
      this.sel = this.editorNativeObject.selection;
      this.caretBookmark = this.getCaretPosition();
    }, this);  // Save caret position on click
    
    this.inter = null; // document modifications interval
    // Remembers caret position
    this.caretBookmark = null; 
    this.sel = null;
    this.documentModificationInProgress = false; // state variable (to prevent more calls of documentModification)

    // --------------------------------------------   
    // COMM
    // --------------------------------------------
           
    this.comm.onServerMsgConnected.addHandler(this.onMsgConnected, this);
    this.comm.onServerMsgAnnotations.addHandler(this.onMsgAnnotations, this);
    this.comm.onServerMsgDisconnect.addHandler(this.disconnect, this);
    this.comm.onServerMsgLogged.addHandler(this.onMsgLogged, this);
    this.comm.onServerMsgPersons.addHandler(this.onMsgPersons, this);  
    this.comm.onServerMsgUserGroups.addHandler(this.onMsgGroups, this);     
    this.comm.onServerMsgSynchronized.addHandler(this.onMsgSynchornized, this);
    this.comm.onServerMsgSuggestions.addHandler(this.onMsgSuggestions, this);
    this.comm.onServerMsgTypes.addHandler(this.onMsgTypes, this); 
    this.comm.onServerMsgResynchronize.addHandler(this.onMsgResynchronize, this);
    
              
    this.comm.onServerMsgTextModification.addHandler(this.onMsgTextModification, this);
    
    this.comm.onServerMsgSettings.addHandler(this.onMsgSettings, this);
    this.comm.onServerMsgOk.addHandler(this.onMsgOk, this);     
    this.comm.onServerMsgError.addHandler(this.onMsgError, this);
    this.comm.onServerMsgWarning.addHandler(this.onMsgWarning, this);   
    this.comm.onServerMsgUnknown.addHandler(this.onMsgUnknown, this);  
    this.comm.onServerMsgEntities.addHandler(this.onMsgEntities, this);
    this.comm.onServerConnectionLost.addHandler(this.onServerConnectionLost, this); 
    
    // --------------------------------------------   
    // SETTINGS RULES
    // --------------------------------------------     
    
    // Rule for ClientAnnotationTypeColor.. setting - sets type color
    // due to setting value
    this.settings.addRule({
        name : "Rule-ClientAnnotationTypeColor",
        regExp: new RegExp("^ClientAnnotationTypeColor"), 
        onApply: this.types.settingsRuleApplyTypeColor,
        onApplyScope: this.types,
        onClean: this.types.settingsRuleCleanTypeColor,
        onCleanScope: this.types
    });

    this.gui.toolbar.setTag("lastStateOfIsHidden", this.gui.toolbar.isHidden);  // Prevent toolbar displaying during connection errors
    this.gui.toolbar.hide();
} 



// -------------------------------------------------------------- Editor.render
/**
 * Renders editor.  
 *
 * @name render
 * @memberOf AEd.editors.Editor
 * @function    
 * @param {Element} element Optional Element to render editor to.   
 *  	
 */
AEd.editors.Editor.prototype.render = function(element) {
    this.gui.render(element);
} 


// ---------------------------------------------------------------- Editor.hide
/**
 * Hides editor.
 *
 * @name hide
 * @memberOf AEd.editors.Editor
 * @function    
 *  	
 */
AEd.editors.Editor.prototype.hide = function() {
    this.gui.hide();
} 


// ---------------------------------------------------------------- Editor.show
/**
 * Shows hidden editor.
 *
 * @name show
 * @memberOf AEd.editors.Editor
 * @function   
 *  	
 */
AEd.editors.Editor.prototype.show = function() {
    this.gui.show();
} 



// ----------------------------------------------------------- Editor.setActive
/**
 * Sets editor's state to activated or deactivated  
 * due to active parameter. 
 *
 * @name setActive
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Boolean} active True or false value - activate or deactivate editor.  	
 */
AEd.editors.Editor.prototype.setActive = function(active) {
   if (typeof active != 'undefined') {
      if (active) {
          this.isActive = true;
          this.show();
      }
      else {
          this.isActive = false;
          this.hide();
      }   
   }
} 



// ****************************************************************************
// ACTIONS
// ****************************************************************************



// ------------------------------------------------------------- Editor.connect
/**
 * Sends connect msg to server
 *
 * @name connect
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {String} server Connection server.  	
 * @param {String} user Connection user.
 * @param {String} password Connection password.   
 */
AEd.editors.Editor.prototype.connect = function(server, user, password, system) {

   if (typeof server != 'undefined') {
      this.comm.setServer(server);
      this.gui.dlgAnnotate.setServerUri(server);   
      this.gui.dlgConnect.hide();
      
      var msg = new AEd.ui.Message({title: AEd.I18n.t("Connecting"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg);     
      
      var oMsgConnect = {msgtype: "connect"};
      var oMsgLogin   = {msgtype: "login", user: user, password: password};
      if (AEd.CONFIG.AED_AUTH_TYPE == 1) {  // external authentication
          oMsgLogin   = {msgtype: "login", user: user, token: password, system: system};
      }

      var onSuccess = function(oResponse) { this.onConnectResponse(oResponse, msg); };
      var onFailure = function(oResponse) { msg.setIcon("error");
                                            msg.setTitle(AEd.I18n.t("Connection_error"));
                                            msg.setSubtitle(AEd.I18n.t("Please_reconnect"));                                             
                                            msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                          };

      var editorContext = this;

      this.unsuccessfulConnectionTimeout = setTimeout(function(){editorContext.controlConnection(editorContext, msg.content, false)}, 25000);   // Control connection attempt

      if (AEd.userGroupSwitching){

         this.gui.dlgGroups.show();
         AEd.userGroupSwitching = false;
      }

      this.comm.sendPostRequest([oMsgConnect, oMsgLogin], {onSuccess: onSuccess, onFailure: onFailure, scope: this });      
   }
} 

// ------------------------------------------------------------- Editor.controlConnection
/**
 * Controls if connection attempt was successful if not then shows error.
 *
 * @name controlConnection
 * @memberOf AEd.editors.Editor
 * @function    
 * @param {AEd.Editor} context : editor context
 * @param {String} message : custom error message
 * @param {Boolean} withoutControl : do not control connection attempt - show error only
 */

AEd.editors.Editor.prototype.controlConnection = function(context, message, withoutControl) {

   if (context.isConnected && !withoutControl){  // Connection attempt was successful - do nothing

      return;
   }

   else {  // Connection attempt was not successful

     var msg = new AEd.ui.core.UIMessage({  // Create Message
         title: AEd.I18n.t("Dlg_not_connected_title"),
         headerContent: message ? message : AEd.I18n.t("Dlg_not_connected_text"),
         icon: "error"
     });
    
     context.gui.dlgNotConnected.contentArea.addItem(msg);  // Add dialog to content area


     var btnDisableAEd = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_not_connected_button_disable_aed")});  // Create buttons
     var btnReconnect = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_not_connected_button_reconnect")});
    
     context.gui.dlgNotConnected.buttonsArea.addItem(btnDisableAEd);
     context.gui.dlgNotConnected.buttonsArea.addItem(btnReconnect);
    

     btnDisableAEd.onClick.addHandler(function() {

          context.gui.dlgNotConnected.buttonsArea.removeItem(btnDisableAEd); // Destroy this dialog
          context.gui.dlgNotConnected.buttonsArea.removeItem(btnReconnect);
          context.gui.dlgNotConnected.contentArea.removeItem(msg);
          AEd.Dialogs.remove(context.gui.dlgNotConnected);  
          context.gui.dlgNotConnected.remove();          
  
          context.editorNativeObject.buttons.aed.onclick();    // Deselect aed button
          context.gui.destroy();           // Destroy editor gui
          delete context;     

     });

     btnReconnect.onClick.addHandler(function() {

          context.gui.dlgNotConnected.buttonsArea.removeItem(btnDisableAEd); // Destroy this dialog
          context.gui.dlgNotConnected.buttonsArea.removeItem(btnReconnect);
          context.gui.dlgNotConnected.contentArea.removeItem(msg);
          AEd.Dialogs.remove(context.gui.dlgNotConnected);  
          context.gui.dlgNotConnected.remove();
          
          context.editorNativeObject.buttons.aed.onclick();    // Deselect aed button
          context.editorNativeObject.buttons.aed.onclick();    // Run editor again
     });

     context.gui.dlgNotConnected.render(context.domElementTarget);
     AEd.Dialogs.add(context.gui.dlgNotConnected, "modal");

   }

}

// ---------------------------------------------------------- Editor.disconnect
/**
 * Makes editor disconnected
 *
 * @name disconnect
 * @memberOf AEd.editors.Editor
 * @function
 * @param {Boolean} destroy True if editor should be destroyed after disconnect.  	
 * @param {Object} t Object with all editor instances.
 * @param {Object} id ID of Editor instance to be destroyed.      
 */
AEd.editors.Editor.prototype.disconnect = function(destroy, t, id) {

      var oMsgLogout = {msgtype: "logout"}
      var oMsgDisconnect = {msgtype: "disconnect"}        
      var onSuccess = function(oResponse) {this.onDisconnectResponse(oResponse, destroy, t, id);};
      var onFailure = function(oResponse) {this.onDisconnectResponse(oResponse, destroy, t, id);};             
      this.comm.sendPostRequest([oMsgLogout, oMsgDisconnect], {onSuccess: onSuccess, onFailure: onFailure, scope: this });
 
      this.comm.setCometEnabled(false);
      this.comm.setSessionId(null);
      this.comm.setServer(null); 
      this.comm.setServerProtocolVersion(null);
      
      this.isConnected = false;
      this.user.isLogged = false;
      this.user.id = null;
      this.user.name = null; 
      this.resourceUriFromServer = null;    
      this.areInitialSettingsSet = false; 
      
      this.annotations.destroyAll();
      this.suggestions.destroyAll();
      this.settings.removeAllSettings();
      this.persons.removeAllPersons();
      this.groups.removeAllGroups();
      this.subscriptions.removeAllSubscriptions();
      this.gui.hide(true); // hide dialogs
      this.gui.setState("NOT_LOGGED"); // set state "is hidden""
      this.gui.toolbar.setSelected(false); // set SOME buttons on toolbar "not selected"
      this.gui.advancedToolbar.setSelected(false); // set SOME buttons on advanced toolbar "not selected"
        
      this.comm.cancelLastGetRequest();      
      
      var msg = new AEd.ui.Message({title: AEd.I18n.t("Disconnected"), subtitle: AEd.I18n.t("Connection_was_closed"), icon: "ok"}); 
      this.gui.dlgStatusBar.add(msg); 
      this.wysiwyg.setContent(this.wysiwyg.getOrigDocContent());  // Fixes undestroyed annotation fragments after undo/redo and disconnect
} 


// -------------------------------------------------------- Editor.queryPersons
/**
 * Sends queryPersons msg to server
 *
 * @name queryPersons
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} params Msg params.  	  
 */
AEd.editors.Editor.prototype.queryPersons = function(params) {
     
      if(!params.isQueryPersonsForSuggestions){
        var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Query_Persons"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
        this.gui.dlgStatusBar.add(msg);     
      }

      if (!params) params = {};
      var filter = params.filter || "";
      var withGroups = params.withGroups || false;
      var dialog = params.dialog || "";
      var isQueryPersonsForSuggestions = params.isQueryPersonsForSuggestions || false; 
      var isQueryPersonsForDefaultSubscriptions   = params.isQueryPersonsForDefaultSubscriptions || false;
      
      var isQueryPersonsForLoggedUser = params.isQueryPersonsForLoggedUser || false;
       var isQueryPersonsForSearching = params.isQueryPersonsForSearching || false;      
      //If searching for suggestions us this switch automaticaly
      isQueryPersonsForSearching = params.isQueryPersonsForSuggestions == true ?  true : isQueryPersonsForSearching;  
        
      var oMsgQueryPersons = {msgtype: "queryPersons", filter: isQueryPersonsForSearching ? "*" + filter + "*" : filter, withGroups: withGroups};
      var onSuccess = function(oResponse) { oResponse.isQueryPersonsForLoggedUser = isQueryPersonsForLoggedUser;
                                            oResponse.isQueryPersonsForSearching = isQueryPersonsForSearching;
                                            oResponse.isQueryPersonsForSuggestions = isQueryPersonsForSuggestions;
                                            oResponse.isQueryPersonsForDefaultSubscriptions = isQueryPersonsForDefaultSubscriptions;
                                            oResponse.dialog = dialog;

                                            this.onQueryPersonsResponse(oResponse, msg); 
                                          };
      var onFailure = function(oResponse) { msg.setIcon("error");
                                            msg.setTitle(AEd.I18n.t("Error"));
                                            msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Query_Persons"));                                             
                                            msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                          };

      this.comm.sendPostRequest([oMsgQueryPersons], {onSuccess: onSuccess, onFailure: onFailure, scope: this });                  
} 



// --------------------------------------------------------- Editor.queryGroups
/**
 * Sends queryGroups msg to server
 *
 * @name queryGroups
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} params Msg params.  	  
 */
AEd.editors.Editor.prototype.queryGroups = function(params) {
     
      if(!params.isQueryGroupsForSuggestions){
      
        var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Query_Groups"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
        this.gui.dlgStatusBar.add(msg);     
      }

      if (!params) params = {};
      var filter = params.filter || "";
      var dialog = params.dialog || "";
      var withPersons = params.withPersons || false;
      var isQueryGroupsForSuggestions = params.isQueryGroupsForSuggestions || false;  

      var isQueryGroupsForSearching = params.isQueryGroupsForSearching || false;      
       
      var oMsgQueryGroups = {msgtype: "queryUserGroups", filter: "*" + filter + "*", withPersons: withPersons};

      
      var onSuccess = function(oResponse) { oResponse.isQueryGroupsForSearching = isQueryGroupsForSearching;
                                            oResponse.isQueryGroupsForSuggestions = isQueryGroupsForSuggestions;
                                            oResponse.dialog = dialog;
                                            this.onQueryGroupsResponse(oResponse, msg); 
                                          };
      var onFailure = function(oResponse) { msg.setIcon("error");
                                            msg.setTitle(AEd.I18n.t("Error"));
                                            msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Query_Groups"));                                             
                                            msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                          };

      this.comm.sendPostRequest([oMsgQueryGroups], {onSuccess: onSuccess, onFailure: onFailure, scope: this });                  
} 



// ----------------------------------------------------------- Editor.joinGroup
/**
 * Sends joinGroup msg to server
 *
 * @name joinGroup
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} uiGroup Group object.  	  
 */
AEd.editors.Editor.prototype.joinGroup = function(uiGroup) {
     
      var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Join_Group"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg);     
       
      var oMsgJoinGroup = {msgtype: "joinGroup", group: uiGroup.assignedGroup.uri};   
      
      var onSuccess = function(oResponse) { oResponse.uiGroup = uiGroup;
                                            this.onJoinGroupResponse(oResponse, msg); 
                                            AEd.userGroupSwitching = true; // Show user group dialog on restart
                                            // Restart annotation editor
                                            this.editorNativeObject.buttons.aed.onclick();    // Deselect aed button
                                            this.editorNativeObject.buttons.aed.onclick();    // Run editor again
                                          };
      var onFailure = function(oResponse) { msg.setIcon("error");
                                            msg.setTitle(AEd.I18n.t("Error"));
                                            msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Join_Group"));                                             
                                            msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                       
                                            AEd.userGroupSwitching = true; // Show user group dialog on restart
                                            // Restart annotation editor
                                            this.editorNativeObject.buttons.aed.onclick();    // Deselect aed button
                                            this.editorNativeObject.buttons.aed.onclick();    // Run editor again
                                          };

      this.comm.sendPostRequest([oMsgJoinGroup], {onSuccess: onSuccess, onFailure: onFailure, scope: this });                  
} 



// ---------------------------------------------------------- Editor.leaveGroup
/**
 * Sends leaveGroup msg to server
 *
 * @name leaveGroup
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} uiGroup Group object.  	  
 */
AEd.editors.Editor.prototype.leaveGroup = function(uiGroup) {
     
      var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Leave_Group"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg);     
       
      var oMsgLeaveGroup = {msgtype: "leaveGroup", group: uiGroup.assignedGroup.uri};   
      
      var onSuccess = function(oResponse) { oResponse.uiGroup = uiGroup;
                                            this.onLeaveGroupResponse(oResponse, msg); 
                                            AEd.userGroupSwitching = true; // Show user group dialog on restart
                                            // Restart annotation editor
                                            this.editorNativeObject.buttons.aed.onclick();    // Deselect aed button
                                            this.editorNativeObject.buttons.aed.onclick();    // Run editor again
                                          };
      var onFailure = function(oResponse) { msg.setIcon("error");
                                            msg.setTitle(AEd.I18n.t("Error"));
                                            msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Leave_Group"));                                             
                                            msg.setContent(AEd.XML.escapeXmlString(oResponse.data));

                                            AEd.userGroupSwitching = true; // Show user group dialog on restart
                                            // Restart annotation editor
                                            this.editorNativeObject.buttons.aed.onclick();    // Deselect aed button
                                            this.editorNativeObject.buttons.aed.onclick();    // Run editor again
                                          };

      this.comm.sendPostRequest([oMsgLeaveGroup], {onSuccess: onSuccess, onFailure: onFailure, scope: this });                  
} 



// ---------------------------------------------------------- Editor.queryTypes
/**
 * Sends queryTypes msg to server
 *
 * @name queryTypes
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} params Msg params.  	  
 */

AEd.editors.Editor.prototype.queryTypes = function(params) { 

      if (!params) params = {};
      var filter = params.filter || "";
      
      if (!params.filter && !params.queryTypes) {
          var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Query_Types"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
          this.gui.dlgStatusBar.add(msg);
      }

      var isQueryTypesForSuggestions = params.isQueryTypesForSuggestions || false;      
      
      var typeOfAttribute = params.type || false;
      var dialog = params.dialog || "";

      var oMsgQueryTypes = {msgtype: "queryTypes", filter: "*" + filter + "*"};
 
      var onSuccess = function(oResponse) { oResponse.isQueryTypesForSuggestions = isQueryTypesForSuggestions;
                                            oResponse.isQueryTypesForUserGroupSwitching = params.isQueryTypesForUserGroupSwitching;
                                            oResponse.typeOfAttribute = typeOfAttribute;
                                            oResponse.dialog = dialog;
                                            oResponse.filter = filter;
                                            this.onQueryTypesResponse(oResponse, msg); 
                                          };
      var onFailure = function(oResponse) { if (!params.filter) {
                                                msg.setIcon("error");
                                                msg.setTitle(AEd.I18n.t("Error"));
                                                msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Query_Types"));                                             
                                                msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                            }
                                          };

      this.comm.sendPostRequest([oMsgQueryTypes], {onSuccess: onSuccess, onFailure: onFailure, scope: this });   
}

// ---------------------------------------------------------- Editor.queryAttrFromOnto
/**
 * Sends queryAttrFromOnto msg to server
 *
 * @name queryAttrFromOnto
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} params Msg params.  	  
 */

AEd.editors.Editor.prototype.queryAttrFromOnto = function(params) { 

      if (!params) params = {};
      var userGroup = params.userGroup || "";
      
      if (!params.userGroup && !params.queryAttrFromOnto) {
          var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Query_Attr_From_Onto"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
          this.gui.dlgStatusBar.add(msg);
      }

      var oMsgQueryAttrFromOnto = {msgtype: "queryAttrFromOnto", userGroup: userGroup};
 
      var onSuccess = function(oResponse) { this.onQueryAttrFromOntoResponse(oResponse, msg); 
                                          };
      var onFailure = function(oResponse) {
                                          };

      this.comm.sendPostRequest([oMsgQueryAttrFromOnto], {onSuccess: onSuccess, onFailure: onFailure, scope: this });   
}



// ----------------------------------------------------------- Editor.sendTypes
/**
 * Creates types message and sends it to server
 *
 * @name sendTypes
 * @memberOf AEd.editors.Editor
 * @function  
 * @param {Object} params oject with add, change or remove properties to add, change and remove types   
 */
AEd.editors.Editor.prototype.sendTypes = function(params) {

      //GUI message
      var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Types"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg); 

      if (params) {      
                           
 
            var oMsgTypes = {
                msgtype : "types",
                add: params.add,
                change: params.change,
                remove: params.remove
            }           
      
            var onSuccess = function(oResponse) { this.onTypesResponse(oResponse, msg); };
            var onFailure = function(oResponse) { msg.setIcon("error");
                                                  msg.setTitle(AEd.I18n.t("Error"));
                                                  msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Types"));                                             
                                                  msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                                };

            this.comm.sendPostRequest([oMsgTypes], {onSuccess: onSuccess, onFailure: onFailure, scope: this });              
      } 
}




// --------------------------------------------------------- Editor.synchronize
/**
 * Sends synchronize msg to server
 *
 * @name synchronize
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} params Msg params.  	  
 */
AEd.editors.Editor.prototype.synchronize = function(params) {
      // clear all annotations and suggestions first, server will send them again     
      this.annotations.destroyAll();
      this.suggestions.destroyAll();
           
      var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Synchornize"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg);     

      if (!params) params = {};
      var overwrite = params.overwrite || "false";
      
       
      var oMsgSynchronize = {msgtype: "synchronize", overwrite: overwrite, resource: this.resourceUri, content: AEd.CONFIG.RESOURCE_PREFIX + this.wysiwyg.getOrigDocContent() + AEd.CONFIG.RESOURCE_SUFFIX};

      
      var onSuccess = function(oResponse) { this.onSynchronizeResponse(oResponse, msg); };
      var onFailure = function(oResponse) { msg.setIcon("error");
                                            msg.setTitle(AEd.I18n.t("Error"));
                                            msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Synchornize"));                                             
                                            msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                          };

      this.comm.sendPostRequest([oMsgSynchronize], {onSuccess: onSuccess, onFailure: onFailure, scope: this });                    
} 



// ------------------------------------------------------- Editor.resynchronize
/**
 * Sends resynchronize msg to server
 *
 * @name resynchronize
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} params Msg params.  	  
 */
AEd.editors.Editor.prototype.resynchronize = function() {
     
      // clear all annotations and suggestions first, server will send them again     
      this.annotations.destroyAll();
      this.suggestions.destroyAll();
      
      var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Resynchornize"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg);     

 
      var oMsgResynchronize = {msgtype: "resynchronize", content: AEd.CONFIG.RESOURCE_PREFIX + this.wysiwyg.getOrigDocContent() + AEd.CONFIG.RESOURCE_SUFFIX};

      
      var onSuccess = function(oResponse) { this.onResynchronizeResponse(oResponse, msg); };
      var onFailure = function(oResponse) { msg.setIcon("error");
                                            msg.setTitle(AEd.I18n.t("Error"));
                                            msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Resynchornize"));                                             
                                            msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                          };

      this.comm.sendPostRequest([oMsgResynchronize], {onSuccess: onSuccess, onFailure: onFailure, scope: this });                     
} 




// -------------------------------------------------- Editor.setInitialSettings
/**
 * Sets initial settings
 *
 * @name setInitialSettings
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} params Msg params.  	  
 */
AEd.editors.Editor.prototype.setInitialSettings = function() {
      if (this.settings.getValueByName("ServerLanguage") != AEd.CONFIG.DEFAULT_LANG) {
          this.settings.add([{name: "ServerLanguage", value: AEd.CONFIG.DEFAULT_LANG}]); 
      }

      if (!this.settings.getValueByName("ClientAdvancedToolbarOptions")) {
          this.settings.add([{name: "ClientAdvancedToolbarOptions", value: AEd.CONFIG.DEFAULT_ADV_TOOLBAR}]);
      }              
} 



// -------------------------------------------------------- Editor.sendSettings
/**
 * Sends settings msg to server
 *
 * @name sendSettings
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} settings Msg params.  	  
 */
AEd.editors.Editor.prototype.sendSettings = function(settings) {
     
      var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Settings"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg);     
    
      var oMsgSettings = {msgtype: "settings", params: settings};
      
      var onSuccess = function(oResponse) { this.onSettingsResponse(oResponse, msg); };
      var onFailure = function(oResponse) { msg.setIcon("error");
                                            msg.setTitle(AEd.I18n.t("Error"));
                                            msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Settings"));                                             
                                            msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                          };

      this.comm.sendPostRequest([oMsgSettings], {onSuccess: onSuccess, onFailure: onFailure, scope: this });                     
} 



// --------------------------------------------------------- Editor.unsubscribe
/**
 * Sends unsubscribe msg to server
 *
 * @name unsubscribe
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Array} array of aUnsubscribe Msg params.  	  
 */
AEd.editors.Editor.prototype.unsubscribe = function(aUnsubscribe) {

      var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Unsubscribe"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg);  

      for (var i = 0; i < aUnsubscribe.length; i++){ // Removes subtitle in brackets () from uri and user

        if (aUnsubscribe[i].user){

           aUnsubscribe[i].user = aUnsubscribe[i].user.replace(new RegExp(" (.*)", "g"), "");  
           aUnsubscribe[i].user = aUnsubscribe[i].user.replace(new RegExp("<br/>", "g"), ""); 
        }

        if (aUnsubscribe[i].uri){

           aUnsubscribe[i].uri = aUnsubscribe[i].uri.replace(new RegExp(" (.*)", "g"), ""); 
           aUnsubscribe[i].uri = aUnsubscribe[i].uri.replace(new RegExp("<br/>", "g"), ""); 
        }

        if (aUnsubscribe[i].type){

           aUnsubscribe[i].type = aUnsubscribe[i].type.replace(new RegExp("->", "g"), "/"); 
        }

      }

      var oMsgUnsubscribe = {msgtype: "unsubscribe", sources: aUnsubscribe};

      for (var i = 0; i < oMsgUnsubscribe.sources.length; i++){

        if (oMsgUnsubscribe.sources[i].uri){
           
           oMsgUnsubscribe.sources[i].uri = oMsgUnsubscribe.sources[i].uri.split(" ")[0];
        }
      }
      
      var onSuccess = function(oResponse) { this.onUnsubscribeResponse(oResponse, msg); };
      var onFailure = function(oResponse) { msg.setIcon("error");
                                            msg.setTitle(AEd.I18n.t("Error"));
                                            msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Unsubscribe"));                                             
                                            msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                          };

      this.comm.sendPostRequest([oMsgUnsubscribe], {onSuccess: onSuccess, onFailure: onFailure, scope: this });                     
} 



// ----------------------------------------------------------- Editor.subscribe
/**
 * Sends subscribe msg to server
 *
 * @name subscribe
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Array} array of aSubscribe Msg params.  	  
 */
AEd.editors.Editor.prototype.subscribe = function(aSubscribe) {

      var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Subscribe"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg); 

      for (var i = 0; i < aSubscribe.length; i++){  // Removes subtitle in brackets () from uri and user

        if (aSubscribe[i].user){

           aSubscribe[i].user = aSubscribe[i].user.replace(new RegExp(" (.*)", "g"), "");  
           aSubscribe[i].user = aSubscribe[i].user.replace(new RegExp("<br/>", "g"), ""); 
        }

        if (aSubscribe[i].uri){

           aSubscribe[i].uri = aSubscribe[i].uri.replace(new RegExp(" (.*)", "g"), "");     
           aSubscribe[i].uri = aSubscribe[i].uri.replace(new RegExp("<br/>", "g"), "");  
        }

        if (aSubscribe[i].type){

           aSubscribe[i].type = aSubscribe[i].type.replace(new RegExp("->", "g"), "/");      
        }

      }
    
      var oMsgSubscribe = {msgtype: "subscribe", sources: aSubscribe};

      for (var i = 0; i < oMsgSubscribe.sources.length; i++){

        if (oMsgSubscribe.sources[i].uri){
           
           oMsgSubscribe.sources[i].uri = oMsgSubscribe.sources[i].uri.split(" ")[0];
        }
      }

      var onSuccess = function(oResponse) { this.onSubscribeResponse(oResponse, msg); };
      var onFailure = function(oResponse) { msg.setIcon("error");
                                            msg.setTitle(AEd.I18n.t("Error"));
                                            msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Subscribe"));                                             
                                            msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                          };

      this.comm.sendPostRequest([oMsgSubscribe], {onSuccess: onSuccess, onFailure: onFailure, scope: this });                     
}



// ----------------------------------------------------------- Editor.sendSuggestion
/**
 * Creates suggestion message and sends it to server
 *
 * @name sendSuggestion
 * @memberOf AEd.editors.Editor
 * @function     
 */
AEd.editors.Editor.prototype.sendSuggestion = function() {

    var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Suggestion"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
    this.gui.dlgStatusBar.add(msg); 

    var oSuggestion = this.gui.dlgSuggestAnnotations.getSuggestion();
    var oProcessedSuggestion = this.completeSuggestion(oSuggestion);    

    var oSuggestAnnotation = {
        fragments : oProcessedSuggestion.fragments,
        type : oProcessedSuggestion.type
    }

    var oMsgSuggestion = {
        msgtype : "suggestAnnotations",
        add : [oSuggestAnnotation]
    }           
      
    var onSuccess = function(oResponse) { this.onSuggestionResponse(oResponse, msg); };
    var onFailure = function(oResponse) { msg.setIcon("error");
                                          msg.setTitle(AEd.I18n.t("Error"));
                                          msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Suggestion"));                                             
                                          msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                        };

    this.comm.sendPostRequest([oMsgSuggestion], {onSuccess: onSuccess, onFailure: onFailure, scope: this });
}



// ----------------------------------------------------------- Editor.sendAcceptSuggestion
/**
 * Creates suggestion message and sends it to server
 *
 * @name sendAcceptSuggestion
 * @memberOf AEd.editors.Editor
 * @function
 * @param {Array} oSuggestAnnotations array of suggestions      
 */
AEd.editors.Editor.prototype.sendAcceptSuggestion = function(oSuggestAnnotations) {

    //GUI message
    var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Suggestion"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
    this.gui.dlgStatusBar.add(msg);

    // Control nested suggestions confirmation duplicities

    for (var i = 0; i < oSuggestAnnotations.length; i++){  // loops through suggestions

        var sugg1 = oSuggestAnnotations[i];

        if (sugg1.attributes && sugg1.attributes.length){  // suggestion has attributes

           for (var j = 0; j < sugg1.attributes.length; j++){   // loops through attributes

              if (sugg1.attributes[j].type == "nestedAnnotation" && sugg1.attributes[j].tmpId){  // suggestion has nested annotation

                for (var k = 0; k < oSuggestAnnotations.length; k++){

                    var sugg2 = oSuggestAnnotations[k];

                    if (sugg2.tmpId && sugg1.attributes[j].tmpId == sugg2.tmpId){  // check if nested annotation from attribute is in the oSuggestAnnotations array and delete thiss item (to prevent duplicities)

                       oSuggestAnnotations.splice(k, 1);
                       k--;
                    }
                }
              }
           }
        }
    }

    //prepare suggestions before sending
    var aProcessedSuggestAnnotations = new Array();
    //loop through all suggestions
    for (var i = 0; i < oSuggestAnnotations.length; i++) {

        if (oSuggestAnnotations[i].attributes && oSuggestAnnotations[i].attributes.length){   // Check attributes

           for (var j = 0; j < oSuggestAnnotations[i].attributes.length; j++){

               if ((oSuggestAnnotations[i].attributes[j].type == "annotationLink") && (this.suggestions.getSuggestionByTmpId(oSuggestAnnotations[i].attributes[j].tmpId)) && !this.types.getTypeByURI(this.suggestions.getSuggestionByTmpId(oSuggestAnnotations[i].attributes[j].tmpId).typeUri)){  // Type of annotationLink does not exist - create

                  var sugg = this.suggestions.getSuggestionByTmpId(oSuggestAnnotations[i].attributes[j].tmpId);
                  var suggType = sugg.annoType.path;
                  var type = this.types.getTypeByPath(suggType.replace(/\//g, "->"));
                  var typeName = sugg.annoType.name.split("/");   // split type via path separator
                 
                  var oType = {};
                  oType.name = sugg.annoType.name;
     
                  if (typeName.length == 1){   // Type is not subtype

                     oType.ancestor = null;
                     this.sendTypes({add:[oType]});
                  }

                  else {   // Type is subtype
 
                    var truncName = "";

                    for (var k = 0; k < typeName.length; k++){
 
                        truncName = truncName + typeName[i].replace(/,$/,"");

                        if (!this.types.getTypeByPath(truncName)){   // Type does not exist - create it

                           var oType = {};
                           oType.name = typeName[i].replace(/,$/,"");

                           if (k == 0){   // Root type has no ancestor
                      
                              oType.ancestor = null;
                           }

                           else {  

                              oType.ancestor = this.types.getURIByPath(truncName);
                           }
                           

                           this.sendTypes({add:[oType]});
                        }

                        else {   // Type exists - break

                          break;
                        }

                        truncName = truncName + "/";

                    }    
                  }
            }

            else if (oSuggestAnnotations[i].attributes[j].type == "nestedAnnotation" && ((oSuggestAnnotations[i].attributes[j].annoType &&!this.types.getTypeByPath(oSuggestAnnotations[i].attributes[j].annoType.path)) || (oSuggestAnnotations[i].attributes[j].typePath &&!this.types.getTypeByPath(oSuggestAnnotations[i].attributes[j].typePath)))){

                  var sugg = oSuggestAnnotations[i].attributes[j];
                  var suggType;
                  var typeName;   // split type via path separator

                  if (oSuggestAnnotations[i].attributes[j].annoType){
                  
                     suggType = sugg.annoType.path;
                     typeName = sugg.annoType.path.split("/");   // split type via path separator
                  }

                  else {
 
                     suggType = sugg.typePath;
                     typeName = sugg.typePath.split("/");   // split type via path separator                     
                  }

                  var type = this.types.getTypeByPath(suggType.replace(/\//g, "->"));
                 
                  var oType = {};
                  oType.name = typeName[typeName.length - 1];
     
                  if (typeName.length == 1){   // Type is not subtype

                     oType.ancestor = null;
                     this.sendTypes({add:[oType]});
                  }

                  else {   // Type is subtype
 
                    var truncName = "";

                    for (var k = 0; k < typeName.length; k++){
 
                        truncName = truncName + typeName[i].replace(/,$/,"");

                        if (!this.types.getTypeByPath(truncName)){   // Type does not exist - create it

                           var oType = {};
                           oType.name = typeName[i].replace(/,$/,"");

                           if (k == 0){   // Root type has no ancestor
                      
                              oType.ancestor = null;
                           }

                           else {  

                              oType.ancestor = this.types.getURIByPath(truncName);
                           }
                           

                           this.sendTypes({add:[oType]});
                        }

                        else {   // Type exists - break

                          break;
                        }

                        truncName = truncName + "/";

                    }    
                  }

             }
            
               
           }
        }

        //get the suggested annotation
        this.gui.dlgAnnotate.loadAnnotation(oSuggestAnnotations[i], this.types, false);
        var oSuggestedAnnotation = this.gui.dlgAnnotate.getAnnotation();
        
        //completes the annotation before sending
        var oProcessedSuggestAnnotation = this.completeAnnotation(oSuggestedAnnotation);
    
        oProcessedSuggestAnnotation.tmpId = oSuggestAnnotations[i].tmpId;
        oProcessedSuggestAnnotation.confirmed = "manually";
        aProcessedSuggestAnnotations.push(oProcessedSuggestAnnotation); 
    } 

    //message
    var oMsgSuggestion = {
        msgtype : "annotations",
        add : aProcessedSuggestAnnotations
    }           
     
    this.gui.dlgAnnotate.reset(); 
    var onSuccess = function(oResponse) {
        this.onAnnotationsResponse(oResponse, msg);
    };
    
    var onFailure = function(oResponse) {
        msg.setIcon("error");
        msg.setTitle(AEd.I18n.t("Error"));
        msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Suggestion"));                                             
        msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
    };

    this.comm.sendPostRequest([oMsgSuggestion], {onSuccess: onSuccess, onFailure: onFailure, scope: this });
} 



// ----------------------------------------------------------- Editor.sendAcceptEditedSuggestion
/**
 * Creates suggestion message and sends it to server
 *
 * @name sendAcceptEditedSuggestion
 * @memberOf AEd.editors.Editor
 * @function     
 * @param {Array} oSuggestAnnotations array of suggestions
 */
AEd.editors.Editor.prototype.sendAcceptEditedSuggestion = function(oSuggestAnnotations) {

    var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Suggestion"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
    this.gui.dlgStatusBar.add(msg);      

    var typesToCreate = new Array();

    //loop through all suggestions
    for (var i = 0; i < oSuggestAnnotations.length; i++) {

        if (oSuggestAnnotations[i].attributes && oSuggestAnnotations[i].attributes.length){   // Check attributes

           for (var j = 0; j < oSuggestAnnotations[i].attributes.length; j++){

               if ((oSuggestAnnotations[i].attributes[j].type == "annotationLink") && (this.suggestions.getSuggestionByTmpId(oSuggestAnnotations[i].attributes[j].tmpId)) && !this.types.getTypeByURI(this.suggestions.getSuggestionByTmpId(oSuggestAnnotations[i].attributes[j].tmpId).typeUri)){  // Type of annotationLink does not exist - create

                  var sugg = this.suggestions.getSuggestionByTmpId(oSuggestAnnotations[i].attributes[j].tmpId);
                  var suggType = sugg.annoType.path;
                  var type = this.types.getTypeByPath(suggType.replace(/\//g, "->"));
                  var typeName = sugg.annoType.name.split("/");   // split type via path separator
                 
                  var oType = {};
                  oType.name = sugg.annoType.name;
     
                  if (typeName.length == 1){   // Type is not subtype

                     oType.ancestor = null;
                     this.sendTypes({add:[oType]});
                  }

                  else {   // Type is subtype
 
                    var truncName = "";

                    for (var k = 0; k < typeName.length; k++){
 
                        truncName = truncName + typeName[i].replace(/,$/,"");

                        if (!this.types.getTypeByPath(truncName)){   // Type does not exist - create it

                           var oType = {};
                           oType.name = typeName[i].replace(/,$/,"");

                           if (k == 0){   // Root type has no ancestor
                      
                              oType.ancestor = null;
                           }

                           else {  

                              oType.ancestor = this.types.getURIByPath(truncName);
                           }
                           

                           this.sendTypes({add:[oType]});
                        }

                        else {   // Type exists - break

                          break;
                        }

                        truncName = truncName + "/";

                    }    
                  }
            }

            else if (oSuggestAnnotations[i].attributes[j].type == "nestedAnnotation" && ((oSuggestAnnotations[i].attributes[j].annoType &&!this.types.getTypeByPath(oSuggestAnnotations[i].attributes[j].annoType.path)) || (oSuggestAnnotations[i].attributes[j].typePath &&!this.types.getTypeByPath(oSuggestAnnotations[i].attributes[j].typePath)))){

                  var sugg = oSuggestAnnotations[i].attributes[j];
                  var suggType;
                  var typeName;   // split type via path separator

                  if (oSuggestAnnotations[i].attributes[j].annoType){
                  
                     suggType = sugg.annoType.path;
                     typeName = sugg.annoType.path.split("/");   // split type via path separator
                  }

                  else {
 
                     suggType = sugg.typePath;
                     typeName = sugg.typePath.split("/");   // split type via path separator                     
                  }

                  var type = this.types.getTypeByPath(suggType.replace(/\//g, "->"));
                 
                  var oType = {};
                  oType.name = typeName[typeName.length - 1];
     
                  if (typeName.length == 1){   // Type is not subtype

                     oType.ancestor = null;
                     this.sendTypes({add:[oType]});
                  }

                  else {   // Type is subtype
 
                    var truncName = "";

                    for (var k = 0; k < typeName.length; k++){
 
                        truncName = truncName + typeName[i].replace(/,$/,"");

                        if (!this.types.getTypeByPath(truncName)){   // Type does not exist - create it

                           var oType = {};
                           oType.name = typeName[i].replace(/,$/,"");

                           if (k == 0){   // Root type has no ancestor
                      
                              oType.ancestor = null;
                           }

                           else {  

                              oType.ancestor = this.types.getURIByPath(truncName);
                           }
                           

                           this.sendTypes({add:[oType]});
                        }

                        else {   // Type exists - break

                          break;
                        }

                        truncName = truncName + "/";

                    }    
                  }

             }
            
               
           }
        }
    }



    var aProcessedSuggestAnnotations = new Array();
    for (var i = 0; i < oSuggestAnnotations.length; i++) {
        if (i != 0) {
            this.gui.dlgAnnotate.loadAnnotation(oSuggestAnnotations[i], this.types, false);
            var oSuggestedAnnotation = this.gui.dlgAnnotate.getAnnotation();
        }
        else {
            var oSuggestedAnnotation = oSuggestAnnotations[i];
        }
        var oProcessedSuggestAnnotation = this.completeAnnotation(oSuggestedAnnotation, typesToCreate);    
    
        oProcessedSuggestAnnotation.tmpId = oSuggestAnnotations[i].tmpId;
        if (i == 0) {
            oProcessedSuggestAnnotation.tmpId = this.gui.dlgAnnotate.modeEditSuggestionTmpId;
            oProcessedSuggestAnnotation.confirmed = "manuallyEdited";
        }
        else {
            oProcessedSuggestAnnotation.confirmed = "manually"    
        }
        aProcessedSuggestAnnotations.push(oProcessedSuggestAnnotation);    
    }
    
      
    var oMsgTypes = {
        msgtype : "types",
        add: typesToCreate
    }   
    
    var oMsgSuggestion = {
        msgtype : "annotations",
        add : aProcessedSuggestAnnotations
    }
    
    var node = this.gui.dlgAnnotate.treeNodeAnnotation;

    this.gui.dlgAnnotate.reset();           
      
    var onSuccess = function(oResponse) { this.onAnnotationsResponse(oResponse, msg);
                                          this.addAttributes(node);};
    var onFailure = function(oResponse) { msg.setIcon("error");
                                          msg.setTitle(AEd.I18n.t("Error"));
                                          msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Suggestion"));                                             
                                          msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                        };

    this.comm.sendPostRequest([oMsgSuggestion], {onSuccess: onSuccess, onFailure: onFailure, scope: this });
}



// ----------------------------------------------------------- Editor.sendRefuseSuggestion
/**
 * Creates suggestion message and sends it to server
 *
 * @name sendRefuseSuggestion
 * @memberOf AEd.editors.Editor
 * @function
 * @param {Object} aSuggestAnnotation Msg params.       
 */
AEd.editors.Editor.prototype.sendRefuseSuggestion = function(aSuggestAnnotation) {

    var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Suggestion"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
    this.gui.dlgStatusBar.add(msg);      

    var oMsgSuggestion = {
        msgtype : "suggestAnnotations",
        refuse : aSuggestAnnotation
    }           
      
    var onSuccess = function(oResponse) { this.onSuggestionResponse(oResponse, msg); };
    var onFailure = function(oResponse) { msg.setIcon("error");
                                          msg.setTitle(AEd.I18n.t("Error"));
                                          msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Suggestion"));                                             
                                          msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                        };

    this.comm.sendPostRequest([oMsgSuggestion], {onSuccess: onSuccess, onFailure: onFailure, scope: this });
} 



// -------------------------------------------------- Editor.quickSuggestions
/**
 * This method is called on quickSuggestions button click.
 * It is also called after synchronization and resynchronization if there are no annotations in document. 
 *  
 * @name quickSuggestions
 * @memberOf AEd.editors.Editor
 * @function     
 */
AEd.editors.Editor.prototype.quickSuggestions = function () {
    if (this.gui.toolbars.btnQuickSuggestions.isSelected) {
        this.gui.toolbars.btnQuickSuggestions.setSelected(false);
        this.gui.dlgSuggestAnnotations.quickSuggestions();
    }
    else {
        this.gui.toolbars.btnQuickSuggestions.setSelected(true);
        this.gui.dlgSuggestAnnotations.reset();
    }
    this.sendSuggestion();
}



// -------------------------------------------------- Editor.completeSuggestion
/**
 * Completes suggestion gained from Annotate dialog to be send to server
 *  
 * @name completeSuggestion
 * @memberOf AEd.editors.Editor
 * @function
 * @param (Object) oSuggestion Represents informations about suggestions asking.      
 */
AEd.editors.Editor.prototype.completeSuggestion = function (oSuggestion) {
    
    var oNewSuggestion = {};
    if (oSuggestion) {
    
        if (oSuggestion.wholeDoc) { // whole document
            oNewSuggestion.fragments = new Array();    
        }
        else if (oSuggestion.selectionObject) { // fragments
            oNewSuggestion.fragments = new Array();
            oNewSuggestion.fragments = AEd.Fragments.mergeFragments(AEd.Fragments.getFragmentsFromSelection(oSuggestion.selectionObject, true)); // mergeFragments - to prevent splitting fragments when fragment contains an annotation
        }
        else if (oSuggestion.noSuggestion) {
            oNewSuggestion.fragments = new Array();
            var fragments = new Array();
            fragments.push({
                fragmentLength: "0"}
            );
            
            oNewSuggestion.fragments = fragments;     
        }
        
        if (oSuggestion.typePath) {
            oNewSuggestion.type = this.types.getURIByPath(oSuggestion.typePath);
        }     
    }
                          
    return oNewSuggestion;  
};



// -------------------------------------------------- Editor.addAttributes
/**
 * Adds attributes to types when annotation is saved
 *  
 * @name addAttributes
 * @memberOf AEd.editors.Editor
 * @function
 * @param {AEd.ui.core.UITreeNode} node Tree node.      
 */
AEd.editors.Editor.prototype.addAttributes = function (node) {
    
    var fnAddAttributes = function(node) {
      
        //get the original type
        var type = this.types.getTypeByPath(node.assignedObject.typePath);
        
        //check type validity -- it needs to contain at least 1 attribute
        if (type && node.childTreeNodes.length > 0) {
            
            var alreadyChanged = false;

            //get iType
            var iType = null;
            for (var i in oType) {
                if (oType[i].name == type.name) {
                    alreadyChanged = true;
                    iType = i;
                    break;
                }
            }
            
            // type has not been changed yet
            if (!alreadyChanged) {
              
                //create new type object
                var newType = {};
                newType.name = type.name;
                newType.uri = type.uri;
                newType.ancestor = type.ancestor;
                newType.attributes = [];
        
                // adds already existing or changed attributes
                //loops through all attributes of the original type
                for (var i in type.attributes) {
                  
                    var fromNode = false;
                    
                    //loops through all attributes of the new type
                    for (var j in node.childTreeNodes) {
                      
                        //get edited type's jth attribute
                        var editedType = node.childTreeNodes[j].assignedObject;
                        
                        //if the attribute already exists
                        if (editedType.name == type.attributes[i].name && editedType.addToTypeAttr) {
                            var typePathOrUri = "";
                            var typePath = editedType.typePath;

                            //get type path or URI
                            if (!editedType.simpleType && typePath) {
                                typePathOrUri = this.types.getTypeByPath(typePath).uri;
                            }
                            else {
                                typePathOrUri = typePath || "AnyAnnotation";
                            }
                            
                            //append the attribute to newType
                            newType.attributes.push({
                                name: editedType.name,
                                type: typePathOrUri,
                                required: editedType.required}
                            );

                            fromNode = true;
                            break;
                        }
                    }
                    
                    //if not from node
                    if (!fromNode) {
                      
                        //append the attribute to newType
                        newType.attributes.push({
                            name: type.attributes[i].name,
                            type: type.attributes[i].type,
                            required: type.attributes[i].required}
                        );    
                    }
                }
            
                // adds new attributes
                for (var i in node.childTreeNodes) {
                  
                    //the ith attribute of the edited type
                    var editedTypeAttr = node.childTreeNodes[i].assignedObject;
                    
                    //skip this attribute if it's not supposed to be included
                    if (!editedTypeAttr.addToTypeAttr) {
                        continue;
                    }
                    
                    //check whether the ith attribute of the edited type already exists in the original type
                    var alreadyExists = false;
                    for (var j in type.attributes) {
                        if (editedTypeAttr.name == type.attributes[j].name) {
                            alreadyExists = true;
                            break;
                        }                
                    }
                    
                    //adds the ith attribute of the edited type to newType if not included yet
                    if (!alreadyExists) {
                        
                        var typePathOrUri = "";
                        
                        //get type path or URI
                        if (!editedTypeAttr.simpleType && editedTypeAttr.typePath) {
                            typePathOrUri = this.types.getTypeByPath(editedTypeAttr.typePath).uri;
                        }
                        else {
                            typePathOrUri = editedTypeAttr.typePath || "AnyAnnotation";
                        }
                        //append the attribute to newType
                        newType.attributes.push({
                            name: editedTypeAttr.name,
                            type: typePathOrUri,
                            required: editedTypeAttr.required}
                        );        
                    }
                }
                
            
                // tests if type was changed
                if (newType.attributes.length > 0) {
                    //if the original type has any attributes
                    if (type.attributes.length > 0) {
                      
                        //adds all attributes that are changed or don't exist in type
                        for (var i in newType.attributes) {
                            var found = false;
                            var changed = false;
                            
                            for (var j in type.attributes) {
                              
                                var typeAttr = type.attributes[j];
                                var newTypeAttr = newType.attributes[i];
                                
                                //attribute found or even changed?
                                if (newTypeAttr.name == typeAttr.name) {
                                    if ((newTypeAttr.type != typeAttr.type) || (newTypeAttr.required != this.convertStringToBoolean(typeAttr.required))) {
                                        changed = true;
                                        break;
                                    }
                                    found = true;
                                }    
                            }
                            
                            if (!found) {
                                oType.push(newType);
                                break;
                            }
                            
                            if (changed) {
                                oType.push(newType);
                                break;
                            }
                        }  
                        
                    }
                    //the original type has no attributes --> append the attribute directly
                    else {
                        oType.push(newType);
                    }   
                }
            }
            
            // type has already been changed
            else {
                //create a new type with stored data
                var newType = {};
                newType.name = oType[iType].name;
                newType.uri = oType[iType].uri;
                newType.ancestor = oType[iType].ancestor;
                newType.attributes = [];
                
                // adds already existing or changed attributes
                for (var i in oType[iType].attributes) {
                    var fromNode = false;
                    for (var j in node.childTreeNodes) {
                      
                        var editedType = node.childTreeNodes[j].assignedObject;
                        
                        var oTypeAttr = oType[iType].attributes[i];
                      
                        //if names equal and addToTypeAttr is true
                        if (editedType.name == oTypeAttr.name && editedType.addToTypeAttr) {
                            
                            //get type path or URI
                            var typePathOrUri = "";
                            if (!editedType.simpleType) {
                                typePathOrUri = this.types.getTypeByPath(editedType.typePath).uri;
                            }
                            else {
                                typePathOrUri = editedType.typePath;
                            }
                            
                            //append the attribute to newType
                            newType.attributes.push({
                                name: editedType.name,
                                type: typePathOrUri,
                                required: editedType.required}
                            );
                            
                            fromNode = true;
                            break;
                        }
                    }
                    
                    if (!fromNode) {
                        newType.attributes.push({
                            name: oTypeAttr.name,
                            type: oTypeAttr.type,
                            required: oTypeAttr.required}
                        );    
                    }
                }
                
                // adds new attributes
                for (var i in node.childTreeNodes) {
                  
                    var alreadyExists = false;
                    
                    editedTypeAttr = node.childTreeNodes[i].assignedObject;
                    
                    if (!editedTypeAttr.addToTypeAttr) {
                        continue;
                    }
                    
                    //check whether the attribute already exists
                    for (var j in oType[iType].attributes) {
                        if (editedTypeAttr.name == oType[iType].attributes[j].name) {
                            alreadyExists = true;
                            break;
                        }                
                    }
                    
                    if (!alreadyExists) {
                      
                        //get type path or URI
                        var typePathOrUri = "";
                        if (!editedTypeAttr.simpleType) {
                            typePathOrUri = this.types.getTypeByPath(editedTypeAttr.typePath).uri;
                        }
                        else {
                            typePathOrUri = editedTypeAttr.typePath;
                        }
                        
                        //append the attribute to newType
                        newType.attributes.push({
                            name: editedTypeAttr.name,
                            type: typePathOrUri,
                            required: editedTypeAttr.required}
                        );        
                    }
                }
                
                //append new type to oType
                oType[iType] = newType;
            }  
        }   
    }
    
    //recursively calls fnAddAttributes for every structured attribute in the whole tree
    var fnFindTree = function(node) {
        for (var iAttr in node.childTreeNodes) {
          
            var childNode = node.childTreeNodes[iAttr];
          
            //if the attribute si structured -- simple types are ignored
            if (!childNode.assignedObject.simpleType) {
                fnAddAttributes.call(this, childNode);
                fnFindTree.call(this, childNode);
            }
        }
    }
    
    var oType = [];
    
    fnAddAttributes.call(this, node);
    
    fnFindTree.call(this, node);
    
    //send types to the server
    if (oType.length > 0) {
        this.sendTypes({change:oType});
    }
};



// -------------------------------------------------- Editor.convertStringToBoolean
/**
 * Converts string to boolean
 *  
 * @name convertStringToBoolean
 * @memberOf AEd.editors.Editor
 * @function
 * @param {String} string String to convert.      
 */
AEd.editors.Editor.prototype.convertStringToBoolean = function (string) {
    if (!string) return false;
    switch (string.toLowerCase()) {
        case "true": return true;
        case "false": return false;
    }
}



// -------------------------------------------------- Editor.completeAnnotation
/**
 * Completes annotation gained from Annotate dialog to be send to server
 *  
 * @name completeAnnotation
 * @memberOf AEd.editors.Editor
 * @function     
 */
AEd.editors.Editor.prototype.completeAnnotation = function (oAnnotation, typesToCreate) {

          var oNewAnnotation = {};
          if (oAnnotation) {

               switch (oAnnotation.type) {
                    case "Annotation":
                    
                        if (oAnnotation.annotationLink) {
                             oNewAnnotation.type       = "annotationLink";
                             oNewAnnotation.value      = oAnnotation.annotationLink;
                             oNewAnnotation.name       = oAnnotation.name;
                         }
                         else {
                             oNewAnnotation.uri           = oAnnotation.uri ? oAnnotation.uri : "";
                             oNewAnnotation.dateTime      = Timestamp.start();
                             oNewAnnotation.authorId      = this.user.id;
                             oNewAnnotation.authorName    = this.user.name; 
                             oNewAnnotation.authorAddress = this.user.email; 
                             oNewAnnotation.resourceUri   = this.resourceUriFromServer;   
                             oNewAnnotation.content       = oAnnotation.content;
                             oNewAnnotation.type          = oAnnotation.type;  // "nestedAnnotation, Annotation"  
                             if (!oAnnotation.typePath) {
                                oNewAnnotation.typeUri = "AnyAnnotation";   
                             }
                             else {
                                oNewAnnotation.typeUri       = this.types.getURIByPath(oAnnotation.typePath);
                                if (!oNewAnnotation.typeUri) { // type not exists
                                    var typeSplitted = oAnnotation.typePath.split("->");
                                                                    
                                    if (typeSplitted && typeSplitted.length) {
                                        for (var i = 0; i < typeSplitted.length; i++) {
                                            typeSplitted[i] = AEd.Cleanup.trim(typeSplitted[i]);                                             
                                        }                                   
                                
                                        var tmpTypeParentPath = "";
                                        var tmpTypePath = "";                                     
                                      
                                        for (var i = 0; i < typeSplitted.length; i++) {
                                            tmpTypeParentPath = tmpTypePath;
                                            if (i > 0) {
                                                tmpTypePath += "->";
                                            }
                                            tmpTypePath += typeSplitted[i]; 
                                            var tmpType = this.types.getURIByPath(tmpTypePath);
                                            if (tmpType) {
                                          
                                            }
                                            else {
                                                typesToCreate.push({name: typeSplitted[i], ancestorPath: tmpTypeParentPath, ancestor: this.types.generateTypeURI(tmpTypeParentPath)});
                                            }                                              
                                        } 
                                     
                                        oNewAnnotation.typeUri = this.types.generateTypeURI(tmpTypePath);
                                    }  
                                }
                             }

                             if (oAnnotation.wholeDoc) {
                                oNewAnnotation.fragments = new Array();
                             }
                             // nestedAnnotationNoEdit - nested annotation on edit annotation
                             else if (oAnnotation.selectionObject && !oAnnotation.nestedAnnotationNoEdit) {
                                oNewAnnotation.fragments = AEd.Fragments.getFragmentsFromSelection(oAnnotation.selectionObject, true);

                                if (oNewAnnotation.fragments){

                                  for (var i = 0; i < oNewAnnotation.fragments.length; i++){  // Replace special characters

                                      oNewAnnotation.fragments[i].fragmentText = oNewAnnotation.fragments[i].fragmentText ? this.specialHtmlCharacters.replaceSpecialCharacters(oNewAnnotation.fragments[i].fragmentText) : "";
                                  }
                                }
                             }
                             else if (oAnnotation.fragments) {
                                oNewAnnotation.fragments = oAnnotation.fragments;
                             }
                             else if (!oAnnotation.annotationLink) {
                                oNewAnnotation.noAnnotation = true;
                             }
                             
                             if (oNewAnnotation.type == "nestedAnnotation") {                                
                                  oNewAnnotation.name = oAnnotation.name;      
                             }
                             
                             if (oAnnotation.attributes.length) {
                                  oNewAnnotation.attributes = new Array();
  
                                  for (var i = 0; i < oAnnotation.attributes.length; i++) {
                                      var tmpAttribute = {};
                                      
                                      switch(oAnnotation.attributes[i].type) {
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
                                              tmpAttribute.type = oAnnotation.attributes[i].type;
                                              tmpAttribute.name = oAnnotation.attributes[i].name;
                                              tmpAttribute.value = oAnnotation.attributes[i].value ? oAnnotation.attributes[i].value : "";
                                          break;                                               
                                          
                                          case "GeoPoint":
                                              tmpAttribute.type = oAnnotation.attributes[i].type;
                                              tmpAttribute.name = oAnnotation.attributes[i].name;
                                              tmpAttribute.lat  = oAnnotation.attributes[i].lat ? oAnnotation.attributes[i].lat : "";     
                                              tmpAttribute.long = oAnnotation.attributes[i].long ? oAnnotation.attributes[i].long : "";                                      
                                          break;
                                          
                                          case "Entity":
                                              var attr = oAnnotation.attributes[i];
                                              tmpAttribute.type = attr.type;
                                              tmpAttribute.name = attr.name;
                                              tmpAttribute.entityName = attr.entityName ? attr.entityName : "";
                                              tmpAttribute.entityURI = attr.entityURI ? this.specialHtmlCharacters.replaceSpecialCharacters(attr.entityURI) : "";
                                              tmpAttribute.entityType = attr.entityType ? attr.entityType : "";
                                              tmpAttribute.entityIsSelected = attr.entityIsSelected ? attr.entityIsSelected : "";
                                              tmpAttribute.entityImage  = attr.entityImage ? attr.entityImage : "";   
                                              tmpAttribute.entityDescription  = attr.entityDescription ? attr.entityDescription : ""; 
                                          break;
                                          
                                          case "nestedAnnotation":
                                              tmpAttribute = arguments.callee.call(this, oAnnotation.attributes[i], typesToCreate);
                                          break;
                                          
                                          default:
                                          break;                                      
                                      }
                                      
                                      oNewAnnotation.attributes.push(tmpAttribute);
                                  }
                             }
                         }
                    break;                    
                    
                    case "nestedAnnotation":
                         // copies the list of annotations
                         oNewAnnotation.list = new Array();
                         for (var i in oAnnotation.list) {
                             oNewAnnotation.list.push(oAnnotation.list[i]);
                         }
                                                                                            
                         if (oAnnotation.annotationLink) {
                             oNewAnnotation.type       = "annotationLink";
                             oNewAnnotation.tmpId      = oAnnotation.annotationLink;
                             oNewAnnotation.name       = oAnnotation.name;
                         }
                         else {
                             oNewAnnotation.uri           = oAnnotation.uri ? oAnnotation.uri : "";
                             oNewAnnotation.dateTime      = Timestamp.start();
                             oNewAnnotation.authorId      = this.user.id;
                             oNewAnnotation.authorName    = this.user.name; 
                             oNewAnnotation.authorAddress = this.user.email; 
                             oNewAnnotation.resourceUri   = this.resourceUriFromServer;   
                             oNewAnnotation.content       = oAnnotation.content;
                             oNewAnnotation.type          = oAnnotation.type;  // "nestedAnnotation, Annotation"  
                             oNewAnnotation.tmpId      = oAnnotation.suggUiTmpId ? oAnnotation.suggUiTmpId : "";

                             if (!oAnnotation.typePath) {
                                oNewAnnotation.typeUri = "AnyAnnotation";   
                             }
                             else {
                                oNewAnnotation.typeUri       = this.types.getURIByPath(oAnnotation.typePath);
                                if (!oNewAnnotation.typeUri) { // type not exists
                                    var typeSplitted = oAnnotation.typePath.split("->");
                                                                    
                                    if (typeSplitted && typeSplitted.length) {
                                        for (var i = 0; i < typeSplitted.length; i++) {
                                            typeSplitted[i] = AEd.Cleanup.trim(typeSplitted[i]);                                             
                                        }                                   
                                
                                        var tmpTypeParentPath = "";
                                        var tmpTypePath = "";                                     
                                      
                                        for (var i = 0; i < typeSplitted.length; i++) {
                                            tmpTypeParentPath = tmpTypePath;
                                            if (i > 0) {
                                                tmpTypePath += "->";
                                            }
                                            tmpTypePath += typeSplitted[i]; 
                                            var tmpType = this.types.getURIByPath(tmpTypePath);
                                            if (tmpType) {
                                          
                                            }
                                            else {
                                                typesToCreate.push({name: typeSplitted[i], ancestorPath: tmpTypeParentPath, ancestor: this.types.generateTypeURI(tmpTypeParentPath)});
                                            }                                              
                                        } 
                                     
                                        oNewAnnotation.typeUri = this.types.generateTypeURI(tmpTypePath);
                                    }  
                                }
                             }

                             for (var i in oAnnotation.list) {
                                if (oAnnotation.list[i].wholeDoc) {
                                    oNewAnnotation.list[i].fragments = new Array();
                                }
                                // nestedAnnotationNoEdit - nested annotation on edit annotation
                                else if (oAnnotation.list[i].selectionObject && !oAnnotation.nestedAnnotationNoEdit) {
                                    oNewAnnotation.list[i].fragments = AEd.Fragments.getFragmentsFromSelection(oAnnotation.list[i].selectionObject, true);
                                }
                                else if (oAnnotation.list[i].fragments) {
                                    oNewAnnotation.list[i].fragments = oAnnotation.list[i].fragments;
                                }
                                else if (!oAnnotation.list[i].annotationLink) {
                                    oNewAnnotation.list[i].noAnnotation = true;
                                }
                             }
                             
                             // copies the annotation info - every item is annotation
                             for (var i in oNewAnnotation.list) {
                                oNewAnnotation.list[i].uri = oNewAnnotation.uri;
                                oNewAnnotation.list[i].dateTime = oNewAnnotation.dateTime;
                                oNewAnnotation.list[i].authorId = oNewAnnotation.authorId;
                                oNewAnnotation.list[i].authorName = oNewAnnotation.authorName;
                                oNewAnnotation.list[i].authorAddress = oNewAnnotation.authorAddress;
                                oNewAnnotation.list[i].resourceUri = oNewAnnotation.resourceUri;
                                oNewAnnotation.list[i].content = oNewAnnotation.content;
                                oNewAnnotation.list[i].type = oNewAnnotation.type;
                                oNewAnnotation.list[i].typeUri = oNewAnnotation.typeUri;
                                oNewAnnotation.list[i].tmpId = oNewAnnotation.tmpId;
                             }
                             
                             if (oNewAnnotation.type == "nestedAnnotation") {                                
                                  oNewAnnotation.name = oAnnotation.name;      
                             }
                             
                             if (oAnnotation.attributes.length) {
                                  oNewAnnotation.attributes = new Array();
                                  for (var i in oNewAnnotation.list) {
                                    oNewAnnotation.list[i].attributes = new Array();
                                  }
                                  
                                  for (var i = 0; i < oAnnotation.attributes.length; i++) {
                                      var tmpAttribute = {};
                                      
                                      switch(oAnnotation.attributes[i].type) {
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
                                              tmpAttribute.type = oAnnotation.attributes[i].type;
                                              tmpAttribute.name = oAnnotation.attributes[i].name;
                                              tmpAttribute.value = oAnnotation.attributes[i].value;
                                          break;                                               
                                          
                                          case "GeoPoint":
                                              tmpAttribute.type = oAnnotation.attributes[i].type;
                                              tmpAttribute.name = oAnnotation.attributes[i].name;
                                              tmpAttribute.lat  = oAnnotation.attributes[i].lat;     
                                              tmpAttribute.long = oAnnotation.attributes[i].long;                                      
                                          break;

                                          case "Entity":
                                              var attr = oAnnotation.attributes[i];
                                              tmpAttribute.type = attr.type;
                                              tmpAttribute.name = attr.name;
                                              tmpAttribute.entityName = attr.entityName;
                                              tmpAttribute.entityURI = attr.entityURI;
                                              tmpAttribute.entityType = attr.entityType;
                                              tmpAttribute.entityIsSelected = attr.entityIsSelected;
                                              tmpAttribute.entityImage  = attr.entityImage;   
                                              tmpAttribute.entityDescription  = attr.entityDescription; 
                                          break;
                                          
                                          case "nestedAnnotation":
                                              tmpAttribute = arguments.callee.call(this, oAnnotation.attributes[i], typesToCreate);
                                          break;
                                          
                                          default:
                                          break;                                      
                                      }
                                      
                                      oNewAnnotation.attributes.push(tmpAttribute);
                                      
                                      // copies the annotation attributes - every item is annotation
                                      for (var j in oNewAnnotation.list) {
                                         oNewAnnotation.list[j].attributes.push(tmpAttribute);
                                      }
                                  }
                             }
                         } 
                    break;
                                      
                    default:
                    break;               
               }
          }     
                          
          return oNewAnnotation;  
};

// --------------------------------------------------- Editor.getNestedAnnotations
/**
 * Loops through all attributes of a given annotation and for every linked annotation whose value is selected as a suggestion (only!) completes the annotation to be ready for sending to server. Works recursively.
 *
 * @name getNestedAnnotations
 * @memberOf AEd.editors.Editor
 * @function 
 * @param annotation: Parent annotation
 * @returns an array of the completed annotations (does not send it to the server itself!)
 */
AEd.editors.Editor.prototype.getNestedAnnotations = function (annotation)
{
  //loops through all attributes of the annotation -- every attribute whose value is selected as a suggestion needs to be completed manually
  var nestedAnnotations = Array();
  for(var i = 0; i < annotation.attributes.length; i++)
  {
    //get the ith attribute of the given annotation
    var attr = annotation.attributes[i];

    //only attributes whose values are selected as suggestions pass this condition
    if(((attr.annotationLink && this.suggestions.getSuggestionByTmpId(attr.annotationLink)) || attr.tmpId || (attr.selection && attr.selection.match(/[a-zA-Z0-9-]+: .+/g))) && (attr.type == "nestedAnnotation" || attr.type == "annotationLink"))
    {
      //completes the annotation object as if it would be an annotation before
      var processedAnnot = this.completeAnnotation(attr);
      
      if(!processedAnnot)
          continue;
      
      //adds other properties
      processedAnnot.tmpId = attr.annotationLink || attr.tmpId;
      processedAnnot.confirmed = "automatically";
      processedAnnot.dateTime = Timestamp.start();
      processedAnnot.authorId = this.user.id;
      processedAnnot.authorName = this.user.name; 
      processedAnnot.authorAddress = this.user.email; 
      processedAnnot.resourceUri = this.resourceUriFromServer;
      processedAnnot.typeUri = this.types.getURIByPath(attr.typePath);
      
      var suggestion = this.suggestions.getSuggestionByTmpId(processedAnnot.tmpId);
      processedAnnot.fragments = suggestion.fragments;
      
      //if there are any attributes
      if(attr.attributes && attr.attributes.length > 0)
      {
        //for simple attributes it is enough to just copy them from attr -- structured will be handled later
        processedAnnot.attributes = attr.attributes;


        for (var y = 0; y < attr.attributes.length; y++){

          if (attr.attributes[y].list && attr.attributes[y].list.length > 1){

           for (var x = 0; x < attr.attributes[y].list.length; x++){


               if (!attr.attributes[y].list[x].authorId && !processedAnnot.attributes[y].list[x].tmpId && !processedAnnot.attributes[y].list[x].annotationLink){

                  processedAnnot.attributes[y].list[x].tmpId = attr.attributes[y].list[x].suggUiTmpId;
                  processedAnnot.attributes[y].list[x].dateTime = Timestamp.start();
                  processedAnnot.attributes[y].list[x].authorId = this.user.id;
                  processedAnnot.attributes[y].list[x].authorName = this.user.name; 
                  processedAnnot.attributes[y].list[x].authorAddress = this.user.email; 
                  processedAnnot.attributes[y].list[x].resourceUri = this.resourceUriFromServer;
                  processedAnnot.attributes[y].list[x].typeUri = this.types.getURIByPath(processedAnnot.attributes[y].typePath);                  
                  attr.attributes[y].list.processed = true;
               }
           }
          }
        }
        
        //get nested suggestions (transformed to annotations)
        var children = this.getNestedAnnotations(attr);
        //concatenate them with the others
        nestedAnnotations = nestedAnnotations.concat(children);
        
        //loops through all attributes of the ith attribute
        for(var j = 0; j < attr.attributes.length; j++)
        {
          //get the jth attribute
          var sugg = attr.attributes[j];
          //if it is of type nestedAnnotation then we need to modify it
          if(sugg.type == "nestedAnnotation" && (sugg.annotationLink || sugg.tmpId))
          {
            var tmpId = sugg.annotationLink || sugg.tmpId;
            
            //modify the attribute
            processedAnnot.attributes[j] =
            {
              name: sugg.name,
              type: "annotationLink",
              tmpId: tmpId,
              list:
              [{
                  annotationLink: tmpId,
                  selection: this.suggestions.getSuggestionByTmpId(tmpId).selection,
                  selectionObject: sugg.selectionObject,
                  wholeDoc: sugg.wholeDoc
              }]
            }
          }

          else if (sugg.type == "nestedAnnotation" && sugg.suggUiTmpId){

            processedAnnot.attributes[j].tmpId = sugg.suggUiTmpId;
            processedAnnot.attributes[j].dateTime = Timestamp.start();
            processedAnnot.attributes[j].authorId = this.user.id;
            processedAnnot.attributes[j].authorName = this.user.name; 
            processedAnnot.attributes[j].authorAddress = this.user.email; 
            processedAnnot.attributes[j].resourceUri = this.resourceUriFromServer;
            processedAnnot.attributes[j].typeUri = this.types.getURIByPath(sugg.typePath);
            
          }
        }
      }
      
      //adds the annotation to other nested annotations
      nestedAnnotations.push(processedAnnot);

    }

    else if (attr.type == "nestedAnnotation" && attr.attributes && attr.attributes.length){

        var children = this.getNestedAnnotations(attr);
        //concatenate them with the others
        if (children){

          nestedAnnotations = nestedAnnotations.concat(children);
        }
    }

    if (attr.list && !attr.list.processed && attr.list.length > 0){   // create nested annotations from selected suggestions

        for (var j = 0; j < attr.list.length; j++){

          var sugg = this.suggestions.getSuggestionByTmpId(attr.list[j].annotationLink || attr.list[j].tmpId);

          if (sugg && sugg.tmpId != (attr.annotationLink || attr.tmpId) || ((attr.tmpId || (attr.selection && attr.selection.match(/[a-zA-Z0-9-]+: .+/g))) && sugg && sugg.tmpId != (attr.annotationLink || attr.tmpId))){  // Suggestions filter

            sugg.confirmed = "automatically";
            sugg.dateTime = Timestamp.start();
            sugg.authorId = this.user.id;
            sugg.authorName = this.user.name; 
            sugg.authorAddress = this.user.email; 
            sugg.resourceUri = this.resourceUriFromServer;
          
            nestedAnnotations.push(sugg);
          }
        }
    }
  }
  
  return nestedAnnotations;
}



// --------------------------------------------------- Editor.sendAddAnnotation
/**
 * Creates annotations message and sends it to server
 *
 * @name sendAddAnnotation
 * @memberOf AEd.editors.Editor
 * @function     
 */
AEd.editors.Editor.prototype.sendAddAnnotation = function() {

      //GUI message
      var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Annotations"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg); 

      var typesToCreate = new Array();
      var oAnnotation = this.gui.dlgAnnotate.getAnnotation();

      var oProcessedAnnotation = this.completeAnnotation(oAnnotation, typesToCreate);      
      //get and complete all nested annotations selected as suggestions

      var nestedAnnotations = this.getNestedAnnotations(oAnnotation);
      //append parent annotation
      nestedAnnotations.push(oProcessedAnnotation);
    
      var oMsgTypes = {
          msgtype : "types",
          add: typesToCreate
      }
            
      var oMsgAnnotations = {
          msgtype : "annotations",
          add: nestedAnnotations
      }

      var node = this.gui.dlgAnnotate.treeNodeAnnotation;

      this.gui.dlgAnnotate.reset();   

      var onSuccess = function(oResponse) {

          this.onAnnotationsResponse(oResponse, msg);
          this.addAttributes(node);
      }
      
      var onFailure = function(oResponse) {

          msg.setIcon("error");
          msg.setTitle(AEd.I18n.t("Error"));
          msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Annotations"));                                             
          msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
      };         
      
      var handlers = {
          onSuccess: onSuccess,
          onFailure: onFailure,
          scope: this
      }
      
      this.comm.sendPostRequest([oMsgTypes, oMsgAnnotations], handlers);     
}




// ------------------------------------------------ Editor.sendChangeAnnotation
/**
 * Creates annotations message and sends it to server
 *
 * @name sendChangeAnnotation
 * @memberOf AEd.editors.Editor
 * @function     
 */
AEd.editors.Editor.prototype.sendChangeAnnotation = function() {

      //GUI message
      var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Annotations"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg); 

      //typesToCreate
      var typesToCreate = new Array();
      //get the annotation that changed
      var oAnnotation = this.gui.dlgAnnotate.getAnnotation();
      
      //get and complete all nested annotations selected as suggestions
      var nestedAnnotations = this.getNestedAnnotations(oAnnotation);
      
      var oProcessedAnnotation = this.completeAnnotation(oAnnotation, typesToCreate);
     
      var oMsgTypes = {
          msgtype : "types",
          add: typesToCreate
      }
      
      var oMsgAnnotations = {
          msgtype : "annotations",
          add: nestedAnnotations,
          change: [oProcessedAnnotation]
      }
      
      var node = this.gui.dlgAnnotate.treeNodeAnnotation;
      
      this.gui.dlgAnnotate.reset();

      var onSuccess = function(oResponse) {
          this.onAnnotationsResponse(oResponse, msg);
          this.addAttributes(node);
      };
      
      var onFailure = function(oResponse) {
          msg.setIcon("error");
          msg.setTitle(AEd.I18n.t("Error"));
          msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Annotations"));                                             
          msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
      };

      this.comm.sendPostRequest([oMsgTypes, oMsgAnnotations], {onSuccess: onSuccess, onFailure: onFailure, scope: this });     
} 



// ------------------------------------------------------ Editor.editAnnotation
/**
 * User wants to edit annotation
 *
 * @name editAnnotation
 * @memberOf AEd.editors.Editor
 * @function     
 * @param {AEd.entities.Annotation or AEd.entities.Suggestion} annotation Annotation or suggestion to edit.
 * @param (Boolean) editSuggestion True/false if editing suggestion.
 * @param (Object) oSuggestedAnnotationItem SuggestedAnnotation dialog item.   
 */
AEd.editors.Editor.prototype.editAnnotation = function(annotation, editSuggestion, oSuggestedAnnotationItem) {

    var unknownAttribute = false;
    var checkAttributes = function(annotation) {
        for (var i in annotation.attributes) {
            switch (annotation.attributes[i].type) {
                case "Integer":
                case "String":
                case "Time":
                case "Date":
                case "DateTime":
                case "Boolean":
                case "URI":
                case "Image":
                case "Duration":
                case "Binary":
                case "Text":
                case "GeoPoint":
                case "Entity":
                break;
                case "annotationLink":
                     if (!annotation.attributes[i].annoTypePath){

                        annotation.attributes[i].annoTypePath = this.types.getPathByURI(this.annotations.getAnnotationByURI(annotation.attributes[i].value).typeUri);
                     }
                break;    
                case "nestedAnnotation":
                    checkAttributes(annotation.attributes[i]);
                break;
                case "AnyAnnotation":
                break;
                default:
                    var regExp = /^http\:\/\//;
                    if (!annotation.attributes[i].type.match(regExp)) {
                        unknownAttribute = true;
                        break;
                    }
                break;
            }
        }
    }

    checkAttributes.call(this, annotation);
    if (unknownAttribute) {
        this.gui.showMessage(AEd.I18n.t("Edit_annotation_not_possible"), AEd.I18n.t("Annotation_contains_unknown_attributes"), "warning");
        return;
    }

    if (this.gui.dlgAnnotate.isHidden) {
        this.gui.dlgAnnotate.show();
        this.gui.toolbars.btnAnnotate.setSelected(true);
    }
    this.gui.dlgAnnotate.loadAnnotation(annotation, this.types, false, true, true);
    
    if (editSuggestion) {
        this.gui.dlgAnnotate.modeEditSuggestion = true;
        this.gui.dlgAnnotate.modeEditSuggestionTmpId = annotation.tmpId;
        this.gui.dlgAnnotate.modeEditSuggestionSuggestedAnnotationItem = oSuggestedAnnotationItem;
    }   
} 



// ------------------------------------------------ Editor.sendRemoveAnnotation
/**
 * User wants to delete annotation
 *
 * @name sendRemoveAnnotation
 * @memberOf AEd.editors.Editor
 * @function     
 * @param {AEd.entities.Annotation} annotation Annotation to delete.  
 */
AEd.editors.Editor.prototype.sendRemoveAnnotation = function(annotation) {
   
      var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Annotations"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg); 

      var oAnnotation = {
        uri: annotation.uri,  
        typeUri: annotation.typeUri,  
        dateTime: Timestamp.start(),
        authorId: this.user.id,
        authorName: this.user.name,      
        authorAddress: this.user.email,  
        resourceUri: this.resourceUriFromServer,
        fragments: annotation.fragments,
        content: annotation.content,
        attributes: annotation.attributes
  
      }

      if (oAnnotation.attributes){  // Replace special uri characters 

         for (var i = 0; i < oAnnotation.attributes.length; i++){

             if (oAnnotation.attributes[i].type == "Entity" && oAnnotation.attributes[i].entityURI){

                oAnnotation.attributes[i].entityURI = this.specialHtmlCharacters.replaceSpecialCharacters(oAnnotation.attributes[i].entityURI);
             }
         }
      }

      var oMsgAnnotations = {
          msgtype : "annotations",
          remove: [oAnnotation]
      }

      var onSuccess = function(oResponse) { this.onAnnotationsResponse(oResponse, msg); };
      var onFailure = function(oResponse) { msg.setIcon("error");
                                            msg.setTitle(AEd.I18n.t("Error"));
                                            msg.setSubtitle(AEd.I18n.t("Sending_message")+ " " + AEd.I18n.t("Annotations"));                                             
                                            msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                          };

      this.comm.sendPostRequest([oMsgAnnotations], {onSuccess: onSuccess, onFailure: onFailure, scope: this });        
} 


// ---------------------------------------------------- Editor.reloadAnnotation
/**
 * This method is called when error message contains RELOAD parameter
 *
 * @name reloadAnnotation
 * @memberOf AEd.editors.Editor
 * @function     
 * @param {String} annotationUri Annotation URI to reload  
 */
AEd.editors.Editor.prototype.reloadAnnotation = function(annotationUri) {
    // nothing to do - all annotations in editor are created after receiving
    // annotations message from server - so in case of error - no annotation
    // had been created before    
} 

// ---------------------------------------------------- Editor.reloadAllAnnotations
/**
 * Sends reload all message to server
 *
 * @name reloadAllAnnotations
 * @memberOf AEd.editors.Editor
 * @function     
 */
AEd.editors.Editor.prototype.reloadAllAnnotations = function() {
      
      this.annotations.destroyAll();   // Prevents annotations multiplication

      var msg = new AEd.ui.Message({title: AEd.I18n.t("Sending_message") + " " + AEd.I18n.t("Reload"), subtitle: AEd.I18n.t("Please_wait"), icon: "loading"}); 
      this.gui.dlgStatusBar.add(msg); 


      var oMsgReload = {msgtype: "reload", all: true};   // Reload all annotations

      var onSuccess = function(oResponse) { oResponse.countAnnotsForQuickSuggestions = true; 
                                           this.onReloadAllResponse(oResponse, msg);  
                                          };
      var onFailure = function(oResponse) { msg.setIcon("error");
                                            msg.setTitle(AEd.I18n.t("Reload_error"));
                                            msg.setSubtitle(AEd.I18n.t("See_msg_details_for_more_information"));                                             
                                            msg.setContent(AEd.XML.escapeXmlString(oResponse.data));
                                          };

      this.comm.sendPostRequest([oMsgReload], {onSuccess: onSuccess, onFailure: onFailure, scope: this });
   
} 


// ****************************************************************************
// RESPONSES
// ****************************************************************************



// --------------------------------------------------- Editor.onConnectResponse
/**
 * Handler response to server msg
 * @example
 * oResponse {
 *    status : oXHR.status,
 *    contentType : oXHR.getResponseHeader("Content-Type"),
 *    data : oXHR.responseText,
 *    xmlData : oXHR.responseXML,
 *    request : oRequest                                  
 *  }  
 *
 * @name onConnectResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onConnectResponse = function(oResponse, msg) {
      if (oResponse) {
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
         
         for (var i = 0; i < aMsgs.length; i++) {          
            switch(aMsgs[i].msgtype) {
               case "connected": this.onMsgConnected(aMsgs[i], msg);
                                 clearTimeout(this.unsuccessfulConnectionTimeout); // Successful connection - clear timeout for unsuccessful connection
               break;              
               case "logged":    this.onMsgLogged(aMsgs[i]);                  
               break;                  
               case "settings":  this.onMsgSettings(aMsgs[i]); 
               break;                
               case "error":     this.onMsgError(aMsgs[i], msg);
                                 this.controlConnection(this, aMsgs[i].message, true);     
               break;    
               case "warning":   this.onMsgWarning(aMsgs[i], msg);           
               break;   
               // unknown message                                                                                                                           
               default:          this.onMsgUnknown(aMsgs[i], msg);              
               break;                  
            }
         } // for
         
         if (this.isConnected && this.user.isLogged) {

             this.gui.toolbar.setTag("lastStateOfIsHidden", this.gui.toolbar.isHidden);  // Prevent toolbar displaying during connection errors
             this.gui.toolbar.show();
             this.comm.setCometEnabled(true);
             this.comm.sendGetRequest();
             
             this.gui.setState("LOGGED");
             
             // reset dialog, others are reseted on closing
             this.gui.dlgSuggestAnnotations.reset();
             
             this.gui.toolbar.setSelected(true);
             this.gui.advancedToolbar.setSelected(true);
             
             this.queryTypes();  
             this.queryAttrFromOnto({queryAttrFromOnto : true, userGroup: "*"});                     
             this.queryPersons({withGroups: true});
             this.queryGroups({withPersons: true});             
             this.synchronize();
             
             this.simpleTypes = this.types.getSimpleTypes().childTreeNodes;

         }
         else {
             var msgError = new AEd.ui.Message({icon: "error"}); 
             msgError.setTitle(AEd.I18n.t("Connection_error"));
             msgError.setSubtitle(AEd.I18n.t("Please_reconnect"));
             msgError.setContent(""); 
             this.gui.dlgStatusBar.add(msgError);
                      
             if (this.isConnected)
                 this.disconnect(false, null, null);
         }                 
      }
} 



// ------------------------------------------------ Editor.onDisconnectResponse
/**
 * Handler response to server msg
 *
 * @name onDisconnectResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.
 * @param {Boolean} destroy True if editor should be destroyed after disconnect.  	
 * @param {Object} t Object with all editor instances.
 * @param {Object} id ID of Editor instance to be destroyed.   	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onDisconnectResponse = function(oResponse, destroy, t, id, msg) {
    
    // Sometimes Internet Explorer has (t == null) even when onDisconnectResponse should not be called at all, so the following check will eliminate possible exception.
    if ((AEd.CONFIG.AED_AUTH_TYPE == 1 || destroy) && t) {
        t.onDestroyEditor.fire(t.editors[id]);
        this.gui.destroy();
        delete t.editors[id];
        t.editorsCount--;
        this.unSubscribeFromSettingsOncePerSession = false; // Do not send subscribe/unsubscribe on settings message again
    }
} 



// ------------------------------------------------ Editor.onQueryPersonsResponse
/**
 * Handler response to server msg
 *
 * @name onQueryPersonsResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onQueryPersonsResponse = function(oResponse, msg) {
      if (oResponse) {
         var isQueryPersonsForLoggedUser = oResponse.isQueryPersonsForLoggedUser || false;
         var isQueryPersonsForSearching  = oResponse.isQueryPersonsForSearching || false;         
         var dialog = oResponse.dialog;    
         var isQueryPersonsForSuggestions = oResponse.isQueryPersonsForSuggestions;
         var isQueryPersonsForDefaultSubscriptions = oResponse.isQueryPersonsForDefaultSubscriptions;
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
         
         for (var i = 0; i < aMsgs.length; i++) {
            aMsgs[i].isQueryPersonsForLoggedUser = isQueryPersonsForLoggedUser;
            aMsgs[i].isQueryPersonsForSearching  = isQueryPersonsForSearching; 
            aMsgs[i].isQueryPersonsForSuggestions = isQueryPersonsForSuggestions;
            aMsgs[i].isQueryPersonsForDefaultSubscriptions = isQueryPersonsForDefaultSubscriptions;
            aMsgs[i].dialog = dialog;    
            
            switch(aMsgs[i].msgtype) {
               case "persons":   this.onMsgPersons(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message
               break;                            
               case "error":     this.onMsgError(aMsgs[i], msg); 
                                 msg = null; // null msg to be used only for 1 message
               break;    
               case "warning":   this.onMsgWarning(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message
               break;   
               // unknown message                                                                                                                           
               default:          this.onMsgUnknown(aMsgs[i], msg); 
                                 msg = null; // null msg to be used only for 1 message
               break;                 
            }
         } // for                    
      }
} 



// ----------------------------------------------- Editor.onQueryGroupsResponse
/**
 * Handler response to server msg
 *
 * @name onQueryGroupsResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onQueryGroupsResponse = function(oResponse, msg) {
      if (oResponse) {
         var isQueryGroupsForSearching  = oResponse.isQueryGroupsForSearching || false;         
         var isQueryGroupsForSuggestions = oResponse.isQueryGroupsForSuggestions;
         var dialog = oResponse.dialog; 
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
         
         for (var i = 0; i < aMsgs.length; i++) {
            aMsgs[i].isQueryGroupsForSearching = isQueryGroupsForSearching;    
            aMsgs[i].isQueryGroupsForSuggestions = isQueryGroupsForSuggestions;   
            aMsgs[i].dialog = dialog;      
            switch(aMsgs[i].msgtype) {
               case "userGroups":   this.onMsgGroups(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message
               break;                            
               case "error":     this.onMsgError(aMsgs[i], msg); 
                                 msg = null; // null msg to be used only for 1 message
               break;    
               case "warning":   this.onMsgWarning(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message
               break;   
               // unknown message                                                                                                                           
               default:          this.onMsgUnknown(aMsgs[i], msg); 
                                 msg = null; // null msg to be used only for 1 message
               break;                 
            }
         } // for                    
      }
} 


// ------------------------------------------------- Editor.onJoinGroupResponse
/**
 * Handler response to server msg
 *
 * @name onJoinGroupResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onJoinGroupResponse = function(oResponse, msg) {
      if (oResponse) {   
         var uiGroup  = oResponse.uiGroup || null;
         
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);          
         for (var i = 0; i < aMsgs.length; i++) {   
            aMsgs[i].uiGroup = uiGroup;       
                   
            switch(aMsgs[i].msgtype) {
               case "ok":        
                      uiGroup.btnJoin.setDisabled(true);
                      uiGroup.btnLeave.setDisabled(false);
                      uiGroup.addPerson(this.user);
                      uiGroup.addClass(AEd.CONFIG.CLASS_UI_MSG_GROUP_JOINED);
                      
                      // Refresh DlgPersons
                      var filterText = this.gui.dlgPersons.getInputSearchValue();
                      var params = {};
                      params.withGroups = true;
                      params.isQueryPersonsForSearching = true;
                      if (filterText) {
                          params.filter = filterText;
                      }
                      else {
                          params.filter = "";
                      }
                      this.queryPersons(params);                          
                      
                      if (!aMsgs[i].message) {
                          aMsgs[i].message = AEd.I18n.t("Join_Group"); 
                      }               
                      this.onMsgOk(aMsgs[i], msg);
                      this.queryTypes({isQueryTypesForUserGroupSwitching: true});

                      // Subscribe to an annotation taking

                      this.gui.dlgSubscriptions.addSubscribed("", "*", oResponse.uiGroup.assignedGroup.uri);
                      this.gui.dlgSubscriptions.btnSave.onClick.fire();
                      msg = null; // null msg to be used only for 1 message
               break;                            
               case "error":     this.onMsgError(aMsgs[i], msg); 
                                 this.gui.showMessage(AEd.I18n.t("Dlg_groups_title"), aMsgs[i].message, "error");
                                 msg = null; // null msg to be used only for 1 message
               break;    
               case "warning":   this.onMsgWarning(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message
               break;   
               // unknown message                                                                                                                           
               default:          this.onMsgUnknown(aMsgs[i], msg); 
                                 msg = null; // null msg to be used only for 1 message
               break;                 
            }
         } // for                    
      }
} 



// ------------------------------------------------ Editor.onLeaveGroupResponse
/**
 * Handler response to server msg
 *
 * @name onLeaveGroupResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onLeaveGroupResponse = function(oResponse, msg) {
      if (oResponse) {   
         var uiGroup  = oResponse.uiGroup || null;
         
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);          
         for (var i = 0; i < aMsgs.length; i++) {   
            aMsgs[i].uiGroup = uiGroup;       
                   
            switch(aMsgs[i].msgtype) {
               case "ok":        
                      uiGroup.btnJoin.setDisabled(false);
                      uiGroup.btnLeave.setDisabled(true);
                      uiGroup.removePerson(this.user);
                      uiGroup.removeClass(AEd.CONFIG.CLASS_UI_MSG_GROUP_JOINED); 

                      // Refresh DlgPersons
                      var filterText = this.gui.dlgPersons.getInputSearchValue();
                      var params = {};
                      params.withGroups = true;
                      params.isQueryPersonsForSearching = true;
                      if (filterText) {
                          params.filter = filterText;
                      }
                      else {
                          params.filter = "";
                      }
                      this.queryPersons(params);                        
                      
                      if (!aMsgs[i].message) {
                          aMsgs[i].message = AEd.I18n.t("Leave_Group"); 
                      }               
                      this.onMsgOk(aMsgs[i], msg);
                      this.queryTypes({isQueryTypesForUserGroupSwitching: true});

                      // Unsubscribe from an annotation taking

                      this.gui.dlgSubscriptions.addUnsubscribed("", "*", oResponse.uiGroup.assignedGroup.uri);
                      this.gui.dlgSubscriptions.btnSave.onClick.fire();
                      msg = null; // null msg to be used only for 1 message
               break;                            
               case "error":     this.onMsgError(aMsgs[i], msg); 
                                 this.gui.showMessage(AEd.I18n.t("Dlg_groups_title"), aMsgs[i].message, "error");
                                 msg = null; // null msg to be used only for 1 message
               break;    
               case "warning":   this.onMsgWarning(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message
               break;   
               // unknown message                                                                                                                           
               default:          this.onMsgUnknown(aMsgs[i], msg); 
                                 msg = null; // null msg to be used only for 1 message
               break;                 
            }
         } // for                    
      }
} 



// ----------------------------------------------- Editor.onQueryTypesResponse
/**
 * Handler response to server msg
 *
 * @name onQueryTypesResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onQueryTypesResponse = function(oResponse, msg) {     
      if (oResponse) {
         var isQueryTypesForSuggestions  = oResponse.isQueryTypesForSuggestions || false;
         var isQueryTypesForUserGroupSwitching  = oResponse.isQueryTypesForUserGroupSwitching || false;        
         var typeOfAttribute = oResponse.typeOfAttribute;
         var dialog = oResponse.dialog;
         var filter = oResponse.filter;
      
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
          
         for (var i = 0; i < aMsgs.length; i++) {
    
            aMsgs[i].isQueryTypesForSuggestions = isQueryTypesForSuggestions;
            aMsgs[i].isQueryTypesForUserGroupSwitching = isQueryTypesForUserGroupSwitching;
            aMsgs[i].typeOfAttribute = typeOfAttribute;
            aMsgs[i].dialog = dialog;           
            aMsgs[i].filter = filter;
            
            switch(aMsgs[i].msgtype) {
               case "types":     this.onMsgTypes(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message
               break;                            
               case "error":     this.onMsgError(aMsgs[i], msg); 
                                 msg = null; // null msg to be used only for 1 message
               break;    
               case "warning":   this.onMsgWarning(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message
               break;   
               // unknown message                                                                                                                           
               default:          this.onMsgUnknown(aMsgs[i], msg); 
                                 msg = null; // null msg to be used only for 1 message
               break;                 
            }
         } // for                 
      }
} 


// ----------------------------------------------- Editor.onQueryAttrFromOntoResponse
/**
 * Handler response to server msg
 *
 * @name onQueryAttrFromOntoResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onQueryAttrFromOntoResponse = function(oResponse, msg) {     
      if (oResponse) {      
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
          
         for (var i = 0; i < aMsgs.length; i++) {
                
            switch(aMsgs[i].msgtype) {
               case "attrsFromOntology":     this.onMsgAttrsFromOntology(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message
               break;                            
               case "error":     this.onMsgError(aMsgs[i], msg); 
                                 msg = null; // null msg to be used only for 1 message
               break;    
               case "warning":   this.onMsgWarning(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message
               break; 
               case "ok":
                                 this.onMsgOk(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message                                  
               break;  
               // unknown message                                                                                                                           
               default:          this.onMsgUnknown(aMsgs[i], msg); 
                                 msg = null; // null msg to be used only for 1 message
               break;                 
            }
         } // for                 
      }
}


// ------------------------------------------------ Editor.onSynchronizeResponse
/**
 * Handler response to server msg
 *
 * @name onSynchronizeResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onSynchronizeResponse = function(oResponse, msg) {
      if (oResponse) {
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
         
         for (var i = 0; i < aMsgs.length; i++) {          
            switch(aMsgs[i].msgtype) {
               case "synchronized": this.onMsgSynchronized(aMsgs[i], msg); 
                                    msg = null; // null msg to be used only for 1 message
                                 
                                    // Turn on quick suggestions if there is a few annotations
                                    var goodAnnotations = 0;

                                    for (var j = 0; j < aMsgs.length; j++) {                                  
                                    
                                      if (aMsgs[j].msgtype == "annotations"){

                                          for (var k = 0; k < aMsgs[j].add.length; k++){

                                               if ((!aMsgs[j].add[k].badAnnotation || !aMsgs[j].add[k].badFragment) && this.types.getTypeByURI(aMsgs[j].add[k].typeUri)){  // Do not count bad annotations and annotations with unknown types
                                                   goodAnnotations++;
                                               }
                                          }
                                      }
                                    }

                                    if (goodAnnotations < (this.wysiwyg.getContent().length / AEd.CONFIG.AUTO_QUICK_SUGG_LETTERS_TO_ONE_SUGG)) {

                                       this.gui.toolbars.btnQuickSuggestions.setSelected(true);
                                       this.quickSuggestions();
                                    } 
                                    else {

                                       this.gui.toolbars.btnQuickSuggestions.setSelected(false);
                                    }
                                    this.wysiwyg.setContent(this.wysiwyg.getOrigDocContent());  // To prevent bad xpaths when user changes document before running AEd                                              
               break;    
               case "annotations":  this.onMsgAnnotations(aMsgs[i]);                                                          
               break;                                         
               case "error":        this.onMsgError(aMsgs[i], msg); 
                                    msg = null; // null msg to be used only for 1 message

                                    if (aMsgs[i].number == "9" || aMsgs[i].number == "10" ||
                                    aMsgs[i].number == "11" || aMsgs[i].number == "22" ||
                                    aMsgs[i].number == "23" || aMsgs[i].number == "43") {
                                        this.gui.dlgSynchronize.disableUpdateFromServer();
                                        this.gui.dlgSynchronize.setInputValue("");
                                        this.gui.dlgSynchronize.show();
                                    }
                                    else if (aMsgs[i].number == "62") {
                                        this.gui.dlgSynchronize.enableUpdateFromServer();
                                        this.gui.dlgSynchronize.setInputValue(aMsgs[i].content);
                                        this.gui.dlgSynchronize.show();
                                    }
               break;    
               case "warning":      this.onMsgWarning(aMsgs[i], msg);
                                    msg = null; // null msg to be used only for 1 message
               break;   
               // unknown message                                                                                                                           
               default:             this.onMsgUnknown(aMsgs[i], msg);
                                    msg = null; // null msg to be used only for 1 message
               break;                  
            }
         } // for                    
      }
    
} 



// --------------------------------------------- Editor.onResynchronizeResponse
/**
 * Handler response to server msg
 *
 * @name onResynchronizeResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onResynchronizeResponse = function(oResponse, msg) {
      if (oResponse) {
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
         
         for (var i = 0; i < aMsgs.length; i++) {          
            switch(aMsgs[i].msgtype) {
               case "annotations":  this.onMsgAnnotations(aMsgs[i]);                        
               break;   
               case "ok": 
                      if (!aMsgs[i].message) {
                          aMsgs[i].message = AEd.I18n.t("Resynchronize"); 
                      }
                      this.onMsgOk(aMsgs[i], msg);
                      msg = null; // null msg to be used only for 1 message

                      // Turn on quick suggestions if there is a few annotations
                      var goodAnnotations = 0;

                      for (var j = 0; j < aMsgs.length; j++) {                                  
                                    
                          if (aMsgs[j].msgtype == "annotations"){

                             for (var k = 0; k < aMsgs[j].add.length; k++){

                                 if ((!aMsgs[j].add[k].badAnnotation || !aMsgs[j].add[k].badFragment) && this.types.getTypeByURI(aMsgs[j].add[k].typeUri)){  // Do not count bad annotations and annotations with unknown types
                                    goodAnnotations++;
                                 }
                             }
                          }
                       }

                       if (goodAnnotations < (this.wysiwyg.getContent().length / AEd.CONFIG.AUTO_QUICK_SUGG_LETTERS_TO_ONE_SUGG)) {

                          this.gui.toolbars.btnQuickSuggestions.setSelected(true);
                          this.quickSuggestions();
                       } 
                       else {

                          this.gui.toolbars.btnQuickSuggestions.setSelected(false);
                       } 

               break;                                                       
               case "error":        this.onMsgError(aMsgs[i], msg); 
                                    msg = null; // null msg to be used only for 1 message
                                    
                                    if (aMsgs[i].number == "9" || aMsgs[i].number == "10" ||
                                    aMsgs[i].number == "11" || aMsgs[i].number == "22" ||
                                    aMsgs[i].number == "23" || aMsgs[i].number == "43") {
                                        this.gui.dlgSynchronize.disableUpdateFromServer();
                                        this.gui.dlgSynchronize.setInputValue("");
                                        this.gui.dlgSynchronize.show();
                                    }
                                    else if (aMsgs[i].number == "62") {
                                        this.gui.dlgSynchronize.enableUpdateFromServer();
                                        this.gui.dlgSynchronize.setInputValue(aMsgs[i].content);
                                        this.gui.dlgSynchronize.show();
                                    }
               break;    
               case "warning":      this.onMsgWarning(aMsgs[i], msg);
                                    msg = null; // null msg to be used only for 1 message
               break;   
               // unknown message                                                                                                                           
               default:             this.onMsgUnknown(aMsgs[i], msg);
                                    msg = null; // null msg to be used only for 1 message
               break;                  
            }
         } // for                    
      }
    
} 



// -------------------------------------------------- Editor.onSettingsResponse
/**
 * Handler response to server msg
 *
 * @name onSettingsResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onSettingsResponse = function(oResponse, msg) {
      if (oResponse) {
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
         
         for (var i = 0; i < aMsgs.length; i++) {          
            switch(aMsgs[i].msgtype) {
               case "settings":     this.onMsgSettings(aMsgs[i], msg); 
                                    msg = null; // null msg to be used only for 1 message
               break;                                            
               case "error":        this.onMsgError(aMsgs[i], msg); 
                                    msg = null; // null msg to be used only for 1 message
               break;    
               case "warning":      this.onMsgWarning(aMsgs[i], msg);
                                    msg = null; // null msg to be used only for 1 message
               break;   
               // unknown message                                                                                                                           
               default:             this.onMsgUnknown(aMsgs[i], msg);
                                    msg = null; // null msg to be used only for 1 message
               break;                  
            }
         } // for                    
      }
    
} 



// ------------------------------------------------- Editor.onSubscribeResponse
/**
 * Handler response to server msg
 *
 * @name onSubscribeResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onSubscribeResponse = function(oResponse, msg) {
      if (oResponse) {
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
         
         for (var i = 0; i < aMsgs.length; i++) {          
            switch(aMsgs[i].msgtype) {
               case "ok": 
                      if (!aMsgs[i].message) {
                          aMsgs[i].message = AEd.I18n.t("Subscribe"); 
                      }
                      this.onMsgOk(aMsgs[i], msg);
                      msg = null; // null msg to be used only for 1 message
               break;                                                           
               case "error":        this.onMsgError(aMsgs[i], msg); 
                                    msg = null; // null msg to be used only for 1 message
               break;    
               case "warning":      this.onMsgWarning(aMsgs[i], msg);
                                    msg = null; // null msg to be used only for 1 message
               break;   
               // unknown message                                                                                                                           
               default:             this.onMsgUnknown(aMsgs[i], msg);
                                    msg = null; // null msg to be used only for 1 message
               break;                  
            }
         } // for                    
      }
    
} 



// ----------------------------------------------- Editor.onUnsubscribeResponse
/**
 * Handler response to server msg
 *
 * @name onUnsubscribeResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onUnsubscribeResponse = function(oResponse, msg) {
      if (oResponse) {
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
         
         for (var i = 0; i < aMsgs.length; i++) {          
            switch(aMsgs[i].msgtype) {
               case "ok": 
                      if (!aMsgs[i].message) {
                          aMsgs[i].message = AEd.I18n.t("Unsubscribe"); 
                      }
                      this.onMsgOk(aMsgs[i], msg);
                      msg = null; // null msg to be used only for 1 message
               break;                                                           
               case "error":        this.onMsgError(aMsgs[i], msg); 
                                    msg = null; // null msg to be used only for 1 message
               break;    
               case "warning":      this.onMsgWarning(aMsgs[i], msg);
                                    msg = null; // null msg to be used only for 1 message
               break;   
               // unknown message                                                                                                                           
               default:             this.onMsgUnknown(aMsgs[i], msg);
                                    msg = null; // null msg to be used only for 1 message
               break;                  
            }
         } // for                    
      }  
} 



// ----------------------------------------------- Editor.onSuggestionResponse
/**
 * Handler response to server msg
 *
 * @name onSuggestionResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onSuggestionResponse = function(oResponse, msg) {
      if (oResponse) {
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);

         for (var i = 0; i < aMsgs.length; i++) {          
            switch(aMsgs[i].msgtype) {
               case "suggestions": this.onMsgSuggestions(aMsgs[i], msg);
                                   msg = null; // null msg to be used only for 1 message
               break;               
               case "ok":
                      // suggestions received from server, we can save dialog and quickSuggestion button
                      this.gui.dlgSuggestAnnotations.saveSuggestDlg();
                      
                      var oSuggestion = this.gui.dlgSuggestAnnotations.getSuggestion();            
                      if (oSuggestion.selectionObject != null || oSuggestion.typePath != "" ||
                          oSuggestion.noSuggestion != false) {
                          this.gui.toolbars.btnQuickSuggestions.setSelected(false);
                      }
                      else if (oSuggestion.selectionObject == null && oSuggestion.typePath == "" &&
                          oSuggestion.noSuggestion == false && oSuggestion.wholeDoc == true) {
                          this.gui.toolbars.btnQuickSuggestions.setSelected(true);             
                      }
                       
                      if (!aMsgs[i].message) {
                          aMsgs[i].message = AEd.I18n.t("Suggestion"); 
                      }
                      this.onMsgOk(aMsgs[i], msg);
                      msg = null; // null msg to be used only for 1 message
               break;                                                           
               case "error":        this.onMsgError(aMsgs[i], msg); 
                                    msg = null; // null msg to be used only for 1 message
               break;    
               case "warning":      this.onMsgWarning(aMsgs[i], msg);
                                    msg = null; // null msg to be used only for 1 message
               break;   
               // unknown message                                                                                                                           
               default:             this.onMsgUnknown(aMsgs[i], msg);
                                    msg = null; // null msg to be used only for 1 message
               break;                  
            }
         } // for                    
      }  
}



// ----------------------------------------------------- Editor.onTypesResponse
/**
 * Handler response to server msg
 *
 * @name onTypesResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onTypesResponse = function(oResponse, msg) {
      if (oResponse) {
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
       
         for (var i = 0; i < aMsgs.length; i++) {          
            switch(aMsgs[i].msgtype) {
               case "types": this.onMsgTypes(aMsgs[i], msg);
                             msg = null; // null msg to be used only for 1 message
               break;  
               case "ok":
                      if (!aMsgs[i].message) {
                          aMsgs[i].message = AEd.I18n.t("Types"); 
                      }
                      this.onMsgOk(aMsgs[i], msg);
                      msg = null; // null msg to be used only for 1 message
               break;                                                       
               case "error":     this.onMsgError(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message       
               break;    
               case "warning":   this.onMsgWarning(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message           
               break;   
               // unknown message                                                                                                                           
               default:          this.onMsgUnknown(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message              
               break;                  
            }
         } // for                    
      }
} 


// ----------------------------------------------- Editor.onReloadAllResponse
/**
 * Handler response to server msg
 *
 * @name onReloadAllResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onReloadAllResponse = function(oResponse, msg) {
      if (oResponse) {
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
         
         var countAnnotsForQuickSuggestions = oResponse.countAnnotsForQuickSuggestions || false;

         for (var i = 0; i < aMsgs.length; i++) { 
       
            switch(aMsgs[i].msgtype) {
               case "annotations": 
                                   aMsgs[i].countAnnotsForQuickSuggestions = countAnnotsForQuickSuggestions;
                                   this.onMsgAnnotations(aMsgs[i], msg);
                                   msg = null; // null msg to be used only for 1 message
               break;  
               case "types":     this.onMsgTypes(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message
               break;                 
               case "ok": 
                      if (!aMsgs[i].message) {
                          aMsgs[i].message = AEd.I18n.t("Annotations"); 
                      }
                      this.onMsgOk(aMsgs[i], msg);
                      msg = null; // null msg to be used only for 1 message
                      this.annotations.destroyAll();   // Unsubscribing of my own annotations
               break;                                                       
               case "error":     this.onMsgError(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message       
               break;    
               case "warning":   this.onMsgWarning(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message           
               break;   
               // unknown message                                                                                                                           
               default:          this.onMsgUnknown(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message              
               break;                  
            }
         } // for                    
      }
}

  
// ----------------------------------------------- Editor.onAnnotationsResponse
/**
 * Handler response to server msg
 *
 * @name onAnnotationsResponse
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oResponse Response object.  	
 * @param {AEd.ui.Message} msg Optional msg to work with.  
 */
AEd.editors.Editor.prototype.onAnnotationsResponse = function(oResponse, msg) {
      if (oResponse) {
         var aMsgs = AEd.Protocol.parseServerMsgFromXml(oResponse.xmlData);
         
         for (var i = 0; i < aMsgs.length; i++) { 
       
            switch(aMsgs[i].msgtype) {
               case "annotations": this.onMsgAnnotations(aMsgs[i], msg);
                                   msg = null; // null msg to be used only for 1 message
               break;  
               case "types":     this.onMsgTypes(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message
               break;                 
               case "ok": 
                      if (!aMsgs[i].message) {
                          aMsgs[i].message = AEd.I18n.t("Annotations"); 
                      }
                      this.onMsgOk(aMsgs[i], msg);
                      msg = null; // null msg to be used only for 1 message
               break;                                                       
               case "error":     this.onMsgError(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message       
               break;    
               case "warning":   this.onMsgWarning(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message           
               break;   
               // unknown message                                                                                                                           
               default:          this.onMsgUnknown(aMsgs[i], msg);
                                 msg = null; // null msg to be used only for 1 message              
               break;                  
            }
         } // for                    
      }
} 



// ****************************************************************************
// MSG HANDLERS
// ****************************************************************************



// ----------------------------------------------------- Editor.onMsgConnected
/**
 * Handler to server msg
 *
 * @name onMsgConnected
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgConnected = function(oMsg, msg) {
    if (oMsg) {
        var m = (msg) ? msg : new AEd.ui.Message(); 
        if (!msg) {
            this.gui.dlgStatusBar.add(m);
        }
               
        m.setIcon("ok");
        m.setTitle(AEd.I18n.t("Connected"));
        m.setSubtitle(AEd.I18n.t("Session_ID") + ": " + oMsg.sessionID);   
        m.setContent(AEd.I18n.t("Server_Protocol_Version") + ": " + oMsg.protocolVersion);
       
        this.isConnected = true;
        this.comm.setSessionId(oMsg.sessionID);  
        this.comm.setServerProtocolVersion(oMsg.protocolVersion);      
    }
} 



// --------------------------------------------------------- Editor.onMsgLogged
/**
 * Handler to server msg
 *
 * @name onMsgLogged
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgLogged = function(oMsg, msg) {
    if (oMsg) {
        this.user.id = oMsg.id;        
        this.user.isLogged = true;
        this.unSubscribeFromSettingsOncePerSession = false;
        
        var params = {};
        params.filter = "id:"+this.user.id;
        params.withGroups = true;
        params.isQueryPersonsForLoggedUser = true;
       
        this.queryPersons(params);
    }
} 



// -------------------------------------------------------- Editor.onMsgPersons
/**
 * Handler to server msg
 *
 * @name onMsgPersons
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgPersons = function(oMsg, msg) {
    
    if (oMsg) {        
         if (oMsg.isQueryPersonsForSuggestions) {            
            if(oMsg.dialog == "dlgSubscriptions"){
                this.gui.dlgSubscriptions.suggestionsUserBar.addNewItemsPersonsWithUris(oMsg.persons)    
            }
         } else if (oMsg.isQueryPersonsForLoggedUser) {
        
            for (var i = 0; i < oMsg.persons.length; i++) {

                if (oMsg.persons[i].id == this.user.id) {  
                    this.user.email = oMsg.persons[i].email;
                    this.user.name = oMsg.persons[i].name;
                    this.user.login = oMsg.persons[i].login;
                    this.user.photoUri = oMsg.persons[i].photoURI; 
                    this.user.groups = new Array();
                    if (oMsg.persons[i].groups && oMsg.persons[i].groups.length) {                             
                        for (var g = 0; g < oMsg.persons[i].groups.length; g++) {
                            this.user.groups.push(oMsg.persons[i].groups[g]);
                        }
                    }
                    else {
                        this.gui.dlgGroups.show();
                        this.gui.showMessage(AEd.I18n.t("Dlg_groups_no_group"), AEd.I18n.t("Dlg_groups_enter_any_group"), "warning");    
                    } 
                }
            }       
                      
        }
        else if (oMsg.isQueryPersonsForDefaultSubscriptions){  // Initial default subscritpions        

            this.gui.dlgSubscriptions.addSubscribed(this.user.id + " (" + this.user.login + ")", "*", "");  // All from me and my groups

            for (var i = 0; i < oMsg.persons.length; i++){

               if (oMsg.persons[i].groups) {   
                         
                 for (var g = 0; g < oMsg.persons[i].groups.length; g++) {

                     this.gui.dlgSubscriptions.addSubscribed("", "*", oMsg.persons[i].groups[g].uri + " (" + oMsg.persons[i].groups[g].name + ")"); 
                 }
               }

            }

            this.unSubscribeFromSettingsOncePerSession = true; // Do not send subscribe/unsubscribe on settings message again

            var newSubscriptions = this.gui.dlgSubscriptions.getSubscriptions(true); 
 
            this.subscriptions.setSubscriptions(newSubscriptions);
        
            var aUnsubscribe = this.gui.dlgSubscriptions.getSubscriptionsToUnsubscribe();
            var aSubscribe = this.gui.dlgSubscriptions.getSubscriptionsToSubscribe();
            var aDelete = this.gui.dlgSubscriptions.getSubscriptionsToDelete();    

            if (aDelete && aDelete.length) {

            for (var i = 0; i < aDelete.length; i++){  

              if (aDelete[i].origin == "unsubscribed"){  // unsubscribed -> unsubscribe() = deleted

                 var tmpArr = new Array();
                 tmpArr.push(aDelete[i]);
                 this.unsubscribe(tmpArr);
              }

              else if (aDelete[i].origin == "subscribed"){  // Duplicating items only for origin subscribed : subscribed -> unsubscribe() = unsubscribed -> unsubscribe() = deleted
                 
                  var tmpArr = new Array();
                  tmpArr.push(aDelete[i]);
                  this.unsubscribe(tmpArr);
                  this.unsubscribe(tmpArr);
              }
            }
            }
            if (aUnsubscribe && aUnsubscribe.length) {
               this.unsubscribe(aUnsubscribe);
            }
            if (aSubscribe && aSubscribe.length) {
               this.subscribe(aSubscribe);
            }          
            this.gui.dlgSubscriptions.setSubscriptions(newSubscriptions);

            var aSubscriptions = {};
            aSubscriptions.value = "";


            for (var i = 0; aSubscribe && i < aSubscribe.length; i++){  // Save default subscribe settings

              aSubscriptions.name = "Subscriptions";

              if (aSubscribe[i].user){

                 aSubscriptions.value += "user#";
                 aSubscriptions.value += aSubscribe[i].user + "#";
              }

              if (aSubscribe[i].type){

                 aSubscriptions.value += "type#";
                 aSubscriptions.value += aSubscribe[i].type + "#";
              }

             if (aSubscribe[i].uri){

                aSubscriptions.value += "uri#";
                aSubscriptions.value += aSubscribe[i].uri + "#";              
             }

             aSubscriptions.value += "@";

           } 
           
           this.settings.add([{ name: "Subscriptions", value: aSubscriptions.value}]);    
           this.reloadAllAnnotations();  
        }
        else if (oMsg.isQueryPersonsForSearching) {
            // add persons to DlgPersons
            this.gui.dlgPersons.setPersons(oMsg.persons);          
        }
        else {
            if (!this.isDlgPersonsInitialized) {
                this.isDlgPersonsInitialized = true;
                // add persons to DlgPersons
                this.gui.dlgPersons.setPersons(oMsg.persons);                 
            }

            // add persons to Persons Manager
            this.persons.setPersons(oMsg.persons);       
        
        }
        
        var m = (msg) ? msg : new AEd.ui.Message(); 
        if(!oMsg.isQueryPersonsForSuggestions){
            
            if (!msg) {
                this.gui.dlgStatusBar.add(m);
            }

            m.setIcon("ok");
            m.setTitle(AEd.I18n.t("Persons"));
            m.setSubtitle(AEd.I18n.t("Message_received"));

            var content = "";
            for (var i = 0; i < oMsg.persons.length; i++) {
                content += "ID: " + oMsg.persons[i].id + "<br/>";
                content += "Login: " + oMsg.persons[i].login + "<br/>";
                content += "Name: " + oMsg.persons[i].name + "<br/>";
                content += "Email: " + oMsg.persons[i].email + "<br/>";
                content += "<br/>";
            }     

            m.setContent(content);
        }
        this.settings.cleanRules();
        this.settings.applyRules();        
    }
     
   
} 



// --------------------------------------------------------- Editor.onMsgGroups
/**
 * Handler to server msg
 *
 * @name onMsgGroups
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgGroups = function(oMsg, msg) {
    if (oMsg) {
        if (oMsg.isQueryGroupsForSuggestions) {         
            if(oMsg.dialog == "dlgSubscriptions"){
                this.gui.dlgSubscriptions.suggestionsUriBar.addNewItemsGroupsUris(oMsg.groups)    
            }
        }        
        if (oMsg.isQueryGroupsForSearching) {
            // add groups to DlgGroups
            this.gui.dlgGroups.setGroups(oMsg.groups, this.user.groups);          
        }
        else {
            if (!this.isDlgGroupsInitialized) {
                this.isDlgGroupsInitialized = true;
                // add groups to DlgGroups
                this.gui.dlgGroups.setGroups(oMsg.groups, this.user.groups);                 
            }

            // add groups to Groups Manager
            this.groups.setGroups(oMsg.groups);       
        
        }
        
        var m = (msg) ? msg : new AEd.ui.Message(); 

        if(!oMsg.isQueryGroupsForSuggestions){

          if (!msg) {
              this.gui.dlgStatusBar.add(m);
          }

          m.setIcon("ok");
          m.setTitle(AEd.I18n.t("Groups"));
          m.setSubtitle(AEd.I18n.t("Message_received"));
        
          var content = "";
          for (var i = 0; i < oMsg.groups.length; i++) {
              content += "Name: " + oMsg.groups[i].name + "<br/>";
              content += "Uri: " + oMsg.groups[i].uri + "<br/>";
              content += "<br/>";
          }     
             
          m.setContent(content);
        }
        
        this.settings.cleanRules();
        this.settings.applyRules();        
    }  
} 



// --------------------------------------------------------- Editor.onMsgSuggestions
/**
 * Handler to server msg -- suggestions received
 *
 * @name onMsgSuggestions
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgSuggestions = function(oMsg, msg) {

    if (oMsg) { 
 
        var rng = this.wysiwyg.getSelectionRange();   // Save range because createFragments will destroy it
        var m = (msg) ? msg : new AEd.ui.Message(); 
        if (!msg) {
            this.gui.dlgStatusBar.add(m);
        }

        if (!this.caretLocked) {  // caret position saving is not locked

           this.caretBookmark = this.getCaretPosition(); // Save caret position
        }

        this.editorNativeObject.getBody().setAttribute('contenteditable', false); // lock modifications

        m.setIcon("ok");
        m.setTitle( AEd.I18n.t("Suggestions"));  
        m.setSubtitle(AEd.I18n.t("Message_received"));
        
        this.settings.cleanRules();
        this.settings.applyRules();

        var suggestionConfidence = null;
        var suggestionAutomaticConfirming = null;
        var settings = this.settings.getSettings();
        for (var i in settings) {
            if (settings[i].name == "ClientSuggestionConfidence") {
                suggestionConfidence = settings[i].value;
            }
            else if (settings[i].name == "ClientSuggestionAutoConfirming") {
                suggestionAutomaticConfirming = settings[i].value;
            }
            if (suggestionConfidence != null && suggestionAutomaticConfirming != null) {
              break;
            }
        }
        
                 
        // automatic confirming according to suggestion automatic confirming value on settings
        if (suggestionAutomaticConfirming && suggestionAutomaticConfirming != 0) {
            var aConfirm = new Array();
            for (var i in oMsg.suggestions) {
                if (oMsg.suggestions[i].confidence && (parseInt(oMsg.suggestions[i].confidence) >= parseInt(suggestionAutomaticConfirming))) {
                    oMsg.suggestions[i].confirmed = "automatically";
                    aConfirm.push(oMsg.suggestions[i]);
                }        
            }
            if (aConfirm.length > 0) {
                this.sendAcceptSuggestion(aConfirm);
            }
        }
                
        // automatic refuse according to suggestion confidence value on settings
        if (suggestionConfidence) { 
            var aRefuse = new Array();
            for (var i in oMsg.suggestions) {
                if (oMsg.suggestions[i].confidence && (parseInt(oMsg.suggestions[i].confidence) < parseInt(suggestionConfidence))) {
                    var refuse = {
                        tmpId : oMsg.suggestions[i].tmpId,
                        method : "automatically"
                    }
                    aRefuse.push(refuse);
                }        
            }
            if (aRefuse.length > 0) {
                this.sendRefuseSuggestion(aRefuse);
            }
        }
        

        if (oMsg.deletes && oMsg.deletes.length > 0) {
            this.suggestions.removeSuggestions(oMsg.deletes);
        }
        if (oMsg.suggestions && oMsg.suggestions.length > 0) {
            this.suggestions.addSuggestions(oMsg.suggestions);
        }
        
        this.suggestions.updateSuggestedAnnotationDlg();

        this.wysiwyg.setSelectionRange(rng);  // Replace range because of restoring caret position
        this.editorNativeObject.getBody().setAttribute('contenteditable', true); // unlock modifications

        if (window.opera){  // Opera will hide the caret if you do not set focus

           this.editorNativeObject.focus();
        }

        this.setCaretPosition(this.caretBookmark);  // Restore caret position
        this.caretLocked = false;  // unlock caret position saving
    }      
}



// ---------------------------------------------------------- Editor.onMsgTypes
/**
 * Handler to server msg
 *
 * @name onMsgTypes
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgTypes = function(oMsg, msg) {
    if (oMsg) {
    
        if (oMsg.isQueryTypesForUserGroupSwitching){

           this.types.removeAllTypes();   // Fixes problem with user group switching and annotation types update
        }

        var m = null;
        if (msg) {
            m = msg;
            m.setIcon("ok");
            m.setTitle(AEd.I18n.t("Types"));
            m.setSubtitle(AEd.I18n.t("Message_received"));          
            var content = "";
            m.setContent(content);
        }
        
        if (!msg && !oMsg.filter) {
            this.gui.dlgStatusBar.add(m);
        }
        
        if (oMsg.add) {
            
            if (oMsg.isQueryTypesForSuggestions) {        
                for (var i = 0; i < oMsg.add.length; i++) {
                     oMsg.add[i].text = this.types.getPathByURI(oMsg.add[i].uri)
                     oMsg.add[i].simpleType = false;
                }

                if (oMsg.typeOfAttribute) {
                
                    // adds simple types to suggestion bar
                    // ----------------------------------------

                    var simpleTypesTree = this.types.getSimpleTypes();                    
                    var num = simpleTypesTree.childTreeNodes.length - 1; 
                    var simpleType = {};
                    var fil = this.gui.dlgAnnotate.removeDiacriticFromString(oMsg.filter);
                    var regExp = new RegExp(escape(fil), 'i');
                    for (var i = 0; i < simpleTypesTree.childTreeNodes.length; i++) {
                        var childTreeNodeText = this.gui.dlgAnnotate.removeDiacriticFromString(simpleTypesTree.childTreeNodes[i].text);
                        if (childTreeNodeText.match(regExp)) {
                            if (oMsg.typeOfAttribute != "Annotation") {
                                simpleType = {
                                name: simpleTypesTree.childTreeNodes[i].assignedObject.name,
                                text: simpleTypesTree.childTreeNodes[i].text + " " + AEd.I18n.t("Suggestion_bar_simple_types_suffix"),
                                simpleType: true
                                };
                                oMsg.add.push(simpleType);
                            }
                        }    
                    }
                    
                    // ----------------------------------------
                    
                    if (oMsg.dialog == "dlgAnnotate") {  
                        switch (oMsg.typeOfAttribute) {
                        case "Annotation":
                            this.gui.dlgAnnotate.suggestionsBar.addNewItems(oMsg.add);
                        break;
                        case "Simple":
                            this.gui.dlgAnnotate.suggestionsBarSimple.addNewItems(oMsg.add);
                        break;
                        case "GeoPoint":
                            this.gui.dlgAnnotate.suggestionsBarGeoPoint.addNewItems(oMsg.add);
                        break;
                        case "Entity":
                            this.gui.dlgAnnotate.suggestionsBarEntity.addNewItems(oMsg.add);
                        break;  
                        case "NestedAnnotation":
                            this.gui.dlgAnnotate.suggestionsBarNested.addNewItems(oMsg.add);
                        break; 
                        }
                    }
                    else if (oMsg.dialog == "dlgSuggestAnnotations") {
                        this.gui.dlgSuggestAnnotations.suggestionsBar.addNewItems(oMsg.add);
                    }
                    else if (oMsg.dialog == "dlgTypecolors") {
                        this.gui.dlgTypeColors.suggestionsBar.addNewItems(oMsg.add)    
                    }
                    else if (oMsg.dialog == "dlgSubscriptions") {
                        this.gui.dlgSubscriptions.suggestionsTypeBar.addNewItems(oMsg.add)    
                    }
                    else if (oMsg.dialog == "dlgAttrTypes") {
                        this.gui.dlgAttrTypes.suggestionsBar.addNewItems(oMsg.add)    
                    }
                }
            }
            else {                
                this.types.addTypes(oMsg.add);
            }
        }
        
        if (oMsg.change) {
            this.types.changeTypes(oMsg.change);
        }
        if (oMsg.remove) {
            this.types.removeTypes(oMsg.remove);
        }      

        // actualize tree in AnnoType dlg           
        this.gui.dlgTypes.setTree(this.types.getTypesTree({context: this.gui.dlgTypes.iframe.contentWindow.document}));    
        // actualize tree in AnnoAttrType dlg           
        this.gui.dlgAttrTypes.setTree(this.types.getAttrTypesTree());         
        
        if (this.settings){

          this.settings.cleanRules();
          this.settings.applyRules();   
        }
    } 
} 


// ---------------------------------------------------------- Editor.onMsgAttrsFromOntology
/**
 * Handler to server msg
 *
 * @name onMsgAttrsFromOntology
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgAttrsFromOntology = function(oMsg, msg) {
    if (oMsg) {

        var m = null;
        if (msg) {
            m = msg;
            m.setIcon("ok");
            m.setTitle(AEd.I18n.t("Query_Attr_From_Onto"));
            m.setSubtitle(AEd.I18n.t("Message_received"));          
            var content = "";
            m.setContent(content);
        }
        
        if (!msg && !oMsg.filter) {
            this.gui.dlgStatusBar.add(m);
        }          

        this.typesFromOntology.addTypes(oMsg.attrsFromOntology);        
        this.gui.dlgAttrFromOntology.setTree(this.typesFromOntology.getAttrTypesTree());         
        
        this.settings.cleanRules();
        this.settings.applyRules();   
    } 
} 


// ---------------------------------------------------------- Editor.onMsgTextModification
/**
 * Handler to server msg
 *
 * @name onMsgTextModification
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */

AEd.editors.Editor.prototype.onMsgTextModification = function(oMsg, msg) {

  var doc = this.wysiwyg.getDocument();

  if (oMsg){

    var sel = this.editorNativeObject.selection;  
    var caretBookmark = this.getCaretPosition(this.caretBookmark);  // Save caret position 

    this.editorNativeObject.getBody().setAttribute('contenteditable', false); // lock modifications 

    for (var i = 0; i < this.annotations.annotations.length; i++) {   

      this.fragments.destroyFragments(this.annotations.annotations[i]);
    }

    var sugg = this.suggestions;

    for (var i = 0; i < this.suggestions.suggestions.length; i++) {   

      this.fragments.destroyFragments(this.suggestions.suggestions[i]);
    }

    var xPathRes = AEd.XML.selectSingleNodeXPath(doc, oMsg.path)

    if (xPathRes && oMsg.path && !oMsg.content && !oMsg.length && !oMsg.offset) { // Delete whole fragment

       xPathRes.outerHTML = ""; 
    }

    else if (xPathRes && oMsg.path && !oMsg.path.match(/\/\w+\(\)(\[\d+\])?$/) && oMsg.content && !oMsg.length && !oMsg.offset) { // Add new fragment

      xPathRes.outerHTML = oMsg.content; 
    }

    else if (xPathRes && oMsg.path && oMsg.path.match(/\/\w+\(\)(\[\d+\])?$/) && oMsg.content && !oMsg.length && !oMsg.offset){  // Change existing fragment
 
      xPathRes.nodeValue = oMsg.content;
    }

    this.wysiwyg.setContent(doc.body.innerHTML);

    this.previousFragments = this.parseTagValuesFromString(AEd.CONFIG.RESOURCE_PREFIX + this.wysiwyg.getOrigDocContent() + AEd.CONFIG.RESOURCE_SUFFIX);

    for (var i = 0; i < this.annotations.annotations.length; i++) { 

      this.fragments.createFragments(this.annotations.annotations[i]);
    }

    for (var i = 0; i < sugg.suggestions.length; i++) {   

      this.fragments.createFragments(sugg.suggestions[i]);
    }
    this.fragments.setSuggestionsClass();

    this.setCaretPosition(this.caretBookmark);  // Restore caret position  

    this.editorNativeObject.getBody().setAttribute('contenteditable', true); // unlock modifications 
  } 


}


// --------------------------------------------------- Editor.onMsgSynchronized
/**
 * Handler to server msg
 *
 * @name onMsgSynchronized
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgSynchronized = function(oMsg, msg) {
    if (oMsg) {
        var m = (msg) ? msg : new AEd.ui.Message(); 
        if (!msg) {
            this.gui.dlgStatusBar.add(m);
        }

        m.setIcon("ok");
        m.setTitle( AEd.I18n.t("Synchronized"));  
        m.setSubtitle(AEd.I18n.t("Message_received"));
        
        this.resourceUriFromServer = oMsg.resource;
        m.setContent(this.resourceUriFromServer);
        this.removeEmptyNodes();
    }
  
} 


// -------------------------------------------------- Editor.onMsgResynchronize
/**
 * Handler to server msg
 *
 * @name onMsgResynchronize
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgResynchronize = function(oMsg, msg) {
    if (oMsg) {
        var m = (msg) ? msg : new AEd.ui.Message(); 
        if (!msg) {
            this.gui.dlgStatusBar.add(m);
        }

        m.setIcon("ok");
        m.setTitle( AEd.I18n.t("Resynchronize"));  
        m.setSubtitle(AEd.I18n.t("Message_received"));
        m.setContent("");
        
        this.resynchronize();
    }
  
} 



// ------------------------------------------------------- Editor.onMsgSettings
/**
 * Handler to server msg
 *
 * @name onMsgSettings
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgSettings = function(oMsg, msg) {
    if (oMsg) {
        var m = (msg) ? msg : new AEd.ui.Message(); 
        if (!msg) {
            this.gui.dlgStatusBar.add(m);
        }

        m.setIcon("ok");
        m.setTitle( AEd.I18n.t("Settings"));  
        m.setSubtitle(AEd.I18n.t("Message_received"));
        
        var content = "";
        
        if (oMsg.params) {
            for (var i=0; i<oMsg.params.length; i++) {
                content += AEd.I18n.t("Settings_name")+ ": " + oMsg.params[i].name;    
                content += "<br/>";
                content += AEd.I18n.t("Settings_value")+ ": " + oMsg.params[i].value;
                content += "<br/>";
                content += "<br/>";
            }
        }

        m.setContent(content);
        
        this.settings.setSettings(oMsg.params);
    }
    
    if (!this.areInitialSettingsSet) {
        this.areInitialSettingsSet = true;
        this.setInitialSettings();          
    }

    if (this.settings.getValueByName("ClientAdvancedToolbarOptions")){  // Parse and realize advanced toolbar settings

       this.gui.toolbar.setStyle(this.settings.getValueByName("ClientAdvancedToolbarOptions"));
       this.gui.advancedToolbar.setStyle(this.settings.getValueByName("ClientAdvancedToolbarOptions"));
       this.refreshToolbarButtons(); 
    }

    if (this.settings.getValueByName("ClientSuggestionConfidence")){

        var suggestionConfidence = this.settings.getValueByName("ClientSuggestionConfidence");
                
        // automatic refuse according to suggestion confidence value on settings
        if (suggestionConfidence) { 
            var aRefuse = new Array();
            for (var i in this.suggestions.suggestions) {
                if (this.suggestions.suggestions[i].confidence && (parseInt(this.suggestions.suggestions[i].confidence) < parseInt(suggestionConfidence))) {
                    var refuse = {
                        tmpId : this.suggestions.suggestions[i].tmpId,
                        method : "automatically"
                    }
                    aRefuse.push(refuse);
                }        
            }
            if (aRefuse.length > 0) {
                this.sendRefuseSuggestion(aRefuse);
            }
        }


    }

    if (this.settings.getValueByName("ClientSuggestionAutoConfirming")){

        var suggestionAutomaticConfirming = this.settings.getValueByName("ClientSuggestionAutoConfirming");     
                 
        // automatic confirming according to suggestion automatic confirming value on settings
        if (suggestionAutomaticConfirming && suggestionAutomaticConfirming != 0) {
            var aConfirm = new Array();
            for (var i in this.suggestions.suggestions) {
                if (this.suggestions.suggestions[i].confidence && (parseInt(this.suggestions.suggestions[i].confidence) >= parseInt(suggestionAutomaticConfirming))) {
                    this.suggestions.suggestions[i].confirmed = "automatically";
                    aConfirm.push(this.suggestions.suggestions[i]);
                }        
            }
            if (aConfirm.length > 0) {
                this.sendAcceptSuggestion(aConfirm);
            }
        }

    }

    if (!this.unSubscribeFromSettingsOncePerSession && (this.settings.getValueByName("Subscriptions") || this.settings.getValueByName("Unsubscriptions"))){

      this.gui.dlgSubscriptions.removeAll();
    }

    if (!this.unSubscribeFromSettingsOncePerSession && this.settings.getValueByName("Subscriptions")){ // Set subscriptions dialog
     
       var setVal = this.settings.getValueByName("Subscriptions").split("#@");  // Get subscriptions     

       for (var i = 0; i < setVal.length; i++){
         
         var tmp = setVal[i].split("#");

         if (tmp.length == 2) {

           for (var j = 0; j < tmp.length; j = j + 2){  // Set subscribed panels (only one subscription parameter)

             if (tmp[j] == "user" && tmp[j + 1]){

                this.gui.dlgSubscriptions.addSubscribed(tmp[j + 1], "", "");
             }

             else if (tmp[j] == "type" && tmp[j + 1]){

                this.gui.dlgSubscriptions.addSubscribed("", tmp[j + 1], "");
             }

             else if (tmp[j] == "uri" && tmp[j + 1]){

                this.gui.dlgSubscriptions.addSubscribed("", "", tmp[j + 1]);
             }
           }
         }

         else if (tmp.length > 2) {

           var user = "";
           var type = "";
           var uri = "";

           for (var j = 0; j < tmp.length; j = j + 2){  // Set subscribed panels (more subscription parameters)

             if (tmp[j] == "user" && tmp[j + 1]){

                user = tmp[j + 1];
             }

             else if (tmp[j] == "type" && tmp[j + 1]){

                type = tmp[j + 1];
             }

             else if (tmp[j] == "uri" && tmp[j + 1]){

                uri = tmp[j + 1];
             }
           }
          
           this.gui.dlgSubscriptions.addSubscribed(user, type, uri);
         }
       }

    }

    if (!this.unSubscribeFromSettingsOncePerSession && this.settings.getValueByName("Unsubscriptions")){

       var setVal = this.settings.getValueByName("Unsubscriptions").split("#@");  // Get unsubscriptions     
   
       for (var i = 0; i < setVal.length; i++){
         
         var tmp = setVal[i].split("#");

         if (tmp.length == 2) {

           for (var j = 0; j < tmp.length; j = j + 2){  // Set subscribed panels (only one subscription parameter)

             if (tmp[j] == "user" && tmp[j + 1]){

                this.gui.dlgSubscriptions.addUnsubscribed(tmp[j + 1], "", "");
             }

             else if (tmp[j] == "type" && tmp[j + 1]){

                this.gui.dlgSubscriptions.addUnsubscribed("", tmp[j + 1], "");
             }

             else if (tmp[j] == "uri" && tmp[j + 1]){

                this.gui.dlgSubscriptions.addUnsubscribed("", "", tmp[j + 1]);
             }
           }
         }

         else if (tmp.length > 2) {

           var user = "";
           var type = "";
           var uri = "";

           for (var j = 0; j < tmp.length; j = j + 2){  // Set subscribed panels (more subscription parameters

             if (tmp[j] == "user" && tmp[j + 1]){

                user = tmp[j + 1];
             }

             else if (tmp[j] == "type" && tmp[j + 1]){

                type = tmp[j + 1];
             }

             else if (tmp[j] == "uri" && tmp[j + 1]){

                uri = tmp[j + 1];
             }
           }
          
           this.gui.dlgSubscriptions.addUnsubscribed(user, type, uri);
         }
       }

    }

    if (!this.unSubscribeFromSettingsOncePerSession && (this.settings.getValueByName("Subscriptions") || this.settings.getValueByName("Unsubscriptions"))){  // Send subscribe/unsubscribe message from settings only once per session

      this.unSubscribeFromSettingsOncePerSession = true;

      var newSubscriptions = this.gui.dlgSubscriptions.getSubscriptions(true);  // Send subscribe/unsubscribe messages from settings
      this.subscriptions.setSubscriptions(newSubscriptions);
        
      var aUnsubscribe = this.gui.dlgSubscriptions.getSubscriptionsToUnsubscribe();
      var aSubscribe = this.gui.dlgSubscriptions.getSubscriptionsToSubscribe();
      var aDelete = this.gui.dlgSubscriptions.getSubscriptionsToDelete();    

      if (aDelete && aDelete.length) {

            for (var i = 0; i < aDelete.length; i++){  

              if (aDelete[i].origin == "unsubscribed"){  // unsubscribed -> unsubscribe() = deleted

                 var tmpArr = new Array();
                 tmpArr.push(aDelete[i]);
                 this.unsubscribe(tmpArr);
              }

              else if (aDelete[i].origin == "subscribed"){  // Duplicating items only for origin subscribed : subscribed -> unsubscribe() = unsubscribed -> unsubscribe() = deleted
                 
                  var tmpArr = new Array();
                  tmpArr.push(aDelete[i]);
                  this.unsubscribe(tmpArr);
                  this.unsubscribe(tmpArr);
              }
            }
      }
      if (aUnsubscribe && aUnsubscribe.length) {
         this.unsubscribe(aUnsubscribe);
      }
      if (aSubscribe && aSubscribe.length) {
         this.subscribe(aSubscribe);
      }          
      this.gui.dlgSubscriptions.setSubscriptions(newSubscriptions);
       
    }

    if (!this.unSubscribeFromSettingsOncePerSession && !this.isDlgSubscriptionsInitialized && !this.settings.getValueByName("Unsubscriptions") && !this.settings.getValueByName("Subscriptions")){

       this.isDlgSubscriptionsInitialized = true;
       this.gui.dlgSubscriptions.removeAll();
       var params = {};
       params.dialog = "dlgSubscriptions";
       params.isQueryPersonsForDefaultSubscriptions = true;
       params.withGroups = true;
       params.filter = "id:" + this.user.id;

       this.queryPersons(params);
    }
     
        
    if (this.settings){

       this.settings.cleanRules();
       this.settings.applyRules();
    }

    
} 



// ---------------------------------------------------- Editor.onMsgAnnotations
/**
 * Handler to server msg
 *
 * @name onMsgAnnotations
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgAnnotations = function(oMsg, msg) {
    
    if (oMsg) {

        var rng = this.wysiwyg.getSelectionRange();   // Save range because createFragments will destroy it

        var m = (msg) ? msg : new AEd.ui.Message(); 
        if (!msg) {
            this.gui.dlgStatusBar.add(m);
        }

        if (!this.caretLocked) {  // caret position saving is not locked
           this.caretBookmark = this.getCaretPosition(); // Save caret position
        }

        this.editorNativeObject.getBody().setAttribute('contenteditable', false); // lock modifications
        
        m.setIcon("ok");
        m.setTitle( AEd.I18n.t("Annotations"));  
        m.setSubtitle(AEd.I18n.t("Message_received"));
        
        if (oMsg.add && oMsg.add.length > 0) {

           if (oMsg.countAnnotsForQuickSuggestions){

              // Turn on quick suggestions if there is a few annotations

              var goodAnnotations = 0;

              for (var k = 0; k < oMsg.add.length; k++){
 
                  if ((!oMsg.add[k].badAnnotation || !oMsg.add[k].badFragment) && this.types.getTypeByURI(oMsg.add[k].typeUri)){  // Do not count bad annotations and annotations with unknown types
                     goodAnnotations++;
                  }

              }

              if (goodAnnotations < (this.wysiwyg.getContent().length / AEd.CONFIG.AUTO_QUICK_SUGG_LETTERS_TO_ONE_SUGG)) {

                this.gui.toolbars.btnQuickSuggestions.setSelected(true);
                this.quickSuggestions();
              }
              
              else {

                this.gui.toolbars.btnQuickSuggestions.setSelected(false);
              }
           }


           this.annotations.addAnnotations(oMsg.add);
        }
        if (oMsg.change && oMsg.change.length > 0) {
            this.annotations.changeAnnotations(oMsg.change);
        }
        if (oMsg.remove && oMsg.remove.length > 0) {
            this.annotations.removeAnnotations(oMsg.remove);
        }
        
        this.settings.cleanRules();
        this.settings.applyRules();  

        this.wysiwyg.setSelectionRange(rng);  // Replace range because of restoring caret position 
        this.editorNativeObject.getBody().setAttribute('contenteditable', true); // unlock modifications  

        if (window.opera){  // Opera will hide the caret if you do not set focus

           this.editorNativeObject.focus();
        }
 
        this.setCaretPosition(this.caretBookmark);  // Restore caret position  

        this.caretLocked = false;  // unlock caret position saving
    }
} 



// ------------------------------------------------------------- Editor.onMsgOk
/**
 * Handler to server msg
 *
 * @name onMsgOk
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgOk = function(oMsg, msg) {

    if (oMsg && (msg && msg.getTitle().toString().length > 0)) {

        var m = (msg) ? msg : new AEd.ui.Message(); 
        if (!msg) {
            this.gui.dlgStatusBar.add(m);
        }

        m.setIcon("ok");         
        m.setTitle(AEd.I18n.t("OK"));
        m.setSubtitle(AEd.I18n.t("Message_received"));
        m.setContent("");
    }     
}  



// ---------------------------------------------------------- Editor.onMsgError
/**
 * Handler to server msg
 *
 * @name onMsgError
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgError = function(oMsg, msg) {
    if (oMsg) {
        var m = (msg) ? msg : new AEd.ui.Message(); 
        if (!msg) {
            this.gui.dlgStatusBar.add(m);
        }

        m.setIcon("error");         
        m.setTitle(AEd.I18n.t("Error") + " (" + oMsg.number + ")");
        m.setSubtitle(AEd.I18n.t("See_msg_details_for_more_information"));
        
        var content = oMsg.message;           
        
        if (oMsg.reloadUri) {
            content += "<br/>";
            content += "<br/>";
            content += AEd.I18n.t("Reload") + ":";
            content += "<br/>";   
            content += oMsg.reloadUri;
            
            this.reloadAnnotation(oMsg.reloadUri);     
        }
        
        if (oMsg.accessDenied) {
            content += "<br/>";
            content += "<br/>";
            for (var i = 0; i < oMsg.accessDenied.length; i++) {

                content += AEd.I18n.t("Access_denied") + ":";
                content += "<br/>";
                if (oMsg.accessDenied[i].user) {
                     content += AEd.I18n.t("Access_denied_user") + ":";
                     content += "<br/>";
                     content += oMsg.accessDenied[i].user; 
                     content += "<br/>";
                }
                if (oMsg.accessDenied[i].type) {
                     content += AEd.I18n.t("Access_denied_type") + ":";
                     content += "<br/>";
                     content += oMsg.accessDenied[i].type; 
                     content += "<br/>";
                }
                if (oMsg.accessDenied[i].uri) {
                     content += AEd.I18n.t("Access_denied_uri") + ":";
                     content += "<br/>";
                     content += oMsg.accessDenied[i].uri; 
                     content += "<br/>";
                }                                             
                content += "<br/>";             
            }    
        }
        
        if (oMsg.attributes) {
            content += "<br/>";
            content += "<br/>";
            for (var i = 0; i < oMsg.attributes.length; i++) {
                content += AEd.I18n.t("Error_attributes") + ":";
                content += "<br/>";
                if (oMsg.attributes[i].name) {
                     content += AEd.I18n.t("Error_attributes_name") + ":";
                     content += "<br/>";
                     content += oMsg.attributes[i].name; 
                     content += "<br/>";
                }
                if (oMsg.attributes[i].value) {
                     content += AEd.I18n.t("Error_attributes_value") + ":";
                     content += "<br/>";
                     content += oMsg.attributes[i].value;
                     content += "<br/>"; 
                }
                                          
                content += "<br/>";             
            }    
        }         
        
        m.setContent(content);
        
        if (oMsg.number == "31") { // Session expired or bad session number
            this.disconnect(false, null, null);
        }        
    }      
}    
         
         

// -------------------------------------------------------- Editor.onMsgWarning
/**
 * Handler to server msg
 *
 * @name onMsgWarning
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgWarning = function(oMsg, msg) {
    if (oMsg) {
        var m = (msg) ? msg : new AEd.ui.Message(); 
        if (!msg) {
            this.gui.dlgStatusBar.add(m);
        }

        m.setIcon("warning");         
        m.setTitle(AEd.I18n.t("Warning") + " (" + oMsg.number + ")");
        m.setSubtitle(AEd.I18n.t("See_msg_details_for_more_information"));
        
        var content = oMsg.message;
        
        if (oMsg.annotation) {
            content += "<br/>";
            content += "<br/>";
            content += AEd.I18n.t("Annotation_URI") + ":";
            content += "<br/>";   
            content += oMsg.annotation;
        }
        
        m.setContent(content);
    }      
}    



// -------------------------------------------------------- Editor.onMsgUnknown
/**
 * Handler to server msg
 *
 * @name onMsgUnknown
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.  	
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgUnknown = function(oMsg, msg) {
    if (oMsg) {
        var m = (msg) ? msg : new AEd.ui.Message(); 
        if (!msg) {
            this.gui.dlgStatusBar.add(m);
        }

        m.setIcon("warning");         
        m.setTitle(AEd.I18n.t("Warning") + " - " + AEd.I18n.t("Unexpected_message") + ":" + oMsg.msgtype);
        m.setSubtitle(AEd.I18n.t("See_msg_details_for_more_information"));
        m.setContent(oMsg.message);
    }      
}


// -------------------------------------------------------- Editor.onMsgEntities
/**
 * Handler to server msg
 *
 * @name onMsgEntities
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} oMsg Response message object.        
 * @param {AEd.ui.Message} msg Optional StatusBar msg to work with.  
 */
AEd.editors.Editor.prototype.onMsgEntities = function(oMsg, msg)
{
    //add all entities to the suggestion bar (autocompleter)
    var suggestionBar = this.gui.dlgAnnotate.suggestionsBarEntityName;
    var entities = [];
    //get entity name that user filled into the entity name field
    var entityName = this.gui.dlgAnnotate.getEntityName().toLowerCase();
    //filter the results -- entities that server sent might be outdated if user changed the field fast enough
    
    for(var i = 0; i < oMsg.entities.length; i++)
    {
        var name = oMsg.entities[i].name.toLowerCase();
        if(name.substr(0, entityName.length) == entityName && oMsg.entities[i].uri)
            entities.push(oMsg.entities[i]);
    }

    suggestionBar.addNewItemsEntities(entities);
    
    //deselect entity from suggestion bar
    suggestionBar.deselectItem(suggestionBar.selectedItem);
    
    this.gui.dlgAnnotate.entitiesReceived = true;
}

// -------------------------------------------------------- Editor.onServerConnectionLost
/**
 * Handler to server connection lost
 *
 * @name onServerConnectionLost
 * @memberOf AEd.editors.Editor
 * @function
 */

AEd.editors.Editor.prototype.onServerConnectionLost = function(){

     var msg = new AEd.ui.core.UIMessage({  // Create Message
         title: AEd.I18n.t("Dlg_not_connected_title"),
         headerContent: AEd.I18n.t("Dlg_not_connected_text"),
         icon: "error"
     });
    
     this.gui.dlgNotConnected.contentArea.addItem(msg);  // Add dialog to content area


     var btnDisableAEd = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_not_connected_button_disable_aed")});  // Create buttons
     var btnReconnect = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_not_connected_button_reconnect")});
    
     this.gui.dlgNotConnected.buttonsArea.addItem(btnDisableAEd);
     this.gui.dlgNotConnected.buttonsArea.addItem(btnReconnect);
    
     var context = this;

     btnDisableAEd.onClick.addHandler(function() {

          context.gui.dlgNotConnected.buttonsArea.removeItem(btnDisableAEd); // Destroy this dialog
          context.gui.dlgNotConnected.buttonsArea.removeItem(btnReconnect);
          context.gui.dlgNotConnected.contentArea.removeItem(msg);
          AEd.Dialogs.remove(context.gui.dlgNotConnected);  
          context.gui.dlgNotConnected.remove();          
  
          context.editorNativeObject.buttons.aed.onclick();    // Deselect aed button
          context.gui.destroy();           // Destroy editor gui
          delete context;     

     });

     btnReconnect.onClick.addHandler(function() {

          context.gui.dlgNotConnected.buttonsArea.removeItem(btnDisableAEd); // Destroy this dialog
          context.gui.dlgNotConnected.buttonsArea.removeItem(btnReconnect);
          context.gui.dlgNotConnected.contentArea.removeItem(msg);
          AEd.Dialogs.remove(context.gui.dlgNotConnected);  
          context.gui.dlgNotConnected.remove();
          
          context.editorNativeObject.buttons.aed.onclick();    // Deselect aed button
          context.gui.destroy();           // Destroy editor gui
          delete context; 
          context.editorNativeObject.buttons.aed.onclick();    // Select aed button - run annotation editor again
     });

     this.gui.dlgNotConnected.render(this.domElementTarget);
     AEd.Dialogs.add(this.gui.dlgNotConnected, "modal");

}


// -------------------------------------------------------- Editor.removeEmptyNodes
/**
 * Removes empty nodes from editor document.
 *
 * @name removeEmptyNodes
 * @memberOf AEd.editors.Editor  	 
 */	

AEd.editors.Editor.prototype.removeEmptyNodes = function(){

  var doc = this.wysiwyg.getDocument();

  var iterator;


  iterator = doc.createTreeWalker(doc, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null, false);

  while (iterator.nextNode()){  // Loops through nodes and gets values

	
     if (iterator.currentNode && iterator.currentNode.childNodes.length == 0 && (iterator.currentNode.nodeValue == "")){

        if (iterator.currentNode.parentNode){

           iterator.currentNode.parentNode.removeChild(iterator.currentNode);
        }
    }


  } 
}

// -------------------------------------------------------- Editor.modificationsLockHandler
/**
 * Unlocks caret.
 *
 * @name modificationsLockHandler
 * @memberOf AEd.editors.Editor  
 * @function
 * @param {AEd.Editor} parent parent editor object 	 
 */


AEd.editors.Editor.prototype.modificationsLockTimeoutHandler = function(parent){

   if (parent.caretLocked){  // Caret is locked

      parent.caretLocked = false;  // unlock caret
      parent.editorNativeObject.getBody().setAttribute('contenteditable', true);  // unlock modifications
      parent.setCaretPosition(parent.caretBookmark); // Restore caret position
       
   }
}


// -------------------------------------------------------- Editor.setCaretPosition
/**
 * Sets caret position to specified index.
 * Inspired by http://stackoverflow.com/questions/4767848/get-caret-cursor-position-in-contenteditable-area-containing-html-content
 *
 * @name setCaretPosition
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Object} position object {{Integer} position, {Range} range, {Boolean} newParagraph, {Element} element, {CaretBookmark} bookmark}       
 */

AEd.editors.Editor.prototype.setCaretPosition = function(position) {
  
    if (position){

       if (position.newParagraph && (position.element || position.bookmark)){  // New paragraph was added (by pressing enter button)

          if (AEd.isGoogleChrome){

             var range = this.wysiwyg.getDocument().createRange(); // This line wouldn't work in IE8, so be careful with copying ;)
             var sel = window.getSelection();

             // Move caret to the specified position at saved element
             range.setStart(position.element, 0);
             range.collapse(true);
             sel.removeAllRanges();
             sel.addRange(range); 

          }

          else {

             this.sel.moveToBookmark(position.bookmark);
         }

       }

       else {   

          var node = this.wysiwyg.getDocument().body;
          var index = position.position;

          var nodesToShow = NodeFilter.SHOW_TEXT;

          var treeWalker = document.createTreeWalker(  // Creates treeWalker, loops through document
                                                     node,
                                                     nodesToShow,
                                                     null,
                                                     false
                                                    );

          var charCount = 0;

          while (treeWalker.nextNode()) {

              if (treeWalker.currentNode){  // currentNode is defined

                  charCount += treeWalker.currentNode.length;   // Text length calculator
                  index = index - treeWalker.currentNode.length;  // Index calculator

                  if (charCount >= position.position){  // We have reached the specified position 

                     var range = null;
                     var sel = null;
                     if (this.wysiwyg.getDocument().createRange) {
                       range = this.wysiwyg.getDocument().createRange();
                       sel = this.editorNativeObject.selection.getSel();
                     }
                     else {
                       // Internet Explorer 8 solution (using IERange library)
                       range = document.createRange(this.wysiwyg.getDocument());
                       sel = window.getSelection(this.wysiwyg.getDocument());
                     }

                     // Move caret to the specified position at current node

                     range.setStart(treeWalker.currentNode, (index + treeWalker.currentNode.length));
                     range.collapse(true);
                     sel.removeAllRanges();
                     sel.addRange(range); 
                     break;           
                  }
             }

         }
      }
    }  
}

// -------------------------------------------------------- Editor.getCaretElement
/**

 * Returns element which contains caret.
 *
 * @name getCaretElement
 * @memberOf AEd.editors.Editor   
 * @function
 * @return {Element} element element containing caret	 
 */


AEd.editors.Editor.prototype.getCaretElement = function() {
 
  return this.editorNativeObject.selection.getSel().anchorNode; 
}


// -------------------------------------------------------- Editor.getCaretPosition
/**
 * Saves caret position.
 * Inspired by http://stackoverflow.com/questions/4767848/get-caret-cursor-position-in-contenteditable-area-containing-html-content
 *
 * @name getCaretPosition
 * @memberOf AEd.editors.Editor   
 * @function
 * @return {Object} object {{Integer} position, {Range} range, {Boolean} newParagraph, {Element} element, {CaretBookmark} bookmark}	 
 */


AEd.editors.Editor.prototype.getCaretPosition = function() {

    var range = null;

    if (this.editorNativeObject.selection.getSel().getRangeAt) {
 
      try{

        range = this.editorNativeObject.selection.getSel().getRangeAt(0);
      }
      catch(e){
          // Problems with apple safari during page refresh
          return;
      }
    }
    else {
      /* Solution for Internet Explorer 8 which doesn't support native DOM Selection */
      // Fix for null range after reconnecting
      if (window.getSelection(this.editorNativeObject.contentDocument).rangeCount == 0) {
        this.editorNativeObject.contentWindow.focus();
      }

      range = window.getSelection(this.editorNativeObject.contentDocument).getRangeAt(0);
    }
    var node = this.wysiwyg.getDocument().body;

    var position = {};
    var previousNode = null;

    var treeWalker = document.createTreeWalker(  // Create treeWalker and control range
        node,
        NodeFilter.SHOW_TEXT,
        function(node) {

            var nodeRange = document.createRange();
            nodeRange.selectNodeContents(node);

            if (nodeRange.compareBoundaryPoints(Range.END_TO_END, range) == -1 || (previousNode && previousNode.nodeValue == "")){  // New line detector (problems with empty textnodes)

               position.newParagraph = true;
            }

            else {

               position.newParagraph = false;
            }
 
            previousNode = node;
            return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 0 ?
                NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
        false
    );

    var charCount = 0;   // Number of textNodes

    while (treeWalker.nextNode()) {  // Loops through document and counts textNodes length

        if (treeWalker.currentNode){

            charCount += treeWalker.currentNode.length;
        }
    }


    if (range.startContainer.nodeType == 3) {   // Add position of cursor at the last node

        charCount += range.startOffset;
    }

    if (range.startOffset == 0 || this.enterPressed){   //  Set caret to the begin of node

       position.newParagraph = true;          
    }

    position.position = charCount;
    position.range = range;

    if (position.newParagraph){   // New paragraph is created : return element with caret

       if (AEd.isGoogleChrome){
     
          position.element = this.getCaretElement();
       }

       else {

         this.sel = this.editorNativeObject.selection;
         position.bookmark = this.sel.getBookmark(2, true);
       }

    }

    return position;
}



// -------------------------------------------------------- Editor.documentModification
/**

 * Document modification handler.
 *
 * @name documentModification
 * @memberOf AEd.editors.Editor   	 
 */

AEd.editors.Editor.prototype.documentModification = function(){

  if (this.documentModificationInProgress){  // Run only once per modification

    this.editorNativeObject.getBody().setAttribute('contenteditable', false);  // lock document modifications

    this.caretLocked = true;    // lock caret position saving

    for (var i = 0; i < this.annotations.annotations.length; i++) {   

      this.fragments.destroyFragments(this.annotations.annotations[i]);
    }
        
    var newDocumentFragments = this.parseTagValuesFromString(AEd.CONFIG.RESOURCE_PREFIX + this.wysiwyg.getOrigDocContent() + AEd.CONFIG.RESOURCE_SUFFIX);

    var changedDocumentFragments = this.detectChangedFragments(this.previousFragments, newDocumentFragments);

    for (var i = 0; i < changedDocumentFragments.length; i++){

        var params = {msgtype: "textModification", content: changedDocumentFragments[i].content, length: changedDocumentFragments[i].len.toString(), offset: changedDocumentFragments[i].offset.toString(), path: changedDocumentFragments[i].path};
  	this.comm.sendPostRequest([params], {scope: this });

    }
	
    this.previousFragments = newDocumentFragments;
   
    var rng = this.wysiwyg.getSelectionRange();   // Save range because createFragments will destroy it

    for (var i = 0; i < this.annotations.annotations.length; i++) { 

      this.fragments.createFragments(this.annotations.annotations[i]);
    }

    this.fragments.setSuggestionsClass();
    this.wysiwyg.setSelectionRange(rng);  // Replace range because of restoring caret position

    AEd.EditorParent.modificationsLockTimeoutHandler(AEd.EditorParent);

    if (window.opera){  // Opera will hide the caret if you do not set focus

       this.editorNativeObject.focus();
    }

    this.documentModificationInProgress = false;
  }
}

// -------------------------------------------------------- Editor.BeforeDocumentModification
/**
 * Prepares for documentModifiaction function. Saves selection object and caret position
 *
 * @name BeforeDocumentModification
 * @memberOf AEd.editors.Editor  	 
 */

AEd.editors.Editor.prototype.BeforeDocumentModification = function(){
 
   this.sel = this.editorNativeObject.selection;  // Save caret position http://stackoverflow.com/questions/5810303/preserve-caret-bookmark-position-in-tiny-while-using-setcontent

   if (!this.caretLocked) {  // caret position saving is not locked

      this.caretBookmark = this.getCaretPosition(); // Save caret position
   } 

   this.documentModificationInProgress = true;

   AEd.EditorParent = this;    // (Re)Set timer
   clearInterval(this.inter);
   this.inter = setInterval("AEd.EditorParent.documentModification()", 1000);
}

// -------------------------------------------------------- Editor.createHtmlParser
/**
 * Creates html parser.
 *
 * @name createHtmlParser
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {String} htmlString String contains html tags. 
 * @return {Object HTML Document} doc HTML document.	 
 */

AEd.editors.Editor.prototype.createHtmlParser = function(htmlString) {

  var doc = null;

  try { // Variant 1 - FF, Opera and other browsers with document.implementation.createHTMLDocument implementation

    if (AEd.isAppleSafari){  // Safari has problem (ignores body and head tag) when you try to use documentElement.innerHTML property

      doc = document.implementation.createHTMLDocument("");
      var headInnerHTML = htmlString.match(/\<head\>(.*)\<\/head\>/);  // Gets head innerHTML
      var bodyInnerHTML = htmlString.match(/\<body\>(.*)\<\/body\>/);  // Gets body innerHTML
   
      if (headInnerHTML && headInnerHTML.length > 1 && headInnerHTML[1]){

         doc.head.innerHTML = headInnerHTML[1];
      }      
 
      if (bodyInnerHTML && bodyInnerHTML.length > 1 && bodyInnerHTML[1]){

         doc.body.innerHTML = bodyInnerHTML[1];
      }

      
    }

    else {

      doc = document.implementation.createHTMLDocument("");
      doc.documentElement.innerHTML = htmlString;
    }


  } catch (ex1) {

    try { // Variant 2 - FF, IE >= 9 and other browsers with DOMParser implementation

      var parser = new DOMParser();
      try {
        doc = parser.parseFromString(htmlString, 'text/html');
      } catch (ex) {
        // It is necessary to convert HTML to XHTML (XML) tags, because IE doesn't support text/html parsing
        var xhtmlString = htmlString.replace(/<((area|base|br|col|command|embed|hr|img|input|link|meta|param|source)[^>]*)>/gi, '<$1 />');

        doc = parser.parseFromString(xhtmlString, 'text/xml');
      }

    } catch (ex2) {

      try { // Variant 3 - IE < 9

        // It is necessary to convert HTML to XHTML (XML) tags, because IE doesn't support text/html parsing
        var xhtmlString = htmlString.replace(/<((area|base|br|col|command|embed|hr|img|input|link|meta|param|source)[^>]*)>/gi, '<$1 />');

        doc = new ActiveXObject("Microsoft.XMLDOM");
        doc.async = "false";
        doc.loadXML(xhtmlString);

      } catch (ex3) {
        throw new Error(AEd.I18n.t("Error_AEd_editors_Editor_Missing_HTML_DOM_parser")); // No parser found
      }

    }

  }

return doc;
}

// -------------------------------------------------------- Editor.parseTagValuesFromString
/**
 * Parses tag values, offsets, xpaths from string 
 *
 * @name parseTagValuesFromString
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {String} htmlString String contains html tags. 
 * @return {Array} tagValArr Tags inner values, xpaths, offsets array	 
 */

AEd.editors.Editor.prototype.parseTagValuesFromString = function(htmlString) {

  var tagValArray = [];

  var doc = this.createHtmlParser(htmlString);

  var iterator;

  iterator = document.createTreeWalker(doc.getElementsByTagName("html")[0], NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
  
  while (iterator.nextNode()){  // Loops through nodes and gets values

    if (iterator.currentNode && iterator.currentNode.nodeValue){    

      var content = this.specialHtmlCharacters.replaceSpecialCharacters(iterator.currentNode.nodeValue.toString());

      tagValArray.push({'content' : content, 'len' : this.getNodeContentLength(iterator.currentNode.nodeValue), 'offset' : this.getNodeOffset(iterator.currentNode), 'path' : AEd.XML.getElementWorkingDocXPath(iterator.currentNode), 'attrs' : (iterator.currentNode.attributes && iterator.currentNode.attributes.length) ? iterator.currentNode.attributes : ""});
    }

    else if (iterator.currentNode && !iterator.currentNode.nodeValue){
        
        if (iterator.currentNode.tagName && (iterator.currentNode.tagName.toLowerCase() != "head") && (iterator.currentNode.tagName.toLowerCase() != "body") && (iterator.currentNode.innerHTML == "")){

           tagValArray.push({'content' : "", 'len' : 0, 'offset' : this.getNodeOffset(iterator.currentNode), 'path' : AEd.XML.getElementWorkingDocXPath(iterator.currentNode), 'attrs' : (iterator.currentNode.attributes && iterator.currentNode.attributes.length) ? iterator.currentNode.attributes : ""});

        }
    }
  } 

return tagValArray;
}  

// -------------------------------------------------------- Editor.makeStringFromAttributes
/**
 * Returns string containing attributes : " attr1Name="value1" attr2Name="value2" ".
 *
 * @name makeStringFromAttributes
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Array} attr node attributes array. 
 * @return {String} retVal format : " attr1Name="value1" attr2Name="value2" ".	 
 */

AEd.editors.Editor.prototype.makeStringFromAttributes = function(attr) {

   if (attr){

      var retVal = "";

      for (var i = 0; i < attr.length; i++){  // Loops through attr array and makes string

          retVal = retVal + attr[i].nodeName + "=\"" + attr[i].nodeValue + "\" ";
      }

      return (" " + retVal + " ");

   }

return "";
}

// -------------------------------------------------------- Editor.detectChangedFragments
/**
 * Detects and returns changed document fragments.
 *
 * @name detectChangedFragments
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Array} prevF Previous document fragments. 
 * @param {Array} newF New document fragments.
 * @return {Array} changedF Changed document fragments.	 
 */

AEd.editors.Editor.prototype.detectChangedFragments = function(prevF, newF) {

  var changedF = [];
  var len = prevF.length >= newF.length ? prevF.length : newF.length;
  var tagName = ""; // Fixes bug with wrong xpath when you delete whole document and add empty and non empty paragraphs


  for (var i = 0; i < len; i++){

    if (!this.enterPressed && prevF[i] && newF[i] && ((prevF[i].path == newF[i].path) && (prevF[i].content != newF[i].content))){  // Fragment changed

        var truncatedPath = prevF[i].path.replace(/\/\w+\(\)$/, "");     

        if (prevF[i].path.match(/\/\w+\(\)(\[\d+\])?/) && prevF[i].path.match(/\/\w+\(\)(\[\d+\])?/)[0]){ // Fixes problem with multiple textnodes

          var truncatedPath = prevF[i].path; 
          var addContent = newF[i].content;  
       
          changedF.push({'path' : truncatedPath, 'offset' : "", 'len' : "", 'content' : addContent}); 
        }

        else {
    
          var truncatedPath = prevF[i].path.replace(/\/\w+\(\)(\[\d+\])?/, "");     

          var tagNameNew = newF[i].path.match(/\/(\w+)(\[\d+\])?\/\w+\(\)/)[1];

          if (tagNameNew != "br"){
          
             var addContent = "<" + tagNameNew + this.makeStringFromAttributes(newF[i].attrs) + ">" + newF[i].content + "<\/" + tagNameNew + ">";
        
             changedF.push({'path' : truncatedPath, 'offset' : "", 'len' : "", 'content' : addContent}); 
          }
        }

        
       
    }

    else if (!this.enterPressed && prevF[i] && newF[i] && (prevF[i].path != newF[i].path)){  // Fragment moved

      if (newF[i].content == "null"){ // Remove whole document content -> problem with body tag content. <body><body> innerHTML is "null" (String)
                                                                       // instead of null 
        var delPath = prevF[i].path.replace(/\/\w+\(\)$/, "");
        changedF.push({'path' : delPath, 'offset' : "", 'len' : "", 'content' : ""});
      }

      else if ((newF[i].path.match(/\/(\w+)(\[\d+\])?\/\w+\(\)$/) && newF[i].path.match(/\/(\w+)(\[\d+\])?\/\w+\(\)$/)[1]) || (newF[i].path.match(/\/(\w+)(\[\d+\])?$/) && newF[i].path.match(/\/(\w+)(\[\d+\])?$/)[1])){ // Replace fragment
       
        var bodyTag = ""; 
        var endBodyTag = "";
        var truncatedPath = prevF[i].path.replace(/\/\w+\(\)(\[\d+\])?$/, "");

        if (truncatedPath.match(/\/body$/)){ // Replace whole document body

          bodyTag = "<body>"; 
          endBodyTag = "</body>";  
        }       

        var tagNameNew;

        if (newF[i].path.match(/\/(\w+)(\[\d+\])?\/\w+\(\)$/) && newF[i].path.match(/\/(\w+)(\[\d+\])?\/\w+\(\)$/)[1]){
 
           tagNameNew = newF[i].path.match(/\/(\w+)(\[\d+\])?\/\w+\(\)$/)[1];
        }

        else if (newF[i].path.match(/\/(\w+)(\[\d+\])?$/) && newF[i].path.match(/\/(\w+)(\[\d+\])?$/)[1]) {

           tagNameNew = newF[i].path.match(/\/(\w+)(\[\d+\])?$/)[1];
        }

        var addContent = bodyTag + "<" + tagNameNew + this.makeStringFromAttributes(newF[i].attrs) + ">" + newF[i].content + "<\/" + tagNameNew + ">" + endBodyTag;
        
        tagName = tagNameNew;

        if (addContent){

           if (tagNameNew != "br"){ // Fix for unpair <br> tag

              changedF.push({'path' : truncatedPath, 'offset' : "", 'len' : "", 'content' : addContent});   
           }
        }
      }
         
    }

    else if (this.enterPressed || (!prevF[i] && newF[i])) {  // Add fragment - replace the whole document body (due to problems with copy-pasted nested nodes e.g <ul><li></li></ul>
        changedF = new Array();  // Clear previous detections
        changedF.push({'path' : "/html/body", 'offset' : "", 'len' : "", 'content' : "<body>" + this.wysiwyg.getOrigDocContent() + "<\/body>"});
        break; // no more detection is needed -> whole document body will be replaced
    }

    else if (!newF[i] && prevF[i]) { // Remove fragment(s)

        changedF = new Array();  // Clear previous detections
        changedF.push({'path' : "/html/body", 'offset' : "", 'len' : "", 'content' : "<body>" + (this.wysiwyg.getOrigDocContent() ? this.wysiwyg.getOrigDocContent() : "") + "<\/body>"});
        break; // no more detection is needed -> whole document body will be replaced
     
    }
    
  }

return changedF;
}

// -------------------------------------------------------- Editor.getNodeContentLength
/**
 * Gets length of node content (corrects exceptions like &nbsp; character) 
 *
 * @name getNodeContentLength
 * @memberOf AEd.editors.getNodeContentLength
 * @function   
 * @param {Node.nodeValue} nodeContent Content of the Node
 * @returns {Number} lengthCorrection Node content length
 */

AEd.editors.Editor.prototype.getNodeContentLength = function(nodeContent){

  var lengthCorrection = 0;
  var content = nodeContent ? nodeContent.toString() : 0;
  var character = "";

  for (var i = 0; i < content.length; i++){  // Loops through the whole node content and finds special characters
  
     character = this.specialHtmlCharacters.isSpecialCharacter(content.charCodeAt(i));

     if (character){  // Special character occurrence

        lengthCorrection += character.len;
     }

     else {

        lengthCorrection++; 
     }     
  }


return lengthCorrection; 
}

// -------------------------------------------------------- Editor.getNodeOffset
/**
 * Gets offset of text that is before "node" node. Code from Firefox annotation extension http://knot09.fit.vutbr.cz/annotations/firefox-extension/ 
 *
 * @name getNodeOffset
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Node.TEXT_NODE} node First node type Text in range
 * @returns {Int} Text offset 
 */

AEd.editors.Editor.prototype.getNodeOffset = function(node)
{
    var nodeCopy = node;
    var parentNode = node.parentNode;
    var sibling = node.previousSibling;
    var character = "";
    
    var offsetCorrection = 0;
    var stop = false;
    
    while (!stop)
    {          
      if (sibling == null && nodeCopy.parentNode && this.isAnnotationNode(nodeCopy.parentNode)) 
      {
        nodeCopy = nodeCopy.parentNode;
        sibling = nodeCopy.previousSibling;
      }
      else if (sibling == null)
      {
        stop = true;
      }
      else if (sibling.nodeType == window.Node.TEXT_NODE) 
      {
        
        for (var i = 0; i < sibling.nodeValue.length; i++){  // Added by Milos Cudrak

          character = this.specialHtmlCharacters.isSpecialCharacter(sibling.nodeValue.charCodeAt(i));

          if (character){ // Special character occurence

            offsetCorrection += character.len;
          }

          else {

            offsetCorrection++; 
          }
        }     // Added by Milos Cudrak end
       
        nodeCopy = sibling;
        sibling = sibling.previousSibling;
      }
      else if(this.isAnnotationNode(sibling))
      {
        offsetCorrection += this.getAnnotatedTextLength(sibling);
        nodeCopy = sibling;
        sibling = sibling.previousSibling;
      }
      else
      {
        stop = true;
      }
    }
    
    return offsetCorrection;
}
   


// -------------------------------------------------------- Editor.isAnnotationNode
/**
 * Checks if node is annotation node. Code from Firefox annotation extension http://knot09.fit.vutbr.cz/annotations/firefox-extension/ 
 *
 * @name isAnnotationNode
 * @memberOf AEd.editors.Editor
 * @function   
 * @param {Node} node to test
 * @returns {bool} true, if node is ELEMENT_NODE and has annotation node class. Else false
 */
AEd.editors.Editor.prototype.isAnnotationNode = function(node)
{
  
   var ANNOTATION_NODE_CLASS = AEd.CONFIG.CLASS_ANNOTATION;

    if (node &&
        node.nodeType == window.Node.ELEMENT_NODE &&  
        node.className != undefined &&
        node.className != null &&
        node.className == ANNOTATION_NODE_CLASS)
    {
      return true;
    }
    else
    {
      return false;
    }
}

// -------------------------------------------------------- Editor.refreshToolbarButtons
/**
 * Refreshes toolbar buttons (hides or shows) when user change advanced toolbar settings 
 *
 * @name refreshToolbarButtons
 * @memberOf AEd.editors.Editor
 */


AEd.editors.Editor.prototype.refreshToolbarButtons = function(){

    // toolbar or advanced toolbar (1 or 2)
    if (AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 0 || AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 1)
        this.gui.toolbars.btnDocAnnotations = this.gui.toolbar.btnDocAnnotations;    
    else if (AEd.CONFIG.DISPLAY_BTNDOCANNOTATIONS == 2)
        this.gui.toolbars.btnDocAnnotations = this.gui.advancedToolbar.btnDocAnnotations;    
    if (AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 0 || AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 1)
        this.gui.toolbars.btnQuickSuggestions = this.gui.toolbar.btnQuickSuggestions;    
    else if (AEd.CONFIG.DISPLAY_BTNQUICKSUGGESTIONS == 2)
        this.gui.toolbars.btnQuickSuggestions = this.gui.advancedToolbar.btnQuickSuggestions;    
    if (AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 0 || AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 1)
        this.gui.toolbars.btnSuggestAnnotations = this.gui.toolbar.btnSuggestAnnotations;    
    else if (AEd.CONFIG.DISPLAY_BTNSUGGESTANNOTATIONS == 2)
        this.gui.toolbars.btnSuggestAnnotations = this.gui.advancedToolbar.btnSuggestAnnotations;    
    if (AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 0 || AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 1)
        this.gui.toolbars.btnSuggestedAnnotations = this.gui.toolbar.btnSuggestedAnnotations;    
    else if (AEd.CONFIG.DISPLAY_BTNSUGGESTEDANNOTATIONS == 2)
        this.gui.toolbars.btnSuggestedAnnotations = this.gui.advancedToolbar.btnSuggestedAnnotations;    
    if (AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 0 || AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 1)
        this.gui.toolbars.btnDocSuggestions = this.gui.toolbar.btnDocSuggestions;    
    else if (AEd.CONFIG.DISPLAY_BTNDOCSUGGESTIONS == 2)
        this.gui.toolbars.btnDocSuggestions = this.gui.advancedToolbar.btnDocSuggestions;    
    if (AEd.CONFIG.DISPLAY_BTNPERSONS == 0 || AEd.CONFIG.DISPLAY_BTNPERSONS == 1)
        this.gui.toolbars.btnPersons = this.gui.toolbar.btnPersons;    
    else if (AEd.CONFIG.DISPLAY_BTNPERSONS == 2)
        this.gui.toolbars.btnPersons = this.gui.advancedToolbar.btnPersons;    
    if (AEd.CONFIG.DISPLAY_BTNGROUPS == 0 || AEd.CONFIG.DISPLAY_BTNGROUPS == 1)
        this.gui.toolbars.btnGroups = this.gui.toolbar.btnGroups;    
    else if (AEd.CONFIG.DISPLAY_BTNGROUPS == 2)
        this.gui.toolbars.btnGroups = this.gui.advancedToolbar.btnGroups;    
    if (AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 0 || AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 1)
        this.gui.toolbars.btnSubscriptions = this.gui.toolbar.btnSubscriptions;    
    else if (AEd.CONFIG.DISPLAY_BTNSUBSCRIPTIONS == 2)
        this.gui.toolbars.btnSubscriptions = this.gui.advancedToolbar.btnSubscriptions;    
    if (AEd.CONFIG.DISPLAY_BTNSETTINGS == 0 || AEd.CONFIG.DISPLAY_BTNSETTINGS == 1)
        this.gui.toolbars.btnSettings = this.gui.toolbar.btnSettings;    
    else if (AEd.CONFIG.DISPLAY_BTNSETTINGS == 2)
        this.gui.toolbars.btnSettings = this.gui.advancedToolbar.btnSettings;    
    if (AEd.CONFIG.DISPLAY_BTNSTATUSBAR == 0 || AEd.CONFIG.DISPLAY_BTNSTATUSBAR == 1)
        this.gui.toolbars.btnStatusBar = this.gui.toolbar.btnStatusBar;    
    else if (AEd.CONFIG.DISPLAY_BTNSTATUSBAR == 2)
        this.gui.toolbars.btnStatusBar = this.gui.advancedToolbar.btnStatusBar;    
    if (AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 0 || AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 1)
        this.gui.toolbars.btnShowAnnoDlgs = this.gui.toolbar.btnShowAnnoDlgs;    
    else if (AEd.CONFIG.DISPLAY_BTNSHOWANNODLGS == 2)
        this.gui.toolbars.btnShowAnnoDlgs = this.gui.advancedToolbar.btnShowAnnoDlgs;



}

// -------------------------------------------------------- Editor.filterSimpleTypes
/**
 * Gets filtered simple types.
 *
 * @name filterSimpleTypes
 * @memberOf AEd.editors.Editor
 * @function
 * @param {String} filter filter text
 * @return {Array} filtered simple types array
 */
AEd.editors.Editor.prototype.filterSimpleTypes = function(filter){

    var types = [];
    for (var i = 0; i < this.simpleTypes.length; i++)
    {
        var type = this.simpleTypes[i].assignedObject;
        var path = type.path.toLowerCase();

        if(path.search(filter) >= 0)
        {
             type.text = type.path + " (Simple)";
             types.push(type);
        }
    }
return types;
}
  
      
// -------------------------------------------------------- Editor.filterStructuredTypes
/**
 * Gets filtered structured types.
 *
 * @name filterStructuredTypes
 * @memberOf AEd.editors.Editor
 * @function
 * @param {String} filter filter text
 * @return {Array} filtered structured types array
 */
AEd.editors.Editor.prototype.filterStructuredTypes = function(filter){

    var types = [];
    for (var i = 0; i < this.types.types.length; i++)
    {
        var type = this.types.types[i];
        var path = type.path.toLowerCase();
        if(path.search(filter) >= 0)
        {
             type.text = type.path;
             types.push(type);
        }
    }
return types;
}

// *****************************************************************************
// class AEd.editors.Editor 
// ***************************************************************************** 

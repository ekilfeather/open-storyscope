/**
 * Config.js
 *
 * Contains AEd.editors.EditorsManager configuration object.
 *  
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak 
 * 
 */ 
  
// *****************************************************************************
// Configuration object
// ***************************************************************************** 

AEd.CONFIG = {

  // Default server uri
  DEFAULT_SERVER_URI: "http://decipher-sec.ssl.co.uk:8080/Annotations",
  // Default server uri suffix
  DEFAULT_SERVER_URI_SUFFIX: "/AnnotEditorsComet",
  // Default user name
  DEFAULT_USER_NAME: "idytrych",
  // Default user password
  DEFAULT_USER_PASSWORD: "test",
  // Default language name.  
  DEFAULT_LANG: "eng",
  // Default advanced toolbar.
  DEFAULT_ADV_TOOLBAR: "TwoToolbars",
  // Default theme name.  
  DEFAULT_THEME: "decipher",
  // Default settings - suggestion confidence
  DEFAULT_SETTINGS_SUGGESTION_CONFIDENCE: "5",
  // Default settings - suggestion auto confirming - 0 = off
  DEFAULT_SETTINGS_SUGGESTION_AUTO_CONFIRMING: "0",
  // Default settings - server language
  DEFAULT_SETTINGS_SERVER_LANGUAGE: "eng",
  // Proxy server settings
  PROXY_SERVER_USE : true,
  // Proxy server address
  PROXY_SERVER_ADDRESS : "4ATinyMCEProxy.php",
  // Path to AEd
  AED_PATH : "",
  // How many directories should be searched to locate the right PATH
  AED_MAX_LOOP : 10,
  // Base address of AEd stylesheets used in dialogs
  AED_BASE_DLG_CSS_ADDRESS : "../",
  // Type of authentication (0 - internal, 1 - external)
  AED_AUTH_TYPE : 1,
  // Maximum message count in status bar
  MAX_MSGS_IN_STATUS_BAR : 50,
  
  // ---------------------------------------------------------------------
  // USER SETTINGS
  // ---------------------------------------------------------------------
                            
  DEFAULT_WARNING_COLOR:           "#d23232",
  DEFAULT_TYPE_URN_PREFIX:         "types/",
  NODE_NAME_ANNOTATION:            "SPAN",
  DEFAULT_TYPE_BACKGROUND_COLOR:   "rgba(160,160,160,1)",   // Copy as the first value to DEFAULT_TYPE_COLOR
  DEFAULT_TYPE_FONT_COLOR:         "rgba(0,0,0,1)",         // Copy as the second value to DEFAULT_TYPE_COLOR
  DEFAULT_TYPE_COLOR:              "rgba(160,160,160,1);rgba(0,0,0,1);false;false;false",
  DEFAULT_TREE_NODE_COLOR:         "rgba(255,255,255,1);rgba(0,0,0,1);false;false;false",                
  DEFAULT_ANNOTATIONS_LINK_BORDER: "3px dashed #000000",
  DEFAULT_SUGGESTIONS_BORDER:      "3px dashed #B91B20",
  
  // if number of annotations < document length / AUTO_QUICK_SUGG_LETTERS_TO_ONE_SUGG,
  // then quick suggestion is auto activate after connect
  AUTO_QUICK_SUGG_LETTERS_TO_ONE_SUGG: 200, 
  
  // ---------------------------------------------------------------------
  // DISPLAY BUTTONS (0 - hide, 1 - toolbar, 2 advanced toolbar)
  // ---------------------------------------------------------------------
  // button Conect (can not be modified - always 1)
  // button Annotate (can not be modified - always 1)
  DISPLAY_BTNADVANCED : 1, // button Advanced (0 or 1 only)
  DISPLAY_BTNDOCANNOTATIONS : 2, // button Document Annotations
  DISPLAY_BTNQUICKSUGGESTIONS : 2, // button Quick Suggestions
  DISPLAY_BTNSUGGESTANNOTATIONS : 2, // button Suggest Annotations
  DISPLAY_BTNSUGGESTEDANNOTATIONS : 2, // button Suggested Annotations
  DISPLAY_BTNDOCSUGGESTIONS : 2, // Document Suggestions 
  DISPLAY_BTNPERSONS : 2, // button Persons
  DISPLAY_BTNGROUPS : 2, // button Groups
  DISPLAY_BTNSUBSCRIPTIONS : 2, // button Subscriptions
  DISPLAY_BTNSETTINGS : 2, // button Settings
  DISPLAY_BTNSTATUSBAR : 2, // button Status Bar
  DISPLAY_BTNSHOWANNODLGS : 2, // button Annotation Dialogs
  DISPLAY_BTNDISCONNECT : 1, // button Disconnect (0 or 1 only, applied only when AED_AUTH_TYPE == 0)
  
  // ---------------------------------------------------------------------
  // RESOURCE
  // ---------------------------------------------------------------------
      
  RESOURCE_PREFIX : "<html><head></head><body>",
  RESOURCE_SUFFIX : "</body></html>",
    
  // ---------------------------------------------------------------------
  // UI DEFAULT VALUES
  // ---------------------------------------------------------------------
    
  TOOLBAR_WIDTH               : 250,
  TOOLBAR_HEIGHT              : 45,
  TOOLBAR_MIN_WIDTH           : 250,
  TOOLBAR_MIN_HEIGHT          : 45,
  TOOLBAR_MAX_WIDTH           : 450,
  TOOLBAR_MAX_HEIGHT          : 145,
  TOOLBAR_INIT_POS_X          : 270,
  TOOLBAR_INIT_POS_Y          : 10,   
  
  ADVANCED_TOOLBAR_WIDTH               : 690,
  ADVANCED_TOOLBAR_HEIGHT              : 70,
  ADVANCED_TOOLBAR_MIN_WIDTH           : 690,
  ADVANCED_TOOLBAR_MIN_HEIGHT          : 70,
  ADVANCED_TOOLBAR_MAX_WIDTH           : 880,
  ADVANCED_TOOLBAR_MAX_HEIGHT          : 170,
  ADVANCED_TOOLBAR_INIT_POS_X          : 270,
  ADVANCED_TOOLBAR_INIT_POS_Y          : 90,
  
  DLG_STATUSBAR_WIDTH         : 250,
  DLG_STATUSBAR_HEIGHT        : 380,
  DLG_STATUSBAR_MIN_WIDTH     : 150,
  DLG_STATUSBAR_MIN_HEIGHT    : 150,
  DLG_STATUSBAR_MAX_WIDTH     : 800,
  DLG_STATUSBAR_MAX_HEIGHT    : 580,
  DLG_STATUSBAR_INIT_POS_X    : 10,
  DLG_STATUSBAR_INIT_POS_Y    : 10,        
  
  DLG_CONNECT_WIDTH           : 400,
  DLG_CONNECT_HEIGHT          : 150,
  DLG_CONNECT_MIN_WIDTH       : 400,
  DLG_CONNECT_MIN_HEIGHT      : 180,
  DLG_CONNECT_MAX_WIDTH       : 800,
  DLG_CONNECT_MAX_HEIGHT      : 580,
  DLG_CONNECT_PATH            : "lib/AEd/dialogs/connect.html",
  DLG_CONNECT_ID_SERVER       : "aedServer",
  DLG_CONNECT_ID_USER         : "aedUser",
  DLG_CONNECT_ID_PASSWORD     : "aedPassword",    
   
  DLG_SETTINGS_WIDTH          : 680,
  DLG_SETTINGS_HEIGHT         : 360,
  DLG_SETTINGS_PATH           : "lib/AEd/dialogs/settings.html",
  
  DLG_SETTINGS_ID_TREE_WRAPPER : "aedSettingsTreeWrapper",
  DLG_SETTINGS_ID_SETTINGS_FIELDSET : "aedSettingsFieldsetSettings",
  DLG_SETTINGS_ID_CLIENT_FIELDSET : "aedSettingsFieldsetClient",
  DLG_SETTINGS_ID_SERVER_FIELDSET : "aedSettingsFieldsetServer",
  DLG_SETTINGS_ID_COMMON_FIELDSET : "aedSettingsFieldsetCommon",
  DLG_SETTINGS_ID_USUBSCRIPTIONS_FIELDSET : "aedSettingsFieldset(Un)subscriptions",
  DLG_SETTINGS_ID_SUBSCRIPTIONS_FIELDSET : "aedSettingsFieldsetSubscriptions",
  DLG_SETTINGS_ID_UNSUBSCRIPTIONS_FIELDSET : "aedSettingsFieldsetUnsubscriptions",
  DLG_SETTINGS_ID_SUBSCRIPTIONS_INPUT : "aedSettingsSubscriptionsValue",
  DLG_SETTINGS_ID_UNSUBSCRIPTIONS_INPUT : "aedSettingsUnsubscriptionsValue",
  DLG_SETTINGS_ID_UNKNOWN_FIELDSET : "aedSettingsFieldsetUnknown",
  DLG_SETTINGS_ID_UNKNOWN_TABLE_HEADER : "aedSettingsUnknownTableHeader",
  DLG_SETTINGS_ID_UNKNOWN_TABLE : "aedSettingsUnknownTable",
  DLG_SETTINGS_ID_UNKNOWN_BTN_ADD : "aedSettingsUnknownBtnAdd",
  DLG_SETTINGS_ID_CLIENT_ANNOTATION_TYPE_COLOR_FIELDSET : "aedSettingsFieldsetClientAnnotationTypeColor",
  DLG_SETTINGS_ID_CLIENT_ANNOTATION_TYPE_COLOR_TABLE_HEADER : "aedSettingsClientAnnotationTypeColorTableHeader",
  DLG_SETTINGS_ID_CLIENT_ANNOTATION_TYPE_COLOR_TABLE : "aedSettingsClientAnnotationTypeColorTable",
  DLG_SETTINGS_ID_CLIENT_ANNOTATION_TYPE_COLOR_BTN_ADD : "aedSettingsClientAnnotationTypeColorBtnAdd",
  DLG_SETTINGS_ID_CLIENT_ADVANCED_TOOLBAR_OPTIONS_FIELDSET   : "aedSettingsFieldsetClientAdvancedToolbarOptions",
  DLG_SETTINGS_ID_CLIENT_ADVANCED_TOOLBAR_OPTIONS_WRAPPER   : "aedSettingsClientAdvancedToolbarOptionsWrapper",
  DLG_SETTINGS_ID_CLIENT_ADVANCED_TOOLBAR_OPTIONS_ALL_IN_ONE  : "aedSettingsClientAdvancedToolbarOptionsAllinOneValue",
  DLG_SETTINGS_ID_CLIENT_ADVANCED_TOOLBAR_OPTIONS_TWO_TOOLBARS  : "aedSettingsClientAdvancedToolbarOptionsTwoToolbarsValue",
  DLG_SETTINGS_ID_CLIENT_REFUSE_SUGGESTION_FIELDSET : "aedSettingsFieldsetClientRefuseSuggestion",
  DLG_SETTINGS_ID_CLIENT_REFUSE_SUGGESTION_WRAPPER : "aedSettingsClientRefuseSuggestionWrapper",
  DLG_SETTINGS_ID_CLIENT_REFUSE_SUGGESTION_CHECKBOX : "aedSettingsClientRefuseSuggestionValue",
  DLG_SETTINGS_ID_CLIENT_SUGGESTION_CONFIDENCE_FIELDSET : "aedSettingsFieldsetClientSuggestionConfidence",
  DLG_SETTINGS_ID_CLIENT_SUGGESTION_CONFIDENCE_VALUE : "aedSettingsClientSuggestionConfidenceValue",
  DLG_SETTINGS_ID_CLIENT_SUGGESTION_AUTO_CONFIRMING_FIELDSET : "aedSettingsFieldsetClientSuggestionAutoConfirming",
  DLG_SETTINGS_ID_CLIENT_SUGGESTION_AUTO_CONFIRMING_VALUE : "aedSettingsClientSuggestionAutoConfirmingValue",
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_FIELDSET : "aedSettingsFieldsetClientFoldingOfAttributes",
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_WRAPPER : "aedSettingsClientFoldingOfAttributesWrapper",
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_CHECKBOX : "aedSettingsClientFoldingOfAttributesValue",    
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_RESIZE_WRAPPER : "aedSettingsClientFoldingOfAttributesResizeWrapper",
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_RESIZE_CHECKBOX : "aedSettingsClientFoldingOfAttributesResizeValue",
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_HIDE_BUTTON_WRAPPER : "aedSettingsClientFoldingOfAttributesHideButtonWrapper",
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_ATTRIBUTES_HIDE_BUTTON_CHECKBOX : "aedSettingsClientFoldingOfAttributesHideButtonValue",
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_NESTEDS_WRAPPER : "aedSettingsClientFoldingOfNestedsWrapper",
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_NESTEDS_CHECKBOX : "aedSettingsClientFoldingOfNestedsValue",
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_NESTEDS_HIDE_BUTTON_WRAPPER : "aedSettingsClientFoldingOfNestedsHideButtonWrapper",
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_NESTEDS_HIDE_BUTTON_CHECKBOX : "aedSettingsClientFoldingOfNestedsHideButtonValue",
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_NESTEDS_LEVELS_VALUE : "aedSettingsClientFoldingOfNestedsLevels",
  DLG_SETTINGS_ID_CLIENT_FOLDING_OF_NESTEDS_HIDE_LEVEL_VALUE : "aedSettingsClientFoldingOfNestedsHideLevel",
  DLG_SETTINGS_ID_SERVER_LANGUAGE_FIELDSET : "aedSettingsFieldsetServerLanguage",
  DLG_SETTINGS_ID_SERVER_LANGUAGE_VALUE  : "aedSettingsServerLanguageValue",
  DLG_SETTINGS_ID_DEFAULT_USER_GROUP_FIELDSET : "aedSettingsFieldsetDefaultUserGroup",
  DLG_SETTINGS_ID_DEFAULT_USER_GROUP_VALUE : "aedSettingsDefaultUserGroupValue",
                            
  DLG_ANNOTATE_WIDTH          : 650,
  DLG_ANNOTATE_HEIGHT         : 390,  
  DLG_ANNOTATE_PATH           : "lib/AEd/dialogs/annotate.html",  

  DLG_ATTR_FROM_ONTOLOGY_WIDTH              : 500,
  DLG_ATTR_FROM_ONTOLOGY_HEIGHT             : 250,
  DLG_ATTR_FROM_ONTOLOGY_ID_TREE_WRAPPER    : "aedAttrTypesFromOntologyTreeWrapper",
  DLG_ATTR_FROM_ONTOLOGY_PATH           : "lib/AEd/dialogs/attrfromontology.html",   
  
  // fieldset Annotation           
  DLG_ANNOTATE_ID_ANNOTATION_FIELDSET : "aedAnnotateFieldsetAnnotation", 
  DLG_ANNOTATE_ID_TREE_WRAPPER : "aedAnnotateTreeWrapper",  
  DLG_ANNOTATE_ID_BTN_ADD_ATTRIBUTE  : "aedAnnotateBtnAddAttribute",
  DLG_ANNOTATE_ID_BTN_DELETE_ATTRIBUTE  : "aedAnnotateBtnDeleteAttribute", 
  DLG_ANNOTATE_ID_BTN_CLEAR_ATTRIBUTE   : "aedAnnotateBtnClearAttribute",
  DLG_ANNOTATE_ID_BTN_ENTITY  : "aedAnnotateBtnEntity", 
  DLG_ANNOTATE_ID_BTN_ADD_ATTRIBUTES_FROM_ONTOLOGY  : "aedAnnotateBtnAddAttributesFromOntology",  
  DLG_ANNOTATE_ID_BTN_BROWSE  : "aedAnnotateBtnBrowse",
  DLG_ANNOTATE_ID_SELECTION   : "aedSelection",
  DLG_ANNOTATE_ID_TYPE        : "aedType",
  DLG_ANNOTATE_ID_CONTENT     : "aedContent",   
  DLG_ANNOTATE_ID_SUGGESTIONS : "aedSuggestions",   
  DLG_ANNOTATE_ID_BTN_WHOLE_DOC : "aedBtnWholeDoc",
  
  // fieldset Simple         
  DLG_ANNOTATE_ID_SIMPLE_FIELDSET  : "aedAnnotateFieldsetSimple",    
  DLG_ANNOTATE_ID_SIMPLE_TYPE      : "aedSimpleType",
  DLG_ANNOTATE_ID_SIMPLE_VALUE_LABEL     : "aedSimpleValueLabel",  
  DLG_ANNOTATE_ID_SIMPLE_TEXT_VALUE_LABEL     : "aedSimpleTextValueLabel",
  DLG_ANNOTATE_ID_SIMPLE_BINARY_VALUE_LABEL     : "aedSimpleBinaryValueLabel", 
  DLG_ANNOTATE_ID_SIMPLE_VALUE     : "aedSimpleValue",  
  DLG_ANNOTATE_ID_SIMPLE_TEXT_VALUE     : "aedSimpleTextValue", 
  DLG_ANNOTATE_ID_SIMPLE_BINARY_VALUE     : "aedSimpleBinaryValue", 
  DLG_ANNOTATE_ID_SIMPLE_BTN_BROWSE: "aedSimpleBtnBrowse",    
  DLG_ANNOTATE_ID_SIMPLE_BTN_BINARY_BROWSE: "aedSimpleBtnBinaryBrowse",  
  DLG_ANNOTATE_ID_SIMPLE_BTN_DOWNLOAD_BINARY: "aedSimpleBtnDownloadBinary", 
  DLG_ANNOTATE_ID_SIMPLE_SUGGESTIONS : "aedSimpleSuggestions",  
  DLG_ANNOTATE_ID_SIMPLE_CHECKBOX_ADDTOTYPEATTR : "aedAddToTypeAttributesSimple",
  DLG_ANNOTATE_ID_SIMPLE_ADDTOTYPEATTR_SPAN : "edAddToTypeAttributesSimpleSpan",
  DLG_ANNOTATE_ID_SIMPLE_ADDTOTYPEATTR_WRAPPER : "aedAddToTypeAttributesWrapperSimple",    
  DLG_ANNOTATE_ID_SIMPLE_CHECKBOX_REQUIRED : "aedRequiredSimple",    
  DLG_ANNOTATE_ID_SIMPLE_REQUIRED_WRAPPER : "aedRequiredWrapperSimple",
  DLG_ANNOTATE_ID_SIMPLE_BTN_PICKER : "aedSimpleBtnPicker",
  DLG_ANNOTATE_ID_SIMPLE_BTN_DURATION_PICKER : "aedSimpleBtnDurationPicker",
  
  // fieldset Geo Point  
  DLG_ANNOTATE_ID_GEOPOINT_FIELDSET  : "aedAnnotateFieldsetGeoPoint",    
  DLG_ANNOTATE_ID_GEOPOINT_TYPE      : "aedGeoPointType",
  DLG_ANNOTATE_ID_GEOPOINT_LAT       : "aedGeoPointLat", 
  DLG_ANNOTATE_ID_GEOPOINT_LONG      : "aedGeoPointLong",  
  DLG_ANNOTATE_ID_GEOPOINT_BTN_BROWSE  : "aedGeoPointBrowse",  
  DLG_ANNOTATE_ID_GEOPOINT_SUGGESTIONS : "aedGeoPointSuggestions",         
  DLG_ANNOTATE_ID_GEOPOINT_CHECKBOX_ADDTOTYPEATTR : "aedAddToTypeAttributesGeoPoint",
  DLG_ANNOTATE_ID_GEOPOINT_ADDTOTYPEATTR_SPAN : "edAddToTypeAttributesGeoPointSpan",
  DLG_ANNOTATE_ID_GEOPOINT_ADDTOTYPEATTR_WRAPPER : "aedAddToTypeAttributesWrapperGeoPoint",    
  DLG_ANNOTATE_ID_GEOPOINT_CHECKBOX_REQUIRED : "aedRequiredGeoPoint",    
  DLG_ANNOTATE_ID_GEOPOINT_REQUIRED_WRAPPER : "aedRequiredWrapperGeoPoint",
  
  // fieldset Entity
  DLG_ANNOTATE_ID_ENTITY_FIELDSET  : "aedAnnotateFieldsetEntity",    
  DLG_ANNOTATE_ID_ENTITY_TYPE      : "aedEntityType",
  DLG_ANNOTATE_ID_ENTITY_VALUE_TYPE      : "aedEntityValueType",
  DLG_ANNOTATE_ID_ENTITY_NAME      : "aedEntityName",
  DLG_ANNOTATE_ID_ENTITY_DESCRIPTION : "aedEntityDescription",
  DLG_ANNOTATE_ID_ENTITY_IMAGE : "aedEntityImage",
  DLG_ANNOTATE_ID_ENTITY_BTN_BROWSE  : "aedEntityBrowse",  
  DLG_ANNOTATE_ID_ENTITY_SUGGESTIONS : "aedEntitySuggestions",       
  DLG_ANNOTATE_ID_ENTITY_VALUE_BTN_BROWSE  : "aedEntityValueBrowse",  
  DLG_ANNOTATE_ID_ENTITY_VALUE_SUGGESTIONS : "aedEntityValueSuggestions",   
  DLG_ANNOTATE_ID_ENTITY_NAME_SUGGESTIONS : "aedEntityNameSuggestions",
  DLG_ANNOTATE_CLASS_ENTITY_NAME_AUTOCOMPLETER : "aedEntityNameAutocompleter", 
  DLG_ANNOTATE_ID_ENTITY_CHECKBOX_ADDTOTYPEATTR : "aedAddToTypeAttributesEntity",
  DLG_ANNOTATE_ID_ENTITY_ADDTOTYPEATTR_SPAN : "edAddToTypeAttributesEntitySpan",
  DLG_ANNOTATE_ID_ENTITY_ADDTOTYPEATTR_WRAPPER : "aedAddToTypeAttributesWrapperEntity",    
  DLG_ANNOTATE_ID_ENTITY_CHECKBOX_REQUIRED : "aedRequiredEntity",    
  DLG_ANNOTATE_ID_ENTITY_REQUIRED_WRAPPER : "aedRequiredWrapperEntity",
  
  // fieldset Nested Annotation  
  DLG_ANNOTATE_ID_NESTED_FIELDSET   : "aedAnnotateFieldsetNestedAnnotation",    
  DLG_ANNOTATE_ID_NESTED_TYPE       : "aedNestedAnnotationType",
  DLG_ANNOTATE_ID_NESTED_SELECTION  : "aedNestedAnnotationSelection",
  DLG_ANNOTATE_ID_NESTED_CONTENT_WRAPPER : "aedNestedAnnotationContentWrapper", 
  DLG_ANNOTATE_ID_NESTED_CONTENT    : "aedNestedAnnotationContent", 
  DLG_ANNOTATE_ID_NESTED_BTN_BROWSE : "aedNestedAnnotationBrowse",  
  DLG_ANNOTATE_ID_NESTED_BTN_SELECT : "aedNestedAnnotationBtnSelect",
  DLG_ANNOTATE_ID_NESTED_LIST       : "aedNestedAnnotationList",
  DLG_ANNOTATE_ID_NESTED_BTN_PREVIOUS : "aedNestedAnnotationBtnPrevious",
  DLG_ANNOTATE_ID_NESTED_BTN_NEXT     : "aedNestedAnnotationBtnNext",
  DLG_ANNOTATE_ID_NESTED_BTN_ADD      : "aedNestedAnnotationBtnAdd",
  DLG_ANNOTATE_ID_NESTED_BTN_DELETE   : "aedNestedAnnotationBtnDelete",     
  DLG_ANNOTATE_ID_NESTED_SUGGESTIONS  : "aedNestedAnnotationSuggestions",  
  DLG_ANNOTATE_ID_NESTED_BTN_WHOLE_DOC : "aedNestedAnnotationBtnWholeDoc",
  DLG_ANNOTATE_ID_NESTED_CHECKBOX_ADDTOTYPEATTR : "aedAddToTypeAttributesNested",
  DLG_ANNOTATE_ID_NESTED_ADDTOTYPEATTR_SPAN : "edAddToTypeAttributesNestedSpan",
  DLG_ANNOTATE_ID_NESTED_ADDTOTYPEATTR_WRAPPER : "aedAddToTypeAttributesWrapperNested",    
  DLG_ANNOTATE_ID_NESTED_CHECKBOX_REQUIRED : "aedRequiredNested",    
  DLG_ANNOTATE_ID_NESTED_REQUIRED_WRAPPER : "aedRequiredWrapperNested",   
  
  DLG_PERSONS_WIDTH          : 600,
  DLG_PERSONS_HEIGHT         : 330,
  DLG_PERSONS_PATH           : "lib/AEd/dialogs/persons.html",
  DLG_PERSONS_ID_CONTAINER   : "aedPersonsContainer",  
  DLG_PERSONS_ID_BTN_FILTER  : "aedPersonsBtnFilter",               
  DLG_PERSONS_ID_INPUT_SEARCH: "aedPersonsSearch",    
  
  DLG_GROUPS_WIDTH          : 600,
  DLG_GROUPS_HEIGHT         : 330,
  DLG_GROUPS_PATH           : "lib/AEd/dialogs/groups.html",
  DLG_GROUPS_ID_CONTAINER   : "aedGroupsContainer",  
  DLG_GROUPS_ID_BTN_FILTER  : "aedGroupsBtnFilter",               
  DLG_GROUPS_ID_INPUT_SEARCH: "aedGroupsSearch",  
  
  DLG_FRAGMENT_WIDTH          : 400,
  DLG_FRAGMENT_HEIGHT         : 100,
  DLG_FRAGMENT_WIDTH_NOT_FOLD : 400,
  DLG_FRAGMENT_HEIGHT_NOT_FOLD : 200,
  DLG_FRAGMENT_IMAGE_ATTR_STYLE_HEIGHT : "height='50px'",
  DLG_FRAGMENT_IMAGE_ATTR_STYLE_WIDTH : "width='150px'",
  DLG_FRAGMENT_SIMPLE_ATTR_STYLE : "margin-bottom:4px;margin-top:3px;word-wrap: break-word;",
  DLG_FRAGMENT_NESTED_ATTR_STYLE : "margin:0px",
  DLG_FRAGMENT_NESTED_ATTR_LIST_STYLE : "margin:0;margin-left:0px", 

  DLG_TYPES_WIDTH              : 500,
  DLG_TYPES_HEIGHT             : 400,
  DLG_TYPES_PATH               : "lib/AEd/dialogs/types.html",
  DLG_TYPES_ID_TREE_WRAPPER    : "aedTypesTreeWrapper",
  DLG_TYPES_ID_INPUT_TYPE      : "aedAddType",
  DLG_TYPES_ID_BTN_ADD_TYPE    : "aedTypesBtnAddType",
  DLG_TYPES_ID_BTN_REMOVE_TYPE : "aedTypesBtnRemoveType",
    
  DLG_ATTRTYPES_WIDTH              : 500,
  DLG_ATTRTYPES_HEIGHT             : 450,
  DLG_ATTRTYPES_PATH               : "lib/AEd/dialogs/attrtypes.html",
  DLG_ATTRTYPES_ID_TREE_WRAPPER    : "aedAttrTypesTreeWrapper",
  DLG_ATTRTYPES_ID_INPUT_TYPE      : "aedAddType",
  DLG_ATTRTYPES_ID_BTN_ADD_TYPE    : "aedAttrTypesBtnAddType",  
  DLG_ATTRTYPES_ID_BTN_REMOVE_TYPE : "aedAttrTypesBtnRemoveType",   
  DLG_ATTRTYPES_ID_INPUT_NAME      : "aedAttrTypeName",  
  DLG_ATTRTYPES_ID_CHECKBOX_ADDTOTYPEATTR : "aedAddToTypeAttributes",    
  DLG_ATTRTYPES_ID_CHECKBOX_REQUIRED : "aedRequired",    
  DLG_ATTRTYPES_ID_REQUIRED_WRAPPER : "aedRequiredWrapper",
  DLG_ATTRTYPES_ID_TYPE        : "aedAttrTypesType",     
  DLG_ATTRTYPES_ID_SUGGESTIONS : "aedAttrTypesSuggestions",

  DLG_SUBSCRIPTIONS_WIDTH          : 600,
  DLG_SUBSCRIPTIONS_HEIGHT         : 230,
  DLG_SUBSCRIPTIONS_PATH           : "lib/AEd/dialogs/subscriptions.html",
  DLG_SUBSCRIPTIONS_ID_TABLE       : "aedTableSubscriptions",  
  DLG_SUBSCRIPTIONS_ID_SUBSCRIBED  : "aedSubscriptionsContainerSubscribed",  
  DLG_SUBSCRIPTIONS_ID_UNSUBSCRIBED: "aedSubscriptionsContainerUnsubscribed",  
  DLG_SUBSCRIPTIONS_ID_BTN_SUBSCRIBE   : "aedSubscriptionsBtnSubscribe",  
  DLG_SUBSCRIPTIONS_ID_BTN_UNSUBSCRIBE : "aedSubscriptionsBtnUnsubscribe",  
  DLG_SUBSCRIPTIONS_ID_INPUT_USER : "aedSubscriptionsUser",  
  DLG_SUBSCRIPTIONS_ID_INPUT_TYPE : "aedSubscriptionsType",  
  DLG_SUBSCRIPTIONS_ID_INPUT_URI  : "aedSubscriptionsUri",  
  DLG_SUBSCRIPTIONS_ID_TYPE_SUGGESTIONS     : "aedSubscriptionsTypeSuggestions",
  DLG_SUBSCRIPTIONS_ID_USER_SUGGESTIONS     : "aedSubscriptionsUserSuggestions",
  DLG_SUBSCRIPTIONS_ID_URI_SUGGESTIONS     : "aedSubscriptionsUriSuggestions",
  

  DLG_SYNCHRONIZE_WIDTH          : 600,
  DLG_SYNCHRONIZE_HEIGHT         : 280,
  DLG_SYNCHRONIZE_PATH           : "lib/AEd/dialogs/synchronize.html",
  DLG_SYNCHRONIZE_ID_SYNCHRONIZE_FIELDSET : "aedSynchronizeFieldsetSynchronize",
  DLG_SYNCHRONIZE_ID_SYNCHRONIZE_INPUT : "aedSynchronizeInput",

  DLG_DOCANNOTATIONS_WIDTH          : 320,
  DLG_DOCANNOTATIONS_HEIGHT         : 330,
  
  DLG_SUGGEST_ANNOTATIONS_WIDTH          : 450,
  DLG_SUGGEST_ANNOTATIONS_HEIGHT         : 270,
  DLG_SUGGEST_ANNOTATIONS_PATH           : "lib/AEd/dialogs/suggestanno.html", 
  DLG_SUGGEST_ANNOTATIONS_ID_BTN_BROWSE  : "aedSuggestBtnBrowse",
  DLG_SUGGEST_ANNOTATIONS_ID_BTN_NO_SUGGESTIONS : "aedSuggestBtnNoSuggestion",
  DLG_SUGGEST_ANNOTATIONS_ID_SELECTION   : "aedSuggestSelection",
  DLG_SUGGEST_ANNOTATIONS_ID_TYPE        : "aedSuggestType",
  DLG_SUGGEST_ANNOTATIONS_ID_BTN_WHOLE_DOC : "aedSuggestBtnWholeDoc",
  DLG_SUGGEST_ANNOTATIONS_ID_SUGGESTIONS : "aedSuggestSuggestions",
  
  DLG_SUGGESTED_ANNOTATIONS_WIDTH          : 320,
  DLG_SUGGESTED_ANNOTATIONS_HEIGHT         : 330,
  
  DLG_DOCSUGGESTIONS_WIDTH          : 320,
  DLG_DOCSUGGESTIONS_HEIGHT         : 330,

  DLG_TYPECOLORS_WIDTH              : 400,
  DLG_TYPECOLORS_HEIGHT             : 300,
  DLG_TYPECOLORS_PATH               : "lib/AEd/dialogs/typecolors.html",
  DLG_TYPECOLORS_ID_TYPE            : "aedTypeColorsType",
  DLG_TYPECOLORS_ID_SUGGESTIONS     : "aedTypeColorsSuggestions",
  DLG_TYPECOLORS_ID_BTN_BROWSE      : "aedTypeColorsBtnBrowse",
  DLG_TYPECOLORS_ID_COLOR           : "aedTypeColorsColor",
  DLG_TYPECOLORS_ID_ALPHA           : "aedTypeColorsAlpha",
  DLG_TYPECOLORS_ID_BOLD            : "aedTypeColorsBold",
  DLG_TYPECOLORS_ID_ITALIC          : "aedTypeColorsItalic",
  DLG_TYPECOLORS_ID_UNDERLINED      : "aedTypeColorsUnderlined",
  DLG_TYPECOLORS_ID_FONTCOLOR       : "aedTypeColorsFontColor",

  DLG_MESSAGE_WIDTH: 400,
  DLG_MESSAGE_HEIGHT: 150,

  DLG_CONFIRM_WIDTH: 300,
  DLG_CONFIRM_HEIGHT: 150,

  // ---------------------------------------------------------------------
  // Z-INDEX
  // ---------------------------------------------------------------------

  Z_INDEX_DLG               : 500000,
  Z_INDEX_DLG_FRONT         : 600000,
  Z_INDEX_DLG_MODAL         : 700000,
  Z_INDEX_DLG_DOUBLEMODAL   : 730000,
  Z_INDEX_DLG_TOOLBAR       : 650000,
  Z_INDEX_DLG_TOOLBAR_FRONT : 670000,
  Z_INDEX_DLG_ANNO          : 400000,
  Z_INDEX_DLG_ANNO_FRONT    : 450000,

  // ---------------------------------------------------------------------
  // CLASS NAMES
  // ---------------------------------------------------------------------
  
  // Default class name for annotations.    
  CLASS_ANNOTATION:              "aed-anno",  

  // UI Component
  CLASS_UI_DRAGGABLE:            "aed-ui-draggable",  
  CLASS_UI_DRAGGABLE_HANDLE:     "aed-ui-draggable-handle", 
  CLASS_UI_RESIZABLE:            "aed-ui-resizable", 
  CLASS_UI_RESIZABLE_HANDLE:     "aed-ui-resizable-handle",   
  CLASS_UI_RESIZABLE_HANDLE_N:   "aed-ui-resizable-handle-n", 
  CLASS_UI_RESIZABLE_HANDLE_S:   "aed-ui-resizable-handle-s",
  CLASS_UI_RESIZABLE_HANDLE_E:   "aed-ui-resizable-handle-e",
  CLASS_UI_RESIZABLE_HANDLE_W:   "aed-ui-resizable-handle-w",      
  CLASS_UI_RESIZABLE_HANDLE_NE:  "aed-ui-resizable-handle-ne",
  CLASS_UI_RESIZABLE_HANDLE_NW:  "aed-ui-resizable-handle-nw",
  CLASS_UI_RESIZABLE_HANDLE_SE:  "aed-ui-resizable-handle-se",
  CLASS_UI_RESIZABLE_HANDLE_SW:  "aed-ui-resizable-handle-sw",            
  
  // UI Container 
  CLASS_UI_CONTAINER:            "aed-ui-container",  
  CLASS_UI_IFRAME_WRAPPER:       "aed-ui-iframe-wrapper",      
  
  // UI Button 
  CLASS_UI_BTN:                  "aed-ui-btn",
  CLASS_UI_BTN_NOTEXT:           "aed-ui-btn-notext",
  CLASS_UI_BTN_NOICON:           "aed-ui-btn-noicon",  
  CLASS_UI_BTN_DISABLED:         "aed-ui-btn-disabled",
  CLASS_UI_BTN_SELECTED:         "aed-ui-btn-selected",
  CLASS_UI_BTN_HOVER:            "aed-ui-btn-hover",
  CLASS_UI_BTN_TEXT:             "aed-ui-btn-text",  
  
  // UI Icon 
  CLASS_UI_ICON:                 "aed-ui-icon",
  CLASS_UI_ICON_ERROR:           "aed-ui-icon-error",
  CLASS_UI_ICON_WARNING:         "aed-ui-icon-warning",  
  CLASS_UI_ICON_LOADING:         "aed-ui-icon-loading",    
  CLASS_UI_ICON_OK:              "aed-ui-icon-ok",
  CLASS_UI_ICON_INFO:            "aed-ui-icon-info",
  CLASS_UI_ICON_ANNO:            "aed-ui-icon-anno",  
  CLASS_UI_ICON_CLOSE:           "aed-ui-icon-close",  
  CLASS_UI_ICON_EDIT:            "aed-ui-icon-edit",      
  CLASS_UI_ICON_DELETE:          "aed-ui-icon-delete",    
  CLASS_UI_ICON_ACCEPT:          "aed-ui-icon-accept",    
  CLASS_UI_ICON_DECLINE:         "aed-ui-icon-decline",    
  CLASS_UI_ICON_SHOW_DETAILS:    "aed-ui-icon-showdetails",    
  CLASS_UI_ICON_HIDE_DETAILS:    "aed-ui-icon-hidedetails",
  CLASS_UI_ICON_SHOW_NESTED_DETAILS: "aed-ui-icon-shownesteddetails",    
  CLASS_UI_ICON_HIDE_NESTED_DETAILS: "aed-ui-icon-hidenesteddetails",    
  CLASS_UI_ICON_EXPLORE:         "aed-ui-icon-explore",    
  CLASS_UI_ICON_COLOR:           "aed-ui-icon-color",        
  CLASS_UI_ICON_JOIN:            "aed-ui-icon-join", 
  CLASS_UI_ICON_LEAVE:           "aed-ui-icon-leave",    
  CLASS_UI_ICON_EXPAND_TREE:     "aed-ui-icon-expandtree", 
  CLASS_UI_ICON_COLLAPSE_TREE:   "aed-ui-icon-collapsetree", 
  CLASS_UI_ICON_SHOW_SELECTED:   "aed-ui-icon-showselected", 
           
  // UI Dialog 
  CLASS_UI_DLG:                  "aed-ui-dlg",
  CLASS_UI_DLG_HEADER:           "aed-ui-dlg-header",      
  CLASS_UI_DLG_HEADER_BUTTONS:   "aed-ui-dlg-header-buttons", 
  CLASS_UI_DLG_TITLEBAR:         "aed-ui-dlg-titlebar",
  CLASS_UI_DLG_TITLE :           "aed-ui-dlg-title",    
  CLASS_UI_DLG_CONTENT:          "aed-ui-dlg-content",
  CLASS_UI_DLG_BUTTONS:          "aed-ui-dlg-buttons",   
  CLASS_UI_DLG_CONTENT_WRAPPER:  "aed-ui-dlg-content-wrapper",
  CLASS_UI_DLG_BUTTONS_WRAPPER:  "aed-ui-dlg-buttons-wrapper",    
  CLASS_UI_DLG_OVERLAY:          "aed-ui-overlay", 
  
  // UI Message
  CLASS_UI_MSG:                  "aed-ui-msg",  
  CLASS_UI_MSG_BUTTONS:          "aed-ui-msg-buttons",  
  CLASS_UI_MSG_MAIN:             "aed-ui-msg-main",  
  CLASS_UI_MSG_MAIN_HEADER:      "aed-ui-msg-main-header",  
  CLASS_UI_MSG_MAIN_CONTENT:     "aed-ui-msg-main-content",
  CLASS_UI_MSG_MAIN_NESTED_CONTENT: "aed-ui-msg-main-nested-content",  
  CLASS_UI_MSG_TITLE:            "aed-ui-msg-title",  
  CLASS_UI_MSG_SUBTITLE:         "aed-ui-msg-subtitle",
  CLASS_UI_MSG_HEADER_CONTENT:   "aed-ui-msg-header-content",
  CLASS_UI_MSG_HEADER_BAD_FRAGMENT: "aed-ui-msg-header-bad-fragment",            
  CLASS_UI_MSG_NOICON:           "aed-ui-msg-noicon",    
  CLASS_UI_MSG_PHOTO:            "aed-ui-msg-photo",      
  
  // UI Toolbar
  CLASS_UI_TOOLBAR:              "aed-ui-toolbar",
  
  // UI Corners  
  CLASS_UI_CORNER_ALL:           "aed-ui-corner-all",
  CLASS_UI_CORNER_TOP:           "aed-ui-corner-top",
  CLASS_UI_CORNER_RIGHT:         "aed-ui-corner-right",
  CLASS_UI_CORNER_BOTTOM:        "aed-ui-corner-bottom",
  CLASS_UI_CORNER_LEFT:          "aed-ui-corner-left",      
  CLASS_UI_CORNER_TL:            "aed-ui-corner-tl",
  CLASS_UI_CORNER_TR:            "aed-ui-corner-tr",
  CLASS_UI_CORNER_BL:            "aed-ui-corner-bl",
  CLASS_UI_CORNER_BR:            "aed-ui-corner-br", 
  CLASS_UI_CORNER_NONE:          "aed-ui-corner-none",               
  
  // UI DlgConnect
  CLASS_UI_DLG_CONNECT:          "aed-ui-dlg-connect",
  
  // UI DlgSettings
  CLASS_UI_DLG_SETTINGS:         "aed-ui-dlg-settings",
  
  // UI DlgAnnotate
  CLASS_UI_DLG_ANNOTATE:         "aed-ui-dlg-annotate",  
  
  // UI DlgStatusBar
  CLASS_UI_DLG_STATUSBAR:        "aed-ui-dlg-statusbar",    
  
  // UI DlgPersons
  CLASS_UI_DLG_PERSONS :         "aed-ui-dlg-persons",  
  
  // UI DlgGroups
  CLASS_UI_DLG_GROUPS :          "aed-ui-dlg-groups",      
  
  // Person
  CLASS_UI_MSG_PERSON:           "aed-ui-msg-person",  
  CLASS_UI_CLICKABLE:            "aed-ui-clickable",
  
  // Group  
  CLASS_UI_MSG_GROUP:            "aed-ui-msg-group", 
  CLASS_UI_MSG_GROUP_JOINED :    "aed-ui-msg-group-joined",   
  
  // table
  CLASS_UI_TABLE_COLUMN1:        "aed-ui-table-column1", 
  CLASS_UI_TABLE_COLUMN2:        "aed-ui-table-column2",   
  CLASS_UI_TABLE_COLUMN3:        "aed-ui-table-column3",  
  CLASS_UI_TABLE_COLUMN4:        "aed-ui-table-column4",
  
  // UI Tree                     
  CLASS_UI_TREE:                 "aed-ui-tree",
  
  // UI TreeNode    
  CLASS_UI_TREE_NODE:            "aed-ui-tree-node",
  CLASS_UI_TREE_NODE_SELECTED:   "aed-ui-tree-node-selected",  
  CLASS_UI_TREE_NODE_BTN_EXPAND: "aed-ui-tree-node-btn-expand", 
  CLASS_UI_TREE_NODE_BTN_TEXT:   "aed-ui-tree-node-btn-text",    
  CLASS_TREE_NODE_BTN_SELECTED:  "aed-ui-tree-node-btn-selected",
  
  // UI Fragment   
  CLASS_UI_FRAGMENT_MULTI:       "aed-anno-multi", 
  CLASS_UI_FRAGMENT_HOVER:       "aed-anno-hover",
  
  // UI Annotation
  CLASS_UI_ANNOTATION_MODE_ANNO_LINK:   "aed-ui-annotation-mode-anno-link",    
  CLASS_UI_ANNOTATION_MODE_ANNO_LINK_HOVER:   "aed-ui-annotation-mode-anno-link-hover",
  CLASS_UI_ANNOTATION_ENTITY: "aed-ui-annotation-entity",
  CLASS_UI_ANNOTATION_ENTITY_IMAGE: "aed-ui-annotation-entity-image",
  
  // UI Suggestion Bar Item   
  CLASS_UI_SUGGESTIONS_BAR_ITEM:  "aed-ui-suggestions_bar_item",
  CLASS_UI_SUGGESTIONS_BAR_ITEM_SELECTED:  "aed-ui-suggestions_bar_item_selected",
  
  // UI Suggestion Bar   
  CLASS_UI_SUGGESTIONS_BAR:      "aed-ui-suggestions_bar",
  
  
  // UI Autocomplete
  CLASS_UI_AUTOCOMPLETE:    "aed-ui-autocomplete",
  CLASS_UI_AUTOCOMPLETE_CONTAINER:      "aed-ui-autocomplete-container",
  
  // UI DlgTypes
  CLASS_UI_DLG_TYPES:            "aed-ui-dlg-types",   
  
  // UI DlgAttrTypes
  CLASS_UI_DLG_ATTRTYPES:        "aed-ui-dlg-attrtypes",  
  
  // UI DlgSynchronize
  CLASS_UI_DLG_SYNCHRONIZE:        "aed-ui-dlg-synchronize",    
   
   // UI DlgDocAnnotations
  CLASS_UI_DLG_DOCANNOTATIONS:        "aed-ui-dlg-docannotations",   
   
   // UI DlgSuggestAnnotations
  CLASS_UI_DLG_SUGGEST_ANNOTATIONS:        "aed-ui-dlg-suggest-annotations",
  
  // UI DlgSuggestedAnnotations
  CLASS_UI_DLG_SUGGESTED_ANNOTATIONS:        "aed-ui-dlg-suggested-annotations",
  
   // UI DlgDocSuggestions
  CLASS_UI_DLG_DOCSUGGESTIONS:        "aed-ui-dlg-docsuggestions",
   
   // UI DlgSubscriptions
  CLASS_UI_DLG_SUBSCRIPTIONS:        "aed-ui-dlg-subscriptions",
  
  // UI DlgTypeColors
  CLASS_UI_DLG_TYPECOLORS:         "aed-ui-dlg-type-colors",    
  
  // ---------------------------------------------------------------------

  // Prefix for generating unique IDs in EditorsManager.js.
  FRAGMENT_ID_PREFIX: "aedFragment-",   
  // Prefix for generating unique IDs in EditorsManager.js.
  EDITOR_ID_PREFIX: "AED"
};

// *****************************************************************************
// class AEd.editors.EditorsManager 
// ***************************************************************************** 

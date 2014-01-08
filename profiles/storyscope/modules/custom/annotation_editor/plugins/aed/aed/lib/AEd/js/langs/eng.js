/**
 * eng.js
 *
 * English translations.
 * 
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak
 * 
 */



AEd.langs.eng = (function() {
    
    // object to return
    var t = {};
    
    
// *****************************************************************************
// eng translations
// *****************************************************************************     

// AEd
t["AEd_button_title"] = "Annotation editor";
t["Error_AEd_Config_object_not_found"] = "Error - AEd: Config object not found.";     
// AEd.langs.I18n
t["Error_AEd_langs_I18n_Config_object_DEFAULT_LANG_property_not_found"] = "Error - AEd.langs.I18n: Config object DEFAULT_LANG property not found.";    
// AEd.xml.XMLUtils   
t["Error_AEd_xml_XMLUtils_Parsing_error"] = "Error - AEd.xml.XMLUtils: Parsing error.";
t["No_parser_available"] = "No parser available.";
t["Error_AEd_xml_XMLUtils_Serializer_error_XML_Serializer_not_supported"] = "Error - AEd.xml.XMLUtils: Serializer error - XML Serializer not supported.";
t["Error_AEd_xml_XMLUtils_XPath_error_No_XPath_subsystem_available"] = "Error - AEd.xml.XMLUtils: XPath error - No XPath subsystem available.";

// AEd.comm.Protocol   
t["Error_AEd_comm_Protocol_XML_Parsing_server_message_error"] = "Error - AEd.comm.Protocol: Error in parsing server message.";

// AEd.ajax.XHR    
t["Error_AEd_ajax_XHR_XMLHttp_not_created"] = "Error - AEd.ajax.XHR: XMLHttp not created.";

// AEd.dom.Element    
t["Error_AEd_dom_Element_Argument_passed_to_constructor_is_of_wrong_type"] = "Error - AEd.dom.Element: Argument passed to constructor is of wrong type.";

// AEd.editors.Editor 
t["Error_AEd_editors_Editor_Missing_config_object_argument"] = "Error - AEd.editors.Editor: Missing config object argument.";
t["Error_AEd_editors_Editor_Missing_HTML_DOM_parser"] = "Error - AEd.editors.Editor: Missing HTML Parser implementation.";
t["Connecting"] = "Connecting...";
t["Please_wait"] = "Please wait...";
t["Connection_error"] = "Connection Error";
t["Reload_error"] = "Reload error";
t["Please_reconnect"] = "Please reconnect.";
t["Connected"] = "Connected";
t["See_msg_details_for_more_information"] = "See msg details for more information &darr;";
t["Error"] = "Error";
t["Warning"] = "Warning";
t["Unexpected_message"] = "Unexpected message";
t["Session_ID"] = "Session ID";
t["Server_Protocol_Version"] = "Server Protocol Version";
t["Disconnected"] = "Disconnected";
t["Connection_was_closed"] = "Connection was closed";
t["Sending_message"] = "Sending message";
t["Persons"] = "Persons";
t["Message_received"] = "Message received";  
t["Annotations"] = "Annotations";
t["Suggestions"] = "Suggestions";
t["Suggestions_timeout_elapsed"] = "Suggestions timeout elapsed";
t["Annotations_and_suggestions"] = "Annotations and suggestions";
t["OK"] = "OK";
t["Reload"] = "Reload";
t["Access_denied"] = "Access denied";
t["Access_denied_user"] = "User";
t["Access_denied_type"] = "Type";
t["Access_denied_uri"] = "URI";
t["Error_attributes"] = "Attributes";
t["Error_attributes_name"] = "Name";
t["Error_attributes_value"] = "Value";  
t["Annotation_URI"] = "Annotation URI";  
t["Settings"] = "Settings";
t["Settings_name"] = "Name";
t["Settings_value"] = "Value";     
t["Synchronized"] = "Synchronized";
t["Synchornize"] = "Synchornize";
t["Query_Persons"] = "Query Persons";
t["Query_Groups"] = "Query Groups";
t["Groups"] = "Groups";
t["Join_Group"] = "Join Group";
t["Leave_Group"] = "Leave Group";
t["Query_Types"] = "Query Types";
t["Query_Attr_From_Onto"] = "Atributes from ontology";
t["Types"] = "Types";
t["Resynchronize"] = "Resynchronize";
t["Unsubscribe"] = "Unsubscribe";
t["Subscribe"] = "Subscribe";
t["Suggestion"] = "Suggestion";
t["User"] = "User";
t["Uri"] = "Uri";
t["Type"] = "Type";

t["Suggestion_bar_simple_types_suffix"] = "(Simple)";
t["No_type_selected"] = "No attribute type selected";
t["Please_select_attribute_type_first"] = "Please select attribute type first";
t["No_annotation_type"] = "No annotation type selected";
t["Please_select_annotation_type_first"] = "Please select the annotation type first";
t["Incorrect_attributes_values"] = "One or more attributes values are incorrect";
t["Please_fill_in_correct_values_first"] = "Please fill in correct values first";
t["Specified_attribute_type_not_exists"] = "Specified attribute type not exists";
t["Please_select_existing_attribute_type"] = "Please select existing attribute type"; 
t["No_annotations"] = "No annotations";
t["There_are_no_annotations_with_specified_type"] = "There are neither annotations nor suggestions with specified type";
t["Required_check_off"] = "Attribute is not required now";
t["Required_check_off_make_sure"] = "Please make sure you do not check off this checkbox to not fill in the attribute value";
t["Required_check_off_make_sure_Nested"] = "Please make sure you do not check off this checkbox to not set annotation link or nested annotation";
t["Edit_annotation_not_possible"] = "Editing this annotation is not possible";
t["Annotation_contains_unknown_attributes"] = "Annotation contains one or more unknown attributes";

// AEd.editors.EditorGUI 
t["Dlg_message_title"] = "Message";
t["Dlg_message_ok"] = "Ok";
t["Dlg_confirm_title"] = "Confirmation";
t["Dlg_confirm_yes"] = "Yes";
t["Dlg_confirm_no"] = "No";

// AEd.libs.Base64D_Encode
t["Dlg_message_abort"] = "Abort";
t["Dlg_info_processing_file"] = "Processing file";
t["Dlg_info_processing_file_desc"] = "Please wait";
t["Dlg_info_processing_file_aborted"] = "Processing file - aborted";
t["Dlg_info_processing_file_aborted_desc"] = "Operation aborted";
t["Dlg_error_processing_error"] = "Processing file - error";
t["Dlg_error_processing_error_desc"] = "Error occured during file processing";
t["Dlg_info_download_file"] = "Download file";
t["Dlg_info_download_file_desc"] = "No file for download. Please upload file first.";
t["Dlg_info_flash_download_file_ok"] = "File download completed";
t["Dlg_info_flash_download_file_ok_desc"] = "File has been saved successfully";
t["Dlg_info_flash_download_file_error"] = "File download error";
t["Dlg_info_flash_download_file_error_desc"] = "Error occured during downloading process - file has not been saved";
t["Dlg_error_filereader_unsup"] = "Your browser does not support FileReader";
t["Dlg_info_file_long"] = "File uploading";
t["Dlg_info_file_long_desc"] = "File is too long. Maximum allowed filesize is: ";

// AEd.libs.DurationPicker
t["DPicker_head"] = "Pick two dates or enter duration period";
t["DPicker_from"] = "From:";
t["DPicker_to"] = "To:";
t["DPicker_duration"] = "Duration:";
t["DPicker_years"] = "Years:";
t["DPicker_months"] = "Months:";
t["DPicker_days"] = "Days:";
t["DPicker_hours"] = "Hours:";
t["DPicker_minutes"] = "Minutes:";
t["DPicker_seconds"] = "Seconds:";
t["DPicker_cancel"] = "Cancel";

// AEd.libs.Calendar
t["DCal_jan"] = "January";
t["DCal_feb"] = "February";
t["DCal_mar"] = "March";
t["DCal_apr"] = "April";
t["DCal_may"] = "May";
t["DCal_jun"] = "Juny";
t["DCal_jul"] = "July";
t["DCal_aug"] = "August";
t["DCal_sep"] = "September";
t["DCal_oct"] = "October";
t["DCal_nov"] = "November";
t["DCal_dec"] = "December";
t["DCal_mon"] = "Monday";
t["DCal_tue"] = "Tuesday";
t["DCal_wed"] = "Wednesday";
t["DCal_thu"] = "Thursday";
t["DCal_fri"] = "Friday";
t["DCal_sat"] = "Saturday";
t["DCal_sun"] = "Sunday";
t["DCal_timemode_warning"] = "TimeMode can only be 12 or 24";
t["DCal_time"] = "Time:";
t["DCal_timezone"] = "Timezone:";

// AEd.editors.EditorController 
t["Error_AEd_editors_EditorController_Missing_editor_instance_argument"] = "Error - AEd.editors.EditorController: Missing editor instance argument.";

// AEd.editors.AnnotationsManager    
t["Error_AEd_entities_Annotations_CreateNodeIterator_error_Your_browser_does_not_support_the_createNodeIterator_method"] = "Error - AEd.entities.Annotations: CreateNodeIterator error - Your browser does not support the createNodeIterator method.";





// AEd.entities.Annotation 
t["Error_AEd_entities_Annotation_Missing_params_object_argument"] = "Error - AEd.entites.Annotation: Missing params object argument.";
// AEd.entities.AnnotationsManager 
t["Error_AEd_entities_AnnotationsManager_Missing_argument"] = "Error - AEd.entites.AnnotationsManager: Missing argument.";
t["Selected_annotation_is_document_annotation"] = "Selected annotation is document annotation";
t["You_can_find_it_in_Document_Annotations_dialog"] = "You can find it in Document Annotations dialog.";
// AEd.entities.Suggestion
t["Error_AEd_entities_Suggestion_Missing_params_object_argument"] = "Error - AEd.entites.Suggestion: Missing params object argument.";
t["Suggestion_entities_Refuse_suggestion"]  = "Refuse suggestion"; 
t["Suggestion_entities_Do_you_really_want_to_refuse_this_suggestion"]  = "Do you really want to refuse this suggestion?";
// AEd.entities.SuggestionsManager
t["Error_AEd_entities_SuggestionsManager_Missing_argument"] = "Error - AEd.entites.SuggestionsManager: Missing argument.";
t["Selected_suggestion_is_document_suggestion"] = "Selected suggestion is document suggestion";
t["You_can_find_it_in_Document_Suggestions_dialog"] = "You can find it in Document Suggestions dialog.";

// AEd.entities.Fragment 
t["Error_AEd_entites_Fragment_Missing_params_object_argument"] = "Error - AEd.entites.Fragment: Missing params object argument.";
t["Fragment_document_annotation"] = "document annotation";
t["Fragment_document_suggestion"] = "document suggestion";
t["Fragment_document_this_annotation"] = "This annotation";
t["Fragment_document_this_suggestion"] = "This suggestion";
t["Fragment_nested_annotations"] = "(nested annotations)";
t["Fragment_nested_suggestions"] = "(nested suggestions)";
t["Fragment_annotation_links"] = "(annotation links)";
t["Fragment_suggestion_links"] = "(suggestion links)";
t["Fragment_annotation_anyAnnotation_attribute"] = "(any annotation)";
t["Fragment_suggestion_anyAnnotation_attribute"] = "(any suggestion)";
t["Fragment_annotation_empty_nested_attribute"] = "(no annotation)";
t["Fragment_suggestion_empty_nested_attribute"] = "(no suggestion)";
t["Fragment_bad_fragment"] = "Bad fragment";


// AEd.entities.FragmentsManager 
t["Error_AEd_entities_FragmentsManager_Missing_argument"] = "Error - AEd.entites.FragmentsManager: Missing argument.";
t["Error_AEd_entities_FragmentsManager_CreateNodeIterator_error_Your_browser_does_not_support_the_createNodeIterator_method"] = "Error - AEd.entities.FragmentsManager: CreateNodeIterator error - Your browser does not support the createNodeIterator method.";
// AEd.entities.TypesManager    
t["Error_AEd_entities_TypesManager_Missing_argument"] = "Error - AEd.entites.TypesManager: Missing argument.";
t["Simple"] = "Simple";
t["Structured"] = "Structured";    
t["Ontology"] = "Ontology";
t["Integer"] = "Integer";
t["String"] = "String";
t["Time"] = "Time";
t["Date"] = "Date";
t["DateTime"] = "DateTime";
t["Boolean"] = "Boolean";
t["URI"] = "URI";
t["Image"] = "Image";
t["GeoPoint"] = "GeoPoint";
t["Duration"] = "Duration";
t["Binary"] = "Binary";
t["Text"] = "Text";
t["annotationLink"] = "annotationLink";

// AEd.entities.TypesManager    
t["Error_AEd_entities_TypesFromOntologyManager_Missing_argument"] = "Error - AEd.entites.TypesFromOntologyManager: Missing argument.";

    

    


// AEd.wysiwyg.WysiwygEditor
t["Error_AEd_wysiwyg_WysiwygEditor_Missing_editorType_argument"]  = "Error - AEd.wysiwyg.WysiwygEditor: Missing editorType argument.";
t["Error_AEd_wysiwyg_WysiwygEditor_Missing_editorNativeObject_argument"]  = "Error - AEd.wysiwyg.WysiwygEditor: Missing editorNativeObject argument.";
t["Error_AEd_wysiwyg_WysiwygEditor_Couldnt_create_instance_of_wysiwyg_editor"]  = "Error - AEd.wysiwyg.WysiwygEditor: Couldn't create instance of wysiwyg editor";
t["Error_AEd_wysiwyg_WysiwygEditor_Wysiwyg_editor_not_supported"]  = "Error - AEd.wysiwyg.WysiwygEditor: Wysiwyg editor not supported";  
// AEd.wysiwyg.TinyMCE    
t["Error_AEd_wysiwyg_TinyMCE_Missing_editorNativeObject_argument"]  = "Error - AEd.wysiwyg.TinyMCE: Missing editorNativeObject argument.";





// AEd.ui
// ***************************************************************************** 
// AEd.ui.core.UIButton
t["Error_AEd_ui_core_UIButton_Error_in_creating_UIButton_from_source_element"]  = "Error - AEd.ui.core.UIButton: Error in creating UIButton from source element.";
// AEd.ui.core.UIContainer
t["Error_AEd_ui_core_UIContainer_Error_in_creating_UIContainer_from_source_element"]  = "Error - AEd.ui.core.UIContainer: Error in creating UIContainer from source element.";
// AEd.ui.Toolbar + AEd.ui.AdvancedToolbar
t["Advanced_toolbar_title"]  = "Advanced";
t["Toolbar_title"]  = "Toolbar";
t["Toolbar_button_connect"]  = "Connect"; 
t["Toolbar_button_disconnect"]  = "Disconnect"; 
t["Toolbar_button_annotate"]  = "Annotate"; 
t["Toolbar_button_advanced"]  = "Advanced"; 
t["Toolbar_button_settings"]  = "Settings";  
t["Toolbar_button_subscriptions"]  = "Subscriptions";  
t["Toolbar_button_statusbar"]  = "Status Bar";   
t["Toolbar_button_persons"]  = "Persons";
t["Toolbar_button_groups"]  = "Groups";
t["Toolbar_button_showAnnoDlgs"]  = "Annotation Dialogs";
t["Toolbar_button_docAnnotations"]  = "Document Annotations";
t["Toolbar_button_quickSuggestions"]  = "Quick Suggestions";
t["Toolbar_button_suggestAnnotations"]  = "Suggest Annotations";
t["Toolbar_button_suggestedAnnotations"]  = "Suggested Annotations";
t["Toolbar_button_docSuggestions"]  = "Document Suggestions";

// AEd.ui.DlgStatusBar
t["Dlg_statusbar_title"]  = "StatusBar";

// AEd.ui.DlgNotConnected

t["Dlg_not_connected_title"] = "Connection error";
t["Dlg_not_connected_text"] = "Connection failed. This may be due to a problem on the server.";
t["Dlg_not_connected_button_reconnect"] = "Reconnect";
t["Dlg_not_connected_button_disable_aed"] = "Disable editor";
  
// AEd.ui.DlgConnect
t["Dlg_connect_title"]  = "Connect";  
t["Dlg_connect_button_ok"]  = "Ok";  
t["Dlg_connect_button_cancel"]  = "Cancel"; 
t["Dlg_connect_label_connection_settings"]  = "Connection Settings"; 
t["Dlg_connect_label_server"]  = "Server"; 
t["Dlg_connect_label_user"]  = "User"; 
t["Dlg_connect_label_password"]  = "Password";
   
// AEd.ui.DlgSettings
t["Dlg_settings_title"]  = "Settings";  
t["Dlg_settings_button_save"]  = "Save";  
t["Dlg_settings_button_cancel"]  = "Cancel";
t["Dlg_settings_button_select"]  = "Select"; 
t["Dlg_settings_button_delete"]  = "Delete"; 
t["Dlg_settings_label_settings_list"]  = "Settings list";  
t["Dlg_settings_label_name"]  = "Name"; 
t["Dlg_settings_label_value"]  = "Value";
t["Dlg_settings_settings_content_welcome"]  = "Welcome to settings!";
t["Dlg_settings_settings_content"]  = "You can customize the annotation editor to your vision here.";
t["Dlg_settings_client_content"]  = "Client settings influence the annotation editor only.";
t["Dlg_settings_server_content"]  = "Server settings are used during communication between annotation editor and server.";
t["Dlg_settings_common_content"]  = "These settings are common for client and server.";
t["Dlg_settings_unknown_content"]  = "You can add new settings here. Also all unknown settings will appear here.";
t["Dlg_settings_unsubscriptions_content"]  = "This settings shows items you are currently (un)subscribed. Reconnect is needed for settings application from this dialog. For easy (un)subscribe to an annotation taking you can also use Subscriptions dialog fired by Subscriptions button located on the Advanced toolbar (no reconnect is needed). ";
t["Dlg_settings_node_settings"]  = "Settings";
t["Dlg_settings_node_client"]  = "Client";
t["Dlg_settings_node_server"]  = "Server";
t["Dlg_settings_node_common"]  = "Common";
t["Dlg_settings_node_unknown"]  = "Unknown";
t["Dlg_settings_node_unsubscriptions"]  = "(Un)subscriptions";
t["Dlg_settings_button_add"]  = "Add"
t["Dlg_settings_node_clientAnnotationTypeColor"]  = "Annotation type appearance";
t["Dlg_settings_node_clientAnnotationTypeColor_label_type"]  = "Type";
t["Dlg_settings_node_clientAnnotationTypeColor_label_color"]  = "Appearance String";
t["Dlg_settings_node_clientAnnotationTypeColor_content"]  = "Annotation type colors allow to set different color to each of annotation type and so easily recognize annotations of each type from others.";
t["Dlg_settings_node_clientAdvancedToolbarOptions"]  = "Advanced toolbar";
t["Dlg_settings_node_AdvancedToolbarOptionsAllInOne_radiobutton"] = "All in one toolbar";
t["Dlg_settings_node_AdvancedToolbarOptionsTwoToolbars_radiobutton"] = "Advanced toolbar separately";
t["Dlg_settings_node_clientAdvancedToolbarOptions_content"] = "Select the way of showing advanced toolbar:";
t["Dlg_settings_node_clientRefuseSuggestion"]  = "Refuse suggestion";
t["Dlg_settings_node_clientRefuseSuggestion_content"]  = "You can set if suggestion refusing needs to be confirm. Server will not send refused suggested annotations more times.";
t["Dlg_settings_node_clientRefuseSuggestion_checkbox"]  = "Require confirming on refuse suggested annotation";
t["Dlg_settings_node_clientSuggestionConfidence"]  = "Suggestion confidence";
t["Dlg_settings_node_clientSuggestionConfidence_content"]  = "Suggestion confidence is a percentage value determining probability that the type of a suggested annotation is identified correctly. Set the value to define the minimal suggestion confidence. Every suggested annotation with a lower confidence will be dropped then.";
t["Dlg_settings_node_clientSuggestionAutoConfirming"]  = "Suggestion automatic confirming";
t["Dlg_settings_node_clientSuggestionAutoConfirming_content"]  = "Suggestions with suggestion confidence that is equal or greater than the value will be confirmed automatically. If the value is set to 0, sugestion automatic confirming is disabled. Suggestion automatic confirming has higher priority than refusing suggestions.";
t["Dlg_settings_node_clientFoldingOfAttributes"]  = "Folding of attributes";
t["Dlg_settings_node_clientFoldingOfAttributes_content"]  = "In annotation window, that appears when mouse is over the fragment, attributes are folded by default and it is needed to click to the fragment and to the folding button to see them. In this setting it is possible to set if attributes should be folded or not.";
t["Dlg_settings_node_clientFoldingOfAttributes_checkbox"]  = "do not fold the attributes";
t["Dlg_settings_node_clientFoldingOfAttributesResize_checkbox"]  = "resize annotation window dynamically";
t["Dlg_settings_node_clientFoldingOfAttributesHideButton_checkbox"] = "hide folding button";
t["Dlg_settings_node_clientFoldingOfNesteds_checkbox"]  = "do not fold nested and link annotations attributes";
t["Dlg_settings_node_clientFoldingOfNestedsHideButton_checkbox"] = "hide nested and link folding button";
t["Dlg_settings_node_clientFoldingOfNestedsLevels"] = "Number of levels of nesting";
t["Dlg_settings_node_clientFoldingOfNestedsHideLevel"] = "Hide nested content from level";
t["Dlg_settings_node_clientFoldingOfNestedsHideLevel_off"] = "off";
t["Dlg_settings_node_serverLanguage"]  = "Language";
t["Dlg_settings_node_serverLanguage_content"]  = "Server language relates to messages that are sent by server.";
t["Dlg_settings_node_defaultUserGroup"]  = "Default user group";
t["Dlg_settings_node_defaultUserGroup_content"]  = "Default group specifies the group to which user is register when did not enter the other one.";
t["Dlg_settings_one_or_more_settings_incorrect"]  = "One or more settings are incorrect";
t["Dlg_settings_please_fill_in_the_correct_settings"]  = "Please, fill in the correct settings first";
  
// AEd.ui.DlgAnnotate
t["Dlg_annotate_title"]  = "Annotate";           
t["Dlg_annotate_button_save"]  = "Save";  
t["Dlg_annotate_button_cancel"]  = "Cancel";  
t["Dlg_annotate_button_browse"]  = "Browse";  
t["Dlg_annotate_button_download"]  = "Download"; 
t["Dlg_annotate_label_annotate"]  = "Annotate";  
t["Dlg_annotate_label_selection"]  = "Selection"; 
t["Dlg_annotate_label_type"]  = "Type"; 
t["Dlg_annotate_label_content"]  = "Content"; 
t["Dlg_annotate_label_attributes"]  = "Attributes"; 
t["Dlg_annotate_label_name"]  = "Name";  
t["Dlg_annotate_label_value"]  = "Value";  
t["Dlg_annotate_label_lat"]  = "Lat"; 
t["Dlg_annotate_label_long"]  = "Long"; 
t["Dlg_annotate_label_entity_type"]  = "Entity type"; 
t["Dlg_annotate_label_entity_name"]  = "Entity name";
t["Dlg_annotate_label_entity_description"]  = "Entity description";
t["Dlg_annotate_label_entity_image"]  = "Image";
t["Dlg_annotate_button_select"]  = "Select"; 
t["Dlg_annotate_button_add_attribute"]  = "Add"; 
t["Dlg_annotate_button_delete_attribute"]  = "Delete"; 
t["Dlg_annotate_button_clear_attribute"]  = "Clear"; 
t["Dlg_annotate_button_entity"]  = "Entity";
t["Dlg_annotate_button_add_attributes_from_ontology"]  = "Select from ontology"; 
t["Dlg_annotate_button_annotate_whole_document"]  = "Annotate whole document"; 
t["Dlg_annotate_button_previous"]  = "<-";
t["Dlg_annotate_button_next"]  = "->";
t["Dlg_annotate_button_add"]  = "Add";
t["Dlg_annotate_button_delete"]  = "Delete"; 
t["Dlg_annotate_selection_whole_doc"]  = "*** WHOLE DOCUMENT ***";
t["Dlg_annotate_selection_nothing"]  = "*** NOTHING ***";
t["Dlg_annotate_nested_list_incorrect"]  = "This attribute is incorrect";
t["Dlg_annotate_nested_list_incorrect_nested"]  = "There is one or more nested annotations in the list, you cannot insert annotation link";
t["Dlg_annotate_nested_list_incorrect_link"]  = "There is one or more annotation links in the list, you cannot insert nested annotation";
t["Dlg_annotate_node_annotation"]  = "Annotation";
t["Remove_annotation"]  = "Remove annotation"; 
t["Do_you_really_want_to_remove_this_annotation"]  = "Do you really want to remove this annotation?"; 
t["Dlg_annotate_checkbox_add_to_type_attributes"]  = "Add to the basic attributes of given annotation type";
t["Dlg_annotate_checkbox_add_to_type_change_attributes"]  = "Change in the basic attributes of given annotation type"; 
t["Dlg_annotate_checkbox_required"]  = "Required attribute";
t["Dlg_annotate_simpletype_example_integer"]  = "Example: 15, -5, ...";
t["Dlg_annotate_simpletype_example_string"]  = "Example: Peter, 22, flower, ...";
t["Dlg_annotate_simpletype_example_time"]  = "Example: 23:59:22, 12:05:09+05:00, 08:16:46-11:00, ...";
t["Dlg_annotate_simpletype_example_date"]  = "Example: 2012-01-01, 1999-06-08+07:00, 2005-04-22-02:00, ...";
t["Dlg_annotate_simpletype_example_datetime"]  = "Example: 2010-12-24T22:00:37, 2008-10-16T11:49:32+09:00, 1995-04-03T01:15:22-12:00";
t["Dlg_annotate_simpletype_example_boolean"]  = "Example: true, false, 1, 0";
t["Dlg_annotate_simpletype_example_URI"]  = "Example: http://example.com/";
t["Dlg_annotate_simpletype_example_Image"]  = "Example: http://example.com/image.png";
t["Dlg_annotate_simpletype_example_geopointlat"]  = "Example: -23.38, 37.77, ...";
t["Dlg_annotate_simpletype_example_geopointlong"]  = "Example: -41.85, -122.41, ...";
t["Dlg_annotate_simpletype_example_duration"]  = "Example: -P10D, P5Y2M11D, P5Y2M10DT14H, ...";
t["Dlg_annotate_simpletype_example_binary"]  = "Example: path/file";
t["Dlg_annotate_simpletype_example_text"]  = "Example: This is text example.";
t["Dlg_annotate_remove_attr_from_type"]  = "Attribute has been removed";
t["Dlg_annotate_do_you_want_to_remove_attr_from_type"]  = "Do you want to remove this attribute also from selected annotation type?";

// AEd.ui.DlgPersons
t["Dlg_persons_title"]  = "Persons";    
t["Dlg_persons_button_filter"]  = "Filter";  
t["Dlg_persons_label_persons_list"]  = "Persons";
   
// AEd.ui.DlgGroups
t["Dlg_groups_title"]  = "Groups";    
t["Dlg_groups_button_filter"]  = "Filter";  
t["Dlg_groups_label_persons_list"]  = "Groups";
t["Dlg_groups_no_group"]  = "User is not in any group";
t["Dlg_groups_enter_any_group"]  = "Please, enter any of available group";
   
// AEd.ui.Person
t["Person_Assigned_Groups"]  = "Assigned Groups";          
t["Person_No_Groups"]  = "No Groups";  
t["Error_AEd_ui_Person_Error_missing_person_object"]  = "Error - AEd.ui.Person: Missing person object.";

// AEd.ui.Group
t["Group_Assigned_Persons"]  = "Assigned Persons";           
t["Group_No_Persons"]  = "No Persons";  
t["Error_AEd_ui_Group_Error_missing_group_object"]  = "Error - AEd.ui.Group: Missing group object.";
     
// AEd.ui.SuggestionsBarItem
t["Error_AEd_ui_core_SuggestionsBarItem_Error_in_creating_SuggestionsBarItem_from_source_element"]  = "Error - AEd.ui.core.SuggestionsBarItem: Error in creating SuggestionsBarItem from source element.";

// AEd.ui.DlgTypes
t["Dlg_types_title"]  = "Types";    
t["Dlg_types_label_type_selection"]  = "Type selection";   
t["Dlg_types_label_add_new_type_as_subtype"]  = "Add new type as a subtype of selected";  
t["Dlg_types_button_add_type"]  = "Add";  
t["Dlg_types_button_remove_type"]  = "Remove Selected Type";  
t["Dlg_types_button_ok"]  = "Ok";  
t["Dlg_types_button_cancel"]  = "Cancel";
 
// AEd.ui.DlgAttrTypes
t["Dlg_attrTypes_title"]  = "Attribute Types";    
t["Dlg_attrTypes_label_type_selection"]  = "Attribute Type selection";   
t["Dlg_attrTypes_label_attribute_name"]  = "Attribute Name"; 
t["Dlg_attrTypes_label_name"]  = "Name"; 
t["Dlg_attrTypes_label_add_new_type_as_subtype"]  = "Add new type as a subtype of selected";   
t["Dlg_attrTypes_button_add_type"]  = "Add";  
t["Dlg_attrTypes_button_remove_type"]  = "Remove Selected Type"; 
t["Dlg_attrTypes_button_ok"]  = "Ok";  
t["Dlg_attrTypes_button_cancel"]  = "Cancel"; 
t["Dlg_attrTypes_checkbox_add_to_type_attributes"]  = "Add to the basic attributes of given annotation type (to show other when entering a new annotation)"; 
t["Dlg_attrTypes_checkbox_required"]  = "Required attribute";
t["Dlg_attrTypes_attr_cannot_be_added"]  = "Attribute cannot be added";
t["Dlg_attrTypes_attr_name_and_type"]  = "Fill in attribute name and set attribute type";
t["Dlg_attrTypes_label_type"]  = "Type";

// AEd.ui.DlgAttrFromOntology
t["Dlg_attrTypesFromOntology_title"]  = "Attribute Types from ontology"; 
t["Dlg_attrTypesFromOntology_label"]  = "Attribute Type from ontology selection"; 

// AEd.ui.DlgSubscriptions
t["Dlg_subscribtions_title"]  = "Subscriptions";  
t["Dlg_subscribtions_legend_subscribed"]  = "Subscribed"; 
t["Dlg_subscribtions_lagend_unsubscribed"]  = "Unsubscribed"; 
t["Dlg_subscribtions_button_add"]  = "Add new";  
t["Dlg_subscribtions_button_save"]  = "Save"; 
t["Dlg_subscribtions_button_cancel"]  = "Cancel"; 
t["Dlg_subscribtions_button_delete"]  = "Delete";     
t["Dlg_subscribtions_button_subscribe"]  = "Subscribe";        
t["Dlg_subscribtions_button_unsubscribe"]  = "Unubscribe";  
t["Dlg_subscribtions_label_subscribtions"]  = "Subscriptions";  
t["Dlg_subscribtions_label_user"]  = "User"; 
t["Dlg_subscribtions_label_type"]  = "Type";  
t["Dlg_subscribtions_label_uri"]   = "URI";  

// AEd.ui.DlgSynchronize
t["Dlg_synchronize_title"]  = "Synchronize";   
t["Dlg_synchronize_button_update_from_server"]  = "Update from server";  
t["Dlg_synchronize_button_synchronize_overwrite"]  = "Synchronize with overwrite";  
t["Dlg_synchronize_button_cancel"]  = "Cancel"; 
t["Dlg_synchronize_Synchronize_document"]  = "This document needs to be synchronized, there may be another version of this document."; 

// AEd.ui.DlgDocAnnotations
t["Dlg_docAnnotations_title"]  = "Document Annotations";   

// AEd.ui.DlgSuggestAnnotations
t["Dlg_suggestAnnotations_title"]  = "Suggest Annotations";
t["Dlg_suggestAnnotations_select_annotations_type"] = "Annotations type selection";
t["Dlg_suggestAnnotations_label_selection"]  = "Selection";
t["Dlg_suggestAnnotations_button_select_whole_document"]  = "Select whole document";
t["Dlg_suggestAnnotations_button_no_suggestion"]  = "No suggestions";
t["Dlg_suggestAnnotations_label_type"]  = "Type";
t["Dlg_suggestAnnotations_button_browse"]  = "Browse";
t["Dlg_suggestAnnotations_button_suggest"]  = "Suggest";  
t["Dlg_suggestAnnotations_button_cancel"]  = "Cancel";
t["Dlg_suggestAnnotations_selection_whole_doc"]  = "*** WHOLE DOCUMENT ***";
t["Dlg_suggestAnnotations_selection_no_suggestions"]  = "*** NO SUGGESTIONS ***";
t["Dlg_suggestAnnotations_selected_type_does_not_exist"]  = "Selected type does not exist";
t["Dlg_suggestAnnotations_select_existing_type_first"]  = "PLease, select the existing type or do not specify type for suggesting annotations of all types"; 

// AEd.ui.DlgSuggestedAnnotations
t["Dlg_suggestedAnnotations_title"]  = "Suggested Annotations";

// AEd.ui.DlgDocSuggestions
t["Dlg_docSuggestions_title"]  = "Document Suggestions";

// AEd.ui.DlgTypeColors
t["Dlg_typeColors_title"]  = "Annotation Type Colors";
t["Dlg_typeColors_button_ok"]  = "Ok";
t["Dlg_typeColors_button_cancel"]  = "Cancel";
t["Dlg_typeColors_type_color_selection"]  = "Type and color selection";
t["Dlg_typeColors_label_type"]  = "Type";
t["Dlg_typeColors_button_browse"]  = "Browse";
t["Dlg_typeColors_label_color"]  = "Color";
t["Dlg_typeColors_label_alpha"]  = "Alpha";
t["Dlg_typeColors_label_italic"]  = "Set font italc";
t["Dlg_typeColors_label_underlined"]  = "Set font underlined";
t["Dlg_typeColors_label_bold"]  = "Set font bold";
t["Dlg_typeColors_label_font_color"]  = "Font color";
t["Dlg_typeColors_color_or_alpha_incorrect"]  = "Color or alpha value is incorrect";
t["Dlg_typeColors_please_fill_in_the_correct_values"]  = "Please, fill in the correct values first";

// AEd.ui.Annotation
t["No_Attributes"]  = "No Attributes";
t["Annotation_button_show_details"] = "Unfold attributes";
t["Annotation_button_hide_details"] = "Fold attributes";
t["Annotation_button_edit"] = "Edit";
t["Annotation_button_delete"] = "Delete";
t["Annotation_button_show_nested_details"] = "Unfold nested attributes";
t["Annotation_button_hide_nested_details"] = "Fold nested attributes";
t["Annotation_read_more"] = "Read more";

// AEd.ui.Suggestion
t["Suggestion_no_author"]  = "<br />";
t["Suggestion_no_datetime"]  = "Annotation has not been created yet";
t["Suggestion_button_show_details"] = "Unfold attributes";
t["Suggestion_button_hide_details"] = "Fold attributes";
t["Suggestion_button_confirm"] = "Confirm";
t["Suggestion_button_edit"] = "Edit and confirm";
t["Suggestion_button_refuse"] = "Refuse";
t["Suggestion_button_show_nested_details"] = "Unfold nested attributes";
t["Suggestion_button_hide_nested_details"] = "Fold nested attributes";

// *****************************************************************************     
    return t;  
})();

// *****************************************************************************
// eng translations
// *****************************************************************************

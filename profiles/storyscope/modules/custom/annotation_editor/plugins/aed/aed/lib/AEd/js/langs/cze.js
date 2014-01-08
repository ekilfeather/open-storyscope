/**
 * cze.js
 *
 * Czech translations.
 * 
 * @author: Petr Loukota, Milos Cudrak
 * 
 */



AEd.langs.cze = (function() {
    
    // object to return
    var t = {};
    
    
// *****************************************************************************
// cze translations
// *****************************************************************************     

// AEd
t["AEd_button_title"] = "Editor anotací";
t["Error_AEd_Config_object_not_found"] = "Chyba - AEd: Konfigurační soubor nenalezen.";
     
// AEd.langs.I18n
t["Error_AEd_langs_I18n_Config_object_DEFAULT_LANG_property_not_found"] = "Chyba - AEd.langs.I18n: Defaultní jazykový balík nenalezen.";    
// AEd.xml.XMLUtils   
t["Error_AEd_xml_XMLUtils_Parsing_error"] = "Chyba - AEd.xml.XMLUtils: Analýza XML se nezdařila.";
t["No_parser_available"] = "No parser available.";
t["Error_AEd_xml_XMLUtils_Serializer_error_XML_Serializer_not_supported"] = "Chyba - AEd.xml.XMLUtils: Serializace XML není dostupná.";
t["Error_AEd_xml_XMLUtils_XPath_error_No_XPath_subsystem_available"] = "Chyba - AEd.xml.XMLUtils: XPath subsystém není dostupný.";

// AEd.comm.Protocol   
t["Error_AEd_comm_Protocol_XML_Parsing_server_message_error"] = "Chyba - AEd.comm.Protocol: Analýza zprávy serveru se nezdařila.";

// AEd.ajax.XHR    
t["Error_AEd_ajax_XHR_XMLHttp_not_created"] = "Chyba - AEd.ajax.XHR: Vytvoření XMLHttp se nezdařilo.";

// AEd.dom.Element    
t["Error_AEd_dom_Element_Argument_passed_to_constructor_is_of_wrong_type"] = "Chyba - AEd.dom.Element: Argument konstruktoru je chybného typu.";

// AEd.editors.Editor 
t["Error_AEd_editors_Editor_Missing_config_object_argument"] = "Chyba - AEd.editors.Editor: Není zadána žádná konfigurace.";
t["Error_AEd_editors_Editor_Missing_HTML_DOM_parser"] = "Error - AEd.editors.Editor: Chybí implementace HTML parseru.";
t["Connecting"] = "Připojování...";
t["Please_wait"] = "Čekejte, prosím...";
t["Connection_error"] = "Chyba připojení";
t["Reload_error"] = "Chyba znovunačtení";
t["Please_reconnect"] = "Prosím, připojte se znovu.";
t["Connected"] = "Připojeno";
t["See_msg_details_for_more_information"] = "Zpráva obsahuje podrobnosti &darr;";
t["Error"] = "Chyba";
t["Warning"] = "Varování";
t["Unexpected_message"] = "Neočekávaná zpráva";
t["Session_ID"] = "ID sezení";
t["Server_Protocol_Version"] = "Verze protokolu serveru";
t["Disconnected"] = "Odpojeno";
t["Connection_was_closed"] = "Připojení bylo uzavřeno";
t["Sending_message"] = "Odesílání zprávy";
t["Persons"] = "Osoby";
t["Message_received"] = "Zpráva přijata";  
t["Annotations"] = "Anotace";
t["Suggestions"] = "Nabídky";
t["Suggestions_timeout_elapsed"] = "Časovač pro příjem nabídek vypršel";
t["Annotations_and_suggestions"] = "Anotace a nabídky";
t["OK"] = "OK";
t["Reload"] = "Přenačteno";
t["Access_denied"] = "Přístup odepřen";
t["Access_denied_user"] = "Uživatel";
t["Access_denied_type"] = "Typ";
t["Access_denied_uri"] = "URI";
t["Error_attributes"] = "Attributy";
t["Error_attributes_name"] = "Jméno";
t["Error_attributes_value"] = "Hodnota";  
t["Annotation_URI"] = "URI anotace";  
t["Settings"] = "Nastavení";
t["Settings_name"] = "Jméno";
t["Settings_value"] = "Hodnota";     
t["Synchronized"] = "Synchronizováno";
t["Synchornize"] = "Synchronizovat";
t["Query_Persons"] = "Filtrování osob";
t["Query_Groups"] = "Filtrování skupin";
t["Groups"] = "Skupiny";
t["Join_Group"] = "Připojit se ke skupině";
t["Leave_Group"] = "Opustit skupinu";
t["Query_Types"] = "Filtrování typů";
t["Query_Attr_From_Onto"] = "Atributy z ontologie";
t["Types"] = "Typy";
t["Resynchronize"] = "Znovu synchronizovat";
t["Unsubscribe"] = "Neodebírat";
t["Subscribe"] = "Odebírat";
t["Suggestion"] = "Nabídnout";
t["User"] = "Uživatel";
t["Uri"] = "URI";
t["Type"] = "Typ";

t["Suggestion_bar_simple_types_suffix"] = "(Jednoduchý)";
t["No_type_selected"] = "Není vybrán žádný typ atributu";
t["Please_select_attribute_type_first"] = "Prosím, nejprve vyberte typ atributu";
t["No_annotation_type"] = "Není vybrán žádný typ anotace";
t["Please_select_annotation_type_first"] = "Prosím, nejprve vyberte typ anotace";
t["Incorrect_attributes_values"] = "Jedna nebo více hodnot atributů jsou nesprávné";
t["Please_fill_in_correct_values_first"] = "Prosím, nejprve zadejte korektní hodnoty atributů";
t["Specified_attribute_type_not_exists"] = "Zadaný typ atributu neexistuje";
t["Please_select_existing_attribute_type"] = "Prosím, nejprve zadejte existující typ atributu"; 
t["No_annotations"] = "Žádné anotace";
t["There_are_no_annotations_with_specified_type"] = "Neexistují žádné anotace ani návrhy zadaného typu";
t["Required_check_off"] = "Atribut nyní není vyžadován";
t["Required_check_off_make_sure"] = "Prosím, ujistěte se, že jste checkbox neodškrtli proto, abyste nemuseli zadávat hodnotu atributu";
t["Required_check_off_make_sure_Nested"] = "Prosím, ujistěte se, že jste checkbox neodškrtli proto, abyste nemuseli vybírat odkaz na anotaci či zadávat vloženou anotaci";
t["Edit_annotation_not_possible"] = "Tuto anotaci není možné editovat";
t["Annotation_contains_unknown_attributes"] = "Anotace obsahuje jeden nebo více neznámých atributů";

// AEd.editors.EditorGUI 
t["Dlg_message_title"] = "Zpráva";
t["Dlg_message_ok"] = "Ok";
t["Dlg_confirm_title"] = "Potvrzení";
t["Dlg_confirm_yes"] = "Ano";
t["Dlg_confirm_no"] = "Ne";



// AEd.libs.Base64D_Encode
t["Dlg_message_abort"] = "Zrušit";
t["Dlg_info_processing_file"] = "Zpracovávam soubor";
t["Dlg_info_processing_file_desc"] = "Čekejte prosím";
t["Dlg_info_processing_file_aborted"] = "Zpracování souboru - přerušeno";
t["Dlg_info_processing_file_aborted_desc"] = "Operace přerušena";
t["Dlg_error_processing_error"] = "Zracování souboru - chyba";
t["Dlg_error_processing_error_desc"] = "Došlo k chybě při zpracování souboru";
t["Dlg_info_download_file"] = "Stáhnutí souboru";
t["Dlg_info_download_file_desc"] = "Žádný soubor ke stažení. Nahrajte soubor prosím";
t["Dlg_info_flash_download_file_ok"] = "Soubor stažen";
t["Dlg_info_flash_download_file_ok_desc"] = "Soubor byl úspěšně stažen";
t["Dlg_info_flash_download_file_error"] = "Chyba stažení souboru";
t["Dlg_info_flash_download_file_error_desc"] = "Během procesu stahování došlo k chybě - soubor nebyl uložen";
t["Dlg_error_filereader_unsup"] = "Váš prohlížeč nepodporuje FileReader";
t["Dlg_info_file_long"] = "Nahrávání souboru";
t["Dlg_info_file_long_desc"] = "Soubor je příliš dlouhý. Maximální povolená velikost souboru: ";

// AEd.libs.DurationPicker
t["DPicker_head"] = "Vyberte si dvě data nebo zadejte dobu trvání";
t["DPicker_from"] = "Od:";
t["DPicker_to"] = "Do:";
t["DPicker_duration"] = "Trvání:";
t["DPicker_years"] = "Roky:";
t["DPicker_months"] = "Měsíce:";
t["DPicker_days"] = "Dny:";
t["DPicker_hours"] = "Hodiny:";
t["DPicker_minutes"] = "Minuty:";
t["DPicker_seconds"] = "Sekundy:";
t["DPicker_cancel"] = "Zrušit";

// AEd.libs.Calendar
t["DCal_jan"] = "Leden";
t["DCal_feb"] = "Únor";
t["DCal_mar"] = "Březen";
t["DCal_apr"] = "Duben";
t["DCal_may"] = "Květen";
t["DCal_jun"] = "Červen";
t["DCal_jul"] = "Červenec";
t["DCal_aug"] = "Srpen";
t["DCal_sep"] = "Září";
t["DCal_oct"] = "Říjen";
t["DCal_nov"] = "Listopad";
t["DCal_dec"] = "Prosinec";
t["DCal_mon"] = "Pondělí";
t["DCal_tue"] = "Úterý";
t["DCal_wed"] = "Středa";
t["DCal_thu"] = "Čtvrtek";
t["DCal_fri"] = "Pátek";
t["DCal_sat"] = "Sobota";
t["DCal_sun"] = "Neděle";
t["DCal_timemode_warning"] = "TimeMode může být pouze 12 nebo 24";
t["DCal_time"] = "Čas:";
t["DCal_timezone"] = "Časové pásmo:";

// AEd.editors.EditorController 
t["Error_AEd_editors_EditorController_Missing_editor_instance_argument"] = "Chyba - AEd.editors.EditorController: Chybí instance editoru.";

// AEd.editors.AnnotationsManager    
t["Error_AEd_entities_Annotations_CreateNodeIterator_error_Your_browser_does_not_support_the_createNodeIterator_method"] = "Chyba - AEd.entities.Annotations: Váš prohlížeč nepodporuje metodu createNodeIterator.";





// AEd.entities.Annotation 
t["Error_AEd_entities_Annotation_Missing_params_object_argument"] = "Chyba - AEd.entites.Annotation: Chybí objekt parametrů.";
// AEd.entities.AnnotationsManager 
t["Error_AEd_entities_AnnotationsManager_Missing_argument"] = "Chyba - AEd.entites.AnnotationsManager: Chybí argument.";
t["Selected_annotation_is_document_annotation"] = "Vybraná anotace je anotace dokumentu";
t["You_can_find_it_in_Document_Annotations_dialog"] = "Můžete ji najít v dialogu Anotace dokumentu.";
// AEd.entities.Suggestion
t["Error_AEd_entities_Suggestion_Missing_params_object_argument"] = "Chyba - AEd.entites.Suggestion: Chybí objekt parametrů.";
t["Suggestion_entities_Refuse_suggestion"]  = "Odmítnout nabídku"; 
t["Suggestion_entities_Do_you_really_want_to_refuse_this_suggestion"]  = "Opravdu chcete odmítnout tuto nabídku?";
// AEd.entities.SuggestionsManager
t["Error_AEd_entities_SuggestionsManager_Missing_argument"] = "Chyba - AEd.entites.SuggestionsManager: Chybí argument.";
t["Selected_suggestion_is_document_suggestion"] = "Vybraná nabídnutá anotace je anotace dokumentu";
t["You_can_find_it_in_Document_Suggestions_dialog"] = "Můžete ji najít v dialogu Nabídnuté anotace dokumentu.";

// AEd.entities.Fragment 
t["Error_AEd_entites_Fragment_Missing_params_object_argument"] = "Chyba - AEd.entites.Fragment: Chybí objekt parametrů.";
t["Fragment_document_annotation"] = "anotace dokumentu";
t["Fragment_document_suggestion"] = "nabídka dokumentu";
t["Fragment_document_this_annotation"] = "Tato anotace";
t["Fragment_document_this_suggestion"] = "Tato nabídka";
t["Fragment_nested_annotations"] = "(vnořené anotace)";
t["Fragment_nested_suggestions"] = "(vnořené nabídky)";
t["Fragment_annotation_links"] = "(odkazy na anotace)";
t["Fragment_suggestion_links"] = "(odkazy na nabídky)";
t["Fragment_annotation_anyAnnotation_attribute"] = "(jakákoliv anotace)";
t["Fragment_suggestion_anyAnnotation_attribute"] = "(jakákoliv nabídka)";
t["Fragment_annotation_empty_nested_attribute"] = "(žádná anotace)";
t["Fragment_suggestion_empty_nested_attribute"] = "(žádná nabídka)";
t["Fragment_bad_fragment"] = "Špatný fragment";


// AEd.entities.FragmentsManager 
t["Error_AEd_entities_FragmentsManager_Missing_argument"] = "Chyba - AEd.entites.FragmentsManager: Chybí argument.";
t["Error_AEd_entities_FragmentsManager_CreateNodeIterator_error_Your_browser_does_not_support_the_createNodeIterator_method"] = "Chyba - AEd.entities.FragmentsManager: Váš prohlížeč nepodporuje metodu createNodeIterator.";
// AEd.entities.TypesManager    
t["Error_AEd_entities_TypesManager_Missing_argument"] = "Chyba - AEd.entites.TypesManager: Chybí argument.";
t["Simple"] = "Jednoduché";
t["Structured"] = "Strukturované";    
t["Ontology"] = "Ontologie";
t["Integer"] = "Integer";
t["String"] = "String";
t["Time"] = "Time";
t["Date"] = "Date";
t["DateTime"] = "DateTime";
t["Boolean"] = "Boolean";
t["URI"] = "URI";
t["Image"] = "Image";
t["GeoPoint"] = "GeoPoint";
t["Duration"] = "Trvání";
t["Binary"] = "Binární";
t["Text"] = "Text";
t["annotationLink"] = "Odkaz na anotaci";

// AEd.entities.TypesManager    
t["Error_AEd_entities_TypesFromOntologyManager_Missing_argument"] = "Chyba - AEd.entites.TypesFromOntologyManager: Chybí argument.";
    

    


// AEd.wysiwyg.WysiwygEditor
t["Error_AEd_wysiwyg_WysiwygEditor_Missing_editorType_argument"]  = "Chyba - AEd.wysiwyg.WysiwygEditor: Chybí argument editorType.";
t["Error_AEd_wysiwyg_WysiwygEditor_Missing_editorNativeObject_argument"]  = "Chyba - AEd.wysiwyg.WysiwygEditor: Chybí argument editorNativeObject.";
t["Error_AEd_wysiwyg_WysiwygEditor_Couldnt_create_instance_of_wysiwyg_editor"]  = "Chyba - AEd.wysiwyg.WysiwygEditor: Nelze vytvořit instance wysiwyg editoru";
t["Error_AEd_wysiwyg_WysiwygEditor_Wysiwyg_editor_not_supported"]  = "Chyba - AEd.wysiwyg.WysiwygEditor: Wysiwyg není podporován";  
// AEd.wysiwyg.TinyMCE    
t["Error_AEd_wysiwyg_TinyMCE_Missing_editorNativeObject_argument"]  = "Chyba - AEd.wysiwyg.TinyMCE: Chybí argument editorNativeObject.";





// AEd.ui
// ***************************************************************************** 
// AEd.ui.core.UIButton
t["Error_AEd_ui_core_UIButton_Error_in_creating_UIButton_from_source_element"]  = "Chyba - AEd.ui.core.UIButton: Chyba při vytváření UIButton.";
// AEd.ui.core.UIContainer
t["Error_AEd_ui_core_UIContainer_Error_in_creating_UIContainer_from_source_element"]  = "Chyba - AEd.ui.core.UIContainer: Chyba při vytváření UIContainer.";
// AEd.ui.Toolbar + AEd.ui.AdvancedToolbar
t["Advanced_toolbar_title"]  = "Pokročilé";
t["Toolbar_title"]  = "Panel editoru anotací";
t["Toolbar_button_connect"]  = "Připojit"; 
t["Toolbar_button_disconnect"]  = "Odpojit"; 
t["Toolbar_button_annotate"]  = "Anotovat";  
t["Toolbar_button_advanced"]  = "Pokročilé"; 
t["Toolbar_button_settings"]  = "Nastavení";  
t["Toolbar_button_subscriptions"]  = "Odběry";  
t["Toolbar_button_statusbar"]  = "Stavy editoru";   
t["Toolbar_button_persons"]  = "Osoby";
t["Toolbar_button_groups"]  = "Skupiny";
t["Toolbar_button_showAnnoDlgs"]  = "Dialogy anotací";
t["Toolbar_button_docAnnotations"]  = "Anotace dokumentu";
t["Toolbar_button_quickSuggestions"]  = "Rychlé nabídky";
t["Toolbar_button_suggestAnnotations"]  = "Nabídnout anotace";
t["Toolbar_button_suggestedAnnotations"]  = "Nabídnuté anotace";
t["Toolbar_button_docSuggestions"]  = "Nabídnuté anotace dokumentu";

// AEd.ui.DlgStatusBar
t["Dlg_statusbar_title"]  = "Stavy editoru";

// AEd.ui.DlgNotConnected

t["Dlg_not_connected_title"] = "Chyba připojení";
t["Dlg_not_connected_text"] = "Připojení se nezdařilo. Může to být způsobeno problémy na serveru.";
t["Dlg_not_connected_button_reconnect"] = "Znovupřipojení";
t["Dlg_not_connected_button_disable_aed"] = "Ukončit editor";
  
// AEd.ui.DlgConnect
t["Dlg_connect_title"]  = "Připojit";  
t["Dlg_connect_button_ok"]  = "OK";  
t["Dlg_connect_button_cancel"]  = "Zrušit"; 
t["Dlg_connect_label_connection_settings"]  = "Nastavení připojení"; 
t["Dlg_connect_label_server"]  = "Server"; 
t["Dlg_connect_label_user"]  = "Uživatel"; 
t["Dlg_connect_label_password"]  = "Heslo";
   
// AEd.ui.DlgSettings
t["Dlg_settings_title"]  = "Nastavení";  
t["Dlg_settings_button_save"]  = "Uložit";  
t["Dlg_settings_button_cancel"]  = "Zrušit";
t["Dlg_settings_button_select"]  = "Vybrat"; 
t["Dlg_settings_button_delete"]  = "Odstranit"; 
t["Dlg_settings_label_settings_list"]  = "Seznam nastavení";  
t["Dlg_settings_label_name"]  = "Název"; 
t["Dlg_settings_label_value"]  = "Hodnota";
t["Dlg_settings_settings_content_welcome"]  = "Vítejte v nastavení!";
t["Dlg_settings_settings_content"]  = "Zde si můžete editor anotací přizpůsobit vašim představám.";
t["Dlg_settings_client_content"]  = "Nastavení klienta ovlivní pouze samotný editor anotací.";
t["Dlg_settings_server_content"]  = "Nastavení serveru se uplatňuje při komunikace editoru anotací se serverem.";
t["Dlg_settings_common_content"]  = "Tato nastavení jsou společná pro klienta i server.";
t["Dlg_settings_unknown_content"]  = "Zde můžete přidat nová nastavení. Také se zde objeví všechna neznámá nastavení.";
t["Dlg_settings_unsubscriptions_content"]  = "Nastavení přihlášení a odhlášení k odběru anotací. Pro jednoduché přihlášení/odhlášení k odběru anotací můžete také použít dialog Odběry který vyvoláte tlačítkem Odběry (bez nutnosti znovupřipojení). Pro aplikaci nastavení odsud je nutné znovupřipojení";
t["Dlg_settings_node_settings"]  = "Nastavení";
t["Dlg_settings_node_client"]  = "Klient";
t["Dlg_settings_node_server"]  = "Server";
t["Dlg_settings_node_common"]  = "Společné";
t["Dlg_settings_node_unknown"]  = "Neznámé";
t["Dlg_settings_node_unsubscriptions"]  = "Odběry";
t["Dlg_settings_button_add"]  = "Přidat"
t["Dlg_settings_node_clientAnnotationTypeColor"]  = "Vlastnosti vzhledu typů anotací";
t["Dlg_settings_node_clientAnnotationTypeColor_label_type"]  = "Typ";
t["Dlg_settings_node_clientAnnotationTypeColor_label_color"]  = "Řetězec vlastností vzhledu";
t["Dlg_settings_node_clientAnnotationTypeColor_content"]  = "Barvy typů anotací umožňuji nastavit každému typu anotace jinou barvu a snadno tak od sebe anotace jednotlivých typů odlišit.";
t["Dlg_settings_node_clientAdvancedToolbarOptions"]  = "Pokročilá lišta nástrojů";
t["Dlg_settings_node_AdvancedToolbarOptionsAllInOne_radiobutton"] = "Vše v jedné liště nástrojů";
t["Dlg_settings_node_AdvancedToolbarOptionsTwoToolbars_radiobutton"] = "Pokročilé nástroje odděleně";
t["Dlg_settings_node_clientAdvancedToolbarOptions_content"] = "Zvolte způsob zobrazení lišty nástrojů:";
t["Dlg_settings_node_clientRefuseSuggestion"]  = "Odmítnutí nabídky";
t["Dlg_settings_node_clientRefuseSuggestion_content"]  = "Můžete nastavit, zda odmítnutí nabídnuté anotace má vyžadovat potvrzení. Server nebude nabízet odmítnuté anotace vícekrát.";
t["Dlg_settings_node_clientRefuseSuggestion_checkbox"]  = "Vyžadovat potvrzení při odmítnutí nabídnuté anotace";
t["Dlg_settings_node_clientSuggestionConfidence"]  = "Důvěra v nabídky";
t["Dlg_settings_node_clientSuggestionConfidence_content"]  = "Důvěra v nabídky je číslo v procentech. Každá nabídnutá anotace obsahuje hodnotu v procentech udávající míru důvěry ve správnost nabídky. Pokud je tato hodnota u některé z nabídnutých anotací menší než zvolená důvěra v nabídky, klient takovou anotací zahodí.";
t["Dlg_settings_node_clientSuggestionAutoConfirming"]  = "Automatické potvrzování nabídek";
t["Dlg_settings_node_clientSuggestionAutoConfirming_content"]  = "Nabídky s mírou důvěry, která je větší nebo rovna zvolené hodnotě, budou automaticky potvrzeny. Pokud je hodnota nastavena na 0, automatické potvrzování nabídek anotací je vypnuto. Automatické potvrzování nabídek má vyšší prioritu než odmítání nabídek.";
t["Dlg_settings_node_clientFoldingOfAttributes"]  = "Zobrazení atributů";
t["Dlg_settings_node_clientFoldingOfAttributes_content"]  = "V okně anotace, které se zobrazí při umístění myši nad fragment anotace, jsouu atributy defaultně skyty a je třeba kliknout na fragment a tlačítko, které atributy zobrazí. Zde je možné nastavit, zda mají být atributy skryty či nikoliv.";
t["Dlg_settings_node_clientFoldingOfAttributes_checkbox"]  = "neskrývat atributy";
t["Dlg_settings_node_clientFoldingOfAttributesResize_checkbox"]  = "změnit velikost okna anotace dynamicky";
t["Dlg_settings_node_clientFoldingOfAttributesHideButton_checkbox"] = "nezobrazovat tlačítko pro skrytí atributů";
t["Dlg_settings_node_clientFoldingOfNesteds_checkbox"]  = "neskrývat atributy vnořených a odkazovaných anotací";
t["Dlg_settings_node_clientFoldingOfNestedsHideButton_checkbox"] = "nezobrazovat tlačítko pro skrytí atributů vnořených a odkazovaných anotací";
t["Dlg_settings_node_clientFoldingOfNestedsLevels"] = "Počet úrovní zanoření";
t["Dlg_settings_node_clientFoldingOfNestedsHideLevel"] = "Skrýt vnořený obsah od úrovně";
t["Dlg_settings_node_clientFoldingOfNestedsHideLevel_off"] = "vypnuto";
t["Dlg_settings_node_serverLanguage"]  = "Jazyk";
t["Dlg_settings_node_serverLanguage_content"]  = "Jazyk server se týká hlášení, která server zasílá.";
t["Dlg_settings_node_defaultUserGroup"]  = "Standardní skupina"
t["Dlg_settings_node_defaultUserGroup_content"]  = "Standardní skupina je skupina, do které je uživatel přihlášen, pokud nevstoupil do žádné jiné skupiny.";
t["Dlg_settings_one_or_more_settings_incorrect"]  = "Jedno nebo více nastavení jsou nesprávná";
t["Dlg_settings_please_fill_in_the_correct_settings"]  = "Prosím, nejprve zadejte korektní nastavení";
  
// AEd.ui.DlgAnnotate
t["Dlg_annotate_title"]  = "Anotovat";           
t["Dlg_annotate_button_save"]  = "Uložit";  
t["Dlg_annotate_button_cancel"]  = "Zrušit";  
t["Dlg_annotate_button_browse"]  = "Procházet";  
t["Dlg_annotate_button_download"]  = "Stáhnout"; 
t["Dlg_annotate_label_annotate"]  = "Anotovat";  
t["Dlg_annotate_label_selection"]  = "Výběr"; 
t["Dlg_annotate_label_type"]  = "Typ"; 
t["Dlg_annotate_label_content"]  = "Obsah"; 
t["Dlg_annotate_label_attributes"]  = "Atributy"; 
t["Dlg_annotate_label_name"]  = "Jméno";  
t["Dlg_annotate_label_value"]  = "Hodnota";  
t["Dlg_annotate_label_lat"]  = "Šířka"; 
t["Dlg_annotate_label_long"]  = "Délka"; 
t["Dlg_annotate_label_entity_type"]  = "Typ entity"; 
t["Dlg_annotate_label_entity_name"]  = "Jméno entity";
t["Dlg_annotate_label_entity_description"]  = "Popis entity";
t["Dlg_annotate_label_entity_image"]  = "Obrázek"; 
t["Dlg_annotate_button_select"]  = "Vybrat"; 
t["Dlg_annotate_button_add_attribute"]  = "Přidat"; 
t["Dlg_annotate_button_delete_attribute"]  = "Odstranit"; 
t["Dlg_annotate_button_clear_attribute"]  = "Vyčistit"; 
t["Dlg_annotate_button_entity"]  = "Entita";
t["Dlg_annotate_button_add_attributes_from_ontology"]  = "Výběr z ontologie"; 
t["Dlg_annotate_button_annotate_whole_document"]  = "Anotovat celý dokument"; 
t["Dlg_annotate_button_previous"]  = "<-";
t["Dlg_annotate_button_next"]  = "->";
t["Dlg_annotate_button_add"]  = "Přidat";
t["Dlg_annotate_button_delete"]  = "Odstranit"; 
t["Dlg_annotate_selection_whole_doc"]  = "*** CELÝ DOKUMENT ***";
t["Dlg_annotate_selection_nothing"]  = "*** NIC ***";
t["Dlg_annotate_nested_list_incorrect"]  = "Hodnota tohoto atributu je nesprávná";
t["Dlg_annotate_nested_list_incorrect_nested"]  = "V seznamu je již jedna nebo více vnořených anotací, nelze tedy vložit odkaz na anotaci";
t["Dlg_annotate_nested_list_incorrect_link"]  = "V seznamu je již jeden nebo více odkazů na anotace, nelze proto vložit vnořenou anotaci";
t["Dlg_annotate_node_annotation"]  = "Anotace";
t["Remove_annotation"]  = "Odstranit anotaci"; 
t["Do_you_really_want_to_remove_this_annotation"]  = "Opravdu chcete odstranit tuto anotaci?"; 
t["Dlg_annotate_checkbox_add_to_type_attributes"]  = "Přidat mezi běžné atributy daného typu anotace";
t["Dlg_annotate_checkbox_add_to_type_change_attributes"]  = "Změnit mezi běžnými atributy daného typu anotace"; 
t["Dlg_annotate_checkbox_required"]  = "Vyžadovaný atribut";
t["Dlg_annotate_simpletype_example_integer"]  = "Příklad: 15, -5, ...";
t["Dlg_annotate_simpletype_example_string"]  = "Příklad: Petr, 22, květina, ...";
t["Dlg_annotate_simpletype_example_time"]  = "Příklad: 23:59:22, 12:05:09+05:00, 08:16:46-11:00, ...";
t["Dlg_annotate_simpletype_example_date"]  = "Příklad: 2012-01-01, 1999-06-08+07:00, 2005-04-22-02:00, ...";
t["Dlg_annotate_simpletype_example_datetime"]  = "Příklad: 2010-12-24T22:00:37, 2008-10-16T11:49:32+09:00, 1995-04-03T01:15:22-12:00";
t["Dlg_annotate_simpletype_example_boolean"]  = "Příklad: true, false, 1, 0";
t["Dlg_annotate_simpletype_example_URI"]  = "Příklad: http://example.com/";
t["Dlg_annotate_simpletype_example_Image"]  = "Příklad: http://example.com/image.png";
t["Dlg_annotate_simpletype_example_geopointlat"]  = "Příklad: -23.38, 37.77, ...";
t["Dlg_annotate_simpletype_example_geopointlong"]  = "Příklad: -41.85, -122.41, ...";
t["Dlg_annotate_simpletype_example_duration"]  = "Příklad: -P10D, P5Y2M11D, P5Y2M10DT14H, ...";
t["Dlg_annotate_simpletype_example_binary"]  = "Příklad: cesta/soubor";
t["Dlg_annotate_simpletype_example_text"]  = "Příklad: Toto je příklad textu.";
t["Dlg_annotate_remove_attr_from_type"]  = "Atribut byl odstraněn";
t["Dlg_annotate_do_you_want_to_remove_attr_from_type"]  = "Chcete atribut odstranit také z vybraného typu anotace?";

// AEd.ui.DlgPersons
t["Dlg_persons_title"]  = "Osoby";    
t["Dlg_persons_button_filter"]  = "Filtrovat";  
t["Dlg_persons_label_persons_list"]  = "Osoby";
   
// AEd.ui.DlgGroups
t["Dlg_groups_title"]  = "Skupiny";    
t["Dlg_groups_button_filter"]  = "Filtrovat";  
t["Dlg_groups_label_persons_list"]  = "Skupiny";
t["Dlg_groups_no_group"]  = "Uživatel není v žádné skupině";
t["Dlg_groups_enter_any_group"]  = "Prosím, přihlaste se do některé z dostupných skupin";
   
// AEd.ui.Person
t["Person_Assigned_Groups"]  = "Skupiny";          
t["Person_No_Groups"]  = "Žádné skupiny";  
t["Error_AEd_ui_Person_Error_missing_person_object"]  = "Chyba - AEd.ui.Person: Chybí objekt osoby.";

// AEd.ui.Group
t["Group_Assigned_Persons"]  = "Osoby";           
t["Group_No_Persons"]  = "Žádné skupiny";  
t["Error_AEd_ui_Group_Error_missing_group_object"]  = "Chyba - AEd.ui.Group: Chybí objekt skupiny.";
     
// AEd.ui.SuggestionsBarItem
t["Error_AEd_ui_core_SuggestionsBarItem_Error_in_creating_SuggestionsBarItem_from_source_element"]  = "Chyba - AEd.ui.core.SuggestionsBarItem: Chyba při vytváření SuggestionsBarItem.";

// AEd.ui.DlgTypes
t["Dlg_types_title"]  = "Typy";    
t["Dlg_types_label_type_selection"]  = "Výběr typu";   
t["Dlg_types_label_add_new_type_as_subtype"]  = "Přidat nový typ jako podtyp vybraného";  
t["Dlg_types_button_add_type"]  = "Přidat";  
t["Dlg_types_button_remove_type"]  = "Odstranit vybraný typ";  
t["Dlg_types_button_ok"]  = "Ok";  
t["Dlg_types_button_cancel"]  = "Zrušit";
 
// AEd.ui.DlgAttrTypes
t["Dlg_attrTypes_title"]  = "Typy atributů";    
t["Dlg_attrTypes_label_type_selection"]  = "Výběr typu atributu";   
t["Dlg_attrTypes_label_attribute_name"]  = "Jméno atributu"; 
t["Dlg_attrTypes_label_name"]  = "Jméno"; 
t["Dlg_attrTypes_label_add_new_type_as_subtype"]  = "Přidat nový typ jako podtyp vybraného";   
t["Dlg_attrTypes_button_add_type"]  = "Přidat";  
t["Dlg_attrTypes_button_remove_type"]  = "Odstranit vybraný typ"; 
t["Dlg_attrTypes_button_ok"]  = "Ok";  
t["Dlg_attrTypes_button_cancel"]  = "Zrušit"; 
t["Dlg_attrTypes_checkbox_add_to_type_attributes"]  = "Přidat mezi běžné atributy daného typu anotace (zobrazí se ostatním při vytváření nové anotace)"; 
t["Dlg_attrTypes_checkbox_required"]  = "Vyžadovaný atribut";
t["Dlg_attrTypes_attr_cannot_be_added"]  = "Atribut nemůže být přidán";
t["Dlg_attrTypes_attr_name_and_type"]  = "Vyplňte jméno atributu a vyberte jeho typ";
t["Dlg_attrTypes_label_type"]  = "Typ";

// AEd.ui.DlgAttrFromOntology
t["Dlg_attrTypesFromOntology_title"]  = "Typy atributů z ontologie"; 
t["Dlg_attrTypesFromOntology_label"]  = "Výběr typu atributu z ontologie"; 

// AEd.ui.DlgSubscriptions
t["Dlg_subscribtions_title"]  = "Odběry";  
t["Dlg_subscribtions_legend_subscribed"]  = "Přihlášené"; 
t["Dlg_subscribtions_lagend_unsubscribed"]  = "Odhlášené"; 
t["Dlg_subscribtions_button_add"]  = "Přidat nový";  
t["Dlg_subscribtions_button_save"]  = "Uložit"; 
t["Dlg_subscribtions_button_cancel"]  = "Zrušit"; 
t["Dlg_subscribtions_button_delete"]  = "Odstranit";     
t["Dlg_subscribtions_button_subscribe"]  = "Odebírat";        
t["Dlg_subscribtions_button_unsubscribe"]  = "Neodebírat";  
t["Dlg_subscribtions_label_subscribtions"]  = "Odběry";  
t["Dlg_subscribtions_label_user"]  = "Uživatel"; 
t["Dlg_subscribtions_label_type"]  = "Typ";  
t["Dlg_subscribtions_label_uri"]   = "URI";  

// AEd.ui.DlgSynchronize
t["Dlg_synchronize_title"]  = "Synchronizovat";   
t["Dlg_synchronize_button_update_from_server"]  = "Aktualizovat ze serveru";  
t["Dlg_synchronize_button_synchronize_overwrite"]  = "Synchronizovat a přepsat";  
t["Dlg_synchronize_button_cancel"]  = "Zrušit"; 
t["Dlg_synchronize_Synchronize_document"]  = "Dokument je třeba aktualizovat, může existovat další verze dokumentu."; 

// AEd.ui.DlgDocAnnotations
t["Dlg_docAnnotations_title"]  = "Anotace dokumentu";   

// AEd.ui.DlgSuggestAnnotations
t["Dlg_suggestAnnotations_title"]  = "Nabídnout anotace";
t["Dlg_suggestAnnotations_select_annotations_type"] = "Výběr typu anotací";
t["Dlg_suggestAnnotations_label_selection"]  = "Výběr";
t["Dlg_suggestAnnotations_button_select_whole_document"]  = "Vybrat celý dokument";
t["Dlg_suggestAnnotations_button_no_suggestion"]  = "Žádné nabídky";
t["Dlg_suggestAnnotations_label_type"]  = "Typ";
t["Dlg_suggestAnnotations_button_browse"]  = "Procházet";
t["Dlg_suggestAnnotations_button_suggest"]  = "Nabídnout";
t["Dlg_suggestAnnotations_button_cancel"]  = "Zrušit";
t["Dlg_suggestAnnotations_selection_whole_doc"]  = "*** CELÝ DOKUMENT ***";
t["Dlg_suggestAnnotations_selection_no_suggestions"]  = "*** ŽÁDNÉ NABÍDKY ***";
t["Dlg_suggestAnnotations_selected_type_does_not_exist"]  = "Vybraný typ neexistuje";
t["Dlg_suggestAnnotations_select_existing_type_first"]  = "Prosím, vyberte existující typ nebo typ neuvádějte a budou vám nabídnuty anotace všech typů";   

// AEd.ui.DlgSuggestedAnnotations
t["Dlg_suggestedAnnotations_title"]  = "Nabídnuté anotace";  

// AEd.ui.DlgDocSuggestions
t["Dlg_docSuggestions_title"]  = "Nabídnuté anotace dokumentu";

// AEd.ui.DlgTypeColors
t["Dlg_typeColors_title"]  = "Barvy typů anotací";
t["Dlg_typeColors_button_ok"]  = "Ok";
t["Dlg_typeColors_button_cancel"]  = "Zrušit";
t["Dlg_typeColors_type_color_selection"]  = "Výběr typu a barvy";
t["Dlg_typeColors_label_type"]  = "Typ";
t["Dlg_typeColors_button_browse"]  = "Procházet";
t["Dlg_typeColors_label_color"]  = "Barva";
t["Dlg_typeColors_label_alpha"]  = "Alfa";
t["Dlg_typeColors_label_italic"]  = "Italc";
t["Dlg_typeColors_label_underlined"]  = "Podtržené";
t["Dlg_typeColors_label_bold"]  = "Tučné";
t["Dlg_typeColors_label_font_color"]  = "Barva písma";
t["Dlg_typeColors_color_or_alpha_incorrect"]  = "Hodnota barva nebo alfa je nesprávná";
t["Dlg_typeColors_please_fill_in_the_correct_values"]  = "Prosím, nejprve zadejte korektní hodnoty";

// AEd.ui.Annotation
t["No_Attributes"]  = "Žádné atributy";
t["Annotation_button_show_details"] = "Zobrazit atributy";
t["Annotation_button_hide_details"] = "Skrýt atributy";
t["Annotation_button_edit"] = "Editovat";
t["Annotation_button_delete"] = "Smazat";
t["Annotation_button_show_nested_details"] = "Zobrazit vnořené atributy";
t["Annotation_button_hide_nested_details"] = "Skrýt vnořené atributy";
t["Annotation_read_more"] = "Číst více";

// AEd.ui.Suggestion
t["Suggestion_no_author"]  = "<br />";
t["Suggestion_no_datetime"]  = "Anotace zatím nebyla vytvořena";
t["Suggestion_button_show_details"] = "Zobrazit atributy";
t["Suggestion_button_hide_details"] = "Skrýt atributy";
t["Suggestion_button_confirm"] = "Potvrdit";
t["Suggestion_button_edit"] = "Editovat a potvrdit";
t["Suggestion_button_refuse"] = "Odmítnout";
t["Suggestion_button_show_nested_details"] = "Zobrazit vnořené atributy";
t["Suggestion_button_hide_nested_details"] = "Skrýt vnořené atributy";
    
// *****************************************************************************     
    return t;  
})();

// *****************************************************************************
// cze translations
// ***************************************************************************** 

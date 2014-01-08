/**
 * slo.js
 *
 * Slovak translations.
 * 
 * @author: Martin Kleban, Milos Cudrak 
 * 
 */



AEd.langs.slo = (function() {
    
    // object to return
    var t = {};
    
    
// *****************************************************************************
// slo translations
// *****************************************************************************     
// AEd
t["AEd_button_title"] = "Editor anotácií";
t["Error_AEd_Config_object_not_found"] = "Chyba - AEd: Konfiguračný súbor nenájdený.";
     
// AEd.langs.I18n
t["Error_AEd_langs_I18n_Config_object_DEFAULT_LANG_property_not_found"] = "Chyba - AEd.langs.I18n: Defaultný jazykový balík nenájdený.";    
// AEd.xml.XMLUtils   
t["Error_AEd_xml_XMLUtils_Parsing_error"] = "Chyba - AEd.xml.XMLUtils: Analýza XML se nepodarila.";
t["No_parser_available"] = "No parser available.";
t["Error_AEd_xml_XMLUtils_Serializer_error_XML_Serializer_not_supported"] = "Chyba - AEd.xml.XMLUtils: Serializácia XML nie je dostupná.";
t["Error_AEd_xml_XMLUtils_XPath_error_No_XPath_subsystem_available"] = "Chyba - AEd.xml.XMLUtils: XPath subsystém nie je dostupný.";

// AEd.comm.Protocol   
t["Error_AEd_comm_Protocol_XML_Parsing_server_message_error"] = "Chyba - AEd.comm.Protocol: Analýza správy serveru sa nepodarila.";

// AEd.ajax.XHR    
t["Error_AEd_ajax_XHR_XMLHttp_not_created"] = "Chyba - AEd.ajax.XHR: Vytvorenie XMLHttp sa nepodarilo.";

// AEd.dom.Element    
t["Error_AEd_dom_Element_Argument_passed_to_constructor_is_of_wrong_type"] = "Chyba - AEd.dom.Element: Argument konštruktoru je chybného typu.";

// AEd.editors.Editor 
t["Error_AEd_editors_Editor_Missing_config_object_argument"] = "Chyba - AEd.editors.Editor: Nie je zadaná žiadna konfigurácia.";
t["Error_AEd_editors_Editor_Missing_HTML_DOM_parser"] = "Error - AEd.editors.Editor: Chýba implementácia HTML parseru.";
t["Connecting"] = "Pripájanie...";
t["Please_wait"] = "Čakajte, prosím...";
t["Connection_error"] = "Chyba spojenia";
t["Reload_error"] = "Chyba znovunačítania";
t["Please_reconnect"] = "Prosím, pripojte sa znovu.";
t["Connected"] = "Pripojené";
t["See_msg_details_for_more_information"] = "Správa obsahuje podrobnosti &darr;";
t["Error"] = "Chyba";
t["Warning"] = "Varovanie";
t["Unexpected_message"] = "Neočakávaná správa";
t["Session_ID"] = "ID sedenia";
t["Server_Protocol_Version"] = "Verzia protokolu serveru";
t["Disconnected"] = "Odpojené";
t["Connection_was_closed"] = "Pripojenie bolo uzatvorené";
t["Sending_message"] = "Odosielanie správy";
t["Persons"] = "Osoby";
t["Message_received"] = "Správa prijatá";  
t["Annotations"] = "Anotácie";
t["Suggestions"] = "Ponuky";
t["Suggestions_timeout_elapsed"] = "Časovač pre príjem ponúk vypršal";
t["Annotations_and_suggestions"] = "Anotácie a ponuky";
t["OK"] = "OK";
t["Reload"] = "Znovunačítané";
t["Access_denied"] = "Prístup odopretý";
t["Access_denied_user"] = "Užívateľ";
t["Access_denied_type"] = "Typ";
t["Access_denied_uri"] = "URI";
t["Error_attributes"] = "Attribúty";
t["Error_attributes_name"] = "Meno";
t["Error_attributes_value"] = "Hodnota";  
t["Annotation_URI"] = "URI anotácie";  
t["Settings"] = "Nastavenie";
t["Settings_name"] = "Meno";
t["Settings_value"] = "Hodnota";     
t["Synchronized"] = "Synchronizované";
t["Synchornize"] = "Synchronizovať";
t["Query_Persons"] = "Filtrovanie osôb";
t["Query_Groups"] = "Filtrovanie skupín";
t["Groups"] = "Skupiny";
t["Join_Group"] = "Pripojiť sa ku skupine";
t["Leave_Group"] = "Opustiť skupinu";
t["Query_Types"] = "Filtrovanie typov";
t["Query_Attr_From_Onto"] = "Atribúty z ontológie";
t["Types"] = "Typy";
t["Resynchronize"] = "Znovu synchronizovať";
t["Unsubscribe"] = "Neodoberať";
t["Subscribe"] = "Odoberať";
t["Suggestion"] = "Ponúknuť";
t["User"] = "Užívateľ";
t["Uri"] = "URI";
t["Type"] = "Typ";

t["Suggestion_bar_simple_types_suffix"] = "(Jednoduchý)";
t["No_type_selected"] = "Nie je vybraný žiadny typ atribútu";
t["Please_select_attribute_type_first"] = "Prosím, najskôr vyberte typ atribútu";
t["No_annotation_type"] = "Nie je vybraný žiadny typ anotácie";
t["Please_select_annotation_type_first"] = "Prosím, najskôr vyberte typ anotácie";
t["Incorrect_attributes_values"] = "Jedna alebo viacero hodnôt atribútov je nesprávnych";
t["Please_fill_in_correct_values_first"] = "Prosím, najskôr zadajte korektné hodnoty atribútov";
t["Specified_attribute_type_not_exists"] = "Zadaný typ atribútu neexistuje";
t["Please_select_existing_attribute_type"] = "Prosím, najskôr zadajte existujúci typ atribútu"; 
t["No_annotations"] = "Žiadne anotácie";
t["There_are_no_annotations_with_specified_type"] = "Neexistujú žiadne anotácie ani ponuky zadaného typu";
t["Required_check_off"] = "Atribút teraz nie je vyžadovaný";
t["Required_check_off_make_sure"] = "Prosím, uistite sa, že ste checkbox neodškrtli preto, aby ste nemuseli zadávať hodnotu atribútu";
t["Required_check_off_make_sure_Nested"] = "Prosím, uistite se, že ste checkbox neodškrtli preto, aby ste nemuseli vyberať odkaz na anotáciu či zadávať vloženú anotáciu";
t["Edit_annotation_not_possible"] = "Túto anotáciu nie je možné editovať";
t["Annotation_contains_unknown_attributes"] = "Anotácia obsahuje jeden alebo viacero neznámych atribútov";

// AEd.editors.EditorGUI 
t["Dlg_message_title"] = "Správa";
t["Dlg_message_ok"] = "Ok";
t["Dlg_confirm_title"] = "Potvrdenie";
t["Dlg_confirm_yes"] = "Áno";
t["Dlg_confirm_no"] = "Nie";



// AEd.libs.Base64D_Encode
t["Dlg_message_abort"] = "Zrušiť";
t["Dlg_info_processing_file"] = "Spracovávam súbor";
t["Dlg_info_processing_file_desc"] = "Čakajte prosím";
t["Dlg_info_processing_file_aborted"] = "Spracovanie súboru - prerušené";
t["Dlg_info_processing_file_aborted_desc"] = "Operácia prerušená";
t["Dlg_error_processing_error"] = "Spracovanie súboru - chyba";
t["Dlg_error_processing_error_desc"] = "Došlo k chybe pri spracovávaní súboru";
t["Dlg_info_download_file"] = "Stiahnutie súboru";
t["Dlg_info_download_file_desc"] = "Žiadny súbor na stiahnutie. Nahrajte súbor prosím";
t["Dlg_info_flash_download_file_ok"] = "Súbor stiahnutý";
t["Dlg_info_flash_download_file_ok_desc"] = "Súbor bol úspešne stiahnutý";
t["Dlg_info_flash_download_file_error"] = "Chyba sťahovania súboru";
t["Dlg_info_flash_download_file_error_desc"] = "Počas procesu sťahovania došlo k chybe - súbor nebol uložený";
t["Dlg_error_filereader_unsup"] = "Váš prehliadač nepodporuje FileReader";
t["Dlg_info_file_long"] = "Nahrávanie súboru";
t["Dlg_info_file_long_desc"] = "Súbor je príliš dlhý. Maximálna povolená veľkosť súboru: ";

// AEd.libs.DurationPicker
t["DPicker_head"] = "Vyberte si dva dátumy alebo zadajte dobu trvania";
t["DPicker_from"] = "Od:";
t["DPicker_to"] = "Do:";
t["DPicker_duration"] = "Trvanie:";
t["DPicker_years"] = "Roky:";
t["DPicker_months"] = "Mesiace:";
t["DPicker_days"] = "Dni:";
t["DPicker_hours"] = "Hodiny:";
t["DPicker_minutes"] = "Minúty:";
t["DPicker_seconds"] = "Sekundy:";
t["DPicker_cancel"] = "Zrušiť";

// AEd.libs.Calendar
t["DCal_jan"] = "Január";
t["DCal_feb"] = "Február";
t["DCal_mar"] = "Marec";
t["DCal_apr"] = "Apríl";
t["DCal_may"] = "Máj";
t["DCal_jun"] = "Jún";
t["DCal_jul"] = "Júl";
t["DCal_aug"] = "August";
t["DCal_sep"] = "September";
t["DCal_oct"] = "Október";
t["DCal_nov"] = "November";
t["DCal_dec"] = "December";
t["DCal_mon"] = "Pondelok";
t["DCal_tue"] = "Utorok";
t["DCal_wed"] = "Streda";
t["DCal_thu"] = "Štvrtok";
t["DCal_fri"] = "Piatok";
t["DCal_sat"] = "Sobota";
t["DCal_sun"] = "Nedeľa";
t["DCal_timemode_warning"] = "TimeMode môže byť jedine 12 alebo 24";
t["DCal_time"] = "Čas:";
t["DCal_timezone"] = "Časové pásmo:";

// AEd.editors.EditorController 
t["Error_AEd_editors_EditorController_Missing_editor_instance_argument"] = "Chyba - AEd.editors.EditorController: Chýba inštancia editoru.";

// AEd.editors.AnnotationsManager    
t["Error_AEd_entities_Annotations_CreateNodeIterator_error_Your_browser_does_not_support_the_createNodeIterator_method"] = "Chyba - AEd.entities.Annotations: Váš prehliadač nepodporuje metódu createNodeIterator.";





// AEd.entities.Annotation 
t["Error_AEd_entities_Annotation_Missing_params_object_argument"] = "Chyba - AEd.entites.Annotation: Chýba objekt parametrov.";
// AEd.entities.AnnotationsManager 
t["Error_AEd_entities_AnnotationsManager_Missing_argument"] = "Chyba - AEd.entites.AnnotationsManager: Chýba argument.";
t["Selected_annotation_is_document_annotation"] = "Vybraná anotácia je anotácia dokumentu";
t["You_can_find_it_in_Document_Annotations_dialog"] = "Môžete ju nájsť v dialógu Anotácie dokumentu.";
// AEd.entities.Suggestion
t["Error_AEd_entities_Suggestion_Missing_params_object_argument"] = "Chyba - AEd.entites.Suggestion: Chýba objekt parametrov.";
t["Suggestion_entities_Refuse_suggestion"]  = "Odmietnuť ponuku"; 
t["Suggestion_entities_Do_you_really_want_to_refuse_this_suggestion"]  = "Skutočne chcete odmietnuť túto ponuku?";
// AEd.entities.SuggestionsManager
t["Error_AEd_entities_SuggestionsManager_Missing_argument"] = "Chyba - AEd.entites.SuggestionsManager: Chýba argument.";
t["Selected_suggestion_is_document_suggestion"] = "Vybraná ponúknuta anotácia je anotácia dokumentu";
t["You_can_find_it_in_Document_Suggestions_dialog"] = "Môžete ju nájsť v dialógu Ponúknuté anotácie dokumentu.";

// AEd.entities.Fragment 
t["Error_AEd_entites_Fragment_Missing_params_object_argument"] = "Chyba - AEd.entites.Fragment: Chýba objekt parametrov.";
t["Fragment_document_annotation"] = "anotácia dokumentu";
t["Fragment_document_suggestion"] = "ponuka dokumentu";
t["Fragment_document_this_annotation"] = "Táto anotácia";
t["Fragment_document_this_suggestion"] = "Táto ponuka";
t["Fragment_nested_annotations"] = "(vnorené anotácie)";
t["Fragment_nested_suggestions"] = "(vnorené ponuky)";
t["Fragment_annotation_links"] = "(odkazy na anotácie)";
t["Fragment_suggestion_links"] = "(odkazy na ponuky)";
t["Fragment_annotation_anyAnnotation_attribute"] = "(akákoľvek anotácia)";
t["Fragment_suggestion_anyAnnotation_attribute"] = "(akákoľvek ponuka)";
t["Fragment_annotation_empty_nested_attribute"] = "(žiadna anotace)";
t["Fragment_suggestion_empty_nested_attribute"] = "(žiadna ponuka)";
t["Fragment_bad_fragment"] = "Chybný fragment";


// AEd.entities.FragmentsManager 
t["Error_AEd_entities_FragmentsManager_Missing_argument"] = "Chyba - AEd.entites.FragmentsManager: Chýba argument.";
t["Error_AEd_entities_FragmentsManager_CreateNodeIterator_error_Your_browser_does_not_support_the_createNodeIterator_method"] = "Chyba - AEd.entities.FragmentsManager: Váš prehliadač nepodporuje metodu createNodeIterator.";
// AEd.entities.TypesManager    
t["Error_AEd_entities_TypesManager_Missing_argument"] = "Chyba - AEd.entites.TypesManager: Chýba argument.";
t["Simple"] = "Jednoduché";
t["Structured"] = "Štrukturované";    
t["Ontology"] = "Ontológia";
t["Integer"] = "Integer";
t["String"] = "String";
t["Time"] = "Time";
t["Date"] = "Date";
t["DateTime"] = "DateTime";
t["Boolean"] = "Boolean";
t["URI"] = "URI";
t["Image"] = "Image";
t["GeoPoint"] = "GeoPoint";
t["Duration"] = "Trvanie";
t["Binary"] = "Binárny";
t["Text"] = "Text";
t["annotationLink"] = "Odkaz na anotáciu";

// AEd.entities.TypesManager    
t["Error_AEd_entities_TypesFromOntologyManager_Missing_argument"] = "Chyba - AEd.entites.TypesFromOntologyManager: Chýba argument.";
    

    


// AEd.wysiwyg.WysiwygEditor
t["Error_AEd_wysiwyg_WysiwygEditor_Missing_editorType_argument"]  = "Chyba - AEd.wysiwyg.WysiwygEditor: Chýba argument editorType.";
t["Error_AEd_wysiwyg_WysiwygEditor_Missing_editorNativeObject_argument"]  = "Chyba - AEd.wysiwyg.WysiwygEditor: Chýba argument editorNativeObject.";
t["Error_AEd_wysiwyg_WysiwygEditor_Couldnt_create_instance_of_wysiwyg_editor"]  = "Chyba - AEd.wysiwyg.WysiwygEditor: Nie je možné vytvoriť inštanciu wysiwyg editoru";
t["Error_AEd_wysiwyg_WysiwygEditor_Wysiwyg_editor_not_supported"]  = "Chyba - AEd.wysiwyg.WysiwygEditor: Wysiwyg nie je podporovaný";  
// AEd.wysiwyg.TinyMCE    
t["Error_AEd_wysiwyg_TinyMCE_Missing_editorNativeObject_argument"]  = "Chyba - AEd.wysiwyg.TinyMCE: Chýba argument editorNativeObject.";





// AEd.ui
// ***************************************************************************** 
// AEd.ui.core.UIButton
t["Error_AEd_ui_core_UIButton_Error_in_creating_UIButton_from_source_element"]  = "Chyba - AEd.ui.core.UIButton: Chyba pri vytváraní UIButton.";
// AEd.ui.core.UIContainer
t["Error_AEd_ui_core_UIContainer_Error_in_creating_UIContainer_from_source_element"]  = "Chyba - AEd.ui.core.UIContainer: Chyba pri vytváraní UIContainer.";
// AEd.ui.Toolbar + AEd.ui.AdvancedToolbar
t["Advanced_toolbar_title"]  = "Pokročilé";
t["Toolbar_title"]  = "Panel editoru anotácií";
t["Toolbar_button_connect"]  = "Pripojiť"; 
t["Toolbar_button_disconnect"]  = "Odpojiť"; 
t["Toolbar_button_annotate"]  = "Anotovať";  
t["Toolbar_button_advanced"]  = "Pokročilé"; 
t["Toolbar_button_settings"]  = "Nastavenia";  
t["Toolbar_button_subscriptions"]  = "Odbery";  
t["Toolbar_button_statusbar"]  = "Stavy editora";   
t["Toolbar_button_persons"]  = "Osoby";
t["Toolbar_button_groups"]  = "Skupiny";
t["Toolbar_button_showAnnoDlgs"]  = "Dialógy anotácií";
t["Toolbar_button_docAnnotations"]  = "Anotácie dokumentu";
t["Toolbar_button_quickSuggestions"]  = "Rýchle ponuky";
t["Toolbar_button_suggestAnnotations"]  = "Ponúknuť anotácie";
t["Toolbar_button_suggestedAnnotations"]  = "Ponúknuté anotácie";
t["Toolbar_button_docSuggestions"]  = "Ponúknuté anotácie dokumentu";

// AEd.ui.DlgStatusBar
t["Dlg_statusbar_title"]  = "Stavy editora";

// AEd.ui.DlgNotConnected

t["Dlg_not_connected_title"] = "Chyba pripojenia";
t["Dlg_not_connected_text"] = "Pripojenie neúspešné. Môže to byť spôsobené problémami na serveri.";
t["Dlg_not_connected_button_reconnect"] = "Znovupripojenie";
t["Dlg_not_connected_button_disable_aed"] = "Ukončiť editor";
  
// AEd.ui.DlgConnect
t["Dlg_connect_title"]  = "Pripojiť";  
t["Dlg_connect_button_ok"]  = "OK";  
t["Dlg_connect_button_cancel"]  = "Zrušiť"; 
t["Dlg_connect_label_connection_settings"]  = "Nastavenie pripojenia"; 
t["Dlg_connect_label_server"]  = "Server"; 
t["Dlg_connect_label_user"]  = "Užívateľ"; 
t["Dlg_connect_label_password"]  = "Heslo";
   
// AEd.ui.DlgSettings
t["Dlg_settings_title"]  = "Nastavenia";  
t["Dlg_settings_button_save"]  = "Uložiť";  
t["Dlg_settings_button_cancel"]  = "Zrušiť";
t["Dlg_settings_button_select"]  = "Vybrať"; 
t["Dlg_settings_button_delete"]  = "Odstrániť"; 
t["Dlg_settings_label_settings_list"]  = "Zoznam nastavení";  
t["Dlg_settings_label_name"]  = "Názov"; 
t["Dlg_settings_label_value"]  = "Hodnota";
t["Dlg_settings_settings_content_welcome"]  = "Vitejte v nastaveniach!";
t["Dlg_settings_settings_content"]  = "Tu si môžete editor anotacií prispôsobiť vašim predstavám.";
t["Dlg_settings_client_content"]  = "Nastavenia klienta ovplyvnia len editor anotacií.";
t["Dlg_settings_server_content"]  = "Nastavenia servera sa uplatňujú pri komunikácii editora anotacií so serverom.";
t["Dlg_settings_common_content"]  = "Tieto nastavenia sú spoločné pre klienta i server.";
t["Dlg_settings_unknown_content"]  = "Tu môžete pridať nové nastavenia. Taktiež sa tu objavia všetky neznáme nastavenia.";
t["Dlg_settings_unsubscriptions_content"]  = "Nastavenia prihlásenia a odhlásenia k odberu anotacií. Pre jednoduché prihlásenie/odhlásenie k odberu anotácií môžete použiť dialóg Odbery ktorý vyvoláte tlačítkom Odbery (bez nutnosti znovupripojenia). Pre aplikovanie nastavení z tohoto miesta je nutné znovupripojenie";
t["Dlg_settings_node_settings"]  = "Nastavena";
t["Dlg_settings_node_client"]  = "Klient";
t["Dlg_settings_node_server"]  = "Server";
t["Dlg_settings_node_common"]  = "Spoločné";
t["Dlg_settings_node_unknown"]  = "Neznáme";
t["Dlg_settings_node_unsubscriptions"]  = "Odbery";
t["Dlg_settings_button_add"]  = "Pridať"
t["Dlg_settings_node_clientAnnotationTypeColor"]  = "Vlastnosti vzhľadu typov anotácií";
t["Dlg_settings_node_clientAnnotationTypeColor_label_type"]  = "Typ";
t["Dlg_settings_node_clientAnnotationTypeColor_label_color"]  = "Reťazec vlastností vzhľadu";
t["Dlg_settings_node_clientAnnotationTypeColor_content"]  = "Farby typov anotácií umožňujú nastaviť každému typu anotácie inú farbu a ľahko tak od seba anotácie jednotlivých typov odlíšiť.";
t["Dlg_settings_node_clientAdvancedToolbarOptions"]  = "Pokročilá lišta nástrojov";
t["Dlg_settings_node_AdvancedToolbarOptionsAllInOne_radiobutton"] = "Všetko v jednej liště nástrojov";
t["Dlg_settings_node_AdvancedToolbarOptionsTwoToolbars_radiobutton"] = "Pokročilé nástroje oddelene";
t["Dlg_settings_node_clientAdvancedToolbarOptions_content"] = "Zvoľte spôsob zobrazenia lišty nástrojov:";
t["Dlg_settings_node_clientRefuseSuggestion"]  = "Odmietnutie ponuky";
t["Dlg_settings_node_clientRefuseSuggestion_content"]  = "Môžete nastaviť, či odmietnutie ponúknutej anotácie má vyžadovať potvrdenie. Server nebude ponúkať odmietnuté anotácie viackrát.";
t["Dlg_settings_node_clientRefuseSuggestion_checkbox"]  = "Vyžadovať potvrdenie pri odmietnutí ponúknutej anotácie";
t["Dlg_settings_node_clientSuggestionConfidence"]  = "Dôveryhodnosť ponúk";
t["Dlg_settings_node_clientSuggestionConfidence_content"]  = "Dôveryhodnosť ponúk je číslo v percentách. Každá ponúknutá anotácia obsahuje hodnotu v percentách udávajúcu mieru dôvery v správnosť ponuky. Ak je táto hodnota u niektorej z ponúknutých anotácií menšia než zvolená dôvěryhodnosť ponúk, klient túto anotáciu zahodí.";
t["Dlg_settings_node_clientSuggestionAutoConfirming"]  = "Automatické potvrdzovanie ponúk";
t["Dlg_settings_node_clientSuggestionAutoConfirming_content"]  = "Ponuky s mierou dôveryhodnosti, ktorá je väčšia alebo rovná zvolenej hodnote, budú automaticky potvrdené. Ak je hodnota nastavená na 0, automatické potvrdzovanie ponúk anotácií je vypnuté. Automatické potvrdzovanie ponúk má vyššiu prioritu než odmietanie ponúk.";
t["Dlg_settings_node_clientFoldingOfAttributes"]  = "Zobrazení atributů";
t["Dlg_settings_node_clientFoldingOfAttributes_content"]  = "V okne anotácie, ktoré sa zobrazí pri umiestnení myši nad fragment anotácie, sú atribúty defaultne skryté a je potrebné kliknúť na fragment a tlačidlo, ktoré atribúty zobrazí. Tu je možné nastaviť, či majú býť atribúty skryté alebo nie.";
t["Dlg_settings_node_clientFoldingOfAttributes_checkbox"]  = "neskrývať atribúty";
t["Dlg_settings_node_clientFoldingOfAttributesResize_checkbox"]  = "zmeniť veľkosť okna anotácie dynamicky";
t["Dlg_settings_node_clientFoldingOfAttributesHideButton_checkbox"] = "nezobrazovať tlačidlo na skrytie atribútov";
t["Dlg_settings_node_clientFoldingOfNesteds_checkbox"]  = "neskrývať atribúty vnorených a odkazovaných anotácií";
t["Dlg_settings_node_clientFoldingOfNestedsHideButton_checkbox"] = "nezobrazovať tlačidlo na skrytie atribútov vnorených a odkazovaných anotácií";
t["Dlg_settings_node_clientFoldingOfNestedsLevels"] = "Počet úrovní zanorenia";
t["Dlg_settings_node_clientFoldingOfNestedsHideLevel"] = "Skryť vnorený obsah od úrovne";
t["Dlg_settings_node_clientFoldingOfNestedsHideLevel_off"] = "vypnuté";
t["Dlg_settings_node_serverLanguage"]  = "Jazyk";
t["Dlg_settings_node_serverLanguage_content"]  = "Jazyk servera sa týka hlásení, ktoré server zasiela.";
t["Dlg_settings_node_defaultUserGroup"]  = "Štandardná skupina"
t["Dlg_settings_node_defaultUserGroup_content"]  = "Štandardná skupina je skupina, do ktorej je užívateľ prihlásený, pokiaľ nevstúpil do žiadnej inej skupiny.";
t["Dlg_settings_one_or_more_settings_incorrect"]  = "Jedno alebo viacero nastavení je nesprávnych";
t["Dlg_settings_please_fill_in_the_correct_settings"]  = "Prosím, najskôr zadajte korektné nastavenia";
  
// AEd.ui.DlgAnnotate
t["Dlg_annotate_title"]  = "Anotovať";           
t["Dlg_annotate_button_save"]  = "Uložiť";  
t["Dlg_annotate_button_cancel"]  = "Zrušiť";  
t["Dlg_annotate_button_browse"]  = "Prechádzať";  
t["Dlg_annotate_button_download"]  = "Stiahnuť"; 
t["Dlg_annotate_label_annotate"]  = "Anotovať";  
t["Dlg_annotate_label_selection"]  = "Výber"; 
t["Dlg_annotate_label_type"]  = "Typ"; 
t["Dlg_annotate_label_content"]  = "Obsah"; 
t["Dlg_annotate_label_attributes"]  = "Atribúty"; 
t["Dlg_annotate_label_name"]  = "Meno";  
t["Dlg_annotate_label_value"]  = "Hodnota";  
t["Dlg_annotate_label_lat"]  = "Šírka"; 
t["Dlg_annotate_label_long"]  = "Dĺžka"; 
t["Dlg_annotate_label_entity_type"]  = "Typ entity"; 
t["Dlg_annotate_label_entity_name"]  = "Meno entity";
t["Dlg_annotate_label_entity_description"]  = "Popis entity";
t["Dlg_annotate_label_entity_image"]  = "Obrázok"; 
t["Dlg_annotate_button_select"]  = "Vybrať"; 
t["Dlg_annotate_button_add_attribute"]  = "Pridať"; 
t["Dlg_annotate_button_delete_attribute"]  = "Odstrániť"; 
t["Dlg_annotate_button_clear_attribute"]  = "Vyčistiť"; 
t["Dlg_annotate_button_entity"]  = "Entita";
t["Dlg_annotate_button_add_attributes_from_ontology"]  = "Výber z ontológie"; 
t["Dlg_annotate_button_annotate_whole_document"]  = "Anotovať celý dokument"; 
t["Dlg_annotate_button_previous"]  = "<-";
t["Dlg_annotate_button_next"]  = "->";
t["Dlg_annotate_button_add"]  = "Pridať";
t["Dlg_annotate_button_delete"]  = "Odstrániť"; 
t["Dlg_annotate_selection_whole_doc"]  = "*** CELÝ DOKUMENT ***";
t["Dlg_annotate_selection_nothing"]  = "*** NIČ ***";
t["Dlg_annotate_nested_list_incorrect"]  = "Hodnota tohto atribútu je nesprávna";
t["Dlg_annotate_nested_list_incorrect_nested"]  = "V zozname je už jedna alebo viacero vnorených anotácií, nejde teda vložiť odkaz na anotáciu";
t["Dlg_annotate_nested_list_incorrect_link"]  = "V zozname je už jeden alebo viacero odkazov na anotácie, nejde preto vložiť vnorenú anotáciu";
t["Dlg_annotate_node_annotation"]  = "Anotácia";
t["Remove_annotation"]  = "Odstrániť anotáciu"; 
t["Do_you_really_want_to_remove_this_annotation"]  = "Skutočné chcete odstrániť túto anotáciu?"; 
t["Dlg_annotate_checkbox_add_to_type_attributes"]  = "Pridať medzi bežné atribúty daného typu anotácie";
t["Dlg_annotate_checkbox_add_to_type_change_attributes"]  = "Zmeniť medzi bežnými atribútmi daného typu anotácie"; 
t["Dlg_annotate_checkbox_required"]  = "Vyžadovaný atribút";
t["Dlg_annotate_simpletype_example_integer"]  = "Príklad: 15, -5, ...";
t["Dlg_annotate_simpletype_example_string"]  = "Príklad: Peter, 22, kvetina, ...";
t["Dlg_annotate_simpletype_example_time"]  = "Príklad: 23:59:22, 12:05:09+05:00, 08:16:46-11:00, ...";
t["Dlg_annotate_simpletype_example_date"]  = "Príklad: 2012-01-01, 1999-06-08+07:00, 2005-04-22-02:00, ...";
t["Dlg_annotate_simpletype_example_datetime"]  = "Príklad: 2010-12-24T22:00:37, 2008-10-16T11:49:32+09:00, 1995-04-03T01:15:22-12:00";
t["Dlg_annotate_simpletype_example_boolean"]  = "Príklad: true, false, 1, 0";
t["Dlg_annotate_simpletype_example_URI"]  = "Príklad: http://example.com/";
t["Dlg_annotate_simpletype_example_Image"]  = "Príklad: http://example.com/image.png";
t["Dlg_annotate_simpletype_example_geopointlat"]  = "Príklad: -23.38, 37.77, ...";
t["Dlg_annotate_simpletype_example_geopointlong"]  = "Príklad: -41.85, -122.41, ...";
t["Dlg_annotate_simpletype_example_duration"]  = "Príklad: -P10D, P5Y2M11D, P5Y2M10DT14H, ...";
t["Dlg_annotate_simpletype_example_binary"]  = "Príklad: cesta/súbor";
t["Dlg_annotate_simpletype_example_text"]  = "Príklad: Toto je príklad textu.";
t["Dlg_annotate_remove_attr_from_type"]  = "Atribút bol odstránený";
t["Dlg_annotate_do_you_want_to_remove_attr_from_type"]  = "Chcete atribút odstrániť tiež z vybraného typu anotácie?";

// AEd.ui.DlgPersons
t["Dlg_persons_title"]  = "Osoby";    
t["Dlg_persons_button_filter"]  = "Filtrovať";  
t["Dlg_persons_label_persons_list"]  = "Osoby";
   
// AEd.ui.DlgGroups
t["Dlg_groups_title"]  = "Skupiny";    
t["Dlg_groups_button_filter"]  = "Filtrovať";  
t["Dlg_groups_label_persons_list"]  = "Skupiny";
t["Dlg_groups_no_group"]  = "Uživatel nie je v žiadnej skupine";
t["Dlg_groups_enter_any_group"]  = "Prosím, prihláste sa do niektorej z dostupných skupín";
   
// AEd.ui.Person
t["Person_Assigned_Groups"]  = "Skupiny";          
t["Person_No_Groups"]  = "Žiadne skupiny";  
t["Error_AEd_ui_Person_Error_missing_person_object"]  = "Chyba - AEd.ui.Person: Chýba objekt osoby.";

// AEd.ui.Group
t["Group_Assigned_Persons"]  = "Osoby";           
t["Group_No_Persons"]  = "Žiadne skupiny";  
t["Error_AEd_ui_Group_Error_missing_group_object"]  = "Chyba - AEd.ui.Group: Chýba objekt skupiny.";
     
// AEd.ui.SuggestionsBarItem
t["Error_AEd_ui_core_SuggestionsBarItem_Error_in_creating_SuggestionsBarItem_from_source_element"]  = "Chyba - AEd.ui.core.SuggestionsBarItem: Chyba pri vytváraní SuggestionsBarItem.";

// AEd.ui.DlgTypes
t["Dlg_types_title"]  = "Typy";    
t["Dlg_types_label_type_selection"]  = "Výber typu";   
t["Dlg_types_label_add_new_type_as_subtype"]  = "Pridať nový typ ako podtyp vybraného";  
t["Dlg_types_button_add_type"]  = "Pridať";  
t["Dlg_types_button_remove_type"]  = "Odstrániť vybraný typ";  
t["Dlg_types_button_ok"]  = "Ok";  
t["Dlg_types_button_cancel"]  = "Zrušiť";
 
// AEd.ui.DlgAttrTypes
t["Dlg_attrTypes_title"]  = "Typy atribútov";    
t["Dlg_attrTypes_label_type_selection"]  = "Výber typu atribútu";   
t["Dlg_attrTypes_label_attribute_name"]  = "Meno atribútu"; 
t["Dlg_attrTypes_label_name"]  = "Meno"; 
t["Dlg_attrTypes_label_add_new_type_as_subtype"]  = "Pridať nový typ ako podtyp vybraného";   
t["Dlg_attrTypes_button_add_type"]  = "Pridať";  
t["Dlg_attrTypes_button_remove_type"]  = "Odstrániť vybraný typ"; 
t["Dlg_attrTypes_button_ok"]  = "Ok";  
t["Dlg_attrTypes_button_cancel"]  = "Zrušiť"; 
t["Dlg_attrTypes_checkbox_add_to_type_attributes"]  = "Pridať medzi bežné atribúty daného typu anotácie (zobrazí sa ostatným pri vytváraní novej anotácie)"; 
t["Dlg_attrTypes_checkbox_required"]  = "Vyžadovaný atribút";
t["Dlg_attrTypes_attr_cannot_be_added"]  = "Atribút nemôže byť pridaný";
t["Dlg_attrTypes_attr_name_and_type"]  = "Vyplnite meno atribútu a vyberte jeho typ";
t["Dlg_attrTypes_label_type"]  = "Typ";

// AEd.ui.DlgAttrFromOntology
t["Dlg_attrTypesFromOntology_title"]  = "Typy atribútov z ontológie"; 
t["Dlg_attrTypesFromOntology_label"]  = "Výber typu atribútu z ontológie"; 

// AEd.ui.DlgSubscriptions
t["Dlg_subscribtions_title"]  = "Odbery";  
t["Dlg_subscribtions_legend_subscribed"]  = "Prihlásené"; 
t["Dlg_subscribtions_lagend_unsubscribed"]  = "Odhlásené"; 
t["Dlg_subscribtions_button_add"]  = "Pridať nový";  
t["Dlg_subscribtions_button_save"]  = "Uložiť"; 
t["Dlg_subscribtions_button_cancel"]  = "Zrušiť"; 
t["Dlg_subscribtions_button_delete"]  = "Odstrániť";     
t["Dlg_subscribtions_button_subscribe"]  = "Odoberať";        
t["Dlg_subscribtions_button_unsubscribe"]  = "Neodoberať";  
t["Dlg_subscribtions_label_subscribtions"]  = "Odbery";  
t["Dlg_subscribtions_label_user"]  = "Užívateľ"; 
t["Dlg_subscribtions_label_type"]  = "Typ";  
t["Dlg_subscribtions_label_uri"]   = "URI";  

// AEd.ui.DlgSynchronize
t["Dlg_synchronize_title"]  = "Synchronizovať";   
t["Dlg_synchronize_button_update_from_server"]  = "Aktualizovať zo servera";  
t["Dlg_synchronize_button_synchronize_overwrite"]  = "Synchronizovať a prepísať";  
t["Dlg_synchronize_button_cancel"]  = "Zrušiť"; 
t["Dlg_synchronize_Synchronize_document"]  = "Dokument je potrebné aktualizovať, môže existovať ďalšia verzia dokumentu."; 

// AEd.ui.DlgDocAnnotations
t["Dlg_docAnnotations_title"]  = "Anotácie dokumentu";   

// AEd.ui.DlgSuggestAnnotations
t["Dlg_suggestAnnotations_title"]  = "Ponúknuť anotácie";
t["Dlg_suggestAnnotations_select_annotations_type"] = "Výber typu anotacií";
t["Dlg_suggestAnnotations_label_selection"]  = "Výber";
t["Dlg_suggestAnnotations_button_select_whole_document"]  = "Vybrať celý dokument";
t["Dlg_suggestAnnotations_button_no_suggestion"]  = "Žiadne ponuky";
t["Dlg_suggestAnnotations_label_type"]  = "Typ";
t["Dlg_suggestAnnotations_button_browse"]  = "Prechádzať";
t["Dlg_suggestAnnotations_button_suggest"]  = "Ponúknuť";
t["Dlg_suggestAnnotations_button_cancel"]  = "Zrušiť";
t["Dlg_suggestAnnotations_selection_whole_doc"]  = "*** CELÝ DOKUMENT ***";
t["Dlg_suggestAnnotations_selection_no_suggestions"]  = "*** ŽIADNE PONUKY ***";
t["Dlg_suggestAnnotations_selected_type_does_not_exist"]  = "Vybraný typ neexistuje";
t["Dlg_suggestAnnotations_select_existing_type_first"]  = "Prosím, vyberte existujúci typ alebo typ neuvádzajte a budú vám ponúknuté anotácie všetkých typov";   

// AEd.ui.DlgSuggestedAnnotations
t["Dlg_suggestedAnnotations_title"]  = "Ponúknuté anotácie";  

// AEd.ui.DlgDocSuggestions
t["Dlg_docSuggestions_title"]  = "Ponúknuté anotácie dokumentu";

// AEd.ui.DlgTypeColors
t["Dlg_typeColors_title"]  = "Farby typov anotácií";
t["Dlg_typeColors_button_ok"]  = "Ok";
t["Dlg_typeColors_button_cancel"]  = "Zrušiť";
t["Dlg_typeColors_type_color_selection"]  = "Výber typu a farby";
t["Dlg_typeColors_label_type"]  = "Typ";
t["Dlg_typeColors_button_browse"]  = "Prechádzať";
t["Dlg_typeColors_label_color"]  = "Farba";
t["Dlg_typeColors_label_alpha"]  = "Alfa";
t["Dlg_typeColors_label_italic"]  = "Italic";
t["Dlg_typeColors_label_underlined"]  = "Podčiarknuté";
t["Dlg_typeColors_label_bold"]  = "Tučné";
t["Dlg_typeColors_label_font_color"]  = "Farba písma";
t["Dlg_typeColors_color_or_alpha_incorrect"]  = "Hodnota farby alebo alfa je nesprávna";
t["Dlg_typeColors_please_fill_in_the_correct_values"]  = "Prosím, najskôr zadajte korektné hodnoty";

// AEd.ui.Annotation
t["No_Attributes"]  = "Žiadne atribúty";
t["Annotation_button_show_details"] = "Zobraziť atribúty";
t["Annotation_button_hide_details"] = "Skryť atribúty";
t["Annotation_button_edit"] = "Editovať";
t["Annotation_button_delete"] = "Zmazať";
t["Annotation_button_show_nested_details"] = "Zobraziť vnorené atribúty";
t["Annotation_button_hide_nested_details"] = "Skryť vnorené atribúty";
t["Annotation_read_more"] = "Čítať viac";

// AEd.ui.Suggestion
t["Suggestion_no_author"]  = "<br />";
t["Suggestion_no_datetime"]  = "Anotácia zatiaľ nebola vytvorená";
t["Suggestion_button_show_details"] = "Zobraziť atribúty";
t["Suggestion_button_hide_details"] = "Skryť atribúty";
t["Suggestion_button_confirm"] = "Potvrdiť";
t["Suggestion_button_edit"] = "Editovať a potvrdiť";
t["Suggestion_button_refuse"] = "Odmietnuť";
t["Suggestion_button_show_nested_details"] = "Zobraziť vnorené atribúty";
t["Suggestion_button_hide_nested_details"] = "Skryť vnorené atribúty";
    
// *****************************************************************************     
    return t;  
})();

// *****************************************************************************
// slo translations
// ***************************************************************************** 

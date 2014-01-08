<?php
global $user;
global $language;
$tinymce_mod_path = drupal_get_path('module', 'annotation_editor');

// default URI (only NID)
$node = menu_get_object();
$wrapper = entity_metadata_wrapper('node', $node);

// we have NID and CA/SEC ID
if (isset($node->nid) && isset($wrapper->field_ca_sec_id)) {
    $value = $wrapper->field_ca_sec_id->value();
    // if we can read CA/SEC ID
    if (!empty($value)) {
        $uri = url("nid/".$node->nid."/casecid/".$value, Array("absolute" => TRUE));
    }
    // if we can read only NID
    else {
        $uri = url("nid/".$node->nid, Array("absolute" => TRUE));
    }
}

// we have only NID
else if (isset($node->nid)) {
    $uri = url("nid/".$node->nid, Array("absolute" => TRUE));
}

// we have only CA/SEC ID (should not happend, we always edit node)
else if (isset($wrapper->field_ca_sec_id)) {
    $value = $wrapper->field_ca_sec_id->value();
    if (!empty($value)) {
        $uri = url("casecid/".$wrapper->field_ca_sec_id->value(), Array("absolute" => TRUE));      
    }
}
else {
    $uri = "";
}

// language for Annotation editor
$lang = "eng";
// get drupal language
if (isset($language->language)) {
    // convert drupal language to ISO 639-2
    switch($language->language) {
        case "en":
            $lang = "eng";
        break;
    
        case "cs":
            $lang = "cze";
        break;
    
        default: 
            $lang = "eng";
    }
}

// login values for Annotation editor
// these values are used for authentization on 4A Server
$js_array = array('aed' => array(
    'uri' => $uri,
    'login' => $user->name,
    'token' => (isset($_SESSION['authToken4AServer'])) ? $_SESSION['authToken4AServer'] : "",
    'system' => url("<front>", Array("absolute" => TRUE)),
    'path' => url(drupal_get_path('module', 'annotation_editor') . '/plugins/', Array("absolute" => TRUE)),
    'lang' => $lang
));



if (is_dir($tinymce_mod_path .'/plugins/aed/') && user_access('access tinymce aed') ) {

    // if 4A annotation editor is installed
    drupal_add_css($tinymce_mod_path. '/plugins/aed/aed/css/custom.css', array('group' => CSS_DEFAULT, 'every_page' => TRUE));
    
    drupal_add_js($js_array, array('type' => 'setting', 'group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/AEd.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/Config.js', array('group' => JS_LIBRARY, 'weight' => -1));

    // absolute path for AEd
    drupal_add_js('AEd.CONFIG.AED_PATH="./'.$tinymce_mod_path.'/plugins/aed/aed/"', array('type' => 'inline', 'group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js('AEd.CONFIG.DEFAULT_SERVER_URI="'.variable_get('annot_server').'";', array('type' => 'inline', 'group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js('AEd.CONFIG.DEFAULT_LANG="'.$lang.'"', array('type' => 'inline', 'group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js('AEd.CONFIG.DEFAULT_SETTINGS_SERVER_LANGUAGE="'.$lang.'"', array('type' => 'inline', 'group' => JS_LIBRARY, 'weight' => -1));
    
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/langs/langs.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/langs/I18n.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/langs/eng.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/langs/cze.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/langs/slo.js', array('group' => JS_LIBRARY, 'weight' => -1));

    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/utils/utils.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/utils/Dispatcher.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/utils/Cleanup.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/utils/Fragments.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/utils/Object.js', array('group' => JS_LIBRARY, 'weight' => -1));

    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/dom/dom.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/dom/CSSLoader.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/dom/DOMUtils.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/dom/ElementUtils.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/dom/Events.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/dom/Mouse.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/dom/Element.js', array('group' => JS_LIBRARY, 'weight' => -1));

    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/xml/xml.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/xml/XMLUtils.js', array('group' => JS_LIBRARY, 'weight' => -1));

    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ajax/ajax.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ajax/XHR.js', array('group' => JS_LIBRARY, 'weight' => -1));

    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/editors/editors.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/editors/Editor.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/editors/EditorsManager.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/editors/EditorGUI.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/editors/EditorController.js', array('group' => JS_LIBRARY, 'weight' => -1));

    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/wysiwyg/wysiwyg.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/wysiwyg/WysiwygEditor.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/wysiwyg/TinyMCE.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/wysiwyg/plugins.js', array('group' => JS_LIBRARY, 'weight' => -1));

    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/comm/comm.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/comm/Protocol.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/comm/CommUtils.js', array('group' => JS_LIBRARY, 'weight' => -1));

    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/ui.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/core/core.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/core/UIComponent.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/core/UIButton.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/core/UIContainer.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/core/UIDialog.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/core/UIToolbar.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/core/UIMessage.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/core/UITree.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/core/UITreeNode.js', array('group' => JS_LIBRARY, 'weight' => -1));

    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/AdvancedToolbar.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DialogManager.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/Toolbar.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgConnect.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgSettings.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgAnnotate.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgStatusBar.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgPersons.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgGroups.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/Message.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/Annotation.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/Subscription.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/Person.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/Group.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/Suggestion.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/Subscription.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/SuggestionsBarItem.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/SuggestionsBar.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgTypes.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgAttrTypes.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgAttrFromOntology.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgSynchronize.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgSubscriptions.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgDocAnnotations.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgSuggestAnnotations.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgSuggestedAnnotations.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgDocSuggestions.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/ui/DlgTypeColors.js', array('group' => JS_LIBRARY, 'weight' => -1));

    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/entities.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/Annotation.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/AnnotationsManager.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/Fragment.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/FragmentsManager.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/SettingsManager.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/PersonsManager.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/GroupsManager.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/TypesManager.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/TypesFromOntologyManager.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/Suggestion.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/SuggestionsManager.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/js/entities/SubscriptionsManager.js', array('group' => JS_LIBRARY, 'weight' => -1));

    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/Timestamp/Timestamp.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/RGBColor/RGBColor.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/JSColor/jscolor.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/IERange-m2/IERange-m2.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/TreeWalker/TreeWalker.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/XPath-JS/xpath.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/Calendar/DateTimePicker/datetimepicker_css.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/Calendar/DateTimePicker/timezones.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/Calendar/DateTimePicker/jquery-ui-select-to-autocomplete.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/DurationPicker/libs.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/DurationPicker/durationPickerGlobals.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/DurationPicker/durationPicker.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/Base64D_Encode/base64d_encoder.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js($tinymce_mod_path .'/plugins/aed/aed/lib/AEd/lib/SpecialHtmlCharacters/SpecialHtmlCharacters.js', array('group' => JS_LIBRARY, 'weight' => -1));
    drupal_add_js('AEd.init();', array('type' => 'inline', 'group' => JS_LIBRARY, 'weight' => -0.9));
 }        
        

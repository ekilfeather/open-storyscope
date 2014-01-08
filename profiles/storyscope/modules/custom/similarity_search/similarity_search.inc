<?php

/**
 * Function to fill html tag <select> in similarity_search form.
 * It create list of all stories in storyscope.
 *
 * @param string $story_type Optimal value used as filter. Only values dossier or object_story.
 * @return string options list for html tag <select>
 */
function similarity_search_get_select_list($story_type = NULL) {
    $options = Array();
    $options[0] = array('title' => t('None'));
    
    if (empty($story_type)) {
        $story_type = Array('dossier', 'object_story');
    }   
    
    $result = db_select('node')
        ->fields('node', array('nid', 'title', 'type'))
        ->condition('type', $story_type)
        ->execute();
    
    while($data = $result->fetchAssoc()) {
        $options[$data["nid"]] = array
        (
          'title' => $data["title"],
          'type' => $data["type"]
        );
    }

    return $options;
}

/**
 * Function to get all agregator identificators which are already stored in database.
 * Parameter $type tell us in which table we should look for identificators.
 *
 * @param int $parentNid nid of parent item (objectStory, dossier)
 * @param string|array $types type(s) of items (object, reference)
 * @return array array of identificators which are already stored in databse according to item type and according to parent
 */
function similarity_search_get_saved_objects($parentNid, $types = NULL) {
    $ret = Array();
    
    if (empty($parentNid)) {
        return $ret;
    }
    
    // type is not array (string possibly) so change it to the array
    if (!is_array($types) && !empty($types)) {
        $types = array($types);
    }
    
    $parent = node_load($parentNid);
    $parent_wrapper = entity_metadata_wrapper('node', $parent);

    // no type is filled, use default types
    if (empty($types)) {
        if ($parent->type == "dossier") {
            $types = Array('object_story', 'object', 'reference', 'event');
        }
        else if ($parent->type == "object_story") {
            $types = Array('object', 'reference', 'event');
        }
    }
    
    // go through each type and get iterator and get SEC IDs
    foreach ($types AS $type) {
        // parent is dossier
        if ($parent->type == "dossier") {
            // item type which we want to get (for example: list of all object stories)
            switch ($type) {
                case 'object_story':
                    if (isset($parent_wrapper->field_dossier_object_stories)) {
                        $it = $parent_wrapper->field_dossier_object_stories->getIterator();
                        $count = $parent_wrapper->field_dossier_object_stories->count();
                    }
                    else {
                        return $ret;
                    }
                break;

                case 'object':
                    if (isset($parent_wrapper->field_dossier_objects)) {
                        $it = $parent_wrapper->field_dossier_objects->getIterator();
                        $count = $parent_wrapper->field_dossier_objects->count();                   
                    }
                    else {
                        return $ret;
                    }
                break;

                case 'reference':
                    if (isset($parent_wrapper->field_dossier_references)) {
                        $it = $parent_wrapper->field_dossier_references->getIterator();
                        $count = $parent_wrapper->field_dossier_references->count();
                    }
                    else {
                        return $ret;
                    }
                break;

                case 'event':
                    if (isset($parent_wrapper->field_dossier_events)) {
                        $it = $parent_wrapper->field_dossier_events->getIterator();
                        $count = $parent_wrapper->field_dossier_events->count();
                    }
                    else {
                        return $ret;
                    }
                break;

                default:
                    return $ret;
            }
        }

        // parent is object story
        else if($parent->type == "object_story") {
            // item type which we want to get (for example: list of all objects)
            switch ($type) {
                case 'object':
                    if (isset($parent_wrapper->field_object_story_objects)) {
                        $it = $parent_wrapper->field_object_story_objects->getIterator();
                        $count = $parent_wrapper->field_object_story_objects->count();
                    }
                    else {
                        return $ret;
                    }
                break;

                case 'reference':
                    if (isset($parent_wrapper->field_object_story_references)) {
                        $it = $parent_wrapper->field_object_story_references->getIterator();
                        $count = $parent_wrapper->field_object_story_references->count();
                    }
                    else {
                        return $ret;
                    }
                break;

                case 'event':
                    if (isset($parent_wrapper->field_object_story_events)) {
                        $it = $parent_wrapper->field_object_story_events->getIterator();
                        $count = $parent_wrapper->field_object_story_events->count();
                    }
                    else {
                        return $ret;
                    }
                break;

                default:
                    return $ret;
            }
        }
        // unknown parent type
        else {
            return $ret;
        }

        if ($count > 0) {
            // get node ca/sec id
            foreach($it AS $delta => $wrapper) {
                $node = node_load((int)$it->current()->raw());

                if ($node) {
                    $node_wrapper = entity_metadata_wrapper('node', $node);

                    // try to read ca_sec_id field
                    $field_ca_sec_id = $node_wrapper->field_ca_sec_id->value();
                    if (!empty($field_ca_sec_id)) { 
                        $ret[] = $field_ca_sec_id;
                    }
                }
            }
        }
    }
    
    return $ret;
}

/**
 * This function works with node object passed to similarity_search_connection() function.
 * 
 * @param type $node node which we want to process in SEC Store API
 * @return array PHP array which will be converted to JSON and sent to SEC Store API
 */
function similarity_search_sec_store_process($node) {
    return similarity_search_sec_store_connection($node, 'process');
}

/**
 * This function works with $form_state array which is passed to similarity_search_connection() function.
 * The form must have field called "query_text", "type", "parent", "from" and "size".
 * Fields from and size are used for paging data in SEC Store API. This fields should by hidden.
 * Field parent contains parent NID (or is empty if there is not any parent).
 * 
 * @param type $form_state form_state array from form
 * @return array PHP array which will be converted to JSON and sent to SEC Store API
 */
function similarity_search_sec_store_query($form_state) {
    $response = similarity_search_sec_store_connection($form_state, 'query');
    
    // query search is not working, redirect to internal search
    if (empty($response)) {
        similarity_search_redirect_to_internal_search();
    }
    
    return $response;
}

/**
 * This function works with $form_state array which is passed to similarity_search_connection() function.
 * The form must have fields called "objects" and field called "search_type".
 * Fields called objects should have saved CA/SEC id of objects.
 * 
 * @param type $form_state form_state array from form
 * @return array PHP array which will be converted to JSON and sent to SEC Store API
 */
function similarity_search_sec_store_get($form_state) {
    return similarity_search_sec_store_connection($form_state, 'get');
}

/**
 * This function works with this type of array which is passed to similarity_search_connection() function.
 * 
 * Array(
 *   "type" => "",
 *   "example" => ""
 * );
 * 
 * @param type $array array with settings to get form fields from SEC Store API
 * @return array PHP array which will be converted to JSON and sent to SEC Store API
 */
function similarity_search_sec_store_get_fields($array) {
    return similarity_search_sec_store_connection($array, 'form');
}

/**
 * This function works with this type of array which is passed to similarity_search_connection() function.
 * 
 * Array(
 *   "input_names" => Array(""),
 *   "input_text" => "",
 *   "input_position" => "",
 *   "input_type => ""
 * );
 * 
 * @param type $array array with settings for autocomplete
 * @return array PHP array which will be converted to JSON and sent to SEC Store API
 */
function similarity_search_sec_store_auto_complete($array) {
    return similarity_search_sec_store_connection($array, 'autocomplete');
}

/**
 * This function works with this type of array which is passed to similarity_search_connection() function.
 * 
 * Array(
 *   "ignore" => Array("id" => ""),
 *   "object" => "",
 *   "parent" => "",
 *   "type" => "",
 *   "user" => ""
 * );
 * 
 * @param type $array array with settings for ignore
 * @return array PHP array which will be converted to JSON and sent to SEC Store API
 */
function similarity_search_sec_store_ignore($array) {
    return similarity_search_sec_store_connection($array, 'ignore');
}

/**
 * This function works with this type of array which is passed to similarity_search_connection() function.
 * 
 * Array(
 *   "remove" => Array("id" => ""),
 *   "parent" => "",
 *   "remove_from_system" => 0
 * );
 * 
 * @param type $array array with settings for context remove
 * @return array PHP array which will be converted to JSON and sent to SEC Store API
 */
function similarity_search_sec_store_remove($array) {
    return similarity_search_sec_store_connection($array, 'remove');
}

/**
 * Protocol types:
 *  - process:      $data_obj = node object
 *  - query:        $data_obj = array form_state
 *  - form:         $data_obj = custom array with type and example id
 *  - autocomplete: $data_obj = custom array with type and lookup string
 *  - ignore:       $data_obj = custom array with ignore object and other ignore settings
 * 
 * @param type $data_obj data
 * @param type $protocol_type type of protocol, which we want to use
 * @return array PHP array which will be converted to JSON and sent to SEC Store API
 */
function similarity_search_sec_store_connection($data_obj, $protocol_type) {
    // preprocess values
    switch(strtolower($protocol_type)) {
        case 'query':
            $data = similarity_search_parse_form_values($data_obj);
        break;

        default:
            $data = $data_obj;
    }
    
    // prepare message for SEC Store API
    $message = similarity_search_prepare_request($data, $protocol_type);
    
    // sent request and read response from SEC Store API
    if (strtolower($protocol_type) == "process") {
        // convert PHP array to JSON array
        $message = json_encode($message);
        
        $settings = array(
            'headers' => array("Content-Type" => "application/json;charset=\"utf-8\"", "Client" => "SimilarityRecommenderUI"), 
            'method' => "POST", 
            'data' => $message,
            'postpone' => FALSE,
            'callback' => 'similarity_search_background_processing',
            'blocking' => 1
        );
        
        $request = Array();
        $request[] = background_process_http_request(variable_get("sec_store_api"), $settings);
        background_process_start('similarity_search_send_background_process',$request);

        $response = Array();
    }
    else {
        $response = similarity_search_send_message($message);
    }
    
    return $response;
}

function similarity_search_send_background_process($request) {
    $options = array(
        'timeout' => variable_get("sec_store_api_timeout", 10),
    );
    background_process_http_request_process($request, $options);
}

/**
 * Function to send request message to server.
 * Message is PHP array
 *
 * @param type $message message to server in JSON format
 * @param string $server address of server
 * @return type response from server in JSON format
 */
function similarity_search_send_message($message, $server = NULL) {
    // convert PHP array to JSON array
    $message = json_encode($message);
    
	// load default SEC Store API address
	if (empty($server)) {
		$server = variable_get("sec_store_api");
	}
    
    // SEC Store API server address is not set
    if (empty($server)) {
        watchdog("similarity_search", "Drupal variable sec_store_api is empty. Please fill SEC Store API address in configuration.");
        return "";
    }

	// send request
	$ch = curl_init($server);
	curl_setopt($ch, CURLOPT_TIMEOUT, variable_get("sec_store_api_timeout", 10));
	curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json;charset=\"utf-8\"", "Client: SimilarityRecommenderUI"));
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $message);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    // communication with SEC Store API
	$response = curl_exec($ch);
    
    // get connection info
    $error_code    = curl_errno($ch);
    $error_message = curl_error($ch);
    $response_info = curl_getinfo($ch);
    $response_code = $response_info['http_code'];
    curl_close($ch);
    
    // check response
    if ($response_code != 200) {
        watchdog("similarity_search", "Can't connect to SEC Store API with address %address", Array("%address" => variable_get("sec_store_api")));
    }    
    else if (empty($response) || $response == "{}") {
        watchdog("similarity_search", "SEC Store API with address %address can't process the request.", Array("%address" => variable_get("sec_store_api")));
    }
    
    if(!empty($error_code)) {
        watchdog("similarity_search", "curl_init function returned error code %code with error text: %text", Array("%code" => $error_code, "%text" => $error_message));
    }

    // convert JSON array to PHP array
    $ret = json_decode($response, true);
    
	return $ret;
}

/**
 * This function should convert data from form to data for prepare functions such as similarity_search_prepare_query.
 * Maybe this function won't be needed (if we dont have to translate form array to array for prepare functions)
 * 
 * @param type $form_state
 * @return array
 */
function similarity_search_parse_form_values($form_state) {
    $data = Array();
    
    if (!isset($form_state["values"])) {
        return $data;    
    }
    
    foreach($form_state["values"] AS $key => $value) {
        $data["values"][$key] = $value;
    }
    
    return $data;
}

/**
 * Preparing Query message for SEC Store API.
 * $formData should be containing $form_state array.
 * 
 * @param array $formData
 * @return array PHP array with message for SEC Store API
 */
function similarity_search_prepare_query($formData) {
    global $user;
    
    $message = Array();
    $savedObjectsList = Array();
    
    if (!isset($formData["values"])) {
        return $message;
    }

    if (isset($formData["values"]["node"])) {
        $example = $formData["values"]["node"];
    }
    else {
        $example = "";
    }
    
    if (isset($formData["values"]["context"])) {
        $parent = $formData["values"]["context"];
    }
    else {
        $parent = "";
    }

    if (isset($formData["values"]["context_ca_sec_id"])) {
        $parent_ca_sec_id = $formData["values"]["context_ca_sec_id"];
    }
    else {
        $parent_ca_sec_id = "";
    }
    
	$parentNID = (int)$parent;
	$parentNode = node_load($parentNID);
	// load node wrapper
	$parent_wrapper = entity_metadata_wrapper('node', $parentNode);
        
    // test if user checked use_without checkbox (then show only not added items)
    if (isset($formData["values"]["use_without"]) && !empty($formData["values"]["use_without"])) {
        // find CA/SEC ID which we already have
        $savedObjects = similarity_search_get_saved_objects($parent);
        if(isset($formData["values"]["node_ca_sec_id"]) && !empty($formData["values"]["node_ca_sec_id"])) {
            $exampleObjects = similarity_search_get_saved_objects($example);
            $savedObjects = array_merge($savedObjects, $exampleObjects);
        }

        foreach($savedObjects AS $object) {
            $savedObjectsList[] = Array("sid" => $object);
        }

        if (isset($formData["values"]["node_ca_sec_id"]) && !empty($formData["values"]["node_ca_sec_id"])) {
            $savedObjectsList[] = Array("sid" => $formData["values"]["node_ca_sec_id"]);
        }
    }
    
    // get (guess from URL) operation type
    $operation_type = "add";
    if (arg(0) == "node" && arg(2) == "edit") {
        $operation_type = "edit";
    }
    
    // get dossier SID
    $dossier_sid = "";
    if ($operation_type == "add") {
        $dossier_nid = arg(1);
        if (!empty($dossier_nid)) {
            $dossier_node = node_load($dossier_nid);
            if ($dossier_node) {
                $dossier_wrapper = entity_metadata_wrapper('node', $dossier_node);
                if (isset($dossier_wrapper->field_ca_sec_id)) {
                    $field_sec_id = $dossier_wrapper->field_ca_sec_id->value();
                    if (!empty($field_sec_id)) {
                        $dossier_sid = (string)$field_sec_id;
                    }
                }
            }
        }
    }
    
    // create request message
    if (isset($formData["values"]["query_text"])) {
        $message["query_string"] = (string)$formData["values"]["query_text"];
    }
    else {
        $message["query_string"] = "";
    }
    
    $message["context_sid"] = (string)$parent_ca_sec_id;
    $message["dossier_sid"] = $dossier_sid;
	$creators = Array();
	$example_text = "";
	$example_title = "";
    $examples = Array();
	
    if(isset($formData["values"]["node_ca_sec_id"]) && !empty($formData["values"]["node_ca_sec_id"])) {
        $message["example_sids"][] = Array("sid" => (string)$formData["values"]["node_ca_sec_id"]);
        $example_nid = similarity_search_get_nid_from_sec($formData["values"]["node_ca_sec_id"], $parent);
		if ($example_nid) {
			$example_node = node_load($example_nid);
		}
		else {
			$example_node = NULL;
		}
		
		if ($example_node) {
			$example_wrapper = entity_metadata_wrapper('node', $example_node); 

			if (isset($example_node->title) && !empty($example_node->title))
			{
                $example_title = strip_tags($example_node->title);
			}

			if ($example_node->type == "object") {
				$items = field_get_items("node", $example_node, "field_fb_agent");
				if ($items) {
					$ids = Array();
					foreach ($items AS $i)
					{
						$ids[] = $i["value"];
					}
					$fc = field_collection_item_load_multiple($ids);
					if ($fc) {                    
						foreach ($fc AS $field) {
							try {
								if (isset($field->field_fb_agent_topic[LANGUAGE_NONE][0]["value"])) {
									$field_agent = $field->field_fb_agent_topic[LANGUAGE_NONE][0]["value"];
									$creators[] = $field_agent;
								}
							} catch (Exception $e) {
								drupal_set_message($e->getMessage(), 'error');
							}
						}
					}
				}
			}

			if (isset($example_wrapper->body)) {
				try {
					$value = $example_wrapper->body->value();
					if (isset($value) && !empty($value)) {
                        $example_text = similarity_search_filter_text($example_wrapper->body->value->raw());
					}
				}
				catch (EntityMetadataWrapperException $e) {
					continue;
				}
			}
            
            $examples[] = Array(
                "title" => $example_title,
                "article" => $example_text,
                "type" => $example_node->type,
                "artist" => $creators,
            );

			$childs = similarity_search_get_refers_to($example_node, Array('object', 'event', 'reference'));

			foreach ($childs AS $child) {
                $creators = Array();
                $example_text = "";
                $example_title = "";
				$example_child_wrapper = entity_metadata_wrapper('node', $child); 
				if (isset($child->title) && !empty($child->title)) {
                    $example_title = strip_tags($child->title);
				}

				if (isset($example_child_wrapper->body)) {
					try {
						$value = $example_child_wrapper->body->value();
						if (isset($value) && !empty($value)) {
                            $example_text = similarity_search_filter_text($example_child_wrapper->body->value->raw());
						}
					}
					catch (EntityMetadataWrapperException $e) {
						continue;
					}
				}

				if ($child->type == "object") {
					$items = field_get_items("node", $child, "field_fb_agent");
					if ($items) {
						$ids = Array();
						foreach ($items AS $i) {
							$ids[] = $i["value"];
						}
						$fc = field_collection_item_load_multiple($ids);
						if ($fc) {                    
							foreach ($fc AS $field) {
								try {
									if (isset($field->field_fb_agent_topic[LANGUAGE_NONE][0]["value"])) {
										$field_agent = $field->field_fb_agent_topic[LANGUAGE_NONE][0]["value"];
										$creators[] = $field_agent;
									}
								} catch (Exception $e) {
									drupal_set_message($e->getMessage(), 'error');
								}
							}
						}
					}
				}
                
                $examples[] = Array(
                    "title" => $example_title,
                    "article" => $example_text,
                    "type" => $child->type,
                    "artist" => $creators,
                );
			}
		}
    }
    else {
        $message["example_sids"] = Array();
    }
    
    // add identificators of already downloaded objects from SEC Store API
    $message["without_sids"] = $savedObjectsList;

    $message["type"] = (string)$formData["values"]["search_type"];

    // get user groups ($user is global variable)
    $groups = Array();
    foreach($user->roles AS $group) {
        $groups[]["id"] = (string)$group;
    }
    
//    if(isset($formData["values"]["only_with_images"]) && !empty($formData["values"]["only_with_images"])) {
//        $only_with_images = "true";
//    }
//    else {
//        $only_with_images = "false";
//    }
//    
//    if(isset($formData["values"]["in_storyscope"]) && !empty($formData["values"]["in_storyscope"])) {
//        $in_storyscope = "true";
//    }
//    else {
//        $in_storyscope = "false";
//    }
    
    if (isset($formData["values"]["teaser_prefix_limit"])) {
        $before_bound = (string)$formData["values"]["teaser_prefix_limit"];
    }
    else {
        $before_bound = "60";
    }
    
    if (isset($formData["values"]["teaser_suffix_limit"])) {
        $after_bound = (string)$formData["values"]["teaser_suffix_limit"];
    }
    else {
        $after_bound = "100";
    }
    
    //$message["only_with_images"] = $only_with_images;
    //$message["in_storyscope"] = $in_storyscope;
    $message["sids"] = Array();
    
    if (!empty($examples))  {
        $message["examples"] = $examples;
    }
    
	$message["example_creators"] = $creators;
    $message["with_metadata"] = 1;
    $message["with_metadata_as_html"] = 1;
    $message["teaser_bounds"] = Array(
        "before" => $before_bound,
        "after" => $after_bound
    );
    $message["results_from"] = (string)$formData["values"]["from"];
    $message["number_of_results"] = (string)$formData["values"]["size"];
    $message["system"] = $GLOBALS['base_url'];
    $message["user"] = (string)$user->name;
    $message["groups"] = $groups;
    
    return $message;
}

/**
 * Preparing Get message for SEC Store API.
 * 
 * @param array $data
 * @return array PHP array with message for SEC Store API
 */
function similarity_search_prepare_get($data) {
    global $user;

    // create request message
    $message = Array();

    // get user groups ($user is global variable)
    $groups = Array();
    foreach($user->roles AS $group) {
        $groups[]["id"] = (string)$group;
    }
    
    foreach($data["objects"] AS $id) {
        $message["sids"][] = Array("sid" => $id);
    }
    
    $message["query_string"] = "";
    $message["context_sid"] = "";
    $message["example_sids"] = Array();
    $message["without_sids"] = Array();
    $message["type"] = $data["search_type"];
    $message["example_text"] = "";
    $message["with_metadata"] = 0;
    $message["with_metadata_as_html"] = 0;
    $message["teaser_bounds"] = Array(
        "before" => (string)0,
        "after" => (string)0
    );  
    $message["results_from"] = 0;
    $message["number_of_results"] = 100;
    $message["system"] = $GLOBALS['base_url'];
    $message["user"] = (string)$user->name;
    $message["groups"] = $groups;
    
    return $message;
}

/**
 * Preparing Process message for SEC Store API.
 * $request->data_raw['node'] should be containig node object.
 * 
 * @param array $node
 * @return array PHP array with message for SEC Store API
 */
function similarity_search_prepare_process($node) {
    global $user;

    // create request message
    $message = Array();
    
    // find child elements (for Object story = objects)
    switch($node->type) {
        case "dossier": {
            // node types names which we want to add to message as childs (refers_to)
            $get_childs = Array('object_story', 'event', 'reference');
            $childs = similarity_search_get_refers_to($node, $get_childs);
        } break;

        case "object_story": {
            // node types names which we want to add to message as childs (refers_to)
            $get_childs = Array('object', 'event', 'reference');
            $childs = similarity_search_get_refers_to($node, $get_childs);
        } break;

        default: $childs = Array();
    }
    
    // get user groups ($user is global variable)
    $groups = Array();
    foreach($user->roles AS $group) {
        $groups[] = Array(
                        "id" => (string)$group,
                        "access" => similarity_search_get_access($node)
                    );
    };
    
    // Object story have childs - objects which must be sent too
    $refers = Array();
    if (!empty($childs)) {
        foreach($childs AS $child) {
            // when we remove item from context, metadata wrapper raise an exception, because
            // we load some $child which is null, this will check if $child is not null
            /// @todo: find reason why there is some null child
            if (empty($child)) {
                continue;
            }
             
            // load child node wrapper
            $child_wrapper = entity_metadata_wrapper('node', $child);

            // read CA/SEC ID from field (default is empty "")
            $ca_sec_id = "";

            if (isset($child_wrapper->field_ca_sec_id)) {
                $field_sec_id = $child_wrapper->field_ca_sec_id->value();
                if (!empty($field_sec_id)) {
                    $ca_sec_id = (string)$field_sec_id;
                }
            }

            // read body (description text) from field (default is empty "")
            $text = "";
//            if (isset($child->title)) {
//                $text .= strip_tags($child->title);
//            }

            if (isset($child_wrapper->body)) {
                try {
                    $value = $child_wrapper->body->value();
                    if (isset($value) && !empty($value)) {
                        $text .= similarity_search_filter_text($child_wrapper->body->value->raw());
                    }
                }
                catch (EntityMetadataWrapperException $e) {

                }
            }
    
            // add child information into the message to NLP server
            $child_array = Array(
                "eid" => (string)$child->nid,
                "sid" => $ca_sec_id,
                "type" => $child->type,
                "text" => $text,
                "uri" => "",
                "system" => $GLOBALS['base_url'],
                "user" => $user->name,
                "groups" => $groups,
                "access_others" => similarity_search_get_access($child),
                
                // other node fields are loaded here
                "type_specific_content" => similarity_search_fill_process_message($child)
            );
            
            $refers[] = $child_array;
        }
    }
    
    // load node wrapper
    $node_wrapper = entity_metadata_wrapper('node', $node);
    
    // read CA/SEC ID from field (default is empty "")
    $ca_sec_id = "";
    
    if (isset($node_wrapper->field_ca_sec_id)) {
        $field_sec_id = $node_wrapper->field_ca_sec_id->value();
        if (!empty($field_sec_id)) {
            $ca_sec_id = (string)$field_sec_id;
        }
    }
    
    // read body (description text) from field (default is empty "")
    $text = "";
//    if (isset($node->title)) {
//        $text .= strip_tags($node->title);
//    }
    
    if (isset($node_wrapper->body)) {
        try {
            $value = $node_wrapper->body->value();
            if (isset($value) && !empty($value)) {
                $text .= " ".similarity_search_filter_text($node_wrapper->body->value->raw());
            }
        }
        catch (EntityMetadataWrapperException $e) {

        }
    }
    
    // get (guess from URL) operation type
    $operation_type = "add";
    if (arg(0) == "node" && arg(2) == "edit") {
        $operation_type = "edit";
    }
    
    // get dossier SID
    $dossier_sid = "";
    if ($operation_type == "add") {
        $dossier_nid = arg(1);
        if (!empty($dossier_nid)) {
            $dossier_node = node_load($dossier_nid);
            if ($dossier_node) {
                $dossier_wrapper = entity_metadata_wrapper('node', $dossier_node);
                if (isset($dossier_wrapper->field_ca_sec_id)) {
                    $field_sec_id = $dossier_wrapper->field_ca_sec_id->value();
                    if (!empty($field_sec_id)) {
                        $dossier_sid = (string)$field_sec_id;
                    }
                }
            }
        }
    }
    
    
    // create message for SEC Store API
    $message["process"] = Array();
    $message["process"][] = Array(
        "eid" => (string)$node->nid,
        "sid" => $ca_sec_id,
        "dossier_sid" => $dossier_sid,
        "operation_type" => $operation_type,
        "type" => $node->type,
        "uri" => "",
        "text" => $text,
        "system" => $GLOBALS['base_url'],
        "user" => $user->name,
        "groups" => $groups,
        "access_others" => similarity_search_get_access($node),
        "refers_to" => $refers,
        
        // other node fields are loaded here
        "type_specific_content" => similarity_search_fill_process_message($node)
    );
	
	// if object story doesn't have set visual representation, we will lookup for visual representation in childs (refers_to)
	if ($node->type == "object_story" && empty($message["process"][0]["type_specific_content"]["visual_representation"])) {
		if (isset($message["process"][0]["refers_to"]) && !empty($message["process"][0]["refers_to"])) {
			foreach ($message["process"][0]["refers_to"] AS $ch) {
				if (isset($ch["type_specific_content"]["visual_representation"]) && !empty($ch["type_specific_content"]["visual_representation"])) {
					$message["process"][0]["type_specific_content"]["visual_representation"] = $ch["type_specific_content"]["visual_representation"];
					break;
				}
			}
		}
	}
     
    return $message;
}

function similarity_search_prepare_remove($data) {
    // create request message
    $message = Array();
    $message["delete_sids"] = Array();
    
    $dossier_sid = "";
    $dossier_nid = arg(1);
    if (!empty($dossier_nid)) {
        $dossier_node = node_load($dossier_nid);
        if ($dossier_node) {
            $dossier_wrapper = entity_metadata_wrapper('node', $dossier_node);
            if (isset($dossier_wrapper->field_ca_sec_id)) {
                $field_sec_id = $dossier_wrapper->field_ca_sec_id->value();
                if (!empty($field_sec_id)) {
                    $dossier_sid = (string)$field_sec_id;
                }
            }
        }
    }
    
    foreach($data["remove"] AS $id) {
        $message["delete_sids"][] = Array("sid" => (string)$id);
    }

    if (!empty($data["parent"])) {
        $message["context_sid"] = (string)$data["parent"];
    }
    else {
        $message["context_sid"] = "";
    }
    
    $message["dossier_sid"] = $dossier_sid;
    
    if (!empty($data["remove_from_system"])) {
        $message["remove_from_system"] = (string)$data["remove_from_system"];
    }
    else {
        $message["remove_from_system"] = "0";
    }
    
    if (!empty($data["hard"])) {
        $message["hard"] = (string)$data["hard"];
    }
    else {
        $message["hard"] = "0";
    }
    
    $message["system"] = $GLOBALS['base_url'];

    return $message;
}

/**
 * Fill Process message with node fields values.
 * Eech node type has different fields, so we must have special code for each node type.
 * 
 * @param type $node
 * @return array
 */
function similarity_search_fill_process_message($node) {
    $ret = Array();
    
    if (!isset($node->type)) {
        return $ret;
    }
    
    // load node wrapper
    $node_wrapper = entity_metadata_wrapper('node', $node); 
    
    if (isset($node->title)) {
        $ret["title"] = similarity_search_filter_text($node->title);
    }
    
    // read body (description text) from field (default is empty "")
    $field_body = "";
	try {
		if (isset($node_wrapper->body)) {
			$value = $node_wrapper->body->value();
			if (isset($value) && !empty($value)) {
				$field_body = similarity_search_filter_text($node_wrapper->body->value->raw());
			}

			$ret["description"] = $field_body;
		}
	} catch (Exception $e) {
		drupal_set_message($e->getMessage(), 'error');
	}
            
    // each type has specific fields
    switch($node->type) {
        // =====================================================================
        // DOSSIER
        case "dossier": {
            $private = "0";
			try {
				if (isset($node_wrapper->field_dossier_private)) {
					$value = $node_wrapper->field_dossier_private->value();
					if (isset($value) && !empty($value)) {
						$field_private = $value;
					}

					if (!empty($field_private)) {
						if ($field_private == true) {
							$private = "1";
						}
					}
				}
			} catch (Exception $e) {
				drupal_set_message($e->getMessage(), 'error');
			}
            $ret["private"] = $private;
            
            // default image path
            $image_path = "";

            $field = field_get_items('node', $node, 'field_media');
            // image path for SEC Store API
            if ($field) {
                $file = file_load($field[0]['fid']);
                $filepath = file_create_url($file->uri);
                if (!empty($filepath)) {
                    $image_path = $filepath;
                }
            }

            // this fields are used for all types
            $ret["visual_representation"] = $image_path;
        } break;
        
        // =====================================================================
        // OBJECT STORY
        case "object_story": {
            $private = "0";
			try {
				if (isset($node_wrapper->field_object_story_private)) {
					$value = $node_wrapper->field_object_story_private->value();
					if (isset($value) && !empty($value)) {
						$field_private = $value;
					}

					if (!empty($field_private)) {
						if ($field_private == true) {
							$private = "1";
						}
					}
				}
			} catch (Exception $e) {
				drupal_set_message($e->getMessage(), 'error');
			}
            $ret["private"] = $private;
        } break;
        
        // =====================================================================
        // OBJECT
        case "object": {
            $field_videos = Array();
            $fields = field_get_items('node', $node, 'field_object_video');
            if ($fields) {
                foreach($fields as $field) {
                    $file = file_load($field['fid']);
                    $filepath = file_create_url($file->uri);
                    if (!empty($filepath)) {
                        $field_videos[] = $filepath;
                        $ret["video"] = $field_videos;
                    }
                }
            }

            // try to read field agent
            $field_agent = "";
            $url = "";
            $birth = "";
            $death = "";
            $items = field_get_items("node", $node, "field_fb_agent");
            if ($items) {
                $ids = Array();
                foreach ($items AS $i)
                {
                    $ids[] = $i["value"];
                }
                $fc = field_collection_item_load_multiple($ids);
                if ($fc) {
                    $ret["creator"] = Array();
                    
                    foreach ($fc AS $field) {
						try {
							if (isset($field->field_fb_agent_topic[LANGUAGE_NONE][0]["value"])) {
								$field_agent = $field->field_fb_agent_topic[LANGUAGE_NONE][0]["value"];
								$birth = "";
								$death = "";
//								  $url = $field->field_fb_agent_mid[LANGUAGE_NONE][0]["value"];
								if (isset($field->field_fb_agent_birth_date[LANGUAGE_NONE][0]["value"])) {
									$birth = $field->field_fb_agent_birth_date[LANGUAGE_NONE][0]["value"];
									$birth = similarity_search_convert_date($birth, "Y-m-d");
								}

								if (isset($field->field_fb_agent_death_date[LANGUAGE_NONE][0]["value"])) {
									$death = $field->field_fb_agent_death_date[LANGUAGE_NONE][0]["value"];
									$death = similarity_search_convert_date($death, "Y-m-d");
								}
//							  $ret["creator"][] = Array(
//								  "name" => (string)$field_agent,
//								  "url" => (string)$url,
//								  "birth" => (string)$birth,
//								  "death" => (string)$death
//							  );
								$ret["creator"][] = Array(
									"name" => similarity_search_filter_text($field_agent),
									"birth" => (string)$birth,
									"death" => (string)$death,
									"culture" => "",
									"role" => ""
								);
							}
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }
                }
            }
            
            // try to read field creation_timestamp
            $field_creation_timestamp = "";
			try {
				if (isset($node->field_object_creation_date[$node->language][0]["from"])) {
					$date = similarity_search_convert_from_partial_date($node->field_object_creation_date[$node->language][0]["from"]);
					if (!empty($date)) {
						$field_creation_timestamp = $date;
						$ret["creation_timestamp"] = $field_creation_timestamp;
					}
				}
			} catch (Exception $e) {
				drupal_set_message($e->getMessage(), 'error');
			}
            
            // try to read field classification
            $field_classification = "";
            $url = "";
            $items = field_get_items("node", $node, "field_fb_classification");
            if ($items) {
                $ids = Array();
                foreach ($items AS $i)
                {
                    $ids[] = $i["value"];
                }
                $fc = field_collection_item_load_multiple($ids);
                if ($fc) {
                    foreach ($fc AS $field) {
						try {
//                        $field_classification = $field->field_fb_classification_topic[LANGUAGE_NONE][0]["value"];
//                        $url = $field->field_fb_classification_mid[LANGUAGE_NONE][0]["value"];
//                        $ret["classification"]["value"] = $field_classification;
//                        $ret["classification"]["url"] = $url;
							if (isset($field->field_fb_classification_topic[LANGUAGE_NONE][0]["value"]))
							{
								$ret["classification"] = $field->field_fb_classification_topic[LANGUAGE_NONE][0]["value"];
							}
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }
                }
            }
            
            // try to read field materials
            $field_materials = "";
            $url = "";
            $items = field_get_items("node", $node, "field_fb_materials");
            if ($items) {
                $ids = Array();
                foreach ($items AS $i)
                {
                    $ids[] = $i["value"];
                }
                $fc = field_collection_item_load_multiple($ids);
                if ($fc) {
                    $ret["materials"] = Array();
                    
                    foreach ($fc AS $field) {
						try {
//                        $field_materials = $field->field_fb_materials_topic[LANGUAGE_NONE][0]["value"];
//                        $url = $field->field_fb_materials_mid[LANGUAGE_NONE][0]["value"];
//                        $ret["materials"][] = Array(
//                            "value" => $field_materials,
//                            "url" => $url
//                        );
							if (isset($field->field_fb_materials_topic[LANGUAGE_NONE][0]["value"]))
							{
								$field_materials[] = $field->field_fb_materials_topic[LANGUAGE_NONE][0]["value"];
							}
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }
                    $ret["materials"] = $field_materials;
                }
            }
            
            // try to read field dimensions
            /// @todo find better solution for reading from fields
            $field_dimensions = Array();
			try {
				if (isset($node_wrapper->field_object_dimensions)) {
					$fields = $node_wrapper->field_object_dimensions->value();
					if (!empty($fields)) {
						$field_dimensions = Array("label" => "", "unit" => "", "value" => "");

						foreach($fields AS $field) {
							if (isset($field->field_object_dimension_label[$node->language][0]["value"])) {
								$value = $field->field_object_dimension_label[$node->language][0]["value"];
								if (!empty($value)) {
									$field_dimensions["label"] = $value;
								}
							}

							if (isset($field->field_object_dimension_unit[$node->language][0]["value"])) {
								$value = $field->field_object_dimension_unit[$node->language][0]["value"];
								if (!empty($value)) {
									$field_dimensions["unit"] = $value;
								}
							}

							if (isset($field->field_object_dimension_value[$node->language][0]["value"])) {
								$value = $field->field_object_dimension_value[$node->language][0]["value"];
								if (!empty($value)) {
									$field_dimensions["value"] = $value;
								}
							}

							$ret["dimensions"][] = $field_dimensions;
						}
					}
				}
			} catch (Exception $e) {
				drupal_set_message($e->getMessage(), 'error');
			}

            // try to read field location (collection)
            $field_location = "";
            $url = "";
            $items = field_get_items("node", $node, "field_fb_location");
            if ($items) {
                $ids = Array();
                foreach ($items AS $i)
                {
                    $ids[] = $i["value"];
                }
                $fc = field_collection_item_load_multiple($ids);
                if ($fc) {
                    foreach ($fc AS $field) {
						try {
//                        $field_location = $field->field_fb_location_topic[LANGUAGE_NONE][0]["value"];
//                        $url = $field->field_fb_location_mid[LANGUAGE_NONE][0]["value"];
//                        $ret["collection"]["value"] = $field_location;
//                        $ret["collection"]["url"] = $url;
							if (isset($field->field_fb_location_topic[LANGUAGE_NONE][0]["value"]))
							{
								$ret["collection"] = similarity_search_filter_text($field->field_fb_location_topic[LANGUAGE_NONE][0]["value"]);
							}
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }
                }
            }
            
            // field collection was changed to collection_location
            //$ret["collection"] = $field_collection;
            
            // field collection was changed to collection_location
            // try to read field location
//            $field_location = "";
//            if (isset($node_wrapper->field_object_location)) {
//                $value = $node_wrapper->field_object_location->value();
//                if (!empty($value) && isset($value->name)) {
//                    $field_location = $value->name;
//                } 
//            }
//            
//            $ret["location"] = $field_location;
            
            // try to read field credit_line
            $field_credit_line = "";
			try {
				if (isset($node_wrapper->field_object_credit_line)) {
					$value = $node_wrapper->field_object_credit_line->value();
					if (!empty($value) && isset($value->name)) {
						$field_credit_line = $value->name;
						$ret["credit_line"] = $field_credit_line;
					}
				}
			} catch (Exception $e) {
				drupal_set_message($e->getMessage(), 'error');
			}

            // try to read field object_identifier
            $field_object_identifier = "";
            $url = "";
            $items = field_get_items("node", $node, "field_fb_object_identifier");
            if ($items) {
                $ids = Array();
                foreach ($items AS $i)
                {
                    $ids[] = $i["value"];
                }
                $fc = field_collection_item_load_multiple($ids);
                if ($fc) {
					try {
						foreach ($fc AS $field) {
//                        $field_object_identifier = $field->field_fb_object_identifier_topic[LANGUAGE_NONE][0]["value"];
//                        $url = $field->field_fb_object_identifier_mid[LANGUAGE_NONE][0]["value"];
//                        $ret["identifier"]["value"] = $field_object_identifier;
//                        $ret["identifier"]["url"] = $url;
							if (isset($field->field_fb_object_identifier_topic[LANGUAGE_NONE][0]["value"]))
							{
								$ret["identifier"] = $field->field_fb_object_identifier_topic[LANGUAGE_NONE][0]["value"]; 
							}
						}
					} catch (Exception $e) {
						drupal_set_message($e->getMessage(), 'error');
					}
                }
            }
            
            // default image path
            $image_path = "";

            $field = field_get_items('node', $node, 'field_media');
            // image path for SEC Store API
            if ($field) {
                $file = file_load($field[0]['fid']);
                $filepath = file_create_url($file->uri);
                if (!empty($filepath)) {
                    $image_path = $filepath;
                    // this fields are used for all types
                    $ret["visual_representation"] = $image_path;
                }
            }
        } break;

        // =====================================================================
        // EVENT
        case "event": {  
            // try to read field activity
            $field_activity = Array();
			try {
				if (isset($node_wrapper->field_event_activity)) {
					$value = $node_wrapper->field_event_activity->value();

					if (!empty($value)) {
						// convert single value to array for foreach
						if (!is_array($value)) {
							$value = Array($value);
						}

						// save each value to message
						foreach($value AS $val) {
							if (isset($val->name)) {
								$field_activity[] = $val->name;
							}
						}
					}
				}
			} catch (Exception $e) {
				drupal_set_message($e->getMessage(), 'error');
			}
            
            $ret["activity"] = $field_activity;
            
            // try to read field start_timestamp
            $field_start_timestamp = "";
			try {
				if (isset($node->field_event_start_time[$node->language][0]["from"])) {
					$date = similarity_search_convert_from_partial_date($node->field_event_start_time[$node->language][0]["from"]);
					if (!empty($date)) {
						$field_start_timestamp = $date;
						$ret["start_timestamp"] = $field_start_timestamp;
					}
				}
			} catch (Exception $e) {
				drupal_set_message($e->getMessage(), 'error');
			}
            

            
            // try to read field end_timestamp
            $field_end_timestamp = "";
			try {
				if (isset($node->field_event_end_time[$node->language][0]["from"])) {
					$date = similarity_search_convert_from_partial_date($node->field_event_end_time[$node->language][0]["from"]);
					if (!empty($date)) {
						$field_end_timestamp = $date;
						$ret["end_timestamp"] = $field_end_timestamp;
					}
				}
			} catch (Exception $e) {
				drupal_set_message($e->getMessage(), 'error');
			}
            
            // try to read field location
            $field_location = "";
            $url = "";
            $items = field_get_items("node", $node, "field_fb_location");
            if ($items) {
                $ids = Array();
                foreach ($items AS $i)
                {
                    $ids[] = $i["value"];
                }
                $fc = field_collection_item_load_multiple($ids);
                if ($fc) {
                    $ret["location"] = Array();
                    foreach ($fc AS $field) {
						try {
//                        $field_location = $field->field_fb_location_topic[LANGUAGE_NONE][0]["value"];
//                        $url = $field->field_fb_location_mid[LANGUAGE_NONE][0]["value"];
//                        $ret["location"]["value"] = $field_location;
//                        $ret["location"]["url"] = $url;
							if (isset($field->field_fb_location_topic[LANGUAGE_NONE][0]["value"]))
							{
								$ret["location"][] = similarity_search_filter_text($field->field_fb_location_topic[LANGUAGE_NONE][0]["value"]);
							}
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }
                }
            }
            
            // try to read field agent
            // try to read field agent
            $field_agent = "";
            $url = "";
            $birth = "";
            $death = "";
            $items = field_get_items("node", $node, "field_fb_agent");
            if ($items) {
                $ids = Array();
                foreach ($items AS $i)
                {
                    $ids[] = $i["value"];
                }
                $fc = field_collection_item_load_multiple($ids);
                if ($fc) {
                    $ret["agent"] = Array();
                    
                    foreach ($fc AS $field) {
						try {
							if (isset($field->field_fb_agent_topic[LANGUAGE_NONE][0]["value"])) {
								$field_agent = $field->field_fb_agent_topic[LANGUAGE_NONE][0]["value"];

//                          $url = $field->field_fb_agent_mid[LANGUAGE_NONE][0]["value"];
								$birth = "";
								$death = "";

								if (isset($field->field_fb_agent_birth_date[LANGUAGE_NONE][0]["value"])) {
									$birth = $field->field_fb_agent_birth_date[LANGUAGE_NONE][0]["value"];
									$birth = similarity_search_convert_date($birth, "Y-m-d");
								}

								if (isset($field->field_fb_agent_death_date[LANGUAGE_NONE][0]["value"])) {
									$death = $field->field_fb_agent_death_date[LANGUAGE_NONE][0]["value"];
									$death = similarity_search_convert_date($death, "Y-m-d");
								}     

//                          $ret["agent"][] = Array(
//                              "name" => (string)$field_agent,
//                              "url" => (string)$url,
//                              "birth" => (string)$birth,
//                              "death" => (string)$death
//                          );
								$ret["agent"][] = Array(
									"name" => similarity_search_filter_text($field_agent),
									"birth" => (string)$birth,
									"death" => (string)$death,
									"culture" => "",
									"role" => ""
								);
							}
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }
                }
            }
            
            $field_genre = "";
            $url = "";
            $items = field_get_items("node", $node, "field_fb_genre");
            if ($items) {
                $ids = Array();
                foreach ($items AS $i)
                {
                    $ids[] = $i["value"];
                }
                $fc = field_collection_item_load_multiple($ids);
                if ($fc) {
                    $ret["genre"] = Array();
                    
                    foreach ($fc AS $field) {
						try {
//                        $field_agent = $field->field_fb_genre_topic[LANGUAGE_NONE][0]["value"];
//                        $url = $field->field_fb_agent_mid[LANGUAGE_NONE][0]["value"];
//                        $ret["genre"]["value"] = $field_genre;
//                        $ret["genre"]["url"] = $url;
							if (isset($field->field_fb_genre_topic[LANGUAGE_NONE][0]["value"])) {
								$ret["genre"][] = $field->field_fb_genre_topic[LANGUAGE_NONE][0]["value"];
							}
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }
                }
            }
            
            $field_style_movement = "";
            $url = "";
            $items = field_get_items("node", $node, "field_fb_style_movement");
            if ($items) {
                $ids = Array();
                foreach ($items AS $i)
                {
                    $ids[] = $i["value"];
                }
                $fc = field_collection_item_load_multiple($ids);
                if ($fc) {
                    $ret["style_movement"] = Array();
                    
                    foreach ($fc AS $field) {
						try {
//                        $field_agent = $field->field_fb_style_movement_topic[LANGUAGE_NONE][0]["value"];
//                        $url = $field->field_fb_style_movement_mid[LANGUAGE_NONE][0]["value"];
//                        $ret["style_movement"]["value"] = $field_style_movement;
//                        $ret["style_movement"]["url"] = $url;
							if (isset($field->field_fb_style_movement_topic[LANGUAGE_NONE][0]["value"])) {
								$ret["style_movement"][] = $field->field_fb_style_movement_topic[LANGUAGE_NONE][0]["value"];
							}
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }
                }
            }

            // try to read field object
//            $field_object = Array();
//            if (isset($node_wrapper->field_event_object)) {
//                $value = $node_wrapper->field_event_object->value();
//                
//                if (!empty($value)) {
//                    // convert single value to array for foreach
//                    if (!is_array($value)) {
//                        $value = Array($value);
//                    }
//                    
//                    // save each value to message
//                    foreach($value AS $val) {
//                        if (isset($val->name)) {
//                            $field_object[] = $val->name;
//                        }
//                    }
//                }
//            }
//            
//            $ret["object"] = $field_object;

            // try to read field label
//            $field_label = "";
//            if (isset($node_wrapper->field_event_label)) {
//                $value = $node_wrapper->field_event_label->value();
//                if (!empty($value)) {
//                    $field_label = $value;
//                }
//            }
//            
//            $ret["label"] = $field_label;
            
            // try to read field value
            /// @todo CHECK READING THIS VALUES
            
            $field_value = "";
            $url = "";
            $items = field_get_items("node", $node, "field_fb_value");
            if ($items) {
                $ids = Array();
                foreach ($items AS $i)
                {
                    $ids[] = $i["value"];
                }
                $fc = field_collection_item_load_multiple($ids);
                if ($fc) {
                    $ret["value"] = Array();
                    $field_value = "";
                    $field_currency = "";
                    
                    foreach ($fc AS $field) {
						try {
							if (isset($field->field_fb_value[LANGUAGE_NONE][0]["value"])) {
								$field_value = $field->field_fb_value[LANGUAGE_NONE][0]["value"];
							}
							if (isset($field->field_fb_value[LANGUAGE_NONE][0]["value"]) && isset($field->field_fb_currency_topic[LANGUAGE_NONE][0]["value"])) {
								$field_currency = $field->field_fb_currency_topic[LANGUAGE_NONE][0]["value"];
							}
//                        $url = $field->field_fb_currency_mid[LANGUAGE_NONE][0]["value"];
//                        $ret["value"]["value"] = $field_value;
//                        $ret["value"]["currency"] = $field_currency;
//                        $ret["value"]["url"] = $url;
							$ret["value"]["value"] = $field_value;
							$ret["value"]["currency"] = $field_currency;
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }
                }
            }
            
            // try to read field annotation_uri
            $field_annotation_uri = "";
			try {
				if (isset($node_wrapper->field_event_annotation_uri)) {
					$value = $node_wrapper->field_event_annotation_uri->value();
					if (!empty($value)) {
						$field_annotation_uri = $value;
					}
				}
			} catch (Exception $e) {
				drupal_set_message($e->getMessage(), 'error');
			}
            
            $ret["annotation_uri"] = $field_annotation_uri;
        } break;
        
        // =====================================================================
        // REFERENCE
        case "reference": {
            // try to read field images
            $field_images = Array();
            $fields = field_get_items('node', $node, 'field_reference_images');
            if ($fields && is_array($fields)) {
                foreach($fields as $field) {
                    $file = file_load($field['fid']);
                    $filepath = file_create_url($file->uri);
                    if (!empty($filepath)) {
                        $field_images[] = $filepath;
                    }
                }
            }
            
            $ret["images"] = $field_images;
            
            // try to read field source
            $field_source = "";
			try {
				if (isset($node_wrapper->field_reference_source)) {
					$value = $node_wrapper->field_reference_source->value();
					if (!empty($value["url"])) {
						$field_source = $value["url"];
					}
				}
			} catch (Exception $e) {
				drupal_set_message($e->getMessage(), 'error');
			}
            
            $ret["src"] = $field_source;
            
            // try to read field videos
            $field_videos = Array();
            $fields = field_get_items('node', $node, 'field_reference_videos');
            if ($fields) {
                foreach($fields as $field) {
                    $file = file_load($field['fid']);
                    $filepath = file_create_url($file->uri);
                    if (!empty($filepath)) {
                        $field_videos[] = $filepath;
                    }
                }
            }
            
            $ret["videos"] = $field_videos;
            
            // try to read field files
            $field_files = "";
            $fields = field_get_items('node', $node, 'field_reference_files');
            if ($fields) {
                foreach($fields as $field) {
                    $file = file_load($field['fid']);
                    $filepath = file_create_url($file->uri);
                    if (!empty($filepath)) {
                        $field_files[] = $filepath;
                    }
                }
            }
            
            $ret["files"] = $field_files;

            $field_text = "";
			if (isset($node_wrapper->field_reference_text)) {
				try {
					$value = $node_wrapper->field_reference_text->value();
					if (isset($value) && !empty($value)) {
						$field_text = similarity_search_filter_text($node_wrapper->field_reference_text->value->raw());
					}
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
			}
            
            $ret["text"] = similarity_search_filter_text($field_text);
            
            // default image path
            $image_path = "";

            $field = field_get_items('node', $node, 'field_media');
            // image path for SEC Store API
            if ($field) {
                $file = file_load($field[0]['fid']);
                $filepath = file_create_url($file->uri);
                if (!empty($filepath)) {
                    $image_path = $filepath;
                }
            }

            // this fields are used for all types
            $ret["visual_representation"] = $image_path;          
        } break;
    }

    return $ret;
}

/**
 * Fill node field values with data from SEC Store API message.
 * Eech node type has different fields, so we must have special code for each node type.
 * 
 * @param \stdClass $entity entity (node) data
 * @param array processed object data from annotation
 * @return $node
 */
function similarity_search_fill_node_fields($entity, $object) {
    // load entity wrapper for node
    $entity_wrapper = entity_metadata_wrapper('node', $entity);
    
    if (isset($object["type_specific_content"]["title"])) {
		try {
			$entity_wrapper->title = $object["type_specific_content"]["title"];
		} catch (Exception $e) {
			drupal_set_message($e->getMessage(), 'error');
		}
    }

    if (isset($object["text"])) {
		try {
			$entity_wrapper->body->value->set($object["text"]);
		} catch (Exception $e) {
			drupal_set_message($e->getMessage(), 'error');
		}
    }
    
    $entity_wrapper->field_ca_sec_id = $object["sid"];

    
	if (!empty($object["type_specific_content"]["visual_representation"])) {
        // add http:// prefix for links that starts only with www
        // drupal_http_request doesn't work without http
        if (strpos($object["type_specific_content"]["visual_representation"], "://") === false) {
            $object["type_specific_content"]["visual_representation"] = "http://".$object["type_specific_content"]["visual_representation"];
        }
        
		$result = drupal_http_request($object["type_specific_content"]["visual_representation"]);
        $image = NULL;
        
		// can load the file
		if ($result->code == 200) {
			// get file info
			$path = file_default_scheme() . '://images/';
			$name = substr($object["type_specific_content"]["visual_representation"], (strrpos($object["type_specific_content"]["visual_representation"], '/', -1) + 1));
			$finfo = new finfo(FILEINFO_MIME_TYPE);
			$mime = $finfo->buffer($result->data);

			// unknown mime, default mime will be this
			if (!$mime) {
				$mime = "text/plain";
			}

			// save file
			$image = file_save_data($result->data, $path.$name, FILE_EXISTS_RENAME);
		}
	}

    // each type has specific fields
    switch($entity->type) {
        // =====================================================================
        // DOSSIER
        case "dossier": {
            // read private parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["private"])) {
				try {
					$entity_wrapper->field_dossier_private = $object["type_specific_content"]["private"];
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
            
            // read visual_representation parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["visual_representation"]) && isset($image->fid)) {
				try {
					$delta = $entity_wrapper->field_media->count();
					$entity_wrapper->field_media[$delta]->file->set($image); 
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
        } break;
        
        // =====================================================================
        // OBJECT STORY
        case "object_story": {
            // read private parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["private"])) {
				try {
					$entity_wrapper->field_object_story_private = $object["type_specific_content"]["private"];
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
            
            // read visual_representation parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["visual_representation"]) && isset($image->fid)) {
				try {
					$delta = $entity_wrapper->field_media->count();
					$entity_wrapper->field_media[$delta]->file->set($image); 
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
        } break;
        
        // =====================================================================
        // OBJECT
        case "object": {
            // read video parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["videos"]) && !empty($object["type_specific_content"]["videos"])) {
                foreach ($object["type_specific_content"]["videos"] AS $video) {
                    $result = drupal_http_request($video);

                    // can load the file
                    if ($result->code == 200) {
                        // get file info
                        $path = file_default_scheme() . '://videos/';
                        $name = substr($video, (strrpos($video, '/', -1) + 1));
                        $finfo = new finfo(FILEINFO_MIME_TYPE);
                        $mime = $finfo->buffer($result->data);

                        // unknown mime, default mime will be this
                        if (!$mime) {
                            $mime = "text/plain";
                        }
						
                        // save file
						try {
							$f = file_save_data($result->data, $path.'/'.$name, FILE_EXISTS_RENAME);
							$delta = $entity_wrapper->field_object_video->count();
							$entity_wrapper->field_object_video[$delta] = array('fid' => $f->fid);
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }
                }
            }
            
            // read creators from parsed SEC Store API message
            if(isset($object["type_specific_content"]["creator"])) {
                foreach($object["type_specific_content"]["creator"] AS $cr) {
                    if (!isset($cr["birth"])) $cr["birth"]="";
                    if (!isset($cr["death"])) $cr["death"]="";
                    $values = Array();
                    $values["field_fb_agent_topic"] = $cr["name"];
//                    $values["field_fb_agent_mid"] = $cr["url"];
                    
                    $birth = similarity_search_convert_date($cr["birth"]);
                    $death = similarity_search_convert_date($cr["death"]);

                    if (!empty($birth)) {
                        $values["field_fb_agent_birth_date"] = $birth;
                    }
                    
                    if (!empty($death)) {
                        $values["field_fb_agent_death_date"] = $death;
                    }
					try {
						similarity_search_add_field_collection($entity, "node", "field_fb_agent", $values);
					} catch (Exception $e) {
						drupal_set_message($e->getMessage(), 'error');
					}
                }
            }

            // read creation_timestamp parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["creation_timestamp"]) && !empty($object["type_specific_content"]["creation_timestamp"])) {
                $date = similarity_search_convert_to_partial_date($object["type_specific_content"]["creation_timestamp"]);
				try {
					$entity->field_object_creation_date[$entity->language][] = Array("from" => $date);
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
                    
            // read classification parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["classification"]["value"]) && !empty($object["type_specific_content"]["classification"]["value"])) {
//                $values = Array(
//                    "field_fb_classification_topic" => $object["type_specific_content"]["classification"]["value"],
//                    "field_fb_classification_mid" => $object["type_specific_content"]["classification"]["url"],
//                );
                $values = Array(
                    "field_fb_classification_topic" => $object["type_specific_content"]["classification"],
                    "field_fb_classification_mid" => "",
                );
				try {
					similarity_search_add_field_collection($entity, "node", "field_fb_classification", $values);
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
            
            // read materials parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["materials"]) && !empty($object["type_specific_content"]["materials"])) {
                foreach ($object["type_specific_content"]["materials"] AS $material) {
//                    $values = Array(
//                        "field_fb_materials_topic" => $material["value"],
//                        "field_fb_materials_mid" => $material["url"],
//                    );
                    $values = Array(
                        "field_fb_materials_topic" => $material,
                        "field_fb_materials_mid" => "",
                    );
					try {
						similarity_search_add_field_collection($entity, "node", "field_fb_materials", $values);
					} catch (Exception $e) {
						drupal_set_message($e->getMessage(), 'error');
					}
                }
            }

            
            // read dimensions label parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["dimensions"]["label"]) && !empty($object["type_specific_content"]["dimensions"]["label"])) {
				try {
					$entity_wrapper->field_object_dimension_label->value->set($object["type_specific_content"]["dimensions"]["label"]);
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
            
            // read dimensions unit parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["dimensions"]["unit"]) && !empty($object["type_specific_content"]["dimensions"]["unit"])) {
				try {
					$entity_wrapper->field_object_dimension_unit->value->set($object["type_specific_content"]["dimensions"]["unit"]);
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
            
            // read dimensions value parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["dimensions"]["value"]) && !empty($object["type_specific_content"]["dimensions"]["value"])) {
				try {
					$entity_wrapper->field_object_dimension_value->value->set($object["type_specific_content"]["dimensions"]["value"]);
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
             
            // read location (collection) parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["collection"]) && !empty($object["type_specific_content"]["collection"])) {
//                $values = Array(
//                    "field_fb_location_topic" => $object["type_specific_content"]["collection"]["value"],
//                    "field_fb_location_mid" => $object["type_specific_content"]["collection"]["url"],
//                );
                $values = Array(
                    "field_fb_location_topic" => $object["type_specific_content"]["collection"],
                    "field_fb_location_mid" => "",
                );
				try {
					similarity_search_add_field_collection($entity, "node", "field_fb_location", $values);
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
            
            // read credit_line parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["credit_line"]) && !empty($object["type_specific_content"]["credit_line"])) {
				try {
					$entity_wrapper->field_object_credit_line = similarity_search_get_term($object["type_specific_content"]["credit_line"], "field_object_credit_line");
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
              
            // read identifier parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["identifier"]) && !empty($object["type_specific_content"]["identifier"])) {
//                $values = Array(
//                    "field_fb_object_identifier_topic" => $object["type_specific_content"]["identifier"]["value"],
//                    "field_fb_object_identifier_mid" => $object["type_specific_content"]["identifier"]["url"],
//                );
                $values = Array(
                    "field_fb_object_identifier_topic" => $object["type_specific_content"]["identifier"],
                    "field_fb_object_identifier_mid" => "",
                );
				try {
					similarity_search_add_field_collection($entity, "node", "field_fb_object_identifier", $values);
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }

            // read visual_representation parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["visual_representation"]) && isset($image->fid)) {
				try {
					$delta = $entity_wrapper->field_media->count();
					$entity_wrapper->field_media[$delta]->file->set($image); 
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            } 
        } break;

        // =====================================================================
        // EVENT
        case "event": {              
            // read activity parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["activity"]) && !empty($object["type_specific_content"]["activity"])) {
                foreach ($object["type_specific_content"]["activity"] AS $activity) {
                    $term = annotation_translator_get_term($activity, "field_event_activity");
                    if ($term) {
                        $entity->field_event_activity[$entity->language][] = (Array)$term;
                    }
                }
            }

            // read start_timestamp parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["start_timestamp"]) && !empty($object["type_specific_content"]["start_timestamp"])) {
                $date = similarity_search_convert_to_partial_date($object["type_specific_content"]["start_timestamp"]);
                
                $entity->field_event_start_time[$entity->language][] = Array("from" => $date);
            }
              
            // read end_timestamp parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["end_timestamp"]) && !empty($object["type_specific_content"]["end_timestamp"])) {
                $date = similarity_search_convert_to_partial_date($object["type_specific_content"]["end_timestamp"]);
                
                $entity->field_event_end_time[$entity->language][] = Array("from" => $date);
            }
              
            // read location parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["location"]) && !empty($object["type_specific_content"]["location"])) {
                foreach ($object["type_specific_content"]["location"] AS $location) {
                    $values = Array(
                        "field_fb_location_topic" => $location,
//                        "field_fb_location_mid" => $attribute["entityUri"],
                    );
					try {
						similarity_search_add_field_collection($entity, "node", "field_fb_location", $values);
					} catch (Exception $e) {
						drupal_set_message($e->getMessage(), 'error');
					}
                }
            }
              
            // read agent parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["agent"]) && !empty($object["type_specific_content"]["agent"])) {
                foreach ($object["type_specific_content"]["agent"] AS $agent) {
                    $values = Array(
                        "field_fb_agent_topic" => $agent,
//                        "field_fb_agent_mid" => $attribute["entityUri"],
                    );
                    // read birth date
//                    if (isset($attribute["value"][3]))
//                    {
//                        $values["field_fb_agent_birth_date"] = $attribute["value"][3];
//                    }

                    // read death date
//                    if (isset($attribute["value"][4]))
//                    {
//                        $values["field_fb_agent_death_date"] = $attribute["value"][4];
//                    }
					try {
						similarity_search_add_field_collection($entity, "node", "field_fb_agent", $values);
					} catch (Exception $e) {
						drupal_set_message($e->getMessage(), 'error');
					}
                }
            }

            // read genre parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["genre"]) && !empty($object["type_specific_content"]["genre"])) {
                foreach ($object["type_specific_content"]["genre"] AS $genre) {
                    $values = Array(
                        "field_fb_genre_topic" => $genre,
//                        "field_fb_genre_mid" => $attribute["entityUri"],
                    );
					try {
						similarity_search_add_field_collection($entity, "node", "field_fb_genre", $values);
					} catch (Exception $e) {
						drupal_set_message($e->getMessage(), 'error');
					}
                }
            }
              
            // read style_movement parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["style_movement"]) && !empty($object["type_specific_content"]["style_movement"])) {
                foreach ($object["type_specific_content"]["style_movement"] AS $style) {
                    $values = Array(
                        "field_fb_style_movement_topic" => $style,
//                        "field_fb_style_movement_mid" => $attribute["entityUri"],
                    );
					try {
						similarity_search_add_field_collection($entity, "node", "field_fb_style_movement", $values);
					} catch (Exception $e) {
						drupal_set_message($e->getMessage(), 'error');
					}
                }
            }
              
            /// @todo delete?
//            // read object parameter from parsed SEC Store API message
//            if(isset($object["type_specific_content"]["object"]) && !empty($object["type_specific_content"]["object"])) {
//                foreach ($object["type_specific_content"]["object"] AS $obj) {
//                    $delta = $entity_wrapper->field_event_object->count();
//                    $entity_wrapper->field_event_object[$delta]->set(similarity_search_get_term($obj, "field_event_object"));
//                }
//            }
              
            // read materials parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["materials"]) && !empty($object["type_specific_content"]["materials"])) {
                foreach ($object["type_specific_content"]["materials"] AS $material) {
                    $values = Array(
                        "field_fb_materials_topic" => $material,
//                        "field_fb_materials_mid" => $attribute["entityUri"],
                    );
					try {
						similarity_search_add_field_collection($entity, "node", "field_fb_materials", $values);
					} catch (Exception $e) {
						drupal_set_message($e->getMessage(), 'error');
					}
                }
            }
            
            /// @todo delete?  
//            // read label parameter from parsed SEC Store API message
//            if(isset($object["type_specific_content"]["label"]) && !empty($object["type_specific_content"]["label"])) {
//                $entity_wrapper->field_event_label->value->set($object["type_specific_content"]["label"]);
//            }
            
            // read value value parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["value"]["value"]) && !empty($object["type_specific_content"]["value"]["value"])) {
                $values = Array(
                    "field_fb_value_topic" => $object["type_specific_content"]["value"]["value"],
//                    "field_fb_value_mid" => $attribute["entityUri"],
                );
				try {
					similarity_search_add_field_collection($entity, "node", "field_fb_value", $values);
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
             
            /// @todo delete?
            // read value currency parameter from parsed SEC Store API message
//            if(isset($object["type_specific_content"]["value"]["currency"]) && !empty($object["type_specific_content"]["value"]["currency"])) {
//                $entity_wrapper->field_event_currency->value->set($object["type_specific_content"]["value"]["currency"]);
//            }
//              
//            // read dimensions label parameter from parsed SEC Store API message
//            if(isset($object["type_specific_content"]["dimensions"]["label"]) && !empty($object["type_specific_content"]["dimensions"]["label"])) {
//                $entity_wrapper->field_event_dimension_label->value->set($object["type_specific_content"]["dimensions"]["label"]);
//            }
//            
//            // read dimensions unit parameter from parsed SEC Store API message
//            if(isset($object["type_specific_content"]["dimensions"]["unit"]) && !empty($object["type_specific_content"]["dimensions"]["unit"])) {
//                $entity_wrapper->field_event_dimension_unit->value->set($object["type_specific_content"]["dimensions"]["unit"]);
//            }
//            
//            // read dimensions value parameter from parsed SEC Store API message
//            if(isset($object["type_specific_content"]["dimensions"]["value"]) && !empty($object["type_specific_content"]["dimensions"]["value"])) {
//                $entity_wrapper->field_event_dimension_value->value->set($object["type_specific_content"]["dimensions"]["value"]);
//            }
            
            // read annotation_uri parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["annotation_uri"]) && !empty($object["type_specific_content"]["annotation_uri"])) {
				try {
					$entity_wrapper->field_event_annotation_uri->value->set($object["type_specific_content"]["annotation_uri"]);
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
        } break;
        
        // =====================================================================
        // REFERENCE
        case "reference": {
            // read images parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["images"]) && !empty($object["type_specific_content"]["images"])) {
                foreach ($object["type_specific_content"]["images"] AS $image) {
                    $result = drupal_http_request($image);

                    // can load the file
                    if ($result->code == 200) {
                        // get file info
                        $path = file_default_scheme() . '://images/';
                        $name = substr($image, (strrpos($image, '/', -1) + 1));
                        $finfo = new finfo(FILEINFO_MIME_TYPE);
                        $mime = $finfo->buffer($result->data);

                        // unknown mime, default mime will be this
                        if (!$mime) {
                            $mime = "text/plain";
                        }

                        // save file
						try {
							$f = file_save_data($result->data, $path.'/'.$name, FILE_EXISTS_RENAME);
							$delta = $entity_wrapper->field_reference_videos->count();
							$entity_wrapper->field_reference_images[$delta] = array('fid' => $f->fid);
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }  
                }
            }
              
            // read src parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["src"]) && !empty($object["type_specific_content"]["src"])) {
				try {
					$entity_wrapper->field_reference_source->value->set($object["type_specific_content"]["src"]);
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
              
            // read videos parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["videos"]) && !empty($object["type_specific_content"]["videos"])) {
                foreach ($object["type_specific_content"]["videos"] AS $video) {
                    $result = drupal_http_request($video);

                    // can load the file
                    if ($result->code == 200) {
                        // get file info
                        $path = file_default_scheme() . '://videos/';
                        $name = substr($video, (strrpos($video, '/', -1) + 1));
                        $finfo = new finfo(FILEINFO_MIME_TYPE);
                        $mime = $finfo->buffer($result->data);

                        // unknown mime, default mime will be this
                        if (!$mime) {
                            $mime = "text/plain";
                        }

                        // save file
						try {
							$f = file_save_data($result->data, $path.'/'.$name, FILE_EXISTS_RENAME);
							$delta = $entity_wrapper->field_reference_videos->count();
							$entity_wrapper->field_reference_videos[$delta] = array('fid' => $f->fid);
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }   
                }
            }

            // read files parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["files"]) && !empty($object["type_specific_content"]["files"])) {
                foreach ($object["type_specific_content"]["files"] AS $file) {
                    $result = drupal_http_request($file);

                    // can load the file
                    if ($result->code == 200) {
                        // get file info
                        $path = file_default_scheme() . '://files/';
                        $name = substr($file, (strrpos($file, '/', -1) + 1));
                        $finfo = new finfo(FILEINFO_MIME_TYPE);
                        $mime = $finfo->buffer($result->data);

                        // unknown mime, default mime will be this
                        if (!$mime) {
                            $mime = "text/plain";
                        }

                        // save file
						try {
							$f = file_save_data($result->data, $path.'/'.$name, FILE_EXISTS_RENAME);
							$delta = $entity_wrapper->field_reference_videos->count();
							$entity_wrapper->field_reference_videos[$delta] = array('fid' => $f->fid);
						} catch (Exception $e) {
							drupal_set_message($e->getMessage(), 'error');
						}
                    }   
                }
            }
            
            // read text parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["text"]) && !empty($object["type_specific_content"]["text"])) {
				try {
					$entity_wrapper->field_reference_text->value->set($object["type_specific_content"]["text"]);
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }
              
            // read visual_representation parameter from parsed SEC Store API message
            if(isset($object["type_specific_content"]["visual_representation"]) && isset($image->fid)) {
				try {
					$delta = $entity_wrapper->field_media->count();
					$entity_wrapper->field_media[$delta]->file->set($image); 
				} catch (Exception $e) {
					drupal_set_message($e->getMessage(), 'error');
				}
            }         
        } break;
    }
    
    $entity_wrapper->save();

    return $entity;
}

/**
 * Preparing Get Form message for SEC Store API.
 * 
 * @param array $data
 * @return array PHP array with message for SEC Store API
 */
function similarity_search_prepare_get_fields($data) {
    // create request message
    $message = Array();
    $message["get_fields"] = Array();
    $message["get_fields"]["type"] = $data["type"];
    
    if(isset($data["example"])) {
        $message["get_fields"]["example"] = $data["example"];
    }
    else {
        $message["get_fields"]["example"] = "";
    }
    
    return $message;
}

/**
 * Preparing Auto complete request message for SEC Store API.
 * 
 * @param array $data
 * @return array PHP array with message for SEC Store API
 */
function similarity_search_prepare_auto_complete($data) {
    global $user;

    // get user groups ($user is global variable)
    $groups = Array();
    foreach($user->roles AS $group) {
        $groups[]["id"] = (string)$group;
    }    

    // create request message
    $message = Array();
    $message["autocomplete"] = Array();
    $message["autocomplete"]["fields"] = $data["input_names"];
    $message["autocomplete"]["user_input"] = $data["input_text"];
    $message["autocomplete"]["cursor_pos"] = $data["input_position"];
    $message["autocomplete"]["type"] = $data["input_type"];
    $message["autocomplete"]["user"] = $user->name;
    $message["autocomplete"]["groups"] = $groups;
    $message["autocomplete"]["system"] = $GLOBALS['base_url'];

    return $message;
}

/**
 * Preparing Ignore message for SEC Store API.
 * 
 * @param array $data
 * @return array PHP array with message for SEC Store API
 */
function similarity_search_prepare_ignore($data) {
    // create request message
    $message = Array();

    foreach($data["ignore"] AS $id) {
        $message["ignore_sids"][] = Array("sid" => (string)$id);
    }

    if (!empty($data["object"])) {
        $message["example_sids"][] = Array("sid" => $data["object"]);
    }
    else {
        $message["example_sids"] = Array();
    }

    if (!empty($data["parent"])) {
        $message["context_sid"] = $data["parent"];
    }
    else {
        $message["context_sid"] = "";
    }
    
    if (!empty($data["user"])) {
        $message["user"] = $data["user"];
    }
    else {
        $message["user"] = "";
    }
    
    $message["system"] = $GLOBALS['base_url'];

    return $message;
}

/**
 * Get parent object type. And by parent type select default search type.
 * 
 * @param int $parentNID
 * @return string
 */
function similarity_search_get_default_search_type($parentNID) {
    // if we don't have any parent (we are not searchind under dossier or object story)
    if(empty($parentNID)) {
        return "object";
    }
    
    $node = node_load($parentNID);
    
    if (!$node) {
        return "object";
    }
    
    switch($node->type) {
        case "dossier": return "object_story";
        
        default:
            return "object";
    }
}

/**
 * This function was created to destroy bug when you switch from object story and search type is set to object.
 * When you switch to dossier (which dont have search type object) it will fail.
 * But this function didn't help
 * @param type $form
 * @param type $form_state
 */
function similarity_search_actualize_search_type(&$form, &$form_state) {
  // we have parent - context
  if (isset($form_state["values"]["context"]) && !empty($form_state["values"]["context"])) {
      $parent = node_load((int)$form_state["values"]["context"]);
  }
  else {
      $parent = NULL;
  }
  
  if (isset($parent->type)) {
    if($parent->type == 'dossier')
      $options = array('object_story' => t('Object story'), 'event' => t('Event'), 'reference' => t('Reference'));
    elseif($parent->type == 'object_story')
      $options = array('object' => t('Object'), 'event' => t('Event'), 'reference' => t('Reference'));
    else
      $options = array('object' => t('Object'), 'object_story' => t('Object story'), 'event' => t('Event'), 'reference' => t('Reference'));
  }
  
  // we don't have parent - no context  
  else {
      $options = array('object' => t('Object'), 'event' => t('Event'), 'reference' => t('Reference'));
  }
  
  $form['search_type'] = array
  (
    '#type' => 'select',
    '#options' => $options,
  );
  
  if (isset($form_state["values"]) && isset($parent->type)) {
      $search_type = $form_state["values"]["search_type"];
      switch($parent->type) {
          case "dossier": {
              if ($search_type != "object_story" || $search_type != "reference" || $search_type != "event") {
                  $search_type = similarity_search_get_default_search_type($parent->nid);
              }
          } break;
      
          case "object_story": {
              if ($search_type != "object" || $search_type != "reference" || $search_type != "event") {
                  $search_type = similarity_search_get_default_search_type($parent->nid);
              }      
          } break;              
      }
  }
}

/**
 * Check access rights for node. Used in SEC Store API protocol.
 * 
 * @param \stdClass $node node where we want to check access rights
 * @return string access rights ("-", "r" or "rw")
 */
function similarity_search_get_access($node) {
    $rights = "-";
    // load node wrapper
    $node_wrapper = entity_metadata_wrapper('node', $node);
    
    // load private field
    switch($node->type) {
        case "dossier": {
            $private = "0";
            if (isset($node_wrapper->field_dossier_private)) {
                $value = $node_wrapper->field_dossier_private->value();
                if (isset($value) && !empty($value)) {
                    $field_private = $value;
                }

                if (!empty($field_private)) {
                    if ($field_private == true) {
                        $private = "1";
                    }
                }
            }

        } break;
        
        case "object_story": {
            $private = "0";
            if (isset($node_wrapper->field_object_story_private)) {
                $value = $node_wrapper->field_object_story_private->value();
                if (isset($value) && !empty($value)) {
                    $field_private = $value;
                }

                if (!empty($field_private)) {
                    if ($field_private == true) {
                        $private = "1";
                    }
                }
            }

        } break;
        
        // other types don't have private field
        default:
            $private = 0;
    }
    
    if ($private) {
        $rights = "-";
    }
    else {
        $rights = "rw";
    }
    
    return $rights;
}

/**
 * This function return loaded nodes which are child (refered by) selected node
 * and are of selected type.
 * If you don't select any type, then all types known to SEC Store API will be selected.
 * 
 * @param \stdClass $node node for which we are searching childs
 * @param Array|String|NULL $type Array of types, or string with one type or NULL for auto fill types
 * @return Array array of nodes
 */
function similarity_search_get_refers_to($node, $type = NULL) {
    $refer_list = Array();
    
    // we have only one type to select, convert it to array
    if (is_string($type)) {
        $type = (array)$type;
    }
    
    // default types to select
    if (empty($type)) {
        $type = Array('object_story', 'object', 'reference', 'event');
    }
    
    // check each type and get it childs
    foreach($type AS $t) {
        $refer_list = array_merge($refer_list, similarity_search_get_refer($node, $t));
    }
    
    return $refer_list;
}

/**
 * Get node refer items from database.
 * Called from similarity_search_get_refers_to function.
 * Don't call this function, call similarity_search_get_refers_to function instead.
 * 
 * @param \stdClass $node node
 * @param string $search_type search type name
 * @return array array of found refer nodes
 */
function similarity_search_get_refer($node, $search_type) {
    $ret = Array();
    
    if (!isset($node->type)) {
        return $ret;
    }
    
    // load node wrapper
    $node_wrapper = entity_metadata_wrapper('node', $node);
    
    switch($node->type) {
        // read dossier childs (refer to)
        case "dossier": {
            switch($search_type) {
                case "object_story": {
                    if (isset($node_wrapper->field_dossier_object_stories)) {
                        $fields = $node_wrapper->field_dossier_object_stories->value();
                        if (!empty($fields)) {
                            foreach($fields AS $refer_node) {
                                $ret[] = $refer_node;
                            }   
                        }
                    }
                } break;
            
                case "event": {
                    if (isset($node_wrapper->field_dossier_events)) {
                        $fields = $node_wrapper->field_dossier_events->value();
                        if (!empty($fields)) {
                            foreach($fields AS $refer_node) {
                                $ret[] = $refer_node;
                            }   
                        }
                    }
                } break;
            
                case "reference": {
                    if (isset($node_wrapper->field_dossier_references)) {
                        $fields = $node_wrapper->field_dossier_references->value();
                        if (!empty($fields)) {
                            foreach($fields AS $refer_node) {
                                $ret[] = $refer_node;
                            }   
                        }
                    }
                } break;
            }
        } break;
    
        // read object story childs (refer to)
        case "object_story": {
            switch($search_type) {
                case "object": {
                    if (isset($node_wrapper->field_object_story_objects)) {
                        $fields = $node_wrapper->field_object_story_objects->value();
                        if (!empty($fields)) {
                            foreach($fields AS $refer_node) {
                                $ret[] = $refer_node;
                            }   
                        }
                    }
                } break;
            
                case "event": {
                    if (isset($node_wrapper->field_object_story_events)) {
                        $fields = $node_wrapper->field_object_story_events->value();
                        if (!empty($fields)) {
                            foreach($fields AS $refer_node) {
                                $ret[] = $refer_node;
                            }   
                        }
                    }
                } break;
            
                case "reference": {
                    if (isset($node_wrapper->field_object_story_references)) {
                        $fields = $node_wrapper->field_object_story_references->value();
                        if (!empty($fields)) {
                            foreach($fields AS $refer_node) {
                                $ret[] = $refer_node;
                            }   
                        }
                    }
                } break;
            }
        } break;
    }
    
    return $ret;
}

/**
 * This function will take field name and search vocabulary for specified value.
 * If this value is present it will return this value term ID, if this value is not
 * in vocabulary then it will be added.
 * 
 * @param string $value term value to find or to save
 * @param string $field field name
 * @return \stdClass|false term object or false on error
 */
function similarity_search_get_term($value, $field) {
    // get field info
    $info = field_info_field($field);
    
    // get vocabulary machine name
    $voc_mach_name = $info['settings']['allowed_values'][0]['vocabulary'];

    // unknown vocabulary or unknown field
    if (empty($info) || empty($voc_mach_name)) {
        return false;
    }

    // find term
    $term = taxonomy_get_term_by_name($value, $voc_mach_name);
    
    // term doesn't exist, so we create new one
    if (empty($term)) {
        // load vocabulary to get vid value
        $voc = taxonomy_vocabulary_machine_name_load($voc_mach_name);
        
        // create new term
        $term = new stdClass();
        $term->vid = $voc->vid;
        $term->name = $value;
        $term->vocabulary_machine_name = $voc_mach_name;
        taxonomy_term_save($term);
        return $term;
    }
    
    // we don't want array of term(s)
    foreach ($term AS $t) {
        return $t;
    }
}

function similarity_search_item_is_last_in_storyscope($sec_id) {
    $query = new EntityFieldQuery();
    $query->fieldCondition('field_ca_sec_id', 'value', $sec_id);
    $result = $query->execute();
    
    // if we found item with same CA/SEC ID
    if (!isset($result["node"]) && !empty($result["node"])) {
        // check how many items 
        if (count($result["node"]) > 1) {
            return 0;
        }
    }
    
    // it was last occuration of this item in this storyscope
    return 1;
}

function similarity_search_get_nid_from_sec($sec_id, $parentNID = NULL) {
    $query = new EntityFieldQuery();
    $query->fieldCondition('field_ca_sec_id', 'value', $sec_id);
    $result = $query->execute();
    
    // if we found item with same CA/SEC ID
    if (isset($result["node"]) && !empty($result["node"])) {
		// if we don't have set parentNID we will return first node NID
		if (empty($parentNID)) {
			$node = array_shift($result["node"]);
			return $node->nid;
		}
        // read nid
        foreach($result["node"] AS $node) {
            if (similarity_search_item_is_child($parentNID, $node->type, $sec_id)) {
                return $node->nid;
            }
        }
    }
    
    return false;
}

function similarity_search_convert_node_type_to_uri_type($node_type) {
    switch($node_type) {
        case "dossier": $ret = "dossiers"; break;
        case "object_story": $ret = "objectstories"; break;
        case "object": $ret = "objects"; break;
        case "event": $ret = "events"; break;
        case "reference": $ret = "references"; break;
        case "plot": $ret = "plots"; break;
        case "narrative_microsite": $ret = "narratives"; break;
        default: $ret = $node_type;
    }
    
    return $ret;
}

function similarity_search_item_is_already_in_context($item_sid, $parent) {
    // we dont have any parent from URL, nothing to do
    if ($parent == "no-parent") {
        return false;
    }
    
    // try to find CA/SEC ID in parent context
    if (similarity_search_get_nid_from_sec($item_sid, $parent) == false) {
        return false;
    }
    // CA/SEC ID was found
    else {
        return true;
    }
}

function similarity_search_item_is_child($parentNID, $node_type, $sec_id) {
    $items = similarity_search_get_saved_objects($parentNID, $node_type);
    return in_array($sec_id, $items);
}

/**
 * Convert date from exteral source to internal Storyscope date.
 * You can specify internal Storyscope date format in second parameter,
 * Default Storyscope date format is set to unix timestamp.
 * 
 * This function load unix_timestamp or RFC3339 timestamp and convert it into
 * Storyscope time which is printed to user.
 * 
 * It return "" on fail.
 * 
 * @param type $value datetime value
 * @param string $format output format
 * @return string converted date
 */
function similarity_search_convert_date($value, $format = NULL) {
    // load default format
    if (empty($format)) {
        $format = "U";
    }
    
    // nothing to do
    if (empty($value) || $value == "0000-00-00") {
        return "";
    }
    
    try {
        // check if the date is saved as timestamp
        if (is_numeric($value)) {
            $date = new DateTime();
            $date->createFromFormat("U", $value);
            
            // maybe we can call drupal function format_date instead
            $ret = $date->format($format);
        }
        
        // load RFC3339 datetime
        else {
            // parse date
            $date_part = explode("-", $value);
            $delete_date_part = Array();
            // go through date parts (year, month, day)
            for ($i = 0; $i < 3; $i++) {
                if (!isset($date_part[$i]) || $date_part[$i] == "00" || empty($date_part[$i])) {
                    $delete_date_part[$i] = 1;
                }
            }
            
            if (!isset($delete_date_part[0])) {
                $year = $date_part[0];
            }
            else {
                $year = "0000";
            }
            
            if (!isset($delete_date_part[1])) {
                $month = $date_part[1];
            }
            else {
                $month = "00";
            }
            
            if (!isset($delete_date_part[2])) {
                $day = $date_part[2];
            }
            else {
                $day = "00";
            }
            
            // everything is empty, return empty string
            if (isset($delete_date_part[0]) && isset($delete_date_part[1]) && isset($delete_date_part[2])) {
                return "";
            }
            
            // only year is filled
            if (!isset($delete_date_part[0]) && isset($delete_date_part[1]) && isset($delete_date_part[2])) {
                return $year;
            }

            // something else is filled, we will user user format
            $ret = str_ireplace("d", $day, $format);
            $ret = str_ireplace("m", $month, $ret);
            $ret = str_ireplace("y", $year, $ret);
            return $ret;
        }
        

    }
    catch (Exception $e) {
        drupal_set_message(t("Wrong format of date. Date wasn't imported."), 'warning');
        watchdog("similarity_search", "Wrong format of date (".$value."). Date wasn't imported.");
    }
    
    return "";
}

/**
 * Inform SEC Store API, that the child element was removed from parent element.
 * 
 * @param \stdClass $child_node child node
 * @param \stdClass $parent_node parent node
 */
function similarity_search_remove_from_context($child_node, $parent_node) {
    // create wrappers 
    $child_node_wrapper = entity_metadata_wrapper('node', $child_node);
    $parent_node_wrapper = entity_metadata_wrapper('node', $parent_node);

    // try to read ca_sec_id field
    $child_node_sec_id = "";
    if (isset($child_node_wrapper->field_ca_sec_id)) {
        $field_sec_id = $child_node_wrapper->field_ca_sec_id->value();
        if (!empty($field_sec_id)) {
            $child_node_sec_id = $field_sec_id;
        }
    }

    // try to read ca_sec_id field
    $parent_node_sec_id = "";
    if (isset($parent_node_wrapper->field_ca_sec_id)) {
        $field_sec_id = $parent_node_wrapper->field_ca_sec_id->value();
        if (!empty($field_sec_id)) {
            $parent_node_sec_id = $field_sec_id;
        }
    }
    
    if (!empty($child_node_sec_id) && !empty($parent_node_sec_id)) {
        // fill array for remove function
        $remove = Array(
            "remove" => Array($child_node_sec_id),
            "parent" => $parent_node_sec_id,
            "remove_from_system" => similarity_search_item_is_last_in_storyscope($child_node_sec_id),
            "hard" => "0"
        );

        similarity_search_sec_store_remove($remove);
    }
}

/**
 * Creates a field collection.
 *
 * @param $parent
 * @param $type
 * @param $collection_name
 * @param $values
 * @return object
 */
function similarity_search_add_field_collection($parent, $type, $collection_name, $values) {
    // nothing to do
    if (empty($values) || !is_array($values)) {
        return NULL;
    }
    
    // Create entity using the entity name and set the parent.
    $field_collection_item = entity_create('field_collection_item', array('field_name' => $collection_name));
    $field_collection_item->setHostEntity($type, $parent);

    // EMW makes it easier for us to work with the field_collection
    $field_collection_item_w = entity_metadata_wrapper('field_collection_item', $field_collection_item);
    
    foreach($values as $key => $value) {
      $field_collection_item_w->{$key}->set($value);
    }

    // Save the entity.
    $field_collection_item_w->save();

    return $field_collection_item;
}

function similarity_search_convert_to_partial_date($date_string, $delimeter = "-") {
    // we don't expect array, only date as string, try to convert it
    if (is_array($date_string)) {
        $date_string = array_values($date_string);
        $date_string = array_shift($date_string);
    }
    
    // parse date
    $date = explode($delimeter, $date_string);
    
    // go through date parts (year, month, day)
    for ($i = 0; $i < 3; $i++) {
        if (!isset($date[$i]) || $date[$i] == "00" || empty($date[$i])) {
            $date[$i] = NULL;
        }
    }

    // return array for field partial date
    return Array(
        "year" => $date[0],
        "month" => $date[1],
        "day" => $date[2]
    );
}

function similarity_search_convert_from_partial_date($field_date, $delimeter = "-") {
    // check if date is not empty and if at least year is filled
    if (empty($field_date) || !isset($field_date["year"]) || empty($field_date["year"])) {
        return "";
    }
    
    // field names and order which we want to get (format is YEAR-MONTH-DAY)
    $field_names = Array("year", "month", "day");
    
    // go through date parts (year, month, day)
    foreach ($field_names AS $name) {
        if (!isset($field_date[$name]) || $field_date[$name] == "00" || empty($field_date[$name])) {
            $ret[] = "00";
        }
        else {
            // if month or day as only one number we add 0 (e.g.: 7 -> 07)
            if (strlen($field_date[$name]) < 2) {
                $ret[] = "0".$field_date[$name];
            }
            else {
                $ret[] = $field_date[$name];
            }
        }
    }
    
    // return date as string
    return implode($delimeter, $ret);
}

/**
 * Convert BR tags to nl
 *
 * @param string The string to convert
 * @return string The converted string
 */
function similarity_search_br2nl($string) {
    // remove all <p ...> tags
    $string = preg_replace('|\<p[^\>]*\>|i', "", $string);
    // convert all </p> tags to \n
    $string = preg_replace('|\</p\>|i', "\n", $string);
    // convert <br>, <br/> and <br /> to \n
    return preg_replace('/\<br[^\>]*\/?\>/i', "\n", $string);
}

/**
 * Convert string to UTF-8 and removing HTML entities.
 * 
 * @param string $message
 * @return string
 */
function similarity_search_filter_text($message) {
	$message = strip_tags($message, "<p><br><br/>");
	$message = htmlspecialchars($message, ENT_NOQUOTES | ENT_IGNORE, 'UTF-8');
	$message = html_entity_decode($message);
	$message = similarity_search_br2nl($message);
    $message = preg_replace('|\&nbsp\;|i', " ", $message);
	
	return trim($message);
}
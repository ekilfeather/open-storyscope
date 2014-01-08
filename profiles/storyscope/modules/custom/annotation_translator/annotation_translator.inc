<?php
/**
 * Function to proccess XML file sent us from 4A server.
 *
 * @global type $user load user from drupal
 * @global array $alreadyProcessed list of already processed XML nodes
 * @global array $alreadyProcessed4A list of already processed XML nodes for 4A functions and tables
 * @param type $message xml message with annotations
 * @return int success code (0 fail)
 */
function annotation_translator_process_xml($message) {
	global $alreadyProcessed;

	$list = Array();

	// list of actions in XML file
	$messageFormat = Array(
		'add',
		'change',
		'remove'
	);

	$xmlRoot = new SimpleXMLElement($message);
	$xml = $xmlRoot;

	// wrong format of XML (XML must contain tag called annotations)
	if (!isset($xml->annotations)) {
		return 0;
	}

	// we go through all sections in XML file (section: add, change, remove)
	foreach($messageFormat AS $action) {
		// processed list is unique for each action (add, change, remove)
		// we can add annotation and change the same annotation in one XML message
		$alreadyProcessed = Array();
		$ignoreList = Array();

		// now we are in one of the specific section and we will read individual annotations
		foreach($xml->annotations->$action->annotation AS $annotation) {
			// ignore list = empty array
            $alreadyProcessed = Array();
			$list = annotation_translator_process_annotation($annotation, $xmlRoot, $ignoreList);

			if (!empty($list)) {
				// update database with list of annotations with attributes
				// action tell us what to do with annotation (INSERT, UPDATE, DELETE)
				annotation_translator_update_db($list, $action);
			}
		}
	}
    
	return 1;
}

/**
 * Function for processing (parsing) annotations and saving interesting
 * informations from annotations to array.
 * This function reads values from XML file and save them to PHP array.
 * 
 * @global array $alreadyProcessed list of already processed annotations URL's
 * @param \stdClass $xml XML message to process
 * @param \stdClass $xmlRoot XML root element
 * @param array $ignoreList array of ignored annotations
 * @param bool $force force to read annotation (ignore ignoreList and already processed state) used for reading linked annotations in attribute
 * @return array
 */
function annotation_translator_process_annotation($xml, $xmlRoot, $ignoreList, $force = 0) {
	global $alreadyProcessed;

	$list = Array();
	$item = Array();
	$attributes = Array();
	$attrItem = Array();
	$innerAnnotation = Array();
	$innerAnnotationList = Array();

	// if this nodes don't exist then is something wrong with XML file
	if (isset($xml->Description)) {
		$xml = $xml->Description;
	}
	else {
		return $list;
	}

	// this annotation has unknown type or name and will be ignored
	// this can only happend to linked or nested annotation
	if (!$force && in_array((string)$xml->attributes()->about, $ignoreList)) {
		return $list;
	}

	// this annotation is already processed, we shouldn't process it twice
	if (!$force && in_array((string)$xml->attributes()->about, $alreadyProcessed)) {
        return $list;
    }
    
	// pick up data about annotations and later we will insert/update them into the database
	$item["about"] = (string)$xml->attributes()->about;
	$item["type"] = (string)$xml->type->attributes()->resource;
	$item["typeOntology"] = (string)$xml->type->attributes()->ontologyUri;
	$item["dateTime"] = (string)$xml->dateTime->attributes()->value;
    $item["authorUri"] = (string)$xml->author->attributes()->id;
    $item["authorName"] = (string)$xml->author->attributes()->name;
    $item["authorAddress"] = (string)$xml->author->attributes()->address;
	$item["source"] = (string)$xml->source->attributes()->uri;
    $item["sourceResource"] = (string)$xml->source->attributes()->resource;
	$item["fragmentText"] = (string)$xml->fragment->annotatedText;
	$item["fragmentOffset"] = (int)$xml->fragment->offset;
	$item["fragmentPath"] = (string)$xml->fragment->path;
	$item["fragmentLength"] = (int)$xml->fragment->length;
	$item["comment"] = trim((string)$xml->content);
    
    // selected text from annotation
    $item["text"] = annotation_translator_get_annotation_text($xml, $xmlRoot);

    // check if annotation is event (we will save it as node event later)
    $item["isEvent"] = 0;
    if (annotation_translator_annotation_has_type($xml, 'event') || annotation_translator_annotation_has_type($xml, 'událost')) {
        $item["isEvent"] = 1;
    }
    // comment is not required in annotations
	if (isset($xml->type->comment)) {
		$item["typeComment"] = (string)$xml->type->comment;
	}
	else {
		$item["typeComment"] = NULL;
	}

	$item["attributes"] = Array();

    // mark annotation as processed
    /// @todo: save to alreadyProcessed if we have set $force variable?
	$alreadyProcessed[] = $item["about"];
    
	// pick up data about annotations attributes and later we will will insert/update them into the database
	foreach($xml->attribute AS $attribute) {
		$attrItem = Array();
		$content = "";
		$innerAnnotation = Array();

		$attrItem["name"] = (string)$attribute->attributes()->name;
		$attrItem["type"] = (string)$attribute->attributes()->type;
		$attrItem["typeName"] = $attrItem["type"];
		$attrItem["ontology"] = (string)$attribute->attributes()->ontologyUri;
		$attrItem["typeOntology"] = (string)$attribute->attributes()->typeOntologyUri;

		if (isset($attribute->comment)) {
			$attrItem["comment"] = (string)$attribute->comment;
		}
		else {
			$attrItem["comment"] = NULL;
		}

		if (isset($attribute->attributes()->uri)) {
			$attrItem["uri"] = (string)$attribute->attributes()->uri;
		}
		else {
			$attrItem["uri"] = NULL;
		}

		if (isset($attribute->attributes()->ontologyUri)) {
			$attrItem["ontology"] = (string)$attribute->attributes()->ontologyUri;
		}
		else {
			$attrItem["ontology"] = NULL;
		}

        // if type is URL, we havet to parse the type name (string after last "/" in URL)
        if (($pos = strrpos($attrItem["type"], "/")) !== false) {
            $pos++;
        }
        else {
            $pos = 0;
        }
        
        // get attribute type
        // location is only type which have some string after type name
        if (strripos(strtolower($attrItem["type"]), "/location/")) {
            $type = "location";
        }
        else {
            $type = substr(strtolower($attrItem["type"]), $pos);
        }
        
		// values in attributes are saved differently according to their type
		switch($type) {
			// geoPoint have 2 values
			case 'geopoint': {
				$attrItem["value"][] = (string)$attribute->Point->lat;
				$attrItem["value"][] = (string)$attribute->Point->long;
			} break;

			// nestedAnnotation
			case 'nestedannotation': {
				$innerAnnotation = annotation_translator_process_annotation($attribute->annotation, $xmlRoot, $ignoreList);

				$innerAnnotationList = array_merge($innerAnnotationList, $innerAnnotation);

				// inner annotation was found and has uri
				if (isset($innerAnnotation[0]["about"])) {
                    $attrItem["link"] = $innerAnnotation[0]["about"];
					// override type "nestedAnnotation" with real annotation type
					$attrItem["typeName"] = substr($innerAnnotation[0]["type"], (strrpos($innerAnnotation[0]["type"], '/', -1) + 1));
					$attrItem["typeUri"] = $innerAnnotation[0]["type"];

                    if ($attrItem["name"] == "visual_artist" || $attrItem["name"] == "artist" || $attrItem["name"] == "person" || $attrItem["name"] == "agent"
                        || $attrItem["name"] == "umělec" || $attrItem["name"] == "ssoba") {
                        // try to find attribute with type entity
                        if (isset($innerAnnotation[0]["attributes"]) && !empty($innerAnnotation[0]["attributes"])) {
                            foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                if (strtolower($innerAttr["name"]) == "entity" || strtolower($innerAttr["name"]) == "entita") {
                                    $name = $innerAttr["value"][0];
                                    $url = $innerAttr["uri"];
                                    break;
                                }
                            }
                        }
                            
                        $attrItem["value"][] = $name;
                        $attrItem["entityUri"] = (string)$url;
                    }
                    else {
                        $attrItem["value"][] = $innerAnnotation[0]["text"];
                    }
				}
				// inner annotation don't have uri, annotation is empty or any other error occured, annotation will be ignored
				else {
					$innerAnnotation = Array();
					$attrItem = Array();
				}
			} break;

			// annotationLink
			case 'annotationlink': {
                // in force mode we will not use any links
                if ($force) {
                    break;
                }
                
				$xmlLink = annotation_translator_find_xml_annotation($xmlRoot, (string)$attribute->attributes()->uri);

				if (!empty($xmlLink)) {
                    // if link contain URL of already processed annotation, we have to use force mode
                    // to read alreadyProcessed annotation values
                    $useForce = 0;
                    if (in_array((string)$attribute->attributes()->uri, $alreadyProcessed)) {
                        $useForce = 1;
                    }
                    
					$innerAnnotation = annotation_translator_process_annotation($xmlLink, $xmlRoot, $ignoreList, $useForce);
					$innerAnnotationList = array_merge($innerAnnotationList, $innerAnnotation);

					if (!empty($innerAnnotation)) {
						// inner annotation was found and has uri
						if (isset($innerAnnotation[0]["about"])) {
                            $attrItem["link"] = $innerAnnotation[0]["about"];
							//$attrItem["value"][] = $innerAnnotation[0]["text"];
							// override type "annotationLink" with real annotation type
							$attrItem["typeName"] = substr($innerAnnotation[0]["type"], (strrpos($innerAnnotation[0]["type"], '/', -1) + 1));
							$attrItem["typeUri"] = $innerAnnotation[0]["type"];
                            
                            $date = "";
                            // different behaviour for date attributes and other attributes
                            switch(strtolower($attrItem["name"])) {
                                // start / end date
                                case 'start_time':
                                case 'end_time':
                                case 'start_date':
                                case 'end_date':
                                case 'datetime':
                                case 'date_begun':
                                case 'date_completed':
                                case 'date_of_birth':
                                case 'date_of_death':
                                case 'time':
                                case 'date':
                                case "Datum":
                                case "Počáteční_datum":
                                case "Koncové_datum":
                                case "Datum_začátku":
                                case "Datum_konce":
                                case "Datum_začátku":
                                case "Datum_dokončení":
                                case "Datum_narození":
                                case "Datum_úmrtí": {
                                    foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                        switch (strtolower($innerAttr["name"])) {
                                            case "date":
                                            case "datetime":
                                            case 'time':
                                            case "start_time":
                                            case "end_time":
                                            case "start_date":
                                            case "end_date":
                                            case "date_begun":
                                            case "date_completed":
                                            case "date_of_birth":
                                            case "date_of_death":
                                            case "Datum":
                                            case "Počáteční_datum":
                                            case "Koncové_datum":
                                            case "Datum_začátku":
                                            case "Datum_konce":
                                            case "Datum_začátku":
                                            case "Datum_dokončení":
                                            case "Datum_narození":
                                            case "Datum_úmrtí": {
                                                $date = $innerAttr["value"][0];
                                            } break;
                                        }
                                        
                                        if (!empty($date)) {
                                            break;
                                        }
                                    }

                                    // annotation has type datetime which has better time than in fragmentText
                                    if(!empty($date)) {
                                        $attrItem["value"][] = $date;
                                    }

                                    // annotation don't have attribute datetime, so ty read date from annotatedText
                                    else {
                                        $attrItem["value"][] = $innerAnnotation[0]["text"];
                                    }
                                } break;
                                
                                // any other annotationLink
                                default: {
                                    $attrItem["value"][] = $innerAnnotation[0]["text"];
                                }
                            }
						}
						// inner annotation don't have uri, annotation is empty or any other error occured, annotation will be ignored
						else {
							$innerAnnotation = Array();
							$attrItem = Array();
						}
					}
				}
			} break;
           
            // process special annotationLink annotations which should contain entity
            case 'nationality':
            case 'art_genre':
            case 'event':
            case 'art_period_movement':
            case 'art_medium':
            case 'art_form':
            case 'artwork':
            case 'location':
            case 'museum':
            case 'museums':
            case 'agent':
            case 'visual_artist':
            case 'person': {
                // in force mode we will not use any links
                if ($force) {
                    break;
                }
                
				$xmlLink = annotation_translator_find_xml_annotation($xmlRoot, (string)$attribute->attributes()->uri);

				if (!empty($xmlLink)) {
                    // if link contain URL of already processed annotation, we have to use force mode
                    // to read alreadyProcessed annotation values
                    $useForce = 0;
                    if (in_array((string)$attribute->attributes()->uri, $alreadyProcessed)) {
                        $useForce = 1;
                    }
                    
					$innerAnnotation = annotation_translator_process_annotation($xmlLink, $xmlRoot, $ignoreList, $useForce);
					$innerAnnotationList = array_merge($innerAnnotationList, $innerAnnotation);

					if (!empty($innerAnnotation)) {
						// inner annotation was found and has uri
						if (isset($innerAnnotation[0]["about"])) {
                            $attrItem["link"] = $innerAnnotation[0]["about"];
							//$attrItem["value"][] = $innerAnnotation[0]["text"];
							// override type "annotationLink" with real annotation type
							$attrItem["typeName"] = substr($innerAnnotation[0]["type"], (strrpos($innerAnnotation[0]["type"], '/', -1) + 1));
							$attrItem["typeUri"] = $innerAnnotation[0]["type"];
                            $attrItem["entityUri"] = "";
                            
                            $name = "";
                            $url = "";
                            
                            // try to find attribute with type entity
                            if (isset($innerAnnotation[0]["attributes"]) && !empty($innerAnnotation[0]["attributes"])) {
                                foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                    if (strtolower($innerAttr["name"]) == "entity" || strtolower($innerAttr["name"]) == "entita") {
                                        $name = $innerAttr["value"][0];
                                        $url = $innerAttr["uri"];
                                        break;
                                    }
                                }
                            }
                            
                            // annotation has attribute with type entity
                            if (!empty($name) && !empty($url)) {
                                $attrItem["value"][] = $name;
                                $attrItem["entityUri"] = $url;
                            }

                            // annotation don't have attribute with type entity, so we have to try to read values from other attributes
                            else {
                                $name = "";
                                $url = "";
                                $birth = "";
                                $death = "";
                                
                                if (isset($innerAnnotation[0]["attributes"]) && !empty($innerAnnotation[0]["attributes"])) {
                                    // each type have different attributes
                                    switch ($type) {
                                        // try to find attributes for agent (visual artist, person)
                                        case "visual_artist":
                                        case "person":
                                        case "agent": {
                                            foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                                // read entity NAME
                                                if ((strtolower($innerAttr["name"]) == "display_term" || strtolower($innerAttr["name"]) == "name"
                                                    || strtolower($innerAttr["name"]) == "jméno" || strtolower($innerAttr["name"]) == "název") && isset($innerAttr["value"][0])
                                                ) {
                                                    $name = $innerAttr["value"][0];
                                                }

                                                // read entity URI
                                                $url = annotation_translator_ger_entity_uri($innerAnnotation[0]);
                                                
                                                // read entity BIRTH DATE
                                                if ((strtolower($innerAttr["name"]) == "date_of_birth" || strtolower($innerAttr["name"]) == "datum_narození") && isset($innerAttr["value"][0])) {
                                                    $birth = $innerAttr["value"][0];
                                                }
                                                
                                                // read entity DEATH DATE
                                                if ((strtolower($innerAttr["name"]) == "date_of_death" || strtolower($innerAttr["name"]) == "datum_úmrtí") && isset($innerAttr["value"][0])) {
                                                    $death = $innerAttr["value"][0];
                                                }

                                                // we have got all information from inner annotation
                                                if (!empty($name) && !empty($url) && !empty($birth) && !empty($death)) {
                                                    break;
                                                }
                                            }
                                        } break;
                                        
                                        // try to find attributes for location
                                        case "location": {
                                            foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                                // read entity NAME
                                                if ((strtolower($innerAttr["name"]) == "name" || strtolower($innerAttr["name"]) == "jméno" || strtolower($innerAttr["name"]) == "název") && isset($innerAttr["value"][0])) {
                                                    $name = $innerAttr["value"][0];
                                                }

                                                // read entity URI
                                                $url = annotation_translator_ger_entity_uri($innerAnnotation[0]);

                                                // we have got all information from inner annotation
                                                if (!empty($name) && !empty($url)) {
                                                    break;
                                                }
                                            }
                                        } break;
                                        
                                        // try to find attributes for artwork
                                        case "artwork": {
                                            foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                                // read entity NAME
                                                if ((strtolower($innerAttr["name"]) == "name" || strtolower($innerAttr["name"]) == "jméno" || strtolower($innerAttr["name"]) == "název") && isset($innerAttr["value"][0])) {
                                                    $name = $innerAttr["value"][0];
                                                }

                                                // read entity URI
                                                $url = annotation_translator_ger_entity_uri($innerAnnotation[0]);
                                                
                                                // we have got all information from inner annotation
                                                if (!empty($name) && !empty($url)) {
                                                    break;
                                                }
                                            }
                                        } break;
                                        
                                        // try to find attributes for museum
                                        case "museum":
                                        case "museums": {
                                            foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                                // read entity NAME
                                                if ((strtolower($innerAttr["name"]) == "name" || strtolower($innerAttr["name"]) == "jméno" || strtolower($innerAttr["name"]) == "název") && isset($innerAttr["value"][0])) {
                                                    $name = $innerAttr["value"][0];
                                                }

                                                // read entity URI
                                                $url = annotation_translator_ger_entity_uri($innerAnnotation[0]);

                                                // we have got all information from inner annotation
                                                if (!empty($name) && !empty($url)) {
                                                    break;
                                                }
                                            }
                                        } break;
                                        
                                        // try to find attributes for event
                                        case "event": {
                                            foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                                // read entity NAME
                                                if ((strtolower($innerAttr["name"]) == "name" || strtolower($innerAttr["name"]) == "jméno" || strtolower($innerAttr["name"]) == "název") && isset($innerAttr["value"][0])) {
                                                    $name = $innerAttr["value"][0];
                                                }

                                                // read entity URI
                                                $url = annotation_translator_ger_entity_uri($innerAnnotation[0]);

                                                // we have got all information from inner annotation
                                                if (!empty($name) && !empty($url)) {
                                                    break;
                                                }
                                            }
                                        } break;
                                        
                                        // try to find attributes for art form 
                                        case "art_form": {
                                            foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                                // read entity NAME
                                                if ((strtolower($innerAttr["name"]) == "name" || strtolower($innerAttr["name"]) == "jméno" || strtolower($innerAttr["name"]) == "název") && isset($innerAttr["value"][0])) {
                                                    $name = $innerAttr["value"][0];
                                                }

                                                // read entity URI
                                                $url = annotation_translator_ger_entity_uri($innerAnnotation[0]);

                                                // we have got all information from inner annotation
                                                if (!empty($name) && !empty($url)) {
                                                    break;
                                                }
                                            }
                                        } break;
                                        
                                        // try to find attributes for art medium
                                        case "art_medium": {
                                            foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                                // read entity NAME
                                                if ((strtolower($innerAttr["name"]) == "name" || strtolower($innerAttr["name"]) == "jméno" || strtolower($innerAttr["name"]) == "název") && isset($innerAttr["value"][0])) {
                                                    $name = $innerAttr["value"][0];
                                                }

                                                // read entity URI
                                                $url = annotation_translator_ger_entity_uri($innerAnnotation[0]);

                                                // we have got all information from inner annotation
                                                if (!empty($name) && !empty($url)) {
                                                    break;
                                                }
                                            }
                                        } break;
                                        
                                        // try to find attributes for style movement
                                        case "art_period_movement": {
                                            foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                                // read entity NAME
                                                if ((strtolower($innerAttr["name"]) == "name" || strtolower($innerAttr["name"]) == "jméno" || strtolower($innerAttr["name"]) == "název") && isset($innerAttr["value"][0])) {
                                                    $name = $innerAttr["value"][0];
                                                }

                                                // read entity URI
                                                $url = annotation_translator_ger_entity_uri($innerAnnotation[0]);

                                                // we have got all information from inner annotation
                                                if (!empty($name) && !empty($url)) {
                                                    break;
                                                }
                                            }
                                        } break;
                                        
                                        // try to find attributes for genre 
                                        case "art_genre": {
                                            foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                                // read entity NAME
                                                if ((strtolower($innerAttr["name"]) == "name" || strtolower($innerAttr["name"]) == "jméno" || strtolower($innerAttr["name"]) == "název") && isset($innerAttr["value"][0])) {
                                                    $name = $innerAttr["value"][0];
                                                }

                                                // read entity URI
                                                $url = annotation_translator_ger_entity_uri($innerAnnotation[0]);

                                                // we have got all information from inner annotation
                                                if (!empty($name) && !empty($url)) {
                                                    break;
                                                }
                                            }
                                        } break;
                                        
                                        // try to find attributes for nationality
                                        case "nationality": {
                                            foreach($innerAnnotation[0]["attributes"] AS $innerAttr) {
                                                // read entity NAME
                                                if ((strtolower($innerAttr["name"]) == "name" || strtolower($innerAttr["name"]) == "jméno" || strtolower($innerAttr["name"]) == "název") && isset($innerAttr["value"][0]) && !empty($innerAttr["value"][0])) {
                                                    $name = $innerAttr["value"][0];
                                                }

                                                // read entity URI
                                                $url = annotation_translator_ger_entity_uri($innerAnnotation[0]);

                                                // we have got all information from inner annotation
                                                if (!empty($name) && !empty($url)) {
                                                    break;
                                                }
                                            }
                                        } break;
                                    }
                                    
                                    // process values from attributes
                                    $attrItem["value"][] = $name;
                                    $attrItem["entityUri"] = $url;

                                    if ($type == "visual_artist" || $type == "person" || $type == "agent") {
                                        $attrItem["value"][] = $birth;
                                        $attrItem["value"][] = $death;
                                    }
                                }
                            }
                        }
                    }
                }
            } break;
            
            ///@todo ignore binary and text files???
			// these two types should be saved as file on HDD
			// there is no break and that is correct!
			case 'binary': {
				$content = base64_decode((string)$attribute->attributes()->value);
			}
            //
			case 'text': {
				// we have type Text (not Binary)
				if ($attrItem["type"] == 'Text') {
					$content = (string)$attribute;
				}

                $file = new stdClass();

                // get file info
                $path = file_default_scheme() . '://';
                $name = substr($item["text"], 0, 20)."_".substr($attrItem["name"], 0, 20);
                $finfo = new finfo(FILEINFO_MIME_TYPE);
                $mime = $finfo->buffer($content);

                // unknown mime, default mime will be this
                if (!$mime) {
                    $mime = "text/plain";
                }

                // get file extension from mime type
                $ext = annotation_translator_convert_mime_to_ext($mime);
                ///@todo delete this condition, it is only temporaly (until someone add event file field)
                if ($ext == ".jpg" || $ext == ".gif" || $ext == ".png") {
                    // save file
                    $file = file_save_data($content, $path.'/'.$name.$ext, FILE_EXISTS_RENAME);

                    // later we attach the file object to attribute node
                    $attrItem["file"][] = $file;
                }
                
                // we need value for triplestore
                // this value shouldn't be saved in StoryScope, it is saved in file
                $attrItem["value"][] = $content;
			} break;

			case 'duration': {
				$attrItem["value"][] = (string)$attribute->attributes()->value;
			} break;
        

            // process Dimension value
            case "dimensions": {
                // Expecting: Array(number, unit, label)
                // expected order is for annotation_translator_event_add function
                // read dimension attribute return array of values
                $attrItem["value"] = annotation_translator_process_dimension_attribute($attribute, $xmlRoot, $ignoreList);
            } break;
        
            // process Value (cost) value
            case "monetary":
            case "cost":
            case "value": {
                // Expecting: Array(number, currency)
                // expected order is for annotation_translator_event_add function
                // read value attribute return array of values
                $attrItem["value"] = annotation_translator_process_value_attribute($attribute, $xmlRoot, $ignoreList);
            } break;
        
            // process entity
            case "entity": {
                if (isset($attribute->entity)) {
                    $attrItem["value"][] = (string)$attribute->entity->attributes()->name;
                    $attrItem["entityUri"] = (string)$attribute->entity->attributes()->uri;
                }
            } break;    

            // all other attributes
			default: {
				if (isset($attribute->attributes()->value)) {
					$attrItem["value"][] = (string)$attribute->attributes()->value;
				}
			}
		}

		// if annotation has attributes add them to array
		if (!empty($attrItem)){
			$attributes[] = $attrItem;
		}
	}

	$item["attributes"] = array_merge($item["attributes"], $attributes);

	$list[] = $item;
    
	// nested annotation must be inserted after parent annotation (we need to know the parent ID)
	if (!empty($innerAnnotationList)) {
		$list = array_merge($list, $innerAnnotationList);
	}

	return $list;
}

/**
 * Update StoryScope database with parsed annotations from XML file.
 * 
 * @param array $annotations annotations parsed data
 * @param string $action action which we should perform (depends on XML part - add, change, remove)
 */
function annotation_translator_update_db($annotations, $action) {
    include_once(drupal_get_path("module", "rdfx").'/vendor/arc/ARC2.php');
    
    // we parsed some annotations
    if (!empty($annotations)) {
        // read all annotations
        foreach($annotations AS $annotation) {
            switch($action) {
                case 'add': {
                    annotation_translator_annotation_add($annotation);
                } break;

                case 'change': {
                    annotation_translator_annotation_change($annotation);
                } break;

                case 'remove': {
                    annotation_translator_annotation_remove($annotation);
                } break;
            }
        }
    }
}



// =================================================================
// saving functions for annotation translator
// =================================================================

/**
 * Add annotation in StoryScope.
 * That means add event node if annotation has type of event and add annotation
 * to triplestore
 * 
 * @param array $annotation annotation data
 */
function annotation_translator_annotation_add($annotation) {  
    global $user;
    
    // save actual user (it should be always anonymous user - because we are not logged in)
    $tmpUser = $user;
    
    // try to find user by name (it should be always there)
    $load_user = user_load_by_name($annotation["authorName"]);
    if (isset($load_user->uid)) {
        $user = $load_user;
    }
    // if we can't find the user, we set owner as admin
    else {
        // try to load admin user
        $load_user = user_load(1);
        
        // if we can't load user with ID 1, we will proceed with anonymous user
        // but we set user name to Anonymous because SEC Store API needs some name
        if ($load_user) {
            $user = $load_user;
        }
        else {
            $user = $tmpUser;
            $user->name = "Anonymous";
        }
    }
    
    $endpoint = new stdClass();
    $endpoint->uri = variable_get('dec_triple_store')."/openrdf-sesame/repositories/" . variable_get('dec_triple_repo');    
    
    // save annotation to triple store if annotation doesn't exist already 
    if(!annotation_translator_triplestor_exist($annotation["about"], $endpoint)) {
        annotation_translator_triplestore_add($annotation);
    }
    
    // annotation is event, so save it as event node to database
    if ($annotation["isEvent"]) {        
        // load node or SEC ID from source URL address
        $lookup = 'nid/';
        $nid = substr($annotation["source"], (strrpos($annotation["source"], $lookup) + strlen($lookup)));
        if ($nid) {
            $parent = node_load($nid);
        }

        if (!empty($parent)) {
            $event = annotation_translator_event_add($annotation, $parent);
            storyscope_content_create_path_aliases($event, $parent);
        }
    }
    
    // load previous user (it should be always anonymous user - because we are not logged in)
    $user = $tmpUser;
}

/**
 * Change annotation in StoryScope.
 * There is no change annotation function. This function just remove old annotation
 * and add same annotation with new values (attributes).
 * 
 * @param array $annotation annotation data
 */
function annotation_translator_annotation_change($annotation) {
    annotation_translator_annotation_remove($annotation);
    annotation_translator_annotation_add($annotation);
}

/**
 * Remove annotation from StoryScope.
 * That means remove event node if annotation has type of event and remove 
 * annotations from triplestore.
 * 
 * @param array $annotation annotation data
 */
function annotation_translator_annotation_remove($annotation) {
    // remove annotation from triple store
    annotation_translator_triplestore_remove($annotation["about"]);
    
    // annotation is event, so remove this event node from database
    if ($annotation["isEvent"]) {
        annotation_translator_event_remove($annotation);
    }
}

/**
 * Adding triples from annotation to triplestore.
 * 
 * @param array $annotation annotation array
 */
function annotation_translator_triplestore_add($annotation) {
    // used predicates
    $have_type = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
    $have_datetime = "http://www.w3.org/2000/10/annotation-ns#created";
    $have_author = "http://www.w3.org/2000/10/annotation-ns#author";
    $have_name = "http://www.semanticdesktop.org/ontologies/nco/#fullname";
    $have_email = "http://www.semanticdesktop.org/ontologies/nco/#hasEmailAddress";
    $have_source = "http://www.w3.org/2000/01/rdf-schema#Resource";
    $have_uri = "http://purl.org/dc/terms/URI";
    $have_fragment = "http://purl.org/ao/core/#context";
    $have_fragment_type = "http://annotation-ontology.googlecode.com/svn/trunk/annotation-selectors.owl#OffsetRangeTextSelector";
    //$have_fragment_path = "http://have_fragment_path";
    $have_fragment_offset = "http://purl.org/ao/selectors/#offset";
    $have_fragment_length = "http://purl.org/ao/selectors/#range";
    $have_fragment_text = "http://www.w3.org/2000/10/annotation-ns#body";    
    $have_comment = "http://www.w3.org/2000/01/rdf-schema#comment";
    $have_description = "http://www.w3.org/2000/01/rdf-schema#comment";
    $have_attribute = "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property";
    //$have_type_ontology = "http://have_type_ontology";
    //$have_ontology = "http://have_ontology";
    $have_attr_name = "http://www.w3.org/2000/01/rdf-schema#label";
    $have_value = "http://www.w3.org/1999/02/22-rdf-syntax-ns#value";
    $have_geo_lat = "http://www.w3.org/2003/01/geo/wgs84_pos#lat";
    $have_geo_long = "http://www.w3.org/2003/01/geo/wgs84_pos#long";
    $have_birth_date = "http://rdf.freebase.com/ns/people.person.date_of_birth";
    $have_death_date = "http://rdf.freebase.com/ns/people.deceased_person.date_of_death";
    $subject = $annotation["about"];
    $subject_type = "uri";
    
    $fragment_url = $annotation["about"]."/fragment";
  
    // save annotation type into triplestore
    $triple[] = annotation_translator_fill_triple($annotation["about"], $have_type, $annotation["type"]);

    // save annotation type comment into triplestore
    $triple[] = annotation_translator_fill_triple($annotation["about"], $have_comment, $annotation["typeComment"]);

    // save annotation dateTime into triplestore
    $triple[] = annotation_translator_fill_triple($annotation["about"], $have_datetime, $annotation["dateTime"]);
    
    // save annotation author name into triplestore
    $triple[] = annotation_translator_fill_triple($annotation["about"], $have_author, $annotation["authorName"]);
    
    // save annotation author URI into triplestore
    $triple[] = annotation_translator_fill_triple($annotation["about"], $have_author, $annotation["authorUri"]);

    // save annotation author name into triplestore
    $triple[] = annotation_translator_fill_triple($annotation["authorUri"], $have_name, $annotation["authorName"]);

    // save annotation author address into triplestore
    $triple[] = annotation_translator_fill_triple($annotation["authorUri"], $have_email, $annotation["authorAddress"]);
    
    // save annotation source resource into triplestore
    $triple[] = annotation_translator_fill_triple($annotation["about"], $have_source, $annotation["sourceResource"]);

    // save annotation source URI into triplestore
    $triple[] = annotation_translator_fill_triple($annotation["sourceResource"], $have_uri, $annotation["source"]);

    // save annotation fragment into triplestore
    $triple[] = annotation_translator_fill_triple($annotation["about"], $have_fragment, $fragment_url);
    
    // save annotation fragment type into triplestore
    $triple[] = annotation_translator_fill_triple($fragment_url, $have_type, $have_fragment_type);
      
//    // save annotation fragment path into triplestore
//    $triple[] = annotation_translator_fill_triple($fragment_url, $have_fragment_path, $annotation["fragmentPath"]);
    
    // save annotation fragment offset into triplestore
    $triple[] = annotation_translator_fill_triple($fragment_url, $have_fragment_offset, $annotation["fragmentOffset"]);
        
    // save annotation fragment length into triplestore
    $triple[] = annotation_translator_fill_triple($fragment_url, $have_fragment_length, $annotation["fragmentLength"]);
        
    // save annotation fragment text into triplestore
    $triple[] = annotation_translator_fill_triple($fragment_url, $have_fragment_text, $annotation["fragmentText"]);
        
    // save annotation comment into triplestore
    $triple[] = annotation_translator_fill_triple($annotation["about"], $have_comment, $annotation["comment"]);
    
    // save annotation real text into triplestore (get from title, ascii, coreference or fragmentText)
    $triple[] = annotation_translator_fill_triple($annotation["about"], $have_description, $annotation["text"]);    
    
	// we go through all annotation attributes
	foreach($annotation["attributes"] AS $attribute) {
        // we have nested or linked annotation
        // we want to save to triplestore the annotation uri not the value of linked/nested annotation
        if (isset($attribute["link"]) && !empty($attribute["link"])) {
            $attribute["uri"] = $attribute["link"];
        }
        
        // get unique attribute URI (annotation can have multiple attributes with same name)
        $attribute_uri = annotation_translator_get_unique_attribute_uri($annotation, $attribute);
        
        // we have filled type ontology URI in annotation attribute
        if (isset($attribute["ontologyUri"]) && !empty($attribute["ontologyUri"])) {
            $attribute_predicate = $attribute["ontologyUri"];
        }
        // use default type 
        else {
            $attribute_predicate = $have_attribute;
        }
        
        // save generated annotation attribute unique URI into triplestore
        $triple[] = annotation_translator_fill_triple($annotation["about"], $attribute_predicate, $attribute_uri);
        
        // save annotation attribute name into triplestore
        $triple[] = annotation_translator_fill_triple($attribute_uri, $have_attr_name, $attribute["name"]);
        
        // save annotation attribute type into triplestore
        if (isset($attribute["typeOntologyUri"]) && !empty($attribute["typeOntologyUri"])) {
            $triple[] = annotation_translator_fill_triple($attribute_uri, $have_type, $attribute["typeOntologyUri"]);
        }
        else {
            $triple[] = annotation_translator_fill_triple($attribute_uri, $have_type, $attribute["type"]);
        }

//        // save annotation attribute ontologyUri into triplestore
//        if (isset($attribute["ontologyUri"]) && !empty($attribute["ontologyUri"])) {
//            $triple[] = annotation_translator_fill_triple($attribute_uri, $have_ontology, $attribute["ontologyUri"]);
//        }

        // save annotation attribute uri into triplestore
        if (isset($attribute["entityUri"]) && !empty($attribute["entityUri"])) {
            $triple[] = annotation_translator_fill_triple($attribute_uri, $have_uri, $attribute["entityUri"]);
        }
        else if (isset($attribute["uri"]) && !empty($attribute["uri"])) {
            $triple[] = annotation_translator_fill_triple($attribute_uri, $have_uri, $attribute["uri"]);
        }

        // save annotation geoType attribute (need special saving code)
        if ($attribute["type"] == "geoPoint") {
            if (isset($attribute["value"][0])) {
                $triple[] = annotation_translator_fill_triple($attribute_uri, $have_geo_lat, $attribute["value"][0]);
            }
            
            if (isset($attribute["value"][1])) {
                $triple[] = annotation_translator_fill_triple($attribute_uri, $have_geo_long, $attribute["value"][1]);
            }
        }
        // attribute is entity, entity needs special processing (because of artist, agent, person)
        else if (isset($attribute["entityUri"]) && !empty($attribute["entityUri"])) {
            // save entity name (location name, person name, genre name, ...)
            if (isset($attribute["value"][0]) && !empty($attribute["value"][0])) {
                $triple[] = annotation_translator_fill_triple($attribute_uri, $have_value, $attribute["value"][0]);
            }
            
            // check if entity is visual artist / person
            if (isset($attribute["typeUri"]) && ($attribute["typeUri"] == "visual_artist" || $attribute["typeUri"] == "person" || $attribute["typeUri"] == "agent")) {
                // save person birth date
                if (isset($attribute["value"][1]) && !empty($attribute["value"][1])) {
                    $triple[] = annotation_translator_fill_triple($attribute_uri, $have_birth_date, $attribute["value"][1]);
                }

                // save person death date
                if (isset($attribute["value"][2]) && !empty($attribute["value"][2])) {
                    $triple[] = annotation_translator_fill_triple($attribute_uri, $have_death_date, $attribute["value"][2]);
                }
            }
        }
        // save annotation attribute value into triplestore
        else if (isset($attribute["value"][0]) && !empty($attribute["value"][0])) {
            $triple[] = annotation_translator_fill_triple($attribute_uri, $have_value, $attribute["value"][0]);
        }
             
        // save annotation attribute comment into triplestore
        if (isset($attribute["comment"]) && !empty($attribute["comment"])) {
            $triple[] = annotation_translator_fill_triple($attribute_uri, $have_comment, $attribute["comment"]);
        }
    }
    
    $requests = Array();
    $requests = dec_rdf_send_transaction_document(variable_get('dec_triple_repo'), $triple, "add", $subject, $subject_type, $requests);
    background_process_start('dec_rdf_run_bg_requests',$requests);
}

/**
 * This function takes triples as arguments and save them to array for OU functions.
 * Function takes every string and check it if the string is URL or not. Then fill
 * corresponding types for object, predicate, subject.
 * 
 * @param string $subject subject string
 * @param string $predicate predicate string
 * @param string $object object string
 * @param string $object_datatype object datatype
 * @param string $object_lang object language
 * @return array triples array for OU save function
 */
function annotation_translator_fill_triple($subject, $predicate, $object, $object_datatype = NULL, $object_lang = NULL) {
    // OU types
    $typeURI = "uri";
    $typeLiteral = "literal";
    
    // OU array structure
    $triple = Array(
        "s" => $subject,
        "s_type" => "",
        "p" => $predicate,
        "p_type" => "",
        "o" => $object,
        "o_type" => "",
        "o_datatype" => $object_datatype,
        "o_lang" => $object_lang
    );
    
    // check subject type (URI/literal)
    if (annotation_translator_string_is_address($subject)) {
        $triple["s_type"] = $typeURI;
    }
    else {
        $triple["s_type"] = $typeLiteral;
    }
    
    // check predicate type (URI/literal)
    if (annotation_translator_string_is_address($predicate)) {
        $triple["p_type"] = $typeURI;
    }
    else {
        $triple["p_type"] = $typeLiteral;
    }
    
    // check object type (URI/literal)
    if (annotation_translator_string_is_address($object)) {
        $triple["o_type"] = $typeURI;
    }
    else {
        $triple["o_type"] = $typeLiteral;
    }
    
    return $triple;
}

/**
 * Check if string is address. This function could use regular expression.
 * If there is such a function in drupal you can replace it.
 * 
 * @param string $address string to check
 * @return boolean bool value if string looks like an address
 */
function annotation_translator_string_is_address($address) {
    $start = substr($address, 0, 4);
    
    // covers addreses starting with: http / https / and www.
    if ($start == "http" || $start == "www.") {
        return true;
    }
    
    return false;
}

/**
 * Delete annotations and its from triplestore
 * 
 * @param array $annotationURL annotation data
 */
function annotation_translator_triplestore_remove($annotationURL) {
    $endpoint = new stdClass();
    $endpoint->uri = variable_get('dec_triple_store') . "/openrdf-sesame/repositories/" . variable_get('dec_triple_repo');

    // get all subjects linked with this annotation
    $subjects = annotation_translator_triplestore_get_annotations_triples($annotationURL, $endpoint);  
    
    // delete all triples which specific subject
    if (!empty($subjects)) {
        // delete all annotation contexts with one request
        // create parameter: ?context=<uri>&context=<uri>&context=<uri>...
        $contexts = "?context=<".implode(">&amp;context=<", $subjects).">";
        
        // prepare request
        $url = variable_get('dec_triple_store') . "/openrdf-sesame/repositories/" . variable_get('dec_triple_repo') . "/statements" . $contexts;
        $param = Array(
                    'headers' => Array(), 
                    'method' => "DELETE", 
                    'data' => ''
                );
        
        drupal_http_request($url, $param);
    }
}

/**
 * Create event node from received annotation data.
 * This function is only called when annotation has in URI (value: about) string "/event".
 * 
 * @param array $annotation annotation data for creating event node
 * @param \stdClass $parent parent node
 * @return false|\stdClass return false on error or loaded $node
 */
function annotation_translator_event_add($annotation, $parent) {   
    global $user;
    
    // something is wrong, array is empty
    if (empty($annotation)) {
        return false;
    }
    
    // check if this event annotation already exist
    $event = annotation_translator_event_get($annotation);
    // yes it exist, so return loaded event node and not update this event
    if ($event !== false) {
        return $event;
    }
    
	$node = new stdClass();
    $node->type = 'event';
    node_object_prepare($node);
    
    $node->language = LANGUAGE_NONE;
    $node->is_new = TRUE;
    $node->status = TRUE; // i.e. published
    $node->title = truncate_utf8($annotation['text'], 250, 1);
    $node->uid = $user->uid;
   
    // add the parent nid
    if(!empty($parent)) {
        if ($parent->type == "dossier") {
            $node->dossier = $parent->nid;
        }
        else if ($parent->type == "object_story") {
            $node->object_story = $parent->nid;
        }
        else if ($parent->type == "story") {
            $node->story = $parent->nid; 
        }
    }
    
    // load node wrapper
    $node_wrapper = entity_metadata_wrapper('node', $node);
    
    $node->body[$node->language][]['value'] = $annotation['text'];
    $node_wrapper->field_event_annotation_uri = $annotation['about'];
    
    // preprocess attribute values (for example: convert date to timestamp)
    $annotation = annotation_translator_preprocess_values($annotation);
        
    foreach($annotation["attributes"] AS $attribute) {
        $type = annotation_translator_translate_attribute_type($annotation, $attribute);
        
        // this attribute is not hard coded (not supported) by StoryScope events
        if (empty($type)) {
            continue;
        }
        
        // value is missing
        if (!isset($attribute["value"][0])) {
            continue;
        }
        
        switch($type) {
            // save activity field
            case "activity": {
                $term = annotation_translator_get_term($attribute["value"][0], "field_event_activity");
                if ($term) {
                    $node->field_event_activity[$node->language][] = (Array)$term;
                }
            } break;
       
            // save start_timestamp field
            case "start_timestamp": {
                $date = explode("-", $attribute["value"][0]);
                for ($i = 0; $i < 3; $i++) {
                    if (!isset($date[$i]) || $date[$i] == "00" || empty($date[$i])) {
                        $date[$i] = NULL;
                    }
                }
                
                $node->field_event_start_time[$node->language][] = Array("from" => Array(
                    "year" => $date[0],
                    "month" => $date[1],
                    "day" => $date[2]
                ));
            } break;
        
            // save end_timestamp field
            case "end_timestamp": {
                $date = explode("-", $attribute["value"][0]);
                for ($i = 0; $i < 3; $i++) {
                    if (!isset($date[$i]) || $date[$i] == "00" || empty($date[$i])) {
                        $date[$i] = NULL;
                    }
                }
                
                $node->field_event_end_time[$node->language][] = Array("from" => Array(
                    "year" => $date[0],
                    "month" => $date[1],
                    "day" => $date[2]
                ));
            } break;
        
            // save location field
            case "location": {
                $mid = "";
                if (isset($attribute["entityUri"])) {
                    $mid = $attribute["entityUri"];
                }
                $values = Array(
                    "field_fb_location_topic" => $attribute["value"][0],
                    "field_fb_location_mid" => $mid,
                );
                annotation_translator_add_field_collection($node, "node", "field_fb_location", $values);
            } break;
        
            // save agent field
            case "agent": {        
                $mid = "";
                if (isset($attribute["entityUri"])) {
                    $mid = $attribute["entityUri"];
                }
                $values = Array(
                    "field_fb_agent_topic" => $attribute["value"][0],
                    "field_fb_agent_mid" => $mid,
                );
                // read birth date
                if (isset($attribute["value"][3]))
                {
                    $values["field_fb_agent_birth_date"] = $attribute["value"][3];
                }
                
                // read death date
                if (isset($attribute["value"][4]))
                {
                    $values["field_fb_agent_death_date"] = $attribute["value"][4];
                }
                annotation_translator_add_field_collection($node, "node", "field_fb_agent", $values);
            } break;
        
            // save genre field
            case "genre": {
                $mid = "";
                if (isset($attribute["entityUri"])) {
                    $mid = $attribute["entityUri"];
                }
                $values = Array(
                    "field_fb_genre_topic" => $attribute["value"][0],
                    "field_fb_genre_mid" => $mid,
                );
                annotation_translator_add_field_collection($node, "node", "field_fb_genre", $values);
            } break;
        
            // save style_movement field
            case "style_movement": {
                $mid = "";
                if (isset($attribute["entityUri"])) {
                    $mid = $attribute["entityUri"];
                }
                $values = Array(
                    "field_fb_style_movement_topic" => $attribute["value"][0],
                    "field_fb_style_movement_mid" => $mid,
                );
                annotation_translator_add_field_collection($node, "node", "field_fb_style_movement", $values);
            } break;
        
            // save object field
            // @todo: where can I save event object? it is called tags now?
//            case "object": {
//                $values = Array(
//                    "field_fb_tags_topic" => $attribute["value"][0],
//                    "field_fb_tags_mid" => $attribute["entityUri"],
//                );
//                annotation_translator_add_field_collection($node, "node", "field_fb_tags", $values);
//            } break;
        
            // save materials field
            case "materials": {
                $mid = "";
                if (isset($attribute["entityUri"])) {
                    $mid = $attribute["entityUri"];
                }
                $values = Array(
                    "field_fb_materials_topic" => $attribute["value"][0],
                    "field_fb_materials_mid" => $mid,
                );
                annotation_translator_add_field_collection($node, "node", "field_fb_materials", $values);
            } break;
        
            // save label field
            // @todo: where can I save event label?
//            case "label": {
//                $node_wrapper->field_event_label = $attribute["value"][0];
//            } break;
        
            // save value field
            case "value": {
                $mid = "";
                if (isset($attribute["entityUri"])) {
                    $mid = $attribute["entityUri"];
                }
                $values = Array(
                    "field_fb_value_topic" => $attribute["value"][0],
                    "field_fb_value_mid" => $mid,
                );
                annotation_translator_add_field_collection($node, "node", "field_fb_value", $values);
            } break;

            // binary and text attribute has saved file, which has to be added to node
            case "text":
            case "binary": {
                if (isset($attribute["file"][0])) {
                    /// @todo we can't save files to events
					$delta = $node_wrapper->field_media->count();
					$node_wrapper->field_media[$delta]->file->set((array)$attribute["file"][0]); 
                }
            } break;
        }
    }
    
    // save event node fields
    $node_wrapper->save();
    //node_save($node);

    return $node;
}

/**
 * Find and load annotation from StoryScope database.
 * This function search by field annotation_uri value. Annotation URI must be unique.
 * 
 * @param array $annotation annotation data
 * @return false|\stdClass return false on fail or loaded node
 */
function annotation_translator_event_get($annotation) {
    // annotation URI is empty, wrong incoming data
    if (empty($annotation["about"])) {
        return false;
    }
    
    // used code from http://drupal.org/node/1343708
    $query = new EntityFieldQuery();
    $query->entityCondition('bundle', 'event')
        ->fieldCondition('field_event_annotation_uri', 'value', $annotation["about"]) 
        ->range(0, 1);
    
    $result = $query->execute();
    
    if (isset($result['node'])) {
        $annotation_nids = array_keys($result['node']);
        
        // annotation_uri is was found in database
        if(isset($annotation_nids[0]) || !empty($annotation_nids[0])) {
            $node = node_load($annotation_nids[0]);
            return $node;
        }
    }
    
    // annotation_uri wasn't found in database
    return false;
}

/**
 * Remove event node from database.
 * This should remove any fields (annotation attributes) which this event have. 
 * 
 * @param array $annotation annotation to remove
 */
function annotation_translator_event_remove($annotation) {    
    // try to find event node with this annotation URI
    $node = annotation_translator_event_get($annotation);
    
    if($node) {
        // load node wrapper
        $node_wrapper = entity_metadata_wrapper('node', $node);

        // read source event
        if (isset($node_wrapper->field_event_source_event)) {
            $field_source_event = $node_wrapper->field_event_source_event->value();
            if (!empty($field_source_event)) {
                // delete source event from triplestore
                annotation_translator_triplestore_remove(url("sourceevent/".$field_source_event->nid, Array("absolute" => TRUE)));
                
                // delete source event from drupal database
                node_delete($field_source_event->nid); 
            }
        }
        
        // delete event from triplestore
        annotation_translator_triplestore_remove(url("event/".$node->nid, Array("absolute" => TRUE)));
        
        //delete event from drupal database
        node_delete($node->nid);
    }
}



// =================================================================
// support functions for annotation translator
// =================================================================

/**
 * Function for testing if annotation is event.
 * This function takes second parameter and search through annotation type for this string.
 *
 * @param type $xml xml where we should lookup (annotation XML element)
 * @param string $needle search string
 * @return bool 0 if string was not found in annotation types, 1 if string was found
 */
function annotation_translator_annotation_has_type($xml, $needle) {
    // add slash at start of search string to search only types which start with this $needle string
    $needle = "/".$needle;
    
	// first look in annotation uri
	$uri =  strtolower((string)$xml->type->attributes()->uri);
    $pos = strrpos($uri, $needle);
    
	if ($pos !== false) {
        // check if this found element is at end (don't have trailing slash)
        // or if this element is in the middle part of uri (have slash before and after)
        // this check if we fount whole word or just some substring which would be incorrect
        // "/event" - ok, "/event/ - ok, "/eventually" - bad 
        // we can use regular expression and then we don't need this, but strpos is much more faster
        if ((($pos + strlen($needle)) >= strlen($uri))
        || (isset($uri[($pos + strlen($needle))]) && $uri[($pos + strlen($needle))] == "/")) {
            return 1;
        }
	}

	// if we dont't find $needle in annotation uri, we wiil lookup in ancestorTypes
	foreach($xml->type->ancestorsList->ancestorType AS $ancestor) {
		$annotationType = strtolower((string)$ancestor->attributes()->uri);
        $pos = strrpos($annotationType, $needle);
        
        if ($pos !== false) {
            // check if this found element is at end (don't have trailing slash)
            // or if this element is in the middle part of uri (have slash before and after)
            // this check if we fount whole word or just some substring which would be incorrect
            // "/event" - ok, "/event/ - ok, "/eventually" - bad 
            // we can use regular expression and then we don't need this, but strpos is much more faster
            if ((($pos + strlen($needle)) >= strlen($annotationType))
            || (isset($annotationType[($pos + strlen($needle))]) && $annotationType[($pos + strlen($needle))] == "/")) {
                return 1;
            }
        }
	}

	return 0;
}

/**
 * Function to find linked annotation in xml file.
 *
 * @param type $xml xml root node
 * @param string $uri uri of annotation we want to find
 * @return type return false or xml node with wanted annotation
 */
function annotation_translator_find_xml_annotation($xml, $uri) {
	// list of actions in XML file (we don't need to look for annotations in remove section)
	$messageFormat = Array(
		'add',
		'change'
	);
    
    // nothing to search
    if (empty($uri)) {
        return false;
    }

	// we go through sections in XML file (section: add, change)
	foreach($messageFormat AS $action) {
		// now we are in one of the specific section and we will read individual annotations
		foreach($xml->annotations->$action->annotation AS $annotation) {
			if (strcmp((string)$annotation->Description->attributes()->about, $uri) == 0) {
				return $annotation;
			}

			// we look in nested annotations
			$xmlFound = annotation_translator_find_xml_annotation_nested($annotation->Description, $uri);
			if (!empty($xmlFound)) {
				return $xmlFound;
			}
		}
	}

	return false;
}

/**
 * Function to find linked annotation in nested annotation.
 * Recursive function.
 *
 * @param type $xml xml node
 * @param string $uri uri of annotation we want to find
 * @return type return false or xml node with wanted annotation
 */
function annotation_translator_find_xml_annotation_nested($annotation, $uri) {
	// we go through all annotation attributes
	foreach($annotation->attribute AS $attribute) {
		// if attribute is of type nested
		if (strcmp((string)$attribute->attributes()->type, "nestedAnnotation") == 0) {
			// we try the nested Annotation uri
			if (strcmp((string)$attribute->Description->attributes()->about, $uri) == 0) {
				return $attribute;
			}

			// we look in attributes of nested Annotation (recursive)
			$xmlFound = annotation_translator_find_xml_annotation_nested($attribute, $uri);
			if (!empty($xmlFound)) {
				return $xmlFound;
			}
		}
	}

	return false;
}

/**
 * This function convert duration from XML format
 * (for example: P18DT3S to format "18 days and 3 seconds").
 *
 * @param string $duration duration from xml file
 * @return string formated duration
 */
function annotation_translator_convert_duration($duration) {
	$interval = new DateInterval($duration);

    $format = array();
    if($interval->y !== 0) {
        $format[] = "%y ".format_plural($interval->y, "year", "years");
    }
    if($interval->m !== 0) {
        $format[] = "%m ".format_plural($interval->m, "month", "months");
    }
    if($interval->d !== 0) {
        $format[] = "%d ".format_plural($interval->d, "day", "days");
    }
    if($interval->h !== 0) {
        $format[] = "%h ".format_plural($interval->h, "hour", "hours");
    }
    if($interval->i !== 0) {
        $format[] = "%i ".format_plural($interval->i, "minute", "minutes");
    }
    if($interval->s !== 0) {
        if(!count($format)) {
            return t("less than a minute ago");
        } else {
            $format[] = "%s ".format_plural($interval->s, "second", "seconds");
        }
    }

	// create final format string
	$finalFormat = "";
	$delimeter = " ";
	foreach($format AS $f) {
		$finalFormat .= $f.$delimeter;
	}

	// cut the last delimeter
	$finalFormat = substr($finalFormat, 0, (strlen($delimeter) * (-1)));

    return $interval->format($finalFormat);
}

/**
 * Function to convert mime type to extension.
 * If is it unknown mime/type extension will be set as .txt.
 * 
 * @param string $mime mime type as string (e.g. "image/jpeg")
 * @return string extension beginnig with dot (e.g. ".jpg)
 */
function annotation_translator_convert_mime_to_ext($mime) {
    $ext = ".";

    switch($mime) {
        case "application/msword": $ext .= "doc"; break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": $ext .= "docx"; break;
        case "application/pdf": $ext .= "pdf"; break;
        case "application/vnd.ms-powerpoint": $ext .= "ppt"; break;
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation": $ext .= "pptx"; break;
        case "application/vnd.oasis.opendocument.text": $ext .= "odt"; break;
        case "application/xml": $ext .= "xml"; break;
        case "audio/mpeg3": $ext .= "mp3"; break;
        case "audio/wav": $ext .= "wav"; break;
        case "text/plain": $ext .= "txt"; break;
        case "image/pjpeg":
        case "image/jpeg": $ext .= "jpg"; break;
        case "image/png": $ext .= "png"; break;
        case "image/gif": $ext .= "gif"; break;
        case "application/x-zip-compressed":
        case "application/zip":
        case "multipart/x-zip":
        case "application/x-compressed": $ext .= "zip"; break;

        default: $ext .= "txt";
    }

    return $ext;
}

/**
 * Translate attribute type from 4A server to event type in StoryScope.
 * Hardcoded translation.
 * 
 * @param type $annotation annotation data
 * @param type $attribute attribute data
 * @return string translated attribute type from 4A Server to Event property
 */
function annotation_translator_translate_attribute_type($annotation, $attribute) {
    switch (strtolower($attribute["name"])) {    
        // translation of event property activity
        case "aktivita":
        case "činnost":
        case "activity": $ret = "activity"; break;
        
        // translation of event property start_timestamp
        case "date_of_birth":
        case "datum_narození":
        case "born":
        case "birth":
        case "start_time":
        case "start_date":
        case "datum_začátku":
        case "počáteční_datum":
        case "start_timestamp": $ret = "start_timestamp"; break;
        
        // translation of event property end_timestamp
        case "died":
        case "date_of_death":
        case "datum_úmrtí":
        case "death":
        case "end_time":
        case "end_date":
        case "datum_konce":
        case "koncové_datum":
        case "end_timestamp": $ret = "end_timestamp"; break;
        
        // translation of event property location
        case "locations":
        case "umístění":
        case "geographical location":
        case "geografické_umístění":
        case "location": $ret = "location"; break;
        
        // translation of event property agent
        case "brother":
        case "mother":
        case "sister":
        case "father":
        case "person":
        case "artist":
        case "umělec":
        case "osoba":
        case "owner":
        case "vlastník":
        case "agent": $ret = "agent"; break;
        
        // translation of event property genre
        case "art_genre":
        case "žánr":
        case "art/art_genre":
        case "umění/žánr":
        case "genre": $ret = "genre"; break;
        
        // translation of event property style_movement
        case "period_of_movement":
        case "umělecký_styl":
        case "art/art_period_movement":
        case "umění/umělecký_styl":
        case "movement":
        case "umělecký_směr":
        case "style_movement": $ret = "style_movement"; break;
        
        // translation of event property object
        case "objekt":
        case "object": $ret = "object"; break;
        
        // translation of event property materials
        case "materiál":
        case "materials": $ret = "materials"; break;
        
        // translation of event property label
        case "popisek":
        case "label": $ret = "label"; break;
        
        // translation of event property value
        case "cena":
        case "hodnota":
        case "cost":
        case "price":
        case "value": $ret = "value"; break;
        
        // translation of event property dimensions
        case "dimension_height":
        case "dimension_width":
        case "dimension_depth":
        case "výška":
        case "šířka":
        case "hloubka":
        case "rozměry":
        case "dimensions": $ret = "dimensions"; break;
        
        default: $ret = NULL;
    }
    
    return $ret;
}

/**
 * Preprocess values before we save them into Drupal 7 fields.
 * For example convert date to timestamp.
 * 
 * @param array $annotation annotation array for editing
 * @return array annotation array with edited values
 */
function annotation_translator_preprocess_values($annotation) {
	// we go through all annotation attributes
	foreach($annotation["attributes"] AS $key => $attribute) {
        switch(strtolower($attribute["typeName"])) {
            // process Date value
            case "date": {
                //$annotation["attributes"][$key]["value"][0] = strtotime($attribute["value"][0]);
            } break;
            
            // process Duration value
            case "duration": {
                $annotation["attributes"][$key]["value"][0] = annotation_translator_convert_duration($attribute["value"][0]);
            } break;
        }
    }
    
    return $annotation;
}

/**
 * Get unique attribute uri address which consist of annotation uri and attribute name.
 * Annotation can have more attributes with same name, in that case there is added order number at end of unique attribute uri.
 * For example (http://address.com/annotation/type/attribute_name_1).
 * 
 * @param array $annotation annotation data
 * @param array $attribute attribute data
 * @return false|string false on error or unique attribute name
 */
function annotation_translator_get_unique_attribute_uri($annotation, $attribute) {
    // annotation URI is empty, wrong incoming data
    $repo = variable_get('dec_triple_repo');
    if (empty($annotation["about"]) || empty($repo)) {
        return false;
    }
    
    $endpoint = new stdClass();
    $endpoint->uri = variable_get('dec_triple_store') . "/openrdf-sesame/repositories/" . variable_get('dec_triple_repo');
    
    $unique_name = $annotation["about"]."/".$attribute["name"]; 
    
    // select all unique subject names which are same as our concatenated annotation URI and attribute name
    // this means that one annotation has two (or more) attributes with same names
    // for example one annotation with 2 attributes with name brother (some artist has 2 brothers)
    // and we need unique uri for this two attributes so one will be http://.../brother and second will be http://.../brother_1
    $query = '
        SELECT DISTINCT ?subject
        WHERE {
            ?subject ?predicate ?object
            FILTER regex(str(?subject), "^'.$unique_name.'", "i")
        }
    ';
    
    $result = sparql_request($query, $endpoint);

    // we found some same names
    if (isset($result['result']['rows']) && !empty($result['result']['rows'])) {
        $count = count($result['result']['rows']);
    }
    else {
        $count = 0;
    }

    // append _X number after $unique_name to get unique uri
    if ($count > 0) {
        $unique_name .= "_".$count;
    }
    
    return $unique_name;
}

/**
 * Get annotation text from received annotation xml.
 * 
 * @param \stdClass $xml XML message to process
 * @param \stdClass $xmlRoot XML root element
 * @return string annotation text
 */
function annotation_translator_get_annotation_text($xml, $xmlRoot) {
    // this list is xml path to attributes which can have saved Event description
    // this list is ordered by priority (first item have bigest priority)
    // we use this list to go through received annotation and lookup for some text,
    // for example first we want to check attribute called title, if it doesn't exist we
    // check next attribute path and so on...
    // the least priority have text from annotatedText (which have path fragment->annotatedText)
    // 
    // path: Array  -> path in XML file to data from XML root (for example <fragment><annotatedText>data</annotatedText></fragment>)
    //       String -> name of attribute in XML annotation (for example <annotation name="name" ... />
    //
    // type: raw    -> value is saved in body of the tag (for example <annotatedText>data</annotatedText>)
    //       other  -> value is saved in attribute with this name (for example <annotation other="data" ... />)
    $xmlPathList = Array(
        // maxímum priority have attribute Coreference, this attribute is not in this list
        
        // look for <attribute name="title" value="DATA" />
        Array(
            "path" => "title",
            "type" => "value"
        ),
        
        // look for <attribute name="ascii" value="DATA" />
        Array(
            "path" => "ascii",
            "type" => "value"
        ),
        
        // look for <Description><fragment><annotatedText>DATA</annotatedText></fragment></Description>
        // this should be last -> have minimum priority
        Array(
            "path" => Array("fragment", "annotatedText"),
            "type" => "raw"
        )
    );
    
    // get last annotation type from address (http://server,com/types/people/artist we get "artist")
    // we need equal annotation type and coreference type
    $annotationTypeUri = $xml->type->attributes()->resource;
    $annotationType = substr($annotationTypeUri, (strrpos($annotationTypeUri, '/', -1) + 1));
    
    // Coreference attribute has the maximum priority
    // search for attribute Coreference, if annotation has this attribute we are searching for 
    // annotation text in this attribute
    // coreference attribute must have same type as annotation type
    foreach($xml->attribute AS $attribute) {
        // annotation has attribute called coreference
        if ((string)$attribute->attributes()->name == "Coreference") {
            $xmlCoref = "";
            $attrType = (string)$attribute->attributes()->type;
            
            // coreference is annotation link
            if ($attrType == "annotationLink") {
                $xmlLink = annotation_translator_find_xml_annotation($xmlRoot, (string)$attribute->attributes()->uri);

                // we found linked annotation from Coreference attribute
                if (!empty($xmlLink) && isset($xmlLink->Description->type->attributes()->resource)) {
                    $xmlCoref = $xmlLink->Description;
                }
            }
            
            // coreference is nested annotation
            else if ($attrType == "nestedAnnotation") {
                // we found nested annotation in Coreference attribute
                if (isset($attribute->Description) && !empty($attribute->Description) && isset($attribute->Description->type->attributes()->resource)) {
                    $xmlCoref = $attribute->Description;
                }     
            }
            
            // unknown coreference type
            else {
                continue;
            }
            
            // we found coreference in attribute
            if (!empty($xmlCoref)) {
                // get last coreference type from address (http://server.com/types/people/artist we get "artist")
                $coreferenceTypeUri = (string)$xmlCoref->type->attributes()->resource;
                $corefenceType = substr($coreferenceTypeUri, (strrpos($coreferenceTypeUri, '/', -1) + 1));             

                // annotation type and coreference type are equal, this is coreference we are looking for
                if ($annotationType == $corefenceType) {
                    return annotation_translator_get_annotation_text($xmlCoref, $xmlRoot);
                }
            }
        }
    }
    
    // try to find best annotation text (from xmlPathList which is ordered by preference)
    foreach($xmlPathList AS $xmlPath) {
        // follow path set in $xmlPathList variable
        // path is not in attribuetes (for example fragment->annotatedText)
        if(is_array($xmlPath["path"])) {
            $var = $xml;
            $pathExist = 1;
            
            foreach($xmlPath["path"] AS $path) {
                if (isset($var->{$path})) {
                    $var = $var->{$path};
                }
                else {
                    $pathExist = 0;
                    break;
                }
            }
            
            // we found text of this annotation
            if ($pathExist && isset($var) && !empty($var)) {
                // data are stored in <tag>data</tag>
                if ($xmlPath["type"] == "raw") {
                    return (string)$var;
                }

                // data are storet in <tag type="data" /> for example <attribute value="Sir Denis Mahon" />
                else if(isset($var->attributes()->{$xmlPath["type"]}) && !empty($var->attributes()->{$xmlPath["type"]})) {
                    return (string)$var->attributes()->{$xmlPath["type"]};               
                }
            }
        }
        
        // path is string
        // path is in attributes, so lookup through attributes
        else if (is_string($xmlPath["path"])) {
            foreach($xml->attribute AS $attribute) {
                if ((string)$attribute->attributes()->type == $xmlPath["path"]) {
                    // data are stored in <tag>data</tag>
                    if ($xmlPath["type"] == "raw") {
                        return (string)$attribute;
                    }

                    // data are storet in <tag type="data" /> for example <attribute value="Sir Denis Mahon" />
                    else if(isset($attribute->attributes()->{$xmlPath["type"]}) && !empty($attribute->attributes()->{$xmlPath["type"]})) {
                        return (string)$attribute->attributes()->{$xmlPath["type"]};               
                    }
                }
            }
        }
        
        // unknown $xmlPathList path variable, supported are only String or Array values
        else {
            continue;
        }
    }
    
    // no annotation text was found, all xml paths are not working
    // this should not happend, annotation should always have fragment->annotatedText
    return "";
}

/**
 * Select annotations from triplestore which are belong to selected context.
 * 
 * @param string $annotationURL URL of annotation
 * @param \stdClass $endpoint endpoint uri saved in object
 * @param string $context search context
 * @param array $alreadyProcessed array of already processed annotations
 * @return array list of selected annotations
 */
function annotation_translator_triplestore_get_annotations_triples($annotationURL, $endpoint, $context = "", &$alreadyProcessed = Array()) {
    $selectList = Array();
    
    // nothing to search in database
    if (empty($annotationURL) || empty($endpoint)) {
        return $selectList;
    }
    
    // check if this annotation is not already processed
    // this stop endless recursion calling 
    if (in_array($annotationURL, $alreadyProcessed)) {
        return $selectList;
    }
    
    // no context is selected (first call of this function)
    // we set as context the annotation URL
    if (empty($context)) {
        $context = $annotationURL;
    }
    
    // query to select all IRIs (URIs) from specific annotation
    // we need to check this IRIs recursively to get all subjects that we need to delete
    // to have consistent database (delete all links from removing annotation)
    $query = '
        SELECT DISTINCT ?object
        FROM <'.$context.'>
        WHERE {
            ?subject ?predicate ?object
            FILTER isIRI(?object)
            FILTER regex(str(?subject), "^'.$annotationURL.'$", "i")
        }
    ';
    
    $result = sparql_request($query, $endpoint);
    
    // check this annotation as already processed (prevention from endless recursion)
    $alreadyProcessed[] = $annotationURL;
    $selectList[] = $annotationURL;
    
    // we found some subject IRIs, check them recursively
    if (isset($result['result']['rows']) && !empty($result['result']['rows'])) {
        // we found some objects with this subject, check this subject for deleting
        $selectList[] = $annotationURL;
        
        foreach($result['result']['rows'] AS $row) {
            if (isset($row["object"]) && !empty($row["object"])) {
                $recursionProcessed = annotation_translator_triplestore_get_annotations_triples($row["object"], $endpoint, $context, $alreadyProcessed);
                $selectList = array_merge($selectList, $recursionProcessed);
            }
        }
    }
    
    return $selectList;
}

/**
 * Function to covnert currency code to annotation string which is saved in triplestore.
 * For example we can convert USD to $.
 * 
 * @param string $code currency code
 * @return string converted string
 */
function annotation_translator_convert_currency($code) {
    $ret = "";
    
    switch(strtolower($code)) {
        case "usd": $ret = "$"; break;
        case "eur": $ret = "€"; break;
        case "gbp": $ret = "£"; break;
        case "jpy": $ret = "¥"; break;
        case "krw": $ret = "₩"; break;
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
function annotation_translator_get_term($value, $field) {
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

/**
 * Check if specified URI is saved in triplestore as subject.
 * 
 * @param type $subjectURL subject URL to search
 * @param type $endpoint endpoint object
 * @return null|boolean null on error, true if exist in triplestore
 */
function annotation_translator_triplestor_exist($subjectURL, $endpoint) {
    // nothing to search in database
    if (empty($subjectURL) || empty($endpoint)) {
        return NULL;
    }
    
    // check if this URL is in in triplestore as subject
    $query = '
        SELECT DISTINCT ?subject
        WHERE {
            ?subject ?predicate ?object
            FILTER regex(str(?subject), "^'.$subjectURL.'$", "i")
        }
    ';
    
    $result = sparql_request($query, $endpoint);
    
    // we found some subject IRIs, check them recursively
    if (isset($result['result']['rows']) && !empty($result['result']['rows'])) {
        return true;
    }
    
    return false;
}

/**
 * Process dimension attribute
 * Expecting return array: Array(number, unit, label) expected order is for annotation_translator_event_add function
 * 
 * @param type $attribute XML attribute
 * @param type $xmlRoot XML root
 * @param type $ignoreList ignore list
 * @return array array with dimension values.
 */
function annotation_translator_process_dimension_attribute($attribute, $xmlRoot, $ignoreList) {
    $ret = Array();
    
    // check if we have annotation link attribute
    if ((string)$attribute->attributes()->type != "annotationlink") {
        return $ret;
    }
    
	// ignore this annotation
	// this can only happend to linked or nested annotation
	if (in_array((string)$attribute->attributes()->uri, $ignoreList)) {
		return $ret;
	}
    
    // find link annotation
    $xmlLink = annotation_translator_find_xml_annotation($xmlRoot, (string)$attribute->attributes()->uri);

    // link annotation not found
	if (empty($xmlLink)) {
        return $ret;
    }
    
    foreach($xmlLink->Description->attribute AS $innerAttr) {
        switch(strtolower((string)$innerAttr->attributes()->name)) {
            case "width":
            case "height":
            case "depth": {
                // check if there is nestedAnnotation
                if ((string)$innerAttr->attributes()->type == "nestedAnnotation") {
                    // save value (number)
                    $ret[] = (int)$innerAttr->Description->fragment->annotatedText;
                    
                    // save unit
                    $unit = "";
                    foreach($innerAttr->attribute AS $innInnAttr) {
                        // find attribute unit (should be only one attribute)
                        if (strtolower((string)$innInnAttr->attributes()->name) == "unit") {
                            $unit = (string)$innInnAttr->Description->fragment->annotatedText;
                            break;
                        }
                    }
                    
                    $ret[] = $unit;
                    
                    // save label
                    $ret[] = (string)$innerAttr->attributes()->name;
                }
            } break;
        }
    }
    
    return $ret;
}

/**
 * Process attribute called value.
 * Expecting return array: Array(number, currency) expected order is for annotation_translator_event_add function
 * 
 * @param type $attribute XML attribute
 * @param type $xmlRoot XML root
 * @param type $ignoreList ignore list
 * @return array array with value values.
 */
function annotation_translator_process_value_attribute($attribute, $xmlRoot, $ignoreList) {
    $ret = Array();
    
     // check if we have annotation link attribute
    if ((string)$attribute->attributes()->type != "annotationlink") {
        return $ret;
    }
    
	// ignore this annotation
	// this can only happend to linked or nested annotation
	if (in_array((string)$attribute->attributes()->uri, $ignoreList)) {
		return $ret;
	}
    
    // find link annotation
    $xmlLink = annotation_translator_find_xml_annotation($xmlRoot, (string)$attribute->attributes()->uri);

    // link annotation not found
	if (empty($xmlLink)) {
        return $ret;
    }
    
    foreach($xmlLink->Description->attribute AS $innerAttr) {
        switch(strtolower((string)$innerAttr->attributes()->name)) {
            case "currency": {
                if ($innerAttr->attributes()->type == "nestedAnnotation") {
                    foreach ($innerAttr->Description->attribute AS $innInnAttr) {
                        if (strtolower((string)$innInnAttr->attributes()->name) == "code") {
                            $currency = annotation_translator_convert_currency((string)$innInnAttr->attributes()->value);
                        }
                    }
                }
            } break;
        
            case "sum": {
                $sum = (int)$innerAttr->attributes()->value;
            } break;
        }
    }
    
    // save in specific order
    $ret[] = $sum;
    $ret[] = $currency;
    
    return $ret;
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
function annotation_translator_add_field_collection($parent, $type, $collection_name, $values) {
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

/**
 * Check if type is entity type.
 * 
 * @param string $type type to check
 * @return bool true if type is entity type
 */
function annotation_translator_type_is_entity($type) {
    switch ($type) {
        case 'nationality':
        case 'art_genre':
        case 'event':
        case 'art_period_movement':
        case 'art_medium':
        case 'art_form':
        case 'artwork':
        case 'location':
        case 'museum':
        case 'museums':
        case 'visual_artist':
        case 'person': 
            return 1;
    }
    
    return 0;
}

/**
 * Read entity URI address.
 * 
 * @param array $annotation parsed anntoation
 * @return string URI or empty string
 */
function annotation_translator_ger_entity_uri($annotation) {
    // priority of reading the URI of the entities (in lowercase)
    $uriPriority = Array(
        "freebase_uri",
        "freebase_url",
        "wikipedia_uri",
        "wikipedia_url",
        "dbpedia_uri",
        "dbpedia_url",
        "uri",
        "url"
    );
    
    foreach ($uriPriority as $name) {
        foreach ($annotation AS $innerAttr) {
            if (isset($innerAttr["name"]) && $innerAttr["name"] == $name) {
                return $innerAttr["value"][0];
            }
        }
    }
    
    return "";
}

function annotation_translator_get_nid_from_sec($sec_id) {
    $query = new EntityFieldQuery();
    $query->fieldCondition('field_ca_sec_id', 'value', $sec_id);
    $result = $query->execute();
    $ret = Array();
    
    // if we found item with same CA/SEC ID
    if (isset($result["node"]) && !empty($result["node"])) {
        // read nid
        foreach($result["node"] AS $node) {
            $ret[] = $node->nid;
        }
    }
    
    return $ret;
}
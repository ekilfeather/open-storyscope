<?php
/**
 * @file
 * search_api_decipher_ca_config.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function search_api_decipher_ca_config_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "facetapi" && $api == "facetapi_defaults") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_default_search_api_index().
 */
function search_api_decipher_ca_config_default_search_api_index() {
  $items = array();
  $items['decipher_ca'] = entity_import('search_api_index', '{
    "name" : "Decipher CA",
    "machine_name" : "decipher_ca",
    "description" : null,
    "server" : "decipher_ca",
    "item_type" : "ca_object",
    "options" : {
      "index_directly" : 0,
      "cron_limit" : "0",
      "fields" : {
        "id" : { "type" : "integer" },
        "title" : { "type" : "text" },
        "body" : { "type" : "text" },
        "field_object_creator" : { "type" : "list\\u003Ctext\\u003E" },
        "field_object_creation_date" : { "type" : "text" },
        "field_object_collection" : { "type" : "text" },
        "field_object_credit_line" : { "type" : "text" },
        "field_object_materials" : { "type" : "list\\u003Ctext\\u003E" },
        "field_object_identifier" : { "type" : "text" },
        "field_ca_sec_id" : { "type" : "text" },
        "field_image" : { "type" : "text" },
        "search_api_language" : { "type" : "string" }
      },
      "data_alter_callbacks" : {
        "search_api_alter_add_aggregation" : { "status" : 0, "weight" : "0", "settings" : [] },
        "search_api_alter_add_url" : { "status" : 0, "weight" : "0", "settings" : [] }
      },
      "processors" : {
        "search_api_case_ignore" : {
          "status" : 0,
          "weight" : "0",
          "settings" : { "fields" : {
              "title" : true,
              "body" : true,
              "field_object_creator" : true,
              "field_object_creation_date" : true,
              "field_object_collection" : true,
              "field_object_credit_line" : true,
              "field_object_materials" : true,
              "field_object_identifier" : true,
              "field_ca_sec_id" : true,
              "field_image" : true
            }
          }
        },
        "search_api_html_filter" : {
          "status" : 0,
          "weight" : "10",
          "settings" : {
            "fields" : {
              "title" : true,
              "body" : true,
              "field_object_creator" : true,
              "field_object_creation_date" : true,
              "field_object_collection" : true,
              "field_object_credit_line" : true,
              "field_object_materials" : true,
              "field_object_identifier" : true,
              "field_ca_sec_id" : true,
              "field_image" : true
            },
            "title" : 0,
            "alt" : 1,
            "tags" : "h1 = 5\\r\\nh2 = 3\\r\\nh3 = 2\\r\\nstrong = 2\\r\\nb = 2\\r\\nem = 1.5\\r\\nu = 1.5"
          }
        },
        "search_api_tokenizer" : {
          "status" : 0,
          "weight" : "20",
          "settings" : {
            "fields" : {
              "title" : true,
              "body" : true,
              "field_object_creator" : true,
              "field_object_creation_date" : true,
              "field_object_collection" : true,
              "field_object_credit_line" : true,
              "field_object_materials" : true,
              "field_object_identifier" : true,
              "field_ca_sec_id" : true,
              "field_image" : true
            },
            "spaces" : "[^[:alnum:]]",
            "ignorable" : "[\\u0027]"
          }
        },
        "search_api_stopwords" : {
          "status" : 0,
          "weight" : "30",
          "settings" : {
            "fields" : {
              "title" : true,
              "body" : true,
              "field_object_creator" : true,
              "field_object_creation_date" : true,
              "field_object_collection" : true,
              "field_object_credit_line" : true,
              "field_object_materials" : true,
              "field_object_identifier" : true,
              "field_ca_sec_id" : true,
              "field_image" : true
            },
            "file" : "",
            "stopwords" : "but\\r\\ndid\\r\\nthe this that those\\r\\netc"
          }
        }
      }
    },
    "enabled" : "1",
    "read_only" : "1",
    "rdf_mapping" : []
  }');
  return $items;
}

/**
 * Implements hook_default_search_api_server().
 */
function search_api_decipher_ca_config_default_search_api_server() {
  $items = array();
  $items['decipher_ca'] = entity_import('search_api_server', '{
    "name" : "Decipher CA",
    "machine_name" : "decipher_ca",
    "description" : "",
    "class" : "search_api_decipher_content_aggregator",
    "options" : {
      "host" : "storyscope.ssl.co.uk",
      "port" : "80",
      "path" : "\\/soapix\\/searchretrieve\\/decipher"
    },
    "enabled" : "1",
    "rdf_mapping" : []
  }');
  return $items;
}

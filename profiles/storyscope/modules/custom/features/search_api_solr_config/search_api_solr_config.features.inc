<?php
/**
 * @file
 * search_api_solr_config.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function search_api_solr_config_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "facetapi" && $api == "facetapi_defaults") {
    return array("version" => "1");
  }
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_default_search_api_index().
 */
function search_api_solr_config_default_search_api_index() {
  $items = array();
  $items['internal_search_index_nodes'] = entity_import('search_api_index', '{
    "name" : "Internal search index nodes",
    "machine_name" : "internal_search_index_nodes",
    "description" : null,
    "server" : "solr",
    "item_type" : "node",
    "options" : {
      "index_directly" : 1,
      "cron_limit" : "50",
      "fields" : {
        "nid" : { "type" : "integer" },
        "vid" : { "type" : "integer" },
        "type" : { "type" : "string" },
        "title" : { "type" : "text" },
        "language" : { "type" : "string" },
        "url" : { "type" : "uri" },
        "status" : { "type" : "boolean" },
        "promote" : { "type" : "boolean" },
        "sticky" : { "type" : "boolean" },
        "created" : { "type" : "date" },
        "changed" : { "type" : "date" },
        "author" : { "type" : "integer", "entity_type" : "user" },
        "source" : { "type" : "integer", "entity_type" : "node" },
        "comment" : { "type" : "integer" },
        "comment_count" : { "type" : "integer" },
        "field_ca_sec_id" : { "type" : "text" },
        "field_dossier_editors" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "user" },
        "field_dossier_events" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "node" },
        "field_dossier_object_stories" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "node" },
        "field_dossier_plots" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "node" },
        "field_dossier_private" : { "type" : "boolean" },
        "field_dossier_references" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "node" },
        "field_dossier_viewers" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "user" },
        "field_event_activity" : { "type" : "integer", "entity_type" : "taxonomy_term" },
        "field_event_agent" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "taxonomy_term" },
        "field_event_annotation_uri" : { "type" : "text" },
        "field_event_end_timestamp" : { "type" : "date" },
        "field_event_genre" : { "type" : "integer", "entity_type" : "taxonomy_term" },
        "field_event_location" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "taxonomy_term" },
        "field_event_object" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "taxonomy_term" },
        "field_event_source_event" : { "type" : "integer", "entity_type" : "node" },
        "field_event_start_timestamp" : { "type" : "date" },
        "field_event_style_movement" : { "type" : "integer", "entity_type" : "taxonomy_term" },
        "field_event_value" : { "type" : "integer", "entity_type" : "field_collection_item" },
        "field_object_classification" : { "type" : "integer", "entity_type" : "taxonomy_term" },
        "field_object_creator" : {
          "type" : "list\\u003Cinteger\\u003E",
          "entity_type" : "field_collection_item"
        },
        "field_object_credit_line" : { "type" : "integer", "entity_type" : "taxonomy_term" },
        "field_object_dimensions" : {
          "type" : "list\\u003Cinteger\\u003E",
          "entity_type" : "field_collection_item"
        },
        "field_object_identifier" : { "type" : "integer", "entity_type" : "taxonomy_term" },
        "field_object_materials" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "taxonomy_term" },
        "field_object_story_events" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "node" },
        "field_object_story_objects" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "node" },
        "field_object_story_private" : { "type" : "boolean" },
        "field_object_story_references" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "node" },
        "field_plot_plot_elements" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "node" },
        "field_plot_element_relationship" : { "type" : "string" },
        "field_source_event_source_uri" : { "type" : "text" },
        "search_api_language" : { "type" : "string" },
        "search_api_url" : { "type" : "uri" },
        "search_api_viewed" : { "type" : "text" },
        "search_api_access_node" : { "type" : "list\\u003Cstring\\u003E" },
        "body:value" : { "type" : "text" },
        "field_event_value:item_id" : { "type" : "integer" },
        "field_event_value:field_name" : { "type" : "string" },
        "field_event_value:url" : { "type" : "uri" },
        "field_event_value:field_event_value_currency" : { "type" : "string" },
        "field_event_value:field_event_value_value" : { "type" : "decimal" },
        "field_event_value:field_creator_birth_timestamp" : { "type" : "date" },
        "field_event_value:field_creator_death_timestamp" : { "type" : "date" },
        "field_fb_agent:field_fb_agent_birth_date" : { "type" : "list\\u003Cdate\\u003E" },
        "field_fb_agent:field_fb_agent_death_date" : { "type" : "list\\u003Cdate\\u003E" },
        "field_fb_agent:field_fb_agent_topic" : { "type" : "list\\u003Cstring\\u003E" },
        "field_fb_genre:field_fb_genre_topic" : { "type" : "list\\u003Cstring\\u003E" },
        "field_fb_location:field_fb_location_latitude" : { "type" : "decimal" },
        "field_fb_location:field_fb_location_longitude" : { "type" : "decimal" },
        "field_fb_location:field_fb_location_topic" : { "type" : "list\\u003Cstring\\u003E" },
        "field_fb_style_movement:field_fb_style_movement_topic" : { "type" : "list\\u003Cstring\\u003E" },
        "field_fb_tags:field_fb_tags_topic" : { "type" : "list\\u003Cstring\\u003E" },
        "field_fb_classification:field_fb_classification_topic" : { "type" : "list\\u003Cstring\\u003E" },
        "field_fb_materials:field_fb_materials_topic" : { "type" : "list\\u003Cstring\\u003E" },
        "field_object_creator:item_id" : { "type" : "list\\u003Cinteger\\u003E" },
        "field_object_creator:field_name" : { "type" : "list\\u003Cstring\\u003E" },
        "field_object_creator:url" : { "type" : "list\\u003Curi\\u003E" },
        "field_object_creator:field_creator_birth_timestamp" : { "type" : "list\\u003Cdate\\u003E" },
        "field_object_creator:field_creator_death_timestamp" : { "type" : "list\\u003Cdate\\u003E" },
        "field_object_creator:field_object_creator_name" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "taxonomy_term" },
        "field_object_dimensions:item_id" : { "type" : "list\\u003Cinteger\\u003E" },
        "field_object_dimensions:field_name" : { "type" : "list\\u003Cstring\\u003E" },
        "field_object_dimensions:field_object_dimension_label" : { "type" : "list\\u003Cstring\\u003E" },
        "field_object_dimensions:field_object_dimension_unit" : { "type" : "list\\u003Cstring\\u003E" },
        "field_object_dimensions:field_object_dimension_value" : { "type" : "list\\u003Cdecimal\\u003E" },
        "field_object_story_events:nid" : { "type" : "list\\u003Cinteger\\u003E" },
        "field_object_story_events:vid" : { "type" : "list\\u003Cinteger\\u003E" },
        "field_object_story_events:type" : { "type" : "list\\u003Cstring\\u003E" },
        "field_object_story_events:title" : { "type" : "list\\u003Ctext\\u003E" },
        "field_object_story_events:language" : { "type" : "list\\u003Cstring\\u003E" },
        "field_object_story_events:url" : { "type" : "list\\u003Curi\\u003E" },
        "field_object_story_events:status" : { "type" : "list\\u003Cinteger\\u003E" },
        "field_object_story_events:promote" : { "type" : "list\\u003Cboolean\\u003E" },
        "field_object_story_events:sticky" : { "type" : "list\\u003Cboolean\\u003E" },
        "field_object_story_events:created" : { "type" : "list\\u003Cdate\\u003E" },
        "field_object_story_events:changed" : { "type" : "list\\u003Cdate\\u003E" },
        "field_object_story_events:author" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "user" },
        "field_object_story_events:source" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "node" },
        "field_object_story_events:comment" : { "type" : "list\\u003Cinteger\\u003E" },
        "field_object_story_events:comment_count" : { "type" : "list\\u003Cinteger\\u003E" },
        "field_object_story_events:field_ca_sec_id" : { "type" : "list\\u003Ctext\\u003E" },
        "field_object_story_events:field_event_activity" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "taxonomy_term" },
        "field_object_story_events:field_event_agent" : {
          "type" : "list\\u003Clist\\u003Cinteger\\u003E\\u003E",
          "entity_type" : "taxonomy_term"
        },
        "field_object_story_events:field_event_annotation_uri" : { "type" : "list\\u003Ctext\\u003E" },
        "field_object_story_events:field_event_end_timestamp" : { "type" : "list\\u003Cdate\\u003E" },
        "field_object_story_events:field_event_genre" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "taxonomy_term" },
        "field_object_story_events:field_event_object" : {
          "type" : "list\\u003Clist\\u003Cinteger\\u003E\\u003E",
          "entity_type" : "taxonomy_term"
        },
        "field_object_story_events:field_event_source_event" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "node" },
        "field_object_story_events:field_event_start_timestamp" : { "type" : "list\\u003Cdate\\u003E" },
        "field_object_story_events:field_event_style_movement" : { "type" : "list\\u003Cinteger\\u003E", "entity_type" : "taxonomy_term" },
        "field_object_story_events:field_event_value" : {
          "type" : "list\\u003Cinteger\\u003E",
          "entity_type" : "field_collection_item"
        },
        "field_timeline_dates:value" : { "type" : "date" },
        "field_timeline_dates:value2" : { "type" : "date" },
        "field_object_story_events:field_event_value:item_id" : { "type" : "list\\u003Cinteger\\u003E" },
        "field_object_story_events:field_event_value:field_name" : { "type" : "list\\u003Cstring\\u003E" },
        "field_object_story_events:field_event_value:field_event_value_currency" : { "type" : "list\\u003Cstring\\u003E" },
        "field_object_story_events:field_event_value:field_event_value_value" : { "type" : "list\\u003Cdecimal\\u003E" }
      },
      "data_alter_callbacks" : {
        "search_api_alter_bundle_filter" : {
          "status" : 1,
          "weight" : "-10",
          "settings" : { "default" : "1", "bundles" : [] }
        },
        "search_api_alter_node_access" : { "status" : 1, "weight" : "0", "settings" : [] },
        "search_api_alter_node_status" : { "status" : 1, "weight" : "0", "settings" : [] },
        "search_api_alter_add_hierarchy" : { "status" : 0, "weight" : "0", "settings" : { "fields" : [] } },
        "search_api_alter_add_viewed_entity" : { "status" : 1, "weight" : "0", "settings" : { "mode" : "full" } },
        "search_api_alter_add_url" : { "status" : 1, "weight" : "0", "settings" : [] },
        "search_api_alter_add_aggregation" : { "status" : 0, "weight" : "0", "settings" : [] }
      },
      "processors" : {
        "search_api_case_ignore" : {
          "status" : 1,
          "weight" : "0",
          "settings" : { "fields" : {
              "type" : true,
              "title" : true,
              "log" : true,
              "field_ca_sec_id" : true,
              "field_event_annotation_uri" : true,
              "field_event_label" : true,
              "field_source_event_source_uri" : true
            }
          }
        },
        "search_api_html_filter" : {
          "status" : 0,
          "weight" : "10",
          "settings" : {
            "fields" : {
              "title" : true,
              "log" : true,
              "field_ca_sec_id" : true,
              "field_event_annotation_uri" : true,
              "field_event_label" : true,
              "field_source_event_source_uri" : true
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
              "log" : true,
              "field_ca_sec_id" : true,
              "field_event_annotation_uri" : true,
              "field_event_label" : true,
              "field_source_event_source_uri" : true
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
              "log" : true,
              "field_ca_sec_id" : true,
              "field_event_annotation_uri" : true,
              "field_event_label" : true,
              "field_source_event_source_uri" : true
            },
            "file" : "",
            "stopwords" : "but\\r\\ndid\\r\\nthe this that those\\r\\netc"
          }
        }
      }
    },
    "enabled" : "1",
    "read_only" : "0",
    "rdf_mapping" : []
  }');
  return $items;
}

/**
 * Implements hook_default_search_api_server().
 */
function search_api_solr_config_default_search_api_server() {
  $items = array();
  $items['solr'] = entity_import('search_api_server', '{
    "name" : "Internal solr search",
    "machine_name" : "solr",
    "description" : "",
    "class" : "search_api_solr_service",
    "options" : {
      "host" : "localhost",
      "port" : "8983",
      "path" : "\\/solr\\/collection6",
      "http_user" : "admin",
      "http_pass" : "",
      "excerpt" : 0,
      "retrieve_data" : 0,
      "highlight_data" : 0,
      "http_method" : "POST"
    },
    "enabled" : "1",
    "rdf_mapping" : []
  }');
  return $items;
}

<?php
/**
 * @file
 * taxonomy_event_agent.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function taxonomy_event_agent_taxonomy_default_vocabularies() {
  return array(
    'event_agent_associated_concepts' => array(
      'name' => 'Event agent associated concepts',
      'machine_name' => 'event_agent_associated_concepts',
      'description' => '',
      'hierarchy' => '0',
      'module' => 'taxonomy',
      'weight' => '0',
      'rdf_mapping' => array(
        'rdftype' => array(
          0 => 'skos:ConceptScheme',
        ),
        'name' => array(
          'predicates' => array(
            0 => 'dc:title',
          ),
        ),
        'description' => array(
          'predicates' => array(
            0 => 'rdfs:comment',
          ),
        ),
      ),
    ),
  );
}

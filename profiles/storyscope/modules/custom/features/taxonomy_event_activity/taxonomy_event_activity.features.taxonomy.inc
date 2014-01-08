<?php
/**
 * @file
 * taxonomy_event_activity.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function taxonomy_event_activity_taxonomy_default_vocabularies() {
  return array(
    'event_activity' => array(
      'name' => 'Event activity',
      'machine_name' => 'event_activity',
      'description' => 'Example: Design',
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

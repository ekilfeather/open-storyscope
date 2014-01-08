<?php
/**
 * @file
 * taxonomy_object_classification.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function taxonomy_object_classification_taxonomy_default_vocabularies() {
  return array(
    'classification' => array(
      'name' => 'Classification',
      'machine_name' => 'classification',
      'description' => 'Used for both objects and events',
      'hierarchy' => '0',
      'module' => 'taxonomy',
      'weight' => '-8',
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

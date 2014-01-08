<?php
/**
 * @file
 * taxonomy_object_identifier.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function taxonomy_object_identifier_taxonomy_default_vocabularies() {
  return array(
    'object_number_identifier' => array(
      'name' => 'Object Number/Identifier',
      'machine_name' => 'object_number_identifier',
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

<?php

class SolrSearchAPIFieldCollapseExtender extends SearchApiAbstractQueryExtender {

  public function supportsIndex(SearchApiIndex $index) {
    return $index->server()->supportsFeature('search_api_solr_collapse');
  }

  public function preprocessSearchQuery(SearchApiQuery $query) {
    // We move the options from our options array into where the Solr Service is expecting them.
    $options = array(
      'collapse' => TRUE,
      'fields' => isset($this->options['fields']) ? array_keys($this->options['fields']) : array(),
      'group_sort' => isset($this->options['group_sort']) ? $this->options['group_sort'] : '',
      'group_sort_direction' => isset($this->options['group_sort_direction']) ? $this->options['group_sort_direction'] : 'asc',
      'group_limit' => isset($this->options['group_limit']) ? $this->options['group_limit'] : 1,
      'truncate' => isset($this->options['truncate']) ? $this->options['truncate'] : TRUE,
      'group_facet' => isset($this->options['group_facet']) ? $this->options['group_facet'] : FALSE,
    );
    $query->setOption('search_api_solr_field_collapse', $options);
  }

  public function configurationForm() {
    $form['#attached']['css'][] = drupal_get_path('module', 'search_api') . '/search_api.admin.css';

    $fields = $this->index->getFields();
    $field_options = array();
    $field_sorts = array('' => t('None'), 'score' => t('Score/Relevance'));
    $default_fields = array();
    if (isset($this->options['fields'])) {
      $default_fields = drupal_map_assoc(array_keys($this->options['fields']));
    }

    foreach ($fields as $name => $field) {
      // Currently Solr is only compatible with single valued, indexed fields.
      // Solr 3.x also only works with string fields.
      // TODO: Factor this out into a call through to the server.
      if (!search_api_is_list_type($field['type'])) {
        if ($field['indexed']) {
          $field_options[$name] = $field['name'];
          if (!empty($default_fields[$name]) || (!isset($this->options['fields']) && $this->testField($name, $field))) {
            $default_fields[$name] = $name;
          }
        }
        // We can only sort according to single-valued fields.
        if ($field['type'] == search_api_extract_inner_type($field['type'])) {
          $field_sorts[$name] = $field['name'];
        }
      }
    }

    $form['fields'] = array(
      '#type' => 'checkboxes',
      '#title' => t('Fields to collapse on'),
      '#options' => $field_options,
      '#default_value' => $default_fields,
      '#attributes' => array('class' => array('search-api-checkboxes-list')),
      '#description' => t('Choose the fields upon which to collapse the results into groups. Note that while selecting multiple fields is technicially supported, it may result in unexpected behaviour.')
    );

    $default_sort = isset($this->options['group_sort']) ? $this->options['group_sort'] : '';

    $form['group_sort'] = array(
      '#type' => 'select',
      '#title' => t('Group sort'),
      '#options' => $field_sorts,
      '#default_value' => $default_sort,
      '#description' => t('Choose the field by to sort within each group, the groups themselves will be sorted by the main query sorts.')
    );

    $default_sort_direction = isset($this->options['group_sort_direction']) ? $this->options['group_sort_direction'] : '';

    $form['group_sort_direction'] = array(
      '#type' => 'select',
      '#title' => t('Group sort direction'),
      '#options' => array('asc' => t('Ascending'), 'desc' => t('Descending')),
      '#default_value' => $default_sort_direction,
    );

    $default_limit = isset($this->options['group_limit']) ? $this->options['group_limit'] : 1;

    $form['group_limit'] = array(
      '#type' => 'select',
      '#title' => t('Group limit'),
      '#options' => range(0, 1000),
      '#default_value' => $default_limit,
      '#description' => t('Choose how many items within each group to return.'),
    );

    $default_truncate = isset($this->options['truncate']) ? $this->options['truncate'] : TRUE;

    $form['truncate'] = array(
      '#type' => 'checkbox',
      '#title' => t('Truncate results before facets'),
      '#description' => t('If checked, facet counts are based on the most relevant document of each group matching the query, otherwise they are calculated for all documents before grouping.'),
      '#default_value' => $default_truncate,
    );

    $default_group_facet = isset($this->options['group_facet']) ? $this->options['group_facet'] : FALSE;

    $form['group_facet'] = array(
      '#type' => 'checkbox',
      '#title' => t('Use group facets'),
      '#description' => t("If checked, facet counts are based on the groups, this won't work with Date facets, and requires Solr 4."),
      '#default_value' => $default_group_facet,
    );

    return $form;
  }
}

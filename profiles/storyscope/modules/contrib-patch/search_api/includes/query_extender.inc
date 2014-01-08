<?php

/**
 * Interface representing a Search API pre- and/or post-query extender.
 *
 * A Query Extender should make it clear in its description or documentation
 * when it will run and what effect it will have.
 */
interface SearchApiQueryExtenderInterface {

  /**
   * Construct a query extender.
   *
   * @param SearchApiIndex $index
   *   The index on which queries will be generated that will be extended.
   * @param array $options
   *   The query extender options set for this index.
   */
  public function __construct(SearchApiIndex $index, array $options = array());

  /**
   * Check whether this query extender is applicable for a certain index.
   *
   * This can be used for hiding the query extender on the queries configuration
   * form. To avoid confusion, you should only use criteria that are immutable,
   * such as the index's item type. Also, since this is only used for UI
   * purposes, you should not completely rely on this to ensure certain index
   * configurations and at least throw an exception with a descriptive error
   * message if this is violated on runtime.
   *
   * @param SearchApiIndex $index
   *   The index to check for.
   *
   * @return boolean
   *   TRUE if the query extender can run on the given index; FALSE otherwise.
   */
  public function supportsIndex(SearchApiIndex $index);

  /**
   * Display a form for configuring this query extender.
   * Since forcing users to specify options for disabled query extenders makes
   * no sense, none of the form elements should have the '#required' attribute
   * set.
   *
   * @return array
   *   A form array for configuring this query extender, or FALSE if no
   *   configuration is possible.
   */
  public function configurationForm();

  /**
   * Validation callback for the form returned by configurationForm().
   *
   * @param array $form
   *   The form returned by configurationForm().
   * @param array $values
   *   The part of the $form_state['values'] array corresponding to this form.
   * @param array $form_state
   *   The complete form state.
   */
  public function configurationFormValidate(array $form, array &$values, array &$form_state);

  /**
   * Submit callback for the form returned by configurationForm().
   *
   * This method should both return the new options and set them internally.
   *
   * @param array $form
   *   The form returned by configurationForm().
   * @param array $values
   *   The part of the $form_state['values'] array corresponding to this form.
   * @param array $form_state
   *   The complete form state.
   *
   * @return array
   *   The new options array for this callback.
   */
  public function configurationFormSubmit(array $form, array &$values, array &$form_state);

  /**
   * Preprocess a search query.
   *
   * @param SearchApiQuery $query
   *   The object representing the query to be executed.
   */
  public function preprocessSearchQuery(SearchApiQuery $query);

  /**
   * Postprocess search results before display.
   *
   * If a class is used for both pre- and post-processing a search query, the
   * same object will be used for both calls (so preserving some data or state
   * locally is possible).
   *
   * @param array $response
   *   An array containing the search results. See the return value of
   *   SearchApiQueryInterface->execute() for the detailed format.
   * @param SearchApiQuery $query
   *   The object representing the executed query.
   */
  public function postprocessSearchResults(array &$response, SearchApiQuery $query);

}

/**
 * Abstract query extender implementation that provides a solid base to start.
 */
abstract class SearchApiAbstractQueryExtender implements SearchApiQueryExtenderInterface {

  /**
   * @var SearchApiIndex
   */
  protected $index;

  /**
   * @var array
   */
  protected $options;

  /**
   * Constructor, saving its arguments into properties.
   */
  public function __construct(SearchApiIndex $index, array $options = array()) {
    $this->index   = $index;
    $this->options = $options;
  }

  public function supportsIndex(SearchApiIndex $index) {
    return TRUE;
  }

  public function configurationForm() {
    $form['#attached']['css'][] = drupal_get_path('module', 'search_api') . '/search_api.admin.css';

    $fields = $this->index->getFields();
    $field_options = array();
    $default_fields = array();
    if (isset($this->options['fields'])) {
      $default_fields = drupal_map_assoc(array_keys($this->options['fields']));
    }
    foreach ($fields as $name => $field) {
      $field_options[$name] = $field['name'];
      if (!empty($default_fields[$name]) || (!isset($this->options['fields']) && $this->testField($name, $field))) {
        $default_fields[$name] = $name;
      }
    }

    $form['fields'] = array(
      '#type' => 'checkboxes',
      '#title' => t('Fields to run on'),
      '#options' => $field_options,
      '#default_value' => $default_fields,
      '#attributes' => array('class' => array('search-api-checkboxes-list')),
    );

    return $form;
  }

  public function configurationFormValidate(array $form, array &$values, array &$form_state) {
    $fields = array_filter($values['fields']);
    if ($fields) {
      $fields = array_combine($fields, array_fill(0, count($fields), TRUE));
    }
    $values['fields'] = $fields;
  }

  public function configurationFormSubmit(array $form, array &$values, array &$form_state) {
    $this->options = $values;
    return $values;
  }

  /**
   * Does nothing.
   */
  public function preprocessSearchQuery(SearchApiQuery $query) {

  }

  /**
   * Does nothing.
   */
  public function postprocessSearchResults(array &$response, SearchApiQuery $query) {

  }

  /**
   * Determine if this extender should process the given field.
   *
   * @param $name
   *   The field's machine name.
   * @param array $field
   *   The field's information.
   *
   * @return
   *   TRUE, iff the field should be processed.
   */
  protected function testField($name, array $field) {
    if (empty($this->options['fields'])) {
      return $this->testType($field['type']);
    }
    return !empty($this->options['fields'][$name]);
  }

  /**
   * Determine if this extender should process the given field type.
   *
   * @param $type
   *   The type of field to test.
   *
   * @return
   *   TRUE, iff the type should be processed.
   */
  protected function testType($type) {
    return search_api_is_text_type($type, array('text', 'tokens'));
  }

}

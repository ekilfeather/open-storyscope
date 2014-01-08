<?php

/**
 * @file
 * Contains the entity class for stored "Saved searches" settings of search
 * indexes.
 */

/**
 * Class representing "Saved searches" settings.
 */
class SearchApiSavedSearchesSettings extends Entity {

  /**
   * The search index these settings are for.
   *
   * @var SearchApiIndex
   */
  protected $index;

  // Database values that will be set when object is loaded

  /**
   * @var integer
   */
  public $id;

  /**
   * @var string
   */
  public $delta;

  /**
   * @var string
   */
  public $index_id;

  /**
   * @var boolean
   */
  public $enabled;

  /**
   * @var array
   */
  public $options;

  /**
   * Constructor as a helper to the parent constructor.
   */
  public function __construct(array $values = array()) {
    parent::__construct($values, 'search_api_saved_searches_settings');
  }

  /**
   * @return SearchApiIndex
   *   The index these saved search settings are for.
   *
   * @throws SearchApiException
   *   If the index doesn't exist.
   */
  public function index() {
    if (!isset($this->index)) {
      $this->index = search_api_index_load($this->index_id);
    }
    if (!$this->index) {
      throw new SearchApiException(t("The index with the ID %id doesn't exist, but has saved search settings attached.", array('%id' => $this->index_id)));
    }
    return $this->index;
  }

}

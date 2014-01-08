<?php

/**
 * @file
 * Bean translation handler for the translation module.
 */


/**
 * Bean translation handler.
 *
 * Overrides default behaviours for Bean properties.
 */
class EntityTranslationBeanHandler extends EntityTranslationDefaultHandler {

  public function __construct($entity_type, $entity_info, $entity, $entity_id) {
    parent::__construct('bean', $entity_info, $entity, $entity_id);
  }

  public function getAccess($op) {
    return bean_access($op, $this->entity);
  }

  protected function getEntityId() {
    return $this->entity->delta;
  }
}

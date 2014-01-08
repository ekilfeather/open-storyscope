<?php

/**
 * Search API data source for external entities from the Decipher Content
 * Aggregator
 *
 */
class SearchApiContentAggregatorDataSource extends SearchApiExternalDataSourceController
{
  public function getPropertyInfo()
  {
    $info = array();
    $info['property info']['id'] = array(
      'label' => t('ID'),
      'type' => 'text',
    );
    $info['property info']['title'] = array(
      'label' => t('Title'),
      'type' => 'text',
    );
    $info['property info']['body'] = array(
      'label' => t('Description'),
      'type' => 'text',
    );    
    $info['property info']['field_object_creator'] = array(
      'label' => t('Creator'),
      'type' => 'list<text>',
    );
    $info['property info']['field_object_creation_date'] = array(
      'label' => t('Creation Date'),
      'type' => 'text',
    );
    $info['property info']['field_object_creation_date_earliest'] = array(
      'label' => t('Early Creation Date'),
      'type' => 'text',
    );
    $info['property info']['field_object_creation_date_latest'] = array(
      'label' => t('Last Creation Date'),
      'type' => 'text',
    );
    $info['property info']['field_object_collection'] = array(
      'label' => t('Collection'),
      'type' => 'text',
    );
    $info['property info']['field_object_credit_line'] = array(
      'label' => t('Credit Line'),
      'type' => 'text',
    );
    $info['property info']['field_object_materials'] = array(
      'label' => t('Materials'),
      'type' => 'list<text>',
    );
    $info['property info']['field_object_identifier'] = array(
      'label' => t('Object Number'),
      'type' => 'text',
    );
    $info['property info']['field_ca_sec_id'] = array(
      'label' => t('SEC/CA ID'),
      'type' => 'text',
    );
    $info['property info']['field_image'] = array(
      'label' => t('Image'),
    );    
    $info['property info']['field_image_thumb'] = array(
      'label' => t('Image thumbnail'),
    );    
    return $info;
  }
}


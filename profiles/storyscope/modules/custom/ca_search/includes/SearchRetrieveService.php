<?php
class resultStatus {
  public $database; // string
  public $size; // nonNegativeInteger
  public $completed; // boolean
}

class pair {
  public $context; // string
  public $value; // string
}

class FacetValuePair {
  public $label; // string
  public $count; // int
}

class Facet {
  public $name; // string
  public $values; // ArrayOf_FacetValuePair
}

class field_union {
  public $text; // string
  public $list; // ArrayOf_field_value
  public $num; // int
}

class field_value {
  public $name; // string
  public $type; // string
  public $u; // field_union
}

class field {
  public $name; // string
  public $fullname; // string
  public $value; // field_value
}

class record {
  public $name; // string
  public $fullname; // string
  public $contents; // ArrayOf_scm_fields
}

class diagnosticType {
  public $uri; // string
  public $details; // string
  public $message; // string
}

class searchRetrieveRequestType {
  public $profile; // string
  public $query; // ArrayOf_scm_pairs
  public $startRecord; // positiveInteger
  public $resultSetId; // string
  public $maximumRecords; // nonNegativeInteger
}

class searchRetrieveResponseType {
  public $numberOfRecords; // nonNegativeInteger
  public $status; // ArrayOf_scm_resultStatus
  public $resultSetId; // string
  public $resultSetIdleTime; // positiveInteger
  public $records; // ArrayOf_scm_records
  public $nextRecordPosition; // integer
  public $echoedSearchRetrieveRequest; // searchRetrieveRequestType
  public $diagnostics; // ArrayOf_scm_diagnosticTypes
  public $facets; // ArrayOf_Facet
}

class recordUpdateRequestType {
  public $profile; // string
  public $query; // ArrayOf_scm_pairs
  public $flags; // string
  public $data; // ArrayOf_scm_fields
  public $batch; // boolean
}

class recordUpdateResponseType {
  public $errorMessage; // string
  public $succeededSpec; // string
  public $failedSpec; // string
}

class recordCreateRequestType {
  public $profile; // string
  public $flags; // string
  public $data; // ArrayOf_scm_fields
}

class recordCreateResponseType {
  public $errorMessage; // string
}


/**
 * SearchRetrieveService class
 * 
 *  
 * 
 * @author    {author}
 * @copyright {copyright}
 * @package   {package}
 */
class SearchRetrieveService extends SoapClient {

  private static $classmap = array(
                                    'resultStatus' => 'resultStatus',
                                    'pair' => 'pair',
                                    'FacetValuePair' => 'FacetValuePair',
                                    'Facet' => 'Facet',
                                    'field_union' => 'field_union',
                                    'field_value' => 'field_value',
                                    'field' => 'field',
                                    'record' => 'record',
                                    'diagnosticType' => 'diagnosticType',
                                    'searchRetrieveRequestType' => 'searchRetrieveRequestType',
                                    'searchRetrieveResponseType' => 'searchRetrieveResponseType',
                                    'recordUpdateRequestType' => 'recordUpdateRequestType',
                                    'recordUpdateResponseType' => 'recordUpdateResponseType',
                                    'recordCreateRequestType' => 'recordCreateRequestType',
                                    'recordCreateResponseType' => 'recordCreateResponseType',
                                   );

  public function SearchRetrieveService($wsdl = "SearchRetrieve.wsdl", $options = array()) {
    foreach(self::$classmap as $key => $value) {
      if(!isset($options['classmap'][$key])) {
        $options['classmap'][$key] = $value;
      }
    }
    parent::__construct($wsdl, $options);
  }

  /**
   *  
   *
   * @param searchRetrieveRequestType $request
   * @return searchRetrieveResponseType
   */
  public function SearchRetrieve(searchRetrieveRequestType $request) {
    return $this->__soapCall('SearchRetrieve', array($request),       array(
            'uri' => 'http://soap.ssl.co.uk/sr',
            'soapaction' => ''
           )
      );
  }

  /**
   *  
   *
   * @param recordUpdateRequestType $request
   * @return recordUpdateResponseType
   */
  public function RecordUpdate(recordUpdateRequestType $request) {
    return $this->__soapCall('RecordUpdate', array($request),       array(
            'uri' => 'http://soap.ssl.co.uk/sr',
            'soapaction' => ''
           )
      );
  }

  /**
   *  
   *
   * @param recordCreateRequestType $request
   * @return recordCreateResponseType
   */
  public function RecordCreate(recordCreateRequestType $request) {
    return $this->__soapCall('RecordCreate', array($request),       array(
            'uri' => 'http://soap.ssl.co.uk/sr',
            'soapaction' => ''
           )
      );
  }

}

?>

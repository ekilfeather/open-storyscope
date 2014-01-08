<?php
/*
 * Project: Decipher
 * File: 4ATinyMCEProxy.php
 * Author: Jaroslav Dytrych
 * Date: 21.4.2012
 * Last modified: 21.4.2012
 * Description: Simple proxy server, which allows sending of requests to 4A server
 */

/**
 * Simple proxy server, which allows sending of requests to 4A server by method POST or GET.
 * It overcomes browser restriction for sending requests to another server or port.
 *
 * @brief Simple proxy server
 */
class Proxy {
  /**
   * Allowed addresses of 4A servers (array constant, see below)
   */
  public $REMOTE_4A_SERVER_ADDRESSES;

  /**
   * Constructor
   */
   function __construct()
   {
     $this->REMOTE_4A_SERVER_ADDRESSES = array('http://knot09.fit.vutbr.cz:8080/Annotations/AnnotEditorsComet',
                                               'http://localhost:8080/Annotations/AnnotEditorsComet',
                                               'http://decipher-sec.ssl.co.uk:8080/Annotations/AnnotEditorsComet');
   }

  /**
   * Method for execution of the request to the 4A server
   * 
   * @param url URL of the remote server
   * @param method HTTP method to use
   * @param data Data for the 4A server (used with POST method)
   * @param headers Headers in format "Header: value".
   *                 Some unusable headers are blocked
   * @return Returns response object with content, returnCode and headers.
   */
  public function makeRequest($url, $method, $data = NULL, $headers = array()) {
    if (!$method) {
      throw new Exception('Undefined method. Use $proxy->setMethod() to select a method.');
    }

    if (!is_array($headers)) {
      throw new Exception('Headers parameter must be an array (' . gettype($headers) . ' given)');
    }

    // Some headers are forbidden and blocked These are defined by following regular expressions
    $forbiddenHeaders = array('^host\:', '^connection\:', '^cache\-control\:', '^keep\-alive\:', '^referer\:');

    // remove forbidden headers
    foreach($headers as $key => $header) {
      foreach($forbiddenHeaders as $removeHeader) {
        // regexp match, case insensitive
        if(preg_match('@' . $removeHeader . '@i', $header))
          unset($headers[$key]);
      }
    }

    // create context for stream
    $options = array(
      'http' => array(
        'method' => $method,
        'header' => implode("\r\n", $headers),
        'content' => $data,
        'timeout' => 180
      )
    );
    $context = stream_context_create($options);

    // create the request
    $content = @file_get_contents($url, false, $context);

    // Process response headers from $http_response_header
    $headers = $this->parseResponseHeaders($http_response_header);
    
    // First row must contain following: "HTTP/1.X STATUS_CODE STATUS_TEXT"
    // Get STATUS_CODE from it
    $returnCode = $this->parseReturnedCode($headers[0]);

    // returns reply
    return (object) array(
      'content' => $content,
      'returnCode' => $returnCode,
      'headers' => $headers
    );
  }  // makeRequest()

  /**
   * Process response headers from PHP. Those headers can be from more requests 
   * (eg. from redirection). For this reason field will be processed from the 
   * end and header fields from last part will be get.
   * 
   * @param httpResponseHeaders Headers from $http_response_header
   * @return Returns headers from the last part (reply).
   */
  public function parseResponseHeaders($httpResponseHeaders) {
    $headers = array();

    $totalHeaders = count($httpResponseHeaders);
    for($i = $totalHeaders-1; $i >= 0; $i--) {
      // end of processing is when HTTP/1.X XXX was detected
      $headers[] = $httpResponseHeaders[$i];
      if(strpos($httpResponseHeaders[$i], 'HTTP/') === 0) {
        break;
      }
    }

    // we build array from the end, so reversing is required
    return array_reverse($headers);
  }  // parseResponseHeaders()

  /**
   * Transforms map<string,string> to array<string>, 
   * where items are in format 'Header: value'
   *
   * @param httpResponseHeaders Array to transform
   * @return Returns transformed array
   */
  public function mapToArray($headersMap) {
    $headers = array();
    foreach($headersMap as $key => $value) {
      $headers[] = $key . ': ' . $value;
    }

    return $headers;
  }

  /**
   * Gets return code from HTTP header
   * @param header Header which contains "HTTP/1.X XXX XXX"
   * @return Returns return code
   */
  protected function parseReturnedCode($header) {
    return (int) preg_replace('/^HTTP.[^ ]+[[:space:]]+([0-9]+)[[:space:]].*$/', '$1', $header);
  }

  /**
   * Send headers
   *
   * @param headers Headers to send in format "Header: value"
   */
  public function sendHeaders($headers = array()) {
    foreach($headers as $header) {
      Header($header);
    }
  }
}  // class Proxy


/*
 * Processing of the request with use of the class Proxy
 * 
 * Address of 4A server must be in a GET variable serverAddress
 * Session id (GET variable session in case of GET request) is forwarded
 */


// create proxy
$proxy = new Proxy;

// get request headers
$requestHeaders = $proxy->mapToArray(getallheaders());

ini_set("display_errors", 1);
  error_reporting(E_ERROR | E_WARNING);

switch($_SERVER['REQUEST_METHOD']) {  // request type
  case 'GET':
    // check and prepare session id
    $sesId = "";
    if (isset($_GET['session'])) {
      if (preg_match('/^[0-9]+$/',$_GET['session'])) {
        $sesId = "?session=".$_GET['session'];
      }
    }
    // check server address
    $serverAddr = "";
    if (isset($_GET['serverAddress'])) {
      if (in_array($_GET['serverAddress'],$proxy->REMOTE_4A_SERVER_ADDRESSES))
      {
        $serverAddr = $_GET['serverAddress'].$sesId;
      } else {
        exit();
      }
    } else {
      exit();
    }
    // make request to 4A server
    $request = $proxy->makeRequest($serverAddr, $_SERVER['REQUEST_METHOD'], FALSE, $requestHeaders);
    // send returned headers to client
    $proxy->sendHeaders($request->headers);
    // if reply is ok, send returned content to the client
    if($request->returnCode >= 200 && $request->returnCode < 400) {
      echo $request->content;
    }
    break;

  case 'POST':
    // check server address
    $serverAddr = "";
    if (isset($_GET['serverAddress'])) {
      if (in_array($_GET['serverAddress'],$proxy->REMOTE_4A_SERVER_ADDRESSES))
      {
        $serverAddr = $_GET['serverAddress'];
      } else {
        exit();
      }
    } else {
      exit();
    }
    // make request to 4A server
    $request = $proxy->makeRequest($serverAddr, $_SERVER['REQUEST_METHOD'], file_get_contents("php://input"), $requestHeaders);
    // send returned headers to client
    $proxy->sendHeaders($request->headers);
    // if reply is ok, send returned content to the client
    if($request->returnCode >= 200 && $request->returnCode < 400) {
      echo $request->content;
    }
    break;

  default:
    throw new Exception('Unsupported method: '.$_SERVER['REQUEST_METHOD']);
}  // request type

?>

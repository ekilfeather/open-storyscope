<?php

class ca_search_handler_filter_europeana extends SearchApiViewsHandlerFilterBoolean
{

  public function query()
  {
    if( is_array( $this->value ) )
      $this->query->setOption( 'Europeana', $this->value[ 0 ] );
    else
      $this->query->setOption( 'Europeana', $this->value );
  }
  
  public function value_form(&$form, &$form_state) {
    while (is_array($this->value)) {
      $this->value = $this->value ? array_shift($this->value) : NULL;
    }
    
    // this is a trick to make the checkbox correctly remember the value
    if( isset( $form_state[ 'input' ][ 'europeana' ] ) &&
      $form_state[ 'input' ][ 'europeana' ] == 0 )
      unset( $form_state[ 'input' ][ 'europeana' ] );
    
    $form['value'] = array(
      '#type' => 'checkbox',
      '#title' => 'Europeana',
      '#title_display' => 'before',
      '#default_value' => isset($this->value) ? $this->value : 1,
    );
  }
}
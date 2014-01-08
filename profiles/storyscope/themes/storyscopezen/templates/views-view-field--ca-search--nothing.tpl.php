<?php 
  $props = $row->_entity_properties; 
  $view_path = arg( 0 ) . '/' . arg( 1 );
  if( arg(2) == "objectstories" ) 
    $view_path .= '/' . arg( 2 ) . '/' . arg( 3 );

  $view_path .= '/object/search/external-ca/view/' . $props[ 'id' ];
  $url = url( $view_path, array() );
    
  ?>
<a href="<?php print $url; ?>">
  <figure>
    <img src="<?php print $props['field_image_thumb'][0] ?>" />
  </figure>
</a>



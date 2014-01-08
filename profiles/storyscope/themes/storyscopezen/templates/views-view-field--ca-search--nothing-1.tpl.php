<div class="article-inner">
  <?php $props = $row->_entity_properties; ?>
<h2><?php print $props[ 'title' ][ 0 ]; ?></h2>
  
<p class="suggest" style="float:right;">
  <?php 
  $imp_path = arg( 0 ) . '/' . arg( 1 );
  if( arg(2) == "objectstories" ) 
    $imp_path .= '/' . arg( 2 ) . '/' . arg( 3 );

  $imp_path .= '/object/search/external-ca/import/' . $props[ 'id' ];
  $destination = drupal_get_destination();
  $url = url( $imp_path, array( 'query' => $destination ) );
    
  ?>
  <a href="<?php print $url; ?>" >add +</a>
</p>
</div>

<?php
  $count = 0;
  $total_panes = count(array_filter($content));
  
  foreach ($content as $key => $value) {
    if ($value) {
      $count++;
      
      $classes = 'panel-pane ';
      $classes .= drupal_html_class($key);
      
      if ($count == 1) {
        $classes .= ' first';
      }
      if ($count == $total_panes) {
        $classes .= ' last';
      }

      $output = '<div class="'.$classes.'">';
      $output .= $value;
      $output .= '</div>';

      $content[$key] = $output;
    }
  }
?>

<div class="panel-views grid has-<?php print $count; ?>-items">
  
  <?php if ($content['one']): ?>
    <?php print $content['one']; ?>
  <?php endif ?>
  
  <?php if ($content['two']): ?>
    <?php print $content['two']; ?>
  <?php endif ?>
  
  <?php if ($content['three']): ?>
    <?php print $content['three']; ?>
  <?php endif ?>

  <?php if ($content['four']): ?>
    <?php print $content['four']; ?>
  <?php endif ?>
  
</div>

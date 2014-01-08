<?php
/**
 * @file
 * Template for a 4 column panel layout.
 *
 * This template provides a very simple "one column" panel display layout.
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   $content['middle']: The only panel in the layout.
 */
?>
<div class="panel panel-strip">
  
  <?php print $content['top']; ?>
  <?php print $content['middle_1']; ?>
  <div class="middle-wrapper clearfix has-2-items grid">
    <?php print $content['middle_2_1']; ?>
    <?php print $content['middle_2_2']; ?>
  </div>
  <?php print $content['middle_3']; ?>
  <?php print $content['bottom']; ?>
  
</div>

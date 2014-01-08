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

 <div class="panel-top"> <?php print $content['top']; ?> </div>
 <div class="panel-middle-1"><?php print $content['middle_1']; ?></div>
  <div class="resource-container container-full middle-wrapper clearfix">
    <div class="container-inner middle-2-1"> <?php print $content['middle_2_1']; ?> </div>
    <div class="container-inner middle-2-2"> <?php print $content['middle_2_2']; ?> </div>
  </div>
 <div class="panel-middle-3"><?php print $content['middle_3']; ?></div>
  <div class="resource-container container-full middle-wrapper clearfix middle-4-wrapper">
    <div class="container-inner middle-4-1"> <?php print $content['middle_4_1']; ?> </div>
    <div class="container-inner middle-4-2"> <?php print $content['middle_4_2']; ?> </div>
  </div>
 <div class="panel-bottom"><?php print $content['bottom']; ?></div>

</div>

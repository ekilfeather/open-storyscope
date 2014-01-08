<?php
/**
 * Output the Title 'Keyword' for selected blocks defined in the template.php
 */
?>
<div id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>

  <?php print render($title_prefix); ?>
    <h2<?php print $title_attributes; ?>>Keyword</h2>
  <?php print render($title_suffix); ?>

  <?php print $content; ?>

</div><!-- /.block -->

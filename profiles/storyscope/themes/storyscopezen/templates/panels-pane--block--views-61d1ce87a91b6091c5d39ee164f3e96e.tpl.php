<?php
/**
 * Output the Title 'Keyword' for selected blocks defined in the template.php
 */
?>
<?php if ($content): ?>
  <section class="<?php print $classes; ?>">
  <h2>Filters</h2>
  <h2<?php print $title_attributes; ?>>Keyword</h2>
  <?php print $content; ?>
  </section><!-- region__sidebar -->
<?php endif; ?>

</div><!-- /.block -->



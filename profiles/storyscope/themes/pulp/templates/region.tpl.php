<?php if ($content): ?>
  <?php if ($wrapper): ?><div class="<?php print $classes; ?>"><?php endif; ?>
    <?php print $content; ?>
  <?php if ($wrapper): ?></div><?php endif; ?>
<?php endif; ?>
<header class="header" id="header" role="banner">
  <?php if ($site_name): ?>
    <h1 class='site-name'><?php print $site_name_link ?></h1>
  <?php endif; ?>
  <?php if ($site_slogan): ?>
    <h2 class="site-slogan"><?php print $site_slogan; ?></h2>
  <?php endif; ?>
  <?php print render($page['header']); ?>
</header>

<?php print render($page['navigation']) ?>

<div id='page' role='main'>
  
  <div id='main-content' role='main'>
    <?php print render($title_prefix); ?>
    <?php if ($title): ?><h1 class='page-title'><?php print $title ?></h1><?php endif; ?>
    <?php print render($title_suffix); ?>
    
    <?php if ($breadcrumb) print $breadcrumb; ?>
    <?php print render($tabs); ?>
    <?php print render($action_links); ?>
    <?php print render($page['highlighted']); ?>
    <?php print $messages; ?>
    <?php print render($page['help']); ?>
    
    <div class="page-content"><?php print render($page['content']) ?></div>
  </div>
  
  <?php print render($page['sidebar_first']) ?>
  <?php print render($page['sidebar_second']) ?>

</div>
<footer class="page-footer">
  <?php print render($page['footer']) ?>
<footer>
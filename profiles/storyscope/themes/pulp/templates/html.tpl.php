<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7" <?php print $html_attributes; ?>> <![endif]-->
<!--[if IE 7]> <html class="lt-ie9 lt-ie8" <?php print $html_attributes; ?>> <![endif]-->
<!--[if IE 8]> <html class="lt-ie9" <?php print $html_attributes; ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html <?php print $html_attributes; ?>> <!--<![endif]-->

<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width">
  
  <?php print $styles; ?>
  <?php print $scripts; ?>
  <!--[if lt IE 9]>
    <script src="<?php print base_path() . drupal_get_path('theme', 'pulp'); ?>/js/html5.js"></script>
  <![endif]-->
</head>

<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <div id="skip-link">
    <a href="#main-content" class="element-invisible" role="link"><?php print t('Skip to main content'); ?></a>
  </div>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
</body>
</html>

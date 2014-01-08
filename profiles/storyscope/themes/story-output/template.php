<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * A QUICK OVERVIEW OF DRUPAL THEMING
 *
 *   The default HTML for all of Drupal's markup is specified by its modules.
 *   For example, the comment.module provides the default HTML markup and CSS
 *   styling that is wrapped around each comment. Fortunately, each piece of
 *   markup can optionally be overridden by the theme.
 *
 *   Drupal deals with each chunk of content using a "theme hook". The raw
 *   content is placed in PHP variables and passed through the theme hook, which
 *   can either be a template file (which you should already be familiary with)
 *   or a theme function. For example, the "comment" theme hook is implemented
 *   with a comment.tpl.php template file, but the "breadcrumb" theme hooks is
 *   implemented with a theme_breadcrumb() theme function. Regardless if the
 *   theme hook uses a template file or theme function, the template or function
 *   does the same kind of work; it takes the PHP variables passed to it and
 *   wraps the raw content with the desired HTML markup.
 *
 *   Most theme hooks are implemented with template files. Theme hooks that use
 *   theme functions do so for performance reasons - theme_field() is faster
 *   than a field.tpl.php - or for legacy reasons - theme_breadcrumb() has "been
 *   that way forever."
 *
 *   The variables used by theme functions or template files come from a handful
 *   of sources:
 *   - the contents of other theme hooks that have already been rendered into
 *     HTML. For example, the HTML from theme_breadcrumb() is put into the
 *     $breadcrumb variable of the page.tpl.php template file.
 *   - raw data provided directly by a module (often pulled from a database)
 *   - a "render element" provided directly by a module. A render element is a
 *     nested PHP array which contains both content and meta data with hints on
 *     how the content should be rendered. If a variable in a template file is a
 *     render element, it needs to be rendered with the render() function and
 *     then printed using:
 *       <?php print render($variable); ?>
 *
 * ABOUT THE TEMPLATE.PHP FILE
 *
 *   The template.php file is one of the most useful files when creating or
 *   modifying Drupal themes. With this file you can do three things:
 *   - Modify any theme hooks variables or add your own variables, using
 *     preprocess or process functions.
 *   - Override any theme function. That is, replace a module's default theme
 *     function with one you write.
 *   - Call hook_*_alter() functions which allow you to alter various parts of
 *     Drupal's internals, including the render elements in forms. The most
 *     useful of which include hook_form_alter(), hook_form_FORM_ID_alter(),
 *     and hook_page_alter(). See api.drupal.org for more information about
 *     _alter functions.
 *
 * OVERRIDING THEME FUNCTIONS
 *
 *   If a theme hook uses a theme function, Drupal will use the default theme
 *   function unless your theme overrides it. To override a theme function, you
 *   have to first find the theme function that generates the output. (The
 *   api.drupal.org website is a good place to find which file contains which
 *   function.) Then you can copy the original function in its entirety and
 *   paste it in this template.php file, changing the prefix from theme_ to
 *   story_output_. For example:
 *
 *     original, found in modules/field/field.module: theme_field()
 *     theme override, found in template.php: story_output_field()
 *
 *   where story_output is the name of your sub-theme. For example, the
 *   zen_classic theme would define a zen_classic_field() function.
 *
 *   Note that base themes can also override theme functions. And those
 *   overrides will be used by sub-themes unless the sub-theme chooses to
 *   override again.
 *
 *   Zen core only overrides one theme function. If you wish to override it, you
 *   should first look at how Zen core implements this function:
 *     theme_breadcrumbs()      in zen/template.php
 *
 *   For more information, please visit the Theme Developer's Guide on
 *   Drupal.org: http://drupal.org/node/173880
 *
 * CREATE OR MODIFY VARIABLES FOR YOUR THEME
 *
 *   Each tpl.php template file has several variables which hold various pieces
 *   of content. You can modify those variables (or add new ones) before they
 *   are used in the template files by using preprocess functions.
 *
 *   This makes THEME_preprocess_HOOK() functions the most powerful functions
 *   available to themers.
 *
 *   It works by having one preprocess function for each template file or its
 *   derivatives (called theme hook suggestions). For example:
 *     THEME_preprocess_page    alters the variables for page.tpl.php
 *     THEME_preprocess_node    alters the variables for node.tpl.php or
 *                              for node--forum.tpl.php
 *     THEME_preprocess_comment alters the variables for comment.tpl.php
 *     THEME_preprocess_block   alters the variables for block.tpl.php
 *
 *   For more information on preprocess functions and theme hook suggestions,
 *   please visit the Theme Developer's Guide on Drupal.org:
 *   http://drupal.org/node/223440 and http://drupal.org/node/1089656
 */


/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
/* -- Delete this line if you want to use this function
function story_output_preprocess_maintenance_page(&$variables, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  story_output_preprocess_html($variables, $hook);
  story_output_preprocess_page($variables, $hook);
}
// */

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
/* -- Delete this line if you want to use this function
function story_output_preprocess_html(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  //$variables['classes_array'] = array_diff($variables['classes_array'], array('class-to-remove'));
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
function story_output_preprocess_page(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
function story_output_preprocess_node(&$variables, $hook) {

  // Optionally, run node-type-specific preprocess functions, like
  // story_output_preprocess_node_page() or story_output_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}

function story_output_preprocess_node_object(&$variables, $hook) {
  if (!empty($variables['field_image'][0])) {
    $image_variables = $variables['field_image'][0];
    $image_variables['style_name'] = 'large';
    $image_variables['path'] = $image_variables['uri'];
    $variables['image'] = theme_image_style($image_variables);
  }
}
/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function story_output_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
function story_output_preprocess_region(&$variables, $hook) {
  // Don't use Zen's region--sidebar.tpl.php template for sidebars.
  //if (strpos($variables['region'], 'sidebar_') === 0) {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('region__sidebar'));
  //}
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
function story_output_preprocess_block(&$variables, $hook) {
  // Add a count to all the blocks in the region.
  // $variables['classes_array'][] = 'count-' . $variables['block_id'];

  // By default, Zen will use the block--no-wrapper.tpl.php for the main
  // content. This optional bit of code undoes that:
  //if ($variables['block_html_id'] == 'block-system-main') {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('block__no_wrapper'));
  //}
}
// */
/**
 * Custom theme preprocess field functions
 */

function story_output_preprocess_field(&$vars, $hook){
  if ($vars['element']['#field_name'] == 'field_story_set') {
    $vars['theme_hook_suggestions'][] = 'field__story_set_collected';
    $field_array = array('field_story_set_object', 'field_story_set_snapshot_os');
    rows_from_field_collection($vars, 'field_story_set', $field_array);
  }
}

/**
 * Creates a simple text rows array from a field collections, to be used in a
 * field_preprocess function.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 *
 * @param $field_name
 *   The name of the field being altered.
 *
 * @param $field_array
 *   Array of fields to be turned into rows in the field collection.
 */
function rows_from_field_collection(&$vars, $field_name, $field_array) {
  $vars['rows'] = array();
  foreach($vars['element']['#items'] as $key => $item) {
    $entity_id = $item['value'];
    $entity = field_collection_item_load($entity_id);
    $wrapper = entity_metadata_wrapper('field_collection_item', $entity);
    $row = array();
    $object = $wrapper->field_story_set_object->value();
    // Find chosen image/media if there is one.
    $snapshot_oses = $wrapper->field_story_set_snapshot_os->value();
    if (!empty($snapshot_oses)) {
      foreach ($snapshot_oses as $snapshot) {
        if (!empty($snapshot)) {
          $snapshot_os_wrapper = entity_metadata_wrapper('field_collection_item', $snapshot);
          try {
            $os = $snapshot_os_wrapper->field_story_snapshot_os_os->value();
            if (!empty($os)) {
              $os_wrapper = entity_metadata_wrapper('node', $os);
              $chosen_media_fid = $os_wrapper->field_object_story_chosen_media->value();
            }
          }
          catch (Exception $e) {
            watchdog('microsite output', 'Snapshot OS OS missing. ');
          }
        }
      }
    }
    if (!empty($chosen_media_fid)) {
      // Render the item.
      $image_file = file_load($chosen_media_fid);
      if ($image_file->type == 'video' || $image_file->type == 'audio') {
        // I do not know why media_youtube does not like using the media_get_thumbnail_preview
        // function, but it seems to choke when making thumbnails, so we'll use its own
        // preview render formatter instead.
        if ($image_file->filemime == 'video/youtube') {
          // Set up the display settings array for Youtube videos.
          $display = array(
            'weight' => 1,
            'status' => 1,
            'settings' => array (
              'width' => '100%',
              'height' => '',
              'theme' => 'dark',
              'color' => 'red',
              'autohide' => 2,
              'autoplay' => 0,
              'loop' => 0,
              'showinfo' => 1,
              'modestbranding' => 0,
              'rel' => 1,
              'nocookie' => 0,
              'protocol_specify' => 0,
              'protocol' => 'https:',
              'enablejsapi' => 0,
              'origin' => '',
            ),
            'type' => 'media_youtube_video',
          );
          // This prints out a preview image.
          // $image = media_youtube_file_formatter_image_view($image_file, $display, NULL);
          // Whereas this prints out the video.
          $image = media_youtube_file_formatter_video_view($image_file, $display, NULL);
          $image = drupal_render($image);
        }
        elseif ($image_file->filemime == 'video/vimeo') {
          $display['settings'] = array(
            'width' => '100%',
            'height' => '',
            'autoplay' => 0,
          );
          $image = media_vimeo_file_formatter_video_view($image_file, $display, NULL);
          $image = drupal_render($image);
        }
        elseif ($image_file->filemime == 'audio/soundcloud') {
          $display['settings'] = array(
            'width' => '100%',
            'autoplay' => 0,
            'extra_params' => NULL,
          );
          $image = media_soundcloud_file_formatter_audio_view($image_file, $display, NULL);
          $image = drupal_render($image);
        }
        else {
          $image = media_get_thumbnail_preview($image_file);
          $image = drupal_render($image);
        }
      }
      elseif ($image_file->type == 'image') {
        $image = story_output_build_colorbox_image($image_file);
      }
      $row['object_image'] = $image;
    }
    else {
      // Setup Object Image
      $img_vars = $object->field_image[LANGUAGE_NONE][0];
      $img_vars['style_name'] = 'story_object_image';
      $img_vars['path'] = $img_vars['uri'];
      $row['object_image'] = story_output_build_colorbox_image($img_vars);
    }
    // Gather together object tombstone information.
    $row['object_title'] = $object->title;
    $object_wrapper = entity_metadata_wrapper('node', $object);
    $object_creation_date = $object_wrapper->field_object_creation_timestamp->value();
    if (!empty($object_creation_date)) {
      $row['object_creation_date'] = date('Y', $object_creation_date);
    }
    $object_creator = $object_wrapper->field_fb_agent->value();
    if (!empty($object_creator)) {
      foreach ($object_creator as $agent) {
        $agent_wrapper = entity_metadata_wrapper('field_collection_item', $agent);
        $row['object_creator'][] = $agent_wrapper->field_fb_agent_topic->value();
      }
    }

    // Setup text Values
    $snapshot_os = $wrapper->field_story_set_snapshot_os->value();

    if (!empty($snapshot_os)) {
      foreach($snapshot_os as $snapshot){
        if (!empty($snapshot->field_story_snapshot_os_text[LANGUAGE_NONE][0]['safe_value'])) {
          $row['os_texts'][] = $snapshot->field_story_snapshot_os_text[LANGUAGE_NONE][0]['safe_value'];
        }
      }
    }
    $vars['rows'][] = $row;
  }
}

/**
 * Custom theme preprocess view functions
 */

function story_output_preprocess_views_view(&$vars){
  if ($vars['name'] == 'story_sections'){
    $pseudo_random = sizeof($vars['view']->result) % 3;
    $vars['classes_array'][] = 'view-style-' . $pseudo_random;
  }
}

/**
 * Helper function to render an image and wrap it in a colorbox link.
 */
function story_output_build_colorbox_image($image_file) {
  // Depending on where this is called it can be an array or an object. We want object.
  if (is_array($image_file)) {
    $image_file = (object) $image_file;
  }
  $image_output = theme('image_style', array(
    'path' => $image_file->uri,
    'alt' => $image_file->filename,
    'style_name' => 'story_object_image',
    )
  );
  // Wrap the link in a colorbox-powered link.
  $link_path = file_create_url($image_file->uri);
  $link_options = array(
    'attributes' => array('class' => array('colorbox'), 'title' => t('View in overlay')),
    'html' => true,
  );
  $image = l($image_output, $link_path, $link_options);
  return $image;
}

<?php
/**
 * @file
 * flexslider_options_set.flexslider_default_preset.inc
 */

/**
 * Implements hook_flexslider_default_presets().
 */
function flexslider_options_set_flexslider_default_presets() {
  $export = array();

  $preset = new stdClass();
  $preset->disabled = FALSE; /* Edit this to true to make a default preset disabled initially */
  $preset->api_version = 1;
  $preset->name = 'decipher_media_reources';
  $preset->title = 'Decipher Media Reources';
  $preset->theme = 'classic';
  $preset->imagestyle_normal = 'flexslider_full';
  $preset->options = array(
    'animation' => 'fade',
    'animationDuration' => 600,
    'slideDirection' => 'horizontal',
    'slideshow' => 1,
    'slideshowSpeed' => 7000,
    'animationLoop' => 1,
    'randomize' => 0,
    'slideToStart' => 0,
    'directionNav' => 0,
    'controlNav' => 0,
    'keyboardNav' => 1,
    'mousewheel' => 1,
    'prevText' => '',
    'nextText' => '',
    'pausePlay' => 0,
    'pauseText' => 'Pause',
    'playText' => 'Play',
    'pauseOnAction' => 1,
    'controlsContainer' => '',
    'manualControls' => '',
  );
  $export['decipher_media_reources'] = $preset;

  return $export;
}

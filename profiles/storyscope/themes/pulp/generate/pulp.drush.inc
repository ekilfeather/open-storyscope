<?php
/**
 * @file
 * Contains functions only needed for drush integration.
 */

/**
 * Implementation of hook_drush_command().
 */
function pulp_drush_command() {
  $items = array();

  $items['pulp'] = array(
    'description' => 'Create a theme using pulp.',
    'arguments' => array(
      'name'         => 'A name for your theme.',
      'machine_name' => '[optional] A machine-readable name for your theme.',
    ),
    'options' => array(
      'name'         => 'A name for your theme.',
      'machine-name' => '[a-z, 0-9] A machine-readable name for your theme.',
      'description'  => 'A description of your theme.',
    ),
    'examples' => array(
      'drush pulp "My theme name"' => 'Create a sub-theme, using the default options.',
      'drush pulp "My theme name" my_theme' => 'Create a sub-theme with a specific machine name.',
    ),
  );

  return $items;
}

/**
 * Create a pulp sub-theme using the starter kit.
 */
function drush_pulp($name = NULL, $machine_name = NULL) {
  
  // Determine the theme name.
  if (!isset($name)) {
    $name = drush_get_option('name');
  }
  if (!$name) {
    $name = 'fbase';
  }

  // Determine the machine name.
  if (!isset($machine_name)) {
    $machine_name = drush_get_option('machine-name');
  }
  if (!$machine_name) {
    $machine_name = $name;
  }
  $machine_name = str_replace(' ', '_', strtolower($machine_name));
  $search = array(
    '/[^a-z0-9_]/', // Remove characters not valid in function names.
    '/^[^a-z]+/',   // Functions must begin with an alpha character.
  );
  $machine_name = preg_replace($search, '', $machine_name);

  // Determine the path to the new subtheme by finding the path to pulp.
  $pulp_path = drush_locate_root() . '/' . drupal_get_path('theme', 'pulp');
  $subtheme_path = explode('/', $pulp_path);
  array_pop($subtheme_path);
  $subtheme_path = implode('/', $subtheme_path) . '/' . str_replace('_', '-', $machine_name);

  // Make a fresh copy of the original starter kit.
  drush_op('pulp_copy', $pulp_path . '/generate/STARTERKIT', $subtheme_path);

  // Rename the .info file.
  $subtheme_info_file = $subtheme_path . '/' . $machine_name . '.info';
  drush_op('rename', $subtheme_path . '/STARTERKIT.info.txt', $subtheme_info_file);

  // Alter the contents of the .info file based on the command options.
  $alterations = array(
    '= pulp Sub-theme Starter Kit' => '= ' . $name,
  );
  if ($description = drush_get_option('description')) {
    $alterations['A sub-theme of pulp.'] = $description;
  }
  drush_op('pulp_file_str_replace', $subtheme_info_file, array_keys($alterations), $alterations);

  // Replace all occurrences of 'STARTERKIT' with the machine name of our sub theme.
  drush_op('pulp_file_str_replace', $subtheme_path . '/template.php', 'STARTERKIT', $machine_name);

  // Notify user of the newly created theme.
  drush_print(dt('pulp start kit for "!name" created in: !path. "drush vset default_theme !machine_name" = ready to go. Run compass create --bare. You can get a bigger start from https://github.com/edwardoriordan/compass-starter', array(
    '!name' => $name,
    '!path' => $subtheme_path,
    '!machine_name' => $machine_name,
  )));

}

/**
 * Copy a directory recursively.
 */
function pulp_copy($source_dir, $target_dir, $ignore = '/^(\.(\.)?|CVS|\.svn|\.git|\.DS_Store)$/') {
  if (!is_dir($source_dir)) {
    drush_die(dt('The directory "!directory" was not found.', array('!directory' => $source_dir)));
  }
  $dir = opendir($source_dir);
  @mkdir($target_dir);
  while($file = readdir($dir)) {
    if (!preg_match($ignore, $file)) {
      if (is_dir($source_dir . '/' . $file)) {
        pulp_copy($source_dir . '/' . $file, $target_dir . '/' . $file, $ignore);
      }
      else {
        copy($source_dir . '/' . $file, $target_dir . '/' . $file);
      }
    }
  }
  closedir($dir);
}

/**
 * Replace strings in a file.
 */
function pulp_file_str_replace($file_path, $find, $replace) {
  $file_contents = file_get_contents($file_path);
  $file_contents = str_replace($find, $replace, $file_contents);
  file_put_contents($file_path, $file_contents);
}

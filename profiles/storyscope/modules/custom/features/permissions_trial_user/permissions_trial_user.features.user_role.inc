<?php
/**
 * @file
 * permissions_trial_user.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function permissions_trial_user_user_default_roles() {
  $roles = array();

  // Exported role: Trial user.
  $roles['Trial user'] = array(
    'name' => 'Trial user',
    'weight' => '3',
  );

  return $roles;
}

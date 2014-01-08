<?php
/**
 * @file
 * permissions_trial_user.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function permissions_trial_user_user_default_permissions() {
  $permissions = array();

  // Exported permission: access comments.
  $permissions['access comments'] = array(
    'name' => 'access comments',
    'roles' => array(
      0 => 'administrator',
      1 => 'anonymous user',
      2 => 'authenticated user',
    ),
    'module' => 'comment',
  );

  // Exported permission: access content.
  $permissions['access content'] = array(
    'name' => 'access content',
    'roles' => array(
      0 => 'administrator',
      1 => 'anonymous user',
      2 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: access draggableviews.
  $permissions['access draggableviews'] = array(
    'name' => 'access draggableviews',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'draggableviews',
  );

  // Exported permission: access overlay.
  $permissions['access overlay'] = array(
    'name' => 'access overlay',
    'roles' => array(
      0 => 'administrator',
    ),
    'module' => 'overlay',
  );

  // Exported permission: access similarity search.
  $permissions['access similarity search'] = array(
    'name' => 'access similarity search',
    'roles' => array(
      0 => 'Trial user',
      1 => 'administrator',
      2 => 'authenticated user',
    ),
    'module' => 'similarity_search',
  );

  // Exported permission: access tinymce aed.
  $permissions['access tinymce aed'] = array(
    'name' => 'access tinymce aed',
    'roles' => array(
      0 => 'Trial user',
      1 => 'administrator',
      2 => 'authenticated user',
    ),
    'module' => 'annotation_editor',
  );

  // Exported permission: change own username.
  $permissions['change own username'] = array(
    'name' => 'change own username',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'user',
  );

  // Exported permission: create dossier content.
  $permissions['create dossier content'] = array(
    'name' => 'create dossier content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: create event content.
  $permissions['create event content'] = array(
    'name' => 'create event content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: create narrative_microsite content.
  $permissions['create narrative_microsite content'] = array(
    'name' => 'create narrative_microsite content',
    'roles' => array(
      0 => 'Trial user',
      1 => 'administrator',
      2 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: create object content.
  $permissions['create object content'] = array(
    'name' => 'create object content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: create object_story content.
  $permissions['create object_story content'] = array(
    'name' => 'create object_story content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: create plot content.
  $permissions['create plot content'] = array(
    'name' => 'create plot content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: create plot_element content.
  $permissions['create plot_element content'] = array(
    'name' => 'create plot_element content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: create reference content.
  $permissions['create reference content'] = array(
    'name' => 'create reference content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: create section content.
  $permissions['create section content'] = array(
    'name' => 'create section content',
    'roles' => array(
      0 => 'Trial user',
      1 => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: create source_event content.
  $permissions['create source_event content'] = array(
    'name' => 'create source_event content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: create story content.
  $permissions['create story content'] = array(
    'name' => 'create story content',
    'roles' => array(
      0 => 'Trial user',
      1 => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: create url aliases.
  $permissions['create url aliases'] = array(
    'name' => 'create url aliases',
    'roles' => array(
      0 => 'Trial user',
      1 => 'administrator',
    ),
    'module' => 'path',
  );

  // Exported permission: delete own dossier content.
  $permissions['delete own dossier content'] = array(
    'name' => 'delete own dossier content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: delete own event content.
  $permissions['delete own event content'] = array(
    'name' => 'delete own event content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: delete own narrative_microsite content.
  $permissions['delete own narrative_microsite content'] = array(
    'name' => 'delete own narrative_microsite content',
    'roles' => array(
      0 => 'Trial user',
      1 => 'administrator',
      2 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: delete own object content.
  $permissions['delete own object content'] = array(
    'name' => 'delete own object content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: delete own object_story content.
  $permissions['delete own object_story content'] = array(
    'name' => 'delete own object_story content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: delete own plot content.
  $permissions['delete own plot content'] = array(
    'name' => 'delete own plot content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: delete own plot_element content.
  $permissions['delete own plot_element content'] = array(
    'name' => 'delete own plot_element content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: delete own reference content.
  $permissions['delete own reference content'] = array(
    'name' => 'delete own reference content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: delete own section content.
  $permissions['delete own section content'] = array(
    'name' => 'delete own section content',
    'roles' => array(
      0 => 'Trial user',
      1 => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: delete own source_event content.
  $permissions['delete own source_event content'] = array(
    'name' => 'delete own source_event content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: delete own story content.
  $permissions['delete own story content'] = array(
    'name' => 'delete own story content',
    'roles' => array(
      0 => 'Trial user',
      1 => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: edit own comments.
  $permissions['edit own comments'] = array(
    'name' => 'edit own comments',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'comment',
  );

  // Exported permission: edit own dossier content.
  $permissions['edit own dossier content'] = array(
    'name' => 'edit own dossier content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: edit own event content.
  $permissions['edit own event content'] = array(
    'name' => 'edit own event content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: edit own narrative_microsite content.
  $permissions['edit own narrative_microsite content'] = array(
    'name' => 'edit own narrative_microsite content',
    'roles' => array(
      0 => 'Trial user',
      1 => 'administrator',
      2 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: edit own object content.
  $permissions['edit own object content'] = array(
    'name' => 'edit own object content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: edit own object_story content.
  $permissions['edit own object_story content'] = array(
    'name' => 'edit own object_story content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: edit own plot content.
  $permissions['edit own plot content'] = array(
    'name' => 'edit own plot content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: edit own plot_element content.
  $permissions['edit own plot_element content'] = array(
    'name' => 'edit own plot_element content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: edit own reference content.
  $permissions['edit own reference content'] = array(
    'name' => 'edit own reference content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: edit own section content.
  $permissions['edit own section content'] = array(
    'name' => 'edit own section content',
    'roles' => array(
      0 => 'Trial user',
      1 => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: edit own source_event content.
  $permissions['edit own source_event content'] = array(
    'name' => 'edit own source_event content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: edit own story content.
  $permissions['edit own story content'] = array(
    'name' => 'edit own story content',
    'roles' => array(
      0 => 'Trial user',
      1 => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: import media.
  $permissions['import media'] = array(
    'name' => 'import media',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'media',
  );

  // Exported permission: post comments.
  $permissions['post comments'] = array(
    'name' => 'post comments',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'comment',
  );

  // Exported permission: search content.
  $permissions['search content'] = array(
    'name' => 'search content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'search',
  );

  // Exported permission: skip comment approval.
  $permissions['skip comment approval'] = array(
    'name' => 'skip comment approval',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'comment',
  );

  // Exported permission: use advanced search.
  $permissions['use advanced search'] = array(
    'name' => 'use advanced search',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'search',
  );

  // Exported permission: use text format extra_html.
  $permissions['use text format extra_html'] = array(
    'name' => 'use text format extra_html',
    'roles' => array(
      0 => 'Trial user',
      1 => 'authenticated user',
    ),
    'module' => 'filter',
  );

  // Exported permission: use text format filtered_html.
  $permissions['use text format filtered_html'] = array(
    'name' => 'use text format filtered_html',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'filter',
  );

  // Exported permission: view own unpublished content.
  $permissions['view own unpublished content'] = array(
    'name' => 'view own unpublished content',
    'roles' => array(
      0 => 'administrator',
      1 => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: view the administration theme.
  $permissions['view the administration theme'] = array(
    'name' => 'view the administration theme',
    'roles' => array(
      0 => 'administrator',
    ),
    'module' => 'system',
  );

  return $permissions;
}

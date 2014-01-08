<?php
/**
 * @file
 * panels_sign_in_and_getting_started.pages_default.inc
 */

/**
 * Implements hook_default_page_manager_pages().
 */
function panels_sign_in_and_getting_started_default_page_manager_pages() {
  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'getting_started';
  $page->task = 'page';
  $page->admin_title = 'Getting Started';
  $page->admin_description = '';
  $page->path = 'getting-started';
  $page->access = array();
  $page->menu = array();
  $page->arguments = array();
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_getting_started_panel_context';
  $handler->task = 'page';
  $handler->subtask = 'getting_started';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Panel',
    'no_blocks' => 0,
    'pipeline' => 'standard',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
  );
  $display = new panels_display();
  $display->layout = 'sectioned';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'middle_1' => NULL,
      'middle_2_1' => NULL,
      'middle_2_2' => NULL,
      'middle_3' => NULL,
      'middle_4_1' => NULL,
      'middle_4_2' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = '';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-1';
    $pane->panel = 'middle_1';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'intro video',
      'title' => '<none>',
      'body' => '<p><iframe src="//player.vimeo.com/video/62332348" frameborder="0" width="500" height="281"></iframe></p>',
      'format' => 'full_html',
      'substitute' => TRUE,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $display->content['new-1'] = $pane;
    $display->panels['middle_1'][0] = 'new-1';
    $pane = new stdClass();
    $pane->pid = 'new-2';
    $pane->panel = 'middle_1';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'Dossier Description ',
      'title' => '',
      'body' => '<p>A Dossier is created by museum professionals for each heritage object in a museum’s collection.&nbsp;</p><p>A Dossier contains information and stories associated with the object as well as images of the object, and documents and correspondence about the object.&nbsp;This historical, social, cultural and economic information creates a context, giving us additional insight into an object.&nbsp;</p><p>A Dossier is also created when museum professionals are developing a narrative about a number of objects such as an exhibition or a museum tour.&nbsp;Research can be collected in a Dossier, which helps define, develop and refine the narrative.&nbsp;</p><p>In DECIPHER, ‘Dossier’ refers to the workspace created by a user to gather research, and develop and document their cultural narrative&nbsp;</p>',
      'format' => 'extra_html',
      'substitute' => TRUE,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $display->content['new-2'] = $pane;
    $display->panels['middle_1'][1] = 'new-2';
    $pane = new stdClass();
    $pane->pid = 'new-3';
    $pane->panel = 'middle_3';
    $pane->type = 'views_panes';
    $pane->subtype = 'dossiers-panel_pane_1';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $display->content['new-3'] = $pane;
    $display->panels['middle_3'][0] = 'new-3';
    $pane = new stdClass();
    $pane->pid = 'new-4';
    $pane->panel = 'middle_3';
    $pane->type = 'views_panes';
    $pane->subtype = 'dossiers-panel_pane_2';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array();
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $display->content['new-4'] = $pane;
    $display->panels['middle_3'][1] = 'new-4';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = '0';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['getting_started'] = $page;

  $page = new stdClass();
  $page->disabled = FALSE; /* Edit this to true to make a default page disabled initially */
  $page->api_version = 1;
  $page->name = 'landing_page';
  $page->task = 'page';
  $page->admin_title = 'landing page';
  $page->admin_description = 'landing page';
  $page->path = 'front';
  $page->access = array();
  $page->menu = array(
    'type' => 'none',
    'title' => '',
    'weight' => '0',
    'name' => 'navigation',
    'parent' => array(
      'type' => 'none',
      'title' => '',
      'weight' => 0,
      'name' => 'navigation',
    ),
  );
  $page->arguments = array();
  $page->conf = array(
    'admin_paths' => FALSE,
  );
  $page->default_handlers = array();
  $handler = new stdClass();
  $handler->disabled = FALSE; /* Edit this to true to make a default handler disabled initially */
  $handler->api_version = 1;
  $handler->name = 'page_landing_page_panel_context';
  $handler->task = 'page';
  $handler->subtask = 'landing_page';
  $handler->handler = 'panel_context';
  $handler->weight = 0;
  $handler->conf = array(
    'title' => 'Landing page',
    'no_blocks' => FALSE,
    'pipeline' => 'ipe',
    'body_classes_to_remove' => '',
    'body_classes_to_add' => '',
    'css_id' => '',
    'css' => '',
    'contexts' => array(),
    'relationships' => array(),
  );
  $display = new panels_display();
  $display->layout = 'sectioned';
  $display->layout_settings = array();
  $display->panel_settings = array(
    'style_settings' => array(
      'default' => NULL,
      'top' => NULL,
      'middle_1' => NULL,
      'middle_2_1' => NULL,
      'middle_2_2' => NULL,
      'middle_3' => NULL,
      'middle_4_1' => NULL,
      'middle_4_2' => NULL,
      'bottom' => NULL,
    ),
  );
  $display->cache = array();
  $display->title = 'landing page';
  $display->content = array();
  $display->panels = array();
    $pane = new stdClass();
    $pane->pid = 'new-5';
    $pane->panel = 'top';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => 'Custom Home Page Text',
      'title' => '',
      'body' => '<p style="margin-bottom: 1.5em; color: #4e4e4e; font-family: Arial, Helvetica, \'Nimbus Sans L\', sans-serif; line-height: 1.42em; font-size: 120%;">Storyscope is a software tool for exploring and creating stories about cultural heritage and museum collections.</p><div style="color: #4e4e4e; font-family: Arial, Helvetica, \'Nimbus Sans L\', sans-serif; line-height: 18px;">Whether you are a museum professional, or a visitor to a museum, you can use Storyscope as your own personal research space, to write stories about and connect cultural objects across your favourite museum collections.</div><div><div>&nbsp;</div><div>Build your stories up and add context to them by creating maps and timelines, and tagging the key players, places and events involved. Share your stories with other Storyscope users, or see them featured by a museum or gallery on their Storyscope page!</div><div>&nbsp;</div><div>Prepare to discover a wealth of material produced by professionals and the public alike, blended into new, engaging narratives about well-known and undiscovered cultural treasures.&nbsp;Head over to <a href="getting-started">this</a> page to see what\'s possible and <a href="getting-started">Get Sarted</a></div></div>',
      'format' => 'full_html',
      'substitute' => TRUE,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 0;
    $pane->locks = array();
    $display->content['new-5'] = $pane;
    $display->panels['top'][0] = 'new-5';
    $pane = new stdClass();
    $pane->pid = 'new-6';
    $pane->panel = 'top';
    $pane->type = 'custom';
    $pane->subtype = 'custom';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'admin_title' => '',
      'title' => '',
      'body' => '<p><img src="profiles/storyscope/themes/storyscopezen/images/all_hawaii_entrees_press_release_imma_2006.png" alt="" width="360" height="166" /></p>',
      'format' => 'full_html',
      'substitute' => TRUE,
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 1;
    $pane->locks = array();
    $display->content['new-6'] = $pane;
    $display->panels['top'][1] = 'new-6';
    $pane = new stdClass();
    $pane->pid = 'new-7';
    $pane->panel = 'top';
    $pane->type = 'block';
    $pane->subtype = 'user-login';
    $pane->shown = TRUE;
    $pane->access = array();
    $pane->configuration = array(
      'override_title' => 0,
      'override_title_text' => '',
    );
    $pane->cache = array();
    $pane->style = array(
      'settings' => NULL,
    );
    $pane->css = array();
    $pane->extras = array();
    $pane->position = 2;
    $pane->locks = array();
    $display->content['new-7'] = $pane;
    $display->panels['top'][2] = 'new-7';
  $display->hide_title = PANELS_TITLE_FIXED;
  $display->title_pane = 'new-5';
  $handler->conf['display'] = $display;
  $page->default_handlers[$handler->name] = $handler;
  $pages['landing_page'] = $page;

  return $pages;

}

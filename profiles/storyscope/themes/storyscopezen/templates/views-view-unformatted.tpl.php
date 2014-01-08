<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
if (!empty($view->plot_element_events_flag) || !empty($view->section_events_flag) || !empty($view->section_object_stories_flag)) {
  if (isset($view->plot_element_events_flag)) {
    $events_array = $view->plot_element_events_flag;
  }
  elseif (isset($view->section_events_flag)) {
    $events_array = $view->section_events_flag;
  }
  elseif (isset($view->section_object_stories_flag)) {
    $object_stories_array = $view->section_object_stories_flag;
  }
  // Object Stories on Gather page.
  if (!empty($object_stories_array)) {
    foreach ($rows as $i => $item) {
      $end = strpos($item, ' node ');
      $start = 21;
      $nid = substr($item, $start, $end - $start);
      if (in_array($nid, $object_stories_array)) {
        $item = str_replace('<p class="suggest add-event"><a href=', '<p class="suggest add-event"><a data=', $item);
        $item = str_replace('add +', '[added]', $item);
        $rows[$i] = $item;
      }
    }
  }
  // Events
  if (!empty($events_array)) {
    foreach ($rows as $i => $item) {
      $end = strpos($item, ' node ');
      $start = 21;
      $nid = substr($item, $start, $end - $start);
      if (in_array($nid, $events_array)) {
        // find add + & replace with remove x
        // get current url
        // find current_url/add & replace with remove
        $path = request_path();
        $item = str_replace('<p class="suggest add-event">', '<p class="suggest remove-event">', $item);
        $item = str_replace('add +', 'remove x', $item);
        $item = str_replace('/add?destination=' . $path, '/remove?destination=' . $path, $item);
        $rows[$i] = $item;
      }
    }
  }
}
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php foreach ($rows as $id => $row): ?>
    <?php print $row; ?>
<?php endforeach; ?>

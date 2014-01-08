<?php

/*
 * Remove size attribute from all textfields
 */
function pulp_preprocess_textfield(&$variables, $hook) {
  $variables['element']['#size'] = NULL;
}
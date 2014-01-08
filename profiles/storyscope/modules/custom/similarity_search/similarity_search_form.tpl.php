<?php
/**
 * @file: template file for StoryScope search form
 * @author: Jakub Machacek (xmacha51 @ stud.fit.vutbr.cz)
 * @date: February 2013
 * @see template_preprocess_similarity_search_form (similarity_search.module)
 * variables to use:
 * - $variables['similarity_search_form']['query_text'] -- query input
 * - $variables['similarity_search_form']['submit'] -- search button
 * - $variables['similarity_search_form']['field_select']
 * - $variables['similarity_search_form']['field_add2query']
 * - $variables['similarity_search_form']['node']
 * - $variables['similarity_search_form']['drop_example']
 * - $variables['similarity_search_form']['use_text_similarity']
 * - $variables['similarity_search_form']['hidden'] -- all hidden inputs
 * - $variables['similarity_search_form']['fields'] -- an array of items containing following keys:
 *   - 'field' -- input field of the filter
 *   - 'use' -- checkbox to select whether the filter should be used (if possible, otherwise unset)
 */
?>

<?php print $variables['similarity_search_form']['drupal_messages']; ?>

<?php if(isset($variables['similarity_search_form']['node'])): ?>
    <div class="similarity-query-hidden">
        <?php print $variables['similarity_search_form']['fake_submit']; ?>
    </div>
    <div class="similarity-example">
        <?php print $variables['similarity_search_form']['node']; ?>
    </div>
<!--
    <div class="similarity-drop-example">
        <?php print $variables['similarity_search_form']['drop_example']; ?>
    </div>
-->
<?php endif; ?>

<div id="similarity-search-type">
    <strong><?php print t('Search type'); ?>:</strong>
    <?php print $variables['similarity_search_form']['search_type']; ?>
</div>

<div class="similarity-query-field-wrap">
    <div id="similarity-query-search">
        <?php print $variables['similarity_search_form']['submit']; ?>
    </div>
    
    <div id="similarity-query-field">
        <?php print $variables['similarity_search_form']['query_text']; ?>
        <?php print $variables['similarity_search_form']['facet_text']; ?>
    </div>
</div>

<div id="similarity-facets">
    <?php print $variables['similarity_search_form']['facets']; ?>
</div>

<div id="similarity-context">
<!--
    <strong><?php print t('Context'); ?>:</strong>
    <?php print $variables['similarity_search_form']['context']; ?>
-->
</div>

<div class="similarity-total-estimate">
    <?php print $variables['similarity_search_form']['total_estimate']; ?>
</div>

<?php if(isset($variables['similarity_search_form']['results'])): ?>
<div class="similarity-results">
<?php foreach ($variables['similarity_search_form']['results'] as $result): ?>
<div class="similarity-wrap">
  <!--
  <div class="similarity-checkbox">
      <?php print $result['checkbox'] ?>
      <?php print $result['checkbox_id'] ?>
  </div>
  -->    
  <div class="similarity-block">
    <?php if (isset($result['object']['type_specific_content']['image_link']) && !empty($result['object']['type_specific_content']['image_link'])): ?>
    <div class="similarity-image-wrap">
        <?php print $result['object']['type_specific_content']['image_link'] ?>
    </div>
    <?php endif?>
    <div class="similarity-text-wrap">
        <h2 class="node-title"><?php if(isset($result['object']['title_link'])): print $result['object']['title_link']; endif; ?></h2>
        <!-- <div><?php print $result['link'] ?></div> -->
        <div>
            <?php if(isset($result['object']['type_specific_content']['creator'])):
                $creators = Array();
                foreach ($result['object']['type_specific_content']['creator'] as $creator) {
                    $creators[] = $creator["name"];
                }
                print t("Creator:")." ".implode(", ", $creators);
            endif; ?>
        </div>
        <div>
            <?php if(isset($result['object']['type_specific_content']['creation_timestamp'])):
                
                $date = similarity_search_convert_date($result['object']['type_specific_content']['creation_timestamp'], "Y");
                if (!empty($date)):
                    print t("Year:")." ".$date;
                endif;
            endif; ?>
        </div>
        <div>
            <?php if(isset($result['object']['dataset_link'])):
                print t("Data source:")." ".$result['object']['dataset_link'];
            endif; ?>
        </div>
        <div><?php if(isset($result['object']['teaser'])): print $result['object']['teaser']; endif; ?></div>
    </div>
    <div class="similarity-buttons">
      <div class="similarity-item-menu">
          <div class="similarity-item-add-menu form-item"><?php if (isset($result['add'])): print $result['add']; endif; ?></div>
          <!--
          <div class="similarity-item-ignore-menu form-item"><div class="ignore-title">Do not show</div><ul>
          <?php print $result['ignore'] ?>
          </ul></div>
          -->
        </div>
    </div>

    <div class="clear"></div>
    
  </div>
</div>
<?php endforeach; ?>
</div>
<?php endif; ?>

<div class="similarity-paging-wrap">
    <div class="similarity-paging">
        <?php print $variables['similarity_search_form']['drupal_pager'] ?>
    </div>
</div>

<div class="clear"></div>
<?php if(isset($variables['similarity_search_form']['results']) && !empty($variables['similarity_search_form']['results'])): ?>
    <!--
    <div class="similarity-bottom-buttons">
        <div class="similarity-item-add-menu"><?php if (isset($variables['similarity_search_form']['add_all_button'])): print $variables['similarity_search_form']['add_all_button']; endif; ?></div>
        
        <div class="similarity-item-ignore-menu"><div class="ignore-title">Do not show selected</div><ul>
        <?php print $variables['similarity_search_form']['ignore_all_button']; ?>
        </ul></div>
        
        <div class="clear"></div>
    </div>
    -->
<?php endif; ?>

<?php print $variables['similarity_search_form']['hidden']; ?>

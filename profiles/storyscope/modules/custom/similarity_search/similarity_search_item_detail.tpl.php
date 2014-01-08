<div id="similarity-search-item-detail">
    <div class="similarity-search-item-header">
        <div class="similarity-search-item-image">
            <?php
            if(isset($variables["object"]["image"])):
                print $variables["object"]["image"];
            endif;
            ?>
        </div>
        <div class="similarity-search-item-title">
            <?php
            if(isset($variables["object"]["type_specific_content"]["title"])):
                print '<h2>'.$variables["object"]["type_specific_content"]["title"].'</h2>';
            endif;
            ?>
        </div>
    </div>
    
    <div class="similarity-search-item-content clearfix">
        <?php
        if ($variables["object"]["has_info"]) {
            print '<div class="similarity-search-item-info">';
            print   '<h2>'.t("Information").'</h2>';
            print   '<dl>';

            // (-- if you want to change order of informations, you have to change saving
            // order in template_preprocess_similarity_search_item_detail function --)
            // From now, you can't change order of informations, it is processed by foreach
            foreach ($variables["object"]["info"] AS $info) {
                 print '<dt class="similarity-search-item-info-label">'.$info["title"].'</dt>';
                 foreach ($info["items"] AS $item) {
                     print '<dd>'.$item.'</dd>';
                 }
            }
            print   '</dl>';
            print '</div>';
            
            // object has info section
            $description_css = "similarity-search-item-description";
        }
        else {
            // object don't have info section (mostly is for object story)
            $description_css = "similarity-search-item-description-no-info";
        }
        ?>
        
        <div class="<?php print $description_css; ?>">
            <div class="similarity-search-item-buttons">
                <p class="button">
                    <?php
                    if (isset($variables["button"]) && !empty($variables["button"])):
                        print $variables["button"];
                    endif;
                    ?>
                </p>
            </div>
            <div class="similarity-search-item-description-text">
                <?php
                if(isset($variables["object"]["text"])):
                    print $variables["object"]["text"];
                endif;
                ?>
            </div>
            <div class="similarity-search-item-clear"></div>
        </div>
    </div>
    <?php
    if (isset($variables["object"]["refers_to"]) && !empty($variables["object"]["refers_to"])):
        print '<h3>'.t("Item child detail").'</h3>';
        print '<div class="similarity-search-item-childs clearfix">';
        foreach ($variables["object"]["refers_to"] AS $child) {
            print '<div class="similarity-search-item-child similarity-search-item-'.$child["css_type"].'">';
            print '<div class="similarity-search-item-type similarity-search-item-'.$child["css_type"].'">'.$child["type_title"].'</div>';
            if (isset($child["image"])):
                print   '<div class="similarity-search-item-child-image">';
                print       $child["image"];
                print   '</div>';
            endif;
            
            print   '<div class="similarity-search-item-child-content">';
            print     '<div class="similarity-search-item-child-title">';
            if (isset($child["type_specific_content"]["title"])):
                print '<h4 class="similarity-search-item-'.$child["css_type"].'">'.$child["type_specific_content"]["title"].'</h4>';
            endif;
            print     '</div>';
            
            print     '<div class="similarity-search-item-child-description">';
            if (isset($child["text"])):
                print check_plain($child["text"]);
            endif;
            print     '</div>';
            print   '</div>';
            print '</div>';
        }
        print '</div>';
    endif;
    ?>
</div>
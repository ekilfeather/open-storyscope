(function ($) {

  Drupal.behaviors.newsArchive = {
    attach: function (context) {
      $('#block-news-archive-news-archive-date-navigation ul.news-archive a.news-archive-year').each(function () {
        $(this).next('div.item-list').hide();
        $(this).next('div.item-list').has('ul li a.active').show();
        if ($(this).hasClass('active')) {
          $(this).next('div.item-list').show();
        }
      });
    }
  }

})(jQuery); 


//jquery-click-scroll - FIXED VERSION
//by syamsul'isul' Arifin - Modified for 199S Studio

var sectionArray = [1, 2, 4, 5];

$.each(sectionArray, function (index, value) {
  $(document).scroll(function () {
    var sectionElement = $("#" + "section_" + value);
    
    // Kiểm tra element có tồn tại không trước khi truy cập offset
    if (sectionElement.length > 0) {
      var offsetSection = sectionElement.offset().top - 154;
      var docScroll = $(document).scrollTop();
      var docScroll1 = docScroll + 1;

      if (docScroll1 >= offsetSection) {
        $(".navbar-nav .nav-link").removeClass("active");
        $(".navbar-nav .nav-link:link").addClass("inactive");
        $(".navbar-nav .nav-item .nav-link").eq(index).addClass("active");
        $(".navbar-nav .nav-item .nav-link").eq(index).removeClass("inactive");
      }
    }
  });

  $(".click-scroll")
    .eq(index)
    .click(function (e) {
      var sectionElement = $("#" + "section_" + value);
      
      // Kiểm tra element có tồn tại không trước khi truy cập offset
      if (sectionElement.length > 0) {
        var offsetClick = sectionElement.offset().top - 154;
        e.preventDefault();
        $("html, body").animate(
          {
            scrollTop: offsetClick,
          },
          300
        );
      }
    });
});

$(document).ready(function () {
  // Kiểm tra navbar elements có tồn tại không
  if ($(".navbar-nav .nav-item .nav-link").length > 0) {
    $(".navbar-nav .nav-item .nav-link:link").addClass("inactive");
    $(".navbar-nav .nav-item .nav-link").eq(0).addClass("active");
    $(".navbar-nav .nav-item .nav-link:link").eq(0).removeClass("inactive");
  }
});

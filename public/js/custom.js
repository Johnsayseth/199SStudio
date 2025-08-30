(function ($) {
  "use strict";

  // NAVBAR: đóng menu khi click vào link (chỉ khi có jQuery plugin collapse)
  if ($.fn && $.fn.collapse) {
    $(".navbar-collapse a").on("click", function () {
      $(".navbar-collapse").collapse("hide");
    });
  }

  $(function () {
    // HERO SLIDES (chỉ init nếu plugin vegas tồn tại và chưa được React init)
    if ($.fn && $.fn.vegas && !window.__VEGAS_INIT) {
      if ($(".hero-slides").length) {
        $(".hero-slides").vegas({
          slides: [
            { src: "images/slides/1-72 copy.jpg" },
            { src: "images/Final 199S-5822.JPG" },
            { src: "images/mocchau-07114.JPG" },
          ],
          timer: false,
          animation: "kenburns",
        });
        window.__VEGAS_INIT = true;
      }
    }

    // ==== VIDEO MODAL ====
    // Hàm mở modal và gán src cho <video>
    function showModalVideo(src) {
      var video = document.getElementById("modalVideo");
      video.src = src;
      var modal = new bootstrap.Modal(document.getElementById("videoModal"));
      modal.show();
    }

    // Bắt sự kiện click cho các thumbnail/nút có class .js-open-video
    $(".js-open-video").on("click", function (e) {
      e.preventDefault();
      showModalVideo($(this).data("src"));
    });
    // =======================
  });

  // SMOOTH SCROLL
  $(".smoothscroll").click(function () {
    var el = $(this).attr("href");
    var elWrapped = $(el);
    var header_height = $(".navbar").height() + 60;

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $("body,html").animate(
        {
          scrollTop: totalScroll,
        },
        300
      );
    }
  });
})(window.jQuery);

// Khi carousel #videoCarousel chuyển slide thì pause tất cả video trong đó
var carouselEl = document.getElementById("videoCarousel");
if (carouselEl) {
  carouselEl.addEventListener("slide.bs.carousel", function (e) {
    var videos = carouselEl.querySelectorAll("video");
    videos.forEach(function (v) {
      v.pause();
    });
  });
}

// —— TỰ ĐỘNG CUỘN VIDEO STRIP ——
document.addEventListener("DOMContentLoaded", function () {
  const strip = document.querySelector(".video-strip");
  if (!strip) return;

  const items = strip.querySelectorAll(".video-item");
  // Tính toán chiều rộng mỗi item + margin-right
  const style = getComputedStyle(items[0]);
  const marginRight = parseInt(style.marginRight);
  const step = items[0].offsetWidth + marginRight;

  let pos = 0;
  setInterval(() => {
    pos += step;
    // nếu đã cuộn hết thì quay về đầu
    if (pos > strip.scrollWidth - strip.clientWidth) {
      pos = 0;
    }
    strip.scrollTo({ left: pos, behavior: "smooth" });
  }, 4000); // mỗi 4 giây chuyển một clip
});

// ==== HIỆU ỨNG SLIDE IN CHO ALBUM ====
document.addEventListener("DOMContentLoaded", function () {
  const albums = document.querySelectorAll(".timeline-content");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  albums.forEach((el) => observer.observe(el));
});

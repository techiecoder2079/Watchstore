(function ($) {
  "use strict"; // start of use strict
  $(function () {
    if ($(".product-custom-slider").length > 0) {
      $(".product-custom-slider").each(function () {
        var self = $(this);
        var next = self.find(".next");
        var prev = self.find(".prev");
        var list = self.find(".list-product");
        var item = self.find(".item-product");
        var current = self.find(".item-current").index() + 1;
        var src_thumb = self
          .find(".item-current .product-thumb img")
          .attr("src");
        var iwd = item.width();
        var lwd = list.width();
        var total = item.length;
        var current_text, total_text;

        if (total > 9) {
          total_text = total;
        } else {
          total_text = "0" + total;
        }

        if (current > 9) {
          current_text = current;
        } else {
          current_text = "0" + current;
        }

        self.find(".current").text(current_text);
        self.find(".total").text(total_text);
        self.find(".custom-range-max").slider({
          range: "max",
          min: current,
          max: total,
          value: current,
          slide: function (event, ui) {
            current = ui.value;
            if (current > 9) {
              current_text = current;
            } else {
              current_text = "0" + current;
            }
            self.find(".current").text(current_text);
            item.removeClass("item-current");
            item.eq(current - 1).addClass("item-current");
            list.css("transform", "translateX(-" + (current - 1) * iwd + "px)");
            src_thumb = self
              .find(".item-current .product-thumb img")
              .attr("src");
            self
              .parents(".content-scroll-box")
              .find(".custom-product-thumb")
              .attr("src", src_thumb);
          },
        });
        next.on("click", function (event) {
          event.preventDefault();
          current = current + 1;
          if (current > total) {
            // if current value crosses 9 than it will return it to 1st image
            current = 1;
          }
          if (current > 9) {
            current_text = current;
          } else {
            current_text = "0" + current;
          }
          self.find(".current").text(current_text);
          item.removeClass("item-current");
          item.eq(current - 1).addClass("item-current");
          list.css("transform", "translateX(-" + (current - 1) * iwd + "px)");
          src_thumb = self.find(".item-current .product-thumb img").attr("src");
          self
            .parents(".content-scroll-box")
            .find(".custom-product-thumb")
            .attr("src", src_thumb);
          self.find(".custom-range-max").slider({
            range: "max",
            max: total,
            value: current,
          });
        });
        prev.on("click", function (event) {
          event.preventDefault();
          current = current - 1;
          if (current < 1) {
            current = total;
          }
          if (current > 9) {
            current_text = current;
          } else {
            current_text = "0" + current;
          }
          self.find(".current").text(current_text);
          item.removeClass("item-current");
          item.eq(current - 1).addClass("item-current");
          list.css("transform", "translateX(-" + (current - 1) * iwd + "px)");
          src_thumb = self.find(".item-current .product-thumb img").attr("src");
          self
            .parents(".content-scroll-box")
            .find(".custom-product-thumb")
            .attr("src", src_thumb);
          self.find(".custom-range-max").slider({
            range: "max",
            max: total,
            value: current,
          });
        });
      });
    }

    $("body").on("click", function (event) {
      $(this).removeClass("overlay");
      $(".mini-cart-box.aside-box .mini-cart-content").removeClass("active");
      $(".nav-fixed .main-nav").removeClass("active");
    });
    $(".mini-cart-box.aside-box,.nav-fixed").on("click", function () {
      event.stopPropagation();
    });
    $(".mini-cart-box.aside-box .mini-cart-link,.nav-fixed .btn-nav-fixed").on(
      "click",
      function (event) {
        event.preventDefault();
        $("body").addClass("overlay");
        $(this).next().addClass("active");
      }
    );

    //Tag Toggle
    if ($(".toggle-tab").length > 0) {
      $(".toggle-tab").each(function () {
        $(this).find(".item-toggle-tab.active .toggle-tab-content").show();
        $(this)
          .find(".toggle-tab-title")
          .on("click", function (event) {
            if ($(this).next().length > 0) {
              event.preventDefault();
              $(this).parent().siblings().removeClass("active");
              $(this).parent().toggleClass("active");
              $(this)
                .parents(".toggle-tab")
                .find(".toggle-tab-content")
                .slideUp();
              $(this).next().stop(true, false).slideToggle();
            }
          });
      });
    }

    $(".list-attr-color a").on("click", function (event) {
      event.preventDefault();
      var self = $(this);
      var image = self.attr("data-image");
      self
        .parents(".product-thumb")
        .find(".product-thumb-link img")
        .attr("src", image);
    });

    if ($(".parallax").length > 0) {
      $(".parallax").each(function () {
        var p_url = $(this).attr("data-image");
        $(this).css("background-image", 'url("' + p_url + '")');
      });
    }
  });

  function background() {
    $(".bg-slider .item-slider").each(function () {
      var src = $(this).find(".banner-thumb a img").attr("src");
      $(this).css("background-image", 'url("' + src + '")');
    });
  }

  function afterAction() {
    $(".banner-slider .owl-item").each(function () {
      var check = $(this).hasClass("active");
      if (check == true) {
        $(this)
          .find(".animate__animated")
          .each(function () {
            var anime = $(this).attr("data-animated");
            $(this).addClass(anime);
          });
      } else {
        $(this)
          .find(".animate__animated")
          .each(function () {
            var anime = $(this).attr("data-animated");
            $(this).removeClass(anime);
          });
      }
    });
    var owl = this;
    var visible = this.owl.visibleItems;
    var first_item = visible[0];
    var last_item = visible[visible.length - 1];
    this.$elem.find("owl-item").removeClass("first-item");
    this.$elem.find("owl-item").removeClass("last-item");
    this.$elem.find("owl-item").eq(first_item).addClass("first-item");
    this.$elem.find("owl-item").eq(last_item).addClass("last-item");
  }

  if ($(".wrap-item").length > 0) {
    $(".wrap-item").each(function () {
      var data = $(this).data();
      $(this).owlCarousel({
        addClassActive: true,
        stopOnHover: true,
        lazyload: true,
        loop: true,
        autoplay: true,
        itemsCustom: data.itemscustom,
        autoPlay: data.autoplay,
        transitionStyle: data.transition,
        paginationNumber: data.paginumber,
        beforeInit: background,
        afterAction: afterAction,
        navigationText: [
          '<i class="icon fa fa-arrow-left"></i>',
          '<i class="icon fa fa-arrow-right"></i>',
        ],
      });
    });
  }

  jQuery(document).ready(function () {
    if ($(".block-video-parallax").length > 0) {
      $(".video-button").on("click", function (event) {
        event.preventDefault();
        var video = $(".video-parallax").get(0);
        $(this).toggleClass("active");
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
  });
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
  // Burger menu
  (function () {
    const burger = document.getElementById("burger-menu");
    const list = document.querySelector(".nav__list");

    if(!burger || !list) return;

    function closeMenu() {
      burger.classList.remove("js-burger-open");
      list.classList.remove("show-mobile-menu");
    }

    function openMenu() {
      burger.classList.add("js-burger-open");
      list.classList.add("show-mobile-menu");
    }

    document.body.addEventListener("click", (e) => {
      const target = e.target;
      if (
        !target.closest(".burger-menu") &&
        !target.classList.contains("show-mobile-menu")
      ) {
        closeMenu();
      }
    });

    burger.addEventListener("click", () => {
      if (burger.classList.contains("js-burger-open")) {
        closeMenu();
        return;
      }

      openMenu();
    });

    window.addEventListener("resize", () => {
      closeMenu();
    });
  })();

  // Swiper slider
  (function () {
    const duration = 3000;

    function initSlider() {
      const swiperPromo = new Swiper(".js-about-swiper", {
        spaceBetween: 25,
        resizeObserver: true,
        updateOnWindowResize: true,
        direction: "horizontal",
        slidesPerGroup: 1,
        slidesPerView: 3,

        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
          renderBullet: function (index, className) {
            return `<button class="${className} js-about-promo">
            <div class="bullet"></div>
          </button>`;
          },
        },

        //   autoplay: {
        //     delay: duration,
        //   },
      });
    }

    initSlider();
  })();
});

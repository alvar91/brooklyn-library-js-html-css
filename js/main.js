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

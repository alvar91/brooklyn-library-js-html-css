document.addEventListener("DOMContentLoaded", function () {
  // Burger menu
  (function () {
    const burger = document.getElementById("burger-menu");
    const list = document.querySelector(".nav__list");

    if (!burger || !list) return;

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

  // Slider
  (function () {
    function createButtons() {
      const $buttons = document.createDocumentFragment();

      for (i = 1; i <= slidesCount; i++) {
        const element = document.createElement("div");

        element.innerHTML = `
          <button class="pagination__dot ${
            i === 1
              ? "pagination__dot pagination__dot--active"
              : "pagination__dot"
          } js-slide-button" data-dot-id="${i}">
            <div class="bullet"></div>
          </button>
        `;

        $buttons.appendChild(element.firstElementChild);
      }

      buttonsContainer.appendChild($buttons);
    }

    // Инициация компонента слайдера
    const slider = document.querySelector(".js-slider");
    const sliderContainer = slider.querySelector(".js-slider-container");
    const slides = slider.querySelectorAll(".js-slide");
    const slidesCount = slides.length;
    const buttonsContainer = slider.querySelector(".js-slide-buttons");

    if (!slidesCount || !sliderContainer || !buttonsContainer) {
      console.error("No necessary elements in layout");
      return;
    }

    createButtons();

    let activeDot = slider.querySelector(".pagination__dot--active");

    //Ширина одного слайда (px)
    const slideWidth = 475;

    //Текущее перемещение слайдов вдоль оси x
    let currentTranslate = 0;

    //Функция для перемещения слайдов вдоль оси x
    const translateSlides = (dotId) => {
      if (dotId < 1) dotId = slidesCount;
      else if (dotId > slidesCount) dotId = 1;

      //Выбираем новый дот в DOM
      const currentDot = slider.querySelector(
        `.js-slide-button[data-dot-id="${dotId}"]`
      );
      const currentDotId = currentDot.dataset.dotId;
      const activeDotDotId = activeDot.dataset.dotId;
      const difDotId = Math.abs(activeDotDotId - currentDotId);

      if (activeDotDotId > currentDotId) {
        currentTranslate = currentTranslate + difDotId * slideWidth;
        sliderContainer.style.transform = `translateX(${currentTranslate}px)`;
      } else {
        currentTranslate = currentTranslate - difDotId * slideWidth;
        sliderContainer.style.transform = `translateX(${currentTranslate}px)`;
      }

      //Добавляем активный класс к новому доту и убираем активный класс с прежнего дота
      currentDot.classList.add("pagination__dot--active");
      activeDot.classList.remove("pagination__dot--active");

      //Назначаем новый дот активным
      activeDot = currentDot;
    };

    //Функция для перемещения слайда на один слайд назад
    const prevArrowHandler = (e) => {
      e.stopPropagation();

      //Получаем id предыдущего дота
      const dotId = activeDot.dataset.dotId - 1;

      translateSlides(dotId);
    };

    //Функция для перемещения слайда на один слайд вперед
    const nextArrowHandler = (e) => {
      e.stopPropagation();

      //Получаем id следующего дота
      const dotId = Number(activeDot.dataset.dotId) + 1;
      translateSlides(dotId);
    };

    //Функция для переноса слайдов при нажатии на любой дот
    const dotsHandler = (e) => {
      e.stopPropagation();

      //Получаем id нажатого дота
      const dotId = e.target.dataset.dotId;

      if (!dotId) {
        return;
      }

      //Если нажатый дот уже является текущим, то прерываем выполнение функции
      if (activeDot.dataset.dotId == dotId) {
        return;
      }

      //Вызываем функцию для переноса слайдов
      translateSlides(dotId);
    };

    //Обработчики на стрелки и доты
    slider
      .querySelector(".js-prev-arrow")
      .addEventListener("click", prevArrowHandler);

    slider
      .querySelector(".js-next-arrow")
      .addEventListener("click", nextArrowHandler);

    slider.querySelector(".js-slide-buttons");
    addEventListener("click", dotsHandler);
  })();
});

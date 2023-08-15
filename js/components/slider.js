export class Slider {
  #slider;
  #sliderContainer;
  #slides;
  #slidesCount;
  #buttonsContainer;
  #prevSlideButton;
  #nextSlideButton;

  // Номер аквтиного слайда по умолчанию
  #initialActiveSlideNumber = 1;

  // Активная точка
  #activeDot = null;

  //Ширина одного слайда (px)
  #slideWidth = 475;

  //Текущее перемещение слайдов вдоль оси x
  #currentTranslate = 0;

  //Количество слайдов при десктопе
  #desktopDotsCount = 3;

  constructor({
    sliderSelector,
    sliderContainerSelector,
    slidesSelector,
    buttonsContainerSelector,
    prevSlideButtonSelector,
    nextSlideButtonSelector,
  }) {
    this.#slider = document.querySelector(sliderSelector);
    this.#sliderContainer = document.querySelector(sliderContainerSelector);
    this.#slides = document.querySelectorAll(slidesSelector);
    this.#slidesCount = this.#slides.length;
    this.#buttonsContainer = document.querySelector(buttonsContainerSelector);
    this.#prevSlideButton = document.querySelector(prevSlideButtonSelector);
    this.#nextSlideButton = document.querySelector(nextSlideButtonSelector);
  }

  #createButtons = () => {
    const $buttons = document.createDocumentFragment();

    for (let i = 1; i <= this.#slidesCount; i++) {
      const element = document.createElement("div");

      element.innerHTML = `
        <button class="pagination__dot ${
          i === this.#initialActiveSlideNumber ? "pagination__dot--active" : ""
        } js-slide-button" data-dot-id="${i}">
          <div class="bullet"></div>
        </button>
      `;

      $buttons.appendChild(element.firstElementChild);
    }

    this.#buttonsContainer.appendChild($buttons);

    this.#activeDot = this.#slider.querySelector(".pagination__dot--active");
  };

  //Функция для перемещения слайдов вдоль оси x
  #translateSlides = (dotId) => {
    // Если слайд оказывается за пределами слайдера
    // if (dotId < 1) dotId = this.#slidesCount;
    // else if (dotId > this.#slidesCount) dotId = 1;

    if (dotId > 1 && dotId < this.#slidesCount) {
      this.#prevSlideButton.disabled = false;
      this.#nextSlideButton.disabled = false;
    } else {
      if (dotId <= 1) {
        this.#prevSlideButton.disabled = true;
        this.#nextSlideButton.disabled = false;
      }

      if (dotId >= this.#slidesCount) {
        this.#prevSlideButton.disabled = false;
        this.#nextSlideButton.disabled = true;
      }
    }

    //Выбираем новый дот в DOM
    const currentDot = this.#slider.querySelector(
      `.js-slide-button[data-dot-id="${dotId}"]`
    );

    const currentDotId = currentDot.dataset.dotId;
    const activeDotDotId = this.#activeDot.dataset.dotId;
    const difDotId = Math.abs(activeDotDotId - currentDotId);

    if (activeDotDotId > currentDotId) {
      this.#currentTranslate =
        this.#currentTranslate + difDotId * this.#slideWidth;
      this.#sliderContainer.style.transform = `translateX(${
        this.#currentTranslate
      }px)`;
    } else {
      this.#currentTranslate =
        this.#currentTranslate - difDotId * this.#slideWidth;
      this.#sliderContainer.style.transform = `translateX(${
        this.#currentTranslate
      }px)`;
    }

    //Добавляем активный класс к новому доту и убираем активный класс с прежнего дота
    currentDot.classList.add("pagination__dot--active");
    this.#activeDot.classList.remove("pagination__dot--active");

    //Назначаем новый дот активным
    this.#activeDot = currentDot;
  };

  #prevArrowHandler = (e) => {
    e.stopPropagation();

    //Получаем id предыдущего дота
    const dotId = this.#activeDot.dataset.dotId - 1;

    this.#translateSlides(dotId);
  };

  #nextArrowHandler = (e) => {
    e.stopPropagation();

    //Получаем id следующего дота
    const dotId = Number(this.#activeDot.dataset.dotId) + 1;
    this.#translateSlides(dotId);
  };

  #dotsHandler = (e) => {
    e.stopPropagation();

    //Получаем id нажатого дота
    const dotId = e.target.dataset.dotId;

    if (!dotId) {
      console.error("Clicked dot don`t have dotId dataset");
      return;
    }

    //Если нажатый дот уже является текущим, то прерываем выполнение функции
    if (this.#activeDot.dataset.dotId === dotId) return;

    //Вызываем функцию для переноса слайдов
    this.#translateSlides(dotId);
  };

  #addEventListeners = () => {
    // Обработчики на стрелки и доты
    this.#prevSlideButton.addEventListener("click", this.#prevArrowHandler);
    this.#nextSlideButton.addEventListener("click", this.#nextArrowHandler);
    this.#buttonsContainer.addEventListener("click", this.#dotsHandler);

    // Обработчик сброса слайдера на первый слайд в случае ресайза
    window.addEventListener("resize", () => {
      if (this.#activeDot.dataset.dotId > this.#desktopDotsCount) {
        const firstNumberSlide = 1;
        this.#translateSlides(firstNumberSlide);
      }
    });
  };

  #initSlider = () => {
    if (
      !this.#slider ||
      !this.#slidesCount ||
      !this.#sliderContainer ||
      !this.#buttonsContainer ||
      !this.#prevSlideButton ||
      !this.#nextSlideButton
    ) {
      console.error("No necessary elements in layout for slider");
      return;
    }

    this.#createButtons();

    // Блокируем кнопки-стрелки, если текущий слайд достиг пределов
    if (this.#initialActiveSlideNumber <= 1) {
      this.#prevSlideButton.disabled = true;
    }

    if (this.#initialActiveSlideNumber >= this.#slidesCount) {
      this.#nextSlideButton.disabled = true;
    }

    this.#addEventListeners();
  };

  init() {
    this.#initSlider();
  }
}

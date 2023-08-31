import { AbstractView } from "../../abstract-view.js";

const slides = [
  {
    src: "img/image1.jpg",
    srcWebP: "img/image1.webp",
    alt: "Изображение 1",
  },
  {
    src: "img/image2.jpg",
    srcWebP: "img/image2.webp",
    alt: "Изображение 2",
  },
  {
    src: "img/image3.jpg",
    srcWebP: "img/image3.webp",
    alt: "Изображение 3",
  },
  {
    src: "img/image4.jpg",
    srcWebP: "img/image4.webp",
    alt: "Изображение 4",
  },
  {
    src: "img/image5.jpg",
    srcWebP: "img/image5.webp",
    alt: "Изображение 5",
  },
];

const createSlideTemplate = (
  { src, srcWebP, alt },
  initialActiveSlideNumber,
  index
) => {
  return `
        <div class="slider__slide js-slide ${
          initialActiveSlideNumber === index + 1 ? "js-slide--active" : ""
        }">
            <picture>
                <source type="image/webp" srcset="${srcWebP}" />
                <img
                    class="slider__image"
                    src="${src}"
                    alt="${alt}"
                    loading="lazy"
                />
            </picture>
        </div>
    `;
};

const createButtonTemplate = (initialActiveSlideNumber, index) => {
  return `
        <button class="pagination__dot ${
          index === initialActiveSlideNumber ? "pagination__dot--active" : ""
        } js-slide-button" data-dot-id="${index}">
            <div class="bullet"></div>
        </button>
    `;
};

const createButtonsTemplate = (initialActiveSlideNumber, slidesCount) => {
  const buttons = [];

  for (let index = 1; index <= slidesCount; index++) {
    buttons.push(createButtonTemplate(initialActiveSlideNumber, index));
  }

  return buttons.join("");
};

const createSliderTemplate = (
  initialActiveSlideNumber,
  slides,
  slidesCount
) => {
  return `
    <div class="slider js-slider">
        <div class="slider__inner">
            <button class="slider__prev-arrow js-prev-arrow"></button>
            <div class="slider-wrapper">
                <div class="slider__container js-slider-container">
                    ${slides
                      .map((item, index) => {
                        return createSlideTemplate(
                          item,
                          initialActiveSlideNumber,
                          index
                        );
                      })
                      .join("")}
                </div>
            </div>
            <button class="slider__next-arrow js-next-arrow"></button>
        </div>
        <div class="slider-section__pagination">
            <div class="pagination js-slide-buttons">
                ${createButtonsTemplate(initialActiveSlideNumber, slidesCount)}
            </div>
        </div>
    </div>`;
};

export class SliderView extends AbstractView {
  #slider;
  #sliderContainer;
  #buttonsContainer;
  #prevSlideButton;
  #nextSlideButton;

  #slides = slides;
  #slidesCount = this.#slides.length;

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

  constructor() {
    super();
  }

  getTemplate() {
    return createSliderTemplate(
      this.#initialActiveSlideNumber,
      this.#slides,
      this.#slidesCount
    );
  }

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
      // console.error("Clicked dot don`t have dotId dataset");
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

  init = () => {
    this.#slider = document.querySelector(".js-slider");
    this.#sliderContainer = document.querySelector(".js-slider-container");

    this.#buttonsContainer = document.querySelector(".js-slide-buttons");
    this.#prevSlideButton = document.querySelector(".js-prev-arrow");
    this.#nextSlideButton = document.querySelector(".js-next-arrow");

    this.#activeDot = this.#slider.querySelector(".pagination__dot--active");

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

    // Блокируем кнопки-стрелки, если текущий слайд достиг пределов
    if (this.#initialActiveSlideNumber <= 1) {
      this.#prevSlideButton.disabled = true;
    }

    if (this.#initialActiveSlideNumber >= this.#slidesCount) {
      this.#nextSlideButton.disabled = true;
    }

    this.#addEventListeners();
  };
}

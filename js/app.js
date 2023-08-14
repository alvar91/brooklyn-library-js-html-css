import { Burger } from "./components/burger.js";
import { Slider } from "./components/slider.js";

export default class App {
  init() {
    const burger = new Burger({
      burgerSelector: ".js-burger-menu",
      burgerOpenSelector: ".js-burger-open",
      showMobileMenuSelector: ".show-mobile-menu",
      listSelector: ".js-nav__list",
    });
    burger.init();

    const slider = new Slider({
      sliderSelector: ".js-slider",
      sliderContainerSelector: ".js-slider-container",
      slidesSelector: ".js-slide",
      buttonsContainerSelector: ".js-slide-buttons",
      prevSlideButtonSelector: ".js-prev-arrow",
      nextSlideButtonSelector: ".js-next-arrow",
    });
    slider.init();
  }
}

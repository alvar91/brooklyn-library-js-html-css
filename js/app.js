import { Burger } from "./components/burger.js";
import { Slider } from "./components/slider.js";
import { Modal } from "./components/modal.js";

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

    const loginModal = new Modal({
      modalSelector: ".js-login-modal",
      openModalSelector: ".js-open-login",
      closeModalSelector: ".js-close-login",
      activeClassSelector: ".active",
      contentSelector: ".js-login-modal-content",
    });
    loginModal.init();

    const signUpModal = new Modal({
      modalSelector: ".js-sign-up-modal",
      openModalSelector: ".js-open-sign-up",
      closeModalSelector: ".js-close-sign-up",
      activeClassSelector: ".active",
      contentSelector: ".js-sign-up-modal-content",
    });
    signUpModal.init();

    const profileModal = new Modal({
      modalSelector: ".js-profile-modal",
      openModalSelector: ".js-open-profile",
      closeModalSelector: ".js-close-profile",
      activeClassSelector: ".active",
      contentSelector: ".js-profile-modal-content",
    });
    profileModal.init();

    const libraryCardModal = new Modal({
      modalSelector: ".js-library-card-modal",
      openModalSelector: ".js-open-library-card",
      closeModalSelector: ".js-close-library-card",
      activeClassSelector: ".active",
      contentSelector: ".js-library-card-modal-content",
    });
    libraryCardModal.init();
  }
}

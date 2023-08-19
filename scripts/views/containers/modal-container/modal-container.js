import { AbstractView } from "../../abstract-view.js";

const createModalTemplate =
  () => `<section class="popup active js-modal-wrapper">
  <div class="popup__container js-content">
      <button type="button" class="popup__close-btn js-modal-close"></button>
      <div class="popup__inner"></div>
  </div>
</section>`;

export class ModalContainer extends AbstractView {
  constructor() {
    super();
    this._handler = {};
  }

  getTemplate() {
    return createModalTemplate();
  }

  getModalContainer() {
    return this.getElement().querySelector(`.popup__inner`);
  }

  _closeModalClickHandler = (evt) => {
    if (
      evt.target.classList.contains("js-modal-wrapper") ||
      evt.target.classList.contains("js-modal-close")
    ) {
      evt.stopPropagation();
      evt.preventDefault();

      this._handler.click();
      document.body.style.paddingRight = "0";
    }
  };

  setCloseModalClickHandler(handler) {
    this._handler.click = handler;
    this.getElement().addEventListener(`click`, this._closeModalClickHandler);
  }
}

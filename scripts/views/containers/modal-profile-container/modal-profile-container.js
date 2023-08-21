import { AbstractView } from "../../abstract-view.js";

const createModalProfileTemplate = () => {
  return `
    <section class="popup active js-modal-wrapper">
      <div class="js-profile-modal-content"></div>
  </section>
  `;
};

export class ModalProfileContainer extends AbstractView {
  constructor() {
    super();
    this._handler = {};
  }

  getTemplate() {
    return createModalProfileTemplate();
  }

  getModalContainer() {
    return this.getElement().querySelector(`.js-profile-modal-content`);
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

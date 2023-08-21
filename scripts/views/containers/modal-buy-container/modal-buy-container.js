import { AbstractView } from "../../abstract-view.js";

const createModalTemplate =
  () => `<section class="popup active js-modal-wrapper">
    <div class="buy js-content">
        <h3 class="buy__heading">Buy a library card</h3>
        <button class="buy__close-btn js-modal-close"></button>
        <div class="buy__inner">
          <div class="buy__form js-buy-form">
            <span class="buy__price">$ 25.00</span></div>
          <div class="js-buy-aside"></div>
        </div>
    </div>
</section>`;

export class ModalBuyContainer extends AbstractView {
  constructor() {
    super();
    this._handler = {};
  }

  getTemplate() {
    return createModalTemplate();
  }

  getModalFormContainer() {
    return this.getElement().querySelector(`.js-buy-form`);
  }

  getModalAsideContainer() {
    return this.getElement().querySelector(`.js-buy-aside`);
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

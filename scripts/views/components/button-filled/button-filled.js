import { SmartView } from "../../smart.js";
import { State } from "../../../const.js";

const addDisabledProperty = (isDisabled) => {
  return isDisabled ? `disabled` : ``;
};

const createButtonTemplate = (title, { isDisabled }) => {
  return `
    <button class="form-popup__button button js-button" ${addDisabledProperty(
      isDisabled
    )}>
      ${title}
    </button>
  `;
};

export class ButtonFilledView extends SmartView {
  constructor(title, isDisabled) {
    super();

    this._title = title;
    this._state = { isDisabled };
    this._handler = {};
    // this._client = client;
  }

  _clickHandler = (evt) => {
    evt.preventDefault();

    this._handler.click();
  };

  getTemplate() {
    return createButtonTemplate(this._title, this._state);
  }

  restoreHandlers() {
    this.setClickHandler(this._handler.click);
  }

  setClickHandler(handler) {
    this._handler.click = handler;

    this.getElement()
      .parentElement.querySelector(`.js-button`)
      .addEventListener(`click`, this._clickHandler);
  }

  setViewState(state) {
    const resetFormState = () => {
      this.updateData({
        // isAdding: false,
      });
    };

    switch (state) {
      case State.ADDING:
        this.updateData({
          isDisabled: true,
          // isAdding: true,
        });
        break;
      case State.ABORTING:
        resetFormState();
        break;
    }

    this.updateElement();
  }
}

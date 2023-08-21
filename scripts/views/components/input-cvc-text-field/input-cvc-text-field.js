import { AbstractView } from "../../abstract-view.js";

const isValidTemplate = (isTouched, isValid) => {
  return isTouched && !isValid ? `form-popup__input--error` : ``;
};

const isFocusedTemplate = (value) => {
  return value.trim() ? `form-popup__input--focused` : ``;
};

const inputFieldTemplate = (field) => {
  return `
    <label class="form-popup__label">
      ${field.title}
        <input data-fieldid=${
          field.id
        } class="form-popup__input form-popup__input--short js-input ${isValidTemplate(
          field.isTouched,
          field.isValid
        )} ${isFocusedTemplate(field.value)}" value="${field.value}" type="text" />
    </label>
  `;
};

export class InputCVCTextFieldView extends AbstractView {
  constructor(field) {
    super();

    this._field = field;
  }

  _changeHandler = (evt) => {
    evt.preventDefault();

    this._handler.change(evt.target.dataset.fieldid, evt.target.value);
  }

  getTemplate() {
    return inputFieldTemplate(this._field);
  }

  _setValid(evt) {
    evt.target.classList.remove(`form__input--error`);
  }

  setChangeHandler(handler) {
    this._handler.change = handler;

    const input = this.getElement().querySelector(".js-input");

    input.addEventListener(`focusout`, this._changeHandler);

    input.addEventListener(`focus`, (evt) => this._setValid(evt));
  }
}

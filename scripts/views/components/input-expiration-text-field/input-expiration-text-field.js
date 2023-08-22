import { AbstractView } from "../../abstract-view.js";

const isValidTemplate = (isTouched, isValid) => {
  return isTouched && !isValid ? `form-popup__input--error` : ``;
};

const isFocusedTemplate = (value) => {
  return value.trim() ? `form-popup__input--focused` : ``;
};

const inputFieldTemplate = (field) => {

  const [value1, value2] = field.value;

  return `
    <label class="form-popup__label">
      ${field.title}
      <div class="form-popup__block">
        <input data-fieldid=${
          field.id
        } class="form-popup__input form-popup__input--short js-input ${isValidTemplate(
    field.isTouched,
    field.isValid
  )} ${isFocusedTemplate(value1)}" value="${value1}" maxlength="2" type="text" />

        <input data-fieldid=${
          field.id
        } class="form-popup__input form-popup__input--short js-input ${isValidTemplate(
    field.isTouched,
    field.isValid
  )} ${isFocusedTemplate(value2)}" value="${value2}" maxlength="2" type="text" />

      </div>
    </label>
  `;
};

export class InputExpirationTextFieldView extends AbstractView {
  constructor(field) {
    super();

    this._field = field;
  }

  _changeHandler = (evt) => {
    evt.preventDefault();

    const values = [];
    this._inputs.forEach((input) => {
      values.push(input.value);
    });

    this._handler.change(evt.target.dataset.fieldid, values);
  };

  getTemplate() {
    return inputFieldTemplate(this._field);
  }

  _setValid(evt) {
    evt.target.classList.remove(`form__input--error`);
  }

  setChangeHandler(handler) {
    this._handler.change = handler;

    this._inputs = this.getElement().querySelectorAll(".js-input");

    this._inputs.forEach((input) =>
      input.addEventListener(`focusout`, this._changeHandler)
    );

    this._inputs.forEach((input) =>
      input.addEventListener(`focus`, (evt) => this._setValid(evt))
    );
  }
}

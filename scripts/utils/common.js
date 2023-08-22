import { MIN_PASSWORD_LENGTH } from "../const.js";

export default class {
  static addEscapeEvent(evt, action) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      action(evt);
    }
  }

  static toast(message) {
    const SHOW_TIME = 5000;
    const toastContainer = document.createElement(`div`);
    const toastItem = document.createElement(`div`);
    toastContainer.classList.add(`toast-container`);

    document.body.append(toastContainer);

    toastItem.textContent = message;
    toastItem.classList.add(`toast-item`);

    toastContainer.append(toastItem);

    setTimeout(() => {
      toastItem.remove();
    }, SHOW_TIME);
  }

  static toUpperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static getInitials(str1, str2) {
    return str1.charAt(0).toUpperCase() + str2.charAt(0).toUpperCase();
  }

  static getErrorNotFiled(title) {
    return `Ошибка: Поле "${title}" должно быть заполнено`;
  }

  static getErrorNotLengthMoreThan8(title) {
    return `Ошибка: Поле "${title}" должно быть длиной не менее ${MIN_PASSWORD_LENGTH} символов`;
  }

  static getErrorNotValidForm(title) {
    return `Ошибка: Невалидная форма "${title}"`;
  }

  static getErrorNotValueMoreThanAccountHave(title) {
    return `Ошибка: Поле "${title}" должно быть не более доступных средств на счете и больше нуля`;
  }

  static notEqualFromAndTo(title) {
    return `Ошибка: "${title}" не может быть равен исходящему счету`;
  }

  static createUUID() {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  static generateRandomHex(len) {
    let output = [];
    for (let i = 0; i < len; ++i) {
      output.push(Math.floor(Math.random() * 16).toString(16));
    }

    return output.join("").toUpperCase();
  }
}

import { AbstractView } from "../../abstract-view.js";

const modalTitleTemplate = (title) => {
  return `<h3 class="popup__heading">${title}</h3>`;
};

export class ModalTitleView extends AbstractView {
  constructor(title) {
    super();

    this._title = title;
  }

  getTemplate() {
    return modalTitleTemplate(this._title);
  }
}

import { AbstractView } from "../../abstract-view.js";

const formContainerTemplate = () => {
  return `<form class="form-popup"></form>`;
};

export class FormContainerView extends AbstractView {
  getTemplate() {
    return formContainerTemplate();
  }
}

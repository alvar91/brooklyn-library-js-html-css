import { AbstractView } from "../../abstract-view.js";

const createLoadingTemplate = () => {
  return `<div class="loader"><div class="loader__inner"></div></div>`;
};

export class LoadingView extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}

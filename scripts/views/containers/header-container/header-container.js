import { AbstractView } from "../../abstract-view.js";

const createHeaderContainerTemplate = () => {
  return `
    <header class="header js-header-container"></header>
  `;
};

export class HeaderContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createHeaderContainerTemplate();
  }
}

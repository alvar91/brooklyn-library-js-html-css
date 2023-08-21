import { AbstractView } from "../../abstract-view.js";

const createBuyAsideTemplate = () => {
  return `
    <div>
      <p class="buy__text">
        If you are live, work, attend school, or pay property taxes in New
        York State, you can get a $25 digital library card right now using
        this online form. Visitors to New York State can also use this form
        to apply for a temporary card.
      </p>
      <div class="js-buy-errors-placement"></div>
    </div>
  `;
};

export class BuyAsideView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createBuyAsideTemplate();
  }

  getAsideContainer() {
    return document.querySelector(`.js-buy-errors-placement`);
  }
}

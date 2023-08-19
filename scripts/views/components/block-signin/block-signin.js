import { AbstractView } from "../../abstract-view.js";

const createBlockSigninTemplate = () => {
  return `
    <div class="popup__block">
      <p class="popup__text">Already have an account?</p>
      <a href="#" class="popup__link js-signin">Login</a>
    </div>`;
};

export class BlockSigninView extends AbstractView {
  constructor() {
    super();
  }

  #signinHandler = (signinHandler) => {
    this.getElement()
      .querySelector(".js-signin")
      .addEventListener("click", (e) => {
        e.preventDefault();

        signinHandler();
      });
  };

  setHandlers = ({ signinHandler }) => {
    this.#signinHandler(signinHandler);
  };

  getTemplate() {
    return createBlockSigninTemplate();
  }
}

import { AbstractView } from "../../abstract-view.js";

const createBlockSignupTemplate = () => {
  return `
    <div class="popup__block">
      <p class="popup__text">Don’t have an account?</p>
      <a href="#" class="popup__link js-signup">Register</a>
    </div>`;
};

export class BlockSignupView extends AbstractView {
  constructor() {
    super();
  }

  #signupHandler = (signupHandler) => {
    this.getElement()
      .querySelector(".js-signup")
      .addEventListener("click", (e) => {
        e.preventDefault();

        signupHandler();
      });
  };

  setHandlers = ({ signupHandler }) => {
    this.#signupHandler(signupHandler);
  };

  getTemplate() {
    return createBlockSignupTemplate();
  }
}

export class Modal {
  #modal = null;
  #openActivators = null;
  #closeActivators = null;
  #activeClassSelector = null;
  #contentSelector = null;

  #body = document.querySelector("body");

  constructor({
    modalSelector,
    openModalSelector,
    closeModalSelector,
    activeClassSelector,
    contentSelector,
  }) {
    this.#modal = document.querySelector(modalSelector);
    this.#openActivators = document.querySelectorAll(openModalSelector);
    this.#closeActivators = document.querySelectorAll(closeModalSelector);
    this.#activeClassSelector = activeClassSelector.slice(1);
    this.#contentSelector = contentSelector;
  }

  #hideModal = () => {
    this.#body.style.overflow = "auto";
    this.#body.style.paddingRight = "0";
    this.#modal.classList.remove(this.#activeClassSelector);
  };

  #showModal = (event) => {
    event.preventDefault();

    const paddingOffset = window.innerWidth - this.#body.offsetWidth + "px";

    this.#body.style.paddingRight = paddingOffset;

    this.#modal.classList.add(this.#activeClassSelector);

    this.#body.style.overflow = "hidden";
  };

  #handlerActive = (event) => {
    event.preventDefault();

    if (!event.target.closest(this.#contentSelector)) {
      this.#hideModal();
    }
  };

  #addEventListeners = () => {
    this.#openActivators.forEach((openButton) => {
      openButton.addEventListener("click", (event) => {
        setTimeout(() => this.#showModal(event), 0);
      });
    });

    this.#closeActivators.forEach((closeButton) => {
      closeButton.addEventListener("click", () => this.#hideModal());
    });

    

    this.#modal.addEventListener("click", (event) =>
      this.#handlerActive(event)
    );
  };

  #initModal = () => {
    if (
      !this.#modal ||
      !this.#openActivators.length ||
      !this.#closeActivators.length ||
      !this.#activeClassSelector ||
      !this.#contentSelector
    ) {
      console.error("No necessary elements in layout for Modal");
      return;
    }

    this.#addEventListeners();
  };

  init() {
    this.#initModal();
  }
}

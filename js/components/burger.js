export class Burger {
  #burger;
  #list;

  #burgerSelector = null;
  #burgerOpenSelector = null;
  #showMobileMenuSelector = null;

  constructor({
    burgerSelector,
    burgerOpenSelector,
    showMobileMenuSelector,
    listSelector,
  }) {
    this.#burgerSelector = burgerSelector;

    this.#burgerOpenSelector = burgerOpenSelector.slice(1);
    this.#showMobileMenuSelector = showMobileMenuSelector.slice(1);

    this.#burger = document.querySelector(burgerSelector);
    this.#list = document.querySelector(listSelector);
  }

  #closeMenu = () => {
    this.#burger.classList.remove(this.#burgerOpenSelector);
    this.#list.classList.remove(this.#showMobileMenuSelector);
  };

  #openMenu = () => {
    this.#burger.classList.add(this.#burgerOpenSelector);
    this.#list.classList.add(this.#showMobileMenuSelector);
  };

  #addEventListeners = () => {
    // В случае клика вне меню, закрываем его
    document.body.addEventListener("click", ({ target }) => {
      if (
        !target.closest(this.#burgerSelector) &&
        !target.classList.contains(this.#showMobileMenuSelector)
      ) {
        this.#closeMenu();
      }
    });

    // В случае клика по бургеру, закрываем меню
    this.#burger.addEventListener("click", () => {
      if (this.#burger.classList.contains(this.#burgerOpenSelector)) {
        this.#closeMenu();
        return;
      }

      this.#openMenu();
    });

    // В случае ресайза, закрываем меню
    window.addEventListener("resize", () => {
      this.#closeMenu();
    });
  };

  #initBurger = () => {
    if (!this.#burger || !this.#list) {
      console.error("No necessary elements in layout for burger");
      return;
    }

    this.#addEventListeners();
  };

  init() {
    this.#initBurger();
  }
}

import { AbstractView } from "../../abstract-view.js";

import { BurgerTemplate } from "../../templates/burger/index.js";
import { NavTemplate } from "../../templates/nav-header/index.js";
import { ProfileTemplate } from "../../templates/profile/index.js";

const navList = [
  {
    route: "#about",
    title: "About",
  },
  {
    route: "#favorites",
    title: "Favorites",
  },
  {
    route: "#coffee-shop",
    title: "Coffee shop",
  },
  {
    route: "#contacts",
    title: "Contacts",
  },
  {
    route: "#digital-library",
    title: "Library Card",
  },
];

const createHeaderInnerTemplate = (currentAccount) => {
  return `<div class="container header__inner">
      <h1 class="header__heading">Brooklyn Public Library</h1>
        ${NavTemplate(navList)}

        ${ProfileTemplate(currentAccount)}

        ${BurgerTemplate()}
    </div>`;
};

export class HeaderInnerView extends AbstractView {
  #currentAccount;

  constructor(currentAccount) {
    super();

    this.#currentAccount = currentAccount;
  }

  #setProfileClickHandler = () => {
    const $profileContainer = this.getElement().querySelector(".js-profile");
    const $dropMenu = $profileContainer.querySelector(".js-drop-menu");

    if (!$profileContainer || !$dropMenu) {
      console.error("No necessary elements in the Drop menu Profile");
      return;
    }

    function closeDropMenu() {
      $dropMenu.classList.remove("js-drop-menu-open");
    }

    function openDropMenu() {
      $dropMenu.classList.add("js-drop-menu-open");
    }

    $profileContainer.addEventListener("click", ({ target }) => {
      if (
        !target.closest(".js-drop-menu") &&
        $dropMenu.classList.contains("js-drop-menu-open")
      ) {
        closeDropMenu();
        return;
      }

      openDropMenu();
    });

    document.body.addEventListener("click", ({ target }) => {
      if (!target.closest(".js-profile")) {
        closeDropMenu();
      }
    });

    window.addEventListener("resize", () => {
      closeDropMenu();
    });
  };

  #setBurgerClickHandler = () => {
    const $burger = this.getElement().querySelector(".js-burger-menu");
    const $list = this.getElement().querySelector(".js-nav__list");

    if (!$burger || !$list) {
      console.error("No necessary elements in the Burger");
      return;
    }

    function closeMenu() {
      $burger.classList.remove("js-burger-open");
      $list.classList.remove("show-mobile-menu");
    }

    function openMenu() {
      $burger.classList.add("js-burger-open");
      $list.classList.add("show-mobile-menu");
    }

    document.body.addEventListener("click", ({ target }) => {
      if (
        !target.closest(".js-burger-menu") &&
        !target.classList.contains("show-mobile-menu")
      ) {
        closeMenu();
      }
    });

    $burger.addEventListener("click", () => {
      if ($burger.classList.contains("js-burger-open")) {
        closeMenu();
        return;
      }

      openMenu();
    });

    window.addEventListener("resize", () => {
      closeMenu();
    });
  };

  #signupHandler = (signupHandler) => {
    const signupItem = this.getElement().querySelector(".js-signup");

    if (signupItem) {
      signupItem.addEventListener("click", (e) => {
        e.preventDefault();

        signupHandler();
      });
    }
  };

  #signinHandler = (signinHandler) => {
    const signinItem = this.getElement().querySelector(".js-signin");

    if (signinItem) {
      signinItem.addEventListener("click", (e) => {
        e.preventDefault();

        signinHandler();
      });
    }
  };

  #profileHandler = (profileHandler) => {
    const profileInItem = this.getElement().querySelector(".js-profile-in");

    if (profileInItem) {
      profileInItem.addEventListener("click", (e) => {
        e.preventDefault();

        profileHandler();
      });
    }
  };

  #logoutHandler = (logoutHandler) => {
    const logoutItem = this.getElement().querySelector(".js-logout");

    if (logoutItem) {
      logoutItem.addEventListener("click", (e) => {
        e.preventDefault();

        logoutHandler();
      });
    }
  };

  setHandlers = ({
    signupHandler,
    signinHandler,
    profileHandler,
    logoutHandler,
  }) => {
    this.#setBurgerClickHandler();

    this.#setProfileClickHandler();

    this.#signupHandler(signupHandler);
    this.#signinHandler(signinHandler);

    this.#profileHandler(profileHandler);
    this.#logoutHandler(logoutHandler);
  };

  getTemplate() {
    return createHeaderInnerTemplate(this.#currentAccount);
  }
}

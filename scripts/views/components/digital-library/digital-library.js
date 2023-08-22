import { AbstractView } from "../../abstract-view.js";

const createSubmitOrStatsTemplate = (currentAccount, currentSearchAccount) => {
  if (currentSearchAccount === null && currentAccount === null) {
    return `<button class="form__button button" type="submit">Check the card</button>`;
  }

  const { rentedBooks, visits, bonuses } = (currentSearchAccount || currentAccount) ?? {};
  const books = Object.values(rentedBooks).length;

  return `
    <ul class="form__list">
      <li class="form__item statistics">
        <span class="statistics__title">Visits</span>
        <img
          class="profile__avatar"
          src="./img/stat-profile.svg"
          alt="Иконка пользователя"
        />
        <span class="statistics__count">${visits}</span>
      </li>

      <li class="form__item statistics">
        <span class="statistics__title">Bonuses</span>
        <img
          class="profile__avatar"
          src="./img/stat-bonuses.svg"
          alt="Иконка бонусов"
        />
        <span class="statistics__count">${bonuses}</span>
      </li>

      <li class="form__item statistics">
        <span class="statistics__title">Books</span>
        <img
          class="profile__avatar"
          src="./img/stat-books.svg"
          alt="Иконка книги"
        />
        <span class="statistics__count">${books}</span>
      </li>
    </ul>`;
};

const createReaderNameTemplate = (firstName, lastName) => {
  if (firstName && lastName) return `${firstName} ${lastName}`;

  return "";
};

const createFormTemplate = (currentAccount, currentSearchAccount) => {
  const { firstName, lastName, cardNumber } = (currentSearchAccount || currentAccount) ?? {};

  return `
    <div class="digital-library__form">
    <form class="form js-form" action="#">
      <div class="form__block">
        <span class="form__title">Brooklyn Public Library</span>
        <input
          class="form__input form__input--name"
          type="text"
          name="readerName"
          placeholder="Reader's name"
          required
          ${firstName && lastName ? "disabled" : ""}
          value="${createReaderNameTemplate(firstName, lastName)}"
        />
        <input
          class="form__input form__input--card-number"
          type="text"
          name="cardNumber"
          placeholder="Card number"
          required
          ${cardNumber ? "disabled" : ""}
          value="${cardNumber || ""}"
        />
      </div>
      ${createSubmitOrStatsTemplate(currentAccount, currentSearchAccount)}
    </form>
  </div>`;
};

const createBlockTemplate = (currentAccount) => {
  if (currentAccount === null) {
    return `
      <div class="digital-library__block">
        <h3 class="digital-library__title-card">Get a reader card</h3>
        <p class="digital-library__text">
          You will be able to see a reader card after logging into<br
            class="only-tablet"
          />
          account or you can register a new account
        </p>
        <div class="digital-library__buttons">
          <button class="button js-signup">Sign Up</button>
          <button class="button js-signin">Log in</button>
        </div>
      </div>`;
  }

  return `
    <div class="digital-library__block">
      <h3 class="digital-library__title-card">Visit your profile</h3>
      <p class="digital-library__text">
        With a digital library card you get free access to the Library’s
        wide array of digital resources including e-books, databases,
        educational resources, and more.
      </p>
      <div class="digital-library__buttons">
        <button class="button js-profile-in">Profile</button>
      </div>
    </div>`;
};

const createDigitalLibraryCardTemplate = (currentAccount, currentSearchAccount) => {
  return `
    <section class="digital-library" id="digital-library">
      <div class="container">
        <h2 class="section-heading">Digital Library Cards</h2>

        <div class="digital-library__inner">
          <div class="digital-library__block">
            <h3 class="digital-library__title-form">
              Find your Library card
            </h3>
            ${createFormTemplate(currentAccount, currentSearchAccount)}
          </div>
          ${createBlockTemplate(currentAccount)}
        </div>
      </div>
    </section>`;
};

export class DigitalLibraryCardsView extends AbstractView {
  #currentAccount;
  #currentSearchAccount;

  constructor(currentAccount, currentSearchAccount) {
    super();

    this.#currentAccount = currentAccount;
    this.#currentSearchAccount = currentSearchAccount;
  }

  #signupHandler = (signupHandler) => {
    const signupItems = this.getElement().querySelectorAll(".js-signup");

    if (signupItems.length > 0) {
      signupItems.forEach((signupItem) => {
        signupItem.addEventListener("click", (e) => {
          e.preventDefault();

          signupHandler();
        });
      });
    }
  };

  #signinHandler = (signinHandler) => {
    const signinItems = this.getElement().querySelectorAll(".js-signin");

    if (signinItems.length > 0) {
      signinItems.forEach((signinItem) => {
        signinItem.addEventListener("click", (e) => {
          e.preventDefault();

          signinHandler();
        });
      });
    }
  };

  #profileHandler = (profileHandler) => {
    const profileInItems = this.getElement().querySelectorAll(".js-profile-in");

    if (profileInItems.length > 0) {
      profileInItems.forEach((profileInItem) => {
        profileInItem.addEventListener("click", (e) => {
          e.preventDefault();

          profileHandler();
        });
      });
    }
  };

  #formSubmitHandler = (formSubmitHandler) => {
    const submitItems = this.getElement().querySelectorAll(".js-form");

    if (submitItems.length > 0) {
      submitItems.forEach((submitItem) => {
        submitItem.addEventListener("submit", (e) => {
          e.preventDefault();

          const formData = new FormData(submitItem)

          const formMap = {};

          for (const [key, value] of formData.entries()) {
            if(key === "readerName") {
              const [firstName, lastName] = value.split(" ");
              formMap.firstName = firstName;
              formMap.lastName = lastName;
            } else formMap[key] = value;
          }

          formSubmitHandler(formMap);
        });
      });
    }
  };

  setHandlers = ({
    signupHandler,
    signinHandler,
    profileHandler,
    formSubmitHandler,
  }) => {
    this.#signupHandler(signupHandler);
    this.#signinHandler(signinHandler);
    this.#profileHandler(profileHandler);
    this.#formSubmitHandler(formSubmitHandler);
  };

  getTemplate() {
    return createDigitalLibraryCardTemplate(this.#currentAccount, this.#currentSearchAccount);
  }
}

import Utils from "../../../utils/common.js";

const createTitleTemplate = (currentAccount) => {
  return `title=${Utils.toUpperCaseFirstLetter(
    currentAccount?.firstName
  )}_${Utils.toUpperCaseFirstLetter(currentAccount?.lastName)}`;
};

const createInitialsTemplate = ({ firstName, lastName }) => {
  return `<div class="profile__initials">${Utils.getInitials(
    firstName,
    lastName
  )}</div>`;
};

export const ProfileTemplate = (currentAccount) => {
  return `<div class="profile js-profile">
      <button class="header__profile" ${
        currentAccount !== null ? createTitleTemplate(currentAccount) : ""
      }>
        ${
          currentAccount === null
            ? '<img class="profile__avatar" src="./img/icon-profile.svg" alt="Иконка пользователя" />'
            : createInitialsTemplate(currentAccount)
        }
      </button>

      <div class="drop-menu js-drop-menu">
          <h3 class="drop-menu__title">${
            currentAccount === null
              ? "Profile"
              : currentAccount?.cardNumber || "Номер карты неизвестен"
          }</h3>
          <ul class="drop-menu__list">
            <li class="drop-menu__item">
            ${
              currentAccount === null
                ? '<a href="#" class="drop-menu__link js-signin">Log In</a>'
                : '<a href="#" class="drop-menu__link js-profile-in">My profile</a>'
            }
            </li>
            <li class="drop-menu__item">
              ${
                currentAccount === null
                  ? '<a href="/signup" class="drop-menu__link js-signup">Register</a>'
                  : '<a href="#" class="drop-menu__link js-logout">Log Out</a>'
              }
            </li>
          </ul>
      </div>
    </div>`;
};

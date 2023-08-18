const createNavMenuTemplate = ({ route, title }) => {
  return `
        <li class="nav__item">
            <a class="link" href="${route}">${title}</a>
        </li>`;
};

export const NavTemplate = (navList) => {
  return `
    <nav class="header__nav nav">
        <ul class="nav__list js-nav__list">
        ${navList
          .map((item) => {
            return createNavMenuTemplate(item);
          })
          .join("")}
        </ul>
    </nav>`;
};

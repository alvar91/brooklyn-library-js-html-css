import { AbstractView } from "../../abstract-view.js";

const menuList = [
  {
    title: "Coffee & Tea",
    blocks: [
      {
        name: "Cold Brew Coffee",
        price: "$3",
      },
      {
        name: "French Press Pot",
        price: "$5",
      },
      {
        name: "Espresso",
        price: "$2",
      },
      {
        name: "Cappuccino",
        price: "$4",
      },
      {
        name: "Hot tea",
        price: "$2",
      },
      {
        name: "Cold tea",
        price: "$2",
      },
    ],
  },
  {
    title: "Desserts & Cakes",
    blocks: [
      {
        name: "Forest Gateau",
        price: "$16",
      },
      {
        name: "Blue Moon",
        price: "$16",
      },
      {
        name: "Truffle Cake",
        price: "$15",
      },
      {
        name: "Chocolate Cake",
        price: "$18",
      },
      {
        name: "Poet’s Dream Cake",
        price: "$16",
      },
      {
        name: "Pineapple Cake",
        price: "$14",
      },
    ],
  },
];

const MenuBlockTemplate = ({ name, price }) => {
  return `
        <ul class="menu__block">
            <li class="menu__name">${name}</li>
            <li class="menu__decor"></li>
            <li class="menu__price">${price}</li>
        </ul>`;
};

const MenuListTemplate = (menuList) => {
  return `<ul class="menu__list">
        ${menuList.map(({ title, blocks }) => {
          return `
            <li class="menu__item">
                <h3 class="menu__title">${title}</h3>
                ${blocks.map((block) => MenuBlockTemplate(block)).join("")}
            </li>`;
        }).join("")}
    </ul>`;
};

const createAboutTemplate = (menuList) => {
  return `
    <section class="coffee-shop" id="coffee-shop">
        <div class="container">
            <h2 class="section-heading">Coffee shop</h2>
            <p class="coffee-shop__text">
                In our library, we have of cozy coffee shop, welcoming in customers
                with frothy cappuccinos and friendly conversation. You can get a
                favorite book and read in coffee shop. our barista to cook you best
                coffee, and also you can try desserts from bakery.
            </p>
            <div class="coffee-shop__menu menu">
                ${MenuListTemplate(menuList)}
            </div>
        </div>
    </section>`;
};

export class CoffeeShopView extends AbstractView {
  #menuList = menuList;

  constructor() {
    super();
  }

  getTemplate() {
    return createAboutTemplate(this.#menuList);
  }
}

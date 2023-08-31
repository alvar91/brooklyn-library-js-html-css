import Utils from "./utils/common.js";

const STORE_PREFIX = `library-localstorage`;
const STORE_VER = `v1`;
export const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`,
};

export const UserAction = {
  ADD_NEW_ACCOUNT: `ADD_NEW_ACCOUNT`,
  GET_ACCOUNT: `GET_ACCOUNT`,
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MINOR_FORM: `MINOR_FORM`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
};

export const State = {
  ADDING: `ADDING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`,
};

export const ModalTitle = {
  signup: "Register",
  signin: "Login",
  profile: "My profile",
  buy: "Buy a library card",
};

export const FORM = {
  inputText: "inputText",
  inputPassword: "inputPassword",
  inputNumber: "inputNumber",
  expirationCode: "expirationCode",
  CVC: "CVC",
};

export const MODE = {
  signup: "signup",
  signin: "signin",
  logout: "logout",
  profile: "profile",
  buy: "buy",
};

export const ButtonTitle = {
  signup: "Sign Up",
  signin: "Log In",
  buy: "Buy",
};

// Validation forms
export const MIN_PASSWORD_LENGTH = 8;
export const READER_CARD_LENGTH = 9;
export const CARD_NUMBER_LENGTH = 9;
export const BANK_CARD_NUMBER_LENGTH = 16;
export const CVC_LENGTH = 3;
export const EXPIRATION_LENGTH = 2;

// Consts
export const TIME_DELAY_IN_MS = 10 * 1000;

export const FieldTitle = {
  firstName: "First name",
  lastName: "Last name",
  email: "E-mail",
  emailOrReaderCard: "E-mail or readers card",
  password: "Password",
  bankCardNumber: "Bank card number",
  expirationCode: "Expiration code",
  CVC: "CVC",
  cardholderName: "Cardholder name",
  postalCode: "Postal code",
  city: "City / Town",
};

export const FieldName = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  emailOrReaderCard: "emailOrReaderCard",
  password: "password",
  bankCardNumber: "bankCardNumber",
  expirationCode: "expirationCode",
  CVC: "CVC",
  cardholderName: "cardholderName",
  postalCode: "postalCode",
  city: "city",
};

export const ValidationType = {
  notEmpty: "notEmpty",
  isLengthMoreThan8: "isLengthMoreThan8",
  isEmail: "isEmail",
  isEmailOrReaderCard: "isEmailOrReaderCard",
  isBankCardNumber: "isBankCardNumber",
  isExpirationCode: "isExpirationCode",
  CVC: "CVC"
};

export const InitiateSignupFormsFields = () => {
  return [
    {
      id: `${Utils.createUUID()}`,
      type: FORM.inputText,
      title: FieldTitle.firstName,
      name: FieldName.firstName,
      value: "",
      required: true,
      validation: {
        [ValidationType.notEmpty]: Utils.getErrorNotFiled(FieldTitle.firstName),
      },
      isValid: false,
      isTouched: false,
    },
    {
      id: `${Utils.createUUID()}`,
      type: FORM.inputText,
      title: FieldTitle.lastName,
      name: FieldName.lastName,
      value: "",
      required: true,
      validation: {
        [ValidationType.notEmpty]: Utils.getErrorNotFiled(FieldTitle.lastName),
      },
      isValid: false,
      isTouched: false,
    },
    {
      id: `${Utils.createUUID()}`,
      type: FORM.inputText,
      title: FieldTitle.email,
      name: FieldName.email,
      value: "",
      required: true,
      validation: {
        [ValidationType.notEmpty]: Utils.getErrorNotFiled(FieldTitle.email),
        [ValidationType.isEmail]: Utils.getErrorNotValidForm(FieldTitle.email),
      },
      isValid: false,
      isTouched: false,
    },
    {
      id: `${Utils.createUUID()}`,
      type: FORM.inputPassword,
      title: FieldTitle.password,
      name: FieldName.password,
      value: "",
      required: true,
      validation: {
        [ValidationType.notEmpty]: Utils.getErrorNotFiled(FieldTitle.password),
        [ValidationType.isLengthMoreThan8]: Utils.getErrorNotLengthMoreThan8(
          FieldTitle.password
        ),
      },
      isValid: false,
      isTouched: false,
    },
  ];
};

export const InitiateSigninFormsFields = () => {
  return [
    {
      id: `${Utils.createUUID()}`,
      type: FORM.inputText,
      title: FieldTitle.emailOrReaderCard,
      name: FieldName.emailOrReaderCard,
      value: "",
      required: true,
      validation: {
        [ValidationType.notEmpty]: Utils.getErrorNotFiled(
          FieldTitle.emailOrReaderCard
        ),
      },
      isValid: false,
      isTouched: false,
    },
    {
      id: `${Utils.createUUID()}`,
      type: FORM.inputPassword,
      title: FieldTitle.password,
      name: FieldName.password,
      value: "",
      required: true,
      validation: {
        [ValidationType.notEmpty]: Utils.getErrorNotFiled(FieldTitle.password),
        [ValidationType.isLengthMoreThan8]: Utils.getErrorNotLengthMoreThan8(
          FieldTitle.password
        ),
      },
      isValid: false,
      isTouched: false,
    },
  ];
};

export const InitiateBuyFormsFields = () => {
  return [
    {
      id: `${Utils.createUUID()}`,
      type: FORM.inputText,
      title: FieldTitle.bankCardNumber,
      name: FieldName.bankCardNumber,
      value: "",
      required: true,
      validation: {
        [ValidationType.notEmpty]: Utils.getErrorNotFiled(
          FieldTitle.bankCardNumber
        ),
        [ValidationType.isBankCardNumber]: Utils.getErrorNotValidForm(
          FieldTitle.bankCardNumber
        ),
      },
      isValid: false,
      isTouched: false,
    },
    {
      id: `${Utils.createUUID()}`,
      type: FORM.expirationCode,
      title: FieldTitle.expirationCode,
      name: FieldName.expirationCode,
      value: ["", ""],
      required: true,
      validation: {
        [ValidationType.notEmpty]: Utils.getErrorNotFiled(
          FieldTitle.expirationCode
        ),
        [ValidationType.isExpirationCode]: Utils.getErrorNotValidForm(
          FieldTitle.expirationCode
        ),
      },
      isValid: false,
      isTouched: false,
    },
    {
      id: `${Utils.createUUID()}`,
      type: FORM.CVC,
      title: FieldTitle.CVC,
      name: FieldName.CVC,
      value: "",
      required: true,
      validation: {
        [ValidationType.notEmpty]: Utils.getErrorNotFiled(
          FieldTitle.CVC
        ),
        [ValidationType.CVC]: Utils.getErrorNotValidForm(
          FieldTitle.CVC
        ),
      },
      isValid: false,
      isTouched: false,
    },
    {
      id: `${Utils.createUUID()}`,
      type: FORM.inputText,
      title: FieldTitle.cardholderName,
      name: FieldName.cardholderName,
      value: "",
      required: true,
      validation: {
        [ValidationType.notEmpty]: Utils.getErrorNotFiled(
          FieldTitle.cardholderName
        ),
      },
      isValid: false,
      isTouched: false,
    },
    {
      id: `${Utils.createUUID()}`,
      type: FORM.inputText,
      title: FieldTitle.postalCode,
      name: FieldName.postalCode,
      value: "",
      required: true,
      validation: {
        [ValidationType.notEmpty]: Utils.getErrorNotFiled(
          FieldTitle.postalCode
        ),
      },
      isValid: false,
      isTouched: false,
    },
    {
      id: `${Utils.createUUID()}`,
      type: FORM.inputText,
      title: FieldTitle.city,
      name: FieldName.city,
      value: "",
      required: true,
      validation: {
        [ValidationType.notEmpty]: Utils.getErrorNotFiled(
          FieldTitle.city
        ),
      },
      isValid: false,
      isTouched: false,
    },
  ];
};

const initiateBooks = {
  winter: [
    {
      id: 1,
      title: "Staff Picks",
      name: "The Book Eaters",
      author: "Sunyi Dean",
      description:
        "An Unusual Sci-Fi Story About A Book Eater Woman Who Tries Desperately To Save Her Dangerous Mind-Eater Son From Tradition And Certain Death. Complete With Dysfunctional Family Values, Light Sapphic Romance, And A Strong, Complex Protagonist. Not For The Faint Of Heart.",
      imgSrc: "img/book-eaters",
    },
    {
      id: 2,
      title: "Staff Picks",
      name: "Cackle",
      author: "Rachel Harrison",
      description:
        "Are Your Halloween Movies Of Choice The Witches Of Eastwick And Practical Magic? Look No Further Than Here - Where A Woman Recovering From A Breakup Moves To A Quaint Town In Upstate New York And Befriends A Beautiful Witch.",
      imgSrc: "img/cackle",
    },
    {
      id: 3,
      title: "Staff Picks",
      name: "Dante: Poet of the Secular World",
      author: "Erich Auerbach",
      description:
        "Auerbach's Engaging Book Places The 'Comedy' Within The Tradition Of Epic, Tragedy, And Philosophy In General, Arguing For Dante's Uniqueness As One Who Raised The Individual And His Drama Of Soul Into Something Of Divine Significance—An Inspired Introduction To Dante's Main Themes.",
      imgSrc: "img/dante",
    },
    {
      id: 4,
      title: "Staff Picks",
      name: "The Last Queen",
      author: "Clive Irving",
      description:
        "A Timely And Revelatory New Biography Of Queen Elizabeth (And Her Family) Exploring How The Windsors Have Evolved And Thrived As The Modern World Has Changed Around Them.",
      imgSrc: "img/last-queen",
    },
  ],
  spring: [
    {
      id: 5,
      title: "Staff Picks",
      name: "The Body",
      author: "Stephen King",
      description:
        "Powerful Novel That Takes You Back To A Nostalgic Time, Exploring Both The Beauty And Danger And Loss Of Innocence That Is Youth.",
      imgSrc: "img/body",
    },
    {
      id: 6,
      title: "Staff Picks",
      name: "Carry: A Memoir of Survival on Stolen Land",
      author: "Toni Jenson",
      description:
        "This Memoir About The Author's Relationship With Gun Violence Feels Both Expansive And Intimate, Resulting In A Lyrical Indictment Of The Way Things Are.",
      imgSrc: "img/carry",
    },
    {
      id: 7,
      title: "Staff Picks",
      name: "Days of Distraction",
      author: "Alexandra Chang",
      description:
        "A Sardonic View Of Silicon Valley Culture, A Meditation On Race, And A Journal Of Displacement And Belonging, All In One Form-Defying Package Of Spare Prose.",
      imgSrc: "img/distraction",
    },
    {
      id: 8,
      title: "Staff Picks",
      name: "Dominicana",
      author: "Angie Cruz",
      description:
        "A Fascinating Story Of A Teenage Girl Who Marries A Man Twice Her Age With The Promise To Bring Her To America. Her Marriage Is An Opportunity For Her Family To Eventually Immigrate. For Fans Of Isabel Allende And Julia Alvarez.",
      imgSrc: "img/dominicana",
    },
  ],
  summer: [
    {
      id: 9,
      title: "Staff Picks",
      name: "Crude: A Memoir",
      author: "Pablo Fajardo & ​​Sophie Tardy-Joubert",
      description:
        "Drawing And Color By Damien Roudeau | This Book Illustrates The Struggles Of A Group Of Indigenous Ecuadoreans As They Try To Sue The ChevronTexaco Company For Damage Their Oil Fields Did To The Amazon And Her People",
      imgSrc: "img/crude",
    },
    {
      id: 10,
      title: "Staff Picks",
      name: "Let My People Go Surfing",
      author: "Yvon Chouinard",
      description:
        "Chouinard—Climber, Businessman, Environmentalist—Shares Tales Of Courage And Persistence From His Experience Of Founding And Leading Patagonia, Inc. Full Title: Let My People Go Surfing: The Education Of A Reluctant Businessman, Including 10 More Years Of Business Unusual.",
      imgSrc: "img/surfing",
    },
    {
      id: 11,
      title: "Staff Picks",
      name: "The Octopus Museum: Poems",
      author: "Brenda Shaughnessy",
      description:
        "This Collection Of Bold And Scathingly Beautiful Feminist Poems Imagines What Comes After Our Current Age Of Environmental Destruction, Racism, Sexism, And Divisive Politics.",
      imgSrc: "img/octopus",
    },
    {
      id: 12,
      title: "Staff Picks",
      name: "Shark Dialogues: A Novel",
      author: "Kiana Davenport",
      description:
        "An Epic Saga Of Seven Generations Of One Family Encompasses The Tumultuous History Of Hawaii As A Hawaiian Woman Gathers Her Four Granddaughters Together In An Erotic Tale Of Villains And Dreamers, Queens And Revolutionaries, Lepers And Healers.",
      imgSrc: "img/shark",
    },
  ],
  autumn: [
    {
      id: 13,
      title: "Staff Picks",
      name: "Casual Conversation",
      author: "Renia White",
      description:
        "White's Impressive Debut Collection Takes Readers Through And Beyond The Concepts Of Conversation And The Casual - Both What We Say To Each Other And What We Don't, Examining The Possibilities Around How We Construct And Communicate Identity.",
      imgSrc: "img/conversation",
    },
    {
      id: 14,
      title: "Staff Picks",
      name: "The Great Fire",
      author: "Lou Ureneck",
      description:
        "The Harrowing Story Of An Ordinary American And A Principled Naval Officer Who, Horrified By The Burning Of Smyrna, Led An Extraordinary Rescue Effort That Saved A Quarter Of A Million Refugees From The Armenian Genocide",
      imgSrc: "img/fire",
    },
    {
      id: 15,
      title: "Staff Picks",
      name: "Rickey: The Life and Legend",
      author: "Howard Bryant",
      description:
        "With The Fall Rolling Around, One Can't Help But Think Of Baseball's Postseason Coming Up! And What Better Way To Prepare For It Than Reading The Biography Of One Of The Game's All-Time Greatest Performers, The Man Of Steal, Rickey Henderson?",
      imgSrc: "img/rickey",
    },
    {
      id: 16,
      title: "Staff Picks",
      name: "Slug: And Other Stories",
      author: "Megan Milks",
      description:
        "Exes Tegan And Sara Find Themselves Chained Together By Hairballs Of Codependency. A Father And Child Experience The Shared Trauma Of Giving Birth To Gods From Their Wounds.",
      imgSrc: "img/slug",
    },
  ],
};

// Store
export const InitialStoreStructure = {
  accounts: {},
  books: initiateBooks,
};

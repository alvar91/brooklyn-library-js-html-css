import {
  ValidationType,
  READER_CARD_LENGTH,
  MIN_PASSWORD_LENGTH,
  BANK_CARD_NUMBER_LENGTH,
  CVC_LENGTH,
  EXPIRATION_LENGTH,
} from "../const.js";

const isNotEmpty = ({ value }) => {
  if (Array.isArray(value)) {
    return value.every((item) => !!item.trim());
  }

  return !!value.trim();
};

const isEmail = ({ value }) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(value);
};

const isReaderCard = ({ value }) => {
  return `${value}`.length === READER_CARD_LENGTH;
};

const isLengthMoreThan8 = ({ value }) => {
  return `${value}`.length >= MIN_PASSWORD_LENGTH;
};

const isBankCardNumber = ({ value }) => {
  if (value.length !== BANK_CARD_NUMBER_LENGTH) return false;

  return [...value].every((item) => Number.isInteger(+item));
};

const isExpirationCode = ({ value }) => {
  const [value1, value2] = value;
  if (
    value1.length !== EXPIRATION_LENGTH ||
    value2.length !== EXPIRATION_LENGTH
  )
    return false;

  return (
    [...value1].every((item) => Number.isInteger(+item)) &&
    [...value2].every((item) => Number.isInteger(+item))
  );
};

const isCVC = ({ value }) => {
  if (value.length !== CVC_LENGTH) return false;

  return [...value].every((item) => Number.isInteger(+item));
};

export const validationMethods = (method, field) => {
  switch (method) {
    case ValidationType.notEmpty:
      return isNotEmpty(field);
    case ValidationType.isEmail:
      return isEmail(field);
    case ValidationType.isEmailOrReaderCard:
      return isEmail(field) || isReaderCard(field);
    case ValidationType.isLengthMoreThan8:
      return isLengthMoreThan8(field);
    case ValidationType.isExpirationCode:
      return isExpirationCode(field);
    case ValidationType.isBankCardNumber:
      return isBankCardNumber(field);
    case ValidationType.CVC:
      return isCVC(field);
    default:
      break;
  }
};

const allowSymbols = /^[а-яА-ЯёЁa-zA-Z0-9]+$/g;

export const formatInput = (field) => {
  field = field
    .split("")
    .filter((char) => char.match(allowSymbols) !== null)
    .join("")
    .trim()
    .toLowerCase()
    .replace(/^-+/g, "")
    .replace(/-+$/g, "")
    .replace(/ +(?= )/g, "")
    .replace(/-+/g, "-");

  return field;
};

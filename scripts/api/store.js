import { InitialStoreStructure } from "../const.js";

export default class Store {
  constructor(storeKey, storage) {
    this._storage = storage;
    this._storeKey = storeKey;

    this._initiateStoreStructure();
  }

  _initiateStoreStructure = () => {
    const isStorageExist = !!this._storage[this._storeKey];

    if (!isStorageExist) {
      this.setItems(InitialStoreStructure);
    }
  };

  getItems = () => {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  };

  getItem = ({ key, subKey }) => {
    const store = this.getItems();

    if (store[key] && store[key][subKey]) {
      return store[key][subKey];
    }

    if (store[key]) {
      return store[key];
    }

    throw new Error(`Key storage non exist`);
  };

  setItem = ({ key, subKey, subKey2, value }) => {
    const store = this.getItems();

    if (store[key] && subKey && subKey2) {
      store[key][subKey][subKey2] = value;

    } else if (store[key] && subKey) {
      store[key][subKey] = value;

    } else {
      store[key] = value;
    }

    this._storage.setItem(this._storeKey, JSON.stringify(store));
  };

  setItems = (items) => {
    this._storage.setItem(this._storeKey, JSON.stringify(items));
  };

  resetStorage = () => {
    this.setItems(InitialStoreStructure);
  };

  concatItem({ key, value }) {
    const currentData = this.getItem({ key });

    const newData = [].concat(currentData);

    if (newData.includes(value)) {
      return newData;
    }

    newData.push(value);

    return newData;
  }
}

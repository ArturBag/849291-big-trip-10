import {MENU_ITEMS} from '../const.js';
import {createElement} from '../utils.js';

export default class Menu {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    const createMenu = () => {

      const menuItemsData = MENU_ITEMS;

      const tripTabs = menuItemsData.map((it) => {
        const isActive = it.isActive ? `trip-tabs__btn--active` : ``;
        return `<a class="trip-tabs__btn ${isActive}" href="#">${it.itemName}</a>`;
      }).join(``);

      return `<nav class="trip-controls__trip-tabs  trip-tabs">${tripTabs}</nav>`;
    };

    return createMenu();
  }
}

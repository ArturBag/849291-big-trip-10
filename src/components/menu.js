import {MENU_ITEMS} from '../const.js';
import AbstractComponent from './abstract-component.js';
export default class Menu extends AbstractComponent {

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

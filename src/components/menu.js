import {MENU_ITEMS} from '../const.js';

export const createMenu = () => {

  const menuItemsData = MENU_ITEMS;

  const tripTabs = menuItemsData.map((it) => {
    const isActive = it.isActive ? `trip-tabs__btn--active` : ``;
    return `<a class="trip-tabs__btn ${isActive}" href="#">${it.itemName}</a>`;
  }).join(``);

  return `<nav class="trip-controls__trip-tabs  trip-tabs">${tripTabs}</nav>`;
};


import {MENU_ITEMS} from '../const.js';

export const createMenu = () => {

  const menuItemsData = MENU_ITEMS;
  let tripTabs = ``;

  menuItemsData.forEach((it) => {
    const isActive = it.isActive ? `trip-tabs__btn--active` : ``;

    tripTabs +=
      `<a class="trip-tabs__btn ${isActive}" href="#">${it.itemName}</a>`;

  });

  return `<nav class="trip-controls__trip-tabs  trip-tabs">${tripTabs}</nav>`;
};


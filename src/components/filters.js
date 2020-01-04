import {FILTER_ITEMS} from '../const.js';
import AbstractComponent from './abstract-component.js';

export default class Filters extends AbstractComponent {

  getTemplate() {

    const filterItemsData = FILTER_ITEMS;
    const filterTabs = filterItemsData.map((it) => {
      const isChecked = it.isChecked ? `checked` : ``;
      return `<div class="trip-filters__filter">
          <input id="${it.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${isChecked}>
          <label class="trip-filters__filter-label" for="filter-everything">${it.filterName}</label>
          </div>`;
    }).join(``);

    return `<form class="trip-filters" action="#" method="get">${filterTabs}</form>`;

  }
}

import {FILTER_ITEMS} from '../const.js';
import {createElement} from '../utils.js';

export default class Filters {
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
    const createFilters = () => {

      const filterItemsData = FILTER_ITEMS;
      const filterTabs = filterItemsData.map((it) => {
        const isChecked = it.isChecked ? `checked` : ``;
        return `<div class="trip-filters__filter">
          <input id="${it.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${isChecked}>
          <label class="trip-filters__filter-label" for="filter-everything">${it.filterName}</label>
          </div>`;
      }).join(``);

      return `<form class="trip-filters" action="#" method="get">${filterTabs}</form>`;
    };

    return createFilters();
  }
}

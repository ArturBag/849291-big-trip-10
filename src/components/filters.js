// import { filterTypes } from '../const.js';
// import AbstractSmartComponent from './abstract-smart-component.js';
import AbstractComponent from './abstract-component.js';

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();

    this.filters = filters;
    this._setFilterChangeHandler = null;
  }

  // recoveryListeners() {
  //   this.setFilterChangeHandler(this._closeFormHandler);
  // }

  // rerender() {
  //   super.rerender();
  // }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, handler);
    this._setFilterChangeHandler = handler;
    // this.rerender();
  }

  getTemplate() {

    const filterTabs = this.filters.map((it) => {

      const isChecked = it.checked ? `checked` : ``;
      return `<div class="trip-filters__filter">
          <input id="${it.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${it.name.toLowerCase()}" ${isChecked}>
          <label class="trip-filters__filter-label" for="${it.id}">${it.name}</label>
          </div>`;
    }).join(``);


    return `<form class="trip-filters" action="#" method="get">${filterTabs}</form>`;

  }

}

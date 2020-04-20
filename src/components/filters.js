// import { filterTypes } from '../const.js';
import AbstractComponent from './abstract-component.js';

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();

    this.filters = filters;
    // console.log(this.filters)
  }

  // setFilterChangeHandler(onFilterChange) {
  //   this.getElement().addEventListener(`change`, (evt) => {
  //     const filterId = evt.target.id;
  //     // console.log(evt.target.id);
  //     onFilterChange(filterId);

  //   });

  // }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      handler(evt);

    });

  }

  getTemplate() {

    const filterTabs = this.filters.map((it) => {
      // console.log(it)
      const isChecked = it.checked ? `checked` : ``;
      return `<div class="trip-filters__filter">
          <input id="${it.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${it.name.toLowerCase()}" ${isChecked}>
          <label class="trip-filters__filter-label" for="${it.id}">${it.name}</label>
          </div>`;
    }).join(``);


    return `<form class="trip-filters" action="#" method="get">${filterTabs}</form>`;

  }

}

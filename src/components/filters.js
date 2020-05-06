import {filterTypes} from '../const.js';
import AbstractComponent from './abstract-component.js';

export default class Filters extends AbstractComponent {
  // constructor(filters) {
  //   super();

  //   this._filters = filters;
  // }

  getTemplate() {

    const filters = Object.values(filterTypes).map((filterId) => {
      const id = `filter-${filterId.name.toLocaleLowerCase()}`;

      return {
        id,
        name: filterId.name,
        checked: filterId.name === this._activeFilterType
      };
    });

    const filterTabs = filters.map((it) => {
      // console.log(it)
      const isChecked = it.checked ? `checked` : ``;
      return `<div class="trip-filters__filter">
          <input id="${it.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${it.name.toLowerCase()}" ${isChecked}>
          <label class="trip-filters__filter-label" for="${it.id}">${it.name}</label>
          </div>`;
    }).join(``);


    return `<form class="trip-filters" action="#" method="get">${filterTabs}</form>`;

    // // const filterItemsData = filterTypes.;
    // const filterTabs = filterItemsData.map((it) => {
    //   const isChecked = it.isChecked ? `checked` : ``;
    //   return `<div class="trip-filters__filter">
    //       <input id="${it.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${isChecked}>
    //       <label class="trip-filters__filter-label" for="filter-everything">${it.filterName}</label>
    //       </div>`;
    // }).join(``);

    // return `<form class="trip-filters" action="#" method="get">${filterTabs}</form>`;

  }
}

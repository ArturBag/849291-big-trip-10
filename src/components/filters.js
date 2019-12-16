import {FILTER_ITEMS} from '../const.js';

export const createFilters = () => {

  const filterItemsData = FILTER_ITEMS;
  let filterTabs = ``;

  filterItemsData.forEach((it) => {
    const isChecked = it.isChecked ? `checked` : ``;
    filterTabs +=
      `<div class="trip-filters__filter">
    <input id="${it.id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${isChecked}>
    <label class="trip-filters__filter-label" for="filter-everything">${it.filterName}</label>
    </div>`;
  });

  return `<form class="trip-filters" action="#" method="get">${filterTabs}</form>`;
};

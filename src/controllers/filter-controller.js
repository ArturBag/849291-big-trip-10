import FilterComponent from '../components/filters.js';
import { render, replace, RenderPosition } from '../utils/render.js';
import { filterTypes } from '../const.js';
// import { getPointsByFilter } from '../utils/filter.js';

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._activeFilterType = filterTypes[`filter-everything`].name;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._pointsModel.setDataChangeHandler(this._onDataChange);

  }

  render() {
    const container = this._container;
    const filters = Object.values(filterTypes).map((filterId) => {
      const id = `filter-${filterId.name.toLocaleLowerCase()}`;

      return {
        id,
        name: filterId.name,
        checked: filterId.name === this._activeFilterType
      };
    });

    const oldComponent = this._filterComponent;
    // console.log(filters);
    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);
    if (oldComponent) {
      // console.log(this._filterComponent);
      replace(this._filterComponent, oldComponent);
    } else {
      // console.log(container, this._filterComponent);
      render(container, this._filterComponent.getElement(), RenderPosition.AFTEREND);
    }
  }

  _onFilterChange(filterId) {
    //  console.log(filterId)
    this._activeFilterType = filterTypes[filterId].name;
    this._pointsModel.setFilter(filterId);
    this.render(); // ?
    // console.log(this._pointsModel.getPoints(),`getPoints`)
  }

  _onDataChange() {
    this.render();
  }
}

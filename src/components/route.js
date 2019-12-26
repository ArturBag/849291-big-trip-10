import {createElement} from '../utils.js';

export default class Route {
  constructor(routeData) {
    this._element = null;

    this._routeData = routeData;
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
    const createRoute = (routeData) => {

      const tripDaysItems = routeData;
      let routeMarkup = ``;
      const cities = tripDaysItems.map((it) => it.city).join(` &mdash; `);

      routeMarkup = tripDaysItems.length > 2 ?
        `${tripDaysItems[0].city}` + ` ... ` + `${tripDaysItems[tripDaysItems.length - 1].city}` :
        cities;
      return `<div class="trip-info__main">
      <h1 class="trip-info__title">${routeMarkup}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
    </div>`;
    };

    return createRoute(this._routeData);
  }
}

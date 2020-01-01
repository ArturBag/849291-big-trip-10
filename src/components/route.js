import AbstractComponent from './abstract-component.js';

export default class Route extends AbstractComponent {
  constructor(routeData) {
    super();

    this._routeData = routeData;
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

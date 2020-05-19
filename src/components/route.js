import AbstractComponent from './abstract-component.js';
import {getDefaultEvents} from '../controllers/trip-controller.js';

export default class Route extends AbstractComponent {
  constructor(routeData) {
    super();

    this._routeData = routeData;
  }

  getTemplate() {

    const data = getDefaultEvents(this._routeData);

    const tripDaysItems = data;
    let routeMarkup = ``;
    const cities = tripDaysItems.map((it) => it.city.name).join(` &mdash; `);

    routeMarkup = tripDaysItems.length > 2 ?
      `${tripDaysItems[0].city.name}` + ` ... ` + `${tripDaysItems[tripDaysItems.length - 1].city.name}` :
      cities;

    return `<div class="trip-info__main">
      <h1 class="trip-info__title">${routeMarkup}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
    </div>`;

  }
}

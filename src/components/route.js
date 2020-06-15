import AbstractComponent from './abstract-component.js';
import {getDefaultEvents} from '../controllers/trip-controller.js';
import {MONTH_NAMES} from '../const.js';

export default class Route extends AbstractComponent {
  constructor(routeData) {
    super();

    this._routeData = routeData;
  }

  getTemplate() {

    const data = getDefaultEvents(this._routeData);

    const tripDaysItems = data;
    let destinationsMarkup = ``;

    const firstDayDate = tripDaysItems[0].startDate.getDate();
    const firstDayMonth = MONTH_NAMES.get(tripDaysItems[0].startDate.getMonth() + 1);
    const lastDayDate = tripDaysItems[tripDaysItems.length - 1].startDate.getDate();
    const lastDayMonth = MONTH_NAMES.get(tripDaysItems[tripDaysItems.length - 1].startDate.getMonth() + 1);

    const cities = tripDaysItems.map((it) => it.city).join(` &mdash; `);

    destinationsMarkup = tripDaysItems.length > 3 ?
      `${tripDaysItems[0].city}` + ` ... ` + `${tripDaysItems[tripDaysItems.length - 1].city}` :
      cities;


    return `<div class="trip-info__main">
      <h1 class="trip-info__title">${destinationsMarkup}</h1>

      <p class="trip-info__dates">${firstDayDate} ${firstDayMonth}&nbsp;&mdash;&nbsp;${lastDayDate} ${lastDayMonth}</p>
    </div>`;

  }
}

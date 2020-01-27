import AbstractComponent from './abstract-component.js';
import {formatTime, formatDay, formatMonth, formatDate, dateDiff} from '../utils/common.js';
import moment from 'moment';

export default class TripDays extends AbstractComponent {
  constructor(route, routeIndex) {
    super();

    this._route = route;
    this._routeIndex = routeIndex;

  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }

  getTemplate() {

    const {travelType, icon, prefix, city, price, options, dateData} = this._route;

    const startDate = formatDate(dateData.date_from);

    const dateStartTime = moment(dateData.date_from).format(`YYYY-MM-DDTHH:mm`);
    const dateEndTime = moment(dateData.date_to).format(`YYYY-MM-DDTHH:mm`);

    const month = formatMonth(startDate).toUpperCase();
    const day = formatDay(startDate);

    const startTime = formatTime(dateData.date_from);
    const endTime = formatTime(dateData.date_to);

    const dayCounter = this._routeIndex + 1;

    const eventDurationDays = dateDiff(dateEndTime, dateStartTime) + `D`;
    const eventDuartionHours = moment.duration(endTime, `HH:mm`).subtract(moment.duration(startTime, `HH:mm`)).hours() + `H`;
    const eventDuartionMinutes = moment.duration(endTime, `HH:mm`).subtract(moment.duration(startTime, `HH:mm`)).minutes() + `M`;

    const eventDurationTime = `${eventDurationDays} ${eventDuartionHours} ${eventDuartionMinutes}`;

    const optionsInfo = options.map((it) => {

      return `<li class="event__offer">
        <span class="event__offer-title">${it.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
       </li>`;
    }).join(``);

    return `<li class="trip-days__item  day">
     <div class="day__info">
     <span class="day__counter">${dayCounter}</span>
       <time class="day__date" datetime="2019-03-18">${day} ${month}</time>
     </div>

      <ul class="trip-events__list">
        <li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="${icon}" alt="Event type icon">
            </div>
            <h3 class="event__title">${travelType} ${prefix} ${city}</h3>

            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="${dateStartTime}">${startTime}</time>
                &mdash;
                <time class="event__end-time" datetime="${dateEndTime}">${endTime}</time>
              </p>
              <p class="event__duration">${eventDurationTime}</p>
            </div>

            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${price}</span>
            </p>

            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${optionsInfo}
            </ul>

            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
        </ul>
       </li>`;

  }
}

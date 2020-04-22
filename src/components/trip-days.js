import AbstractComponent from './abstract-component.js';
import { formatTime, formatDay, formatMonth, formatDate, getDurationTime } from '../utils/common.js';
import moment from 'moment';

export default class TripDays extends AbstractComponent {
  constructor(route, routeIndex) {
    super();

    this._route = route;
    this._routeIndex = routeIndex;
    this.getDurationTime = getDurationTime;
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }


  getTemplate() {

    const { travelType, icon, prefix, city, price, options, dateFrom, dateTo } = this._route;
// console.log(travelType,`from TripDays`);
    const durationTime = this.getDurationTime(dateFrom, dateTo);

    const startDate = formatDate(dateFrom);

    const dateStartTime = moment(dateFrom).format(`YYYY-MM-DDTHH:mm`);
    const dateTime = moment(dateFrom).format(`YYYY-MM-DD`);

    const dateEndTime = moment(dateTo).format(`YYYY-MM-DDTHH:mm`);

    const month = formatMonth(startDate).toUpperCase();
    const day = formatDay(startDate);

    const startTime = formatTime(dateFrom);
    const endTime = formatTime(dateTo);

    const dayCounter = this._routeIndex + 1;

    const eventDurationDays = `${durationTime.eventDurationDays}D`;
    const eventDuartionHours = `${durationTime.eventDuartionHours}H`;
    const eventDuartionMinutes = `${durationTime.eventDuartionMinutes}M`;

    const eventDurationTime = `${eventDurationDays} ${eventDuartionHours} ${eventDuartionMinutes}`;
    let optionsInfo = ``;
    if (options.length) {

      optionsInfo = options.map((it) => {

        return `<li class="event__offer">
          <span class="event__offer-title">${it.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
         </li>`;
      }).join(``);
    }

    return `<li class="trip-days__item  day">
     <div class="day__info">
     <span class="day__counter">${dayCounter}</span>
       <time class="day__date" datetime="${dateTime}">${day} ${month}</time>
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

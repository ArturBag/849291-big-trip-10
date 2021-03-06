import AbstractComponent from './abstract-component.js';

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

    const {type, city, price, date, options} = this._route;

    const dayCounter = this._routeIndex + 1;

    const travelType = type.travelType;
    const iconSrc = type.icon;
    const prefix = type.prefix;

    const dayInfo = date.day;
    const monthInfo = date.month.slice(0, 3).toUpperCase();
    const dateInfo = `${dayInfo} ${monthInfo}`;

    const startTime = date.startTime;
    const endTime = date.endTime;

    const eventDurationTime = date.eventDurationTime;

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
       <time class="day__date" datetime="2019-03-18">${dateInfo}</time>
     </div>

      <ul class="trip-events__list">
        <li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="${iconSrc}" alt="Event type icon">
            </div>
            <h3 class="event__title">${travelType} ${prefix} ${city}</h3>

            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
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

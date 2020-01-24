import {CITIES} from '../const.js';
import {ROUTE_POINTS_TYPES} from '../const.js';
import AbstractSmartComponent from './abstract-smart-component.js';
// import PointController from '../controllers/point-controller.js';
// import PointController from '../controllers/point-controller.js';

export default class EventForm extends AbstractSmartComponent {
  constructor(route, onDataChange) {
    super();

    this._routeData = route;
    this._onDataChange = onDataChange;

    this._subscribeOnEvents();

  }


  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    // this._applyFlatpickr();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

  }


  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`#event-favorite-1`).addEventListener(`click`, () => {
      handler();
      this.rerender();
    });
  }

  setEventDestinationHandler(handler) {
    this.getElement().querySelector(`#event-destination-1`).addEventListener(`change`, () => {
      handler();
      this.rerender();
    });

  }

  setRoutePointType(handler) {

    const eventTypes = this.getElement().querySelectorAll(`.event__type-item`);
    const transportEvents = ROUTE_POINTS_TYPES.ride;
    const stopEvents = ROUTE_POINTS_TYPES.stops;
    let chosedEventType = ``;
    let icon = ``;

    const chooseEventType = (eventsData, choosedType) => {
      return Array.from(Object.keys(eventsData)).slice().some((item) => item === choosedType);
    };

    eventTypes.forEach((it) => {
      it.addEventListener(`click`, () => {
        chosedEventType = it.querySelector(`input`).value;
        chosedEventType = chosedEventType.charAt(0).toUpperCase() + chosedEventType.substr(1);

        const isRideTypeChosed = chooseEventType(transportEvents, chosedEventType);
        const isStopTypeChosed = chooseEventType(stopEvents, chosedEventType);

        if (isRideTypeChosed) {
          icon = transportEvents[chosedEventType];
          this._routeData.prefix = `to`;

        } else if (isStopTypeChosed) {
          icon = stopEvents[chosedEventType];
          this._routeData.prefix = `in`;
        }

        this._routeData.icon = icon;
        handler(chosedEventType, icon);
        this.rerender();

      });

    });

  }

  _subscribeOnEvents() {

    this.setSubmitHandler((evt) => {
      evt.preventDefault();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this.setFavoriteClickHandler(() => {
      const newData = Object.assign({}, this._routeData, {
        isFavorite: !this._routeData.isFavorite
      });
      this._onDataChange(this._routeData, newData);
      this._routeData = newData;
    });

    this.setRoutePointType((chosedEventType, chosedIcon) => {
      const newData = Object.assign({}, this._routeData, {
        travelType: chosedEventType,
        icon: chosedIcon,
        options: this._routeData.options
      });
      this._onDataChange(this._routeData, newData);
      this._routeData = newData;

    });

    this.setEventDestinationHandler(() => {

      let iputValue = this.getElement().querySelector(`#event-destination-1`).value;

      const isDestinationExist = CITIES.some((it) => it === iputValue);

      if (isDestinationExist) {

        const newData = Object.assign({}, this._routeData, {
          city: iputValue,
          pictures: this._routeData.pictures,
          description: this._routeData.description
        });

        this._onDataChange(this._routeData, newData);
        this._routeData = newData;
      }
    });

  }

  getTemplate() {

    const travelType = this._routeData.travelType;
    const prefix = this._routeData.prefix;
    const destinationCity = this._routeData.city;
    const destinationDescription = this._routeData.description;
    const additionalOptions = this._routeData.options;
    const isFavorite = this._routeData.isFavorite;
    const isFavoriteChecked = isFavorite ? `checked` : ``;

    const eventOfferSelector = additionalOptions.map((it) => {
      const isOptionChecked = Math.random() > 0.5;
      additionalOptions.isChecked = isOptionChecked ? `checked` : ``;

      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${it.id}" type="checkbox" name="${it.name}" ${additionalOptions.isChecked}>
        <label class="event__offer-label" for="${it.id}">
          <span class="event__offer-title">${it.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
        </label>
      </div>`;
    }).join(``);

    const imageTemplate = this._routeData.pictures.map((it) => {
      return `<img class="event__photo" src="${it}" alt="Event photo">`;
    }).join(``);

    return `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
      <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="${this._routeData.icon}" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${travelType} ${prefix}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationCity}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
        <option value="Saint Petersburg"></option>
      </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
      </div>

      <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavoriteChecked}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
            <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">${eventOfferSelector}</div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destinationDescription}</p>

          <div class="event__photos-container">
          <div class="event__photos-tape">${imageTemplate}</div>
          </div>
          </section>
          </section>
      </form>`;

  }
}

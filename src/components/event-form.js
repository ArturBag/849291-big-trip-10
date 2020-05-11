import AbstractSmartComponent from './abstract-smart-component.js';
import {ROUTE_POINTS_TYPES} from '../const.js';
import {getPrefix} from '../utils/common.js';

export default class EventForm extends AbstractSmartComponent {
  constructor(route, onDataChange, mode) {
    super();
    // console.log(route)
    this._routeData = route;
    // this._onDataChange = onDataChange;
    // this._mode = mode;

    this._travelType = route.travelType;
    this._prefix = getPrefix(route.travelType);
    this._icon = route.icon;
    this._city = route.city;
    this._isFavorite = route.isFavorite;
    this._price = route.price;

    this._prefixForReset = getPrefix(route.travelType);

    this._isDestinationCityChosed = true;

    this._favoriteHandler = null;
    this._closeFormHandler = null;
    this._submitHandler = null;
    this._deleteButtonClickHandler = null;

    this._subscribeOnEvents();
  }

  recoveryListeners() {
    this.setCloseFormHandler(this._closeFormHandler);
    this.setFavoritesHandler(this._favoriteHandler);
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    // this._applyFlatpickr();
  }

  reset() {
    this._travelType = this._routeData.travelType;
    this._prefix = this._prefixForReset;
    this._icon = this._routeData.icon;
    this._city = this._routeData.city;
    this._price = this._routeData.price;
    this._isFavorite = this._routeData.isFavorite;
    this.rerender();
  }

  setFavoritesHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
    this._favoriteHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  setCloseFormHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._closeFormHandler = handler;
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  _subscribeOnEvents() {
    const eventTypes = this.getElement().querySelectorAll(`.event__type-item`);
    const cityInput = this.getElement().querySelector(`.event__input--destination`);

    const transportEvents = ROUTE_POINTS_TYPES.ride;
    const stopEvents = ROUTE_POINTS_TYPES.stops;
    let chosedEventType = ``;

    eventTypes.forEach((it) => {
      it.addEventListener(`click`, () => {
        chosedEventType = it.querySelector(`input`).value;

        chosedEventType = chosedEventType.charAt(0).toUpperCase() + chosedEventType.substr(1);

        this._prefix = getPrefix(chosedEventType);

        const isChosedEventTypeRide = Object.keys(transportEvents).find((type) => type === chosedEventType);
        const isChosedEventTypeStop = Object.keys(stopEvents).find((type) => type === chosedEventType);
        if (isChosedEventTypeRide) {

          this._icon = transportEvents[chosedEventType];
          this._travelType = chosedEventType;

        } else if (isChosedEventTypeStop) {

          this._icon = stopEvents[chosedEventType];
          this._travelType = chosedEventType;

        }
        this.rerender();


      });

    });

    cityInput.addEventListener(`change`, () => {
      this._city = cityInput.value;
      this.rerender();
    });


  }

  getTemplate() {

    if (this._mode === `adding` && this._city.length < 1) {
      this._isDestinationCityChosed = false;
    }

    const destinationCity = this._city;
    const iconName = this._icon;
    const destinationDescription = this._routeData.description;
    const additionalOptions = this._routeData.options;
    const isFavoriteChecked = this._isFavorite ? `checked` : ``;

    const dataTravelTypeName = iconName.charAt(0).toUpperCase() + iconName.substr(1);

    const buttonModeText = this._mode === `adding` ? `Cancel` : `Delete`;
    const displayCloseFormButton = this._mode === `adding` ? false : true;


    const eventOffers = additionalOptions.map((it) => {
      const isOptionChecked = additionalOptions.isChecked ? `checked` : ``;

      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${it.id}" type="checkbox" name="${it.name}" ${isOptionChecked}>
        <label class="event__offer-label" for="${it.id}">
          <span class="event__offer-title">${it.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
        </label>
      </div>`;
    }).join(``);

    const transferTypeGroup = Object.keys(ROUTE_POINTS_TYPES.ride).map((transportType) => {

      return (
        `<div class="event__type-item">
            <input id="event-type-${transportType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${transportType.toLowerCase()}">
            <label class="event__type-label  event__type-label--${transportType.toLowerCase()}" for="event-type-${transportType.toLowerCase()}">${transportType}</label>
          </div>`
      );
    }).join(` \n`);

    const activityTypeGroup = Object.keys(ROUTE_POINTS_TYPES.stops).map((stopsType) => {

      return (
        `<div class="event__type-item">
            <input id="event-type-${stopsType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${stopsType.toLowerCase()}">
            <label class="event__type-label  event__type-label--${stopsType.toLowerCase()}" for="event-type-${stopsType.toLowerCase()}-1">${stopsType}</label>
          </div>`
      );
    }).join(` \n`);

    const imageTemplate = this._routeData.pictures.map((it) => {
      return `<img class="event__photo" src="${it}" alt="Event photo">`;
    }).join(` \n`);

    return `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
    <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="${iconName}" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" data-travel-type="${dataTravelTypeName}" name="type-toggle" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${transferTypeGroup}
      </fieldset>

      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${activityTypeGroup}
      </fieldset>
    </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
    ${this._travelType} ${this._prefix}
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
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${this._firstDateValue}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">
      To
    </label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${this._lastDateValue}">
    </div>

    <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">${buttonModeText}</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavoriteChecked}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      ${displayCloseFormButton ?
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`
  : ``}
    </header>
    ${this._isDestinationCityChosed ?
  `<section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">${eventOffers}</div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destinationDescription}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">${imageTemplate}</div>
        </div>
      </section>
    </section>`
  : ``}
    </form>`;

  }
}

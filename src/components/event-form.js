import AbstractSmartComponent from './abstract-smart-component.js';
import {ROUTE_POINTS_TYPES} from '../const.js';
import {getPrefix} from '../utils/common.js';
import {Mode as PointControllerMode} from '../controllers/point-controller.js';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import 'flatpickr/dist/themes/light.css';

const parseFormData = (formData, form, mode) => {

  let isFavorite = false;
  if (mode === PointControllerMode.ADDING) {
    isFavorite = false;
  } else {
    isFavorite = form.querySelector(`.event__favorite-checkbox`).checked;
  }

  const travelType = form.querySelector(`.event__type-toggle`).dataset.travelType;
  const pictures = Array.from(form.querySelectorAll(`.event__photo`));
  const icon = ROUTE_POINTS_TYPES.ride[travelType] ? ROUTE_POINTS_TYPES.ride[travelType] : ROUTE_POINTS_TYPES.stops[travelType];
  const description = form.querySelector(`.event__destination-description`).innerText;
  const startDate = flatpickr.parseDate(formData.get(`event-start-time`), `d/m/y H:i`);
  const endDate = flatpickr.parseDate(formData.get(`event-end-time`), `d/m/y H:i`);
// console.log(pictures)

  const chosedOptions = [...form.querySelectorAll(`.event__offer-checkbox:checked`)];
  const optionsData = chosedOptions.map((it) => {
    return {
      id: it.id,
      name: it.name,
      isChecked: true,
      price: parseInt(it.parentElement.querySelector(`.event__offer-price`).textContent, 10),
      title: it.parentElement.querySelector(`.event__offer-title`).textContent,
    };
  });

  return {
    id: new Date().getUTCMilliseconds(),
    travelType,
    city: formData.get(`event-destination`),
    pictures,
    icon,
    price: formData.get(`event-price`),
    options: optionsData,
    isFavorite,
    description,
    startDate,
    endDate,
  };
};

export default class EventForm extends AbstractSmartComponent {
  constructor(route, mode) {
    super();

    this._routeData = route;
    this._mode = mode;

    this._travelType = route.travelType;
    console.log(this._travelType.toLowerCase())
    this._prefix = getPrefix(this._travelType);
    this._icon = `img/icons/${this._travelType.toLowerCase()}.png`;
    this._city = route.city.name;
    this._description = route.city.description;
    this._isFavorite = route.isFavorite;
    this._price = route.price;
    this._options = route.options;
    this._pictures = route.city.pictures;

    this._iconForReset = this._icon;
    this._prefixForReset = getPrefix(route.travelType);

    // this._travelType = route.travelType.type;
    // this._prefix = getPrefix(this._travelType);
    // this._icon = route.travelType.icon;
    // this._city = route.city.name;
    // this._description = route.city.description;
    // this._isFavorite = route.isFavorite;
    // this._price = route.price;
    // this._options = route.travelType.offers;
    // this._pictures = route.city.pictures;

    // this._prefixForReset = getPrefix(route.travelType.type);

    // this._travelType = route.travelType;
    // this._prefix = getPrefix(route.travelType);
    // this._icon = route.icon;
    // this._city = route.city;
    // this._isFavorite = route.isFavorite;
    // this._price = route.price;
    // this._options = route.options;
    // this._pictures = route.pictures;
    // // this._indexOfChosedOption = -1;

    // this._prefixForReset = getPrefix(route.travelType);

    this._isDestinationCityChosed = true;

    this._favoriteHandler = null;
    this._closeFormHandler = null;
    this._submitHandler = null;
    this._resetButtonClickHandler = null;

    this._subscribeOnEvents();

    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this._applyFlatpickr();
  }

  recoveryListeners() {
    this.setCloseFormHandler(this._closeFormHandler);
    this.setFavoritesHandler(this._favoriteHandler);
    this.setSubmitHandler(this._submitHandler);
    this.setResetButtonClickHandler(this._resetButtonClickHandler);

    this._subscribeOnEvents();
  }

  removeFlatpickr() {
    if (this._flatpickrStart && this._flatpickrEnd) {
      this._flatpickrStart.destroy();
      this._flatpickrEnd.destroy();
      this._flatpickrStart = null;
      this._flatpickrEnd = null;
    }
  }

  removeElement() {
    this.removeFlatpickr();
    super.removeElement();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return parseFormData(formData, form, this._mode);
  }

  reset() {
    this._travelType = this._routeData.travelType;
    this._prefix = this._prefixForReset;
    this._icon = this._iconForReset;
    this._city = this._routeData.city.name;
    this._price = this._routeData.price;
    this._isFavorite = this._routeData.isFavorite;
    this._options = this._routeData.options.offers;
    this._pictures = this._routeData.city.pictures;

    this.rerender();
  }

  _applyFlatpickr() {
    this.removeFlatpickr();

    const self = this;
    const startDateElement = this.getElement().querySelector(`#event-start-time-1`);
    const endDateElement = this.getElement().querySelector(`#event-end-time-1`);
    this._flatpickrStart = flatpickr(startDateElement, {
      allowInput: true,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      defaultDate: this._routeData.startDate || `today`,
      minDate: this._routeData.startDate || `today`,
      onChange(selectedDates) {
        if (self._flatpickrEnd.config._minDate < selectedDates[0]) {
          self._flatpickrEnd.setDate(selectedDates[0], false, `d/m/y H:i`);
        }
        self._flatpickrEnd.set(`minDate`, selectedDates[0]);
      }
    });

    this._flatpickrEnd = flatpickr(endDateElement, {
      allowInput: true,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      defaultDate: this._routeData.endDate || `today`,
      minDate: this._routeData.endDate || `today`,
      onChange(selectedDates) {
        self._flatpickrStart.set(`maxDate`, selectedDates[0]);
      },
    });
  }

  setFavoritesHandler(handler) {
    if (this._mode === PointControllerMode.ADDING) {
      return;
    }

    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, () => {
        this._isFavorite = !this._isFavorite;
        handler(this._isFavorite);
      });
    this._favoriteHandler = handler;
  }

  setResetButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, ()=>{
        handler(this._mode);
      });

    this._resetButtonClickHandler = handler;
  }

  setCloseFormHandler(handler) {
    if (this._mode === PointControllerMode.ADDING) {
      return;
    }
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
    const offers = this.getElement().querySelectorAll(`.event__offer-checkbox`);
    const price = this.getElement().querySelector(`#event-price-1`);


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
      if (this._city) {
        this._isDestinationCityChosed = true;
      }
      this.rerender();
    });

    offers.forEach((it)=>{
      it.addEventListener(`change`, (evt)=>{

        const chosedOffer = evt.target.value;

        const index = this._routeData.options.offers.findIndex((offer)=> offer.name === chosedOffer);

        this._routeData.options.offers[index] = Object.assign({}, this._routeData.travelType.offers[index], {
          isChecked: !this._routeData.travelType.offers[index].isChecked
        });

        this.rerender();

      });

    });

    // offers.forEach((it)=>{
    //   it.addEventListener(`change`, (evt)=>{

    //     const chosedOffer = evt.target.name;
    //     const index = this._routeData.travelType.offers.findIndex((offer)=> offer.name === chosedOffer);

    //     this._routeData.travelType.offers[index] = Object.assign({}, this._routeData.travelType.offers[index], {
    //       isChecked: !this._routeData.travelType.offers[index].isChecked
    //     });

    //     this.rerender();

    //   });

    // });

    price.addEventListener(`change`, (evt)=>{
      this._price = parseInt(evt.target.value, 10);
      this.rerender();
    });


  }

  getTemplate() {


    if (this._mode === PointControllerMode.ADDING && this._city.length < 1) {
      this._isDestinationCityChosed = false;
    }

    const destinationCity = this._city;
    const iconName = this._icon;
    const destinationDescription = this._description;
    const isFavoriteChecked = this._isFavorite ? `checked` : ``;
    const buttonModeText = this._mode === PointControllerMode.ADDING ? `Cancel` : `Delete`;
    const isCloseFormButtonDisplayed = this._mode === PointControllerMode.ADDING ? false : true;
    const isFavoriteButtonDisplayed = this._mode === PointControllerMode.ADDING ? false : true;
    const dataTravelTypeName = this._travelType;

    const additionalOptionsData = this._options;

    const travelType = this._travelType.toLowerCase();
    let offers = ``;
    let eventOffers = ``;

    const indexOfTravelType = additionalOptionsData.findIndex((it)=> it.type === travelType);

    if (indexOfTravelType === -1) {
      offers = offers;
    } else {

      offers = additionalOptionsData[indexOfTravelType].offers;

      eventOffers = offers.map((it) => {
        const isOptionChecked = it.isChecked ? `checked` : ``;


        return `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${it.id}" type="checkbox" name="${it.name}" ${isOptionChecked}>
          <label class="event__offer-label" for="${it.id}">
            <span class="event__offer-title">${it.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
          </label>
        </div>`;
      }).join(` \n`);

    }


    const imageTemplate = this._pictures.map((it) => {
      return `<img class="event__photo" src="${it.src}" alt="${it.description}">`;
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
    ${isFavoriteButtonDisplayed ?
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavoriteChecked}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>`
    : ``}

      ${isCloseFormButtonDisplayed ?
    `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`
    : ``}
    </header>
    ${this._isDestinationCityChosed ?
    `<section class="event__details">
    ${eventOffers.length > 0 ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">${eventOffers}</div>
    </section>`
    :
    ``}
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

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from 'moment';

// import { CITIES } from '../const.js';
import { ROUTE_POINTS_TYPES } from '../const.js';
import AbstractSmartComponent from './abstract-smart-component.js';


const parseFormData = (formData) => {
  // const repeatingDays = DAYS.reduce((acc, day) => {
  //   acc[day] = false;
  //   return acc;
  // }, {});
  // const date = formData.get(`date`);
  // console.log(formData.get(`event-type`))

  return {
    id: new Date().getUTCMilliseconds(),
    city: formData.get(`event-destination`),

    // description: formData.get(`text`),
    // color: formData.get(`color`),
    // tags: formData.getAll(`hashtag`),
    // dueDate: date ? new Date(date) : null,
    // repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
    //   acc[it] = true;
    //   return acc;
    // }, repeatingDays),
  };
};


export default class EventForm extends AbstractSmartComponent {
  constructor(pointController, route, onDataChange) {
    super();

    this._routeData = route;
    this._onDataChange = onDataChange;
    this._flatpickr = null;
    this._firstDateValue = `12/12/2019 10:00`;
    this._lastDateValue = `11/02/2020 13:30`;

    this._pointController = pointController;

    this._travelType = this._routeData.travelType;
    this._prefix = this._routeData.prefix;
    this._icon = this._routeData.icon;
    this._isFavorite = this._routeData.isFavorite;

    this._closeFormHandler = null;
    this._favoriteClickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
    // this._submitHandler = null;
    // console.log(this._routeData)

  }


  recoveryListeners() {
    this.setCloseFormButtonClickHandler(this._closeFormHandler);
    this.setFavoriteClickHandler(this._favoriteClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return parseFormData(formData);
  }


  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`#event-favorite-1`).addEventListener(`click`, handler);
    this._favoriteClickHandler = handler;
  }

  setEventDestinationHandler(handler) {
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`blur`, () => {
      let iputValue = this.getElement().querySelector(`.event__input--destination`).value;
      handler(iputValue);
    });

  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    // this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    // this._deleteButtonClickHandler = handler;
  }
  setCloseFormButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._closeFormHandler = handler;
  }


  _setFullDate(inputType, fullDate) {
    const firstDateInput = this.getElement().querySelector(`#event-start-time-1`);
    const lastDateInput = this.getElement().querySelector(`#event-end-time-1`);

    if (inputType === firstDateInput) {

      this._firstDateValue = fullDate;

    } else if (inputType === lastDateInput) {

      this._lastDateValue = fullDate;

    }

  }

  _applyFlatpickr() {

    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const firstDate = this.getElement().querySelector(`#event-start-time-1`);
    const lastDate = this.getElement().querySelector(`#event-end-time-1`);

    let startDateValue = this._firstDateValue;

    this._flatpickr = flatpickr(firstDate, {
      'allowInput': true,
      'enableTime': true,
      'hourIncrement': 1,
      'minuteIncrement': 5,
      'time_24hr': true,
      'defaultDate': this._routeData.dateFrom,
      'dateFormat': `d/m/Y H:i`,
      'onClose': (selectedDates, dateStr) => {
        this._setFullDate(firstDate, dateStr);
        startDateValue = dateStr;
        this._checkDateDiff(startDateValue, dateStr);
      }
    });

    this._flatpickr = flatpickr(lastDate, {
      'allowInput': true,
      'enableTime': true,
      'hourIncrement': 1,
      'minuteIncrement': 5,
      'time_24hr': true,
      'defaultDate': this._routeData.dateTo,
      'dateFormat': `d/m/Y H:i`,
      'onClose': (selectedDates, dateStr) => {

        this._setFullDate(lastDate, dateStr);
        this._checkDateDiff(startDateValue, dateStr);
      }
    });


  }

  _checkDateDiff(startDate, endDate) {

    const startDateMiliseconds = moment(startDate, `DD/MM/YYYY HH:mm`).valueOf();
    const endDateMiliseconds = moment(endDate, `DD/MM/YYYY HH:mm`).valueOf();
    const lastDateInput = this.getElement().querySelector(`#event-end-time-1`);

    if (endDateMiliseconds < startDateMiliseconds) {

      lastDateInput.style.outline = `1px solid red`;
    } else {
      lastDateInput.style.outline = `none`;
    }
  }

  _subscribeOnEvents() {
    const eventTypes = this.getElement().querySelectorAll(`.event__type-item`);
    const favoriteButton = this.getElement().querySelector(`#event-favorite-1`);

    const transportEvents = ROUTE_POINTS_TYPES.ride;
    const stopEvents = ROUTE_POINTS_TYPES.stops;
    let chosedEventType = ``;


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
          this._icon = transportEvents[chosedEventType];
          this._prefix = `to`;
          this._travelType = chosedEventType;

        } else if (isStopTypeChosed) {
          this._icon = stopEvents[chosedEventType];
          this._prefix = `in`;
          this._travelType = chosedEventType;
        }
        this.rerender();

      });

    });
    // console.log(`before`,this._isFavorite)
    favoriteButton.addEventListener(`click`, ()=>{
      this._isFavorite = !this._isFavorite;
      this.rerender();
    });
    // console.log(`after`,this._isFavorite)


  }

  // resetForm(){


  // }

  getTemplate() {

    // console.log(this._routeData, `getTemplate`)

    // const travelType = this._travelType;
    // const prefix = this._routeData.prefix;
    const destinationCity = this._routeData.city;
    const destinationDescription = this._routeData.description;
    const additionalOptions = this._routeData.options;
    // const isFavorite = this._routeData.isFavorite;
    const isFavoriteChecked = this._isFavorite ? `checked` : ``;


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

    const transferTypeGroup = Object.keys(this._routeData.eventTypeList.ride).map((it) => {

      return (`<div class="event__type-item">
                <input id="event-type-${it.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.toLowerCase()}">
                <label class="event__type-label  event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}">${it}</label>
              </div>`);
    }).join(` `);

    const activityTypeGroup = Object.keys(this._routeData.eventTypeList.stops).map((it) => {

      return (
        `<div class="event__type-item">
            <input id="event-type-${it.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.toLowerCase()}">
            <label class="event__type-label  event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}-1">${it}</label>
          </div>`
      );
    }).join(` `);


    const imageTemplate = this._routeData.pictures.map((it) => {
      return `<img class="event__photo" src="${it}" alt="Event photo">`;
    }).join(``);

    return `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
      <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="${this._icon}" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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

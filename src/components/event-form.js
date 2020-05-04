import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from 'moment';

import {getPrefix} from '../utils/common.js';
import {ROUTE_POINTS_TYPES} from '../const.js';
import AbstractSmartComponent from './abstract-smart-component.js';


const parseFormData = (formData, form, eventTypeList) => {


  const isFavorite = form.querySelector(`.event__favorite-checkbox`).checked;
  const travelType = form.querySelector(`.event__type-toggle`).dataset.travelType;
  const pictures = Array.from(form.querySelectorAll(`.event__photo`));
  const icon = ROUTE_POINTS_TYPES.ride[travelType] ? ROUTE_POINTS_TYPES.ride[travelType] : ROUTE_POINTS_TYPES.stops[travelType];

  const date= formData.get(`event-start-time`);
  console.log(date, `date`)
  // const dateTo = moment(formData.get(`event-end-time`)).toISOString();
  const dateFrom = moment(formData.get(`event-start-time`)).toISOString();
  const dateTo = moment(formData.get(`event-end-time`)).toISOString();
  console.log(dateFrom, `PARSE`)

  console.log( dateFrom, dateTo, `PARSEFORMDATA`);
  // console.log( new Date(dateFrom).toISOString(), `PARSEFORMDATA`);

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
    eventTypeList,
    city: formData.get(`event-destination`),
    pictures,
    icon,
    price: formData.get(`event-price`),
    options: optionsData,
    isFavorite,
    dateFrom,
    dateTo,
  };
};


export default class EventForm extends AbstractSmartComponent {
  constructor(pointController, route, onDataChange, mode) {
    super();

    this._routeData = route;
    this._onDataChange = onDataChange;
    this._mode = mode;

    this._flatpickr = null;

    this._firstDateValue = this._routeData.dateFrom;
    this._lastDateValue = this._routeData.dateTo;

    this._pointController = pointController;

    this._travelType = route.travelType;
    this._prefix = getPrefix(route.travelType);
    this._icon = route.icon;
    this._city = route.city;
    this._isFavorite = route.isFavorite;
    this._price = route.price;

    this._prefixForReset = getPrefix(route.travelType);
    this._eventTypesList = this._routeData.eventTypeList;

    this._isDestinationCityChosed = true;

    this._closeFormHandler = null;
    this._favoriteClickHandler = null;
    this._submitHandler = null;
    this._deleteButtonClickHandler = null;

    this._parseDatesOnStart();
    this._applyFlatpickr();
    this._subscribeOnEvents();


  }


  recoveryListeners() {
    this.setCloseFormButtonClickHandler(this._closeFormHandler);
    this.setFavoriteClickHandler(this._favoriteClickHandler);
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return parseFormData(formData, form, this._eventTypesList);
  }

  _parseDatesOnStart() {
    this._firstDateValue = moment(this._firstDateValue).format(`DD/MM/YYYY HH:mm`);
    this._lastDateValue = moment(this._lastDateValue).format(`DD/MM/YYYY HH:mm`);
  }


  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`#event-favorite-1`).addEventListener(`click`, handler);
    this._favoriteClickHandler = handler;
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }
  setCloseFormButtonClickHandler(handler) {
    if (this._mode === `adding`) {
      return;
    }
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._closeFormHandler = handler;
  }

  resetFormToDefault() {
    this._travelType = this._routeData.travelType;
    this._prefix = this._prefixForReset;
    this._icon = this._routeData.icon;
    this._city = this._routeData.city;
    this._price = this._routeData.price;
    this.rerender();
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
    const cityInput = this.getElement().querySelector(`.event__input--destination`);

    const transportEvents = ROUTE_POINTS_TYPES.ride;
    const stopEvents = ROUTE_POINTS_TYPES.stops;
    let chosedEventType = ``;

    eventTypes.forEach((it) => {
      it.addEventListener(`click`, () => {
        chosedEventType = it.querySelector(`input`).value;

        chosedEventType = chosedEventType.charAt(0).toUpperCase() + chosedEventType.substr(1);

        this._prefix = getPrefix(chosedEventType);

        if (this._prefix === `to`) {
          this._icon = transportEvents[chosedEventType];
          this._travelType = chosedEventType;

        } else if (this._prefix === `in`) {
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

  }

  getTemplate() {

    if (this._mode === `adding` && this._city.length < 1) {
      this._isDestinationCityChosed = false;
    }

    const destinationCity = this._city;
    const destinationDescription = this._routeData.description;
    const additionalOptions = this._routeData.options;
    const iconName = this._icon;

    const dataTravelTypeName = iconName.charAt(0).toUpperCase() + iconName.substr(1);

    const isFavoriteChecked = this._isFavorite ? `checked` : ``;

    const buttonModeText = this._mode === `adding` ? `Cancel` : `Delete`;
    const displayCloseFormButton = this._mode === `adding` ? false : true;

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


    const transferTypeGroup = Object.keys(this._eventTypesList.ride).map((it) => {

      return (`<div class="event__type-item">
                <input id="event-type-${it.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.toLowerCase()}">
                <label class="event__type-label  event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}">${it}</label>
              </div>`);
    }).join(` `);

    const activityTypeGroup = Object.keys(this._eventTypesList.stops).map((it) => {

      return (
        `<div class="event__type-item">
            <input id="event-type-${it.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it.toLowerCase()}">
            <label class="event__type-label  event__type-label--${it.toLowerCase()}" for="event-type-${it.toLowerCase()}-1">${it}</label>
          </div>`
      );
    }).join(` `);


    const imageTemplate = this._routeData.pictures.map((it) => {
      return `<img class="event__photo" src="${it}" alt="Event photo">`;
    }).join(` \n`);

    return `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
      <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${iconName}.png" alt="Event type ${iconName}">
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
          <div class="event__available-offers">${eventOfferSelector}</div>
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

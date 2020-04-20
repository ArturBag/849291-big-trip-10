import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import moment from 'moment';

import { CITIES } from '../const.js';
import { ROUTE_POINTS_TYPES } from '../const.js';
import AbstractSmartComponent from './abstract-smart-component.js';


export default class AddPointForm extends AbstractSmartComponent {
  constructor(pointController, route, onDataChange) {

    super();

    this._routeData = route;
    this._onDataChange = onDataChange;
    this._flatpickr = null;
    this._firstDateValue = `18/03/19 00:00`;
    this._lastDateValue = `18/03/19 00:00`;

    this._pointController = pointController;
// console.log(`this._routeData`, this._routeData);
    this._applyFlatpickr();
    this._subscribeOnEvents();

  }


  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

  }


  // setFavoriteClickHandler(handler) {
  //   this.getElement().querySelector(`#event-favorite-1`).addEventListener(`click`, () => {
  //     handler();
  //   });
  // }

  setEventDestinationHandler(handler) {
    this.getElement().querySelector(`#event-destination-1`).addEventListener(`change`, () => {
      handler();
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
// console.log(this._routeData)
      });

    });

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

      lastDateInput.style.background = `red`;
    } else {
      lastDateInput.style.background = `none`;
    }
  }

  _subscribeOnEvents() {

    this.setSubmitHandler((evt) => {
      evt.preventDefault();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this.setRoutePointType((chosedEventType, chosedIcon) => {
      console.log(chosedEventType,chosedIcon)
      // const newData = Object.assign({}, this._routeData, {
      //   travelType: chosedEventType,
      //   icon: chosedIcon,
      //   options: this._routeData.options
      // });
      // this._onDataChange(this._pointController, this._routeData, newData);
      // this._routeData = newData;

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

        this._onDataChange(this._pointController, this._routeData, newData);
        this._routeData = newData;
      }
    });
  }

  getTemplate() {

    // const travelType = this._routeData.travelType;
    // const prefix = this._routeData.prefix;
    // const destinationCity = this._routeData.city;
    // const destinationDescription = this._routeData.description;
    // const additionalOptions = this._routeData.options;
    // const isFavorite = this._routeData.isFavorite;
    // const isFavoriteChecked = isFavorite ? `checked` : ``;


    // const eventOfferSelector = additionalOptions.map((it) => {
    //   const isOptionChecked = Math.random() > 0.5;
    //   additionalOptions.isChecked = isOptionChecked ? `checked` : ``;

    //   return `<div class="event__offer-selector">
    //     <input class="event__offer-checkbox  visually-hidden" id="${it.id}" type="checkbox" name="${it.name}" ${additionalOptions.isChecked}>
    //     <label class="event__offer-label" for="${it.id}">
    //       <span class="event__offer-title">${it.title}</span>
    //       &plus;
    //       &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
    //     </label>
    //   </div>`;
    // }).join(``);

    // const imageTemplate = this._routeData.pictures.map((it) => {
    //   return `<img class="event__photo" src="${it}" alt="Event photo">`;
    // }).join(``);

    return (
      `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
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
          Sightseeing at
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
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
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">

      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">Add luggage</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">30</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
            <label class="event__offer-label" for="event-offer-comfort-1">
              <span class="event__offer-title">Switch to comfort class</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">100</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
            <label class="event__offer-label" for="event-offer-meal-1">
              <span class="event__offer-title">Add meal</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">15</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
            <label class="event__offer-label" for="event-offer-seats-1">
              <span class="event__offer-title">Choose seats</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">5</span>
            </label>
          </div>

          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
            <label class="event__offer-label" for="event-offer-train-1">
              <span class="event__offer-title">Travel by train</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">40</span>
            </label>
          </div>
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
          </div>
        </div>
      </section>
    </section>
  </form>`
    );
  }
}
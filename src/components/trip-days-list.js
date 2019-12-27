import {createElement} from '../utils.js';

export default class TripDaysList {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    const createTripDaysList = () => {
      return `<ul class="trip-days"></ul>`;
    };

    return createTripDaysList();
  }
}

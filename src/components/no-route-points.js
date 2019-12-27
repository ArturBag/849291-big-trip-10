import {createElement} from '../utils.js';

export default class NoRoutePoints {
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
    const createNoRoutePointsTemplate = () => {
      return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
    };

    return createNoRoutePointsTemplate();
  }
}

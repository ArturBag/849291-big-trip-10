// import {createElement} from '../utils.js';
import AbstractComponent from './abstract-component.js';

export default class TripDaysList extends AbstractComponent {

  getTemplate() {

    return `<ul class="trip-days"></ul>`;

  }
}

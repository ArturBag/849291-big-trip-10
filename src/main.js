import {createRoute} from './components/route.js';
import {createMenu} from './components/menu.js';
import {createFilters} from './components/filters.js';
import {createSorting} from './components/sorting.js';
import {createTripEventForm} from './components/sections.js';
import {createEventHeader} from './components/event-header.js';
import {createEventDetails} from './components/sections.js';
import {createEventOffers} from './components/event-datails-offers.js';
import {createEventDestination} from './components/event-datails-destination.js';
import {createTripDays} from './components/trip-days.js';

const renderElement = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector(`.page-header`);
const tripInfo = header.querySelector(`.trip-main__trip-info`);

const tripControlHeaders = header.querySelectorAll(`.trip-main__trip-controls h2`);


renderElement(tripInfo, createRoute(), `afterBegin`);

renderElement(tripControlHeaders[0], createMenu(), `afterEnd`);

renderElement(tripControlHeaders[1], createFilters(), `afterEnd`);

const tripEvents = document.querySelector(`.trip-events`);

renderElement(tripEvents.children[0], createSorting(), `afterEnd`);

const tripSort = tripEvents.querySelector(`.trip-events__trip-sort`);

renderElement(tripSort, createTripDays(), `afterEnd`);

renderElement(tripSort, createTripEventForm(), `afterEnd`);

const eventEdit = document.querySelector(`.event--edit`);

renderElement(eventEdit, createEventHeader(), `beforeend`);
renderElement(eventEdit, createEventDetails(), `beforeend`);

const eventDetails = document.querySelector(`.event__details`);

renderElement(eventDetails, createEventOffers(), `beforeend`);
renderElement(eventDetails, createEventDestination(), `beforeend`);


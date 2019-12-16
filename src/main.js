import {createRoute, calculateFullTripExpenses} from './components/route.js';
import {createMenu} from './components/menu.js';
import {createFilters} from './components/filters.js';
import {createSorting} from './components/sorting.js';
import {createTripEventForm} from './components/sections.js';
import {createEventHeader} from './components/event-header.js';
import {createEventDetailsSection} from './components/sections.js';
import {createEventDetails} from './components/event-datails.js';
import {createTripDays} from './components/trip-days.js';
import {generateRoutePoints} from './mocks/route-point.js';
import {generateEventDetailsData} from './mocks/edit-event-details.js';


const renderElement = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const ROUTES_QTY = 5;


const header = document.querySelector(`.page-header`);
const tripInfo = header.querySelector(`.trip-main__trip-info`);

const tripControlHeaders = header.querySelectorAll(`.trip-main__trip-controls h2`);

export const routeData = generateRoutePoints(ROUTES_QTY);

renderElement(tripInfo, createRoute(routeData), `afterBegin`);

renderElement(tripControlHeaders[0], createMenu(), `afterEnd`);

renderElement(tripControlHeaders[1], createFilters(), `afterEnd`);

const tripEvents = document.querySelector(`.trip-events`);

renderElement(tripEvents.children[0], createSorting(), `afterEnd`);

const tripSort = tripEvents.querySelector(`.trip-events__trip-sort`);

const eventDetailsData = generateEventDetailsData(routeData);

routeData.forEach((route, routeIndex) =>
  renderElement(tripSort, createTripDays(route, routeIndex), `afterEnd`));

const pricesData = document.querySelectorAll(`.event__price-value`);
calculateFullTripExpenses(pricesData);


renderElement(tripSort, createTripEventForm(), `afterEnd`);

const eventEdit = document.querySelector(`.event--edit`);

renderElement(eventEdit, createEventHeader(), `beforeend`);
renderElement(eventEdit, createEventDetailsSection(), `beforeend`);

const eventDetails = document.querySelector(`.event__details`);

renderElement(eventDetails, createEventDetails(eventDetailsData), `beforeend`);

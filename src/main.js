import Route from './components/route.js';
import Menu from './components/menu.js';
import Filters from './components/filters.js';
import TripController from './controllers/trip-controller.js';
import {generateRoutePoints} from './mocks/route-point.js';
import {generateEventDetailsData} from './mocks/edit-event-details.js';
import {RenderPosition, render} from './utils/render.js';

const ROUTES_QTY = 5;

const header = document.querySelector(`.page-header`);
const tripInfo = header.querySelector(`.trip-main__trip-info`);

const tripControlHeaders = header.querySelectorAll(`.trip-main__trip-controls h2`);

const routeData = generateRoutePoints(ROUTES_QTY);

const routeComponent = new Route(routeData);
render(tripInfo, routeComponent.getElement(), RenderPosition.AFTERBEGIN);

const menuComponent = new Menu();
render(tripControlHeaders[0], menuComponent.getElement(), RenderPosition.AFTEREND);

const filtersComponent = new Filters();
render(tripControlHeaders[1], filtersComponent.getElement(), RenderPosition.AFTEREND);

const tripEvents = document.querySelector(`.trip-events`);

const eventDetailsData = generateEventDetailsData(routeData);


const tripControllerComponent = new TripController(tripEvents);

tripControllerComponent.render(routeData, eventDetailsData);



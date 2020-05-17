import Route from './components/route.js';
import Menu from './components/menu.js';
import PriceController from './controllers/price-controller.js';
import FilterController from './controllers/filter-controller.js';
import TripController from './controllers/trip-controller.js';
import PointsModel from './models/points.js';
import {generateRoutePoints} from './mocks/route-point.js';
import {RenderPosition, render} from './utils/render.js';

const ROUTES_QTY = 11;

const header = document.querySelector(`.page-header`);
const tripInfo = header.querySelector(`.trip-main__trip-info`);

const tripControlHeaders = header.querySelectorAll(`.trip-main__trip-controls h2`);

const routeData = generateRoutePoints(ROUTES_QTY);


const routeComponent = new Route(routeData);
render(tripInfo, routeComponent.getElement(), RenderPosition.AFTERBEGIN);

const menuComponent = new Menu();
render(tripControlHeaders[0], menuComponent.getElement(), RenderPosition.AFTEREND);

header.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tripControllerComponent.createPoint();
  });


const pointsModel = new PointsModel();
pointsModel.setPoints(routeData);

const priceController = new PriceController(tripInfo, pointsModel);
priceController.render();

const filterController = new FilterController(tripControlHeaders[1], pointsModel);
filterController.render();

const tripEventsContainer = document.querySelector(`.trip-events`);


const tripControllerComponent = new TripController(tripEventsContainer, pointsModel);

tripControllerComponent.render(routeData);



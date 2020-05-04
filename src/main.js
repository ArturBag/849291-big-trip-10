import Route from './components/route.js';
import Menu from './components/menu.js';
import FilterController from './controllers/filter-controller.js';
import TripController from './controllers/trip-controller.js';
import PointsModel from './models/points.js';
import {generateRoutePoints} from './mocks/route-point.js';
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

header.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tripControllerComponent.createPoint();
  });


const tripEvents = document.querySelector(`.trip-events`);

const pointsModel = new PointsModel();
pointsModel.setPoints(routeData);

const filterController = new FilterController(tripControlHeaders[1], pointsModel);
filterController.render();

const tripControllerComponent = new TripController(tripEvents, pointsModel);

tripControllerComponent.render(routeData);



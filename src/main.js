import API from './api.js';
import Route from './components/route.js';
import Menu, {MenuItem} from './components/menu.js';
import Statistics from './components/statistics.js';
import PriceController from './controllers/price-controller.js';
import FilterController from './controllers/filter-controller.js';
import TripController from './controllers/trip-controller.js';
import PointsModel from './models/points.js';
// import {generateRoutePoints} from './mocks/route-point.js';
import {RenderPosition, render} from './utils/render.js';
import {getDestinationsInfo, getOffersInfo} from './const.js';

// const ROUTES_QTY = 11;
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;

const header = document.querySelector(`.page-header`);
const tripInfo = header.querySelector(`.trip-main__trip-info`);

const tripControlHeaders = header.querySelectorAll(`.trip-main__trip-controls h2`);

// const routeData = generateRoutePoints(ROUTES_QTY);

const api = new API(AUTHORIZATION);


const menuComponent = new Menu();
render(tripControlHeaders[0], menuComponent.getElement(), RenderPosition.AFTEREND);

header.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tripControllerComponent.createPoint();
  });


const pointsModel = new PointsModel();

const priceController = new PriceController(tripInfo, pointsModel);
priceController.render();

const filterController = new FilterController(tripControlHeaders[1], pointsModel);
filterController.render();

const tripEventsContainer = document.querySelector(`.trip-events`);


const tripControllerComponent = new TripController(tripEventsContainer, pointsModel, api);

let statisticsComponent = new Statistics(pointsModel, pointsModel.getPointsAll());

const redrawStatistics = () => {

  statisticsComponent = new Statistics(pointsModel, pointsModel.getPointsAll());
  render(tripEventsContainer, statisticsComponent.getElement(), RenderPosition.AFTEREND);
};

const renderBriefRouteProgram = (data) => {
  const routeComponent = new Route(data);
  render(tripInfo, routeComponent.getElement(), RenderPosition.AFTERBEGIN);
};

statisticsComponent.hide();


menuComponent.setOnChange((menuItem) => {

  switch (menuItem) {
    case MenuItem.TABLE:
      menuComponent.setActiveItem(MenuItem.TABLE);
      statisticsComponent.hide();
      tripControllerComponent.show();
      break;
    case MenuItem.STATS:
      menuComponent.setActiveItem(MenuItem.STATS);
      tripControllerComponent.hide();
      redrawStatistics();
      statisticsComponent.show();
      break;

  }
});

api.getPoints().then((points)=> {
  pointsModel.setPoints(points);
  renderBriefRouteProgram(points);
  tripControllerComponent.render();
});

api.getDestinations()
.then((destinations)=> getDestinationsInfo(destinations));

api.getOffers()
.then((offers)=> getOffersInfo(offers));


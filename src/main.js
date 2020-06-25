import API from './api.js';
import Route from './components/route.js';
import Menu, {MenuItem} from './components/menu.js';
import Statistics from './components/statistics.js';
import PriceController from './controllers/price-controller.js';
import FilterController from './controllers/filter-controller.js';
import TripController from './controllers/trip-controller.js';
import PointsModel from './models/points.js';
import {RenderPosition, render} from './utils/render.js';
import {getDestinationsInfo, getOffersInfo, getCitiesList} from './const.js';


const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip`;

const header = document.querySelector(`.page-header`);
const tripInfo = header.querySelector(`.trip-main__trip-info`);

const tripControlHeaders = header.querySelectorAll(`.trip-main__trip-controls h2`);

const api = new API(END_POINT, AUTHORIZATION);


const menuComponent = new Menu();
render(tripControlHeaders[0], menuComponent.getElement(), RenderPosition.AFTEREND);

header.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tripControllerComponent.createPoint();
  });


const pointsModel = new PointsModel();

const renderPriceData = ()=> {
  const priceController = new PriceController(tripInfo, pointsModel);
  priceController.render();
};

const renderFiltesrData = ()=> {
  const filterController = new FilterController(tripControlHeaders[1], pointsModel);
  filterController.render();
};


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


const getPoints = new Promise((res) => {
  api.getPoints().then((points) => {
    pointsModel.setPoints(points);
    renderBriefRouteProgram(points);
    renderPriceData();
    renderFiltesrData();
    res();
  });
});


const getDestinations = new Promise((res) => {
  api.getDestinations().then((destinations) => {
    getDestinationsInfo(destinations);
    getCitiesList(destinations);
    res();
  });
});

const getOffers = new Promise((res) => {
  api.getOffers().then((offers) => {
    getOffersInfo(offers);
    res();
  });
});


Promise.all([getPoints, getDestinations, getOffers])
  .then(()=> tripControllerComponent.render());



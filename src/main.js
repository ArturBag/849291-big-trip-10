import Route from './components/route.js';
import Menu from './components/menu.js';
import Filters from './components/filters.js';
import Sorting from './components/sorting.js';
import EventForm from './components/event-datails.js';
import TripDays from './components/trip-days.js';
import {generateRoutePoints} from './mocks/route-point.js';
import {generateEventDetailsData} from './mocks/edit-event-details.js';
import {RenderPosition, render} from './utils.js';


const ROUTES_QTY = 5;
const renderRoutePoint = (eventDetailsData, route, routeIndex) => {
  const eventFormComponent = new EventForm(eventDetailsData);
  const tripDaysComponent = new TripDays(route, routeIndex);

  const rollUpButton = tripDaysComponent.getElement().querySelector(`.event__rollup-btn`);
  rollUpButton.addEventListener(`click`, () => {
    tripDaysList.replaceChild(eventFormComponent.getElement(), tripDaysComponent.getElement());
  });

  const editForm = eventFormComponent.getElement();
  editForm.addEventListener(`submit`, () => {
    tripDaysList.replaceChild(tripDaysComponent.getElement(), eventFormComponent.getElement());
  });

  render(tripDaysList, tripDaysComponent.getElement(), RenderPosition.BEFOREEND);
};

const header = document.querySelector(`.page-header`);
const tripInfo = header.querySelector(`.trip-main__trip-info`);

const tripControlHeaders = header.querySelectorAll(`.trip-main__trip-controls h2`);

const routeData = generateRoutePoints(ROUTES_QTY);

render(tripInfo, new Route(routeData).getElement(), RenderPosition.AFTERBEGIN);
render(tripControlHeaders[0], new Menu().getElement(), RenderPosition.AFTEREND);

render(tripControlHeaders[1], new Filters().getElement(), RenderPosition.AFTEREND);

const tripEvents = document.querySelector(`.trip-events`);

render(tripEvents.children[0], new Sorting().getElement(), RenderPosition.AFTEREND);

const tripSort = tripEvents.querySelector(`.trip-events__trip-sort`);

const eventDetailsData = generateEventDetailsData(routeData);

const tripDaysList = document.createElement(`ul`);
tripDaysList.classList.add(`trip-days`);
render(tripSort, tripDaysList, RenderPosition.AFTEREND);

routeData.map((route, routeIndex) => {
  renderRoutePoint(eventDetailsData, route, routeIndex);
});

const pricesData = document.querySelectorAll(`.event__price-value`);

const calculateFullTripExpenses = (pricesInfo) => {

  const priceOutput = document.querySelector(`.trip-info__cost-value`);
  const totalTriPrices = Array.from(pricesInfo).map((it) => parseInt(it.textContent, 10));

  priceOutput.textContent = totalTriPrices.reduce((result, currentVal) => result + currentVal);

};

calculateFullTripExpenses(pricesData);


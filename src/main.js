import NoRoutePoints from './components/no-route-points.js';
import Route from './components/route.js';
import Menu from './components/menu.js';
import Filters from './components/filters.js';
import Sorting from './components/sorting.js';
import EventForm from './components/event-datails.js';
import TripDaysList from './components/trip-days-list.js';
import TripDays from './components/trip-days.js';
import {generateRoutePoints} from './mocks/route-point.js';
import {generateEventDetailsData} from './mocks/edit-event-details.js';
import {RenderPosition, render} from './utils.js';


const ROUTES_QTY = 5;
const renderRoutePoint = (eventDetailsData, route, routeIndex) => {

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceEventFormToTripDays();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replacetripDaysToEventForm = () => tripDaysList.replaceChild(eventFormComponent.getElement(), tripDaysComponent.getElement());
  const replaceEventFormToTripDays = () => tripDaysList.replaceChild(tripDaysComponent.getElement(), eventFormComponent.getElement());

  const tripDaysComponent = new TripDays(route, routeIndex);
  const rollUpButton = tripDaysComponent.getElement().querySelector(`.event__rollup-btn`);
  rollUpButton.addEventListener(`click`, () => {
    replacetripDaysToEventForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventFormComponent = new EventForm(eventDetailsData);
  const editForm = eventFormComponent.getElement();
  editForm.addEventListener(`submit`, () => {
    replaceEventFormToTripDays();
    document.removeEventListener(`keydown`, onEscKeyDown);
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

const eventDetailsData = generateEventDetailsData(routeData);

const tripDaysListComponent = new TripDaysList();
const tripDaysList = tripDaysListComponent.getElement();

const sortingComponent = new Sorting();
const sortingList = sortingComponent.getElement();

const noRoutePointsComponent = new NoRoutePoints();
const noRoutePointsNode = noRoutePointsComponent.getElement();

let isExpensesCalculated = false;

if (!routeData.length) {
  render(tripEvents, noRoutePointsNode, RenderPosition.BEFOREEND);
  isExpensesCalculated = false;
} else {
  render(tripEvents.children[0], sortingList, RenderPosition.AFTEREND);
  render(sortingList, tripDaysList, RenderPosition.AFTEREND);
  isExpensesCalculated = true;
}

routeData.map((route, routeIndex) => {
  renderRoutePoint(eventDetailsData, route, routeIndex);
});

if (isExpensesCalculated) {
  const pricesData = document.querySelectorAll(`.event__price-value`);

  const calculateFullTripExpenses = (pricesInfo) => {

    const priceOutput = document.querySelector(`.trip-info__cost-value`);
    const totalTriPrices = Array.from(pricesInfo).map((it) => parseInt(it.textContent, 10));

    priceOutput.textContent = totalTriPrices.reduce((result, currentVal) => result + currentVal);

  };

  calculateFullTripExpenses(pricesData);

}

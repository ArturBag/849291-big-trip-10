import NoRoutePoints from '../components/no-route-points.js';
import Sorting from '../components/sorting.js';
import EventForm from '../components/event-datails.js';
import TripDaysList from '../components/trip-days-list.js';
import TripDays from '../components/trip-days.js';
import {render, replace, RenderPosition} from '../utils/render.js';

const renderRoutePoint = (tripDaysListComponent, eventDetailsData, route, routeIndex) => {

  const onEscKeyDown = (evt) => {

    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceEventFormToTripDays();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replacetripDaysToEventForm = () => {
    replace(eventFormComponent, tripDaysComponent);
  };

  const replaceEventFormToTripDays = () => {
    replace(tripDaysComponent, eventFormComponent);
  };

  const tripDaysComponent = new TripDays(route, routeIndex);
  tripDaysComponent.setClickHandler(() => {
    replacetripDaysToEventForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventFormComponent = new EventForm(eventDetailsData);

  eventFormComponent.setSubmitHandler(() => {
    replaceEventFormToTripDays();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });


  render(tripDaysListComponent.getElement(), tripDaysComponent.getElement(), RenderPosition.BEFOREEND);
};


export default class TripController {
  constructor(container) {
    this._container = container;
    this._noRoutePoints = new NoRoutePoints();
    this._sorting = new Sorting();
    this._eventForm = new EventForm();
    this._tripDaysList = new TripDaysList();
    this._tripDays = new TripDays();
  }

  render(routeData, eventDetailsData) {

    const container = this._container;
    const tripDaysListElement = this._tripDaysList.getElement();
    const sortingList = this._sorting.getElement();
    const noRoutePointsNode = this._noRoutePoints.getElement();

    let isExpensesCalculated = false;

    if (!routeData.length) {
      render(container, noRoutePointsNode, RenderPosition.BEFOREEND);
      isExpensesCalculated = false;
    } else {
      render(container.children[0], sortingList, RenderPosition.AFTEREND);
      render(sortingList, tripDaysListElement, RenderPosition.AFTEREND);
      isExpensesCalculated = true;
    }

    routeData.map((route, routeIndex) => {
      renderRoutePoint(this._tripDaysList, eventDetailsData, route, routeIndex);
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
  }

}

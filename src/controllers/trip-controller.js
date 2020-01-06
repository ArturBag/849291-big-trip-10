import NoRoutePoints from '../components/no-route-points.js';
import Sorting, {SortType} from '../components/sorting.js';
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

const renderTripPoints = (tripDaysListComponent, eventDetailsData, routeData) => {

  routeData.map((route, routeIndex) => {
    renderRoutePoint(tripDaysListComponent, eventDetailsData, route, routeIndex);
  });

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

    renderTripPoints(this._tripDaysList, eventDetailsData, routeData);

    const hideTripDays = (isDisplayed) => {

      const daysHeader = this._sorting.getElement().querySelector(`.trip-sort__item--day`);
      const daysList = tripDaysListElement.querySelectorAll(`.day__info`);

      if (isDisplayed === false) {
        daysHeader.style = `visibility:hidden`;
        daysList.forEach((it) => {
          it.style.visibility = `hidden`;
        });

      } else {
        daysHeader.style = `visibility:visible `;
        daysList.forEach((it) => {
          it.style.visibility = `visible`;
        });
      }

    };

    this._sorting.sortTypeChangeHandler((sortType) => {
      let sortedData = [];


      switch (sortType) {
        case SortType.EVENT:
          sortedData = routeData.slice();
          hideTripDays(true);
          break;
        case SortType.TIME:
          sortedData = routeData.slice().sort((a, b) => {
            if (b.date.eventDurationHours !== a.date.eventDurationHours) {
              return b.date.eventDurationHours - a.date.eventDurationHours;
            } else {
              return b.date.eventDurationMinutes - a.date.eventDurationMinutes;
            }
          });
          hideTripDays(false);
          break;
        case SortType.PRICE:
          sortedData = routeData.slice().sort((a, b) => b.price - a.price);
          hideTripDays(false);
          break;
      }

      tripDaysListElement.innerHTML = ``;
      renderTripPoints(this._tripDaysList, eventDetailsData, sortedData);

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

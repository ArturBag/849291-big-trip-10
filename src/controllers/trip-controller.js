import NoRoutePoints from '../components/no-route-points.js';
import Sorting, {SortType} from '../components/sorting.js';
// import EventForm from '../components/event-datails.js';
import TripDaysList from '../components/trip-days-list.js';
import TripDays from '../components/trip-days.js';
import PointController from './point-controller.js';
import {render, RenderPosition} from '../utils/render.js';

const renderTripPoints = (tripDaysListComponent, routeData, onDataChange, onViewChange) => {

  return routeData.map((route, routeIndex) => {

    const pointController = new PointController(tripDaysListComponent, onDataChange, onViewChange);
    pointController.render(route, routeIndex);
    return pointController;

  });

};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._routeData = [];
    this._showedPointControllers = [];
    this._isExpensesCalculated = false;
    this._noRoutePoints = new NoRoutePoints();
    this._sorting = new Sorting();
    this._tripDaysList = new TripDaysList();
    this._tripDays = new TripDays();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sorting.sortTypeChangeHandler(this._onSortTypeChange);

  }

  render(routeData) {

    this._routeData = routeData;

    // console.log(`render routeData`, routeData);
    const container = this._container;
    const tripDaysListElement = this._tripDaysList.getElement();
    const sortingList = this._sorting.getElement();
    const noRoutePointsNode = this._noRoutePoints.getElement();

    if (!this._routeData.length) {
      render(container, noRoutePointsNode, RenderPosition.BEFOREEND);
      this._isExpensesCalculated = false;
    } else {

      render(container.children[0], sortingList, RenderPosition.AFTEREND);
      render(sortingList, tripDaysListElement, RenderPosition.AFTEREND);
      this._isExpensesCalculated = true;
    }


    const newTripPoints = renderTripPoints(tripDaysListElement, this._routeData, this._onDataChange, this._onViewChange);

    this._showedPointControllers = newTripPoints;
    if (this._isExpensesCalculated) {

      const pricesData = document.querySelectorAll(`.event__price-value`);

      const calculateFullTripExpenses = (pricesInfo) => {

        const priceOutput = document.querySelector(`.trip-info__cost-value`);
        const totalTriPrices = Array.from(pricesInfo).map((it) => parseInt(it.textContent, 10));

        priceOutput.textContent = totalTriPrices.reduce((result, currentVal) => result + currentVal);

      };

      calculateFullTripExpenses(pricesData);

    }
  }


  _onDataChange(oldData, newData) {

    // console.log(`this._routeData`, this._routeData, this, `onDataChange`);

    const index = this._routeData.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._routeData[index] = newData;
    // console.log(this._routeData[index])

    this._showedPointControllers[index].render(this._routeData[index], index);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const tripDaysListElement = this._tripDaysList.getElement();
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
    let sortedData = [];


    switch (sortType) {
      case SortType.EVENT:
        sortedData = this._routeData.slice();
        hideTripDays(true);
        break;
      case SortType.TIME:
        sortedData = this._routeData.slice().sort((a, b) => {
          if (b.date.eventDurationHours !== a.date.eventDurationHours) {
            return b.date.eventDurationHours - a.date.eventDurationHours;
          } else {
            return b.date.eventDurationMinutes - a.date.eventDurationMinutes;
          }
        });
        hideTripDays(false);
        break;
      case SortType.PRICE:
        sortedData = this._routeData.slice().sort((a, b) => b.price - a.price);
        hideTripDays(false);
        break;
    }

    tripDaysListElement.innerHTML = ``;
    const newTripPoints = renderTripPoints(tripDaysListElement, sortedData, this._onDataChange, this._onViewChange);
    this._showedPointControllers = newTripPoints;
  }

}

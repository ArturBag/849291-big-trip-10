import NoRoutePoints from '../components/no-route-points.js';
import Sorting, { SortType } from '../components/sorting.js';
import TripDaysList from '../components/trip-days-list.js';
import AddPointForm from '../components/add-point.js';
import PointController, { Mode as PointControllerMode, EmptyPoint } from './point-controller.js';
import { render, RenderPosition } from '../utils/render.js';
import { getDurationTime } from '../utils/common.js';

const renderTripPoints = (tripDaysListComponent, routeData, onDataChange, onViewChange) => {

  return routeData.map((route, routeIndex) => {

    const pointController = new PointController(tripDaysListComponent, onDataChange, onViewChange);
    pointController.render(route, routeIndex, PointControllerMode.DEFAULT);
    return pointController;

  });

};

export default class TripController {
  constructor(container, pointsModel) {

    this._pointsModel = pointsModel;
    this._container = container;

    this._showedPointControllers = [];
    this._isExpensesCalculated = false;

    this._noRoutePoints = new NoRoutePoints();
    this._sorting = new Sorting();
    this._tripDaysList = new TripDaysList();

    this.getDurationTime = getDurationTime;
    // this._creatingPoint = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sorting.sortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {

    const pointsData = this._pointsModel.getPointsAll();

    const container = this._container;
    const tripDaysListElement = this._tripDaysList.getElement();
    const sortingList = this._sorting.getElement();
    const noRoutePointsNode = this._noRoutePoints.getElement();

    if (!pointsData.length) {
      render(container, noRoutePointsNode, RenderPosition.BEFOREEND);
      this._isExpensesCalculated = false;
    } else {

      render(container.children[0], sortingList, RenderPosition.AFTEREND);
      render(sortingList, tripDaysListElement, RenderPosition.AFTEREND);
      this._isExpensesCalculated = true;
    }


    const newTripPoints = renderTripPoints(tripDaysListElement, pointsData, this._onDataChange, this._onViewChange);

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

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    const tripDaysListElement = this._tripDaysList.getElement();
    this._creatingPoint = new PointController(tripDaysListElement, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, this._showedPointControllers.length, PointControllerMode.ADDING);

    const container = document.querySelector(`.trip-sort`)
    const addPointComponent = new AddPointForm(EmptyPoint, this._onDataChange);
    render(container, addPointComponent.getElement(), RenderPosition.AFTEREND);

  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  _renderPoints(points) {
    const tripDaysListElement = this._tripDaysList.getElement();
    const newTripPoints = renderTripPoints(tripDaysListElement, points, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newTripPoints);
  }

  _updatePoints() {
    this._removePoints();
    // console.log(`_updatePoints`, this._pointsModel.getPoints())
    this._renderPoints(this._pointsModel.getPoints().slice());
  }


  _onDataChange(pointController, oldData, newData) {

    // const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
    // const index = this._showedPointControllers.indexOf(pointController);

    // if (isSuccess) {
    //   pointController.render(newData, index);
    // }

    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updateTasks(this._showingTasksCount);
      } else {

        this._pointsModel.addTask(newData);
        pointController.render(newData, PointControllerMode.DEFAULT);

        const destroyedTask = this._showedTaskControllers.pop();
        destroyedTask.destroy();

      }
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const tripDaysListElement = this._tripDaysList.getElement();
    // const hideTripDays = (isDisplayed) => {

    //   const daysHeader = this._sorting.getElement().querySelector(`.trip-sort__item--day`);
    //   const daysList = tripDaysListElement.querySelectorAll(`.day__info`);

    //   if (isDisplayed === false) {
    //     daysHeader.style = `visibility:hidden`;
    //     daysList.forEach((it) => {
    //       it.style.visibility = `hidden`;
    //     });

    //   } else {
    //     daysHeader.style = `visibility:visible `;
    //     daysList.forEach((it) => {
    //       it.style.visibility = `visible`;
    //     });
    //   }

    // };

    let sortedData = [];
    const pointsData = this._pointsModel.getPoints();

    switch (sortType) {

      case SortType.EVENT:
        sortedData = pointsData.slice();
        // hideTripDays(true);
        break;
      case SortType.TIME:

        sortedData = pointsData.slice().sort((a, b) => {

          const DateA = this.getDurationTime(a.dateFrom, a.dateTo);
          const DateB = this.getDurationTime(b.dateFrom, b.dateTo);

          if (DateB.eventDurationDays !== DateA.eventDurationDays) {
            return DateB.eventDurationDays - DateA.eventDurationDays;
          } else if (DateB.eventDurationHours !== DateA.eventDurationHours) {
            return DateB.eventDurationHours - DateA.eventDurationHours;
          } else {
            return DateB.eventDurationMinutes - DateA.eventDurationMinutes;
          }

        });
        // hideTripDays(false);
        break;
      case SortType.PRICE:
        sortedData = pointsData.slice().sort((a, b) => b.price - a.price);
        // hideTripDays(false);
        break;
    }

    tripDaysListElement.innerHTML = ``;
    const newTripPoints = renderTripPoints(tripDaysListElement, sortedData, this._onDataChange, this._onViewChange);
    this._showedPointControllers = newTripPoints;
  }

  _onFilterChange() {
    this._updatePoints();
  }

}

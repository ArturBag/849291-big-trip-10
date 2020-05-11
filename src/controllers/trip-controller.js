import NoRoutePoints from '../components/no-route-points.js';
import Sorting, {SortType} from '../components/sorting.js';
// import PointController from './point-controller.js';
import TripDaysList from '../components/trip-days-list.js';
import PointController, {EmptyPoint} from './point-controller.js';
import {render, replace, RenderPosition} from '../utils/render.js';
// import {getDuartionInMiliseconds} from '../utils/common.js';

const getDates = (events)=> {
  const set = new Set();
  events.forEach((evt)=> set.add(JSON.stringify(
      {
        day: evt.startDate.getDate(),
        month: evt.startDate.getMonth()
      }
  )));
  return Array.from(set).map((evt) => JSON.parse(evt));

};

export const getDefaultEvents = (data) => {
  let newData = [];
  const routeData = data.map((it) => Object.assign({}, it));
  const dates = getDates(routeData);


  dates.forEach((date) => {
    const dayEvents = routeData
  .filter((event)=> event.startDate.getDate() === date.day)
  .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    dayEvents[0].date = date;
    newData = [...newData, ...dayEvents]

  });

  return newData;

};


const renderTripPoints = (tripDaysListComponent, routeData, onDataChange) => {

  return routeData.map((route, routeIndex) => {

    const pointController = new PointController(tripDaysListComponent, onDataChange);

    pointController.render(route, routeIndex);
    return pointController;

  });

};


export default class TripController {
  constructor(container, pointsModel) {

    this._pointsModel = pointsModel;

    this._container = container;

    this._noRoutePoints = new NoRoutePoints();
    this._sorting = new Sorting();
    this._tripDaysList = new TripDaysList();

    this._showedPointControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._activeSortType = SortType.EVENT;

    this._sorting.sortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
    // this._pointsModel.setDataChangeHandler(this._onDataChange);

  }

  render(routeData) {

    const pointsData = getDefaultEvents(routeData);

    const container = this._container;
    const tripDaysListElement = this._tripDaysList.getElement();
    const sortingList = this._sorting.getElement();
    const noRoutePointsNode = this._noRoutePoints.getElement();


    if (!pointsData.length) {
      render(container, noRoutePointsNode, RenderPosition.BEFOREEND);

    } else {
      render(container.children[0], sortingList, RenderPosition.AFTEREND);
      render(sortingList, tripDaysListElement, RenderPosition.AFTEREND);

    }

    const newTripPoints = renderTripPoints(tripDaysListElement, pointsData, this._onDataChange);

    this._showedPointControllers = newTripPoints;

  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  _renderPoints(points) {
    const tripDaysListElement = this._tripDaysList.getElement();
    const newTripPoints = renderTripPoints(tripDaysListElement, points, this._onDataChange);
    this._showedPointControllers = this._showedPointControllers.concat(newTripPoints);

  }

  _updatePoints() {
    this._removePoints();

    this._renderPoints(this._pointsModel.getPoints().slice());
  }

  _onDataChange(pointController, oldData, newData) {
// console.log(oldData.isFavorite, newData.isFavorite)

    if (oldData === EmptyPoint) {
      // this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();

        this._updatePoints();

      } else {
        this._pointsModel.addPoint(newData);

        const index = this._showedPointControllers.length;

        // pointController.render(newData, index, PointControllerMode.DEFAULT);
        pointController.render(newData, index);

        this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);

      this._updatePoints();
    } else {
// console.log(oldData.id,`-- oldData`, newData, `-- newData`)
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
      const index = this._showedPointControllers.findIndex((it)=> it === pointController);

      if (isSuccess) {

        // pointController.render(newData, index, PointControllerMode.DEFAULT);
        pointController.render(newData, index);
      }
    }

  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {

    const tripDaysListElement = this._tripDaysList.getElement();
    this._activeSortType = sortType;

    let pointsData = this._pointsModel.getPoints();


    switch (sortType) {

      case SortType.EVENT:

        pointsData = getDefaultEvents(pointsData.slice());
        break;
      case SortType.TIME:

        pointsData.sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
        break;
      case SortType.PRICE:

        pointsData.sort((a, b) => b.price - a.price);
        break;
    }

    tripDaysListElement.innerHTML = ``;
    const newTripPoints = renderTripPoints(tripDaysListElement, pointsData, this._onDataChange);
    this._showedPointControllers = newTripPoints;
  }

  _onFilterChange() {
    this._updatePoints();
    this._onSortTypeChange(this._activeSortType);
  }


}

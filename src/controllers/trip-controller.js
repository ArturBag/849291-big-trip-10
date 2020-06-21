import NoRoutePoints from '../components/no-route-points.js';
import Sorting, {SortType} from '../components/sorting.js';
import TripDaysList from '../components/trip-days-list.js';
import PointController, {Mode as PointControllerMode, EmptyPoint} from './point-controller.js';
import {render, RenderPosition} from '../utils/render.js';

const HIDDEN_CLASS = `visually-hidden`;

const getDates = (events)=> {
  const set = new Set();
  events.forEach((evt)=> set.add(JSON.stringify(
      {
        day: evt.startDate.getDate(),
        month: evt.startDate.getMonth() + 1
      }
  )));
  return Array.from(set).map((evt) => JSON.parse(evt));

};

export const getDefaultEvents = (data) => {
  let newData = [];
  const routeData = data.map((it) => Object.assign({}, it));
  const dates = getDates(routeData).sort((a, b) => a.day - b.day);

  dates.forEach((date) => {
    const dayEvents = routeData
  .filter((event)=> event.startDate.getDate() === date.day)
  .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    dayEvents[0].date = date;
    newData = [...newData, ...dayEvents];

  });

  return newData;

};


const renderTripPoints = (tripDaysListComponent, routeData, onDataChange, onViewChange) => {

  return routeData.map((route, routeIndex) => {

    const pointController = new PointController(tripDaysListComponent, onDataChange, onViewChange);

    pointController.render(route, routeIndex, PointControllerMode.DEFAULT);
    return pointController;

  });

};


export default class TripController {
  constructor(container, pointsModel, api) {

    this._pointsModel = pointsModel;
    this._container = container;
    this._api = api;


    this._showedPointControllers = [];
    this._showingPointsCount = null;
    this._creatingPoint = null;

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

  }

  hide() {
    this._container.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._container.classList.remove(HIDDEN_CLASS);
  }

  render() {


    const pointsData = getDefaultEvents(this._pointsModel.getPoints());

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

    const newTripPoints = renderTripPoints(tripDaysListElement, pointsData, this._onDataChange, this._onViewChange);

    this._showedPointControllers = newTripPoints;

  }

  createPoint() {


    if (this._creatingPoint) {
      return;
    }

    this._showedPointControllers.forEach((it)=> {
      it.setDefaultView();
    });
    const tripDaysListElement = this._tripDaysList.getElement();


    const index = this._showedPointControllers.length;

    this._creatingPoint = new PointController(tripDaysListElement, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, index, PointControllerMode.ADDING);

  }

  _destroyCreatingPoint() {
    this._creatingPoint.destroy();
    this._creatingPoint = null;
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

    const data = getDefaultEvents(this._pointsModel.getPoints().slice());

    this._renderPoints(data);
  }

  _onViewChange() {
    if (this._creatingPoint) {

      this._destroyCreatingPoint();
    }

    this._showedPointControllers.forEach((it) => it.setDefaultView());

  }

  _onDataChange(pointController, oldData, newData, shouldRender) {

    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();

        this._updatePoints();

      } else {
        this._pointsModel.addPoint(newData);

        const index = this._showedPointControllers.length;

        pointController.render(newData, index, PointControllerMode.DEFAULT);

        this._showedPointControllers = [].concat(pointController, this._showedPointControllers);

        this._onSortTypeChange(this._sorting._currenSortType);
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);

      this._updatePoints();
    } else {

      this._api.updateTask(oldData.id, newData)
      .then((pointModel)=> {
        // console.log(pointModel)
        const isSuccess = this._pointsModel.updatePoint(oldData.id, pointModel);
        const index = this._showedPointControllers.findIndex((it)=> it === pointController);

        if (isSuccess && shouldRender) {

          pointController.render(pointModel, index, PointControllerMode.DEFAULT);
          this._onSortTypeChange(this._sorting._currenSortType);
        }
      });

    }

      // const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
      // const index = this._showedPointControllers.findIndex((it)=> it === pointController);


      // if (isSuccess && shouldRender) {

      //   pointController.render(newData, index, PointControllerMode.DEFAULT);
      //   this._onSortTypeChange(this._sorting._currenSortType);
      // }

    // }

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

    if (this._creatingPoint) {
      this._destroyCreatingPoint();
    }

    tripDaysListElement.innerHTML = ``;
    const newTripPoints = renderTripPoints(tripDaysListElement, pointsData, this._onDataChange, this._onViewChange);
    this._showedPointControllers = newTripPoints;

  }

  _onFilterChange() {
    this._updatePoints();
    this._onSortTypeChange(this._activeSortType);
  }


}

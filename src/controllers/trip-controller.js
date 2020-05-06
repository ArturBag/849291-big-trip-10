import NoRoutePoints from '../components/no-route-points.js';
import Sorting, {SortType} from '../components/sorting.js';
import PointController from './point-controller.js';
import TripDaysList from '../components/trip-days-list.js';
import {render, replace, RenderPosition} from '../utils/render.js';
// import {getDuartionInMiliseconds} from '../utils/common.js';

const getDates = (events)=> {
  const set = new Set();
  events.forEach((evt)=> set.add(JSON.stringify(
      {
        day: evt.startDate.getDate(),
        month: evt.startDate.getMonth()
        // month: months[evt.startDate.getMonth()]

      }
  )));
  return Array.from(set).map((evt) => JSON.parse(evt));

};

const getDefaultEvents = (routeData) => {
  const dates = getDates(routeData);
  let newData = [];

  dates.forEach((date) => {
    const dayEvents = routeData
  .filter((event)=> event.startDate.getDate() === date.day)
  .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    dayEvents[0].date = date;
    newData = [...newData, ...dayEvents]

  });

  return newData;

};


const renderTripPoints = (tripDaysListComponent, routeData) => {

  return routeData.map((route, routeIndex) => {

    const pointController = new PointController(tripDaysListComponent);
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

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sorting.sortTypeChangeHandler(this._onSortTypeChange);

    this._activeSortType = SortType.EVENT;
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

    const newTripPoints = renderTripPoints(tripDaysListElement, pointsData, this._onDataChange, this._onViewChange);

    this._showedPointControllers = newTripPoints;

  }


  _onSortTypeChange(sortType) {
    const tripDaysListElement = this._tripDaysList.getElement();

    this._activeSortType = sortType;

    let sortedData = [];
    const pointsData = this._pointsModel.getPoints();


    switch (sortType) {

      case SortType.EVENT:

        sortedData = getDefaultEvents(pointsData.slice());

        break;
      case SortType.TIME:

        sortedData = pointsData.slice().sort((a, b) => {

          const DateA = a.endDate.getMilliseconds() - a.startDate.getMilliseconds();
          const DateB = b.endDate.getMilliseconds() - b.startDate.getMilliseconds();
          // console.log(DateA, DateB)
          return DateB - DateA;

        });

        break;
      case SortType.PRICE:
        sortedData = pointsData.slice().sort((a, b) => b.price - a.price);
        break;
    }

    tripDaysListElement.innerHTML = ``;
    const newTripPoints = renderTripPoints(tripDaysListElement, sortedData);
    this._showedPointControllers = newTripPoints;
  }


}

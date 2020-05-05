import NoRoutePoints from '../components/no-route-points.js';
import Sorting from '../components/sorting.js';
import EventForm from '../components/event-form.js';
import TripDaysList from '../components/trip-days-list.js';
import TripDay from '../components/trip-day.js';
import {render, replace, RenderPosition} from '../utils/render.js';

const getDates = (events)=>{
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



const renderTripPoints = (tripDaysListComponent, eventDetailsData, route, routeIndex ) => {

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

  const tripDaysComponent = new TripDay(route, routeIndex);
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
    this._tripDay = new TripDay();
  }

  render(routeData, eventDetailsData) {

    const data = getDefaultEvents(routeData);

    const container = this._container;
    const tripDaysListElement = this._tripDaysList.getElement();
    const sortingList = this._sorting.getElement();
    const noRoutePointsNode = this._noRoutePoints.getElement();

    let isExpensesCalculated = false;

    if (!data.length) {
      render(container, noRoutePointsNode, RenderPosition.BEFOREEND);
      isExpensesCalculated = false;
    } else {
      render(container.children[0], sortingList, RenderPosition.AFTEREND);
      render(sortingList, tripDaysListElement, RenderPosition.AFTEREND);
      isExpensesCalculated = true;
    }

    data.map((route, routeIndex) => {
      renderTripPoints(this._tripDaysList, eventDetailsData, route, routeIndex);
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

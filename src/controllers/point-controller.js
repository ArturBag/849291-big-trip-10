import {CITIES} from '../const.js';
import EventForm from '../components/event-datails.js';
import TripDays from '../components/trip-days.js';

// import TripDaysList from '../components/trip-days-list.js';
import {render, replace, RenderPosition} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {

    this._container = container;
    this._eventFormComponent = null;
    this._tripDaysComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }


  render(route, routeIndex) {

    this._tripDaysComponent = new TripDays(route, routeIndex);

    this._tripDaysComponent.setClickHandler(() => {
      this._replaceEventFormToTripDays();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventFormComponent = new EventForm(route);


    this._eventFormComponent.setSubmitHandler(() => {
      this._replaceEventFormToTripDays();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });


    this._eventFormComponent.setFavoriteClickHandler(() => {
      this._onDataChange(route, Object.assign({}, route, {
        isFavorite: !route.isFavorite
      }));

    });

    this._eventFormComponent.setRoutePointType((chosedEventType, chosedIcon) => {

      this._onDataChange(route, Object.assign({}, route, {
        travelType: chosedEventType,
        icon: chosedIcon,
        options: route.options
      }));

    });

    this._eventFormComponent.setEventDestinationHandler(() => {

      let iputValue = this._eventFormComponent.getElement().querySelector(`#event-destination-1`).value;

      const isDestinationExist = CITIES.some((it) => it === iputValue);

      if (isDestinationExist) {
        this._onDataChange(route, Object.assign({}, route, {
          city: iputValue,
          description: route.description
        }));
      }


    });

    render(this._container, this._tripDaysComponent.getElement(), RenderPosition.BEFOREEND);


  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this.replaceEventFormToTripDays();
    }
  }

  _onEscKeyDown(evt) {

    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._replaceEventFormToTripDays();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _replacetripDaysToEventForm() {
    this._onViewChange();
    replace(this._eventFormComponent, this._tripDaysComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEventFormToTripDays() {
    this._onViewChange();
    replace(this._tripDaysComponent, this._eventFormComponent);
    this._mode = Mode.DEFAULT;
  }

}

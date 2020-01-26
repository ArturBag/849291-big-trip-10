import EventForm from '../components/event-datails.js';
import TripDays from '../components/trip-days.js';
// import {render, replace, remove, RenderPosition} from '../utils/render.js';
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

    this._tripDaysComponent = null;
    this._eventFormComponent = null;
  }


  render(route, routeIndex) {

    const oldPointComponent = this._tripDaysComponent;
    const oldPointEditComponent = this._eventFormComponent;

    this._tripDaysComponent = new TripDays(route, routeIndex);


    this._tripDaysComponent.setClickHandler(() => {
      this._replacetripDaysToEventForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventFormComponent = new EventForm(route, this._onDataChange);

    this._eventFormComponent.setSubmitHandler(() => {
      this._replaceEventFormToTripDays();
    });

    if (oldPointComponent && oldPointEditComponent) {

      replace(this._tripDaysComponent, oldPointComponent);
      replace(this._eventFormComponent, oldPointEditComponent);

    } else {
      render(this._container, this._tripDaysComponent.getElement(), RenderPosition.BEFOREEND);
    }

    // if (oldPointComponent && oldPointEditComponent) {
    //   remove(oldPointComponent);
    //   remove(oldPointEditComponent);

    //   render(this._container, this._eventFormComponent.getElement(), RenderPosition.AFTERBEGIN);
    // } else {
    //   render(this._container, this._tripDaysComponent.getElement(), RenderPosition.BEFOREEND);
    // }
  }
  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEventFormToTripDays();
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
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    replace(this._tripDaysComponent, this._eventFormComponent);
    this._mode = Mode.DEFAULT;
  }

}


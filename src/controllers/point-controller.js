import EventForm from '../components/event-form.js';
import TripDay from '../components/trip-day.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';


export default class PointController {
  constructor(container) {

    this._container = container;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._tripDaysComponent = null;
    this._eventFormComponent = null;

  }


  render(route, routeIndex) {

    this._routeData = route;

    const oldPointComponent = this._tripDaysComponent;
    const oldPointEditComponent = this._eventFormComponent;

    this._tripDaysComponent = new TripDay(route, routeIndex);
    this._eventFormComponent = new EventForm(route);

    this._tripDaysComponent.setClickHandler(() => {

      this._replacetripDaysToEventForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);

    });

    if (oldPointComponent && oldPointEditComponent) {
      replace(this._tripDaysComponent, oldPointComponent);
      replace(this._eventFormComponent, oldPointEditComponent);

    } else {
      render(this._container, this._tripDaysComponent.getElement(), RenderPosition.BEFOREEND);
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
    replace(this._eventFormComponent, this._tripDaysComponent);
  }


  _replaceEventFormToTripDays() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    if (document.contains(this._eventFormComponent.getElement())) {
      replace(this._tripDaysComponent, this._eventFormComponent);
    }
  }

}


import EventForm from '../components/event-form.js';
import TripDay from '../components/trip-day.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';
import {getRandomDate, getIncludedOffers} from '../mocks/route-point.js';


export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

const travelType = `Flight`;
const city = ``;
const includedOffers = getIncludedOffers(travelType.toLowerCase());
const startDate = getRandomDate(new Date());
const endDate = getRandomDate(startDate);


export const EmptyPoint = {
  id: Math.floor(Math.random() * 1000),
  travelType,
  city,
  destination: {
    name: ``,
    description: ``,
    pictures: []
  },
  price: 0,
  startDate,
  endDate,
  isFavorite: false,
  includedOffers
};


export default class PointController {
  constructor(container, onDataChange, onViewChange) {

    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._tripDaysComponent = null;
    this._eventFormComponent = null;

    this._formAction = Mode.DEFAULT;

  }


  render(route, routeIndex, mode) {
    this._routeData = route;

    const oldPointComponent = this._tripDaysComponent;
    const oldPointEditComponent = this._eventFormComponent;
    this._mode = mode;

    this._tripDaysComponent = new TripDay(route, routeIndex);
    this._eventFormComponent = new EventForm(route, this._mode);

    this._tripDaysComponent.setClickHandler(() => {

      this._replacetripDaysToEventForm();
      this._eventFormComponent.reset();
      document.addEventListener(`keydown`, this._onEscKeyDown);

    });

    this._eventFormComponent.setFavoritesHandler((isFavorite)=>{

      const shouldRender = false;
      this._onDataChange(this, route, Object.assign({}, route, {isFavorite}), shouldRender);
    });


    this._eventFormComponent.setCloseFormHandler(()=>{
      this._replaceEventFormToTripDays();

    });

    this._eventFormComponent.setResetButtonClickHandler((formMode)=>{

      if (formMode === Mode.ADDING) {
        this.destroy();
        this._replaceEventFormToTripDays();
      }

      this._onDataChange(this, route, null);
    });

    this._eventFormComponent.setSubmitHandler((evt)=>{
      evt.preventDefault();
      const data = this._eventFormComponent.getData();
      this._eventFormComponent.removeFlatpickr();
      const shouldRender = true;
      if (this._mode === Mode.ADDING) {
        this._formAction = Mode.ADDING;
        this._onDataChange(this, EmptyPoint, data);
      } else {
        this._formAction = Mode.EDIT;
        this._onDataChange(this, route, data, shouldRender);
      }
    });

    switch (this._mode) {

      case Mode.DEFAULT:
        if (oldPointComponent && oldPointEditComponent) {
          replace(this._tripDaysComponent, oldPointComponent);
          replace(this._eventFormComponent, oldPointEditComponent);

          if (this._formAction === Mode.ADDING) {

            render(this._container, this._tripDaysComponent.getElement(), RenderPosition.BEFOREEND);
            remove(this._eventFormComponent);
          } else {
            this._replaceEventFormToTripDays();
          }

        } else {
          render(this._container, this._tripDaysComponent.getElement(), RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldPointComponent && oldPointEditComponent) {
          remove(oldPointComponent);
          remove(oldPointEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventFormComponent.getElement(), RenderPosition.AFTERBEGIN);
        break;
    }


  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEventFormToTripDays();
    } else {
      remove(this._eventFormComponent);
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }

      this._replaceEventFormToTripDays();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  destroy() {
    remove(this._eventFormComponent);
    remove(this._tripDaysComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replacetripDaysToEventForm() {
    this._onViewChange();

    replace(this._eventFormComponent, this._tripDaysComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEventFormToTripDays() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._eventFormComponent.reset();
    this._eventFormComponent.removeFlatpickr();

    if (document.contains(this._eventFormComponent.getElement())) {
      replace(this._tripDaysComponent, this._eventFormComponent);
    }
    this._mode = Mode.DEFAULT;
  }

}


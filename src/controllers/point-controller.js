import EventForm from '../components/event-form.js';
import TripDay from '../components/trip-day.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';
import {ROUTE_POINTS_TYPES} from '../const.js';


export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};


const PICTURES_QTY = 5;
const generatePictureURL = () => `http://picsum.photos/300/150?r=${Math.random()}`;
const generatePictures = (count) => {
  return new Array(count).fill(``)
    .map(generatePictureURL);
};


export const EmptyPoint = {
  'id': 0,
  'travelType': `Flight`,
  'eventTypeList': ROUTE_POINTS_TYPES,
  'icon': `flight`,
  'prefix': `to`,
  'city': ``,
  'pictures': generatePictures(PICTURES_QTY),
  'description': ``,
  'price': 0,
  'options': [

    {
      'title': `Add luggage`,
      'price': 10,
      'isChecked': false,
      'id': `event-offer-luggage-1`,
      'name': `event-offer-luggage`
    },
    {
      'title': `Switch to comfort class`,
      'price': 150,
      'isChecked': false,
      'id': `event-offer-comfort-1`,
      'name': `event-offer-comfort`
    },
    {
      'title': `Add meal`,
      'price': 2,
      'isChecked': false,
      'id': `event-offer-meal-1`,
      'name': `event-offer-meal`
    },
    {
      'title': `Choose seats`,
      'price': 9,
      'isChecked': false,
      'id': `event-offer-seats-1`,
      'name': `event-offer-seats`
    },
    {
      'title': `Travel by train`,
      'price': 40,
      'isChecked': false,
      'id': `event-offer-train-1`,
      'name': `event-offer-train`
    }
  ],
  'isFavorite': false,
  'dateFrom': `2019-07-10T22:55:56.845Z`,
  'dateTo': `2019-07-11T11:22:13.375Z`
};


export default class PointController {
  constructor(container, onDataChange, onViewChange) {

    this._container = container;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._tripDaysComponent = null;
    this._eventFormComponent = null;

    this._formAction = Mode.ADDING;

  }


  render(route, routeIndex, mode) {

    this._routeData = route;

    const oldPointComponent = this._tripDaysComponent;
    const oldPointEditComponent = this._eventFormComponent;
    this._mode = mode;

    this._tripDaysComponent = new TripDay(route, routeIndex);
    this._eventFormComponent = new EventForm(this, route, this._onDataChange, this._mode);

    this._tripDaysComponent.setClickHandler(() => {
      this._mode = Mode.EDIT;

      this._replacetripDaysToEventForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);

    });


    this._eventFormComponent.setCloseFormButtonClickHandler(() => {
      this._replaceEventFormToTripDays();
    });


    this._eventFormComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, route, null));

    this._eventFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._eventFormComponent.getData();
      if (this._mode === `adding`) {
        this._formAction = Mode.ADDING;
        this._onDataChange(this, EmptyPoint, data);
      } else {
        this._formAction = Mode.EDIT;
        this._onDataChange(this, route, data);
      }

    });

    this._eventFormComponent.setFavoriteClickHandler(() => {

      this._onDataChange(this, route, Object.assign({}, route, {
        isFavorite: !route.isFavorite
      }));
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

    this._resetEditForm();

    if (document.contains(this._eventFormComponent.getElement())) {
      replace(this._tripDaysComponent, this._eventFormComponent);
    }
    this._mode = Mode.DEFAULT;
  }

  _resetEditForm() {
    this._eventFormComponent.resetFormToDefault();
  }

}


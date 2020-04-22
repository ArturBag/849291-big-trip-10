import EventForm from '../components/event-datails.js';
import TripDays from '../components/trip-days.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';
import { ROUTE_POINTS_TYPES, CITIES, ADDITIONAL_OPTIONS } from '../const.js';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};



export const EmptyPoint = {
  'id': null,
  'travelType': ``,
  'icon': ``,
  'prefix': ``,
  'city': ``,
  'pictures': [],
  'description': ``,
  'price': 0,
  'options': [],
  'isFavorite': false,
  'dateFrom': null,
  'dateTo': null
};

// const defaulFormtData = {
//   'id': 1,
//   'travelType': `flight`,
//   'eventTypeList': ROUTE_POINTS_TYPES,
//   'icon': `img/icons/flight.png`,
//   'prefix': `to`,
//   'city': `Amsterdam`,
//   'pictures': [`https://i.picsum.photos/id/257/300/150.jpg`, `https://i.picsum.photos/id/85/300/150.jpg`,
//     `https://i.picsum.photos/id/257/300/150.jpg`, `https://i.picsum.photos/id/948/300/150.jpg`,
//     `https://i.picsum.photos/id/1001/300/150.jpg`],
//   'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
//   'price': 0,
//   'options': ADDITIONAL_OPTIONS,
//   'isFavorite': false,
//   'dateFrom': `2020-02-17T22:22:00.845Z`,
//   'dateTo': `2020-07-24T20:36:00.375Z`


// }

export default class PointController {
  constructor(container, onDataChange, onViewChange) {

    this._container = container;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._tripDaysComponent = null;
    this._eventFormComponent = null;

    // this._localRouteData = null;
  }


  render(route, routeIndex, mode) {

    this._routeData = route;

    const oldPointComponent = this._tripDaysComponent;
    const oldPointEditComponent = this._eventFormComponent;
    this._mode = mode;

    // this._tripDaysComponent = new TripDays(route, routeIndex);
    this._tripDaysComponent = new TripDays(route, routeIndex);


    this._tripDaysComponent.setClickHandler(() => {
      // this._mode = Mode.EDIT;
      // this.setDefaultView()
      this._replacetripDaysToEventForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);

    });

    // this._eventFormComponent = new EventForm(this, route, this._onDataChange);
    this._eventFormComponent = new EventForm(this, route, this._onDataChange);

    this._eventFormComponent.setRollupButtonClickHandler(() => {
      // console.log(this._eventFormComponent.getElement().reset())
      // this._onDataChange(this, route, Object.assign({}, route, defaulFormtData));
      this.render(route, routeIndex, mode)
      this._replaceEventFormToTripDays();
    });

    this._eventFormComponent.setSubmitHandler((evt) => {
      // console.log(evt)
      evt.preventDefault();
      this._replaceEventFormToTripDays();
    });

    // this._eventFormComponent.setRoutePointTypeHandler((chosedEventType, chosedIcon, chosedPrefix) => {

    //         this._onDataChange(this, route, Object.assign({}, this._localRouteData, {
    //           travelType: chosedEventType,
    //           icon: chosedIcon,
    //           prefix: chosedPrefix,
    //         }));
    //       });

//     this._eventFormComponent.setRoutePointTypeHandler((chosedEventType, chosedIcon, chosedPrefix) => {
//       // this._routeData = Object.assign({}, this._routeData, {
//       //   'travelType': chosedEventType,
//       //   'icon': chosedIcon,
//       //   'prefix': chosedPrefix
//       // });
//       // this.render(this._routeData,routeIndex, mode)
// // console.log(chosedEventType, chosedIcon, chosedPrefix)
//       // this._onDataChange(this, route, Object.assign({}, route, {
//       //   travelType: chosedEventType,
//       //   icon: chosedIcon,
//       //   prefix: chosedPrefix,
//       // }));
//     });

    this._eventFormComponent.setEventDestinationHandler((iputValue) => {
      const isDestinationExist = CITIES.some((it) => it === iputValue);

      if (isDestinationExist) {

        this._onDataChange(this, route, Object.assign({}, route, {
          city: iputValue,
          pictures: route.pictures,
          description: route.description
        }));
      }
    });


    this._eventFormComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, route, null));

    this._eventFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._eventFormComponent.getData();
      this._onDataChange(this, route, data);
    });

    if (oldPointComponent && oldPointEditComponent) {
      replace(this._tripDaysComponent, oldPointComponent);
      replace(this._eventFormComponent, oldPointEditComponent);
    } else {
      render(this._container, this._tripDaysComponent.getElement(), RenderPosition.BEFOREEND);
    }


    this._eventFormComponent.setFavoriteClickHandler(() => {

      this._onDataChange(this, route, Object.assign({}, route, {
        isFavorite: !route.isFavorite
      }));
    });


    // this._eventFormComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, route, null));

    // switch (mode) {
    //   case Mode.DEFAULT:
    //     if (oldPointEditComponent && oldPointComponent) {
    //       replace(this._tripDaysComponent, oldPointComponent);
    //       replace(this._eventFormComponent, oldPointEditComponent);
    //       // this._replaceEditToTask();
    //     } else {
    //       render(this._container, this._tripDaysComponent.getElement(), RenderPosition.BEFOREEND);
    //     }
    //     break;
    //   case Mode.ADDING:
    //     if (oldPointEditComponent && oldPointComponent) {
    //       remove(oldPointComponent);
    //       remove(oldPointEditComponent);
    //     }
    //     // this.setDefaultView();
    //     // console.log(this._eventFormComponent.getElement())
    //     // console.log(`111`)
    //     document.addEventListener(`keydown`, this._onEscKeyDown);
    //     render(this._container, this._eventFormComponent, RenderPosition.AFTERBEGIN);
    //     break;
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
    // this._eventFormComponent.reset();
    replace(this._tripDaysComponent, this._eventFormComponent);
    this._mode = Mode.DEFAULT;
    // console.log(this._eventFormComponent.getElement());
  }

  _resetEditForm() {
    this._eventFormComponent.getElement().reset();
  }

}


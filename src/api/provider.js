import Point from "../models/point.js";
// import {nanoid} from "nanoid";

const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedPoints = (items)=> {

  return items.filetr(({success})=> success)
    .map(({payload})=> payload.point);
};


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;

  }


  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
      .then((destinationsData)=> {

        this._store.setItems(`destinations`, destinationsData);

        return destinationsData;
      });

    }

    const storeDestinationsData = this._store.getItems().destinations;

    return Promise.resolve(storeDestinationsData);
  }


  getOffers() {
    if (isOnline()) {

      return this._api.getOffers()
      .then((offers)=> {
        this._store.setItems(`offers`, offers);

        return offers;
      });

    }

    const storeOffersData = this._store.getItems().offers;

    return Promise.resolve(storeOffersData);
  }

  getPoints() {

    if (isOnline()) {


      return this._api.getPoints()
      .then((points)=> {
        const storePointsData = points.map((point)=> Point.toRAW(point));
        this._store.setItems(`points`, storePointsData);


        return points;
      });
    }

    const storePointsData = this._store.getItems().points;


    return Promise.resolve(Point.parsePoints(storePointsData));


  }

  createPoint(data) {
    if (isOnline()) {
      return this._api.createPoint(data)
        .then((newPoint)=> {
          this._store.setItem(newPoint.id, Point.toRAW(newPoint));

          return newPoint;
        });
    }


    this._store.setItem(data.id, Point.toRAW(data));

    return Promise.resolve(data);
  }


  updatePoint(id, data) {
    if (isOnline()) {
      return this._api.updatePoint(id, data)
        .then((newPoints)=> newPoints);
    }


    this._store.setItem(id, Point.toRAW(data));

    return Promise.resolve(data);
  }

  deletePoint(id) {
    if (isOnline()) {
      return this._api.deletePoint(id)
        .then((newPoints)=> newPoints);
    }

    this._store.removeItem(id);
    const newStorePoints = this._store.getItems().points;

    return Promise.resolve(newStorePoints);
  }

}

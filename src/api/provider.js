import Point from "../models/point.js";

const isOnline = () => {
  return window.navigator.onLine;
};


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getDestinations() {
    if (isOnline) {
      return this._api.getDestinations()
      .then((destinationsData)=> {
        destinationsData.forEach((destination)=> this._store.setItem(destination.type, Point.toRAW(destination)));
        return destinationsData;
      });
    }

    return Promise.reject(`offline logic is not implemented`);
  }


  getOffers() {
    if (isOnline) {
      return this._api.getOffers()
      .then((offers)=> {
        offers.forEach((offerData)=> this._store.setItem(offerData.type, Point.toRAW(offerData)));
        return offers;
      });
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  getPoints() {
    if (isOnline) {
      return this._api.getPoints()
      .then((points)=> {
        points.forEach((pointData)=> this._store.setItem(pointData.id, Point.toRAW(pointData)));

        return points;
      });
    }

    const storePointsData = Object.values(this._store.getItems());

    return Promise.resolve(Point.parsePoints(storePointsData));


  }

  createPoint(data) {
    if (isOnline) {
      return this._api.createPoint(data);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  updatePoint(id, data) {
    if (isOnline) {
      return this._api.updatePoint(id, data);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

  deletePoint(id) {
    if (isOnline) {
      return this._api.deletePoint(id);
    }

    return Promise.reject(`offline logic is not implemented`);
  }

}


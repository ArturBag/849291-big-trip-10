import Point from "./models/point.js";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`)
  }

};

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getDestinations() {

    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://htmlacademy-es-10.appspot.com/big-trip/destinations`, {headers})
    .then(checkStatus)
    .then((response)=> response.json());
  }

  getOffers() {

    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://htmlacademy-es-10.appspot.com/big-trip/offers`, {headers})
    .then(checkStatus)
    .then((response)=> response.json());
  }


  getPoints() {

    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://htmlacademy-es-10.appspot.com/big-trip/points`, {headers})
    .then(checkStatus)
    .then((response)=> response.json())
    .then(Point.parsePoints);
  }


  updateTask(id, data) {
    console.log(data)
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);
    // let testData = new Date(data.startDate).toISOString()

    const point = new Point(data);
    // console.log(point.toRAW())

    return fetch(`https://htmlacademy-es-10.appspot.com/big-trip/points/${id}`, {
      method: `PUT`,
      body: JSON.stringify(point.toRAW()),
      headers
    })
    .then(checkStatus)
    .then((response)=> response.json())
    .then(Point.parsePoint);
  }
};

export default API;

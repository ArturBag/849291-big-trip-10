import {filterTypes} from '../const.js';
import {getDefaultEvents} from '../controllers/trip-controller.js';
import moment from 'moment';


export const getFutureRoutePoints = (nowDate, points) => {

  const nowDateInMiliseconds = moment(nowDate, `DD/MM/YYYY HH:mm`).valueOf();

  return points.filter((it) => {
    const futureDateInMiliseconds = moment(it.endDate).valueOf();
    console.log(futureDateInMiliseconds > nowDateInMiliseconds)
    return futureDateInMiliseconds > nowDateInMiliseconds;
  });
};

export const gePastRoutePoints = (nowDate, points) => {

  const nowDateInMiliseconds = moment(nowDate, `DD/MM/YYYY HH:mm`).valueOf();
  return points.filter((it) => {
    const pastDateInMiliseconds = moment(it.startDate).valueOf();
    console.log(pastDateInMiliseconds < nowDateInMiliseconds)
    return pastDateInMiliseconds < nowDateInMiliseconds;

  });
};


export const getPointsByFilter = (points, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case filterTypes[`filter-everything`].name:
      // return getDefaultEvents(points).slice();
      return points;
    case filterTypes[`filter-future`].name:
      return getFutureRoutePoints(nowDate, points);
    case filterTypes[`filter-past`].name:
      return gePastRoutePoints(nowDate, points);
  }

  return points;
};


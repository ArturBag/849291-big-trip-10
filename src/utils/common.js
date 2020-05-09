import moment from "moment";
import {ROUTE_POINTS_TYPES} from '../const.js';

export const getPrefix = (travelType)=> {

  let prefix = ``;
  const transportEvents = Array.from(Object.keys(ROUTE_POINTS_TYPES.ride)).slice();
  const stopEvents = Array.from(Object.keys(ROUTE_POINTS_TYPES.stops)).slice();

  const chooseEventType = (eventsData, tripType) => {
    return eventsData.some((item) => item === tripType);
  };

  const isRideTypeChosed = chooseEventType(transportEvents, travelType);
  const isStopTypeChosed = chooseEventType(stopEvents, travelType);

  if (isRideTypeChosed) {
    prefix = `to`;

  } else if (isStopTypeChosed) {
    prefix = `in`;
  }

  return prefix;
};

export const getFormattedTime = (date, withDay = false) => {
  return withDay ? moment(date).format(`D/M/YY`) : moment(date).format(`HH:mm`);
};

export const getTimeDiff = (time) => {
  const duration = moment.duration(time);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  return `${days > 0 ? days + `D` : ``} ${hours > 0 ? hours + `H` : ``} ${minutes > 0 ? minutes + `M` : ``}`;
};

// export const getDuartionInMiliseconds = (date) => {

//   return moment.duration(date).milliseconds();
// }

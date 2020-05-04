import moment from 'moment';
import { ROUTE_POINTS_TYPES } from '../const.js';

export const formatTime = (time, formatType) => {
  return moment(time, formatType).utc().format(`HH:mm`);

};

export const formatDay = (day) => {
  return moment(day).format(`DD`);

};

export const formatMonth = (month) => {
  return moment(month).format(`MMM`);

};


export const formatDate = (date, formatType) => {
  return moment(date, formatType).utc().format(`MM/DD/YY`);
};

export const dateDiff = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`);

};

export const getDurationTime = (dateFrom, dateTo) => {
  // console.log(dateFrom, dateTo, `from duration function`)
  // const dateStartTime = moment(dateFrom).format(`YYYY-MM-DDTHH:mm`);
  // const dateEndTime = moment(dateTo).format(`YYYY-MM-DDTHH:mm`);
  // const dateStart = moment(dateFrom).format(`YYYY-MM-DD HH:mm`);
  // const dateEnd = moment(dateTo).format(`YYYY-MM-DD HH:mm`);
  const startDate = moment(dateFrom).utc().format(`DD/MM/YYYY HH:mm`)
  const endDate = moment(dateTo).utc().format(`DD/MM/YYYY HH:mm`);

  const test = moment(startDate, `DD/MM/YYYY HH:mm`).format(`DD`);
  // console.log(test, `test`)
  const startDay = moment(startDate).days();
  // console.log(startDay, `startDay`)
  // console.log(moment())


  // console.log(test1.diff(test2, 'days'), `DIFF`)
  // console.log(dateFrom, dateTo, `dateFrom, dateTo`)
  // console.log(startDate, endDate, `startDate, endDate`)
  // console.log(endDate.diff(startDate, `days`))

  // console.log(dateStartDays,`/// DAY START///`, `/// DAY END///`,dateEndDays)
  const startTime = formatTime(dateFrom);
  const endTime = formatTime(dateTo);

  // const eventDurationDays = moment.duration(dateEnd.diff(dateStart)).asDays()

  // console.log(eventDurationDays, `--- DAYS DURATION`)
  const eventDuartionHours = moment.duration(startTime, `HH:mm`).
                              subtract(moment.duration(endTime, `HH:mm`)).hours();
  const eventDuartionMinutes = moment.duration(startTime, `HH:mm`).
                              subtract(moment.duration(endTime, `HH:mm`)).minutes();

  return {
    // 'eventDurationDays': eventDurationDays,
    'eventDuartionHours': eventDuartionHours,
    'eventDuartionMinutes': eventDuartionMinutes
  };
};

// export const getDurationTime = (dateFrom, dateTo) => {
//   // const dateStartTime = moment(dateFrom).format(`YYYY-MM-DDTHH:mm`);
//   // const dateEndTime = moment(dateTo).format(`YYYY-MM-DDTHH:mm`);
//   const dateStart = moment(dateFrom).format(`YYYY-MM-DD HH:mm`);
//   const dateEnd = moment(dateTo).format(`YYYY-MM-DD HH:mm`);
//   const startTime = formatTime(dateFrom);
//   const endTime = formatTime(dateTo);

//   const eventDurationDays = dateDiff(dateEnd, dateStart);
//   const eventDuartionHours = moment.duration(startTime, `HH:mm`).
//                               subtract(moment.duration(endTime, `HH:mm`)).hours();
//   const eventDuartionMinutes = moment.duration(startTime, `HH:mm`).
//                               subtract(moment.duration(endTime, `HH:mm`)).minutes();

//   return {
//     'eventDurationDays': eventDurationDays,
//     'eventDuartionHours': eventDuartionHours,
//     'eventDuartionMinutes': eventDuartionMinutes
//   };
// };


export const getPrefix = (travelType)=>{

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
}

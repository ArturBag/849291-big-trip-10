import moment from "moment";
import {OFFERS} from '../const.js';


const STOP_EVENTS = [`Check-in`, `Sightseeing`, `Restaurant`];

export const getPrefix = (travelType)=> {

  let prefix = STOP_EVENTS.some((it)=> it === travelType) ? `in`: `to`;

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

export const getOffers = (travelType)=> {

  const index = OFFERS.findIndex((it)=> it.type === travelType.toLowerCase());

  if (index === -1) {
    return {
      type: travelType.toLowerCase(),
      offers: []
    };
  } else {

    return {
      type: travelType.toLowerCase(),
      offers: OFFERS[index].offers
    };
  }


};

// export const convertString = (string, toId, toTitle)=> {
//   let result = ``;
//   let stringForConversion = ``;
// // console.log(string.split(` `))
//   // console.log(string.includes(`check-in`))

//   if (toId) {
//     result = string.charAt(0).toLowerCase() + string.substr(1).split(` `).join(`-`);

//   } else if (toTitle) {
//     let splittedString = string.split(` `);
//     const firstWordLetter = splittedString[0].charAt(0).toUpperCase() + splittedString[0].substr(1);
//     // splittedString =   firstWordLetter + splittedString[0]
//     const test = string.charAt(0).toUpperCase() + string.substr(1).split(` `);
//     console.log(firstWordLetter)
//     // stringForConversion = string.charAt(0).toUpperCase() + string.substr(1).split(`-`).join(` `);
//   }

//   return result;
// };

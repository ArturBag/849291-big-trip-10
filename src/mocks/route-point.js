import {ROUTE_POINTS_TYPES, CITIES, MONTH_NAMES, ADDITIONAL_OPTIONS} from '../const.js';


const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris,
condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus,
purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.
Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const PICTURES_QTY = 5;
const monthDaysQty = 31;
const generatePictureURL = () => `http://picsum.photos/300/150?r=${Math.random()}`;
const minutesQty = 60;
const hoursQty = 23;

const generatePictures = (count) => {
  return new Array(count).fill(``)
    .map(generatePictureURL);
};

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getDescription = (text) => {
  let textArray = text.split(`. `);
  let sentenceQty = getRandomIntegerNumber(1, 5);
  let description = ``;
  for (let i = 0; i < sentenceQty; i++) {
    description += textArray[getRandomIntegerNumber(0, textArray.length)] + `. `;
  }

  return description;
};

const getRandomDate = () => {
  const randomStartHours = getRandomIntegerNumber(1, hoursQty);
  const randomStartMinutes = getRandomIntegerNumber(1, minutesQty);
  const startTimeHours = randomStartHours < 10 ? `0` + randomStartHours : randomStartHours;
  const startTimeMinutes = randomStartMinutes < 10 ? `0` + `${randomStartMinutes}` : randomStartMinutes;
  const startTime = `${startTimeHours}:${startTimeMinutes}`;

  const randomEndHours = getRandomIntegerNumber(parseInt(startTimeHours, 10), hoursQty);
  const randomEndMinutes = getRandomIntegerNumber(1, minutesQty);
  const endTimeHours = randomEndHours < 10 ? `0` + randomEndHours : randomEndHours;
  const endTimeMinutes = randomEndMinutes < 10 ? `0` + `${randomEndMinutes}` : randomEndMinutes;
  const endTime = `${endTimeHours}:${endTimeMinutes}`;

  let eventDurationHours = endTimeHours - startTimeHours;
  let eventDurationMinutes = endTimeMinutes - startTimeMinutes;

  if (eventDurationHours === 0 && eventDurationMinutes < 0) {
    eventDurationHours = 24 - 1;
  } else if (startTimeHours === endTimeHours && startTimeMinutes === endTimeMinutes) {
    eventDurationHours = 24;

  }

  eventDurationHours = eventDurationHours < 0 ? 24 + eventDurationHours : eventDurationHours;
  eventDurationMinutes = eventDurationMinutes < 0 ? minutesQty + eventDurationMinutes : eventDurationMinutes;


  const eventDurationTime = `${eventDurationHours + `H`} ${eventDurationMinutes + `M`}`;

  return {
    'year': new Date().getFullYear(),
    'month': MONTH_NAMES[getRandomIntegerNumber(0, MONTH_NAMES.length)],
    'day': getRandomIntegerNumber(1, monthDaysQty),
    startTime,
    endTime,
    eventDurationHours,
    eventDurationMinutes,
    eventDurationTime
  };
};

// const getRandomDate = () => {
//   const startHours = getRandomIntegerNumber(1, hoursQty);
//   const startMinutes = getRandomIntegerNumber(1, minutesQty);
//   // const startTimeHours = randomStartHours < 10 ? `0` + randomStartHours : randomStartHours;
//   // const startTimeMinutes = randomStartMinutes < 10 ? `0` + `${randomStartMinutes}` : randomStartMinutes;
//   // const startTime = `${startTimeHours}:${startTimeMinutes}`;

//   const endHours = getRandomIntegerNumber(parseInt(startHours, 10), hoursQty);
//   const endMinutes = getRandomIntegerNumber(1, minutesQty);
//   // const endTimeHours = randomEndHours < 10 ? `0` + randomEndHours : randomEndHours;
//   // const endTimeMinutes = randomEndMinutes < 10 ? `0` + `${randomEndMinutes}` : randomEndMinutes;
//   // const endTime = `${endTimeHours}:${endTimeMinutes}`;

//   // let eventDurationHours = endTimeHours - startTimeHours;
//   // let eventDurationMinutes = endTimeMinutes - startTimeMinutes;

//   // if (eventDurationHours === 0 && eventDurationMinutes < 0) {
//   //   eventDurationHours = 24 - 1;
//   // } else if (startTimeHours === endTimeHours && startTimeMinutes === endTimeMinutes) {
//   //   eventDurationHours = 24;

//   // }

//   // eventDurationHours = eventDurationHours < 0 ? 24 + eventDurationHours : eventDurationHours;
//   // eventDurationMinutes = eventDurationMinutes < 0 ? minutesQty + eventDurationMinutes : eventDurationMinutes;


//   // const eventDurationTime = `${eventDurationHours + `H`} ${eventDurationMinutes + `M`}`;

//   return {
//     'year': new Date().getFullYear(),
//     'month': MONTH_NAMES[getRandomIntegerNumber(0, MONTH_NAMES.length)],
//     'day': getRandomIntegerNumber(1, monthDaysQty),
//     startHours,
//     startMinutes,
//     endHours,
//     endMinutes
//   };
// };

const generateRoutePoint = () => {

  const optionsQty = getRandomIntegerNumber(1, 4);
  const optionsInfo = [];

  for (let i = 0; i < optionsQty; i++) {
    optionsInfo.push(ADDITIONAL_OPTIONS[getRandomIntegerNumber(0, ADDITIONAL_OPTIONS.length)]);
  }

  const getRandomType = () => {
    const randomTypeKey = Math.random() > 0.5 ? `ride` : `stops`;
    const prefix = randomTypeKey === `ride` ? `to` : `in`;
    const randomTypeArray = Object.entries(ROUTE_POINTS_TYPES[randomTypeKey]);
    const randomTypeElement = randomTypeArray[getRandomIntegerNumber(0, randomTypeArray.length)];

    return {
      'travelType': randomTypeElement[0],
      'icon': randomTypeElement[1],
      prefix
    };
  };


  return {
    'travelType': getRandomType().travelType,
    'icon': getRandomType().icon,
    'prefix': getRandomType().prefix,
    'city': CITIES[getRandomIntegerNumber(0, CITIES.length)],
    'pictures': generatePictures(PICTURES_QTY),
    'description': getDescription(descriptionText),
    'price': getRandomIntegerNumber(10, 1000),
    'date': getRandomDate(),
    'options': optionsInfo,
    'isFavorite': Math.random() > 0.5
  };
};

const generateRoutePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateRoutePoint);
};

export {generateRoutePoint, generateRoutePoints};

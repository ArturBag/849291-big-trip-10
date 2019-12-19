import {ADDITIONAL_OPTIONS} from '../const.js';

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const generateEventDetailsData = (routeData) => {

  const data = routeData[getRandomIntegerNumber(0, routeData.length)];
  const options = ADDITIONAL_OPTIONS;

  return {
    'pictures': data.pictures,
    'description': data.description,
    options
  };
};

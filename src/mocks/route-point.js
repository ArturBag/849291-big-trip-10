import { ROUTE_POINTS_TYPES, CITIES, OFFERS, DESTINATION_INFO } from '../const.js';

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris,
condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus,
purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.
Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;


const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};


const getRandomDate = (date) => {

  const result = new Date(date);
  const diffDays = getRandomIntegerNumber(0, 3);
  const diffMinutes = getRandomIntegerNumber(0, 120);

  result.setDate(result.getDate() + diffDays);
  result.setMinutes(result.getMinutes() + diffMinutes);

  return result;

};

const getDestinationData = (city)=> {

  const index = DESTINATION_INFO.findIndex((it)=> it.name === city);

  if (index === -1) {
    return {
      description: [],
      name: ``,
      pictures: []
    };
  } else {

    return {
      name: DESTINATION_INFO[index].name,
      description: DESTINATION_INFO[index].description,
      pictures: DESTINATION_INFO[index].pictures
    };
  }


};


// генерирует массив чекнутых офферов рандомно

export const getIncludedOffers = (routeType) => {

  const indexOfAllOffersByType = OFFERS.findIndex((offer) => offer.type === routeType);

  const allOffersByType = OFFERS[indexOfAllOffersByType].offers;
  let includedOffersResult = [];
  if (allOffersByType.length < 1) {
    return [];
  } else {
    const offersQty = getRandomIntegerNumber(1, allOffersByType.length);
    includedOffersResult = OFFERS[indexOfAllOffersByType].offers.slice(0, offersQty);

    return includedOffersResult;

  }

};

const getRandomCity = () => {
  return CITIES[getRandomIntegerNumber(0, CITIES.length)];
};

const getRandomType = () => {
  const randomTypeElement = ROUTE_POINTS_TYPES[getRandomIntegerNumber(0, ROUTE_POINTS_TYPES.length)];

  return randomTypeElement;
};


const generateRoutePoint = () => {

  const startDate = getRandomDate(new Date());
  const id = Math.floor(Math.random() * 1000);
  const travelType = getRandomType();
  const city = getRandomCity();
  const destinationInfo = getDestinationData(city);


  return {
    id,
    travelType,
    city,
    'destination': destinationInfo,
    'price': getRandomIntegerNumber(10, 1000),
    startDate,
    'endDate': getRandomDate(startDate),
    'isFavorite': false,
    'includedOffers': getIncludedOffers(travelType.toLowerCase())

  };
};

const generateRoutePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateRoutePoint);
};

export { generateRoutePoint, generateRoutePoints, getRandomDate };


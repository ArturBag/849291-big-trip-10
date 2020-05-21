import { ROUTE_POINTS_TYPES, CITIES, OFFERS, CITIES } from '../const.js';

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris,
condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus,
purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.
Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const PICTURES_QTY = 5;
const generatePictureURL = () => `http://picsum.photos/300/150?r=${Math.random()}`;
const generatePictureDescription = () => `some description for picture ${Math.floor(Math.random() * 25)}`;


const generatePictures = (count) => {
  return new Array(count).fill(``)
    .map(() => {
      return {
        src: generatePictureURL(),
        description: generatePictureDescription()
      };
    });
};

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getDescription = (text) => {
  let textArray = text.split(`. `);
  let sentenceQty = getRandomIntegerNumber(1, 3);
  let description = ``;
  for (let i = 0; i < sentenceQty; i++) {
    description += textArray[getRandomIntegerNumber(0, textArray.length)] + `. `;
  }

  return description;
};


const getRandomDate = (date) => {

  const result = new Date(date);
  const diffDays = getRandomIntegerNumber(0, 3);
  const diffMinutes = getRandomIntegerNumber(0, 120);

  result.setDate(result.getDate() + diffDays);
  result.setMinutes(result.getMinutes() + diffMinutes);

  return result;

};

// const getPicturesData = (destination)=> {

//   const index = CITIES.findIndex((it)=> it.type === travelType.toLowerCase());

//   if (index === -1) {
//     return {
//       description: getDescription(descriptionText),
//       name: destination,
//       pictures: []
//     };
//   } else {

//     return {
//       description: getDescription(descriptionText),
//       name: CITIES[getRandomIntegerNumber(0, CITIES.length)],
//       pictures: generatePictures(PICTURES_QTY)
//     };
//   }


// };

const getOffers = (travelType)=> {

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

const getRandomType = () => {
  const randomTypeElement = ROUTE_POINTS_TYPES[getRandomIntegerNumber(0, ROUTE_POINTS_TYPES.length)];

  return randomTypeElement;
};


const generateRoutePoint = () => {

  const startDate = getRandomDate(new Date());
  const id = Math.floor(Math.random() * 1000);
  const travelType = getRandomType();
  // console.log(getOffers(travelType))

  return {
    id,
    travelType,
    'city': {
      description: getDescription(descriptionText),
      name: CITIES[getRandomIntegerNumber(0, CITIES.length)],
      pictures: generatePictures(PICTURES_QTY)
    },
    'price': getRandomIntegerNumber(10, 1000),
    startDate,
    'endDate': getRandomDate(startDate),
    'isFavorite': false,
    'options': getOffers(travelType)

  };
};

const generateRoutePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateRoutePoint);
};

export { generateRoutePoint, generateRoutePoints, getRandomDate };


// {
//   `id`: `4`,
//   'type': `train`,
//   `date_from`: `2020-05-16T21:54:00.000Z`,
//   `date_to`: `2020-05-17T17:06:00.000Z`,
//   `destination`: {
//       `name`: `Madrid`,
//       `description`: `Madrid, is a beautiful city, with crowded streets, in a middle of Europe, with a beautiful old town, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.`,
//       `pictures`: [{
//               `src`: `http://picsum.photos/300/200?r=0.5179819098494176`,
//               `description`: `Madrid central station`
//           }, {
//               `src`: `http://picsum.photos/300/200?r=0.7377934937908623`,
//               `description`: `Madrid city centre`
//           }, {
//               `src`: `http://picsum.photos/300/200?r=0.7609717173767792`,
//               `description`: `Madrid central station`
//           }, {
//               `src`: `http://picsum.photos/300/200?r=0.7595745000022156`,
//               `description`: `Madrid city centre`
//           }, {
//               `src`: `http://picsum.photos/300/200?r=0.4462736718078635`,
//               `description`: `Madrid central station`
//           }, {
//               `src`: `http://picsum.photos/300/200?r=0.2112403774698668`,
//               `description`: `Madrid embankment`
//           }, {
//               `src`: `http://picsum.photos/300/200?r=0.7748161356160432`,
//               `description`: `Madrid city centre`
//           }
//       ]
//   },
//   `base_price`: 500,
//   `is_favorite`: false,
//   `offers`: []
// },

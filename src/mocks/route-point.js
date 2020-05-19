import { ROUTE_POINTS_TYPES, CITIES, ADDITIONAL_OPTIONS } from '../const.js';


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

// const generatePictures = (count) => {
//   return new Array(count).fill(``)
//     .map(generatePictureURL);
// };
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


const generateRoutePoint = () => {

  const optionsQty = getRandomIntegerNumber(1, 4);
  const optionsInfo = [];

  for (let i = 0; i < optionsQty; i++) {
    optionsInfo.push(ADDITIONAL_OPTIONS[getRandomIntegerNumber(0, ADDITIONAL_OPTIONS.length)]);
  }

  const getRandomType = () => {

    const randomTypeKey = Math.random() > 0.5 ? `ride` : `stops`;
    const randomTypeArray = Object.entries(ROUTE_POINTS_TYPES[randomTypeKey]);
    const randomTypeElement = randomTypeArray[getRandomIntegerNumber(0, randomTypeArray.length)];


    return {
      'travelType': randomTypeElement[0],
      'icon': randomTypeElement[1],
    };
  };


  const startDate = getRandomDate(new Date());
  const id = Math.floor(Math.random() * 1000);

  return {
    id,
    'travelType': getRandomType().travelType,
    'city': {
      description: getDescription(descriptionText),
      name: CITIES[getRandomIntegerNumber(0, CITIES.length)],
      pictures: generatePictures(PICTURES_QTY)
    },
    'price': getRandomIntegerNumber(10, 1000),
    startDate,
    'endDate': getRandomDate(startDate),
    'isFavorite': false,
    'options': [{
      'type': `taxi`,
      'offers': [{
        'title': `Upgrade to a business class`,
        'price': 190,
        'isChecked': false,
        'id': `event-offer-upgrade-to-business-class-1`,
        'name': `event-offer-upgrade-to-business-class`
      }, {
        'title': `Choose the radio station`,
        'price': 30,
        'isChecked': false,
        'id': `event-offer-choose-radio-station-1`,
        'name': `event-offer-choose-radio-station`
      }, {
        'title': `Choose temperature`,
        'price': 170,
        'isChecked': false,
        'id': `event-offer-choose-temperature-1`,
        'name': `event-offer-choose-temperature`
      }, {
        'title': `Drive quickly, I'm in a hurry`,
        'price': 100,
        'isChecked': false,
        'id': `event-offer-driving-quickly-1`,
        'name': `event-offer-driving-quickly`
      }, {
        'title': `Drive slowly`,
        'price': 110,
        'isChecked': false,
        'id': `event-offer-driving-slowly-1`,
        'name': `event-offer-driving-slowly`
      }
      ]
    }, {
      'type': `bus`,
      'offers': [{
        'title': `Infotainment system`,
        'price': 50,
        'isChecked': false,
        'id': `event-offer-infotainment-system-1`,
        'name': `event-offer-infotainment-system`
      }, {
        'title': `Order meal`,
        'price': 100,
        'isChecked': false,
        'id': `event-offer-order-meal-1`,
        'name': `event-offer-order-meal`
      }, {
        'title': `Choose seats`,
        'price': 190,
        'isChecked': false,
        'id': `event-offer-choose-seats-1`,
        'name': `event-offer-choose-seats`
      }
      ]
    }, {
      'type': `train`,
      'offers': [{
        'title': `Book a taxi at the arrival point`,
        'price': 110,
        'isChecked': false,
        'id': `event-offer-book-taxi-at-arrival-point-1`,
        'name': `event-offer-book-taxi-at-arrival-point`
      }, {
        'title': `Order a breakfast`,
        'price': 80,
        'isChecked': false,
        'id': `event-offer-breakfast-1`,
        'name': `event-offer-breakfast`
      }, {
        'title': `Wake up at a certain time`,
        'price': 140,
        'isChecked': false,
        'id': `event-offer-wake-up-1`,
        'name': `event-offer-wake-up`
      }
      ]
    }, {
      'type': `flight`,
      'offers': [{
        'title': `Choose meal`,
        'price': 120,
        'isChecked': false,
        'id': `event-offer-choose-meal-1`,
        'name': `event-offer-choose-meal`
      }, {
        'title': `Choose seats`,
        'price': 90,
        'isChecked': false,
        'id': `event-offer-choose-seats-1`,
        'name': `event-offer-choose-seats`
      }, {
        'title': `Upgrade to comfort class`,
        'price': 120,
        'isChecked': false,
        'id': `event-offer-upgrade-to-comfort-class-1`,
        'name': `event-offer-upgrade-to-comfort-class`
      }, {
        'title': `Upgrade to business class`,
        'price': 120,
        'isChecked': false,
        'id': `event-offer-upgrade-to-business-class-1`,
        'name': `event-offer-upgrade-to-business-class`
      }, {
        'title': `Add luggage`,
        'price': 170,
        'isChecked': false,
        'id': `event-offer-luggage-1`,
        'name': `event-offer-luggage`
      }, {
        'title': `Business lounge`,
        'price': 160,
        'isChecked': false,
        'id': `event-offer-business-lounge-1`,
        'name': `event-offer-business-lounge`
      }
      ]
    }, {
      'type': `check-in`,
      'offers': [{
        'title': `Choose the time of check-in`,
        'price': 70,
        'isChecked': false,
        'id': `event-offer-time-of-check-in-1`,
        'name': `event-offer-time-of-check-in`
      }, {
        'title': `Choose the time of check-out`,
        'price': 190,
        'isChecked': false,
        'id': `event-offer-time-of-check-out-1`,
        'name': `event-offer-time-of-check-out`
      }, {
        'title': `Add breakfast`,
        'price': 110,
        'isChecked': false,
        'id': `event-offer-breakfast-1`,
        'name': `event-offer-breakfast`
      }, {
        'title': `Laundry`,
        'price': 140,
        'isChecked': false,
        'id': `event-offer-laundry-1`,
        'name': `event-offer-laundry`
      }, {
        'title': `Order a meal from the restaurant`,
        'price': 30,
        'isChecked': false,
        'id': `event-offer-meal-from-restaurant-1`,
        'name': `event-offer-meal-from-restaurant`
      }
      ]
    }, {
      'type': `sightseeing`,
      'offers': []
    }, {
      'type': `ship`,
      'offers': [{
        'title': `Choose meal`,
        'price': 130,
        'isChecked': false,
        'id': `event-offer-choose-meal-1`,
        'name': `event-offer-choose-meal`
      }, {
        'title': `Choose seats`,
        'price': 160,
        'isChecked': false,
        'id': `event-offer-choose-seats-1`,
        'name': `event-offer-choose-seats`
      }, {
        'title': `Upgrade to comfort class`,
        'price': 170,
        'isChecked': false,
        'id': `event-offer-upgrade-to-comfort-class-1`,
        'name': `event-offer-upgrade-to-comfort-class`
      }, {
        'title': `Upgrade to business class`,
        'price': 150,
        'isChecked': false,
        'id': `event-offer-upgrade-to-business-class-1`,
        'name': `event-offer-upgrade-to-business-class`
      }, {
        'title': `Add luggage`,
        'price': 100,
        'isChecked': false,
        'id': `event-offer-luggage-1`,
        'name': `event-offer-luggage`
      }, {
        'title': `Business lounge`,
        'price': 40,
        'isChecked': false,
        'id': `event-offer-lounge-1`,
        'name': `event-offer-lounge`
      }
      ]
    }, {
      'type': `transport`,
      'offers': []
    }, {
      'type': `drive`,
      'offers': [{
        'title': `Choose comfort class`,
        'price': 110,
        'isChecked': false,
        'id': `event-offer-choose-comfort-class-1`,
        'name': `event-offer-choose-comfort-class`
      }, {
        'title': `Choose business class`,
        'price': 180,
        'isChecked': false,
        'id': `event-offer-choose-business-class-1`,
        'name': `event-offer-choose-business-class`
      }
      ]
    }, {
      'type': `restaurant`,
      'offers': [{
        'title': `Choose live music`,
        'price': 150,
        'isChecked': false,
        'id': `event-offer-choose-live-music-1`,
        'name': `event-offer-choose-live-music`
      }, {
        'title': `Choose VIP area`,
        'price': 70,
        'isChecked': false,
        'id': `event-offer-choose-vip-area-1`,
        'name': `event-offer-choose-vip-area`
      }
      ]
    }
    ]

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

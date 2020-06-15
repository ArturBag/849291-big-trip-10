
export const DESTINATION_INFO = [];

export const getDestinationsInfo = (data) => {
  data.forEach((it)=> {
    DESTINATION_INFO.push({
      name: it.name,
      description: it.description,
      pictures: it.pictures
    });

  });
};

export const OFFERS = [];

export const getOffersInfo = (data) => {
  data.forEach((it)=> {
    OFFERS.push({
      type: it.type,
      offers: it.offers
    });

  });
};


// export const OFFERS = [];
// api.getOffers()
// .then((offers)=> getOffersInfo(offers))
// .catch((err) => console.error(err));
// api.getOffers().then((offers)=> console.log(offers));
// export const OFFERS = [{
//   'type': `taxi`,
//   'offers': [{
//     'title': `Upgrade to a business class`,
//     'price': 190,
//   }, {
//     'title': `Choose the radio station`,
//     'price': 30,
//   }, {
//     'title': `Choose temperature`,
//     'price': 170,
//   }, {
//     'title': `Drive quickly, I'm in a hurry`,
//     'price': 100,
//   }, {
//     'title': `Drive slowly`,
//     'price': 110,
//   }
//   ]
// }, {
//   'type': `bus`,
//   'offers': [{
//     'title': `Infotainment system`,
//     'price': 50,
//   }, {
//     'title': `Order meal`,
//     'price': 100,
//   }, {
//     'title': `Choose seats`,
//     'price': 190,
//   }
//   ]
// }, {
//   'type': `train`,
//   'offers': [{
//     'title': `Book a taxi at the arrival point`,
//     'price': 110,
//   }, {
//     'title': `Order a breakfast`,
//     'price': 80,
//   }, {
//     'title': `Wake up at a certain time`,
//     'price': 140,
//   }
//   ]
// }, {
//   'type': `flight`,
//   'offers': [{
//     'title': `Choose meal`,
//     'price': 120,
//   }, {
//     'title': `Choose seats`,
//     'price': 90,
//   }, {
//     'title': `Upgrade to comfort class`,
//     'price': 120,
//   }, {
//     'title': `Upgrade to business class`,
//     'price': 120,
//   }, {
//     'title': `Add luggage`,
//     'price': 170,
//   }, {
//     'title': `Business lounge`,
//     'price': 160,
//   }
//   ]
// }, {
//   'type': `check-in`,
//   'offers': [{
//     'title': `Choose the time of check-in`,
//     'price': 70,
//   }, {
//     'title': `Choose the time of check-out`,
//     'price': 190,
//   }, {
//     'title': `Add breakfast`,
//     'price': 110,
//   }, {
//     'title': `Laundry`,
//     'price': 140,
//   }, {
//     'title': `Order a meal from the restaurant`,
//     'price': 30,
//   }
//   ]
// }, {
//   'type': `sightseeing`,
//   'offers': []
// }, {
//   'type': `ship`,
//   'offers': [{
//     'title': `Choose meal`,
//     'price': 130,
//   }, {
//     'title': `Choose seats`,
//     'price': 160,
//   }, {
//     'title': `Upgrade to comfort class`,
//     'price': 170,
//   }, {
//     'title': `Upgrade to business class`,
//     'price': 150,
//   }, {
//     'title': `Add luggage`,
//     'price': 100,
//   }, {
//     'title': `Business lounge`,
//     'price': 40,
//   }
//   ]
// }, {
//   'type': `transport`,
//   'offers': []
// }, {
//   'type': `drive`,
//   'offers': [{
//     'title': `Choose comfort class`,
//     'price': 110,
//   }, {
//     'title': `Choose business class`,
//     'price': 180,
//   }
//   ]
// }, {
//   'type': `restaurant`,
//   'offers': [{
//     'title': `Choose live music`,
//     'price': 150,
//   }, {
//     'title': `Choose VIP area`,
//     'price': 70,
//   }
//   ]
// }
// ];

export const ROUTE_POINTS_TYPES = OFFERS.map((it) => {
  return it.type.charAt(0).toUpperCase() + it.type.substr(1);
});


// export const DESTINATION_INFO = [];
// api.getDestinations().then((destinations)=> getDestinationsInfo(destinations));


// export const DESTINATION_INFO = [{
//   'name': `Chamonix`,
//   'description': `Chamonix, with crowded streets, famous for its crowded street markets with the best street food in Asia.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.6595168330910754`,
//     'description': `Chamonix city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.2528096584386754`,
//     'description': `Chamonix zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8325551335111026`,
//     'description': `Chamonix kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5386507242328971`,
//     'description': `Chamonix embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.017507825994749426`,
//     'description': `Chamonix street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8680492534963791`,
//     'description': `Chamonix embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.07904908161275892`,
//     'description': `Chamonix city centre`
//   }
//   ]
// },
// {
//   'name': `Geneva`,
//   'description': `Geneva, a true asian pearl, with a beautiful old town, middle-eastern paradise,
//   a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.2755406586300373`,
//     'description': `Geneva city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.19318159581107186`,
//     'description': `Geneva street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8614648606178816`,
//     'description': `Geneva embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.2240386141267141`,
//     'description': `Geneva embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.39371560363670355`,
//     'description': `Geneva embankment`
//   }
//   ]
// },
// {
//   'name': `Amsterdam`,
//   'description': `Amsterdam, middle-eastern paradise, full of of cozy canteens where you can try
//   the best coffee in the Middle East, a perfect place to stay with a family.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.8610644423688607`,
//     'description': `Amsterdam embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.6717939697928335`,
//     'description': `Amsterdam zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.20866768089827348`,
//     'description': `Amsterdam city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.7472827272282918`,
//     'description': `Amsterdam central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9156512827801291`,
//     'description': `Amsterdam kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8601302868016274`,
//     'description': `Amsterdam embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.17429586450038737`,
//     'description': `Amsterdam park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.2736705755044111`,
//     'description': `Amsterdam street market`
//   }
//   ]
// },
// {
//   'name': `Helsinki`,
//   'description': `Helsinki, a true asian pearl, middle-eastern paradise, for those who value comfort
//   and coziness, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens
//   where you can try the best coffee in the Middle East, a perfect place to stay with a family.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.9391356798836119`,
//     'description': `Helsinki zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.27081233376059854`,
//     'description': `Helsinki central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.6805432632746327`,
//     'description': `Helsinki city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.7115762958972589`,
//     'description': `Helsinki parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.2422079614507633`,
//     'description': `Helsinki central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5766438212378517`,
//     'description': `Helsinki zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.1613594322254157`,
//     'description': `Helsinki parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.4452336953542717`,
//     'description': `Helsinki central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.19400246590507875`,
//     'description': `Helsinki central station`
//   }
//   ]
// },
// {
//   'name': `Oslo`,
//   'description': `Oslo, is a beautiful city, with crowded streets, full of of cozy canteens
//   where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.8405235217194065`,
//     'description': `Oslo zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5788094784928544`,
//     'description': `Oslo parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.834855384939633`,
//     'description': `Oslo embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.11638070766233932`,
//     'description': `Oslo park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8710315353195348`,
//     'description': `Oslo central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.48070519592098737`,
//     'description': `Oslo central station`
//   }
//   ]
// },
// {
//   'name': `Kopenhagen`,
//   'description': `Kopenhagen, with a beautiful old town, famous for its crowded street markets
//   with the best street food in Asia.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.9078691867921678`,
//     'description': `Kopenhagen embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5018804181822969`,
//     'description': `Kopenhagen zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.074746573042616`,
//     'description': `Kopenhagen kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.3181711764906545`,
//     'description': `Kopenhagen park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.4477168108016101`,
//     'description': `Kopenhagen embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9017996890331472`,
//     'description': `Kopenhagen parliament building`
//   }
//   ]
// },
// {
//   'name': `Den Haag`,
//   'description': `Den Haag, is a beautiful city, with crowded streets, in a middle of Europe,
//   middle-eastern paradise, for those who value comfort and coziness.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.8334625922719938`,
//     'description': `Den Haag embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.4367377704776316`,
//     'description': `Den Haag central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.14324516753345584`,
//     'description': `Valencia embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.512501064799084`,
//     'description': `Valencia biggest supermarket`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.7625472356259302`,
//     'description': `Valencia kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.34011246910839343`,
//     'description': `Valencia zoo`
//   }
//   ]
// },
// {
//   'name': `Madrid`,
//   'description': `Madrid, is a beautiful city, with crowded streets, full of of cozy canteens
//   where you can try the best coffee in the Middle East.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.5861982492345232`,
//     'description': `Madrid parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.2137066771076339`,
//     'description': `Madrid zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9687831957756672`,
//     'description': `Madrid park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.31142189693755573`,
//     'description': `Madrid zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5916469569903997`,
//     'description': `Madrid kindergarten`
//   }
//   ]
// },
// {
//   'name': `Nagasaki`,
//   'description': `Nagasaki, a true asian pearl, for those who value comfort and coziness,
//   with an embankment of a mighty river as a centre of attraction, famous for its crowded
//   street markets with the best street food in Asia.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.8062741689897508`,
//     'description': `Nagasaki central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.933210742251041`,
//     'description': `Nagasaki zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.4882529788692096`,
//     'description': `Nagasaki street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.25333757006308977`,
//     'description': `Nagasaki park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.83995693126357`,
//     'description': `Nagasaki street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5192065660763179`,
//     'description': `Nagasaki kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.7534478463327732`,
//     'description': `Nagasaki embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.23081377300848605`,
//     'description': `Nagasaki embankment`
//   }
//   ]
// },
// {
//   'name': `Hiroshima`,
//   'description': `Hiroshima, with a beautiful old town, for those who value comfort and coziness,
//   famous for its crowded street markets with the best street food in Asia.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.8629206641556886`,
//     'description': `Hiroshima park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.07017003235717878`,
//     'description': `Hiroshima park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.06457213902877479`,
//     'description': `Hiroshima embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8095423999969673`,
//     'description': `Hiroshima parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8378846325272828`,
//     'description': `Hiroshima city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.20829966013096768`,
//     'description': `Hiroshima zoo`
//   }
//   ]
// },
// {
//   'name': `Berlin`,
//   'description': `Berlin, with a beautiful old town.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.8764929561228347`,
//     'description': `Berlin park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.873622145500965`,
//     'description': `Berlin parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.04979723301153083`,
//     'description': `Berlin parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8115443569610159`,
//     'description': `Berlin street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5898287527031418`,
//     'description': `Berlin zoo`
//   }
//   ]
// },
// {
//   'name': `Munich`,
//   'description': `Munich, a true asian pearl, with crowded streets, in a middle of Europe,
//    middle-eastern paradise, for those who value comfort and coziness.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.8219234509755733`,
//     'description': `Munich street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.44565295341555733`,
//     'description': `Munich biggest supermarket`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.580799359900489`,
//     'description': `Munich embankment`
//   },
//   ]
// },
// {
//   'name': `Rome`,
//   'description': `Rome, a true asian pearl, with crowded streets, in a middle of Europe,
//    middle-eastern paradise, for those who value comfort and coziness.`,
//   'pictures': [
//     {
//       'src': `http://picsum.photos/300/200?r=0.580799359900489`,
//       'description': `Rome biggest supermarket`
//     }, {
//       'src': `http://picsum.photos/300/200?r=0.6908930185234632`,
//       'description': `Rome zoo`
//     }, {
//       'src': `http://picsum.photos/300/200?r=0.42304481590411225`,
//       'description': `Rome city centre`
//     }, {
//       'src': `http://picsum.photos/300/200?r=0.8375537437726006`,
//       'description': `Rome city centre`
//     }
//   ]
// }, {
//   'name': `Naples`,
//   'description': `Naples, with crowded streets, with a beautiful old town, for those who value comfort
//   and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.6771518284287426`,
//     'description': `Naples kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.05522871885979885`,
//     'description': `Naples street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.3329392382594005`,
//     'description': `Naples street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5011567215883055`,
//     'description': `Naples park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.6939345938059538`,
//     'description': `Naples kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.022373690121443746`,
//     'description': `Naples biggest supermarket`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.6352832682419933`,
//     'description': `Naples kindergarten`
//   }
//   ]
// }, {
//   'name': `Venice`,
//   'description': `Venice, is a beautiful city, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.13012954226880735`,
//     'description': `Venice parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.13826574205607178`,
//     'description': `Venice street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.3377890075713261`,
//     'description': `Venice kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.772713007385339`,
//     'description': `Venice central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5976677620589195`,
//     'description': `Venice biggest supermarket`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8060624055286651`,
//     'description': `Venice central station`
//   }
//   ]
// }, {
//   'name': `Milan`,
//   'description': `Milan, in a middle of Europe, with a beautiful old town, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.3872952802508769`,
//     'description': `Milan street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.3578683817446515`,
//     'description': `Milan parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.991468434885109`,
//     'description': `Milan central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.04764171559905006`,
//     'description': `Milan embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.029241586188391233`,
//     'description': `Milan city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.3444999036969545`,
//     'description': `Milan zoo`
//   }, {

//     'src': `http://picsum.photos/300/200?r=0.20853163942280228`,
//     'description': `Milan kindergarten`
//   }
//   ]
// }, {
//   'name': `Frankfurt`,
//   'description': `Frankfurt, is a beautiful city, in a middle of Europe, with a beautiful old town, middle-eastern paradise.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.5602487774196743`,
//     'description': `Frankfurt kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9502967419344974`,
//     'description': `Frankfurt biggest supermarket`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.7444440409040414`,
//     'description': `Frankfurt street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.30378483052171634`,
//     'description': `Frankfurt parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9424905029445594`,
//     'description': `Frankfurt city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.6387231873653585`,
//     'description': `Frankfurt central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.6316310613924825`,
//     'description': `Frankfurt kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.4877846834792392`,
//     'description': `Frankfurt city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.2547116526455431`,
//     'description': `Frankfurt zoo`
//   }
//   ]
// }, {
//   'name': `Vien`,
//   'description': `Vien, is a beautiful city, with a beautiful old town.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.03326210953180264`,
//     'description': `Vien parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.22594894171554003`,
//     'description': `Vien kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9697799178857114`,
//     'description': `Vien biggest supermarket`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8817913458787368`,
//     'description': `Vien park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9557532759773766`,
//     'description': `Vien park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.4912932012342839`,
//     'description': `Vien street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.2795196148855077`,
//     'description': `Vien city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5746332636628761`,
//     'description': `Vien parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.4081600279548596`,
//     'description': `Vien embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.2551763740388544`,
//     'description': `Vien park`
//   }
//   ]
// }, {
//   'name': `Rome`,
//   'description': `Rome, is a beautiful city.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.49854015991441014`,
//     'description': `Rome biggest supermarket`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9692197456385574`,
//     'description': `Rome parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.7616827267144739`,
//     'description': `Rome zoo`
//   }
//   ]
// }, {
//   'name': `Sochi`,
//   'description': `Sochi, with a beautiful old town, middle-eastern paradise, for those who value comfort and coziness.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.6453264143363591`,
//     'description': `Sochi street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5690155033045265`,
//     'description': `Sochi biggest supermarket`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.10287503221745475`,
//     'description': `Sochi biggest supermarket`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5135511683219298`,
//     'description': `Sochi central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.043402735341514065`,
//     'description': `Sochi central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.42568499725598175`,
//     'description': `Sochi kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.3480653018067785`,
//     'description': `Sochi park`
//   }
//   ]
// }, {
//   'name': `Tokio`,
//   'description': `Tokio, with a beautiful old town, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.9634874454812619`,
//     'description': `Tokio embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8066915879269769`,
//     'description': `Tokio zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9020098561877123`,
//     'description': `Tokio central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.7993879476910557`,
//     'description': `Tokio parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9230283281156186`,
//     'description': `Tokio street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.242769362509488`,
//     'description': `Tokio zoo`
//   }
//   ]
// }, {
//   'name': `Kioto`,
//   'description': `Kioto, is a beautiful city, with a beautiful old town, famous for its crowded street markets with the best street food in Asia.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.73895594025489`,
//     'description': `Kioto biggest supermarket`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.3241489073518924`,
//     'description': `Kioto zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8979881535690122`,
//     'description': `Kioto city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5540703987577276`,
//     'description': `Kioto zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.7632172056534972`,
//     'description': `Kioto embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.3637839100592597`,
//     'description': `Kioto parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9944815886705363`,
//     'description': `Kioto city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.6004927569550815`,
//     'description': `Kioto city centre`
//   }
//   ]
// }, {
//   'name': `Den Haag`,
//   'description': `Den Haag description.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.2755249019844086`,
//     'description': `Den Haag park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9383312814674389`,
//     'description': `Den Haag embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9709919513759557`,
//     'description': `Den Haag central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.1198964767096029`,
//     'description': `Den Haag parliament building`
//   }
//   ]
// }, {
//   'name': `Rotterdam`,
//   'description': `Rotterdam, with a beautiful old town, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.4452549940645245`,
//     'description': `Rotterdam biggest supermarket`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.37196208897657446`,
//     'description': `Rotterdam central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8425920727356675`,
//     'description': `Rotterdam city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.648688256107127`,
//     'description': `Rotterdam city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.6020548618488832`,
//     'description': `Rotterdam embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.46280433398607546`,
//     'description': `Rotterdam city centre`
//   }
//   ]
// }, {
//   'name': `Saint Petersburg`,
//   'description': `Saint Petersburg, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.03316222463312202`,
//     'description': `Saint Petersburg kindergarten`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.16677732253935784`,
//     'description': `Saint Petersburg city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.1406018575965864`,
//     'description': `Saint Petersburg city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.7525954428420825`,
//     'description': `Saint Petersburg zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.48845493613852153`,
//     'description': `Saint Petersburg central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.4224271092505829`,
//     'description': `Saint Petersburg parliament building`
//   }
//   ]
// }, {
//   'name': `Moscow`,
//   'description': `Moscow, with a beautiful old town, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.14520746495793402`,
//     'description': `Moscow embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.33102443910357193`,
//     'description': `Moscow park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.8014551749275058`,
//     'description': `Moscow parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.3362474776952651`,
//     'description': `Moscow street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.6906950300956969`,
//     'description': `Moscow street market`
//   },
//   {
//     'src': `http://picsum.photos/300/200?r=0.3081903290875794`,
//     'description': `Moscow biggest supermarket`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9939850148160663`,
//     'description': `Moscow biggest supermarket`
//   }
//   ]
// }, {
//   'name': `Monaco`,
//   'description': `Monaco, is a beautiful city, a true asian pearl, with crowded streets, in a middle of Europe, for those who value comfort and coziness, a perfect place to stay with a family.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.32956465434870696`,
//     'description': `Monaco street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.6784654880711509`,
//     'description': `Monaco park`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.0120172236981122`,
//     'description': `Monaco parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.16106727831530532`,
//     'description': `Monaco parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.138490688608518`,
//     'description': `Monaco city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.31559531599046187`,
//     'description': `Monaco park`
//   }
//   ]
// }, {
//   'name': `Paris`,
//   'description': `Paris, is a beautiful city.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.4590263797440457`,
//     'description': `Paris central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.891195834196169`,
//     'description': `Paris parliament building`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.83415274494538`,
//     'description': `Paris street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.49851362410270417`,
//     'description': `Paris city centre`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.9669500176033017`,
//     'description': `Paris embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.5904780461717809`,
//     'description': `Paris street market`
//   }
//   ]
// }, {
//   'name': `Barcelona`,
//   'description': `Barcelona, a true asian pearl, with a beautiful old town, a perfect place to stay with a family.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.1229796306316766`,
//     'description': `Barcelona embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.22945712821865083`,
//     'description': `Barcelona central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.2166275800236661`,
//     'description': `Barcelona central station`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.4117737787439384`,
//     'description': `Barcelona zoo`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.7266661016414373`,
//     'description': `Barcelona central station`
//   }
//   ]
// }, {
//   'name': `Valencia`,
//   'description': `Valencia, in a middle of Europe, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.`,
//   'pictures': [{
//     'src': `http://picsum.photos/300/200?r=0.4513022108872262`,
//     'description': `Valencia street market`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.16836112391498315`,
//     'description': `Valencia embankment`
//   }, {
//     'src': `http://picsum.photos/300/200?r=0.7869874043531961`,
//     'description': `Valencia parliament building`
//   }
//   ]
// }

// ];

export const CITIES = DESTINATION_INFO.map((it)=> it.name);

export const MONTH_NAMES = new Map([
  [1, `JAN`],
  [2, `FEB`],
  [3, `MAR`],
  [4, `APR`],
  [5, `MAY`],
  [6, `JUN`],
  [7, `JUL`],
  [8, `AUG`],
  [9, `SEP`],
  [10, `OCT`],
  [11, `NOV`],
  [12, `DEC`],
]);

export const filterTypes = {

  'filter-everything': {
    'name': `Everything`,
    'isChecked': true
  },
  'filter-future': {
    'name': `Future`,
    'isChecked': false
  },
  'filter-past': {
    'name': `Past`,
    'isChecked': false
  }
};

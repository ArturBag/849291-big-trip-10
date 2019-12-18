export const createRoute = (routeData) => {

  const tripDaysItems = routeData;
  let routeMarkup = ``;
  const cities = tripDaysItems.map((it) => it.city).join(` &mdash; `);

  routeMarkup = tripDaysItems.length > 2 ?
    `${tripDaysItems[0].city}` + ` ... ` + `${tripDaysItems[tripDaysItems.length - 1].city}` :
    cities;
  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${routeMarkup}</h1>

  <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
</div>`;
};

export const calculateFullTripExpenses = (pricesData) => {

  const priceOutput = document.querySelector(`.trip-info__cost-value`);
  const totalTriPrices = Array.from(pricesData).map((it) => parseInt(it.textContent, 10));

  priceOutput.textContent = totalTriPrices.reduce((result, currentVal) => result + currentVal);

};

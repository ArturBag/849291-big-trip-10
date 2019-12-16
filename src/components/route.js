export const createRoute = (routeData) => {

  let tripDaysItems = routeData;
  let routeMarkup = ``;
  let cities = tripDaysItems.map((it) => it.city);
  for (const cityName of cities) {
    routeMarkup += cityName + ` &mdash; `;
  }

  routeMarkup = cities.length > 2 ?
    `${cities[0]}` + ` ... ` + `${cities[cities.length - 1]}` :
    routeMarkup.substring(0, routeMarkup.length - 9);

  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${routeMarkup}</h1>

  <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
</div>`;
};

export const calculateFullTripExpenses = (pricesData) => {

  let totalTripRate = 0;
  const priceOutput = document.querySelector(`.trip-info__cost-value`);
  const totalTriPrices = Array.from(pricesData).map((it) => it.textContent);
  totalTriPrices.forEach((it) => {
    totalTripRate = totalTripRate + parseInt(it, 10);
  });
  priceOutput.textContent = totalTripRate;

};

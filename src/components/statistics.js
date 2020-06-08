import AbstractSmartComponent from './abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


export default class Statistics extends AbstractSmartComponent {
  constructor(pointsData) {
    super();
    this._pointsData = pointsData;
    this._displatStatistics();
  }

  _getData(points) {
    console.log(points)
    const typesSet = new Set();
    points.forEach((it) => typesSet.add(it.travelType));

    const moneyData = Array.from(typesSet).map((elem) => {
      let repeatingTypesPrice = 0;
      points.forEach((it) => {
        const isRepeating = it.travelType === elem;
        if (isRepeating) {
          repeatingTypesPrice += it.price;
        }

        return false;
      });

      return {
        type: elem,
        price: repeatingTypesPrice
      };

    });

    return moneyData;
  }

  _displatStatistics() {
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);

    const moneyData = this._getData(this._pointsData);
    const pointTypes = moneyData.map((it) => it.type.toUpperCase());
    const moneyPrices = moneyData.map((it) => it.price);
    // const icons = pointTypes.map((it)=>{
    //   return `img/icons/${it.toLowerCase()}.png`;
    // });

    const moneyDataSets = {

      data: moneyPrices,
      backgroundColor: `rgb(255, 255, 255)`,
      borderWidth: 0,
      // anchor: `start`

    };

    const moneyOptions = {
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
      plugins: {
        datalabels: {
          font: {size: 14},
          color: `black`,
          anchor: `center`,
          align: `start`,
        },

      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `black`,
            // fontStyle: `bold`,
            // padding: 100,
            fontSize: 14,
            // align: `start`
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: `MONEY`,
            fontColor: `black`,
            fontSize: 25,
            fontStyle: `bold`,
            padding: 50
          },

        }],
        xAxes: [{
          gridLines: {
            display: false,

          },

          display: false
        }]
      }
    };

    const moneyBarChart = new Chart(moneyCtx, {
      type: `horizontalBar`,
      data: {
        labels: pointTypes,
        datasets: [moneyDataSets]
      },
      plugins: [ChartDataLabels],
      options: moneyOptions
    });
    console.log(moneyBarChart)


  }

  getTemplate() {

    // const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);


    return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
  }


}


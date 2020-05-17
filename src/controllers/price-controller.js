import PriceComponent from '../components/price.js';
import {render, replace, RenderPosition} from '../utils/render.js';


export default class PriceController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._priceComponent = null;

  }

  render() {
    const container = this._container;
    const pointsData = this._pointsModel.getPoints().slice();

    let totalPrice = 0;
    pointsData.forEach((point) => {
      let offersTotalPrice = 0;
      point.options.forEach((offer)=> {
        const offerPrcie = offer.isChecked ? offer.price : 0;
        offersTotalPrice += offerPrcie;
      });

      totalPrice += (point.price + offersTotalPrice);
    });


    const oldComponent = this._priceComponent;

    this._priceComponent = new PriceComponent(totalPrice);

    if (oldComponent) {
      replace(this._priceComponent, oldComponent);
    } else {
      render(container, this._priceComponent.getElement(), RenderPosition.BEFOREEND);
    }

  }


}


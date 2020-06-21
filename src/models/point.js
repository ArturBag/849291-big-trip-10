export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.travelType = data[`type`];
    this.city = data[`destination`][`name`];
    this.destination = {
      description: data[`destination`][`description`],
      name: data[`destination`][`name`],
      pictures: data[`destination`][`pictures`]
    };
    this.price = data[`base_price`];
    this.startDate = new Date(data[`date_from`]);
    this.endDate = new Date(data[`date_to`]);
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.includedOffers = data[`offers`];
  }

  toRAW() {

    return {
      "id": this.id,
      "type": this.travelType,
      "destination": this.destination,
      "base_price": this.price,
      "date_from": new Date(this.startDate).toISOString(),
      "date_to": new Date(this.endDate).toISOString(),
      "is_favorite": this.isFavorite,
      "offers": this.includedOffers
    };

  // toRAW() {
  //   return {
  //     "id": this.id,
  //     "type": this.travelType,
  //     "destination": this.destination,
  //     "base_price": this.price,
  //     "date_from": new Date(this.startDate).toISOString(),
  //     "date_to": new Date(this.endDate).toISOString(),
  //     "is_favorite": this.isFavorite,
  //     "offers": this.includedOffers
  //   };

  }


  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

};

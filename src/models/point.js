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
    this.isFavorite = data[`is_favorite`];
    this.includedOffers = data[`offers`];
  }

  static parsepoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsepoint);
  }

};

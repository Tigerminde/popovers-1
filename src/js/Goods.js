import Product from './Product';

export default class Goods {
  constructor() {
    this.arrGoods = [];
  }

  addGood(name, price) {
    this.arrGoods.push(new Product(
      this.arrGoods.length,
      name,
      price,
    ));
  }
}

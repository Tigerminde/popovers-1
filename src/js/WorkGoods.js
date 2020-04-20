import Goods from './Goods';
import initData from './InitData';
import WorkDisplay from './WorkDisplay';
import Popovers from './Popovers';
import ConfirmDel from './ConfirmDel';

const goods = new Goods();
const workDisplay = new WorkDisplay();
const popup = new Popovers(document.body);
const confirmDel = new ConfirmDel();

export default class WorkGoods {
  constructor() {
    this.tableGoods = document.querySelector('tbody');
    this.elAddProduct = document.querySelector('.add-product');
    this.id = -1;
    this.itemIndex = '';
  }

  init() {
    initData(goods);
    workDisplay.redrawGoods(goods.arrGoods);
    popup.bindToDOM();
    popup.saveProduct(this.saveProduct.bind(this));
    this.inpText = document.getElementById('inpText');
    this.inpPrise = document.getElementById('inpPrise');
    confirmDel.init();
    this.eventsGoods();
  }

  eventsGoods() {
    this.tableGoods.addEventListener('click', (event) => {
      const eClass = event.target.classList;
      this.id = Number(event.target.closest('tr').dataset.id);

      if (eClass.contains('change-product')) {
        this.itemIndex = this.findProductIndex(this.id);
        this.inpText.value = goods.arrGoods[this.itemIndex].name;
        this.inpPrise.value = goods.arrGoods[this.itemIndex].price;
        popup.showPopup();
      }

      if (eClass.contains('del-product')) {
        confirmDel.delElement(this.delProduct.bind(this));
      }
    });

    this.elAddProduct.addEventListener('click', () => {
      this.id = -1;
      popup.showPopup();
    });
  }

  delProduct() {
    goods.arrGoods = goods.arrGoods.filter((item) => item.id !== this.id);
    workDisplay.redrawGoods(goods.arrGoods);
  }

  saveProduct() {
    if (this.id >= 0) {
      goods.arrGoods[this.itemIndex].name = this.inpText.value;
      goods.arrGoods[this.itemIndex].price = Number(this.inpPrise.value);
    } else {
      goods.addGood(this.inpText.value, Number(this.inpPrise.value));
    }
    workDisplay.redrawGoods(goods.arrGoods);
  }

  findProductIndex(id) {
    return goods.arrGoods.findIndex((item) => item.id === id);
  }
}

export default class WorkDisplay {
  constructor() {
    this.tableGoods = document.querySelector('tbody');
  }

  redrawGoods(arrProduct) {
    this.tableGoods.innerHTML = '';
    for (const item of arrProduct) {
      const product = document.createElement('tr');
      product.dataset.id = item.id;
      product.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>
        <span class="change-product pointer"></span>
        <span class="del-product pointer"></span>
      </td>
      `;
      this.tableGoods.appendChild(product);
    }
  }
}

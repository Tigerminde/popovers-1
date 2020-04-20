import Goods from '../Goods';

test('add product', () => {
  const goods = new Goods();
  goods.addGood('iPhone', 15000);
  const received = goods.arrGoods[0].name;
  const expected = 'iPhone';
  expect(received).toBe(expected);
});

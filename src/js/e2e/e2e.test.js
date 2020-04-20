import puppetteer from 'puppeteer';

jest.setTimeout(30000);
describe('Validate', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000/';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  describe('Validate goods', () => {
    test('Validate add product new', async () => {
      await page.goto(baseUrl);
      const addProduct = await page.$('.add-product');
      addProduct.click();

      await page.waitForSelector('[id=popup]', { visible: true });
      const inpName = await page.$('#inpText');
      expect(await inpName.evaluate((node) => node.value)).toBe('');
    });

    test('Validate change product', async () => {
      await page.goto(baseUrl);
      const addProduct = await page.$('.change-product');
      addProduct.click();

      await page.waitForSelector('[id=popup]', { visible: true });
      const inpName = await page.$('#inpText');
      expect(await inpName.evaluate((node) => node.value)).not.toBe('');
    });

    test('Validate add product validation input', async () => {
      await page.goto(baseUrl);
      const addProduct = await page.$('.add-product');
      addProduct.click();

      await page.waitForSelector('[id=popup]', { visible: true });

      const buttonSave = await page.$('#pSave');
      buttonSave.click();

      await page.waitForSelector('[id=form-error]', { visible: true });
    });

    test('Validate confirm del product', async () => {
      await page.goto(baseUrl);
      const addProduct = await page.$('.del-product');
      addProduct.click();

      await page.waitForSelector('[id=confirm-del]', { visible: true });
    });
  });
});

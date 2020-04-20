export default class Popovers {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.elPopup = document.createElement('div');
    this.sProduct = '';
  }

  get htmlElement() {
    return `
      <p>Название</p>
      <input type="text" id="inpText" class="input" value="">
      <p>Стоимость</p>
      <input type="number" id="inpPrise" class="input" value="" min="1">
      <div class="buttons">
        <div id="pSave" class="button">Сохранить</div>
        <div id="pCancel" class="button">Отмена</div>
      </div>
    `;
  }

  addErrorElement(paarentElement) {
    const error = document.createElement('div');
    error.id = 'form-error';
    error.className = 'form-error hidden';
    error.textContent = 'Error';
    paarentElement.appendChild(error);
  }

  saveProduct(callback) {
    this.sProduct = callback;
  }

  bindToDOM() {
    this.elPopup.id = 'popup';
    this.elPopup.className = 'popup hidden';
    this.elPopup.innerHTML = this.htmlElement;
    this.addErrorElement(this.elPopup);
    this.parentEl.appendChild(this.elPopup);
    this.constants();
    this.eventsPopup();
  }

  showPopup() {
    this.selectPopup.classList.remove('hidden');
    this.selectPopup.style.top = `${(window.innerHeight
      - this.selectPopup.offsetHeight) / 2}px`;
    this.selectPopup.style.left = `${(window.innerWidth
      - this.selectPopup.offsetWidth) / 2}px`;
  }

  constants() {
    this.selectPopup = document.querySelector('#popup');
    this.inpText = document.getElementById('inpText');
    this.inpPrise = document.getElementById('inpPrise');
    this.btnSave = document.getElementById('pSave');
    this.btnCancel = document.getElementById('pCancel');
    this.elError = document.querySelector('#form-error');
  }

  eventsPopup() {
    this.btnSave.addEventListener('click', () => {
      if (this.inpText.value === '') {
        this.inpText.focus();
        this.showError(this.inpText, 'Введите название!');
        return;
      }
      const numb = Number(this.inpPrise.value);
      if (numb <= 0) {
        this.inpPrise.focus();
        this.showError(this.inpPrise, 'Введите стоимость!');
        return;
      }

      this.selectPopup.classList.add('hidden');
      this.sProduct();
      this.clearInput();
    });

    this.btnCancel.addEventListener('click', () => {
      this.selectPopup.classList.add('hidden');
      this.hidenError();
      this.clearInput();
    });

    this.inpText.addEventListener('input', () => {
      this.hidenError();
    });

    this.inpPrise.addEventListener('input', () => {
      this.hidenError();
    });
  }

  hidenError() {
    if (!this.elError.classList.contains('hidden')) {
      this.elError.classList.add('hidden');
    }
  }

  clearInput() {
    this.inpText.value = '';
    this.inpPrise.value = '';
  }

  showError(element, message) {
    this.elError.textContent = message;
    this.elError.classList.remove('hidden');
    this.elError.style.top = `${element.offsetTop + element.offsetHeight}px`;
    this.elError.style.left = `${element.offsetLeft + ((element.offsetWidth - this.elError.offsetWidth) / 2)}px`;
  }
}

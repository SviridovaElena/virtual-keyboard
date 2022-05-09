import { specialKeys } from './data.js';

const changeLanguage = (objMain, objAux) => {
  const transAtr = document.querySelectorAll('[data-keycode]');
  transAtr.forEach((el) => {
    let valueData = el.dataset.keycode;
    let valueDataSpecial = el.classList.contains('keyboard__key-special');
    if (specialKeys.specialKey.includes(valueData)) {
    } else {
      if (valueDataSpecial === true) {
        el.children[1].textContent = objAux[valueData].toString();
      }
      el.children[0].textContent = objMain[valueData].toString();
    }
  });
};
export { changeLanguage };
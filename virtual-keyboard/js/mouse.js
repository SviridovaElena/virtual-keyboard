import { changeLanguage } from './lang.js';
import { keys, auxKeys, specialKeys } from './data.js';
import { writeArea } from './print.js';
// import { Keyboard } from './classes.js';
// let wrapper = new Keyboard('rgb(101 104 106)');
// wrapper.createWrapper();

/*Var=======================================*/

const textArea = document.querySelector('.content__area');
const btnCaps = document.querySelector(
  '.keyboard__key[data-keycode="CapsLock"'
);
const btnShiftLeft = document.querySelector(
  '.keyboard__key[data-keycode="ShiftLeft"'
);
const btnShiftRight = document.querySelector(
  '.keyboard__key[data-keycode="ShiftRight"'
);
const btn = document.querySelectorAll('.keyboard__key');
const btnSpecial = document.querySelectorAll(
  '.keyboard__key-special > .keyboard__key-main'
);
const btnAux = document.querySelectorAll('.keyboard__key-aux');

/*Add events=======================================*/

let flag = false;
let flagCaps = false;
const eventKeyAddMouse = (event) => {
  btn.forEach((el) => {
    if (
      event.dataset.keycode === el.dataset.keycode &&
      event.dataset.keycode === 'CapsLock'
    ) {
      // if (event.repeat) return;
      if (el.classList.contains('active')) {
        el.classList.remove('active');
      } else {
        el.classList.add('active');
      }
    }
    if (
      event.dataset.keycode === el.dataset.keycode &&
      event.dataset.keycode !== 'CapsLock'
    ) {
      // event.preventDefault();
      el.classList.add('active');
      flag
        ? writeArea(el, keys.ru, auxKeys.ru)
        : writeArea(el, keys.en, auxKeys.en);
    }
  });
  if (event.altKey && event.ctrlKey && !flag) {
    changeLanguage(keys.ru, auxKeys.ru);
    flag = true;
  } else if (event.altKey && event.ctrlKey) {
    changeLanguage(keys.en, auxKeys.en);
    flag = false;
  }
  if (event.dataset.keycode === 'CapsLock' && !flagCaps) {
    btn.forEach((el) => {
      let valueDataSpecial = el.classList.contains('keyboard__key-special');
      // if (event.repeat) return;
      if (!specialKeys.specialKey.includes(el.dataset.keycode)) {
        el.children[0].classList.add('active-Upspecial');
      }
      if (valueDataSpecial === true) {
        el.children[1].classList.add('active-Upspecial');
      }
    });
    flagCaps = true;
  } else if (event.dataset.keycode === 'CapsLock') {
    btn.forEach((el) => {
      let valueDataSpecial = el.classList.contains('keyboard__key-special');
      // if (event.repeat) return;
      if (!specialKeys.specialKey.includes(el.dataset.keycode)) {
        el.children[0].classList.remove('active-Upspecial');
      }
      if (valueDataSpecial === true) {
        el.children[1].classList.remove('active-Upspecial');
      }
    });
    flagCaps = false;
  }
  if (
    btnShiftLeft.classList.contains('active') ||
    btnShiftRight.classList.contains('active')
  ) {
    btnSpecial.forEach((el) => {
      if (!btnCaps.classList.contains('active')) {
      } else {
        el.classList.add('active-Upspecial');
      }
      el.classList.add('active-special');
    });
    btnAux.forEach((el) => {
      if (!btnCaps.classList.contains('active')) {
      } else {
        el.classList.add('active-Upspecial');
      }
      el.classList.add('active-special');
    });
    btn.forEach((el) => {
      if (
        !specialKeys.specialKey.includes(el.dataset.keycode) &&
        !btnCaps.classList.contains('active')
      ) {
        el.classList.add('active-up');
      } else {
      }
    });
  }
  if (btnCaps.classList.contains('active')) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      btn.forEach((el) => {
        if (
          !specialKeys.specialKey.includes(el.dataset.keycode) &&
          !el.classList.contains('keyboard__key-special')
        ) {
          el.children[0].classList.remove('active-Upspecial');
        }
      });
    }
  }
};

/*Remove events=======================================*/

const eventKeyRemoveMouse = (event) => {
  btn.forEach((el) => {
    if (
      event.dataset.keycode === el.dataset.keycode &&
      event.dataset.keycode !== 'CapsLock'
    ) {
      el.classList.remove('active');
    }
  });
  if (
    btnShiftLeft.classList.contains('active') ||
    btnShiftRight.classList.contains('active')
  ) {
  } else {
    btnSpecial.forEach((el) => el.classList.remove('active-special'));
    btnAux.forEach((el) => el.classList.remove('active-special'));
    btn.forEach((el) => el.classList.remove('active-up'));
  }
  if (btnCaps.classList.contains('active')) {
    if (
      event.dataset.keycode === 'ShiftLeft' ||
      event.dataset.keycode === 'ShiftRight'
    ) {
      btn.forEach((el) => {
        if (!specialKeys.specialKey.includes(el.dataset.keycode)) {
          el.children[0].classList.add('active-Upspecial');
        }
      });
    }
  }
};

export { eventKeyAddMouse, eventKeyRemoveMouse };
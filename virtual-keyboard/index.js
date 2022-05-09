
import { keys, auxKeys, specialKeys } from './js/data.js';
class Keyboard {
  constructor(color = 'grey') {
    this.keys;
    this.color = color;
  }

  createWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    document.body.append(wrapper);
    const content = document.createElement('div');
    content.classList.add('content');
    wrapper.append(content);
    const keyboard = document.createElement('div');
    const textarea = document.createElement('textarea');
    keyboard.classList.add('content__keyboard', 'keyboard');
    textarea.classList.add('content__area');
    content.append(textarea, keyboard);
    this.keys = document.createElement('div');
    this.keys.classList.add('keyboard__keys');
    keyboard.append(this.createKeys(keys.en));
  }

  createKeys(obj) {
    for (let [key1, value] of Object.entries(obj)) {
      const key = document.createElement('button');
      key.classList.add('keyboard__key');
      key.setAttribute('data-keyCode', `${key1}`);
      const mainText = document.createElement('span');
      mainText.classList.add('keyboard__key-main');
      key.append(mainText);
      if (
        value === 'del' ||
        value === 'enter' ||
        value === 'backspace' ||
        value === 'tab'
      ) {
        mainText.textContent = value.slice(0, 1).toUpperCase() + value.slice(1);
      } else {
        mainText.textContent = value;
      }
      if (value === 'backspace' || value === 'caps lock' || value === 'shift') {
        key.style.flexBasis = 13 + '%';
        key.style.maxWidth = 10 + 'rem';
        key.style.background = this.color;
      } else if (value === 'enter') {
        key.style.flexBasis = 11 + '%';
        key.style.maxWidth = 7 + 'rem';
        key.style.background = this.color;
      } else if (value === 'space') {
        key.style.flexGrow = 1;
        key.style.maxWidth = 37 + '%';
        key.textContent = '';
      } else if (value === 'ctrl') {
        key.style.flexBasis = 8 + '%';
        key.style.maxWidth = 5 + 'rem';
        key.style.background = this.color;
      } else if (value === 'arrowup') {
        mainText.textContent = '';
        key.classList.add('arrow__up', 'arrow');
      } else if (value === 'arrowdown') {
        mainText.textContent = '';
        key.classList.add('arrow__down', 'arrow');
      } else if (value === 'arrowleft') {
        mainText.textContent = '';
        key.classList.add('arrow__left', 'arrow');
      } else if (value === 'arrowright') {
        mainText.textContent = '';
        key.classList.add('arrow__right', 'arrow');
      } else if (
        value === '`' ||
        value === 'tab' ||
        value === 'win' ||
        value === 'alt' ||
        value === 'del' ||
        value === 'shift '
      ) {
        key.style.background = this.color;
      }
      this.keys.append(key);
      for (let [key2, value2] of Object.entries(auxKeys.en)) {
        if (key2 === key1) {
          const auxText = document.createElement('span');
          auxText.classList.add('keyboard__key-aux');
          key.classList.add('keyboard__key-special');
          auxText.textContent = value2;
          key.append(auxText);
        }
      }
    }
    return this.keys;
  }
}
let wrapper = new Keyboard('rgb(101 104 106)');
wrapper.createWrapper();

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
  lang = 'ru';
  setLocalStorage();
};

const writeArea = (item, obj, obj2) => {
  let curPosCursor = textArea.selectionStart;
  const start = textArea.value.slice(0, curPosCursor);
  const end = textArea.value.slice(curPosCursor);
  let val;
  let elementVal = item.dataset.keycode;
  if (
    btnCaps.classList.contains('active') &&
    !specialKeys.specialKey.includes(elementVal)
  ) {
    if (
      btnShiftLeft.classList.contains('active') ||
      btnShiftRight.classList.contains('active')
    ) {
      val = obj[elementVal].toLowerCase();
    } else {
      val = obj[elementVal].toUpperCase();
    }
  } else if (
    !btnCaps.classList.contains('active') &&
    !specialKeys.specialKey.includes(elementVal)
  ) {
    if (
      btnShiftLeft.classList.contains('active') ||
      btnShiftRight.classList.contains('active')
    ) {
      val = obj[elementVal].toUpperCase();
    } else {
      val = obj[elementVal].toLowerCase();
    }
  }
  if (
    elementVal === item.dataset.keycode &&
    !specialKeys.specialKey.includes(elementVal)
  ) {
    if (
      btnShiftLeft.classList.contains('active') ||
      btnShiftRight.classList.contains('active')
    ) {
      if (
        item.classList.contains('keyboard__key-special') &&
        btnCaps.classList.contains('active')
      ) {
        val = obj2[elementVal].toLowerCase();
      } else if (
        item.classList.contains('keyboard__key-special') &&
        !btnCaps.classList.contains('active')
      ) {
        val = obj2[elementVal];
      }
    }
    textArea.value = `${start}${val}${end}`;
    curPosCursor += 1;
  }
  if (item.dataset.keycode === 'Tab') {
    textArea.value = `${start}    ${end}`;
    curPosCursor += 4;
  } else if (item.dataset.keycode === 'Space') {
    textArea.value = `${start}  ${end}`;
    curPosCursor += 2;
  } else if (item.dataset.keycode === 'Backspace') {
    if (curPosCursor === 0) {
    } else {
      textArea.value = textArea.value.slice(0, curPosCursor - 1) + end;
      curPosCursor -= 1;
    }
  } else if (item.dataset.keycode === 'Delete') {
    textArea.value = start + textArea.value.slice(curPosCursor + 1);
  } else if (item.dataset.keycode === 'Enter') {
    textArea.value = `${start}\n${end}`;
    curPosCursor += 1;
  } else if (item.dataset.keycode === 'ArrowLeft') {
    textArea.focus();
    curPosCursor -= 1;
  } else if (item.dataset.keycode === 'ArrowRight') {
    textArea.focus();
    curPosCursor += 1;
  } else if (item.dataset.keycode === 'ArrowUp') {
    textArea.focus();
    const before = textArea.value.substring(0, curPosCursor).split('\n');
    if (before.length === 1 || before[before.length - 1].length >= 75) {
      curPosCursor -= 75;
    } else if (
      before[before.length - 1].length <=
      before[before.length - 2].length % 75
    ) {
      curPosCursor -= (before[before.length - 2].length % 75) + 1;
    } else {
      curPosCursor -= before[before.length - 1].length + 1;
    }
    if (curPosCursor < 0) return;
  } else if (item.dataset.keycode === 'ArrowDown') {
    textArea.focus();
    curPosCursor = textArea.selectionEnd;
    const before = textArea.value.substring(0, curPosCursor).split('\n');
    const after = textArea.value.substring(textArea.selectionEnd).split('\n');
    if (after.length === 1 || after[0].length >= 75) {
      curPosCursor += 75;
    } else if (before[before.length - 1].length % 75 > after[1].length) {
      curPosCursor += after[0].length + after[1].length + 1;
    } else if (before[before.length - 1].length + after[0].length > 75) {
      curPosCursor += after[0].length;
    } else {
      curPosCursor +=
        (before[before.length - 1].length % 75) + after[0].length + 1;
    }
  }
  textArea.setSelectionRange(curPosCursor, curPosCursor);
};

/*Add events=======================================*/

let flag = false;
let flagCaps = false;
const eventKeyAdd = (event, eventCode) => {
  btn.forEach((el) => {
    if (eventCode === el.dataset.keycode && eventCode === 'CapsLock') {
      if (event.repeat) return;
      if (el.classList.contains('active')) {
        el.classList.remove('active');
      } else {
        el.classList.add('active');
      }
    }
    if (eventCode === el.dataset.keycode && eventCode !== 'CapsLock') {
      event.preventDefault();
      el.classList.add('active');
      if (flag) {
        writeArea(el, keys.ru, auxKeys.ru);
      } else {
        writeArea(el, keys.en, auxKeys.en);
      }
    }
  });
  if (event.altKey && event.ctrlKey && !flag) {
    changeLanguage(keys.ru, auxKeys.ru);
    flag = true;
  } else if (event.altKey && event.ctrlKey) {
    changeLanguage(keys.en, auxKeys.en);
    flag = false;
  }
  if (eventCode === 'CapsLock' && !flagCaps) {
    btn.forEach((el) => {
      let valueDataSpecial = el.classList.contains('keyboard__key-special');
      if (event.repeat) return;
      if (!specialKeys.specialKey.includes(el.dataset.keycode)) {
        el.children[0].classList.add('active-Upspecial');
      }
      if (valueDataSpecial === true) {
        el.children[1].classList.add('active-Upspecial');
      }
    });
    flagCaps = true;
  } else if (eventCode === 'CapsLock') {
    btn.forEach((el) => {
      let valueDataSpecial = el.classList.contains('keyboard__key-special');
      if (event.repeat) return;
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
    if (eventCode === 'ShiftLeft' || eventCode === 'ShiftRight') {
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

const eventKeyRemove = (eventCode) => {
  btn.forEach((el) => {
    if (eventCode === el.dataset.keycode && eventCode !== 'CapsLock') {
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
    if (eventCode === 'ShiftLeft' || eventCode === 'ShiftRight') {
      btn.forEach((el) => {
        if (!specialKeys.specialKey.includes(el.dataset.keycode)) {
          el.children[0].classList.add('active-Upspecial');
        }
      });
    }
  }
};
let lang = 'en';

const getLocalStorage = () => {
  if (localStorage.getItem('lang') === null) {
    setLocalStorage();
  }
};
window.addEventListener('load', getLocalStorage);

const setLocalStorage = () => {
  localStorage.setItem('lang', lang);
};

/*Events==========================================*/
const keyboard = document.querySelector('.content__keyboard');

document.addEventListener('keydown', (event) => {
  eventKeyAdd(event, event.code);
});
document.addEventListener('keyup', (event) => {
  eventKeyRemove(event.code);
});
keyboard.addEventListener('click', (event) => {
  let itm = event.target.closest('.keyboard__key');
  if (!itm) return;
  if (!keyboard.contains(itm)) return;
  eventKeyAdd(event, itm.dataset.keycode);
});
keyboard.addEventListener('click', (event) => {
  let itm = event.target.closest('.keyboard__key');
  if (!itm) return;
  if (!keyboard.contains(itm)) return;
  eventKeyRemove(itm.dataset.keycode);
});
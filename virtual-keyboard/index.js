
const keyLayout = {
    mainKey: {
      Backquote: '`',
      Digit1: '1',
      Digit2: '2',
      Digit3: '3',
      Digit4: '4',
      Digit5: '5',
      Digit6: '6',
      Digit7: '7',
      Digit8: '8',
      Digit9: '9',
      Digit0: '0',
      Minus: '-',
      Equal: '=',
      Backspace: 'backspace',
      Tab: 'tab',
      KeyQ: 'q',
      KeyW: 'w',
      KeyE: 'e',
      KeyR: 'r',
      KeyT: 't',
      KeyY: 'y',
      KeyU: 'u',
      KeyI: 'i',
      KeyO: 'o',
      KeyP: 'p',
      BracketLeft: '[',
      BracketRight: ']',
      Backslash: '\\',
      Delete: 'del',
      CapsLock: 'caps lock',
      KeyA: 'a',
      KeyS: 's',
      KeyD: 'd',
      KeyF: 'f',
      KeyG: 'g',
      KeyH: 'h',
      KeyJ: 'j',
      KeyK: 'k',
      KeyL: 'l',
      Semicolon: ';',
      Quote: "'",
      Enter: 'enter',
      ShiftLeft: 'shift',
      KeyZ: 'z',
      KeyX: 'x',
      KeyC: 'c',
      KeyV: 'v',
      KeyB: 'b',
      KeyN: 'n',
      KeyM: 'm',
      Comma: ',',
      Period: '.',
      Slash: '/',
      ArrowUp: 'arrowup',
      ShiftRight: 'shift ',
      ControlLeft: 'ctrl',
      MetaLeft: 'win',
      AltLeft: 'alt',
      Space: 'space',
      AltRight: 'alt',
      ControlRight: 'ctrl',
      ArrowLeft: 'arrowleft',
      ArrowDown: 'arrowdown',
      ArrowRight: 'arrowright',
    },
    auxiliarySymbols: {
      '`': '~',
      1: '!',
      2: '@',
      3: '#',
      4: '$',
      5: '%',
      6: ':',
      7: '?',
      8: '*',
      9: '(',
      0: ')',
      '-': '_',
      '=': '+',
      '[': '{',
      ']': '}',
      '\\': '/',
      ';': ':',
      "'": '"',
      "'": '"',
      ',': '<',
      '.': '>',
      '/': '?',
    },
    specialKey: [
      'Tab',
      'CapsLock',
      'ShiftLeft',
      'ShiftRight',
      'MetaLeft',
      'AltLeft',
      'AltRight',
      'Space',
      'ControlLeft',
      'ControlRight',
      'Enter',
      'Delete',
      'Backspace',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
    ],
  };
  
  class Keyboard {
    constructor(color = 'blue-magenta') {
      this.wrapper;
      this.content;
      this.keyboard;
      this.textarea;
      this.keys;
      this.key;
      this.transfer;
      this.span;
      this.color = color;
    }
  
    createWrapper() {
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('wrapper');
      document.body.append(this.wrapper);
      this.content = document.createElement('div');
      this.content.classList.add('content');
      this.wrapper.append(this.content);
      this.keyboard = document.createElement('div');
      this.textarea = document.createElement('textarea');
      this.keyboard.classList.add('content__keyboard', 'keyboard');
      this.textarea.classList.add('content__area');
      this.content.append(this.textarea, this.keyboard);
      this.keys = document.createElement('div');
      this.keys.classList.add('keyboard__keys');
      this.keyboard.append(this.createKeys(keyLayout.mainKey));
    }
  
    createKeys(obj) {
      for (let [key, value] of Object.entries(obj)) {
        this.key = document.createElement('button');
        this.key.classList.add('keyboard__key');
        this.key.setAttribute('data-keyCode', `${key}`);
        this.span = document.createElement('span');
        this.span.classList.add('keyboard__key-main');
        this.key.append(this.span);
        if (value === 'del' || value === 'enter') {
          this.span.textContent = value.toUpperCase();
        } else {
          this.span.textContent =
            value.slice(0, 1).toUpperCase() + value.slice(1);
        }
        if (value === 'backspace' || value === 'caps lock' || value === 'shift') {
          this.key.style.flexBasis = 13 + '%';
          this.key.style.maxWidth = 10 + 'rem';
          this.key.style.background = this.color;
        } else if (value === 'enter') {
          this.key.style.flexBasis = 11 + '%';
          this.key.style.maxWidth = 7 + 'rem';
          this.key.style.background = this.color;
        } else if (value === 'space') {
          this.key.style.flexGrow = 1;
          this.key.style.maxWidth = 37 + '%';
          this.key.textContent = '';
        } else if (value === 'ctrl') {
          this.key.style.flexBasis = 8 + '%';
          this.key.style.maxWidth = 5 + 'rem';
          this.key.style.background = this.color;
        } else if (value === 'arrowup') {
          this.span.textContent = '';
          this.key.classList.add('arrow__up', 'arrow');
        } else if (value === 'arrowdown') {
          this.span.textContent = '';
          this.key.classList.add('arrow__down', 'arrow');
        } else if (value === 'arrowleft') {
          this.span.textContent = '';
          this.key.classList.add('arrow__left', 'arrow');
        } else if (value === 'arrowright') {
          this.span.textContent = '';
          this.key.classList.add('arrow__right', 'arrow');
        } else if (
          value === '`' ||
          value === 'tab' ||
          value === 'win' ||
          value === 'alt' ||
          value === 'del' ||
          value === 'shift '
        ) {
          this.key.style.background = this.color;
        }
        this.keys.append(this.key);
        for (let [key2, value2] of Object.entries(keyLayout.auxiliarySymbols)) {
          if (key2 === value) {
            this.span = document.createElement('span');
            this.span.classList.add('keyboard__key-aux');
            this.key.classList.add('keyboard__key-special');
            this.span.textContent = value2;
            this.key.append(this.span);
          }
        }
      }
      return this.keys;
    }
  }
  let wrapper = new Keyboard('rgb(101 104 106)');
  wrapper.createWrapper();
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
  
  const writeArea = (item) => {
    let curPosCursor = textArea.selectionStart;
    const start = textArea.value.slice(0, curPosCursor);
    const end = textArea.value.slice(curPosCursor);
  
    for (let [key3, value3] of Object.entries(keyLayout.mainKey)) {
      if (btnCaps.classList.contains('active')) {
        value3 = value3.toUpperCase();
      }
      if (
        btnShiftLeft.classList.contains('active') ||
        btnShiftRight.classList.contains('active')
      ) {
        btnSpecial.forEach((el) => el.classList.add('active'));
        btnAux.forEach((el) => el.classList.add('active'));
      }
      if (key3 === item.dataset.keycode && !keyLayout.specialKey.includes(key3)) {
        if (
          btnShiftLeft.classList.contains('active') ||
          btnShiftRight.classList.contains('active')
        ) {
          if (btnCaps.classList.contains('active')) {
            value3 = value3.toLowerCase();
          } else {
            value3 = value3.toUpperCase();
          }
          for (let [key4, value4] of Object.entries(keyLayout.auxiliarySymbols)) {
            if (key4 === value3) {
              value3 = value4;
            }
          }
        }
        textArea.value = `${start}${value3}${end}`;
        curPosCursor += 1;
      }
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
    } else if (item.dataset.keycode === 'ArrowDown') {
    }
    textArea.setSelectionRange(curPosCursor, curPosCursor);
  };
  
  const eventKeyAdd = (event) => {
    btn.forEach((el) => {
      if (event.code === el.dataset.keycode && event.code === 'CapsLock') {
        if (el.classList.contains('active')) {
          el.classList.remove('active');
        } else {
          el.classList.add('active');
        }
      }
      if (event.code === el.dataset.keycode && event.code !== 'CapsLock') {
        event.preventDefault();
        el.classList.add('active');
        writeArea(el);
      }
    });
  };
  const eventKeyRemove = (event) => {
    btn.forEach((el) => {
      if (event.code === el.dataset.keycode && event.code !== 'CapsLock') {
        el.classList.remove('active');
      }
    });
    if (
      !btnShiftLeft.classList.contains('active') ||
      !btnShiftRight.classList.contains('active')
    ) {
      btnSpecial.forEach((el) => el.classList.remove('active'));
      btnAux.forEach((el) => el.classList.remove('active'));
    }
  };
  
  document.addEventListener('keydown', (event) => {
    eventKeyAdd(event);
  });
  document.addEventListener('keyup', (event) => {
    eventKeyRemove(event);
  });
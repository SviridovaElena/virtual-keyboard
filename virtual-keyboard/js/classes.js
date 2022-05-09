import { keys, auxKeys } from './data.js';

class Keyboard {
  constructor(color = 'grey') {
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
    this.keyboard.append(this.createKeys(keys.en));
  }

  createKeys(obj) {
    for (let [key, value] of Object.entries(obj)) {
      this.key = document.createElement('button');
      this.key.classList.add('keyboard__key');
      this.key.setAttribute('data-keyCode', `${key}`);
      const mainText = document.createElement('span');
      mainText.classList.add('keyboard__key-main');
      this.key.append(mainText);
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
        mainText.textContent = '';
        this.key.classList.add('arrow__up', 'arrow');
      } else if (value === 'arrowdown') {
        mainText.textContent = '';
        this.key.classList.add('arrow__down', 'arrow');
      } else if (value === 'arrowleft') {
        mainText.textContent = '';
        this.key.classList.add('arrow__left', 'arrow');
      } else if (value === 'arrowright') {
        mainText.textContent = '';
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
      for (let [key2, value2] of Object.entries(auxKeys.en)) {
        if (key2 === key) {
          const auxText = document.createElement('span');
          auxText.classList.add('keyboard__key-aux');
          this.key.classList.add('keyboard__key-special');
          auxText.textContent = value2;
          this.key.append(auxText);
        }
      }
    }
    return this.keys;
  }
}

export { Keyboard };
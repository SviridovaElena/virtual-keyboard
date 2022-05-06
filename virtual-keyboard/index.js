const keyLayout = [
    '`',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
    'backspace',
    'tab',
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    '[',
    ']',
    '/',
    'del',
    'caps lock',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    ';',
    "'",
    'enter',
    'shift',
    '/',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    '.',
    ',',
    '/',
    '',
    'shift',
    'ctrl',
    'win',
    'alt',
    'space',
    'alt',
    'ctrl',
    '',
    '',
    '',
  ];
  class Keyboard {
    constructor() {
      this.wrapper = null;
      this.content = null;
      this.keyboard = null;
      this.keys = null;
      this.key = null;
      this.transfer = null;
    }
  
    createWrapper() {
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('wrapper');
      document.body.append(this.wrapper);
      this.content = document.createElement('div');
      this.content.classList.add('content');
      this.wrapper.append(this.content);
      this.keyboard = document.createElement('div');
      this.keyboard.classList.add('content__keyboard', 'keyboard');
      this.content.append(this.keyboard);
      this.keys = document.createElement('div');
      this.keys.classList.add('keyboard__keys');
      this.keyboard.append(this.createKeys(keyLayout));
    }
  
    createKeys(obj) {
      for (let i = 0; i < obj.length; i++) {
        this.key = document.createElement('button');
        this.key.classList.add('keyboard__key');
        this.key.textContent = obj[i].toUpperCase();
        if (obj[i] === 'backspace' || obj[i] === 'caps lock') {
          this.key.style.flexBasis = 12 + '%';
          this.key.style.maxWidth = 7 + 'rem';
        } else if (obj[i] === 'enter') {
          this.key.style.flexBasis = 10 + '%';
          this.key.style.maxWidth = 7 + 'rem';
        }
        this.keys.append(this.key);
      }
      return this.keys;
    }
  }
  let wrapper = new Keyboard();
  wrapper.createWrapper();
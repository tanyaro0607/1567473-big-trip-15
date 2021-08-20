import {createElement} from '../utils.js';

// Проверка в конструкторе на "new.target" позволит использовать абстрактный класс только в качестве родительского класса.
//При попытке выполнить "new Abstract()" разработчик получит ошибку
export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;   // - Объявим свойство _element
  }

  //- Объявим методы getElement и removeElement
  // - Метод getTemplate тоже объявим, но в качестве реализации будем бросать исключение, чтобы разработчик не забывал его переопределить

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

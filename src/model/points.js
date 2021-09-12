import AbstractObserver from '../utils/abstract-observer.js';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = []; //абстрактное свойство, где мы будем хранить точки
  }

  // метод, записывает в модель данные
  setPoints(points) {
    this._points = points.slice();
  }

  // метод, возврашает значение приватного св-ва _points
  getPoints() {
    return this._points;
  }
}

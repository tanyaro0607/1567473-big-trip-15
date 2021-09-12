export default class AbstractObserver {
  constructor() {
    this._observers = new Set();
  }

  addObserver(observer) {
    this._observers.add(observer);
  }

  removeObserver(observer) {
    this._observers.delete(observer);
  }

  // уведомление об изменениях
  // принимает тип изменения(event) и данные(payload)
  _notify(event, payload) {
    this._observers.forEach((observer) => observer(event, payload));
  }
}

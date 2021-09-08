import Abstract from './abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  // обновление состояния - принимает объект с обнолвениями
  // метод, который будет обновлять данные в свойстве _data, а потом вызывать обновление шаблона
  updateData(update, justDataUpdating) {
    // если изменения не было, вернуть как было
    if (!update) {
      return;
    }

    // если изменение было
    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  // обновдение элемента
  // задача метода - удалить старый DOM элемент, вызвать генерацию нового и заменить один на другой
  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}

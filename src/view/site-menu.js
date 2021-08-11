import {createElement} from '../utils.js';

// Функцию для генерации HTML-разметки можно превратить в метод класса,
// однако делать мы этого не будем, чтобы не раздувать diff изменений

const createSiteMenuTemplate = () => (
  `<div class="trip-main__trip-controls  trip-controls">
  <div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>
  </div>`
);

//описываем класс(элемент интерфейса) с меню
export default class SiteMenu {
  //ф-я конструктор, помогает нам создавать экземпляр класса
  constructor() {
    this._element = null; //описываем приватное поле, которое будет хранить ссылку на меню
  }

  //описываем три метода
  //1-публичный метод, который возвращает разметку
  getTemplate() {
    return createSiteMenuTemplate(); //вызываем функцию с разметкой
  }

  //2,3 приватные методы
  //добавляет элемент
  getElement() {
    //проверка: если в поле элемент ничего нет
    if (!this._element) {
      //то в это поле мы присваиваем результат выполнения ф-ии createElement, которая принимает параметром разметку - результат вызова метода getElement
      this._element = createElement(this.getTemplate());
    }
    //если условие не выполнилось, то вернуть существующий элемент
    return this._element;
  }

  //удаляет элемент
  removeElement() {
    this._element = null;
  }
}

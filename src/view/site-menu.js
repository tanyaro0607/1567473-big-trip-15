import AbstractView from './abstract.js';
import {MenuItem} from '../const.js';

// Функцию для генерации HTML-разметки можно превратить в метод класса,
// однако делать мы этого не будем, чтобы не раздувать diff изменений

const createSiteMenuTemplate = () => (
  `<div class="trip-main__trip-controls  trip-controls">
  <div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn" href="#" data-name="${MenuItem.TABLE}">Table</a>
      <a class="trip-tabs__btn" href="#" data-name="${MenuItem.STATS}">Stats</a>
    </nav>
  </div>`
);

//описываем класс(элемент интерфейса) с меню
export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(); //вызываем функцию с разметкой
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.name);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('change', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-name=${menuItem}]`);

    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
    }
    item.classList.remove('trip-tabs__btn--active');
  }

  // addClassItem(menuItem) {
  //   this.getElement().querySelector(`[data-name=${menuItem}]`).classList.add('trip-tabs__btn--active');
  // }

  // removeClassItem(menuItem) {
  //   this.getElement().querySelector(`[data-name=${menuItem}]`).classList.remove('trip-tabs__btn--active');
  // }

}

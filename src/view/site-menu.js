import AbstractView from './abstract.js';

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
export default class SiteMenu extends AbstractView {

  getTemplate() {
    return createSiteMenuTemplate(); //вызываем функцию с разметкой
  }

}

import {createSiteMenuTemplate} from './view/site-menu.js'; //Меню
import {createTripInfoTemplate} from './view/trip-info.js'; //Маршрут и стоимость
import {createFilterTemplate} from './view/filter.js'; //Фильтр
import {createSortFormTemplate} from './view/form-sort.js'; //Сортировка
import {createNewEventTemplate} from './view/add-new-event.js'; //Форма редактирования
import {createEditFormTemplate} from './view/form-edit.js'; //Форма редактирования
import {createEventListTemplate} from './view/form-event-list.js'; //Форма редактирования

//Функция для отрисовки компонентов
//принимает контейнер, вёрстку и место в контейнере для отрисовки
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.trip-main');
const siteMainNavigationElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');
const TRIP_POINT_COUNT = 3;

for (let i = 0; i < TRIP_POINT_COUNT; i++) {
  render(siteEventsElement, createEventListTemplate(), 'beforeend');
}


render(siteMainNavigationElement, createSiteMenuTemplate(), 'beforeend'); //Меню
render(siteMainElement, createTripInfoTemplate(), 'afterbegin'); //Маршрут и стоимость
render(siteFilterElement, createFilterTemplate(), 'beforeend'); //Фильтр
render(siteEventsElement, createSortFormTemplate(), 'afterbegin'); //Сортировка
render(siteEventsElement, createNewEventTemplate(), 'beforebegin'); //Добавление
render(siteEventsElement, createEditFormTemplate(), 'afterbegin'); //Редактирование

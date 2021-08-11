import {createSiteMenuTemplate} from './view/site-menu.js'; //Меню
import {createTripInfoTemplate} from './view/trip-info.js'; //Маршрут и стоимость
import {createFilterTemplate} from './view/filter.js'; //Фильтр
import {createSortFormTemplate} from './view/form-sort.js'; //Сортировка
import {createEditFormTemplate} from './view/form-edit-and-add.js'; //Форма редактирования
import {createListEventTemplate} from './view/form-list-event.js'; // Cписок
import {createEventTemplate} from './view/form-trip-point.js'; // Точки
import {generateTripPoint} from './moсk/trip-point- mock.js';
import {renderTemplate} from './utils.js';

// console.log(generateTripPoint())

//создаем массив объектов описывающих 20 точек маршрута
const TEST_POINT_COUNT = 20;
const points = new Array(TEST_POINT_COUNT).fill().map(generateTripPoint);
// console.log(points)

const siteMainElement = document.querySelector('.trip-main');
const siteMainNavigationElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');
const TRIP_POINT_COUNT = 3;

renderTemplate(siteEventsElement,createListEventTemplate(), 'beforeend'); //Список

const eventList = document.querySelector('.trip-events__list');

//Отрисовка точек
for (let i = 0; i < TRIP_POINT_COUNT; i++) {
  renderTemplate(eventList,createEventTemplate(points[i]), 'beforeend');
}

renderTemplate(siteMainNavigationElement, createSiteMenuTemplate(), 'beforeend'); //Меню
renderTemplate(siteMainElement,createTripInfoTemplate(points), 'afterbegin'); //Маршрут и стоимость
renderTemplate(siteFilterElement,createFilterTemplate(), 'beforeend'); //Фильтр
renderTemplate(siteEventsElement,createSortFormTemplate(), 'afterbegin'); //Сортировка
renderTemplate(eventList,createEditFormTemplate(points[0]), 'afterbegin'); //Редактирование

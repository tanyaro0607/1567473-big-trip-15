import {createSiteMenuTemplate} from './view/site-menu.js'; //Меню
import {createTripInfoTemplate} from './view/trip-info.js'; //Маршрут и стоимость
import {createFilterTemplate} from './view/filter.js'; //Фильтр
import {createSortFormTemplate} from './view/form-sort.js'; //Сортировка
import {createEditFormTemplate} from './view/form-edit-and-add.js'; //Форма редактирования
import {createListEventTemplate} from './view/form-list-event.js'; // Cписок
import {createEventTemplate} from './view/form-trip-point.js'; // Точки
import {generateTripPoint} from './moсk/trip-point- mock.js';

// console.log(generateTripPoint())

//создаем массив объектов описывающих 20 точек маршрута
const TEST_POINT_COUNT = 20;
const points = new Array(TEST_POINT_COUNT).fill().map(generateTripPoint);
// console.log(points)

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

render(siteEventsElement,createListEventTemplate(), 'beforeend'); //Список

const eventList = document.querySelector('.trip-events__list');

//Отрисовка точек
for (let i = 0; i < TRIP_POINT_COUNT; i++) {
  render(eventList,createEventTemplate(points[i]), 'beforeend');
}

render(siteMainNavigationElement, createSiteMenuTemplate(), 'beforeend'); //Меню
render(siteMainElement,createTripInfoTemplate(points), 'afterbegin'); //Маршрут и стоимость
render(siteFilterElement,createFilterTemplate(), 'beforeend'); //Фильтр
render(siteEventsElement,createSortFormTemplate(), 'afterbegin'); //Сортировка
render(eventList,createEditFormTemplate(points[0]), 'afterbegin'); //Редактирование

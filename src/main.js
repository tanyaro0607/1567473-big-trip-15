import SiteMenuView from './view/site-menu.js'; //Меню
import {createTripInfoTemplate} from './view/trip-info.js'; //Маршрут и стоимость
import FilterView from './view/filter.js'; //Фильтр
import SortFormView from './view/form-sort.js'; //Сортировка
import {createEditFormTemplate} from './view/form-edit-and-add.js'; //Форма редактирования
import ListTripPointView from './view/form-list-trip-points'; // Cписок
import {createEventTemplate} from './view/form-trip-point.js'; // Точки
import {generateTripPoint} from './moсk/trip-point- mock.js';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

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

renderElement(siteEventsElement, new ListTripPointView().getElement(), RenderPosition.BEFOREEND); //Список

const eventList = document.querySelector('.trip-events__list');

//Отрисовка точек
for (let i = 0; i < TRIP_POINT_COUNT; i++) {
  renderTemplate(eventList,createEventTemplate(points[i]), 'beforeend');
}

renderElement(siteMainNavigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); //Меню
renderTemplate(siteMainElement,createTripInfoTemplate(points), 'afterbegin'); //Маршрут и стоимость
renderElement(siteFilterElement, new FilterView().getElement(), RenderPosition.BEFOREEND); //Фильтр
renderElement(siteEventsElement, new SortFormView().getElement(), RenderPosition.AFTERBEGIN); //Сортировка
renderTemplate(eventList,createEditFormTemplate(points[0]), 'afterbegin'); //Редактирование

//ф-я renderElement принимает три параметра: сслыку на контейнер, сам элемент, место - куда поместить //куда, что, где
//new SiteMenuView().getElement() - создаем экземпляр класса через new и вызываем метод getElement

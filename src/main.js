import SiteMenuView from './view/site-menu.js'; //Меню
import TripInfoSectionView from './view/trip-info-section.js'; // Cписок
import TripInfoView from './view/trip-info.js'; //Маршрут и стоимость
import TripInfoCostView from './view/trip-info-cost.js'; //Маршрут и стоимость
import FilterView from './view/filter.js'; //Фильтр
import SortFormView from './view/form-sort.js'; //Сортировка
import TripPointEditView from './view/form-edit-and-add.js'; //Форма редактирования
import ListTripPointView from './view/form-list-trip-points'; // Cписок
import TripPointView from './view/form-trip-point.js'; // Точки
import {generateTripPoint} from './moсk/trip-point- mock.js';
import {render, RenderPosition} from './utils.js';

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

const listTripPointComponent = new ListTripPointView();
render(siteEventsElement, listTripPointComponent.getElement(), RenderPosition.BEFOREEND); //Список

//Отрисовка точек
for (let i = 0; i < TRIP_POINT_COUNT; i++) {
  render(listTripPointComponent.getElement(), new TripPointView(points[i]).getElement(), RenderPosition.BEFOREEND);
}

const tripInfoSectionComponent = new TripInfoSectionView();

render(siteMainNavigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); //Меню
render(siteMainElement, tripInfoSectionComponent.getElement(), RenderPosition.AFTERBEGIN); //Маршрут и стоимость - список

render(tripInfoSectionComponent.getElement(), new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN); //Маршрут и стоимость
render(tripInfoSectionComponent.getElement(), new TripInfoCostView().getElement(), RenderPosition.BEFOREEND); //Маршрут и стоимость
render(siteFilterElement, new FilterView().getElement(), RenderPosition.BEFOREEND); //Фильтр
render(siteEventsElement, new SortFormView().getElement(), RenderPosition.AFTERBEGIN); //Сортировка
render(listTripPointComponent.getElement(),new TripPointEditView(points[0]).getElement(), RenderPosition.AFTERBEGIN); //Редактирование

//ф-я renderElement принимает три параметра: сслыку на контейнер, сам элемент, место - куда поместить //куда, что, где
//new SiteMenuView().getElement() - создаем экземпляр класса через new и вызываем метод getElement

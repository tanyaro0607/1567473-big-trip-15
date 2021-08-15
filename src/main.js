import SiteMenuView from './view/site-menu.js'; //Меню
import TripInfoSectionView from './view/trip-info-section.js'; // контейнер для маршрута и стоимости
import TripInfoView from './view/trip-info.js'; //Маршрут
import TripInfoCostView from './view/trip-info-cost.js'; //стоимость
import FilterView from './view/filter.js'; //Фильтр
import SortFormView from './view/form-sort.js'; //Сортировка
import TripPointEditView from './view/form-edit-and-add.js'; //Форма редактирования
import ListTripPointView from './view/form-list-trip-points'; // контейнер для точек маршрута
import TripPointView from './view/form-trip-point.js'; // Точки маршрута
import {generateTripPoint} from './moсk/trip-point- mock.js'; //временные данные
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

//отрисовка задач и формы редактирования
const renderTripPoint = (tripPointListElement, point) => {
  const tripPointComponent = new TripPointView(point);
  const tripPointEditComponent = new TripPointEditView(point);

  const replacePointToFormEdit = () => {
    tripPointListElement.replaceChild(tripPointEditComponent.getElement(), tripPointComponent.getElement());
  };

  const replaceFormEditToPoint = () => {
    tripPointListElement.replaceChild(tripPointComponent.getElement(), tripPointEditComponent.getElement());
  };
  //действия при клике на кнопку
  tripPointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToFormEdit();
  });

  tripPointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormEditToPoint();
  });

  render(tripPointListElement, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
};

// отрисовка контейнера для точек маршрута
const listTripPointComponent = new ListTripPointView();
render(siteEventsElement, listTripPointComponent.getElement(), RenderPosition.BEFOREEND);

//Отрисовка точек маршрута
for (let i = 0; i < TRIP_POINT_COUNT; i++) {
  renderTripPoint(listTripPointComponent.getElement(), points[i]);
}

const tripInfoSectionComponent = new TripInfoSectionView(); //контейнер для маршрута и стоимости

render(siteMainNavigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); //отриосвка Меню
render(siteMainElement, tripInfoSectionComponent.getElement(), RenderPosition.AFTERBEGIN); //отриосвка контейнера для маршрута и стоимости
render(tripInfoSectionComponent.getElement(), new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN); //отриосвка Маршрута
render(tripInfoSectionComponent.getElement(), new TripInfoCostView().getElement(), RenderPosition.BEFOREEND); //отриосвка стоимости
render(siteFilterElement, new FilterView().getElement(), RenderPosition.BEFOREEND); //отриосвка Фильтра
render(siteEventsElement, new SortFormView().getElement(), RenderPosition.AFTERBEGIN); //отриосвка Сортировки
// render(listTripPointComponent.getElement(),new TripPointEditView(points[0]).getElement(), RenderPosition.AFTERBEGIN); //отриосвка формы Редактирования

//new SiteMenuView().getElement() - создаем экземпляр класса через new и вызываем метод getElement

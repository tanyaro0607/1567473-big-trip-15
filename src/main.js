import SiteMenuView from './view/site-menu.js'; //Меню
import TripInfoSectionView from './view/trip-info-section.js'; // контейнер для маршрута и стоимости
import TripInfoView from './view/trip-info.js'; //Маршрут
import TripInfoCostView from './view/trip-info-cost.js'; //стоимость
import FilterView from './view/filter.js'; //Фильтр
import {generateTripPoint} from './moсk/trip-point- mock.js'; //временные данные
import {render, RenderPosition} from './utils/render.js';
import TripPresenter from './presenter/trip.js';

//создаем массив объектов описывающих 20 точек маршрута
const TEST_POINT_COUNT = 3;
const points = new Array(TEST_POINT_COUNT).fill().map(generateTripPoint);

const siteMainElement = document.querySelector('.trip-main');
const siteMainNavigationElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter(siteEventsElement);
const tripInfoSectionComponent = new TripInfoSectionView(); //контейнер для маршрута и стоимости

render(siteMainNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND); //отриосвка Меню
render(siteMainElement, tripInfoSectionComponent, RenderPosition.AFTERBEGIN); //отриосвка контейнера для маршрута и стоимости
render(tripInfoSectionComponent, new TripInfoView(points), RenderPosition.AFTERBEGIN); //отриосвка Маршрута
render(tripInfoSectionComponent, new TripInfoCostView(), RenderPosition.BEFOREEND); //отриосвка стоимости
render(siteFilterElement, new FilterView(), RenderPosition.BEFOREEND); //отриосвка Фильтра

// const renderAddTripPoint = () => {
//   //действия при клике на кнопку New Event
//   document.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
//     render(listTripPointComponent,new TripPointEditView(), RenderPosition.AFTERBEGIN); //отриосвка формы Редактирования
//   });
// };

// renderAddTripPoint();

// //действия при клике на доп услуги
// document.querySelectorAll('.event__offer-label').addEventListener('click', () => {
//   //
// });


tripPresenter.init(points);

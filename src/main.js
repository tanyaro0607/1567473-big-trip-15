import SiteMenuView from './view/site-menu.js'; //Меню
import TripInfoSectionView from './view/trip-info-section.js'; // контейнер для маршрута и стоимости
import TripInfoView from './view/trip-info.js'; //Маршрут
import TripInfoCostView from './view/trip-info-cost.js'; //стоимость
import FilterView from './view/filter.js'; //Фильтр
import {generatePoint} from './moсk/point-mock.js'; //временные данные
import {render, RenderPosition} from './utils/render.js';
import TripPresenter from './presenter/trip.js';

//создаем массив объектов описывающих 20 точек маршрута
const POINT_COUNT = 3;
const points = new Array(POINT_COUNT).fill().map(generatePoint);

const siteMainElement = document.querySelector('.trip-main');
const siteMainNavigationElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const pointsContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter(pointsContainer);
const tripInfoSectionComponent = new TripInfoSectionView(); //контейнер для маршрута и стоимости

render(siteMainNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND); //отриосвка Меню
render(siteMainElement, tripInfoSectionComponent, RenderPosition.AFTERBEGIN); //отриосвка контейнера для маршрута и стоимости
render(tripInfoSectionComponent, new TripInfoView(points), RenderPosition.AFTERBEGIN); //отриосвка Маршрута
render(tripInfoSectionComponent, new TripInfoCostView(), RenderPosition.BEFOREEND); //отриосвка стоимости
render(siteFilterElement, new FilterView(), RenderPosition.BEFOREEND); //отриосвка Фильтра

// const renderAddPoint = () => {
//   //действия при клике на кнопку New Event
//   document.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
//     render(listPointComponent,new PointEditView(), RenderPosition.AFTERBEGIN); //отриосвка формы Редактирования
//   });
// };

// renderAddPoint();

// //действия при клике на доп услуги
// document.querySelectorAll('.event__offer-label').addEventListener('click', () => {
//   //
// });


tripPresenter.init(points);

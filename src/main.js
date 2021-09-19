import SiteMenuView from './view/site-menu.js'; //Меню
import TripInfoSectionView from './view/trip-info-section.js'; // контейнер для маршрута и стоимости
import TripInfoView from './view/trip-info.js'; //Маршрут
import TripInfoCostView from './view/trip-info-cost.js'; //стоимость
import PointsModel from './model/points.js';
import {generatePoint} from './moсk/point-mock.js'; //временные данные
import {render, RenderPosition, remove} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import StatsView from './view/stats.js';
import {MenuItem} from './const.js';

//создаем массив объектов описывающих 20 точек маршрута
const POINT_COUNT = 12;
const points = new Array(POINT_COUNT).fill().map(generatePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);
const filterModel = new FilterModel();

const siteMainElement = document.querySelector('.trip-main');
const siteMenuComponent = new SiteMenuView();
const siteMainNavigationElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const pointsContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter(pointsContainer, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const tripInfoSectionComponent = new TripInfoSectionView(); //контейнер для маршрута и стоимости

render(siteMainNavigationElement, siteMenuComponent, RenderPosition.BEFOREEND); //отриосвка Меню
render(siteMainElement, tripInfoSectionComponent, RenderPosition.AFTERBEGIN); //отриосвка контейнера для маршрута и стоимости
render(tripInfoSectionComponent, new TripInfoView(points), RenderPosition.AFTERBEGIN); //отриосвка Маршрута
render(tripInfoSectionComponent, new TripInfoCostView(), RenderPosition.BEFOREEND); //отриосвка стоимости
const statsContainer = document.querySelector('main.page-body__page-main .page-body__container');
let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statsComponent);
      tripPresenter.init();
      statsComponent = null;
      siteMenuComponent.addClassItem(MenuItem.TABLE);
      siteMenuComponent.removeClassItem(MenuItem.STATS);
      document.querySelector('.trip-main__event-add-btn').disabled = false;
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statsComponent = new StatsView(pointsModel.getPoints());
      render(statsContainer, statsComponent, RenderPosition.AFTERBEGIN);
      document.querySelector('.trip-main__event-add-btn').disabled = true;
      siteMenuComponent.addClassItem(MenuItem.STATS);
      siteMenuComponent.removeClassItem(MenuItem.TABLE);
      document.querySelectorAll('.trip-filters__filter-input').forEach((it) => it.disabled = true);
      break;
  }
};

const addPointButton = document.querySelector('.trip-main__event-add-btn');

const handleNewPointFormClose = () => {
  addPointButton.disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

addPointButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  addPointButton.disabled = true;
  tripPresenter.createPoint(handleNewPointFormClose);
});

// document.querySelector('[data-name="TABLE"]').addEventListener('click', (evt) => {
//   evt.preventDefault();
//   tripPresenter.init();
// });

// document.querySelector('[data-name="STATS"]').addEventListener('click', (evt) => {
//   evt.preventDefault();
//   render(statsContainer, new StatsView(pointsModel.getPoints()), RenderPosition.BEFOREEND);
//   tripPresenter.destroy();
// });

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();
// рендер stats для отладки
// render(statsContainer, new StatsView(pointsModel.getPoints()), RenderPosition.AFTERBEGIN);


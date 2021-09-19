import SiteMenuView from './view/site-menu.js'; //Меню
import TripInfoSectionView from './view/trip-info-section.js'; // контейнер для маршрута и стоимости
// import TripInfoView from './view/trip-info.js'; //Маршрут
import TripInfoCostView from './view/trip-info-cost.js'; //стоимость
import PointsModel from './model/points.js';
import {render, RenderPosition, remove} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
// import StatsView from './view/stats.js';
import {MenuItem, UpdateType, FilterType} from './const.js';
import Api from './api.js';

//создаем массив объектов описывающих 20 точек маршрута
const AUTHORIZATION = 'Basic taNYa6d7Sk1l1g15f';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const siteMainElement = document.querySelector('.trip-main');
const siteMainNavigationElement = document.querySelector('.trip-controls__navigation');

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const siteMenuComponent = new SiteMenuView();
const tripInfoSectionComponent = new TripInfoSectionView(); //контейнер для маршрута и стоимости
const siteFilterElement = document.querySelector('.trip-controls__filters');
const pointsContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter(pointsContainer, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);

render(siteMainElement, tripInfoSectionComponent, RenderPosition.AFTERBEGIN); //отриосвка контейнера для маршрута и стоимости
// render(tripInfoSectionComponent, new TripInfoView(), RenderPosition.AFTERBEGIN); //отриосвка Маршрута
render(tripInfoSectionComponent, new TripInfoCostView(), RenderPosition.BEFOREEND); //отриосвка стоимости
const statsContainer = document.querySelector('page-body__stats-container');
let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statsComponent);
      tripPresenter.init();
      statsComponent = null;
      // siteMenuComponent.addClassItem(MenuItem.TABLE);
      // siteMenuComponent.removeClassItem(MenuItem.STATS);
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      document.querySelector('.trip-main__event-add-btn').disabled = false;
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statsComponent = new StatsView(pointsModel.getPoints());
      document.querySelector('.trip-main__event-add-btn').disabled = true;
      // siteMenuComponent.addClassItem(MenuItem.STATS);
      // siteMenuComponent.removeClassItem(MenuItem.TABLE);
      document.querySelectorAll('.trip-filters__filter-input').forEach((it) => it.disabled = true);
      render(statsContainer, statsComponent, RenderPosition.AFTERBEGIN);
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

render(siteMainNavigationElement, siteMenuComponent, RenderPosition.BEFOREEND); //отриосвка Меню
filterPresenter.init();
tripPresenter.init();
// рендер stats для отладки
// render(statsContainer, new StatsView(pointsModel.getPoints()), RenderPosition.AFTERBEGIN);

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });


import SiteMenuView from './view/site-menu.js'; //Меню
import PointsModel from './model/points.js';
import {render, RenderPosition, remove} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import StatsView from './view/stats.js';
import DestinationsModel from './model/destinations.js';
import OffersModel from './model/offers.js';
import {MenuItem, UpdateType, FilterType} from './const.js';
import Api from './api.js';

//создаем массив объектов описывающих 20 точек маршрута
const AUTHORIZATION = 'Basic taNYa6d7Sk1l1g12f';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';
const siteMainNavigationElement = document.querySelector('.trip-controls__navigation');
const api = new Api(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const siteMenuComponent = new SiteMenuView();
const siteFilterElement = document.querySelector('.trip-controls__filters');
const pointsContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter(pointsContainer, pointsModel, filterModel, api, offersModel, destinationsModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const statsContainer = document.querySelector('.page-body__stats-container');
const addPointButton = document.querySelector('.trip-main__event-add-btn');
let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.destroy();
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      tripPresenter.init();
      filterPresenter.init();
      remove(statsComponent);
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      document.querySelector('.trip-main__event-add-btn').disabled = false;
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      siteMenuComponent.setMenuItem(MenuItem.STATS);
      statsComponent = new StatsView(pointsModel.getPoints());
      render(statsContainer, statsComponent, RenderPosition.AFTERBEGIN);
      document.querySelector('.trip-main__event-add-btn').disabled = true;
      break;
  }
};

const handleNewPointFormClose = () => {
  addPointButton.disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

addPointButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  addPointButton.disabled = true;
  tripPresenter.createPoint(handleNewPointFormClose);
});

render(siteMainNavigationElement, siteMenuComponent, RenderPosition.BEFOREEND); //отриосвка Меню
siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
filterPresenter.init();
tripPresenter.init();

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });


api.getOffers().then((res) => offersModel.setOffers(res));
api.getDestinations().then((res) => destinationsModel.setDestinations(res));

import SiteMenuView from './view/site-menu.js'; //Меню
import TripInfoSectionView from './view/trip-info-section.js'; // контейнер для маршрута и стоимости
import TripInfoView from './view/trip-info.js'; //Маршрут
import TripInfoCostView from './view/trip-info-cost.js'; //стоимость
import FilterView from './view/filter.js'; //Фильтр
import SortFormView from './view/form-sort.js'; //Сортировка
import TripPointEditView from './view/form-edit-and-add.js'; //Форма редактирования
import ListTripPointView from './view/form-list-trip-points'; // контейнер для точек маршрута
import TripPointView from './view/form-trip-point.js'; // Точки маршрута
import NoTripPointView from './view/no-trip-point.js';
import {generateTripPoint} from './moсk/trip-point- mock.js'; //временные данные
import {render, RenderPosition, replace} from './utils/render.js';
// import TripPresenter from './presenter/trip';


//создаем массив объектов описывающих 20 точек маршрута
const TEST_POINT_COUNT = 20;
const points = new Array(TEST_POINT_COUNT).fill().map(generateTripPoint);

const siteMainElement = document.querySelector('.trip-main');
const siteMainNavigationElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');

// отрисовка контейнера для точек маршрута
const listTripPointComponent = new ListTripPointView();
render(siteEventsElement, listTripPointComponent, RenderPosition.BEFOREEND);

//отрисовка задач и формы редактирования
const renderTripPoint = (tripPointListElement, point) => {
  const tripPointComponent = new TripPointView(point);
  const tripPointEditComponent = new TripPointEditView(point);

  const replacePointToFormEdit = () => {
    replace(tripPointEditComponent, tripPointComponent);
  };

  const replaceFormEditToPoint = () => {
    replace(tripPointComponent, tripPointEditComponent);
  };

  //закрытие формы редактирования по Esc
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  //действия при клике на кнопку - открывает форму редактирования
  tripPointComponent.setEditClickHandler(() => {
    replacePointToFormEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  //действия при отправке формы релактирования
  tripPointEditComponent.setFormSubmitHandler(() => {
    replaceFormEditToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  //действия при клике на кнопку - закрывает форму редактирвования
  tripPointEditComponent.setEditClickHandler(() => {
    replaceFormEditToPoint();
    document.addEventListener('keydown', onEscKeyDown);
  });

  render(tripPointListElement, tripPointComponent, RenderPosition.BEFOREEND);
};

//Отрисовка точек маршрута
const TRIP_POINT_COUNT = points.length = 3;
if (points.every((point) => point.isArchive)) {
  render(siteEventsElement, new NoTripPointView(), RenderPosition.BEFOREEND);
} else {
  for (let i = 0; i < TRIP_POINT_COUNT; i++) {
    renderTripPoint(listTripPointComponent, points[i]);
  }
}

const tripInfoSectionComponent = new TripInfoSectionView(); //контейнер для маршрута и стоимости

render(siteMainNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND); //отриосвка Меню
render(siteMainElement, tripInfoSectionComponent, RenderPosition.AFTERBEGIN); //отриосвка контейнера для маршрута и стоимости
render(tripInfoSectionComponent, new TripInfoView(points), RenderPosition.AFTERBEGIN); //отриосвка Маршрута
render(tripInfoSectionComponent, new TripInfoCostView(), RenderPosition.BEFOREEND); //отриосвка стоимости
render(siteFilterElement, new FilterView(), RenderPosition.BEFOREEND); //отриосвка Фильтра
render(siteEventsElement, new SortFormView(), RenderPosition.AFTERBEGIN); //отриосвка Сортировки

const renderAddTripPoint = () => {
  //действия при клике на кнопку New Event
  document.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
    render(listTripPointComponent,new TripPointEditView(), RenderPosition.AFTERBEGIN); //отриосвка формы Редактирования
  });
};

renderAddTripPoint();

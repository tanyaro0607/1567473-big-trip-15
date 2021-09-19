import SortFormView from '../view/sort.js'; //Сортировка
import ListPointView from '../view/list-points'; // контейнер для точек маршрута
import PointView from '../view/point.js'; // Точки маршрута
import NoPointView from '../view/no-point.js';
import PointEditView from '../view/edit-point.js'; //Форма редактирования
import PointPresenter from './point.js';
import PointNewPresenter from './point-new.js';
import LoadingView from '../view/loading.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {sortByDay, sortByPrice, sortByTime} from '../utils/point.js';
import {filter} from '../utils/filter.js';
import {SortType, SortHeaders, UpdateType, UserAction, FilterType} from '../const.js';

const POINT_COUNT = 3;

export default class Trip {
  //инициализируем
  constructor(pointsContainer, pointsModel, filterModel, api) {
    this._pointsModel = pointsModel;
    this._pointsContainer = pointsContainer;
    this._filterModel = filterModel;
    this._renderedPointCount = POINT_COUNT;
    this._pointPresenter = new Map();
    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DAY;
    this._sortComponent = null;
    this._noPointComponent = null;
    this._isLoading = true;
    this._api = api;

    this._listPointComponent = new ListPointView();
    this._pointComponent = new PointView();
    this._noPointEditComponent = new PointEditView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._listPointComponent, this._handleViewAction);
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._listPointComponent);
    remove(this._pointsContainer);

    this._pointsModel.removeObserver(this._handleModelEvent); // отписываем от модели
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._currentSortType = SortType.DAY; //сброс сортровки на DAY
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING); //сброс фильтра на EVERYTHING
    this._pointNewPresenter.init(callback);
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[this._filterType](points); //фильтруем
    // сортируем результат
    switch (this._currentSortType) {
      case SortHeaders.TIME:
        return filtredPoints.sort(sortByTime);
      case SortHeaders.PRICE:
        return filtredPoints.sort(sortByPrice);
    }
    return filtredPoints.sort(sortByDay);
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  //список
  _renderPointsList() {
    render(this._pointsContainer, this._listPointComponent, RenderPosition.BEFOREEND);
    this._renderPoints();
  }

  //callback который будет передан вью
  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      // если пользователь решил обновить точку, то вызываем метод updatePoint
      case UserAction.UPDATE_POINT:
        this._api.updatePoint(update).then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        });
        break;
      // если пользователь решил добавить точку, то вызываем метод addPoint
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      // если пользователь решил удалить точку, то вызываем метод deletePoint
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  //callback который будет передан модели
  _handleModelEvent(updateType, data) {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip(); // - Очищаем список
    this._renderTrip(); // - Рендерим список заново
  }

  // сортировка
  _renderSort() {
    if (this._sortFormComponent !== null) {
      this._sortFormComponent = null;
    }

    this._sortFormComponent = new SortFormView(this._currentSortType);
    this._sortFormComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._pointsContainer, this._sortFormComponent, RenderPosition.AFTERBEGIN);
  }

  //точка маршрута
  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listPointComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter); //запоминает id
  }

  //все точки
  _renderPoints() {
    this._getPoints().slice().forEach((point) => this._renderPoint(point));
  }

  _renderLoading() {
    render(this._pointsContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  //если нет точек маршрута
  _renderNoPoints() {
    this._noPointComponent = new NoPointView(this._filterType);
    render(this._pointsContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();

    remove(this._loadingComponent);
    remove(this._sortFormComponent); // удаляем сортировку
    if (this._noPointComponent) {
      remove(this._noPointComponent);
    }
    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  // отрисовка всех методов
  _renderTrip() {
    const points = this._getPoints();
    const pointCount = points.length;

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    // если точек нет, рисуем заглушку
    if (pointCount === 0) {
      this._renderNoPoints();
      return;
    }

    // если точки есть, то
    this._renderSort();   // рисуем сортировку
    this._renderPointsList();     // и список точек

  }
}

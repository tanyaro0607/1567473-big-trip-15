import SortView from '../view/sort.js'; //Сортировка
import ListPointView from '../view/list-points.js'; // контейнер для точек маршрута
import PointView from '../view/point.js'; // Точки маршрута
import NoPointView from '../view/no-point.js';
import PointPresenter, {State as PointPresenterViewState} from './point.js';
import PointNewPresenter from './point-new.js';
import LoadingView from '../view/loading.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {sortByDay, sortByPrice, sortByTime} from '../utils/point.js';
import {filter} from '../utils/filter.js';
import {SortHeader, UpdateType, UserAction, FilterType} from '../const.js';

export default class Trip {
  //инициализируем
  constructor(pointsContainer, pointsModel, filterModel, api, offersModel, destinationsModel) {
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._pointsContainer = pointsContainer;
    this._filterModel = filterModel;
    this._pointPresenter = new Map();
    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortHeader.DAY.name;
    this._sortComponent = null;
    this._isLoading = true;
    this._api = api;

    this._listPointComponent = new ListPointView();
    this._pointComponent = new PointView(offersModel, destinationsModel);
    this._noPointComponent = null;
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._listPointComponent, this._handleViewAction, offersModel, destinationsModel);
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._listPointComponent);

    this._pointsModel.removeObserver(this._handleModelEvent); // отписываем от модели
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._currentSortType = SortHeader.DAY.name; //сброс сортровки на DAY
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING); //сброс фильтра на EVERYTHING
    this._pointNewPresenter.init(callback);
    remove(this._noPointComponent);
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints  = filter[this._filterType](points); //фильтруем
    // сортируем результат
    switch (this._currentSortType) {
      case SortHeader.TIME.name:
        return filtredPoints.sort(sortByTime);
      case SortHeader.PRICE.name:
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
        this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      // если пользователь решил добавить точку, то вызываем метод addPoint
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._pointNewPresenter.setAborting();
          });
        break;
      // если пользователь решил удалить точку, то вызываем метод deletePoint
      case UserAction.DELETE_POINT:
        this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
          });
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
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._pointsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  //точка маршрута
  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listPointComponent, this._handleViewAction, this._handleModeChange, this._offersModel, this._destinationsModel);
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
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();

    if (this._noPointComponent) {
      remove(this._noPointComponent);
    }
    remove(this._sortComponent);
    remove(this._loadingComponent);
    remove(this._listPointComponent);

    if (resetSortType) {
      this._currentSortType = SortHeader.DAY.name;
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
    this._renderSort(); // рисуем сортировку
    this._renderPointsList(); // и список точек
  }
}


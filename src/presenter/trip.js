import SortFormView from '../view/sort.js'; //Сортировка
import ListPointView from '../view/list-points'; // контейнер для точек маршрута
import PointView from '../view/point.js'; // Точки маршрута
import NoPointView from '../view/no-point.js';
import PointEditView from '../view/edit-point.js'; //Форма редактирования
import PointPresenter from './point.js';
import {render, RenderPosition} from '../utils/render.js';
import {sortByDay, sortByPrice, sortByTime} from '../utils/point.js';
import {SortType, SortHeaders} from '../const.js';

const POINT_COUNT = 3;

export default class Trip {
  //инициализируем
  constructor(pointsContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._pointsContainer = pointsContainer;
    this._renderedPointCount = POINT_COUNT;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._listPointComponent = new ListPointView();
    this._sortFormComponent = new SortFormView();
    this._pointComponent = new PointView();
    this._noPointComponent = new NoPointView();
    this._noPointEditComponent = new PointEditView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortHeaders.TIME:
        return this._pointsModel.getPoints().slice().sort(sortByTime);
      case SortHeaders.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortByPrice);
    }
    return this._pointsModel.getPoints().slice().sort(sortByDay);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  //список
  _renderPointsList() {
    render(this._pointsContainer, this._listPointComponent, RenderPosition.BEFOREEND);
    this._renderPoints();
  }

  //callback который будет передан вью
  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  //callback который будет передан модели
  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPointList(); // - Очищаем список
    this._renderPointsList(); // - Рендерим список заново
  }

  // сортировка
  _renderSort() {
    render(this._pointsContainer, this._sortFormComponent, RenderPosition.AFTERBEGIN);
    this._sortFormComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

  //если нет точек маршрута
  _renderNoPoints() {
    render(this._pointContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy()); //вызывает метод destroy у всех точек
    this._pointPresenter.clear(); //очищает
    this._renderedPointCount = POINT_COUNT;
  }

  // отрисовка всех методов
  _renderTrip() {
    if (this._getPoints().every((point) => point.isNoPoints)) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();   // - Очищаем список
    this._renderPointsList();     // - Рендерим список заново

  }
}

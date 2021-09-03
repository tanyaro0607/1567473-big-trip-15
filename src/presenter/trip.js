import SortFormView from '../view/sort.js'; //Сортировка
import ListPointView from '../view/list-points'; // контейнер для точек маршрута
import PointView from '../view/point.js'; // Точки маршрута
import NoPointView from '../view/no-point.js';
import PointEditView from '../view/edit-point.js'; //Форма редактирования
import PointPresenter from './point.js';
import {render, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {sortByDay, sortByPrice, sortByTime} from '../utils/point.js';
import {SortType, SortHeaders} from '../const.js';

const POINT_COUNT = 3;

export default class Trip {
  //инициализируем
  constructor(pointsContainer) {
    this._pointsContainer = pointsContainer;
    this._renderedPointCount = POINT_COUNT;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._listPointComponent = new ListPointView();
    this._sortFormComponent = new SortFormView();
    this._pointComponent = new PointView();
    this._noPointComponent = new NoPointView();
    this._noPointEditComponent = new PointEditView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  //рендер
  init(points) {
    this._points = points.slice(); //копия всех точек
    // Метод для инициализации (начала работы) модуля
    this._sourcedPoints = points.slice();

    this._renderTrip();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  //список
  _renderPointsList() {
    render(this._pointsContainer, this._listPointComponent, RenderPosition.BEFOREEND);
    this._renderPoints();
  }

  //метод, реалирующий на изменения в точке маршрута
  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint); //обновляем данные
    this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint); //находим нужную точку по id и вызываем метод init(перерисовываем)
  }

  _sortPoints(sortType) {


    switch (sortType) {
      case SortHeaders.TIME:
        this._points.sort(sortByTime);
        break;
      case SortHeaders.PRICE:
        this._points.sort(sortByPrice);
        break;
      default:
        this._points.sort(sortByDay);
    }

    this._currentSortType = sortType;
  }

  //
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType); // - Сортируем задачи
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
    const pointPresenter = new PointPresenter(this._listPointComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter); //запоминает id
  }

  //все точки
  _renderPoints() {
    this._points
      .slice() //копируем
      .forEach((point) => this._renderPoint(point));
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
    if (this._points.every((point) => point.isNoPoints)) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();   // - Очищаем список
    this._renderPointsList();     // - Рендерим список заново

  }
}

import SortFormView from '../view/sort.js'; //Сортировка
import ListPointView from '../view/list-points'; // контейнер для точек маршрута
import PointView from '../view/point.js'; // Точки маршрута
import NoPointView from '../view/no-point.js';
import PointEditView from '../view/edit-point.js'; //Форма редактирования
import PointPresenter from './point.js';
import {render, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';

const POINT_COUNT = 3;

export default class Trip {
  //инициализируем
  constructor(pointsContainer) {
    this._pointsContainer = pointsContainer;
    this._renderedPointCount = POINT_COUNT;
    this._pointPresenter = new Map();

    this._listPointComponent = new ListPointView();
    this._sortFormComponent = new SortFormView();
    this._pointComponent = new PointView();
    this._noPointComponent = new NoPointView();
    this._noPointEditComponent = new PointEditView();

    this._handlePointChange = this._handlePointChange.bind(this);
  }

  //рендер
  init(points) {
    this._points = points.slice(); //копия всех точек
    // Метод для инициализации (начала работы) модуля

    this._renderTrip();
  }

  //список
  _renderPointsList() {
    render(this._pointsContainer, this._listPointComponent, RenderPosition.BEFOREEND);
    this._renderPoints();
  }

  //метод, реалирующий на изменения в точке маршрута
  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint); //обновляем данные
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint); //находим нужную точку по id и вызываем метод init(перерисовываем)
  }

  // сортировка
  _renderSort() {
    render(this._pointsContainer, this._sortFormComponent, RenderPosition.AFTERBEGIN);
  }

  //точка маршрута
  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listPointComponent, this._handleTaskChange);
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
    if (this._points.every((point) => point.isArchive)) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPointsList();

  }
}

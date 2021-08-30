import SortFormView from '../view/sort.js'; //Сортировка
import ListTripPointView from '../view/list-trip-points'; // контейнер для точек маршрута
import TripPointView from '../view/trip-point.js'; // Точки маршрута
import NoTripPointView from '../view/no-trip-point.js';
import TripPointEditView from '../view/edit-trip-point.js'; //Форма редактирования
import PointPresenter from './point.js';
import {render, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';

const TRIP_POINT_COUNT = 3;

export default class Trip {
  //инициализируем
  constructor(tripPointsContainer) {
    this._tripPointsContainer = tripPointsContainer;
    this._renderedTripPointCount = TRIP_POINT_COUNT;
    this._tripPointPresenter = new Map();

    this._listTripPointComponent = new ListTripPointView();
    this._sortFormComponent = new SortFormView();
    this._tripPointComponent = new TripPointView();
    this._noTripPointComponent = new NoTripPointView();
    this._noTripPointEditComponent = new TripPointEditView();

    this._handleTripPointChange = this._handleTripPointChange.bind(this);
  }

  //рендер
  init(tripPoints) {
    this._tripPoints = tripPoints.slice(); //копия всех точек
    // Метод для инициализации (начала работы) модуля

    this._renderTrip();
  }

  //список
  _renderTripPointsList() {
    render(this._tripPointsContainer, this._listTripPointComponent, RenderPosition.BEFOREEND);
    this._renderTripPoints();
  }

  //метод, реалирующий на изменения в точке маршрута
  _handleTripPointChange(updatedTripPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedTripPoint); //обновляем данные
    this._tripPointPresenter.get(updatedTripPoint.id).init(updatedTripPoint); //находим нужную точку по id и вызываем метод init(перерисовываем)
  }

  // сортировка
  _renderSort() {
    render(this._tripPointsContainer, this._sortFormComponent, RenderPosition.AFTERBEGIN);
  }

  //точка маршрута
  _renderTripPoint(tripPoint) {
    const tripPointPresenter = new PointPresenter(this._listTripPointComponent, this._handleTaskChange);
    tripPointPresenter.init(tripPoint);
    this._tripPointPresenter.set(tripPoint.id, tripPointPresenter); //запоминает id
  }

  //все точки
  _renderTripPoints() {
    this._tripPoints
      .slice() //копируем
      .forEach((point) => this._renderTripPoint(point));
  }

  //если нет точек маршрута
  _renderNoTripPoints() {
    render(this._tripPointContainer, this._noTripPointComponent, RenderPosition.BEFOREEND);
  }

  _clearTripPoinList() {
    this._tripPointPresenter.forEach((presenter) => presenter.destroy()); //вызывает метод destroy у всех точек
    this._tripPointPresenter.clear(); //очищает
    this._renderedTripPointCount = TRIP_POINT_COUNT;
  }

  // отрисовка всех методов
  _renderTrip() {
    if (this._tripPoints.every((tripPoint) => tripPoint.isArchive)) {
      this._renderNoTripPoints();
      return;
    }

    this._renderSort();
    this._renderTripPointsList();

  }
}

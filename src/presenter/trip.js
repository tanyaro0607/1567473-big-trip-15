import SortFormView from '../view/form-sort.js'; //Сортировка
import ListTripPointView from '../view/form-list-trip-points'; // контейнер для точек маршрута
import TripPointView from '../view/form-trip-point.js'; // Точки маршрута
import NoTripPointView from '../view/no-trip-point.js';
import TripPointEditView from '../view/form-edit-and-add.js'; //Форма редактирования
import PointPresenter from './point.js';
import {render, RenderPosition} from '../utils/render.js';

// const TRIP_POINT_COUNT = 3;

export default class Trip {
  //инициализируем
  constructor(tripPointContainer) {
    this._tripPointContainer = tripPointContainer;

    this._listTripPointComponent = new ListTripPointView();
    this._sortFormComponent = new SortFormView();
    this._tripPointComponent = new TripPointView();
    this._noTripPointComponent = new NoTripPointView();
    this._noTripPointEditComponent = new TripPointEditView();
  }

  //рендер
  init(tripPoints) {
    this._tripPoints = tripPoints.slice(); //копия всех точек
    // Метод для инициализации (начала работы) модуля

    this._renderTrip();
  }

  //список
  _renderTripPointsList() {
    render(this._tripPointContainer, this._listTripPointComponent, RenderPosition.BEFOREEND);
    this._renderTripPoints();
  }

  // сортировка
  _renderSort() {
    render(this._tripPointContainer, this._sortFormComponent, RenderPosition.AFTERBEGIN);
  }

  //точка маршрута
  _renderTripPoint(point) {
    const pointPresenter = new PointPresenter(this._listTripPointComponent);
    pointPresenter.init(point);
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

  // отрисовка всех методов
  _renderTrip() {
    if (this._tripPoints.every((point) => point.isArchive)) {
      this._renderNoTripPoints();
      return;
    }

    this._renderSort();
    this._renderTripPointsList();

  }
}

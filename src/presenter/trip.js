import SortFormView from './view/form-sort.js'; //Сортировка
import ListTripPointView from './view/form-list-trip-points'; // контейнер для точек маршрута
import TripPointView from './view/form-trip-point.js'; // Точки маршрута
import NoTripPointView from './view/no-trip-point.js';
import {render, RenderPosition} from './utils/render.js';

export default class Trip {
  //инициализируем
  constructor() {
    this._tripPointContainer = document.querySelector('.trip-events');

    this._listTripPointComponent = new ListTripPointView();
    this._sortFormComponent = new SortFormView();
    this._tripPointComponent = new TripPointView();
    this._noTripPointComponent = new NoTripPointView();
  }

  //начинаем работу
  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    // Метод для инициализации (начала работы) модуля,
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderTripPoint() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTripPoint в main.js
  }

  _renderTripPoints() {
    // Метод для рендеринга N-точек за раз
  }

  _renderNoTripPoints() {
    // Метод для рендеринга заглушки
  }

  _renderListTripPoints() {
    // Метод для инициализации (начала работы) модуля,
  }
}

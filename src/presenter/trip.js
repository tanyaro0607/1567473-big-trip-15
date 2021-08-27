import SortFormView from './view/form-sort.js'; //Сортировка
import ListTripPointView from './view/form-list-trip-points'; // контейнер для точек маршрута
import TripPointView from './view/form-trip-point.js'; // Точки маршрута
import NoTripPointView from './view/no-trip-point.js';
import TripPointEditView from './view/form-edit-and-add.js'; //Форма редактирования
import {render, RenderPosition, replace} from './utils/render.js';

const TRIP_POINT_COUNT = 3;

export default class Trip {
  //инициализируем
  constructor() {
    this._tripPointContainer = document.querySelector('.trip-events');

    this._listTripPointComponent = new ListTripPointView();
    this._sortFormComponent = new SortFormView();
    this._tripPointComponent = new TripPointView();
    this._noTripPointComponent = new NoTripPointView();
    this._noTripPointEditComponent = new TripPointEditView();
  }

  //начинаем работу
  init(tripPoints) {
    this._tripPoints = tripPoints.slice(); //копия всех точек
    // Метод для инициализации (начала работы) модуля,

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

  // точка маршрута
  _renderTripPoint(point) {
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

    render(this._noTripPointEditComponent, tripPointComponent, RenderPosition.BEFOREEND);
  }

  //точки маршрута ??
  _renderTripPoints() {
    this._renderTripPoints(0, Math.min(this._tripPoints.length, TRIP_POINT_COUNT));
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

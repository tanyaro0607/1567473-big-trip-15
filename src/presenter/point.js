import TripPointView from '../view/form-trip-point.js'; // Точки маршрута
import TripPointEditView from '../view/form-edit-and-add.js'; //Форма редактирования
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Point {

  constructor(tripPointListContainer) {
    this._tripPointListContainer = tripPointListContainer;

    this._tripPointComponent = null;
    this._tripPointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlePointClick = this._handlePointClick.bind(this);
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    this._tripPointComponent = new TripPointView(tripPoint);
    this._tripPointEditComponent = new TripPointEditView(tripPoint);

    this._tripPointComponent.setEditClickHandler(this._handleEditClick);
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripPointEditComponent.setEditClickHandler(this._handlePointClick); 

    render(this._tripPointListContainer, this._tripPointComponent, RenderPosition.BEFOREEND);
  }

  //замена точки маршрута на форму редактирвоания
  _replacePointToFormEdit() {
    replace(this._tripPointEditComponent, this._tripPointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  //замена формы редактирвоания на точку маршрута
  _replaceFormEditToPoint() {
    replace(this._tripPointComponent, this._tripPointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  //закрытие при нажатии esc
  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormEditToPoint();
    }
  }

  //клик по кнопке редактировать
  _handleEditClick() {
    this._replacePointToFormEdit();
  }

  //клик по кнопке свернуть
  _handlePointClick() {
    this._replaceFormEditToPoint();
  }

  //клик по кнопке отправить
  _handleFormSubmit() {
    this._replaceFormEditToPoint();
  }
}


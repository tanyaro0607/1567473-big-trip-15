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
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    this._tripPointComponent = new TripPointView(tripPoint);
    this._tripPointEditComponent = new TripPointEditView(tripPoint);

    this._tripPointComponent.setEditClickHandler(this._handleEditClick);
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._tripPointListContainer, this._tripPointComponent, RenderPosition.BEFOREEND);
  }

  _replacePointToFormEdit() {
    replace(this._tripPointEditComponent, this._tripPointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormEditToPoint() {
    replace(this._tripPointComponent, this._tripPointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormEditToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToFormEdit();
  }

  _handleFormSubmit() {
    this._replaceFormEditToPoint();
  }
}

//было
// //отрисовка задач и формы редактирования
// const renderTripPoint = (tripPointListElement, point) => {
//   const tripPointComponent = new TripPointView(point);
//   const tripPointEditComponent = new TripPointEditView(point);

//   const replacePointToFormEdit = () => {
//     replace(tripPointEditComponent, tripPointComponent);
//   };

//   const replaceFormEditToPoint = () => {
//     replace(tripPointComponent, tripPointEditComponent);
//   };

//   //закрытие формы редактирования по Esc
//   const onEscKeyDown = (evt) => {
//     if (evt.key === 'Escape' || evt.key === 'Esc') {
//       evt.preventDefault();
//       replaceFormEditToPoint();
//       document.removeEventListener('keydown', onEscKeyDown);
//     }
//   };

//   //действия при клике на кнопку - открывает форму редактирования
//   tripPointComponent.setEditClickHandler(() => {
//     replacePointToFormEdit();
//     document.addEventListener('keydown', onEscKeyDown);
//   });

//   //действия при отправке формы редактирования
//   tripPointEditComponent.setFormSubmitHandler(() => {
//     replaceFormEditToPoint();
//     document.removeEventListener('keydown', onEscKeyDown);
//   });

//   //действия при клике на кнопку - закрывает форму редактирвования
//   tripPointEditComponent.setEditClickHandler(() => {
//     replaceFormEditToPoint();
//     document.addEventListener('keydown', onEscKeyDown);
//   });

//   render(tripPointListElement, tripPointComponent, RenderPosition.BEFOREEND);
// };


import PointEditView from '../view/edit-point.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

export default class PointNew {
  constructor(pointListContainer, changeData, offersModel, destinationsModel) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._pointEditComponent = null;
    this._destroyCallback = null;
    this._isNewPoint = true;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback, point) {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._point = point,
    this._destroyCallback = callback;

    this._pointEditComponent = new PointEditView(this._point, this._offersModel, this._destinationsModel, this._isNewPoint);
    this._pointEditComponent = new PointEditView(this._point, this._offersModel, this._destinationsModel);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    // console.log(this._pointEditComponent);
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(newPoint) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      newPoint,
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}


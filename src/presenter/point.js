import PointView from '../view/point.js'; // Точки маршрута
import PointEditView from '../view/edit-point.js'; //Форма редактирования
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT', //состояние по умолчанию
  EDITING: 'EDITING', //в режиме редактирования
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class Point {

  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode; //для перехода карточек в стандартный режим, если открыто более 1 на ред-е

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlePointClick = this._handlePointClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setEditClickHandler(this._handlePointClick);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    //если точки отрисовываются и редактируются в первый раз
    if (prevPointComponent === null || prevPointEditComponent === null) {
      //то отрисовать их
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    // иначе
    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent); //замена существующего на новое
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointComponent, prevPointEditComponent);
      this._mode = Mode.DEFAULT;
    }

    //и удалить старое
    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  //метод для удаления точек
  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  //сбрасывает точки на состояние по умолчанию
  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormEditToPoint();
    }
  }

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._pointComponent.shake(resetFormState);
        this._pointEditComponent.shake(resetFormState);
        break;
    }
  }

  //замена точки маршрута на форму редактирвоания
  _replacePointToFormEdit() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode(); //обновить карточку
    this._mode = Mode.EDITING; //на режим ред-я
  }

  //замена формы редактирвоания на точку маршрута
  _replaceFormEditToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT; //карточка в режиме по умолчанию
  }

  //закрытие при нажатии esc
  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
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
  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  _handleFormSubmit(update) {
    // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
    // дописать условие
    // console.log(update.time.timeStart);
    // if ((!update.price) || (!update.time.timeStart) || (!update.time.timeEnd)) {
    //   return;
    // }
    // console.log(update);
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update,
    );
  }
}


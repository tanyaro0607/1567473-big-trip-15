import PointView from '../view/point.js'; // Точки маршрута
import PointEditView from '../view/edit-point.js'; //Форма редактирования
import {render, RenderPosition, replace, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT', //состояние по умолчанию
  EDITING: 'EDITING', //в режиме редактирования
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
      replace(this._pointEditComponent, prevPointEditComponent); //замена существующего на новое
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
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit(point) {
    this._changeData(point);
    this._replaceFormEditToPoint();
  }
}


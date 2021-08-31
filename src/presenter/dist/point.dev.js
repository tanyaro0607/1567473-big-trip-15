"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _point = _interopRequireDefault(require("../view/point.js"));

var _editPoint = _interopRequireDefault(require("../view/edit-point.js"));

var _render = require("../utils/render.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mode = {
  DEFAULT: 'DEFAULT',
  //состояние по умолчанию
  EDITING: 'EDITING' //в режиме редактирования

};

var Point =
/*#__PURE__*/
function () {
  function Point(pointListContainer, changeData, changeMode) {
    _classCallCheck(this, Point);

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

  _createClass(Point, [{
    key: "init",
    value: function init(point) {
      this._point = point;
      var prevPointComponent = this._pointComponent;
      var prevPointEditComponent = this._pointEditComponent;
      this._pointComponent = new _point["default"](point);
      this._pointEditComponent = new _editPoint["default"](point);

      this._pointComponent.setEditClickHandler(this._handleEditClick);

      this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

      this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

      this._pointEditComponent.setEditClickHandler(this._handlePointClick); //если точки отрисовываются и редактируются в первый раз


      if (prevPointComponent === null || prevPointEditComponent === null) {
        //то отрисовать их
        (0, _render.render)(this._pointListContainer, this._pointComponent, _render.RenderPosition.BEFOREEND);
        return;
      } // иначе


      if (this._mode === Mode.DEFAULT) {
        (0, _render.replace)(this._pointComponent, prevPointComponent); //замена существующего на новое
      }

      if (this._mode === Mode.EDITING) {
        (0, _render.replace)(this._pointEditComponent, prevPointEditComponent); //замена существующего на новое
      } //и удалить старое


      (0, _render.remove)(prevPointComponent);
      (0, _render.remove)(prevPointEditComponent);
    } //метод для удаления точек

  }, {
    key: "destroy",
    value: function destroy() {
      (0, _render.remove)(this._pointComponent);
      (0, _render.remove)(this._pointEditComponent);
    } //сбрасывает точки на состояние по умолчанию

  }, {
    key: "resetView",
    value: function resetView() {
      if (this._mode !== Mode.DEFAULT) {
        this._replaceFormEditToPoint();
      }
    } //замена точки маршрута на форму редактирвоания

  }, {
    key: "_replacePointToFormEdit",
    value: function _replacePointToFormEdit() {
      (0, _render.replace)(this._pointEditComponent, this._pointComponent);
      document.addEventListener('keydown', this._escKeyDownHandler);

      this._changeMode(); //обновить карточку


      this._mode = Mode.EDITING; //на режим ред-я
    } //замена формы редактирвоания на точку маршрута

  }, {
    key: "_replaceFormEditToPoint",
    value: function _replaceFormEditToPoint() {
      (0, _render.replace)(this._pointComponent, this._pointEditComponent);
      document.removeEventListener('keydown', this._escKeyDownHandler);
      this._mode = Mode.DEFAULT; //карточка в режиме по умолчанию
    } //закрытие при нажатии esc

  }, {
    key: "_escKeyDownHandler",
    value: function _escKeyDownHandler(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();

        this._replaceFormEditToPoint();
      }
    } //клик по кнопке редактировать

  }, {
    key: "_handleEditClick",
    value: function _handleEditClick() {
      this._replacePointToFormEdit();
    } //клик по кнопке свернуть

  }, {
    key: "_handlePointClick",
    value: function _handlePointClick() {
      this._replaceFormEditToPoint();
    } //клик по кнопке отправить

  }, {
    key: "_handleFavoriteClick",
    value: function _handleFavoriteClick() {
      this._changeData(Object.assign({}, this._point, {
        isFavorite: !this._point.isFavorite
      }));
    }
  }, {
    key: "_handleFormSubmit",
    value: function _handleFormSubmit(point) {
      this._changeData(point);

      this._replaceFormEditToPoint();
    }
  }]);

  return Point;
}();

exports["default"] = Point;
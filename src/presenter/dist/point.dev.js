"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tripPoint = _interopRequireDefault(require("../view/trip-point.js"));

var _editTripPoint = _interopRequireDefault(require("../view/edit-trip-point.js"));

var _render = require("../utils/render.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Point =
/*#__PURE__*/
function () {
  function Point(tripPointListContainer, changeData) {
    _classCallCheck(this, Point);

    this._tripPointListContainer = tripPointListContainer;
    this._changeData = changeData;
    this._tripPointComponent = null;
    this._tripPointEditComponent = null;
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlePointClick = this._handlePointClick.bind(this);
  }

  _createClass(Point, [{
    key: "init",
    value: function init(tripPoint) {
      this._tripPoint = tripPoint;
      var prevTripPointComponent = this._tripPointComponent;
      var prevTripPointEditComponent = this._tripPointEditComponent;
      this._tripPointComponent = new _tripPoint["default"](tripPoint);
      this._tripPointEditComponent = new _editTripPoint["default"](tripPoint);

      this._tripPointComponent.setEditClickHandler(this._handleEditClick);

      this._tripPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

      this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

      this._tripPointEditComponent.setEditClickHandler(this._handlePointClick); //если точки отрисовываются и редактируются в первый раз


      if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
        //то отрисовать их
        (0, _render.render)(this._tripPointListContainer, this._tripPointComponent, _render.RenderPosition.BEFOREEND);
        return;
      } // иначе


      if (this._tripPointListContainer.getElement().contains(prevTripPointComponent.getElement())) {
        (0, _render.replace)(this._tripPointComponent, prevTripPointComponent); //замена существующего на новое
      }

      if (this._tripPointListContainer.getElement().contains(prevTripPointEditComponent.getElement())) {
        (0, _render.replace)(this._tripPointEditComponent, prevTripPointEditComponent); //замена существующего на новое
      } //и удалить старое


      (0, _render.remove)(prevTripPointComponent);
      (0, _render.remove)(prevTripPointEditComponent);
    } //метод для удаления точек

  }, {
    key: "destroy",
    value: function destroy() {
      (0, _render.remove)(this._tripPointComponent);
      (0, _render.remove)(this._tripPointEditComponent);
    } //замена точки маршрута на форму редактирвоания

  }, {
    key: "_replacePointToFormEdit",
    value: function _replacePointToFormEdit() {
      (0, _render.replace)(this._tripPointEditComponent, this._tripPointComponent);
      document.addEventListener('keydown', this._escKeyDownHandler);
    } //замена формы редактирвоания на точку маршрута

  }, {
    key: "_replaceFormEditToPoint",
    value: function _replaceFormEditToPoint() {
      (0, _render.replace)(this._tripPointComponent, this._tripPointEditComponent);
      document.removeEventListener('keydown', this._escKeyDownHandler);
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
      this._changeData(Object.assign({}, this._tripPoint, {
        isFavorite: !this._tripPoint.isFavorite
      }));
    }
  }, {
    key: "_handleFormSubmit",
    value: function _handleFormSubmit(tripPoint) {
      this._changeData(tripPoint);

      this._replaceFormEditToPoint();
    }
  }]);

  return Point;
}();

exports["default"] = Point;
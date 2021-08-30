"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _formSort = _interopRequireDefault(require("../view/form-sort.js"));

var _formListTripPoints = _interopRequireDefault(require("../view/form-list-trip-points"));

var _formTripPoint = _interopRequireDefault(require("../view/form-trip-point.js"));

var _noTripPoint = _interopRequireDefault(require("../view/no-trip-point.js"));

var _formEditAndAdd = _interopRequireDefault(require("../view/form-edit-and-add.js"));

var _point = _interopRequireDefault(require("./point.js"));

var _render = require("../utils/render.js");

var _common = require("../utils/common.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TRIP_POINT_COUNT = 3;

var Trip =
/*#__PURE__*/
function () {
  //инициализируем
  function Trip(tripPointsContainer) {
    _classCallCheck(this, Trip);

    this._tripPointsContainer = tripPointsContainer;
    this._renderedTripPointCount = TRIP_POINT_COUNT;
    this._tripPointPresenter = new Map();
    this._listTripPointComponent = new _formListTripPoints["default"]();
    this._sortFormComponent = new _formSort["default"]();
    this._tripPointComponent = new _formTripPoint["default"]();
    this._noTripPointComponent = new _noTripPoint["default"]();
    this._noTripPointEditComponent = new _formEditAndAdd["default"]();
    this._handleTripPointChange = this._handleTripPointChange.bind(this);
  } //рендер


  _createClass(Trip, [{
    key: "init",
    value: function init(tripPoints) {
      this._tripPoints = tripPoints.slice(); //копия всех точек
      // Метод для инициализации (начала работы) модуля

      this._renderTrip();
    } //список

  }, {
    key: "_renderTripPointsList",
    value: function _renderTripPointsList() {
      (0, _render.render)(this._tripPointsContainer, this._listTripPointComponent, _render.RenderPosition.BEFOREEND);

      this._renderTripPoints();
    } //метод, реалирующий на изменения в точке маршрута

  }, {
    key: "_handleTripPointChange",
    value: function _handleTripPointChange(updatedTripPoint) {
      this._tripPoints = (0, _common.updateItem)(this._tripPoints, updatedTripPoint); //обновляем данные

      this._tripPointPresenter.get(updatedTripPoint.id).init(updatedTripPoint); //находим нужную точку по id и вызываем метод init(перерисовываем)

    } // сортировка

  }, {
    key: "_renderSort",
    value: function _renderSort() {
      (0, _render.render)(this._tripPointsContainer, this._sortFormComponent, _render.RenderPosition.AFTERBEGIN);
    } //точка маршрута

  }, {
    key: "_renderTripPoint",
    value: function _renderTripPoint(point) {
      var tripPointPresenter = new _point["default"](this._listTripPointComponent);
      tripPointPresenter.init(point);

      this._tripPointPresenter.set(point.id, tripPointPresenter); //запоминает id

    } //все точки

  }, {
    key: "_renderTripPoints",
    value: function _renderTripPoints() {
      var _this = this;

      this._tripPoints.slice() //копируем
      .forEach(function (point) {
        return _this._renderTripPoint(point);
      });
    } //если нет точек маршрута

  }, {
    key: "_renderNoTripPoints",
    value: function _renderNoTripPoints() {
      (0, _render.render)(this._tripPointContainer, this._noTripPointComponent, _render.RenderPosition.BEFOREEND);
    }
  }, {
    key: "_clearTripPoinList",
    value: function _clearTripPoinList() {
      this._tripPointPresenter.forEach(function (presenter) {
        return presenter.destroy();
      }); //вызывает метод destroy у всех точек


      this._tripPointPresenter.clear(); //очищает


      this._renderedTripPointCount = TRIP_POINT_COUNT;
    } // отрисовка всех методов

  }, {
    key: "_renderTrip",
    value: function _renderTrip() {
      if (this._tripPoints.every(function (point) {
        return point.isArchive;
      })) {
        this._renderNoTripPoints();

        return;
      }

      this._renderSort();

      this._renderTripPointsList();
    }
  }]);

  return Trip;
}();

exports["default"] = Trip;
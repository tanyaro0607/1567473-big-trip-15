"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sort = _interopRequireDefault(require("../view/sort.js"));

var _listPoints = _interopRequireDefault(require("../view/list-points"));

var _point = _interopRequireDefault(require("../view/point.js"));

var _noPoint = _interopRequireDefault(require("../view/no-point.js"));

var _editPoint = _interopRequireDefault(require("../view/edit-point.js"));

var _point2 = _interopRequireDefault(require("./point.js"));

var _render = require("../utils/render.js");

var _common = require("../utils/common.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var POINT_COUNT = 3;

var Trip =
/*#__PURE__*/
function () {
  //инициализируем
  function Trip(pointsContainer) {
    _classCallCheck(this, Trip);

    this._pointsContainer = pointsContainer;
    this._renderedPointCount = POINT_COUNT;
    this._pointPresenter = new Map();
    this._listPointComponent = new _listPoints["default"]();
    this._sortFormComponent = new _sort["default"]();
    this._pointComponent = new _point["default"]();
    this._noPointComponent = new _noPoint["default"]();
    this._noPointEditComponent = new _editPoint["default"]();
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  } //рендер


  _createClass(Trip, [{
    key: "init",
    value: function init(points) {
      this._points = points.slice(); //копия всех точек
      // Метод для инициализации (начала работы) модуля

      this._renderTrip();
    }
  }, {
    key: "_handleModeChange",
    value: function _handleModeChange() {
      this._pointPresenter.forEach(function (presenter) {
        return presenter.resetView();
      });
    } //список

  }, {
    key: "_renderPointsList",
    value: function _renderPointsList() {
      (0, _render.render)(this._pointsContainer, this._listPointComponent, _render.RenderPosition.BEFOREEND);

      this._renderPoints();
    } //метод, реалирующий на изменения в точке маршрута

  }, {
    key: "_handlePointChange",
    value: function _handlePointChange(updatedPoint) {
      this._points = (0, _common.updateItem)(this._points, updatedPoint); //обновляем данные

      this._pointPresenter.get(updatedPoint.id).init(updatedPoint); //находим нужную точку по id и вызываем метод init(перерисовываем)

    } // сортировка

  }, {
    key: "_renderSort",
    value: function _renderSort() {
      (0, _render.render)(this._pointsContainer, this._sortFormComponent, _render.RenderPosition.AFTERBEGIN);
    } //точка маршрута

  }, {
    key: "_renderPoint",
    value: function _renderPoint(point) {
      var pointPresenter = new _point2["default"](this._listPointComponent, this._handlePointChange, this._handleModeChange);
      pointPresenter.init(point);

      this._pointPresenter.set(point.id, pointPresenter); //запоминает id

    } //все точки

  }, {
    key: "_renderPoints",
    value: function _renderPoints() {
      var _this = this;

      this._points.slice() //копируем
      .forEach(function (point) {
        return _this._renderPoint(point);
      });
    } //если нет точек маршрута

  }, {
    key: "_renderNoPoints",
    value: function _renderNoPoints() {
      (0, _render.render)(this._pointContainer, this._noPointComponent, _render.RenderPosition.BEFOREEND);
    }
  }, {
    key: "_clearPointList",
    value: function _clearPointList() {
      this._pointPresenter.forEach(function (presenter) {
        return presenter.destroy();
      }); //вызывает метод destroy у всех точек


      this._pointPresenter.clear(); //очищает


      this._renderedPointCount = POINT_COUNT;
    } // отрисовка всех методов

  }, {
    key: "_renderTrip",
    value: function _renderTrip() {
      if (this._points.every(function (point) {
        return point.isNoPoints;
      })) {
        this._renderNoPoints();

        return;
      }

      this._renderSort();

      this._renderPointsList();
    }
  }]);

  return Trip;
}();

exports["default"] = Trip;
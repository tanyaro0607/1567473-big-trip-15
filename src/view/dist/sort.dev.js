"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _const = require("../const.js");

var _abstract = _interopRequireDefault(require("./abstract.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//генерируем список пунктов сортировки
var renderListSort = function renderListSort() {
  var str = '';

  var _loop = function _loop(i) {
    var sortData = function sortData() {
      if (_const.TRIP_SORT[i].toLowerCase() === _const.SortType.DAY) {
        var dataSortType = _const.SortType.DAY;
        return dataSortType;
      }

      if (_const.TRIP_SORT[i].toLowerCase() === _const.SortType.TIME) {
        var _dataSortType = _const.SortType.TIME;
        return _dataSortType;
      }

      if (_const.TRIP_SORT[i].toLowerCase() === _const.SortType.PRICE) {
        var _dataSortType2 = _const.SortType.PRICE;
        return _dataSortType2;
      }
    };

    str += "<div class=\"trip-sort__item  trip-sort__item--".concat(_const.TRIP_SORT[i].toLowerCase(), " data-sort-type=\"").concat(sortData(), "\">\n    <input id=\"sort-").concat(_const.TRIP_SORT[i].toLowerCase(), "\" class=\"trip-sort__input  visually-hidden\" type=\"radio\" name=\"trip-sort\" value=\"sort-").concat(_const.TRIP_SORT[i].toLowerCase(), "\">\n    <label class=\"trip-sort__btn\" for=\"sort-").concat(_const.TRIP_SORT[i].toLowerCase(), "\">").concat(_const.TRIP_SORT[i], "</label>\n  </div>");
  };

  for (var i = 0; i < _const.TRIP_SORT.length; i++) {
    _loop(i);
  }

  return str;
};

var createSortFormTemplate = function createSortFormTemplate() {
  return "<form class=\"trip-events__trip-sort  trip-sort\" action=\"#\" method=\"get\">\n\n  ".concat(renderListSort(), "\n\n</form>");
};

var Sort =
/*#__PURE__*/
function (_AbstractView) {
  _inherits(Sort, _AbstractView);

  function Sort() {
    var _this;

    _classCallCheck(this, Sort);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sort).call(this));
    _this._sortTypeChangeHandler = _this._sortTypeChangeHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Sort, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createSortFormTemplate();
    } //обработчик - клик по сортировке

  }, {
    key: "_sortTypeChangeHandler",
    value: function _sortTypeChangeHandler(evt) {
      if (evt.target.tagName !== 'LABEL') {
        return;
      }

      evt.preventDefault(); // this._callback.sortTypeChange(evt.target.dataset.sortType);

      this._callback.sortTypeChange(evt.target.id);
    }
  }, {
    key: "setSortTypeChangeHandler",
    value: function setSortTypeChangeHandler(callback) {
      this._callback.sortTypeChange = callback;
      this.getElement().addEventListener('click', this._sortTypeChangeHandler);
    }
  }]);

  return Sort;
}(_abstract["default"]);

exports["default"] = Sort;
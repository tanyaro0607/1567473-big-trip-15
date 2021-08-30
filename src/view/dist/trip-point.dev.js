"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _const = require("../const.js");

var _common = require("../utils/common.js");

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

var getStart = function getStart() {
  var isFavorite = Boolean((0, _common.getRandomInteger)(0, 1));
  return isFavorite;
};

var generateOffers = function generateOffers() {
  var randomIndex = (0, _common.getRandomInteger)(0, _const.OFFERS.length - 1);
  return _const.OFFERS[randomIndex];
}; //передаем в шаблон


var renderOffers = function renderOffers() {
  var offersArray = new Array((0, _common.getRandomInteger)(0, _const.OFFERS.length)).fill().map(generateOffers);
  var str = '';

  for (var i = 0; i < offersArray.length; i++) {
    str += " <li class=\"event__offer\">\n    <span class=\"event__offer-title\">".concat(offersArray[i].text, "</span>\n    &plus;&euro;&nbsp;\n    <span class=\"event__offer-price\">").concat(offersArray[i].price, "</span>\n    </li>");
  }

  return str;
};

var createTripPointTemplate = function createTripPointTemplate(point) {
  var tripType = point.tripType,
      сityDestination = point.сityDestination,
      price = point.price,
      date = point.date,
      time = point.time;
  var dateEvent = (0, _dayjs["default"])(date).format('D MMM');
  var timeStartEvent = (0, _dayjs["default"])(time.timeStart).format('hh:mm');
  var timeEndEvent = (0, _dayjs["default"])(time.timeEnd).format('hh:mm');

  var renderTimeDiff = function renderTimeDiff() {
    var timeDiff = (0, _dayjs["default"])(time.timeEnd).diff((0, _dayjs["default"])(time.timeStart), 'day');
    var time1;

    if (timeDiff > 0) {
      time1 = "".concat(timeDiff, "D 00H 00M");
    } else {
      time1 = "00D 00H ".concat(timeDiff, "M");
    }

    return time1;
  };

  var favoriteClassName = getStart() ? 'event__favorite-btn--active' : '';
  return "<li class=\"trip-events__item\">\n  <div class=\"event\">\n  <time class=\"event__date\" datetime=\"2019-03-18\">".concat(dateEvent, "</time>\n  <div class=\"event__type\">\n    <img class=\"event__type-icon\" width=\"42\" height=\"42\" src=\"img/icons/").concat(tripType.icon, ".png\" alt=\"Event type icon\">\n  </div>\n  <h3 class=\"event__title\">").concat(tripType.type, " ").concat(сityDestination, "</h3>\n  <div class=\"event__schedule\">\n    <p class=\"event__time\">\n      <time class=\"event__start-time\" datetime=\"").concat(timeStartEvent, "\">").concat(timeStartEvent, "</time>\n      &mdash;\n      <time class=\"event__end-time\" datetime=\"").concat(timeEndEvent, "\">").concat(timeEndEvent, "</time>\n    </p>\n    <p class=\"event__duration\">").concat(renderTimeDiff(), "</p>\n  </div>\n  <p class=\"event__price\">\n    &euro;&nbsp;<span class=\"event__price-value\">").concat(price, "</span>\n  </p>\n  <h4 class=\"visually-hidden\">Offers:</h4>\n  <ul class=\"event__selected-offers\">\n\n  ").concat(renderOffers(), "\n\n  </ul>\n  <button class=\"event__favorite-btn ").concat(favoriteClassName, "\" type=\"button\">\n    <span class=\"visually-hidden\">Add to favorite</span>\n    <svg class=\"event__favorite-icon\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n      <path d=\"M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z\"/>\n    </svg>\n  </button>\n  <button class=\"event__rollup-btn\" type=\"button\">\n    <span class=\"visually-hidden\">Open event</span>\n  </button>\n</div>\n</li>");
};

var TripPoint =
/*#__PURE__*/
function (_AbstractView) {
  _inherits(TripPoint, _AbstractView);

  function TripPoint(point) {
    var _this;

    _classCallCheck(this, TripPoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TripPoint).call(this));
    _this._point = point;
    _this._editClickHandler = _this._editClickHandler.bind(_assertThisInitialized(_this));
    _this._favoriteClickHandler = _this._favoriteClickHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TripPoint, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createTripPointTemplate(this._point);
    }
  }, {
    key: "_favoriteClickHandler",
    value: function _favoriteClickHandler(evt) {
      evt.preventDefault();

      this._callback.favoriteClick();
    }
  }, {
    key: "setFavoriteClickHandler",
    value: function setFavoriteClickHandler(callback) {
      this._callback.favoriteClick = callback;
      this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
    }
  }, {
    key: "_editClickHandler",
    value: function _editClickHandler(evt) {
      evt.preventDefault();

      this._callback.editClick();
    } //публичный метод, принимает аргументом callback

  }, {
    key: "setEditClickHandler",
    value: function setEditClickHandler(callback) {
      this._callback.editClick = callback; // сохраняем ссылку на callback

      this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler); //подписываемся на событие и вызываем приватные метод
    }
  }]);

  return TripPoint;
}(_abstract["default"]);

exports["default"] = TripPoint;
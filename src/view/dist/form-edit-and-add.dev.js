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

var BLANK_POINT = {
  tripType: {
    icon: 'taxi',
    type: 'Taxi'
  },
  price: '0',
  placeDestination: {
    descriptionText: '',
    photos: ''
  },
  time: (0, _dayjs["default"])().toDate(),
  сityDestination: ''
};
var addChecked = (0, _common.getBoolean)() ? 'checked' : ''; //генерируем список городов

var renderListDestinations = function renderListDestinations() {
  var str = '';

  for (var i = 0; i < _const.DESTINATIONS.length; i++) {
    str += "<option value=\"".concat(_const.DESTINATIONS[i], "\"></option>");
  }

  return str;
}; //генерируем шаблон спискатипов поездки


var renderListTypesOfTrip = function renderListTypesOfTrip() {
  var str = '';

  for (var i = 0; i < _const.TYPES_OF_TRIP.length; i++) {
    str += " <div class=\"event__type-item\">\n                        <input id=\"event-type-".concat(_const.TYPES_OF_TRIP[i].type.toLowerCase(), "-1\" class=\"event__type-input  visually-hidden\" type=\"radio\" name=\"event-type\" value=\"").concat(_const.TYPES_OF_TRIP[i].type.toLowerCase(), "\">\n                        <label class=\"event__type-label  event__type-label--").concat(_const.TYPES_OF_TRIP[i].type.toLowerCase(), "\" for=\"event-type-").concat(_const.TYPES_OF_TRIP[i].type.toLowerCase(), "-1\">").concat(_const.TYPES_OF_TRIP[i].type, "</label>\n                      </div>");
  }

  return str;
}; //генерируем шаблон доп услуг


var renderOffers = function renderOffers() {
  var str = '';

  for (var i = 0; i < _const.OFFERS.length; i++) {
    str += " <div class=\"event__offer-selector\">\n    <input class=\"event__offer-checkbox  visually-hidden\" id=\"event-offer-luggage-1\" type=\"".concat(addChecked, "\" name=\"event-offer-luggage\" ").concat(addChecked, ">\n    <label class=\"event__offer-label\" for=\"event-offer-luggage-1\">\n      <span class=\"event__offer-title\">").concat(_const.OFFERS[i].text, "</span>\n      &plus;&euro;&nbsp;\n      <span class=\"event__offer-price\">").concat(_const.OFFERS[i].price, "</span>\n    </label>\n  </div> ");
  }

  return str;
}; //генерируем рандомное фото


var generatePhoto = function generatePhoto() {
  var photo = "http://picsum.photos/248/152?r=".concat((0, _common.getRandomInteger)(1, 100));
  return photo;
}; //генерируем шаблон фото


var renderPhotos = function renderPhotos() {
  var photos = new Array((0, _common.getRandomInteger)(0, 5)).fill().map(generatePhoto);
  var str = '';

  for (var i = 0; i < photos.length; i++) {
    str += " <img class=\"event__photo\" src=\"".concat(photos[i], "\" alt=\"Event photo\"> ");
  }

  return str;
};

var createEditFormTemplate = function createEditFormTemplate() {
  var point = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var tripType = point.tripType,
      price = point.price,
      placeDestination = point.placeDestination,
      time = point.time,
      сityDestination = point.сityDestination;
  var timeStartEvent = (0, _dayjs["default"])(time.timeStart).format('DD/MM/YY HH:mm');
  var timeEndEvent = (0, _dayjs["default"])(time.timeEnd).format('DD/MM/YY HH:mm');
  return "<li class=\"trip-events__item\">\n              <form class=\"event event--edit\" action=\"#\" method=\"post\">\n                <header class=\"event__header\">\n                  <div class=\"event__type-wrapper\">\n                    <label class=\"event__type  event__type-btn\" for=\"event-type-toggle-1\">\n                      <span class=\"visually-hidden\">Choose event type</span>\n                      <img class=\"event__type-icon\" width=\"17\" height=\"17\" src=\"img/icons/".concat(tripType.icon, ".png\" alt=\"Event type icon\">\n                    </label>\n                    <input class=\"event__type-toggle  visually-hidden\" id=\"event-type-toggle-1\" type=\"checkbox\">\n\n                    <div class=\"event__type-list\">\n                      <fieldset class=\"event__type-group\">\n                        <legend class=\"visually-hidden\">Event type</legend>\n\n                        ").concat(renderListTypesOfTrip(_const.TYPES_OF_TRIP.type), "\n\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class=\"event__field-group  event__field-group--destination\">\n                    <label class=\"event__label  event__type-output\" for=\"event-destination-1\">\n\n                      ").concat(tripType.type, "\n\n                    </label>\n                    <input class=\"event__input  event__input--destination\" id=\"event-destination-1\" type=\"text\" name=\"event-destination\" value=\"").concat(сityDestination, "\" list=\"destination-list-1\">\n                    <datalist id=\"destination-list-1\">\n\n                      ").concat(renderListDestinations(_const.DESTINATIONS), "\n\n                    </datalist>\n                  </div>\n\n                  <div class=\"event__field-group  event__field-group--time\">\n                    <label class=\"visually-hidden\" for=\"event-start-time-1\">From</label>\n                    <input class=\"event__input  event__input--time\" id=\"event-start-time-1\" type=\"text\" name=\"event-start-time\" value=\"").concat(timeStartEvent, "\">\n                    &mdash;\n                    <label class=\"visually-hidden\" for=\"event-end-time-1\">To</label>\n                    <input class=\"event__input  event__input--time\" id=\"event-end-time-1\" type=\"text\" name=\"event-end-time\" value=\"").concat(timeEndEvent, "\">\n                  </div>\n\n                  <div class=\"event__field-group  event__field-group--price\">\n                    <label class=\"event__label\" for=\"event-price-1\">\n                      <span class=\"visually-hidden\">Price</span>\n                      &euro;\n                    </label>\n                    <input class=\"event__input  event__input--price\" id=\"event-price-1\" type=\"text\" name=\"event-price\" value=\"").concat(price, "\">\n                  </div>\n\n                  <button class=\"event__save-btn  btn  btn--blue\" type=\"submit\">Save</button>\n                  <button class=\"event__reset-btn\" type=\"reset\">Delete</button>\n                  <button class=\"event__rollup-btn\" type=\"button\">\n                    <span class=\"visually-hidden\">Open event</span>\n                  </button>\n                </header>\n                <section class=\"event__details\">\n                  <section class=\"event__section  event__section--offers\">\n                    <h3 class=\"event__section-title  event__section-title--offers\">Offers</h3>\n                    <div class=\"event__available-offers\">\n\n                    ").concat(renderOffers(_const.OFFERS), "\n\n                    </div>\n                  </section>\n\n                  <section class=\"event__section  event__section--destination\">\n                  <h3 class=\"event__section-title  event__section-title--destination\">Destination</h3>\n                  <p class=\"event__destination-description\">").concat(placeDestination.descriptionText, "</p>\n\n                  <div class=\"event__photos-container\">\n                    <div class=\"event__photos-tape\">\n\n                    ").concat(renderPhotos(), "\n\n                    </div>\n                  </div>\n                </section>\n              </section>\n            </form>\n</li>");
};

var TripPointEdit =
/*#__PURE__*/
function (_AbstractView) {
  _inherits(TripPointEdit, _AbstractView);

  function TripPointEdit() {
    var _this;

    var point = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : BLANK_POINT;

    _classCallCheck(this, TripPointEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TripPointEdit).call(this));
    _this._point = point;
    _this._formSubmitHandler = _this._formSubmitHandler.bind(_assertThisInitialized(_this));
    _this._editClickHandler = _this._editClickHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TripPointEdit, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createEditFormTemplate(this._point);
    }
  }, {
    key: "_formSubmitHandler",
    value: function _formSubmitHandler(evt) {
      evt.preventDefault();

      this._callback.formSubmit();
    }
  }, {
    key: "setFormSubmitHandler",
    value: function setFormSubmitHandler(callback) {
      this._callback.formSubmit = callback;
      this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
    }
  }, {
    key: "_editClickHandler",
    value: function _editClickHandler(evt) {
      evt.preventDefault();

      this._callback.editClick();
    }
  }, {
    key: "setEditClickHandler",
    value: function setEditClickHandler(callback) {
      this._callback.editClick = callback;
      this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
    }
  }]);

  return TripPointEdit;
}(_abstract["default"]);

exports["default"] = TripPointEdit;
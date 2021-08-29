"use strict";

var _siteMenu = _interopRequireDefault(require("./view/site-menu.js"));

var _tripInfoSection = _interopRequireDefault(require("./view/trip-info-section.js"));

var _tripInfo = _interopRequireDefault(require("./view/trip-info.js"));

var _tripInfoCost = _interopRequireDefault(require("./view/trip-info-cost.js"));

var _filter = _interopRequireDefault(require("./view/filter.js"));

var _tripPointMock = require("./mo\u0441k/trip-point- mock.js");

var _render = require("./utils/render.js");

var _trip = _interopRequireDefault(require("./presenter/trip.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Меню
// контейнер для маршрута и стоимости
//Маршрут
//стоимость
//Фильтр
//временные данные
//создаем массив объектов описывающих 20 точек маршрута
var TEST_POINT_COUNT = 3;
var points = new Array(TEST_POINT_COUNT).fill().map(_tripPointMock.generateTripPoint);
var siteMainElement = document.querySelector('.trip-main');
var siteMainNavigationElement = document.querySelector('.trip-controls__navigation');
var siteFilterElement = document.querySelector('.trip-controls__filters');
var tripPointContainer = document.querySelector('.trip-events');
var tripPresenter = new _trip["default"](tripPointContainer);
var tripInfoSectionComponent = new _tripInfoSection["default"](); //контейнер для маршрута и стоимости

(0, _render.render)(siteMainNavigationElement, new _siteMenu["default"](), _render.RenderPosition.BEFOREEND); //отриосвка Меню

(0, _render.render)(siteMainElement, tripInfoSectionComponent, _render.RenderPosition.AFTERBEGIN); //отриосвка контейнера для маршрута и стоимости

(0, _render.render)(tripInfoSectionComponent, new _tripInfo["default"](points), _render.RenderPosition.AFTERBEGIN); //отриосвка Маршрута

(0, _render.render)(tripInfoSectionComponent, new _tripInfoCost["default"](), _render.RenderPosition.BEFOREEND); //отриосвка стоимости

(0, _render.render)(siteFilterElement, new _filter["default"](), _render.RenderPosition.BEFOREEND); //отриосвка Фильтра
// const renderAddTripPoint = () => {
//   //действия при клике на кнопку New Event
//   document.querySelector('.trip-main__event-add-btn').addEventListener('click', () => {
//     render(listTripPointComponent,new TripPointEditView(), RenderPosition.AFTERBEGIN); //отриосвка формы Редактирования
//   });
// };
// renderAddTripPoint();
// //действия при клике на доп услуги
// document.querySelectorAll('.event__offer-label').addEventListener('click', () => {
//   //
// });

tripPresenter.init(points);
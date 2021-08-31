"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByTime = exports.sortByDay = exports.sortByPrice = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//сортировка
// Price - по цене, от дорогой к дешевой
var sortByPrice = function sortByPrice(pointA, pointB) {
  return pointB.price - pointA.price;
}; //вернуться к исходникам


exports.sortByPrice = sortByPrice;

var sortByDay = function sortByDay(pointA, pointB) {
  return (0, _dayjs["default"])(pointA.timeEnd).diff((0, _dayjs["default"])(pointB.timeEnd));
}; // Time - по времени, от max к min
// export const sortByTime = (pointA, pointB) => (pointB.end - pointB.start) - (pointA.end - pointA.start);


exports.sortByDay = sortByDay;

var sortByTime = function sortByTime(pointA, pointB) {
  var pointADuration = (0, _dayjs["default"])(pointA.timeEnd).diff((0, _dayjs["default"])(pointA.timeStart));
  var pointBDuration = (0, _dayjs["default"])(pointB.timeEnd).diff((0, _dayjs["default"])(pointB.timeStart));
  return pointADuration - pointBDuration;
};

exports.sortByTime = sortByTime;
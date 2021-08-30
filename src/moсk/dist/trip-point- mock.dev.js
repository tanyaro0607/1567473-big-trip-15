"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTripPoint = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _const = require("../const.js");

var _common = require("../utils/common.js");

var _nanoid = require("nanoid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//присваиваем id для каждой задачи
//находим одно рандомное описание
var generateDescription = function generateDescription() {
  var randomIndex = (0, _common.getRandomInteger)(0, 5);
  return _const.DESCRIPTIONS[randomIndex];
}; //и создаем массив из предложений от 1 до 5


var descriptionText = new Array((0, _common.getRandomInteger)(0, _const.OFFERS.length)).fill().map(generateDescription); //находим рандомную доп услугу

var generateOffers = function generateOffers() {
  var randomIndex = (0, _common.getRandomInteger)(0, _const.OFFERS.length - 1);
  return _const.OFFERS[randomIndex];
}; //создаем массив из несколькоих доп услуг от 0 до длины массива


var offersArray = new Array((0, _common.getRandomInteger)(0, _const.OFFERS.length)).fill().map(generateOffers); //генерируем рандомный тип поездки

var generateTripType = function generateTripType() {
  var randomIndex = (0, _common.getRandomInteger)(0, _const.TYPES_OF_TRIP.length - 1);
  return _const.TYPES_OF_TRIP[randomIndex];
}; //генерируем рандомный пункт назначения


var generateCityDestination = function generateCityDestination() {
  var randomIndex = (0, _common.getRandomInteger)(0, _const.DESTINATIONS.length - 1);
  return _const.DESTINATIONS[randomIndex];
}; //генерируем дату начала


var generateDateStart = function generateDateStart() {
  var day = (0, _common.getRandomInteger)(1, 5); //на сколько дней вперед

  return (0, _dayjs["default"])().add(day, 'day').toDate();
}; //генерируем дату оконачния


var generateDateEnd = function generateDateEnd() {
  var day = (0, _common.getRandomInteger)(6, 10); //на сколько дней вперед

  return (0, _dayjs["default"])().add(day, 'day').toDate();
}; //генерируем рандомное фото


var generatePhoto = function generatePhoto() {
  var photo = "http://picsum.photos/248/152?r=".concat((0, _common.getRandomInteger)(1, 100));
  return photo;
}; //создаем массив фото


var photos = new Array((0, _common.getRandomInteger)(0, 5)).fill().map(generatePhoto);

var generateTripPoint = function generateTripPoint() {
  return {
    tripType: generateTripType(),
    //тип точки маршрута
    сityDestination: generateCityDestination(),
    //Пункт назначения (город
    date: generateDateStart(),
    //дата события
    time: {
      timeStart: generateDateStart(),
      timeEnd: generateDateEnd()
    },
    price: (0, _common.getRandomInteger)(120, 800),
    offersArray: offersArray,
    placeDestination: {
      descriptionText: descriptionText,
      //описание
      photos: photos //фото

    },
    isFavorite: (0, _common.getBoolean)(),
    id: (0, _nanoid.nanoid)() //присваиваем id для каждой задачи

  };
};

exports.generateTripPoint = generateTripPoint;
console.log(generateTripPoint());
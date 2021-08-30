"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateItem = exports.createElement = exports.getBoolean = exports.getRandomInteger = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
var getRandomInteger = function getRandomInteger() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var lower = Math.ceil(Math.min(a, b));
  var upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
}; //добавление в избранное


exports.getRandomInteger = getRandomInteger;

var getBoolean = function getBoolean() {
  var _boolean = Boolean(getRandomInteger(0, 1));

  return _boolean;
}; //ф-я, необходимая чтобы создать но основании html-разметки создать новый дом-элемент, который мы потом сможем куда-то вставить


exports.getBoolean = getBoolean;

var createElement = function createElement(template) {
  var newElement = document.createElement('div'); //создаём div

  newElement.innerHTML = template; //и в него д обавляем ту разметку, которая пришла

  return newElement.firstChild; //возвращаем первый дочерний элемент, тк вся разметка нам не нужна
}; //ф-я заменяет один элемент массива на новый


exports.createElement = createElement;

var updateItem = function updateItem(items, update) {
  var index = items.findIndex(function (item) {
    return item.id === update.id;
  });

  if (index === -1) {
    return items;
  }

  return [].concat(_toConsumableArray(items.slice(0, index)), [update], _toConsumableArray(items.slice(index + 1)));
};

exports.updateItem = updateItem;
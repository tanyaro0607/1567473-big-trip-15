import dayjs from 'dayjs';
import {DESCRIPTIONS, OFFERS, TYPES_OF_TRIP, DESTINATIONS} from '../const.js';
import {getRandomInteger, getBoolean} from '../util';

//находим одно рандомное описание
const generateDescription = () => {
  const randomIndex = getRandomInteger(0, 5);
  return DESCRIPTIONS[randomIndex];
};

//и создаем массив из предложений от 1 до 5
const descriptionText = new Array(getRandomInteger(0, OFFERS.length)).fill().map(generateDescription);

//находим рандомную доп услугу
const generateOffers = () => {
  const randomIndex = getRandomInteger(0, OFFERS.length - 1);
  return OFFERS[randomIndex];
};

//создаем массив из несколькоих доп услуг от 0 до длины массива
const offersArray = new Array(getRandomInteger(0, OFFERS.length)).fill().map(generateOffers);

//генерируем рандомный тип поездки
const generateTripType = () => {
  const randomIndex = getRandomInteger(0, TYPES_OF_TRIP.length - 1);
  return TYPES_OF_TRIP[randomIndex];
};

//генерируем рандомный пункт назначения
const generateCityDestination = () => {
  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndex];
};

//генерируем дату начала
const generateDateStart = () => {
  const day = getRandomInteger(1, 5);//на сколько дней вперед
  return dayjs().add(day, 'day').toDate();
};

//генерируем дату оконачния
const generateDateEnd = () => {
  const day = getRandomInteger(6, 10);//на сколько дней вперед
  return dayjs().add(day, 'day').toDate();
};

//генерируем рандомное фото
const generatePhoto = () => {
  const photo = `http://picsum.photos/248/152?r=${getRandomInteger(1,100)}`;
  return photo;
};

//создаем массив фото
const photos = new Array(getRandomInteger(0,5)).fill().map(generatePhoto);

const generateTripPoint = () => ({
  tripType: generateTripType(), //тип точки маршрута
  сityDestination: generateCityDestination(), //Пункт назначения (город
  date: generateDateStart(), //дата события
  time: {
    timeStart: generateDateStart(),
    timeEnd: generateDateEnd(),
  },
  price: getRandomInteger(120,800),
  offersArray,
  placeDestination: {
    descriptionText, //описание
    photos, //фото
  },
  isFavorite: getBoolean(),
});

export {generateTripPoint};

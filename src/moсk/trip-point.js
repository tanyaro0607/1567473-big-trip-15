import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateOffersText = () => {
  const texts = [
    'Order Uber',
    'Add luggage',
    'Switch to comfort',
    'Rent a car',
    'Add breakfast',
    'Book tickets',
    'Lunch in city',
  ];

  const randomIndex = getRandomInteger(0, texts.length - 1);

  return texts[randomIndex];
};

//создаем массив объектов для доп услуг
const offersText = new Array(20).fill().map(generateOffersText);

//создаем массив объектов описания
const descriptionText = new Array(3).fill().map(generateDescription); //массив из трeх предложений

const generateTripType = () => {
  const tripType = [ 'Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

  const randomIndex = getRandomInteger(0, tripType.length - 1);

  return tripType[randomIndex];
};

//генерируем пункт назначения
const generateCityDestination = () => {
  const сityDestination = [ 'Amsterdam', 'Geneva', 'Rome', 'Barselona', 'Paris', 'New-York', 'Prague', 'Tokio'];

  const randomIndex = getRandomInteger(0, сityDestination.length - 1);

  return сityDestination[randomIndex];
};

// //создаем массив городов
// const citys = new Array(20).fill().map(generateCityDestination);

const generateDate = () => {
  const day = getRandomInteger(1, 28);//на сколько дней вперед
  return dayjs().add(day, 'day').toDate();
};

const generatePhoto = () => {
  const photo = 'http://picsum.photos/248/152?r='+getRandomInteger(1,100);
  return photo;
};

//создаем массив фото
const photos = new Array(20).fill().map(generatePhoto);

// function getPriceOffer() {
//   const text = document.querySelectorAll('.event__offer-title');
//   const priceOffer = document.querySelector('.event__offer-price');
//   for (let i=0; i<text.length; i++) {
//     if (text.innerHTML === 'Order Uber') {
//       priceOffer.innerText = '20';
//     }  else if (text.innerHTML === 'Add luggage') {
//       priceOffer.innerText = '50';
//     } else if (text.innerHTML === 'Switch to comfort') {
//       priceOffer.innerText = '80';
//     } else if (text.innerHTML === 'Rent a car') {
//       priceOffer.innerText = '200';
//     } else if (text.innerHTML === 'Add breakfast') {
//       priceOffer.innerText = '50';
//     } else if (text.innerHTML === 'Book tickets') {
//       priceOffer.innerText = '40';
//     } else if (text.innerHTML === 'Lunch in city') {
//       priceOffer.innerText = '30';
//     } else {
//       priceOffer.innerText = '100';
//     }
//   }
// }

const generateTripPoint = () => ({
  tripType: generateTripType(), //тип точки маршрута
  сityDestination: generateCityDestination(), //Пункт назначения (город
  icon: generateTripType(),
  date: generateDate(), //дата события
  timeStart: generateDate(),
  timeEnd: generateDate(),
  price: getRandomInteger(120,800),
  offers: {
    offersText,
    offersPrice: getRandomInteger(20,200), // offersPrice: getPriceOffer(),
  },
  placeDestination: {
    descriptionText, //описание
    photos, //фото
  },
  // isFavorite: getStart(),
});

export {generateTripPoint};

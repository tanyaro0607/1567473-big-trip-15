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

const generateTripType = () => {
  const tripType = [ 'Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeng', 'Restaurant'];

  const randomIndex = getRandomInteger(0, tripType.length - 1);

  return tripType[randomIndex];
};

//генерируем пункт назначения
const generateCityDestination = () => {
  const сityDestination = [ 'Amsterdam', 'Geneva', 'Rome', 'Barse(lona', 'Paris', 'New-York', 'Prague', 'Tokio'];

  const randomIndex = getRandomInteger(0, сityDestination.length - 1);

  return сityDestination[randomIndex];
};

const generateTripPoint = () => ({
  tripType: generateTripType(), //тип точки маршрута
  сityDestination: generateCityDestination(), //Пункт назначения (город)
  //dateStart: , //Дата и время начала события. Выбор времени и даты осуществляется с помощью библиотеки flatpickr.js. Выбранная дата и время отображаются в поле в формате: день/месяц/год часы:минуты (например «25/12/2019 16:00»).
  //dateEnd: , // Дата окончания не может быть меньше даты начала события.
  price: getRandomInteger(1,100), //Стоимость. Целое положительное число.
  placeDestination: {
    description: generateDescription(3), //описание - исправить на 3
    photo:'"http://picsum.photos/248/152?r"+getRandomInteger(1,100)', //фото - испарвить на несколько
  },
});

export {generateTripPoint};

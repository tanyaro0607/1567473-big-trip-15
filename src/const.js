//массив с описаниями

export const DESCRIPTIONS = [
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

//создаем массив объектов доп услуг
export const OFFERS = [
  {text:'Order Uber',price: 20, isSelected: false},
  {text:'Add luggage',price: 50, isSelected: false},
  {text:'Switch to comfort',price: 80, isSelected: false},
  {text:'Rent a car',price: 200, isSelected: false},
  {text:'Add breakfast',price: 50, isSelected: false},
  {text:'Book tickets',price: 40, isSelected: false},
  {text:'Lunch in city',price: 30, isSelected: false},
];

//создаем массив городов
export const DESTINATIONS = [ 'Amsterdam', 'Geneva', 'Rome', 'Barselona', 'Paris', 'New-York', 'Prague', 'Tokio'];

//тип поездки
export const TYPES_OF_TRIP = [
  {type:'Taxi', icon: 'taxi'},
  {type:'Train', icon: 'train'},
  {type:'Ship', icon: 'ship'},
  {type:'Drive', icon: 'drive'},
  {type:'Flight', icon: 'flight'},
  {type:'Check-in', icon: 'check-in'},
  {type:'Sightseeing', icon: 'sightseeing'},
  {type:'Restaurant', icon: 'restaurant'},
];

export const SortHeaders = {
  DAY:'day',
  EVENT:'event',
  TIME:'time',
  PRICE:'price',
  OFFERS:'offers',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH', // маленькое изменение - не меняет глобально и ничего не ломает
  MINOR: 'MINOR', // среднее, привносит новое, но не ломает старое - список точек маршута
  MAJOR: 'MAJOR', // глобальное, изменение, требует перерисовки страницы (добавление, удаление)
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  TABLE: 'TABLE',
  STATS: 'STATS',
};

export const ChartType = {
  MONEY: 'MONEY',
  TIME_SPEND: 'TIME_SPEND',
  TYPE: 'TYPE',
};

export const SortType = [SortHeaders.DAY, SortHeaders.TIME, SortHeaders.PRICE];

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
export const DESTINATIONS = [ 'Amsterdam', 'Geneva', 'Rome', 'Barcelona', 'Paris', 'New-York', 'Prague', 'Tokio'];

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

export const SortHeader = {
  DAY: {
    name: 'day',
    disabled: false,
  },
  EVENT: {
    name: 'event',
    disabled: true,
  },
  TIME: {
    name: 'time',
    disabled: false,
  },
  PRICE: {
    name: 'price',
    disabled: false,
  },
  OFFERS: {
    name: 'offers',
    disabled: true,
  },
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
  INIT: 'INIT',
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
  TIME_SPEND: 'TIME-SPEND',
  TYPE: 'TYPE',
};



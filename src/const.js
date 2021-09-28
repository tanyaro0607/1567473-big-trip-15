const BAR_HEIGHT = 55;
const SCALE = 5;

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

export {BAR_HEIGHT, SCALE};


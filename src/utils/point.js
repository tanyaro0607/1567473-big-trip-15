import dayjs from 'dayjs';

//сортировка
// Price - по цене, от дорогой к дешевой
export const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;

//вернуться к исходникам
export const sortByDay = (pointA, pointB) => dayjs(pointA.timeEnd).diff(dayjs(pointB.timeEnd));


// Time - по времени, от max к min
export const sortByTime = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.timeEnd).diff(dayjs(pointA.timeStart));
  const pointBDuration = dayjs(pointB.timeEnd).diff(dayjs(pointB.timeStart));
  return pointBDuration - pointADuration;
};

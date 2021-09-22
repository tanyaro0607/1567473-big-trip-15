import dayjs from 'dayjs';

//сортировка
// Price - по цене, от дорогой к дешевой
export const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;

//вернуться к исходникам
export const sortByDay = (pointA, pointB) => dayjs(pointA.time.timeEnd).diff(dayjs(pointB.time.timeEnd));


// Time - по времени, от max к min
export const sortByTime = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.time.timeEnd).diff(dayjs(pointA.time.timeStart));
  const pointBDuration = dayjs(pointB.time.timeEnd).diff(dayjs(pointB.time.timeStart));
  return pointBDuration - pointADuration;
};

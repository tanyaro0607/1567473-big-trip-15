import dayjs from 'dayjs';

//сортировка
// Price - по цене, от дорогой к дешевой
export const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;

//вернуться к исходникам
export const sortByDay = (pointA, pointB) => dayjs(pointA.time.timeEnd).diff(dayjs(pointB.time.timeEnd));


// Time - по времени, от max к min
// export const sortByTime = (pointA, pointB) => (pointB.end - pointB.start) - (pointA.end - pointA.start);
export const sortByTime = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.time.timeEnd).diff(dayjs(pointA.time.timeStart));
  const pointBDuration = dayjs(pointB.time.timeEnd).diff(dayjs(pointB.time.timeStart));
  return pointBDuration - pointADuration;
};

export const durationFormat = (durationValue) => {
  const days = Math.floor(durationValue / (1000 * 60 * 60 * 24) % 30),
    hours = Math.floor((durationValue / (1000 * 60 * 60)) % 24),
    minutes = Math.floor((durationValue / (1000 * 60)) % 60);

  if (days !== 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (days === 0 && hours !== 0) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${minutes}M`;
  }
};


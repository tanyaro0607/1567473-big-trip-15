import dayjs from 'dayjs';

const SECONDS_IN_DAY = 86400000;
const SECONDS_IN_HOURS = 3600000;

export const getTimeFormat = (diff) => {
  if (diff === 0) {
    return '';
  } if (diff > SECONDS_IN_DAY) {
    return `${dayjs(diff).format('DD')}D ${dayjs(diff).format('hh')}H ${dayjs(diff).format('mm')}M`;
  } if (diff <= SECONDS_IN_HOURS) {
    return `${dayjs(diff).format('mm')}M`;
  } if (diff <= SECONDS_IN_DAY) {
    return `${dayjs(diff).format('hh')}H ${dayjs(diff).format('mm')}M`;
  }
};

export const getSumPriceFromType = (point) => {
  const dataSortByPrice = point.slice().sort((a, b) => b.price - a.price);

  let result = null;
  result = Object.fromEntries(dataSortByPrice.map((item) => [item.tripType, 0]));
  dataSortByPrice.forEach((item) => {
    result[item.tripType] += item.price;
  });
  return result;
};

export const getSumTimeFromType = (point) => {
  const dataSortByTime = point.slice()
    .sort((elem1, elem2) => dayjs(elem2.time.timeEnd).
      diff(dayjs(elem2.time.timeStart)) - dayjs(elem1.time.timeEnd).diff(dayjs(elem1.time.timeStart)));

  let result = null;
  result = Object.fromEntries(dataSortByTime.map((item) => [item.tripType, 0]));
  dataSortByTime.forEach((item) => {
    result[item.tripType] += (item.time.timeEnd - item.time.timeStart);
  });
  return result;
};

export const getQuantityType = (point) => {
  let result = null;
  result = Object.fromEntries(point.map((item) => [item.tripType, 0]));
  point.forEach((item) => {
    result[item.tripType] += 1;
  });
  return result;
};

export const getSortType = ((val) => Object.keys(val).sort((a, b) => val[b] - val[a]));

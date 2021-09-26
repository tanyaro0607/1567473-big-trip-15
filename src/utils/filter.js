import {FilterType} from '../const';
import dayjs from 'dayjs';

const getFutureDate = (timeStart) => dayjs(timeStart) >= dayjs();
const getPastDate = (timeEnd) => dayjs(timeEnd) <= dayjs();

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => getFutureDate(point.timeStart)),
  [FilterType.PAST]: (points) => points.filter((point) => getPastDate(point.timeEnd)),
};

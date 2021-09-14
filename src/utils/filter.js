import {FilterType} from '../const';
import dayjs from 'dayjs';

export const getFutureDate = (timeStart) => dayjs(timeStart) >= dayjs();
export const getPastDate = (timeEnd) => dayjs(timeEnd) <= dayjs();

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => getFutureDate(point.time.timeStart)),
  [FilterType.PAST]: (points) => points.filter((point) => getPastDate(point.time.timeEnd)),
};

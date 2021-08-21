import dayjs from 'dayjs';
import {getRandomInteger} from '../utils';
import AbstractView from './abstract.js';

const renderCostValue = () => {
  const costValue = getRandomInteger(1000, 3000);
  return costValue;
};

//Маршрут и стоимость
const createTripInfoTemplate = (point) => {
  const timeStartEvent = dayjs(point[0].time.timeStart).format('MMM D');
  const timeEndEvent = dayjs(point[point.length-1].time.timeEnd).format('D');

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${point[0].сityDestination} &mdash; ${point[1].сityDestination} &mdash; ${point[point.length-1].сityDestination}</h1>

    <p class="trip-info__dates">${timeStartEvent}&nbsp;&mdash;&nbsp;${timeEndEvent}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${renderCostValue()}</span>
  </p>`;
};

export default class TripInfo extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createTripInfoTemplate(this._point);
  }

}

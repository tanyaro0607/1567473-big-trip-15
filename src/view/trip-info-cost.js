import {getRandomInteger} from '../utils';
import AbstractView from './abstract.js';

const renderCostValue = () => {
  const costValue = getRandomInteger(1000, 3000);
  return costValue;
};

//Маршрут и стоимость
const createTripInfoCostTemplate = () => (
  `<p class="trip-info__cost">
  Total: €&nbsp;<span class="trip-info__cost-value">${renderCostValue()}</span>
</p>`
);

export default class TripInfoCost extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripInfoCostTemplate();
  }

}

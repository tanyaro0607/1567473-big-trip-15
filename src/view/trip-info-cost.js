import {getRandomInteger, createElement} from '../utils';

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

export default class TripInfoCost {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfoCostTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

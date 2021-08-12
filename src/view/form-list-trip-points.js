import {createElement} from '../utils';

const createListTripPointsTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class ListTripPoints {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createListTripPointsTemplate();
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


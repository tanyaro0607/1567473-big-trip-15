import AbstractView from './abstract.js';

const createListTripPointsTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class ListTripPoint extends AbstractView {

  getTemplate() {
    return createListTripPointsTemplate();
  }

}


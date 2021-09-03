import AbstractView from './abstract.js';

const createListPointsTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class ListPoint extends AbstractView {

  getTemplate() {
    return createListPointsTemplate();
  }

}


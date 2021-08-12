import {TRIP_SORT} from '../const.js';
import {createElement} from '../utils';

//генерируем список пунктов сортировки
const renderListSort = () => {
  let str = '';
  for (let i = 0; i < TRIP_SORT.length; i++) {
    str += `<div class="trip-sort__item  trip-sort__item--${TRIP_SORT[i].toLowerCase()}">
    <input id="sort-${TRIP_SORT[i].toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer">
    <label class="trip-sort__btn" for="sort-${TRIP_SORT[i].toLowerCase()}">${TRIP_SORT[i]}</label>
  </div>`;
  }
  return str;
};

const createSortFormTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">

  ${renderListSort()}

</form>`
);

export default class SortForm {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortFormTemplate();
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

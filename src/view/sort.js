import {TRIP_SORT, SortType} from '../const.js';
import AbstractView from './abstract.js';

//генерируем список пунктов сортировки
const renderListSort = () => {
  let str = '';
  for (let i = 0; i < TRIP_SORT.length; i++) {
    const sortData = () => {
      if (TRIP_SORT[i].toLowerCase() === SortType.DAY) {
        const dataSortType = SortType.DAY;
        return dataSortType;
      } if (TRIP_SORT[i].toLowerCase() === SortType.TIME) {
        const dataSortType = SortType.TIME;
        return dataSortType;
      } if (TRIP_SORT[i].toLowerCase() === SortType.PRICE) {
        const dataSortType = SortType.PRICE;
        return dataSortType;
      }
    };

    str += `<div class="trip-sort__item  trip-sort__item--${TRIP_SORT[i].toLowerCase()} data-sort-type="${sortData()}">
    <input id="sort-${TRIP_SORT[i].toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${TRIP_SORT[i].toLowerCase()}">
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

export default class Sort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortFormTemplate();
  }

  //обработчик - клик по сортировке
  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    // this._callback.sortTypeChange(evt.target.dataset.sortType);
    this._callback.sortTypeChange(evt.target.id);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

import {SortHeaders, SortType} from '../const.js';
import AbstractView from './abstract.js';

//генерируем список пунктов сортировки
const renderListSort = () => {

  let str = '';
  Object.keys(SortHeaders).forEach( (item) => {
    const dataSortAtribute = SortType.includes(SortHeaders[item])?`data-sort-type="${SortHeaders[item]}"` :'';
    str += `<div class="trip-sort__item  trip-sort__item--${SortHeaders[item]}" >
    <input id="sort-${SortHeaders[item]}" class="trip-sort__input  visually-hidden" type="radio"  name="trip-sort" value="sort-${SortHeaders[item]}" ${dataSortAtribute}>
    <label class="trip-sort__btn" for="sort-${SortHeaders[item]}">${SortHeaders[item]}</label>
  </div>`;
  });
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
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

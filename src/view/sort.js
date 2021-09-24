import {SortHeader} from '../const.js';
import AbstractView from './abstract.js';

const createSortFormTemplate = (currentSortType) => {
  const sortTypes = Object.values(SortHeader);
  const getDisabled = (disabled) => disabled ? 'disabled' : '';
  const getChecked = (type) => currentSortType === type ? 'checked' : '';

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sortTypes.map(({name, disabled}) => `<div class="trip-sort__item  trip-sort__item--${name}">
  <input id="sort-${name}" class="trip-sort__input  visually-hidden" data-sort-type="${name}" type="radio" name="trip-sort" value="sort-${name}" ${getChecked(name)} ${getDisabled(disabled)}>
  <label class="trip-sort__btn" for="sort-${name}">${name}</label>
  </div>`).join('')}
  </form>`;
};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;

    console.log(currentSortType)
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortFormTemplate(this._currentSortType);
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

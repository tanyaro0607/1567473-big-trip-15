import AbstractView from './abstract';
import {FilterType} from '../const.js';

const renderFilterItemList = (currentFilterType) => {
  let str = '';
  Object.keys(FilterType).forEach( (item) => {
    str += `<div class="trip-filters__filter">
    <input id="filter-${FilterType[item]}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType[item]}" ${FilterType[item] === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${FilterType[item]}">${FilterType[item]}</label>
    </div>`;
  });
  return str;
};

const createFilterTemplate = () => (
  `<form class="trip-filters" action="#" method="get">

  ${renderFilterItemList()}

  <button class="visually-hidden" type="submit">Accept filter</button>`
);


export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}


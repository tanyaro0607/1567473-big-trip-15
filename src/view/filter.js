import AbstractView from './abstract.js';

const createFilterTemplate = (filter, currentFilterType) => {
  let str = '';
  Object.keys(filter).forEach( (item) => {
    str += `<div class="trip-filters__filter">
<input id="filter-${filter[item].type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter[item].type}" ${filter[item].type === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter[item].type}">${filter[item].type}</label>
    </div>`;
  });
  return `<form class="trip-filters" action="#" method="get"> ${str} <button class="visually-hidden" type="submit">Accept filter</button>`;
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    // console.log(filters)
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


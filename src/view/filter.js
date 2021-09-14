import AbstractView from './abstract';
import {FilterType} from '../const.js';

// const createFilterTemplate = () => (
//   `<div class="trip-controls__filters">
//   <h2 class="visually-hidden">Filter events</h2>
//   <form class="trip-filters" action="#" method="get">
//     <div class="trip-filters__filter">
//       <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
//       <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
//     </div>

//     <div class="trip-filters__filter">
//       <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
//       <label class="trip-filters__filter-label" for="filter-future">Future</label>
//     </div>

//     <div class="trip-filters__filter">
//       <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
//       <label class="trip-filters__filter-label" for="filter-past">Past</label>
//     </div>

//     <button class="visually-hidden" type="submit">Accept filter</button>
//   </form>
// </div>
// </div>`
// );

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
  `<div class="trip-controls__filters">
  <h2 class="visually-hidden">Filter events</h2>
  <form class="trip-filters" action="#" method="get">

  ${renderFilterItemList()}

  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  </div>`
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


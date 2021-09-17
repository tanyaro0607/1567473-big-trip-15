import dayjs from 'dayjs';
import AbstractView from './abstract.js';
import {OFFERS} from '../const.js';

//передаем в шаблон
const renderOffers = (offersArray) => {
  let str = '';
  for (let i = 0; i < offersArray.length; i++) {
    str += `<li class="event__offer">
    <span class="event__offer-title">${offersArray[i].text}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offersArray[i].price}</span>
    </li>`;
  }
  return `<ul class="event__selected-offers"> ${str} </ul>`;
};

const createPointTemplate = (point) => {
  const { tripType, сityDestination, price, date, time, offersArray, isFavorite} = point;
  const dateEvent = dayjs(date).format('D MMM');
  const timeStartEvent = dayjs(time.timeStart).format('hh:mm');
  const timeEndEvent = dayjs(time.timeEnd).format('hh:mm');

  const renderTimeDiff = () => {
    const timeDiff = (dayjs(time.timeEnd)).diff(dayjs(time.timeStart), 'day');
    let time1;
    if (timeDiff > 0) {
      time1 = `${timeDiff}D 00H 00M`;
    } else {
      time1 = `00D 00H ${timeDiff}M`;
    }
    return time1;
  };

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return `<li class="trip-events__item">
  <div class="event">
  <time class="event__date" datetime="2019-03-18">${dateEvent}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${tripType.icon}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${tripType.type} ${сityDestination}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${timeStartEvent}">${timeStartEvent}</time>
      &mdash;
      <time class="event__end-time" datetime="${timeEndEvent}">${timeEndEvent}</time>
    </p>
    <p class="event__duration">${renderTimeDiff()}</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${price}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>

  ${renderOffers(offersArray)}

  <button class="event__favorite-btn ${favoriteClassName}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
</li>`;
};

export default class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  //публичный метод, принимает аргументом callback
  setEditClickHandler(callback) {
    this._callback.editClick = callback; // сохраняем ссылку на callback
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler); //подписываемся на событие и вызываем приватные метод
  }

}

import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getStart = () => {
  const isFavorite = Boolean(getRandomInteger(0, 1));
  return isFavorite;
};

const createEventTemplate = (point) => {
  const { tripType, сityDestination, price, icon, date, timeStart, timeEnd,offers } = point;
  const dateEvent = dayjs(date).format('D MMM');
  const timeStartEvent = dayjs(timeStart).format('hh:mm');
  const timeEndEvent = dayjs(timeEnd).format('hh:mm');

  const favoriteClassName = getStart()
    ? 'event__favorite-btn--active'
    : '';

  return `<li class="trip-events__item">
  <div class="event">
  <time class="event__date" datetime="2019-03-18">${dateEvent}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${tripType} ${сityDestination}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${timeStartEvent}">${timeStartEvent}</time>
      &mdash;
      <time class="event__end-time" datetime="${timeEndEvent}">${timeEndEvent}</time>
    </p>
    <p class="event__duration">30M</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${price}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    <li class="event__offer">
      <span class="event__offer-title">${offers.offersText[getRandomInteger(1,20)]}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offers.offersPrice}</span>
    </li>
  </ul>
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

export { createEventTemplate };

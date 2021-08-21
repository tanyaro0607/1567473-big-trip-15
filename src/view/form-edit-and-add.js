import dayjs from 'dayjs';
import {OFFERS, TYPES_OF_TRIP, DESTINATIONS} from '../const.js';
import {getRandomInteger, getBoolean} from '../utils';
import AbstractView from './abstract.js';

const BLANK_POINT = {
  tripType: {icon:'taxi', type: 'Taxi'},
  price: '0',
  placeDestination: {descriptionText: '', photos: ''},
  time: dayjs().toDate(),
  сityDestination: ''};


const addChecked = getBoolean()
  ? 'checked'
  : '';

//генерируем список городов
const renderListDestinations = () => {
  let str = '';
  for (let i = 0; i < DESTINATIONS.length; i++) {
    str += `<option value="${DESTINATIONS[i]}"></option>`;
  }
  return str;
};

//генерируем шаблон спискатипов поездки
const renderListTypesOfTrip = () => {
  let str = '';
  for (let i = 0; i < TYPES_OF_TRIP.length; i++) {
    str += ` <div class="event__type-item">
                        <input id="event-type-${TYPES_OF_TRIP[i].type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${TYPES_OF_TRIP[i].type.toLowerCase()}">
                        <label class="event__type-label  event__type-label--${TYPES_OF_TRIP[i].type.toLowerCase()}" for="event-type-${TYPES_OF_TRIP[i].type.toLowerCase()}-1">${TYPES_OF_TRIP[i].type}</label>
                      </div>`;
  }
  return str;
};

//генерируем шаблон доп услуг
const renderOffers = () => {
  let str = '';
  for (let i = 0; i < OFFERS.length; i++) {
    str += ` <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="${addChecked}" name="event-offer-luggage" ${addChecked}>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${OFFERS[i].text}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${OFFERS[i].price}</span>
    </label>
  </div> `;
  }
  return str;
};

//генерируем рандомное фото
const generatePhoto = () => {
  const photo = `http://picsum.photos/248/152?r=${getRandomInteger(1,100)}`;
  return photo;
};

//генерируем шаблон фото
const renderPhotos = () => {
  const photos = new Array(getRandomInteger(0, 5)).fill().map(generatePhoto);
  let str = '';
  for (let i = 0; i < photos.length; i++) {
    str += ` <img class="event__photo" src="${photos[i]}" alt="Event photo"> `;
  }
  return str;
};


const createEditFormTemplate = (point = {}) => {

  const {tripType, price, placeDestination, time, сityDestination} = point;

  const timeStartEvent = dayjs(time.timeStart).format('DD/MM/YY HH:mm');
  const timeEndEvent = dayjs(time.timeEnd).format('DD/MM/YY HH:mm');

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${tripType.icon}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${renderListTypesOfTrip(TYPES_OF_TRIP.type)}

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">

                      ${tripType.type}

                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${сityDestination}" list="destination-list-1">
                    <datalist id="destination-list-1">

                      ${renderListDestinations(DESTINATIONS)}

                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStartEvent}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEndEvent}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">

                    ${renderOffers(OFFERS)}

                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${placeDestination.descriptionText}</p>

                  <div class="event__photos-container">
                    <div class="event__photos-tape">

                    ${renderPhotos()}

                    </div>
                  </div>
                </section>
              </section>
            </form>
</li>`;
};

export default class TripPointEdit extends AbstractView {
  constructor(point = BLANK_POINT) {
    super();
    this._point = point;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createEditFormTemplate(this._point);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

}

import dayjs from 'dayjs';
import {OFFERS, TYPES_OF_TRIP, DESTINATIONS} from '../const.js';
import {getBoolean} from '../utils/common.js';
import AbstractView from './abstract.js';

const BLANK_POINT = {
  tripType: {icon:'taxi', type: 'Taxi'},
  price: '0',
  placeDestination: {descriptionTextArray: '', photosArray: ''},
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
const renderOffers = (offersArray) => {
  let str = '';
  for (let i = 0; i < offersArray.length; i++) {
    str += ` <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="${addChecked}" name="event-offer-luggage" ${addChecked}>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${offersArray[i].text}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offersArray[i].price}</span>
    </label>
  </div> `;
  }
  return str;
};

// //генерируем шаблон доп услуг
// const renderOffers = (offersArray) => {
//   if (!offersArray.length > 0) {
//     return '';
//   } else {
//   let str = '';
//   for (let i = 0; i < offersArray.length; i++) {
//     str += ` <div class="event__offer-selector">
//     <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="${addChecked}" name="event-offer-luggage" ${addChecked}>
//     <label class="event__offer-label" for="event-offer-luggage-1">
//       <span class="event__offer-title">${offersArray[i].text}</span>
//       &plus;&euro;&nbsp;
//       <span class="event__offer-price">${offersArray[i].price}</span>
//     </label>
//   </div> `};
//   return str;
// };

//генерируем шаблон фото
const renderPhotos = (photosArray) => {
  let str = '';
  for (let i = 0; i < photosArray.length; i++) {
    str += ` <img class="event__photo" src="${photosArray[i]}" alt="Event photo"> `;
  }
  return str;
};

//фото
const createPhotosTemplate = (photosArray) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${renderPhotos(photosArray)}
    </div>
  </div>`
);

//описание
const createParagraphTemplate = (descriptionTextArray) => {
  let str = '';
  for (let i = 0; i < descriptionTextArray.length; i++) {
    str += `${descriptionTextArray[i]}`;
  }
  return `<p class="event__destination-description"> ${str} </p>`;
};

const createDestinationInfoTemplate = (descriptionTextArray, photosArray) => {
  if (!descriptionTextArray || (!photosArray && !photosArray.length > 0) ) {
    return '';
  }
  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>

    ${(descriptionTextArray) ? createParagraphTemplate(descriptionTextArray) : ''}
    ${(photosArray) ? createPhotosTemplate(photosArray) : ''}

  </section>`;
};

const createEditFormTemplate = (data = {}) => {

  const {tripType, price, time, сityDestination, placeDestination} = data;

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

                      ${renderListDestinations()}

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
                  <button class="event__reset-btn" type="reset">Delete</button>
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

                  ${createDestinationInfoTemplate(placeDestination.descriptionTextArray, placeDestination.photosArray )}

              </section>
            </form>
</li>`;
};

export default class PointEdit extends AbstractView {
  constructor(point = BLANK_POINT) {
    super();
    this._data = PointEdit.parsePointToData(point);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._cityChangeHandler = this._cityChangeHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEditFormTemplate(this._data);
  }

  // обновление состояния - принимает объект с обнолвениями
  // метод, который будет обновлять данные в свойстве _data, а потом вызывать обновление шаблона
  updateData(update) {
    // если изменения не было, вернуть как было
    if (!update) {
      return;
    }

    // если изменение было
    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    this.updateElement();
  }

  // обновдение элемента
  // задача метода - удалить старый DOM элемент, вызвать генерацию нового и заменить один на другой
  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  restoreHandlers() {
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._cityChangeHandler);
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._typeChangeHandler);
  }

  // обработчик - клик по городу
  _cityChangeHandler(evt) {
    evt.preventDefault();
    this.updateData(
      {
        сityDestination: evt.target.value,
        placeDestination: {
          descriptionTextArray: createParagraphTemplate(), //описание
          photosArray: createPhotosTemplate(), //фото
        },
      });
  }

  // обработчик - клик по типу маршрута
  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData(
      {
        tripType: evt.target.value,
        offersArray: renderOffers(OFFERS),
      });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
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

  //статичные методы
  //берет информацию и переводит в состояние
  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
    );
  }

  // берет состояние формы и переводит в инф-ю
  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    return data;
  }

}

import dayjs from 'dayjs';
import {OFFERS, TYPES_OF_TRIP, DESTINATIONS, DESCRIPTIONS} from '../const.js';
import SmartView from './smart.js';
import {getRandomInteger} from '../utils/common.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';


const BLANK_POINT = {
  tripType: {icon:'taxi', type: 'Taxi'},
  price: '0',
  placeDestination: {descriptionTextArray: '', photosArray: ''},
  time: dayjs().toDate(),
  сityDestination: ''};

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

//находим рандомную доп услугу
const generateOffer = () => {
  const randomIndex = getRandomInteger(0, OFFERS.length - 1);
  return OFFERS[randomIndex];
};

const generateOffersArray = () => {
  const offersArray = new Array(0, 0, OFFERS.length - 1).fill().map(generateOffer);
  return offersArray;
};

//генерируем шаблон доп услуг
const renderOffers = (randomOffersArray) => {
  if (!randomOffersArray || !randomOffersArray.length) {
    return '';
  }
  let str = '';
  for (let i = 0; i < randomOffersArray.length; i++) {
    // console.log(randomOffersArray[i]);
    const addChecked = randomOffersArray[i].isSelected
      ? 'checked'
      : '';
    str += ` <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${addChecked}>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${randomOffersArray[i].text}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${randomOffersArray[i].price}</span>
    </label>
  </div> `;
  }
  return `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">

  ${str}

  </div>
</section>`;
};

//генерируем шаблон фото
const renderPhotos = (photosArray) => {
  let str = '';
  for (let i = 0; i < photosArray.length; i++) {
    str += ` <img class="event__photo" src="${photosArray[i]}" alt="Event photo"> `;
  }
  return str;
};

//генерируем рандомное фото
const generatePhoto = () => {
  const photo = `http://picsum.photos/248/152?r=${getRandomInteger(1,100)}`;
  return photo;
};

const generatePhotosArray = () => {
  const photosArray = new Array(getRandomInteger(0,5)).fill().map(generatePhoto);
  return photosArray;
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

//находим одно рандомное описание
const generateDescription = () => {
  const randomIndex = getRandomInteger(0, 5);
  return DESCRIPTIONS[randomIndex];
};

const generateDescriptionTextArray = () => {
  const descriptionTextArray = new Array(getRandomInteger(0, OFFERS.length)).fill().map(generateDescription);
  return descriptionTextArray;
};

const createEditFormTemplate = (data = {}) => {

  const {tripType, price, time, сityDestination, placeDestination, offersArray} = data;

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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" onkeyup="this.value = this.value.replace(/[^]/g,'');" value="${сityDestination}" list="destination-list-1">
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
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" onkeyup="this.value = this.value.replace(/[^0-9]/g,'');" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">

                  ${renderOffers(offersArray)}

                  ${createDestinationInfoTemplate(placeDestination.descriptionTextArray, placeDestination.photosArray )}

              </section>
            </form>
</li>`;
};

export default class PointEdit extends SmartView {
  constructor(point = BLANK_POINT) {
    super();
    this._data = PointEdit.parsePointToData(point);
    this._datepickerStart = null;// заводим поле для datepicker
    this._datepickerEnd = null;// заводим поле для datepicker


    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._cityChangeHandler = this._cityChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);
    this._timeStartChangeHandler = this._timeStartChangeHandler.bind(this);// обработчик, который реагирует на изменение даты
    this._timeEndChangeHandler = this._timeEndChangeHandler.bind(this);// обработчик, который реагирует на изменение даты

    this._setInnerHandlers();
    this._setDatepicker();
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более ненужный календарь
  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  _setDatepicker() {
    if (this._datepickerStart) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    if (this._datepickerEnd) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
    this._datepickerStart = flatpickr(
      this.getElement().querySelector('[name = "event-start-time"]'), //поле, куда нужно прикрепить календарь
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.time.timeStart, // значение по умолчанию
        onChange: this._timeStartChangeHandler, // что делаем, если пользователь ткнул в календарь
      },
    );
    this._datepickerStart = flatpickr(
      this.getElement().querySelector('[name = "event-end-time"]'), //поле, куда нужно прикрепить календарь
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.time.timeEnd, // значение по умолчанию
        onChange: this._timeEndChangeHandler, // что делаем, если пользователь ткнул в календарь
      },
    );
  }

  reset(point) {
    this.updateData(
      PointEdit.parsePointToData(point),
    );
  }

  getTemplate() {
    return createEditFormTemplate(this._data);
  }

  // восстановление внутрен
  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this._setDatepicker();
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  // установка внутренних обр-в
  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._cityChangeHandler);
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._typeChangeHandler);
    this.getElement()
      .querySelector('#event-price-1')
      .addEventListener('change', this._priceChangeHandler);
    this.getElement()
      .querySelectorAll('.event__offer-label').forEach((element) => {
        element.addEventListener('click', this._offerChangeHandler);
      });
  }

  // получает дату и переводит ее в состояние
  _timeStartChangeHandler([userDateStart]) {
    this.updateData({
      time: {
        timeStart: userDateStart,
      },
    });
  }

  // получает дату и переводит ее в состояние
  _timeEndChangeHandler([userDateEnd]) {
    // console.log(userDate);
    this.updateData({
      time: {
        timeEnd: userDateEnd,
      },
    });
  }

  // обработчик - клик по городу
  _cityChangeHandler(evt) {
    evt.preventDefault();
    this.updateData(
      {
        сityDestination: evt.target.value,
        placeDestination: {
          descriptionTextArray: generateDescriptionTextArray(), //описание
          photosArray: generatePhotosArray(), //фото
        },
      });
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData(
      {
        price: evt.target.value,
      });
  }

  // обработчик - клик по типу маршрута
  _typeChangeHandler(evt) {
    evt.preventDefault();
    const  icon = evt.target.value;
    function isType(item) {
      return item.icon === icon;
    }

    const type = TYPES_OF_TRIP.find(isType).type;

    this.updateData(
      {
        tripType: {
          icon,
          type,
        },
        offersArray: generateOffersArray(),
      });
  }

  _offerChangeHandler(evt) {
    evt.preventDefault();
    // console.log(evt.target.innerText);
    const offersRandom = this._data.offersArray;
    const offerIndex = offersRandom.findIndex((item) => item.text === evt.target.innerText);
    const updateOffer = offersRandom[offerIndex];
    // console.log(evt.target.innerText);
    console.log(updateOffer);

    // if (offerIndex === -1) {
    //   return;
    // }

    this.updateData({
      offersArray: [
        ...offersRandom.slice(0, offerIndex),
        updateOffer,
        ...offersRandom.slice(offerIndex + 1),
      ],
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

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  // берет состояние формы и переводит в инф-ю
  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    return data;
  }

}

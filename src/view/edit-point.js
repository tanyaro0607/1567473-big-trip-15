import dayjs from 'dayjs';
import {TYPES_OF_TRIP} from '../const.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';


const BLANK_POINT = {
  tripType: 'taxi',
  price: '0',
  placeDestination: {textDescriptions: '', photos: ''},
  time: dayjs().toDate(),
  сityDestination: ''};

const renderListDestinations = (destinations) => {
  console.log(destinations);
  let str = '';
  for (let i = 0; i < destinations.length; i++) {
    str += `<option value="${destinations[i].name}"></option>`;
  }
  return str;
};

//генерируем шаблон спискатипов поездки
const renderListTypesOfTrip = (isDisabled) => {
  let str = '';
  for (let i = 0; i < TYPES_OF_TRIP.length; i++) {
    str += ` <div class="event__type-item">
                        <input id="event-type-${TYPES_OF_TRIP[i].type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" ${isDisabled ? 'disabled' : ''} value="${TYPES_OF_TRIP[i].type.toLowerCase()}">
                        <label class="event__type-label  event__type-label--${TYPES_OF_TRIP[i].type.toLowerCase()}" for="event-type-${TYPES_OF_TRIP[i].type.toLowerCase()}-1">${TYPES_OF_TRIP[i].type}</label>
                      </div>`;
  }
  return str;
};

//генерируем шаблон доп услуг
const renderOffers = (tripOffers) => {
  if (!tripOffers || !tripOffers.length) {
    return '';
  }
  let str = '';
  for (let i = 0; i < tripOffers.length; i++) {

    const isChecked = tripOffers.some((offer) => offer.title === tripOffers[i].title); //some() проверяет, удовлетворяет ли какой-либо элемент массива условию,
    str += ` <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${isChecked ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${tripOffers[i].title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${tripOffers[i].price}</span>
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
const renderPhotos = (photos) => {
  let str = '';
  for (let i = 0; i < photos.length; i++) {
    str += ` <img class="event__photo" src="${photos[i].src}" alt="Event photo"> `;
  }
  return str;
};

//фото
const createPhotosTemplate = (photos) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${renderPhotos(photos)}
    </div>
  </div>`
);

//описание
const createDescriptionTemplate = (textDescriptions) => {
  let str = '';
  for (let i = 0; i < textDescriptions.length; i++) {
    str += `${textDescriptions[i]}`;
  }
  return `<p class="event__destination-description"> ${str} </p>`;
};

const createDestinationInfoTemplate = (textDescriptions, photos) => {
  if (!textDescriptions || (!photos && !photos.length > 0) ) {
    return '';
  }
  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>

    ${(textDescriptions) ? createDescriptionTemplate(textDescriptions) : ''}
    ${(photos) ? createPhotosTemplate(photos) : ''}

  </section>`;
};

const createEditFormTemplate = (data = {}, destinationsModel) => {
  const {tripType, price, time, сityDestination, placeDestination, tripOffers, isDisabled, isSaving, isDeleting, isNewPoint} = data;

  const timeStartEvent = dayjs(time.timeStart).format('DD/MM/YY HH:mm');
  const timeEndEvent = dayjs(time.timeEnd).format('DD/MM/YY HH:mm');

  //смена кнопки в форме
  let buttonTitle;
  if (isNewPoint) {
    buttonTitle = 'Cancel';
  } else if (isDeleting) {
    buttonTitle = 'Deleting...';
  } else {
    buttonTitle = 'Delete';
  }

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${tripType}.png" alt="Event type icon">
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

                      ${tripType}

                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" ${isDisabled ? 'disabled' : ''} onkeyup="this.value = this.value.replace(/[^]/g,'');" value="${сityDestination}" list="destination-list-1">
                    <datalist id="destination-list-1">

                      ${renderListDestinations(destinationsModel)}

                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" ${isDisabled ? 'disabled' : ''} name="event-start-time" value="${timeStartEvent}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" ${isDisabled ? 'disabled' : ''} name="event-end-time" value="${timeEndEvent}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" ${isDisabled ? 'disabled' : ''} onkeyup="this.value = this.value.replace(/[^0-9]/g,'');" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset">${buttonTitle}</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">

                  ${renderOffers(tripOffers)}

                  ${createDestinationInfoTemplate(placeDestination.textDescriptions, placeDestination.photos )}

              </section>
            </form>
</li>`;
};

export default class PointEdit extends SmartView {
  constructor(point = BLANK_POINT, offersModel, destinationsModel) {
    super();
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
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
    return createEditFormTemplate(this._data, this._destinationsModel, this._offersModel);
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
    this.updateData({
      time: {
        timeEnd: userDateEnd,
      },
    });
  }

  // обработчик - клик по городу
  _cityChangeHandler(evt) {
    evt.preventDefault();
    const сityDestination = evt.target.value;
    const placeDestination = this._destinationsModel.getDestinations().find((destination) => destination.name === сityDestination);
    const textDescriptions = placeDestination.description;
    const photos = placeDestination.pictures;
    this.updateData(
      {
        сityDestination,
        placeDestination: {
          textDescriptions,
          photos,
        },
      });
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    const tripType = evt.target.value;
    const tripOffers = this._offersModel.getOffers().find((offer) => offer.type === tripType).offers;
    this.updateData(
      {
        tripType,
        tripOffers,
      });
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData(
      {
        price: evt.target.value,
      });
  }

  // _offerChangeHandler(evt) {
  //   evt.preventDefault();
  //   const offersRandom = this._data.tripOffers;
  //   const offerIndex = offersRandom.findIndex((item) => item.title === evt.target.innerText);
  //   const updateOffer = offersRandom[offerIndex];
  //   this.updateData({
  //     tripOffers: [
  //       ...offersRandom.slice(0, offerIndex),
  //       updateOffer,
  //       ...offersRandom.slice(offerIndex + 1),
  //     ],
  //   });
  //   console.log(1);
  // }

  _offerChangeHandler(evt) {

    const offersAll = this._data.tripOffers;
    const selectedOffer = offersAll.find((offer) => offer.type === this._data.type);

    if (evt.target.checked) {
      this._data.tripOffers.push(selectedOffer);
    } else {
      const selectedOfferIndex = this._data.tripOffers.findIndex((tripOffer) => tripOffer.title === selectedOffer.title);

      this._data.tripOffers = [
        ...this._data.tripOffers.slice(0, selectedOfferIndex),
        ...this._data.tripOffers.slice(selectedOfferIndex + 1),
      ];
    }
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

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  //статичные методы
  //берет информацию и переводит в состояние
  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
        isNewPoint: false,
      });
  }

  // берет состояние формы и переводит в инф-ю
  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;
    delete data.isNewPoint;

    return data;
  }

}

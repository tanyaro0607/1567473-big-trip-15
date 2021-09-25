import dayjs from 'dayjs';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  tripType: 'taxi',
  price: '',
  placeDestination: {textDescriptions: '', photos: ''},
  time: {
    timeStart: dayjs().toDate(),
    timeEnd: dayjs().toDate(),
  },
  сityDestination: '',
  tripOffers: [],
  isFavorite: false,
};

const renderListDestinations = (allDestinations) => {
  let str = '';
  for (let i = 0; i < allDestinations.length; i++) {
    str += `<option value="${allDestinations[i]}"></option>`;
  }
  return str;
};

const renderListTypesOfTrip = (allTripTypes, id, tripType) => {
  let str = '';
  for (let i = 0; i < allTripTypes.length; i++) {
    const typeOfTrip = allTripTypes[i];
    const typeName = typeOfTrip[0].toUpperCase() + typeOfTrip.substring(1);
    str += ` <div class="event__type-item">
                        <input id="event-type-${typeOfTrip}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeOfTrip}" ${typeOfTrip === tripType ? 'checked' : ''}>
                        <label class="event__type-label  event__type-label--${typeOfTrip}" for="event-type-${typeOfTrip}-${id}">${typeName}</label>
                      </div>`;
  }
  return str;
};

//генерируем шаблон доп услуг
const renderOffers = (allOffers, currentTripOffers, id) => {
  if (!allOffers || !allOffers.length) {
    return '';
  }
  let str = '';
  for (let i = 0; i < allOffers.length; i++) {

    const isChecked = currentTripOffers.some((offer) => offer.title === allOffers[i].title); //some() проверяет, удовлетворяет ли какой-либо элемент массива условию,
    const offerTitle = allOffers[i].title;
    const offerPrice = allOffers[i].price;
    const lastWordTitle =  offerTitle.split(' ').pop();
    str += ` <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${lastWordTitle}-${id}" type="checkbox" name="event-offer-${lastWordTitle}" ${isChecked ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${lastWordTitle}-${id}">
      <span class="event__offer-title">${offerTitle}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offerPrice}</span>
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

const createEditFormTemplate = (data = {}, destinationsModel, offersModel) => {
  const {tripType, price, time, сityDestination, placeDestination, id, isDisabled, tripOffers, isSaving, isDeleting, isNewPoint} = data;
  const timeStartEvent = dayjs(time.timeStart).format('DD/MM/YY HH:mm');
  const timeEndEvent = dayjs(time.timeEnd).format('DD/MM/YY HH:mm');

  const allOffers = offersModel.getOffers().find((item) => item.type=== tripType).offers;
  const allTripTypes = offersModel.getOffers().map((item) => item.type);
  const allDestinations = destinationsModel.getDestinations().map((item) => item.name);

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
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${tripType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${renderListTypesOfTrip(allTripTypes, id, tripType)}

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">

                      ${tripType}

                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" ${isDisabled ? 'disabled' : ''} onkeyup="this.value = this.value.replace(/[^]/g,'');" value="${сityDestination}" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">

                      ${renderListDestinations(allDestinations)}

                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" ${isDisabled ? 'disabled' : ''} name="event-start-time" value="${timeStartEvent}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" ${isDisabled ? 'disabled' : ''} name="event-end-time" value="${timeEndEvent}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" ${isDisabled ? 'disabled' : ''} onkeyup="this.value = this.value.replace(/[^0-9]/g,'');" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit"${isDisabled? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset">${buttonTitle}</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">

                  ${renderOffers(allOffers, tripOffers, id)}

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
    if (this._datepickerStart || this._datepickerStart) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
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

  removeHandlers() {
    this._removeInnerHandlers();
    this.getElement().querySelector('.event__reset-btn').removeEventListener('click', this._formDeleteClickHandler);
    this._datepickerEnd.destroy();
    this._datepickerEnd = null;
    this._datepickerStart.destroy();
    this._datepickerStart = null;
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
      this.getElement().querySelector('input[name = "event-start-time"]'), //поле, куда нужно прикрепить календарь
      {
        'time_24hr': true,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.time.timeStart, // значение по умолчанию
        onChange: this._timeStartChangeHandler, // что делаем, если пользователь ткнул в календарь
      },
    );
    this._datepickerEnd = flatpickr(
      this.getElement().querySelector('input[name = "event-end-time"]'), //поле, куда нужно прикрепить календарь
      {
        'time_24hr': true,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.time.timeEnd, // значение по умолчанию
        minDate: this._data.time.timeStart,
        onChange: this._timeEndChangeHandler, // что делаем, если пользователь ткнул в календарь
      },
    );
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
      .querySelector('.event__input--price')
      .addEventListener('change', this._priceChangeHandler);
    this.getElement()
      .querySelectorAll('.event__offer-checkbox').forEach((element) => {
        element.addEventListener('change', this._offerChangeHandler);
      });
  }

  // установка внутренних обр-в
  _removeInnerHandlers() {
    this.getElement()
      .querySelector('.event__input--destination')
      .removeEventListener('change', this._cityChangeHandler);
    this.getElement()
      .querySelector('.event__type-group')
      .removeEventListener('change', this._typeChangeHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .removeEventListener('change', this._priceChangeHandler);
    this.getElement()
      .querySelectorAll('.event__offer-checkbox').forEach((element) => {
        element.removeEventListener('change', this._offerChangeHandler);
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
    this.updateData({
      price: Number(evt.target.value),
    });
    this.getElement().querySelector('.event__input--price').focus();
  }

  _offerChangeHandler(evt) {
    evt.preventDefault();
    evt.target.toggleAttribute('checked');

    const checkedOffers = document.querySelectorAll('.event__offer-checkbox:checked');
    const selectedOffers = [];

    checkedOffers.forEach((input) => {
      const offerTitle = input.nextElementSibling.querySelector('.event__offer-title').textContent;
      const offerPrice = input.nextElementSibling.querySelector('.event__offer-price').textContent;
      selectedOffers.push({
        title: offerTitle,
        price: Number(offerPrice),
      });
    });

    this.updateData({
      tripOffers: selectedOffers,
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

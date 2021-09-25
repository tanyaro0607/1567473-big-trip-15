import AbstractObserver from '../utils/abstract-observer.js';
import dayjs from 'dayjs';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = []; //абстрактное свойство, где мы будем хранить точки
  }

  // метод, записывает в модель данные
  setPoints(updateType, points) {
    this._points = points.slice();

    this._notify(updateType);
  }

  // метод, возврашает значение приватного св-ва _points
  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  //адапртирует данные для клиента
  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        tripType: point.type, //тип точки маршрута
        сityDestination:  point.destination.name, //Пункт назначения (город
        date: dayjs(new Date(point.date_from)), //дата события
        time: {
          timeStart: dayjs(new Date(point.date_from)),
          timeEnd: dayjs(new Date(point.date_to)),
        },
        price: point['base_price'],
        tripOffers: point.offers,
        placeDestination: {
          textDescriptions: point.destination.description, //описание
          photos: point.destination.pictures, //фото
        },
        isFavorite: point['is_favorite'],
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint['type'];
    delete adaptedPoint['offers'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['destination'];

    return adaptedPoint;
  }

  //адапртирует данные для сервера
  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'base_price': point.price,
        'date_from': point.time.timeStart,
        'date_to': point.time.timeEnd,
        destination: {
          name: point.сityDestination,
          description: point.placeDestination.textDescriptions,
          pictures: point.placeDestination.photos,
        },
        'is_favorite': point.isFavorite,
        offers: point.tripOffers,
        type: point.tripType,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.price;
    delete adaptedPoint.time;
    delete adaptedPoint.сityDestination;
    delete adaptedPoint.textDescriptions;
    delete adaptedPoint.photos;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.tripOffers;
    delete adaptedPoint.tripType;

    return adaptedPoint;
  }
}

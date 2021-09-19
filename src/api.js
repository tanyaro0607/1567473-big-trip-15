import PointsModel from './model/points.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class Api {
  //endPoint - адрес сервера
  //authorization - строка аквторизации, случайная строка
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  //отправляет запрос на получение списка точек маршрута
  getPoints() {
    return this._load({url: 'points'})
      .then(Api.toJSON)
      .then((points) => points.map(PointsModel.adaptToClient));
  }

  //обновление точки
  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  //приватный метод, принимает аргументом объект с настройками
  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization); //вызываем метод append и доб новый заголовок

    //возвращает promise
    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus) //проверили статус
      .catch(Api.catchError); //обрабатываем ошибку
  }

  //проверка на взаимод с сервером
  //response - ответ от сервера
  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
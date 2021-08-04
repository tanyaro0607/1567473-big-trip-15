import dayjs from 'dayjs';

//Маршрут и стоимость
const createTripInfoTemplate = (point) => {
  const {timeStart, timeEnd, сityDestination} = point;

  const timeStartEvent = dayjs(timeStart).format('MMM D');
  const timeEndEvent = dayjs(timeEnd).format('D');

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${сityDestination} &mdash; ${сityDestination} &mdash; ${сityDestination}</h1>

    <p class="trip-info__dates">${timeStartEvent}&nbsp;&mdash;&nbsp;${timeEndEvent}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>
</section>`;
};

export {createTripInfoTemplate};

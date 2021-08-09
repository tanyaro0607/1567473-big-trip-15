//массив с описаниями
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

//создаем массив объектов доп услуг
const OFFERS = [
  {text:'Order Uber',price: 20},
  {text:'Add luggage',price: 50},
  {text:'Switch to comfort',price: 80},
  {text:'Rent a car',price: 200},
  {text:'Add breakfast',price: 50},
  {text:'Book tickets',price: 40},
  {text:'Lunch in city',price: 30},
];

//создаем массив городов
const DESTINATIONS = [ 'Amsterdam', 'Geneva', 'Rome', 'Barselona', 'Paris', 'New-York', 'Prague', 'Tokio'];

//тип поездки
const TYPES_OF_TRIP = [
  {type:'Taxi', icon: 'taxi'},
  {type:'Train', icon: 'train'},
  {type:'Ship', icon: 'ship'},
  {type:'Drive', icon: 'drive'},
  {type:'Flight', icon: 'flight'},
  {type:'Check-in', icon: 'check-in'},
  {type:'Sightseeing', icon: 'sightseeing'},
  {type:'Restaurant', icon: 'restaurant'},
];

const TRIP_SORT = ['Day', 'Event', 'Time', 'Price', 'Offers'];

export {DESCRIPTIONS, OFFERS, TYPES_OF_TRIP, DESTINATIONS, TRIP_SORT};

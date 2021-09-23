export default class Destinations {
  constructor() {
    this.__destinations = [];
  }

  setDestinations(destinatons) {
    this._destinationsModel = destinatons.slice();
  }

  getDestinations() {
    return this._destinations;
  }
}

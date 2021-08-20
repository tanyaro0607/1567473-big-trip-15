// Проверка в конструкторе на "new.target" позволит использовать абстрактный класс только в качестве родительского класса.
//При попытке выполнить "new Abstract()" разработчик получит ошибку
export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }
  }
}

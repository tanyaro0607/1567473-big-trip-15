const createElement = (template) => {
  const newElement = document.createElement('div'); //создаём div
  newElement.innerHTML = template; //и в него д обавляем ту разметку, которая пришла
  return newElement.firstChild; //возвращаем первый дочерний элемент, тк вся разметка нам не нужна
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {createElement, isEscEvent};

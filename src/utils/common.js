// Функция из интернета по генерации случайного числа из диапазона

//ф-я, необходимая чтобы создать но основании html-разметки создать новый дом-элемент, который мы потом сможем куда-то вставить
export const createElement = (template) => {
  const newElement = document.createElement('div'); //создаём div
  newElement.innerHTML = template; //и в него д обавляем ту разметку, которая пришла
  return newElement.firstChild; //возвращаем первый дочерний элемент, тк вся разметка нам не нужна
};

//ф-я заменяет один элемент массива на новый
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

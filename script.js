'use strict';

const books = document.querySelectorAll('.books');
const book = document.querySelectorAll('.book');
const blanks = document.querySelectorAll('ul');
const blank =  document.querySelectorAll('li');
const h2 = document.querySelectorAll('h2');
const reklama = document.querySelector('.adv');


console.log(books);
console.log(book);
console.log(blank);
book[1].remove();
book[2].remove();
book[3].remove();
book[5].remove();
//Восстановить порядок книг.
books[0].append(book[3]);
books[0].append(book[5]);
book[5].after(book[2]);
books[0].prepend(book[1]);

//Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage ="url('./image/you-dont-know-js.jpg')";

//Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
h2[4].innerHTML = '<a>Книга 3. this и Прототипы Объектов</a>';

//Удалить рекламу со страницы
reklama.remove();

//Восстановить порядок глав во второй и пятой книге
blank[9].after(blank[2]);
blank[3].after(blank[6]);
blank[9].before(blank[7]);
blank[4].before(blank[8]);
blank[49].before(blank[55]);
blank[50].after(blank[48]);
blank[54].before(blank[51]);

//в шестой книге добавить главу
const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';

blanks[2].append(newElem);
blank[26].before(newElem);

console.log(newElem);
console.log(h2);


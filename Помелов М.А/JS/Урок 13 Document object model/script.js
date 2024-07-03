// document.write('<h1>Заголовок добавленный с помощью  document.write</h1>');
// document.write('<p>Текст с помощью  document.write</p>');





// // Создание элемент в ОЗУ
// let header = document.createElement('div');
// // Редактирование элемента
// header.textContent = 'Новый блок';
// // Добавление элемента
// document.body.appendChild(header);


// document.title
// document.URL
// document.cookie
// document.contentType
// document.characterSet = UTF8;




//Манпилуяции с элементом
// let newDiv = document.createElement('div');
// newDiv.id = 'uniqueId';
// newDiv.className = 'my-class';

// newDiv.textContent = 'Блок с какой то настройкой';
// document.body.appendChild(newDiv);









let newDiv = document.createElement('div');

//Настройка
newDiv.textContent = 'Тестовый блок';

newDiv.style.color = 'green';
newDiv.style.fontSize = '20px';
newDiv.style.fontWeight = 'Bold';
newDiv.style.fontFamily = 'Arial';

newDiv.style.border = '2px solid green';
newDiv.style.borderRadius = '10px';
newDiv.style.padding = '5px';
newDiv.style.backgroundColor = 'beige';

newDiv.style.width = '200px';
newDiv.style.textAlign = 'center';
newDiv.style.margin = '8px';


newDiv.classList.add('class1');

newDiv.insertBefore(newDiv, document.createElement('div'));

document.body.appendChild(newDiv);



let children = newDiv.childNodes;



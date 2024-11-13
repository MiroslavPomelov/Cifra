// MAP
const map: Map<number, string> = new Map();
map.set(0, 'value');

console.log(map.get(0)); // Получить значение пл ключу 0

// Проверка на наличие
if (map.has(5)) {

}

map.delete(0); // Удаление по ключу
map.clear();




// SET
const set: Set<number> = new Set();
set.add(5);

set.has(5);

set.delete(5);

set.clear();









// Garbage collector - WeakMap

import * as Handlebars from 'handlebars';
import * as fs from 'fs';

// Загрузка шаблона из файла
const templateFile = fs.readFileSync('./backend/src/handlebars/main.hbs', 'utf8');
// Компиляция шаблона
const template = Handlebars.compile(templateFile);
// Данные для рендеринга

let username = 'Войти';

const data = {
    name: username
};

// Рендеринг HTML
export const result = template(data);
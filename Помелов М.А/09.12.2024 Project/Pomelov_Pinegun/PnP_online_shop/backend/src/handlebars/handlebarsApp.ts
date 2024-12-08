import * as Handlebars from 'handlebars';
import * as fs from 'fs';

// Загрузка шаблона из файла
const templateFile = fs.readFileSync('./backend/src/handlebars/main.hbs', 'utf8');
// Компиляция шаблона
const template = Handlebars.compile(templateFile);
// Данные для рендеринга

let username = 'Войти';

const data = {
    name: username,
    icons: {
        telegram: "https://cdn-icons-png.flaticon.com/512/4423/4423446.png ",
        twitter: "https://cdn-icons-png.flaticon.com/512/5968/5968830.png ",
        vk: "https://cdn-icons-png.flaticon.com/512/25/25684.png "
    }
};

// Рендеринг HTML
export const result = template(data);
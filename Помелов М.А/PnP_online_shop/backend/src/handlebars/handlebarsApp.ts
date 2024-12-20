import * as Handlebars from 'handlebars';
import * as fs from 'fs';

export function loadingTemplate(username: string, textBtn: string, script: string): string {
    // Загрузка шаблона из файла
const templateFile = fs.readFileSync('./backend/src/handlebars/main.hbs', 'utf8');
// Компиляция шаблона
const template = Handlebars.compile(templateFile);
// Данные для рендеринга
const data = {
    title: 'Мебельный магазин',
    username: username,  
    textBtn: textBtn,
    script: script
};

// Рендеринг HTML
return template(data);
}


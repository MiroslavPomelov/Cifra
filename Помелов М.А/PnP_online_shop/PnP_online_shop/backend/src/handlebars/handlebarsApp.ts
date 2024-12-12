import * as Handlebars from 'handlebars';
import * as fs from 'fs';

export function loadingTemplate(username: string, textBtn: string, btnEventListener: HTMLScriptElement): string {
    // Загрузка шаблона из файла
const templateFile = fs.readFileSync('./backend/src/handlebars/main.hbs', 'utf8');
// Компиляция шаблона
const template = Handlebars.compile(templateFile);
// Данные для рендеринга
const data = {
    username: username,  
    textBtn: textBtn,
    btnEventListener: btnEventListener
};

// Рендеринг HTML
return template(data);
}


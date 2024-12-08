"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.result = void 0;
const Handlebars = __importStar(require("handlebars"));
const fs = __importStar(require("fs"));
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
exports.result = template(data);

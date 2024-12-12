"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainPage = void 0;
const handlebarsApp_1 = require("../handlebars/handlebarsApp");
const mainPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send((0, handlebarsApp_1.loadingTemplate)('', 'Войти', ''));
});
exports.mainPage = mainPage;
;
const btnAuth = document.querySelector(".btnLogin-popup");
btnAuth.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});
/script>;

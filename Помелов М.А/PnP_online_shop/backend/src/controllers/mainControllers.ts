import { Request, Response } from "express";
import { readFilePromise } from "../modules/file-operator";
import { loadingTemplate } from "../handlebars/handlebarsApp";
import { User } from "../dataBase/entities/User";
import passport from "passport";
import { Exception } from "handlebars";


export const mainPage = async (req: Request, res: Response) => {   
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(loadingTemplate('Гость', 'Войти', "http://localhost:3000/js/enterScript.js"));
}

export const mainPageAutharizated = async (req: Request, res: Response) => {
    if (!req.user?.username) {
        res.status(404).send("Ошибка запроса");
      }
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(loadingTemplate(`${req.user?.username}`, 'Выйти', "http://localhost:3000/js/exitScript.js"));
}





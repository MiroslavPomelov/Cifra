import { Request, Response } from "express";
import { readFilePromise } from "../modules/file-operator";
import { result } from '../handlebars/handlebarsApp';

export const mainPage = async (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(result);
}


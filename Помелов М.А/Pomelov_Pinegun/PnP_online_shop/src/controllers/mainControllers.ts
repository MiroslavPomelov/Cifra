import { Request, Response } from "express";
import { readFilePromise } from "../modules/file-operator";

export const mainPage = async (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html')
    .status(200);
    res.send(await readFilePromise("./pages/MainPage/main.html"));
}

s
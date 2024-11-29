import { Request, Response } from "express";
import { readFilePromise } from "../modules/file-operator";

export const registrationPage = async (req: Request, res: Response) => {    
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(await readFilePromise("./pages/RegistrationPage/registration.html"));
}

export const authPage = async (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(await readFilePromise("./pages/AuthorizationPage/auth.html"));
}

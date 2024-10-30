import express, { Request, Response, NextFunction, Express, Router } from 'express';
import cors from 'cors'
import { User } from './classes/user';
import { json } from 'body-parser';


const app: Express = express();
const router: Router = express.Router();
const PORT: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function checkRegisteredUsers(req: Request, res: Response, next: NextFunction): void {

}

app.use((req, res, next) => {
    next();
})

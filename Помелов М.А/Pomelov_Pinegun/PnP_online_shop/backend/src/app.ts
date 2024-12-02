import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { engine } from "express-handlebars";
import express, { Request, Response, NextFunction } from 'express';
import { readFilePromise } from './modules/file-operator';
import { mainPage } from './controllers/mainControllers';
import authRouter from './routes/authRoutes';
import mainRouter from './routes/mainRoute';


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../public/views/layouts')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../public/views'));

app.use(mainRouter);

app.use(authRouter)

export default app;

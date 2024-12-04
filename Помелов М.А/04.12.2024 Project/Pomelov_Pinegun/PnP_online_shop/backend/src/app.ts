import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { engine } from "express-handlebars";
import express, { Request, Response, NextFunction } from 'express';
import { readFilePromise } from './modules/file-operator';
import { mainPage } from './controllers/mainControllers';
import authRouter from './routes/authRoutes';
import mainRouter from './routes/mainRoute';
import { AppDataSource } from "./configuration/AppDataSource";
import { User } from "./entities/User";
import { usersCreator, productsCreator } from './dbCreators/creator';
import { Repository } from "typeorm";
import { Product } from './entities/Product';
import { faker } from "@faker-js/faker";



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
app.use(authRouter);




// Создание БД

// async function creatingBD() {
//    await AppDataSource.initialize();

//    const UsersRepository: Repository<User> = AppDataSource.getRepository(User);
//    const ProductRepository: Repository<Product> = AppDataSource.getRepository(Product);


//    const listOfUsers: User[] = usersCreator();


//    await UsersRepository.save(listOfUsers);
//    await ProductRepository.save(productsCreator());

// }

// creatingBD();
   

export default app;

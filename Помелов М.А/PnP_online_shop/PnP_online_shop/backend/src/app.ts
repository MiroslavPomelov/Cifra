import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { engine } from "express-handlebars";
import express, { Request, Response, NextFunction } from "express";
import { readFilePromise } from "./modules/file-operator";
import { mainPage } from "./controllers/mainControllers";
import authRouter from "./routes/authRoutes";
import mainRouter from "./routes/mainRoute";
import { AppDataSource } from "./dataBase/configuration/AppDataSource";
import { User } from "./dataBase/entities/User";
import { usersCreator, productsCreator } from "./dataBase/dbCreators/creator";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Product } from "./dataBase/entities/Product";
import { faker } from "@faker-js/faker";
import { createDataBase } from "./dataBase/dbInit";
import passport, { use } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import { UserRepository } from "./dataBase/repositories/usersRepository";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("backend/src/images"));

passport.use(
  new LocalStrategy(async function (
    username: string,
    password: string,
    done: (error: any, user?: any, options?: { message: string }) => void
  ) {
    const userRepo: UserRepository = new UserRepository(AppDataSource);

    const existingUser: User | null =
      await userRepo.getUserByPasswordAndUsername(username, password);

    if (!existingUser) {
      return done(null, false, {
        message: "Неверное имя пользователя или пароль.",
      });
    }
    return done(null, existingUser);
  })
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const userRepo: UserRepository = new UserRepository(AppDataSource);
    const user: User | null = await userRepo.getUserById(id);

    if (!user) {
      throw new Error("PassportJs error");
    }
    done(null, user || null);
  } catch (error) {
    console.log(error);
  }
});

app.use(
  session({
    secret: "8888-8888-8888-8888-8888-8888",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());



app.use(mainRouter);
app.use(authRouter);

export default app;

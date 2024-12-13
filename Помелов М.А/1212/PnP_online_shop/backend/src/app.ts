import express, { Request, Response, NextFunction } from 'express';
// import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';
import authRouter from './routes/authRoutes';
import mainRouter from './routes/mainRoute';
import { AppDataSource } from './dataBase/configuration/AppDataSource';
import { UserRepository } from './dataBase/repositories/usersRepository';
import { User } from './dataBase/entities/User';
import cookieParser from 'cookie-parser';
import cors from "cors";
import passport from './authenticatorConfig/passport';


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("backend/src/public"));

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);
app.use(mainRouter);

export default app;






import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../dataBase/configuration/AppDataSource";
import { User } from "../dataBase/entities/User";
import { UserRepository } from "../dataBase/repositories/usersRepository";
import passport from "../authenticatorConfig/passport";
import { loadingTemplate } from "../handlebars/handlebarsApp";

export const registration = async (req: Request, res: Response, next: NextFunction) => {
  let user: User = new User();
  console.log(req.body);

  user.username = req.body.username;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.age = req.body.age;
  user.password = req.body.password;
  
  
  await AppDataSource.initialize();
  const userRepo: UserRepository = new UserRepository(AppDataSource);

  await userRepo.addUser(user);
  await AppDataSource.destroy(); 
    passport.authenticate("local", {
      successRedirect: "/private",
      failureRedirect: "/"
    })
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  console.log('вошли в контроллер выхода') 
  res.clearCookie('connect.sid');
  res.end();
};




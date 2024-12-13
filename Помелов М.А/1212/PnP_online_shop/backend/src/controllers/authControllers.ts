import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../dataBase/configuration/AppDataSource";
import { User } from "../dataBase/entities/User";
import { UserRepository } from "../dataBase/repositories/usersRepository";
import passport from "../authenticatorConfig/passport";

export const registration = async (req: Request, res: Response, next: NextFunction) => {
  let user: User = req.body.user;
  
  await AppDataSource.initialize();
  const userRepo: UserRepository = new UserRepository(AppDataSource);

  await userRepo.addUser(user);
  await AppDataSource.destroy();
  
  passport.authenticate("local", {
    successRedirect: "/private",
    failureRedirect: "/"
  })
  

  // res.redirect("/private");
};

import { Request, Response, NextFunction } from "express";
import { User } from "../dataBase/entities/User";
import { AppDataSource } from "../dataBase/configuration/AppDataSource";
import { UserRepository } from "../dataBase/repositories/usersRepository";

export async function checkRegisteredUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.user) {
    res.status(404).send("Ошибка запроса");
  }

  let user: User = req.body.user;

  await AppDataSource.initialize();

  const userRepo: UserRepository = new UserRepository(AppDataSource);
  const existingUser: User | null = await userRepo.getUserByUsername(
    user.username
  );

  await AppDataSource.destroy();
  if (existingUser) {
    res.status(401).send("Пользователь с таким username уже зарегистрирован");
    return;
  }

  next();
}

export async function mustAuthenticatedMw(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    console.log("мидлвэар да");
    next();
  } else {
    console.log("мидлвэар нет");
    res.redirect("/");
  }
}

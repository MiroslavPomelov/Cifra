import passport from "passport";

import { Strategy as LocalStrategy } from "passport-local";
import { AppDataSource } from "../dataBase/configuration/AppDataSource";
import { UserRepository } from "../dataBase/repositories/usersRepository";
import { User } from "../dataBase/entities/User";

passport.use(
  new LocalStrategy(async function (
    username: string,
    password: string,
    done: (error: any, user?: any, options?: { message: string }) => void
  ) {
    console.log("Loc!");
    await AppDataSource.initialize();
    const userRepo: UserRepository = new UserRepository(AppDataSource);

    const existingUser: User | null =
      await userRepo.getUserByPasswordAndUsername(username, password);
    await AppDataSource.destroy();

    console.log(existingUser);
    if (!existingUser) {
      console.log("не нашли");
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
    await AppDataSource.initialize();
    const userRepo: UserRepository = new UserRepository(AppDataSource);
    const user: User | null = await userRepo.getUserById(id);
    await AppDataSource.destroy();

    if (!user) {
      throw new Error("PassportJs error");
    }
    done(null, user || null);
  } catch (error) {
    console.log(error);
  }
});


export default passport;
import { Request, Response, NextFunction } from 'express';
import { User } from '../dataBase/entities/User';
import { AppDataSource } from '../dataBase/configuration/AppDataSource';
import { UserRepository } from '../dataBase/repositories/usersRepository';

export  async function checkRegisteredUsers(req: Request, res: Response, next: NextFunction) {    
    if (!req.body.user) {
        res.status(404).send('Ошибка запроса')
    }

    let user: User = req.body.user;
    
    const userRepo: UserRepository = new UserRepository(AppDataSource);
    const existingUser: User | null = await userRepo.getUserByUsername(user.username);

    if (existingUser) {
        res.status(401).send('Пользователь с таким username уже зарегистрирован');
        res.status(200).send({message: ""})
        return;
    }
    next(); 
}
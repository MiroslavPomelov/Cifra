import { Request, Response } from "express";
import { readFilePromise } from "../modules/file-operator";
import { AppDataSource } from "../dataBase/configuration/AppDataSource";
import { Repository } from "typeorm";
import { User } from "../dataBase/entities/User";
import { loadingTemplate } from "../handlebars/handlebarsApp";


export const registration = async (req: Request, res: Response) => { 
    let user: User = req.body.user;     
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    await userRepo.createQueryBuilder()
    .insert()
    .into(User)
    .values([
        {   username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            age: user.age,           
            password: user.password,           
            order: undefined
        }
    ])
    .execute();    
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(loadingTemplate(user.username));    
}

export const auth = async (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(await readFilePromise("./pages/AuthorizationPage/auth.html"));
}

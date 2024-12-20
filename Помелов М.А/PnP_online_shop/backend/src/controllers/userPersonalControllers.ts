import { Exception } from "handlebars";
import passport from "../authenticatorConfig/passport";
import { AppDataSource } from "../dataBase/configuration/AppDataSource";
import { User } from "../dataBase/entities/User";
import { UserRepository } from "../dataBase/repositories/usersRepository";
import { loadingTemplate } from "../handlebars/handlebarsApp";
import { Request, Response } from "express";



export const changeName = async (req: Request, res: Response) => {  
    const firstname : string | undefined = req.query.firstname?.toString();
    const lastname : string | undefined = req.query.lastname?.toString();
    
    const id: number | undefined = req.user?.id;     
    console.log(req.user?.id);
    console.log('есть ли юзер айди?');
    await AppDataSource.initialize();
    const userRepo: UserRepository = new UserRepository(AppDataSource);
    
    if (id ){
        const user: User | null = await userRepo.getUserById(id);
        if (firstname && user){             
            user.firstname = firstname;
            await userRepo.changeUserData(user);
            res.status(201).send({
                status: 201,
                message: 'Данные успешно обновлены'
        })}
        else
        if (lastname && user){             
            user.lastname = lastname;
            await userRepo.changeUserData(user);
            res.status(201).send({
                status: 201,
                message: 'Данные успешно обновлены'
        })}
        else
        {
            res.status(500).send({
            status: 500,
             message: 'Не удалось обновить данные'
            })
        }       
    }
    else {
        throw new Error();
    }    
    await AppDataSource.destroy();    
};

export const getInfo = async (req: Request, res: Response) => {      
    
    const id: number | undefined = req.user?.id;     

    await AppDataSource.initialize();
    const userRepo: UserRepository = new UserRepository(AppDataSource);
    
    if (id){
        const user: User | null = await userRepo.getUserById(id);
        if (user){            
            res.status(200).send(user);
        } 
        else
        {
            throw new Error();
        }
    }
    else {
        throw new Error();
    }
    
    await AppDataSource.destroy();  
};

export const changePassword = async (req: Request, res: Response) => {
    console.log('сменв пароля');
    res.status(201).send({
        status: 201,
        message: 'На вашу почту выслано сообщение для смены пароля'
    });
};      
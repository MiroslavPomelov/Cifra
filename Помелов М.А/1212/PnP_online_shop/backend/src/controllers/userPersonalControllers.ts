import { Exception } from "handlebars";
import passport from "../authenticatorConfig/passport";
import { AppDataSource } from "../dataBase/configuration/AppDataSource";
import { User } from "../dataBase/entities/User";
import { UserRepository } from "../dataBase/repositories/usersRepository";
import { loadingTemplate } from "../handlebars/handlebarsApp";
import { Request, Response } from "express";



export const changeFirstname = async (req: Request, res: Response) => {  
    const firstname : string | undefined = req.query.firstname?.toString(); 
    
    
    const id: number | undefined = req.user?.id;     

    await AppDataSource.initialize();
    const userRepo: UserRepository = new UserRepository(AppDataSource);
    
    if (id && firstname){
        const user: User | null = await userRepo.getUserById(id);
        if (user){ 
            user.firstname = firstname;
            await userRepo.changeUserData(user);
            res.status(201).send({
                status: 201,
                message: 'success'
            });
        } 
        else
        {
            res.send({
                status: 999,
                message: 'error'
            })
        }
    }
    else {
        throw new Error();
    }
    
    await AppDataSource.destroy(); 
    

   
}
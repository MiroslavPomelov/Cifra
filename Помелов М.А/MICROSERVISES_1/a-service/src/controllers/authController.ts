import { Request, Response } from 'express'; 
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'Pinegun_key_2327';

export const login = async ( req: Request, res: Response) => { 
    const { username, password } = req.body; 
    console.log(username);
    console.log(password);
    console.log(req.body);
    
    try { 
        const response = await fetch(`http://users-service:3000/users?username=${username}&password=${password}`);
        const user = await response.json();                   
        if (user){ 
            const payload = { 
                id: user.id, 
                role: user.role,
                username: user.username 
            }; 
            const token = jwt.sign(payload, secretKey, {expiresIn:'1h'}); 
            res.json({ token, message: 'Успешная авторизация!' }); 
        }
        else { 
            res.status(401).json({message: '1Невалидные  данные'}); 
        }           
    }
    catch (err) { 
        console.log(err);
        res.status(401).json({message: '2Невалидные  данные'}); 
    }  
};

export const registration = async ( req: Request, res: Response) => {   
    console.log(req.body);
    try {       
        const response = await fetch(`http://users-service:3000/users/new`, {
            method: 'POST', 
            headers: {
                 'Content-type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        const user = await response.json();
        console.log(user + 22);
        if (user){ 
            const payload = { 
                id: user.id, 
                role: user.role,
                username: user.username 
            }; 
            const token = jwt.sign(payload, secretKey, {expiresIn:'1h'}); 
            res.json({ token, message: 'Успешная регистрация!' });       
        }
        else { 
            res.status(401).json({message: '3Невалидные  данные'}); 
        }           
    }
    catch (err) { 
        res.status(401).json({message: '4Невалидные  данные'}); 
    }  
};

export const checkToken = ( req: Request, res: Response) => {
    console.log("cheking")
    res.status(200).send();
};
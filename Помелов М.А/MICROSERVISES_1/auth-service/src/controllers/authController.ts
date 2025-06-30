import { Request, Response } from 'express'; 
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'Pinegun_key_2327';

export const login = async ( req: Request, res: Response) => { 
    const { username, password } = req.body; 
    
    try { 
        const response = await fetch(`http://localhost:80/users/?username=${username}&&password=${password}`);
        const user = await response.json();                   
        if (user){ 
            const payload = { 
                id: user.id, 
                role: user.role,
                username: user.username 
            }; 
            const token = jwt.sign(payload, secretKey, {expiresIn:'1h'}); 
            res.json({ token }); 
        }
        else { 
            res.status(401).json({message: 'Невалидные  данные'}); 
        }           
    }
    catch (err) { 
        res.status(401).json({message: 'Невалидные  данные'}); 
    }  
};

export const registration = async ( req: Request, res: Response) => {   
    
    try {       
        const response = await fetch(`http://localhost:80/users/new`, {
            method: 'POST', 
            headers: {
                 'Content-type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        const user = await response.json();
        if (user){ 
            const payload = { 
                id: user.id, 
                role: user.role,
                username: user.username 
            }; 
            const token = jwt.sign(payload, secretKey, {expiresIn:'1h'}); 
            res.json({ token });       
        }
        else { 
            res.status(401).json({message: 'Невалидные  данные'}); 
        }           
    }
    catch (err) { 
        res.status(401).json({message: 'Невалидные  данные'}); 
    }  
};

export const checkToken = ( req: Request, res: Response) => {
    res.status(200).send();
};
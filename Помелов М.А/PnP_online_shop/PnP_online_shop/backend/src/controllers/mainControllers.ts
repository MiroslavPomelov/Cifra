import { Request, Response } from "express";
import { readFilePromise } from "../modules/file-operator";
import { loadingTemplate } from "../handlebars/handlebarsApp";


export const mainPage = async (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(loadingTemplate('','Войти', ``));
}


<script>const btnAuth = document.querySelector(".btnLogin-popup");
              btnAuth.addEventListener('click', () => {
                wrapper.classList.add('active-popup');
                
            });</script>


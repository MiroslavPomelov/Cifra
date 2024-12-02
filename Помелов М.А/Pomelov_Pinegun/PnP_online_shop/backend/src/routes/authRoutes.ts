import { Router } from 'express';
import { authPage, registrationPage } from '../controllers/authControllers';


const authRouter = Router();

authRouter.get('/enter-page', authPage);

authRouter.get('/registration-page', registrationPage);

export default authRouter;
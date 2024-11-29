import { Router } from 'express';
import { mainPage } from '../controllers/mainControllers';

const mainRouter = Router();

mainRouter.get('/', mainPage);

export default mainRouter;
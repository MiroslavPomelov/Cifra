import { Router } from 'express';
import { mainPage, mainPageAutharizated } from '../controllers/mainControllers';
import passport from 'passport';
import { mustAuthenticatedMw } from '../middlewares/middleware';

const mainRouter = Router();

mainRouter.get('/', mainPage);
mainRouter.get('/private', mustAuthenticatedMw, mainPageAutharizated);

export default mainRouter;
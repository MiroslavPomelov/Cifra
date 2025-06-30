import { Router } from 'express'; 
import passport from 'passport'; 
import {checkToken, login, registration}  from '../controllers/authController'; 
const router = Router(); 

router.post('/login', login);
router.post('/registration', registration);

router.get('/checkToken', passport.authenticate('jwt', { session: false }), checkToken); 

export default router;
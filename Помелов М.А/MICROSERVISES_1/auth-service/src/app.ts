import express from 'express'; 
import passport from '../../a-service/src/config/jwtStrategy';
import  authRoutes  from  './routes/authRoutes'  ;  
import router from './routes/authRoutes';
const app = express(); 
app.use(express.json()); 
// Инициализация passport 
app.use(passport.initialize()); 

app.use('/', authRoutes); 
export default app;
import { Router } from "express";
import { mustAuthenticatedMw } from "../middlewares/middleware";
import { getInfo, changePassword, changeName } from "../controllers/userPersonalControllers";


const userPersonalRouter = Router();
userPersonalRouter.get('/user-personal-change_name', mustAuthenticatedMw, changeName );


userPersonalRouter.get('/user-personal', mustAuthenticatedMw, getInfo );

userPersonalRouter.get('/changePass', mustAuthenticatedMw, changePassword);

export default userPersonalRouter;

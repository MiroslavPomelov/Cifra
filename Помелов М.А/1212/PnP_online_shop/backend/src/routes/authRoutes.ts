import { Router } from "express";
import { registration } from "../controllers/authControllers";
import { checkRegisteredUsers } from "../middlewares/middleware";
import passport from "../authenticatorConfig/passport";

const authRouter = Router();

authRouter.post("/auth", 
  passport.authenticate("local", {
  successRedirect: "/private",
  failureRedirect: "/"
  })
);

authRouter.post("/registration-page", checkRegisteredUsers, registration);



export default authRouter;

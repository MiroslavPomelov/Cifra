import { Router } from "express";
import { auth, registration } from "../controllers/authControllers";
import { checkRegisteredUsers } from "../middlewares/middleware";
import passport from "passport";

const authRouter = Router();

authRouter.post(
  "/auth",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
  auth
);

authRouter.post("/registration-page", checkRegisteredUsers, registration);

export default authRouter;

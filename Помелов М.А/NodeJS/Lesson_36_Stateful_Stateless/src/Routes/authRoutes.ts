import { Router } from "express";
import passport from "passport";
import { login, protectRoute } from "../Controllers/authControllers";

const authRouter = Router();
authRouter.post("/login", login);
authRouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  protectRoute
);

export default authRouter;
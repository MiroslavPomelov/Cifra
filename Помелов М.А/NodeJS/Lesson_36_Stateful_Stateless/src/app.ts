import express from "express";
import passport from "./Conf/jwtStratagy";
import authRouter from "./Routes/authRoutes";

const app = express();
app.use(express.json());

app.use(passport.initialize());
app.use("/api", authRouter);

export default app;

import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "qwerty123456";

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    const payload = {
      id: 1,
      name: "Admin User",
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    res.json({ token }); //как send только сразу в JSON()
  }
};

export const protectRoute = (req: Request, res: Response) => {
  res.json({
    message: "YOU GET ACCESSED TO THE PROTECTED ROUTE",
    user: req.user,
  });
};

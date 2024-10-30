"use strict";
// import express, { Request, Response, NextFunction, Express } from 'express';
// import cors from 'cors';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app: Express = express();
// const PORT: number = 3000;
// // app.use((req: Request, res: Response, next: NextFunction) => {
// //     res.setHeader('Access-Control-Allow-Origin', '*');
// //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD, PUT, PATCH');
// //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// //     next();
// // });
// app.use(cors());
// app.use((req: Request, res: Response, next: NextFunction) => {
//     console.log(req.url, req.method);
// });
// app.get('/', (req: Request, res: Response) => {
//     res.status(200).send('success');
// });
// app.listen(PORT, () => {
//     console.log('Server was started');
// });
//ROUTES
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
const PORT = 3000;
router.get('/route1', (req, res) => {
    res.send('Route 1');
});
router.get('/route2', (req, res) => {
    res.send('Route 2');
});
app.use('/main', router);
app.listen(PORT, () => {
    console.log('Server was started');
});

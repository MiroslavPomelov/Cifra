import { Router } from "express";
import { getProductByCatAndType } from "../controllers/productControllers";

const productRouter = Router();

productRouter.get('/products', getProductByCatAndType );

export default productRouter;


import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../dataBase/configuration/AppDataSource";
import { ProductRepository } from "../dataBase/repositories/productRepository";
import { Product } from "../dataBase/entities/Product";

export const getProductByCatAndType = async (req: Request, res: Response) => {

    const category: string | undefined = req.query.category?.toString();
    const type: string | undefined = req.query.type?.toString();

    console.log(category);
    console.log(type);

    await AppDataSource.initialize();
    const productRepo: ProductRepository = new ProductRepository(AppDataSource);


    if (category && type) {
        const products: Product[] | null = await productRepo.getProductsByCategoryAndType(category, type);
        if (products) {
            console.log(products);
            res.status(200).send(products);
        }
        else {
            throw new Error();
        }
    }
    else {
        throw new Error();
    }
    await AppDataSource.destroy();

};
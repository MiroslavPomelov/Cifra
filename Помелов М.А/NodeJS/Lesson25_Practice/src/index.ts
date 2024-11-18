import { DataSource } from 'typeorm';
import { Product } from './entities/Product';
import express, { Express, Request, Response } from 'express';
import cors from "cors";
import { AppDataSource } from './configuration/dara-source';

const app: Express = express();
const PORT: number = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/upload-new-good', (req: Request, res: Response) => {

    const product: Product = req.body;
    connctToDB(product);

    res.status(201);
    res.send();
});

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});


function connctToDB(product: Product): void {
    AppDataSource.initialize().then(async () => {
        const newProduct = new Product();

        newProduct.goodName = product.goodName;
        newProduct.goodDescription = product.goodDescription;
        newProduct.goodPrice = product.goodPrice;

        console.log(newProduct);

        await AppDataSource.manager.save(newProduct);
        console.log('Saving new User in DB with id: ' + newProduct.id);
    });

}
import { IRepository } from "./interfaces/IRepository";
import { Product } from "../entities/Product";
import { productsDataGenerator } from "./functions/generateFunctions";


export class ProductRepo implements IRepository<Product> {
    listOfProducts: Product[] = [];

    constructor() {
        productsDataGenerator(50);
    }

    public create(product: Product) {
        this.listOfProducts.push(product);
        return this.listOfProducts;
    }

    public readOne(id: number): Product | undefined {

        try {
            const searchProduct: Product | undefined = this.listOfProducts.find(product => product.id == id);

            return searchProduct;

        } catch (error) {

            throw new Error('Reading error!' + error);
        }

    }

    public readAll(): Product[] {
        return this.listOfProducts;
    }

    public update(updateData: Partial<Product>): void {
        try {

            let updatingProduct: Partial<Product> | undefined = this.listOfProducts.find(product => product.id == updateData.id);

            if (!updateData.id) throw new Error('Product is not exist!');
            if (!updatingProduct) throw new Error('Product is not exist!');

            updatingProduct = { ...updatingProduct, ...updateData };


        } catch (error) {

            throw new Error('Updating Product error!' + error);
        }
    }



    public delete(id: number): void {

        try {
            const deleteProduct: number = this.listOfProducts.findIndex((product) => product.id == id);

            this.listOfProducts.splice(deleteProduct, 1);

        } catch (error) {

            throw new Error('Delete user error!' + error);
        }
    }

}
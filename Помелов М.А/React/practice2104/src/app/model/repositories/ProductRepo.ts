import { Product } from "../entities/Product";
import { productDataGenerator } from "./functions/generateFunction";
import { IRepository } from "./interfaces/IRepository";

export class ProductRepo implements IRepository<Product> {

    public listOfProducts: Product[] = [];

    constructor() {
        this.listOfProducts = productDataGenerator(50);
    }

    public create(newProduct: Product): void {
        this.listOfProducts.push(newProduct)
    }

    public readOne(id: number): Product | undefined {
        try {
            const searchigProduct: Product | undefined = this.listOfProducts.find(product => product.id == id);
            return searchigProduct;
        }
        catch (error) {
            throw new Error('Error searching product:' + error);
        }

    }

    public readAll(): Product[] {
        return this.listOfProducts;
    }

    update(updateData: Partial<Product>): void {
        try {
            const productId = updateData.id;
            if (!productId) {
                throw new Error('Product ID is required for updating');
            }

            const productIndex: number = this.listOfProducts.findIndex(product => product.id == productId);

            console.log("индекс");
            console.log(productIndex);

            if (!productIndex) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            
            for (let i = 0; i < Object.entries(this.listOfProducts[productIndex]).length; i++) {
                for (let j = 0; j < Object.entries(updateData).length; j++) {
                    if (Object.entries(this.listOfProducts[productIndex])[i][0] == Object.entries(updateData)[j][0]){
                        Object.entries(this.listOfProducts[productIndex])[i][1] = Object.entries(updateData)[j][1]
                    }
                }
                
            }
            
          
            console.log(this.listOfProducts[productIndex])
           
            

            // this.listOfProducts[productIndex] = {
            //     ...this.listOfProducts[productIndex],
            //     ...updateData
            // };


        }
        catch (error) {
            throw new Error('Error updating product' + error);

        }
    }
    delete(id: number): void {
        try {
            const indexToDelete: number = this.listOfProducts.findIndex(product => product.id == id);
            if (indexToDelete) {
                this.listOfProducts.splice(indexToDelete, 1);
            }

        }
        catch (error) {
            throw new Error('Error deleting product' + error);
        }
    }
}

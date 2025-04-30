import { Product } from "@/app/model/entities/Product"



export type SelectProductsProps = {
    listOfProducts: Product[];
    userProducts: Product[];
    returnProductList(list: Product[]): void;
}
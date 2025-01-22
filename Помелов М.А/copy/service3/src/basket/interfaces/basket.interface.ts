import { Document } from "mongoose";

export interface Basket extends Document {
    readonly id: number;
    readonly userId: number;
    readonly name: string;
    readonly price: number;
    readonly productsIds: number[],
    readonly description: string;
}
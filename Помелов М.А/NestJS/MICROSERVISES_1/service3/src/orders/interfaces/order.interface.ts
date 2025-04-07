import { Document } from "mongoose";

export interface Order extends Document {
    readonly id: number;
    readonly userid: number;
    readonly productsids: number[];
    readonly date: Date;
}
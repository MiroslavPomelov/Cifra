import { Document } from "mongoose";

export interface Order extends Document {    
    readonly userid: number;
    readonly productsids: number[];
    readonly date: Date;
}
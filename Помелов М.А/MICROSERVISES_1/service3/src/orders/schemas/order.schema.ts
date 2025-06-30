import { Schema } from "mongoose";

export const OrderSchema = new Schema({    
    userid: { type: Number, unique: true, required: true },
    productsids: {type: Array<Number>, required: true},
    date: {type: Date}
});
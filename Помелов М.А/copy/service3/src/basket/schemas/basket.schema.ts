import { Schema } from "mongoose";


export const BasketSchema = new Schema({
    id: {type: Number, required: true},
    userId: {type: Number},
    name: {type: String},
    price: {type: Number},
    productsIds: {type: Array<Number>},
    description: {type: String},
});
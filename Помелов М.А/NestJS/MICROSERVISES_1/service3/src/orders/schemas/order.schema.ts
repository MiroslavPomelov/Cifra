import { Schema } from "mongoose";

export const OrderSchema = new Schema({
    id: {type: Number, required: true },
    userid: { type: Number},
    productsIds: {type: Array<Number>},
    date: {type: Date}
});
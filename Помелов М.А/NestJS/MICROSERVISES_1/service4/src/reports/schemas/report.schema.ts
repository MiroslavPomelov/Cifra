import { Schema } from "mongoose";

export const ReportSchema = new Schema({
    userId: {type: Number, required: true },
    productId: { type: Number, required: true},
    review: {
        title: String,
        reportInfo: String,
        rating: Number
    }    
});

   
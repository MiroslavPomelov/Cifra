import { Document } from "mongoose";
import { Review } from "./review.interface";

export interface Report extends Document {
    userId: number;
    productId: number;
    review: Review;
}
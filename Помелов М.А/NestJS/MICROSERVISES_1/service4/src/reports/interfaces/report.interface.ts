import { Document } from "mongoose";
import { Review } from "./review.interface";

export interface Report extends Document {
    readonly userId: number;
    readonly productId: number;
    readonly review: Review;
}
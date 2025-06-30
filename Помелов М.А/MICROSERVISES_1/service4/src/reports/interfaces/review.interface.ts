import { Document } from "mongoose";

export interface Review extends Document {
   
    title: string,
    reportInfo: string,
    rating: number;
    
}
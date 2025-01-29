import { Document } from "mongoose";

export interface Review extends Document {
   
    readonly title: string,
    readonly reportInfo: string,
    readonly rating: number;
    
}
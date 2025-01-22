import { Document } from "mongoose";

export interface Report extends Document {
   readonly userId: string;
   readonly goodId: string;
   readonly report: {
       readonly title: string;
       readonly reportInfo: string;
       readonly rating: 5
    }
}
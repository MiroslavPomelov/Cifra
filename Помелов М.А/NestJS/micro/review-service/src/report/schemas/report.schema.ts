import { Schema } from "mongoose";


export const ReportSchema = new Schema({
    user_id: {type: String, required: true},
    good_id: {type: String},
    report: {
        title: {type: String},
        report_info: {type: String},
        rating: {type: Number},
    }
})
import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title Required!"],
    },
    description: {
        type: String,
        required: [2, "Description required!"],
    },
    timeline: {
        from: {
            type: String,
            required: [true, "Timeline started Date is Required!"],
        },
        to: String,
    },
    
})

export const Timeline = mongoose.model("TimeLine", timelineSchema);
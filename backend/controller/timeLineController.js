import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { Timeline } from "../models/timeLIneSchema.js";



export const postTimeline = catchAsyncErrors(async (req, res, next) =>{
    const {title, description, from , to} = req.body;
    const NewTimeline = await Timeline.create({title, description, timeline: {from , to},});
    res.status(200).json({
        success: true,
        message: "Timeline added",
        NewTimeline
    })
});

export const deleteTimeline = catchAsyncErrors(async (req, res, next) =>{
    const { id } = req.params;
    const timeline = await Timeline.findById(id);
    if(!timeline){
        return next(new ErrorHandler("Timeline not found!", 404))
    }
    await timeline.deleteOne();
    res.status(200).json({
        success: true,
        message: "Timeline Deleted"
    })
});

export const getAllTimeline = catchAsyncErrors(async (req, res, next) =>{
    const timeline = await Timeline.find();
    res.status(200).json({
        success: true,
        timeline,
    })
}) 


import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) =>{
    const { token } = req.cookies;
    if(!token){
        return next(new ErrorHandler("User not authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    req.user = user;
    console.log("user code", req.user)
    next();
});


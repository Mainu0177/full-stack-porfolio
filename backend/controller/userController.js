import { v2 as cloudinary } from "cloudinary"
import crypto from 'crypto';

import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js"
import ErrorHandler from "../middleware/error.js"
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";



export const register = catchAsyncErrors(async (req, res, next) =>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Avatar and Resume are Required!", 400));
    }
    const { avatar } = req.files;
    const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        { folder: "AVATAR" }
    );
    if(!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
        console.error(
            "Cloudinary Error: ",
            cloudinaryResponseForAvatar.error || "Unknown Cloudinary Error"
        );
    }

    const { resume } = req.files;
    const cloudinaryResponseForResume = await cloudinary.uploader.upload(
        resume.tempFilePath,
        { folder: "MY_RESUME" }
    );
    if(!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
        console.error(
            "Cloudinary Error: ",
            cloudinaryResponseForResume.error || "Unknown Cloudinary Error"
        );
    }

    const {
        fullName,
        email,
        password,
        phone,
        aboutMe,
        portfolioURL,
        githubURL,
        facebookURL,
        instagramURL,
        linkedInURL
        } = req.body
    const user = await User.create({
        fullName,
        email,
        password,
        phone,
        aboutMe,
        portfolioURL,
        githubURL,
        facebookURL,
        instagramURL,
        linkedInURL,
        avatar: {
            public_id: cloudinaryResponseForAvatar.public_id,
            url: cloudinaryResponseForAvatar.secure_url,
        },
        resume: {
            public_id: cloudinaryResponseForResume.public_id,
            url: cloudinaryResponseForResume.secure_url,
        },
    })
    res.status(200).json({
        success: true,
        message: "user Registered"
    });
    generateToken(user, "User Registered!", 201, res);
});


export const login = catchAsyncErrors(async (req, res, next) =>{
    const { email, password } = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Email and password are required!"));
    }
    const user = await User.findOne({ email }).select("+password");
    if(!user){
        return next(new ErrorHandler("Inavlid Email or Password!"));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Inavlid Email or Password!"))
    }
    generateToken(user, "Log in successfully!", 200, res)
})

export const logout = catchAsyncErrors(async (req, res, next) =>{
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    .json({
        success: true,
        message : "Logged Out!"
    })
})

export const getAllUser = catchAsyncErrors(async (req, res, next) =>{
    // console.log("my code", req?.user)
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true, 
        user,
    });
});


export const updateProfile = catchAsyncErrors(async (req, res, next) =>{
    const newUserData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        aboutMe: req.body.aboutMe,
        portfolioURL: req.body.portfolioURL,
        githubURL: req.body.githubURL,
        facebookURL: req.body.facebookURL,
        instagramURL: req.body.instagramURL,
        linkedInURL: req.body.linkedInURL,
    };
    if(req.files && req.files.avatar){
        const avatar = req.files.avatar;
        const user = await User.findById(req.user.id);
        const profileImageId = user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImageId);
        const cloudinaryResponse = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            { folder: "AVATAR" }
        );
        newUserData.avatar = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    }
    if(req.files && req.files.resume){
        const resume = req.files.resume;
        const user = await User.findById(req.user.id);
        const resumeId = user.resume.public_id;
        await cloudinary.uploader.destroy(resumeId);
        const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            { folder: "MY_RESUME" }
        );
        newUserData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: "Profile Updated!",
        user,
    })
})

export const updatePassword = catchAsyncErrors(async (req, res, next) =>{
    const {currentPassword, newPassword, confirmNewPassword } = req.body;
    if(!currentPassword || !newPassword || !confirmNewPassword ){
        return next(new ErrorHandler("Please fill all field.", 400));
    }
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await User.comparePassword(currentPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Incorrect current password", 400));
    }
    if(!newPassword !== confirmNewPassword){
        return next(new ErrorHandler("New password and confirm password do not match.", 400))
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Password updated!",
    })
})

export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) =>{
    const id = "675efc5686f7d914f80443a7";
    const user = await User.findById(id);
    res.status(200).json({
        success: true,
        user,
    });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
        return next(new ErrorHandler("User not found!", 404 ));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false });
    const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;
    const message = `Your reset password Token is: -\n\n ${resetPasswordUrl} \n\n If you've not request for this please ignore it. `;

    try {
        await sendEmail({
            email: user.email,
            subject: "personal Portfolio Dashboard recovery password",
            message,
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully!`,

        })
    } catch (error) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save();
        return next(new ErrorHandler(error.message, 500))
    }
})

export const resetPassword = catchAsyncErrors(async (req, res, next) =>{
    const { token } = req.params;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now() },
    });
    if(!user) {
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 400))
    }
    if(req.body.password !== req.body.confirmNewPassword ){
        return next(new ErrorHandler("Password & Confirm password do not match."))
    }
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    generateToken(user, "Reset Password successfully!", 200, res);
})


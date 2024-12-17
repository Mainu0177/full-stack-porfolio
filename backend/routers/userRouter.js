import express from 'express';

import { forgotPassword,
        getAllUser,
        getUserForPortfolio,
        login,
        logout,
        register,
        resetPassword,
        updatePassword,
        updateProfile
    } from '../controller/userController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getUser", isAuthenticated, getAllUser);
router.put("/update/profile", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);
router.get("/getUser/portfolio", getUserForPortfolio);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword)


export default router;
import express from 'express';


import { isAuthenticated } from '../middleware/auth.js';
import { addNewApplication, deleteApplication, getAllApplication } from '../controller/softApplicationController.js';


const router = express.Router();

router.post("/add", isAuthenticated, addNewApplication );
router.delete("/delete/:id", isAuthenticated, deleteApplication )
router.get("/getAll", isAuthenticated, getAllApplication )

export default router;
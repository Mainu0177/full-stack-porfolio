import express from 'express';


import { isAuthenticated } from '../middleware/auth.js';
import { deleteTimeline, getAllTimeline, postTimeline } from '../controller/timeLineController.js';

const router = express.Router();

router.post("/add", isAuthenticated, postTimeline );
router.delete("/delete/:id", isAuthenticated, deleteTimeline )
router.get("/getAll", isAuthenticated, getAllTimeline )

export default router;

import express from 'express';


import { isAuthenticated } from '../middleware/auth.js';
import { addNewSkill, deleteSkill, getAllSkill, updateSkill } from '../controller/skillController.js';


const router = express.Router();

router.post("/add", isAuthenticated, addNewSkill );
router.delete("/delete/:id", isAuthenticated, deleteSkill )
router.put("/update/:id", isAuthenticated, updateSkill )
router.get("/getAll", getAllSkill )

export default router;
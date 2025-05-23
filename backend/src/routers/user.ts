import { Router } from "express";
import { getPresignedUrl, getUserTask, postUserTask, registerUser } from "../controllers/user";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post('/signin',registerUser)
router.get('/presignedUrl', authMiddleware as any, getPresignedUrl);
router.post('/task',authMiddleware as any,postUserTask)
router.get('/task',authMiddleware as any,getUserTask)

export default router;
import { Router } from "express";
import { getPresignedUrl, registerUser } from "../controllers/user";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post('/signin',registerUser)
router.get('/presignedUrl', authMiddleware as any, getPresignedUrl);

export default router;
import { Router } from "express";
import { getPresignedUrl, registerUser } from "../controllers/user";

const router = Router();

router.post('/signin',registerUser)
router.get('/presignedUrl',getPresignedUrl)

export default router;
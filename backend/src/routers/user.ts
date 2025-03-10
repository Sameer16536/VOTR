import { Router } from "express";
import { registerUser } from "../controllers/user";

const router = Router();

router.post('/signin',registerUser)

export default router;
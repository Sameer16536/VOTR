import { Router } from "express";
import { registerWorker } from "../controllers/worker";


const router = Router();


router.post('/signin',registerWorker)


export default router;
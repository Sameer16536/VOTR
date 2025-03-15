import { Router } from "express";
import { getWorkerTask, registerWorker } from "../controllers/worker";
import { workerAuthMiddleware } from "../middleware/auth.middleware";


const router = Router();


router.post('/signin',registerWorker)
router.get('/nextTask',workerAuthMiddleware as any ,getWorkerTask)


export default router;